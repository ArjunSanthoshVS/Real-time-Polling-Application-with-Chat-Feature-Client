import { useState } from "react";

const ChatInput = ({ handleSendMsg }) => {
    const [msg, setMsg] = useState("");
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };
  return (
    <div>
          <form className="input-container" onSubmit={(event) => sendChat(event)}>
              <input
                  type="text"
                  placeholder="Type your message here"
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
              />
              <button className="submit">
                  Send
              </button>
          </form>
    </div>
  )
}

export default ChatInput
