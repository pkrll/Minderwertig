class MWDate {
  /**
   * Returns the specified date in milliseconds from the UNIX epoch.
   *
   * @param   {[Int]} date  An array holding the year, month and day of the date, in that order.
   * @param   {[Int]} time  An array holding the hour and minutes of the date, in that order.
   *
   * @return  {Object}      The date in milliseconds.
   */
  static toUnixTime(date, time) {
    if (date == "" || time == "") return undefined;

    return new Date(date[0], date[1] - 1, date[2], time[0], time[1]).getTime();
  }

  /**
   * Formats the specified date and returns an object with the properties date and time.
   *
   * @param   {Int} timestamp The date to format in milliseconds
   *
   * @return  {Object}        The date formatted.
   */
  static format(timestamp) {
    const date = new Date(timestamp);

    const formattedDate = this.styleDate(date);
    const hour = this.styleComponent(date.getHours());
    const minute = this.styleComponent(date.getMinutes());

    return {
      date: formattedDate,
      time: hour + ':' + minute
    }
  }

  /**
   * Calculates time in hours and minutes until the specified time.
   *
   * @param   {Int} timestamp The date in milliseconds
   *
   * @return  {Object}        The time left.
   */
  static timeUntil(timestamp) {
    const timeleft = timestamp - new Date().getTime();
    // The hours and minutes only
    var minutes = Math.floor(timeleft / (1000 * 60));
    var hours = Math.floor(timeleft / (1000 * 60 * 60));

    if (minutes > 59) {
      minutes = Math.floor(minutes % 60);
    }

    return this.styleComponent(hours) + ':' + this.styleComponent(minutes);
  }

  /**
   * Styles a date component (integer). Adds a leading zero, if missing.
   *
   * @param  {Int} component The date component.
   * @return {String}        The date component styled.
   */
  static styleComponent(component) {
    if (component < 10) {
      return "0" + component;
    }

    return component;
  }

  /**
   * Styles the day component of a date.
   *
   * @param  {Int} timestamp The timestamp.
   * @return {String} The day component styled.
   */
  static styleDate(timestamp) {
    const date = new Date(timestamp);

    if (this.isToday(timestamp)) {
      return "Today";
    } else if (this.isTomorrow(timestamp)) {
      return "Tomorrow";
    } else if (this.wasYesterday(timestamp)) {
      return "Yesterday";
    }

    const year = date.getFullYear();
    const month = this.months[date.getMonth()];
    const day = this.styleComponent(date.getDate());

    return day + ' ' + month + ' ' + year;
  }

  /**
   * Checks if the specified date is today.
   *
   * @param  {Int}  timestamp The timestamp.
   * @return {Boolean}        True if the date is today.
   */
  static isToday(timestamp) {
    if (timestamp == "") return false;

    var today = new Date().setHours(0, 0, 0, 0);
    var date = new Date(timestamp).setHours(0, 0, 0, 0);

    return (date == today);
  }

  /**
   * Checks if the specified date was yesterday.
   *
   * @param  {Int}  timestamp The timestamp.
   * @return {Boolean}        True if the date was yesterday.
   */
  static wasYesterday(timestamp) {
    if (timestamp == "") return false;

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var date = new Date(timestamp);

    return (date.toDateString() == yesterday.toDateString());
  }

  /**
   * Checks if the specified date is tomorrow.
   *
   * @param  {Int}  timestamp The timestamp.
   * @return {Boolean}        True if the date is tomorrow.
   */
  static isTomorrow(timestamp) {
    if (timestamp == "") return false;

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var date = new Date(timestamp);

    return (date.toDateString() == tomorrow.toDateString());
  }
  /**
   * Checks if the specified date has passed.
   *
   * @param  {Int}  timestamp The timestamp.
   * @return {Boolean}        True if the date has passed.
   */
  static hasPassed(timestamp) {
    if (timestamp == "") return false;
    var now  = new Date().getTime();

    return (now > timestamp);
  }

}

// The months
MWDate.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
