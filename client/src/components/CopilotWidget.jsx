import { useState, useEffect, useRef } from "react";
import styles from "../assets/CopilotWidget.module.css";

export default function CopilotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "copilot", text: "Hi! I'm your Copilot. Want to explore my portfolio?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("checking");
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedSession = localStorage.getItem("copilotSessionId");
    if (savedSession) setSessionId(savedSession);
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const res = await fetch(`${API_URL}/health`, { method: "GET" });
      const data = await res.json();
      setConnectionStatus(data.apiKeyConfigured ? "connected" : "error");
    } catch {
      setConnectionStatus("error");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || loading || connectionStatus !== "connected") return;

    // ✅ sanitize input
    const userMessage = String(input.trim());

    // ✅ safe payload
    const payload = {
      message: userMessage,
      sessionId: sessionId || null,
    };

    setMessages(prev => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (!sessionId && data.sessionId) {
          setSessionId(data.sessionId);
          localStorage.setItem("copilotSessionId", data.sessionId);
        }
        setMessages(prev => [...prev, { from: "copilot", text: data.message }]);
      } else {
        setMessages(prev => [...prev, { from: "copilot", text: `⚠️ ${data.error}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { from: "copilot", text: "❌ Could not connect to server." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = async () => {
    setMessages([{ from: "copilot", text: "Hi! I'm your Copilot. Want to explore my portfolio?" }]);
    if (sessionId) {
      try {
        await fetch(`${API_URL}/conversation/${sessionId}`, { method: "DELETE" });
      } catch (err) {
        console.error("Error clearing conversation:", err);
      }
    }
    setSessionId(null);
    localStorage.removeItem("copilotSessionId");
  };

  return (
    <div className={styles.widget}>
      {!open && (
        <button className={styles.floatingBtn} onClick={() => setOpen(true)}>
          <span className={styles.emoji}>🤖</span>
        </button>
      )}

      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <span>Copilot</span>
            <div className={styles.headerButtons}>
              <button onClick={startNewChat} className={styles.newChatBtn} title="Start new chat">✕</button>
              <button onClick={() => setOpen(false)} className={styles.closeBtn}>✕</button>
            </div>
          </div>

          <div className={styles.chatBox}>
            {connectionStatus === "checking" && (
              <div style={{ textAlign: "center", padding: "10px", color: "#666" }}>
                Checking connection to chat server...
              </div>
            )}

            {connectionStatus === "error" && (
              <div style={{
                textAlign: "center",
                padding: "10px",
                color: "#dc3545",
                backgroundColor: "#f8d7da",
                borderRadius: "8px",
                margin: "10px",
                fontSize: "14px"
              }}>
                ⚠️ Cannot connect to chat server.
                <br />
                <small>Make sure backend is running on port 3000</small>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={msg.from === "copilot" ? styles.copilotMsg : styles.userMsg}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className={styles.typing}>
                <span>●</span><span>●</span><span>●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={connectionStatus === "connected" ? "Ask Copilot..." : "Waiting for connection..."}
              disabled={loading || connectionStatus !== "connected"}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim() || connectionStatus !== "connected"}
            >
              Send
            </button>
          </div>

          {connectionStatus === "connected" && (
            <div style={{
              textAlign: "center",
              padding: "5px",
              fontSize: "11px",
              color: "#28a745",
              backgroundColor: "#d4edda"
            }}>
              ✅ Connected to chat server
            </div>
          )}
        </div>
      )}
    </div>
  );
}
