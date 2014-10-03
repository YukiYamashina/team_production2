// Goto the bottom of the window when the DOM is fully loaded.
$(document).ready(function(){
    scrollTo(0,15000);
});

$(window).load(function(){
 
    throwApple();
    FusenAnimate();

    function throwApple(){
        $('#apple').animate(
            {'left':'540px'},{
                duration: 4000,
                step: function(now){
                    $('#apple').css({transform:'rotate(' + (now*2) + 'deg)'})
                }
            },
            'easeOutBounce'
        );
    };
/*
      $(function(){
      $border = 2900;
      $vy0 = 20;
      $('#apple').css({left:'-200px', top:$border + 'px', position:'absolute'});    
        var $dt = 70; // 移動間隔
        var $g=2.0; // 重力加速度
        var $x=0; // 初期位置
        var $y=$border; // 初速
        var $vx=12;
        var $vy=$vy0;
        $h = 0.95;  // 跳ね返り係数
        setInterval(function(){
            $('#apple').animate({left:$x + 'px', top:$y + 'px'},
                {duration: $dt,
              complete: comp()});
        },1);
        function comp() {
          if($x > $(window).width()) {
            $x = 0;
          } else {
            $x += $vx;
          }
          $y -= $vy;
          if($y >= $border) {
            $vy = -$vy * $h - $g;
            $y = $border;
          } else {
            $vy = $vy - $g;
          }
          $y -= $vy;
        }
      });
    };
*/


    function FusenAnimate(){
        $('#tree').delay(3000).animate({'left':'360px'}, 500, 'easeOutElastic',function(){
            $('#tree').animate({'left':'380px'},500, 'easeOutElastic');
        });

/*
        $('.fuusen').delay(500).animate({
            'left' : '47%'
        }, 500, 'easeOutElastic',function(){
            $('.fuusen').animate({
                'left' : '43%'
            }, 250, 'easeOutElastic',function(){
                birdChange();
            });
        });
*/
        FuusenFlyAway();

        setInterval(function(){
            var offset = $( '#fuusen_flow' ).offset();
            if ( offset.top < 420 ) {
                return;
            } else if ( offset.top < 2000 ) {
                console.log(offset.top);
                autoScroll();
            }
        },100);
        return;
    };

    function FuusenFlyAway(){
        $('#fuusen_concept'     ).delay(3000).animate({'top':  '380px', 'left':  '175px'}, 5500, 'easeOutCubic');
        $('#fuusen_concept img' ).delay(3000).animate({'width': '307px'},                  4000, 'easeInOutExpo',smallBound());
        $('#fuusen_works'       ).delay(3000).animate({'top':  '409px', 'left':  '874px'}, 7500, 'easeInOutQuart');
        $('#fuusen_flow'        ).delay(3000).animate({'top':  '427px', 'left':  '588px'}, 6500, 'easeOutSine');
        $('#fuusen_price'       ).delay(3000).animate({'top':  '349px', 'left': '1086px'}, 7000, 'easeOutExpo');
        $('#fuusen_contact'     ).delay(3000).animate({'top':  '213px', 'left': '1068px'}, 8000, 'easeOutCirc');
        $('#fuusen_sitemap'     ).delay(3000).animate({'top':  '136px', 'left':  '929px'}, 5000, 'easeOutElastic');
        $('#fuusen_star'        ).delay(3000).animate({'top': '-100px', 'left': '2000px'}, 8000, 'easeOutCirc');
        $('#fuusen_heart'       ).delay(3000).animate({'top': '-100px', 'left': '-100px'}, 5000, 'easeOutElastic');
    }

    function smallBound(){
        setInterval( function(){
            $('#fuusen_concept').animate({'top': '385px'}, 500).animate({'top': '380px'}, 500);
            $('#fuusen_works'  ).animate({'top': '432px'}, 500).animate({'top': '427px'}, 500);
            $('#fuusen_flow'   ).animate({'top': '414px'}, 500).animate({'top': '409px'}, 500);
            $('#fuusen_price'  ).animate({'top': '354px'}, 500).animate({'top': '349px'}, 500);
            $('#fuusen_contact').animate({'top': '218px'}, 500).animate({'top': '213px'}, 500);
            $('#fuusen_sitemap').animate({'top': '141px'}, 500).animate({'top': '136px'}, 500);
        },500)
    };

});

function autoScroll(){
    var scrollStep = - 1;
    var scrollSpeed = 10;
    if ( $(window).scrollTop() < 10 ) {
        return;
    } else if ( $(window).scrollTop() < 2100 ) {
        scrollStep = -2;
        scrollSpeed = 1;
    }
    scrollBy(0,scrollStep);
    myHandle = setTimeout('autoScroll()',scrollSpeed);
};