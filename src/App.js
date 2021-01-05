import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/scss/app.scss'
import Album from './components/albums/Album'
import Albums from './components/albums/Albums'
import AuthContextProvider from './contexts/AuthContext'
import Frontpage from './components/Frontpage'
import Login from './components/Authentication/Login'
import Logout from './components/Authentication/Logout'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import ProtectedRoute from './components/Authentication/ProtectedRoute'
import Register from './components/Authentication/Register'
import Upload from './components/upload/Upload'

function App() {
  return (
	<Router>
		<AuthContextProvider>
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

				<ProtectedRoute path="/logout">
					<Logout />
				</ProtectedRoute>

				<ProtectedRoute path="/profile">
					<Profile />
				</ProtectedRoute>

				<ProtectedRoute path="/albums">
					<Route path="/">
						<Albums />
					</Route>

					<Route path="/:albumId">
						<Album />
					</Route>
				</ProtectedRoute>

				<ProtectedRoute path="/upload">
					<Upload />
				</ProtectedRoute>

				<Route path="*" element={<NotFound />} />

			</Routes>
		</AuthContextProvider>
	</Router>


  );
}

export default App;
