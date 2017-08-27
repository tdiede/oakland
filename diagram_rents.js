'use strict';

(function() {

const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1080 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let x = d3.scaleLinear().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

// let line = d3.line()
// 	.x(function (d, i) { return x(i); })
// 	.y(function (d, i) { return y(d); });

// main body svg element
let svg = d3.select('body').append('svg')
	.attr('class', 'diagram')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

// let color = d3.scaleOrdinal()
//     .range(["red","blue","purple"]);

let label = '';

svg.append('text')
    .attr('id', 'label')
    .text(label)
    .attr('dx', +20)
    .attr('dy', +50)
    .style('text-anchor', 'left');

d3.csv("data/OaklandNeighborhood_Zri_SingleFamilyResidenceRental.csv", function (err, neighborhoods) {
	if (err) throw err;

	const parseTime = d3.timeParse('%Y-%m');
	const formatTime = d3.timeFormat('%B %Y');

	const headerNames = d3.keys(neighborhoods[0]);
	const months = headerNames.slice(7);
	const formattedMonths = [];
	const allRents = [];

	months.forEach(function (m, i) {
		formattedMonths.push(formatTime(parseTime(m)));
		neighborhoods.forEach(function (d, j) {
			allRents.push({ 'rent' : d[m], 'neighborhood' : d.RegionName, 'month' : formattedMonths[i] });
		});
	})

	x.domain([0, months.length]);
	y.domain([0, d3.max(allRents, function(c) { return d3.max(c.rent); })
        ]);

    // var valueline = d3.line()
    //     .x(function(d) { return x(d.date); })
    //     .y(function(d) { return y(d.close); });

    // svg.selectAll("path")
    //     .data(allRents).enter()
    //     .attr("class", "line")
    //     .attr("d", function(d) { return line.get(this)(d.rent); });

// Add the X Axis
  svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append('g')
      .call(d3.axisLeft(y));

});

})();
