"use strict";

(function() {

const width = 1200;
const height = 1000;


let projection = d3.geoMercator()
   .center([ -122.25, 37.75 ])
   .translate([ width/2, height/2 ])
   .scale([ width*250 ]);

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

// tooltip
let tip = main.append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0.0);

d3.json("data/oakland-parcels.json", function(json) {
    console.log(json);

    for(let i=0; i<json.features.length; i++)  {

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#FFF")
            .style("stroke-width", "2")
            .style("fill", "AAA");
    }
});

});

})();
