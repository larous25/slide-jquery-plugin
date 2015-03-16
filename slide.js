// the plugin create a slide of ul element
// @autor brian esteban bustos baquero
// @name slide =)
// license mit
(function($){
	// create the plugin and explore all elements
	$.fn.slide = function(options){
		return this.find('ul').each( function() {
			
			var $ul  = $(this);
			var opts = $.extend({}, $.fn.slide.defaults, options);
			
			if(opts.indexElement === true){
				$.fn.slide.indexElement($ul);
			}
			if(opts.arrows ===  true){
				$.fn.slide.arrows($ul, opts);
			}
			
		});	
	};
	// create index for unordered list
	// is it  a element div for either one element
	// @params object unordered list element
	$.fn.slide.indexElement = function($ul){
		var $div = $('<div class="indice"></div>');
		$ul.children('li').each(function(index) {
			$(this).attr('data-number','item-'+index);
			var color = $('<div class="color"></div>');
			color
				.attr('data-number','item-'+index)
				.click(move);
			$div.append(color);
		});
		$div
			.children('div:first-child')
			.addClass('active');			
		$ul.after($div);

		function move(){
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			var slide = $(this).attr('data-number');
			var $first = $ul.children('li:first-child');
			
			var  num = $first.attr('data-number');
			console.log(slide +'\t' +  num);

			if(slide !== num){
				$ul.append($first);
				$(this).trigger('click');
			}else{
				return false;
			}
		};
	};

	// create arrows for change state 
	// @params object unordered list element
	$.fn.slide.arrows = function ($ul, opts) {
		var btnR   = $('<button class="right"></button>'),
		btnL   = $('<button class="left"></button>');

		btnR.text(opts.textArrows.right);
		btnL.text(opts.textArrows.left);
		var obj    = {
						izq:"",
						selector: "",
						animation:{
							marginLeft: "", 
							"opacity": "0"
						}
					};

		// events for arrows
		btnR.click(right);
		btnL.click(left);
		
		$ul.after(btnR)
		$ul.after(btnL)

		function left(e){
			obj.izq                  = true;
			obj.selector             = 'li:first-child';
			obj.animation.marginLeft = "100%" ;
			animate(obj);
			if(opts.indexElement === true){
				index(true, $(e.target));
			}
		};

		function right(e){
			obj.izq                  = false;
			obj.selector             = 'li:last-child';
			obj.animation.marginLeft = "-100%";
			animate(obj);
			if(opts.indexElement === true){
				index(false, $(e.target));
			}
		};

		function index(rigOrLef, $obj){
			var $color = $obj.nextAll('.indice').eq(0).children('.color.active');
			$color.removeClass('active');
			
			if(rigOrLef == true){
				var $element  = $color.prev('.color');
			}else{
				var $element  = $color.next('.color');
			}

			if($element.length>0){
				$element.addClass('active');
			}else{
				$color = $obj.nextAll('.indice').eq(0).children('.color');
				if(rigOrLef == true){
					$color.last().addClass('active');
				}else{
					$color.first().addClass('active');
				}
			}
		}

		function animate(obj){
			$ul.children('li:first-child').animate(obj.animation,"slow",function(){
				if(obj.izq){
					$ul.append($ul.children(obj.selector));
				}else{
					$ul.prepend($ul.children(obj.selector));
				}
				$(this).css({
					"marginLeft":"0%",
					"opacity":"1"
				});
			});
		};
	
	};

	// options for default 
	$.fn.slide.defaults = {
		indexElement:true,
		arrows:true,
		textArrows:{
			right:'<',
			left:'>'
		}
	};

})(jQuery);