import { IS_NODE } from './constants'

/**
 * Convert a base 64 string to a utf-8 string
 */
export function toBase64(base64: string): string {
    if (IS_NODE) return Buffer.from(base64, 'base64').toString('utf-8')
    else return window.atob(base64)
}

/**
 * Convert a utf-8 string to a base64 string
 */
export function fromBase64(utf8: string): string {
    if (IS_NODE) return Buffer.from(utf8, 'utf-8').toString('base64')
    else return window.btoa(utf8)
}
