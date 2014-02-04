/***************************
 * jQuery Image Radiobutton and Checkbox
 * version 1.2
 *
 * Hiroshi Fukuda <dada@sygnas.jp>
 * http://sygnas.jp/
 *
 * The MIT License
 *
 * Copyright (c) 2011-2012 Hiroshi Fukuda, http://sygnas.jp/
 *
********************************/

( function( jQuery ){

	$.sygImageRadio = function( selector, clearFlag, labelFlag , config ){

		var defaults = {
			// デフォルト設定。とくになし
		};

        if(clearFlag == undefined || clearFlag == null){
            clearFlag = false;
        }
        if(labelFlag == undefined || labelFlag == null){
            labelFlag = false;
        }

		// 設定
		var options = jQuery.extend( defaults, config );
		var active;			// 現在アクティブなボタン
		var buttons = [];	// 全ボタン

		// IEか
		var isIE = checkIE();


		// 初期化
		jQuery( selector ).each(
			function(i){
				setRadioButton( this );
			}
		);

		/*******************
		 * 初期化
		 */
		function setRadioButton( target ){

            if(labelFlag == undefined || labelFlag == false){
//    			formItem = jQuery( '#'+jQuery(target).parent().attr('for'));
    			target.imgsrc = target.src;
            }else{
    			target.imgsrc = jQuery(target).children('img').attr('src');
            }
            target.imgsrc = target.imgsrc.replace(/-select/g, "");
//			target.imgsrc = target.src;
			var dotpos = target.imgsrc.lastIndexOf('.');

			// オーバー画像と選択画像
			target.imgsrc_over = target.imgsrc.substr(0,dotpos) + '-over.' + target.imgsrc.substr(dotpos+1);
			target.imgsrc_select = target.imgsrc.substr(0,dotpos) + '-select.' + target.imgsrc.substr(dotpos+1);

			// キャッシュのために一度読み込む
			var img_over = new Image();
			img_over.src = target.imgsrc_over;
			var img_select = new Image();
			img_select = target.imgsrc_select;

			// ボタン格納
			buttons.push( target );

			// 対象となる<input type="checkbox / radio">
            var formItem;
            if(labelFlag == undefined || labelFlag == false){
    			formItem = jQuery( '#'+jQuery(target).parent().attr('for'));
            }else{
    			formItem = jQuery( '#'+jQuery(target).attr('for'));
            }

			// type radio or checkbox
			var mode = formItem.attr('type') == 'radio' ? 'radio' : 'checkbox';

			// 初期状態でアクティブ指定されていたら選択状態に
			if( formItem.is(":checked") ){
				target.src = target.imgsrc_select;
				active = target;
			}

			/*************************
			 * 状態が変更
			 */
			formItem.click(
				(
					function( target, imgsrc, imgsrc_over, imgsrc_select, formItem ){
						return function( e ){
							changeStatus( target, imgsrc, imgsrc_over, imgsrc_select, formItem );
						}
					}
				)( target, target.imgsrc, target.imgsrc_over, target.imgsrc_select, formItem )
			);
			/*************************
			 * 状態に合わせて画像差し換え
			 */
			function changeStatus( target, imgsrc, imgsrc_over, imgsrc_select, formItem ){

				switch( mode ){
				case "radio":
					// 現在選択状態なものを開放
					if( active ){

                        if(labelFlag == undefined || labelFlag == false){
                            active.src = active.imgsrc;
                        }else{
                            jQuery(active).children('img').attr('src',active.imgsrc);
                        }
//                        active.src = active.imgsrc;
					}
					// 選択状態にする
                    if(active == target && clearFlag){
                        active = null;
                        formItem.attr("checked",false);
                    }else{
                        active = target;
                        if(labelFlag == undefined || labelFlag == false){
                            target.src = imgsrc_select;
                        }else{
                            jQuery(target).children('img').attr('src',imgsrc_select);
                        }
                        formItem.attr("checked",true);
                    }
					break;

				case "checkbox":
					if( formItem.is(":checked") ){
						target.src = imgsrc_select;
					}else{
						target.src = imgsrc;
					}
					break;
				}
			}

			/*************************
			 * IEのみ画像クリックに対応させる
			 */
			if( isIE ){
				$('label').click(function () {
	                $('#' + $(this).attr('for')).click();
				});

				formItem.click(
					(
						function( target, imgsrc, imgsrc_over, imgsrc_select, formItem ){
							return function( e ){
								changeStatus( target, imgsrc, imgsrc_over, imgsrc_select, formItem );
							}
						}
					)( target, target.imgsrc, target.imgsrc_over, target.imgsrc_select, formItem )
				);
			}

		}

		/***********************
		* IEか判定
		*/
		function checkIE(){
			var userAgent = window.navigator.userAgent.toLowerCase();
			var appVersion = window.navigator.appVersion.toLowerCase();

			if (userAgent.indexOf("msie") > -1) {
				if (appVersion.indexOf("msie 6.0") > -1) {
					// IE6
					return true;
				}else if (appVersion.indexOf("msie 7.0") > -1) {
					//IE7, IE8（IE7 mode)
					return true;
				}
				else if (appVersion.indexOf("msie 8.0") > -1) {
					// IE8
					return true;
				}else if (appVersion.indexOf("msie 9.0") > -1) {
					// IE9
					return true;
				}else if (appVersion.indexOf("msie 10.0") > -1) {
					// IE10
					return true;
				}else{
					// Unknow
					return false;
				}
			}else if (appVersion.indexOf("trident/7.0") > -1) {
				// IE11
				return true;
			}else{
				return false;
			}
		}
	};

})( jQuery );
