!function(a,b){function c(){var a;a=b.maxWidth?Math.min(e.getBoundingClientRect().width,b.maxWidth*g):e.getBoundingClientRect().width,j=100*a/b.desinWidth,e.style.fontSize=j+"px",d.body&&(d.body.style.fontSize=b.baseFont/100+"rem"),b.setRemCallback&&b.setRemCallback(),b.newBase=j}var d=a.document,e=d.documentElement,f=a.devicePixelRatio,g=1,h=1;!function(){var b=/iphone/gi.test(a.navigator.appVersion);g=f,/coolpad\u0020*8720L|scl-tl00|vivo\u0020x3t/i.test(window.navigator.userAgent)&&(g=1),a.devicePixelRatioValue=g,h=1/g;var c=d.querySelector('meta[name="viewport"]');if(c)b?c.setAttribute("content","initial-scale="+h+", user-scalable=no"):c.setAttribute("content","initial-scale="+h+", maximum-scale="+h+", minimum-scale="+h+", user-scalable=no,target-densitydpi=device-dpi");else{var i=d.createElement("meta");if(i.setAttribute("name","viewport"),b?i.setAttribute("content","initial-scale="+h+", user-scalable=no"):i.setAttribute("content","initial-scale="+h+", maximum-scale="+h+", minimum-scale="+h+", user-scalable=no,target-densitydpi=device-dpi"),e.firstElementChild)e.firstElementChild.appendChild(i);else{var j=d.createElement("div");j.appendChild(i),d.write(j.innerHTML)}}}();var i,j=100;b.desinWidth=640,b.baseFont=24,b.reflow=function(){e.clientWidth},b.init=function(){a.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(c,300)},!1),a.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(i),i=setTimeout(c,300))},!1),"complete"===d.readyState?d.body.style.fontSize=b.baseFont/100+"rem":d.addEventListener("DOMContentLoaded",function(a){d.body.style.fontSize=b.baseFont/100+"rem"},!1),c(),e.setAttribute("data-dpr",g)},b.remToPx=function(a){return a*j}}(window,window.adaptive||(window.adaptive={}));