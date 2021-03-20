const View = Backbone.View.extend({
  
	events: {
		'click .incButton': 'increment', // ищет элементы только внутри view
	},

	ui: {
		counter: `#counter`,
	},

	initialize() {
		this.listenTo(this.model, `change`, this.render);
		this.render();
	},

	render() {
		this.$(this.ui.counter).text(this.model.get(`counter`));
		console.log('Render executed');
	},

	increment() {
		this.model.set({
			counter: this.model.get(`counter`) + 1,
		})
	},

});
