const pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

const instructMap = {
    "M":1,
}
class PathPlugin {
    constructor() {

    }

    static install() {

    }

    linear(t) {
        return +t
    }

    easeIn(t) {
        return t*t
    }
}

export default PathPlugin
