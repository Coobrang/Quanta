import React, { useEffect, useRef, useState } from "react";
import AiPersonal from '../../assets/ai-personal-assistant.webp';
import AiLogos from '../../assets/AI-logos.png';
import topicData from '../../Data/topicData.json';
import responsesData from "../../Data/responsesData.json";
import './MainContent.css'

const MainContent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);


  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      sender: 'user'
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage('');

    setTimeout(() => respond(message), 1000);
  };

  // AI Response
  const respond = (message) => {
    const normalizedMessage = message.toLowerCase().replace(/[^\w\s]/gi, "");
    const botMessage = {
      text: responsesData[normalizedMessage] || "I'm Sorry, I don't understand the question.",
      sender: 'bot'
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  
  // Reset Chat
  const resetChat = () => {
    const messageContainer = document.getElementById("messages");
    setMessages([]);
    messageContainer.style.height = "0px";
    messageContainer.style.padding = "0px";
  }

  useEffect(() => {
    const messageContainer = document.getElementById("messages");
    if(messages.length > 0 && (!messageContainer.style.height || messageContainer.style.height === "0px")){
      messageContainer.style.height = "200px";
      messageContainer.style.padding = "20px";
    }

    if(messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);


  return (
    <div className="content">

      <div className="image">
        <img src={AiPersonal} alt="Ai Personal Assistant"></img>
      </div>

      <div className="title">
        <h1>AI Personal Assistant</h1>
      </div>

      <div className="logos">
        <img src={AiLogos}></img>
      </div>

      {/* ChatBox */}
      <div className="chat-box">

        <div className="topics">
          <h4>Suggested Topics</h4>
          <ul>
            {topicData.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        <div className="box">
          <div className="header">
            <h3>How can I help you?</h3>
            <h4 id="resetChat" onClick={resetChat}>New Chat</h4>
          </div>

          <div className="messages" id="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}-message`}>
                {msg.text}
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </div>
          
          <div className="user-input">
            <input
              type="text"
              id="userInput"
              placeholder="Type your message..."
              value={message}
              onChange={handleMessageChange}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
            
          </div>

        </div>

      </div>

      <div className="spacer-inner"></div>

    </div>
  );
};

export default MainContent;
