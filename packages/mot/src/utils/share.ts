export function isUndef(v: any): boolean {
    return v === undefined || v === null
}

export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object'
}

export function isArray(obj: any): boolean {
    return Array.isArray(obj)
}

export function isFunction(v: any) {
    return typeof v === 'function'
}

export function clone(origin: any) {
    if (!isObject(origin) && !isArray(origin)) {
        console.error(`The argument must be an object or an array`)
        return
    }
    return JSON.parse(JSON.stringify(origin))
}

export function copyOptions(origin: Object, target: Object, map: string[]) {
    if (!isObject(origin) || !isObject(target)) {
        console.error(`The argument must be an object`)
        return
    }
    map.forEach((t) => {
        if (!isUndef(origin[t])) {
            if (isObject(origin[t])) {
                target[t] = clone(origin[t])
            } else {
                target[t] = origin[t]
            }
        }
    })
}

