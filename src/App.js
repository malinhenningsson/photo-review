import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/scss/app.scss'
import Albums from './components/Albums'
import Frontpage from './components/Frontpage'
import Login from './components/Login'
import Logout from './components/Logout'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import Register from './components/Register'
import Upload from './components/Upload'

function App() {
  return (
    <Router>
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

          <Route path="/logout">
            <Logout />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/Albums">
            <Albums />
          </Route>

          <Route path="/Upload">
            <Upload />
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
    </Router>


  );
}

export default App;
