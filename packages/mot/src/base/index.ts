import {
    Plugin,
    PluginsMap,
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

    static create() {
        return new AnimationLanguageSupport()
    }
}

export default Motion