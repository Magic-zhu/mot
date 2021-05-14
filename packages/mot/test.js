class AnimationLanguageSupport {
    constructor() {
        this.actions = []
    }

    translate() {
        return {

        }
    }

    scale() {
        return {

        }
    }

    rotate() {
        return {

        }
    }

    path() {

    }

    group(...args) {
        if (args.length == 0) return
        args.forEach((res) => {
            console.log(res)
        })
        return this
    }
}

let c = new AnimationLanguageSupport()
c.group(
    c.translate(1), 
    c.translate(2)
)
// export default AnimationLanguageSupport