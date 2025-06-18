import type { StandardSchemaV1 } from "@standard-schema/spec"
import { standardValidate } from "./validate"

export type EventCallback<T extends StandardSchemaV1> = (data: StandardSchemaV1.InferOutput<T>) => void

export const registerEvent = <T extends StandardSchemaV1>(name: string, schema: T, eventInit?: CustomEventInit) => {
	const dispatch = async (data: StandardSchemaV1.InferInput<typeof schema>) => {
		if (typeof window === "undefined") {
			return undefined
		}
		const result = await standardValidate<T>(schema, data)
		const event = new CustomEvent(name, {
			...eventInit,
			detail: result,
		})
		window.dispatchEvent(event)
	}

	const listener = (onEvent: EventCallback<T>) => {
		if (typeof window === "undefined") {
			return () => {}
		}

		const handler = async (event: Event) => {
			if (event.type !== name) return
			const e = event as CustomEvent<StandardSchemaV1.InferOutput<T>>

			const data = await standardValidate<T>(schema, e.detail)

			onEvent(data)
		}
		window.addEventListener(name, handler)
		return () => window.removeEventListener(name, handler)
	}

	return [dispatch, listener] as const
}
