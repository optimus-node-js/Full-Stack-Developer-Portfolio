import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, Send, MoreVertical, RotateCcw, Mail, Phone,
  ExternalLink, Sparkles, ChevronDown,
} from 'lucide-react';
import {
  getActiveSession, addMessage, startNewSession, getMessagesForApi,
  getContextSummary, getUserId, needsSummarization, saveSummary,
  type ChatMessage,
} from '@/lib/chatStorage';
import { db, type ContactSubmission } from '@/lib/instantdb';
import { id as instantId } from '@instantdb/react';
import { projectsData, experienceData } from '@/data/resume-data';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  let device = 'Desktop';
  if (/Mobile|Android|iPhone|iPad/.test(ua)) device = 'Mobile';
  else if (/Tablet|iPad/.test(ua)) device = 'Tablet';

  let os = 'Unknown';
  if (/Windows/.test(ua)) os = 'Windows';
  else if (/Mac OS/.test(ua)) os = 'macOS';
  else if (/iPhone|iPad/.test(ua)) os = 'iOS';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Linux/.test(ua)) os = 'Linux';

  let browser = 'Unknown';
  if (/Chrome/.test(ua) && !/Edg/.test(ua)) browser = 'Chrome';
  else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
  else if (/Firefox/.test(ua)) browser = 'Firefox';
  else if (/Edg/.test(ua)) browser = 'Edge';

  return { device, os, browser, screenWidth: window.innerWidth, screenHeight: window.innerHeight };
}

function getPageContext(pathname: string): string | null {
  if (pathname.startsWith('/project/')) {
    const slug = pathname.split('/project/')[1];
    const project = projectsData.find((p) => p.slug === slug);
    if (project) return `User is viewing the "${project.title}" project page. This project: ${project.description}`;
  }
  if (pathname === '/journey') {
    return 'User is on the Journey page viewing career experience and education timeline.';
  }
  if (pathname === '/work') {
    return 'User is browsing all projects on the Work page.';
  }
  if (pathname === '/about') {
    return 'User is on the About page learning about Rahul.';
  }
  return null;
}

const CONTACT_LINKS = [
  { icon: Mail, label: 'Email', href: 'mailto:karmarahul67@gmail.com', color: 'text-blue-400' },
  { icon: Phone, label: 'WhatsApp', href: 'https://wa.me/919131114837', color: 'text-green-400' },
  { icon: Phone, label: 'Call', href: 'tel:+919131114837', color: 'text-yellow-400' },
];

const API_URL = '/api/chat';

async function sendChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
  contextSummary?: string,
): Promise<string> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, contextSummary }),
  });
  if (!res.ok) throw new Error('Chat API error');
  const data = await res.json();
  return data.reply;
}

async function summarizeChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
): Promise<string> {
  const summaryMessages = [
    ...messages.slice(0, -10),
    {
      role: 'user' as const,
      content: 'Summarize our entire conversation so far in 3-4 sentences, covering the key topics discussed and any preferences or interests the user showed. This summary will be used to maintain conversation context.',
    },
  ];
  return sendChat(summaryMessages);
}

interface ContextualPromptProps {
  pathname: string;
  onOpen: () => void;
  isOpen: boolean;
}

function ContextualPrompt({ pathname, onOpen, isOpen }: ContextualPromptProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      setShow(false);
      return;
    }
    setShow(false);
    const key = pathname;
    if (dismissed === key) return;

    timerRef.current = setTimeout(() => {
      setShow(true);
    }, 4000);

    return () => clearTimeout(timerRef.current);
  }, [pathname, dismissed, isOpen]);

  const getMessage = () => {
    if (pathname.startsWith('/project/')) {
      const slug = pathname.split('/project/')[1];
      const project = projectsData.find((p) => p.slug === slug);
      if (project) return `Want to know how Rahul built "${project.title}"?`;
    }
    if (pathname === '/journey') {
      const latest = experienceData[0];
      return `Curious about Rahul's work at ${latest.company}?`;
    }
    if (pathname === '/work') return 'Want to explore how these projects were built?';
    if (pathname === '/about') return "Want to know what makes Rahul stand out?";
    if (pathname === '/contact') return 'Have questions before reaching out?';
    return null;
  };

  const message = getMessage();
  if (!message) return null;

  return (
    <AnimatePresence>
      {show && !isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={() => {
            setDismissed(pathname);
            setShow(false);
            onOpen();
          }}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-24 z-[90] max-w-[260px] px-4 py-3 rounded-2xl bg-card/95 backdrop-blur-xl border border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.4)] text-left group hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0 animate-pulse" />
            <span className="text-xs text-foreground/90 leading-relaxed">{message}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(pathname);
              setShow(false);
            }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function AIChatbot() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = getActiveSession();
    setMessages(session.messages);
    if (session.messages.length > 0) setHasGreeted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logVisit = useCallback(async () => {
    try {
      const userId = getUserId();
      const deviceInfo = getDeviceInfo();
      await db.transact(
        db.tx.visits[instantId()].update({
          userId,
          page: pathname,
          ...deviceInfo,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        }),
      );
    } catch {}
  }, [pathname]);

  useEffect(() => {
    logVisit();
  }, [logVisit]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (!hasGreeted) {
      const greeting = getGreeting();
      const greetMsg: ChatMessage = {
        role: 'assistant',
        content: `${greeting}! I'm Rahul's AI assistant. I know everything about his work, skills, and experience. Ask me anything — or I can help you figure out if Rahul's the right fit for your project!`,
        timestamp: Date.now(),
      };
      addMessage(greetMsg);
      setMessages((prev) => [...prev, greetMsg]);
      setHasGreeted(true);
    }
  }, [hasGreeted]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: Date.now() };
    addMessage(userMsg);
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = getMessagesForApi();
      const pageCtx = getPageContext(pathname);
      if (pageCtx) {
        apiMessages.push({ role: 'user', content: `[System context: ${pageCtx}]` });
      }

      const contextSummary = getContextSummary();
      const reply = await sendChat(apiMessages, contextSummary);

      const assistantMsg: ChatMessage = { role: 'assistant', content: reply, timestamp: Date.now() };
      addMessage(assistantMsg);
      setMessages((prev) => [...prev, assistantMsg]);

      // Store chat in InstantDB
      try {
        const userId = getUserId();
        await db.transact(
          db.tx.chats[instantId()].update({
            userId,
            userMessage: text,
            assistantReply: reply,
            page: pathname,
            timestamp: Date.now(),
          }),
        );
      } catch {}

      // Summarize if context is getting long
      if (needsSummarization()) {
        try {
          const summary = await summarizeChat(apiMessages);
          saveSummary(summary);
        } catch {}
      }
    } catch {
      const errorMsg: ChatMessage = {
        role: 'assistant',
        content: "Hmm, I'm having trouble connecting right now. You can reach Rahul directly at karmarahul67@gmail.com or WhatsApp +91 9131114837.",
        timestamp: Date.now(),
      };
      addMessage(errorMsg);
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const session = startNewSession();
    setMessages(session.messages);
    setHasGreeted(false);
    setShowMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <ContextualPrompt pathname={pathname} onOpen={handleOpen} isOpen={isOpen} />

      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={handleOpen}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[91] w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex items-center justify-center text-primary-foreground hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-shadow active:scale-95"
            aria-label="Chat with AI"
          >
            <MessageSquare className="w-6 h-6" />
            {messages.length === 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-background animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-[92] bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] h-[100dvh] md:h-[600px] md:max-h-[80vh] md:rounded-2xl overflow-hidden bg-card/98 backdrop-blur-2xl border-0 md:border border-border/80 shadow-[0_25px_80px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[11px] font-bold text-primary-foreground">
                  RV
                </div>
                <div>
                  <div className="text-sm font-semibold">Rahul's AI</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Always online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowMenu((v) => !v)}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        className="absolute right-0 top-10 w-44 bg-card border border-border/80 rounded-xl shadow-xl overflow-hidden"
                      >
                        <button
                          onClick={handleNewChat}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:bg-muted/40 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Start fresh chat
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted/50 text-foreground border border-border/40 rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 border border-border/40 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact quick links after assistant messages that mention contact */}
              {messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' &&
                /email|whatsapp|contact|reach|call/i.test(messages[messages.length - 1].content) && (
                <div className="flex gap-2 flex-wrap">
                  {CONTACT_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                    >
                      <link.icon className={`w-3 h-3 ${link.color}`} />
                      {link.label}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/60 bg-background/30 px-3 py-3 safe-area-bottom">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Rahul's work..."
                  className="flex-1 bg-muted/30 border border-border/50 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-muted-foreground/50">
                <Sparkles className="w-2.5 h-2.5" />
                Powered by AI · Knows everything about Rahul
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
