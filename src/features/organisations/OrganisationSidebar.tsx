import { useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
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
				<NavLink to="/organisations" className="grid grid-cols-[auto_1fr_auto_auto]" end={true}>
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
					<button
						className="btn btn-ghost btn-circle btn-sm"
						onClick={() => setOrgsExpanded((prev) => !prev)}
					>
						{orgsExpanded ? (
							<MdOutlineArrowDropUp size="1.5em" />
						) : (
							<MdOutlineArrowDropDown size="1.5em" />
						)}
					</button>
				</NavLink>
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

					const { organisation } = orgRole

					return (
						<li key={organisation.id} className={'pl-10 ' + (orgsExpanded ? '' : 'hidden')}>
							<div
								className={
									'flex items-center justify-between [&:hover>.btn]:opacity-100 [&:hover>.link]:underline ' +
									(isActive ? 'active' : '')
								}
							>
								<NavLink
									to={`/organisations/${organisation.id}`}
									className={({ isActive }) =>
										'link no-underline' + (isActive ? ' text-primary' : '')
									}
								>
									{organisation.name}
									<span className="italic opacity-70"> #{organisation.id}</span>
								</NavLink>
								{isActive ? (
									<button
										className="btn btn-circle btn-xs"
										onClick={(e) => {
											e.stopPropagation()
											dispatch(clearActiveOrganisation())
										}}
									>
										<IoMdClose size="1.2em" />
									</button>
								) : (
									<button
										className="btn btn-circle btn-xs opacity-30"
										onClick={(e) => {
											e.stopPropagation()
											dispatch(setActiveOrganisation(orgRole))
										}}
									>
										<IoMdCheckmark size="1.2em" />
									</button>
								)}
							</div>
						</li>
					)
				})
			)}
		</>
	)
}
