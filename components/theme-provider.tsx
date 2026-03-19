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
  {
    id: "soft-magenta",
    label: "Magenta suave",
    value: "#ffb6ff",
  },
];

const STORAGE_ACCENT_ID = "colorau-accent-id";
const STORAGE_LOCKED = "colorau-accent-locked";

function isValidAccentId(value: string | null): value is AccentId {
  if (!value) return false;
  return ACCENT_OPTIONS.some((opt) => opt.id === value);
}

function chooseRandomAccentId(exclude?: AccentId): AccentId {
  const candidates = exclude
    ? ACCENT_OPTIONS.filter((opt) => opt.id !== exclude)
    : ACCENT_OPTIONS;
  // Palette rule: avoid grayscale tones.
  const nonGrayCandidates = candidates.filter((opt) => !isGrayscaleAccentOption(opt));
  const safeCandidates = nonGrayCandidates.length ? nonGrayCandidates : candidates;
  const finalCandidates = safeCandidates.length ? safeCandidates : ACCENT_OPTIONS;
  const idx = Math.floor(Math.random() * finalCandidates.length);
  return finalCandidates[idx]!.id;
}

type ThemeContextValue = {
  accentId: AccentId;
  options: AccentOption[];
  setAccent: (id: AccentId) => void;
  isLocked: boolean;
  setLocked: (locked: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const ICON_PATHS = [
  "M187.127 146.203H197.397V229.051C197.397 242.471 190.002 247.538 181.101 247.538C171.653 247.538 166.449 243.293 166.449 231.516V146.203H176.719V226.86C176.719 236.72 179.458 238.226 182.745 238.226C186.305 238.226 187.127 235.213 187.127 230.421V146.203Z",
  "M162.302 246.169H150.799L147.239 218.096H136.968L135.188 246.169H122.864L137.927 160.034L132.038 146.203H145.595L162.302 246.169ZM140.255 168.113L137.242 215.357H146.828L144.363 195.501L141.761 168.113H140.255Z",
  "M104.837 207.689L113.19 206.593L120.859 246.169H110.451L105.248 213.303C104.7 209.88 102.372 208.1 98.1269 210.017V246.169H87.8564V146.203H100.181C111.958 146.203 118.805 150.996 118.805 163.457V186.6C118.805 197.418 112.642 202.348 104.7 206.045L104.837 207.689ZM99.2224 155.515H98.1269V206.319L100.729 205.224C106.891 202.622 108.534 199.609 108.534 194.816V166.881C108.534 157.98 106.069 155.515 99.2224 155.515Z",
  "M191.668 139.704C182.219 139.704 177.016 135.459 177.016 123.682V55.4868C177.016 42.0667 184.41 37 193.311 37C202.897 37 207.964 41.2451 207.964 53.0219V121.217C207.964 134.637 200.569 139.704 191.668 139.704ZM192.353 46.3119C188.245 46.3119 187.286 49.3245 187.286 54.1174V119.026C187.286 128.886 190.025 130.392 193.311 130.392C196.872 130.392 197.693 127.38 197.693 122.587V57.6778C197.693 47.8182 195.092 46.3119 192.353 46.3119Z",
  "M158.763 38.3701V129.435H173.552V138.336H148.492V38.3701H158.763Z",
  "M124.028 139.704C114.579 139.704 109.376 135.459 109.376 123.682V55.4868C109.376 42.0667 116.77 37 125.671 37C135.257 37 140.324 41.2451 140.324 53.0219V121.217C140.324 134.637 132.929 139.704 124.028 139.704ZM124.713 46.3119C120.605 46.3119 119.646 49.3245 119.646 54.1174V119.026C119.646 128.886 122.385 130.392 125.671 130.392C129.232 130.392 130.054 127.38 130.054 122.587V57.6778C130.054 47.8182 127.452 46.3119 124.713 46.3119Z",
  "M99.5949 50.42C99.5949 47.4074 97.4039 46.3119 91.6525 46.3119C88.0921 46.3119 87.2704 49.3245 87.2704 54.1174V119.026C87.2704 128.886 90.1461 130.392 92.8849 130.392C96.4453 130.392 97.8147 125.189 98.0886 116.425L98.4994 100.266H100.417L100.827 116.835C101.101 129.845 97.13 139.704 88.9137 139.704C81.1082 139.704 77 135.459 77 123.682V55.4868C77 42.0667 83.71 37 91.6525 37C98.7733 37 102.197 41.2451 102.197 49.7353C102.197 56.7192 101.923 66.3049 99.458 80.1358H89.0506C98.6364 59.5949 99.5949 54.2543 99.5949 50.42Z",
] as const;

function applyFavicon(accentColor: string) {
  if (typeof document === "undefined") return;
  // Keep `accentColor` in signature (used by callers), but the new favicon design is fixed SVG.
  void accentColor;
  // Avoid unused const issues if lint rules are strict.
  void ICON_PATHS;
  const svg = `<svg width="284" height="284" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="142" cy="142" r="142" fill="#08100F"/><path d="M160.63 63.6956C160.63 57.4783 156.109 55.2174 144.239 55.2174C136.891 55.2174 135.196 61.4348 135.196 71.3261V205.283C135.196 225.63 141.13 228.739 146.782 228.739C154.13 228.739 156.956 218 157.522 199.913L158.369 166.565H162.326L163.174 200.761C163.739 227.609 155.543 247.957 138.587 247.957C122.478 247.957 114 239.196 114 214.891V74.1522C114 46.4565 127.848 36 144.239 36C158.935 36 166 44.7609 166 62.2826C166 76.6956 165.435 96.4783 160.348 125.022H138.869C158.652 82.6304 160.63 71.6087 160.63 63.6956Z" fill="white"/></svg>`;
  const href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  const head = document.head;

  const upsertLink = (rel: string) => {
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
  };

  // Avoid removing other <head> icon links that Next/React may manage.
  upsertLink("icon");
  upsertLink("shortcut icon");
}

function hexToRgbTriplet(hex: string): string | null {
  const normalized = hex.trim().replace("#", "");
  if (/^[0-9a-fA-F]{3}$/.test(normalized)) {
    const r = normalized[0] + normalized[0];
    const g = normalized[1] + normalized[1];
    const b = normalized[2] + normalized[2];
    return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(normalized)) {
    const r = normalized.slice(0, 2);
    const g = normalized.slice(2, 4);
    const b = normalized.slice(4, 6);
    return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`;
  }
  return null;
}

function hexToRgbNumbers(hex: string): { r: number; g: number; b: number } | null {
  const triplet = hexToRgbTriplet(hex);
  if (!triplet) return null;
  const [r, g, b] = triplet.split(",").map((v) => Number(v.trim()));
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
}

function isGrayscaleRgb(rgb: { r: number; g: number; b: number }, tolerance = 8) {
  // Grayscale: componentes praticamente iguais (ex.: #8a8b8d).
  return (
    Math.abs(rgb.r - rgb.g) <= tolerance &&
    Math.abs(rgb.g - rgb.b) <= tolerance &&
    Math.abs(rgb.r - rgb.b) <= tolerance
  );
}

function isGrayscaleAccentOption(opt: AccentOption) {
  const rgb = hexToRgbNumbers(opt.value);
  if (!rgb) return false;
  return isGrayscaleRgb(rgb);
}

function chooseAgendaBackground(exclude: AccentId) {
  const accentOption = ACCENT_OPTIONS.find((o) => o.id === exclude);
  const accentRgb = accentOption ? hexToRgbNumbers(accentOption.value) : null;

  // Overrides: hex direto quando a cor não está em ACCENT_OPTIONS (ex.: deep violet #5900c3).
  const PAIRS_HEX: Partial<Record<AccentId, string>> = {
    red: "#ffb6ff", // orange
    magenta: "#5900c3", // deep violet
    green: "#008d69", // emerald
    cyan: "#5900c3", // deep violet
  };

  const overrideHex = PAIRS_HEX[exclude];
  if (overrideHex) {
    return { id: exclude, label: "", value: overrideHex };
  }

  // Curated pairs: background da home "Agenda 2026" para cada cor do tema.
  const PAIRS: Partial<Record<AccentId, AccentId>> = {
    yellow: "violet",
    orange: "violet",
    violet: "yellow",
    emerald: "soft-magenta",
    "soft-magenta": "emerald",
  };

  const pairedId = PAIRS[exclude];
  if (pairedId && pairedId !== exclude) {
    const pairedOption = ACCENT_OPTIONS.find((o) => o.id === pairedId);
    if (pairedOption && !isGrayscaleAccentOption(pairedOption)) return pairedOption;
  }

  // Score by RGB distance: guarantees selecting an actually "other" color
  // from the palette, not just a slightly different shade.
  const distanceScore = (candidate: { r: number; g: number; b: number }) => {
    if (!accentRgb) return 0;
    const dr = candidate.r - accentRgb.r;
    const dg = candidate.g - accentRgb.g;
    const db = candidate.b - accentRgb.b;
    return dr * dr + dg * dg + db * db;
  };

  let best: AccentOption | null = null;
  let bestScore = -Infinity;

  for (const opt of ACCENT_OPTIONS) {
    if (opt.id === exclude) continue;
    // Palette rule: never use grayscale backgrounds.
    if (isGrayscaleAccentOption(opt)) continue;
    const rgb = hexToRgbNumbers(opt.value);
    if (!rgb) continue;
    const score = distanceScore(rgb);
    if (score > bestScore) {
      bestScore = score;
      best = opt;
    }
  }

  // Fallback: prefer non-grayscale candidates; only if impossible, allow grayscale.
  if (best) return best;
  const nonGrayFallback = ACCENT_OPTIONS.find(
    (o) => o.id !== exclude && !isGrayscaleAccentOption(o)
  );
  return (
    nonGrayFallback ?? ACCENT_OPTIONS.find((o) => o.id !== exclude) ?? ACCENT_OPTIONS[0]!
  );
}

function applyAccent(option: AccentOption) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--accent", option.value);
  root.style.setProperty("--accent-foreground", "#090909");
  const accentRgb = hexToRgbTriplet(option.value);
  if (accentRgb) root.style.setProperty("--accent-rgb", accentRgb);

  // Background of the "Agenda 2026" container must be a different palette color.
  const agendaBg = chooseAgendaBackground(option.id);
  root.style.setProperty("--agenda-bg", agendaBg.value);

  applyFavicon(option.value);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastAppliedPathnameRef = useRef(pathname);

  // Keep initial render consistent between server/client to avoid hydration mismatches.
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [accentId, setAccentId] = useState<AccentId>("orange");
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  const isLockedRef = useRef(isLocked);

  // Keep refs in sync for scheduled callbacks.
  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  // Hydrate theme state from localStorage (client-only) after the first render.
  useEffect(() => {
    let lockedFromStorage = false;
    let storedAccentId: string | null = null;

    try {
      lockedFromStorage =
        window.localStorage.getItem(STORAGE_LOCKED) === "yes";
      storedAccentId = window.localStorage.getItem(STORAGE_ACCENT_ID);
    } catch {
      // ignore storage failures
    }

    // When locked, prefer the stored accent if valid. Otherwise, pick a fresh one.
    const nextAccentId: AccentId = isValidAccentId(storedAccentId)
      ? storedAccentId
      : chooseRandomAccentId();

    setIsLocked(lockedFromStorage);
    isLockedRef.current = lockedFromStorage;
    setAccentId(nextAccentId);
    // Only align on initial hydration; subsequent route changes should not re-hydrate.
    lastAppliedPathnameRef.current = pathname;
    setHasHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistAccent = useCallback((id: AccentId) => {
    try {
      window.localStorage.setItem(STORAGE_ACCENT_ID, id);
    } catch {
      // ignore storage failures
    }
  }, []);

  const persistLocked = useCallback((locked: boolean) => {
    try {
      window.localStorage.setItem(STORAGE_LOCKED, locked ? "yes" : "no");
    } catch {
      // ignore storage failures
    }
  }, []);

  // Apply the current accent to CSS variables / favicon on mount + changes.
  useEffect(() => {
    const option = ACCENT_OPTIONS.find((opt) => opt.id === accentId);
    if (!option) return;
    applyAccent(option);

    // Keep localStorage aligned with the current state (after hydration).
    if (hasHydrated) {
      persistAccent(accentId);
      persistLocked(isLocked);
    }
  }, [
    accentId,
    hasHydrated,
    isLocked,
    persistAccent,
    persistLocked,
  ]);

  const setAccent = useCallback(
    (id: AccentId) => {
      const option = ACCENT_OPTIONS.find((opt) => opt.id === id);
      if (!option) return;
      setAccentId(id);
      applyAccent(option);
      persistAccent(id);
    },
    [persistAccent]
  );

  const setLocked = useCallback(
    (locked: boolean) => {
      setIsLocked(locked);
      // Ensure scheduled callbacks see the latest value immediately.
      isLockedRef.current = locked;
      persistLocked(locked);
    },
    [persistLocked]
  );

  useEffect(() => {
    if (!hasHydrated) return;
    if (lastAppliedPathnameRef.current === pathname) return;

    // Move the ref first so quick successive route changes don't double-apply.
    lastAppliedPathnameRef.current = pathname;

    if (isLockedRef.current) return;

    const scheduledPathname = pathname;
    const nextAccentId = chooseRandomAccentId(accentId);
    const schedule =
      typeof queueMicrotask === "function"
        ? queueMicrotask
        : (cb: () => void) => setTimeout(cb, 0);

    // Avoid updating state synchronously inside an effect.
    schedule(() => {
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

