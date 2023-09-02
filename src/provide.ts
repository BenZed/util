import { PrivateState } from './classes/private-state'
import { Func, isObject } from '@benzed/types'

import { memoize, Memoized } from './memoize'

//// TODO: decorator or delete ////

//// EsLint ////

/* eslint-disable 
    @typescript-eslint/no-explicit-any
*/

//// Types ////

interface Provider<F extends Func = Func, C = unknown> {
    (ctx: C): F
}

type Provided<P extends Provider> = P extends Provider<infer F, unknown>
    ? F
    : Func

//// Helper ////

function getMemoizedProvider<P extends Provider<Func, any>>(
    provider: P,
    key: object = provider
): Provided<P> {
    const memoProviders: PrivateState<
        object,
        Memoized<Provider>
    > = PrivateState.for(provide)
    if (!memoProviders.has(key)) memoProviders.set(key, memoize(provider))

    const memoProvider = memoProviders.get(key)
    return memoProvider as Provided<P>
}

//// Main ////

function provide<P extends Provider>(provider: P): Provider<P>
function provide<F extends Func, C>(provider: Provider<F, C>): Provider<F, C>
function provide<F extends Func, C extends object>(
    ctx: C,
    provider: Provider<F, C>
): F
/**
 * @deprecated Going to turn this into a decorator
 */
function provide(...args: [Provider] | [unknown, Provider]): Func {
    const isWithContextSignature = args.length === 2
    if (!isWithContextSignature) {
        const [provider] = args
        return getMemoizedProvider(provider)
    }

    const [ctx, provider] = args
    if (!isObject(ctx))
        throw new Error(
            'Providing by context requires the context to be an object.'
        )

    const memoProvider = getMemoizedProvider(provider, ctx)
    return memoProvider(ctx)
}

//// Exports ////

export default provide

export { provide, Provider }
