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
			if(d.retCode == 0) {
				b && b(d)
			}
		},
	})
}

function getFeeTypes(b) {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/feeService/getFeeTypes",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
		},
		success: function(c) {
			if(c.retCode == 0) {
				b && b(c.types)
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

function getSupplierCompanys(b) {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8081/userCenter/companyService/getSupplierCompanys",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
		},
		success: function(c) {
			if(c.retCode == 0) {
				b && b(c.companys)
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
				var arrCarrys = eval(json.carrys);
				fn && fn(arrCarrys)
			}
		},
	})
}
function getFeeTypesNearBy(polCode,podCode,fn) {
	var t = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/feeService/getFeeTypesNearBy",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": t + "",
			"polCode": polCode,
			"podCode": podCode,
		},
		success: function(json) {
			console.log(json)
			if(json.retCode == 0) {
				fn && fn(json)
			}
		},
	})
}
function fsVessel(str, fn) {
	var t = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/simpleDataService/fsVessel",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": t + "",
			"vesselHeader": str,
		},
		success: function(json) {
			if(json.retCode == 0) {
				fn && fn(eval(json.vessels))
			} else {
				$(".fuzzy .view").empty();
				var oLi = $('<li class="item"><span></span></li>');
				oLi.find("span").text("无此船");
				$(".fuzzy .view").append(oLi);
				setTimeout(function() {
					$(".fuzzy .view").empty()
				}, 1000)
			}
		},
	})
}

function fsVessel(str, fn) {
	var t = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/simpleDataService/fsVoyage",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": t + "",
			"voyageHeader": str,
		},
		success: function(json) {
			if(json.retCode == 0) {
				fn && fn(eval(json.vessels))
			} else {
				$(".fuzzy .view").empty();
				var oLi = $('<li class="item"><span></span></li>');
				oLi.find("span").text("无此船");
				$(".fuzzy .view").append(oLi);
				setTimeout(function() {
					$(".fuzzy .view").empty()
				}, 1000)
			}
		},
	})
};