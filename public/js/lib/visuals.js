var donut = c3.generate({
    bindto: '#donut',
    data: {
        url: window.location.href + '/gender-information',
        mimeType: 'json',
        type: 'pie',
        onclick: function (d, i) {
            console.log("onclick", d, i);
        },
        onmouseover: function (d, i) {
            console.log("onmouseover", d, i);
        },
        onmouseout: function (d, i) {
            console.log("onmouseout", d, i);
        }
    },
    pie: {
        title: 'Gender Percentage'
    },
    bar: {
        width: {
            ratio: 1 // this makes bar width 50% of length between ticks
        }
    }
});
var chart = c3.generate({
    bindto: '#chart',
    data: {
        url: window.location.href + '/gender-information',
        mimeType: 'json',
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 1 // this makes bar width 50% of length between ticks
        }
    }
});

var tuitionchart = c3.generate({
    bindto: '#tuitionchart',
    data: {
        url: window.location.href + '/tuition',
        mimeType: 'json',
        axes: {
        data: 'y2' // ADD
        
}

    },



});
