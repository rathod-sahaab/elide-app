import { useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks/use-app-dispacth-selector'
import { openCreateOrganisationModal } from '../../app/ui/uiSlice'
import { clearActiveProject } from '../projects/projectsSlice'
import { CreateOrganisationModal } from './CreateOrganisation'
import {
	clearActiveOrganisation,
	selectOrganisation,
	setActiveOrganisation,
} from './organisationsSlice'
import { IOrganisationRole, useGetOrganisationsQuery } from './orgnisationsApiSlice'

export const OrganisationSidebar = () => {
	const [orgsExpanded, setOrgsExpanded] = useState(true)
	const { isLoading, data: organisations, refetch } = useGetOrganisationsQuery({})

	const dispatch = useAppDispatch()

	const stateOrgRole = useAppSelector(selectOrganisation)

	return (
		<>
			<li>
				<NavLink to="/organisations" className="grid grid-cols-[auto_1fr_auto]" end={true}>
					<HiUserGroup /> <span>Organizations</span>
					<span>
						<button
							className="btn btn-ghost btn-circle btn-sm"
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								dispatch(openCreateOrganisationModal())
							}}
						>
							<IoMdAdd size="1.5em" />
						</button>
						{organisations && organisations.length > 0 && (
							<button
								className="btn btn-ghost btn-circle btn-sm ml-2"
								onClick={(e) => {
									e.stopPropagation()
									e.preventDefault()
									setOrgsExpanded((prev) => !prev)
								}}
							>
								{orgsExpanded ? (
									<MdOutlineArrowDropUp size="1.5em" />
								) : (
									<MdOutlineArrowDropDown size="1.5em" />
								)}
							</button>
						)}
					</span>
				</NavLink>
			</li>
			<CreateOrganisationModal refetchFn={refetch} />
			{isLoading ? (
				<></>
			) : (
				organisations &&
				(organisations as IOrganisationRole[]).map((orgRole) => {
					const isActiveOrganisation =
						stateOrgRole.organisation &&
						orgRole.organisation.id === stateOrgRole.organisation.id

					const { organisation } = orgRole

					return (
						<li
							key={organisation.id}
							className={'pl-10 ' + (orgsExpanded || isActiveOrganisation ? '' : 'hidden')}
						>
							<NavLink
								to={`/organisations/${organisation.id}`}
								className={
									'flex items-center justify-between [&:hover>.btn]:opacity-100 [&:hover>.link]:underline'
								}
							>
								<span>
									{organisation.name}
									<span className="italic opacity-70"> #{organisation.id}</span>
								</span>
								{isActiveOrganisation ? (
									<button
										className="btn btn-circle btn-xs"
										onClick={(e) => {
											e.stopPropagation()
											e.preventDefault()
											dispatch(clearActiveOrganisation())
											dispatch(clearActiveProject())
										}}
									>
										<IoMdClose size="1.2em" />
									</button>
								) : (
									<button
										className="btn btn-circle btn-xs opacity-30"
										onClick={(e) => {
											e.stopPropagation()
											e.preventDefault()
											dispatch(setActiveOrganisation(orgRole))
											dispatch(clearActiveProject())
										}}
									>
										<IoMdCheckmark size="1.2em" />
									</button>
								)}
							</NavLink>
						</li>
					)
				})
			)}
		</>
	)
}
