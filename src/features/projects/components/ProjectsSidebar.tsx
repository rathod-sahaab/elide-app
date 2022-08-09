import { useState } from 'react'
import { GoProject } from 'react-icons/go'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/use-app-dispacth-selector'
import { openCreateProjectModal } from '../../../app/ui/uiSlice'
import { selectOrganisation } from '../../organisations/organisationsSlice'
import { IProject, useGetProjectsQuery } from '../projectsApiSlice'
import { clearActiveProject, selectActiveProject, setActiveProject } from '../projectsSlice'
import { CreateProjectModal } from './forms/CreateProjectForm'

export const ProjectsSidebar = () => {
	const organisation = useAppSelector(selectOrganisation)

	const activeProject = useAppSelector(selectActiveProject)

	const {
		isLoading,
		data: projects,
		refetch,
	} = useGetProjectsQuery({ offset: 0, limit: 10, organisationId: organisation.organisation?.id })

	const dispatch = useAppDispatch()

	const [projectsExpanded, setProjectsExpanded] = useState(true)
	return (
		<>
			<li>
				<div className="grid grid-cols-[auto_1fr_auto]">
					<GoProject /> <span>Projects</span>
					<span>
						<button
							className="btn btn-ghost btn-circle btn-sm"
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								dispatch(openCreateProjectModal())
							}}
						>
							<IoMdAdd size="1.5em" />
						</button>
						{projects && projects.length > 0 && (
							<button
								className="btn btn-ghost btn-circle btn-sm ml-2"
								onClick={(e) => {
									e.stopPropagation()
									e.preventDefault()
									setProjectsExpanded((prev) => !prev)
								}}
							>
								{projectsExpanded ? (
									<MdOutlineArrowDropUp size="1.5em" />
								) : (
									<MdOutlineArrowDropDown size="1.5em" />
								)}
							</button>
						)}
					</span>
				</div>
			</li>
			<CreateProjectModal refetchFn={refetch} />
			{isLoading ? (
				<></>
			) : (
				projects &&
				(projects as IProject[]).map((project) => {
					const isActiveProject = activeProject.project?.id === project.id

					return (
						<li
							key={project.id}
							className={'pl-10 ' + (projectsExpanded || isActiveProject ? '' : 'hidden')}
						>
							<div className="flex items-center justify-between [&:hover>.btn]:opacity-100 [&:hover>.link]:underline">
								<span>
									{project.name}
									<span className="italic opacity-70"> #{project.id}</span>
								</span>
								{isActiveProject ? (
									<button
										className="btn btn-circle btn-xs"
										onClick={(e) => {
											e.stopPropagation()
											e.preventDefault()
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
											dispatch(setActiveProject(project))
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
