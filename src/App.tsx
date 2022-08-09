import { Navigate, Route, Routes } from 'react-router-dom'
import { OutletLayout } from './components/Layout'
import { Home } from './components/pages/public/Home'
import { Dashboard } from './components/pages/auth/Dashboard'
import { LoginPage } from './features/auth/Login'
import { RegisterPage } from './features/auth/Register'
import { RequireAuth, RequireNoAuth } from './features/auth/RequireAuth'
import { About } from './components/pages/public/About'
import { NotFound } from './components/pages/public/404'
import { Organisations } from './features/organisations/components/Organisations'
import { Organisation } from './features/organisations/components/Organisation'
import { OrganisationMembers } from './features/organisations/components/OrganisationMembers'
import { OrganisationInvitations } from './features/organisations/components/OrganisationInvitations'
import { UserInvitations } from './features/user/InvitationsPage'

function App() {
	return (
		<Routes>
			<Route path="/" element={<OutletLayout />}>
				{/*General routes*/}
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />

				{/*Unauthenticated Routes*/}
				<Route element={<RequireNoAuth />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
				</Route>

				{/*Authehticated Routes*/}
				<Route element={<RequireAuth />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="invitations" element={<UserInvitations />} />
					<Route path="organisations">
						<Route index element={<Organisations />} />
						<Route path=":organisationId" element={<Organisation />}>
							<Route path="members" element={<OrganisationMembers />} />
							<Route path="invitations" element={<OrganisationInvitations />} />
							<Route path="*" element={<Navigate to="members" replace />} />
							<Route index element={<Navigate to="members" replace />} />
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
