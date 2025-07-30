import { useLoaderData } from "react-router";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function loader() {
  return {
    testSecret: process.env.TEST_SECRET,
  };
}

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { testSecret } = useLoaderData<typeof loader>();
  return <Welcome testSecret={testSecret} />;
}
