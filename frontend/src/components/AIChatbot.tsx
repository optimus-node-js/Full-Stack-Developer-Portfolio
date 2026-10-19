import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, Send, MoreVertical, RotateCcw, Trash2, Mail, Phone,
  ExternalLink, Sparkles, ChevronDown, MapPin, FileText,
} from 'lucide-react';
import {
  getActiveSession, addMessage, startNewSession, clearAllData, getMessagesForApi,
  getContextSummary, getUserId, needsSummarization, saveSummary,
  type ChatMessage,
} from '@/lib/chatStorage';
import { db, type ContactSubmission } from '@/lib/instantdb';
import { id as instantId } from '@instantdb/react';
import { projectsData, experienceData } from '@/data/resume-data';
import { caseStudies } from '@/data/case-studies';
import { runAgent, summarize, type ChatAction } from '@/lib/chat-agent';
import { highlightSection } from '@/lib/ai-highlight';

const _gk = () => atob('Z3NrX3FPUzRpVUlBaE41VkR5NGhoaTBxV0dkeWIzRllha2Q0cUJCT3NHMVpKdnU4Z0JhakhJQUk=');
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

const CONTACT_LINKS = [
  { icon: Mail, label: 'Email', href: 'mailto:karmarahul67@gmail.com', color: 'text-blue-400' },
  { icon: Phone, label: 'WhatsApp', href: 'https://wa.me/919131114837', color: 'text-green-400' },
  { icon: Phone, label: 'Call', href: 'tel:+919131114837', color: 'text-yellow-400' },
];

/** Renders **bold** spans; everything else stays plain text. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

function ContactCard() {
  return (
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
      <Link
        to="/resume"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
      >
        <FileText className="w-3 h-3 text-primary" />
        Resume
      </Link>
    </div>
  );
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
    if (pathname.startsWith('/case-studies/')) {
      const cs = caseStudies.find((c) => c.slug === pathname.split('/case-studies/')[1]);
      if (cs) return `Want the 20-second version of "${cs.title}"?`;
    }
    if (pathname === '/case-studies') return 'Tell me your requirement — I’ll show you where Rahul has done it.';
    if (pathname === '/how-i-work') return 'Ask me how Rahul would handle your project.';
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
          className="fixed bottom-[calc(max(env(safe-area-inset-bottom),12px)+138px)] right-4 lg:bottom-8 lg:right-24 z-[90] max-w-[240px] md:max-w-[260px] px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl bg-card/95 backdrop-blur-xl border border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.4)] text-left group hover:border-primary/50 transition-colors"
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
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [peek, setPeek] = useState<ChatAction | null>(null);
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
    setPeek(null);
    if (!hasGreeted) {
      const greeting = getGreeting();
      const greetMsg: ChatMessage = {
        role: 'assistant',
        content: `${greeting}! I'm Rahul's AI assistant. Ask me anything about his work — or tell me what you need built, and I'll show you right here on the site where he's done it.`,
        timestamp: Date.now(),
      };
      addMessage(greetMsg);
      setMessages((prev) => [...prev, greetMsg]);
      setHasGreeted(true);
    } else if (messages.length === 0) {
      const greetMsg: ChatMessage = {
        role: 'assistant',
        content: `Welcome back! I still remember our chat. What else would you like to know about Rahul's work?`,
        timestamp: Date.now(),
      };
      addMessage(greetMsg);
      setMessages((prev) => [...prev, greetMsg]);
    }
  }, [hasGreeted, messages.length]);

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
      const contextSummary = getContextSummary();
      const isPhone = window.matchMedia('(max-width: 767px)').matches;

      const result = await runAgent(
        apiMessages,
        {
          apiKey: _gk(),
          pathname,
          search,
          navigate: (path) => navigate(path),
          highlight: (section, label) => highlightSection(section, label),
        },
        contextSummary,
      );
      const reply = result.text;

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
        ...(result.actions.length ? { actions: result.actions } : {}),
        ...(result.showContact ? { showContact: true } : {}),
      };
      addMessage(assistantMsg);
      setMessages((prev) => [...prev, assistantMsg]);

      // On phones the chat covers the page — step aside so the highlight is visible.
      if (isPhone && result.actions.length) {
        setPeek(result.actions[0]);
        setIsOpen(false);
      }

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
          const summary = await summarize(_gk(), apiMessages.slice(0, -10));
          if (summary) saveSummary(summary);
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
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  // Re-open a page the assistant showed earlier.
  const showAction = (a: ChatAction) => {
    navigate(a.path);
    if (a.section) void highlightSection(a.section, a.label);
    if (window.matchMedia('(max-width: 767px)').matches) {
      setPeek(a);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!peek) return;
    const t = setTimeout(() => setPeek(null), 9000);
    return () => clearTimeout(t);
  }, [peek]);

  const handleNewChat = () => {
    const session = startNewSession();
    setMessages(session.messages);
    setHasGreeted(false);
    setShowMenu(false);
  };

  const handleClearAll = () => {
    clearAllData();
    setMessages([]);
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
            className="fixed bottom-[calc(max(env(safe-area-inset-bottom),12px)+76px)] right-5 lg:bottom-8 lg:right-8 z-[91] w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex items-center justify-center text-primary-foreground hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-shadow active:scale-95"
            aria-label="Chat with AI"
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            {messages.length === 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-background animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phone: the assistant stepped aside to show a section */}
      <AnimatePresence>
        {peek && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="md:hidden fixed left-4 right-20 z-[91] bottom-[calc(max(env(safe-area-inset-bottom),12px)+78px)] flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-card/95 backdrop-blur-xl border border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            role="status"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="flex-1 min-w-0 text-xs truncate">{peek.label}</span>
            <button
              onClick={handleOpen}
              className="shrink-0 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold active:scale-95"
            >
              Back to chat
            </button>
          </motion.div>
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
            className="fixed z-[92] bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] h-[100dvh] md:h-[600px] md:max-h-[80vh] md:rounded-2xl overflow-hidden bg-card/95 backdrop-blur-2xl border-0 md:border border-border/80 shadow-[0_25px_80px_rgba(0,0,0,0.5)] flex flex-col"
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
                        <button
                          onClick={handleClearAll}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-muted/40 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Clear all data
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
                  <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? '' : 'min-w-0'}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-muted/50 text-foreground border border-border/40 rounded-bl-md'
                      }`}
                    >
                      {msg.role === 'assistant' ? <RichText text={msg.content} /> : <p className="whitespace-pre-wrap">{msg.content}</p>}
                    </div>
                    {msg.actions?.map((a) => (
                      <button
                        key={a.path + (a.section ?? '')}
                        onClick={() => showAction(a)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/30 bg-primary/10 text-left text-xs hover:bg-primary/15 transition-colors"
                        data-testid="chat-action"
                      >
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="min-w-0">
                          <span className="block font-semibold text-foreground truncate">{a.label}</span>
                          <span className="block text-muted-foreground truncate">{a.title}</span>
                        </span>
                      </button>
                    ))}
                    {msg.showContact && <ContactCard />}
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
                !messages[messages.length - 1].showContact &&
                /email|whatsapp|contact|reach|call/i.test(messages[messages.length - 1].content) && <ContactCard />}

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
