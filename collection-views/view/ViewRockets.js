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
    this.coll = new RocketsCollection(
      // Можно передать изначальные модели,
      // но у нас изначально будет пусто
    );

    // all - все события: изменение значений, удаление, добавление
    // в оригинале планировали менять футер на all
		// --------------------------
        // когда слушаем all, изменение значения view строки, например size 
				// вызывает render несколько раз
				// меняем на change, рендер будет только один
				// но тогда не будет работать перерендер футера на удаление
				// Скорее всего all тригерится как бы на каждое возникшее событие по одному разу
				// Разделим на три разных события
    // --------------------------

		// Рендер футера
    this.listenTo(this.coll, `change`, this.render);
		this.listenTo(this.coll, `destroy`, this.render);
		this.listenTo(this.coll, `add`, this.render);

 		// Добавление, передаст в функцию модель
    this.listenTo(this.coll, `add`, this.addOne);
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
		console.log(`Footer render excecuted`)
  },

  addObject() {
    this.coll.add({
			size: 0,
			description: ``,
			name: `Name`,
      // Добавляем пустой объект - просто пустая модель (объект) в коллекции, без свойств
    });
  },

	addOne(model) {
		// model - ранее добавленная модель
		const view = new ViewRocket({
			model,
		});
		// внутри initialize этого view нет render()
		// поэтому при инстанцировании не рендерится
		// а если бы и рендерился, то он не рендерит на страницу, а просто пишет в $el
		this.$(`.rocketsList`).append(view.render());
		console.log(`Add line render excecuted`)
	},

	renderList(evt) {
		this.coll.sortParam = $(evt.target).attr(`data-sort`); // Видимо $() превращает в jquery object

		// Лечение бага, так как не реализована сортировка по тексту
		if (this.coll.sortParam !== `size`) { 
			return;
		}

		// при сортировке очистим список и добавим значения заново
		this.$(`.rocketsList`).html(``);
		this.coll.sortMode = this.coll.sortMode * (-1);  // на каждый клик меняем порядок сортировки

		this.coll.sort({sort: false}); // сортирует модель, но не перерендеривает
																	 // To disable sorting when adding a model, pass {sort: false} to add
		this.renderAll();
	},

	renderAll() {
		// Полностью мой метод
		// Чтобы апендить одним куском, а не по одной строке
		let renderQueue = $(document.createDocumentFragment()); // также обернём в jQuery
		
		this.coll.each((model, i) => {
			const view = new ViewRocket({
				model,
			})
			// View render возвращает элемент jquery
			renderQueue.append(view.render());
		});

		this.$(`.rocketsList`).html(renderQueue);
	},

	toJSON() {
		const json = this.coll.toJSON();
		this.$(`.json-out`).html(JSON.stringify(json));
	}


	// this.$( seletor ) - поиск в контексте view
	// $( seletor ) - поиск по всему документу

});
