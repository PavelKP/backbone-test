// Создаём прототип объекта или модели

var RocketModel = Backbone.Model.extend({
	defaults: {
		name: 'name',
		description: 'desc',
		size: 100,
	},

	initialize () {},

	validate (attrs) {
		// Проверим, что ввели число и оно > 0
		if (!(attrs.size > 0)) {
			console.log('Incorrect size');
			return 'Incorrect size';
		}
	}
})

var RocketsCollection = Backbone.Collection.extend({
	model: RocketModel,
	sortParam: 'size',
	sortMode: 1, // "1" - обычный порядок, "-1" - обратный порядок
	comporator: function(a, b) { // функция сортировки моделей
		if (a.get(this.sortParam) > b.get(this.sortParam)) {
			return -1 * this.sortMode;
		}
		if (a.get(this.sortParam) < b.get(this.sortParam)) {
			return this.sortMode;
		}
		return 0;
	}
});

