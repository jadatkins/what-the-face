import { SignInButton } from "@clerk/react-router";
import { getAuth } from "@clerk/react-router/server";
import { redirect } from "react-router";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);
  if (userId) throw redirect("/app");
  return { foo: process.env.FOO };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Welcome foo={loaderData.foo}>
      <SignInButton mode="modal" forceRedirectUrl="/app">
        <button
          type="button"
          className="px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Sign in
        </button>
      </SignInButton>
    </Welcome>
  );
}
