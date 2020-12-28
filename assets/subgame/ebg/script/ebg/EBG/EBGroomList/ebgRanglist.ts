const { ccclass, property } = cc._decorator
import {
  ExitRoomRsp,
  RoomList,
  RoomBaseInfoUpdate,
  UniMessage,
  PlayerInfo
} from '../interface/ebgInterface'
import { GameStatMgr } from '../ebgGameStatMgr'
import ebgMusicMgr from '../EBGGame/ebgMusicMgr'
import Utils from '../untils/ebgUtils'
import {
  NoticeDef as NotiDef,
  NotificationCenter as NotiCenter
} from '../../base/ebgNotification'
import ebgRootNode from './ebgRootNode'
import { Api } from '../untils/ebgApi'
import gHandler = require('../../../../../../base/common/gHandler')
import {Language_ebg} from '../../language/ebgLanguage'
@ccclass
export default class ebgRanglist extends cc.Component {
  readonly sClassName = 'ebgRanglist'

  @property(cc.Label)
  lab_id: cc.Label = null

  @property(cc.Label)
  lab_gold: cc.Label = null

  @property(cc.Prefab)
  itemPrefab: cc.Prefab = null

  @property(cc.ScrollView)
  scroll: cc.ScrollView = null

  @property
  private itemsolt: any[] = [] //存放创建的所有Item对象
  MusicMgr: ebgMusicMgr = null
  public rootCom: ebgRootNode = null
  private curDR: cc.Size = null
  timeOut = null
  onLoad() {
    //判断是否是自己平台
    this.isOtherGame()
    this.getRootNode()
    this.MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr')
    this.setLanguageResource()
    GameStatMgr.gsMgr.Open()
    //连接server
    GameStatMgr.gsMgr.ConnectServer()
    //退出房间
    GameStatMgr.gsMgr.SendExitRoomReq()
    this.lab_id.string = GameStatMgr.gsMgr.sTestNick
    this.lab_gold.string = this.rootCom.toDecimal(GameStatMgr.gsMgr.sTestGold)
    this.addBtnHandler('toppanel/headpanel/btn_return')
    this.addBtnHandler('toppanel/headpanel/copyname')
    this.addBtnHandler('toppanel/coinpanel/chongzhi')
    this.addBtnHandler('Loading/btn_close')
    this.addBtnHandler('TimeOutTip/TimeOutBtn')
    //注册获取房间列表消息
    this.RegsiterInit()
    cc.systemEvent.on(Api.sTestGold, this.onsTestGold.bind(this)) //更新金额

    let BgState = gHandler.audioMgr.getBgState();
    cc.log("BgStateBgState",BgState )
    if(BgState) {
      this.MusicMgr.openEffects()
      //播放大厅的背景音乐
      gHandler.audioMgr.playBg("hallbg");
    }else{
      this.MusicMgr.stopEffects()
      gHandler.audioMgr.stopBg();
    }
    cc.systemEvent.on(Api.offLine, this.onOffLine.bind(this)) //断线
    cc.systemEvent.on(Api.onLine, this.onOnLine.bind(this)) //重连
    //重连超过30次，提示返回大厅 
    cc.systemEvent.on('breakConnectTimeOut',this.onBreakConnectTimeOut.bind(this)) 
    // 注册监听玩家切换账号（玩家信息修改）的事件
    gHandler.eventMgr.register(gHandler.eventMgr.refreshPlayerinfo,'ebgRanglist',this.setPlayerInfo.bind(this))
    gHandler.eventMgr.register(gHandler.eventMgr.refreshBgState, "ebgRanglist", this.bgstatechange.bind(this))

    //测速
    let pn = cc.find('Canvas/resizeNode/toppanel/netstatenode')
    gHandler.eventMgr.dispatch(gHandler.eventMgr.showNetStateNode, { parent: pn, position: { x: 0, y: 0 } })
  }
  private getRootNode(){
    //常驻节点
    var RootNode = cc.find('RootNode')
    cc.game.addPersistRootNode(RootNode)
    this.rootCom = RootNode.getComponent('ebgRootNode')
  }
  private RemoveRootNode(){
      var RootNode = cc.find('RootNode')
      cc.game.removePersistRootNode(RootNode)
  }
  isOtherGame(){
      let btn_return =  cc.find("Canvas/resizeNode/toppanel/headpanel/btn_return")
      let copyname =  cc.find("Canvas/resizeNode/toppanel/headpanel/copyname")
      let chongzhi =  cc.find("Canvas/resizeNode/toppanel/coinpanel/chongzhi")
      let btn_close =  cc.find("Canvas/resizeNode/Loading/btn_close")
      if(gHandler.isOtherGame){
          btn_return.active = false
          copyname.active = false
          chongzhi.active = false
          btn_close.active = false
      }else{
          btn_return.active = true
          copyname.active = true
          chongzhi.active = true
          btn_close.active = true
      }
  }
  // 切换帐号的处理函数
  setPlayerInfo(msg) {
    if (msg) {
      // 如果有信息
      if (msg.id != GameStatMgr.gsMgr.sTestUser) {
        GameStatMgr.gsMgr.Close() //退出之前的帐号
        //重新连接新的帐号
        GameStatMgr.gsMgr.Open()
        GameStatMgr.gsMgr.ConnectServer()
      }
    } else {
    }
  }
  //切换声音处理
  bgstatechange(BgState){
    cc.log('BgState',BgState)
    if(BgState) {
      this.MusicMgr.openEffects()
      gHandler.audioMgr.playBg("hallbg");
    }else{
      this.MusicMgr.stopEffects()
      gHandler.audioMgr.stopBg();
    }
  }
  private RegsiterInit() {
    NotiCenter.Regsiter(NotiDef.RoomList, this, this.onRoomList)
    NotiCenter.Regsiter(NotiDef.ExitRoomRsp, this, this.onExitRoomRsp)
    NotiCenter.Regsiter( NotiDef.RoomBaseInfoUpdate,this, this.onRoomBaseInfoUpdate)
    NotiCenter.Regsiter(NotiDef.UniMessage, this, this.onUniMessage)
    NotiCenter.Regsiter(NotiDef.PlayerInfo,this,this.onPlayerInfo);
  }
  private onsTestGold(gold: number, nick: string): void {
    //登录成功后返回当前金币和昵称
    this.lab_gold.string = this.rootCom.toDecimal(gold)
    this.lab_id.string = nick
  }
  public addBtnHandler(btnName: string): void {
    var btn = cc.find('Canvas/resizeNode/' + btnName)
    Utils.addClickEvent(btn, this.node, 'ebgRanglist', 'onBtnClicked')
  }
  private onBtnClicked(event: cc.Event): void {
    var btnName = event.target.name
    if (btnName == 'btn_return') {
      this.MusicMgr.loadMusic(6)
      if( !this.rootCom.listItemAction){
        //返回大厅取消Root节点为常驻节点，避免与ebg冲突
        this.RemoveRootNode()
        this.rootCom.returnToHall = true
        //返回大厅
        GameStatMgr.gsMgr.Close() //关闭连接
        gHandler.audioMgr.stopBg();
        cc.director.preloadScene('hall',()=>{
          cc.director.loadScene('hall');
        })
      }
    } else if (btnName == 'copyname') {
        this.MusicMgr.loadMusic(6)
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showPerson, null)
    } else if (btnName == 'chongzhi') {
        this.MusicMgr.loadMusic(6)
        this.rootCom.returnToHall = true
        GameStatMgr.gsMgr.Close() //关闭连接
        gHandler.audioMgr.stopBg();
        gHandler.eventMgr.dispatch(gHandler.eventMgr.showPayScene, 'ebg') //跳转充值
    } else if (btnName == 'btn_close') {
        this.MusicMgr.loadMusic(6)
        //进入房间失败，才能退出
        if( !this.rootCom.Entered){
            GameStatMgr.gsMgr.Close();
            gHandler.audioMgr.stopBg();
            this.rootCom.Entered = true;
            cc.director.preloadScene('hall',()=>{
              cc.director.loadScene('hall');
            })
        }
    } else if(btnName == "TimeOutBtn"){
      this.rootCom.returnToHall = true
      //返回大厅
      GameStatMgr.gsMgr.Close() //关闭连接
      gHandler.audioMgr.stopBg();
      cc.director.preloadScene('hall',()=>{
        cc.director.loadScene('hall');
      })
    }
  }
  onUniMessage(msg: UniMessage) {
    console.log("踢人消息",msg)
    if (msg.Code == 1 || msg.Code == 2) { 
        //1 其他地方登录
        //2 玩家被踢出
        this.rootCom.returnToHall = true
        GameStatMgr.gsMgr.Close();
        gHandler.audioMgr.stopBg();
        cc.director.preloadScene('hall',()=>{
          cc.director.loadScene('hall');
        })
    }
  }
  /**
   * 获取房间信息
   * @param msg 房间信息
   */
  private onRoomList(msg: RoomList): void {
    cc.find('Canvas/resizeNode/Loading').active = false
    console.log('收到房间信息------------------------', msg)
    this.rootCom.roomList = msg.roomlist
    this.init()
  }
  private onExitRoomRsp(msg: ExitRoomRsp) {
    this.rootCom.ExitRoomRsp = true
    this.lab_gold.string = this.rootCom.toDecimal(msg.score)
    GameStatMgr.gsMgr.sTestGold = msg.score
    console.log('退出房间信息------------------------', msg)
  }
  /**
   * 收到房间更新消息
   * @param msg
   */
  public onRoomBaseInfoUpdate(msg: RoomBaseInfoUpdate) {
    this.itemsolt.forEach((e, i) => {
      if (msg.Index == i) {
        e.getComponent('ebgListItem').roomUpDate(msg)
      }
    })
  }
  /**
   *  缓存玩家列表
   * */
  private onPlayerInfo(msg:PlayerInfo){
    this.rootCom.PlayerList.push(msg)
  } 
  init() {
    this.itemsolt = []
    let scalex = cc.winSize.width / 1334
    this.scroll.content.removeAllChildren()
    for (let i in this.rootCom.roomList) {
      let itemPre = cc.instantiate(this.itemPrefab)
      itemPre.scaleX = scalex
      itemPre.scaleY = scalex
      this.scroll.content.addChild(itemPre)
      itemPre.getComponent('ebgListItem').init(this.rootCom.roomList[i])
      this.itemsolt.push(itemPre)
    }
    
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
    let loadbg = cc.find('Canvas/resizeNode/Loading/loadbg')
    let title_28g = cc.find('Canvas/resizeNode/toppanel/icon/title_28g')


    this.rootCom.loadSprite(`${src}/loadingBg`,loadbg)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'title_28g',title_28g)

    let loadSP = cc.find('Canvas/resizeNode/Loading/loadSp')
    loadSP.children.forEach((e)=>{
        if (e.name == Language_ebg.Lg.Language){
            e.active = true
        }else{
            e.active = false
        }
    })
  } 
  private onOffLine = () => {
    cc.log('cc.gamelist.offLine')
  }
  private onOnLine = () => {
    cc.log('cc.gamelist.onLine')
    //断线后需要重新注册消息
    this.RegsiterInit()
  }
  onBreakConnectTimeOut = ()=> {
    cc.find("Canvas/resizeNode/TimeOutTip").active = true
  }
  onDestroy() {
    NotiCenter.UnRegAll(this)
    cc.systemEvent.off(Api.sTestGold)
    cc.systemEvent.off(Api.offLine)
    cc.systemEvent.off(Api.onLine)
    cc.systemEvent.off("breakConnectTimeOut")
    gHandler.eventMgr.unregister(gHandler.eventMgr.refreshPlayerinfo,'ebgRanglist')
    gHandler.eventMgr.unregister(gHandler.eventMgr.refreshBgState, "ebgRanglist")
  }

  // update (dt) {}
}
