$(document).ready(function() {
  var targetTime, intervalID, secondsLeft;

  // displays the secondsLeft before clicking the start button
  targetTime = Date.now() + (1 * 60 * 1000);
  secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
  $('#down-counter').text(secondsLeft);

  $('.timer').on('click', 'button', function() {
    // re-calculates the secondsLeft after clicking the start button
    // we can't rely on the values calculated previously since
    // htere is a delay involved in calculating the above value of secondsLeft
    // and clicking the start button

    targetTime = Date.now() + (1 * 60 * 1000);
    secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
    intervalID = setInterval(timer, 1000);
  });
  // timer callback for setInterval function
  function timer() {
    secondsLeft = Math.ceil((targetTime - Date.now()) / 1000); // fresh value of secondsLeft is calculated after every second
    $('#down-counter').text(secondsLeft);
    if (secondsLeft <= 0)
      clearInterval(intervalID);
  }
});
