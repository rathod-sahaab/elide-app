import React from 'react'

export const THEMES = ['dark', 'light', 'black', 'corporate', 'garden', 'night'] as const

export type ThemeType = typeof THEMES[number]

export type ThemeContextType = {
	theme: ThemeType
	setTheme: (theme: ThemeType) => void
}

export function useTheme() {
	return React.useContext(ThemeContext) as ThemeContextType
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null)

const DEFAULT_THEME: ThemeType = 'dark'

export default function ThemeProvider({ children }: React.PropsWithChildren) {
	const [theme, setTheme] = React.useState<ThemeType>(
		(localStorage.getItem('theme') as ThemeType) ?? DEFAULT_THEME,
	)

	const updateTheme = (newTheme: ThemeType) => {
		localStorage.setItem('theme', newTheme)
		setTheme(newTheme)
	}
	return (
		<ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
