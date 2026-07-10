import { useState } from "react";
import {
  CHAT_LIST,
  CHAT_MESSAGES,
} from "../../data/supportAgentData.js";
import { useSupportAgentUi } from "../../context/supportAgentUiContext.js";
import MaterialIcon from "../../components/superadmin/MaterialIcon.jsx";

function LiveChatPage() {
  const { isMobile } = useSupportAgentUi();
  const [activeChat, setActiveChat] = useState(0);
  const [showList, setShowList] = useState(true);
  const [draft, setDraft] = useState("");

  const chat = CHAT_LIST.find((c) => c.id === activeChat) || CHAT_LIST[0];
  const messages = CHAT_MESSAGES[activeChat] || CHAT_MESSAGES[0] || [];

  const selectChat = (id) => {
    setActiveChat(id);
    if (isMobile) setShowList(false);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {(!isMobile || showList) && (
        <div
          className={`flex flex-col overflow-y-auto border-r border-slate-200 bg-white ${
            isMobile ? "w-full" : "w-[280px] shrink-0"
          }`}
        >
          <div className="border-b border-slate-200 p-3">
            <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[13px] text-slate-400">
              <MaterialIcon name="search" size={16} />
              Search chats…
            </div>
          </div>
          {CHAT_LIST.map((ch) => {
            const active = ch.id === activeChat;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => selectChat(ch.id)}
                className={`flex w-full cursor-pointer items-center gap-2.5 border-b border-slate-50 px-3 py-2.5 text-left transition-colors hover:bg-slate-50 ${
                  active ? "bg-sky-500/5" : "bg-white"
                }`}
              >
                <div
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: ch.avatarBg }}
                >
                  <span className="text-[11px] font-semibold text-white">
                    {ch.init}
                  </span>
                  <div
                    className="absolute -bottom-px -right-px h-2 w-2 rounded-full border-[1.5px] border-white"
                    style={{ background: ch.statusDot }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium">{ch.name}</span>
                    <span className="text-[10px] text-slate-400">{ch.time}</span>
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {ch.lastMsg}
                  </div>
                </div>
                {ch.unread ? (
                  <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-sky-500">
                    <span className="text-[10px] font-semibold text-white">
                      {ch.unread}
                    </span>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      )}

      {(!isMobile || !showList) && (
        <div className="flex min-w-0 flex-1 flex-col bg-slate-50">
          <div className="flex items-center gap-2.5 border-b border-slate-200 bg-white px-5 py-3">
            {isMobile ? (
              <button
                type="button"
                aria-label="Back to chats"
                onClick={() => setShowList(true)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-slate-100"
              >
                <MaterialIcon name="arrow_back" size={20} className="text-slate-500" />
              </button>
            ) : null}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: chat.avatarBg }}
            >
              <span className="text-[11px] font-semibold text-white">
                {chat.init}
              </span>
            </div>
            <div>
              <div className="text-[13px] font-semibold">{chat.name}</div>
              <div
                className="text-[11px]"
                style={{
                  color: chat.status === "Online" ? "#10b981" : "#94a3b8",
                }}
              >
                {chat.status}
              </div>
            </div>
            <div className="flex-1" />
            <button
              type="button"
              aria-label="Chat info"
              className="cursor-pointer text-slate-500 hover:text-gray-700"
            >
              <MaterialIcon name="info" size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div
                key={`${m.time}-${i}`}
                className={`mb-3 flex ${m.fromAgent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-3.5 py-2.5 ${
                    m.fromAgent
                      ? "rounded-[16px_4px_4px_16px] bg-sky-500 text-white"
                      : "rounded-[4px_16px_16px_4px] bg-white text-slate-900"
                  }`}
                >
                  <div className="text-[13px] leading-relaxed">{m.text}</div>
                  <div
                    className={`mt-1 text-right text-[10px] ${
                      m.fromAgent ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2.5 border-t border-slate-200 bg-white px-5 py-3">
            <button
              type="button"
              aria-label="Attach file"
              className="cursor-pointer text-slate-400 hover:text-gray-700"
            >
              <MaterialIcon name="attach_file" size={22} />
            </button>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-300"
            />
            <button
              type="button"
              aria-label="Send message"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-sky-500 hover:bg-sky-600"
            >
              <MaterialIcon name="send" size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveChatPage;
