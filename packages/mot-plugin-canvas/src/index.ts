class CanvasRender {

    static pluginName: string = 'CanvasRender'
    static installed: boolean = false
    static mot: any

    static install(mot: any){
        this.mot = mot
    }
}

if (window['CanvasRender']) {
    console.warn(`'CanvasRender' had been used,and it will be covered`);
}

window['CanvasRender'] = CanvasRender

export default CanvasRender