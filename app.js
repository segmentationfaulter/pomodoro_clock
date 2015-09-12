$(document).ready(function() {
  var targetTime, intervalID;
  $('button').on('click', function() {
    targetTime = Date.now() + (1 * 60 * 1000);
    intervalID = setInterval(timer, 1000);
  });
  // timer callback for setInterval function
  function timer() {
    var secondsLeft = Math.ceil((targetTime - Date.now()) / 1000);
    $('h1').text(secondsLeft);
    if (secondsLeft <= 0)
      clearInterval(intervalID);
  }
});
