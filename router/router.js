const Router = Backbone.Router.extend({

	// Список маршрутов и параметров, которые передаются
	// Как только сработает маршрут, вызовется функция 
	// : - передача параметров

	/*
	  "help":                 "help",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7
	*/
	
	routes: {
		"first": "first",
		"second": "second",
		"third": "third",
	},

	initialize() {
		// Запускаем сохранение истории
		Backbone.history.start();
	},

	first () {
		$('.hero-unit').hide();
		$('#page-first').show();
	},

	second () {
		$('.hero-unit').hide();
		$('#page-second').show();
	},

	third () {
		$('.hero-unit').hide();
		$('#page-third').show();
	}

});
