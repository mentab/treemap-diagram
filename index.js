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

// Data to fetch :  https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json