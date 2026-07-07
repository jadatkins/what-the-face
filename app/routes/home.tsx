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
  return <Welcome foo={loaderData.foo} />;
}
