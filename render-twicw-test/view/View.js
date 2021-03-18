const View = Backbone.View.extend({
  
	events: {
		'click .addButton': 'addListItem', // ищет элементы только внутри view
	},

	initialize() {
		this.template = _.template($('#View').html());
	},

	render() {
		const view = this.template({text: 'List item'});
		this.$('#list').append(view);
		console.log('Render executed');
	},

	addListItem() {
		this.render();
	},

});