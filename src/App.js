import { Routes, Route } from 'react-router-dom'
import './assets/scss/app.scss'
import Album from './components/albums/Album'
import Albums from './components/albums/Albums'
import AuthContextProvider from './contexts/AuthContext'
import EditAlbum from './components/albums/EditAlbum'
import ForgotPassword from './components/Authentication/ForgotPassword'
import Frontpage from './components/Frontpage'
import Login from './components/Authentication/Login'
import Logout from './components/Authentication/Logout'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/Authentication/ProtectedRoute'
import Register from './components/Authentication/Register'
import SimpleReactLightbox from "simple-react-lightbox";
import Upload from './components/upload/Upload'
import ReviewAlbum from './components/albums/ReviewAlbum'
import ReviewThanks from './components/albums/ReviewThanks'

function App() {
  return (
	<AuthContextProvider>
		<SimpleReactLightbox>
			<Navigation />

				<Routes>
					<Route path="/">
						<Frontpage />
					</Route>
					
					<Route path="/register">
						<Register />
					</Route>

					<Route path="/login">
						<Login />
					</Route>

					<Route path="/forgot-password">
						<ForgotPassword />
					</Route>

					<ProtectedRoute path="/logout">
						<Logout />
					</ProtectedRoute>

					<ProtectedRoute path="/albums">
						<Route path="/">
							<Albums />
						</Route>

						<Route path="/edit/:albumId">
							<EditAlbum />
						</Route>

						<Route path="/:albumId">
							<Album />
						</Route>
					</ProtectedRoute>

					<Route path="/review/:albumId">
						<ReviewAlbum />
					</Route>

					<Route path="/review/thanks">
						<ReviewThanks />
					</Route>

					<ProtectedRoute path="/upload">
						<Upload />
					</ProtectedRoute>

					<Route path="*" element={<NotFound />} />

				</Routes>
		</SimpleReactLightbox>
	</AuthContextProvider>
  );
}

export default App;
