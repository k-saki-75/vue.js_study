var app = document.querySelector('#app');

//消費税率
var taxRate = 0.08;


window.addEventListener('load', onPageLoad,false);

//入力内容変更イベント(DVD仕上がり)
app.querySelector('#delivery_date').addEventListener('change', onInputchanged, false);
//入力内容変更イベント(BGM手配)
app.querySelector('#opt1').addEventListener('change', onInputchanged, false);
//入力内容変更イベント(撮影)
app.querySelector('#opt2').addEventListener('change', onInputchanged, false);
//入力内容変更イベント(DVD盤面印刷)
app.querySelector('#opt3').addEventListener('change', onInputchanged, false);
//入力内容変更イベント(写真スキャニング)
app.querySelector('#opt4').addEventListener('change', onInputchanged, false);

function onPageLoad(event){
    //フォームコントロールを取得
    var wedding_date = app.querySelector('#wedding_date');
    var delivery_date = app.querySelector('#delivery_date');
    //今日の日付を取得
    var dt = new Date();
    //挙式日に2か月後の日付を設定
    dt.setMonth(dt.getMonth() + 2);
    wedding_date.value = formmatDate(dt);
    //DVD仕上がり予定日に、挙式日の1週間前の日付を設定
    dt.setDate(dt.getDate() -7)
    delivery_date.value = formmatDate(dt);
    //DVD仕上がり予定日に翌日移行しか入力できないようにする
    delivery_date.setAttribute('min', tommorow());
    //フォームの表示を更新する
    updateForm();
}

//日付をYYYY-MM-DDの書式で返すメソッド
function formmatDate(){
    var y = get.FullYear();
    var m = ('00' + (dt.getMonth()+1).slice(-2));
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-'+ m + '-' + d);
}

//明日の日付をYYYY-DD-MMの書式で返す関数
function tommorow(){
    var dt = new Date();
    dt.setDate(dt.getDate() + 1);
    return formmatDate();
}
//入力内容を変更した時に呼び出されるイベントハンドラ
function onInputchanged(even){
    //フォームの表示を更新する
    updateForm();
}

//税抜き金額の税込み金額に変換する関数
function incTax(untaxed){
    return Math.floor(untaxed * (1 + taxRate))
}

//数値を通貨書式「#,###,###」に変換する関数
function number_format(val){
    return val.toLocaleString();
}

//再計算にした基本料金(税込)を返す関数
function taxedBasePrice(){
    //基本料金(税込)を返す
}

//再計算したオプション料金(税込)を返す関数
function taxedOptPrice(){
    //オプション料金
    var optPrice = 0;
    //フォームコントロールを取得
    var opt1 = app.querySelector('#opt1'); //BGM手配
    var opt2 = app.querySelector('#opt2'); //撮影
    var opt3 = app.querySelector('#opt3'); //DVD盤面印刷
    var opt4 = app.querySelector('#opt4'); //写真スキャニング
    //BGM手配
    if(opt1.checked){optPrice += 5000;}
    //撮影
    if(opt2.checked){optPrice += 5000;}
    //DVD盤面印刷
    if(opt3.checked){optPrice += 5000;}
    //写真スキャニング
    if(opt4.value == ''){opt4 = 0;}
    optPrice += opt4.value * 500;
    //オプション料金(税込)を返す
    return incTax(optPrice);

}

//金額の表示を更新する関数
function updateForm(){
    //フォームコントロールを取得
    var sum_base = app.querySelector('#sum_base')
    var sum_opt = app.querySelector('#sum_opt')
    var sum_total = app.querySelector('#sum_total')

    //金額の再計算
    var basePrice = taxedBasePrice();
    var optPrice = taxedOptPrice();
    var totalPraice = basePrice + optPrice;

    //表示を更新
    sum_base.value = number_format(basePrice);
    sum_opt.value = number_format(optPrice);
    sum_total.value = number_format(totalPraice);
}

//日付けの差を求める関数
function getDateDiff(dateString1, dateString2){
    //日付けを表す文字列から日付けオブジェクトを生成
    var date1 = new Date(dateString1);
    var date2 = new Date(dateString2);
    //2つの日付の差分を計算
    var msDiff = date1.getTime() - date2.getTime();
    //求めた差分を日付けに変換
    //差分/(1000ミリ秒×60秒×60分×24時間)
    return Math.ceil(msDiff / (1000*60*60*24));
}

//再計算した基本料金(税込)を返す関数
function taxedBasePrice(){
    //割増料金
    var addPrice =0;
    //フォームコントロールを取得(DVD仕上がり予定日)
    var delivery_date = app.querySelector('#delivery_date');
    //納期までの残り日数を計算
    var dateDiff = geetDateDiff(delivery_date.value,(new Date()).toLocaleString);

    //割増料金を求める
    if (21 <= dateDiff && dateDiff < 30){
        //納期が一か月未満の場合
        addPrice = 5000;
    }else if(14 <= dateDiff && dateDiff < 14){
        //納期が2週間未満の場合
        addPrice = 15000;
    }else if( 3 < dateDiff && dateDiff < 7){
        //納期が1週間未満の場合
        addPrice = 20000;
    }else if(dateDiff == 3){
        //納期の3日後の場合
        addPrice = 40000;
    }else if(dateDiff == 2){
        //納期の2日後の場合
        addPrice = 45000;
    }else if(dateDiff == 1){
        //納期の1日後の場合
        addPrice = 50000;
    }
    //基本料金(税込)を返す
    return incTax(30000 + addPrice);
}




