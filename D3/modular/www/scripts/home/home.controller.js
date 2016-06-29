(function() {
	'use strict';

	angular
		.module('basicapp.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$window','menuItems'];

	function HomeController($window, menuItems) {
		var vm = angular.extend(this, {
		});
		
		//CONTROLLER HERE
		var myProject =  
		{
			"name":"MyProject",
			"attributes":[
				{"name":"Maths","desc":""},
				{"name":"English","desc":""},
				{"name":"Science","desc":""},
				{"name":"PE","desc":""},
				{"name":"RE","desc":""},
				{"name":"IT","desc":""}],
			"style":10,
			"dataSets":[
				{
					"date":"2016-05-12T10:38:00.000Z",
					"data":[
						{"attribute":"Maths","value":"10"},
						{"attribute":"English","value":"7"},
						{"attribute":"Science","value":"8"},
						{"attribute":"PE","value":"10"},
						{"attribute":"RE","value":"2"},
						{"attribute":"IT","value":"9"}],
					"tag":"myDataSetTag"
				},{
					"date":"2016-06-12T10:38:00.000Z",
					"data":[
						{"attribute":"Maths","value":"1"},
						{"attribute":"English","value":"5"},
						{"attribute":"Science","value":"2"},
						{"attribute":"PE","value":"5"},
						{"attribute":"RE","value":"2"},
						{"attribute":"IT","value":"3"}],
					"tag":"2ndData"
				}
			]
		}
		
		vm.project = myProject;
		vm.noOfSets = vm.project.dataSets.length - 1;
		vm.index = vm.noOfSets;
		
		var w = $window.innerWidth;//425;
		var h = $window.innerHeight;//800;
		h = h-(44*2)-32; //HAS-HEADER AND FOOTER!!!!!
		
		var s;
		if (w < h){
			s = w;
		} else {
			s = h;
		}
		var cY = s/2;
		
		
		var svg = d3.select("svgggg")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

		//box area attop the page
		//var titleArea = svg.append("rect")
		//		.attr("x", 0)
		//		.attr("y", 0)
		//		.attr("height", h/10)
		//		.attr("width", w)
		//		.attr("fill", "rgba(255,0,0,0.2)")
		//		.attr("stroke-width",1)
		//		.attr("stroke","rgba(200,0,0,1)");
					
		var chartset = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
		
		if(vm.project.style === 3)
		{	
			chartset = [ 0.333333333, 0.66666666666, 1.0];
		}
		var r = (s/2);
		
		var circles = svg.selectAll("circle")
							.data(chartset)
							.enter()
							.append("circle"); 
		
		circles.attr("cx", w/2)
			.attr("cy", cY)
			.attr("r", function(d) {return r*d*0.8;})
			.attr("fill", "rgba(0, 0, 0, 0)")
			.attr("stroke", "rgba(0,0,0,0.5)")
			.attr("stroke-width", 1);	
			
		var spokes = svg.selectAll("line")
						.data(vm.project.attributes)
						.enter()
						.append("line");
						
		spokes.attr("x1", w/2)
			.attr("y1", cY)
			.attr("x2", function(d, i) {
				var angle = ((2*Math.PI / vm.project.attributes.length)*i)-Math.PI/2;
				var x2 = (w/2 + r*(0.85) * Math.cos(angle));
				return x2;
			})
			.attr("y2", function(d, i) {
				var angle = ((2*Math.PI / vm.project.attributes.length)*i)-Math.PI/2;
				var y2 = (cY + r*(0.85) * Math.sin(angle));
				return y2;
			})
			.attr("stroke", "rgba(0,0,0,1)")
			.attr("stroke-width", 1);
					
		var labelPoints = [];
		(vm.project.attributes).forEach(function(d, i) {
			var angle = ((2*Math.PI / vm.project.attributes.length)*i)-Math.PI/2;
			
			var fx = (w/2 + ((r*0.9) * Math.cos(angle)));
			var fy = (cY + ((r*0.9) * Math.sin(angle)));
			
			labelPoints.push({"fx":fx,"fy":fy});
		});
		
		//drawing attribute labels
		var labels = svg.selectAll("text")
						.data(vm.project.dataSets[vm.index].data)
						.enter()
						.append("text");
			
		labels	.attr("font-size", function(){
					return Math.round(s*0.04);
				})
				.attr("transform", function(d, i) {
					var ang = ((360 / vm.project.dataSets[vm.index].data.length)*i)-Math.PI/2;
					if(ang > 90 && ang < 270) {
						ang = ang-180;
					}
					return "translate("+labelPoints[i].fx+","+labelPoints[i].fy+") rotate("+ang+",0,0)";
				})
				//.attr("x", function(d, i) { return labelPoints[i].fx;})
				//.attr("y", function(d,i){ return labelPoints[i].fy;})
				.text (function(d){ 
				// clip attribute name to 10characters
					if((d.attribute).length > 10){
						return ((d.attribute).slice(0,9)+ "...");
					}
					return d.attribute;
				}) 
				.attr("text-anchor", "middle")
				.attr("dy", "0.35em")
				/*function(d,i) {
					//un-used due to using rotating text
					//vertically aligns text, using their y.pos (brings high down and low up for better presentation)
						if(labelPoints[i].fy > h*0.9) {
							return "0";
						} 
						else if (labelPoints[i].fy < h*0.1) {
							return ".71em";
						}
						else {
							return "0.35em";
						}
					}) */
				//.attr("stroke-width", 1)
				//.attr("stroke", "rgba(255,255,1,0.9)") 
				.attr("fill", "black");

		//convert our data to points

		var points = [];
		(vm.project.dataSets[vm.index].data).forEach(function(data, i) {
			var angle = 2*Math.PI / vm.project.attributes.length + ((2*Math.PI / vm.project.attributes.length)*i)-Math.PI/2;
			var x = (w/2 + ((r/vm.project.style)*data.value*0.8) * Math.cos(angle));
			var y = (cY + ((r/vm.project.style)*data.value*0.8) * Math.sin(angle));
			
			points.push({"x": x, "y": y})
		});	
		points.push(points[0]);

		// Specify the function for generating path data             
        var myPath = d3.svg.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;})
                        .interpolate("linear"); 
                        // "linear" for piecewise linear segments
						
		svg.append("svg:path").attr("d", myPath(points));				

		vm.drawThis = function(){
			

			vm.index--;
			if (vm.index < 0) {
				vm.index = vm.noOfSets;
			}
			points = [];
			(vm.project.dataSets[vm.index].data).forEach(function(data, i) {
				var angle = ((2*Math.PI / vm.project.attributes.length)*i)-Math.PI/2;
				var x = (w/2 + ((r/vm.project.style)*data.value*0.8) * Math.cos(angle));
				var y = (cY + ((r/vm.project.style)*data.value*0.8) * Math.sin(angle));
				
				points.push({"x": x, "y": y})
			});	
			points.push(points[0])
			
			svg.selectAll("path")
				.data([points])
				.attr("d", myPath)
				.style("stroke-width", 2)
				.style("stroke", "rgba(59, 89, 152,1)")
				.style("fill", "rgba(159, 189, 252,0.3)");				
		}
		
		vm.drawThis();
	}
})();
