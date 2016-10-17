(function($) {
	var dialog = createdialog();
	//切换本地和全国主题
	$('.tabs').on('click', '.tab', function() {
		var self = $(this);
		if (self.hasClass('active')) {
			return;
		};
		dialog.confirm(function() {
			var content = $('.main');
			self.addClass('active').siblings().removeClass('active')
			content.find('.show').removeClass('show').siblings().addClass('show')
		}, '如果该页面信息未保存，切换后会导致丢失<br/><br/>确认切换？');
	})

	var bgColor = '#000',
		opcity = 1;
	//选择背景
	var picker = $("#pickColor,.btn-edit-BGC").spectrum({
		showAlpha: true, //显示透明度条
		showPalette: true, //显示更多的面板
		chooseText: "保存", //选择按钮文字
		cancelText: "取消", //取消按钮文字
		palette: [
			["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
			["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
			["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
			["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
			["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
			["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
			["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
			["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
		], //枚举常用颜色
		hide: function(color) {
			console.log(color.toHexString()); //背景色
			bgColor = color.toHexString(); //隐藏得知背景数据
			opcity = color._a;
			//color._a;//透明度
		}
	});

	//日历
	$('.input-picker-date').focus(function() {
		WdatePicker();
	})


	//选择模板(暂不支持模板5)
	var templates = $('.mt-template-list');
	$('.mt-template-list').on('click', '.template', function() {
		var self = $(this);
		var dataId = self.attr('data-id');
		if (dataId === "模板5") {
			dialog.notify("暂不支持模板5");
			return;
		};

		//验证
		function validate() {
			var goodsName = $.trim($('.input-goods-name').val()),
				startDate = $.trim($('.start-date').val()),
				endDate = $.trim($('.end-date').val());
			var err = "";
			var tempArr = [];
			if (!goodsName) {
				tempArr.push("专题名称不能为空");
			};
			if (!!startDate && !!endDate) {
				if (startDate >= endDate) {
					tempArr.push("活动开始时间一定要小于结束时间");
				};
			} else {
				tempArr.push("活动时间不能为空");
			}
			err = tempArr.join('、')
			if (err) {
				dialog.notify(err);
				return;
			};
			location.href = "edit-tempatel-mobile1.html";
		}

		if (self.hasClass('selected')) {
			//判断文本内容 跳转
			return validate();
		};
		templates.find('.selected').removeClass('selected');
		self.addClass('selected');
		validate();
	})

	//上传焦点图
	$('.btn-edit-focus').click(function() {
		var pic = $(this).parent().next()
		dialog.focus(pic);
	})

	//移动添加分组模板
	var rand = Math.random(); //防止单选按钮name重复

	/**
	 * @param  {bool}真表示要带删除按钮的
	 * @return {string}
	 * 此方法有添加分组和区域共用，分区的第一个不带删除按钮
	 */
	function getMobileGroupHTML(b) {
		var mobileGroupHTML = '<div class="goods-item-box style2">' + '<div class="change-style clearfix">' + '<strong>样式选择</strong>' + '<label><input type="radio" name="goodsstyle' + rand + '" checked="checked">每行2个</label>' + '<label><input type="radio" name="goodsstyle' + rand + '">每行1个</label>' + (function() {
			return b ? '<input class="btn-btn-mobile btn-mobile-group-delete" type="button" value="删除该组">' : ''
		})() + '</div><div class="goods-group clearfix">' + '<div class="goods-item empty"><div class="goods-data"></div>' + '<div class="goods-layer"></div>' + '<div class="goods-btns">' + '<input class="btn-edit-single btn-edit-top btn-mobile-goods-edit" type="button" value="编辑">' + '<input class="btn-edit-single btn-edit-bottom btn-mobile-goods-delete" type="button" value="删除">' + '<input class="btn-edit-single btn-mobile-goods-add" type="button" value="添加商品"></div></div>' + '<div class="goods-item empty"><div class="goods-data"></div>' + '<div class="goods-layer"></div>' + '<div class="goods-btns">' + '<input class="btn-edit-single btn-edit-top btn-mobile-goods-edit" type="button" value="编辑">' + '<input class="btn-edit-single btn-edit-bottom btn-mobile-goods-delete" type="button" value="删除">' + '<input class="btn-edit-single btn-mobile-goods-add" type="button" value="添加商品"></div></div>' + '</div></div>'
		return mobileGroupHTML;
	}
	//编辑整组商品
	$('.goods-contents').on('click', '.btn-edit-group', function() {
		var self = $(this);
		var group = self.parent().nextAll('.goods-group');
		dialog.multiGoods(group);
		//编辑单个商品
	}).on('click', '.btn-edit-single', function() {
		var self = $(this);
		var text = self.val();
		var item = self.parents('.goods-item:first');
		switch (text) {
			case '设置商品':
			case '添加商品':
				dialog.singleGoods(item);
				break;
			case '设置图片':
				dialog.singlePic(item);
				break;
			case '编辑': //走上面两个的其中一个
				if (item.find('.goods-pic:first').length) {
					dialog.singleGoods(item);
				} else {
					dialog.singlePic(item);
				}
				break;
			case '删除':
				dialog.confirm(function() {
					item.addClass('empty')
						.find('.goods-data').empty();
					//非移动端要改动文字
					if (!self.hasClass('btn-mobile-goods-delete')) {
						self.val('设置图片').prev().val('设置商品');
					}
				}, "你确定要删除吗？")
				break;
		}
		//编辑通栏标题
	}).on('click', '.btn-edit-caption', function() {
		var pic = $(this).parent().next()
		dialog.caption(pic);
		//删除商品区域，仅限于新增加 //pc
	}).on('click', '.btn-delete-goods-box', function() {
		var area = $(this).parents('.goods-box:first');
		dialog.confirm(function() {
			area.remove();
		}, '你确定要删除该商品区域吗？');
	}).on('click', '.btn-add-goods-group', function() {
		//添加一组
		$(this).prev().append(getMobileGroupHTML(true));
	}).on('click', '.btn-add-goods-box', function() {
		//添加一个商品区域
		var goodBoxHTML = '<div class="goods-box">' + '<input class="btn-btn-mobile btn-mobile-box-delete" type="button" value="删除该区域"/>' + '<div class="goods-caption empty">' + '<div class="caption-data"></div>' + '<input class="btn-mobile btn-edit-caption" type="button" value="添加通栏副标题（大图）"></div>' + '<div class="goods-items">' + getMobileGroupHTML() + '</div>' + '<a class="btn-add-goods-group" href="javascript:void(0);">点击添加商品上限</a></div>'
		$(this).before(goodBoxHTML);
		//删除一组
	}).on('click', '.btn-mobile-group-delete', function() {
		var group = $(this).parents('.goods-item-box:first');
		var b = false;
		group.find('.goods-item').each(function(index, el) {
			if (!$(el).hasClass('empty')) {
				b = true;
			}
		});
		if (b) {
			dialog.confirm(function() {
				group.remove();
			}, '是否要删除该组（已编辑的内容将全部被删除）');
		}else{
			group.remove();
		}

	}).on('click', '.btn-mobile-box-delete', function() {
		var area = $(this).parents('.goods-box:first');
		var b = false;
		area.find('.goods-caption,.goods-item').each(function(index, el) {
			if (!$(el).hasClass('empty')) {
				b = true;
			}
		});
		if (b) {
			dialog.confirm(function() {
				area.remove();
			}, '是否要删除该区域（已编辑的内容将全部被删除）');
		}else{
			area.remove();
		}
		//切换样式
	}).on('click', 'input[type="radio"]', function(evt) {
		//判断是否切换了
		var radio = $(this);
		var index = radio.parent().index();
		var itemBox = radio.parents('.goods-item-box:first');
		if (index === 2 && itemBox.hasClass('style1') || index === 1 && itemBox.hasClass('style2')) {
			return;
		};
		evt = evt || window.event;
		evt.preventDefault();
		//切换
		dialog.confirm(function() {
			//如果2列转1列
			radio[0].checked = 'checked';
			if (itemBox.hasClass('style2')) {
				var item = itemBox.removeClass('style2')
					.addClass('style1')
					.find('.goods-item:first')
				if (!item.hasClass('empty')) {
					item.addClass('empty')
						.find('.goods-data')
						.empty()
				}
				item.next().remove();
			} else {
				var item = itemBox.removeClass('style1')
					.addClass('style2')
					.find('.goods-item:first')
				if (!item.hasClass('empty')) {
					item.addClass('empty')
						.find('.goods-data')
						.empty()
				}
				item.after(item.clone());
			}
		}, '你确定要切换主题吗？切换会导致数据清空');
	});
	$('.btn-add-tickets').on('click', function(event) {
		event.preventDefault();
		//添加优惠券，最多4个
		var tickets = $('.tickets');
		if (tickets.find('.ticket-item').length === 4) {
			return dialog.notify('该区域优惠券最多可容纳4个', '添加优惠券');
		}
		//
		var ticketHTML = '<div class="ticket-item empty">' + '<div class="ticket-layer"></div>' + '<div class="ticket-edit-box">' + '<input class="btn-mobile ticket-delete" type="button" value="删除">' + '<input class="btn-mobile ticket-edit" type="button" value="编辑">' + '</div>' + '<input class="btn-mobile ticket-add" type="button" value="添加优惠券"></div>'
		tickets.append(ticketHTML + ticketHTML);
	});

	//添加一个商品区域 新添加的都可删除
	$('.btn-add-goods-container').click(function() {
		var goodTemplate = '<div class="goods-item empty">' + '<div class="goods-data"></div>' + '<div class="goods-layer"></div>' + '<div class="goods-btns">' + '<input class="btn-edit-single  btn-edit-top" type="button" value="设置商品">' + '<input class="btn-edit-single btn-edit-bottom" type="button" value="设置图片">' + '</div></div>'
		var template = '<div class="goods-box">' + '<div class="goods-caption">' + '<div class="toolbar">' + '<input type="button" value="删除" class="primary-btn btn-delete-goods-box">' + '<input type="button" value="编辑" class="primary-btn btn-edit-caption">' + '<div class="tool-layer">' + '<div class="tool-layer-font">通栏副标题（大图）</div>' + '<div class="tool-layer-bg"></div></div></div>' + '<img src="../resource/images/caption-empty.jpg" data-src="../resource/images/caption-empty.jpg"></div>' + '<div class="goods-items">' + '<div class="toolbar">' + '<input type="button" value="编辑" class="primary-btn btn-edit-group">' + '<div class="tool-layer-font">商品内容区域</div>' + '<div class="tool-layer-bg"></div></div>' + '<div class="goods-group clearfix">' + goodTemplate + goodTemplate + goodTemplate + goodTemplate + '</div>';
		$(this).before(template);
	})

	//编辑优惠券
	//编辑优惠券区域
	$('.ticket-items,.ticket-box').on('click', '.btn-edit-tickets', function() {
		dialog.ticketStyle($(this).parents('.ticket-items:first'));
		//添加优惠券
	}).on('click', '.ticket-add', function() {
		dialog.ticket($(this).parent());
		//编辑优惠券
	}).on('click', '.ticket-edit', function() {
		dialog.ticket($(this).parents('.ticket-item:first'));
		//删除优惠券
	}).on('click', '.ticket-delete', function() {
		dialog.confirm(function() {
			//TODO
		}, '你确定要删除该优惠券吗?');
	})

	//专题列表
	$('.seminar-nav').click(function() {
			var self = $(this);
			if (self.hasClass('selected')) {
				return;
			};
			self.addClass('selected').siblings().removeClass('selected');
		})
		//列表按钮
	$('.seminar-list-content').on('click', '.seminar-btn-edit', function() {
			//前去编辑
		}).on('click', '.seminar-btn-publish', function() {
			//发布
			dialog.publish();
		}).on('click', '.seminar-btn-code', function() {
			//查看二维码
		}).on('click', '.seminar-btn-delete', function() {
			//删除
			var tr = $(this).parents('tr:first');
			dialog.confirm(function() {
				tr.remove();
			}, '你确定要删除该专题吗？');
		})
		//复制到粘贴板
		//TODO为何不行
	$('.seminar-btn-copy').each(function(index, el) {
		$(el).zclip({
			path: "../resource/public/jquery.zclip/ZeroClipboard.swf",
			copy: function() {
				return $(el).text();
			},
			afterCopy: function() {
				dialog.notify("复制成功！");
			}
		});
	});
	//滚动条
	$(".mCustomScrollbar").mCustomScrollbar({
		axis: "y",
		theme: 'minimal-dark'
	});

	//slider

	function initSlider() {
		var slider = $('.slider'),
			layer = slider.find('.slider-panel');

		var _sWidth = $('.slider').width(); //可是区域宽度
		var _lwdith = layer.width(); //容器总宽度
		var _sliderPosX = 0; //鼠标初始位置
		var maxLeft = 0;
		var minLeft = _sWidth - _lwdith;
		layer.on('mousedown', function(evt) {
			_sliderPosX = evt.pageX;
		})
		layer.on('mousemove', function(evt) {
			//取消文字选中
			this.setCapture && this.setCapture();
			return false;
		})
		layer.on('mouseup', function(evt) {
			//_sliderPosY = evt.pageX - ;
			var _dis = evt.pageX - _sliderPosX;
			var _left = layer.css('margin-left').match(/(-)?\d+/g);
			var newLeft = Number(_left) + _dis * 2; //移动距离多两倍
			if (newLeft > maxLeft) {
				newLeft = maxLeft;
			} else if (newLeft < minLeft) {
				newLeft = minLeft;
			}
			layer.animate({
				'margin-left': newLeft + 'px'
			}, 'easing');
			_sliderPosX = 0;
		})
	}
	initSlider();

	/*倒计时*/
	function getTimerString(times) {
		var min = 60; //60s
		var hour = min * 60;
		var day = hour * 24;
		if (times <= 0) {
			return '<i>0</i>秒';
		};
		var days = Math.floor(times / day);
		var hours = Math.floor((times % day) / hour);
		var mins = Math.floor((times % hour) / min);
		var seconds = Math.floor(times % min);
		var str = '';
		if (days) {
			str += '<i>' + days + '</i>天';
		};
		if (str || hours) {
			str += '<i>' + hours + '</i>时';
		};
		if (str || mins) {
			str += '<i>' + mins + '</i>分';
		};

		str += '<i>' + seconds + '</i>秒';
		return str;
	}
	$('.goods-items .timer').each(function() {
		var self = $(this);
		var startDate = "2016/12/20"; //设置
		var times = Math.floor((new Date(startDate) - new Date()) / 1000);
		setInterval(function() {
			var str = getTimerString(times--);
			self.html('还剩' + str);
		}, 1000)

	})

	//上传分享图片
	$('.btn-share a').click(function(event) {
		/* Act on the event */
		$(this).prev().trigger('click');
	});
	//删除移动分组商品
	/*$(".goods-box").on('click','.btn-mobile-group-delete',function(){
		var group = $(this).parents('.goods-item-box:first');
		dialog.confirm(function(){
			group.remove();
		},'你确定要删除该组商品吗？');
	})*/
})(jQuery)