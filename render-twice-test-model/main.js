var app = app || {}; // const не работает

$(function () {

	const model = new Model();

	app.view = new View({
		el: '#container',
		model,
	});

})
