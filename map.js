var map = L.map('map').setView([41.32615001525243, 19.818005561828613], 15);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Thunderforest_SpinalMap = L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=8ae0f34b92e14d3f801a0509192d6d3e', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: '<your apikey>',
    maxZoom: 22
}).addTo(map);

var startPoint = [41.32615001525243, 19.818005561828613];
var first = false;
var points = [{
        "point": [41.3164003679006, 19.449920654296875],
        "zoom": 14
    }, {
        "point": [42.065447456788455, 19.523134231567383],
        "zoom": 14
    }, {
        "point": [40.46663747726647, 19.482107162475582],
        "zoom": 14
    },
    {
        "point": startPoint,
        "zoom": 14
    }
];

var duration = 3;
var index = 0;
Thunderforest_SpinalMap.on('load', function (e) {

    if (first) return;
    first = true;
    animation();
});

function animation() {
    if (index >= points.length) return;
    console.log(index);
    var timeout = (index == 0) ? 500 : duration * 1000 + 850;
    console.log("timeout", timeout);
    var point = points[index].point;
    var zoom = points[index].zoom;
    setTimeout(function () {
        fly(point, zoom);
    }, timeout);

    index++;
}

function fly(position, zoom) {
    console.log('flyyy');
    //map.flyTo(position,zoom,{pan:{easeLinearity: 1}});
    map.flyTo(position, zoom, {
        duration: duration,
        easeLinearity: 1
    });
    animation();
}