export type StickerStatus = "missing" | "have" | "duplicate";

export interface Sticker {
  id: string; // e.g. "ARG17"
  code: string; // display code, same as id
  name: string; // e.g. "Lionel Messi"
  teamCode: string; // e.g. "ARG"
  teamName: string; // e.g. "Argentina"
  number: number; // 1-20 within team, or 0 for intro/history
  isFoil: boolean;
  section: "intro" | "team" | "history";
}

export interface TeamSection {
  code: string;
  name: string;
  flag: string;
  group?: string;
  stickers: Sticker[];
}

export interface AlbumState {
  [stickerId: string]: number;
}

export type FilterType = "all" | "have" | "missing" | "duplicate";

export interface AlbumStats {
  total: number;
  have: number;
  missing: number;
  duplicates: number;
  completionPct: number;
}

export type Language = "es" | "en";
export type Theme = "dark" | "light";
export type StatsLayout = "compact" | "extended" | "ring";
export type SectionHeaderStyle = "minimal" | "chip" | "banner";

export type TournamentGroup =
  | "A" | "B" | "C" | "D" | "E" | "F"
  | "G" | "H" | "I" | "J" | "K" | "L";

export type GroupFilter = "all" | TournamentGroup;

export interface GroupInfo {
  code: TournamentGroup;
  colorVar: string;
}

export interface VisualPrefs {
  theme: Theme;
  statsLayout: StatsLayout;
  sectionHeaderStyle: SectionHeaderStyle;
}
