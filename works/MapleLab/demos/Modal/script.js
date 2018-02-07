$(function(){
	$('#open-modal').click(function(event) {
		$('#modal').addClass('is-visible');
		$('body').addClass('is-locked');
	});

	$('.close-modal').click(function(event) {
		$('#modal').removeClass('is-visible');
		$('body').removeClass('is-locked');
	});
});