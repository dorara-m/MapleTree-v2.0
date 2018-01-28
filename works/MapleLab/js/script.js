$(function(){
	// hoverアクション
	$('.card-item').hover(function() {
		$(this).find('.card-title').fadeIn(350);
	}, function() {
		$(this).find('.card-title').fadeOut(200);
	});

	// フッターツールチップ
	$('#linkToTree').darkTooltip({
		opacity: '0.5'
	});
});