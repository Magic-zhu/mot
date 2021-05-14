import Motion from './base/index'

let mot = Motion

if (window['mot']) {
    console.warn(`'mot' had been used,and it will be covered`);
}

window['mot'] = mot

export default mot