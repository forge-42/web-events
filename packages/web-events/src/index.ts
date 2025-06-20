import type { StandardSchemaV1 } from "@standard-schema/spec"
import { standardValidate } from "./validate"

export type EventCallback<T extends StandardSchemaV1> = (data: StandardSchemaV1.InferOutput<T>) => void

export const registerEvent = <T extends StandardSchemaV1>(name: string, schema: T, eventInit?: CustomEventInit) => {
	const emitter = new EventTarget()
	const dispatch = async (data: StandardSchemaV1.InferInput<typeof schema>) => {
		const result = await standardValidate<T>(schema, data)
		const event = new CustomEvent(name, {
			...eventInit,
			detail: result,
		})
		emitter.dispatchEvent(event)
	}

	const listener = (onEvent: EventCallback<T>) => {
		const handler = async (event: Event) => {
			if (event.type !== name) return
			const e = event as CustomEvent<StandardSchemaV1.InferOutput<T>>

			const data = await standardValidate<T>(schema, e.detail)

			onEvent(data)
		}
		emitter.addEventListener(name, handler)
		return () => emitter.removeEventListener(name, handler)
	}

	return [dispatch, listener] as const
}
