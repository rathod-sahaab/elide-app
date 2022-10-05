import { Navigate, Route, Routes } from 'react-router-dom'
import { OutletLayout } from './components/Layout'
import { Home } from './components/pages/public/Home/Home'
import { Dashboard } from './components/pages/auth/Dashboard'
import { LoginPage } from './features/auth/Login'
import { RegisterPage } from './features/auth/Register'
import { AdaptAuth, RequireAuth, RequireNoAuth } from './features/auth/RequireAuth'
import { About } from './components/pages/public/About'
import { NotFound } from './components/pages/public/404'
import { Organisations } from './features/organisations/components/Organisations'
import { Organisation } from './features/organisations/components/Organisation'
import { OrganisationMembers } from './features/organisations/components/OrganisationMembers'
import { OrganisationInvitations } from './features/organisations/components/OrganisationInvitations'
import { UserInvitations } from './features/user/InvitationsPage'
import { Profile } from './components/pages/auth/Profile'
import { VerifyAccount } from './components/pages/public/VerifyAccount'
import { Analytics } from './features/analytics/components/Analytics'
import { ResetPasswordPage } from './components/pages/public/ForgotPasswordChange'
import { ForgotPasswordPage } from './features/auth/components/pages/ForgotPassword'

function App() {
	return (
		<Routes>
			<Route path="/" element={<OutletLayout />}>
				{/*General routes*/}
				<Route index element={<Home />} />

				{/*Adapt to auth state routes*/}
				<Route element={<AdaptAuth />}>
					<Route path="about" element={<About />} />
				</Route>

				{/*Unauthenticated Routes*/}
				<Route element={<RequireNoAuth />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="forgot-password" element={<ForgotPasswordPage />} />
					<Route path="account/verify" element={<VerifyAccount />} />
					<Route path="account/reset-password" element={<ResetPasswordPage />} />
				</Route>

				{/*Authehticated Routes*/}
				<Route element={<RequireAuth />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="profile" element={<Profile />} />
					<Route path="invitations" element={<UserInvitations />} />
					<Route path="links">
						<Route path=":linkId">
							<Route path="analytics" element={<Analytics />} />
						</Route>
					</Route>
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
