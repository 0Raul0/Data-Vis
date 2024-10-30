const svg = d3.select('svg');
const width  = +svg.attr('width');
const height = +svg.attr('height');

d3.csv('auto-mpg.csv').then(data => {     // Data loading
  data.forEach(d => {
    d.population = +d.weight
    d.horsepower = +d.horsepower
  });
  render(data);  
});

const render = data => {
  const margin = { top: 55, bottom: 55, left: 130, right: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg                            // append a new group, for inner margins
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  const xValue = d => d.horsepower;        // data accessors
  const yValue = d => d.weight;           // (making rest of code easier to adapt)

  const xScale = d3.scaleLinear().nice()      // scale to set bar widths
    .domain([40, 240])
    .range([0, innerWidth]);  
  const xAxis = d3.axisBottom(xScale).tickSize(innerHeight)
  const xAxisG = g.append('g').call(xAxis)
  xAxisG.selectAll('.tick line').attr('opacity',0.4)
  xAxisG.style('font-size',14)
  .style('font-family', 'sans-serif')
  .style('color', 'grey')


  const yScale = d3.scaleLinear().nice()            // scale to set bar heights 
    .domain([1500,5500])
    .range([0,innerHeight])

  const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth)
  const yAxisG = g.append('g').call(yAxis)
  yAxisG.selectAll('.tick line').attr('opacity',0.4)
  yAxisG.style('font-size',14)
  .style('font-family', 'sans-serif')
  .style('color', 'grey')

  svg.append("text")
  .attr("class", "axis-label")
  .attr("text-anchor", "middle")
  .attr("x", width/2 +15 )
  .attr("y", height-7)
  .text("Horsepower");

  svg.append("text")
  .attr("class", "axis-label")
  .attr("text-anchor", "middle")
  .attr("x", -height/2)
  .attr("transform", "rotate(-90)")
  .attr("y",50)
  .text("Weight");

  svg.append("text")
  .attr("class", "chart-label")
  .attr("text-anchor", "middle")
  .attr("x", width/2 +15 )
  .attr("y",35)
  .text("Cars: Horsepower vs Weight");



  g
    .selectAll('circle')                     // select all existing rectangles (none)
    .data(data).enter()                    // create data join
    .append('circle')                        // append one rectangle per element
      .attr('class','data-entry')
      .attr('cx', d => xScale(xValue(d)))
      .attr('cy', d => yScale(yValue(d)))
      .attr('r', 10)
      .attr('fill', 'blue')
      .attr('fill-opacity', 0.3);
    };