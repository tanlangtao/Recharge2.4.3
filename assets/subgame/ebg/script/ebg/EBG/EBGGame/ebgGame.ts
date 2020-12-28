/**ebg游戏场景 */
import {fapaiItem,RoomSettlement,EnterRoomRsp,RoomStartBet,PlayerScore,BetResult,DealerInfo,OtherJoin,OthersExit,RoomInfo,DealerProper,UniMessage,PlayerInfo} from '../interface/ebgInterface';
import Utils from '../untils/ebgUtils';
import {Api} from '../untils/ebgApi';
import ebgMusicMgr from './ebgMusicMgr';
import {NoticeDef as NotiDef,NotificationCenter as NotiCenter, NoticeDef} from "../../base/ebgNotification";
import {GameStatMgr} from "../ebgGameStatMgr";
import ebgRootNode from '../EBGroomList/ebgRootNode';
import ebgBets from './ebgBets';
import gHandler = require("../../../../../../base/common/gHandler");
import {Language_ebg} from '../../language/ebgLanguage'
const { ccclass, property } = cc._decorator;

@ccclass
export default class ebgGame extends cc.Component {
    readonly sClassName = "ebgGame";

    @property(cc.Node)
    FaPai: cc.Node = null;//翻牌挂载点

    @property(cc.Node)
    GameTrend: cc.Node = null;//轮盘

    @property(cc.Node)
    Bet : cc.Node = null;//筹码挂载点

    @property(cc.Node)
    xutouTip: cc.Node= null;//续投

    @property(cc.Prefab)
    ani_start: cc.Prefab= null;//开始下注

    @property(cc.Prefab)
    ani_end: cc.Prefab= null;//停止下注

    @property(cc.Node)
    stateNode: cc.Node= null;//状态显示
    
    @property(cc.Prefab)
    setWin: cc.Prefab= null;//赢了

    @property(cc.Prefab)
    setLose: cc.Prefab= null;//输了

    @property(cc.Node)
    ListContent: cc.Node= null;//玩家列表挂载点
    
    @property(cc.Prefab)
    playerItem: cc.Prefab= null;//线上玩家

    @property(cc.Prefab)
    dealerListItem: cc.Prefab= null;//上庄玩家

    @property()
    MusicMgr :ebgMusicMgr= null;

    public xutouValue:number =0;//续投总额
    public xutouArr :any[] = []; //续投数据
    public winLoseData :number[]= [0,0,0];//输赢金钱
    public HostDiffScore :number = 0; //庄家输赢
    public HostScore :number = 0;//庄家金币
    public fapaiResults :fapaiItem[] = [];//发牌结果
    private timer = null;
    private timeOut = null;
    private timeOut1 = null;
    private timeOut2 = null;
    private timeOut3 = null;
    private timeOut4 = null;
    onlineClickTimer = null;
    onlineClick = true; // 在线列表延迟状态
    public LimitRed :number = 20000;//当前限红
    public gameInfo :RoomInfo = null//房间信息
    public rootCom :ebgRootNode = null;//常驻节点
    private Remaining : number = 0; //倒计时
    private LgSrc = ''//多语言资源路径
    
    
    onLoad() {
        
        this.rootCom =  cc.find('RootNode').getComponent('ebgRootNode');

        this.MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr');
        this.setLanguageResource()
        this.btnInit();
        this.RegsiterInit();
        let Info = this.rootCom.gameRoomRsp.Info;
        this.setGameInfo(Info);
        this.AddPlayerToOnlineList();//上来先添加一次在线列表，不再每次删除，只更新数据
        this.rootCom.WaitingList = this.gameInfo.HostInfo.WaitingList;
        cc.systemEvent.on(Api.LimitRed,this.onLimitRed.bind(this));//限红更新
        cc.systemEvent.on(Api.offLine,this.onOffLine.bind(this));//断线
        cc.systemEvent.on(Api.onLine,this.onOnLine.bind(this));//重连
        //重连超过30次，提示返回大厅 
        cc.systemEvent.on('breakConnectTimeOut',this.onBreakConnectTimeOut.bind(this)) 
        //切换至后台时的操作
        cc.game.on(cc.game.EVENT_HIDE,this.event_hide.bind(this));
        cc.game.on(cc.game.EVENT_SHOW,this.event_show.bind(this));
        
        //测速
        let pn = cc.find('Canvas/UiLayer/head/netstatenode')
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })
    }
    start(){
        this.dealerInit();
        this.gameInit()
        this.watchingInit();
        this.betBtnInit();
    }
     /**
     * 请求房间信息消息
     * @param msg 房间信息
     */
    onRoomInfo(msg:RoomInfo): void{
        console .log('onRoomInfo收到当前房间状态------------------------',msg)
        let rsp = {
            Entered:true,
            Info:msg
        }
        this.rootCom.gameRoomRsp = rsp;
        let Info = this.rootCom.gameRoomRsp.Info;
        this.rootCom.RoomIndex = msg.Index;
        this.setGameInfo(Info);
        this.rootCom.WaitingList = this.gameInfo.HostInfo.WaitingList;
        this.gameInit()
        this.dealerInit();
        this.watchingInit();
        this.betBtnInit();
        cc.systemEvent.emit(Api.onEnterRoomRsp,msg);// 数据更新
    }
    /**
     * 
     * @param msg 
     */
    setGameInfo(Info:RoomInfo){
        this.gameInfo ={
            Index:Info.Index,
            HostInfo:Info.HostInfo,
            PlayerList: Info.PlayerList.sort((a,b)=>b.allBet-a.allBet),
            Remaining:Info.Remaining,
            RoomState:Info.RoomState,
            Cards:Info.Cards,
            rrlist:Info.rrlist
        }
        if(!this.gameInfo.HostInfo.Dealer){
            this.gameInfo.HostInfo.Dealer = {
                ID:'',
                Nick :'',
                Head :'',
                score :0,
            }
        }
    }
    /**
     * 进入游戏房间回调
     * @param msg 房间信息
     */
    enterRoomRsp(msg:EnterRoomRsp): void{
        console .log('收到当前房间状态------------------------',msg)
       
        this.rootCom.gameRoomRsp = msg;
        this.rootCom.gameRoomRsp.Info.PlayerList = this.rootCom.PlayerList;
        let Info = this.rootCom.gameRoomRsp.Info;
        this.rootCom.RoomIndex = msg.Info.Index;
        this.setGameInfo(Info)
        this.rootCom.WaitingList = this.gameInfo.HostInfo.WaitingList;
        this.gameInit()
        this.dealerInit();
        this.watchingInit();
        this.betBtnInit();
        cc.systemEvent.emit(Api.onEnterRoomRsp,msg);// 数据更新
    }
    private onPlayerInfo(msg:PlayerInfo){
        this.rootCom.PlayerList.push(msg)
    }
    
    cleanDesk(){
        //清空筹码
        for(let i = 0;i<3;i++){
            let ebgBets = this.Bet.getComponent('ebgBets').pos[i]
            ebgBets.getChildByName('chips').removeAllChildren();
            ebgBets.getComponent('ebgGroupDr').hideWinBg();
            ebgBets.getComponent('ebgGroupDr').hideHe();
        }
        this.FaPai.getComponent('ebgFaPai').initMj()//麻将返回起点
        
        this.Bet.getComponent('ebgBets').hideStar()//隐藏桌面星星
        this.hideWaiting()//关闭等待下局开始
        let sicbo = cc.find('Canvas/Centerlayer/sicbo');//隐藏骰子
        sicbo.active = false;

        this.Bet.getComponent('ebgBets').pos.forEach((e)=>{
            e.getComponent('ebgGroupDr').clear() // 清空桌子上的钱
        })
    }
    /**
     * 房间初始化
     */
    gameInit(){
        
        if(this.gameInfo.RoomState == 2&&this.gameInfo.Remaining>3){
            //等待下局开始
            this.showWaiting()
            this.FaPai.getComponent('ebgFaPai').unAnimateStart(11,this.gameInfo,this.comparCard.bind(this));//发牌
            //显示结算
            let roomstate = {roomstate:2};
            this.gameProcess(roomstate);
        }
        
        this.gameInfo.PlayerList.forEach((e,index) => {
            if(index>=6) {
                //大于等于6属于线上玩家
                index = 7;
            }
            e.betList!.forEach((betItem) => {
                //如果是自己，则从7号座位投注
                if(e.ID == GameStatMgr.gsMgr.sTestUser){

                    this.Bet.getComponent('ebgBets').onGenZhuClick(7,betItem.area-1,betItem.betnum,7,false);
                   
                }else{
                    this.Bet.getComponent('ebgBets').onPlayerGenZhu(index+1,betItem.area-1,betItem.betnum,index+1,false);
                }
            });
        });
        this.Remaining = this.gameInfo.Remaining;   
        this.setCountdown(this.gameInfo.RoomState,this.gameInfo.Remaining);
    }
    /**
     * 绑定监听
     * @param btnName 按钮路径
     */
    public addBtnHandler(btnName:string) :void{
        
        var btn = cc.find("Canvas/" + btnName);
        Utils.addClickEvent(btn, this.node, "ebgGame", "onBtnClicked");
    }
    
    private applayDealerClick :boolean = false;
    /**
     * 点击按钮回调
     * @param event event对象
     */
    private onBtnClicked(event: cc.Event):void {
        
        var btnName = event.target.name;
        if(btnName != 'UiLayer'&&btnName.substring(0,4)!='chip'&&btnName != 'btn_back'){
            this.MusicMgr.loadMusic(6);
        }else if(btnName == 'btn_back'){
            // this.MusicMgr.loadMusic(9);
            this.MusicMgr.loadMusic(6);
        }
        //返回房间列表
        if (btnName == "btn_back") {
            
            let ebgBets :ebgBets = this.Bet.getComponent('ebgBets');
            let groupDr = null;
            let sum =  0;//计算是否投注
            GameStatMgr.gsMgr.sTestGold =Number(ebgBets.headPos[7].getChildByName('lab_info_gold').getComponent(cc.Label).string);
            for(let i =0; i<3 ; i++){
                groupDr = ebgBets.pos[i].getComponent('ebgGroupDr');
                sum +=Number(groupDr.Label_myBets.string);
            }
            //投注、申请上庄，当庄，都提示
            if(sum > 0||this.gameInfo.HostInfo.Dealer.ID == GameStatMgr.gsMgr.sTestUser || 
                this.rootCom.WaitingListID.indexOf(GameStatMgr.gsMgr.sTestUser) > -1){
                cc.find('Canvas/ReturnAlert').active = true;
            }else{
                this.MusicMgr.stopBgMusic() //关闭背景音乐
                cc.director.preloadScene('ebg',()=>{
                    cc.director.loadScene('ebg');
                })
            }
        }
        //打开帮助
        else if (btnName == "btn_help") {
            
            let rule = this.node.getChildByName('RulePanl');
            rule.getComponent('ebgRulePanl').moveToLeft();
        }
        //关闭音乐
        else if (btnName == "btn_sound") {
            this.MusicMgr.stopBgMusic();
           
            cc.find('Canvas/UiLayer/head/btn_mute').active = true;
            gHandler.audioMgr.setBgState(false)
            let self = this
            this.timeOut4 = setTimeout(() => {
                self.MusicMgr.stopEffects();
                clearTimeout(self.timeOut4)
            }, 300);
        }
        //打开音乐
        else if (btnName == "btn_mute") {
            let self = this
            this.timeOut4 = setTimeout(() => {
                self.MusicMgr.openEffects();
                clearTimeout(self.timeOut4)
            }, 300);
            this.MusicMgr.playBgMusic()
            cc.find('Canvas/UiLayer/head/btn_mute').active = false;
            console.log('点击按钮 mute');
            gHandler.audioMgr.setBgState(true)
        }
        //走势
        else if(btnName == 'btn_trend'){
            console.log('点击按钮 btn_trend');
            this.GameTrend.getComponent('ebgGameTrend').moveToBottom()
        }
        //点击关闭游戏规则
        else if(btnName == 'UiLayer'){
            let rule = this.node.getChildByName('RulePanl');
            rule.getComponent('ebgRulePanl').moveToRight();
        }
        //续投按钮
        else if(btnName =='btn_continvot'){
           if(cc.find('Canvas/UiLayer/bottom/btn_continvot').getComponent(cc.Button).interactable== false){
               return
           }
            var Bets = [];
            this.xutouArr.forEach((e)=>{
                let bet = {
                    area:e.x+1,
                    betnum:e.num
                }
                Bets.push(bet)
            })
            //判断是否超出限红
            if(this.Bet.getComponent('ebgBets').batchLimitBet(this.xutouValue)){
                //当玩家可用资金满足续投金额，但续投金额赔率已超过限红。续投按钮高亮显示，点击后不会投注，按钮灰显，并提示"续投失败"，提示样式及特效同二八杠玩家申请。下局续投键依然亮起。
                //玩家资金不够，也会提示续投失败
                cc.find('Canvas/UiLayer/bottom/btn_continvot').getComponent(cc.Button).interactable= false;
                this.rootCom.showTip(4);
                this.xutouTip.active = false;
                return
            } 
            GameStatMgr.gsMgr.SendPlayerBatchBetting(Bets)
            this.xutouArr =[];
            this.xutouValue = 0;
            cc.find('Canvas/UiLayer/bottom/btn_continvot').getComponent(cc.Button).interactable= false;
            this.xutouTip.active = false;
            
        }
        //上庄按钮
        else if(btnName == 'btn_shangzhuang'){
            var myScore = this.Bet.getComponent('ebgBets').headPos[7].getChildByName('lab_info_gold')!.getComponent(cc.Label).string;

            if(this.gameInfo.HostInfo.Dealer.ID == GameStatMgr.gsMgr.sTestUser ||this.rootCom.WaitingListID.indexOf(GameStatMgr.gsMgr.sTestUser) >-1 ){
                var node = cc.find('Canvas/dealerList');
                node.active = true;
            }else if(Number(myScore)<5000){
                this.rootCom.showTip(5)
                return
            }else{
                var node = cc.find('Canvas/dealerList');
                node.active = true;
            }
            this.applayDealerClick = false;
            
        }
        //关闭上庄列表
        else if(btnName == 'closeDealerList'){
            var node = cc.find('Canvas/dealerList');
            node.active = false;
        }
        //申请上庄
        else if(btnName == 'applayDealer'){
            
            var myScore = this.Bet.getComponent('ebgBets').headPos[7].getChildByName('lab_info_gold')!.getComponent(cc.Label).string;
            //当前可上庄金额，需要减去当局投注金额的十倍，保证够赔
            let desk_money = 0;
            this.Bet.getComponent('ebgBets').pos.forEach((item) => {
                desk_money += Number(item.getComponent('ebgGroupDr').Label_myBets.string)
            });
            myScore = Number(myScore) - desk_money*10;

            var dealerCondition = cc.find('Canvas/dealerList/input_condition').getComponent(cc.EditBox).string;
            if(myScore <Number(dealerCondition)&&this.gameInfo.HostInfo.Dealer.ID != GameStatMgr.gsMgr.sTestUser&&this.rootCom.WaitingListID.indexOf(GameStatMgr.gsMgr.sTestUser) <=-1){
                this.rootCom.showTip(0)
                return
            }else if(Number(dealerCondition)<5000&&this.gameInfo.HostInfo.Dealer.ID != GameStatMgr.gsMgr.sTestUser){
                this.rootCom.showTip(6)
                return
            }else if(/^\d+(\.\d*)$/.test(dealerCondition)){
                this.rootCom.showTip(7)
                return
            }
            if(!this.applayDealerClick){
                if(this.rootCom.WaitingListID.indexOf(GameStatMgr.gsMgr.sTestUser) >-1){
                    GameStatMgr.gsMgr.CancelDealerReq()
                }else if(this.gameInfo.HostInfo.Dealer.ID == GameStatMgr.gsMgr.sTestUser){
                    GameStatMgr.gsMgr.CancelDealerReq()
                }else{
                    GameStatMgr.gsMgr.ToDealerReq(dealerCondition)
                }
                this.rootCom.showTip(8)
                this.applayDealerClick = true;
            }else{
                this.rootCom.showTip(9)
            }
        }
        //显示玩家列表
        else if(btnName == 'icon_online_players'){
            if(!this.onlineClick){
                cc.log("你的点的太快了")
                return
            }
            this.onlineClick = false
            //延迟一秒后才能再次点击
            this.onlineClickTimer = setTimeout(() => {
               this.onlineClick  = true
            }, 1500);
            var node = cc.find('Canvas/playerList');
            var load = node.getChildByName('load')
            node.active = true;
            load.active = true;
            this.playSpine(load,'ani_load',false,3,()=>{
                load.active = false;
            })
            console.log("打开玩家列表")
            
            this.RenderPlayerList()
            
        }
        //关闭玩家列表
        else if(btnName =='closeList'){
            var node = cc.find('Canvas/playerList');
            node.active = false;
        }
        //上庄下拉框
        else if(btnName =='kuang_shangzhuang'){
            this.szContentInit();
            var arrow = cc.find('Canvas/Centerlayer/kuang_shangzhuang/p_icon_arrow');
            
            let szContent = cc.find('Canvas/Centerlayer/szContent');
            szContent.active = !szContent.active;
            if(szContent.active){
                arrow.angle = 180;
            }else{
                arrow.angle = 0;
            }
        }
        //关闭退出房间提示弹窗
        else if(btnName =='close_ReturnAlert'){
            cc.find('Canvas/ReturnAlert').active = false;
        }
        else if(btnName =='sure_ReturnAlert'){
            cc.find('Canvas/ReturnAlert').active = false;
        }
        else if(btnName == "TimeOutBtn"){
            this.rootCom.returnToHall = true
            //返回大厅
            GameStatMgr.gsMgr.Close() //关闭连接
            gHandler.audioMgr.stopBg();
            cc.director.loadScene('hall');
        }
    }

    public roomstate: number = -1;
    /**游戏状态 */
    private gameProcess(data: any):void {
        if (!data) {
            return;
        }
        this.roomstate = data.roomstate;
        switch (this.roomstate) {
            //开始下注
            case 1:
                this.cleanDesk();
                this.winLoseData = [0,0,0];//结算结果置空
                let Settlement =  cc.find('Canvas/Settlement');
                Settlement.removeAllChildren();//清除结算界面
                this.Bet.getComponent('ebgBets').upDateSeat()//更新座位
                this.betBtnInit()
                break;
            //停止下注
            case 2:
                this.forbiddenBtn(0)//禁用按钮
                break;
            //显示结算
            case 3: 
                this.showWinLosePre();
                //发送增加局数消息
                cc.systemEvent.emit(Api.trendAddResults,this.fapaiResults);

                for(let i =0;i<3;i++){
                    this.Bet.getComponent('ebgBets').pos[i].getComponent('ebgGroupDr').hideWinBg();
                    this.Bet.getComponent('ebgBets').pos[i].getComponent('ebgGroupDr').hideHe();
                }
                break;
        }
    }
    /***********************游戏流程************************************************ */
    RegsiterInit(){
        NotiCenter.Regsiter(NotiDef.RoomStartBet,this,this.startBetting);
        NotiCenter.Regsiter(NotiDef.RoomSettlement,this,this.stopBetting);
        NotiCenter.Regsiter(NotiDef.OtherJoin,this,this.onOtherJoin);
        NotiCenter.Regsiter(NotiDef.OthersExit,this,this.onOthersExit);
        NotiCenter.Regsiter(NotiDef.BetResult,this,this.onBetResult);
        NotiCenter.Regsiter(NotiDef.UniMessage,this,this.onUniMessage);
        NotiCenter.Regsiter(NotiDef.PlayerScore,this,this.onPlayerScore);
        NotiCenter.Regsiter(NotiDef.DealerInfo,this,this.onDealerInfo);
        NotiCenter.Regsiter(NotiDef.PlayerInfo,this,this.onPlayerInfo);
    }
    /**
     * 开始下注
     */
    private startBetting(msg :RoomStartBet):void{
        this.setCountdown(1,msg.Remaining)

        let roomstate = {roomstate:1};
        this.gameProcess(roomstate);
        
        var node = cc.instantiate(this.ani_start);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        this.MusicMgr.loadCardTypeMusic(22);
        this.playSpine(node,'ani_kaishiyouxi',false,1,()=>{
            canvas.removeChild(node);
        })
    }
     /**
     * 停止下注
     */
    private newScore :PlayerScore[]= [];
    private stopBetting(msg:RoomSettlement):void{
        console.log('停止下注**********msg',msg);
        this.Bet.getComponent('ebgBets').CheckPos(msg.BetNum)
        // 每局更新分数,先缓存，this.gameInfo的更新放在 显示结算页面之前 。避免结算中途有人进来刷新分数
        this.newScore = msg.NewScore;
        this.HostDiffScore = msg.DealerResult ;
        
        this.setCountdown(2,msg.Remaining)
        let roomstate = {roomstate:2};
        this.gameProcess(roomstate);
        //停止下注动画
        var node = cc.instantiate(this.ani_end);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        this.MusicMgr.loadCardTypeMusic(23);
        this.playSpine(node,'ani_tingzhixiazhu',false,1,()=>{
            canvas.removeChild(node);
            //发牌
            let num1 = msg.Roll.roll1;
            let num2 = msg.Roll.roll2;
            this.startSibo(num1,num2,msg);
        })
    }
     /**
     * 返回上庄信息
     * @param msg 
     */
    private onDealerInfo(msg:DealerInfo){
        cc.log('返回上庄信息',msg)
        this.HostScore = msg.Dealer.score;
        // this.szContent.active = false;
        if(!msg.Dealer){
            msg.Dealer ={
                ID:'',
                Nick:"",
                Head:"",
                score:0,
            }
            
        }
        if(this.gameInfo.HostInfo.Dealer.ID!= msg.Dealer.ID){
            
            this.gameInfo.HostInfo.Dealer.ID = msg.Dealer.ID;
            this.Bet.getComponent('ebgBets').upDateSeat()
            this.MusicMgr.loadFapaiMusic(8);
            console.log('庄家轮换***********',msg);
            this.changeHost(msg.Dealer.Head);
           
        }
        this.gameInfo.HostInfo.Dealer=msg.Dealer
        //等待上庄列表
        this.rootCom.WaitingList = msg.WaitingList;
        this.dealerInit()
    }
   
    // 下拉框更新
    private szContentInit(){
        var content = cc.find('Canvas/Centerlayer/szContent/szScrollView/view/content');
        content.removeAllChildren()
        this.rootCom.WaitingList.forEach((e)=>{
            var node = new cc.Node('Label');
            var label = node.addComponent(cc.Label);
            label.fontSize = 22;
            label.lineHeight = 24;
            label.string = e.Nick;
            content.addChild(node);
        })
    }
    //上庄界面更新
    private dealerInit(){
        var p_num = cc.find('Canvas/Centerlayer/kuang_shangzhuang/p_num').getComponent(cc.Label);
        p_num.string = `${this.rootCom.WaitingList.length}人`;
        var content = cc.find('Canvas/dealerList/ScrollView/view/content');
        content.removeAllChildren();
        this.rootCom.WaitingListID = []
        this.rootCom.WaitingList.forEach((e:DealerProper,index)=>{
            var node = cc.instantiate(this.dealerListItem);
            node.getComponent('ebgDealerListItem').init(e,this.rootCom.toDecimal2(e.score),index);
            content.children.forEach((item)=>{
                if(item.getComponent('ebgDealerListItem').id == e.ID) {
                    console.log('相同上庄ID,不渲染第二次')
                    return 
                }
            })
            content.addChild(node);
            this.rootCom.WaitingListID.push(e.ID)
        });
       
        //申请上庄、下庄按钮切换
        var btn_applayDealer = cc.find('Canvas/dealerList/applayDealer')
        var btn_shangzhuang = cc.find("Canvas/Centerlayer/btn_shangzhuang").getComponent(cc.Button);

        if(this.gameInfo.HostInfo.Dealer.ID == GameStatMgr.gsMgr.sTestUser ){
            this.rootCom.loadPlistSprite(`${this.LgSrc}/ebgPlist`,'btn_applyxz',btn_applayDealer)// 申请下装
            this.rootCom.loadButtonSprite(`${this.LgSrc}/ebgPlist`,"xiazhuang","xiazhuang2",btn_shangzhuang)//上庄按钮图片
        }else if(this.rootCom.WaitingListID.indexOf(GameStatMgr.gsMgr.sTestUser) >-1 ){
            this.rootCom.loadPlistSprite(`${this.LgSrc}/ebgPlist`,'btn_cancelapply',btn_applayDealer)// 取消申请
            this.rootCom.loadButtonSprite(`${this.LgSrc}/ebgPlist`,"quxiao1","quxiao2",btn_shangzhuang)//上庄按钮图片，按下图片
        }else{
            this.rootCom.loadPlistSprite(`${this.LgSrc}/ebgPlist`,'btn_applysz',btn_applayDealer)// 申请上庄
            this.rootCom.loadButtonSprite(`${this.LgSrc}/ebgPlist`,"btn_shangzhuang","shangzhuang2",btn_shangzhuang)//上庄按钮图片，按下图片
        }
        this.szContentInit();//下拉框更新
    }
    /**
     * 其他玩家进入
     * @param msg 
     */
    onOtherJoin(msg :OtherJoin){
        var include = 0;
        this.gameInfo.PlayerList.forEach(e => {
            if(e.ID == msg.ID) {
                include +=1;
            }
        });
        if(include == 0){
            // console.log('其他玩家进入***********',msg)
            let playerItem = {
                ID:msg.ID,
                Nick:msg.Nick,
                Head :msg.Head,
                score:msg.score,
                curBet: 0,
                allBet : 0,
                winTime: 0,
                betList:[],
            }
            this.gameInfo.PlayerList.push(playerItem);
            this.Bet.getComponent('ebgBets').upDateSeat();
        }
    }
    /**
     * 其他玩家退出
     */
    onOthersExit(msg:OthersExit){
        msg.list.forEach(e => {
            // console.log('其他玩家退出*********************',msg)
            this.gameInfo.PlayerList.forEach((Player,index) => {
                if(e == Player.ID){
                    this.gameInfo.PlayerList.splice(index,1)
                }
            });
            
        });
        if(msg.list.length>0){
            this.Bet.getComponent('ebgBets').upDateSeat();
        }
    }
    /**
     * 顺天地输赢情况
     * @param msg 
     */
    onBetResult(msg:BetResult){
        console.log('顺天地输赢情况',msg)
        this.winLoseData = [msg.Shun,msg.Tian,msg.Di];
    }
    /**
     * 被挤下线通知
     * @param msg 
     */
    onUniMessage(msg :UniMessage){
        console.log(msg.Message)
        if (msg.Code == 1 || msg.Code == 2) { 
            //1 其他地方登录
            //2 玩家被踢出
            this.rootCom.showTip(msg.Code)
            this.rootCom.returnToHall = true
            GameStatMgr.gsMgr.Close();
            gHandler.audioMgr.stopBg();
            cc.director.loadScene('hall');
        }
    }
   /**
    * 更新玩家金币
    * @param msg 
    */
    private onPlayerScore(msg:PlayerScore){
        cc.log("onPlayerScore更新玩家金币",msg)
        this.gameInfo.PlayerList.forEach((e)=>{
            if(e.ID == msg.ID){
                e.score = msg.score - msg.curBet;
            }
        })
        //结算时点上庄同步金额
        this.newScore.forEach((e)=>{
            if(e.ID==msg.ID){
                e.score = msg.score;
            }
        })
        this.Bet.getComponent('ebgBets').upDateSeat();
    }
    //限红改变
    onLimitRed(msg:number){
        this.LimitRed = msg;
    }
    /**
     * 摇骰子
     * @param num1 骰子1点数
     * @param num2 骰子2点数
     */
    public startSibo(roll1:number,roll2:number,msg:RoomSettlement):void{
        let self =this;
        let sicbo = cc.find('Canvas/Centerlayer/sicbo');
        sicbo.active = true;
        let bg = sicbo.getChildByName('bg');

        let dice01 = sicbo.getChildByName('dice01');
        let dice02 = sicbo.getChildByName('dice02');
        this.MusicMgr.loadMusic(17)
        this.playSpine(dice01,`dice1_roll`,false,1,()=>{
            this.playSpine(dice01,`dice1_p_${roll1}`,false,1,()=>{});
        });
        this.playSpine(dice02,`dice2_roll`,false,1,()=>{
            this.playSpine(dice02,`dice2_p_${roll2}`,false,1,()=>{
                this.MusicMgr.loadDianshuMusic(roll1+roll2);
                this.timeOut =setTimeout(()=>{
                    self.FaPai.getComponent('ebgFaPai').animStart(roll1+roll2,msg,this.comparCard.bind(this));//发牌
                    clearTimeout(this.timeOut)
                    sicbo.active = false;
                },500)
            });
        });
        this.playSpine(bg,'dicecup_roll',false,1,()=>{})
       
    }
    /**
     * 比牌完毕回调结果
     * @param data 输赢结果
     */
    private comparCard(data :fapaiItem[]):void {
        if(data[0].victory ==1 && data[1].victory== 1&& data[2].victory==1){
            let self = this;
            // 通杀
            this.timeOut3 = setTimeout(()=>{
                self.MusicMgr.loadCardTypeMusic(24)
                clearTimeout(this.timeOut3)
            },1000)
        }else if(data[0].victory ==2 && data[1].victory== 2&& data[2].victory==2){
            let self = this;
            //通赔
            this.timeOut3 = setTimeout(()=>{
                self.MusicMgr.loadCardTypeMusic(25)
                clearTimeout(this.timeOut3)
            },1000)
        }
        if(this.Remaining>5){
            let self = this;
            this.timeOut2 = setTimeout(()=>{
                self.comparCard(data);
                clearTimeout(this.timeOut2)
            },(this.Remaining - 5)*1000)
            return ;    
        }
        this.fapaiResults = data;
        let ebgBets :ebgBets = this.Bet.getComponent('ebgBets');
        let zhuangSeat = ebgBets.initHeadPos[0];
        let self = this;
        /**
         * 
         * @param dataindex 当前的循环次数
         */
        let winCallBack :Function = (dataindex:number)=>{
            if(dataindex==2){
                data.forEach((e:fapaiItem,i) => {
                    let chips = ebgBets.pos[i].getChildByName('chips');
                    //庄家输了发钱
                    if(e.victory == 2){
                        chips.children.forEach((item) => {
                            let ebgChipItem = item.getComponent('ebgChipItem');
                            //座位号0 ,投注区域i , 筹码编号,筹码返回座位号
                            ebgBets.onPlayerGenZhu(0,i,ebgChipItem.num,ebgChipItem.seat);
                        });
                        this.MusicMgr.loadMusic(15)
                    }
                });
                //赢钱的筹码返回各自下注的点
                this.timeOut1 = setTimeout(()=>{
                    var seatLoad = false;
                    var onlineLoad = false;
                    for(let i =0;i<3;i++){
                        //对应下注区域存放筹码的节点
                        let chips = ebgBets.pos[i].getChildByName('chips');
                        chips.children.forEach((item) => {
                            let seat = item.getComponent('ebgChipItem').seat;
                            let callfunc = cc.callFunc((e)=>{
                                chips.removeAllChildren();
                                clearTimeout(this.timeOut1)
                            })
                            if(seat ==0){
                                seat = item.getComponent('ebgChipItem').backseat;
                            }else if(seat>7){
                                onlineLoad= true;
                            }else{
                                seatLoad = true;
                            }
                            var action = cc.sequence(cc.moveTo(0.5,ebgBets.initHeadPos[seat]),callfunc);
                            item.runAction(action);
                        });
                    }
                    if(seatLoad){this.MusicMgr.loadMusic(14)}
                    if(onlineLoad){this.MusicMgr.loadMusic(13)}
                    //显示结算
                    let roomstate = {roomstate:3};
                    this.gameProcess(roomstate);
                },2000)
            }
        }
        data.forEach((item:fapaiItem,dataindex:number) => {
            let chips =ebgBets.pos[dataindex].getChildByName('chips');
            //如果有投注，则清空上一轮续投
            chips.children.forEach((e) => {
                let ebgChipItem = e.getComponent('ebgChipItem');
                if(ebgChipItem.seat == 7){
                    self.xutouValue = 0;
                    self.xutouArr=[];
                }
            });
        })
        data.forEach((item:fapaiItem,dataindex:number) => {
            let chips =ebgBets.pos[dataindex].getChildByName('chips');
            //保存续投
            chips.children.forEach((e) => {
                let ebgChipItem = e.getComponent('ebgChipItem');
                
                let ChipItem = {
                    index :ebgChipItem.seat,
                    x : dataindex,
                    num:ebgChipItem.num,
                    moeny:ebgChipItem.money
                }
                if(ebgChipItem.seat == 7){
                    self.xutouValue +=ebgChipItem.money;
                    self.xutouArr.push(ChipItem);
                }
            });
            this.xutouTip.getChildByName('num').getComponent(cc.Label).string = `${self.xutouValue }`;
            //庄家赢了收钱动画
            if(item.victory == 1){
                if(chips.children.length == 0) return winCallBack(dataindex);
                chips.children.forEach((chipsItem) => {
                    let callfunc = cc.callFunc(()=>{
                        chips.removeAllChildren();
                        //收钱结束
                        winCallBack(dataindex);
                    })
                    var action = cc.sequence(cc.moveTo(0.5,zhuangSeat),cc.moveTo(0,zhuangSeat),callfunc);
                    chipsItem.runAction(action);
                });
                self.MusicMgr.loadMusic(15)

            }else if(item.victory == 0){
                //显示和 
                ebgBets.pos[dataindex].getComponent('ebgGroupDr').showHe();
                winCallBack(dataindex);
            }else{
                //显示闲家赢的bg
                ebgBets.pos[dataindex].getComponent('ebgGroupDr').showWinBg();
                winCallBack(dataindex);
            }
        });
    }
    /**
     * 结算 
     */
    private showWinLosePre():void{
        // 把更新分数放在显示结算弹窗之前，避免结算错误
        // 每局更新分数
        this.gameInfo.PlayerList.forEach((PlayerListItem) => {
            this.newScore.forEach(NewScoreItem => {       
                if(PlayerListItem.ID == NewScoreItem.ID){
                    PlayerListItem.score = Number(this.rootCom.toDecimal2(NewScoreItem.score));
                    PlayerListItem.curBet = NewScoreItem.curBet;
                    PlayerListItem.allBet = NewScoreItem.allBet;
                    PlayerListItem.winTime = NewScoreItem.winTime;
                }
                if(NewScoreItem.ID== GameStatMgr.gsMgr.sTestUser){
                    GameStatMgr.gsMgr.sTestGold = Number(this.rootCom.toDecimal2(NewScoreItem.score));
                }
            });
        });

        this.showDiffMoney()

        let Settlement =  cc.find('Canvas/Settlement');
        if(this.winLoseData[0]==0 && this.winLoseData[1]==0 && this.winLoseData[2]==0){
            return
        }else if((this.winLoseData[0]+this.winLoseData[1]+this.winLoseData[2])>0){
            var node = cc.instantiate(this.setWin);
            this.MusicMgr.loadMusic(8)
        }else{
            var node = cc.instantiate(this.setLose);
            this.MusicMgr.loadMusic(7)
            
        }
        Settlement.addChild(node);
        node.getComponent('ebgSetLoseWin').init(this.winLoseData,this.HostDiffScore);
        
    }
    
   
    /**
     * 庄家轮换动画
     */
    private changeHost(Head){
        let zjlhNode = cc.find('Canvas/Centerlayer/p_zjlh');
        let headerIcon =zjlhNode.getChildByName('icon_tx');
        this.MusicMgr.setTheadIcon(Head,headerIcon,98,98);
        //原地缩放动画
        let action1 = cc.scaleTo(0.5,1,1)
        let action2 = cc.scaleBy(2,1,1)
        zjlhNode.active = true;
        let callBack = cc.callFunc(()=>{
            zjlhNode.active = false
            zjlhNode.scale = 0.8;
        })
        zjlhNode.runAction(cc.sequence(action1,action2,callBack));
    }
    
    /**
     * 投注倒计时
     * @param RoomState 当前房间状态
     * @param Remaining 倒计时
     */
    setCountdown(RoomState:number,Remaining:number){
        Remaining -= 1;
        let statefont = this.stateNode.children[0].getChildByName('font')
        let secondsLabel = this.stateNode.children[0].getChildByName('seconds').getComponent(cc.Label);
        this.switchStateFont(RoomState,statefont)
        secondsLabel.string = `${Remaining}`;
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            Remaining -=1;
            if(RoomState == 2){
                if(Remaining == 0){
                    this.switchStateFont(RoomState,statefont)
                    clearInterval(this.timer);
                }
            }else{
                if(Remaining<=3){
                    if(Remaining >=1 ){
                        this.MusicMgr.loadMusic(0)
                    }else{
                        this.MusicMgr.loadMusic(1);
                         this.switchStateFont(RoomState,statefont)
                        clearInterval(this.timer);
                    }
                }
            }   
            this.Remaining = Remaining;
            secondsLabel.string = `${Remaining}`;
        },1000)
    }
    switchStateFont(RoomState,btn){
        switch (RoomState){
            case 0:
                this.rootCom.loadPlistSprite(`${this.LgSrc}/ebgPlist`,'prepare',btn)
                break
            case 1:
                this.rootCom.loadPlistSprite(`${this.LgSrc}/ebgPlist`,'touzhu',btn)
                break
            case 2:
                this.rootCom.loadPlistSprite(`${this.LgSrc}/ebgPlist`,'p_settle',btn)
                break
        }
    }
     /**
      * 播放spine动画函数
      * @param node spine动画节点
      * @param animName 动画名称
      * @param loop 是否循环播放动画
      * @param callback 结束回调
      */
    public playSpine(node:cc.Node,animName :string, loop :boolean,speed:number, callback :Function) :void{
        let spine = node.getComponent(sp.Skeleton);
        let track = spine.setAnimation(0, animName, loop);
        spine.timeScale = speed;
        if (track) {
            // 注册动画的结束回调
            spine.setCompleteListener((trackEntry, loopCount) => {
                let name = trackEntry.animation ? trackEntry.animation.name : '';
                if (name === animName && callback) {
                    callback(); // 动画结束后执行自己的逻辑
                }
            });
        }
    }
    /**
     * 首次进入金币小于30，显示观战中
     */
    watchingInit(){
        let nowScore = Number(this.Bet.getComponent('ebgBets').headPos[7].getChildByName("lab_info_gold").getComponent(cc.Label).string);
        // 金币小于30，并且不是庄家，并且不在上庄等待列表
        if(nowScore<30 && (this.gameInfo.HostInfo.Dealer.ID != GameStatMgr.gsMgr.sTestUser) && (this.rootCom.WaitingListID.indexOf(GameStatMgr.gsMgr.sTestUser) == -1)){
            cc.find('Canvas/Watching').active = true;
        }else{
            cc.find('Canvas/Watching').active = false;
        }
    }
     /**
     * 金币不够关闭对应筹码
     */
    betBtnInit(){
        let nowScore = Number(this.Bet.getComponent('ebgBets').headPos[7].getChildByName("lab_info_gold").getComponent(cc.Label).string);
        this.recoveryBtn();
        if(this.gameInfo.HostInfo.Dealer.ID == GameStatMgr.gsMgr.sTestUser){
            //当庄的时候投注按钮灰显
            this.forbiddenBtn(0)
        }else if(nowScore<10){
            this.forbiddenBtn(0)
        }else if(nowScore<100){
            this.forbiddenBtn(1)
        }else if(nowScore<1000){
            this.forbiddenBtn(2)
        }else if(nowScore<5000){
            this.forbiddenBtn(3)
        }else if(nowScore<10000){
            this.forbiddenBtn(4)
        }
        //余额大于30并且续投的金额的10倍小于余额
        if(nowScore>30&&(this.xutouValue*10)<nowScore){
            this.showXuTouBtn();
        }
    }
    /**
     * 禁用btn
     */
    public forbiddenBtn(betNum):void{
        cc.find('Canvas/UiLayer/bottom/btn_continvot').getComponent(cc.Button).interactable= false;
        this.xutouTip.active = false;
        let self = this;
        this.Bet.getComponent('ebgBets').btn_chlilp.forEach((element,index) => {
            if(index>=betNum){
                element.getComponent(cc.Button).interactable= false;
                let spriteFrame = self.Bet.getComponent('ebgBets').ChipAtlas.getSpriteFrame(`p_ui_chip_bg_${index+1}_3`);
                element.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
    }
    /**
     * 启用btn
     */
    public recoveryBtn():void{
        if(GameStatMgr.gsMgr.sTestUser == this.gameInfo.HostInfo.Dealer.ID ) return;
        let self = this;
        this.Bet.getComponent('ebgBets').btn_chlilp.forEach((element,index) => {
            if(element.node.y>0){
                let spriteFrame = self.Bet.getComponent('ebgBets').ChipAtlas.getSpriteFrame(`p_ui_chip_bg_${index+1}_2`);
                element.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }else if(!element.getComponent(cc.Button).interactable){
                let spriteFrame = self.Bet.getComponent('ebgBets').ChipAtlas.getSpriteFrame(`p_ui_chip_bg_${index+1}_1`);
                 element.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            element.getComponent(cc.Button).interactable= true;
            
        });
    }
    /**
     * 启用btn
     */
    public showXuTouBtn():void{
        if(GameStatMgr.gsMgr.sTestUser == this.gameInfo.HostInfo.Dealer.ID ) return;
        if(this.xutouArr.length >0){
            cc.find('Canvas/UiLayer/bottom/btn_continvot').getComponent(cc.Button).interactable= true;
            this.xutouTip.active = true;
        }
    }
    /**
     * 加减钱，瓢字
     */
    showDiffMoney():void{
        let self = this;
        let headPos = this.Bet.getComponent('ebgBets').headPos;
        let addMoneyFun = (diffScore:number,posindex:number)=>{
            if(Number(diffScore.toFixed(2))>0){
                var addMoney = headPos[posindex].getChildByName('addMoney');
            }else if(Number(diffScore.toFixed(2))<0){
                var addMoney = headPos[posindex].getChildByName('unaddMoney');
            }else{
                //为0，则 return
                return
            }
            //保留两位小数，并转换小数点
            var diffScoreStr = this.rootCom.toDecimal2(Math.abs(diffScore))
            let str  = diffScoreStr.replace(/\./g,'/');
            addMoney.active = true;
            addMoney.position =cc.v2(0,0);
            addMoney.getChildByName('label').getComponent(cc.Label).string = `${str}`;
            let step = posindex==1 || posindex == 2 ? 130 :80
            var action = cc.moveBy(1.2,cc.v2(0,step));
            var action2 = cc.moveBy(2,cc.v2(0,0));
            let callback = cc.callFunc(()=>{
                addMoney.active = false;
                addMoney.getChildByName('label').getComponent(cc.Label).string = ``;
            })
            var act = cc.sequence(action,action2,callback)
            addMoney.runAction(act)
        }
        
        headPos.forEach((posItem,posindex) => {
            if(posindex == 0){
                //庄家加钱动画
                addMoneyFun(this.HostDiffScore,posindex);
                if(this.HostDiffScore >0){
                    let spine = posItem.getChildByName('spine');
                    spine.active = true;
                    self.playSpine(spine,'tou_eff_shiny',false,1,()=>{})
                    self.playSpine(spine,'win',false,1,()=>{
                        spine.active= false;
                    })
                }
                //如果自己当庄
                if(this.gameInfo.HostInfo.Dealer.ID == GameStatMgr.gsMgr.sTestUser){
                    let zhuangGold = posItem.getChildByName('lab_info_gold')!.getComponent(cc.Label);
                    zhuangGold.string = this.rootCom.toDecimal2(Number(zhuangGold.string) + this.HostDiffScore);
                }
            }else if(posindex >7){
                return;
            }else{
                let id = posItem.getChildByName('lab_info_id').getComponent(cc.Label).string;
                let oldScore = posItem.getChildByName('lab_info_gold')!.getComponent(cc.Label).string
                this.newScore.forEach((scoreItem) => {
                    if(scoreItem.ID == id){
                        let newScore = this.rootCom.toDecimal2(scoreItem.score)
                        let diffScore =( Number(newScore)-Number(oldScore))-scoreItem.curBet;
                        posItem.getChildByName('lab_info_gold').getComponent(cc.Label).string = `${Math.abs(Number(this.rootCom.toDecimal2(scoreItem.score)))}`;
                        addMoneyFun(diffScore,posindex);
                        //加钱动画
                        if(Number(diffScore.toFixed(2)) >0){
                            let spine = posItem.getChildByName('spine');
                            spine.active = true;
                            self.playSpine(spine,'tou_eff_shiny',false,1,()=>{})
                            self.playSpine(spine,'win',false,1,()=>{
                                spine.active= false;
                            })
                        }
                    }
                });
            }
        });
    }
    
    btnInit(): void {
        this.addBtnHandler('UiLayer/head/btn_back');
        this.addBtnHandler('UiLayer/head/btn_help');
        this.addBtnHandler('UiLayer/head/btn_sound');
        this.addBtnHandler('UiLayer/head/btn_mute');
        this.addBtnHandler('UiLayer/head/btn_trend');
        this.addBtnHandler('UiLayer/bottom/btn_continvot');
        this.addBtnHandler('Centerlayer/btn_shangzhuang');
        this.addBtnHandler('Centerlayer/icon_online_players');
        this.addBtnHandler('Centerlayer/kuang_shangzhuang');
        this.addBtnHandler('dealerList/closeDealerList');
        this.addBtnHandler('dealerList/applayDealer');
        //点击UiLayer
        this.addBtnHandler('UiLayer');
        this.addBtnHandler('ReturnAlert/close_ReturnAlert');
        this.addBtnHandler('ReturnAlert/sure_ReturnAlert');
        this.addBtnHandler('TimeOutTip/TimeOutBtn');
        this.addBtnHandler('playerList/closeList');
        let BgState = gHandler.audioMgr.getBgState();//背景音乐
        if(!BgState){
            //背景音乐都为假时，才显示关闭按钮
            cc.find('Canvas/UiLayer/head/btn_mute').active = true;
            this.MusicMgr.stopBgMusic();
            this.MusicMgr.stopEffects();
        }else{
            this.MusicMgr.openEffects()
            //播放子游戏的背景音乐
            this.MusicMgr.playBgMusic()
        }
    }

    showWaiting(){
        //等待下局开始
        cc.find('Canvas/Waiting').active = true;
        let dot1 = cc.find('Canvas/Waiting/wait_dot1');
        let dot2 = cc.find('Canvas/Waiting/wait_dot2');
        let dot3 = cc.find('Canvas/Waiting/wait_dot3'); 
        var action1_show = cc.fadeTo(0.5,255);
        var action1_hide = cc.fadeTo(0.5,0);
        var action2_show = cc.fadeTo(0.5,255);
        var action2_hide = cc.fadeTo(0.5,0);
        var action3_show = cc.fadeTo(0.5,255);
        var action3_hide = cc.fadeTo(0.5,0);
        dot1.stopAllActions()
        dot2.stopAllActions()
        dot3.stopAllActions()
        let callBack1 = cc.callFunc(()=>{
            dot2.runAction(cc.sequence(action2_show,action2_show,callBack2))
        })
        let callBack2 = cc.callFunc(()=>{
            dot3.runAction(cc.sequence(action3_show,action3_show,callBack3))
        })
        let callBack3 = cc.callFunc(()=>{
            dot1.runAction(action1_hide)
            dot2.runAction(action2_hide)
            dot3.runAction(action3_hide)
            dot1.runAction(cc.sequence(action1_show,action1_show,callBack1))
        })
        dot1.runAction(cc.sequence(action1_show,action1_show,callBack1))
    }
    AddPlayerToOnlineList(){
        this.gameInfo.PlayerList.forEach((e,i)=>{
            var node = cc.instantiate(this.playerItem);
            this.ListContent.addChild(node);
        })
    }
    RenderPlayerList(){
        
        this.ListContent.parent.parent.getComponent(cc.ScrollView).scrollToTop(0.1)
        let dushen = this.gameInfo.PlayerList.splice(0, 1);
        let player = this.gameInfo.PlayerList.sort((a, b) => b.allBet - a.allBet);
        player.unshift(dushen[0])
        cc.log("this.ListContent.children.length",this.ListContent.children.length)
        cc.log("player.length",player.length)
        if(this.ListContent.children.length < player.length){
            var step = player.length - this.ListContent.children.length
            for(var i = 0;i< step;i++){
                var node = cc.instantiate(this.playerItem);
                this.ListContent.addChild(node);
            }
        }else if(this.ListContent.children.length > player.length){
            var step =this.ListContent.children.length - player.length 
            for(var i = 0;i< step;i++){
                var node = this.ListContent.children[i]
                this.ListContent.removeChild(node);
            }
        }
        cc.log("this.ListContent.children.length",this.ListContent.children.length)
        player.forEach((e,i)=>{
            this.ListContent.children[i].getComponent('ebgPlayerListItem').init(i,e);
        })
        // 前10个做动画，
        let j = 0;
        var action = cc.moveBy(0,cc.v2(2000,0));
        var action2 = cc.moveBy(0.3,cc.v2(-2000,0));
        let back = cc.callFunc(()=>{
            j++
            if(j>=10) {
                return 
            }
            this.ListContent.children[j].runAction(cc.sequence(action,action2,back)); 
        })
        this.ListContent.children[j].runAction(cc.sequence(action,action2,back)); 
    }
    hideWaiting(){
        cc.find('Canvas/Waiting').active = false;
    }
    //设置语言相关的资源和字
   setLanguageResource(){
    let src = ''
    switch(Language_ebg.Lg.Language){
        case "Chinese": src = `language/Chinese`
            break
        case "English": src = 'language/English'
            break
        case "Thai": src = 'language/Thai'
            break
        case "Vietnamese": src = 'language/Vietnamese' 
            break
        default : src = `language/Chinese`
            console.log('未知语言',Language_ebg.Lg.Language)
            break
    }
    this.LgSrc = src
    let limit_label= cc.find('Canvas/GameTrend/limit_label').getComponent(cc.Label)
    let ggzLabel = cc.find('Canvas/Watching/ggzLabel').getComponent(cc.Label)
    let ReturnAlertLabel = cc.find('Canvas/ReturnAlert/label').getComponent(cc.Label)
    let TimeOutLabel = cc.find('Canvas/TimeOutTip/label').getComponent(cc.Label)
    let trendToggleBg = cc.find('Canvas/GameTrend/ebgGameTrendToggle/Background')
    let trendToggleCk = cc.find('Canvas/GameTrend/ebgGameTrendToggle/checkmark')
    let trendBtn_close= cc.find('Canvas/GameTrend/btn_close')
    let trendBiao_left= cc.find('Canvas/GameTrend/biao/biao_left')
    let trendRate= cc.find('Canvas/GameTrend/rate')
    let xiazhu_shun= cc.find('Canvas/UiLayer/bg/xiazhuqu_shun/xiazhu_shun')
    let xiazhu_tian= cc.find('Canvas/UiLayer/bg/xiazhuqu_tian/xiazhu_tian')
    let xiazhu_di= cc.find('Canvas/UiLayer/bg/xiazhuqu_di/xiazhu_di')
    let zhuang= cc.find('Canvas/Centerlayer/head_banker/zhuang')
    let btn_shangzhuang= cc.find('Canvas/Centerlayer/btn_shangzhuang')
    let xutou_bg = cc.find('Canvas/UiLayer/bottom/btn_continvot/Background')
    let icon_online_players = cc.find('Canvas/Centerlayer/icon_online_players')
    let wait = cc.find('Canvas/Waiting/wait')
    let title_wjlb = cc.find('Canvas/playerList/title_wjlb')
    let szlb = cc.find('Canvas/dealerList/szlb')
    let szlbBtn = cc.find('Canvas/ReturnAlert/sure_ReturnAlert')
    let timeOutBtn = cc.find('Canvas/TimeOutTip/TimeOutBtn')
    
    
    limit_label.string = Language_ebg.Lg.changeLanguage(14)
    ggzLabel.string = Language_ebg.Lg.changeLanguage(20)
    ReturnAlertLabel.string = Language_ebg.Lg.changeLanguage(21)
    TimeOutLabel.string = Language_ebg.Lg.changeLanguage(22)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'btn_auto',trendToggleBg)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'btn_auto_gou',trendToggleCk)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'btn_shouqi',trendBtn_close)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'biao_left',trendBiao_left)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'20_rate',trendRate)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'xiazhu_shun',xiazhu_shun)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'xiazhu_tian',xiazhu_tian)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'xiazhu_di',xiazhu_di)
    this.rootCom.loadPlistSprite(`${src}/lostPlist`,'zhuang',zhuang)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'btn_shangzhuang',btn_shangzhuang)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'btn_xutou1',xutou_bg)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_online_players',icon_online_players)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'wait',wait)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'title_wjlb',title_wjlb)
    this.rootCom.loadSprite(`${src}/szlb_di`,szlb)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'surebtn1',szlbBtn)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'surebtn1',timeOutBtn)

    let spineBg_ds = cc.find('Canvas/Centerlayer/head_ds/spineBg')
    let spineBg_fh = cc.find('Canvas/Centerlayer/head_fh_1/spineBg')
    let ggzSp = cc.find('Canvas/Watching/ggzSp')
    spineBg_ds.children.forEach((e)=>{
        if (e.name == Language_ebg.Lg.Language){
            e.active = true
        }else{
            e.active = false
        }
    })
    spineBg_fh.children.forEach((e)=>{
        if (e.name == Language_ebg.Lg.Language){
            e.active = true
        }else{
            e.active = false
        }
    })
    ggzSp.children.forEach((e)=>{
        if (e.name == Language_ebg.Lg.Language){
            e.active = true
        }else{
            e.active = false
        }
    })
  } 
    
    onDestroy(){
        this.restoreInitial()
        cc.game.off(cc.game.EVENT_HIDE)
        cc.game.off(cc.game.EVENT_SHOW)
        cc.systemEvent.off(Api.offLine);
        cc.systemEvent.off(Api.onLine);
        cc.systemEvent.off("breakConnectTimeOut");
    }
    private onOffLine=()=>{
        cc.log('cc.game.offLine')
        this.cleanDesk()
        this.FaPai.getComponent('ebgFaPai').initMj()//麻将返回起点
        NotiCenter.Regsiter(NotiDef.EnterRoomRsp,this,this.enterRoomRsp);
        //关闭等待下局开始
        this.hideWaiting()
        
    }
    private onOnLine = ()=>{
        cc.log('cc.game.onLine')
        //发送进入游戏房间请求
        this.RegsiterInit()
        //清空缓存
        this.rootCom.PlayerList = []
        GameStatMgr.gsMgr.enterRoomReq(this.rootCom.RoomIndex);
        //等待下局开始
        this.showWaiting()
    }
    onBreakConnectTimeOut = ()=> {
        cc.find("Canvas/TimeOutTip").active = true
    }
    private event_hide=()=>{
        cc.log('cc.game.event_hide')
        this.restoreInitial();
        this.cleanDesk()
        this.FaPai.getComponent('ebgFaPai').initMj()//麻将返回起点
        NotiCenter.Regsiter(NotiDef.RoomInfo,this,this.onRoomInfo);
    }
    private event_show=()=>{
        cc.log('cc.game.event_show')
        this.RegsiterInit()
        //清空缓存
        this.rootCom.PlayerList = []
        //发送进入游戏房间请求
        GameStatMgr.gsMgr.SendRoomInfoReq();
    }
    /**
     * 清空所有定时器、取消消息监听
     */
    restoreInitial(){
        clearTimeout(this.timeOut)
        clearTimeout(this.timeOut1)
        clearTimeout(this.timeOut2)
        clearTimeout(this.timeOut3)
        clearInterval(this.timer)
        clearInterval(this.timeOut4)
        clearTimeout(this.onlineClickTimer)
        NotiCenter.UnRegAll(this);
        cc.systemEvent.off(Api.LimitRed);
        cc.systemEvent.off(Api.onEnterRoomRsp);
    }
}
