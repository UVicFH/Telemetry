/*
    ToDo:
    - Adjust colour values and transition points
 */

// Speed Dial
speedDial = c3.generate({
    bindto: '#speedDial',
    data: {
        columns: [
            ['Speed', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 120 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// RPM Dial
rpmDial = c3.generate({
    bindto: '#rpmDial',
    data: {
        columns: [
            ['RPM', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 14000 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// Throttle Dial
throttleDial = c3.generate({
    bindto: '#throttleDial',
    data: {
        columns: [
            ['Throttle', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// Gear Dial
gearDial = c3.generate({
    bindto: '#gearDial',
    data: {
        columns: [
            ['Gear', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 5 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// Pack Voltage Dial
voltDial = c3.generate({
    bindto: '#voltDial',
    data: {
        columns: [
            ['Volt', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// Motor Current Dial
currentDial = c3.generate({
    bindto: '#currentDial',
    data: {
        columns: [
            ['Current', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: -420, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 420 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// Fuel Consumption Dial
fuelDial = c3.generate({
    bindto: '#fuelDial',
    data: {
        columns: [
            ['Fuel', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// Engine Temp Dial
tempDial = c3.generate({
    bindto: '#tempDial',
    data: {
        columns: [
            ['Temp', -1]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 220 // 100 is default
        // units: ' %',
        // width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            unit: 'percentage', // percentage is default
            // max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 90
    }
});

// var update = function(value) {
//     display.load({
//         columns: [[this.type, value]]
//     })
// };