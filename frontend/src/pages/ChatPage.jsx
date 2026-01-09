import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import socket from "../lib/socket";
import useUsername from "../hooks/useUsername";
import { Send, Users } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ChatPage() {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { username } = useUsername(); // ✅ FIXED

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [activeUsers, setActiveUsers] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!groupId || !username) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-group", { groupId, username });

    // ------------------------------
    // SOCKET EVENT HANDLERS
    // ------------------------------
    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleSystem = (msg) => {
      setMessages((prev) => [...prev, { ...msg, system: true }]);
    };

    const handleActiveUsers = (count) => {
      setActiveUsers(count);
    };

    const handleGroupNotFound = () => {
      toast.error("Group not found!");
      navigate("/");
    };

    socket.on("receive-message", handleReceive);
    socket.on("system-message", handleSystem);
    socket.on("active-users", handleActiveUsers);
    socket.on("group-not-found", handleGroupNotFound); // ✅ listen

    // ------------------------------
    // CLEANUP
    // ------------------------------
    return () => {
      socket.off("receive-message", handleReceive);
      socket.off("system-message", handleSystem);
      socket.off("active-users", handleActiveUsers);
      socket.off("group-not-found", handleGroupNotFound);
      socket.disconnect();
    };
  }, [groupId, username]);

  const sendMessage = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    socket.emit("send-message", {
      groupId,
      text,
      username,
    });

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Group Chat</h3>
            <p className="text-sm text-slate-500">Room: {groupId}</p>
            <p className="text-sm text-slate-500">
              Active Users: {activeUsers}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-slate-400 mt-8">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i}>
                {m.system ? (
                  <div className="flex justify-center">
                    <div className="bg-slate-200 text-slate-600 text-xs px-4 py-2 rounded-full">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex ${
                      m.username === username ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        m.username === username
                          ? "bg-blue-500 text-white rounded-br-sm"
                          : "bg-white text-slate-800 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      {m.username !== username && (
                        <p className="text-xs font-semibold mb-1 text-blue-600">
                          {m.username}
                        </p>
                      )}
                      <p className="wrap-break">{m.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-slate-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-slate-300"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
