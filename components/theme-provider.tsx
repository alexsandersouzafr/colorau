"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type AccentId =
  | "red"
  | "yellow"
  | "orange"
  | "violet"
  | "magenta"
  | "green"
  | "cyan"
  | "emerald"
  | "deep-violet"
  | "soft-magenta"
  | "deep-emerald";

type AccentOption = {
  id: AccentId;
  label: string;
  value: string;
};

const ACCENT_OPTIONS: AccentOption[] = [
  { id: "red", label: "Vermelho", value: "#ff001c" },
  { id: "yellow", label: "Amarelo", value: "#ffe300" },
  { id: "orange", label: "Laranja", value: "#ff8c00" },
  { id: "violet", label: "Violeta", value: "#5351fe" },
  { id: "magenta", label: "Magenta", value: "#ff61ff" },
  { id: "green", label: "Verde", value: "#87ff2f" },
  { id: "cyan", label: "Ciano", value: "#00e0f0" },
  { id: "emerald", label: "Esmeralda", value: "#008d69" },
  {
    id: "deep-violet",
    label: "Violeta profundo",
    value: "#5900c3",
  },
  {
    id: "soft-magenta",
    label: "Magenta suave",
    value: "#ffb6ff",
  },
  {
    id: "deep-emerald",
    label: "Esmeralda profunda",
    value: "#006054",
  },
];

type ThemeContextValue = {
  accentId: AccentId;
  options: AccentOption[];
  setAccent: (id: AccentId) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "colorau-accent";

function applyAccent(option: AccentOption) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--accent", option.value);
  root.style.setProperty("--accent-foreground", "#090909");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accentId, setAccentId] = useState<AccentId>("orange");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as AccentId | null;
    const initial =
      stored && ACCENT_OPTIONS.find((opt) => opt.id === stored)
        ? stored
        : "orange";

    const option = ACCENT_OPTIONS.find((opt) => opt.id === initial)!;
    setAccentId(initial);
    applyAccent(option);
  }, []);

  const setAccent = useCallback((id: AccentId) => {
    const option = ACCENT_OPTIONS.find((opt) => opt.id === id);
    if (!option) return;
    setAccentId(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    applyAccent(option);
  }, []);

  const value: ThemeContextValue = {
    accentId,
    options: ACCENT_OPTIONS,
    setAccent,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeAccent() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeAccent must be used within ThemeProvider");
  }
  return ctx;
}

