(function(){
	var port=getCookie('port')||'DUBAI';
	var startDate='';
	var endDate='';
	$('#pod').html(port);
	$('#pod').attr('code',getCookie('code')||'AEDUB');
	removeCookie('port');
	removeCookie('code');
	$('.btn').click(function(){
		$('.btn').removeClass('active');
		$(this).addClass('active');
	});
	$('#podBox').on('touchstart',function(){
		setCookie('local',window.location.href,28);
		open("../04POT/04-1.html");
	})
	$('#arrow').on('touchstart',function(){
		open('../02interface/interface.html');
	})
	$('#search').on('touchstart',function(){
		if($('#startDate').html()!='起始时间'&&$('#startDate').html()!='Begin Time'){
			startDate=$('#startDate').html();
		}
		if($('#endDate').html()!='结束时间'&&$('#endDate').html()!='End Time'){
			endDate=$('#endDate').html();
		}
			var t=new Date().getTime();
			switch (getCookie('nav1Count')){
				case '0':
					var enquiryStatus=0;
					break;
				case '1':
					var enquiryStatus=1;
					break;
				case '2':
					var enquiryStatus=2;
					break;
			}
			$.ajax({
				type:'POST',
				async:false,
				url:'http://106.14.251.28:8085/bizCenter/enquiryService/getEnquirys',
				data:{
					'accessToken':getCookie('accessToken'),
					'msgId':t+'',
					'enquiryStatus':enquiryStatus,
					'isBackward':1,
					'schemeStatus':$('.btn.active').children('span').attr('schemeStatus'),
					'enquiryTimeStart':startDate,
					'enquiryTimeEnd':endDate,
					'polCode':$('#pol').attr('code'),
					'podCode':$('#pod').attr('code'),
				},
				success:function(json){
					if(json.retCode==0000){
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('搜索成功！').show();
						}else{
							$('#hintBox').html('successful！').show();
						}
					
						setTimeout(function(){
							$('#hintBox').hide();
							if(json.enquirys){
								sessionStorage.setItem('datas',JSON.stringify(json.enquirys));
							}
							sessionStorage.removeItem('currentData')
							sessionStorage.removeItem('currentScrollT')
							open('../02interface/interface.html');
						},700)
					}else{
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('搜索失败！').show();
						}else{
							$('#hintBox').html('failure！').show();
						}
						setTimeout(function(){
							$('#hintBox').hide();
						},700)
					}
				},
			})
	})
})()
