const data = {
  account: {},
  assignmentDisplay: {},
  currentTrip: {},
  assignments: [
    {
      id: 1,
      name: "Karl Andersson",
      route: {
        from: "Studentvägen 23, 532 32, Uppsala",
        to:   "Drottninggatan 23, 532 32, Stockholm",
        time: "12:45"
      },
      duration: 1,
      client_id: 1,
      driver_id: 1,
      vehicle: "Volvo V70",
    },
    {
      id: 2,
      name: "Sune Karlsson",
      route: {
        from: "Storgatan 2, 532 32, Uppsala",
        to:   "Västertorg 14, 532 32, Stockholm",
        time: "14:00"
      },
      duration: 1,
      client_id: 2,
      driver_id: 1,
      vehicle: "Volvo V70",
    },
    {
      id: 3,
      name: "Anna Svensson",
      route: {
        from: "Lillgatan 34, 532 32, Uppsala",
        to:   "Kungsgatan 1, 532 32, Stockholm",
        time: "15:30"
      },
      duration: 1,
      client_id: 3,
      driver_id: 1,
      vehicle: "Volvo V70",
    },
  ],
  menu: [
    {name: "My assignments"},
    {name: "New reservations"},
    {name: "Settings"},
    {name: "Logout"}
  ]
}
