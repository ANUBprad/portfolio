import Image from "next/image";

const TRACK = {
  title: "Don Lucho",
  artist: "Hermanos Gutiérrez",
  url: "https://open.spotify.com/track/1HQaYw5dRryXNcB6pHaBhF",
  artwork:
    "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025b606b523ae0c34d4a287ac0",
};

function WaveformBars() {
  return (
    <div
      className="now-playing-waveform flex items-end gap-[3px]"
      aria-hidden="true"
    >
      {[14, 20, 10, 18, 12, 22, 8].map((h, i) => (
        <span
          key={i}
          className="block w-[2px] rounded-full bg-neutral-500/60"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

export default function NowPlaying() {
  return (
    <section className="border-dotted border-neutral-800/80 bg-neutral-900/10 relative overflow-hidden rounded-2xl border">
      <div className="flex flex-row items-center gap-4 px-4 py-4 sm:gap-5 sm:px-5">
        <Image
          src={TRACK.artwork}
          alt={`${TRACK.title} album artwork`}
          width={80}
          height={80}
          className="size-16 shrink-0 rounded-lg border border-neutral-800/60 object-cover sm:size-20 sm:rounded-xl"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-sm font-semibold text-neutral-200 sm:text-base">
              {TRACK.title}
            </span>
            <span className="font-sans text-xs text-neutral-500">
              {TRACK.artist}
            </span>
          </div>
          <WaveformBars />
          <a
            href={TRACK.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Listen to ${TRACK.title} by ${TRACK.artist} on Spotify (opens in a new tab)`}
            className="font-mono inline-flex items-center gap-1.5 text-[11px] text-neutral-500 transition-colors hover:text-neutral-300"
          >
            Spotify
            <span aria-hidden="true" className="text-[9px]">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
