const STORAGE_KEY = 'rv_chat';
const USER_KEY = 'rv_user_id';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  summary?: string;
}

interface StoredData {
  userId: string;
  activeSessionId: string;
  sessions: ChatSession[];
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function encode(data: StoredData): string {
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

function decode(encoded: string): StoredData | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

export function getUserId(): string {
  let id = localStorage.getItem(USER_KEY);
  if (!id) {
    id = 'user_' + generateId();
    localStorage.setItem(USER_KEY, id);
  }
  return id;
}

function loadData(): StoredData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const decoded = decode(raw);
    if (decoded) return decoded;
  }
  const userId = getUserId();
  const sessionId = 'sess_' + generateId();
  return {
    userId,
    activeSessionId: sessionId,
    sessions: [{ id: sessionId, messages: [], createdAt: Date.now() }],
  };
}

function saveData(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, encode(data));
}

export function getActiveSession(): ChatSession {
  const data = loadData();
  const session = data.sessions.find((s) => s.id === data.activeSessionId);
  if (session) return session;
  const newSession: ChatSession = { id: 'sess_' + generateId(), messages: [], createdAt: Date.now() };
  data.sessions.push(newSession);
  data.activeSessionId = newSession.id;
  saveData(data);
  return newSession;
}

export function addMessage(msg: ChatMessage): ChatSession {
  const data = loadData();
  let session = data.sessions.find((s) => s.id === data.activeSessionId);
  if (!session) {
    session = { id: 'sess_' + generateId(), messages: [], createdAt: Date.now() };
    data.sessions.push(session);
    data.activeSessionId = session.id;
  }
  session.messages.push(msg);
  saveData(data);
  return session;
}

export function saveSummary(summary: string) {
  const data = loadData();
  const session = data.sessions.find((s) => s.id === data.activeSessionId);
  if (session) {
    session.summary = summary;
    saveData(data);
  }
}

export function startNewSession(): ChatSession {
  const data = loadData();
  const newSession: ChatSession = { id: 'sess_' + generateId(), messages: [], createdAt: Date.now() };
  data.sessions.push(newSession);
  data.activeSessionId = newSession.id;
  saveData(data);
  return newSession;
}

export function getAllSessions(): ChatSession[] {
  return loadData().sessions;
}

export function getContextSummary(): string | undefined {
  const data = loadData();
  const session = data.sessions.find((s) => s.id === data.activeSessionId);
  return session?.summary;
}

export function getMessagesForApi(): { role: 'user' | 'assistant'; content: string }[] {
  const session = getActiveSession();
  return session.messages.map((m) => ({ role: m.role, content: m.content }));
}

export function needsSummarization(): boolean {
  const session = getActiveSession();
  return session.messages.length > 30;
}
