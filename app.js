$(document).ready(function() {
  var targetTime, intervalID, secondsLeft;

  // displays the secondsLeft before clicking the start button
  targetTime = Date.now() + (1 * 60 * 1000);
  secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
  $('#down-counter').text(secondsLeft);

  $('.timer').on('click', 'button', function() {

    /**
    * look what will happen if the three lines of code below are not there
    * when a user will click the start button first tiem, upon calling setInterval
    * a unique intervalID (say it is 1) will be assigned against that call which will be used to end that call
    * suppose a user clicks the start button second time, the call to setInterval will be made again
    * and value of intervalID will be overwritten and will be changed to 2. Now you cannot end
    * the repeated calles to callback function which were initiated against intervalID of 1
    * and the callback function will be called infinitely.
    */

    if (intervalID) {
      clearInterval(intervalID);
    }

    /**
    * re-calculates the secondsLeft after clicking the start button
    * we can't rely on the values calculated previously since
    * there is a delay involved in calculating the above value of secondsLeft
    * and clicking the start button
    */

    targetTime = Date.now() + (1 * 60 * 1000);
    secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
    intervalID = setInterval(timer, 1000);
  });

  // timer callback for setInterval function
  function timer() {

    // fresh value of secondsLeft is calculated after every second
    secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
    $('#down-counter').text(secondsLeft);
    if (secondsLeft <= 0)
      clearInterval(intervalID);
  }
});
