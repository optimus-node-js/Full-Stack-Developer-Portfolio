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
  text: 'text-foreground/90',
  prompt: 'text-foreground',
  error: 'text-red-500 dark:text-red-400',
  info: 'text-sky-600 dark:text-sky-400',
  success: 'text-emerald-600 dark:text-emerald-400',
  muted: 'text-muted-foreground',
  accent: 'text-fuchsia-600 dark:text-fuchsia-400',
  ascii: 'text-primary dark:text-sky-400',
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

  // Autofocus when typing finishes. On touch devices only after the visitor
  // has used the terminal, so the page never jumps or pops the keyboard on load.
  const interactedRef = useRef(false);
  useEffect(() => {
    if (isTyping) return;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (!touch || interactedRef.current) inputRef.current?.focus({ preventScroll: true });
  }, [isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    interactedRef.current = true;
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

  const focusInput = () => {
    interactedRef.current = true;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={focusInput}
      className={`terminal-frame relative rounded-2xl overflow-hidden font-mono max-w-full ${className}`}
      role="region"
      aria-label="Interactive terminal"
    >
      {/* Chrome */}
      <div className="terminal-chrome flex items-center justify-between px-4 py-2.5 border-b">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
          <span className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
        </div>
        <span className="terminal-chrome-title text-[10px] sm:text-[11px] tracking-wide truncate max-w-[45%]">rahul@portfolio: zsh 80×24</span>
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          online
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="terminal-body p-3 sm:p-5 text-[12px] sm:text-sm leading-6 h-[340px] sm:h-[420px] overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="mb-3">
            {entry.input && (
              <div className="flex items-start gap-1 sm:gap-2 mb-1 flex-wrap">
                <span className="text-emerald-600 dark:text-emerald-400 shrink-0 text-[11px] sm:text-sm">rahul@portfolio</span>
                <span className="text-muted-foreground shrink-0">:</span>
                <span className="text-primary dark:text-sky-400 shrink-0">~</span>
                <span className="text-muted-foreground shrink-0">$</span>
                <span className="text-foreground break-all">{entry.input}</span>
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
                <span className="inline-block w-2 h-[1em] -mb-[2px] bg-primary dark:bg-sky-400 ml-0.5 align-middle animate-blink" />
              </div>
            )}
          </div>
        ))}

        {/* Input */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center gap-1 sm:gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-sm">rahul@portfolio</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary dark:text-sky-400">~</span>
            <span className="text-muted-foreground">$</span>
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
                className="terminal-input flex-1 min-w-0 bg-transparent border-none outline-none text-foreground caret-primary dark:caret-sky-400 font-mono placeholder:text-muted-foreground/60"
                placeholder={entries.length <= 1 ? "try 'help' or ask me anything..." : ''}
              />
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
