<template >
  <div id="app" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="i-head">
      <div class="shadowMask" v-bind:style="{ opacity:game.key1>0.5?0.5:game.key1 }"></div>
        <div class="head_main">
          <div class="i-weather" id="i-weather">
            <a href="http://inews.ifeng.com/weather.shtml#/home">
              <div class="i-weather-l">
                <span class="i-weather-icon">
                   {{weather.temperature}}°
                </span>
              </div>
              <div class="i-weather-r">
                <p>
                  天气预报
                </p>
                <span>{{weather.condition}}</span><span style="margin-left:.05rem">空气{{weather.air}}</span>
              </div>
            </a>
          </div>
          <div class="ad">
             <img src="http://p1.ifengimg.com/32d763abbcb53dee/2017/47/banner-ad.png" alt="">
          </div>
          <!-- 搜索 -->
            <div class="i_searchs" v-bind:style="{ opacity:game.key1<0.7?1:game.key1<0.9?1-(game.key1-0.7)*5:0,transform:'scale('+(game.key1<0.7?1:game.key1<0.9?1-(game.key1-0.7)/5:0)}">
                <div class="search">
                        <span class="icon"></span>
                        <form id="searchForm" name="searchform" action="" method="post">
                            <input type="search" id="search" ref="searchInput" name="search" placeholder="请输入搜索关键词" v-model = searchData>
                            <span class="text" @click="searchResult()"></span>
                        </form>
                </div>
            </div>
        </div>
        <swipe class="my-swipe1" ref="mySwipe1" @change="changeSwipe" :auto="0" :continuous="true" :show-indicators="true" v-bind:style="{ opacity:game.key1<0.45?1:game.key1<0.7?1-(game.key1-0.45)*4:0,transform:'scale('+(game.key1<0.45?1:game.key1<0.7?1-(game.key1-0.45)/5:0)+')' }">
            <swipe-item v-for="(item,index) in navData" :key="index">
                <ul><li v-for="(nav,index) in item" :key="index"><a :href="nav.url"><img :src="nav.coverUrl"><span>{{ nav.title }}</span></a></li></ul>
            </swipe-item>
        </swipe>
        <swipe class="my-swipe2" ref="mySwipe2" @change="changeSwipe" :auto="3000" :continuous="true" :show-indicators="false" v-bind:style="{ opacity:game.key1>0.4?0:1-game.key1*2.5,transform:'scale('+(game.key1>0.4?0.92:1-game.key1/5)+')' }">
            <swipe-item v-for="(item,index) in swiperData" :key="index">
                <a :href="item.link?item.link.weburl:'http://share.iclient.ifeng.com/shareNews?ch=qd_sdk_dl1&aid='+item.documentId">
                <img v-lazy="item.thumbnail.indexOf('.webp') != -1 ? item.thumbnail.replace('.webp','').replace('_webp',''):item.thumbnail"/>
                <p class="slideTitle"> {{item.title}}</p>
                <span class="slideNum"><span class="slideActive">{{index+1}}</span>/<span class="sildeLength">{{swiperData.length}}</span></span>
                </a>
            </swipe-item>
        </swipe>
    </div>
    <transition enter-active-class="navShow" leave-active-class="navHide" v-on:after-enter="navEnter" v-on:after-leave="navLeave">
          <div class="nav" v-show="game.navShow" :class="{ navOn:navOn }">
              <div class="navBox">
              <div class="navList" :style="{ width:1.2*listData.length*fontSize+'px' }">
                  <div v-for="(item,index) in listData" :class="{ navActive:game.listSelect==index }" :style="{ lineHeight: navOn?'0.78rem':'0.9rem',opacity: navOn?1:0,transitionDuration:'300ms',transitionDelay: 60*Math.abs(index-game.listSelect)+'ms' }" @click="changeNav(item.push,index)">{{ item.name }}</div>
              </div>
              </div>
              <div class="navMenu" @click="closeNav" @touchstart="closeNav"></div>
          </div>
    </transition>
       <!--top-->
        <div class="ifgToTop" id="ifgToTop">
            <a href = "javascript:scrollTo(0,0);"></a>
        </div>
        <div class="ifgHome" id="ifgHome">
            <a href="http://inews.ifeng.com/kuzhan.shtml#/"  title=""></a>
        </div>
        
        <!--160311a begin-->
    <router-view :game="game" :getHeight="getHeight" :listData="listData" ref="index" @data = "swipers" :fontSize="fontSize" :Navbian = "Navbian"/></router-view>
</div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe';
import VueLazyload from 'vue-lazyload';
import ifWeather from './utils/common'
import jsonp from './utils/jsonp';

export default {
  name: 'app',
    data () {
        return {
            navOn: 0,
            getHeight: 500,
            game: {startY:0,key1:0,navShow:0,readMode:0,listSelect:0},
            weather:{
                temperature:"",
                condition:"",
                air:""
            },
            location: 'bj',
            fontSize: 100,
            listData: [
                {name:'推荐',push:'tj',url:'https://api.irecommend.ifeng.com/irecommendList.php?gv=5.7.2&av=0&proid=ifengnews&os=ios_11.1.1&vt=5&screen=750x1334&publishid=4002&uid=516438983696452596f9695ed5a7ca6c&nw=wifi&loginid=76437432&token=4E53C74F382F3CE5F0419005DEDFB7A3user76437432&st=1511247769&sn=0ca41c8924642b9b0dc28138a063088f&action=auto&city=%E5%8C%97%E4%BA%AC%E5%B8%82&count=15&lastDoc=,,,&province=%E5%8C%97%E4%BA%AC%E5%B8%82&pullNum=1',channel:'irecommend',onOff:0},
                {name:'财经',push:'cj',url:'http://api.iclient.ifeng.com/ClientNews?id=CJ33,FOCUSCJ33,HNCJ33&gv=5.7.4&av=0&proid=ifengnews&os=ios_11.1&vt=5&screen=1125x2001&publishid=4002&uid=980a981e26fe40fa81fa1080d626b5e3&nw=wifi&loginid=62721830&token=300D73560C05F771539A94D038FED90AweixinoPhuSjoPodFKFK6zkG&st=1511431168&sn=b02dbb39bc4354993ce8dc0decf252da&pullNum=1&lastDoc=%2C%2C%2C',channle:'CJ33',onOff:0},
                {name:'体育',push:'ty',url:'https://api.iclient.ifeng.com/ClientNews?id=TY43,FOCUSTY43,TYLIVE,TYTOPIC&gv=5.7.4&av=0&proid=ifengnews&os=ios_11.0&vt=5&screen=1242x2208&publishid=4002&uid=18771d12463d4e76a508c420e454f371&nw=wifi&st=1511851258&sn=9233bf310d6a3fd54475c0a9a7f2748a&pullNum=1',channel:'TY43',onOff:0},
                {name:'科技',push:'kj',url:'http://api.iclient.ifeng.com/ClientNews?id=KJ123,FOCUSKJ123&gv=5.7.4&av=0&proid=ifengnews&os=ios_11.1&vt=5&screen=1125x2001&publishid=4002&uid=980a981e26fe40fa81fa1080d626b5e3&nw=wifi&loginid=62721830&token=300D73560C05F771539A94D038FED90AweixinoPhuSjoPodFKFK6zkG&st=1511431583&sn=94fcca7a75b5d95932e4763f919568c5&pullNum=1&lastDoc=%2C%2C%2C',channel:'KJ123',onOff:0},
                {name:'娱乐',push:'yl',url:'https://api.iclient.ifeng.com/ClientNews?id=YL53,FOCUSYL53&gv=5.7.4&av=0&proid=ifengnews&os=ios_11.1&vt=5&screen=1125x2001&publishid=4002&uid=980a981e26fe40fa81fa1080d626b5e3&nw=wifi&loginid=62721830&token=300D73560C05F771539A94D038FED90AweixinoPhuSjoPodFKFK6zkG&st=1511332380&sn=fd85bb970580b26e812cdb6c969f6f6f&pullNum=1&lastDoc=%2C%2C%2C',channel:"YL53",onOff:0},
                {name:'美女',push:'mn',url:'https://api.3g.ifeng.com/clientShortNews?type=beauty&gv=5.7.4&av=0&proid=ifengnews&os=ios_11.1&vt=5&screen=1125x2001&publishid=4002&uid=980a981e26fe40fa81fa1080d626b5e3&nw=wifi&loginid=62721830&token=300D73560C05F771539A94D038FED90AweixinoPhuSjoPodFKFK6zkG&st=1512099391&sn=050617069728e04067ccef044e722126',channel:"",onOff:0},
            ],
            navData: [],
            swiperData: [],
            searchData:'',
            Navbian:{
                blone:true,
                name:'kz_tj_cb'
            },
            scrolltop:document.body.scrollTop || document.documentElement.scrollTop
        }
    },
    components:{
        Swipe,
        SwipeItem
    },
    mounted: function() {

        this.getWeather()
        this.topicImg()
        this.getIcon()

        // getRegionCookie('weather_city')
        this.resize()
        let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
        if (!document.addEventListener) return;
        window.addEventListener(resizeEvent, this.resize, false);
        document.addEventListener('DOMContentLoaded', this.resize, false);

        let hot = [];
        let hotUrl = "http://api.m.sm.cn/rest?method=tools.hot&size=0&from=wm818445";
          jsonp(hotUrl, "", "callback", (data) => {
                data.forEach((item,index)=>{
                    hot.push(item.title)
                    var index = Math.floor((Math.random()*hot.length));
                    this.searchData = hot[index]
                })
          });
        window.addEventListener('scroll', this.ifgToTop);
    },
    methods:{

        swipers(...data){
            data[0].forEach((item,index)=>{
                if(item.type == "advert"){
                    data[0].splice(index,1)
                }
            })
            

            this.swiperData = data[0]
        },
        topicImg(){
            let url = "http://api.iclient.ifeng.com/ClientNews?id=SYLB10,SYDT10"
            jsonp(url, "", "callback", (data) => {
                this.swiperData = data[1].item
            });
        },

        SplitArray(N,Q){
            var R = [],F;
            for (F = 0;F < Q.length;) R.push(Q.slice(F,F += N))
            return R
        },
        getIcon(){
            let url = "https://ad.ifeng.com/promote/coolsite/getNewsList?type=coolsite.data.list.search.exchange&uid=123&page=0&size=100&callback=window.jsonp.cb1"

            jsonp(url, "", "callback", (data) => {

                this.navData = this.SplitArray(5,data.arr)
                
            });
        },
        changeSwipe() {
            
        },
        searchResult(){
            jsonp('http://stadig.ifeng.com/actsta.js?datatype=wap_act&value=kz_search&uri=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&ref=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&uid=1508323155475_rfg951400&sid=81A5F57EE82DA9925C9EE026297DC363user69404601&time=1512632458194&ci=%2Fwap%2Fhuandengtu%2F&pt=photo', "", "callback", (data) => {
                });

            if(!this.$refs.searchInput.value) return

            window.location.href = 'http://yz.m.sm.cn/s?from=wm818445&q='+this.$refs.searchInput.value
        },
        getWeather(){
            let url = "http://3g.ifeng.com/newH5Weather?key=weather&value="+ifWeather.getcity[this.location]+"&callback=jsonp_1511429951834_24302"
            jsonp(url, "", "callback", (data) => {
                this.weather.condition = ifWeather.phenomena.data[data.data.observe[data.data.areaCode]['1001002']["001"]].ch_name
                console.log(ifWeather.phenomena.data[data.data.observe[data.data.areaCode]['1001002']["001"]].ch_name) //天气情况
                this.weather.temperature = data.data.observe[data.data.areaCode]['1001002']["002"]
                console.log(data.data.observe[data.data.areaCode]['1001002']["002"]) //温度
                this.weather.air = ifWeather.aqi[ifWeather.aqiRange(data.data.air[data.data.areaCode]['2001006']['002'])].category
                console.log(ifWeather.aqi[ifWeather.aqiRange(data.data.air[data.data.areaCode]['2001006']['002'])].category)//空气质量
            });
        },
        resize() {
            let _root = document.documentElement,clientWidth = _root.clientWidth,
                fontSize = 10*10;
            if (!clientWidth) return;
            if(clientWidth < 1080) {
                fontSize = 100*(clientWidth / 750);
            } else {
                fontSize = 100*(clientWidth / 750);
            }
            _root.style.fontSize = fontSize + 'px';
            this.fontSize = fontSize;
            this.getHeight = fontSize*7.56;
        },
        touchStart(e) {
            if(!this.game.readMode)this.game.startY = e.targetTouches[0].pageY;
        },
        touchMove(e) {
            
            if(!this.game.readMode) {
                e.preventDefault();
                let diff = this.game.startY - e.targetTouches[0].pageY;
                if (diff > 0) {
                    this.game.key1 = Math.pow(diff, 1.04) / this.getHeight;
                    if (this.game.key1 > 1) {
                        this.game.key1 = 1;
                        this.game.readMode = 1;
                        this.game.navShow = 1;
                        jsonp('http://stadig.ifeng.com/actsta.js?datatype=wap_act&value=kz_push&uri=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&ref=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&uid=1508323155475_rfg951400&sid=81A5F57EE82DA9925C9EE026297DC363user69404601&time=1512632458194&ci=%2Fwap%2Fhuandengtu%2F&pt=photo', "", "callback", (data) => {
                        });
                        var jsonpNode = document.getElementById('jsonpid');
                        document.body.removeChild(jsonpNode)

                    }
                }
            }
        },
        touchEnd() {
            this.game.startY = 0;
            if (this.game.key1 < 0.2) {
                this.game.key1 = 0;
            }
            else if(this.game.key1!==1){
                this.game.key1 = 1;
                this.game.readMode = 1;
                jsonp('http://stadig.ifeng.com/actsta.js?datatype=wap_act&value=kz_push&uri=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&ref=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&uid=1508323155475_rfg951400&sid=81A5F57EE82DA9925C9EE026297DC363user69404601&time=1512632458194&ci=%2Fwap%2Fhuandengtu%2F&pt=photo', "", "callback", (data) => {
                });
                var jsonpNode = document.getElementById('jsonpid');
                document.body.removeChild(jsonpNode)
            }
            /*else{
                document.body.style.overflowY = 'auto';
                document.body.style.height = 'auto';
                document.documentElement.style.height = 'auto';
            }*/
        },
        navEnter(){
            this.navOn = 1;
            document.body.style.overflowY = 'auto';
            document.body.style.height = 'auto';
            document.documentElement.style.height = 'auto';
        },
        navLeave(){
            this.game.key1 = 0;
            this.game.readMode = 0;
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100%';
            document.documentElement.style.height = '100%';
        },
        changeNav(push,index){
            jsonp('http://stadig.ifeng.com/actsta.js?datatype=wap_act&value=kz_'+push+'&uri=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&ref=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&uid=1508323155475_rfg951400&sid=81A5F57EE82DA9925C9EE026297DC363user69404601&time=1512632458194&ci=%2Fwap%2Fhuandengtu%2F&pt=photo', "", "callback", (data) => {
            });
            this.game.listSelect = index;
            this.$refs.index.getList('default');
            this.listData[index].onOff ++;
            this.Navbian.blone = !this.Navbian.blone;
            this.Navbian.name = `kz_${push}_cb`;
        },
        closeNav() {
            if(this.navOn === 1) {
                this.navOn = 0;
                jsonp('http://stadig.ifeng.com/actsta.js?datatype=wap_act&value=kz_return&uri=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&ref=http%3A%2F%2Finews.ifeng.com%2F53939506%2Fnews.shtml%3Fch%3Difengweb_2014%23imgnum%3D1&uid=1508323155475_rfg951400&sid=81A5F57EE82DA9925C9EE026297DC363user69404601&time=1512632458194&ci=%2Fwap%2Fhuandengtu%2F&pt=photo', "", "callback", (data) => {
                });
                var jsonpNode = document.getElementById('jsonpid');
                document.body.removeChild(jsonpNode)
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                this.game.navShow = 0;
                document.body.style.overflowY = 'hidden';
                document.body.style.height = '100%';
                document.documentElement.style.height = '100%';
            }
        },
        getScrollTop(){
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop 
        },
        getClientHeight(){
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            } else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }
            return clientHeight;
        },
        getScrollHeight(){
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        },
        ifgToTop(){
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            if (st < this.scrolltop && st != 0) { 
                    document.getElementById("ifgToTop").style.display = "block";
                    document.getElementById("ifgHome").style.display = "block";
                    //document.getElementById("ifgDown").style.display = "block";
            } else {
                    document.getElementById("ifgToTop").style.display = "none";
                    document.getElementById("ifgHome").style.display = "none";
                    //document.getElementById("ifgDown").style.display = "none";
            }
            this.scrolltop = st;
        }
    }
}

</script>
<style lang="less" src="./assets/common.less"></style>
<style>
    html{width:100%;height: 100%;}
    body{overflow-y: hidden;height: 100%;}
    .i-head{ position: fixed;left: 0;top: 0;width: 100%;height: 8.34rem;}
    .shadowMask{ position: absolute;width: 100%;height: 100%;left: 0;top: 0;z-index: 998;background: #000;opacity: 0;pointer-events: none;}
    .slideTitle{
        position: absolute;
        bottom: .1rem;
        font-size: .36rem;
        left: .1rem;
        width: 85%;
        height: .5rem;
        line-height: .51rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color: white;
        z-index: 3;
    }
    .slideNum{
        position: absolute;
        bottom: 0.1rem;
        font-size: .36rem;
        right: .1rem;
        color: white;
        z-index: 2;
    }
    .slideActive{
        color: red;
        font-size: .46rem;
        margin-right :0.06rem;
    }
    .sildeLength{
        margin-left :0.06rem;
        font-size: .28rem;
    }
    .my-swipe1{width: 100%;height: 2.2rem;}
    .my-swipe1 .mint-swipe-item{}
    .my-swipe1 ul{width: 100%;padding-top: .3rem;}
    .my-swipe1 li{float:left;width: 20%;}
    .my-swipe1 li a{display: block;margin: 0 auto;width: .88rem;}
    .my-swipe1 li img{width: .68rem;height: .68rem;margin: 0 auto;border-radius: .12rem;}
    .my-swipe1 li span{text-align:center;color: #1A1A1A;margin-top:.1rem;display:block;font-size: .22rem;width: .88rem;line-height:.26rem;height:.28rem;overflow: hidden;white-space: nowrap;}
    .my-swipe1 .mint-swipe-indicator{opacity:1;background: #D8D8D8;}
    .my-swipe1 .mint-swipe-indicator.is-active{background: #F54343;}

    .my-swipe2 {width: 93%;margin:0 auto;height: 3.5rem;}
    .my-swipe2 img{width: 100%;height:100%;object-fit: cover;}
    .my-swipe2 .mint-swipe-item:after{ content: ""; position: absolute; width: 100%; left: 0; bottom: 0; height: 30%; display: block; background: url(http://p2.ifengimg.com/29b92e35b2b20708/2016/47/ifengnews_focus.png) repeat-x 50% bottom/100% auto;}

    /*top*/
    .ifgToTop{ width:.8rem; height:.8rem; position:fixed; right:3%; bottom:270px; display:none; background:url(./assets/kz_top.png) no-repeat; background-size:.8rem .8rem; z-index:9996}/*170316a*/
    .ifgToTop a{ width:.8rem; height:.8rem; display:block;}
    .ifgHome{ width:.8rem; height:.8rem; position:fixed; right:3%; bottom:220px; display:none; background:url(./assets/kz_refsh.png) no-repeat; background-size:.8rem .8rem;z-index:9996;}/*170316a*/
    .ifgHome a{ width:.8rem; height:.8rem; display:block;}
    .ifgHome .num{display:block;position:absolute;width:16px;height:16px;background:#f54343;border-radius:50%;top:-3px;right:-5px;color:#fff;line-height:16px;text-align:center}
    .ifgDown{width:40px; height:40px; position:fixed; right:3%; bottom:170px; display:none; background:url(http://p0.ifengimg.com/29b92e35b2b20708/2017/49/app_down.png) no-repeat; background-size:40px 40px;z-index:9996;}
    .ifgDown a{width:40px; height:40px; display:block;}
</style>