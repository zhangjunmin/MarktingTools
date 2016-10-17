/*
***网络营销弹层
*/

(function ($) {
	var win = window
	   	,doc = $(document)
	   	,$doc = $(doc)
	   	,body = document.body
	   	,dialog;
	    //创建一个dialog对象

	    //定义所有传入的模板

	    function getTemplate(type){

	    	//焦点图模板
	    	var focus_template = '<h4>焦点图</h4>'
					+'<div class="focus-container">'
					+'<img class="focus-pic" src="../resource/images/upload-focus-empty.jpg" data-src="../resource/images/upload-focus-empty.jpg"/>'
					+'<input type="file" class="btn-upload false" id="uploader" name="uploader" accept="image/*"></div>'
					+'<div class="focus-summary">* 要求图片尺寸：宽1920高500  图片大小：不超过600K'
					+'<input class="btn-pic btn-view delete-focus false" type="button" value="删除"></div>';

			//商品区域模板
			var multi_goods_template = '<div  class="multi-goods-box"><table>'
    		        +'<thead><tr><th class="col1">序列</th><th class="col2">商品内容</th><th></th></tr></thead>'
    		        +'<tbody><tr><td class="col1"></td><td class="col2">'
			     	+'<a class="btn-add-group" href="javascript:void(0);">添加一行</a>'
			     	+'<div class="add-summary">（商品内容最多15行）</div>'
			     	+'</td><td></td></tr></tbody></table></div>';
			//单个图片模板
			var single_pic_template = '<h4>图片编辑</h4>'
					+'<div class="single-pic-box clearfix">'
					+'<img class="single-pic" src="../resource/images/upload-single-pic-empty.jpg" data-src="../resource/images/upload-single-pic-empty.jpg"/>'
					+'<input class="upload-single-pic" type="file" accept="image/*" value="删除">'
					+'<div class="single-pic-summary">'
					+'<input class="btn-pic  delete-single-pic false" type="button" value="删除">'
					+'<div>图片尺寸：宽260   高355<br>图片大小：不超过300K<div/></div></div>';
			//单个商品模板
			var single_goods_template = '<h4>商品内容</h4>'
					+'<div class="goods-container">'
					+'<div class="input-gourp-1">'
					+'<div class="form-horizontal">'
					+'<div class="label"><span class="required">*</span>商品ID：</div>'
					+'<div class="input"><input class="small-xx" type="text">'
					+'<a class="search-goods" href="javascript:void(0);">查询</a></div></div>'
					+'<div class="form-horizontal">'
					+'<div class="label"><span class="required">*</span>商品图片：</div>'
					+'<div class="input">'
					+'<div class="goods-pic-container clearfix">'
					+'<div class="goods-pic empty"></div>'
					+'<div class="goods-pic-summary">'
					+'<input type="file" class="file-change-goods-pic">'
					+'<input class="btn-pic change-goods-pic" type="button" value="更换图片">'
					+'<div>图片小于600K；尺寸400 X 400;<br>图片格式：JPG  GIF  PNG</div>'
					+'</div></div></div></div>'
					+'<div class="form-horizontal">'
					+'<div class="label"><span class="required">*</span>商品标题：</div>'
					+'<div class="input"><input type="text" class="input-goods-title" maxlength="60"><span>0/60</span></div></div>'
					+'<div class="form-horizontal">'
					+'<div class="label"><span class="required">*</span>商品副标题：</div>'
					+'<div class="input"><input type="text" class="input-goods-summary" maxlength="20"><span>0/20</span></div></div>'
					+'<div class="form-horizontal">'
					+'<div class="label"><span class="required">*</span>商品价格：</div>'
					+'<div class="input"><input class="small-x" type="text">元</div>'
					+'<div class="label large-label"><span class="required">*</span>商品优惠价格：</div>'
					+'<div class="input"><input class="small-x" type="text">元</div></div>'
					+'<div class="form-horizontal">'
					+'<div class="label">商品标签：</div>'
					+'<div class="input"><select>'
					+'<option>请选择</option>'
					+'<option>直降</option>'
					+'<option>特惠</option>'
					+'<option>精选</option>'
					+'<option>新品</option>'
					+'</select></div></div>'
					+'<div class="form-horizontal">'
					+'<div class="label">商品关键字：</div>'
					+'<div class="input"><input type="text"></div></div></div>'
					+'<div class="input-gourp-2">'
					+'<div class="form-horizontal">'
					+'<div class="label">商品促销形式：</div>'
					+'<div class="input"><select class="goods-promotional-methods">'
					+'<option>请选择</option>'
					+'<option>团购/限时抢购/倒计时</option>'
					/*+'<option>优惠券</option>'*/
					+'</select></div></div>'
					+'<div class="form-horizontal">'
					+'<div class="label">商品扩展信息：</div>'
					+'<div class="input"><select  class="goods-extend-info">'
					+'<option>请选择</option>'
					+'<option>商品人气</option>'
					+'<option>商品实时库存</option>'
					+'<option>商品历史销量</option>'
					+'<option>商品副标题</option>'
					+'</select></div></div>'
					+'<div class="view-box goods-item empty"></div>'
					+'<input class="btn-pic btn-view" type="button" value="预览样式">'
					+'</div></div>'
			var ticket_style_template = '<div class="ticket-style-container">'
									+'<div class="style-1">'
									+'<label><input type="radio" name="ticket-style" checked/>展示每行4个优惠券(至少添加一个)</label>'
									+'<div class="style-items clearfix">'
									+'<div class="style-item"></div>'
									+'<div class="style-item"></div>'
									+'<div class="style-item"></div>'
									+'<div class="style-item"></div>'
									+'</div></div>'
									+'<div class="style-2"><label><input type="radio" name="ticket-style"/>隐藏优惠券</label>'
									+'</div></div>'
			var ticket_template = '<h4>请选择一个优惠券</h4><div class="ticket-container">'
								+'<table><thead><tr>'
								+'<th class="col1"></th><th>店铺名称</th><th>优惠券名称</th><th>活动时间</th><th>活动状态</th>'
								+'</tr></thead><tbody>'
								+'</tbody></table><div class="ticket-btns clearfix">'
								+'<a class="ticket-prev" href="javascript:void(0);"><</a>'
								+'<a class="ticket-next" href="javascript:void(0);">></a>'
								+'<a class="ticket-save" href="javascript:void(0);">确认添加</a>'
								+'<a class="ticket-cancel" href="javascript:void(0);">取消</a>'	
			                    +'</div></div>';
			var publish_template = '<div class="publish-container"><table>'
								+'<tr><td class="col1">专题地址：</td>'
								+'<td class="col2"><input type="text"></td><tr>'
								+'<tr><td class="col1"></td>'
								+'<td class="col2"><label><input type="checkbox">关联相关移动端专题（PC专题在移动端打开时的专题样式）</label></td><tr>'
								+'<tr><td class="col1">移动专题地址：</td>'
								+'<td class="col2"><input type="text" placehoulder="请输入移动专题网地址"></td><tr>'
			+'</table></div>'
			var hash ={
				focus : focus_template,
				multi_goods:multi_goods_template,
				single_goods:single_goods_template,
				single_pic:single_pic_template,
				ticket_style:ticket_style_template,
				ticket:ticket_template,
				publish:publish_template
			}
			return hash[type];
	    }

	    var create = function(){
    		if (dialog) {
    			return dialog;
    		};
    		var view = createView();
	    	dialog = {
	    		view : view,
	    		notify: notify,//告知
	    		confirm:confirm,//警告
	    		focus : focus,//焦点图
	    		caption : caption,//通栏副标题
	    		multiGoods:multiGoods,//多个商品
	    		singleGoods:singleGoods,//单个商品
	    		singlePic:singlePic,//单个商品
	    		ticketStyle:ticketStyle,
	    		ticket :ticket,
	    		publish:publish,
	    		dispose: dispose
	    	}
	    	return dialog;
    	}

    	//render input
    	function renderInput(text1,text2){
    		var length = arguments.length;
    		var footer = dialog.view.find('.dialog-footer');
    		if (length===1) {
    			var btn = document.createElement('input');
    			btn.className = "btn-cancle";
    			btn.type = "button";
    			btn.value = text1;
    			footer.append(btn);
    		}else if(length===2){
    			var btn = document.createElement('input');
    			btn.className = "btn-cancle";
    			btn.type = "button";
    			btn.value = text1;
    			footer.append(btn);
    			var btn2 = document.createElement('input');
    			btn2.className = "btn-ok";
    			btn2.type = "button";
    			btn2.value = text2;
    			footer.append(btn2);
    		}
    	}
    	function reset(){
    		dialog.view.hide()
    			.find('.dialog-main')
    			.off()
    			.removeAttr('style')
    			.find(".dialog-text")
			    .text("提示")
			    .end()
			    .find(".dialog-content")
			    .text("内容已经被更新")
			    .end()
    		    .find(".dialog-footer")
    		    .removeAttr('style')
    		    .empty();
    	}

    	//通知
		function notify(text,title,width){
			var view = dialog.view;
			var box = view.find(".dialog-main");			
			box.find(".header-text")
			   .text(title || "提示")
			   .end()
			   .find(".dialog-content")
			   .html("<div class='notify-content'>"+text+"</div>" || "<div  class='notify-content'>内容已经被更新</div>")
			renderInput('确定');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:width||"420px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//注册事件
			box.on('click','.btn-cancle',reset);
		}

    	//确定
    	function confirm(cb,text,title,width){
			var view = dialog.view;
			var box = view.find(".dialog-main");
			console.log(text);		
			box.find(".header-text")
			   .text(title || "提示")
			   .end()
			   .find(".dialog-content")
			   .html("<div class='notify-content'>"+text+"</div>" || "<div  class='notify-content'>内容已经被更新</div>")
			renderInput('取消','确定');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:width||"420px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//注册事件
			box.on('click','.btn-cancle',function(){
				reset();
			}).on('click','.btn-ok',function(){
				reset();
				cb();
			});
    	}

		//上传大图通用
		function uploadBigImage(pic,title){
			var view  = dialog.view;
			var box = view.find(".dialog-main");
			box.find(".header-text")
			   .text(title||"焦点图编辑")
			var template = getTemplate('focus');
			box.find(".dialog-content").html(template);
			//判断是否上传图片
			//TODO：ie7下图片路径发生变化
			if (pic.attr('src')!==pic.attr('data-src')) {
				box.find(".dialog-content").find('input').removeClass('false');
				box.find(".focus-pic").attr('src',pic.attr('src'));
			};			
			var upload = box.find('#uploader');
			upload.on('change',function(){
				$.ajaxFileUpload({ 
					url : '/upload', //用于文件上传的服务器端请求地址 
					secureuri : false, //是否需要安全协议，一般设置为false 
					fileElementId : 'uploader', //文件上传域的ID 
					dataType:'json',//返回值类型 一般设置为json 
					success : function(){  
						alert('上传成功'); 
					}, 
					error : function(data){ 
						alert('error'); 
					} 
				}) 
			})
			renderInput('取消','保存');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:"496px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//注册事件
			box.find('.delete-focus').click(function(){
				box.find('.focus-pic').attr('src',box.find('.focus-pic').attr('data-src'));
				upload.addClass('false');
				$(this).addClass('false');
			})
			box.on('click','.btn-cancle',function(){
				reset();
			}).on('click','.btn-ok',function(){
				reset();
				//TODO 去保存
			});

			//点击触发上传
			box.on('click','.focus-pic',function(){
				var self = $(this);
				//未上传时触发选择文件
				if (self.attr('src')!==self.attr('data-src')) {
					return;
				}
				self.next().trigger('click');
			})
		}
		//上传焦点图
		function focus(pic){
			uploadBigImage(pic);
		}
		//上传通栏大图
		function caption(pic){
			uploadBigImage(pic,'副标题（大图）编辑');
		}

    	//编辑分组商品
    	function multiGoods(container){
    		//TODO ie7下有问题
    		var view  = dialog.view;
			var box = view.find(".dialog-main");
			box.find(".header-text")
			   .text("商品内容区域编辑");

			var template = getTemplate('multi_goods');
			box.find('.dialog-content').html(template);
			//渲染数据
			var tempHTML = "";
			var trEndHTML = '</div></td><td><a class="btn-pic btn-delete-group">删除</a></td></tr>';
			container.find('.goods-item').each(function(index,item){
				//能被4整除，添加行
				if (index%4===0) {
    				var order = Math.floor((index/4)+1);
					if (tempHTML) {
						tempHTML +=trEndHTML+'<tr><td class="col1">'+order+'</td><td class="col2"><div class="goods-group clearfix">';
					}else{
						tempHTML +='<tr><td class="col1">'+order+'</td><td class="col2"><div class="goods-group clearfix">';
					}
				};
				tempHTML +=item.outerHTML;
			})
			tempHTML += trEndHTML;
			box.find('tr:last').before(tempHTML);
			renderInput('取消','保存');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:"705px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//绑定事件

			//删除
			box.find('.multi-goods-box').on('click','.btn-delete-group',function(){
				var btn = $(this);
				var tr = btn.parents('tr:first');
				if (tr.siblings().length===1) {
					return ;//alert('商品最少要保留一行')
				}
				var nextTrs = tr.nextAll();
				tr.remove();
				//更新序号
				nextTrs.each(function(){
					var _t = $(this);
					var orderCol = _t.find('.col1');
					if (orderCol.text()) {
						orderCol.text(Number(orderCol.text())-1)
					};
				})
			})
			//添加一组
			box.find('.multi-goods-box').on('click','.btn-add-group',function(){
				var last = $(this).parents('tr:first').prev();
				var order = Number(last.find('.col1').text());
				var emptyGoodsHTML = '<div class="goods-item empty"><div class="goods-data"></div><div class="goods-layer"></div>'
						+'<div class="goods-btns"><input class="btn-edit-single  btn-edit-top" type="button" value="设置商品">'
						+'<input class="btn-edit-single btn-edit-bottom" type="button" value="设置图片"></div></div>'
				var temp = '<tr><td class="col1">'+(order+1)+'</td><td class="col2"><div class="goods-group clearfix">'
						+emptyGoodsHTML
						+emptyGoodsHTML
						+emptyGoodsHTML
						+emptyGoodsHTML
						+'</div></td><td><a  class="btn-pic btn-delete-group">删除</a></td></tr>'
				last.after(temp);
			})
			//保存取消
			box.on('click','.btn-cancle',function(){
				reset();
			}).on('click','.btn-ok',function(){
				container.empty();
				box.find('.goods-item').each(function(index, el) {
					container.append(el);
				});
				reset();
			});
    	}
    	//编辑单个商品
    	function singleGoods(box){
    		//获得模板
    		var view  = dialog.view;
			var box = view.find(".dialog-main");
			box.find(".header-text")
			   .text("商品设置");

			var template = getTemplate('single_goods');
			box.find(".dialog-content").html(template);
			renderInput('取消','保存');
			box.css('height','703px');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:"846px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//保存取消
			box.on('click','.btn-cancle',function(){
				reset();
			}).on('click','.btn-ok',function(){
				reset();
				//TODO 去保存
			//预览
			}).on('click','.btn-view',function(){
				var html = '<span class="sale-icon">直降<i></i></span>'					
						+'<img class="goods-pic" src="../resource/images/single-goods-demo1.jpg">'
						+'<div class="goods-infomation"><div class="goods-infomation"><p class="goods-summary">酷派 cool1（标准版/全网通）双1300万后置摄像素</p>'
						//+'<div class="goods-side-title">更完善的售后，尽在。。</div>'//副标题
						+'<div class="goods-price">'
						+'<span>¥<strong>1988</strong></span>'
						+'<input type="button" class="btn-buy" value="立即购买"></div>'
						+'<div class="goods-extre">'
						+'<span class="timer">还剩<i>XX</i>天<i>XX</i>时<i>XX</i>分<i>XX</i>秒</span></div>'
						+'<div class="hot">人气：100人</div></div></div>'//关注度
				$('.view-box').removeClass('empty').html(html);
												
			}).on('keyup','input[maxlength]',function(){
				var input = $(this);
				input.next().text($.trim(input.val()).length+'/'+input.attr('maxlength'));
			}).on('change','.goods-promotional-methods',matchPromotion)
			.on('change', '.goods-extend-info', matchPromotion);
			//匹配商品促销
			function matchPromotion(){
				var method = box.find('.goods-promotional-methods');
				var extend = box.find('.goods-extend-info');
				if (method[0].selectedIndex===1&&(extend[0].selectedIndex===2||extend[0].selectedIndex===3)) {
					alert('亲，这种配置目前还没有哦，我们正努力加载');
					return false;
				}
			}
    	}
    	//编辑单个图片
    	function singlePic(container){
    		//获得模板
    		var view  = dialog.view;
			var box = view.find(".dialog-main");
			box.find(".header-text")
			   .text("设置图片");

			var template = getTemplate('single_pic');
			box.find(".dialog-content").html(template);
			//判断是否上传图片

			var pic = container.find('.upload-pic');
			alert(pic.attr('src'));
			if (pic.attr('src')!==pic.attr('data-src')) {
				box.find(".dialog-content").find('input').removeClass('false');
				box.find(".single-pic").attr('src',pic.attr('src'));
			};
			renderInput('取消','保存');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:"320px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			box.on('click','.btn-cancle',function(){
				reset();
			}).on('click','.btn-ok',function(){
				reset();
				//TODO 去保存
			});

			//注册上传图片事件
			box.on('click','.single-pic',function(event) {
				var self = $(this);
				if(self.attr('src')!==self.attr('data-src')){
					return;
				}
				self.next().trigger('click');
			});
    	}
    	//编辑优惠券样式
    	function ticketStyle(tickets) {
    		var view  = dialog.view;
			var box = view.find(".dialog-main");
			box.find(".header-text")
			   .text("编辑优惠券样式");

			var template = getTemplate('ticket_style');
			box.find('.dialog-content').html(template);
			//赋值
			var radios = box.find('input[type="radio"]');
			if (tickets.find('.tickets-box').attr('style')) {
				radios.eq(1).attr({
					checked: 'checked'
				});
			}
			renderInput('取消','保存');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:"488px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//注册事件
			box.on('click','.btn-cancle',function(){
				reset();
			}).on('click','.btn-ok',function(){
				//TODO 去保存
				var text = box.find('input:checked').parent().text();
				if (text==='隐藏优惠券') {
					tickets.find('.tickets-box').attr('style','display:none;');
				}else{
					tickets.find('.tickets-box').removeAttr('style');
				}
				reset();
			});
    	}

    	//伪造数据
    	function getTickets(){
    		var list = []
    		for (var i = 0; i < 4; i++) {
    			var o = {
    				store:'北京艾可生活'+i,
    				name :'满减',
    				date:'2016.06.05-2016.03.08',
    				status:'未开始'
    			}
    			list.push(o);
    		};
    		return list;
    	}
    	//优惠券添加编辑
    	function ticket(item){
    		//TODO
    		var tickets = getTickets()//
    		if (true) {
    			var contentHTML = '<p>哎呦喂~您还没有添加过优惠劵！请按下面的路径去添加优惠劵吧<p>'
								+ '<p class="ticket-link"><a href="#">营销中心</a> -> <a href="#">商品促销工具</a> -> <a href="#">店铺优惠劵</a></p>'
				notify(contentHTML,'添加优惠券','526px');
				return
    		};
    		var view  = dialog.view;
			var box = view.find(".dialog-main");
			box.find(".header-text")
			   .text("添加优惠券");
			var template = getTemplate('ticket');
			box.find('.dialog-content').html(template);
			var temp = "";
			for (var i = 0,l=tickets.length; i < l; i++) {
				temp += '<tr><td  class="col1"><input name="ticket" type="radio"></td><td>'+tickets[i]['store']+'</td><td>'+tickets[i]['name']+'</td><td>'+tickets[i]['date']+'</td><td>'+tickets[i]['status']+'</td></tr>'
			};
			box.find('tbody').html(temp);
			box.find(".dialog-footer").hide();
			view.show();
			box.css({
				"z-index":9999,
				"width"	:"526px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//注册事件	
			box.on('click','.ticket-prev',function(){
				//上一页
			}).on('click','.ticket-next',function(){
				//下一页
			})
			.on('click','.ticket-cancel',function(){
				reset();
			}).on('click','.ticket-save',function(){
				reset();
				//TODO 去保存
			});
			
    	}
    	function publish(){
    		var view  = dialog.view;
			var box = view.find(".dialog-main");
			box.find(".header-text")
			   .text("立即发布");

			var template = getTemplate('publish');
			box.find(".dialog-content").html(template);
			renderInput('取消','确认发布');
			view.show();
			box.css({
				"z-index":9999,
				"width"	:"496px",
				"margin-left":-box.outerWidth()/2+"px",
				"margin-top":-box.outerHeight()/2+"px"
			})
			//保存取消
			box.on('click','.btn-cancle',function(){
				reset();
			}).on('click','.btn-ok',function(){
				reset();
				//TODO 去保存
			});
    	}
    	//释放
	    function dispose(){
	    	dialog.view.remove();
	    	dialog = null;
	    }

	    //创建对话框对应的视图
	    function createView(){
	    	var wrap = document.createElement('div');
	    	wrap.id = "dialog-wraper";
	    	var box = document.createElement('div');
	    	box.className = "dialog-main";
	    	var header = document.createElement('div');
			header.className ="dialog-header";
			var span = document.createElement('span');
			span.className= "header-text";
			header.appendChild(span);
			var i = document.createElement('i');
			i.className= "dialog-close";
			i.onclick = reset;
			header.appendChild(i);
			box.appendChild(header);
			var content = document.createElement('div');
			content.className ="dialog-content";
			box.appendChild(content);
			var footer  = document.createElement('div');
			footer.className ="dialog-footer";
			box.appendChild(footer);
	    	wrap.appendChild(box);

	    	var layer = document.createElement('div');
	    	layer.className = "dialog-layer";
	    	wrap.appendChild(layer);
	    	$wrap = $(wrap);
	    	$wrap.css({
	    		height : $doc.height() +"px"
	    	}).hide().appendTo($(body))
	    	return $wrap;
	    }
	    win.createdialog = create;
})(jQuery)

