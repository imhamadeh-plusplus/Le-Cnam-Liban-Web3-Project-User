// Keep line 2, Do NOT delete it okay??
/** biome-ignore-all assist/source/organizeImports: Keep imports grouped by package. */ 
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-black text-zinc-100 font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />

        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold tracking-tight">Home Feed</h1>
        </main>
      </div>
    </div>
  );
}