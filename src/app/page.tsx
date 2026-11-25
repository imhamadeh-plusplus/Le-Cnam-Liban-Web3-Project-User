/** biome-ignore-all lint/style/useImportType: <ignoring extension> */
/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { VideoCard, DummyVideo } from "@/components/Video-card";

const dummyVideos: DummyVideo[] = [
  {
    id: "1",
    title: "Building a Full-Stack Video Platform in Next.js 16",
    channelName: "dummy1",
    views: "12K views",
    uploadedAt: "2 hours ago",
    duration: "14:27",
    thumbnailColor: "bg-zinc-900",
  },
  {
    id: "2",
    title: "Understanding Operating System Kernels From Scratch",
    channelName: "dummy2",
    views: "48K views",
    uploadedAt: "1 day ago",
    duration: "22:10",
    thumbnailColor: "bg-emerald-950/50",
  },
  {
    id: "3",
    title: "Turbo V8 Swap Sound Check & Highway Pulls",
    channelName: "dummy3",
    views: "1.6M views",
    uploadedAt: "5 days ago",
    duration: "11:19",
    thumbnailColor: "bg-zinc-900",
  },
  {
    id: "4",
    title: "Late Night Lo-Fi Beats for Coding Sessions",
    channelName: "dummy4",
    views: "94K views",
    uploadedAt: "1 week ago",
    duration: "1:20:49",
    thumbnailColor: "bg-zinc-800/80",
  },
  {
    id: "5",
    title: "Clean Cable Management Setup Guide 2026",
    channelName: "dummy1",
    views: "8.3K views",
    uploadedAt: "2 weeks ago",
    duration: "09:45",
    thumbnailColor: "bg-emerald-950/40",
  },
  {
    id: "6",
    title: "PostgreSQL & Prisma Schema Design Best Practices",
    channelName: "dummy2",
    views: "31K views",
    uploadedAt: "3 weeks ago",
    duration: "18:03",
    thumbnailColor: "bg-zinc-900",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-black text-zinc-100 font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />

        <div className="border-b border-zinc-800 bg-black px-6 py-3">
          <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1 text-xs font-medium text-zinc-400">
            suggestions later{" "}
            <span className="text-red-400">
              (Every video is a dummy video, not real content, was trying the
              design, they don't even work yet, will add real content later)
            </span>
          </span>
        </div>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {dummyVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
