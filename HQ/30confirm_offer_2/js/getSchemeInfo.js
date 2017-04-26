function getSchemeInfo(b) {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/schemeService/getSchemeTotalInfo",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"schemeCode": sessionStorage.getItem("schemeCode"),
		},
		success: function(c) {
			if(c.retCode == 0) {
				console.log(c);
				b && b(c.schemes)
			}
		},
	})
}

function getEnquiryInfo(b) {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/enquiryService/getEnquiryInfo",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"enquiryCode": sessionStorage.getItem("enquiryCode"),
		},
		success: function(c) {
			console.log(c);
			if(c.retCode == 0) {
				b && b(c)
			}
		},
	})
}

function fzCustomCompany(c, b) {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8081/userCenter/companyService/fzSupplierCompany",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"companyCode": c,
		},
		success: function(d) {
			console.log(d);
			if(d["retCode"] == "0000") {
				b && b(d.companys)
			}
		},
	})
}

function fzFeeTypes(c, b) {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/feeService/fzFeeTypes",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"feeTypeCode": c,
		},
		success: function(d) {
			console.log(d);
			if(d.retCode == 0) {
				b && b(d)
			}
		},
	})
}

function getCurrencys(fn) {
	var t = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/simpleDataService/getCurrencys",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": t + "",
		},
		success: function(json) {
			if(json.retCode == 0) {
				fn && fn(eval(json.currencys))
			}
		},
	})
}

function fzSupplierCompany(c, b) {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8081/userCenter/companyService/fzSupplierCompany",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"companyCode": c,
		},
		success: function(d) {
			console.log(d);
			if(d.retCode == 0) {
				b && b(d.companys)
			} else {
				$(".companyBox .s2").text("无此客户！");
				setTimeout(function() {
					$(".companyBox .s2").text("").hide()
				}, 700)
			}
		},
	})
}

function getCarrys(fn) {
	var t = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/carryService/getCarrys",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": t + "",
		},
		success: function(json) {
			if(json.retCode == 0) {
				console.log(json.carrys);
				var arrCarrys = eval(json.carrys);
				fn && fn(arrCarrys)
			}
		},
	})
};