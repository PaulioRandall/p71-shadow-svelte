/*
	const importMappingSchema = {
		// The identifier to look for. Users will prefix this
		// with '$', e.g. `$myFunc(....)`.
		keyword: 'myFunc',

		// The function name as it is exported from its package.
		name: 'myFunction',

		// The alias to import the function as. Keep this unique
		// but meaningful. To keep debugging easy, I recommend
		// the format below, replacing 'myPackage' and
		// 'myFunction' with the original package and function
		// names.
		as: '__shadowSvelte__myPackage__myFunction',

		// The name of the package to import from, exactly as
		// you would specify it manually.
		from: 'myPackage',
	}

	const aliasMappingSchema = {
		// The identifier to look for. Users will prefix this
		// with '$', e.g. `const obj = $merge(target, source)`.
		keyword: 'merge',

		// The real function name.
		as: 'Object.assign',
	}
*/

export default [
	// https://svelte.dev/docs/svelte/svelte
	{
		keyword: 'createContext',
		name: 'createContext',
		as: '__shadowSvelte__svelte__createContext',
		from: 'svelte',
	},
	{
		keyword: 'dispatcher',
		name: 'createEventDispatcher',
		as: '__shadowSvelte__svelte__createEventDispatcher',
		from: 'svelte',
	},
	{
		keyword: 'flushSync',
		name: 'flushSync',
		as: '__shadowSvelte__svelte__flushSync',
		from: 'svelte',
	},
	{
		keyword: 'fork',
		name: 'fork',
		as: '__shadowSvelte__svelte__fork',
		from: 'svelte',
	},
	{
		keyword: 'getAbortSignal',
		name: 'getAbortSignal',
		as: '__shadowSvelte__svelte__getAbortSignal',
		from: 'svelte',
	},
	{
		keyword: 'getAllContext',
		name: 'getAllContext',
		as: '__shadowSvelte__svelte__getAllContext',
		from: 'svelte',
	},
	{
		keyword: 'getContext',
		name: 'getContext',
		as: '__shadowSvelte__svelte__getContext',
		from: 'svelte',
	},
	{
		keyword: 'hasContext',
		name: 'hasContext',
		as: '__shadowSvelte__svelte__hasContext',
		from: 'svelte',
	},
	{
		keyword: 'hydratable',
		name: 'hydratable',
		as: '__shadowSvelte__svelte__hydratable',
		from: 'svelte',
	},
	{
		keyword: 'hydrate',
		name: 'hydrate',
		as: '__shadowSvelte__svelte__hydrate',
		from: 'svelte',
	},
	{
		keyword: 'mount',
		name: 'mount',
		as: '__shadowSvelte__svelte__mount',
		from: 'svelte',
	},
	{
		keyword: 'onDestroy',
		name: 'onDestroy',
		as: '__shadowSvelte__svelte__onDestroy',
		from: 'svelte',
	},
	{
		keyword: 'onMount',
		name: 'onMount',
		as: '__shadowSvelte__svelte__onMount',
		from: 'svelte',
	},
	{
		keyword: 'rawSnippet',
		name: 'createRawSnippet',
		as: '__shadowSvelte__svelte__createRawSnippet',
		from: 'svelte',
	},
	{
		keyword: 'setContext',
		name: 'setContext',
		as: '__shadowSvelte__svelte__setContext',
		from: 'svelte',
	},
	{
		keyword: 'settled',
		name: 'settled',
		as: '__shadowSvelte__svelte__settled',
		from: 'svelte',
	},
	{
		keyword: 'tick',
		name: 'tick',
		as: '__shadowSvelte__svelte__tick',
		from: 'svelte',
	},
	{
		keyword: 'unmount',
		name: 'unmount',
		as: '__shadowSvelte__svelte__unmount',
		from: 'svelte',
	},
	{
		keyword: 'untrack',
		name: 'untrack',
		as: '__shadowSvelte__svelte__untrack',
		from: 'svelte',
	},

	// https://svelte.dev/docs/svelte/svelte-store
	{
		keyword: 'derivedStore',
		name: 'derived',
		as: '__shadowSvelte__svelte_store__derivedStore',
		from: 'svelte/store',
	},
	{
		keyword: 'fromStore',
		name: 'fromStore',
		as: '__shadowSvelte__svelte_store__fromStore',
		from: 'svelte/store',
	},
	{
		keyword: 'getStoreValue',
		name: 'get',
		as: '__shadowSvelte__svelte_store__getStoreValue',
		from: 'svelte/store',
	},
	{
		keyword: 'readableStore',
		name: 'readable',
		as: '__shadowSvelte__svelte_store__readableStore',
		from: 'svelte/store',
	},
	{
		keyword: 'readonlyStore',
		name: 'readonly',
		as: '__shadowSvelte__svelte_store__readonlyStore',
		from: 'svelte/store',
	},
	{
		keyword: 'writableStore',
		name: 'writable',
		as: '__shadowSvelte__svelte_store__writableStore',
		from: 'svelte/store',
	},
	{
		keyword: 'toStore',
		name: 'toStore',
		as: '__shadowSvelte__svelte_store__toStore',
		from: 'svelte/store',
	},

	// TODO: Add https://svelte.dev/docs/svelte/svelte-transition
	// TODO: Add https://svelte.dev/docs/svelte/svelte-animate
	// TODO: Add https://svelte.dev/docs/svelte/svelte-easing
	// TODO: Add https://svelte.dev/docs/svelte/svelte-events
	// TODO: Add https://svelte.dev/docs/svelte/svelte-motion
	// TODO: Add https://svelte.dev/docs/svelte/svelte-reactivity-window
	// TODO: Add https://svelte.dev/docs/svelte/svelte-reactivity
	// TODO: Add https://svelte.dev/docs/svelte/svelte-server

	// Quick logging
	{
		keyword: 'log',
		as: 'console.log',
	},
	{
		keyword: 'info',
		as: 'console.info',
	},
	{
		keyword: 'warn',
		as: 'console.warn',
	},
	{
		keyword: 'err',
		as: 'console.error',
	},
]
