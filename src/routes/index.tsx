import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import addonsData from "@/data/addons.json";

type Addon = {
  id: string;
  title: string;
  image: string;
  author: string;
  url: string;
};

const ADDONS = addonsData as Addon[];
const COLLECTION_URL =
  "https://steamcommunity.com/sharedfiles/filedetails/?id=3730123254";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOTD — balh · Friends Server" },
      {
        name: "description",
        content: "Friends-only Garry's Mod server. Have fun — PAC3 is allowed.",
      },
      { property: "og:title", content: "MOTD — balh · Friends Server" },
      {
        property: "og:description",
        content: "Friends-only Garry's Mod server. Have fun — PAC3 is allowed.",
      },
    ],
  }),
  component: Motd,
});

function Motd() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ADDONS;
    return ADDONS.filter((a) => a.title.toLowerCase().includes(q));
  }, [query]);

  const visible = showAll || query ? filtered : filtered.slice(0, 24);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top app bar */}
      <header className="sticky top-0 z-10 border-b border-outline-variant/60 bg-surface-container/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-container text-on-primary-container">
              <GmodGlyph />
            </span>
            <div className="leading-tight">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Message of the day
              </p>
              <h1 className="text-base font-medium">balh</h1>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant px-3 py-1 text-xs font-medium text-on-secondary-container">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Friends only
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24">
        {/* Hero */}
        <section className="mt-6 overflow-hidden rounded-[36px] bg-primary-container p-8 text-on-primary-container shadow-m3-2 md:p-14">
          <p className="font-mono text-xs uppercase tracking-[0.22em] opacity-80">
            Welcome, friend
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight">
            Have fun.
            <br />
            <span className="opacity-80">PAC3 is allowed.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base opacity-90 md:text-lg">
            A small, friends-only Garry's Mod sandbox. Build dumb stuff, pose
            ragdolls, run PAC3 — just don't be a pain.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="steam://connect/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-m3-1 transition hover:brightness-110 active:scale-[0.98]"
            >
              <PlayIcon /> Join via Steam
            </a>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText("connect server.ip:27015")}
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-high/40 px-6 py-3 text-sm font-medium text-on-primary-container transition hover:bg-surface-container-high/70"
            >
              <CopyIcon /> Copy IP
            </button>
            <a
              href={COLLECTION_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium underline-offset-4 hover:underline"
            >
              Workshop collection ↗
            </a>
          </div>
        </section>

        {/* Quick stats / chips */}
        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Addons" value={ADDONS.length.toString()} />
          <StatCard label="Slots" value="16" />
          <StatCard label="Map" value="gm_construct" />
          <StatCard label="PAC3" value="Enabled" tone="tertiary" />
        </section>

        {/* The cat */}
        <section className="mt-6 grid items-center gap-4 rounded-[28px] border border-outline-variant bg-surface-container p-5 md:grid-cols-[200px_1fr] md:p-7">
          <div className="relative mx-auto aspect-square w-[180px] overflow-hidden rounded-[40%] border border-outline-variant shadow-m3-2 md:mx-0 md:w-[200px]">
            <img
              src="https://i.imgur.com/2daR3cv.jpeg"
              alt="The MOTD creator's cat"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Meet the staff
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight">
              The MOTD creator's cat
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Head of moderation. Will judge your prop builds. Accepts treats as
              bribes — not appeals.
            </p>
          </div>
        </section>

        {/* Addons */}
        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Installed
              </p>
              <h3 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
                {ADDONS.length} workshop addons
              </h3>
            </div>
            <label className="relative w-full max-w-xs">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search addons"
                className="w-full rounded-full border border-outline-variant bg-surface-container-high py-3 pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {visible.map((a) => (
              <AddonCard key={a.id} addon={a} />
            ))}
          </div>

          {!query && !showAll && filtered.length > 24 && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="rounded-full bg-secondary-container px-6 py-3 text-sm font-medium text-on-secondary-container shadow-m3-1 transition hover:brightness-110"
              >
                Show all {filtered.length} addons
              </button>
            </div>
          )}

          {query && filtered.length === 0 && (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No addons match "{query}".
            </p>
          )}
        </section>

        <footer className="mt-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          MOTD · v1 · Material 3 Expressive
        </footer>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "tertiary";
}) {
  const cls =
    tone === "tertiary"
      ? "bg-tertiary-container text-on-tertiary-container"
      : "bg-surface-container text-foreground";
  return (
    <div className={`rounded-2xl border border-outline-variant p-4 ${cls}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
        {label}
      </p>
      <p className="mt-2 font-display text-xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function AddonCard({ addon }: { addon: Addon }) {
  return (
    <a
      href={addon.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-surface-container-high hover:shadow-m3-2"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-container-high">
        {addon.image ? (
          <img
            src={addon.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">
            ?
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <p
          className="line-clamp-2 text-sm font-medium leading-snug"
          title={addon.title}
        >
          {addon.title}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          #{addon.id.slice(-6)}
        </p>
      </div>
    </a>
  );
}

function GmodGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9" />
      <path d="M12 3v9h9" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}
function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
