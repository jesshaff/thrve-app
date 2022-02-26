  import {
    select,
    json,
    scaleLinear,
    scaleTime,
    scaleOrdinal,
    extent,
    axisLeft,
    axisBottom,
    line,
    curveBasis,
    group,
    schemeCategory10,
    descending
  } from 'd3';
  
  import { colorLegend } from './colorLegend';
  const svg = select('svg');
  
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  
  const render = data => {
    const title = 'Mood Ratings';
    
    const xValue = d => d.date_added;
    const xAxisLabel = 'Date'
    const numDates = data.length
    console.log(numDates);
    
    const yValue = d => d.rating;
    const circleRadius = 6;
    const yAxisLabel = 'Rating';
    
    const colorValue = d => d.city;
    
    const margin = { top: 60, right: 160, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
    
    const colorScale = scaleOrdinal(schemeCategory10);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15)
      .ticks(numDates);
    
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 80)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveBasis);
    
    const lastYValue = d =>
      yValue(d.values[d.values.length - 1]);
    
    const grouped = group()
      .key(colorValue)
      .entries(data)
      .sort((a, b) =>
        descending(lastYValue(a), lastYValue(b))
      );
    
    console.log(grouped);
    
    colorScale.domain(grouped.map(d => d.key));
    
    g.selectAll('.line-path').data(grouped)
      .enter().append('path')
        .attr('class', 'line-path')
        .attr('d', d => lineGenerator(d.values))
        .attr('stroke', d => colorScale(d.key));
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);
    
    svg.append('g')
      .attr('transform', `translate(790,121)`)
      .call(colorLegend, {
        colorScale,
        circleRadius: 13,
        spacing: 30,
        textOffset: 15
      });
  };
  
  d3.json('../../data/mood-data.json')
    .then(data => {
      data.forEach(d => {
        d.rating = +d.rating;
        d.date_added = new Date(d.date_added);
      });
      render(data);
    });