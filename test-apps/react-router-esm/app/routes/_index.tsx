
import type { MetaFunction } from "react-router";
import { registerReactEvent, useEvent } from "@forge42/web-events/react";
import { registerEvent } from "@forge42/web-events";
import { z } from "zod";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

const all = registerEvent("server-test", z.object({
  message: z.string(),
  count: z.number().optional(),
  date: z.date().optional(),
}));
const [dispatchServer, listenerServer] = all


export const loader = async () => {
  // Simulate server-side event dispatch
  setTimeout(() => {
    dispatchServer({ message: "Hello from the server!", count: 100, date: new Date() });
  }, 1000);

  listenerServer((data) => {
    console.log("Server event received:", data);
  });
  return {};
}

const [dispatch, useEventListener ] = registerReactEvent("test", z.object({
  message: z.string(),
  count: z.number().optional(),
  date: z.date().optional(),
}));

export default function Index() {
  const { data } = useEventListener( )
  const alsoData = useEvent(all, {
    onEvent: data => {
  data.count
}
  })
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li onClick={() => dispatch({ message: "Hello, world!", count: 42, date: new Date() })}>
            15m Quickstart Blog Tutorial
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
