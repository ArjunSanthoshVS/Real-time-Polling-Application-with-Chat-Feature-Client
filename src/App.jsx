import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './Pages/Register/Register'
import Chat from './Pages/Chat/Chat'
import Login from './Pages/Login/Login'
import Poll from './Pages/Poll/Poll'
function App() {

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <>
      <Routes>
        {user && <Route path="/" exact element={<Chat />} />}
        {user && <Route path="/poll" exact element={<Poll />} />}
        {user && <Route path="/register" exact element={<Navigate replace to='/' />} />}
        {user && <Route path="/login" exact element={<Navigate replace to='/' />} />}
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to='/login' />} />
        <Route path="/poll" exact element={<Navigate replace to='/login' />} />
      </Routes>
    </>
  )
}

export default App
