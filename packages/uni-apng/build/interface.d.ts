interface Frame {
    width?: number
    height?: number
    left?: number
    top?: number
    delay?: number
    disposeOp?: number
    blendOp?: number
    dataParts?: any[]
}

type FrameItem = Frame | null

interface AnimationOptions {
    rate?: number
    playNum?: number
}

interface HookMap {
    [key:string]:any
}

export { AnimationOptions, FrameItem, HookMap };
