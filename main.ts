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
let P = 6
let pb = 250
basic.forever(function () {
    rv = pins.analogReadPin(AnalogPin.P0)
    lv = pins.analogReadPin(AnalogPin.P2)
    pow = pb * Math.constrain(Math.abs(rv - lv) / (rv + lv) * P, 0.6, 2)
    if (Math.abs(rv - lv) < th) {
        fwd()
    } else {
        if (rv < lv) {
            tr(pow)
        } else {
            tl(pow)
        }
    }
})
