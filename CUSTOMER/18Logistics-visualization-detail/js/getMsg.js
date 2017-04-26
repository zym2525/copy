$(function(){
	getNodesByOrder(setNodesByOrder);
	if(sessionStorage.getItem('scrollT2')){
		$('.content').scrollTop(sessionStorage.getItem('scrollT2'));
	}
	
	$('#arrow').on('touchstart',function(){
		sessionStorage.removeItem('scrollT2')
    	setCookie('currentCount',2,28);
    	open('../02interface/interface.html');
    });
    
})
function setNodesByOrder(json){
	$('#expectDate').text(json['expectDate']);
	if(json['order']['gp20']){
		$('#elements').text($('#elements').text()+'20GP*'+json['order']['gp20']);
	}
	if(json['order']['gp40']){
		$('#elements').text($('#elements').text()+'  40GP*'+json['order']['gp40']);
	}
	if(json['order']['hq40']){
		$('#elements').text($('#elements').text()+'  40HQ*'+json['order']['hq40']);
	}
	if(json['order']['hc45']){
		$('#elements').text($('#elements').text()+'  45HC*'+json['order']['hc45']);
	}
	$('.order_box').html($('.order_box').html().replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        if(json['order'][s]){
        	return json['order'][s];
        }else{
        	return '无';
        }
    }));
    if(json.nodes){
    	var data=eval('('+json.nodes+')');
    }else{
    	var data=[];
    }
	
	for(var i=0;i<data.length;i++){
		var oEm=$('dl[nodeCode='+data[i]['nodeCode']+']').children().children('em');
		oEm.removeClass('gray');
		if(data[i]['isError']){
			oEm.addClass('green red');
		}else{
			oEm.addClass('green');
		}
		$('dl[nodeCode='+data[i]['nodeCode']+']').children('dd').html(data[i]['nodeTime']);
		$('dl[nodeCode='+data[i]['nodeCode']+']').children('.icon').show();
		switch ($('dl[nodeCode='+data[i]['nodeCode']+']').attr('id')){
			case 'btn1':
				isClick($('#btn1'),function(){
					sessionStorage.setItem('scrollT2',$('.content').scrollTop())
					open('../20getEmptyContainers/20.html');
				})
				break;
			case 'btn2':
				isClick($('#btn2'),function(){
					sessionStorage.setItem('scrollT2',$('.content').scrollTop())
					open('../21heavyContainerEnterPort/21.html');
				})
				break;
			case 'btn3':
				isClick($('#btn3'),function(){
					sessionStorage.setItem('scrollT2',$('.content').scrollTop())
					open('../22scheduledReceipt/22.html');
				})
				break;
			case 'btn4':
				var oBtn4=document.getElementById('btn4');
				oBtn4.addEventListener('touchstart',function(){
			    	oBtn4.timer=setTimeout(function(){
			    		sessionStorage.setItem('scrollT2',$('.content').scrollTop())
			    		open('../23customsInspection/23.html');
			    	},300);
			    	oBtn4.addEventListener('touchmove',function(){
			    		clearTimeout(oBtn4.timer);
			    	},false)
			    	return false;
			    },false);
				break;
			case 'btn5':
				var oBtn5=document.getElementById('btn5');
				oBtn5.addEventListener('touchstart',function(){
			    	oBtn5.timer=setTimeout(function(){
			    		sessionStorage.setItem('scrollT2',$('.content').scrollTop())
			    		open('../24customsRelease/24.html');
			    	},300);
			    	oBtn5.addEventListener('touchmove',function(){
			    		clearTimeout(oBtn5.timer);
			    	},false)
			    	return false;
			    },false);
				break;
			case 'btn6':
				var oBtn6=document.getElementById('btn6');
				oBtn6.addEventListener('touchstart',function(){
			    	oBtn6.timer=setTimeout(function(){
			    		sessionStorage.setItem('scrollT2',$('.content').scrollTop())
			    		open('../25heavyContainerShipment/25.html');
			    	},300);
			    	oBtn6.addEventListener('touchmove',function(){
			    		clearTimeout(oBtn6.timer);
			    	},false)
			    	return false;
			    },false);
				break;
		}
	}
}
