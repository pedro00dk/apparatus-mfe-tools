# @\_apparatus\_/mfe-tools

[![bundle size](https://deno.bundlejs.com/?q=@_apparatus_/mfe-tools&badge=detailed)](https://bundlejs.com/?q=@_apparatus_/mfe-tools)

Plugin and runtime tools for building ECMAScript module-based micro-frontends (MFEs).

## Installation

```sh
npm install @_apparatus_/mfe-tools
```

## Features

-   🛠️ **Vite plugin** - Simplifies configuration and build process for MFEs
-   📦 **ES module** - Native ES modules for loading and managing dependencies
-   🎨 **CSS isolation** - Automatic style isolation per MFE using Shadow DOM
-   🛡️ **Shadow DOM** - Encapsulates content and prevents style conflicts
-   ⚛️ **Framework agnostic** - Works with any rendering library
-   🔄 **HMR compatible** - Hot module replacement during development

## Examples

### Basic plugin setup

```ts
import { defineConfig } from 'vite'
import { mfe } from '@_apparatus_/mfe-tools/plugin'

export default defineConfig({
    plugins: [
        mfe('my-mfe', {
            'index.js': './src/index.ts',
        }),
    ],
})
```

### Multiple entry points

```ts
import { defineConfig } from 'vite'
import { mfe } from '@_apparatus_/mfe-tools/plugin'

export default defineConfig({
    plugins: [
        mfe('my-mfe', {
            'main.js': './src/main.ts',
            'admin.js': './src/admin.ts',
            'settings.js': './src/settings.ts',
        }),
    ],
})
```

### Custom index.html

```ts
import { defineConfig } from 'vite'
import { mfe } from '@_apparatus_/mfe-tools/plugin'

export default defineConfig({
    plugins: [
        mfe('my-mfe', {
            index: './index.html',
            'index.js': './src/index.ts',
        }),
    ],
})
```

### With plugins

```ts
import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import solid from 'vite-plugin-solid'
import { mfe } from '@_apparatus_/mfe-tools/plugin'

export default defineConfig({
    plugins: [
        solid(),
        tailwind(),
        mfe('my-mfe', {
            'index.js': './src/index.tsx',
        }),
    ],
})
```

### Basic runtime usage

```ts
// src/index.ts
import { bootstrap, getMfe, getShadow } from '@_apparatus_/mfe-tools'

// Get MFE name
console.log('MFE Name:', getMfe()) // 'my-mfe'

// Bootstrap creates the mount function
export default bootstrap({ mode: 'open' }, (shadow, params) => {
    // Access to default optional basePath param
    console.log('Base path', params.basePath)

    // Access shadow root anywhere
    console.log('Shadow:', getShadow())

    // Create content
    const div = document.createElement('div')
    div.textContent = `Hello from ${getMfe()}!`
    shadow.appendChild(div)

    // Return cleanup function
    return () => div.remove()
})
```

### Runtime parameters

```ts
// src/index.ts
import { bootstrap, type MfeModule } from '@_apparatus_/mfe-tools'
import App from './App'

// Define custom params type
type MyParams = {
    theme: 'light' | 'dark'
    apiUrl: string
    userId?: string
}

export default bootstrap<MyParams>({ mode: 'open' }, (shadow, params) => {
    // Access typed parameters
    const theme = params.theme ?? 'light'
    const apiUrl = params.apiUrl
    const userId = params.userId

    ...
})
```
