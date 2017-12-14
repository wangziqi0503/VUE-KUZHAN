<template>
  <div class="hello" :style="{ transform: 'translate3d(0, ' + (1-game.key1)*fontSize*6.8 + 'px, 0)',transitionDuration: game.startY?'0ms':'300ms' }" @transitionend="transitionEnd">
      <Scroll :news="news" :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" :game="game" :offset="fontSize">
          
          <div v-for="(item,index) in listdata" class="innerBox" :data-key="item.documentId || item.id" v-if="item.type&&item.thumbnail&&item.thumbnail!=''" v-bind:class="{ pic_text:item.type=='doc' && (item.style && item.style.type!='slides') || item.type=='doc'&&!item.style || item.type == 'topic2' || item.type =='web',videoList:item.type=='phvideo'|| item.type == 'shortNews',itemsT:(item.style&&item.style.type=='slides')||item.type=='slide',livingList:(item.type=='living' || item.type=='text_live'), flash : item.type == 'flash',AutoHeight:item.type == 'shortNews'}">

              <a v-if="item.documentId || item.cid" :href="game.listSelect!=5? item.type =='text_live' || item.type == 'web'?item.link.weburl : item.type=='phvideo'?'http://m.ifeng.com/sfnews?guid='+item.link.url+'&channel='+ listData[game.listSelect].channel:item.type == 'shortNews' ? 'http://share.iclient.ifeng.com/shareNews?ch=qd_sdk_dl1&aid='+item.id:item.documentId.indexOf('cmpp')>-1||item.documentId.indexOf('imcp')>-1?'http://share.iclient.ifeng.com/shareNews?ch=qd_sdk_dl1&aid='+item.documentId : 'http://ifenghuanghao.ifeng.com/'+item.documentId.substring(4)+'/news.shtml':'javascript:void(0)'">
                  <div class="textBox" v-bind:class="{ one:item.title.length<12 }">

                      <h1 v-if = "typeof item.likes != 'number'">{{ item.title }}</h1>
                      <div v-if="(item.style&&item.style.type=='normal')|| (item.type=='doc' && item.style && item.style.type!='slides') || item.type=='doc'&&!item.style || (item.type=='topic2' && item.style)">
                          <span v-if="item.style && item.style.attribute" v-bind:class="{yaowen:item.style.attribute=='要闻',topic:item.style.attribute=='专题',dujia:item.style.attribute=='独家'}"></span>
                          <span v-if="item.source">{{ item.source }}</span>
                          <span v-if="item.comments&&item.comments>0">{{ item.comments }}评</span>
                          <span v-if="item.updateTime" :style="{display:'none'}">{{ item.updateTime.substring(5,16) }}</span>
                      </div>
                  </div>
                  <div class="imgBox">
                      <img v-if="!((item.style&&item.style.type=='slides')||item.type=='slide')"  v-lazy="typeof item.likes == 'number' ? getThumbnailUrl(item.thumbnail,'w385_h531'): item.type=='text_live'?getThumbnailUrl(item.thumbnail,'w330_h100') :getThumbnailUrl(item.thumbnail,'w349_h230')" />
                      <img v-if="(item.style&&item.style.type=='slides')||item.type=='slide'" v-for="(imgs,index) in item.style&&item.style.images"  v-lazy="imgs.indexOf('.webp') != -1 ? imgs.replace('.webp','').replace('_webp',''):imgs" />
                      <div v-if="item.type=='living' || item.type=='text_live'" class="l-tip"></div>
                      <div v-if="item.type=='phvideo'" class="v-btn"></div>
                      <div v-if="item.type=='phvideo'" class="v-time" v-html="(Math.floor(item.phvideo.length/60)<10?'0'+Math.floor(item.phvideo.length/60):Math.floor(item.phvideo.length/60))+':'+(item.phvideo.length%60<10?'0'+item.phvideo.length%60:item.phvideo.length%60)"></div>
                  </div>
                  <div class="descBox" v-if="item.type=='phvideo' || item.type=='slide' || (item.style && item.style.type == 'slides') || item.type =='text_live' || item.type =='living' ">
                      <span v-if="item.style && item.style.attribute" v-bind:class="{yaowen:item.style.attribute=='要闻',topic:item.style.attribute=='专题',dujia:item.style.attribute=='独家'}"></span>
                      <span v-if="(item.type=='living' || item.type=='text_live') && item.liveExt.status==='2'" class="playing">进行中</span>
                      <span v-if="item.source">{{ item.source }}</span>
                      <span v-if="item.comments&&item.comments>0">{{ item.comments }}评</span>
                      <span v-if="item.updateTime" :style="{display:'none'}">{{ item.updateTime.substring(5,16) }}</span>
                  </div>
              </a>
              <!-- <div v-else class="update">
                <div class="tips" >为您推荐{{news}}条更新</div>
              </div> -->
              <div v-else class="readMore" @click="onRefresh" >刚刚看到这里  点击刷新<img src="../assets/reload.png" /></div>
          </div>
          
      </Scroll>
  </div>
</template>

<script>
import Scroll from '../components/scroll';
import jsonp from '../utils/jsonp';
import {in_array} from '../utils/common';

export default {
  name: 'index',
  data () {
    return {
        counter: 1, //当前页
        num: 10, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: [], // 上拉更多的数据存放数组
        userId:'',
        scrollData:{
          noFlag: false //暂无更多数据显示
        },
        news:0,
        status:{action:"default",page:"1",beautyPage:"1"},
        arrays:[],
        exposureNum:1,
        totalNum:[
          [],[],[],[],[],[]
        ],
        firstSend:true,
        size:1
      }
  },
  mounted: function() {

      this.getList();
      let node = document.getElementsByClassName('innerBox')
          for(var i = 0; i < node.length; i++){
                this.onSendExposure(node[i],i)
          }
      window.addEventListener('scroll', this.handleScroll);
  },
  components:{
    Scroll
  },
  props:['game','listData','fontSize','Navbian'],
  methods:{
      transitionEnd() {
          if(this.game.key1===1)this.game.navShow = 1;
          else this.game.navShow = 0;
      },
      randomWord(randomFlag, min, max){
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
     
        // 随机产生
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            let pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
      },
      getNowFormatDate() {
          var date = new Date();
          var seperator1 = "-";
          var seperator2 = ":";
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                  + " " + date.getHours() + seperator2 + date.getMinutes()
                  + seperator2 + date.getSeconds();
          return currentdate;
      },
      getThumbnailUrl(url,size){
       if(url.indexOf("d.ifengimg.com")!=-1){
           url=url.split('/');
           url[3]=size;
           url="http://"+url.join("/");
       }else{
           url="http://d.ifengimg.com/"+size+"/"+url;
       }
       url = url.substring(7)
           return url;
      },
      _raf(e){
          return window.requestAnimationFrame(e)||window.webkitRequestAnimationFrame(e)||window.mozRequestAnimationFrame(e)||window.oRequestAnimationFrame(e)||window.msRequestAnimationFrame(e)||window.setTimeout(e, 1000 / 60)
      },
      getList(action) {
        
        if(action == "default"){
          this.status.page = 1
          this.status.action = "default"
        }else if(action == "up"){
          this.status.action = "up"
        }
        let urls = ""
        let ts = this.getNowFormatDate()
        this.userId = this.randomWord(false,32)
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if(this.game.listSelect == 0){
          urls = this.listData[this.game.listSelect].url+'&userId='+this.userId+'&action='+this.status.action+'&ts='+ts
        }else if(this.game.listSelect == 5){
          urls = this.listData[this.game.listSelect].url+'&uid='+this.userId+'&ts='+ts+'&page=' + this.status.beautyPage

        }else{
          urls = this.listData[this.game.listSelect].url+'&action='+this.status.action+'&ts='+ts
        }
        jsonp(urls, "", "callback", (data) => {
          if(Array.isArray(data)){
            if(data.length == 0){
              // this.getList()
            }else{
              data[0].item.forEach((item,index)=>{
                if(item.type == "advert"){
                  data[0].item.splice(index,1)
                }
              })
                let _this = this;
                this.listdata = [];
                this._raf(function () {
                    _this.listdata = data[0].item
                    _this.$emit('data',data[1].item)
                });
            }
          }else{
            if(data.count>0){
              data.item.forEach((item,index)=>{
                if(item.type == "advert"){
                  data.item.splice(index,1)
                }
              })
                let _this = this;
                this.listdata = [];
                this._raf(function () {
                    _this.listdata = data.item;
                });
            }else{
              if(data.body && data.body.length == 0){
                this.getList("default")
              }else{
                  let _this = this;
                  this.listdata = [];
                  this._raf(function () {
                      _this.listdata = data.body;
                  });
              }
            }
          }
            setTimeout(function () {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            },500)
        });
      },
      onRefresh(done) {
        let ts = this.getNowFormatDate()
        let adNum = 0,urls="",adsNum=0
        this.status.beautyPage++
        console.log(this.status.beautyPage)
        this.status.action = "down"
          urls = this.listData[this.game.listSelect].url+'&action='+this.status.action+'&ts='+ts
          if(this.game.listSelect == 0){
            urls = this.listData[this.game.listSelect].url+'&userId='+this.userId+'&action='+this.status.action+'&ts='+ts
          }else if(this.game.listSelect == 5){
            urls = this.listData[this.game.listSelect].url+'&uid='+this.userId +"&page=" + this.status.beautyPage +'&ts='+ts 

          }
          jsonp(urls, "", "callback", (data) => {
              let isShift = false
              if(urls.indexOf('beauty')!=-1){
                if(Array.isArray(data.body)){
                  if(data.body.length == 0){
                    this.onRefresh(done)
                  }else{
                    data.body.forEach((ite,index)=>{
                        this.listdata.unshift(ite)
                    })
                    setTimeout(function () {
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                    },500)
                    done(); // call done
                    this.news = data.body.length
                  }
                }

              }else{
              if(Array.isArray(data)){
                if(data.length == 0)
                  this.getList('up')
                else{
                  data[0].item.forEach((ite,index)=>{
                    if(ite.type == "advert"){
                      data[0].item.splice(index,1)
                      adNum++
                    }else{

                      if(!isShift){
                        this.listdata.forEach((ite,index)=>{
                          if(ite.type == 'flash'){
                            this.listdata.splice(index,1)
                          }
                        })
                        this.listdata.unshift({'type':'flash','thumbnail':'flash'})
                        
                        this.listdata.unshift(ite)
                        setTimeout(() => {
                           document.documentElement.scrollTop = 0;
                           document.body.scrollTop = 0;
                         
                          this.$el.querySelector('.tips').style.display = 'block';    
                        }, 100);
        
                        setTimeout(() => {
                          this.$el.querySelector('.tips').style.display = 'none';   
                        }, 3000);
                        isShift = true 
                      }else{
                        this.listdata.unshift(ite)
                      }
                    }
                  })
                  
                  if(!done.type) done();  // call done
                  
                  this.news = data[0].item.length - adNum
                }
              }else{
                if(data.count>0){
                  for(let i = 0; i < data.item.length; i++) {
                      if(data.item[i].type == "advert" ){
                        data.item.splice(i,1)
                        adsNum++
                      }else{
                        if(!isShift){
                          this.listdata.forEach((ite,index)=>{
                            if(ite.type == 'flash'){
                              this.listdata.splice(index,1)
                            }
                          })
                          this.listdata.unshift({'type':'flash','thumbnail':'flash'})
                          this.listdata.unshift(data.item[i])
                          setTimeout(() => {
                           document.documentElement.scrollTop = 0;
                           document.body.scrollTop = 0;
                         
                          this.$el.querySelector('.tips').style.display = 'block';    
                           }, 100);
        
                        setTimeout(() => {
                          this.$el.querySelector('.tips').style.display = 'none';   
                        }, 3000);
                          isShift = true 
                        }else{

                          this.listdata.unshift(data.item[i])
                        }
                      }  
                  }

                  this.news = data.item.length - adsNum
                }else{
                  this.getList('up')
                }
              }
              }
              this.$el.querySelector('.load-more').style.display = 'none';
              setTimeout(function () {
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
              },500)

              if(!done.type) done();  // call done
          });
        
      },
      onInfinite(done) {
          //console.log('向下加载')
          this.status.action = "up"
          this.status.page++
          this.status.beautyPage++
          let ts = this.getNowFormatDate()
          let urls = ""

          if(this.game.listSelect == 0){
            urls = this.listData[this.game.listSelect].url+'&userId='+this.userId+'&action='+this.status.action+'&ts='+ts
          }else if(this.game.listSelect == 5){
          urls = this.listData[this.game.listSelect].url+'&uid='+this.userId+'&ts='+ts+'&page='+this.status.beautyPage

          }else{
            urls = this.listData[this.game.listSelect].url+'&action='+this.status.action+'&ts='+ts
          }

          jsonp(urls, "", "callback", (data) => {
              if(urls.indexOf('beauty')!=-1){
                if(Array.isArray(data.body)){
                  
                  if(data.body.length == 0){
                    console.log('数据为空')
                    this.onInfinite(done)
                    //this.$el.querySelector('.load-more').style.display = 'none';
                    //return false
                  }else{
                    data.body.forEach((item,index)=>{
                      
                        this.listdata.push(item)
                      
                    })
                  }
                }
              }else{
                if(Array.isArray(data)){
                  //console.log('数组')
                  if(data.length == 0){
                    
                    this.getList('up')
                  }else{
                    data[0].item.forEach((item,index)=>{
                      if(item.type == "advert"){
                        data[0].item.splice(index,1)
                      }else{
                        this.listdata.push(item)
                      }
                    })
                  }
                }else{
                  console.log('非数组')
                  if(data.count>0){
                    for(let i = 0; i < data.item.length; i++) {
                      if(data.item[i].type == "advert"){
                        data.item.splice(index,1)
                      }else{
                        this.listdata.push(data.item[i])
                      }
                    }
                  }else{
                    this.getList('up')
                  }

                }
              }
              this.$el.querySelector('.load-more').style.display = 'none';
          });
          done();
      },
      onSendExposure(){
          //console.log(ele,index)
          var sTop = document.body.scrollTop||document.documentElement.scrollTop;; 
          var viewHight = document.documentElement.clientHeight;
          var Active = document.getElementsByClassName('navActive')[0].innerText;

          if(sTop > viewHight + viewHight/2 ){
            this.firstSend = !this.firstSend
          }else{
            this.firstSend == true;
          }

          //console.log('第一次发送数据!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')


          if(this.firstSend == false){
             //console.log('开始第二次发送')
             //console.log('stop=====' + parseInt(sTop - (viewHight + viewHight/2)))
             var newStop = parseInt(sTop - (viewHight + viewHight/2))
             
             //console.log(newStop,viewHight,newStop % viewHight)

             if(!this.Navbian.blone){//判断是否切换频道

                    if(this.totalNum[this.game.listSelect].length != 0){//判断之前此频道是否发过曝光，避免重复发送
                       this.size = this.totalNum[this.game.listSelect].length + 1
                    }else{
                       this.size = 1
                    }
                    
                    this.Navbian.blone = !this.Navbian.blone

             }

             
             //曝光发送
             if(newStop > viewHight * this.size){//判断曝光发送区域
                  //console.log(`${this.Navbian.name}${this.size}`)
                  jsonp(`http://stadig.ifeng.com/actsta.js?datatype=wap_act&value=${this.Navbian.name}${this.size}&uri=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&ref=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&uid=1508323155475_rfg951400&sid=81A5F57EE82DA9925C9EE026297DC363user69404601&time=1512632458194&ci=%2Fwap%2Fhuandengtu%2F&pt=photo`, "", "callback", (data) => {
                  });
                  var jsonpNode = document.getElementById('jsonpid');
                  console.log(jsonpNode)
                  document.body.removeChild(jsonpNode);


                  this.totalNum[this.game.listSelect].push(this.size)
                  this.size ++ 
                      
              }
             // if(in_array(newStop,this.arrays)){

             // }
             
          }
         
      },
      handleScroll(){
          //let node = document.getElementsByClassName('innerBox');
          this.onSendExposure() 
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.flash{border: none !important}
.ss{border:none;}
.hello{ position: relative;left: 0;top:.78rem;z-index: 100;}
.update{margin: -.24rem 0;}
.update .tips{margin-top: 0}
.innerBox{ width:6.9rem;margin:0 auto; padding: .24rem 0; border-bottom: 1px solid #f4f4f4;}
.innerBox:after{ content: "";display: block;clear: both;}
.pic_text .textBox,.video_text .textBox{ float:left; width: 65%;}
.pic_text .textBox h1,.video_text .textBox h1{ margin-bottom: .14rem; font-size: 0.36rem; color: #1a1a1a; letter-spacing: 0; line-height: 0.48rem;}
.pic_text .textBox span,.video_text .textBox span{ font-size: 0.22rem; color: #999999; line-height: 0.4rem;margin-right: 0.1rem;}

/*角标*/
.innerBox .textBox span.yaowen,.video_text .descBox span.yaowen{margin-right: 0.1rem;width:.6rem;height:.26rem;background:url(http://p3.ifengimg.com/29b92e35b2b20708/2017/50/yaowen.png) no-repeat;background-size:cover;display:inline-block;vertical-align:middle;}
.innerBox .textBox span.dujia,.video_text .textBox span.dujia{margin-right: 0.1rem;width:.52rem;height:.26rem;background:url(http://p0.ifengimg.com/29b92e35b2b20708/2017/50/dujia.png) no-repeat;background-size:.51rem .25rem;display:inline-block;vertical-align:middle;}
.innerBox .textBox span.yuanchuang,.video_text .textBox span.yuanchuang{margin-right: 0.1rem;width:.52rem;height:.26rem;background:url(http://p0.ifengimg.com/29b92e35b2b20708/2017/50/yuanchuang.png) no-repeat;background-size:.51rem .25rem;display:inline-block;vertical-align:middle;}
.innerBox .textBox span.zhuanti,.video_text .textBox span.zhuanti{margin-right: 0.1rem;width:.52rem;height:.26rem;background:url(http://p0.ifengimg.com/29b92e35b2b20708/2017/50/zhuanti.png) no-repeat;background-size:.51rem .25rem;display:inline-block;vertical-align:middle;}
.innerBox .textBox span.zhiding,.video_text .textBox span.zhiding{margin-right: 0.1rem;width:.52rem;height:.26rem;background:url(http://p0.ifengimg.com/29b92e35b2b20708/2017/50/zhiding.png) no-repeat;background-size:.51rem .25rem;display:inline-block;vertical-align:middle;}


.pic_text .textBox span:nth-last-child(1),.video_text .textBox span:nth-last-child(1){margin-right: 0;}
.pic_text .one h1,.video_text .one h1{ line-height: .8rem;}
.pic_text .imgBox,.video_text .imgBox{ position: relative; float:right; width: 32.6%;background: #e3e3e3; height: 1.54rem; overflow: hidden;}
.pic_text .imgBox img,.video_text .imgBox img{width: 100%; height: 100%;}
.video_text .v-btn{ position:absolute;width:0.5rem;height:0.5rem;background:url(../assets/videoIco.png) no-repeat;top:0.35rem;left:50%;margin-left:-0.25rem;background-size:cover}
.video_text .v-time{ position: absolute; right: 0;bottom: 0; background: rgba(0,0,0,0.6); font-size: 0.12rem;color: #FFFFFF;line-height: 0.14rem; padding: 0.12rem 0.1rem 0.1rem;}
.itemsT .textBox h1,.videoList .textBox h1,.livingList .textBox h1{ width: 100%; line-height: .48rem; font-size: .36rem; overflow: hidden; color: #1a1a1a;}
.itemsT .descBox span,.videoList .descBox span,.livingList .descBox span{ font-size: 0.22rem; color: #999999; line-height: 0.4rem;margin-right: 0.1rem;}
.itemsT .imgBox,.videoList .imgBox{ display: flex; justify-content: space-between}
.itemsT .imgBox img{ float: left; margin: .16rem 0;width: 32.6%; height: 1.54rem; overflow: hidden;}
.itemsT .imgBox img:nth-last-child(1){margin-right: 0;}
.videoList .imgBox{ position: relative; width: 100%; margin: .16rem 0; height: 3.92rem; background: #e3e3e3;}
.AutoHeight .imgBox{ height: auto!important;}

.videoList img{ width: 100%; height: 100%; object-fit: cover;}
.videoList .v-btn{ position:absolute;width:1.11rem;height:1.11rem;background:url(../assets/videoIco.png) no-repeat;top:50%;left:50%;margin-left:-.555rem;background-size:1.11rem 1.1rem;margin-top:-.555rem;}
.videoList .v-time{ position: absolute; right: 0;bottom: 0; background: rgba(0,0,0,0.6); font-size: 0.26rem;color: #FFFFFF;width:.8rem;height:.34rem;line-height:.34rem;text-align:center;}

.livingList .imgBox{ position: relative; width: 100%; height: 2.1rem; margin: .16rem 0;}
.livingList img{ width: 100%;height: 100%;}
.livingList .l-tip{ position: absolute; right: 2.5%; top: 0.2rem; width: .76rem; height: .32rem; background: url(../assets/livingIco.png) no-repeat center/100% 100%;}
.livingList .playing{color: #F54343 !important;}

.readMore{ text-align: center; width: 100%; background: #F4F4F4; line-height: 0.72rem; font-size: 0.32rem; color: #3292F5;}
.readMore img{display: inline-block; width: .26rem; margin-left: .1rem; margin-bottom: -.02rem;}

.nav{ position: fixed; background: #fff; left: 0; top: 0; height: 0.78rem; width: 100%; border-bottom: 1px solid #D6D6D6; z-index: 99; margin-top: -1px;}
.navOn{ z-index: 999;}
.nav .navBox{width: 100%;height: 0.78rem;overflow-y: hidden;overflow-x: auto;}
.nav .navList{height: 0.78rem;padding-right: 1rem;}
.nav .navList:after{content: "";display: block;clear: both;}
.nav .navList div{float:left;position:relative;font-size: 0.3rem; color: #666;width:1.2rem;line-height: 0.78rem;height:0.78rem;text-align: center; cursor: pointer;}
.nav .navList .navActive{ color: #F54343; font-size: 0.36rem;}
.nav .navList .navActive:after{ content: "";position: absolute; left: 50%; bottom: -1px; margin-left: -.36rem; width: .72rem; height: 0.1rem; background: #F54343;}
.navMenu{ position: absolute; right: 0; top: 0; width: .8rem; height: .78rem; background:#fff url(../assets/nav-list.png) no-repeat 50% 60%/auto 60%;}

.navShow{-moz-animation:navShow 0.2s ease-in both;-webkit-animation:navShow 0.2s ease-in both;animation:navShow 0.2s ease-in both}
.navHide{z-index:1;-moz-animation:navHide 0.2s ease-in both;-webkit-animation:navHide 0.2s ease-in both;animation:navHide 0.2s ease-in both}
@-moz-keyframes navShow{from{-moz-transform:translateY(100%);transform:translateY(100%)}}
@-webkit-keyframes navShow{from{-webkit-transform:translateY(100%);transform:translateY(100%)}}
@keyframes navShow{from{-moz-transform:translateY(100%);-ms-transform:translateY(100%);-webkit-transform:translateY(100%);transform:translateY(100%)}}
@-moz-keyframes navHide{to{-moz-transform:translateY(100%);transform:translateY(100%)}}
@-webkit-keyframes navHide{to{-webkit-transform:translateY(100%);transform:translateY(100%)}}
@keyframes navHide{to{-moz-transform:translateY(100%);-ms-transform:translateY(100%);-webkit-transform:translateY(100%);transform:translateY(100%)}}

.tips{ z-index: 10; position: relative; left: 50%; margin-left: -2.1rem; margin-top:.3rem; text-indent:.2rem;  line-height: .68rem; width: 4.2rem; height: .74rem; text-align: center; color: #fff; background: url(../assets/tip.png) no-repeat center/100% 100%;}

</style>
