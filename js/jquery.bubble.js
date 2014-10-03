/*
$(function() {
    $('.icon').hover(
    function () {
        var $this = $(this);
        $this.prev().stop().animate({
            'width'     : '200px',
            'height'    : '200px',
            'top'       :'-100%',
            'left'      :  '-1%',
            'opacity'   :'1.0'
        },500,'easeOutBack',function(){
            $this.prev().attr('href',$this.attr('href'));
            $this.next().fadeIn(100);
        });
    },
    function () {
        var $this = $(this);
        $this.next().fadeOut(300);
        $this.prev().stop().animate({
            'width'     :'70px',
            'height'    :'70px',
            'top'       :'0',
            'left'      :'0',
            'opacity'   :'0.1'
        },5000,'easeOutBack');
    });
});
*/

$(function() {
    $('.gnav-item').hover(
    function () {
        var $this = $(this);
        $this.find('img').stop().animate({
            'width'     :'199px',
            'height'    :'199px',
            'top'       :'-55px',
/*             'left'      : '-5px', */
            'opacity'   :'1.0'
        },500,'easeOutBack',function(){
            $(this).parent().find('ul').fadeIn(700);
        });

        $this.find('a:first,ul:first-child').addClass('active');
    },
    function () {
        var $this = $(this);
        $this.find('ul').fadeOut(500);
        $this.find('img').stop().animate({
            'width'     :'52px',
            'height'    :'52px',
            'top'       :'0px',
            'left'      :'0px',
            'opacity'   :'0.1'
        },5000,'easeOutBack');

        $this.find('a:first,ul:first-child').removeClass('active');
    });
});