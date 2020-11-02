
const {ccclass, property} = cc._decorator;

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
    NewPlayerGift: cc.Prefab = null;
    @property(cc.Prefab)
    HalfMonthGift: cc.Prefab = null;
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
    
    
    @property
    app = null;
    name = null;
    id = 0 ;
    data = {
        info:'{}'
    };
    title = null;
    public init(data){
        this.name =data.name;
        this.id = data.id;
        this.data = data;
        //显示导航
        if(data.name == '流水闯关活动' ){
            this.app.loadIcon('activity/btn_huodong2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_huodong1',this.currentIcon,249,86);
        }
        else if(data.name == '救济金活动'){
            this.app.loadIcon('activity/menu_alms_2',this.normalIcon,242,86)
            this.app.loadIcon('activity/menu_alms_1',this.currentIcon,249,86);
        }
        else if(data.name == '每日任务'){
            this.app.loadIcon('activity/btn_dailyMission2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_dailyMission1',this.currentIcon,249,86);
        }
        else if(data.name == '新人大礼包'){
            this.app.loadIcon('activity/btn_starterPack2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_starterPack1',this.currentIcon,249,86);
        }
        else if(data.name == '月入百万'){
            this.app.loadIcon('activity/btn_millionIncome2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_millionIncome1',this.currentIcon,249,86);
        }
        else if(data.name == '每周佣金奖励'){
            this.app.loadIcon('activity/btn_weeklyCms2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_weeklyCms1',this.currentIcon,249,86);
        }
        else if(data.name == '15天送58元'){
            this.app.loadIcon('activity/btn_58for15days2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_58for15days1',this.currentIcon,249,86);
        }
        else if(data.name == "充值返利"){
            this.app.loadIcon('activity/btn_cashback2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_cashback1',this.currentIcon,249,86);
        }
        else if(data.name == "推荐好友"){
            this.app.loadIcon('activity/btn_referralFee2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_referralFee1',this.currentIcon,249,86);
        }
        else if(data.name == "开业注册送1"){
            this.app.loadIcon('activity/btn_sugb2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_sugb1',this.currentIcon,249,86);
        }
        else if(data.name == "新用户首次存送1"){
            this.app.loadIcon('activity/btn_new2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_new1',this.currentIcon,249,86);
        }
        else if(data.name == "老用户每日存送1"){
            this.app.loadIcon('activity/btn_old2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_old1',this.currentIcon,249,86);
        }
        else if(data.name == "首存彩金6"){
            this.app.loadIcon('activity/yuyu_btn_sccj2',this.normalIcon,242,86)
            this.app.loadIcon('activity/yuyu_btn_sccj1',this.currentIcon,249,86);
        }
        else if(data.name == "每日救援金6"){
            this.app.loadIcon('activity/yuyu_btn_mrjyj2',this.normalIcon,242,86)
            this.app.loadIcon('activity/yuyu_btn_mrjyj1',this.currentIcon,249,86);
        }
        else if(data.name == "签到奖励6"){
            this.app.loadIcon('activity/yuyu_btn_sign2',this.normalIcon,242,86)
            this.app.loadIcon('activity/yuyu_btn_sign1',this.currentIcon,249,86);
        }
        else if(data.name == '免费领水果6'){
            this.app.loadIcon('activity/yuyu_btn_fruit2',this.normalIcon,242,86)
            this.app.loadIcon('activity/yuyu_btn_fruit',this.currentIcon,249,86);
        }
        else if(data.name == '发朋友圈活动1'){
            this.app.loadIcon('activity/btn_fpyq2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_fpyq1',this.currentIcon,249,86);
        }
        else if(data.name == '直属用户扶持1'){
            this.app.loadIcon('activity/btn_zsyh2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_zsyh1',this.currentIcon,249,86);
        }
        else if(data.name == '老用户包赔活动1'){
            this.app.loadIcon('activity/btn_lyh2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_lyh1',this.currentIcon,249,86);
        }
        else if(data.name == '新用户包赔活动1'){
            this.app.loadIcon('activity/btn_xyh2',this.normalIcon,242,86)
            this.app.loadIcon('activity/btn_xyh1',this.currentIcon,249,86);
        }
        else if(data.name == '每日救援金1'){
            this.app.loadIcon('activity/yuyu_btn_mrjyj2',this.normalIcon,242,86)
            this.app.loadIcon('activity/yuyu_btn_mrjyj1',this.currentIcon,249,86);
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.title = cc.find("Canvas/Activity/header/txt_title").getComponent(cc.Sprite)
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        if(this.name == '流水闯关活动'||this.name == '流水闯关活动1'||this.name == '救济金活动'|| 
        this.name == '每日任务'||this.name == "每周佣金奖励" || this.name=="首存彩金6"|| this.name=="每日救援金6" || this.name =='签到奖励6'){
            this.app.showLoading();
        }
        this.addContent(this.name,JSON.parse(this.data.info),this.id)
    }

    addContent(name,info,id){
        var content = cc.find('Canvas/Activity/Content');
        content.removeAllChildren();
        console.log(name)
        if(name == '流水闯关活动'){
            var node = cc.instantiate(this.ChuangGuan);
            node.getComponent('payChuangGuan').setId(id,name);
            this.app.loadTitle('title/txt_title02',this.title);
        }else if(name == '救济金活动'){
            var node = cc.instantiate(this.FreeGold);
            node.getComponent('payFreeGold').setIdInfo(id,info);
            this.app.loadTitle('title/alms_zi2',this.title);
        }else if(name == '每日任务'){
            var node = cc.instantiate(this.DailyActivity);
            node.getComponent('payDailyActivity').setIdInfo(id,info);
            this.app.loadTitle('title/dm_title',this.title);
        }else if(name == '每周佣金奖励'){
            var node = cc.instantiate(this.OnceWeekGift);
            node.getComponent('payOnceWeekGift').setIdInfo(id,info);
            this.app.loadTitle('title/dm_title_weeklyCms',this.title);
        }
        else if (name == "开业注册送1") {
            var node = cc.instantiate(this.KaiYeZhuCeSong)
            node.getComponent('payKaiYeZhuCeSong').setIdInfo(id,info);
            this.app.loadTitle('title/dm_title_sugb',this.title);
        }
        else if( name == "新人大礼包"){
            var node = cc.instantiate(this.NewPlayerGift)
            this.app.loadTitle('title/dm_title_starterPack',this.title);
        }
        else if(name == "月入百万"){
            var node = cc.instantiate(this.OneMonthMillion)
            this.app.loadTitle('title/dm_title_millionIncome',this.title);
        }else if (name == "15天送58元") {
            var node = cc.instantiate(this.HalfMonthGift)
            this.app.loadTitle('title/dm_title_58for15days',this.title);
        }else if (name == "充值返利") {
            var node = cc.instantiate(this.RechargeRebate)
            this.app.loadTitle('title/dm_title_cashback',this.title);
        }else if (name == "推荐好友") {
            var node = cc.instantiate(this.RecommendFriends)
            this.app.loadTitle('title/dm_title_referralFee',this.title);
        }else if (name == "新用户首次存送1") {
            var node = cc.instantiate(this.NewPlayerCunSong)
            this.app.loadTitle('title/dm_title_new',this.title);
        }else if (name == "老用户每日存送1") {
            var node = cc.instantiate(this.OldPlayerCunSong)
            this.app.loadTitle('title/dm_title_old',this.title);
        }else if (name == "首存彩金6") {
            var node = cc.instantiate(this.FirstDepostGold)
            node.getComponent('payFirstDepostGold').setIdInfo(id,info);
            this.app.loadTitle('title/yuyu_title_sccj',this.title);
        }else if (name == "每日救援金6") {
            var node = cc.instantiate(this.DailyRescueGold)
            node.getComponent('payDailyRescueGold').setIdInfo(id,info);
            this.app.loadTitle('title/yuyu_title_mrjyj',this.title);
        }else if (name == "签到奖励6"){
            var node = cc.instantiate(this.DailySignIn)
            node.getComponent('payDailySignIn').setIdInfo(id,info);
            this.app.loadTitle('title/yuyu_title_cdjl',this.title);
        }else if( name == "免费领水果6"){
            var node = cc.instantiate(this.SendFruit)
            node.getComponent('paySendFruit').setId(id);
            this.app.loadTitle('title/yuyu_title_mflsj',this.title);
        }else if( name == "发朋友圈活动1"){
            var node = cc.instantiate(this.FaPengYouQuan)
            this.app.loadTitle('title/title_fpyq',this.title);
        }else if( name == "直属用户扶持1"){
            var node = cc.instantiate(this.ZhiShuYongHuFuChi)
            this.app.loadTitle('title/title_zsyh',this.title);
        }else if( name == "老用户包赔活动1"){
            var node = cc.instantiate(this.OldUserMeiRiBaoPei)
            this.app.loadTitle('title/title_lyh',this.title);
        }else if( name == "新用户包赔活动1"){
            var node = cc.instantiate(this.NewUserMeiRiBaoPei)
            this.app.loadTitle('title/title_xyh',this.title);
        }else if( name == "每日救援金1"){
            var node = cc.instantiate(this.DailyRescueGold2)
            this.app.loadTitle('title/yuyu_title_mrjyj',this.title);
        }
        content.addChild(node);

    }
}
