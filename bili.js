// JavaScript Document
(function(){
function post(data) { // 请求dianbo后台解析api
	var ext = {};
	ext['url'] = requestUrl;
	if (debugMode) ext['debug'] = 'yes';

	$bofqi.html('载入中...');

	$.ajax({
		url: 'http://b.dianbo.me/fetch.php',
		data: $.extend(ext, data),
		context: this,
		success: function(txt) {
			$bofqi.html(txt);
		},
		error: efunc
	});
}

function efunc(e, t, m) {
	if (t) { // ajax Error
		$bofqi.append("HTTP 错误: " + e.status.toString() + m);
	} else {
		alert("程序错误。代码可能更新了，请尝试更新浏览器缓存。\n如果不行，默念“妖梦这逗比”。（错误日志见控制台");
		log(e);
	}
}


var container = $('<div id="GT_C" class="viewbox" style="background: none;">').insertAfter($bofqi);
var btngrp = $('<div class="alist"/>').appendTo(container);
var tmpl = $('<a href="javascript:void(0);">');

/*var btn1 = */
tmpl.clone().appendTo(btngrp).html('默认播放器').data({
	'cache': $bofqi.html()
});
var btn2 = tmpl.clone().appendTo(btngrp).html('bilibili播放器').attr('title', '如果不行请点击尝试后两个按钮').data({
	'type': 'normal'
});
/*var btn3 = */
tmpl.clone().appendTo(btngrp).html('S模式').attr('title', '暂时无法使用，因为无法调整播放器大小').data({
	'type': 'frame'
});
/*var btn4 = */
tmpl.clone().appendTo(btngrp).html('终极方法').attr({
	'title': '弹出新窗口播放'
}).data({
	'type': 'popwin'
});

var allBtn = btngrp.find('a').click(function() {
	var that = $(this);
	if (that.hasClass('curPage')) return;

	allBtn.removeClass('curPage');
	that.addClass('curPage');

	if (that.data('cache')) {
		$bofqi.html(that.data('cache'));
	} else if (that.data('type')) {
		post.call(that, that.data());
	} else {
		alert('程序错误。');
	}
});

btn2.click();

var toolbox = $('<div>').css('float', 'right').insertAfter(btngrp);

var debugBtn = $('<input type="checkbox"/>').prependTo($('<label>调试模式</label>').appendTo(toolbox)).click(function() {
	debugMode = !! $(this).attr('checked');
	log(debugMode ? '调试模式开启' : '调试模式关闭');
}).removeAttr('checked');

var btnA = $('<button title="解锁视频高度">A</button>').appendTo(toolbox).click(function() {
	$bofqi.find('object,embed,iframe').css({
		width: 'auto'
	});
});
var btnB = $('<button title="强制视频大小">B</button>').appendTo(toolbox).click(function() {
	$bofqi.find('object,embed,iframe').css({
		height: '720px',
		width: '1150px'
	});
});
var btnS = $('<button title="强制爱奇艺播放器网页全屏，点击浏览器后退按钮即可恢复。IE<7的用户改变窗口大小即可恢复。">start</button>').appendTo(toolbox).click(function() {
	if (!window.flashContent) return alert('只能用于iQY播放器');
	if (location.hash.search('fs') == -1) {
		location.hash += 'fs';
	}
	if (!btnS.inited) {
		btnS.inited = true;
		if ('onhashchange' in window) {
			$(window).on('hashchange', function(e) {
				if (location.hash.search('f=1') == -1 && $('.viewbox').css('display') == 'none') {
					player_fullwin(false);
					btnB.click();
				}
			});
		} else {
			$(window).on('resize', function(e) {
				if (location.hash.search('f=1') == -1 && $('.viewbox').css('display') == 'none') {
					player_fullwin(false);
					btnB.click();
				}
			});
		}
	}
	player_fullwin(true);
	$(window.flashContent).attr({
		height: '100%',
		width: '100%'
	}).css({
		height: '',
		width: ''
	});
});

var btnAbout = $('<a>使用说明</a>');

// 初始化异步分页
var sp = $('#alist').find('span');
if (!sp.length) return; // 单分P

// 当前P按钮替换
var last = $('<a>').attr('href', location.pathname).html(sp.html()).addClass('curPage');
sp.replaceWith(last);
sp = null;

$('#alist').on('click', 'a', function(e) {
	//if(console) console.log(e);
	// TODO 修复中键点击

	var that = $(this);
	if (that.attr('href') == '#') return true; // 展开按钮

	if (that.hasClass('curPage')) return false; // 当前P

	last.removeClass('curPage');
	last = that;
	last.addClass('curPage');

	ajaxPage(location.origin + $(this).attr('href'));
	return false;
});


function ajaxPage(url) {
	requestUrl = url;
	$('#GT_C a.curPage').removeClass('curPage').click();
}

})();
