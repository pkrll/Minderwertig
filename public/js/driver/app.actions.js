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

  viewAssignment: function (assignment) {
    this.assignmentDisplay = assignment;
    router.push('/driver/assignments/' + assignment.id);
  },
  beginTrip: function (event) {
    console.log(this.assignmentDisplay);
    this.currentTrip = this.assignmentDisplay;
    socket.emit('driver/begin', {id: this.currentTrip.id});
    router.push('/driver/trip/active');
  },
  toggleMenu: function () {
    this.menuIsActive = !this.menuIsActive;
  }
}
