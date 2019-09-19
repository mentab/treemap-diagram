const w = 1000;
const h = 800;
const m = 50;

const content = d3.select('.content');

content.append('h1')
	.attr('id', 'title')
	.text('Video Game Sales');

content.append('h2')
	.attr('id', 'description')
	.text('Top 100 Most Sold Video Games Grouped by Platform');

const tooltip = content.append('div')
	.attr('id', 'tooltip')
	.style('position', 'absolute')
	.style('opacity', 0);

const svg = content.append('svg')
	.attr('width', w)
	.attr('height', h);

const legend = svg.append('g')
	.attr('id', 'legend');

d3.json('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json')
	.then(data => {
		const colorScale = d3.scaleOrdinal(['#FFFF00', '#FA8072', '#7FFF00', '#008080', '#00FA9A', '#EE82EE', '#6495ED', '#FFE4E1', '#FFDAB9', '#FF4500', '#E9967A', '#40E0D0', '#6B8E23', '#FFA07A', '#FFFAFA', '#C0C0C0', '#FF1493', '#808080', '#8A2BE2', '#CD853F' ])
			.domain(data.children.map(children => children.name));

		const root = d3.hierarchy(data).sum(d => d.value);

		d3.treemap()
			.size([w, h])
			(root);

		svg.selectAll('rect')
			.data(root.leaves())
			.enter()
			.append('rect')
			.attr('x', d => d.x0)
			.attr('y', d => d.y0)
			.attr('width', d => d.x1 - d.x0)
			.attr('height', d => d.y1 - d.y0)
			.attr('class', 'tile')
			.attr('data-name', d => d.data.name)
			.attr('data-category', d => d.data.category)
			.attr('data-value', d => d.data.value)
			.attr('stroke', 'white')
			.attr('fill', d => colorScale(d.parent.data.name))
			.on('mouseover', d => {
				tooltip.attr('data-value', d.data.value)
					.style('left', d3.event.pageX + 15 + 'px')
					.style('top', d3.event.pageY - 25 + 'px')
					.style('opacity', .9)
					.html(() => `<p><strong>${d.data.name}</strong>: ${d.data.value}</p>`);
			})
			.on('mouseout', () => {
				tooltip.style('opacity', 0)
					.html(() => '');
			});;

		svg.selectAll('text')
			.data(root.leaves())
			.enter()
			.append('text')
			.attr('x', d => d.x0)
			.attr('y', d => d.y0 + 5)
			.attr('class', 'tile-text')
			.attr('fill', 'black')
			.attr('text-anchor', 'start')
			.attr('alignment-baseline', 'hanging')
			.text(d => d.data.name.substring(0, 10) + (d.data.name.length > 10 ? '...' : ''));

		legend.selectAll('rect')
			.data(data.children)
			.enter()
			.append('rect')
			.attr('x', (d, i) => i % 3 * 100 + 300)
			.attr('y', (d, i) => Math.ceil((i + 1) / 3) * 30 + 995)
			.attr('width', 10)
			.attr('height', 10)
			.attr('class', 'legend-item')
			.attr('fill', d => colorScale(d.name));

		legend.selectAll('text')
			.data(data.children)
			.enter()
			.append('text')
			.attr('x', (d, i) => i % 3 * 100 + 315)
			.attr('y', (d, i) => Math.ceil((i + 1) / 3) * 30 + 1000)
			.style('alignment-baseline', 'middle')
			.text(d => d.name);
	});