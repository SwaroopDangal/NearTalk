import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import socket from "../lib/socket";
import useUsername from "../hooks/useUsername";
import { Send, Users, Circle, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import useGetGroupInfoById from "../hooks/useGetGroupInfoById";
import useGeolocation from "../hooks/useGeoLocation";

export default function ChatPage() {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { username } = useUsername();
  const { groupData, groupIsLoading } = useGetGroupInfoById(groupId);
  console.log(groupData);
  const { location } = useGeolocation();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [activeUsers, setActiveUsers] = useState(0);
  const messagesEndRef = useRef(null);

  function getDistanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth radius in km

    const toRad = (deg) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
  }

  useEffect(() => {
    if (!location || !groupData?.location?.coordinates) return;
    if (location) {
      const distance = getDistanceKm(
        Number(location.lat),
        Number(location.lng),
        Number(groupData.location.coordinates[0]),
        Number(groupData.location.coordinates[1])
      );
      if (distance > 5) {
        toast.error("You are too far away from the group!");
        navigate(`/nearbyGroups`);
      }
    }
  }, [location, groupData]);

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
    socket.on("group-not-found", handleGroupNotFound);

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
    <div className="flex flex-col h-screen bg-linear-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-violet-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-tl from-cyan-200/30 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="group bg-linear-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 p-2.5 rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-800 group-hover:-translate-x-0.5 transition-all" />
            </button>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-indigo-600 rounded-2xl blur-sm opacity-50"></div>
              <div className="relative bg-linear-to-br from-violet-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {groupData?.name || "Group Chat"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-linear-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full border border-emerald-200/50">
            <div className="relative flex items-center justify-center">
              <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
            </div>
            <span className="text-sm font-semibold text-emerald-700">
              {activeUsers} online
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center mt-20 space-y-4">
              <div className="inline-flex p-6 bg-linear-to-br from-violet-100 to-indigo-100 rounded-3xl shadow-xl">
                <Send className="w-12 h-12 text-violet-500" />
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-700">
                  No messages yet
                </p>
                <p className="text-slate-500 mt-1">
                  Be the first to say hello!
                </p>
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className="animate-[fadeIn_0.3s_ease-out]">
                {m.system ? (
                  <div className="flex justify-center">
                    <div className="bg-linear-to-r from-slate-100 to-slate-200 text-slate-600 text-sm px-5 py-2.5 rounded-full shadow-sm border border-slate-300/50 font-medium">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex ${
                      m.username === username ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex flex-col gap-1 max-w-md">
                      {m.username !== username && (
                        <span className="text-xs font-bold text-violet-600 px-2">
                          {m.username}
                        </span>
                      )}
                      <div
                        className={`px-5 py-3 rounded-3xl shadow-lg transition-all hover:shadow-xl ${
                          m.username === username
                            ? "bg-linear-to-br from-violet-500 to-indigo-600 text-white rounded-br-md"
                            : "bg-white text-slate-800 rounded-bl-md border border-slate-200/50"
                        }`}
                      >
                        <p className="leading-relaxed break-words">{m.text}</p>
                      </div>
                      {m.username === username && (
                        <span className="text-xs text-slate-400 text-right px-2">
                          You
                        </span>
                      )}
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
      <div className="relative bg-white/80 backdrop-blur-xl border-t border-slate-200/50 shadow-2xl">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full px-6 py-4 bg-linear-to-r from-slate-50 to-slate-100 border-2 border-slate-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-800 shadow-inner"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className="relative group bg-linear-to-br from-violet-500 to-indigo-600 text-white p-4 rounded-2xl hover:shadow-xl disabled:from-slate-300 disabled:to-slate-400 transition-all duration-300 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-linear-to-br from-violet-400 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <Send className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
