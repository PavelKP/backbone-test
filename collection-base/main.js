var app = app || {};

$(function () {

  // Прототип моедли
  var MyModel = Backbone.Model.extend({
    defaults: {
      size: 10,
      weight: `100kg` 
      // при добавлении новыйх моделей в коллекцию
      // У них будут эти свойства, если не перезаписывать их
    }
  })

  //Прототип коллекции
  var MyCollection = Backbone.Collection.extend({
    model: MyModel,
  });

  // Можно при инициализации сразу отправить массив или объект
  var coll = new MyCollection();

  var car = new MyModel({
    size: 75,
    text: 'this is car model'
  });

  coll.add(car);

  // пустой объект - создаётся модель по умолчанию
  // Дополняется тем, что указано в фигурных скобках
  coll.add({});

  // Можем добавлять массив объектов
  coll.add([ {size: 80}, {color: `white`}, {} ]); 

  console.log(coll.toJSON());

  // Можно удалить ссылку на модель
  coll.remove(car);
  //{size: 80} - удалить нельзя, нет ссылки на эту модель
  
  console.log(coll.toJSON());
})