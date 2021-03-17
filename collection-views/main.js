// Создаём объект
var app = app || {};

$(function () {
	app.rocketsView = new RocketsView({
		el: '#rockets' // Элемент, куда отрисовать
	});
})