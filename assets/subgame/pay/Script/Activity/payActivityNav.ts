
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    normalIcon: cc.Node = null;

    @property(cc.Node)
    currentIcon: cc.Node = null;

    @property(cc.Prefab)
    ChuangGuan : cc.Prefab = null;

    @property(cc.Prefab)
    FreeGold : cc.Prefab = null;

    @property(cc.Prefab)
    DailyActivity : cc.Prefab = null;

    @property(cc.Prefab)
    DailyActivity_8 : cc.Prefab = null;

    @property(cc.Prefab)
    NewPlayerGift: cc.Prefab = null;
    @property(cc.Prefab)
    HalfMonthGift: cc.Prefab = null;
    @property(cc.Prefab)
    HalfMonthGift_8: cc.Prefab = null;
    @property(cc.Prefab)
    OnceWeekGift: cc.Prefab = null;
    @property(cc.Prefab)
    OneMonthMillion: cc.Prefab = null;

    @property(cc.Prefab)
    RechargeRebate: cc.Prefab = null;//充值返利
    @property(cc.Prefab)
    RecommendFriends: cc.Prefab = null;//推荐好友

    @property(cc.Prefab)
    KaiYeZhuCeSong: cc.Prefab = null;

    @property(cc.Prefab)
    OldPlayerCunSong: cc.Prefab = null;

    @property(cc.Prefab)
    NewPlayerCunSong: cc.Prefab = null;

    @property(cc.Prefab)
    FirstDepostGold: cc.Prefab = null;

    @property(cc.Prefab)
    FirstDepostGold_8: cc.Prefab = null;

    @property(cc.Prefab)
    FirstDepostGoldHDSQQDLQ_8: cc.Prefab = null;

    @property(cc.Prefab)
    DailyRescueGold: cc.Prefab = null;

    @property(cc.Prefab)
    DailySignIn: cc.Prefab = null;

    @property(cc.Prefab)
    SendFruit: cc.Prefab = null;

    @property(cc.Prefab)
    FaPengYouQuan: cc.Prefab = null;

    @property(cc.Prefab)
    NewUserMeiRiBaoPei: cc.Prefab = null;

    @property(cc.Prefab)
    OldUserMeiRiBaoPei: cc.Prefab = null;

    @property(cc.Prefab)
    ZhiShuYongHuFuChi: cc.Prefab = null;

    @property(cc.Prefab)
    DailyRescueGold2: cc.Prefab = null; 
    
    @property(cc.Prefab)
    ChuangGuan1 :cc.Prefab = null;

    @property(cc.Prefab)
    ErRenMaJiang :cc.Prefab = null;

    @property(cc.Prefab)
    WheelOfFortune : cc.Prefab = null;

    @property(cc.Prefab)
    WheelOfFortune_8 : cc.Prefab = null;

    @property(cc.Prefab)
    RedRain : cc.Prefab = null;

    @property(cc.Prefab)
    RedRain_8 : cc.Prefab = null;

    @property(cc.Prefab)
    DailySignTwo :cc.Prefab = null;

    @property(cc.Prefab)
    DailySignTwo_8 :cc.Prefab = null;

    @property(cc.Prefab)
    Lsjlhd :cc.Prefab = null;
    
    @property(cc.Prefab)
    Rkshd :cc.Prefab = null;

    @property(cc.Prefab)
    Smcjhd :cc.Prefab = null;

    @property(cc.Prefab)
    Stjzhd :cc.Prefab = null;

    @property(cc.Prefab)
    Fxpyq :cc.Prefab = null;

    @property(cc.Prefab)
    Fxpyq3 :cc.Prefab = null;

    @property(cc.Prefab)
    Fxpyq_8 :cc.Prefab = null;

    @property(cc.Prefab)
    Byyljj :cc.Prefab = null;

    @property(cc.Prefab)
    Schd :cc.Prefab = null;

    @property(cc.Prefab)
    Schd_8 :cc.Prefab = null;

    @property(cc.Prefab)
    Xyhbp :cc.Prefab = null;

    @property(cc.Prefab)
    Xyhbp_8 :cc.Prefab = null;

    @property(cc.Prefab)
    Ryjhd :cc.Prefab = null;

    @property(cc.Prefab)
    Lyhbp :cc.Prefab = null;
    
    @property(cc.Prefab)
    Lyhbp_8 :cc.Prefab = null;

    @property(cc.Prefab)
    Xhysc :cc.Prefab = null;
    
    @property(cc.Prefab)
    Lhysc :cc.Prefab = null;

    @property(cc.Prefab)
    Lhysc_8 :cc.Prefab = null;

    @property
    app = null;
    name = null;
    id = 0 ;
    data = {
        info:'{}'
    };
    title = null;
    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.name =data.name;
        this.id = data.id;
        this.data = data;
        //显示导航
        if(data.name == '流水闯关活动' ){
            this.app.loadIcon(`${src}/menu/activity/btn_huodong2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_huodong1`,this.currentIcon,249,86);
        }
        else if(data.name == '救济金活动'){
            this.app.loadIcon(`${src}/menu/activity/menu_alms_2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/menu_alms_1`,this.currentIcon,249,86);
        }
        else if(data.name == '每日任务2'){
            this.app.loadIcon(`${src}/menu/activity/btn_dailyMission2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_dailyMission1`,this.currentIcon,249,86);
        }
        else if(data.name == '新人大礼包'){
            this.app.loadIcon(`${src}/menu/activity/btn_starterPack2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_starterPack1`,this.currentIcon,249,86);
        }
        else if(data.name == '月入百万'){
            this.app.loadIcon(`${src}/menu/activity/btn_millionIncome2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_millionIncome1`,this.currentIcon,249,86);
        }
        else if(data.name == '每周佣金奖励'){
            this.app.loadIcon(`${src}/menu/activity/btn_weeklyCms2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_weeklyCms1`,this.currentIcon,249,86);
        }
        else if(data.name == '15天送58元'){
            this.app.loadIcon(`${src}/menu/activity/btn_58for15days2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_58for15days1`,this.currentIcon,249,86);
        }
        else if(data.name == "充值返利"){
            this.app.loadIcon(`${src}/menu/activity/btn_cashback2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_cashback1`,this.currentIcon,249,86);
        }
        else if(data.name == "推荐好友"){
            this.app.loadIcon(`${src}/menu/activity/btn_referralFee2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_referralFee1`,this.currentIcon,249,86);
        }
        else if(data.name == "开业注册送1"){
            this.app.loadIcon(`${src}/menu/activity/btn_sugb2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_sugb1`,this.currentIcon,249,86);
        }
        else if(data.name == "新用户首次存送1"){
            this.app.loadIcon(`${src}/menu/activity/btn_new2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_new1`,this.currentIcon,249,86);
        }
        else if(data.name == "老用户每日存送1"){
            this.app.loadIcon(`${src}/menu/activity/btn_old2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_old1`,this.currentIcon,249,86);
        }
        else if(data.name == "首存彩金6"){
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sccj2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sccj1`,this.currentIcon,249,86);
        }
        else if(data.name == "每日救援金6"){
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_mrjyj2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_mrjyj1`,this.currentIcon,249,86);
        }
        else if(data.name == "签到奖励6"){
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sign2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sign1`,this.currentIcon,249,86);
        }
        else if(data.name == '免费领水果6'){
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_fruit2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_fruit`,this.currentIcon,249,86);
        }
        else if(data.name == '发朋友圈活动1'){
            this.app.loadIcon(`${src}/menu/activity/btn_fpyq2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_fpyq1`,this.currentIcon,249,86);
        }
        else if(data.name == '直属用户扶持1'){
            this.app.loadIcon(`${src}/menu/activity/btn_zsyh2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_zsyh1`,this.currentIcon,249,86);
        }
        else if(data.name == '老用户包赔活动1'){
            this.app.loadIcon(`${src}/menu/activity/btn_lyh2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_lyh1`,this.currentIcon,249,86);
        }
        else if(data.name == '新用户包赔活动1'){
            this.app.loadIcon(`${src}/menu/activity/btn_xyh2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_xyh1`,this.currentIcon,249,86);
        }
        else if(data.name == '每日救援金1'){
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_mrjyj2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_mrjyj1`,this.currentIcon,249,86);
        }
        else if(data.name == '流水闯关1'){
            this.app.loadIcon(`${src}/menu/activity/btn_huodong2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_huodong1`,this.currentIcon,249,86);
        }
        else if(data.name == '二人麻将活动1'){
            this.app.loadIcon(`${src}/menu/activity/btn_2rmjhd2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_2rmjhd1`,this.currentIcon,249,86);
        }
        else if(data.name == '幸运轮盘2'){
            this.app.loadIcon(`${src}/menu/activity/btn_xyzp2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_xyzp1`,this.currentIcon,249,86);
        }
        else if(data.name == '四季发财红包雨2'){
            this.app.loadIcon(`${src}/menu/activity/btn_redRain2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_redRain1`,this.currentIcon,249,86);
        }
        else if(data.name == '每日签到2'){
            this.app.loadIcon(`${src}/menu/activity/btn_qd2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_qd1`,this.currentIcon,249,86);
        }
        else if(data.name == '流水奖励活动2'){
            this.app.loadIcon(`${src}/menu/activity/lsjlhd_2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/lsjlhd_1`,this.currentIcon,249,86);
        }
        else if(data.name == '日亏损活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_rks2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_rks1`,this.currentIcon,249,86);
        }
        else if(data.name == '神秘彩金活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_smcj2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_smcj1`,this.currentIcon,249,86);
        }
        else if(data.name == '首提加赠活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_stjzhd2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_stjzhd1`,this.currentIcon,249,86);
        }
        else if(data.name == '分享朋友圈活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_fxpyq2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_fxpyq1`,this.currentIcon,249,86);
        }
        else if(data.name == '分享朋友圈活动3'){
            this.app.loadIcon(`${src}/menu/activity/btn_fxpyq2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_fxpyq1`,this.currentIcon,249,86);
        }
        else if(data.name == '捕鱼盈利嘉奖2'){
            this.app.loadIcon(`${src}/menu/activity/btn_byjj2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_byjj1`,this.currentIcon,249,86);
        }
        else if(data.name == '首充活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_schd2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_schd1`,this.currentIcon,249,86);
        }
        else if(data.name == '新用户包赔活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_xyh2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_xyh1`,this.currentIcon,249,86);
        }
        else if(data.name == '日业绩活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_ryjhd2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_ryjhd1`,this.currentIcon,249,86);
        }
        else if(data.name == '老用户包赔活动2'){
            this.app.loadIcon(`${src}/menu/activity/btn_lyh2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_lyh1`,this.currentIcon,249,86);
        }
        else  if(data.name == '新会员首存活动三重奏2'){
            this.app.loadIcon(`${src}/menu/activity/btn_xhysc2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_xhysc1`,this.currentIcon,249,86);
        }else  if(data.name == '老会员每日首存活动非自动领取2'){
            this.app.loadIcon(`${src}/menu/activity/btn_lhysc2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_lhysc1`,this.currentIcon,249,86);
        }
        else if(data.name == '每日签到8'){
            this.app.loadIcon(`${src}/menu/activity/btn_qd2`,this.normalIcon,101,107)
            this.app.loadIcon(`${src}/menu/activity/btn_qd1`,this.currentIcon,101,92);
        }
        else if( data.name == '每日任务8'){
            this.app.loadIcon(`${src}/menu/activity/btn_dailyMission2`,this.normalIcon,103,109)
            this.app.loadIcon(`${src}/menu/activity/btn_dailyMission1`,this.currentIcon,103,93);
        }
        else if(data.name == '四季发财红包雨8'){
            this.app.loadIcon(`${src}/menu/activity/btn_redRain2`,this.normalIcon,178,93)
            this.app.loadIcon(`${src}/menu/activity/btn_redRain1`,this.currentIcon,178,109);
        }
        else if(data.name == '15天送58元8'){
            this.app.loadIcon(`${src}/menu/activity/btn_58for15days2`,this.normalIcon,132,107)
            this.app.loadIcon(`${src}/menu/activity/btn_58for15days1`,this.currentIcon,132,107);
        }
        else if(data.name == '分享朋友圈活动8'){
            this.app.loadIcon(`${src}/menu/activity/btn_fxpyq2`,this.normalIcon,128,108)
            this.app.loadIcon(`${src}/menu/activity/btn_fxpyq1`,this.currentIcon,128,108);
        }
        else if(data.name == '幸运轮盘8'){
            this.app.loadIcon(`${src}/menu/activity/btn_xyzp2`,this.normalIcon,102,94)
            this.app.loadIcon(`${src}/menu/activity/btn_xyzp1`,this.currentIcon,102,110);
        }
        else if(data.name == '首充活动-81'){
            this.app.loadIcon(`${src}/menu/activity/btn_schd2`,this.normalIcon,169,102)
            this.app.loadIcon(`${src}/menu/activity/btn_schd1`,this.currentIcon,169,102);
        }
        else if(data.name == '新用户包赔活动-8'){
            this.app.loadIcon(`${src}/menu/activity/btn_xyh2`,this.normalIcon,169,102)
            this.app.loadIcon(`${src}/menu/activity/btn_xyh1`,this.currentIcon,169,102);
        }
        else  if(data.name == '老会员每日首存活动8'){
            this.app.loadIcon(`${src}/menu/activity/btn_lhysc2`,this.normalIcon,164,108)
            this.app.loadIcon(`${src}/menu/activity/btn_lhysc1`,this.currentIcon,164,108);
        }
        else if(data.name == "首充活动-8"){
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sccj2`,this.normalIcon,95,110)
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sccj1`,this.currentIcon,95,110);
        }
        else if(data.name == '老用户包赔活动8'){
            this.app.loadIcon(`${src}/menu/activity/btn_lyh2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/activity/btn_lyh1`,this.currentIcon,249,86);
        }
        else if(data.name == "首充活动后端申请前端领取8"){
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sccj2`,this.normalIcon,95,110)
            this.app.loadIcon(`${src}/menu/activity/yuyu_btn_sccj1`,this.currentIcon,95,110);
        }

        //响应每日签到2，显示红点
        if(this.name == '每日签到2'|| this.name == '每日签到8'){
            this.fetchgetSignWeekInfo(this.id)
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.title = cc.find("Canvas/Activity/header/txt_title").getComponent(cc.Sprite)
    }
    showDailySignTip(){
        console.log('showDailySignTip')
        this.node.getChildByName('tip').active = true
    }
    hideDailySignTip(){
        console.log('hideDailySignTip')
        this.node.getChildByName('tip').active = false
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        if(this.name == '流水闯关活动'||this.name == '流水闯关活动1'||this.name == '救济金活动'|| 
        this.name == '每日任务2'||this.name == "每周佣金奖励" || this.name=="首存彩金6"|| 
        this.name=="每日救援金6" || this.name =='签到奖励6'|| this.name =='流水闯关1'
        ){
            this.app.showLoading();
        }
        this.addContent(this.name,JSON.parse(this.data.info),this.id)

        if(this.name == '每日签到2' || this.name == '每日签到8'){
            this.fetchgetSignWeekInfo(this.id)
        }
    }
    public fetchgetSignWeekInfo(activity_id){
        var url = `${this.app.UrlData.host}/api/activity/getSignWeekInfo?user_id=${this.app.UrlData.user_id}&activity_id=${activity_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                if(response.data.sign_today==1){
                    cc.systemEvent.emit("hideDailySignTip")
                }else{
                    cc.systemEvent.emit("showDailySignTip")
                }
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }

    addContent(name,info,id){
        let src = Language_pay.Lg.getLgSrc()
        var content = cc.find('Canvas/Activity/Content');
        content.removeAllChildren();
        console.log(name)
        if(name == '流水闯关活动'){
            var node = cc.instantiate(this.ChuangGuan);
            node.getComponent('payChuangGuan').setId(id,name);
            this.app.loadTitle(`${src}/title/txt_title02`,this.title);
        }else if(name == '救济金活动'){
            var node = cc.instantiate(this.FreeGold);
            node.getComponent('payFreeGold').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/alms_zi2`,this.title);
        }else if(name == '每日任务2'){
            var node = cc.instantiate(this.DailyActivity);
            node.getComponent('payDailyActivity').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/dm_title`,this.title);
        }else if(name == '每日任务8'){
            var node = cc.instantiate(this.DailyActivity_8);
            node.getComponent('payDailyActivity').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/dm_title`,this.title);
        }else if(name == '每周佣金奖励'){
            var node = cc.instantiate(this.OnceWeekGift);
            node.getComponent('payOnceWeekGift').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/dm_title_weeklyCms`,this.title);
        }
        else if (name == "开业注册送1") {
            var node = cc.instantiate(this.KaiYeZhuCeSong)
            node.getComponent('payKaiYeZhuCeSong').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/dm_title_sugb`,this.title);
        }
        else if( name == "新人大礼包"){
            var node = cc.instantiate(this.NewPlayerGift)
            this.app.loadTitle(`${src}/title/dm_title_starterPack`,this.title);
        }
        else if(name == "月入百万"){
            var node = cc.instantiate(this.OneMonthMillion)
            this.app.loadTitle(`${src}/title/dm_title_millionIncome`,this.title);
        }else if (name == "15天送58元") {
            var node = cc.instantiate(this.HalfMonthGift)
            this.app.loadTitle(`${src}/title/dm_title_58for15days`,this.title);
        }else if (name == "充值返利") {
            var node = cc.instantiate(this.RechargeRebate)
            this.app.loadTitle(`${src}/title/dm_title_cashback`,this.title);
        }else if (name == "推荐好友") {
            var node = cc.instantiate(this.RecommendFriends)
            this.app.loadTitle(`${src}/title/dm_title_referralFee`,this.title);
        }else if (name == "新用户首次存送1") {
            var node = cc.instantiate(this.NewPlayerCunSong)
            this.app.loadTitle(`${src}/title/dm_title_new`,this.title);
        }else if (name == "老用户每日存送1") {
            var node = cc.instantiate(this.OldPlayerCunSong)
            this.app.loadTitle(`${src}/title/dm_title_old`,this.title);
        }else if (name == "首存彩金6") {
            var node = cc.instantiate(this.FirstDepostGold)
            node.getComponent('payFirstDepostGold').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/yuyu_title_sccj`,this.title);
        }else if (name == "每日救援金6") {
            var node = cc.instantiate(this.DailyRescueGold)
            node.getComponent('payDailyRescueGold').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/yuyu_title_mrjyj`,this.title);
        }else if (name == "签到奖励6"){
            var node = cc.instantiate(this.DailySignIn)
            node.getComponent('payDailySignIn').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/yuyu_title_cdjl`,this.title);
        }else if( name == "免费领水果6"){
            var node = cc.instantiate(this.SendFruit)
            node.getComponent('paySendFruit').setId(id);
            this.app.loadTitle(`${src}/title/yuyu_title_mflsj`,this.title);
        }else if( name == "发朋友圈活动1"){
            var node = cc.instantiate(this.FaPengYouQuan)
            this.app.loadTitle(`${src}/title/title_fpyq`,this.title);
        }else if( name == "直属用户扶持1"){
            var node = cc.instantiate(this.ZhiShuYongHuFuChi)
            this.app.loadTitle(`${src}/title/title_zsyh`,this.title);
        }else if( name == "老用户包赔活动1"){
            var node = cc.instantiate(this.OldUserMeiRiBaoPei)
            this.app.loadTitle(`${src}/title/title_lyh`,this.title);
        }else if( name == "新用户包赔活动1"){
            var node = cc.instantiate(this.NewUserMeiRiBaoPei)
            this.app.loadTitle(`${src}/title/title_xyh`,this.title);
        }else if( name == "每日救援金1"){
            var node = cc.instantiate(this.DailyRescueGold2)
            this.app.loadTitle(`${src}/title/yuyu_title_mrjyj`,this.title);
        }else  if(name == '流水闯关1'){
            var node = cc.instantiate(this.ChuangGuan1);
            node.getComponent('payChuangGuan1').setId(id,name,info);
            this.app.loadTitle(`${src}/title/txt_title02`,this.title);
        }else  if(name == '二人麻将活动1'){
            var node = cc.instantiate(this.ErRenMaJiang);
            this.app.loadTitle(`${src}/title/title_2rmjhd`,this.title);
        }else  if(name == '幸运轮盘2'){
            var node = cc.instantiate(this.WheelOfFortune);
            node.getComponent('payWheelOfFortune').setIdInfo(id,info)
            this.app.loadTitle(`${src}/title/xingyunlunpan`,this.title);
        }else  if(name == '四季发财红包雨2'){
            var node = cc.instantiate(this.RedRain);
            this.app.loadTitle(`${src}/title/db_redrain`,this.title);
        }else  if(name == '四季发财红包雨8'){
            var node = cc.instantiate(this.RedRain_8);
            this.app.loadTitle(`${src}/title/db_redrain`,this.title);
        }
        else  if(name == '每日签到2'){
            var node = cc.instantiate(this.DailySignTwo);
            node.getComponent('payDailySign').setIdInfo(id,info)
            this.app.loadTitle(`${src}/title/mrqd`,this.title);
        }else  if(name == '每日签到8'){
            var node = cc.instantiate(this.DailySignTwo_8);
            node.getComponent('payDailySign').setIdInfo(id,info)
            this.app.loadTitle(`${src}/title/mrqd`,this.title);
        }else  if(name == '流水奖励活动2'){
            var node = cc.instantiate(this.Lsjlhd);
            this.app.loadTitle(`${src}/title/title_lsjlhd`,this.title);
        }else  if(name == '日亏损活动2'){
            var node = cc.instantiate(this.Rkshd);
            this.app.loadTitle(`${src}/title/rkshd`,this.title);
        }else  if(name == '神秘彩金活动2'){
            var node = cc.instantiate(this.Smcjhd);
            this.app.loadTitle(`${src}/title/title_smcj`,this.title);
        }else  if(name == '首提加赠活动2'){
            var node = cc.instantiate(this.Stjzhd);
            this.app.loadTitle(`${src}/title/dm_title_stjzhd`,this.title);
        }else  if(name == '分享朋友圈活动2'){
            var node = cc.instantiate(this.Fxpyq);
            this.app.loadTitle(`${src}/title/dm_title_fxpyq`,this.title);
        }else  if(name == '捕鱼盈利嘉奖2'){
            var node = cc.instantiate(this.Byyljj);
            this.app.loadTitle(`${src}/title/dm_title_byjj`,this.title);
        }else  if(name == '首充活动2'){
            var node = cc.instantiate(this.Schd);
            this.app.loadTitle(`${src}/title/dm_title_schd`,this.title);
            node.getComponent('paySchd').setIdInfo(id,info);
        }else  if(name == '新用户包赔活动2'){
            var node = cc.instantiate(this.Xyhbp);
            node.getComponent('payXyhbp').setId(id)
            this.app.loadTitle(`${src}/title/title_xyh`,this.title);
        }else  if(name == '日业绩活动2'){
            var node = cc.instantiate(this.Ryjhd);
            this.app.loadTitle(`${src}/title/dm_title_ryjhd`,this.title);
        }else  if(name == '老用户包赔活动2'){
            var node = cc.instantiate(this.Lyhbp);
            node.getComponent('payLyhbp').setId(id)
            this.app.loadTitle(`${src}/title/title_lyh`,this.title);
        }else  if(name == '分享朋友圈活动3'){
            var node = cc.instantiate(this.Fxpyq3);
            this.app.loadTitle(`${src}/title/dm_title_fxpyq`,this.title);
        }else  if(name == '新会员首存活动三重奏2'){
            var node = cc.instantiate(this.Xhysc);
            this.app.loadTitle(`${src}/title/dm_title_xhysc`,this.title);
        }else  if(name == '老会员每日首存活动非自动领取2'){
            var node = cc.instantiate(this.Lhysc);
            node.getComponent('payLhysc').setId(id);
            this.app.loadTitle(`${src}/title/dm_title_lhysc`,this.title);
        }else if (name == "15天送58元8") {
            var node = cc.instantiate(this.HalfMonthGift_8)
            this.app.loadTitle(`${src}/title/dm_title_58for15days`,this.title);
        }
        else  if(name == '分享朋友圈活动8'){
            var node = cc.instantiate(this.Fxpyq_8);
            this.app.loadTitle(`${src}/title/dm_title_fxpyq`,this.title);
        }
        else  if(name == '幸运轮盘8'){
            var node = cc.instantiate(this.WheelOfFortune_8);
            node.getComponent('payWheelOfFortune').setIdInfo(id,info)
            this.app.loadTitle(`${src}/title/xingyunlunpan`,this.title);
        }
        else  if(name == '首充活动-81'){
            var node = cc.instantiate(this.Schd_8);
            this.app.loadTitle(`${src}/title/dm_title_schd`,this.title);
            node.getComponent('paySchd').setIdInfo(id,info);
        }
        else  if(name == '新用户包赔活动-8'){
            var node = cc.instantiate(this.Xyhbp_8);
            node.getComponent('payXyhbp').setId(id)
            this.app.loadTitle(`${src}/title/title_xyh`,this.title);
        }
        else  if(name == '老会员每日首存活动8'){
            var node = cc.instantiate(this.Lhysc_8);
            node.getComponent('payLhysc').setId(id);
            this.app.loadTitle(`${src}/title/dm_title_lhysc`,this.title);
        }
        else if (name == "首充活动-8") {
            var node = cc.instantiate(this.FirstDepostGold_8)
            node.getComponent('payFirstDepostGold').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/yuyu_title_sccj`,this.title);
        }
        else  if(name == '老用户包赔活动8'){
            var node = cc.instantiate(this.Lyhbp_8);
            node.getComponent('payLyhbp').setId(id)
            this.app.loadTitle(`${src}/title/title_lyh`,this.title);
        }
        else if (name == "首充活动后端申请前端领取8") {
            var node = cc.instantiate(this.FirstDepostGoldHDSQQDLQ_8)
            node.getComponent('payFirstDepostGoldHDSQQDLQ').setIdInfo(id,info);
            this.app.loadTitle(`${src}/title/yuyu_title_sccj`,this.title);
        }
        content.addChild(node);
    }
    
    onDestroy(){
        cc.systemEvent.off('showDailySignTip')
        cc.systemEvent.off('hideDailySignTip')
    }
}
