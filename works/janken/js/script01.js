//以下じゃんけんプログラム
function janken(player) {//プレイヤーの手を引数として取得
	var rand = Math.floor(Math.random()*3 );//乱数作成
	
	var com;//コンピュータの手

	$('.result-image').removeClass('display');//クラスが重複しないように

	// コンピュータの手を代入
	switch(rand){
		case 0:
			com = 'グー';
			$('#click-g').addClass('display');//出た手の画像にdisplayクラスを付加
			break;
		case 1:
			com = 'チョキ';
			$('#click-c').addClass('display');
			break;
		case 2:
			com = 'パー';
			$('#click-p').addClass('display');
			break;
	}

	//じゃんけんの勝敗
	var x = (rand-player+3)%3;
	
	switch(x){
		case 0:
			result = 'あいこ';
			break;
		case 1:
			result = 'あなたの勝ち';
			break;
		case 2:
			result = 'あなたの負け';
			break;
	}

	//じゃんけんの結果
	$('#result-text').html('<h2>コンピュータの手は'+com+'でした。<br>'+result+'です</h2>');
}


//以下jQuery
$('.btn').click(function(){
	$('#result-area').slideDown();
});