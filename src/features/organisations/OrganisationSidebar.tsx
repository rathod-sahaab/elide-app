import { useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { CreateOrganisationModal } from './CreateOrganisation'
import {
	clearActiveOrganisation,
	selectOrganisation,
	setActiveOrganisation,
} from './organisationsSlice'
import { IOrganisationRole, useGetOrganisationsQuery } from './orgnisationsApiSlice'

export const OrganisationSidebar = () => {
	const [orgsExpanded, setOrgsExpanded] = useState(true)
	const [createModalOpen, setCreateModalOpen] = useState(false)
	const { isLoading, data: organisations, refetch } = useGetOrganisationsQuery({})

	const dispatch = useAppDispatch()

	const stateOrgRole = useAppSelector(selectOrganisation)

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
				(organisations as IOrganisationRole[]).map((orgRole) => {
					const isActive =
						stateOrgRole.organisation &&
						orgRole.organisation.id === stateOrgRole.organisation.id
					return (
						<li
							key={orgRole.organisation.id}
							className={'pl-10 ' + (orgsExpanded ? '' : 'hidden')}
						>
							<button
								className={
									'flex items-center justify-between ' + (isActive ? 'active' : '')
								}
								onClick={() => {
									if (!isActive) {
										dispatch(setActiveOrganisation(orgRole))
									}
								}}
							>
								<span>
									{orgRole.organisation.name}
									<span className="italic opacity-70"> #{orgRole.organisation.id}</span>
								</span>
								{isActive && (
									<button
										className="btn btn-circle btn-xs"
										onClick={(e) => {
											e.stopPropagation()
											dispatch(clearActiveOrganisation())
										}}
									>
										<IoMdClose size="1.2em" />
									</button>
								)}
							</button>
						</li>
					)
				})
			)}
		</>
	)
}
