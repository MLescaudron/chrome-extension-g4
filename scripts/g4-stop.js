$('#jqxButtonNext').parent().append('<button type="button" style="border-color:#af8484 !important;background:linear-gradient(to bottom,#d44343 0,#961717 100%) !important" class="btn btn-primary" id="endCourse" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Contenu suivant">Terminer le cours maintenant ! <span class="zmdi zmdi-skip-next zmdi-hc-lg"></span></button>');
$('#jqxButtonNext').css('display', 'none');

$('body').on('click', '#endCourse', function () {
  $('#jqxButtonNext button').html("Let's go !");
  var time = getRandomInt(4, 7); // between 4 and 7 min
  if ($('.bandeaucondicourssuivi button') && $('.bandeaucondicourssuivi button').text()) {
    time = $('.bandeaucondicourssuivi button').text().split(' ');
    if (time && time.length && time.length > 4) {
      time = parseInt(time[ 4 ]);
    }
    if (!time || time <= 0 || typeof time == "undefined") {
      // usefull for non video courses
      time = getRandomInt(4, 7); // between 4 and 7 min
    }
  }
  $('#endCourse').html("Course ended in " + finishHim(time) + 'min, ...');
  setTimeout(function () {
    $('#jqxButtonNext').click();
  }, 2000);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function finishHim(timeInMin) {
  // Yeah I put var because of browser compatibilities
  var timeInSec = (timeInMin * 60) + getRandomInt(1, 60);
  var timeDivide15 = Math.round(timeInSec / 15);
  // finish course
  compteurtemps(timeInSec, timeDivide15);
  return (timeInSec / 60).toFixed(2);
}
