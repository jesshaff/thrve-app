// const fs = require('../../utils/fsUtils');

// const { response } = require("express");

// const DUMMY_DATA = [
//     { id: 'd1', value: 10, region: 'USA'},
//     { id: 'd2', value: 8, region: 'India'},
//     { id: 'd3', value: 16, region: 'China'},
// ];

// async function userData() {
//     const response = await fetch('./api/profile', {
//       method: 'POST',
//       body: JSON.stringify(data)
//     });
//     const responseText = await response.text();
//     console.log(responseText); // logs 'OK'
//   }
//   userData();

// const moodDataExample = fetch('/seeds/moodData.json').then(function (response) {
//   return response.json();
// }).then(function (obj) {
//   console.log(obj);
// }).catch(function (error) {
//   console.error('Something went wrong with retrieving the userData');
// });

// // Get user rating by date for graph
// const moodDataExample = fetch("/api/mood", {
//     method: "GET",
//     body: JSON.stringify({ date_added, rating }),
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.ok) {
//     document.location.replace("/");
//   } else {
//     alert("Failed");
//   };

const xScale = d3
    .scaleBand()
    .domain(moodDataExample.map((dataPoint) => dataPoint.user_id))
    .rangeRound([0, 250]) // 250 is width of container in css
    .padding(0.1);  
const yScale = d3.scaleLinear().domain([0, 20]).range([100, 0]); // 20 is the value -- a few higher than the highest value in the data ex: 16 for China

// d3.select('div')
//     .selectAll('p')
//     .data(DUMMY_DATA) // data points
//     .enter() // which paragraphs are missing -- missing elements 
//     .append('p') // adding missing paragraphs to this div
//     .text(dta => dta.region); // take paragraph and set text to data inside paragraph element 

// .then fetch 
const container = d3.select('svg').classed('container', true)  // if using classes 

const bars = container
.selectAll('.bar')
.data(moodDataExample)
.enter()  // data not rendered yet
.append('rect') // append div for missing element
.classed('bar', true)
.attr('width', xScale.bandwidth()) // hard coded value
.attr('height', (data) => 100 - yScale(data.value)) // function to get access to data point and make chart lines different lengths -- 100 is max range
.attr('x', data => xScale(data.region)) // date 
.attr('y', data => yScale(data.value)) // mood rating value 1-5
