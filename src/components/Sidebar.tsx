/** biome-ignore-all assist/source/organizeImports: <ignoring extension> */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ClockCounterClockwiseIcon,
  CompassIcon,
  HouseIcon,
  PlusIcon,
  ThumbsUpIcon,
  UserCircleIcon,
  UsersThreeIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";

const mainNav = [
  { label: "Home", href: "/", icon: HouseIcon },
  { label: "Explore", href: "/explore", icon: CompassIcon },
  { label: "Subscriptions", href: "/subscriptions", icon: UsersThreeIcon },
];

const dummySubscriptions = [
  { id: "1", name: "dummy1", hasNew: true },
  { id: "2", name: "dummy2", hasNew: false },
  { id: "3", name: "dummy3", hasNew: true },
  { id: "4", name: "dummy4", hasNew: false },
];

export function Sidebar({ username }: { username?: string | null }) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const sessionUsername = (
    session?.user as { username?: string | null } | undefined
  )?.username;
  const activeUsername = sessionUsername || username;
  const channelHref = activeUsername ? `/@${activeUsername}` : "/channel";

  const libraryNav = [
    { label: "Your Channel", href: channelHref, icon: UserCircleIcon },
    { label: "Your Videos", href: "/studio", icon: VideoCameraIcon },
    { label: "Liked Videos", href: "/liked", icon: ThumbsUpIcon },
    { label: "History", href: "/history", icon: ClockCounterClockwiseIcon },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-800 bg-black text-zinc-100 h-screen sticky top-0 flex flex-col justify-between px-3 py-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-zinc-950 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-700 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
      <div className="space-y-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xl font-extrabold tracking-tight"
        >
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          <span>UsTube</span>
        </Link>
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-full text-[15px] transition-colors ${
                  isActive
                    ? "font-bold text-white bg-zinc-900"
                    : "font-medium text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"
                }`}
              >
                <Icon size={22} weight={isActive ? "fill" : "regular"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800/80" />

        <div className="space-y-2">
          <div className="px-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Subscriptions
            </span>
          </div>

          <div className="space-y-1">
            {dummySubscriptions.map((sub) => (
              <Link
                key={sub.id}
                href={`/@${sub.name}`}
                className="flex items-center justify-between px-4 py-2 rounded-full text-sm text-zinc-300 hover:bg-zinc-900/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="h-6 w-6 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">{sub.name}</span>
                </div>

                {sub.hasNew && (
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800/80" />

        <div className="space-y-1">
          <span className="px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            You
          </span>

          {libraryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-full text-[15px] transition-colors ${
                  isActive
                    ? "font-bold text-white bg-zinc-900"
                    : "font-medium text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"
                }`}
              >
                <Icon size={22} weight={isActive ? "fill" : "regular"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pt-4">
        <Link
          href="/upload"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors"
        >
          <PlusIcon size={18} weight="bold" />
          <span>Upload Video</span>
        </Link>
      </div>
    </aside>
  );
}
