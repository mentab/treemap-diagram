const w = 1200;
const h = 600;
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

d3.json('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json')
	.then(data => {
		const root = d3.hierarchy(data).sum(d => d.value);

		d3.treemap()
			.size([1000, 1000])
			(root);

		svg.selectAll('rect')
			.data(root.leaves())
			.enter()
			.append('rect')
			.attr('x', d => d.x0)
			.attr('y', d => d.y0)
			.attr('width', d => d.x1 - d.x0)
			.attr('height', d => d.y1 - d.y0)
			.attr('class', 'that represent the data')
			.attr('data-name', 'that represent the data')
			.attr('data-category', 'that represent the data')
			.attr('data-value', 'that represent the data')
			.attr('fill', 'black')
			.on('mouseover', d => {
				tooltip.attr('data-toto', 'toto')
					.style('left', 0 + 'px')
					.style('top', 0 + 'px')
					.style('opacity', .9)
					.html(() => `<p></p>`);
			})
			.on('mouseout', () => {
				tooltip.style('opacity', 0)
					.html(() => '');
			});;
	});