const actions = {
  /**
   * Attempts to login with the specified credentials
   *
   * @param  {Object} credentials The email and password of the user
   */
  login: function (credentials) {
    router.push('/driver/login/wait');
    socket.emit('driver/login', credentials);
  },

  sendPosition: function () {
    if (this.account == null) return;

    clearInterval(this.sendPosition);

    navigator.geolocation.getCurrentPosition(function (position) {
      this.position = { lat: position.coords.latitude, lng: position.coords.longitude };
      socket.emit('driver/position', { id: this.account.id, position: this.position });
    }.bind(this));
  },

  viewAssignment: function (assignment) {
    this.assignmentDisplay = assignment;
    if (assignment == this.currentTrip) {
      router.push('/driver/trip/active');
    } else {
      router.push('/driver/assignments/' + assignment.id);
    }

  },
  beginTrip: function (event) {
    this.currentTrip = this.assignmentDisplay;
    var index = this.assignments.indexOf(this.assignmentDisplay);
    this.assignments.splice(index,1);
    this.currentTrip.start = Math.trunc((new Date()).getTime() / 1000);

    socket.emit('driver/begin', this.currentTrip);
    router.push('/driver/trip/active');
  },
  finishTrip: function () {
    socket.emit('driver/done', app.currentTrip);
    app.currentTrip = null;
    router.push('/driver/assignments');
  },
  toggleMenu: function () {
    this.menuIsActive = !this.menuIsActive;
  },
  displayCurrentTrip: function() {
    console.log("hej");
  }
}
