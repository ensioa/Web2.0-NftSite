(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-ClassiGood-ClassiGood"],{"04db":function(t,e,a){var o=a("dd87");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=a("4f06").default;i("7f4872a4",o,!0,{sourceMap:!1,shadowMode:!1})},"2c4b7":function(t,e,a){"use strict";a.r(e);var o=a("befd"),i=a.n(o);for(var n in o)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(n);e["default"]=i.a},"3be4":function(t,e,a){"use strict";var o=a("04db"),i=a.n(o);i.a},"433a":function(t,e,a){"use strict";a.r(e);var o=a("f4af"),i=a("2c4b7");for(var n in i)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(n);a("3be4");var r=a("f0c5"),s=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"aebc8052",null,!1,o["a"],void 0);e["default"]=s.exports},befd:function(t,e,a){"use strict";a("7a82");var o=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("ac1f"),a("5319");var i=a("4248"),n=o(a("e276")),r=o(a("7147")),s={data:function(){return{list:[],userInfo:{},bobao1:"记得恢复数据给我",categoryId:"",GoodsTimer:null,categoryItemData:"",chartData:{categories:["U1","U2","i9","U3","U4","U5","U6","U7","U8","U9","S1","S2","S3","S4","S5","S6","S7","S8","S9","H1","H2","H3","H4","H5","H6","H7","H8","H9"],series:[{name:"藏品价格",data:[8001,6999,6998,7006,7009,7102,7201,6999,7150,7230,7065,7099,6999,7035,7123,7231,7432,7321,7504,7514,7450,7650,7500,7635,7450,7430,7330,7200]}]},leisile:0,boll:null,index:0,opts:{update:!0,height:"300px",timing:"easeOut",animation:!1,duration:1e3,rotate:!1,rotateLock:!1,color:["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],padding:[15,10,0,15],fontSize:8,fontColor:"#666666",dataLabel:!1,dataPointShape:!1,dataPointShapeType:"solid",touchMoveLimit:60,enableScroll:!1,enableMarkLine:!0,legend:{show:!1,position:"bottom",float:"center",padding:5,margin:5,backgroundColor:"rgba(0,0,0,0)",borderColor:"rgba(0,0,0,0)",borderWidth:0,fontSize:13,fontColor:"#666666",lineHeight:11,hiddenColor:"#CECECE",itemGap:10},xAxis:{disabled:!0,disableGrid:!0,axisLine:!0,axisLineColor:"#CCCCCC",calibration:!1,fontColor:"#666666",fontSize:13,rotateLabel:!1,rotateAngle:45,itemCount:18,boundaryGap:"center",splitNumber:5,gridColor:"#CCCCCC",gridType:"solid",dashLength:4,gridEval:1,scrollShow:!1,scrollAlign:"right",scrollColor:"#A6A6A6",scrollBackgroundColor:"#EFEBEF",format:""},yAxis:{gridType:"dash",dashLength:2,disabled:!0,disableGrid:!0,splitNumber:15,gridColor:"#CCCCCC",padding:10,showTitle:!1,data:[]},extra:{line:{type:"curve",width:2},tooltip:{showBox:!0,showArrow:!0,showCategory:!1,borderWidth:0,borderRadius:0,borderColor:"#000000",borderOpacity:.7,bgColor:"#000000",bgOpacity:.7,gridType:"solid",dashLength:4,gridColor:"#CCCCCC",fontColor:"#FFFFFF",splitLine:!0,horizentalLine:!1,xAxisLabel:!1,yAxisLabel:!1,labelBgColor:"#FFFFFF",labelBgOpacity:.7,labelFontColor:"#666666"},markLine:{type:"solid",dashLength:4,data:[]}}}}},onLoad:function(t){uni.request({url:i.AipUrl+"/webApi/getConfig",header:{"custom-header":"hello"},success:function(t){}}),this.categoryId=t.categoryId,this.getCategoryFoodList(this.categoryId)},onShow:function(){},onUnload:function(){this.$options.GoodsTimer&&clearTimeout(this.$options.GoodsTimer),this.$options.GoodsTimer=null,console.log("onUnload function 关闭classi定时器")},onHide:function(){console.log("执行onhide function"),this.$options.GoodsTimer&&clearTimeout(this.$options.GoodsTimer),this.$options.GoodsTimer=null},methods:{gotoXQ:function(t,e){uni.navigateTo({url:"../goods/goods?id="+t+"&categoryId="+this.categoryId+"&imgUrl="+e})},goToBack:function(){uni.switchTab({url:"/pages/index/index"})},getCategoryFoodList:function(t){var e=this;uni.request({url:i.AipUrl+"/webApi/getCategoryFoodList",header:{"custom-header":"hello"},data:{categoryId:t},method:"POST",success:function(t){for(var a=0;a<t.data.data.length;a++){var o=(t.data.data[a].nowPrice[29]-t.data.data[a].stratPrice)/t.data.data[a].stratPrice;t.data.data[a].bai=o.toFixed(2);var i=t.data.data[a].imgUrl.replace(/\\/g,"/");t.data.data[a].imgUrl=i}e.list=t.data.data,e.categoryItemData=t.data.categoryChartData;var n=t.data.categoryChartData.nowPrice,r={name:"藏品价格",data:n},s=[r];e.$set(e.chartData,"series",s)}})},getGoodsTimer:function(t){var e=this;this.$options.GoodsTimer=setTimeout((function(){e.getCategoryFoodList(t),console.log("定时器ing")}),2e3)}},components:{uniNoticeBar:r.default,qiunDataCharts:n.default}};e.default=s},dd87:function(t,e,a){var o=a("24fb");e=o(!1),e.push([t.i,".nav[data-v-aebc8052]{box-sizing:border-box;width:%?750?%;height:%?100?%;display:flex;border-bottom:1px solid #ccc}.nav .rightBox[data-v-aebc8052],\n.nav .leftBox[data-v-aebc8052]{flex:1;position:relative}.nav .rightBox uni-image[data-v-aebc8052],\n.nav .leftBox uni-image[data-v-aebc8052]{display:block;position:absolute;left:50%;top:50%;margin-left:%?-30?%;margin-top:%?-30?%}.nav .centenBox[data-v-aebc8052]{flex:5;text-align:center;line-height:%?100?%;font-size:%?32?%;opacity:1;font-weight:600}.content[data-v-aebc8052]{width:%?750?%}.content .cateItemInfo[data-v-aebc8052]{margin-top:%?40?%;margin-bottom:%?40?%;width:%?710?%;height:%?90?%;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:%?32?%;font-weight:600}.content .cateItemInfo .cateItemInfo_Name[data-v-aebc8052]{padding-bottom:%?23?%;font-size:%?50?%}.content .cateItemInfo .cateItemInfo_Price[data-v-aebc8052]{font-size:%?40?%}.content .itemBox[data-v-aebc8052]{margin-top:%?40?%;margin-left:%?20?%;width:%?710?%;height:%?90?%;display:flex}.content .itemBox .touX[data-v-aebc8052]{flex:1}.content .itemBox .touX uni-view[data-v-aebc8052]{margin-top:auto;width:%?90?%;height:%?90?%;border-radius:%?20?%;overflow:hidden}.content .itemBox .touX uni-view uni-image[data-v-aebc8052]{width:100%;height:100%}.content .itemBox .itemName[data-v-aebc8052]{padding-left:%?20?%;box-sizing:border-box;flex:3}.content .itemBox .itemName uni-text[data-v-aebc8052]{font-size:%?32?%;font-weight:700;line-height:%?90?%}.content .itemBox .price[data-v-aebc8052]{flex:2;display:flex;flex-direction:column;justify-content:space-between}.content .itemBox .price uni-text[data-v-aebc8052]{display:block;text-align:right;flex:1}.content .itemBox .price .top[data-v-aebc8052]{font-size:%?32?%;font-weight:600}.content .itemBox .price .bottom[data-v-aebc8052]{box-sizing:border-box;text-align:right;color:#64c079}",""]),t.exports=e},f4af:function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"content"},[o("v-uni-view",{staticClass:"nav"},[o("v-uni-view",{staticClass:"leftBox"},[o("v-uni-image",{staticClass:"image2",staticStyle:{width:"50rpx",height:"50rpx"},attrs:{src:a("abd5")},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goToBack.apply(void 0,arguments)}}})],1),o("v-uni-view",{staticClass:"centenBox"},[t._v("Fortis Numbers")]),o("v-uni-view",{staticClass:"rightBox"})],1),o("v-uni-view",{staticClass:"cateItemInfo"},[o("v-uni-view",{staticClass:"cateItemInfo_Name"},[t._v(t._s(t.categoryItemData.name))]),o("v-uni-view",{staticClass:"cateItemInfo_Price"},[t._v("市值: ￥"+t._s(t.categoryItemData.nowPrice[t.categoryItemData.nowPrice.length-1]))])],1),o("qiunDataCharts",{attrs:{type:"line",height:"600px",opts:t.opts,chartData:t.chartData,ontouch:!0,animation:!1},on:{scrollRight:function(e){arguments[0]=e=t.$handleEvent(e),t.scrollRight.apply(void 0,arguments)}}}),t._l(t.list,(function(e,a){return o("v-uni-view",{key:e._id,staticClass:"itemBox",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.gotoXQ(e._id,e.imgUrl)}}},[o("v-uni-view",{staticClass:"touX"},[o("v-uni-view",[o("v-uni-image",{attrs:{src:e.imgUrl}})],1)],1),o("v-uni-view",{staticClass:"itemName"},[o("v-uni-text",[t._v(t._s(e.name))])],1),o("v-uni-view",{staticClass:"price"},[o("v-uni-text",{staticClass:"top",style:e.bai>0?"color: red;":"color: #64C079;"},[t._v("￥"+t._s(e.nowPrice[e.nowPrice.length-1]))]),o("v-uni-text",{staticClass:"bottom",style:e.bai>0?"color: red;":"color: #64C079;"},[t._v(t._s(e.bai)+"%")])],1)],1)}))],2)},i=[]}}]);