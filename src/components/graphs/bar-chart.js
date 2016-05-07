import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import { changeData } from './data';

export default class BarChart extends React.Component{

	componentDidMount(){
		this.renderChart();
	}

	renderChart(){
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
			width = 500 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom;

		var x0 = d3.scale.ordinal()
			.rangeRoundBands([0, width], 0.1);

		var x1 = d3.scale.ordinal();

		var y = d3.scale.linear()
			.range([height, 0]);

		var color = d3.scale.ordinal()
			.range(["rgba(230, 115, 115, 0.83)", "rgba(244, 67, 54, 0.85)"]);

		var xAxis = d3.svg.axis()
			.scale(x0)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickFormat(d3.format(".2s"));

		var svg = d3.select("#chartArea").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var data = changeData;
			//Removes the first element of the array the "Years" item and creates a new array
			//of category names e.g ["closed", "open"]
			// var _category = d3.keys(data[0]).filter(function(key) { return key !== "Years"; });
      const _category = ['closed', 'open'];

			// This function is used to make grid lines
			// function make_x_axis() {
		  //   return d3.svg.axis()
	    //     .scale(x0)
	    //      .orient("bottom")
	    //      .ticks(5)
			// }

			// This function is used to make grid lines
			function make_y_axis() {
		    return d3.svg.axis()
	        .scale(y)
	        .orient("left")
	        .ticks(5)
			}

			data.forEach(function(d) {
				d._object = _category.map(function(name) { return {name: name, value: +d[name]}; });
		  });

		//Passes to x0.domain the Years ["2013", "2014", "2015"]
		x0.domain(data.map(d => d.Years));
		x1.domain(_category).rangeRoundBands([0, x0.rangeBand()]);
		// From the 'data' array 'open' is used to set the domain of y as it always has the largest values which are used to set the height of y.
		y.domain([0, d3.max(data, d => d.open)]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 2)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Change Controls");

		// Adding in x grid lines
		// svg.append("g")
    //   .attr("class", "grid")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(make_x_axis()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat("")
    //   );

		// Adding in y grid lines
    svg.append("g")
      .attr("class", "grid")
      .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat("")
      );

		var state = svg.selectAll(".state")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d) { return "translate(" + x0(d.Years) + ",0)"; });

		state.selectAll("rect")
			.data(d => d._object)
			.enter().append("rect")
			.attr("class", "rectclass")
			.attr("width", x1.rangeBand())
			.attr("x", d => x1(d.name))
			.attr('y', 250)
			.attr('height', 0)
			.style("fill", function(d) { return color(d.name); })
			.transition()
			.duration(2000)
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); })
			.style("fill", function(d) { return color(d.name); })


		var legend = svg.selectAll(".legend")
			.data(_category.slice().reverse())
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", "translate(0,-10)");

		legend.append("rect")
			.attr("x", width - 18)
			.attr("y", function(d, i){ return i *  20;})
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);

		legend.append("text")
			.attr("x", width - 24)
			.attr("y", function(d, i){ return i *  20 + 9;})
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function(d) { return d; });
	}


	render(){
		return <div id="chartArea"></div>
	}
}
