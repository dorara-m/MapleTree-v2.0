$(function(){
	toolTip();

	// soundToggle
	$('#soundToggle').click(function(event) {
		if ($(this).hasClass('soundOff')) {
			$(this).removeClass('soundOff');
			$(this).addClass('soundOn');
			$(this).html('<i class="fa fa-volume-up" aria-hidden="true"></i>');
			$("#mov").prop('muted', false);
		} else {
			$(this).removeClass('soundOn');
			$(this).addClass('soundOff');
			$(this).html('<i class="fa fa-volume-off" aria-hidden="true"></i>');
			$("#mov").prop('muted', true);
		}
	});
});

// tooltip
function toolTip () {
	$('#soundToggle').darkTooltip({
		gravity:"east"
	});
}