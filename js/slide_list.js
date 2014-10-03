// JavaScript Document

	
/* -----------------------------------------
* slide
* ----------------------------------------- */


(function($){
	
	
	var conts_pos=0;
	var end_pos;
	var frame_width = 800;
	var bar_move_pos;
	var modal_flg = false;
	var posx = 0;
	var posflg=false;
	var pos_cnt = 0;
	var slide_flg=false;
	var Timer;
	
	
	$(function(){
		
		//初期化		
		ctl_list_h();
		ctl_pos();
		slide_do();
		//ctl_smt_btn();
	
		//コンテンツ表示
		$("#frame_service").css("left",$(window).width());
		$("#frame_service").animate({left:conts_pos,opacity:1},{'duration': 1500, 'easing': 'easeOutQuart'});
		
	
		
		//スライド判定
		if (slide_flg == true){
			slide_ctl();
		}else{
			$("#btn_next_img").css("display","none");
		}
		

	
		//Windowリサイズ時
		$( window ).resize(function(){

				var win_w = $(window).width();
				$("#list_service").css("width",win_w);							
				$("#frame_service").css("left",$("#frame_service").offset().left + ($("#snav").offset().left - conts_pos));	
				
				conts_pos = $("#snav").offset().left;			

				if (slide_flg==false){
					
					slide_do();
					if (slide_flg==true){
						slide_ctl();	
					}
				}
				
				if (slide_flg==true){
					
					slide_do();
					if (slide_flg==false){
						ctl_pos()
						clearInterval(Timer);
					}
				}
		 });
		
	});		
	
/* -----------------------------------------
* list・bar 高さ調整
* ----------------------------------------- */
	
	function ctl_list_h(){
		
		var list_h = 0;
		var list_count = 0;
		
		$("#exp_service li").each(function(){					
			list_count = list_count + 1
			if(list_h < $(this).height()){
				list_h = $(this).height();
			}
		});
		
		$("#frame_service").css("width",(275 * list_count) + (20 * (list_count-1)) + $("#title_forblogger").width())
		
		//listのheightを揃える
		$("#list_service li").css("height",list_h);
		$(".exp_service").css("height",list_h);
		$("#list_service").css("height",list_h + 31);
		
		//ボタンの高さを揃える
		$(".btn_detail").each(function(){
			var margin_btn = list_h - $(".img_service").height() - $("h3",this).height() - $(this).parent("p").innerHeight() - $(this).innerHeight();
			$(this).css("marginTop",margin_btn);
		});
		
	}
		

/* -----------------------------------------
* list・bar 位置調整
* ----------------------------------------- */

	function ctl_pos(){

		var win_w = $(window).width();
		$("#list_service").css("width",win_w);

		conts_pos = $("#snav").offset().left;
		
		//listのcontents・スライドバーをmenu位置にあわせる
		$("#frame_service").css("left",conts_pos);		
		
	}
	

/* -----------------------------------------
* スライド処理
* ----------------------------------------- */

	function slide_ctl(){
				
			$("#btn_next_img").css("display","inline");
			
			
			//contentsスクロール
			Timer = setInterval(function(){slide_conts();},1);
					
			//contens上にカーソルがあるか
			$("#list_service").mouseout(function(e){posflg = false;});
			$("#list_service").mouseover(function(e){posflg = true;});
			
			//矢印のフェードアウト	
			$("#frame_service").mouseover(function(e){
				setTimeout(function(){$("#btn_next_img").animate({opacity:0},1000);},800);
			});
		
			//カーソル位置取得
			$("#list_service").mousemove(function(e){posx = e.clientX;});
			
			//リンクホバー時に止める
			$(".a_conts a").mouseover(function(e){clearInterval(Timer);})
		
			//リンクホバー解除時に再開
			$(".a_conts a").mouseout(function(){Timer = setInterval(function(){slide_conts();},1);})
			
	}

	
	function slide_conts(){
		
		//コンテンツ内にカーソルが存在する場合
		if(posflg == true){
			
			end_pos = ($("#frame_service").width() - frame_width - conts_pos)*(-1)	
			
			var now_pos = $("#frame_service").offset().left;
			var pos_left = $(window).width() / 2;

			var speed = 1;
			
			//方向
			if (posx <= pos_left){
				dis = -1; //左
			}else{
				dis = 1; //右
			}
			
			
			//スピード調節
			if(Math.abs(posx - pos_left) > 350){
				speed = speed + ((Math.abs(posx - pos_left)-350)/100)
			}
			
			//両方有効
			var scl_flg = true;
			
			//開始：左だけ有効
			if(now_pos >= conts_pos){
				if(dis == -1){
					scl_flg = false;
				}
			}
			
			//終点：右だけ有効
			if(now_pos <= end_pos){
				if(dis == 1){
					scl_flg = false;
				}
			}
			
			//移動
			if (scl_flg == true){
				
											
				$("#frame_service").css("left",$("#frame_service").offset().left - (speed * dis));	
				pos_cnt = pos_cnt + (speed * dis);
			}
			
		}	
	
	}


/* -----------------------------------------
* スライド処理の要・不要判定
* ----------------------------------------- */
	
	function slide_do(){
		
		//スライド判定
		if ($(window).width() <= $("#snav").offset().left + $("#frame_service").width()){
	
			//スライド機能：有効
			slide_flg = true;
			
		}else{
			
			//スライド機能：無効		
			slide_flg = false;
		}
		
	}

	
})(jQuery)

