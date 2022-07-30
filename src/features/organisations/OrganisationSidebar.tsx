import { useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { CreateOrganisationModal } from './CreateOrganisation'
import { IOrganisation, IOrganisationRole, useGetOrganisationsQuery } from './orgnisationsApiSlice'

export const OrganisationSidebar = () => {
	const [orgsExpanded, setOrgsExpanded] = useState(true)
	const [createModalOpen, setCreateModalOpen] = useState(false)
	const { isLoading, data: organisations, refetch } = useGetOrganisationsQuery({})
	return (
		<>
			<li>
				<div
					className="grid grid-cols-[auto_1fr_auto]"
					onClick={() => setOrgsExpanded((prev) => !prev)}
				>
					<HiUserGroup /> <span>Organizations</span>
					<button
						className="btn btn-ghost btn-circle btn-sm"
						onClick={(e) => {
							e.stopPropagation()
							setCreateModalOpen(true)
						}}
					>
						<IoMdAdd size="1.5em" />
					</button>
				</div>
			</li>
			<CreateOrganisationModal
				open={createModalOpen}
				closeFn={() => setCreateModalOpen(false)}
				refetchFn={refetch}
			/>
			{isLoading ? (
				<></>
			) : (
				organisations &&
				(organisations as IOrganisationRole[]).map((orgRole) => (
					<li
						key={orgRole.organisation.id}
						className={'pl-10 ' + (orgsExpanded ? '' : 'hidden')}
					>
						<button>{orgRole.organisation.name}</button>
					</li>
				))
			)}
		</>
	)
}
