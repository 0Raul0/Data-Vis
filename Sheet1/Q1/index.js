

d3.csv('cities_and_population.csv').then(data => {     
    data.forEach(d => {
      d.population = +d.population; 
      d.x = +d.x
      d.y = +d.y 
    });
    const data2 = data.filter(d => d.eu == 'true');
    console.log(data2)
    render(data2);                            
  });

const render = data => {
    d3.select('svg')
    .selectAll('circle')
    .data(data).enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => (d.population < 1000000) ? 4 : 8)
    .attr('fill', 'blue')
   .append("p")

   d3.select('svg')
   .selectAll('text')
   .data(data.filter(d => d.population >= 1000000)).enter()
   .append('text')
   .attr('class', 'city-label')
   .attr('x', d => d.x)
   .attr('y', d => d.y + 5)
   .attr('dy', -17) 
   .attr('text-anchor', 'middle')
   .text(d => d.city); 

}