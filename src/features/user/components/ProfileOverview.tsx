import { IUserProfile, useGetProfileQuery } from '../userApiSlice'

export const ProfileOverview = () => {
	const { data, isLoading } = useGetProfileQuery({})
	const profile = data as IUserProfile

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="rounded-btn m-auto max-w-md bg-base-200 p-4 shadow-md">
			<h1 className="text-2xl">{profile.name}</h1>
			<h3>{profile.email}</h3>
		</div>
	)
}
