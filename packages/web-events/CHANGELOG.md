# @forge42/web-events

## 1.3.0

### Minor Changes

- 847a706: Added the useEvent hook

## 1.2.1

### Patch Changes

- 86cec29: Added support for custom event target in the `registerReactEvent` function.

  Made the registered events more performant by reusing the same event target for all events.

## 1.2.0

### Minor Changes

- f2c6b7d: Changed the underlying handler to EventTarget to support server-side events

## 1.1.0

### Minor Changes

- a1045d7: readme update

## 1.0.0

### Major Changes

- 52bf5ce: Initial release

## 1.0.0

### Major Changes

- 9374b32: Initial release

## 1.1.2

### Patch Changes

- 45ae372: Updated dependencies, fixed a bug with staging script
- ecd88f8: Migrated to tsdown from tsup

## 1.1.1

### Patch Changes

- 34f867e: Added provencance to the package release

## 1.1.0

### Minor Changes

- f2fbd38: Added changesets to the project
- e051f2f: We have migrated the web-events to use pnpm workspaces with changesets instead of the old npm approach with npm workspaces.
