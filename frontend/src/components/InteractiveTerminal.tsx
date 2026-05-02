import { useEffect, useRef, useState, KeyboardEvent, useCallback } from 'react';
import { processCommand, welcomeResponse, getHistoryResponse, type Line } from '@/lib/terminal-knowledge';
import { motion } from 'framer-motion';

interface Entry {
  id: string;
  input: string;
  output: Line[];
  pending?: string;
  pendingKind?: Line['kind'];
  done: boolean;
}

const TYPE_DELAY = 10; // ms per character
const LINE_PAUSE = 35;  // ms between lines

const uid = () => Math.random().toString(36).slice(2, 10);
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const kindClass: Record<NonNullable<Line['kind']>, string> = {
  text: 'text-white/90',
  prompt: 'text-white',
  error: 'text-red-400',
  info: 'text-sky-400',
  success: 'text-emerald-400',
  muted: 'text-white/50',
  accent: 'text-fuchsia-400',
  ascii: 'text-sky-400',
};

export default function InteractiveTerminal({ className = '' }: { className?: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingLock = useRef(false);

  // Append a new entry for a command + stream its output with typing
  const runEntry = useCallback(async (cmd: string, linesOverride?: Line[]) => {
    if (typingLock.current) return;
    typingLock.current = true;
    setIsTyping(true);

    const id = uid();
    let lines: Line[] = [];
    let shouldClear = false;

    if (linesOverride) {
      lines = linesOverride;
    } else {
      if (cmd.trim().toLowerCase() === 'history') {
        lines = getHistoryResponse(cmdHistory).lines;
      } else {
        const res = processCommand(cmd);
        lines = res.lines;
        shouldClear = !!res.clear;
      }
    }

    if (shouldClear) {
      setEntries([]);
      typingLock.current = false;
      setIsTyping(false);
      return;
    }

    // push entry with empty output; then type in lines
    setEntries((prev) => [...prev, { id, input: cmd, output: [], done: false }]);

    for (const line of lines) {
      if (line.instant || !line.text) {
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, output: [...e.output, line] } : e)),
        );
        await sleep(LINE_PAUSE);
        continue;
      }
      // typewriter for this line
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, pending: '', pendingKind: line.kind } : e)),
      );
      for (let i = 1; i <= line.text.length; i++) {
        await sleep(TYPE_DELAY);
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, pending: line.text.slice(0, i) } : e)),
        );
      }
      // commit
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, output: [...e.output, line], pending: undefined, pendingKind: undefined }
            : e,
        ),
      );
      await sleep(LINE_PAUSE);
    }

    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, done: true } : e)));
    setIsTyping(false);
    typingLock.current = false;

    // trigger resume download on cmd resume/cv
    const lower = cmd.trim().toLowerCase();
    if (lower === 'resume' || lower === 'cv') {
      const a = document.createElement('a');
      a.href = '/resume.pdf';
      a.download = 'Rahul_Vishwakarma_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [cmdHistory]);

  // welcome message on mount
  useEffect(() => {
    runEntry('', welcomeResponse.lines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoscroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [entries]);

  // autofocus when typing finishes
  useEffect(() => {
    if (!isTyping) inputRef.current?.focus();
  }, [isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    const cmd = input.trim();
    if (!cmd) return;
    setCmdHistory((h) => [...h, cmd]);
    setHistIdx(null);
    setInput('');
    runEntry(cmd);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      if (!cmdHistory.length) return;
      e.preventDefault();
      const nextIdx = histIdx === null ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(nextIdx);
      setInput(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      if (histIdx === null) return;
      e.preventDefault();
      const nextIdx = histIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistIdx(null);
        setInput('');
      } else {
        setHistIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // simple tab-complete
      const partial = input.toLowerCase();
      if (!partial) return;
      const candidates = [
        'help', 'whoami', 'about', 'skills', 'stack', 'experience', 'projects',
        'education', 'contact', 'resume', 'socials', 'ls', 'pwd', 'date',
        'history', 'clear', 'hire', 'joke',
      ];
      const match = candidates.find((c) => c.startsWith(partial));
      if (match) setInput(match);
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={focusInput}
      className={`relative rounded-2xl overflow-hidden border border-border/60 shadow-[0_30px_80px_rgba(0,0,0,0.35)] font-mono bg-[#0b0d12]/98 dark:bg-[#0b0d12]/95 ${className}`}
      role="region"
      aria-label="Interactive terminal"
    >
      {/* Chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/90" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <span className="w-3 h-3 rounded-full bg-green-500/90" />
        </div>
        <span className="text-[11px] text-white/60 tracking-wide">rahul@portfolio — zsh — 80×24</span>
        <span className="flex items-center gap-1.5 text-[10px] text-tertiary">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
          online
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="p-4 sm:p-5 text-[13px] sm:text-sm leading-6 h-[380px] sm:h-[420px] overflow-y-auto scroll-smooth text-white/90"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="mb-3">
            {entry.input && (
              <div className="flex items-start gap-2 mb-1">
                <span className="text-emerald-400 shrink-0">rahul@portfolio</span>
                <span className="text-white/50 shrink-0">:</span>
                <span className="text-sky-400 shrink-0">~</span>
                <span className="text-white/50 shrink-0">$</span>
                <span className="text-white break-all">{entry.input}</span>
              </div>
            )}
            {entry.output.map((line, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-wrap break-words ${kindClass[line.kind || 'text']}`}
              >
                {line.text || '\u00a0'}
              </div>
            ))}
            {entry.pending !== undefined && (
              <div className={`whitespace-pre-wrap ${kindClass[entry.pendingKind || 'text']}`}>
                {entry.pending}
                <span className="inline-block w-2 h-[1em] -mb-[2px] bg-sky-400 ml-0.5 align-middle animate-blink" />
              </div>
            )}
          </div>
        ))}

        {/* Input */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-emerald-400">rahul@portfolio</span>
            <span className="text-white/50">:</span>
            <span className="text-sky-400">~</span>
            <span className="text-white/50">$</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Terminal input"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                className="flex-1 bg-transparent border-none outline-none text-white caret-sky-400 font-mono placeholder:text-white/35"
                placeholder={entries.length <= 1 ? "try 'help' or ask me anything..." : ''}
              />
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
