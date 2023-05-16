function fwd () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 160)
    pins.analogWritePin(AnalogPin.P16, 150)
}
function tr () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P16, 150)
}
function stop () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function tl () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 160)
    pins.analogWritePin(AnalogPin.P16, 0)
}
let lv = 0
let rv = 0
let th = 100
basic.forever(function () {
    rv = pins.analogReadPin(AnalogPin.P0)
    lv = pins.analogReadPin(AnalogPin.P2)
    if (Math.abs(rv - lv) < th) {
        basic.showNumber(0)
        fwd()
        basic.pause(200)
        stop()
    } else {
        if (rv < lv) {
            basic.showNumber(1)
            tr()
            basic.pause(100)
            stop()
        } else {
            basic.showNumber(2)
            tl()
            basic.pause(100)
            stop()
        }
    }
})
