$(function(){
	var $panel = $('#js-popout-panel');
	var $body = $('body');

	$('#js-menu-open').click(function(event) {
		$panel.addClass('is-visible');
		$body.addClass('is-locked')
	});

	$('#js-menu-close').click(function(event) {
		$panel.removeClass('is-visible');
		$body.removeClass('is-locked')
	});
});