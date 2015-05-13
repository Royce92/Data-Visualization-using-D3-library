var chart = c3.generate({
    bindto: '#topten',
    data: {
        url: 'http://localhost:3000/colleges/topten',
        mimeType: 'json',
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 1 // this makes bar width 50% of length between ticks
        }
    }
});