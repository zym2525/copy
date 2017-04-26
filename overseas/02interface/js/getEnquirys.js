function getEnquirys(token, enquiryState, currentPage, fn, isBackward, enquiryBizStatus) {
	isBackward = isBackward || 1;
	if(!enquiryBizStatus && enquiryBizStatus != 0) {
		enquiryBizStatus = ""
	}
	var t = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8085/bizCenter/enquiryService/getEnquirys",
		data: {
			"accessToken": token,
			"enquiryStatus": enquiryState,
			"msgId": t + "",
			"isBackward": isBackward,
			"schemeStatus": "",
			"enquiryTimeStart": "2010-03-10",
			"enquiryTimeEnd": "2047-03-10",
			"currentPage": currentPage,
			"pageSize": pageSize,
			"enquirybizStatus": enquiryBizStatus,
		},
		success: function(json) {
			console.log(json);
			if(json.retCode == 0) {
				var allEnquirys = eval(json.enquirys);
				fn && fn(allEnquirys, json.num)
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

function getNewNodes(c, b) {
	var a = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8085/bizCenter/logisticalInfoService/getNewNodes",
		async: true,
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"customCode": c,
		},
		success: function(d) {
			if(d.retCode == 0) {
				b && b(d.nodes)
			}
		},
	})
}

function getCustomCompanys(b) {
	var a = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8081/userCenter/companyService/getCustomCompanys",
		async: true,
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

function findByOrder(c, b) {
	var a = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8085/bizCenter/order/findByOrder?accessToken=" + getCookie("accessToken"),
		async: true,
		data: JSON.stringify({
			"orderCode": "",
			"bookingNo": "",
			"createTimeBegin": "",
			"createTimeEnd": "",
			"currentPage": c,
			"pageSize": orderPageSize,
			"status": "0,1",
		}),
		contentType: "application/json; charset=utf-8",
		success: function(d) {
			console.log(d);
			if(d.code == 0) {
				b && b(d.data)
			}
		},
	})
}

function findHistoryOrder(c, b) {
	var a = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8085/bizCenter/order/findHistoryOrder?accessToken=" + getCookie("accessToken"),
		async: true,
		data: JSON.stringify({
			"orderCode": "",
			"bookingNo": "",
			"createTimeBegin": "",
			"createTimeEnd": "",
			"currentPage": c,
			"pageSize": orderPageSize,
		}),
		contentType: "application/json; charset=utf-8",
		success: function(d) {
			if(d.code == 0) {
				console.log(d.data);
				b && b(d.data)
			}
		},
	})
};