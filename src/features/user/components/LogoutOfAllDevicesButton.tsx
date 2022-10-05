import { FiLogOut } from 'react-icons/fi'
import { useAppDispatch } from '../../../app/hooks/use-app-dispacth-selector'
import { openLogoutOfAllDevicesModal } from '../../../app/ui/uiSlice'
import { LogoutOfAllDevicesModal } from './LogoutOfAllDevicesModal'

export const LogoutOfAllDevicesButton = () => {
	const dispatch = useAppDispatch()

	return (
		<>
			<button
				className="btn btn-outline w-full font-normal"
				onClick={() => {
					dispatch(openLogoutOfAllDevicesModal())
				}}
			>
				<FiLogOut size="1.5em" className="mr-2" />
				Log out of all devices
			</button>
			<LogoutOfAllDevicesModal />
		</>
	)
}
