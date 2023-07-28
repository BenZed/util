import { swap } from './swap'
import { it, expect } from '@jest/globals'

it('swaps two keys of an object', () => {
    const object = {
        ace: 1,
        base: 2
    }

    swap(object, 'ace', 'base')

    expect(object).toEqual({ ace: 2, base: 1 })
})

it('swaps two indexes of an array', () => {
    const arr = ['one', 'two']
    swap(arr, 0, 1)

    expect(arr).toEqual(['two', 'one'])
})

it('errors on immutable objects', () => {
    interface Locked {
        readonly id: string
        readonly secret: string
    }

    const locked: Locked = { id: '001', secret: 'secret' }

    // @ts-expect-error These keys should not be mutated, they are readonly
    swap(locked, 'id', 'secret')
})

it('keys must have same value type', () => {
    const obj = { one: 1, two: '2' }

    // @ts-expect-error These values types do not match
    swap(obj, 'one', 'two')
})
