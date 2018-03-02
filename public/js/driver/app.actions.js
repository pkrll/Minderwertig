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
    let data = {
      id: this.account.id,
      position: this.position
    }
    console.log("Sending position");
    socket.emit('driver/position', data);
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

    socket.emit('driver/begin', {id: this.currentTrip.id});
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
