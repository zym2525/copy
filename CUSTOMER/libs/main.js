$(function() {
	var b = document.documentElement;
	b.style.fontSize = b.clientWidth / 750 * 100 + "px";
	var a = $("document").height();
	if(/Android/gi.test(navigator.userAgent)) {
		window.addEventListener("resize", function() {
			if(document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
				window.setTimeout(function() {
					document.activeElement.scrollIntoViewIfNeeded(true);
					document.activeElement.scrollIntoView(true)
				}, 300)
			}
		})
	}
	setTimeout(function() {
		document.getElementsByTagName("body")[0].style.visibility = "visible"
	}, 1)
});

function open(a) {
	location = a
}

function telPhone(a) {
	var c = document.createElement("a");
	c.setAttribute("href", "tada:tel/" + a);
	var b = document.getElementsByTagName("body")[0];
	b.appendChild(c);
	c.click();
	b.removeChild(c)
}

function isClick(c, b) {
	var a = false;
	c.on("touchstart", function(d) {
		a = true
	});
	c.on("touchmove", function(d) {
		a = false
	});
	c.on("touchend", function(d) {
		if(a) {
			b && b(c)
		}
	})
};