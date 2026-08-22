import React, { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { user: message }];
    setChat(newChat);

    const res = await fetch("https://lms-xy4t.onrender.com/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat([...newChat, { bot: data.reply }]);
    setMessage("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px" }}>
      <h3>AI Learning Assistant</h3>

      <div style={{ height: "200px", overflowY: "auto" }}>
        {chat.map((c, index) => (
          <div key={index}>
            {c.user && <p><b>You:</b> {c.user}</p>}
            {c.bot && <p><b>AI:</b> {c.bot}</p>}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about this course..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}