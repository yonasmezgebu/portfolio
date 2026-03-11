import { useState, useEffect, useRef } from "react";
import styles from "../assets/CopilotWidget.module.css";
import { useTheme } from "../context/ThemeContext";

export default function CopilotWidget() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
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

    // Listen for custom open event
    const handleOpen = () => setOpen(true);
    window.addEventListener("openCopilot", handleOpen);
    return () => window.removeEventListener("openCopilot", handleOpen);
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
    setInput(""); // Also clear input
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
    <div className={styles.widget} data-theme={theme}>
      {!open && (
        <button className={styles.floatingBtn} onClick={() => setOpen(true)} title="Open Copilot">
          <span className={styles.emoji}>🤖</span>
        </button>
      )}

      {open && (
        <div className={`${styles.chatWindow} ${messages.length === 1 ? styles.chatBlank : ""}`}>
          {/* SIMPLE X CLOSE BUTTON - ADDED HERE */}
          <button 
            onClick={() => setOpen(false)} 
            className={styles.closeXBtn}
            title="Close Chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button 
            onClick={async () => {
              await startNewChat();
              setOpen(false);
            }} 
            className={`${styles.topCloseBtn} ${styles.chatIcon}`} 
            title="Close and Wipe Conversation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
              <span>Copilot AI</span>
            </div>
            <div className={styles.headerButtons}>
              <button onClick={startNewChat} className={styles.newChatBtn} title="Clear Chat history">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.chatBox}>
            <div className={`${styles.blob} ${styles.blob1}`}></div>
            <div className={`${styles.blob} ${styles.blob2}`}></div>
            {messages.length > 3 && (
              <button className={styles.clearAllBtn} onClick={startNewChat}>
                Clear Conversation
              </button>
            )}
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
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={connectionStatus === "connected" ? "Ask Copilot..." : "Waiting for connection..."}
                disabled={loading || connectionStatus !== "connected"}
              />
              {input && (
                <button 
                  className={styles.clearInputBtn} 
                  onClick={() => setInput("")}
                  title="Clear text"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={loading || !input.trim() || connectionStatus !== "connected"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
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