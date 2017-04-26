function getEnquirys(a, b, c, d, e) {
	var t = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/enquiryService/getEnquirys",
		data: {
			"accessToken": a,
			"enquiryStatus": b,
			"msgId": t + "",
			"isBackward": e,
			"schemeStatus": "",
			"enquiryTimeStart": "2010-03-10",
			"enquiryTimeEnd": "2047-03-10",
			"pageSize": pageSize,
			"currentPage": c,
		},
		success: function(json) {
			console.log(json);
			if(json.retCode == 0) {
				var allEnquirys = eval(json.enquirys);
				d && d(allEnquirys, json.num)
			}
		},
	})
}

function getCarrys(c) {
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
				c && c(arrCarrys)
			}
		},
	})
}

function findByOrder(g, f, h) {
	var e = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8085/bizCenter/order/findByOrder?accessToken=" + getCookie("accessToken"),
		async: true,
		data: JSON.stringify({
			"orderCode": "",
			"bookingNo": "",
			"createTimeBegin": "",
			"createTimeEnd": "",
			"currentPage": g,
			"pageSize": orderPageSize,
			"status": "status",
		}),
		contentType: "application/json; charset=utf-8",
		success: function(a) {
			if(a.code == 0) {
				console.log(a.data);
				h && h(a.data)
			}
		},
	})
}

function getSupplierCompanys(c) {
	var d = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8081/userCenter/companyService/getSupplierCompanys",
		async: true,
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": d + "",
		},
		success: function(a) {
			if(a.retCode == 0) {
				c && c(a.companys)
			}
		},
	})
}

function getCompanyInfo(f, d) {
	var e = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8081/userCenter/companyService/getCompanyInfo",
		async: true,
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": e + "",
			"companyCode": f,
		},
		success: function(a) {
			if(a.retCode == 0) {
				d && d(a["mobileNo"])
			}
		},
	})
};