import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareHeart,
  X,
  Send,
  Bot,
  UserRound,
} from "lucide-react";
import { useLocation } from "react-router-dom";

function getRoleFromPath(pathname) {
  if (pathname.startsWith("/student")) return "Student";
  if (pathname.startsWith("/teacher")) return "Teacher";
  if (pathname.startsWith("/admin")) return "Admin";
  return "User";
}

export default function FeedbackChatbot() {
  const location = useLocation();
  const role = getRoleFromPath(location.pathname);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m your Dynamic Active feedback assistant. Ask me about goals, feedback, progress, observations, reports, or next steps.",
    },
  ]);

  function handleSend() {
    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
      {
        sender: "bot",
        text:
          role === "Student"
            ? "Great question. For students, I can help explain feedback, goals, homework, progress, and encouragement."
            : role === "Teacher"
            ? "I can help summarize classroom notes, suggest goals, draft feedback, and recommend next actions."
            : role === "Admin"
            ? "I can help interpret review queues, reports, risk insights, and school-wide analytics."
            : "I can help with feedback and workflow guidance.",
      },
    ]);

    setMessage("");
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-[#fc362d] text-white shadow-2xl ring-4 ring-white/70"
        aria-label="Open feedback chatbot"
      >
        <MessageSquareHeart className="h-8 w-8" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200"
          >
            <div className="flex items-center justify-between bg-[#fc362d] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black">Teacher Feedback Assistant</p>
                  <p className="text-xs font-semibold text-white/75">
                    Active role: {role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-white/20"
                aria-label="Close chatbot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[380px] space-y-4 overflow-y-auto bg-slate-50 p-5">
              {messages.map((item, index) => (
                <div
                  key={`${item.sender}-${index}`}
                  className={`flex gap-3 ${
                    item.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {item.sender === "bot" && (
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-50">
                      <Bot className="h-5 w-5 text-[#fc362d]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                      item.sender === "user"
                        ? "bg-[#fc362d] text-white"
                        : "bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {item.text}
                  </div>

                  {item.sender === "user" && (
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-200">
                      <UserRound className="h-5 w-5 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-slate-200 bg-white p-4">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSend();
                }}
                placeholder="Ask about feedback, goals, reports..."
                className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#fc362d] focus:bg-white"
              />

              <button
                type="button"
                onClick={handleSend}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#fc362d] text-white hover:bg-red-600"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
