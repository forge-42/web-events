---
"@forge42/web-events": patch
---

Added support for custom event target in the `registerReactEvent` function.

Made the registered events more performant by reusing the same event target for all events.
