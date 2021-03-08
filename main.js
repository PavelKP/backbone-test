/* Events */

// $ - Execute the function when the DOM is ready to be used.
$(function () {
	var object = {};

	_.extend(object, Backbone.Events);

	// слушаем событие alert в контесте объекта
	// Вызываем функцию
	object.on("message", function(msg) {
		console.log("Message: " + msg);
	});

	//Добавим второе событие на один тригер
	object.on("message", function(msg) {
		console.log("Message: " + msg + " - second call")
	});

	// Сразу после загрузки страницы тригерит событие alert
	object.trigger("message", "DOM is ready");

	// Повесим событие на кнопку 
	$('#btn').on('click', function () {
		object.trigger("message", "Button is clicked!");
	});

});

/* Создание модели */

// Создадим пустой объект
// Будем работать в его контексте
var app = app || {};

$(function () {

	// Создадим прототип
	// Расширяем пустой объект моделью бэкбона
	app.MyObject = Backbone.Model.extend({ // С большой буквы
		// Параметры по умолчанию
		defaults: {
			name: "name",
			description: "-",
			size: 100,
		},

		// Выполняется сразу после создаания объекта
		// Перед созданием выполняем конструктор - редко где нужен
		initialize: function() {
			console.log('Object created');
			// Добавим слушатель изменения объекта
			this.on("change", function() {
				console.log('Object changed');
				// Выведем только изменённые атрибуты
				console.log(app.myObject.changedAttributes());
			})
		},

		// Валидаия при изменении объекта
		increaseSize: function () {
			app.myObject.set({
				size: this.get("size") + 100,
			}, {
				validate: true, // Вторым параметром добавим валидацию
			});
		},

		validate: function(attrs) {
			if (attrs.size > 1000) {
				console.log("incorrect size");
				return "incorrect size"; // После вызова retun внутри метода сеттер не имзеняет модель
			}
		}
	});

	// Делаем инстанс
	app.myObject = new app.MyObject({ // с маленькой буквы
		// Можем передать параметры при инициализации объекта
		// Дефолтные будут перезаписаны
		name: "rocket",
		description: "super",
	});

	// Переведём в JSON, уберём всё лишнее
	// Выведем в консоль
	var json = app.myObject.toJSON();
	console.log("Initial model");
	console.log(json);


	// Добавим свойство сеттер
	app.myObject.set({
		size: 250,
		type: "active",
	});

	// Геттер
	console.log("size: " + app.myObject.get("size"));

	$("#btn-size").on("click", function() {
		app.myObject.increaseSize();
	});
});

/* Templater */

$(function() {
	// Простой пример
	var compiled = _.template("hello: <%= name %>");
	$("#rocket").append(compiled({ name: "Moe" }));

	// Из шаблона
	var compiledFromTpl = _.template($("#rocketTpl").html()); // Конвертируем шаблон в HTML?
	$("#rocket").append(compiledFromTpl({ name: "Bo" }));

	// append - jquery
	// Добавляет контент внутрь выбранных элементов в конец, после имеющихся
})
