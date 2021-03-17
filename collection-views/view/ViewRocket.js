var ViewRocket = Backbone.View.extend({

  tagName: 'tr',

  events: {
    'click .changeSize': 'changeSize',
    'click .deleteRow': 'deleteRow',
    'blur .desc, .name, .size': 'editValue'
  },

  initialize() {
    this.template = _.template($('#viewRocket').html()); // подготовим функцию, которая вернёт разметку на базе шаблона

    // Подпишем view на изменение модели
    // this.model будет передано при инстанцировании view
    // связь модели и view
    this.listenTo(this.model, `change`, this.render);

    // remove - удалит view из DOM без нашей помощи
    this.listenTo(this.model, `destroy`, this.remove);     
  },

  render() {
    const view = this.template(this.model.toJSON());
    this.$el.html(view); // вставляем разметку в страницу
    // $el - обращение к элементу view
    // Мы можем использовать метод .html() для получения содержимого элемента
    // .html( htmlString ) - заменить содержимое другим
  },

  deleteRow() {
    this.model.destroy(); // после удаления модели выполнится this.remove
  },

  // Собираем данные из ячеек и отправляем в JSON
  editValue() {
    const res = this.model.set({
      name: this.$(`.name`).text(), //$() - обращение к элементу внутри модели
      description: this.$(`.desc`).text(),
      size: parseInt(this.$(`input.size`).val(), 10),
    }, {validate: true})  // Добавим валидацию

    // Если валидация не пройдена, в res вернётся false
    if(!res) { 

      // Перерендерим со старыми занчениями 
      this.render();
    }
  },

  // Это обработчик, в обработчики прилетают ивенты
  changeSize(evt) { 
    const diff = parseInt($(evt.target).attr(`data-rel`));
    const size = this.model.get(`size`);

    const res = this.model.set({
      size: size + diff,
    }, {validate: true})

    if (!res) {
      this.render();
    }
  }
})