$winW = $(window).width();
$winH = $(window).height();
var resizeTO;
$(window).on('resize orientationchange', function(){
	clearTimeout(resizeTO);
	resizeTO = setTimeout(function() {
		$winW = $(window).width();
		$winH = $(window).height();
		$('.window.shown').each(function(){
			$startY = Math.random() * (($winH - $(this).outerHeight()) - 30) + 30;
			$startX = Math.random() * (($winW - $(this).outerWidth()) - 0) + 0;
			$(this).css({
				top: $startY,
				left: $startX
			})
		});
	}, 500);
})
$(document).ready(function() {
	$('.window.shown').each(function(){
		$startY = Math.random() * (($winH - $(this).outerHeight()) - 30) + 30;
		$startX = Math.random() * (($winW - $(this).outerWidth()) - 0) + 0;
		$(this).css({
			top: $startY,
			left: $startX
		})
	});
	$('.window .toolbar .close').click(function(){
		$(this).parents('.window').removeClass('shown');
	})
	$('.window .scroll').each(function(){
		var scrollbar = Scrollbar.init($(this)[0], {
			damping: 0.1,
			renderByPixels: true,
			syncCallbacks: true,
			continuousScrolling: false,
			alwaysShowTracks: false,
			overscrollEffect: false
		});		
	});
    var $dragging = null;
    $(document.body).on("mousemove", function(e) {
        if ($dragging){
	        $('.window.focus').removeClass('focus')
	        $dragging.addClass('focus');
		    if(e.pageY - $origY > 0 && e.pageY - $origY < $winH - $dragging.outerHeight()){
		    	$moveY = e.pageY - $origY;
		    } else if(e.pageY - $origY <= 30){
			    $moveY = 30;
		    } else{
			    $moveY = $winH - $dragging.outerHeight();
		    }
	        if(e.pageX - $origX > 0 && e.pageX - $origX < $winW - $dragging.outerWidth()){
			    $moveX =  e.pageX - $origX;
		    } else if(e.pageX - $origX <= 30){
			    $moveX = 30;
		    } else{
			    $moveX = $winW - $dragging.outerWidth();
		    }
            $dragging.css({
                top: $moveY,
                left: $moveX
            });
            e.preventDefault();
        }
    });


    $(document.body).on("mousedown", ".window *", function (e) {
        $dragging = $(e.target).parents('.window');
        $origX = e.pageX - $(this).offset().left;
        $origY = e.pageY - $(this).offset().top;
        $('.window.focus').removeClass('focus')
        $dragging.addClass('focus');
    });
    $('.window').hover(function(){
        //$('.window.focus').removeClass('focus')
        //$(this).addClass('focus');
    })

    $(document.body).on("mouseup", function (e) {
        $dragging = null;
    });
});