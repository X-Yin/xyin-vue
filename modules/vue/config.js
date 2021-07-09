export const TouchEvent = ['touchstart', 'touchmove', 'touchcancel', 'touchend'];
export const MouseEvent = ['mouseup', 'mousedown', 'mouseenter', 'mouseleave',
    'mouseout', 'mousemove', 'mouseover'];
export const ClickEvent = ['click', 'dblclick', 'auxclick', 'contextmenu', 'pointerlockchange',
    'pointerlockerror', 'select', 'wheel'];
export const DragEvent = ['drag', 'dragend', 'dragenter', 'dragleave', 'dragstart', 'dragover', 'drop'];
export const InputEvent = ['input', 'change', 'focus', 'blur'];
export const MediaEvent = ['canplay', 'play', 'pause', 'complete', 'emptied', 'ended', 'playing',
    'seeked', 'ratechange', 'seeking', 'stalled', 'suspend', 'timeupdate','volumechange', 'waiting'];
export const ProgressEvent = ['abort', 'load', 'error', 'loadend', 'progress', 'timeout', 'loadstart'];
export const KeyEvent = ['keydown', 'keypress', 'keyup'];

export const EventKeyList = [
    ...TouchEvent,
    ...MouseEvent,
    ...ClickEvent,
    ...DragEvent,
    ...InputEvent,
    ...MediaEvent,
    ...ProgressEvent,
    ...KeyEvent
];
