function fwd () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 160)
    pins.analogWritePin(AnalogPin.P16, 150)
}
function tr (pow: number) {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P16, pow)
}
function stop () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function tl (pow: number) {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, pow)
    pins.analogWritePin(AnalogPin.P16, 0)
}
let lv = 0
let rv = 0
let pow = 0
let th = 100
let P = 3
let pb = 200
basic.forever(function () {
    rv = pins.analogReadPin(AnalogPin.P0)
    lv = pins.analogReadPin(AnalogPin.P2)
    pow = Math.abs(rv - lv) / (rv + lv) * P
    if (Math.abs(rv - lv) < th) {
        basic.showNumber(0)
        fwd()
        basic.pause(130)
    } else {
        if (rv < lv) {
            basic.showNumber(1)
            tr(pb * pow)
            basic.pause(100)
        } else {
            basic.showNumber(2)
            tl(pb * pow)
            basic.pause(100)
        }
    }
    stop()
})
