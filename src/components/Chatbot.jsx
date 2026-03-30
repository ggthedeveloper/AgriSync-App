import { useState } from "react";

export default function Chatbot({ th, WT, crops }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I am your farming assistant 🌾" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("weather") || msg.includes("rain")) {
      return `Current weather is ${WT?.t || "N/A"}°C with ${WT?.c || "clear sky"}.`;
    }

    if (msg.includes("crop")) {
      return `Recommended crops: ${crops.map(c => c.name).join(", ")}`;
    }

    if (msg.includes("irrigation")) {
      return `Based on weather, irrigation is advised today 💧`;
    }

    if (msg.includes("market")) {
      return "Market prices are improving this week 📈";
    }

    return "Ask me about weather, crops, irrigation or market 🌾";
  };

  const sendMessage = () => {
    if (!input) return;

    const userText = input;
    const userMsg = { from: "user", text: userText };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg = { from: "bot", text: getReply(userText) };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#16a34a",
          color: "#fff",
          padding: 14,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        🤖
      </div>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          width: 320,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          padding: 12
        }}>

          {/* Header */}
          <div style={{
            fontWeight: 700,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            🤖 Farmer Assistant
          </div>

          {/* Messages */}
          <div style={{
            height: 220,
            overflowY: "auto",
            fontSize: 14,
            marginBottom: 8
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                marginBottom: 8
              }}>
                <div style={{
                  maxWidth: "75%",
                  padding: "8px 12px",
                  borderRadius: 12,
                  background: m.from === "user"
                    ? "linear-gradient(135deg, #16a34a, #22c55e)"
                    : "#f1f5f9",
                  color: m.from === "user" ? "#fff" : "#000",
                  fontSize: 14,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing animation */}
            {typing && (
              <div style={{
                fontSize: 13,
                color: "#888",
                marginBottom: 6
              }}>
                🤖 typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 6 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: "1px solid #ccc"
              }}
              placeholder="Ask something..."
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}