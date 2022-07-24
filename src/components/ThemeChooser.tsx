import { THEMES, useTheme } from '../hooks/use-theme'
import { HiOutlineColorSwatch } from 'react-icons/hi'

export default function ThemeChooser() {
	const { theme, setTheme } = useTheme()
	return (
		<div className="dropdown dropdown-left">
			<button tabIndex={0} className="btn btn-ghost">
				<HiOutlineColorSwatch size="1.5em" />
				<span className="mx-2 hidden lg:inline">Change Theme</span>
			</button>
			<ul className="p-2 shadow-lg menu z-50 dropdown-content bg-base-200 rounded-box w-52">
				{THEMES.map((themeOption) => {
					return (
						<li key={themeOption.toString()}>
							<button
								onClick={() => setTheme(themeOption)}
								className={`btn ${themeOption === theme ? 'btn-primary' : 'btn-ghost'}`}
							>
								{themeOption}
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
