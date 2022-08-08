import { NavLink } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import { IoGrid, IoInformationCircle, IoPerson } from 'react-icons/io5'
import { OrganisationSidebar } from '../features/organisations/OrganisationSidebar'
import { InvitationsSidebar } from '../features/user/InvitationsSidebar'
import { ProjectsSidebar } from '../features/projects/components/ProjectsSidebar'
import { Logout } from '../features/auth/Logout'

const SidebarItems = () => {
	return (
		<div className="drawer-side">
			<label htmlFor="drawer-1" className="drawer-overlay "></label>
			<div className="flex w-80 flex-col justify-between bg-base-200 text-base-content">
				<ul className="menu overflow-y-auto p-4">
					<label
						htmlFor="drawer-1"
						className="drawer-button btn btn-circle btn-ghost text-xl lg:hidden"
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
					<InvitationsSidebar />
					<OrganisationSidebar />
					<ProjectsSidebar />
				</ul>
				<ul className="menu overflow-y-auto p-4">
					<li>
						<Logout />
					</li>
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
		<div className="drawer-mobile drawer">
			<input id="drawer-1" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex h-screen flex-col">{children}</div>
			<SidebarItems />
		</div>
	)
}

export default Sidebar
