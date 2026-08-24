"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AccessRole, EventKey } from "@/lib/events";

type AccessState = {
  ready: boolean;
  role: AccessRole | null;
  token: string | null;
  events: EventKey[];
  unlock: (password: string) => Promise<string | null>;
  lock: () => void;
};

const STORAGE_KEY = "naya-josh-access";

const AccessContext = createContext<AccessState | null>(null);

type StoredSession = {
  role: AccessRole;
  token: string;
  events: EventKey[];
};

export function AccessProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<AccessRole | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [events, setEvents] = useState<EventKey[]>([]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredSession;
        if (parsed?.token && parsed?.role) {
          setRole(parsed.role);
          setToken(parsed.token);
          setEvents(parsed.events ?? []);
        }
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  const lock = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setRole(null);
    setToken(null);
    setEvents([]);
  }, []);

  const unlock = useCallback(async (password: string) => {
    const response = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = (await response.json()) as {
      error?: string;
      role?: AccessRole;
      token?: string;
      events?: EventKey[];
    };

    if (!response.ok || !data.role || !data.token) {
      return data.error || "Incorrect password";
    }

    const session: StoredSession = {
      role: data.role,
      token: data.token,
      events: data.events ?? [],
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setRole(session.role);
    setToken(session.token);
    setEvents(session.events);
    return null;
  }, []);

  const value = useMemo(
    () => ({ ready, role, token, events, unlock, lock }),
    [ready, role, token, events, unlock, lock]
  );

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used within AccessProvider");
  return ctx;
}
