import { PrivateState } from './classes/private-state'
import { GenericObject } from '@benzed/types'

//// Main ////

/**
 * get a lazily initialized value for an object
 */
function lazy<T>(object: object, key: PropertyKey, initializer: () => T): T {
    const lazyState = PrivateState.for(lazy)
    if (!lazyState.has(object)) lazyState.set(object, {})

    const state = lazyState.get(object) as GenericObject
    if (key in state === false) state[key] = initializer()

    return state[key] as T
}

//// Exports ////

export default lazy

export { lazy }
