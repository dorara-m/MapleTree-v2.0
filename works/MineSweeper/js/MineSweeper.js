$(function(){

	//必要な変数一覧
	
	// セル情報配列
	var CellValue = Array();

	for (i = 0; i< 8; i++) {
		CellValue[i] = Array();
	}

	// セル状態配列
	var CellState = Array();

	for (i = 0; i< 8; i++) {
		CellState[i] = Array();
	}

	// ゲーム状態変数
	var gameState;

	// 地雷位置
	var MineX;
	var MineY;

	// 地雷数
	var MineNum = 8;

	// フラッグ数
	var FlagNum = 0;

	//モーダルの画像指定変数
	var $img = $('#img-section').find('li');

	// 以下必要なメソッド
	// Initメソッド
	function gameInit() {
		writeTable();
		gameReset();
		gameDraw();
	}

	function writeTable() {
		var html = '';
		html += '<table id="Table" style="width:225px; background: #000033; font-size: 20px; line-height:20px;" cellspacing="1" cellpadding="0">' + "\n";
		for (i = 0;i < 8; i++) {
			html += '<tr>' + "\n";
			for (j = 0;j < 8;j++) {
				// id作成
				id = 'Cell' + new String(j) + new String(i);
				// cellナンバー作成（Cellclick用
				dataN = new String(j) + new String(i);
				style = "color: #444; background: #eee; padding: 5; margin: 0; width: 27px; height: 27px; text-align: center; ";
				html += '<td id="' + id + '" data-n="' + dataN + '" style="' + style  + '"></td>' + "\n";
			}
			html += '</tr>' + "\n";
		}
		html += "</table>\n";

		$('#board').html(html);
	}

	// ゲーム初期化メソッド
	function gameReset() {
		gameState = 0;

		for (i=0; i<8; i++){
			for (j=0; j<8; j++) {
				CellValue[j][i] = 0;
				CellState[j][i] = 0;
			}
		}

		FlagNum = 0;
		// MineNum = 8;
	}

	function gameDraw() {
		for (i = 0; i < 8; i++) {
			for (j = 0; j < 8; j++) {
				
				id = 'Cell' + new String(j) + new String(i);
				elm = $('#'+id);

				switch (CellState[j][i]) {

					case 0: //調査前
						elm.css('background-color','#fff');//CSS設定
						elm.html('');//html設定

						break;

					case 1: //調査後
						elm.css('background-color','#ccc');
						elm.css('cursor','default');//開放したマスはマウスを通常に

						switch (CellValue[j][i]) {

							case -1: //地雷
								elm.css('color','#222');
								elm.html('<i class="fa fa-bomb" aria-hidden="true"></i>')

								break;

							case 0: //地雷隣接なし
								elm.html('');

								break;

							default: //地雷隣接あり

								// 数値によって色を変化
								red = '';
								blue = '';

								red = (CellValue[j][i] * 30).toString(16);

								if (CellValue[j][i] == 1) {
									blue = 'a0';
								} else {
									blue = '00';
								}

								elm.css('color','#' + red + '00' + blue);								
								elm.html(CellValue[j][i]);
						}

						break;

					case 2: //フラグ
						elm.css('color','#009250');
						elm.css('background-color','#fff')
						elm.html('<i class="fa fa-flag" aria-hidden="true"></i>');

						break;

					case 4: //地雷踏む
						elm.css('color','#800');
						elm.css('background-color','#fff');
						elm.html('<i class="fa fa-bomb" aria-hidden="true"></i>')

						break;
				}
			 }
		}
		
		//メッセージの表示
		mes = $('#mes');
		switch (gameState) {
			case 0:
				mes.text('Startボタンでゲーム開始！');
				break;
			case 1:
			case 2:
				mes.text('フラグ数：' + new String(FlagNum) + ' / 地雷数：' + new String(MineNum));
				break;
			case 3:
				mes.text('クリア！');
				break;
			case 4:
				mes.text('地雷に接触しました！');
				break;
			}

	}

	//スタートボタンをクリックした時の処理
	function StartClick() {
		gameReset();
		gameState = 1;
		gameDraw();
	}

	//セルクリックした時の処理
	function CellClick(x, y) {
		if (gameState==0) {
			mes.text('Startボタンを押してください！');
		}

		if ($('#btnFlag').prop('checked')) {
			switch(gameState){
				case 1:
					mes.text('セルが開くまでフラグ設置はできません！');
					break;
				case 2:
					FlagCell(x,y);
					gameDraw();
					break;
			}

		} else {
			switch (gameState) {
				case 1:
					MineInit(x,y);
					OpenCell(x,y);
					gameDraw();
					gameState = 2;
					break;

				case 2://ゲームオーバー
					if (CellValue[x][y] == -1) {
						CellState[x][y] = 4;

						gameState = 4;

						MineX = x;
						MineY = y;

						//ここで全地雷を開く
						for (i = 0;i < 8;i++) {
							for (j = 0;j < 8;j++) {
								CellState[j][i] = 1;
							}
						}
						$('#btnStart').text('Start');
						gameDraw();
						$img.eq(1).show();
						$('#modal-title').text('GAME OVER');
						$('#modal-sub').html('地雷を踏んでしまった！<br>ゲームオーバーです！');
						modalOn();
						return;
					}

					

					if (CellState[x][y] == 2) {
						FlagNum--;
					}

					OpenCell(x, y);


					// クリア判定
					if (gameIsClear()) {

						// gameState = 3;

						// 全セルを開く
						for (i = 0;i < 8;i++) {
							for (j = 0;j < 8;j++) {
								CellState[j][i] = 1;
							}
						}

						$('#btnStart').text('Start');
						$img.eq(0).show();
						$('#modal-title').text('Clear!!!');
						$('#modal-sub').html('おめでとう！<br>ゲームクリアです！');
						$('#share').find('a').attr('href', 'https://twitter.com/share?url=http://maple-tree.moo.jp/works/MineSweeper/index.html&text= マインスイーパをクリアしました！');
						modalOn();

					}

					gameDraw();
					break;
			}
		}
		
	}

	// 対象のセルを開く関数
	function OpenCell(x,y) {
	
		var i=0;
		var j=0;

		if (x < 0 || x > 7 || y < 0 || y > 7) {
			return;
		}

		if (CellValue[x][y] == 0 && CellState[x][y] == 0) {
			CellState[x][y] = 1;
			for (i = -1;i <= 1;i++) {
				for (j = -1;j <= 1;j++) {
					if (j != 0 || i != 0) {
						if ((x + j) >= 0 && (x + j) < 8 && (y + i) >= 0 && (y + i) < 8) {

							// 隣接セルに隣接地雷がなければ再起呼び出し
							if (CellValue[x + j][y + i] == 0) {								
								OpenCell(x + j, y + i);
							}
							if (CellValue[x + j][y + i] > 0) {
								CellState[x + j][y + i] = 1;
							}
						}

					}
				}
			}

		}

		if (CellValue[x][y] != -1) {
			CellState[x][y] = 1;
		}
	}


	function FlagCell(x, y) {
		switch (CellState[x][y]) {
			case 0:
				CellState[x][y] = 2;
				FlagNum++;
				break;
			case 2:
				CellState[x][y] = 0;
				FlagNum--;
				break;
		}
	}

	function MineInit(x, y) {
		mines = 0;
		do {
			// 乱数で地雷位置設定
			mx = Math.floor(Math.random() * 8)
			my = Math.floor(Math.random() * 8)

			// 地雷が配置可能なら配置
			if ((Math.abs(mx - x) > 1 || Math.abs(my - y) > 1) && CellValue[mx][my] == 0) {
				CellValue[mx][my] = -1;
				mines++;
			}

		} while (mines < MineNum);

		// セルに隣接地雷数を設定
		for (i = 0;i < 8;i++) {
			for (j = 0;j < 8;j++) {

				CellState[j][i] = 0;

				if (CellValue[j][i] == 0) {
					n = 0;
					for (k = -1;k <= 1;k++) {
						for (l = -1;l <= 1;l++) {
							if ((j + l) >= 0 && (j + l) <= 7 && (i + k) >= 0 && (i + k) <= 7 && CellValue[j + l][i + k] == -1) {
								n++;
							}
						}
					}
					CellValue[j][i] = n;
				}
			}
		}

	}

	// ゲームクリア判定
	function gameIsClear() {

		for (i = 0;i < 8;i++) {
			for (j = 0;j < 8;j++) {
				if (CellValue[j][i] != -1 && CellState[j][i] != 1) {
					return false;
				}
			}
		}

		return true;
	}

	// モーダルを表示する
	function modalOn() {
		modal = $('#mes-modal');
		modal.fadeIn('500');
	}


	//以下メソッド動作記述

	gameInit();

	//ゲーム説明ボタンの処理
	$('#detail-btn').click(function() {
		if ($(this).hasClass('caption-is-open')) {
			$('#detail-p').slideUp('400');
			$(this).removeClass('caption-is-open');
		} else {
			$('#detail-p').slideDown('400');
			$(this).addClass('caption-is-open');
		}
	});


	//スタートボタンを押した時の処理
	$('#btnStart').click(function() {
		StartClick();
		$(this).text('Reset');//テキスト切り替え

		$img.hide();
		//カーソルをゲーム中はpointerに
		if ($('#board').hasClass('table-can-click')) {
			$('#board').removeClass('table-can-click');
		} else {
			$('#board').addClass('table-can-click');
		}
	});

	//セルをクリックした座標をCellClickに渡す処理
	$('#Table').find('td').click(function() {
		$thisCellNum = $(this).attr('data-n');
		$thisCellNum = parseInt($thisCellNum);
		// $thisCellNum += 1;
		// alert($thisCellNum);

		if ($thisCellNum < 10) {
			CellX = 0;
			CellY = $thisCellNum;
		} else {
			CellX = parseInt($thisCellNum/10);
			CellY = parseInt($thisCellNum%10);
		}
		// alert(CellX);
		// alert(CellY);
		CellClick(CellX,CellY);
	});

	// モーダルを閉じる処理
	$('#close-modal').click(function() {
		$('#mes-modal').fadeOut('500');
	});

	//シェアボタンを押したらミニウィンドウを表示
	$('.share-btn').click(function(e){
	     e.preventDefault();
	     window.open(this.href, "SNS_window", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
    });

});