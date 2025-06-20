import { PrismaClient } from "../../generated/prisma";
import type { Route } from "./+types/home";

const prisma = new PrismaClient();

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "What The Face" },
    { name: "description", content: "Hello from the database!" },
  ];
}

export async function loader() {
  try {
    const messageVar = await prisma.variable.findUnique({
      where: { key: "message" },
    });

    if (messageVar) {
      return {
        message: messageVar.value,
        source: "database",
        status: "success",
      };
    } else {
      return {
        message: "fallback",
        source: "code",
        status: "not_found",
      };
    }
  } catch (error) {
    return {
      message: "error",
      source: "code",
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const getStatusMessage = () => {
    switch (loaderData.status) {
      case "success":
        return `✅ Message "${loaderData.message}" fetched from PostgreSQL database using Prisma`;
      case "not_found":
        return `⚠️ No "message" variable found in database, using fallback value`;
      case "failed":
        return `❌ Database connection failed: ${loaderData.error}`;
      default:
        return "❓ Unknown status";
    }
  };

  const getStatusColor = () => {
    switch (loaderData.status) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "not_found":
        return "text-yellow-600 dark:text-yellow-400";
      case "failed":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Hello, {loaderData.message}!
        </h1>
        <p className={`text-lg mb-8 ${getStatusColor()}`}>
          {getStatusMessage()}
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
