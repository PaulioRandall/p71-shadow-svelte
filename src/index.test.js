import shadowSvelte from './index.js'

function linesToString(...lines) {
	return lines.join('\n')
}

describe('preprocessor.js', () => {
	test('Does it work?', () => {
		const preprocessor = shadowSvelte()

		const code = linesToString(
			`$onMount(() => {`,
			`	// Do thing`,
			`})`,
			``,
			`const store = $writableStore('initial-value')`
		)

		const result = preprocessor.script({
			content: code,
			filename: 'Meh.svelte',
		})

		const exp = linesToString(
			`import { writable as __shadowSvelte__svelte_store__writableStore } from 'svelte/store'`,
			`import { onMount as __shadowSvelte__svelte__onMount } from 'svelte'`,
			``,
			`__shadowSvelte__svelte__onMount(() => {`,
			`	// Do thing`,
			`})`,
			``,
			`const store = __shadowSvelte__svelte_store__writableStore('initial-value')`
		)

		expect(result.code).toEqual(exp)
	})

	test('Editing mappings: removing', () => {
		const preprocessor = shadowSvelte({
			customise: (mappings) => {
				expect(mappings[1].keyword).toEqual('dispatcher')

				mappings.splice(1, 1)
				return mappings
			},
		})

		const code = linesToString(
			`$dispatcher` //
		)

		const result = preprocessor.script({
			content: code,
			filename: 'Meh.svelte',
		})

		expect(result.code).toEqual(code)
	})

	test('Editing mappings: adding', () => {
		const preprocessor = shadowSvelte({
			customise: (mappings) => {
				mappings.push({
					keyword: 'meh',
					name: 'blah',
					as: '__shadowSvelte__meh',
					from: '$lib/meh.js',
				})

				return mappings
			},
		})

		const code = linesToString(
			`$meh('abc')` //
		)

		const result = preprocessor.script({
			content: code,
			filename: 'Meh.svelte',
		})

		const exp = linesToString(
			`import { blah as __shadowSvelte__meh } from '$lib/meh.js'`,
			``,
			`__shadowSvelte__meh('abc')` //
		)

		expect(result.code).toEqual(exp)
	})

	test('Editing mappings: empty required field', () => {
		const f = () => {
			const preprocessor = shadowSvelte({
				customise: (mappings) => {
					mappings[0].as = ''
					return mappings
				},
			})
		}

		expect(f).toThrow(Error)
	})

	test('Editing mappings: forget to return array', () => {
		const f = () => {
			const preprocessor = shadowSvelte({
				customise: (mappings) => {
					mappings.push({
						keyword: 'meh',
						name: 'blah',
						as: '__shadowSvelte__meh',
						from: '$lib/meh.js',
					})
				},
			})
		}

		expect(f).toThrow(Error)
	})

	test('Editing mappings: allow non-importing edits', () => {
		const preprocessor = shadowSvelte({
			customise: (mappings) => {
				mappings.push({
					keyword: 'meh',
					as: '__shadowSvelte__meh',
				})
				return mappings
			},
		})

		const code = linesToString(
			`$meh('abc')` //
		)

		const result = preprocessor.script({
			content: code,
			filename: 'Meh.svelte',
		})

		const exp = linesToString(
			`__shadowSvelte__meh('abc')` //
		)

		expect(result.code).toEqual(exp)
	})
})
