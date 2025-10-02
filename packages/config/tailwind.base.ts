import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const base: Partial<Config> = {
  content: [
    './app/**/*.{ts,tsx,mdx,md}',
    './components/**/*.{ts,tsx,mdx,md}',
    './src/**/*.{ts,tsx,mdx,md}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--rg-color-bg))',
        fg: 'rgb(var(--rg-color-fg))',
        primary: 'rgb(var(--rg-color-primary))',
        accent: 'rgb(var(--rg-color-accent))',
        warm: 'rgb(var(--rg-color-warm))'
      },
      borderRadius: {
        rg: 'var(--rg-radius)'
      },
      boxShadow: {
        rg: 'var(--rg-shadow)'
      },
      fontSize: {
        xs: 'var(--rg-text-xs)',
        sm: 'var(--rg-text-sm)',
        base: 'var(--rg-text-base)',
        lg: 'var(--rg-text-lg)',
        xl: 'var(--rg-text-xl)',
        '2xl': 'var(--rg-text-2xl)',
        '3xl': 'var(--rg-text-3xl)'
      }
    }
  },
  plugins: [
    plugin(function (api: PluginAPI) {
      api.addBase({
        ':root': { 'color-scheme': 'light dark' },
        'html, body': { '@apply bg-bg text-fg': {} }
      })
    })
  ]
}

export default base