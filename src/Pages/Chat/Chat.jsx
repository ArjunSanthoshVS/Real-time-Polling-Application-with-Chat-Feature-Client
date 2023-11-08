import './Chat.css'
import { useEffect, useState } from "react"
import Contacts from "../../Components/Contacts/Contacts"
import axios from "axios"
import { io } from 'socket.io-client'
import Welcome from "../../Components/Welcome/Welcome"
import ChatContainer from "../../Components/ChatConatiner/ChatContainer"
import { useNavigate } from 'react-router-dom'
const socket = io("http://localhost:3000")

const Chat = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)

  useEffect(() => {
    if (user) {
      const details = async () => {
        const response = await axios.get(`http://localhost:3000/chat/allContacts?id=${user?.user?._id}`)
        setContacts(response.data)
      }
      details()
    }
  }, [])

  useEffect(() => {
    if (user) {
      socket.emit("add-user", user?.user?._id)
    }
  })
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <>
      <button onClick={() => navigate('/poll')}>Polling Section</button>
      <button onClick={handleLogout}>Logout</button>
      <div className="container">
        <div>
          <Contacts currentUser={user?.user} contacts={contacts} changeChat={handleChatChange} />
        </div>
        <div>
          {
            currentChat === undefined ?
              <Welcome currentUser={user?.user} /> :
              <ChatContainer currentChat={currentChat} currentUser={user?.user} socket={socket} />
          }
        </div>
      </div>
    </>
  )
}

export default Chat
