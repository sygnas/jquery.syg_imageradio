/***************************
 * jQuery Image Radiobutton and Checkbox
 * version 1.1	
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
	
	$.sygImageRadio = function( selector, config ){
		
		var defaults = {
			// デフォルト設定。とくになし
		};
		
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
			
			target.imgsrc = target.src;
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
			var formItem = jQuery( '#'+jQuery(target).parent().attr('for'));
			
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
			formItem.change(
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
						active.src = active.imgsrc;
					}
					// 選択状態にする
					active = target;
					target.src = imgsrc_select;
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
			 * ロールオーバー
			 */
			$(target).hover(
				(
					function( target, imgsrc, imgsrc_over, imgsrc_select, formItem ){
						return function( e ){
							// クリックされたものがアクティブなら無視
							if( formItem.is(":checked") ) return;
							target.src = imgsrc_over;
						}
					}
				)( target, target.imgsrc, target.imgsrc_over, target.imgsrc_select, formItem ),
				
				(
					function( target, imgsrc, imgsrc_over, imgsrc_select, formItem ){
						return function( e ){
							// クリックされたものがアクティブなら無視
							if( formItem.is(":checked") ) return;
							target.src = imgsrc;
						}
					}
				)( target, target.imgsrc, target.imgsrc_over, target.imgsrc_select, formItem )
			);
			
			/*************************
			 * IEのみ画像クリックに対応させる
			 */
			if( isIE ){
				$(target).click(
					(
						function( target, imgsrc, imgsrc_over, imgsrc_select, formItem ){
							return function( e ){
								formItem.focus();
								formItem.click();
								formItem.blur();
								formItem.focus();
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
			if( typeof document.documentElement.style.maxHeight != "undefined" ){

				if (!/*@cc_on!@*/false){
					// IE 以外
					return false;
				}else if (document.documentMode >=8) {
					// IE8 以降
					return true;
				}else {
					//IE7, IE8（IE7 mode)
					return true;
				}
				
			}else{
				// IE6以下
				return true;
			}
		}
	};
	
})( jQuery );

