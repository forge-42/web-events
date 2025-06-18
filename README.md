

# 📦 @forge42/web-events

**A tiny web-standards based utility for event-driven web apps.**

![GitHub Repo stars](https://img.shields.io/github/stars/forge-42/web-events?style=social)
![GitHub](https://img.shields.io/github/license/forge-42/web-events?style=plastic)
![npm](https://img.shields.io/npm/v/@forge42/web-events?style=plastic)
![npm](https://img.shields.io/npm/dy/@forge42/web-events?style=plastic)
![npm](https://img.shields.io/npm/dw/@forge42/web-events?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/forge-42/web-events?style=plastic)


Leverages [`@standard-schema/spec`](https://www.npmjs.com/package/@standard-schema/spec) to safely dispatch and listen to custom events in the browser.


## ✨ Features
- 🛡️ **Zero dependencies** for a lean footprint
- ✅ **Type-safe** event dispatching and listening
- 🔎 **Runtime validation** powered by `@standard-schema/spec`
- 🧪 **Minimal, browser-only API**
- 🪶 **Lightweight** and framework-agnostic

---

## 📦 Installation

```bash
npm install @forge42/web-events
# or
pnpm add @forge42/web-events
```

## 📖 Usage

### Core API

```ts
import { registerEvent } from "@forge42/web-events"
import { z } from "zod"

// Define your schema
const UserLoggedIn = z.object({
  userId: z.string(),
  timestamp: z.number(),
})

// Register event
const [dispatch, listener] = registerEvent("user:logged-in", UserLoggedIn)

// Listen for event
const unsubscribe = listener((data) => {
  console.log("User logged in:", data.userId)
})

// Dispatch event
dispatch({
  userId: "abc123",
  timestamp: Date.now(),
})
```

The `registerEvent` function returns a tuple containing the `dispatch` function and the `listener` function. The `listener` can be used to subscribe to the event, and it returns an `unsubscribe` function to stop listening.
```ts
const [dispatch, listener] = registerEvent("user:logged-in", UserLoggedIn)
```

Once the event is registered, you can dispatch it with the expected data structure, and it will be validated against the schema.

```ts
// This will match the schema provided to the registerEvent function
dispatch({
  userId: "abc123",
  timestamp: Date.now(),
})
```

If you want to listen to the incoming events in your application, you can use the `listener` function. It accepts a callback that will be invoked with the validated data whenever the event is dispatched.

```ts
const unsubscribe = listener((data) => {
	console.log("User logged in:", data.userId)
})

// Optionally you can unsubscribe later
unsubscribe()
```

### React

You can also use `@forge42/web-events` in a React application. It comes with a React specific API that allows you to register and listen to events in a more React-friendly way.

```tsx
import { registerReactEvent } from "@forge42/web-events/react"
import { z } from "zod"
const UserLoggedIn = z.object({
	userId: z.string(),
	timestamp: z.number(),
})
// Register event
const [dispatchUserLogin, useUserLoggedInEvent] = registerReactEvent("user:logged-in", UserLoggedIn)

// Use the event in a React component
export default function UserComponent() {
	const userLoggedIn = useUserLoggedInEvent()

	const handleLogin = () => {
		dispatchUserLogin({
			userId: "abc123",
			timestamp: Date.now(),
		})
	}

	return (
		<div>
			<button onClick={handleLogin}>Log In</button>
			{userLoggedIn && <p>User logged in: {userLoggedIn.userId}</p>}
		</div>
	)
}

```

The `registerReactEvent` function returns a tuple containing the `dispatch` function and a custom React hook (`useEventListener`) that you can use to access the event data in your components. The hook accepts
an object with an `onEvent` callback that will be called whenever the event is received.

 ```tsx
const [dispatch, useEventListener] = registerReactEvent("user:logged-in", UserLoggedIn)
// Use the event in a React component
export default function UserComponent() {
	const userLoggedIn = useEventListener({
		onEvent: (data) => {
			console.log("User logged in:", data.userId)
		},
	})

	const handleLogin = () => {
		dispatch({
			userId: "abc123",
			timestamp: Date.now(),
		})
	}

	return (
		<div>
			<button onClick={handleLogin}>Log In</button>
			{userLoggedIn && <p>User logged in: {userLoggedIn.userId}</p>}
		</div>
	)
}
```


### Schema Validation

The library accepts any schema compatible with `@standard-schema/spec`, such as Zod, Yup, or Joi. This allows you to define the structure of your event data and ensures that only valid data is dispatched.
```ts
import { z } from "zod"
const UserLoggedIn = z.object({
	userId: z.string(),
	timestamp: z.number(),
})
```


### Framework Integration
You can easily integrate `@forge42/web-events` with popular frameworks like React, Vue, or Svelte. Here's an example for React:

```tsx
import React, { useEffect } from "react"
import { registerEvent } from "@forge42/web-events"

const UserLoggedIn = z.object({
	userId: z.string(),
	timestamp: z.number(),
})
// Do not initialize the event inside the component to avoid re-registering on every render
const [dispatch, listener] = registerEvent("user:logged-in", UserLoggedIn)

const UserComponent = () => {
	useEffect(() => {
		const unsubscribe = listener((data) => {
			console.log("User logged in:", data.userId)
		})

		return () => {
			unsubscribe() // Cleanup on unmount
		}
	}, [])

	const handleLogin = () => {
		dispatch({
			userId: "abc123",
			timestamp: Date.now(),
		})
	}

	return <button onClick={handleLogin}>Log In</button>
}

export default UserComponent
```

## 🛡️ Type Safety

This utility uses your schema to infer:

dispatch(input) expects data that matches the input schema

listener(callback) receives validated and parsed data

## 🗂️ Example Use Case

Use it to:

Broadcast form submissions

Track user interactions across decoupled modules

Replace fragile string-based pub/sub logic with type-safe guarantees

## 📄 License

MIT License