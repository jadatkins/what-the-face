import { PrismaClient } from "../../generated/prisma";
import type { Route } from "./+types/home";

const prisma = new PrismaClient();

export function meta({}: Route.MetaArgs) {
  return [
    { title: "What The Face" },
    { name: "description", content: "Hello from the database!" },
  ];
}

export async function loader() {
  const messageVar = await prisma.variable.findUnique({
    where: { key: "message" },
  });

  return {
    message: messageVar?.value || "database",
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Hello, {loaderData.message}!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          This message was fetched from the PostgreSQL database using Prisma.
        </p>
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <div>🔥 React Router v7 + TypeScript</div>
          <div>⚡ Bun Runtime</div>
          <div>🗄️ PostgreSQL + Prisma</div>
          <div>🐳 Docker</div>
        </div>
      </div>
    </main>
  );
}
