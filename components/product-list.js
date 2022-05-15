Vue.component('porduct-list',{
  template: `
  <div class="container">
    <product-header
      v-bind:count="filteredList.length"
      v-bind:showSaleItem="showSaleItem"
      v-bind:showDelvFree="showDelvFree"
      v-bind:sortOrder="sortOrder"
      v-on:showSaleItemChanged="showSaleItem=!showSaleItem"
      v-on:showDelvFreehanged="showDelvFree=!showDelvFree"
      v-on:sortOrderChanged="sortOrderChanged"
    >
    </product-header>
    <div class="list">
    <product
     v-for="product in filteredList"
     v-bind:product="product"
     v-bind:key="product.id">
     </product>
    </div>
  </div>`,
  component:{
      'product-header':productHeader,
      'product' : product
  },
  props: ['products'],
  data: function(){
      return{
          //セール対象のチェック状態
          showSaleItem: false,
          //送料無料のチェック状態
          showDelvFree: false,
          //並び替えの選択値
          sortOrder: 1
      }
  },
  methods:{
      //並び替えの選択値が変わった時に呼び出されるメソッド
      sortOrderChanged: function(order){
          //現在の選択値を新しい選択値で上書きする
          this.sortOrder = order;
      }
  },
  computed:{
      //絞り込み後の商品リストを返す算出プロパティ
      filteredList: function(){
          //絞り込み後の商品リストを格納する新しい配列
          var newList = [];
          for(var i = 0; i < this.products.length; i++){
              //表示対象かどうかを判定するロジック
              var isShow = true;
              //i番目の商品が表示対象かどうかを判定する
              if(this.showSaleItem && !this.products[i].isSale){
                  //セール対象チェック有で、セール対象商品ではない場合
                  isShow = false;
              }
              if(this.showDelvFree && this.products[i].delv > 0){
                  //送料無料チェック有で、送料有の商品の場合
                  isShow = false;
              }
              //表示対象の商品だけでを新しい配列に追加する
              if(isShow){
                  newList.push(this.products[i]);
              }
            }
              //新しい配列を並び替える
              if(this.sortOrder == 1){
                  //元の順番にpushしているので並び替え済み
              }
              else if(this.sortOrder == 2){
                  //価格が安い順に並び替える
                  newList.sort(function(a,b){
                      return a.price - b.price;
                  });
              }
              //絞り込み後の商品リストを返す
            return newList;
      }
  }
});