import React, { useState } from 'react';
import { Send, ShieldCheck, ArrowLeft, MessageSquare, CheckCheck } from 'lucide-react';
import { MessageThread, StudentUser } from '../types';

interface MessagesViewProps {
  threads: MessageThread[];
  student: StudentUser;
  onSendMessage: (threadId: string, text: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  threads,
  student,
  onSendMessage,
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(threads[0]?.id || null);
  const [replyText, setReplyText] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;
    onSendMessage(activeThread.id, replyText);
    setReplyText('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Student Inquiries &amp; Messages</h2>
          <p className="text-xs text-slate-500">Official college desk &amp; resident assistants</p>
        </div>
      </div>

      {/* Thread Selector Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {threads.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveThreadId(t.id)}
            className={`px-3 py-2 rounded-xl text-left border shrink-0 transition-all ${
              activeThread?.id === t.id
                ? 'bg-red-50/60 border-[#800000] shadow-xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">{t.recipientName}</span>
              {t.unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-600" />
              )}
            </div>
            <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{t.role}</div>
          </button>
        ))}
      </div>

      {/* Active Chat Conversation Container */}
      {activeThread && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[460px] overflow-hidden">
          {/* Conversation Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: '#800000' }}
              >
                {activeThread.recipientName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>{activeThread.recipientName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                </h3>
                <p className="text-[10px] text-slate-400">{activeThread.role}</p>
              </div>
            </div>

            <span className="text-[10px] text-slate-400 font-mono">
              Matric: {student.matricNo}
            </span>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFBFD] text-xs">
            {activeThread.messages.map((m) => {
              const isMe = m.sender === 'student';
              const isSys = m.sender === 'system';

              if (isSys) {
                return (
                  <div key={m.id} className="text-center my-2">
                    <span className="px-3 py-1 bg-slate-200/70 text-slate-600 text-[10px] rounded-full">
                      {m.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      isMe
                        ? 'text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/90 shadow-2xs'
                    }`}
                    style={isMe ? { backgroundColor: '#800000' } : undefined}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                    <span>{m.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#800000]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Form */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Message ${activeThread.recipientName.split(' ')[0]}...`}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#800000]"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: '#800000' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
