![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p71-shadow-svelte)](https://github.com/PaulioRandall/p71-shadow-svelte/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p71-shadow-svelte)](https://github.com/PaulioRandall/p71-shadow-svelte/releases)

# P71: Shadow Svelte

Svelte pre-processor enabling quick access to Svelte & SvelteKit functions through auto import.

_[Default mappings for functions](./src/defaultMappings)_. It also includes console logging alias functions. You can modify the mappings and aliases via the _customise_ pre-processor option.

> Very simple implementation using regular expressions. Quick side project so CBA to do proper JavaScript parsing.

## Usage

**svelte.config.js**

```js
import shadowSvelte from '@paulio/shadow-svelte'

export default {
	preprocess: [shadowSvelte()],
}
```

**Component.svelte**

```svelte
<script>
	const store = $writableStore(123)

	$onMount(() => {
		// ...
	})
</script>
```

**Component.svelte (after pre-processing)**

Because imported functions are aliased, there should be no conflict with the same manually imported function.

```svelte
<script>
	import { onMount as __shadowSvelte__svelte__onMount } from 'svelte'
	import { writable as __shadowSvelte__svelte_store__writable } from 'svelte/store'

	const store = __shadowSvelte__svelte_store__writable(123)

	__shadowSvelte__svelte__onMount(() => {
		// ...
	})
</script>
```

## Options

```js
import shadowSvelte from '@paulio/shadow-svelte'

shadowSvelte({
	// Function allowing you to add, remove, and modify
	// mappings.
	customise: (mappings) => mappings,
})
```

### Customise Mappings

**svelte.config.js**

```js
import shadowSvelte from '@paulio/shadow-svelte'

export default {
	preprocess: [
		shadowSvelte({
			customise: (mappings) => {
				renameTickToTock(mappings)
				removeOnMount(mappings)
				addOnMountAsOnLoad(mappings)
				addObjectFreezeAsIced(mappings)
				return mappings
			},
		}),
	],
}

function findMappingIndexByKeyword(mappings, keyword) {
	for (let i = 0; i < mappings.length; i++) {
		if (mappings[i].keyword === keyword) {
			return i
		}
	}

	return -1
}

function renameTickToTock(mappings) {
	const index = findMappingIndexByKeyword('tick')
	mappings[index].keyword = 'tock'


function removeOnMount(mappings) {
	const index = findMappingIndexByKeyword('onMount')
	mappings.splice(index, 1)
}

function addOnMountAsOnLoad(mappings) {
	mappings.push({
		keyword: 'onLoad',
		name: 'onMount',
		// Unique enough to avoid naming conflicts
		as: '__shadowSvelte__svelte__onMount_as_onLoad',
		from: 'svelte',
	})
}

function addObjectFreezeAsIced(mappings) {
	mappings.push({
		keyword: 'iced',
		as: 'Object.freeze',
	})
}
```

## Default Mappings

_[Default mappings](./src/defaultMappings)_. You can also modify the mappings via the _customise_ pre-processor option.

```js
{
	// $keyword: "The real function name"

	// 'svelte'
	$createContext: "createContext",
	$dispatcher: "createEventDispatcher",
	$flushSync: "flushSync",
	$fork: "fork",
	$getAbortSignal: "getAbortSignal",
	$getAllContext: "getAllContext",
	$getContext: "getContext",
	$hasContext: "hasContext",
	$hydratable: "hydratable",
	$hydrate: "hydrate",
	$mount: "mount",
	$onDestroy: "onDestroy",
	$onMount: "onMount",
	$rawSnippet: "createRawSnippet",
	$setContext: "setContext",
	$settled: "settled",
	$tick: "tick",
	$unmount: "unmount",
	$untrack: "untrack",

	// 'svelte/store'
	$writableStore: "writable",
	$readableStore: "readable",
	$readonlyStore: "readonly",
	$derivedStore: "derived",
	$getStoreValue: "get",

	// Console aliases
	$log: "console.log",
	$info: "console.info",
	$warn: "console.warn",
	$error: "console.error",
}
```
