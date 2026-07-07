import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react-router";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader(_args: Route.LoaderArgs) {
  return { foo: process.env.FOO };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <header className="flex items-center justify-end gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <Show when="signed-out">
          <SignInButton>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Sign up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <Welcome foo={loaderData.foo} />
    </>
  );
}
