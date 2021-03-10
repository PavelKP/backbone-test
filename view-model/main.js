$(function () {
  var model = new RocketModel();

  var view = new RocketView({
    model, // модель - что рисовать
    el: "#rocket", // куда рисовать
  });
})