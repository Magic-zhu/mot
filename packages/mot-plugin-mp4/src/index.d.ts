
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

export type FrameItem = Frame | null

export interface AnimationOptions {
    rate?: number
    playNum?: number
    keep?:boolean
}

export interface HookMap {
    [key:string]:any
}

export interface MVHDInfo {
  version: number,
  flags: Uint8Array,
  createTime: number,
  modifyTime: number,
  timeScale: number,
  duration: number,
  rate: number,
}
