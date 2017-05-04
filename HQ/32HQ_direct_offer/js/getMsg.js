(function(){
	var bSin=false;
	var port=getCookie('port')||'';
	$('#pot').html(port);
	$('#pot').attr('code',getCookie('code')||'');
	removeCookie('port')
	removeCookie('code')
	getEnquiryInfo(setSchemeInfo);
	getCurrencys(function(arr){
		for(var i=0;i<arr.length;i++){
			currencys.push({
				'id':arr[i]['currency'],
				'value':arrCurrency[arr[i]['currency']],
			});
		}
	});
	getSupplierCompanys(function(arr){
		for(var i=0;i<arr.length;i++){
			arrSupplierCompanys.push({
				'id': arr[i]['companyCode']+'&'+arr[i]['contector']+'&'+arr[i]['mobileNo'], 
				'value': arr[i]['companyName']
			})
		}
	})
	
	$('.btn-block').on('touchstart',function(){
		$('.btn-block').toggleClass('active');
	})
	$('.arrow').on('touchstart',function(){
		open('../02interface/interface.html');
	})
	$('.telPhoneNum').each(function(index,ele){
		$(ele).on('touchstart',function(){
			if($(ele).text()){
				telPhone($(ele).text());
			}
		})
	})
	$('.comb').on('touchstart',function(){
		$('.updateFee').hide();
		$('.addfees').hide();
	})
	//选择船公司
	$('#carrys').on('touchstart',function(){
		getCarrys(setCarrys);
	});
	function setCarrys(arr){
		arrCarrys=[{'id': '0', 'value': ''}];
		for(var i=0;i<arr.length;i++){
			arrCarrys.push({
				'id': arr[i]['carryCode'],
				'value': arr[i]['carryCode'],
			})
		}
	}
	
	function createLi(id,str,num){
		var oTmp=document.getElementById(id);
	    var oLi=oTmp.cloneNode(true);
	    oLi.removeAttribute('id');
	    switch (str){
	    	case 'num20gp':
	    		$(oLi).children('.kind').attr('id','num20GP').text('20GP*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost20gp');
	    		$(oLi).children('.bj').children('input').attr('id','cost20gp2');
	    		break;
	    	case 'num40gp':
	    		$(oLi).children('.kind').attr('id','num40GP').text('40GP*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost40gp');
	    		$(oLi).children('.bj').children('input').attr('id','cost40gp2');
	    		break;
	    	case 'num40hq':
	    		$(oLi).children('.kind').attr('id','num40HQ').text('40HQ*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost40hq');
	    		$(oLi).children('.bj').children('input').attr('id','cost40hq2');
	    		break;
	    	case 'num45hc':
	    		$(oLi).children('.kind').attr('id','num45HC').text('45HC*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost45hc');
	    		$(oLi).children('.bj').children('input').attr('id','cost45hc2');
	    		break;
	    }
	    return oLi;
	}
	
	function setSchemeInfo(data){
		getFeeTypesNearBy(data['polCode'],data['podCode'],function(data){
			if(data['primeFees'].length){
				for(var i=0;i<2;i++){
					
				}
			}
		})
		var json=data;
		for(var key in data['elements']){
			if(key.charAt(0)=='n'&&data['elements'][key]!='0'){
				var oLi=createLi('tplLi',key,data['elements'][key]);
				$('#hyf').append($(oLi));
			}
		}
		$('#hyf li:last-child').addClass('cr')
		$('#carrys').siblings('.val').attr('code',data['carryCode']||'0')
		$('.wrap').html($('.wrap').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        if(data[s]){
	        	return data[s];
	        }else{
	        	if(s=='carryCode'){
	        		return '全部';
	        	}else{
	        		return '';
	        	}
	        }
	    }));
	    if(data['sailingDay']){
	    	$('#tDay').show();
			$('#sailingDay').val(data['sailingDay'].substring(0,data['sailingDay'].length-1))
		}
	    isClick($('#sailingDayBox'),function(){
	    	$('#sailingDay')[0].focus();
	    })
	    $('#sailingDay').on('blur',function(){
	    	if($('#sailingDay').val()&&$('#sailingDay').val()!='0'){
	    		$('#tDay').show();
	    	}
	    })
	    $('#btn').on('touchstart',function(){
			$('#shadow').show();
		})
	    $('#cancel').on('touchstart',function(){
			$('#shadow').hide();
		});
		$('#confirm').on('touchstart',function(){
			$('#shadow').hide();
			if($('.companyBox input').val()==''){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('请选择报价公司！').show();
				}else{
					$('#hintBox').html('NO Quoted Companys！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#carrys').find('.val').text()==''||$('#carrys').find('.val').text()=='全部'){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('请选择船公司！').show();
				}else{
					$('#hintBox').html('NO Carrys！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#expireDate').text()==''){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('请填写有效期！').show();
				}else{
					$('#hintBox').html('NO expireDate！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#cost20gp').val()=='0'&&$('#cost40gp').val()=='0'){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('请填写运费！').show();
				}else{
					$('#hintBox').html('NO Fees！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else{
				var t=new Date().getTime();
				var arrPrimeFees=createPrimeFees($('.PrimeFees'),{'Cost20gp':$('#cost20gp'),'Cost40gp':$('#cost40gp'),'Cost40hq':$('#cost40hq'),'Cost45hc':$('#cost45hc'),});
				var arrFees=createPrimeFees($('.Fees'),{'Cost20gp':$('#cost20gp2'),'Cost40gp':$('#cost40gp2'),'Cost40hq':$('#cost40hq2'),'Cost45hc':$('#cost45hc2'),});
				console.log(arrPrimeFees)
				$.ajax({
					type:'POST',
					async:false,
					url:'http://106.14.251.28:8085/bizCenter/schemeService/pubSchemeWithoutSp',
					data:{
						'accessToken':getCookie('accessToken'),
						'msgId':t+'',
						'enquiryCode':json['enquiryCode'],
						'supplierCode':$('.companyBox input').attr('companyCode'),
						'polCode':json['polCode'],
						'podCode':json['podCode'],
						'potCode':$('#pot').attr('code'),
						'carryCode':$('#carrys').find('.val').attr('code'),
						'sailingDay':$('#sailingDay').val()+'天',
						'etd':$('#etd').text(),
						'customsClearance':$('#customsClearance').text(),
						'expireDate':$('#expireDate').text(),
						'primeFees':JSON.stringify(arrPrimeFees),
						'fees':JSON.stringify(arrFees),
						'vessel':'',
						'voyage':'',
					},
					success:function(json){
						if(json.retCode==0000){
							if(getCookie('lng')=='CN'){
								$('#hintBox').html('确认报价成功！').show();
							}else{
								$('#hintBox').html('Successfull！').show();
							}
							setTimeout(function(){
								$('#hintBox').hide();
								sessionStorage.removeItem('currentData')
								sessionStorage.removeItem('currentScrollT')
								sessionStorage.removeItem('lengths1')
								sessionStorage.removeItem('lengths2')
								sessionStorage.removeItem('lengths3')
								open('../02interface/interface.html');
							},700)
						}else{
							if(getCookie('lng')=='CN'){
								$('#hintBox').html('确认报价失败！').show();
							}else{
								$('#hintBox').html('Failure！').show();
							}
						
							setTimeout(function(){
								$('#hintBox').hide();
							},700)
						}
					},
					
				})
			}
		return false;	
		})
	}
	
	var fzType='';
	
	isClick($('#addFeeBox'),function(){
		$('.addfees').css('display','flex');
		if(bSin) return
		bSin=true;
		getFeeTypes(function(data){
			for(var i=0;i<data.length;i++){
				var oDd=$('<dd><i class="i1"></i><div class="tl1 feeName"></div><div class="tl2 cost20gp"></div><div class="tl3 cost40gp"></div><div class="tl4 byOrder"></div><div class="tl5 currery"></div><div class="tl4 cb prepaid active"><i style="margin:0.25rem auto 0" class="i2"></i></div></dd>');
				oDd.find('.feeName').text(data[i]['feeTypeEname']);
				oDd.attr('feeTypeNum',data[i]['feeTypeNum']);
				oDd.attr('byOrder',data[i]['byOrder']);
				oDd.attr('currency',data[i]['currency']);
				oDd.attr('prepaid',1);
				if(data[i]['byOrder']==1){
					oDd.find('.byOrder').text('0');
				}else{
					oDd.find('.cost20gp').text(data[i]['cost20gp']||0);
					oDd.find('.cost40gp').text(data[i]['cost40gp']||0);
				}
				oDd.find('.currery').text(arrCurrency[data[i]['currency']]);
				if(data['isDefault']){
					oDd.addClass('active')
				}
				isClick(oDd,function(oDd){
					oDd.toggleClass('active')
				})
				isClick(oDd.find('.prepaid'),function(i,ev){
					i.toggleClass('active')
					if(i.hasClass('active')){
						i.parent().attr('prepaid',1);
					}else{
						i.parent().attr('prepaid',0);
					}
					ev.cancelBubble=true;
				})
				$('.addfees .former').append(oDd);
			}
		})
	})
	$('#addfeesBtn').on('touchstart',function(){
		$('#append dd').remove();
		if($('.addfees .former dd.active:not(.old)').length){
			$('.addfees .former dd.active:not(.old)').each(function(index,ele){
				for(var i=0;i<2;i++){
					if($(ele).attr('byOrder')=='1'){
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(ele).find('.feeName').text()+"<span class='byOrder'> (byOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(ele).attr('currency')]+"</span><input type='number' value='0' disabled/></span></dd>");
					}else{
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(ele).find('.feeName').text()+"<span class='byOrder'> (nobyOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(ele).find('.cost20gp').text()+" class='v1' disabled/>*<span class='num1'>1</span>+<span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(ele).find('.cost40gp').text()+" class='v2' disabled/>*<span class='num2'>1</span>=<span class='currencys2 currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><span class='total2'>200</span></span></dd>");
						if($('#num20GP').length){
							oDd.find('.num1').text($('#num20GP').text().substring(5));
						}else{
							oDd.find('.num1').text('0');
						}
						if($('#num40GP').length){
							oDd.find('.num2').text($('#num40GP').text().substring(5));
						}else{
							oDd.find('.num2').text('0');
						}
						toTotal(oDd);
					}
					oDd.find('input').css('background-color','#fff')
					oDd.attr('currenys',$(this).attr('currency'));
					oDd.attr('byOrder',$(this).attr('byOrder'));
					oDd.attr('prepaid',$(this).attr('prepaid'));
					oDd.attr('feeTypeNum',$(this).attr('feeTypeNum'));
					if(!$('#append dd')['length']){
						oDd.addClass('cb');
					}
					if(i){
						oDd.addClass('PrimeFees');
						if(getCookie('lng')=='CN'){
							oDd.find('.byOrder').text('(成本)')
						}else{
							oDd.find('.byOrder').text('(Cost)')
						}
					}else{
						oDd.addClass('Fees');
						if(getCookie('lng')=='CN'){
							oDd.find('.byOrder').text('(报价)')
						}else{
							oDd.find('.byOrder').text('(Quote)')
						}
						
					}
					$('#append dt').after(oDd);
				}
				toFocus();
				toTotalAll();
				toTotalFeesAll();
				toProfit();
			})
		}
		
		$('.addfees').hide();
		
	})
	var isclick=false;
	$(document).on('touchstart','#append dd',function(){
		isclick=true;
	})
	$(document).on('touchmove','#append dd',function(){
		isclick=false;
	})
	$(document).on('touchend','#append dd',function(){
		if(isclick){
			$('#append dd').removeClass('active')
			$(this).addClass('active');
			if($(this).attr('byorder')=='1'){
				$('#ipt5').val($(this).find('.currencys:first-child').text());
				$('#ipt5').attr('currenys',$(this).attr('currenys'));
				$('#ipt5').siblings('span').hide()
				$('.updateFee2 h2').text($(this).find('.name').text().split('(')[0])
				$('.updateFee2 .e3').text(arrCurrency[$(this).attr('currenys')]+$(this).find('input').val());
				$('.updateFee2').css('display','flex');
			}else{
				$('#ipt3').val($(this).find('.currencys:first-child').text());
				$('#ipt3').attr('currenys',$(this).attr('currenys'));
				$('#ipt3').siblings('span').hide()
				$('.updateFee1 h2').text($(this).find('.name').text().split('(')[0])
				$('.updateFee1 .e1').text(arrCurrency[$(this).attr('currenys')]+$(this).find('.v1').val());
				$('.updateFee1 .e2').text(arrCurrency[$(this).attr('currenys')]+$(this).find('.v2').val())
				$('.updateFee1').css('display','flex');
			}
			
		}
	})
	$('#ipt3,#ipt5').parent().on('touchstart',function(){
		var _this=this;
		var Select = new IosSelect(1, 
		    [currencys],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$(_this).find('input').val(selectOneObj.value);
		        	$(_this).find('input').attr('currenys',selectOneObj.id);
		        	if($(_this).find('input').val()){
		        		$(_this).find('input').siblings('span').hide()
		        	}
		        }
		});
	})
	$('#updateFeeBtn1').on('touchstart',function(){
		$('#append dd.active').find('.currencys').text(arrCurrency[$('#ipt3').attr('currenys')])
		$('#append dd.active').attr('currenys',$('#ipt3').attr('currenys'))
		if($('#ipt1').val()){
			$('#append dd.active').find('.v1').val($('#ipt1').val())
		}
		if($('#ipt2').val()){
			$('#append dd.active').find('.v2').val($('#ipt2').val())
		}
		$('#ipt1').val('')
		$('#ipt1').siblings('span').show();
		$('#ipt2').siblings('span').show();
		$('#ipt2').val('')
		$('#ipt3').val('')
		$('.updateFee1').hide();
		toTotal($('#append dd.active'))
		toTotalAll();
		toTotalFeesAll();
		toProfit();
	})
	$('#updateFeeBtn2').on('touchstart',function(){
		$('#append dd.active').find('.currencys').text(arrCurrency[$('#ipt5').attr('currenys')])
		$('#append dd.active').attr('currenys',$('#ipt5').attr('currenys'))
		if($('#ipt4').val()){
			$('#append dd.active').find('input').val($('#ipt4').val())
		}
		$('#ipt4').val('')
		$('#ipt4').siblings('span').show();
		$('#ipt5').val('')
		$('.updateFee2').hide();
		toTotalAll();
		toTotalFeesAll();
		toProfit();
	})
		
	isClick($('.companyBox input,.companyBox .s1'),function(){
		var Select = new IosSelect(1, 
		    [arrSupplierCompanys],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$('.companyBox input').val(selectOneObj.value).attr('companyCode',selectOneObj.id.split('&')[0]);
		        	$('#contector').text(selectOneObj.id.split('&')[1])
		        	$('#contectorMobileNo').text(selectOneObj.id.split('&')[2])
		        	if($('.companyBox input')){
		        		$('.companyBox .s1').hide();
		        	}
		        }
		});
	})
	
	toFocus();
	function toFocus(){
		var original=0;
		$('input[type=number]').focus(function(){
			original=$(this).val();
			$(this).val('');
		});
		$('input[type=number]').blur(function(){
			if(!$(this).val()) $(this).val(original);
			if($('#sailingDay').val()=='0') $('#sailingDay').val('');
			$(this).siblings('.total2').text();
			toTotal($(this).parent().parent());
			toTotalAll();
			toTotalFeesAll();
			toProfit();
		});
	}
	function toTotal(oParent){
		var total=Number(oParent.find('.v1').val())*Number(oParent.find('.num1').text())+Number(oParent.find('.v2').val())*Number(oParent.find('.num2').text());
		oParent.find('.total2').text(total);
	}
	
	function toTotalAll(){
		$('#allCostTotal')[0].innerHTML='';
		var total1=0;
		var total2=0;
		var total3=0;
		
		function sumHyf(){
			var sum=0;
			if($('#num20GP').length){
				sum+=Number($('#num20GP').text().substring(5))*Number($('#cost20gp').val());
			}
			if($('#num40GP').length){
				sum+=Number($('#num40GP').text().substring(5))*Number($('#cost40gp').val());
			}
			if($('#num40HQ').length){
				sum+=Number($('#num40HQ').text().substring(5))*Number($('#cost40hq').val());
			}
			if($('#num45HC').length){
				sum+=Number($('#num45HC').text().substring(5))*Number($('#cost45hc').val());
			}
			return sum;
		}
		
		if($('#unit').attr('currency')=='0'){
			
			total1=sumHyf();
		}else if($('#unit').attr('currency')=='1'){
			total2=sumHyf();
		}else if($('#unit').attr('currency')=='2'){
			total3=sumHyf();
		}
		$('#append .PrimeFees').each(function(index,ele){
			if($(ele).attr('currenys')=='0'){
				if($(ele).attr('byOrder')=='1'){
					total1+=Number($(ele).find('input').val());
				}else{
					total1+=Number($(ele).find('.total2').text());
				}
			}else if($(ele).attr('currenys')=='1'){
				if($(ele).attr('byOrder')=='1'){
					total2+=Number($(ele).find('input').val());
				}else{
					total2+=Number($(ele).find('.total2').text());
				}
			}else if($(ele).attr('currenys')=='2'){
				if($(ele).attr('byOrder')=='1'){
					total3+=Number($(ele).find('input').val());
				}else{
					total3+=Number($(ele).find('.total2').text());
				}
			}
		});
		if(total1!=0){
			$('#allCostTotal')[0].innerHTML+='<b></b><em>￥</em><span class="val tol1">'+total1+'</span>';
		} 
		if(total2!=0){
			$('#allCostTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol2">'+total2+'</span>';
		}
		if(total3!=0){
			$('#allCostTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol3">'+total3+'</span>';
		}
	}
	function toTotalFeesAll(){
		$('#allQuoteTotal')[0].innerHTML='';
		var total1=0;
		var total2=0;
		var total3=0;
		function sumHyf(){
			var sum=0;
			if($('#num20GP').length){
				sum+=Number($('#num20GP').text().substring(5))*Number($('#cost20gp2').val());
			}
			if($('#num40GP').length){
				sum+=Number($('#num40GP').text().substring(5))*Number($('#cost40gp2').val());
			}
			if($('#num40HQ').length){
				sum+=Number($('#num40HQ').text().substring(5))*Number($('#cost40hq2').val());
			}
			if($('#num45HC').length){
				sum+=Number($('#num45HC').text().substring(5))*Number($('#cost45hc2').val());
			}
			return sum;
		}
		if($('#unit').attr('currency')=='0'){
			total1=sumHyf();
		}else if($('#unit').attr('currency')=='1'){
			total2=sumHyf();
		}else if($('#unit').attr('currency')=='2'){
			total3=sumHyf();
		}2
		$('#append .Fees').each(function(index,ele){
			if($(ele).attr('currenys')=='0'){
				if($(ele).attr('byOrder')=='1'){
					total1+=Number($(ele).find('input').val());
				}else{
					total1+=Number($(ele).find('.total2').text());
				}
			}else if($(ele).attr('currenys')=='1'){
				if($(ele).attr('byOrder')=='1'){
					total2+=Number($(ele).find('input').val());
				}else{
					total2+=Number($(ele).find('.total2').text());
				}
			}else if($(ele).attr('currenys')=='2'){
				if($(ele).attr('byOrder')=='1'){
					total3+=Number($(ele).find('input').val());
				}else{
					total3+=Number($(ele).find('.total2').text());
				}
			}
		});
		if(total1!=0){
			$('#allQuoteTotal')[0].innerHTML+='<b></b><em>￥</em><span class="val tol1">'+total1+'</span>';
		} 
		if(total2!=0){
			$('#allQuoteTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol2">'+total2+'</span>';
		}
		if(total3!=0){
			$('#allQuoteTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol3">'+total3+'</span>';
		}
	}
	
	function toProfit(){
		$('#allProfitTotal')[0].innerHTML='';
		var total1=0;
		var total2=0;
		var total3=0;
		var TotalAll1=0;
		var TotalAll2=0;
		var TotalAll3=0;
		var TotalFeesAll1=0;
		var TotalFeesAll2=0;
		var TotalFeesAll3=0;
		
		if($('#allCostTotal .tol1')){
			TotalAll1=$('#allCostTotal .tol1').text();
		}
		if($('#allCostTotal .tol2')){
			TotalAll2=$('#allCostTotal .tol2').text();
		}
		if($('#allCostTotal .tol3')){
			TotalAll3=$('#allCostTotal .tol3').text();
		}
		if($('#allQuoteTotal .tol1')){
			TotalFeesAll1=$('#allQuoteTotal .tol1').text();
		}
		if($('#allQuoteTotal .tol2')){
			TotalFeesAll2=$('#allQuoteTotal .tol2').text();
		}
		if($('#allQuoteTotal .tol3')){
			TotalFeesAll3=$('#allQuoteTotal .tol3').text();
		}
		
		total1=Number(TotalFeesAll1)-Number(TotalAll1);
		total2=Number(TotalFeesAll2)-Number(TotalAll2);
		total3=Number(TotalFeesAll3)-Number(TotalAll3);
		if(total1!=0){
			$('#allProfitTotal')[0].innerHTML+='<b></b><em>￥</em><span class="val tol1">'+total1+'</span>';
		} 
		if(total2!=0){
			$('#allProfitTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol2">'+total2+'</span>';
		}
		if(total3!=0){
			$('#allProfitTotal')[0].innerHTML+='<b></b><em>฿</em><span class="val tol3">'+total3+'</span>';
		}
	}
	
	function createPrimeFees(feesObj,json){
		var arr=[
			{
				'feeTypeNum':0,
				'currency':$('#unit').attr('currency'),
				'prepaid':($('.btn-block').hasClass('active')? 0:1),
				'byOrder':0,
			}
		];
		for(var key in json){
			if(json[key]){
				arr[0][key]=json[key].val();
			}
		}
		feesObj.each(function(index,ele){
			if($(ele).attr('byorder')=='1'){
				arr.push({
					'feeTypeNum':$(ele).attr('feeTypeNum'),
					'currency':$(ele).attr('currenys'),
					'prepaid':$(ele).attr('prepaid'),
					'byOrder':1,
					'orderPrice':$(ele).find('input').val(),
				});
			}else{
				arr.push({
					'feeTypeNum':$(ele).attr('feeTypeNum'),
					'currency':$(ele).attr('currenys'),
					'prepaid':$(ele).attr('prepaid'),
					'byOrder':0,
					'Cost20gp':$(ele).find('.v1').val(),
					'Cost40gp':$(ele).find('.v2').val(),
				});
			}
		});
		return arr;
	}
	var oUser=document.querySelector('.companyBox');
//	userLoad(oUser);
	$('.focus').each(function(index,ele){
		userLoad(ele);
	})
	function userLoad(ele){
		var oInput=ele.querySelector('input');
		var oSpan=ele.querySelector('span');
		oInput.onfocus=function(){
			hide(oSpan);
			return false;
		};
		oSpan.addEventListener('touchstart',function(){
			oInput.focus();
			return false;
		},false);
		oInput.onblur=function(){
			if(oInput.value==''){
				show(oSpan);
			}
		}
	}
	function hide(ele){
		ele.style.display='none';
	}
	function show(ele){
		ele.style.display='block';
	}
})()
