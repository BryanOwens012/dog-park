const tailwindConfig = require('../../tailwind.config.js')

describe('Tailwind Configuration', () => {
  it('has correct content paths', () => {
    expect(tailwindConfig.content).toEqual([
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ])
  })

  it('has theme extensions', () => {
    expect(tailwindConfig.theme).toBeDefined()
    expect(tailwindConfig.theme.extend).toBeDefined()
  })

  it('has font family configuration', () => {
    expect(tailwindConfig.theme.extend.fontFamily).toBeDefined()
    expect(tailwindConfig.theme.extend.fontFamily.sans).toEqual(['arial', 'sans-serif'])
  })

  it('has plugins array', () => {
    expect(Array.isArray(tailwindConfig.plugins)).toBe(true)
  })

  it('exports a valid configuration object', () => {
    expect(typeof tailwindConfig).toBe('object')
    expect(tailwindConfig).not.toBeNull()
  })
})
