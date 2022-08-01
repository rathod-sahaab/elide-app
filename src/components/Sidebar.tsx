import { NavLink } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import { IoGrid, IoInformationCircle, IoPerson } from 'react-icons/io5'
import { OrganisationSidebar } from '../features/organisations/OrganisationSidebar'

const SidebarItems = () => {
	return (
		<div className="drawer-side">
			<label htmlFor="drawer-1" className="drawer-overlay "></label>
			<div className="flex w-80 flex-col justify-between bg-base-200 text-base-content">
				<ul className="menu overflow-y-auto p-4">
					<label
						htmlFor="drawer-1"
						className="btn btn-circle drawer-button btn-ghost text-xl lg:hidden"
					>
						<IoMdClose />
					</label>
					<li>
						<NavLink to="/dashboard">
							<IoGrid /> Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink to="/profile">
							<IoPerson /> Profile
						</NavLink>
					</li>
					<OrganisationSidebar />
				</ul>
				<ul className="menu overflow-y-auto p-4">
					<li>
						<NavLink to="/about">
							<IoInformationCircle /> About
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	)
}
const Sidebar = ({ children }: React.PropsWithChildren) => {
	return (
		<div className="drawer drawer-mobile">
			<input id="drawer-1" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex h-screen flex-col">{children}</div>
			<SidebarItems />
		</div>
	)
}

export default Sidebar
