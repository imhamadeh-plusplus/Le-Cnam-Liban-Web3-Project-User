/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
import Link from "next/link";
import {
  DotsThreeVerticalIcon,
  PlayIcon,
} from "@phosphor-icons/react/dist/ssr";

export interface DummyVideo {
  id: string;
  title: string;
  channelName: string;
  views: string;
  uploadedAt: string;
  duration: string;
  thumbnailColor: string;
}

export function VideoCard({ video }: { video: DummyVideo }) {
  return (
    <Link href={`/watch/${video.id}`} className="group flex flex-col gap-3">
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 ${video.thumbnailColor} flex items-center justify-center transition-colors group-hover:border-zinc-600`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
          <PlayIcon size={20} weight="fill" />
        </div>

        <span className="absolute bottom-2 right-2 rounded bg-black/85 px-1.5 py-0.5 text-xs font-semibold text-zinc-100">
          {video.duration}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-3 min-w-0">
          <span className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-black">
            {video.channelName.charAt(0).toUpperCase()}
          </span>

          <div className="flex flex-col min-w-0">
            <h3 className="line-clamp-2 text-sm font-bold leading-snug text-zinc-100 group-hover:text-emerald-400 transition-colors">
              {video.title}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">{video.channelName}</p>
            <p className="text-xs text-zinc-500">
              {video.views} • {video.uploadedAt}
            </p>
          </div>
        </div>

        <span className="text-zinc-500 hover:text-zinc-200 p-1">
          <DotsThreeVerticalIcon size={18} weight="bold" />
        </span>
      </div>
    </Link>
  );
}
