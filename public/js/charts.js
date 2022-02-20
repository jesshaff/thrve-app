// // this calls the mood data from the server
// fetch("/api/mood")
//   .then(function (response) {
//     //the response will contain several values that we'll need to deal with here
//     return response.map.JSON(data);
//   })
  // //this .then contains the entirety of the chart, pass the response data in and use it where its needed
  // .then(function (data) {
  //   console.log("Request successful", text);

    var callbackError, callbackData;

    var margin = { top: 20, right: 80, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // var parseDate = d3.time.format('%Y%m%d').parse;

    var x0 = d3.scaleBand().rangeRound([0, width]).padding(0.1);

    var x1 = d3.scaleOrdinal();

    var y = d3.scaleLinear().range([height, 0]);

    var color = d3
      .scaleOrdinal()
      .range([
        "#98abc5",
        "#8a88a6",
        "#7b6888",
        "#6b486b",
        "#a05d56",
        "#d0743c",
        "#ff8c00",
      ]);

    var xAxis = d3.axisBottom(x0);

    var yAxis = d3.axisLeft(y).scale(y).tickFormat(d3.format(".2s"));

    // Still working
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("/data/data.csv"),
      function (error, data) {
        var AgeNames = d3.keys(data[0]).filter(function (key) {
          return key !== "State";
        });

        data.forEach(function (d) {
          d.ages = ageNames.map(function (name) {
            return { name: name, value: +d[name] };
          });

          x0.domain(
            data.map(function (d) {
              return d.State;
            })
          );
          x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
          y.domain([
            0,
            d3.max(data, function (d) {
              return d3.max(d.ages, function (d) {
                return d.value;
              });
            }),
          ]);

          svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", 'translate(0, " + height + ")')
            .call(xAxis);

          svg
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y, 6")
            .attr("dy", ".71cm")
            .style("text-anchor", "end")
            .text("Population");

          var state = svg
            .selectAll(".state")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform", function (d) {
              return 'translate(" + x0(d.state) + ",0)';
            });

          state
            .selectAll("rect")
            .data(function (d) {
              return d.ages;
            })
            .enter()
            .append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) {
              return x1(d.name);
            })
            .attr("y", function (d) {
              return y(d.value);
            })
            .attr("height", function (d) {
              return height - y(d.value);
            })
            .style("fill", function (d) {
              return color(d.name);
            });

          var legend = svg
            .selectAll(".legend")
            .data(ageNames.slice().reverse())
            .enter()
            .append("g")
            .attr("class", "legend")
            .atrr("transform", function (d, i) {
              return 'translate(0, " + i * 20 + ")';
            });

          legend
            .append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", "color");

          legend
            .append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35cm")
            .style("text-anchor", "end")
            .text(function (d) {
              return d;
            });
        });
      };
  // // callback function that closes out the fetch call
  // .catch(function (error) {
  //   log("Request failed", error);
  // });
