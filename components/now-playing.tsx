import Image from "next/image";

const TRACKS = [
  {
    title: "Don Lucho",
    artist: "Hermanos Gutiérrez",
    url: "https://open.spotify.com/track/1HQaYw5dRryXNcB6pHaBhF",
    artwork:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025b606b523ae0c34d4a287ac0",
  },
  {
    title: "The Less I Know The Better",
    artist: "Tame Impala",
    url: "https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ",
    artwork:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029e1cfc756886ac782e363d79",
  },
  {
    title: "Wave Paths",
    artist: "Mike Sanders",
    url: "https://open.spotify.com/track/0LzI6tyCLVfXBreRd3P3VX",
    artwork:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02202f2c3e84fbc3b09fcfb3c2",
  },
  {
    title: "Kaise Hua",
    artist: "Vishal Mishra, Manoj Muntashir",
    url: "https://open.spotify.com/track/5w0Xpt2YHT2Y3z3e4UUJP7",
    artwork:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c5545f737b16ad5ee767b62a",
  },
] as const;

type Track = (typeof TRACKS)[number];

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

function TrackCard({ track }: { track: Track }) {
  return (
    <div className="border-dotted border-neutral-800/80 bg-neutral-900/10 relative overflow-hidden rounded-2xl border">
      <div className="flex flex-row items-center gap-4 px-4 py-4 sm:gap-5 sm:px-5">
        <Image
          src={track.artwork}
          alt={`${track.title} album artwork`}
          width={80}
          height={80}
          className="size-16 shrink-0 rounded-lg border border-neutral-800/60 object-cover sm:size-20 sm:rounded-xl"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-sm font-semibold text-neutral-200 sm:text-base">
              {track.title}
            </span>
            <span className="font-sans text-xs text-neutral-500">
              {track.artist}
            </span>
          </div>
          <WaveformBars />
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Listen to ${track.title} by ${track.artist} on Spotify (opens in a new tab)`}
            className="font-mono inline-flex items-center gap-1.5 text-[11px] text-neutral-500 transition-colors hover:text-neutral-300"
          >
            Spotify
            <span aria-hidden="true" className="text-[9px]">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function NowPlaying() {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {TRACKS.map((track) => (
        <TrackCard key={track.url} track={track} />
      ))}
    </section>
  );
}