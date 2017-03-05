/**
 * CasperJS
 * Docs: http://docs.casperjs.org/en/latest/modules/index.html
 */
const casper = require('casper').create({
	clientScripts:  [
		'./node_modules/jquery/dist/jquery.min.js' // injected in remote DOM on every request
	],
	viewportSize: { width: 800, height: 600 },
	verbose: true // log messages will be printed out to the console
});

casper.start('https://google.com/')
.then(function() {
	this.echo("Some text: " + this.fetchText('h2'));
	this.waitForSelector('form[action="/search"]'); // any CSS
	// also try: waitForText('string');
})
.then(function() {
	// Take a screenshot
	this.capture('screenshot-google.png', { top: 0, left: 0, width: 500, height: 400 });
	this.captureSelector('screenshot-searchbox.png', 'form[action="/search"]');
})
.then(function() {
	// search for 'casperjs' from google form
	this.fill('form[action="/search"]', { q: 'casperjs' }, true);
	// OR:
	// this.fillSelectors('form[action="/search"]', { 'input[name="q"]': 'casperjs' }, true);
	// OR:
	// this.sendKeys('form[action="/search"] input[name="q"]', 'casperjs');
	// this.click('form[action="/search"]  input[type="submit"]');
});

var links = [];
casper.then(function() {
	links = this.evaluate(function() {
		var ls = document.querySelectorAll('h3.r a');
		__utils__.echo('Echo from remote environment. ' + $(window));
		return Array.prototype.map.call(ls, function(e) {
			return e.getAttribute('href');
		});
	});
});

casper.run(function() {
	// echo results in some pretty fashion
	this.echo(links.length + ' links found');
	//this.echo(' - ' + links.join('\n - '));
	this.exit();
});

/*

// GET:
casper.open('http://www.google.com/').then(function() {
	this.echo('GOT it.');
	this.echo(this.getHTML()); // whole page
	this.echo(this.getHTML('h1#foobar', true)); // => '<h1 id="foobar">Plop</h1>'
	this.echo(this.getHTML('h1#foobar')); // => 'Plop' (excludes outer)
});

// POST:
casper.open('http://some.testserver.com/post.php', {
	method: 'post',
	data:   {
		'title': 'Plop',
		'body':  'Wow.'
	}
}).then(function() {
	this.echo('POSTED it.');
});


*/