import { useEffect, useRef, useState } from "react"
import ChatInput from "../ChatInput/ChatInput"
import axios from "axios"

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const name = currentChat.name
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(() => {
        if (currentChat) {
            const getMessages = async () => {
                console.log(currentUser._id, currentChat._id);
                try {
                    const response = await axios.get("http://localhost:3000/chat/getAllMessage", {
                        params: {
                            from: currentUser._id,
                            to: currentChat._id
                        }
                    });
                    setMessages(response.data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };
            getMessages();
        }
    }, [currentChat, currentUser._id]);


    const handleSendMsg = async (msg) => {
        await axios.post("http://localhost:3000/chat/addMessage", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        socket.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        })
        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    }

    useEffect(() => {
        if (socket) {
            socket.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <div>
            <div className="chat-header">
                <div className="user-details">
                    <div className="userName">
                        <h5>{name}</h5>
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={message}>
                            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatContainer
