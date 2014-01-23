// JavaScript Document
var $bofqi;
var requestUrl = location.href;
var debugMode = false;

if (!location.origin) {
	location.origin = location.href.replace(location.pathname, '');
}

var log;
if (console && console.log) {
	log = function() {
		console.log.apply(console, arguments);
	};
} else {
	log = function(text) {};
}

log('载入主脚本');
$(function() {
	try {
		if (window.__prevent_muti_load && !window.__debug) return;
		window.__prevent_muti_load = true;

		$bofqi = $('#bofqi');

		if( location.href.search('www.bilibili.tv/video/av') > 0 ){
			$('head').append($('<script>').attr('src', 'http://www.jiaodong.net/finance/SpEffect/bili.js'));
			log('载入bilibili脚本');
		}else if( location.href.search('letv.com/zt/') > 0 ){
			$('head').append($('<script>').attr('src', 'http://b.dianbo.me/letv.js'));
			log('载入乐视脚本');
		}else{
			alert('当前页面无法使用');
		}

		return;
	} catch (e) {
		efunc(e);
	}


});
