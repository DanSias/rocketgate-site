// apps/docs/next.config.mjs
import createMDX from '@next/mdx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const monorepoRoot = path.join(__dirname, '../../')

// Helper: try to import a module; return null if it's missing
async function tryImport(mod) {
  try {
    const m = await import(mod)
    return m?.default ?? m
  } catch {
    return null
  }
}

export default (async () => {
  // Try to load your Protocol MDX/search modules; they’re optional
  const recma = await tryImport('./src/mdx/recma.mjs')
  const rehype = await tryImport('./src/mdx/rehype.mjs')
  const remark = await tryImport('./src/mdx/remark.mjs')
  const withSearch = await tryImport('./src/mdx/search.mjs') // should export a fn (config) => config

  const withMDX = createMDX({
    options: {
      remarkPlugins: remark?.remarkPlugins ?? [],
      rehypePlugins: rehype?.rehypePlugins ?? [],
      recmaPlugins: recma?.recmaPlugins ?? []
    }
  })

  /** @type {import('next').NextConfig} */
  const baseConfig = {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    outputFileTracingRoot: monorepoRoot,
    // Keep MDX files in tracing so serverless output finds them
    outputFileTracingIncludes: {
      '/**/*': ['./src/app/**/*.mdx']
    }
  }

  // Compose: withMDX first, then optional search wrapper if available
  const wrapped = withMDX(baseConfig)
  return typeof withSearch === 'function' ? withSearch(wrapped) : wrapped
})()