import { Link } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import { IoGrid, IoInformationCircle, IoPerson } from 'react-icons/io5'
import { HiUserGroup } from 'react-icons/hi'
import { FiChevronDown } from 'react-icons/fi'

const SidebarItems = () => {
	return (
		<div className="drawer-side">
			<label htmlFor="drawer-1" className="drawer-overlay "></label>
			<div className="flex w-80 flex-col justify-between bg-base-200 text-base-content">
				<ul className="menu overflow-y-auto p-4">
					<label
						htmlFor="drawer-1"
						className="btn btn-ghost btn-circle drawer-button text-xl lg:hidden"
					>
						<IoMdClose />
					</label>
					<li>
						<Link to="/dashboard">
							<IoGrid /> Dashboard
						</Link>
					</li>
					<li>
						<Link to="/profile">
							<IoPerson /> Profile
						</Link>
					</li>
					<li>
						<div>
							<HiUserGroup /> Organizations <FiChevronDown className="flex" />
						</div>
					</li>
				</ul>
				<ul className="menu overflow-y-auto p-4">
					<li>
						<Link to="/about">
							<IoInformationCircle /> About
						</Link>
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
			<div className="drawer-content flex flex-col">{children}</div>
			<SidebarItems />
		</div>
	)
}

export default Sidebar
