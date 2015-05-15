requirejs.config({paths:{jquery:"../bower/jquery/dist/jquery.min",underscore:"../bower/underscore/underscore-min"},shim:{underscore:{exports:"_"}}}),require(["jquery","underscore","vendor/hex-rgb","vendor/jquery.format"],function(e,a){"use strict";function t(e,t){var n="";return e&&void 0!==e&&a.each(e,function(e,a){t?n=n+(a+": "+e+"; ")+"<br >":n+=a+": "+e+"; "}),n}function n(t,n){if(!a.has(i[n],t.group)){null===i[n]&&(i[n]=new Object);var r=e("<div>");r.attr("class",t.group).addClass("chapter-content").prepend("<h2>"+t.group+'</h2><div class="chapter-subContent"></div>'),i[n][t.group]=r,u.find("#"+n).append(r)}}function r(e){return e.replace(/_/," ")}function s(e,a,t,r){t&&t.length?(n(a,r),i[r][t].find(".chapter-subContent").append(e)):u.find("#"+r).append(e)}function o(e,a){return a&&a.length?a.match(/^(#.*)/g)?e+": "+a+";":e+": "+h[a]+";":void 0}function c(e){var t,n={},r=a.keys(e);switch(-1!=a.indexOf(r,"rgb")&&-1!=a.indexOf(r,"hex")?t=1:-1==a.indexOf(r,"rgb")&&-1!=a.indexOf(r,"hex")?t=2:-1!=a.indexOf(r,"rgb")&&-1==a.indexOf(r,"hex")&&(t=3),t){case 1:n={hex:e.hex,rgb:e.rgb};break;case 2:var s=toRGB(e.hex.slice(1));n={hex:e.hex,rgb:{r:s[0],g:s[1],b:s[2]}};break;case 3:var o="#"+toHex(e.rgb.r,e.rgb.g,e.rgb.b);n={hex:o,rgb:e.rgb};break;default:throw new Error("Color Palette: require Hex or RGB")}return n}function l(n){a.mapObject(n,function(l,g){var f=e("<div>");switch(f.attr("id",g).addClass("chapter").prepend("<h1>"+r(g)+"</h1>"),u.append(f),i[g]=null,g){case"Grid":var f=e("<ul>");a.each(l,function(e,a){f.append("<li>"+a+": "+e+"</li>")}),d.attr("style",t(l)),u.find("#Grid").append(f).hover(function(){d.toggleClass("show-grid")});break;case"Color_Palette":a.each(l,function(t,n){var o=e('<div class="ColorPalette">'),l=e('<div class="ColorPalette-color">'),i=e('<span class="ColorPalette-colorName">').html(r(n)),d=e('<span class="ColorPalette-colorHex">'),p=e('<span class="ColorPalette-colorRGB">'),u=t.group;l.attr("style","background-color: "+c(t).hex),d.html(c(t).hex);var f="";a.mapObject(c(t).rgb,function(e,a){f=f+"<span>"+a.toUpperCase()+": "+e+"</span>"}),p.html(f),h[n]=c(t).hex,o.append(l,i,d,p),s(o,t,u,g)});break;case"Typography":p.attr("style",t(n.Typography.base)),a.each(l.output,function(a,n){var c=e("<dl>"),l=a.group,i=a.color,d=e("<dt>").html(r(n)).attr("style",t(a.style)+o("color",i)),p=e("<dd>").html(t(a.style)),u=e("<dd>").html("Color: "+i);c.append(d,u,p),s(c,a,l,g)});break;case"Buttons":var b=t(n.Buttons.base);a.each(l.output,function(a,n){var r=e('<div class="buttons">'),c=e("<span>").html("Color: "+a.color),l=e("<span>").html("BgColor: "+a.bgcolor),i=e("<span>"),d=a.group,p=a.color,u=a.style,h=a.bgcolor,f=o("color",p)+o("background-color",h),m=e('<span class="buttons-btns">').html(n).attr("style",b+t(u)+f);u&&i.html("Style <br >"+t(u,1)),r.append(m,c,l,i),s(r,a,d,g)});break;case"Space":var m=n.Space.base;a.each(l.output,function(a,t){var n=e('<div class="space">'),r=e('<div class="space-range">').append('<span class="space-marking">'),o=e('<span class="space-name">').html(t),c=e('<span class="space-px">'),l=a.group;a.odds.match(/px/g)?(r.css("width",a.odds),c.html(a.odds)):(r.css("width",m*a.odds-2+"px"),c.html("x"+a.odds+" ("+m*a.odds+"px)")),n.append(r,c,o),s(n,a,l,g)});break;case"Icon":e("head").append(e('<link rel="stylesheet" type="text/css" />').attr("href",n.Icon.cssUrl)),a.each(l.output,function(a,t){var n=e('<div class="icons">'),r=e("<i>").addClass(a.className),o=e('<span class="icons-name">').html(t),c=e('<span class="icons-class">').html("."+a.className),l=e('<span class="icons-content">'),i=a.group;a.content&&l.html("content: \\"+a.content),n.append(r,o,c,l),s(n,a,i,g)});break;default:a.each(l,function(a,t){var n=e('<div class="'+g+'">'),r=e("<img>").attr("src",a.imgSrc),o=a.group;n.append(r),s(n,a,o,g)})}}),d.append(u)}var i={},d=e("#wrapper"),p=e("body"),u=e(document.createDocumentFragment()),h={};e.get("/data").done(function(e){l(e)});var g=e("#io"),f=g.find(".io-toggleBtn"),b=f.find(".nav-icon"),m=g.find(".io-example"),v=g.find(".io-submit"),x=g.find("textarea");f.click(function(){b.toggleClass("is-open"),g.toggleClass("is-show")}),m.click(function(){e.get("js/example.json").done(function(e){x.text(JSON.stringify(e)).format({method:"json"})})}),v.click(function(){var a=null;try{a=JSON.parse(x.val())}catch(t){t instanceof SyntaxError&&e(".io-status").html("Oops, parse failed!").addClass("is-show").delay(4500).queue(function(){e(this).removeClass("is-show"),e(this).dequeue()})}finally{null!=a&&(d.empty(),l(a),x.format({method:"json"}),f.trigger("click"))}})});