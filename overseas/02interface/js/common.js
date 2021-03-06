$("#exchange").on("touchstart", function() {
	var a;
	a = $("#start_box em").html();
	$("#start_box em").html($("#end_box em").html());
	$("#end_box em").html(a);
	a = $("#start_box em").attr("code");
	$("#start_box em").attr("code", $("#end_box em").attr("code"));
	$("#end_box em").attr("code", a)
});
$("#end_box").on("touchstart", function() {
	setCookie("local", window.location.href, 28);
	open("../04POT/04-1.html")
});
$("#carrys").on("touchstart", function() {
	getCarrys(setCarrys)
});

function setCarrys(a) {
	data[1] = [{
		"id": "0",
		"value": ""
	}];
	for(var b = 0; b < a.length; b++) {
		data[1].push({
			"id": a[b]["carryCode"],
			"value": a[b]["carryCode"],
		})
	}
}
$("#tel").on("touchstart", function() {
	telPhone($("#tel").html())
});
$("footer>div:nth-child(4)").on("touchstart", function() {
	var a = new Date().getTime();
	$.ajax({
		type: "post",
		url: "http://106.14.251.28:8081/userCenter/userService/getUserInfo",
		async: true,
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + ""
		},
		success: function(b) {
			if(b.retCode == 0) {
				$("#userName").html(b["alias"]);
				$("#mobileNo").html(b["mobileNo"]);
				$("#companyName").html(b["companyName"]);
				$("#email").html(b["email"]);
				setCookie("currentCount", 0, 28);
				isClick($("#change"), function() {
					$("#shadow2").show();
					return false
				})
			}
		}
	})
});
$(document).on("touchstart", "#cancel3", function() {
	$("#shadow2").hide()
});
$(document).on("touchstart", "#confirm3", function() {
	$("#shadow2").hide();
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8081/userCenter/commonService/unlogin/applyRestPwd",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"loginName": $("#mobileNo").html(),
			"appCode": "dd0557d8-ad20-4f41-a288-6f69862d5362",
			"noticeType": 1,
		},
		success: function(b) {
			if(b.retCode == 0) {
				if(getCookie("lng") == "CN") {
					$("#hintBox").text("已发送邮件！").show()
				} else {
					$("#hintBox").text("E-mail sent！").show()
				}
				setTimeout(function() {
					$("#hintBox").text("").hide()
				}, 700)
			} else {
				if(getCookie("lng") == "CN") {
					$("#hintBox").text("修改失败！").show()
				} else {
					$("#hintBox").text("Failure！").show()
				}
				setTimeout(function() {
					$("#hintBox").text("").hide()
				}, 700)
			}
		},
	})
});
$(document).on("touchstart", "#exit", function() {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: true,
		url: "http://106.14.251.28:8081/userCenter/user/logout",
		data: {
			"loginName": getCookie("loginName"),
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"clientId": "123",
		},
		success: function(b) {
			console.log(b);
			if(b.retCode == 0) {
				removeCookie("refreshToken");
				removeCookie("accessToken2");
				removeCookie("accessToken");
				removeCookie("loginName");
				removeCookie("currentCount");
				removeCookie("code");
				removeCookie("port");
				removeCookie("nav1Count");
				removeCookie("nav2Count");
				sessionStorage.removeItem("currentData");
				sessionStorage.removeItem("currentScrollT");
				sessionStorage.removeItem("currentData2");
				sessionStorage.removeItem("currentScrollT2");
				sessionStorage.removeItem("lengths1");
				sessionStorage.removeItem("lengths2");
				sessionStorage.removeItem("lengths3");
				open("../../CUSTOMER/35login/35.html")
			} else {
				if(getCookie("lng") == "CN") {
					$("#hintBox").html("退出失败").show()
				} else {
					$("#hintBox").html("Exit failure").show()
				}
				setTimeout(function() {
					$("#hintBox").html("").hide()
				}, 700)
			}
		},
	})
});
$(document).on("touchstart", "#email", function() {
	$("#shadow").show();
	$("#text2").val("");
	if(getCookie("lng") == "CN") {
		$("#text2").attr("placeholder", "请在此输入")
	} else {
		$("#text2").attr("placeholder", " Please enter here")
	}
});
$(document).on("touchstart", "#cancel1", function() {
	$("#shadow").hide()
});
$(document).on("focus", "#text2", function() {
	$("#text2").attr("placeholder", "")
});
$("#confirm1").on("touchstart", function() {
	$("#email").html($("#text2").val());
	$("#shadow").hide()
});
$(document).on("touchstart", "#language_box", function() {
	if(getCookie("lng") == "CN") {
		f1 = "取消";
		f2 = "完成"
	} else {
		f1 = "Cancel";
		f2 = "Complete"
	}
	var a = this.dataset["id"];
	var b = new IosSelect(1, [dataLng], {
		oneLevelId: a,
		itemShowCount: 9,
		itemHeight: 0.7,
		headerHeight: 0.88,
		cssUnit: "rem",
		callback: function(c) {
			setCookie("lng", languageName[Number(c.id)], 7);
			lng = getCookie("lng");
			$(this).find("span").text(c.value);
			setLng()
		}
	})
});
$(document).on("touchstart", "#save", function() {
	var a = new Date().getTime();
	$.ajax({
		type: "POST",
		async: false,
		url: "http://106.14.251.28:8081/userCenter/userService/updateUserInfo",
		data: {
			"accessToken": getCookie("accessToken"),
			"msgId": a + "",
			"alias": $("#userName").html(),
			"email": $("#email").html(),
			"mobileNo": $("#mobileNo").html(),
			"accountType": getCookie("accountType"),
		},
		success: function(b) {
			if(b.retCode == 0) {
				if(getCookie("lng") == "CN") {
					$("#hintBox").text("修改成功！").show()
				} else {
					$("#hintBox").text("successful！").show()
				}
				setTimeout(function() {
					$("#hintBox").text("").hide()
				}, 700)
			} else {
				if(getCookie("lng") == "CN") {
					$("#hintBox").text("修改失败！").show()
				} else {
					$("#hintBox").text("Failure！").show()
				}
				setTimeout(function() {
					$("#hintBox").text("").hide()
				}, 700)
			}
		},
	})
});