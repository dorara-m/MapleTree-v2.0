$(function(){
	//ここからスクロール
	// ナビゲーションのリンクを指定
  var navLink = $('.scroll-nav-inner li a');
    // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
  var contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {
    // コンテンツのIDを取得
    var targetContents = navLink.eq(i).attr('href');
    // ページ内リンクでないナビゲーションが含まれている場合は除外する
    if(targetContents.charAt(0) == '#') {
      // ページ上部からコンテンツの開始位置までの距離を取得
    	var targetContentsTop = $(targetContents).offset().top;
    	// ページ上部からコンテンツの終了位置までの距離を取得
     	var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
       // 配列に格納
      contentsArr[i] = [targetContentsTop, targetContentsBottom]
    }
  };
 
  // 現在地をチェックする
  function currentCheck() {
  // 現在のスクロール位置を取得
    var windowScrolltop = $(window).scrollTop();
    for (var i = 0; i < contentsArr.length; i++) {
      // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
      if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
        // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
      	navLink.removeClass('current');
       	navLink.eq(i).addClass('current');
        i == contentsArr.length;
      }
    };
  }

  // ページ読み込み時とスクロール時に、現在地をチェックする
  $(window).on('load scroll', function() {
    currentCheck();
 	});
 
 	// ナビゲーションをクリックした時のスムーズスクロール
  navLink.click(function() {
    $('html,body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 300);
    return false;
 	});
  // ここまでスクロール

  //SNSボタンをクリックした時の挙動
  var shareButton = $('.share-links').children('.sns-item').children('a');
	  for (var i = 0; i < shareButton.length; i++) {
      shareButton[i].addEventListener("click", function(e) {
         e.preventDefault();
         window.open(this.href, "SNS_window", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
      }, false);
	  }

 	//ここからnewsスライドの切り替え
	var indexBtn = $('.index-btn');
	indexBtn.click(function(event) {
		$('.active').removeClass('active');
    var clickedIndex = indexBtn.index($(this));
    $('.slide').eq(clickedIndex).addClass('active');
    toggleChangeBtn();
	});

	$('.change-btn').click(function() {
    var $displaySlide = $('.active');
    $displaySlide.removeClass('active');
    
    if ($(this).hasClass('next-btn')) {
      $displaySlide.next().addClass('active');
    } else {
      $displaySlide.prev().addClass('active');
    }
    toggleChangeBtn();
  });

	function toggleChangeBtn () {
    var slideIndex = $('.slide').index($('.active'));
    $('.change-btn').show();
    if (slideIndex == 0) {
    	$('.prev-btn').hide();
    } else if (slideIndex == 3) {
    	$('.next-btn').hide();
    }
  }
});