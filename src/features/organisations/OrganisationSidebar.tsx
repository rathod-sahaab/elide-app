import { useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { CreateOrganisationModal } from './CreateOrganisation'

export const OrganisationSidebar = () => {
	const [createModalOpen, setCreateModalOpen] = useState(false)
	return (
		<>
			<li>
				<div className="grid grid-cols-[auto_1fr_auto]">
					<HiUserGroup /> <span>Organizations</span>
					<button
						className="btn btn-circle btn-ghost btn-sm"
						onClick={() => setCreateModalOpen(true)}
					>
						<IoMdAdd size="1.5em" />
					</button>
					<CreateOrganisationModal
						open={createModalOpen}
						closeFn={() => setCreateModalOpen(false)}
					/>
				</div>
			</li>
		</>
	)
}
