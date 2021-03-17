const RocketsView = Backbone.View.extend({

  events: {
    "click .addObject": "addObject",
    "click .toJSON": "toJSON",
    "click [data-sort]": "renderList",
  },

  initialize () {
    this.template = _.template($('#viewRockets').html()); // шаблон без данных
    this.$el.html(this.template()); // Элемент $el передаётся при инстанцировании view
    
    // Инстанцируем коллекцию, прикрепим её в это view
    // Но можно и вне view
    this.coll = new Backbone.Collection({
      // Можно передать изначальные модели,
      // но у нас изначально будет пусто
    });

    this.listenTo(this.coll, `all`, this.render);
    // all - все события: изменение значений, удаление, добавление
    // будем менять футер на all
    this.listenTo(this.coll, `add`, this.addOne); // Добавление 
    //console.log(this.coll.toJSON());

  },

  render() {
    // Обход коллекции
    let size = 0;
    this.coll.each(function(obj, index) {
      size += obj.get(`size`);
    });

    this.$(`.rockets-count`).text(this.coll.length); // количетво элементов коллекции
    this.$(`.rockets-size`).text(size); // сумма размеров

    // .text() задает или возвращает текстовое содержимое выбранных элементов.
    // экранирует входящие спецсимволы


    // --------------------------

        // Вызывается по два раза
        // Почему - непонятно

    // --------------------------

  },

  addObject() {
    this.coll.add({
      // Добавляем пустой объект - просто пустая модель (объект) в коллекции, без свойств
    });
  }

});