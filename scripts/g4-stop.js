// End
$('#jqxButtonNext').parent().append('<button type="button" style="border-color:#af8484 !important;background:linear-gradient(to bottom,#d44343 0,#961717 100%) !important" class="btn btn-primary" id="endCourse" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Contenu suivant">Terminer le cours maintenant ! <span class="zmdi zmdi-skip-next zmdi-hc-lg"></span></button>');
$('#jqxButtonNext').css('display', 'none');

$('body').on('click', '#endCourse', function () {
	let time = getRandomInt(120, 600); // 7 min
	if ($('.bandeaucondicourssuivi button') && $('.bandeaucondicourssuivi button').text()) {
		time = $('.bandeaucondicourssuivi button').text().split(' ');
		if (time && time.length && time.length > 4) {
			time = parseInt(time[4]);
		}
		console.log(time);
		if (!time || time <= 0 || typeof time == "undefined") {
			time = getRandomInt(120, 600); // 7 min
		} else {
			time = time * 60;
			time = getRandomInt(time, time + 420)
		}
	}
	compteurtemps(500000, 70000);
	setTimeout(function () {
		compteurtemps(time, 70000);
	}, 200);
	setTimeout(function () {
		$('#jqxButtonNext').click();
	}, 400);
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}