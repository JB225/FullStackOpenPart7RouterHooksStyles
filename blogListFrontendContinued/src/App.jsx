import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

const App = () => {
  const user = useSelector(state => state.currentUser)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <BlogList /> : <LoginForm />}/>
        <Route path="/users" element={user ? <UserList /> : <LoginForm />}/>
      </Routes>
    </Router>
  )

}

export default App