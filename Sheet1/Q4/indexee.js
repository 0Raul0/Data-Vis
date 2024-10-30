
const svg = d3.select('svg');
const width  = +svg.attr('width');
const height = +svg.attr('height');

d3.csv('sp-500-index.csv').then(data => {     // Data loading
  data.forEach(d => {
    d.close = +d.close
    d.date = new Date(d.date)
  });
  render(data);  
});

const render = data => {
  const margin = { top: 55, bottom: 55, left: 80, right: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg                            // append a new group, for inner margins
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  const xValue = d => d.date;        // data accessors
  const yValue = d => d.close;           // (making rest of code easier to adapt)

  const xScale = d3.scaleTime().nice()      // scale to set bar widths
    .domain([d3.min(data, xValue), d3.max(data, xValue)])
    .range([0, innerWidth]);  
  const xAxis = d3.axisBottom(xScale).tickSize(5)
  const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`);


  const yScale = d3.scaleLinear().nice()            // scale to set bar heights 
    .domain([3600,1800])
    .range([0,innerHeight])

  const yAxis = d3.axisLeft(yScale).tickSize(5)
  const yAxisG = g.append('g').call(yAxis).selectAll('.domain').remove()


  svg.append("text")
  .attr("class", "chart-label")
  .attr("text-anchor", "middle")
  .attr("x", width/2)
  .attr("y",35)
  .text("S+P 500 Index");


  const area = d3.area()
  .x(d => xScale(xValue(d))+margin.left)      // Same x-position
  .y1(d => yScale(yValue(d))+margin.bottom)     // Top line y-position
  .y0(445);           // Bottom line y-position

// Add the <path> to the <svg> container using the helper function
   svg.append('path')
  .attr('d', area(data))
  .attr('stroke', '#00008B')
  .attr('fill', '#ADD8E6');

}