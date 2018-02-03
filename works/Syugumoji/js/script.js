$(function(){
	// textarea
　$('textarea').each(function(){
　　$(this).bind('keyup', hoge(this));
　});

	// クリップボードにコピー
	var clipboard = new Clipboard('#clip-btn');
	clipboard.on('success', function(e) {
		console.info('Action:', e.action);
  	console.info('Text:', e.text);
  	console.info('Trigger:', e.trigger);
	});

	//削除
	$('#delete-btn').click(function(event) {
		$('textarea').val('');
		$('#show').text('0');
	});
});

// 入力前と入力後の値を比べるて変化があったら文字数を表示。
function hoge(elm){
	var v, old = elm.value;
	return function(){
		if (old != (v=elm.value)) {
			old = v;
			var number = old.replace(/[\n\s　]/g, "").length;
			$('#show').text(number);
		}
	}
}