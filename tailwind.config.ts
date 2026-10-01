import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ink: '#142321',
        mist: '#f6f7f5',
        sage: '#dfe9e5',
        line: '#e5e8e6',
      },
      boxShadow: { soft: '0 8px 28px rgba(20,35,33,.045)' },
    },
  },
}
