var RocketView = Backbone.View.extend({

  // tagName: "li", // тег, в который заворачивается элемент

  // className: "document-row", // класс 

  events: {
    "click .changeSize": "changeSize", // событие .селектор: "Функция"
    "click .deleteRow": "deleteRow",
    "blur .desc": "editValue",
    "blur .name": "editValue",
    "blur .size": "editValue",
  },

  initialize: function() {
    this.template = _.template($("#viewRocket").html()); // получаем шаблонизатор
    this.listenTo(this.model, "change", this.render); // слушаем изменение модели, вызываем рендер
    this.listenTo(this.model, "destroy", this.remove); // слушаем удаление из модели, this.remove - внутренний метод
    this.render(); // При инициализации делаем первую отрисовку шаблона
  },

  render: function() {
    var json = this.model.toJSON(); // получаем данные из модели, при инстанцировании View    
    var view = this.template(json); // получаем view

    // Добавим view в элемент
    // this.$el - элемент, куда всё отрисовывается, получаем из модели при инстанцировании View
    this.$el.html(view);
		console.log(json);
  },

  deleteRow: function() {
    this.model.destroy(); // удаление модели и перерисовка
    // Если модель будет удалена откуда-то извне, удалиться также и view
  },

  editValue: function() {
      this.model.set({
        name: this.$(".name").text(),
				description: this.$(".desc").text(),
				size: parseInt(this.$("input.size").attr("value")), // Эта строка берёт атрибут value, который не меняется при ручном вводе значений формы - ????
																														// Не работает - получаю значение из модели, а не то, что ввёл
																														// Всё работает со старой версией JQUERY! Проверить синтаксис новой версии!!
      }, {validate: true});

			// document.querySelector(`.size`).value - работает 
  },

	changeSize: function(evt) { // Обновляем значение поля в модели и от этого перерендеривается view
		var diff = parseInt($(evt.target).attr("data-rel")); // +10 или -10
		var size = parseInt(this.model.get("size"));

		this.model.set({
			size: size + diff,
		}, {validate: true});
	}

});

/*
Как работает поиск через $ в моделе

this.$
ƒ (selector) {
      return this.$el.find(selector);
  }
*/