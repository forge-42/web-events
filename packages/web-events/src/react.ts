import type { StandardSchemaV1 } from "@standard-schema/spec"
import { useEffect, useState } from "react"
import { type EventCallback, type ExtendedEventEmit, registerEvent } from "."

export const registerReactEvent = <T extends StandardSchemaV1>(
	name: string,
	schema: T,
	eventInit?: ExtendedEventEmit
) => {
	const [dispatch, listener] = registerEvent(name, schema, eventInit)

	const useEventListener = (args?: { onEvent?: EventCallback<T> }) => {
		const { onEvent } = args || {}
		const [data, setData] = useState<StandardSchemaV1.InferOutput<T> | null>(null)
		useEffect(() => {
			const cleanup = listener((d) => {
				setData(d)
				onEvent?.(d)
			})

			return cleanup
		})
		return { data }
	}
	return [dispatch, useEventListener] as const
}
