function fwd () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 140)
    pins.analogWritePin(AnalogPin.P16, 130)
}
function tr (pow: number) {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P16, pow)
}
function log () {
    datalogger.log(
    datalogger.createCV("pow", pow),
    datalogger.createCV("rv", rv),
    datalogger.createCV("lv", lv)
    )
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
let pb = 130
datalogger.setColumnTitles(
"pow",
"rv",
"lv"
)
basic.forever(function () {
    rv = pins.analogReadPin(AnalogPin.P0)
    lv = pins.analogReadPin(AnalogPin.P2)
    pow = pb * Math.constrain(Math.abs(rv - lv) / (rv + lv) * P, 1, 2.5)
    if (Math.abs(rv - lv) < th) {
        fwd()
    } else {
        if (rv < lv) {
            tr(pow)
        } else {
            tl(pow)
        }
    }
    log()
})
