'use strict';

(function() {

const width = 1200;
const height = 1000;


let projection = d3.geoMercator()
   .center([ -122.23, 37.76 ])
   .translate([ width/2, height/2 ])
   .scale([ width*150 ])
   .rotate([0, 0, 0]);

let path = d3.geoPath()
    .projection(projection);

let main = d3.select('body').append('div')
    .attr('class', 'map');

// main body svg element
let svg = main.append('svg')
    .attr("width", width)
    .attr("height", height);

let color = d3.scaleOrdinal()
    .range(["red","blue","purple"]);

// // tooltip
// let tip = main.append('div')
//     .attr('class', 'tooltip')
//     .style('opacity', 0.0);

// let text = tip.append('text')
//     .attr('dy', '.35em')
//     .text(function (d, i) {return d});

let label = '';

svg.append('text')
    .attr('id', 'label')
    .text(label)
    .attr('dx', +20)
    .attr('dy', +50)
    .style('text-anchor', 'left');

d3.json("data/ZillowNeighborhoods-Oakland.geojson", function (err, json) {
    if (err) throw err;

    console.log(json);
    var oakland = json.features;

    d3.csv("data/OaklandNeighborhood_Zri_SingleFamilyResidenceRental.csv", function (err, data) {

        data.forEach(function (d, i) {
            oakland.forEach(function (neighborhood, j) {
                // console.log(d.RegionName);
                // console.log(neighborhood.properties.Name);
                if (d.RegionName === neighborhood.properties.Name) {
                    console.log(neighborhood.properties.Name);

                    svg.selectAll("path")
                        .data(oakland).enter()
                        .append("path")
                        .attr("d", path)
                        .on("mouseover", function (d, i) {
                            reporter(d);
                        })
                        .style("stroke", "#DDD")
                        .style("stroke-width", "2")
                        .style("fill", "AAA");

                }
            });
        });
    });

    function reporter(x) {
        console.log(x)
        d3.select("#label").text(function() {
            return x.properties.Name;
        });
    }

});

})();
