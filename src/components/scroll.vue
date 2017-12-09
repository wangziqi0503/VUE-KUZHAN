<template lang="html">
	<div class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
		<section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
			<header class="pull-refresh">
				<slot name="pull-refresh">
					<span class="down-tip">下拉更新</span>
					<span class="up-tip">松开刷新数据</span>
					<span class="refresh-tip">加载中……</span>
				</slot>
			</header>
		    <div class="tips" style="display:none">为您推荐{{news}}条更新</div>
			<slot>
			</slot>
			<footer class="load-more">
				<slot name="load-more">
					<span v-show="downFlag === false">上拉加载更多</span>
					<span v-show="downFlag === true">加载中……</span>
				</slot>
			</footer>
			
	        <div class="footer" v-if="game.readMode">
	              <img src="http://p3.ifengimg.com/29b92e35b2b20708/2017/49/footer.6c9374a.png" />
	              <a href="http://i.ifeng.com/" target="_blank" class="btn">
	                  <img src="http://p3.ifengimg.com/29b92e35b2b20708/2017/49/footer-btn.8700675.png" />
	              </a>
	        </div>
		</section>
	</div>
</template>
<style lang="less">
.yo-scroll {
    position: relative;
    overflow: auto;
    z-index: 100;
    width: 100%;
    height: auto;
    -webkit-overflow-scrolling: touch;
    .inner {
        position: relative;
        width: 100%;
        height: auto;
        transition-duration: 300ms;
        .pull-refresh {
            position: absolute;
            background: #fff;
            left: 0;
            top: -1rem;
            width: 100%;
            height: 1rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
        }
        .pull-refresh:before{content: "";position: absolute;width: 100%;height: 5rem;background: #fff;left: 0;bottom: 100%;}
        .load-more {
            height: 1rem;
            line-height: 1rem;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            display: none;
        }
        .down-tip,
        .refresh-tip,
        .up-tip {
            display: none;
        }
        .up-tip:before,
        .refresh-tip:before {
            content: '';
            display: inline-block;
            width: 160px;
            height: 70px;
            background-size: 70% !important;
            position: absolute;
            top: 0;
            left: 20%;
        }
        // .up-tip:before {
        //     background: url(http://p0.ifengimg.com/32d763abbcb53dee/2017/46/down-logo.png) no-repeat center;
        // }
        // .refresh-tip:before {
        //     background: url(http://p0.ifengimg.com/32d763abbcb53dee/2017/46/refresh-logo.gif) no-repeat center;
        // }
    }
}

.yo-scroll.touch .inner {
    transition-duration: 0;
}

.yo-scroll.down .down-tip {
    display: block;
}

.yo-scroll.up .up-tip {
    display: block;
}

.yo-scroll.refresh .refresh-tip {
    display: block;
}

.footer{ position: relative;}
.footer img{width: 100%}
.footer .btn{position:absolute;left:23%;width: 54%;top:25%;}
</style>
<script>
	export default {
		props: {
            game:{
                startY:0,key1:0,navShow:0,readMode:0,listSelect:0
            },
            news:'',
			offset: {
				type: Number,
				default: 100 //默认高度
			},
			enableInfinite: {
				type: Boolean,
				default: true
			},
			enableRefresh: {
				type: Boolean,
				default: true
			},
			dataList: {
				default: false,
				required: false
			},
			onRefresh: {
				type: Function,
				default: undefined,
				required: false
			},
			onInfinite: {
				type: Function,
				default: undefined,
				require: false
			}
		},
		data() {
			return {
				top: 0,
				state: 0,
				startX: 0,
				startY: 0,
				touching: false,
				infiniteLoading: false,
				downFlag: false, //用来显示是否加载中
			}
		},
		methods: {
			touchStart(e) {
			    if(this.game.readMode){
                    //console.log(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
                    this.startY = e.targetTouches[0].pageY;
                    this.startX = e.targetTouches[0].pageX;
                    this.startScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    this.touching = true; //留着有用，不能删除

                    this.dataList.noFlag = false;
                    this.$el.querySelector('.load-more').style.display = 'block';
                }

			},
			touchMove(e) {
				if(!this.game.readMode || !this.enableRefresh || this.dataList.noFlag || !this.touching) {
					return
				}
				let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
				
				if(diff > 0) e.preventDefault()
				this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
				if(this.state === 2) { // in refreshing
					return
				}
				if(this.top >= this.offset) {
					this.top = this.offset
					this.state = 1
				} else {
					this.state = 0
				}

				let more = this.$el.querySelector('.load-more');
				if(!this.top && this.state === 0) {
					more.style.display = 'block';
				} else {
					more.style.display = 'none';
				}
			},
			touchEnd(e) {
				if(!this.game.readMode || !this.enableRefresh) {
					return
				}
				this.touching = false
				if(this.state === 2) { // in refreshing
					this.state = 2
					this.top = this.offset
					return
				}
				if(this.top >= this.offset) { // do refresh
					this.refresh()
				} else { // cancel refresh
					this.state = 0
					this.top = 0
				}

				//用于判断滑动是否在原地 ----begin
				let endX = e.changedTouches[0].pageX,
					endY = e.changedTouches[0].pageY,
					dy = this.startY - endY,
					dx = endX - this.startX;

				//如果滑动距离太短  
				if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
					console.log("滑动距离太短")
					return;
				}

				//--------end--------

				if(!this.enableInfinite || this.infiniteLoading) {
					return
				}

				let outerHeight = this.$el.clientHeight,
					innerHeight = this.$el.querySelector('.inner').clientHeight,
					scrollTop = this.$el.scrollTop,
					ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
					bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
				if(bottom <= this.offset && this.state === 0) {
					this.downFlag = true;
					this.infinite();
					
				} else {

					this.downFlag = false;

				}

			},
			refresh() {
				this.state = 2;
				this.top = this.offset;
				setTimeout(() => {
					this.onRefresh(this.refreshDone)
					
					this.$el.querySelector('.tips').style.display = 'none';
					
				}, 300);
			},
			refreshDone() {
				this.state = 0
				this.top = 0
				
				setTimeout(() => {
					this.$el.querySelector('.tips').style.display = 'block';		
				}, 100);
				
                setTimeout(() => {
					this.$el.querySelector('.tips').style.display = 'none';		
				}, 800);
				
			},
			infinite() {
				this.infiniteLoading = true

				setTimeout(() => {
					this.onInfinite(this.infiniteDone);
				}, 1000);
			},
			infiniteDone() {
				this.infiniteLoading = false
			}
		}
	}
</script>