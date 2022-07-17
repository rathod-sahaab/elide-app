import ThemeChooser from './ThemeChooser'

const Navbar = () => {
	return (
		<div className="navbar bg-base-100 sticky">
			<div className="navbar-start">
				<label
					tabIndex={0}
					className="btn btn-ghost btn-circle drawer-button lg:hidden"
					htmlFor="drawer-1"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</label>
				<span className="font-bold pl-2">elide.in</span>
			</div>
			<div className="navbar-end">
				<ThemeChooser />
			</div>
		</div>
	)
}

export default Navbar
