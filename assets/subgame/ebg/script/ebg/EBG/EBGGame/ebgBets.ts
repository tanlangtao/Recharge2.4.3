/*ebg投注筹码*/
const { ccclass, property } = cc._decorator;
import { PlayerBetted, PlayerBatchBetted,ClassArea } from '../interface/ebgInterface';
import ebgMusicMgr from './ebgMusicMgr';
import ebgGame from './ebgGame';
import { NoticeDef as NotiDef, NotificationCenter as NotiCenter } from "../../base/ebgNotification";
import { GameStatMgr } from "../ebgGameStatMgr";
import { Api } from '../untils/ebgApi';
import { msg } from '../../net/msg_pb-ebg';
@ccclass
export default class ebgBets extends cc.Component {
    readonly sClassName = "ebgBets";

    @property(cc.Button)
    btn_chlilp: cc.Button[] = [];//选择筹码

    @property(cc.Prefab)
    chilp_1: cc.Prefab[] = [];//筹码

    @property(cc.Node)
    headPos: cc.Node[] = [];//所有需要投注的头像

    @property(cc.Node)
    pos: cc.Node[] = [];//投注的位置

    @property(cc.SpriteFrame)
    currentChip: cc.SpriteFrame = null;//选中筹码资源

    @property(cc.SpriteAtlas)
    ChipAtlas: cc.SpriteAtlas = null;//所有筹码资源

    public initHeadPos: cc.Vec2[] = [];//存储所有图像的初始位置

    public initBet: cc.Vec2[] = [];//存储所有筹码按钮的初始位置

    @property(cc.Node)
    allChips: cc.Node = null;//筹码

    @property(cc.Prefab)
    starFlashFabNode: cc.Prefab = null;

    @property
    Chip_num: number = 0;//筹码编号,初始默认为第一个
    BettingArea: number = 0;//下注区域,初始默认为第一个
    MusicMgr: ebgMusicMgr = null;//音乐类
    ebgGame: ebgGame = null;//game类
    rootCom = null;
    AudioOnline = 0 ;//计算在线玩家投注音效
    onLoad() {
        this.init();
        this.MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr');
        this.ebgGame = cc.find('Canvas').getComponent('ebgGame');
        this.rootCom = cc.find('RootNode').getComponent('ebgRootNode');
        this._registerBtns();
        this._group_drBtns();
        this.upDateSeat()
        NotiCenter.Regsiter(NotiDef.PlayerBetted, this, this.onBetRsp);
        NotiCenter.Regsiter(NotiDef.PlayerBatchBetted, this, this.onBatchBetRsp);

        cc.game.on(cc.game.EVENT_HIDE, () => {
            NotiCenter.UnRegAll(this);
        });
        cc.game.on(cc.game.EVENT_SHOW, () => {
            NotiCenter.UnRegAll(this);
            NotiCenter.Regsiter(NotiDef.PlayerBetted, this, this.onBetRsp);
            NotiCenter.Regsiter(NotiDef.PlayerBatchBetted, this, this.onBatchBetRsp);
        });
        cc.systemEvent.on(Api.onEnterRoomRsp,this.onEnterRoomRsp.bind(this));
        cc.systemEvent.on(Api.offLine,this.onOffLine.bind(this));//断线
        cc.systemEvent.on(Api.onLine,this.onOnLine.bind(this));//重连 
    }
    /**
     * 投注,下注区域事件监听
     */
    private _group_drBtns(): void {
        var self = this;
        var group_drBtn = function (x): void {
            self.pos[x].on('touchstart', function (event) {
                self.MusicMgr.loadMusic(3)
                //关闭游戏说明
                let rule = cc.find("Canvas/RulePanl");
                
                if(rule.position.x<1000){
                    rule.getComponent('ebgRulePanl').moveToRight();
                    return
                }
                //如果显示观战中，提示充值
                if(cc.find('Canvas/Watching').active  ){
                    self.rootCom.showTip(0)
                    return
                }
                if (self.btn_chlilp[0].interactable == false) return;
               
                //保存当前下注区域
                self.BettingArea = x;
                //判断限红
                if (self.limitBet(self.Chip_num)) return;
                GameStatMgr.gsMgr.SendBet(x + 1, self.Chip_num);
               
            }, this);

        };
        for (var i = 0; i < self.pos.length; ++i) {
            let x = i;
            group_drBtn(x);
        }
    }
    onEnterRoomRsp(msg){
        this.upDateSeat();
    }
    /**
     * 收到投注msg
     * @param msg 
     */
    onBetRsp(msg: PlayerBetted) {
        // console.log("收到投注msg",msg)
        //如果是自己发，则座位号是 7 
        if (msg.PlayerID == GameStatMgr.gsMgr.sTestUser) {
            this.onGenZhuClick(7, msg.Bet.area - 1, msg.Bet.betnum, 7);
        } else {
            //如果不是自己发，则循环找到对应座位号。i+1是因为0号座位是庄家
            let player = this.ebgGame.gameInfo.PlayerList;
            player.forEach((e, i) => {
                if (e.ID == msg.PlayerID) {
                    if (i >= 5) {
                        this.onPlayerGenZhu(8, msg.Bet.area - 1, msg.Bet.betnum, 8);
                    } else {
                        this.onPlayerGenZhu(i + 1, msg.Bet.area - 1, msg.Bet.betnum, i + 1);
                    }
                }
            });
        }
        //如果是赌神，则发射星星动画
        if (msg.PlayerID == this.ebgGame.gameInfo.PlayerList[0].ID) {
            this.newStar(msg.Bet.area - 1)
        }

    }
    /**
     * 收到批量投注msg
     * @param msg 
     */
    onBatchBetRsp(msg: PlayerBatchBetted) {
        this.MusicMgr.loadMusic(10)
        //如果是自己发，则座位号是 7 
        if (msg.PlayerID == GameStatMgr.gsMgr.sTestUser) {
            msg.Bets.forEach(e => {
                this.onGenZhuClick(7, e.area - 1, e.betnum, 7,false);
            });
        } else {
            //如果不是自己发，则循环找到对应座位号。i+1是因为0号座位是庄家
            let player = this.ebgGame.gameInfo.PlayerList;
            player.forEach((e, i) => {
                if (e.ID == msg.PlayerID) {
                    msg.Bets.forEach(e => {
                        if (i >= 5) {
                            this.onPlayerGenZhu(8, e.area - 1, e.betnum, 8,false);
                        } else {
                            this.onPlayerGenZhu(i + 1, e.area - 1, e.betnum, i + 1,false);
                        }
                    });
                }
            });
        }
        //如果是赌神，则发射星星动画
        if (msg.PlayerID == this.ebgGame.gameInfo.PlayerList[0].ID) {
            msg.Bets.forEach(e => {
                this.newStar(e.area - 1)
            });
        }
    }
    /**
     * 获取头像初始位置
     */
    public init(): void {
        this.headPos.forEach(e=>{
            e.getComponent(cc.Widget).updateAlignment()
            this.initHeadPos.push(e.position)
        })
        this.btn_chlilp.forEach((e) => {
            this.initBet.push(e.node.position);
        })

    }
    /**
     * 更新座位信息
     */
    public upDateSeat(): void {
        let player = this.ebgGame.gameInfo.PlayerList.sort((a, b) => b.allBet - a.allBet);
        //如果房间一个人都没有,把自己加上
        if (player.length == 0) {
            let palyerItem = {
                ID: GameStatMgr.gsMgr.sTestUser,
                score: GameStatMgr.gsMgr.sTestGold,
                Nick:GameStatMgr.gsMgr.sTestNick,
                Head :GameStatMgr.gsMgr.sHeadImg,
                curBet: 0,
                allBet : 0,
                winTime: 0,
                betList:[],
            }
            this.ebgGame.gameInfo.PlayerList.push(palyerItem);
        }
        let dushen = player[0];
        player.forEach((e) => {
            //胜场最多为赌神，庄家除外
            if (e.winTime > dushen.winTime && e.ID != this.ebgGame.gameInfo.HostInfo.Dealer.ID) {
                dushen = e;
            }
            
        });
        let dushenIndex = player.indexOf(dushen);
        let arr = player.splice(dushenIndex, 1);
        //把赌神放在最前面
        player.unshift(arr[0]);
        var firstEnter = 0;
        this.headPos.forEach((e, i) => {
            if (i > 6) return
            e.getChildByName('lab_info_id')!.getComponent(cc.Label).string = '';
            e.getChildByName('lab_info_gold')!.getComponent(cc.Label).string = '';
            e.getChildByName('lab_info_nick')!.getComponent(cc.Label).string = '';
            e.getChildByName('icon_tx')!.getComponent(cc.Sprite).spriteFrame = null;
        })
        // 设置庄
        this.ebgGame.HostScore = this.ebgGame.gameInfo.HostInfo.Dealer.score;//首次进入庄家金币
        this.headPos[0].getChildByName('lab_info_id')!.getComponent(cc.Label).string = this.ebgGame.gameInfo.HostInfo.Dealer.ID;
        this.headPos[0].getChildByName('lab_info_gold')!.getComponent(cc.Label).string = this.rootCom.toDecimal(this.ebgGame.HostScore) ;
        this.headPos[0].getChildByName('lab_info_nick')!.getComponent(cc.Label).string = this.ebgGame.gameInfo.HostInfo.Dealer.Nick;
        let newLimitRed = Math.floor(this.ebgGame.HostScore / 10) < 20000 ? Math.floor(this.ebgGame.HostScore / 10) : 20000;
        cc.systemEvent.emit(Api.LimitRed, newLimitRed);
        let zhuangIcon =this.headPos[0].getChildByName('icon_tx');
        this.MusicMgr.setHeadIcon(this.ebgGame.gameInfo.HostInfo.Dealer.Head,zhuangIcon,100,100)
        //当前玩家列表
        player.forEach((e, i) => {
            //设置自己
            if (GameStatMgr.gsMgr.sTestUser == e.ID) {
                firstEnter = 1;
                this.headPos[7].getChildByName('lab_info_id')!.getComponent(cc.Label).string = e.ID;
                this.headPos[7].getChildByName('lab_info_gold')!.getComponent(cc.Label).string = this.rootCom.toDecimal(e.score);
                this.headPos[7].getChildByName('lab_info_nick')!.getComponent(cc.Label).string = e.Nick;
                let headerIcon =this.headPos[7].getChildByName('icon_tx');
                this.MusicMgr.setHeadIcon(e.Head,headerIcon,80,80);
            }
            if (i >= 6) return
            //设置其他玩家座位
            this.headPos[i + 1].getChildByName('lab_info_id')!.getComponent(cc.Label).string = e.ID;
            this.headPos[i + 1].getChildByName('lab_info_gold')!.getComponent(cc.Label).string = this.rootCom.toDecimal(e.score);
            this.headPos[i + 1].getChildByName('lab_info_nick')!.getComponent(cc.Label).string = e.Nick;
            let headerIcon =this.headPos[i + 1].getChildByName('icon_tx');
            this.MusicMgr.setHeadIcon(e.Head,headerIcon,100,100)
           
        });
        //如果是第一次进房间
        if (firstEnter == 0) {
            console.log('GameStatMgr.gsMgr.sTestGold',GameStatMgr.gsMgr.sTestGold)
            let palyerItem = {
                ID: GameStatMgr.gsMgr.sTestUser,
                score: GameStatMgr.gsMgr.sTestGold,
                Nick:GameStatMgr.gsMgr.sTestNick,
                Head :GameStatMgr.gsMgr.sHeadImg,
                curBet: 0,
                allBet : 0,
                winTime: 0,
                betList:[],
            }
            this.ebgGame.gameInfo.PlayerList.push(palyerItem);
            this.upDateSeat()
        }
        //系统庄
        if (this.ebgGame.gameInfo.HostInfo.Dealer.ID == '') {
            this.headPos[0].getChildByName('lab_info_id')!.getComponent(cc.Label).string = `系统庄家`;
            this.headPos[0].getChildByName('lab_info_gold')!.getComponent(cc.Label).string = `————————`;
            this.headPos[0].getChildByName('lab_info_nick')!.getComponent(cc.Label).string = `系统庄家`;
            cc.systemEvent.emit(Api.LimitRed, 20000);
            var headerIcon = this.headPos[0].getChildByName('icon_tx')
            this.MusicMgr.setHeadIcon('1.png',headerIcon,100,100)
        }
    }
    /**
     * 判断投注是否限红
     */
    private limitBet(num: number): boolean {
        // 现在下注规则变成：对于玩家个人，只判断下注额是否小于等于所持金额的十分之一，并且在2000以内
        // 对于庄家而言，如果是系统庄家不做任何判断。如果是玩家庄家，需要判断下注总额要在上庄金额的十分之一以内
        let total_money = 0;
        this.pos.forEach((item)=>{
            total_money += Number(item.getComponent('ebgGroupDr').Label_totalBets.string);//当前桌子总金额
        })
        let desk_money = 0;//桌子上的钱
        this.pos.forEach((item)=>{
            desk_money += Number(item.getComponent('ebgGroupDr').Label_myBets.string);//当前玩家桌子总金额
        })
        var money4 = 0;//当前筹码金额
        switch (num) {
            case 0: money4 = 1; break;
            case 1: money4 = 10; break;
            case 2: money4 = 100; break;
            case 3: money4 = 500; break;
            case 4: money4 = 1000; break;
        }
        let nowScore = Number(this.headPos[7].getChildByName('lab_info_gold')!.getComponent(cc.Label).string);

        if ((desk_money + money4)  >  ((nowScore + desk_money)/10)) {//玩家的总金额是桌子上的钱加上头像上的钱
            this.rootCom.showTip(1)//钱不够赔
            return true
        }
        if (this.ebgGame.gameInfo.HostInfo.Dealer.ID != '' && (total_money + money4 > this.ebgGame.LimitRed / 10)) {
            // 如果是玩家庄家，需要判断下注总额要在上庄金额的十分之一以内
            this.rootCom.showTip(2)//限红
            return true
        }
        if (desk_money + money4 > this.ebgGame.LimitRed / 10) {
            console.log('桌面金额:',desk_money,'下注金额:',money4,'限红:',this.ebgGame.LimitRed / 10)
            this.rootCom.showTip(3)//限红
            return true
        }
        
    }
    /**
     * 判断续投是否限红
     */
    public batchLimitBet(money: number): boolean {
        
        // 现在下注规则变成：对于玩家个人，只判断下注额是否小于等于所持金额的十分之一，并且在2000以内
        // 对于庄家而言，如果是系统庄家不做任何判断。如果是玩家庄家，需要判断下注总额要在上庄金额的十分之一以内
        let total_money = 0;//当前桌子上总金额
        this.pos.forEach((item)=>{
            total_money += Number(item.getComponent('ebgGroupDr').Label_totalBets.string);//当前桌子总金额
        })
        let desk_money = 0;//玩家桌子上的钱
        this.pos.forEach((item)=>{
            desk_money += Number(item.getComponent('ebgGroupDr').Label_myBets.string);//当前玩家桌子总金额
        })
        var money4 = money;//当前要下注的筹码金额
        let nowScore = Number(this.headPos[7].getChildByName('lab_info_gold')!.getComponent(cc.Label).string);
        if(this.ebgGame.gameInfo.HostInfo.Dealer.ID != '' && (total_money + money4 > this.ebgGame.LimitRed / 10)){
            //是玩家庄家，需要判断下注总额要在上庄金额的十分之一以内
            return true
        }else if (desk_money + money4 > this.ebgGame.LimitRed / 10) {
            //超出限红
            return true
        } else if((desk_money + money4) > ((nowScore + desk_money)/10)){
            //资金不够10倍
            return true
        }else{
            return false
        }
    }
    /**
     * 点击筹码监听
     */
    private _registerBtns(): void {
        var self = this;
        var action = cc.moveBy(0.1, cc.v2(0, 30));
        self.btn_chlilp[0].node.runAction(action);
        
        var registerBtn = function (index) {
            self.btn_chlilp[index].node.on('touchstart', function (event) {
                self.MusicMgr.loadMusic(2)
                if (self.btn_chlilp[index].interactable == false) return;
                self.btn_chlilp.forEach((e, i) => {
                    let btn_chlilp = e.node;
                    var action = cc.moveTo(0.1, self.initBet[i]);
                    btn_chlilp.runAction(action);
                    //隐藏蓝色边框
                    if (self.btn_chlilp[i].interactable == false) return;
                    let spriteFrame = self.ChipAtlas.getSpriteFrame(`p_ui_chip_bg_${i+1}_1`);
                    btn_chlilp.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                })
                var action = cc.moveBy(0.1, cc.v2(0, 30));
                event.target.runAction(action);
                //显示蓝色边框
                let spriteFrame = self.ChipAtlas.getSpriteFrame(`p_ui_chip_bg_${index+1}_2`);
                event.target.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                //保存当前筹码编号
                self.Chip_num = index;
            }, this);
        };
        for (var i = 0; i < self.btn_chlilp.length; ++i) {
            let index = i

            registerBtn(index);
        }
    }

    /**玩家跟注 */
    private onGenZhuClick(index: number, x: number, num: number, backseat: number,loadMusic:boolean = true): void {

        var money4 = 0;//当前筹码金额
        switch (num) {
            case 0: money4 = 1; break;
            case 1: money4 = 10; break;
            case 2: money4 = 100; break;
            case 3: money4 = 500; break;
            case 4: money4 = 1000; break;
        }

        let score = this.headPos[index].getChildByName('lab_info_gold').getComponent(cc.Label).string;
        let newScore =this.rootCom.toDecimal(Number(score) - money4);
        this.headPos[index].getChildByName('lab_info_gold').getComponent(cc.Label).string = newScore;
        let id = this.headPos[index].getChildByName('lab_info_id').getComponent(cc.Label).string
        // 丢出筹码，要减去对应筹码的金额。
        this.ebgGame.gameInfo.PlayerList.forEach((PlayerListItem) => {   
            if(PlayerListItem.ID == id){
                PlayerListItem.score = newScore;
            }
        });

        this.headAnim(index,loadMusic)

        this.showCoins(index, x, num, backseat);
    }
    /**其他玩家跟注 */
    public onPlayerGenZhu(index: number, x: number, num: number, backseat: number,loadMusic:boolean = true): void {
        var money4 = 0;//当前筹码金额
        switch (num) {
            case 0: money4 = 1; break;
            case 1: money4 = 10; break;
            case 2: money4 = 100; break;
            case 3: money4 = 500; break;
            case 4: money4 = 1000; break;
        }
        if (index != 8 && index != 0) {
            this.headAnim(index,loadMusic)
            let score = this.headPos[index].getChildByName('lab_info_gold').getComponent(cc.Label).string;
            let newScore = this.rootCom.toDecimal(Number(score) - money4);
            this.headPos[index].getChildByName('lab_info_gold').getComponent(cc.Label).string = newScore;
            let id = this.headPos[index].getChildByName('lab_info_id').getComponent(cc.Label).string
            this.ebgGame.gameInfo.PlayerList.forEach((PlayerListItem) => {   
                if(PlayerListItem.ID == id){
                    PlayerListItem.score = newScore;
                }
            });
        }
        if(index == 8 && loadMusic){
            if(Number(this.ebgGame.gameInfo.PlayerList.length) >=40){
                this.AudioOnline ++
                //收到3次才播放一次音效 
                if(this.AudioOnline >=3){
                    this.AudioOnline = 0
                    this.MusicMgr.loadFapaiMusicOnline(1,0.3);
                }
            }else{
                this.MusicMgr.loadFapaiMusicOnline(1,0.3);
            }
            
        }
        this.showCoins(index, x, num, backseat);
    }
    private sp_arr: any[] = [];

    /** 
   * 发筹码
   * @param index 座位号
   * @param x 容器号
   * @param num 筹码编号
   * @param backseat 筹码返回位置
   */
    private showCoins(index: number, x: number, num: number, backseat: number): void {
        var mpos: any = new cc.Vec2();
        mpos.x = this.initHeadPos[index].x;
        mpos.y = this.initHeadPos[index].y;
        var point: cc.Vec2 = this.pos[x].position;
        let chilp = cc.instantiate(this.chilp_1[num]);
        chilp.getComponent('ebgChipItem').init(x, num, index, backseat);

        this.allChips.addChild(chilp);
        chilp.position = mpos;
        //目标点
        var tx = point.x - 88 + Math.random() * 180;
        var ty = point.y - 70 + Math.random() * 150;
        let tos: cc.Vec2 = cc.v2(tx, ty);

        var mto1 = cc.moveTo(0.5, tos);
        var mto2 = cc.jumpBy(0.2, 4, 0, 2, 2);
        let chips = this.pos[x].getChildByName('chips');
        let mto = cc.sequence(mto1, mto2, cc.callFunc(() => {
            this.allChips.removeChild(chilp);
            chips.addChild(chilp);
        }))
        mto.easing(cc.easeInOut(1.0));
        chilp.runAction(mto);
        this.sp_arr.push(chilp);

        this.setPosValue(num,x,index)
    }
    setPosValue(num,x,seat){
        let money = 0
        switch(num){
            case 0:money=1; break;
            case 1:money=10; break;
            case 2:money=100; break;
            case 3:money=500; break;
            case 4:money=1000; break;
        }
        let ebgGroupDr = this.pos[x].getComponent('ebgGroupDr')
        let Label_totalBets = ebgGroupDr.Label_totalBets
        let Label_myBets  = ebgGroupDr.Label_myBets

        if(seat !=0){//如果是庄家赔注，不加钱
            Label_totalBets.string = `${Number(Label_totalBets.string) +money}`;
            
            ebgGroupDr.headbg.active = true;
        }
        if(seat == 7){ //如果座位是7,是自己投注
            Label_myBets.string = `${Number(Label_myBets.string) + money}`;
            ebgGroupDr.footbg.active = true;
        }
    }
    /** 
    * 头像抖动动画
    * @param index 座位号
    */
    private headAnim(index: number,loadMusic:boolean = true): void {
        if(loadMusic && index!=7){
            //播放抖动音效
            this.MusicMgr.loadMusic(4);
        }
        this.headPos[index].stopAllActions();
        if(!this.initHeadPos[index]) return
        let x = this.initHeadPos[index].x;
        let y = this.initHeadPos[index].y;
        var s1 = cc.moveTo(0.0, cc.v2(x, y));
        var s2 = cc.moveBy(0.05, cc.v2(-20, 0));
        var s3 = cc.moveBy(0.1, cc.v2(40, 0));
        var s4 = cc.moveTo(0.0, cc.v2(x, y));
        var seq = cc.sequence([s1, s2, s3,s4]);
        this.headPos[index].runAction(seq);
    }
    /** 
    * 隐藏星星
    */
    hideStar(): void {
        for (let i = 0; i < 3; i++) {
            var node = cc.find(`Canvas/Centerlayer/Star/p_star${i}`);
            node.active = false;
        }
    }
    /**
     * 发射星星
     * @param p 初始位置
     * @param x 发射区域
     */
    newStar(x: number) {
        var p: any = new cc.Vec2();
        p.x = this.initHeadPos[1].x;
        p.y = this.initHeadPos[1].y;
        var node = cc.instantiate(this.starFlashFabNode);
        //设置起点
        node.position = p;
        var starNode = cc.find('Canvas/Centerlayer/Star');
        var endStar = cc.find(`Canvas/Centerlayer/Star/p_star${x}`);
        starNode.addChild(node);
        this.godStarMoveAction(node, endStar, x, () => {
            node.removeFromParent();
            endStar.active = true;
        })
    }
    /**
     * 赌神星星动画
     * @param starFlashFabNode 闪烁预制体实例
     * @param currentBettingTableNode 目标节点
     * @param index 当前投注桌面下标
     * @param callback 回调
     */
    godStarMoveAction(starFlashFabNode: cc.Node, currentBettingTableNode: cc.Node,
        index: number, callback: Function): void {


        let starStartPoint = cc.v2(starFlashFabNode.x, starFlashFabNode.y);

        let endPoint = currentBettingTableNode.position;
        let height = starStartPoint.y - endPoint.y;
        let myFunction = (begin, end) => {
            var num = Math.round(Math.random() * (end - begin) + begin);
            return num;
        }
        let randomAngle = myFunction(90, 60);
        let moveTime = 1;
        if (index == 3) {
            moveTime = 1.5;
            randomAngle = 90;
        } else if (index == 4) {
            randomAngle = myFunction(90, 80);
        } else if (index == 1 || index == 2) {
            randomAngle = 90;
        }
        height += 80;
        starFlashFabNode.runAction(cc.sequence(
            //星星抛物线动作
            this.createStarMoveAction(moveTime, starStartPoint, endPoint, height, randomAngle),
            cc.callFunc((endPoint) => {
                callback(endPoint);
            }, this, endPoint)
        ));
    }

    CheckPos(BetNum:ClassArea){
        console.log(BetNum)
        this.pos[0].getComponent('ebgGroupDr').Label_totalBets.string = BetNum.Shun
        this.pos[1].getComponent('ebgGroupDr').Label_totalBets.string = BetNum.Tian
        this.pos[2].getComponent('ebgGroupDr').Label_totalBets.string = BetNum.Di
    }

    /**
     * 赌神星星抛物线
     * @param t 运动时间
     * @param startPoint 开始位置
     * @param endPoint 结束位置
     * @param height 运动高度
     * @param angle 角度
     */
    createStarMoveAction(t: number, startPoint: cc.Vec2, endPoint: cc.Vec2,
        height: number, angle: number): cc.FiniteTimeAction {
        // 把角度转换为弧度
        let radian = angle * 3.14159 / 180;
        // 第一个控制点为抛物线左半弧的中点
        let q1x = startPoint.x + (endPoint.x - startPoint.x) / 4;
        let q1 = cc.v2(q1x, height + startPoint.y + Math.cos(radian) * q1x);

        // 第二个控制点为整个抛物线的中点
        let q2x = startPoint.x + (endPoint.x - startPoint.x) / 2;
        let q2 = cc.v2(q2x, height + startPoint.y + Math.cos(radian) * q2x);
        // 曲线配置
        return cc.bezierTo(t, [q1, q2, endPoint]).easing(cc.easeInOut(t));
    }
    // update (dt) {}
    private onOffLine=()=>{
        NotiCenter.UnRegAll(this);
        
    }
    private onOnLine = ()=>{
        NotiCenter.UnRegAll(this);
        //断线后需要重新注册消息
        NotiCenter.Regsiter(NotiDef.PlayerBetted, this, this.onBetRsp);
        NotiCenter.Regsiter(NotiDef.PlayerBatchBetted, this, this.onBatchBetRsp);
    }
    onDestroy() {
        NotiCenter.UnRegAll(this);
        cc.game.off(cc.game.EVENT_HIDE)
        cc.game.off(cc.game.EVENT_SHOW)
        cc.game.off(Api.onEnterRoomRsp)
    }
}
