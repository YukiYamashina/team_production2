/*----------------------------------------------------------
  Page Configuration
-----------------------------------------------------------*/
(function(){
  var i = 0;
  var path = new Array(
    // see http://www.h2.dion.ne.jp/~defghi/svgMemo/svgMemo_03.htm for an eliptic curve
    "M 500,500 A 300,200 0 0,0 800,100", // path for concept.png
    "M 500,500 A 300,200 0 0,1 200,100", // path for our_works.png
    "M 500,500 A 100,100 0 0,1 200,300", // path for flow.png
    "M 500,500 A 300,200 0 0,1 700,300", // path for price.png
    "M 500,500 A 100,100 0 0,0 600,100", // path for contact.png
    "M 500,500 A 100,100 0 0,1 400,100", // path for sitemap.png
    "M 500,500 A  50, 50 0 0,1 500,300", // path for heart.png
    "M 450,550 A  50, 50 0 0,1 450,550"  // path for the cart image
/*     "M95,485.5c830,0,855,0,855,0L480,374L295,130", */
/*
    "M539,453.8 c0.7-16.7,1.4-33.3,2.1-50c-34.8-59.1-94-105.2-115.6-172.6c-7.7-24-10.5-57.6-5.2-82.6c4.5-15.3,9-30.6,13.5-45.8",
    "M488.5,473.6 c0.7-16.7,1.4-33.3,2.1-50c-34.8-59.1,83-58.2,61.4-125.5c-7.7-24,30.7-93,36-118c4.5-15.3-4.4-64.7,0.1-80"
*/
/*     "M47,500.5c894,0,894,0,894,0s-9.3-72.8-71-73.5 c-61-0.7-65.3,72.3-65.3,72.3c-6.3,15.3-15.8,25-49.8,22.1" */
  ),
    fusenWalkerObj1 = $('.maze > .walker')[0],
    fusenWalkerObj2 = $('.maze > .walker')[1],
    fusenWalkerObj3 = $('.maze > .walker')[2],
    fusenWalkerObj4 = $('.maze > .walker')[3],
    fusenWalkerObj5 = $('.maze > .walker')[4],
    fusenWalkerObj6 = $('.maze > .walker')[5],
    fusenWalkerObj7 = $('.maze > .walker')[6],
    fusenWalkerObj7 = $('.maze > .walker')[6],
    firstWalkerObj  = $('.maze > .walker')[7],
    walkers = [];
  
  // handles whatever moves along the path
  function AnimateWalker(walker){
    this.pathAnimator = new PathAnimator( path[i] );
    this.walker = walker;
    this.reverse = false;
    this.speed = 4;
    this.easing = 'easeOutExpo';
    this.startOffset = null;
    this.color = 'deeppink'; // visually separate different walkers easily
    i++;
  }

  AnimateWalker.prototype = {
    start : function(){
      //this.walker.style.cssText = "";
      this.startOffset = (this.reverse || this.speed < 0) ? 100 : 0; // if in reversed mode, then animation should start from the end, I.E 100%
      this.pathAnimator.context = this; // just a hack to pass the context of every Walker inside it's pathAnimator
      this.pathAnimator.start( this.speed, this.step, this.reverse, this.startOffset, this.finish, this.easing);
    },

    // Execute every "frame"
    step : function(point, angle){
      this.walker.style.cssText = "top:" + point.y + "px;" + 
                    "left:" + point.x + "px;" + 
/*
                    "transform:rotate(" + angle + "deg);" +
                    "-webkit-transform:rotate(" +  angle + "deg);" +
*/
                    "color:" + this.color;
    },

    // Restart animation once it was finished
    finish : function(){
/*      this.start(); */
        // bounce animation for fusen images
        setInterval( function() {
        $(".walker").each(function(){
            if ( $(this).hasClass("bounce") )
            $(this).animate({top:'-=4'},400).animate({top:'+=4'},400);
        });
        },10);
    },

    // Resume animation from the last completed percentage (also updates the animation with new settings' values)
    resume : function(){
      this.pathAnimator.start( this.speed, this.step, this.reverse, this.pathAnimator.percent, this.finish, this.easing);
    }
  }

  function generateWalker(walkerObj){
    var newAnimatedWalker = new AnimateWalker( walkerObj );
    walkers.push(newAnimatedWalker);
    return newAnimatedWalker;
  }

  // start "animating" the first Walker on the page
  setTimeout(function(){console.log(i);},3000);
  generateWalker(fusenWalkerObj1).start();
  generateWalker(fusenWalkerObj2).start();
  generateWalker(fusenWalkerObj3).start();
  generateWalker(fusenWalkerObj4).start();
  generateWalker(fusenWalkerObj5).start();
  generateWalker(fusenWalkerObj6).start();
  generateWalker(fusenWalkerObj7).start();
  generateWalker(firstWalkerObj).start();
  // bind the first Controller to the first Walker
  var firstController = $('menu > div:first');
  resetController( firstController );
  firstController.data( 'walker', walkers[0] );

/*-----------------------------------------------------------
  User Controls
------------------------------------------------------------*/
/*
  $('#showPath').on('change', togglePath);
  $('#addWalker').on('click', addWalker);
  $('menu')
    .on('click', '.delete', removeInstance)
    .on('click', '.stopPlay', stopPlay)
    .on('click', '.reverse', switchDirection)
    .on('change', '.speed', changeSpeed)
    .on('change', 'select', changeEasing);
    
  $('.speed').trigger('change');
*/
  
  // show / hide the path of the animated object
/*
  function togglePath(){
    $('#svgPath').toggleClass('show');
  }
*/
  
  // add a new instance Walker and his controller box
/*
  function addWalker(){
    var newWalker = firstWalkerObj.cloneNode(true),
      controllerTemplate = $('menu > div:last'),
      controllerClone = controllerTemplate.clone(),
      newAnimatedWalker = generateWalker(newWalker),
      color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    
    resetController( controllerClone );
    controllerTemplate.after( controllerClone.css('borderColor', color) );
    
    $(firstWalkerObj).after(newWalker);

    controllerClone.data('walker', newAnimatedWalker);  // keep track which controller controls which walker
    newAnimatedWalker.color = color;
    newAnimatedWalker.start();
  }
*/

  // reset the controller box for new "walker" instances
  function resetController(obj){
    var speed = 30;
    obj.find('.speed').val(speed).next().text(speed + 's');
    obj.find(':checkbox').removeAttr('checked');
  }
  
  // pause or place the animated object along the path 
  function stopPlay(){
    var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');
    
    thisAnimatedWalker.pathAnimator.running ? thisAnimatedWalker.pathAnimator.stop() : thisAnimatedWalker.resume.apply(thisAnimatedWalker);
  }
  
  // switch direction of the animated object 
/*
  function switchDirection(){
    var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');
    thisAnimatedWalker.reverse = (thisAnimatedWalker.reverse == true) ? false : true;
    if( thisAnimatedWalker.pathAnimator.running )
      thisAnimatedWalker.resume.apply(thisAnimatedWalker);
  }
*/

  function changeSpeed(){
    var thisAnimatedWalker = $(this.parentNode).data('walker');
    thisAnimatedWalker.speed = this.value;
    this.nextElementSibling.innerHTML = this.value + 's';
    thisAnimatedWalker.resume.apply(thisAnimatedWalker);
  }

/*
  function removeInstance(){
    var parent = $(this.parentNode),
      thisAnimatedWalker = parent.data('walker');
    
    // make sure at least one Walker stays
    if( walkers.length > 1 ){
      parent.remove();
      thisAnimatedWalker.pathAnimator.stop();
      $(thisAnimatedWalker.walker).remove();
      walkers.splice(walkers.indexOf(thisAnimatedWalker), 1);
    }
  }
*/
  
  function changeEasing(){
    var thisAnimatedWalker = $(this.parentNode).data('walker'),
      easingFunc = ''; 
      
    if( this.value ){
      var formula = this.value;
      easingFunc = function(t){ return eval(formula) }; 
    }
    
    thisAnimatedWalker.easing = easingFunc;
    thisAnimatedWalker.resume.apply(thisAnimatedWalker);
  }
  
  // reset checkboxes
  $(':checkbox').removeAttr('checked');
  $('select').prop('selectedIndex', 0);
})();


/*-----------------------------------------------------------
  Added functions
------------------------------------------------------------*/

/*
$(function zoomImages(){
    $('.walker').each(function() {
        var oheight = $(this).children(0).height();
        var owidth = $(this).children(0).width();
        var nheight = (oheight + (oheight * 0.25));
        var nwidth = (owidth + (owidth * 0.25));
        var top = ((oheight - nheight) / 2);
        var left = ((owidth - nwidth) / 2);
        $(this).mouseenter(function() {
            $(this).css('z-index', '10').children(0).stop().animate({
                    'height' : nheight+'px',
                    'width' : nwidth+'px',
                    'left' : left+'px',
                    'top' : top+'px'}, 210);
        });
        $(this).mouseleave(function() {
            $(this).children(0).stop().animate({
                    'left' : '0px',
                    'top' : '0px',
                    'height' : oheight+'px',
                    'width' : owidth+'px'}, 150, function() {
                        $(this).css('height', oheight+'px').parent().css('z-index', '1');
                    });
        });
    });
});
*/

/*
 * Reference page:
 * http://black-flag.net/jquery/20110209-2581.html
 *
 */

/* $(function magnifyImages(){ */
/*
    var thumbSize = 100;
    var magnifySize = 150;
*/
/* $(window).load(function(){ */

/*
    $(".magnify").each(function(){

        var thumbSize = $(this).width();
        var magnifySize = thumbSize*1.5;

        $(this).css({width:(thumbSize)});

        $(this).wrapAll('<span class="magnify_cover"></span>');
        $(this).parent('.magnify_cover').css({
            margin: '0 10px 10px 0',
            width: (thumbSize),
            float: 'left',
            position: 'relative'
        });

        $(".magnify").hover(function() {
            $(this).stop().animate({width:(magnifySize)},500,function(){
                $(this).css({top:'0',left:'0',position: 'absolute'});
            });
        }, function(){
            $(this).stop().animate({width:(thumbSize)},300,function(){
                $(this).css({top:'',left:'',position: 'relative'});
            });
        });
    });
*/