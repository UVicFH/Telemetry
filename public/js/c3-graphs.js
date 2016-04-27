var speedGraphData = new Array(50).fill(0);
var speedGraph = c3.generate({
    bindto: '#speedGraph',
    size: {
        height: 200
    },
    transition: {
        duration: 0
    },
    axis: {
        y: {
            min: 0,
            max: 120
        }
    },
    data: {
        columns: [
            ['Speed']
        ]
    }
});

var rpmGraphData = new Array(50).fill(0);
var rpmGraph = c3.generate({
    bindto: '#rpmGraph',
    size: {
        height: 200
    },
    transition: {
        duration: 0
    },
    axis: {
        y: {
            min: 0,
            max: 14000
        }
    },
    data: {
        columns: [
            ['RPM']
        ]
    }
});

var voltGraphData = new Array(50).fill(0);
var voltGraph = c3.generate({
    bindto: '#voltGraph',
    size: {
        height: 200
    },
    transition: {
        duration: 0
    },
    axis: {
        y: {
            min: 0,
            max: 100
        }
    },
    data: {
        columns: [
            ['Volt']
        ]
    }
});