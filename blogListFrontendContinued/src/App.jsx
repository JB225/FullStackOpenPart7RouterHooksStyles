import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import IndividualUser from './components/IndividualUser'
import IndividualBlog from './components/IndividualBlog'

const App = () => {
  const user = useSelector(state => state.currentUser)

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path ="/users/:id" element={user ? <IndividualUser /> : <LoginForm />} />
          <Route path="/blogs/:id" element={user ? <IndividualBlog /> : <LoginForm />} />
          <Route path="/blogs" element={user ? <BlogList /> : <LoginForm />}/>
          <Route path="/users" element={user ? <UserList /> : <LoginForm />}/>
          <Route path="/" element={<LoginForm />}/>
        </Routes>
      </Router>
    </div>
  )

}

export default App