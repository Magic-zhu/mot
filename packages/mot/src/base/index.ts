import {
    Plugin,
    PluginsMap,
    MoveOptions,
    ScaleOptions,
    RotateOptions,
    AttributeOptions,
} from '../@types'
import EventEmitter from '../core/EventEmitter'
import AnimationLanguageSupport from '../core/AnimationLanguageSupport'
import { isUndef } from '../utils/share'

class Motion extends EventEmitter {

    static plugins: PluginsMap = {}

    static use(plugin: Plugin) {
        const pluginName = plugin.pluginName
        if (isUndef(pluginName)) {
            console.error(`Plugin Class must specify plugin's name in static property by 'name' field.`)
            return this
        }
        if (isUndef(plugin.installed)) {
            console.error(`Plugin Class must specify plugin's installed in static property by 'installed' field.`)
            return this
        }
        if (isUndef(plugin.install)) {
            console.error(`Plugin Class must have an install method.`)
            return this
        }
        if (this.plugins[pluginName] != undefined) {
            console.log("🌈This plugin has been registered, maybe you could change plugin's name")
            return this
        }
        plugin.install(Motion)
        plugin.installed = true
        this.plugins[pluginName] = plugin
        return this
    }

    static current: HTMLElement = null

    constructor() {
        super()
    }

    static register(methodName: string, method: Function) {

        if (!isUndef(this[methodName])) {
            console.error(`${methodName} has already exist`)
            return
        }
        this[methodName] = method
    }

    // TODO: 插件注册方法 类型检测问题 预先定义
    static createPath: Function
    static dom: Function

    static create() {
        return new AnimationLanguageSupport()
    }

    // for dom animation
    static get(id: string) {
        this.current = document.getElementById(id)
        return this
    }

    static checkIfHasDomRender(callback) {
        if (this.plugins['DomRender'] === undefined) {
            console.error(`plugin miss:this function is based on 'domRender' plugin`)
            return
        }
        callback()
    }

    static moveTo(options: MoveOptions | number, y?: number, duration?: number) {
        this.checkIfHasDomRender(() => {
            let ani = this.create().moveTo(options, y, duration);
            this.dom(this.current, ani).render();
        })
        return this
    }

    static scale(options: ScaleOptions | number, y?: number, duration?: number) {
        this.checkIfHasDomRender(() => {
            let ani = this.create().scale(options, y, duration);
            this.dom(this.current, ani).render();
        })
        return this
    }

    static rotate(options: RotateOptions | number, duration?: number) {
        this.checkIfHasDomRender(() => {
            let ani = this.create().scale(options, duration);
            this.dom(this.current, ani).render();
        })
        return this
    }

    static attribute(options: AttributeOptions|string, value?: string, duration?: number) {
        this.checkIfHasDomRender(() => {
            let ani = this.create().attribute(options, value, duration);
            this.dom(this.current, ani).render();
        })
        return this
    }
}

export default Motion