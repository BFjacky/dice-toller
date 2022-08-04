const supportTouch = 'ontouchstart' in document.documentElement
export const downEvent = supportTouch ? 'touchstart' : 'mousedown'
export const moveEvent = supportTouch ? 'touchmove' : 'mousemove'
export const upEvent = supportTouch ? 'touchend' : 'mouseup'
export function commonEvent(e) {
    if (supportTouch) {
        e.x = e.targetTouches[0].clientX
        e.y = e.targetTouches[0].clientY
    }
    return e
}
