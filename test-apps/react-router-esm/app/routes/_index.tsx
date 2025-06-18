
import type { MetaFunction } from "react-router";
import { registerReactEvent } from "web-events/react";
import { z } from "zod";
export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

const [dispatch, useEventListener ] = registerReactEvent("test", z.object({
  message: z.string(),
  count: z.number().optional(),
  date: z.date().optional(),
}));

export default function Index() {
  const { data } = useEventListener( )
  console.log("data", data);
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
