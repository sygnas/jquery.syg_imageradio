#jQuery Image Radiobutton and Checkbox

##NAME
jQuery.sygImageRadio

##VERSION
version 1.0

jQuery VERSION
version 1.4.2

2012.01.28 ver1.0
	とりあえず作成


##SYNOPSIS
	
###HTML
``` html
*<!-- radio -->*
<input type="radio" name="q1" id="btn-A" value="A" />
<label for="btn-A"><img src="img/btn_a.png" class="radioGroup1" /></label>

<input type="radio" name="q1" id="btn-B" value="B" checked="checked" />
<label for="btn-B"><img src="img/btn_b.png" class="radioGroup1" /></label>

*<!-- checkbox -->*
<input type="checkbox" name="q2" id="btn-0" value="0" />
<label for="btn-0"><img src="img/btn_0.png" class="checkGroup1" /></label>

<input type="checkbox" name="q2" id="btn-1" value="1" checked="checked" />
<label for="btn-1"><img src="img/btn_1.png" class="checkGroup1" /></label>
```

### jQuery.sygImageRadio setup
``` js
$.sygImageRadio( '.radioGroup1' );
$.sygImageRadio( '.checkGroup1' );
```

##DESCRIPTION
フォームのラジオボタン、チェックボックスのチェック状態で画像を変更するプラグインです。

ロールオーバー時の画像はファイル名末尾に「-over」、
セレクト状態の画像は「-select」を付けてください。

##METHOD

##AUTHOR
Hiroshi Fukuda <dada@sygnas.jp>
http://sygnas.jp/

##LICENSE
jQuery.sygImageRadio

The MIT License

Copyright (c) 2011-2012 Hiroshi Fukuda, http://sygnas.jp/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
