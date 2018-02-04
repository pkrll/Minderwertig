const actions = {
  login: function (credentials) {
    router.push("/client/wait");
    socket.emit('client/login', credentials);
  }
}
