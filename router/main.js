var app = app || {};

$(function() {
	app.router = new Router();

	$('#search').on('click', function() {
		const query = $('#query').val();
		const category = $('#category').val();
		app.router.navigate('first/' + query + '/' + category, {trigger: true});

		return false; // чтобы не сработал клик? видимо вместо preventDefault
	})
})
