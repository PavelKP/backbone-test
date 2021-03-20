// Создаём прототип объекта или модели

var RocketModel = Backbone.Model.extend({
	defaults: {
		name: 'name',
		description: 'desc',
		size: 0,
	},

	initialize () {},

	validate (attrs) {
		// Проверим, что ввели число и оно > 0
		if (!(attrs.size >= 0)) {
			console.log('Incorrect size');
			return 'Incorrect size';
		}
	}
})

var RocketsCollection = Backbone.Collection.extend({
	model: RocketModel,

	// нестандартные параменты бэкбона
	sortParam: 'size',
	sortMode: 1, // "1" - обычный порядок, "-1" - обратный порядок

	// С компаратором бэкбон умеет работать
	comparator(a, b) { // функция сортировки моделей
		if (a.get(this.sortParam) > b.get(this.sortParam)) {
			return -1 * this.sortMode;
		}
		if (a.get(this.sortParam) < b.get(this.sortParam)) {
			return this.sortMode;
		}
		return 0;
	}
});

