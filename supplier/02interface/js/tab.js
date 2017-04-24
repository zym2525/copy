(function(){
	init();
	initNav1();
	$('footer div').on('touchstart',function(){
		setCookie('currentCount',$(this).index(),28);
		init();
	})
	$('.nav1 li').on('touchstart',function(){
		setCookie('nav1Count',$(this).index(),28);
		initNav1();
	})
	function initNav1(){
		$('.nav1 li').removeClass('active');
		$('.enterances2 .content').hide();
		$('.nav1 li').eq(getCookie('nav1Count')||0).addClass('active');
		$('.enterances2 .content').eq(getCookie('nav1Count')||0).show();
		if(sessionStorage.getItem('currentScrollT')){
			$('.enterances2').scrollTop(eval(sessionStorage.getItem('currentScrollT'))[getCookie('nav1Count')]);
		}else{
			$('.enterances2').scrollTop(0)
		}
	}
	$('.nav2 li').on('touchstart',function(){
		$('.nav2 li').removeClass('active');
		$('.enterances3 .content').hide();
		$(this).addClass('active');
		$('.enterances3 .content').eq($(this).index()).show();
		$('.enterances3').scrollTop(0);
	})
	function init(){
		$('footer div').removeClass('active');
		$('.enterances').hide();
		$('.header').hide();
		$('footer div').eq(getCookie('currentCount')||0).addClass('active');
		$('.enterances').eq(getCookie('currentCount')||0).show();
		$('.header').eq(getCookie('currentCount')||0).show();
	}
})()
