import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/scss/app.scss'
import Frontpage from './components/Frontpage'
import Navigation from './components/Navigation'
import Register from './components/Register'

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

        </Routes>
    </Router>


  );
}

export default App;
