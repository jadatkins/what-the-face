import { UserButton } from "@clerk/react-router";
import { getAuth } from "@clerk/react-router/server";
import { redirect } from "react-router";
import type { Route } from "./+types/app";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "What the Face?" }];
}

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);
  if (!userId) throw redirect("/");
  return {};
}

export default function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-end px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <UserButton />
      </header>
      <div className="flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
        App goes here
      </div>
    </main>
  );
}
