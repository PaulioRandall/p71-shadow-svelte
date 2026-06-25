import defaultMappings from './defaultMappings.js'

export default function (userOptions = {}) {
	return {
		name: 'Shadow Svelte',
		script: newScript(userOptions),
	}
}

function newScript(userOptions) {
	const mappings = prepMappings(userOptions)
	const funcNames = mappings.map((f) => f.keyword).join('|')
	const regex = new RegExp(`\\$(${funcNames})`)

	return ({ content, filename }) => {
		const lines = content.split('\n')
		const imported = new Set()

		replaceKeywords(mappings, regex, lines, imported)
		if (imported.size > 0) {
			addImports(lines, imported)
		}

		return { code: lines.join('\n') }
	}
}

function prepMappings(userOptions) {
	let mappings = structuredClone(defaultMappings)
	mappings = customiseMappings(mappings, userOptions)
	mappings = structuredClone(mappings)
	checkMappings(mappings)
	return mappings
}

function customiseMappings(mappings, userOptions) {
	const customise = userOptions.customise || userOptions.customize

	if (!customise) {
		return mappings
	}

	if (typeof customise !== 'function') {
		throw err(`'options.customise' must be falsy or a function`)
	}

	mappings = customise(mappings)

	if (!mappings) {
		throw err(`Result of 'options.customise' must be an array of mappings`)
	}

	if (!Array.isArray(mappings)) {
		throw err(`Result of 'options.customise' must be an array of mappings`)
	}

	return mappings
}

function checkMappings(mappings) {
	const keywordSet = new Set()

	for (let i = 0; i < mappings.length; i++) {
		const im = mappings[i]
		checkMapping(keywordSet, im, i)
		keywordSet.add(im.keyword)
	}
}

function checkMapping(keywordSet, im, i) {
	if (typeof im !== 'object') {
		throw err(`(index ${i}) Mapping must be an object`)
	}

	checkMappingField(im, i, 'keyword')
	checkMappingField(im, i, 'name', true)
	checkMappingField(im, i, 'as')
	checkMappingField(im, i, 'from', true)

	if (keywordSet.has(im.keyword)) {
		throw err(
			`(index ${i}) Mapping with keyword '${im.keyword}' already exists`
		)
	}
}

function checkMappingField(im, i, fieldName, optional = false) {
	const v = im[fieldName]

	if (optional && !v) {
		return
	}

	if (!v) {
		throw err(
			`(index ${i}) Mapping must have a '${fieldName}' field as a non-empty string`
		)
	}

	if (typeof v !== 'string') {
		throw err(
			`(index ${i}) Mapping '${fieldName}' field must be a non-empty string`
		)
	}
}

function replaceKeywords(mappings, regex, lines, imported) {
	for (let i = 0; i < lines.length; i++) {
		// TODO: Allow for more than 1 match per line.

		const match = lines[i].match(regex)

		if (match) {
			lines[i] = replaceKeyword(mappings, lines[i], match, imported)
		}
	}
}

function replaceKeyword(mappings, line, match, imported) {
	const keyword = match[0].slice(1)
	const func = findMappingByKeyword(mappings, keyword)

	if (func.name && func.from) {
		imported.add(func)
	}

	return stringReplace(
		line, //
		match.index,
		match[0].length,
		func.as
	)
}

function addImports(lines, imported) {
	lines.unshift('')

	for (const { name, as, from } of imported) {
		if (!!name && !!from) {
			lines.unshift(`import { ${name} as ${as} } from '${from}'`)
		}
	}
}

function findMappingByKeyword(mappings, keyword) {
	return mappings.find((f) => f.keyword === keyword)
}

function stringReplace(str, index, length, replacement) {
	const prefix = str.slice(0, index)
	const postfix = str.slice(index + length)
	return prefix + replacement + postfix
}

function err(msg) {
	return new Error(`[ShadowSvelte] ${msg}`)
}
