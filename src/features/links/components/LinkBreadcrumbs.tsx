import { HiOutlineFolder, HiOutlineLink, HiOutlineUsers } from 'react-icons/hi'
import { useAppSelector } from '../../../app/hooks/use-app-dispacth-selector'
import { selectOrganisation } from '../../organisations/organisationsSlice'
import { selectActiveProject } from '../../projects/projectsSlice'

export const LinksBreadcrumbs = () => {
	const activeOrganisation = useAppSelector(selectOrganisation)
	const activeProject = useAppSelector(selectActiveProject)

	return (
		<div className="breadcrumbs overflow-visible">
			<ul>
				{activeOrganisation.organisation && (
					<li>
						<HiOutlineUsers className="mr-2" size="1.35em" />{' '}
						<span className="tooltip" data-tip="Selected Organization">
							{activeOrganisation.organisation.name}
						</span>
					</li>
				)}
				{activeProject.project && (
					<li>
						<HiOutlineFolder className="mr-2" size="1.35em" />
						<span className="tooltip" data-tip="Selected Project">
							{activeProject.project.name}
						</span>
					</li>
				)}
				<li>
					<HiOutlineLink className="mr-2" size="1.35em" /> Links
				</li>
			</ul>
		</div>
	)
}
