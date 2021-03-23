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
		"": 												"first", // Добавляем для пустого адреса, когда просто index.html
		"first": 										"first", // Для поиска 
		"first/:query": 						"first", // Для поиска 
		"first/:query/:category": 		"first", // Для поиска 
		"second": 									"second",
		"third": 										"third",
	},

	initialize() {
		// Запускаем сохранение истории
		Backbone.history.start();
	},

	// Передаём параметры роутера как аргументы
	first (query, category) {
		$('.hero-unit').hide();
		$('#page-first').show();

		if (query) {
			$('#page-first').find('.query').text(query);
		}

		if (category) {
			$('#page-first').find('.category').text(category);
		}

		// Secret test page
		if (query === 'test' && category != null) {
			$('.hero-unit').hide();
			$('#page-test').show();
		}
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
