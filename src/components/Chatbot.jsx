import { useState } from "react";

export default function Chatbot({ th, WT, crops }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I am your farming assistant 🌾" }
  ]);
  const [input, setInput] = useState("");

  const getReply = (msg) => {
  msg = msg.toLowerCase();

  if (msg.includes("weather") || msg.includes("rain")) {
    return `Current weather is ${WT.temp}°C with ${WT.cond}.`;
  }

  if (msg.includes("crop")) {
    return `Recommended crops: ${crops.join(", ")}`;
  }

  if (msg.includes("irrigation")) {
    return `Based on weather, irrigation is advised today.`;
  }

  if (msg.includes("market")) {
    return "Market prices are improving this week 📈";
  }

  return "Ask me about weather, crops, irrigation or market 🌾";
};

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getReply(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
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
          fontSize: 18
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
          width: 300,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          padding: 10
        }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>
            Farmer Assistant 🌾
          </div>

          <div style={{
            height: 200,
            overflowY: "auto",
            fontSize: 14,
            marginBottom: 8
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                textAlign: m.from === "user" ? "right" : "left",
                marginBottom: 6
              }}>
                <span style={{
                  background: m.from === "user" ? "#16a34a" : "#eee",
                  color: m.from === "user" ? "#fff" : "#000",
                  padding: "6px 10px",
                  borderRadius: 8,
                  display: "inline-block"
                }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: 6 }}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}