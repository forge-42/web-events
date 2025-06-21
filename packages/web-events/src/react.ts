import type { StandardSchemaV1 } from "@standard-schema/spec"
import { useEffect, useState } from "react"
import { type EventCallback, type ExtendedEventEmit, registerEvent } from "."

type EventListenerArguments<T extends StandardSchemaV1> = {
	onEvent?: EventCallback<T>
}

export const registerReactEvent = <T extends StandardSchemaV1>(
	name: string,
	schema: T,
	eventInit?: ExtendedEventEmit
) => {
	const [dispatch, listener] = registerEvent(name, schema, eventInit)

	const useEventListener = (args?: EventListenerArguments<T>) => {
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

export function useEvent<T extends StandardSchemaV1>(
	[_, listener]: ReturnType<typeof registerEvent<T>>,
	args?: EventListenerArguments<T>
) {
	const [data, setData] = useState<StandardSchemaV1.InferOutput<T> | null>(null)
	useEffect(() => {
		const cleanup = listener((d) => {
			setData(d)
			args?.onEvent?.(d)
		})

		return cleanup
	}, [listener, args?.onEvent])

	return data
}
