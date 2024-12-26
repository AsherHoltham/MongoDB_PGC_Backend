import { Greet } from "./components/greet";
import { Counter } from "./components/counter";

export default function Home() {
  return ( 
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>PGC</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Greet />
        <Counter />
      </main>
    </div>
  );
}
