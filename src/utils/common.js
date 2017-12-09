
let ifWeather = {}

// 天气现象
ifWeather.phenomena = {
  data: {
    '00': {
      ch_name: '晴',
      en_name: 'Sunny',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w00.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w00.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg00.jpg'
    },
    '01': {
      ch_name: '多云',
      en_name: 'Cloud',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w01.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w01.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg01.jpg'
    },
    '02': {
      ch_name: '阴',
      en_name: 'Overcast',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w02.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w02.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg02.jpg'
    },
    '03': {
      ch_name: '阵雨',
      en_name: 'Shower',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w03.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w03.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '04': {
      ch_name: '雷阵雨',
      en_name: 'Thundershower',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w0405.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w0405.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0405.jpg'
    },
    '05': {
      ch_name: '雷阵雨伴有冰雹',
      en_name: 'Thundershower with hail',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w0405.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w0405.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0405.jpg'
    },
    '06': {
      ch_name: '雨夹雪',
      en_name: 'Sleet',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w06.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w06.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '07': {
      ch_name: '小雨',
      en_name: 'Light rain',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w07301.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w07301.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '08': {
      ch_name: '中雨',
      en_name: 'Moderate rain',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w0821.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w0821.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '09': {
      ch_name: '大雨',
      en_name: 'Heavy rain',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w0922.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w0922.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '10': {
      ch_name: '暴雨',
      en_name: 'Storm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w101112232425.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w101112232425.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '11': {
      ch_name: '大暴雨',
      en_name: 'Cloud',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w101112232425.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w101112232425.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '12': {
      ch_name: '特大暴雨',
      en_name: 'Severe storm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w101112232425.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w101112232425.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '13': {
      ch_name: '阵雪',
      en_name: 'Snow flurry',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w13.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w13.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '14': {
      ch_name: '小雪',
      en_name: 'Light snow',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w14304.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w14304.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '15': {
      ch_name: '中雪',
      en_name: 'Moderate snow',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1526.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1526.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '16': {
      ch_name: '大雪',
      en_name: 'Heavy snow',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1627.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1627.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '17': {
      ch_name: '暴雪',
      en_name: 'Snowstorm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1728.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1728.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '18': {
      ch_name: '雾',
      en_name: 'Foggy',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1832495758.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1832495758.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1832495758.jpg'
    },
    '19': {
      ch_name: '冻雨',
      en_name: 'Ice rain',
      ico: 'http://p2.ifengimg.com/a/2017/0426/w19.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w19.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '20': {
      ch_name: '沙尘暴',
      en_name: 'Duststorm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w2031.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w2031.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg20293031.jpg'
    },
    '21': {
      ch_name: '小到中雨',
      en_name: 'Light to moderate rain',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w0821.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w0821.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '22': {
      ch_name: '中到大雨',
      en_name: 'Moderate to heavy rain',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w0922.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w0922.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '23': {
      ch_name: '大到暴雨',
      en_name: 'Heavy rain to storm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w101112232425.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w101112232425.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '24': {
      ch_name: '暴雨到大暴雨',
      en_name: 'Storm to heavy storm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w101112232425.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w101112232425.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '25': {
      ch_name: '大暴雨到特大暴雨',
      en_name: 'Heavy to severe storm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w101112232425.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w101112232425.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '26': {
      ch_name: '小到中雪',
      en_name: 'Light to moderate snow',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1526.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1526.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '27': {
      ch_name: '中到大雪',
      en_name: 'Moderate to heavy snow',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1627.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1627.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '28': {
      ch_name: '大到暴雪',
      en_name: 'Heavy snow to snowstorm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1728.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1728.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    },
    '29': {
      ch_name: '浮尘',
      en_name: 'Dust',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w2930.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w2930.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg20293031.jpg'
    },
    '30': {
      ch_name: '扬沙',
      en_name: 'Sand',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w2930.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w2930.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg20293031.jpg'
    },
    '31': {
      ch_name: '强沙尘暴',
      en_name: 'Sandstorm',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w2031.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w2031.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg20293031.jpg'
    },
    '53': {
      ch_name: '霾',
      en_name: 'Haze',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w53545556.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w53545556.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg53545556.jpg'
    },
    '99': {
      ch_name: '无',
      en_name: 'Unknow',
      ico: '',
      bg: ''
    },
    '32': {
      ch_name: '浓雾',
      en_name: 'Dense fog',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1832495758.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1832495758.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1832495758.jpg'
    },
    '49': {
      ch_name: '强浓雾',
      en_name: 'Strong fog',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1832495758.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1832495758.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1832495758.jpg'
    },
    '54': {
      ch_name: '中度霾',
      en_name: 'Moderate haze',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w53545556.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w53545556.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg53545556.jpg'
    },
    '55': {
      ch_name: '重度霾',
      en_name: 'Severe haze',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w53545556.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w53545556.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg53545556.jpg'
    },
    '56': {
      ch_name: '严重霾',
      en_name: 'Severe haze',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w53545556.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w53545556.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg53545556.jpg'
    },
    '57': {
      ch_name: '大霾',
      en_name: 'Dense fog',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1832495758.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1832495758.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1832495758.jpg'
    },
    '58': {
      ch_name: '特强浓雾',
      en_name: 'Extra heavy fog',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w1832495758.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w1832495758.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1832495758.jpg'
    },
    '301': {
      ch_name: '雨',
      en_name: 'rain',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w07301.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w07301.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg0306070809101112192122232425301.jpg'
    },
    '302': {
      ch_name: '雪',
      en_name: 'snow',
      ico: 'http://p2.ifengimg.com/a/2017/0425/w14304.png',
      ico_blue:'http://p1.ifengimg.com/a/2017/0517/w14304.png',
      bg: 'http://p3.ifengimg.com/a/2017/0518/bg1314151617262728302.jpg'
    }
  }
};

ifWeather.getcity = {
  'bj':'北京',
  'sh':'上海',
  'tj':'天津',
  'cq':'重庆',
  'hb':'河北',
  'sx':'山西',
  'nmg':'内蒙古',
  'ln':'辽宁',
  'jl':'吉林',
  'hlj':'黑龙江',
  'js':'江苏',
  'zj':'浙江',
  'ah':'安徽',
  'fj':'福建',
  'jx':'江西',
  'sd':'山东',
  'hn':'河南',
  'hb':'湖北',
  'hn':'湖南',
  'gd':'广东',
  'gx':'广西',
  'hn':'海南',
  'sc':'四川',
  'gz':'贵州',
  'yn':'云南',
  'xz':'西藏',
  'sx':'陕西',
  'gs':'甘肃',
  'nx':'宁夏',
  'qh':'青海',
  'xj':'新疆',
  'hb_sjz':'石家庄',
  'hb_ts':'唐山',
  'hb_qhd':'秦皇岛',
  'hb_hd':'邯郸',
  'hb_xta':'邢台',
  'hb_bd':'保定',
  'hb_zjk':'张家口',
  'hb_cd':'承德',
  'hb_cz':'沧州',
  'hb_lf':'廊坊',
  'hb_hs':'衡水',
  'sx_ty':'太原',
  'sx_dt':'大同',
  'sx_yq':'阳泉',
  'sx_cz':'长治',
  'sx_jc':'晋城',
  'sx_sz':'朔州',
  'sx_jz':'晋中',
  'sx_yc':'运城',
  'sx_xz':'忻州',
  'sx_lf':'临汾',
  'sx_ll':'吕梁',
  'nmg_hhht':'呼和浩特',
  'nmg_bt':'包头',
  'nmg_wh':'乌海',
  'nmg_cf':'赤峰',
  'nmg_tl':'通辽',
  'nmg_hlbe':'呼伦贝尔',
  'nmg_eeds':'鄂尔多斯',
  'nmg_byze':'巴彦淖尔',
  'nmg_wlcb':'乌兰察布',
  'nmg_xa':'兴安盟',
  'nmg_xlgl':'锡林郭勒盟',
  'ln_sy':'沈阳',
  'ln_dl':'大连',
  'ln_as':'鞍山',
  'ln_fs':'抚顺',
  'ln_bx':'本溪',
  'ln_dd':'丹东',
  'ln_jz':'锦州',
  'ln_yk':'营口',
  'ln_fx':'阜新',
  'ln_ly':'辽阳',
  'ln_pj':'盘锦',
  'ln_tl':'铁岭',
  'ln_cy':'朝阳',
  'ln_hld':'葫芦岛',
  'jl_cc':'长春',
  'jl_jl':'吉林',
  'jl_sp':'四平',
  'jl_ly':'辽源',
  'jl_th':'通化',
  'jl_bs':'白山',
  'jl_sy':'松原',
  'jl_bc':'白城',
  'jl_yb':'延边',
  'hlj_heb':'哈尔滨',
  'hlj_qqhe':'齐齐哈尔',
  'hlj_jx':'鸡西',
  'hlj_hg':'鹤岗',
  'hlj_sys':'双鸭山',
  'hlj_dq':'大庆',
  'hlj_yc':'伊春',
  'hlj_jms':'佳木斯',
  'hlj_qth':'七台河',
  'hlj_mdj':'牡丹江',
  'hlj_hh':'黑河',
  'hlj_sh':'绥化',
  'hlj_dxal':'大兴安岭',
  'js_nj':'南京',
  'js_wx':'无锡',
  'js_xz':'徐州',
  'js_cz':'常州',
  'js_sz':'苏州',
  'js_nt':'南通',
  'js_lyg':'连云港',
  'js_ha':'淮安',
  'js_yc':'盐城',
  'js_yz':'扬州',
  'js_zj':'镇江',
  'js_tz':'泰州',
  'js_sq':'宿迁',
  'zj_hz':'杭州',
  'zj_nb':'宁波',
  'zj_wz':'温州',
  'zj_jx':'嘉兴',
  'zj_hzh':'湖州',
  'zj_sx':'绍兴',
  'zj_jh':'金华',
  'zj_qz':'衢州',
  'zj_zs':'舟山',
  'zj_tz':'台州',
  'zj_ls':'丽水',
  'ah_hf':'合肥',
  'ah_wh':'芜湖',
  'ah_bb':'蚌埠',
  'ah_hn':'淮南',
  'ah_mas':'马鞍山',
  'ah_hb':'淮北',
  'ah_tl':'铜陵',
  'ah_aq':'安庆',
  'ah_hs':'黄山',
  'ah_cz':'滁州',
  'ah_fy':'阜阳',
  'ah_sz':'宿州',
  'ah_ch':'巢湖',
  'ah_la':'六安',
  'ah_bz':'亳州',
  'ah_cz':'池州',
  'ah_xc':'宣城',
  'fj_fz':'福州',
  'fj_xm':'厦门',
  'fj_pt':'莆田',
  'fj_sm':'三明',
  'fj_qz':'泉州',
  'fj_zz':'漳州',
  'fj_np':'南平',
  'fj_ly':'龙岩',
  'fj_nd':'宁德',
  'jx_nc':'南昌',
  'jx_jdz':'景德镇',
  'jx_px':'萍乡',
  'jx_jj':'九江',
  'jx_xy':'新余',
  'jx_yt':'鹰潭',
  'jx_gz':'赣州',
  'jx_ja':'吉安',
  'jx_yc':'宜春',
  'jx_fz':'抚州',
  'jx_sr':'上饶',
  'sd_jn':'济南',
  'sd_qd':'青岛',
  'sd_zb':'淄博',
  'sd_zz':'枣庄',
  'sd_dy':'东营',
  'sd_yt':'烟台',
  'sd_wf':'潍坊',
  'sd_jni':'济宁',
  'sd_ta':'泰安',
  'sd_wh':'威海',
  'sd_rz':'日照',
  'sd_lw':'莱芜',
  'sd_ly':'临沂',
  'sd_dz':'德州',
  'sd_lc':'聊城',
  'sd_bz':'滨州',
  'sd_hz':'荷泽',
  'hn_zzh':'郑州',
  'hn_kf':'开封',
  'hn_ly':'洛阳',
  'hn_pts':'平顶山',
  'hn_ay':'安阳',
  'hn_hb':'鹤壁',
  'hn_xx':'新乡',
  'hn_jz':'焦作',
  'hn_py':'濮阳',
  'hn_xc':'许昌',
  'hn_lh':'漯河',
  'hn_smx':'三门峡',
  'hn_ny':'南阳',
  'hn_sq':'商丘',
  'hn_xy':'信阳',
  'hn_zk':'周口',
  'hn_zmd':'驻马店',
  'hn_jy':'济源',
  'hb_wh':'武汉',
  'hb_hs':'黄石',
  'hb_sy':'十堰',
  'hb_yc':'宜昌',
  'hb_xf':'襄阳',
  'hb_ez':'鄂州',
  'hb_jm':'荆门',
  'hb_xg':'孝感',
  'hb_jz':'荆州',
  'hb_hg':'黄冈',
  'hb_xn':'咸宁',
  'hb_sz':'随州',
  'hb_es':'恩施',
  'hb_xt':'仙桃',
  'hb_qj':'潜江',
  'hb_tm':'天门',
  'hb_snj':'神农架',
  'hn_zz':'株洲',
  'hn_xt':'湘潭',
  'hn_cs':'长沙',
  'hn_hy':'衡阳',
  'hn_sya':'邵阳',
  'hn_yy':'岳阳',
  'hn_cd':'常德',
  'hn_zjj':'张家界',
  'hn_yy':'益阳',
  'hn_cz':'郴州',
  'hn_yz':'永州',
  'hn_hh':'怀化',
  'hn_ldi':'娄底',
  'hn_xx':'湘西',
  'gd_gz':'广州',
  'gd_sg':'韶关',
  'gd_sz':'深圳',
  'gd_zh':'珠海',
  'gd_st':'汕头',
  'gd_fs':'佛山',
  'gd_jm':'江门',
  'gd_zj':'湛江',
  'gd_mm':'茂名',
  'gd_zq':'肇庆',
  'gd_hz':'惠州',
  'gd_mz':'梅州',
  'gd_sw':'汕尾',
  'gd_hy':'河源',
  'gd_yj':'阳江',
  'gd_qy':'清远',
  'gd_d':'东莞',
  'gd_zs':'中山',
  'gd_sz':'潮州',
  'gd_jy':'揭阳',
  'gd_yf':'云浮',
  'gx_nn':'南宁',
  'gx_lz':'柳州',
  'gx_gl':'桂林',
  'gx_wz':'梧州',
  'gx_bh':'北海',
  'gx_fcg':'防城港',
  'gx_qz':'钦州',
  'gx_gg':'贵港',
  'gx_yl':'玉林',
  'gx_bs':'百色',
  'gx_hz':'贺州',
  'gx_hc':'河池',
  'gx_lb':'来宾',
  'gx_cz':'崇左',
  'hn_hk':'海口',
  'hn_sy':'三亚',
  'sc_cd':'成都',
  'sc_zg':'自贡',
  'sc_pzh':'攀枝花',
  'sc_lz':'泸州',
  'sc_dy':'德阳',
  'sc_my':'绵阳',
  'sc_gy':'广元',
  'sc_sn':'遂宁',
  'sc_nj':'内江',
  'sc_ls':'乐山',
  'sc_nc':'南充',
  'sc_ms':'眉山',
  'sc_yb':'宜宾',
  'sc_ga':'广安',
  'sc_dz':'达州',
  'sc_ya':'雅安',
  'sc_bz':'巴中',
  'sc_zy':'资阳',
  'sc_ab':'阿坝',
  'sc_gz':'甘孜',
  'sc_ls':'凉山',
  'gz_gy':'贵阳',
  'gz_lps':'六盘水',
  'gz_zy':'遵义',
  'gz_as':'安顺',
  'gz_tr':'铜仁',
  'gz_qxn':'黔西南',
  'gz_bj':'毕节',
  'gz_qdn':'黔东南',
  'gz_qn':'黔南',
  'yn_km':'昆明',
  'yn_qj':'曲靖',
  'yn_yx':'玉溪',
  'yn_bs':'保山',
  'yn_zt':'昭通',
  'yn_lj':'丽江',
  'yn_pe':'普洱',
  'yn_lc':'临沧',
  'yn_cx':'楚雄',
  'yn_hh':'红河',
  'yn_ws':'文山',
  'yn_xsbn':'西双版纳',
  'yn_dl':'大理',
  'yn_dh':'德宏',
  'yn_nj':'怒江',
  'yn_dq':'迪庆',
  'xz_ls':'拉萨',
  'xz_cd':'昌都',
  'xz_sn':'山南',
  'xz_rkz':'日喀则',
  'xz_nq':'那曲',
  'xz_al':'阿里',
  'xz_lz':'林芝',
  'sx_xa':'西安',
  'sx_tc':'铜川',
  'sx_bj':'宝鸡',
  'sx_xy':'咸阳',
  'sx_wn':'渭南',
  'sx_ya':'延安',
  'sx_hz':'汉中',
  'sx_yl':'榆林',
  'sx_ak':'安康',
  'sx_sl':'商洛',
  'gs_lz':'兰州',
  'gs_jyg':'嘉峪关',
  'gs_jc':'金昌',
  'gs_by':'白银',
  'gs_ts':'天水',
  'gs_ww':'武威',
  'gs_zy':'张掖',
  'gs_pl':'平凉',
  'gs_jq':'酒泉',
  'gs_qy':'庆阳',
  'gs_dx':'定西',
  'gs_ln':'陇南',
  'gs_lx':'临夏',
  'gs_gn':'甘南',
  'qh_hd':'海东',
  'qh_hb':'海北',
  'qh_hn':'黄南',
  'qh_hn':'海南',
  'qh_gl':'果洛',
  'qh_ys':'玉树',
  'qh_hx':'海西',
  'nx_yc':'银川',
  'qh_xn':'西宁',
  'nx_szs':'石嘴山',
  'nx_wz':'吴忠',
  'nx_gy':'固原',
  'nx_zw':'中卫',
  'xj_wlmq':'乌鲁木齐',
  'xj_klmy':'克拉玛依',
  'xj_tlf':'吐鲁番',
  'xj_hm':'哈密',
  'xj_cj':'昌吉',
  'xj_betl':'博尔塔拉',
  'xj_bygl':'巴音郭楞',
  'xj_aks':'阿克苏',
  'xj_kzlskekz':'克孜勒苏',
  'xj_ks':'喀什',
  'xj_ht':'和田',
  'xj_ylhsk':'伊犁哈萨克',
  'xj_tc':'塔城',
  'xj_alt':'阿勒泰',
  'xj_shz':'石河子',
  'js_ks':'昆山',
  'xj_tmsk':'图木舒克',
  'nmg_alsm':'阿拉善盟'
}

ifWeather.wind = {
  '0':{
    ch:'无持续风向',
    en:'No wind',
    ch_name:'微风',
    en_name:'<5.4m/s'
  },
  '1':{
    ch:'东北风',
    en:'Northeast',
    ch_name:'3-4级',
    en_name:'5.5~7.9m/s'
  },
  '2':{
    ch:'东风',
    en:'East',
    ch_name:'4-5级',
    en_name:'8.0~10.7m/s'
  },
  '3':{
    ch:'东南风',
    en:'Southeast',
    ch_name:'5-6级',
    en_name:'10.8~13.8m/s'
  },
  '4':{
    ch:'南风',
    en:'South',
    ch_name:'6-7级',
    en_name:'13.9~17.1m/s'
  },
  '5':{
    ch:'西南风',
    en:'Southwest',
    ch_name:'7-8级',
    en_name:'17.2~20.7m/s'
  },
  '6':{
    ch:'西风',
    en:'West',
    ch_name:'8-9级',
    en_name:'20.8~24.4m/s'
  },
  '7':{
    ch:'西北风',
    en:'Northwest',
    ch_name:'9-10级',
    en_name:'24.5~28.4m/s'
  },
  '8':{
    ch:'北风',
    en:'North',
    ch_name:'10-11级',
    en_name:'28.5~32.6m/s'
  },
  '9':{
    ch:'旋转风',
    en:'Whirl wind',
    ch_name:'11-12级',
    en_name:'32.7~36.9m/s'
  }
}

ifWeather.aqiRange = function(name){//空气质量区间范围
    let num = Math.floor(name);
    let aqi = '';
    if(0<=num&&num<=50){
      aqi = 1;
    }else if(51<=num&&num<=100){
      aqi = 2;
    }else if(101<=num&&num<=150){
      aqi = 3;
    }else if(151<=num&&num<=200){
      aqi = 4;
    }else if(201<=num&&num<=300){
      aqi = 5;
    }else{
      aqi = 6;
    }
    return aqi;
  }

ifWeather.aqi = {
  '1':{
    category:'优',
    des:''
  },
  '2':{
    category:'良',
    des:''
  },
  '3':{
    category:'轻度污染',
    des:''
  },
  '4':{
    category:'中度污染',
    des:''
  },
  '5':{
    category:'重度污染',
    des:''
  },
  '6':{
    category:'严重污染',
    des:''
  }
}
export default ifWeather;



export function in_array(search,array){
  for(var i in array){
      if(array[i]==search){
          return true;
      }
  }
  return false;
}

