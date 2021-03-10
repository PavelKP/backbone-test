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
  }
});