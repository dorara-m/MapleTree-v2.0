$(function(){

	// 画像参照用変数
	var $img = $('#img-section').find('li');

	// シェアボタン参照変数
	var $share = $('#share').find('a');

	// じゃんけんの手をクリックした時の動作
	$('.myhand').click(function(){
		if ( $(this).hasClass('double_click') ){//ダブルクリック防止
        	return false;
    	}
    	$(this).addClass('double_click');
		var index = $('.myhand').index($(this));
		janken(index);
		$('#result-modal').show();
	});

	//　モーダルを閉じた時の動作
	$('#close-modal').click(function(){
		$('#result-modal').hide();
		$('.myhand').removeClass('double_click');
		$('.active').removeClass('active');
	});

	$('#share-button').click(function(e){
	     e.preventDefault();
	     window.open(this.href, "SNS_window", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
    });

	// 関数ジャンケン
	function janken (playerHand) {
		// body...
		var rand = Math.floor(Math.random()*3 );//乱数作成
	
		var comHand;//コンピュータの手

		switch(rand){
			case 0:
				comHand = 'rock';
				break;
			case 1:
				comHand = 'scissors';
				break;
			case 2:
				comHand = 'paper';
				break;
		}

		var game = (rand-playerHand+3)%3;

		switch(game){
			case 0:
				result = 'Ended in a draw…';
				$img.eq(0).addClass('active');
				$share.attr('href', 'https://twitter.com/share?url=http://maple-tree.moo.jp/works/janken2/index.html&text= 結果はあいこ');
				break;
			case 1:
				result = 'You win!';
				$img.eq(1).addClass('active');
				$share.attr('href', 'https://twitter.com/share?url=http://maple-tree.moo.jp/works/janken2/index.html&text= じゃんけんに勝利した！');
				break;
			case 2:
				result = 'You lose!';
				$img.eq(2).addClass('active');
				$share.attr('href', 'https://twitter.com/share?url=http://maple-tree.moo.jp/works/janken2/index.html&text= じゃんけんに負けてしまった…');
				break;
		}

		$('#result-text1').text('Computer’s hand is '+comHand+'.');
		$('#result-text2').text(result);
	}
});