const order_form_v_data = function () {
  return {
    show_additional_needs: false,
    order: {
      route: { geo: { from: {}, to: {} } },
      additional_needs: { wheelchair: false, pet: false }
    },
    date: { date: "", time: "" }
  }
};

const order_form_v_methods = {
  sendOrder: function (event) {
    event.preventDefault();

    const date = this.date.date.split("-");
    const time = this.date.time.split(":");

    const timestamp = MWDate.toUnixTime(date, time);

    if (MWValidate('order-form-v')) {
      if (MWDate.hasPassed(timestamp)) {
        alert("Please enter a valid date!");
      } else {
        this.order.route.time = timestamp;
        app.sendOrder(this.order);
      }
    } else {
      alert("Please fill in your order!");
    }
  }
};

const order_form_v_mounted = function () {
  const picker = flatpickr("#datepicker", {});

  let autocompleteFrom = new google.maps.places.Autocomplete(
    document.getElementById('from'),
    { types: ['geocode'] }
  );

  let autocompleteTo   = new google.maps.places.Autocomplete(
    document.getElementById('to'),
    { types: ['geocode'] }
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      let circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });

      autocompleteFrom.setBounds(circle.getBounds());
    });
  }

  autocompleteFrom.addListener('place_changed', function () {
    this.order.route.geo.from.lat = autocompleteFrom.getPlace().geometry.location.lat();
    this.order.route.geo.from.lng = autocompleteFrom.getPlace().geometry.location.lng();
    console.log(this.order.route.geo);
  }.bind(this));

  autocompleteTo.addListener('place_changed', function () {
    this.order.route.geo.to.lat = autocompleteTo.getPlace().geometry.location.lat();
    this.order.route.geo.to.lng = autocompleteTo.getPlace().geometry.location.lng();
    console.log(this.order.route.geo);
  }.bind(this));
};
