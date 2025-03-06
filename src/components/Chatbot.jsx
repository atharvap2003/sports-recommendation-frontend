import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, MessageCircle, RefreshCcw } from "lucide-react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! What would you like to check?", sender: "bot" },
    { text: "📦 Equipments", sender: "bot", type: "option" },
    { text: "🎉 Events", sender: "bot", type: "option" },
  ]);
  const [input, setInput] = useState("");
  const [equipments, setEquipments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Toggle Chat Window
  const toggleChat = () => setIsOpen((prev) => !prev);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const equipmentRes = await axios.get("http://localhost:5000/api/user/equipments");
        setEquipments(equipmentRes.data);
        console.log(equipmentRes.data);

        const eventsRes = await axios.get("http://localhost:5000/api/user/events");
        console.log(eventsRes.data);
         setEvents(eventsRes.data) // Ensure the correct path to the events array

        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto Scroll to Bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Send User Message and Bot Reply
  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, sender: "user" }]);

    if (text === "📦 Equipments") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Choose an equipment:", sender: "bot" },
          ...equipments.map((eq) => ({
            text: eq.equipmentname,
            sender: "bot",
            type: "option",
          })),
        ]);
      }, 500);
    } else if (text === "🎉 Events") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Current events:", sender: "bot" },
          ...events.map((ev) => ({
            text: ev.title,
            sender: "bot",
            type: "option",
          })),
        ]);
      }, 500);
    } else {
      const selectedEquipment = equipments.find((eq) => eq.equipmentname === text);
      const selectedEvent = events.find((ev) => ev.title === text);

      if (selectedEquipment) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: `📢 ${text} Available: ${selectedEquipment.availableQuantity}`, sender: "bot" },
          ]);
        }, 500);
      } else if (selectedEvent) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: `🎉 ${text} is one of our current events.`, sender: "bot" },
          ]);
        }, 500);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "❌ Sorry, I couldn't find that.", sender: "bot" },
        ]);
      }
    }
    setInput("");
  };

  // Restart Chat
  const restartChat = () => {
    setMessages([
      { text: "Hello! What would you like to check?", sender: "bot" },
      { text: "📦 Equipments", sender: "bot", type: "option" },
      { text: "🎉 Events", sender: "bot", type: "option" },
    ]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      {/* Floating Chat Button */}
      <button className="chatbot-button" onClick={toggleChat}>
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Chatbot</span>
            <button onClick={restartChat}>
              <RefreshCcw size={18} />
            </button>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {loading && <div className="chat-message bot">Loading data...</div>}
            {messages.map((msg, index) =>
              msg.type === "option" ? (
                <div
                  key={index}
                  className="chat-message bot option"
                  onClick={() => sendMessage(msg.text)}
                >
                  {msg.text}
                </div>
              ) : (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              )
            )}
          </div>

          {/* Chat Footer with Input, Send & Restart Buttons */}
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)}>
              <Send size={18} />
            </button>
            <button className="restart-button" onClick={restartChat}>
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
