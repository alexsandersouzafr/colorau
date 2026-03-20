"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

export type AccentId =
  | "red"
  | "yellow"
  | "orange"
  | "violet"
  | "magenta"
  | "green"
  | "cyan"
  | "emerald"
  | "soft-magenta";

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
  { id: "soft-magenta", label: "Magenta suave", value: "#ffb6ff" },
];

const STORAGE_ACCENT_ID = "colorau-accent-id";
const STORAGE_LOCKED = "colorau-accent-locked";

const FAVICON_SVG = `<svg width="284" height="284" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="142" cy="142" r="142" fill="#08100F"/><path d="M160.63 63.6956C160.63 57.4783 156.109 55.2174 144.239 55.2174C136.891 55.2174 135.196 61.4348 135.196 71.3261V205.283C135.196 225.63 141.13 228.739 146.782 228.739C154.13 228.739 156.956 218 157.522 199.913L158.369 166.565H162.326L163.174 200.761C163.739 227.609 155.543 247.957 138.587 247.957C122.478 247.957 114 239.196 114 214.891V74.1522C114 46.4565 127.848 36 144.239 36C158.935 36 166 44.7609 166 62.2826C166 76.6956 165.435 96.4783 160.348 125.022H138.869C158.652 82.6304 160.63 71.6087 160.63 63.6956Z" fill="white"/></svg>`;

/** Same timing as `queueMicrotask` when available (effect deferral). */
const defer =
  typeof queueMicrotask === "function"
    ? queueMicrotask
    : (cb: () => void) => setTimeout(cb, 0);

function storageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function isValidAccentId(value: string | null): value is AccentId {
  return Boolean(value && ACCENT_OPTIONS.some((opt) => opt.id === value));
}

function parseHexRgb(hex: string): { r: number; g: number; b: number } | null {
  const n = hex.trim().replace("#", "");
  const expand = (c: string) => c + c;
  let r: string;
  let g: string;
  let b: string;
  if (/^[0-9a-fA-F]{3}$/.test(n)) {
    r = expand(n[0]!);
    g = expand(n[1]!);
    b = expand(n[2]!);
  } else if (/^[0-9a-fA-F]{6}$/.test(n)) {
    r = n.slice(0, 2);
    g = n.slice(2, 4);
    b = n.slice(4, 6);
  } else {
    return null;
  }
  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
}

function hexToRgbTriplet(hex: string): string | null {
  const rgb = parseHexRgb(hex);
  return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : null;
}

function isGrayscaleRgb(rgb: { r: number; g: number; b: number }, tolerance = 8) {
  return (
    Math.abs(rgb.r - rgb.g) <= tolerance &&
    Math.abs(rgb.g - rgb.b) <= tolerance &&
    Math.abs(rgb.r - rgb.b) <= tolerance
  );
}

function isGrayscaleAccentOption(opt: AccentOption) {
  const rgb = parseHexRgb(opt.value);
  return rgb ? isGrayscaleRgb(rgb) : false;
}

function chooseRandomAccentId(exclude?: AccentId): AccentId {
  const candidates = exclude
    ? ACCENT_OPTIONS.filter((opt) => opt.id !== exclude)
    : ACCENT_OPTIONS;
  const nonGray = candidates.filter((opt) => !isGrayscaleAccentOption(opt));
  const pool = nonGray.length ? nonGray : candidates;
  const finalPool = pool.length ? pool : ACCENT_OPTIONS;
  return finalPool[Math.floor(Math.random() * finalPool.length)]!.id;
}

/** Overrides: hex direto quando a cor não está em ACCENT_OPTIONS (ex.: deep violet #5900c3). */
const AGENDA_BG_HEX: Partial<Record<AccentId, string>> = {
  red: "#ffb6ff",
  magenta: "#590063",
  green: "#008d69",
  cyan: "#006054",
  yellow: "#ff4600",
  orange: "#006054",
  violet: "#ffb6ff",
};

/** Pares curados: fundo da home "Agenda 2026" para cada cor do tema. */
const AGENDA_BG_PAIR: Partial<Record<AccentId, AccentId>> = {
  emerald: "soft-magenta",
  "soft-magenta": "emerald",
};

function chooseAgendaBackground(exclude: AccentId): AccentOption {
  const overrideHex = AGENDA_BG_HEX[exclude];
  if (overrideHex) {
    return { id: exclude, label: "", value: overrideHex };
  }

  const pairedId = AGENDA_BG_PAIR[exclude];
  if (pairedId && pairedId !== exclude) {
    const paired = ACCENT_OPTIONS.find((o) => o.id === pairedId);
    if (paired && !isGrayscaleAccentOption(paired)) return paired;
  }

  const accentRgb = parseHexRgb(
    ACCENT_OPTIONS.find((o) => o.id === exclude)?.value ?? "",
  );

  const distanceSq = (candidate: { r: number; g: number; b: number }) => {
    if (!accentRgb) return 0;
    const dr = candidate.r - accentRgb.r;
    const dg = candidate.g - accentRgb.g;
    const db = candidate.b - accentRgb.b;
    return dr * dr + dg * dg + db * db;
  };

  let best: AccentOption | null = null;
  let bestScore = -Infinity;

  for (const opt of ACCENT_OPTIONS) {
    if (opt.id === exclude || isGrayscaleAccentOption(opt)) continue;
    const rgb = parseHexRgb(opt.value);
    if (!rgb) continue;
    const score = distanceSq(rgb);
    if (score > bestScore) {
      bestScore = score;
      best = opt;
    }
  }

  if (best) return best;

  const nonGrayFallback = ACCENT_OPTIONS.find(
    (o) => o.id !== exclude && !isGrayscaleAccentOption(o),
  );
  return (
    nonGrayFallback ?? ACCENT_OPTIONS.find((o) => o.id !== exclude) ?? ACCENT_OPTIONS[0]!
  );
}

function upsertFaviconLink(rel: string, href: string) {
  const head = document.head;
  const selector = `link[data-colorau-favicon="true"][rel="${rel}"]`;
  let node = head.querySelector<HTMLLinkElement>(selector);
  if (!node) {
    node = document.createElement("link");
    node.dataset.colorauFavicon = "true";
    node.rel = rel;
    node.type = "image/svg+xml";
    head.appendChild(node);
  }
  node.href = href;
}

/** Mantém a assinatura para os chamadores; o asset é SVG fixo. */
function applyFavicon(accentColor: string) {
  if (typeof document === "undefined") return;
  void accentColor;
  const href = `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`;
  upsertFaviconLink("icon", href);
  upsertFaviconLink("shortcut icon", href);
}

function applyAccent(option: AccentOption) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--accent", option.value);
  root.style.setProperty("--accent-foreground", "#090909");
  const accentRgb = hexToRgbTriplet(option.value);
  if (accentRgb) root.style.setProperty("--accent-rgb", accentRgb);
  root.style.setProperty("--agenda-bg", chooseAgendaBackground(option.id).value);
  applyFavicon(option.value);
}

type ThemeContextValue = {
  accentId: AccentId;
  options: AccentOption[];
  setAccent: (id: AccentId) => void;
  isLocked: boolean;
  setLocked: (locked: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastAppliedPathnameRef = useRef(pathname);
  const isLockedRef = useRef(false);

  const [isLocked, setIsLocked] = useState(false);
  const [accentId, setAccentId] = useState<AccentId>("orange");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    const lockedFromStorage = storageGet(STORAGE_LOCKED) === "yes";
    const storedAccentId = storageGet(STORAGE_ACCENT_ID);
    const nextAccentId: AccentId = isValidAccentId(storedAccentId)
      ? storedAccentId
      : chooseRandomAccentId();

    setIsLocked(lockedFromStorage);
    isLockedRef.current = lockedFromStorage;
    setAccentId(nextAccentId);
    lastAppliedPathnameRef.current = pathname;
    setHasHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistAccent = useCallback((id: AccentId) => {
    storageSet(STORAGE_ACCENT_ID, id);
  }, []);

  const persistLocked = useCallback((locked: boolean) => {
    storageSet(STORAGE_LOCKED, locked ? "yes" : "no");
  }, []);

  useEffect(() => {
    const option = ACCENT_OPTIONS.find((opt) => opt.id === accentId);
    if (!option) return;
    applyAccent(option);
    if (hasHydrated) {
      persistAccent(accentId);
      persistLocked(isLocked);
    }
  }, [accentId, hasHydrated, isLocked, persistAccent, persistLocked]);

  const setAccent = useCallback(
    (id: AccentId) => {
      const option = ACCENT_OPTIONS.find((opt) => opt.id === id);
      if (!option) return;
      setAccentId(id);
      applyAccent(option);
      persistAccent(id);
    },
    [persistAccent],
  );

  const setLocked = useCallback(
    (locked: boolean) => {
      setIsLocked(locked);
      isLockedRef.current = locked;
      persistLocked(locked);
    },
    [persistLocked],
  );

  useEffect(() => {
    if (!hasHydrated) return;
    if (lastAppliedPathnameRef.current === pathname) return;

    lastAppliedPathnameRef.current = pathname;
    if (isLockedRef.current) return;

    const scheduledPathname = pathname;
    const nextAccentId = chooseRandomAccentId(accentId);

    defer(() => {
      if (lastAppliedPathnameRef.current !== scheduledPathname) return;
      if (isLockedRef.current) return;
      setAccent(nextAccentId);
    });
  }, [accentId, hasHydrated, pathname, setAccent]);

  const value: ThemeContextValue = {
    accentId,
    options: ACCENT_OPTIONS,
    setAccent,
    isLocked,
    setLocked,
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
