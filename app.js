$(document).ready(function() {
  'use strict';
  /**
   * The code below makes the arrows which control the seesion length and
   * break length work.
   */

  (function() {
    function decrement(targetNode) {
      var val = +$(this).siblings(targetNode).text();
      val--;
      if (val >= 0)
        $(targetNode).text(val);
      else
        $(targetNode).text('0');
    }

    function increment(targetNode) {
      var val = +$(this).siblings(targetNode).text();
      val++;
      if (targetNode === '#break-length') {
        if (val > 5)
          $(targetNode).text('5');
        else
          $(targetNode).text(val);
      } else if (targetNode === '#session-length') {
        if (val > 25)
          $(targetNode).text('25');
        else
          $(targetNode).text(val);
      }
    }

    $('#session-controls').on('click', '#break-up', function() {
      var incrementer = increment.bind($(this));
      incrementer('#break-length');
    });

    $('#session-controls').on('click', '#break-down', function() {
      var decrementer = decrement.bind($(this));
      decrementer('#break-length');
    });

    $('#session-controls').on('click', '#session-down', function() {
      var decrementer = decrement.bind($(this));
      decrementer('#session-length');
      displayTimer('#session-length');
    });
    $('#session-controls').on('click', '#session-up', function() {
      var incrementer = increment.bind($(this));
      incrementer('#session-length');
      displayTimer('#session-length');
    });
  })();

  /**
  * This function converts the secondsLeft to human readable format
  * In minutes and seconds
  * @param {number} secondsLeft
  * @return {string}
  */
  function timeLeft(secondsLeft) {
    var minutes = Math.trunc(secondsLeft / 60);
    var seconds = secondsLeft % 60;
    return pad(minutes) + ':' + pad(seconds);

    /**
    * pad() puts leading zeros if seconds or minutes are less than 10
    * @param {number} num
    *@return {string}
    */
    function pad(num) {
      return (num < 10) ? ('0' + num) : num;
    }
  }


  /**
  * displayTimer() displays the timer in human readable format
  */
  function displayTimer(sessionType) {
    var targetTime, secondsLeft, sessionLength;
    sessionLength = +$(sessionType).text();
    targetTime = Date.now() + (sessionLength * 60 * 1000);
    secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
    $('#down-counter').text(timeLeft(secondsLeft));
  }

  displayTimer('#session-length');

  var intervalID, targetTime;
  $('#timer-controls').on('click', '#start-work', function() {

    /**
     * look what will happen if the three lines of code below are not there.
     * when a user will click the start button first tiem, upon calling setInterval,
     * a unique intervalID (say it is 1) will be assigned against that call which will be used to end the repeated call to callback.
     * suppose a user clicks the start button second time, the call to setInterval will be made again
     * and value of intervalID will be overwritten and will be changed to 2. Now you cannot end
     * the repeated calls to callback function which were initiated against intervalID of 1
     * and the callback function will be called infinitely.
     */
    if (intervalID) {
      clearInterval(intervalID);
    }

    // disable the unwanted buttons once timer is started
    $(this).attr('disabled', '');
    $('#start-break').attr('disabled', '');
    $('#session-up').attr('disabled', '');
    $('#session-down').attr('disabled', '');

    /**
     * re-calculates the secondsLeft after clicking the start button
     * we can't rely on the values calculated previously since
     * there is a delay involved in calculating the above value of secondsLeft
     * and clicking the start button
     */

    var sessionLength = +$('#session-length').text();
    targetTime = Date.now() + (sessionLength * 60 * 1000);
    var secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
    intervalID = setInterval(timer, 1000);
  });

  // timer callback for setInterval function
  function timer() {

    // fresh value of secondsLeft is calculated after every second
    var secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
    $('#down-counter').text(timeLeft(secondsLeft));
    if (secondsLeft <= 0)
      clearInterval(intervalID);
  }
});
