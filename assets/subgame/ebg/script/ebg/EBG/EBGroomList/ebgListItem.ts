/**二八杠房间列表组件 */
import {
  BaseRoomInfo,
  RoomBaseInfoUpdate,
  EnterRoomRsp,
  PlayerRoomState
} from '../interface/ebgInterface'
import { GameStatMgr } from '../ebgGameStatMgr'
import Utils from '../untils/ebgUtils'
import ebgRootNode from './ebgRootNode'
import MusicMgr from '../EBGGame/ebgMusicMgr'
import {
  NoticeDef as NotiDef,
  NotificationCenter as NotiCenter
} from '../../base/ebgNotification'
import { Api } from '../untils/ebgApi'
import gHandler = require("../../../../../../base/common/gHandler");
import {Language_ebg} from '../../language/ebgLanguage'
const { ccclass, property } = cc._decorator

@ccclass
export default class ebgListItem extends cc.Component {
  readonly sClassName = 'ebgListItem'

  @property(cc.Sprite)
  type: cc.Sprite = null //房间类型

  @property(cc.Label)
  limitamount: cc.Label = null //限红

  @property(cc.Node)
  xiazhuState: cc.Node = null //当前房间状态

  @property(cc.Node)
  jiesuanState: cc.Node = null //当前房间状态

  @property(cc.Label)
  lab_xiazhu: cc.Label = null //下注倒计时

  @property(cc.Label)
  roomNum: cc.Label = null //房间号

  @property(cc.Label)
  shun: cc.Label = null //顺

  @property(cc.Label)
  tian: cc.Label = null //天

  @property(cc.Label)
  di: cc.Label = null //地

  @property(cc.Label)
  label_shun_he: cc.Label = null

  @property(cc.Label)
  label_tian_he: cc.Label = null

  @property(cc.Label)
  label_di_he: cc.Label = null

  @property(cc.Prefab)
  ebgMidItem: cc.Prefab = null

  @property(cc.Node)
  content: cc.Node = null

  @property(cc.Node)
  btn_stratgame: cc.Node = null

  @property(cc.Node)
  midScrollView: cc.Node = null

  @property
  private totalGameNum: number = 0 //总局数,
  private shunNum: number = 0 //顺胜利局数
  private tianNum: number = 0 //天胜利局数
  private diNum: number = 0 //地胜利局数
  private shunHeNum: number = 0 //顺和局数
  private tianHeNum: number = 0 //天和局数
  private diHeNum: number = 0 //地和局数
  private midItemsolt: any[] = [] //存放创建的所有Item对象
  private index: number = 0
  private countDown: number = 0 //倒计时
  private EnterRoomReqStatus :boolean= false//发送进入房间的状态

  listTimer = null // 当前是否可以进入房间
  timer: any = null
  timeOut = null
  rootCom: ebgRootNode = null
  onLoad() {
    this.addBtnHandler(this.btn_stratgame)
    var close_Enterroom = cc.find(
      'Canvas/resizeNode/EnterRoomAlert/close_Enterroom'
    )
    var sure_EnterRoom = cc.find(
      'Canvas/resizeNode/EnterRoomAlert/sure_EnterRoom'
    )
    this.addBtnHandler(close_Enterroom)
    this.addBtnHandler(sure_EnterRoom)
    //常驻节点
    var RootNode = cc.find('RootNode')
    this.rootCom = RootNode.getComponent('ebgRootNode')
    this.setLanguageResource()
    NotiCenter.Regsiter(NotiDef.EnterRoomRsp, this, this.enterRoomRsp)
    NotiCenter.Regsiter(NotiDef.PlayerRoomState, this, this.onPlayerRoomState)
    //嵌套scroll
    let outerScroll = cc
      .find('Canvas/resizeNode/centerUi/ScrollView')
      .getComponent('ebgScrollView_Outer')
    outerScroll.m_InnerScrollViews.push(
      this.midScrollView.getComponent('ebgScrollView_Inner')
    )
    if (outerScroll.m_InnerScrollViews.length == this.rootCom.roomList.length) {
      outerScroll.outerOnLoad()
    }
    cc.systemEvent.on(Api.offLine, this.onOffLine.bind(this)) //断线
    cc.systemEvent.on(Api.onLine, this.onOnLine.bind(this)) //重连
  }
  onPlayerRoomState(msg: PlayerRoomState): void {
    if (msg.InRoom && msg.RoomIndex != this.rootCom.RoomIndex) {
      var EnterRoomAlert = cc.find('Canvas/resizeNode/EnterRoomAlert')
      var label = EnterRoomAlert.getChildByName('Label').getComponent(cc.Label)
      label.string = Language_ebg.Lg.changeLanguage(26)
      this.rootCom.RoomIndex = msg.RoomIndex
      EnterRoomAlert.active = true
    } else {
      this.EnterRoomReq()
    }
  }
  /**
   * 进入游戏房间回调
   * @param msg 房间信息
   */
  enterRoomRsp(msg: EnterRoomRsp): void {
    console.log('收到当前房间状态------------------------', msg)
    this.EnterRoomReqStatus = false // 此时置为空
    clearTimeout(this.timeOut)
    this.rootCom.gameRoomRsp = msg
    this.rootCom.gameRoomRsp.Info.PlayerList = this.rootCom.PlayerList
    this.rootCom.RoomIndex = msg.Info.Index
    if (msg.Entered) {
      this.rootCom.Entered = true
      cc.director.loadScene('ebgGame')
    } else {
      console.log('进入房间失败!，请返回重试！')
      this.rootCom.showTip(12)
      this.rootCom.Entered = false
    }
  }
  EnterRoomReq() {
    //如果 EnterRoomReqStatus为真，说明已经发送过一次进入房间的消息
    if(this.EnterRoomReqStatus){
       console.log(`点的太快了！`)
       return
    }
    //发送进入游戏房间请求
    console.log(`进入${this.rootCom.RoomIndex}号房间`)
    this.EnterRoomReqStatus = true

    cc.director.preloadScene('ebgGame', () => {
      console.log(`发送enterRoomReq`)
      if(!this.rootCom) return 
      GameStatMgr.gsMgr.enterRoomReq(this.rootCom.RoomIndex)
    })
    var self = this
    var loading = cc.find('Canvas/resizeNode/Loading')
    loading.active = true
    self.rootCom.Entered = true
    //清空之前的玩家列表
    self.rootCom.PlayerList = []
    this.timeOut = setTimeout(() => {
      clearTimeout(self.timeOut)
      if (!self.rootCom) return
      self.rootCom.Entered = false //10秒后还未进入房间，允许点击返回键
    }, 10000)
  }
  /**
   * 外部调用初始化，传入数据
   * @param BaseRoomInfo
   */
  init(BaseRoomInfo: BaseRoomInfo): void {
    
    this.index = BaseRoomInfo.Index
    var num = BaseRoomInfo.Index + 1
    this.roomNum.string = `0${num}`

    if (BaseRoomInfo.State - 1 == 0) {
      //进度条，倒计时
      this.lab_xiazhu.node.active = true
      this.node.getChildByName('countDown').active = true
      this.xiazhuState.active = true
      this.jiesuanState.active = false
    } else {
      this.lab_xiazhu.node.active = false
      this.node.getChildByName('countDown').active = false
      this.xiazhuState.active = false
      this.jiesuanState.active = true
    }
    let self = this
    this.countDown = BaseRoomInfo.Remaining
    this.timer = setInterval(() => {
      this.countDown -= 0.1
      self.node
        .getChildByName('countDown')
        .getComponent(cc.ProgressBar).progress = (self.countDown - 1) / 14
      if (self.countDown < 0) {
        self.countDown = 0
      }
      self.lab_xiazhu.string = String(parseInt(`${self.countDown}`))
    }, 100)

    // 延迟添加每一局输赢，工单需求
    let i = 0;
    let callBack = ()=>{
      i++
      if(!BaseRoomInfo.rrlist){
        return
      }

      if(i>=BaseRoomInfo.rrlist.length) {
        //渲染结束，拉到右边
        // 这时候才能点击返回返回大厅和进入游戏
        this.rootCom.listItemAction = false //表示Action在进行中，不能打断
        this.node.getChildByName('mid_28g').getChildByName('midScrollView').getComponent(cc.ScrollView).scrollToRight()
        return
      }
      if(i == BaseRoomInfo.rrlist.length-1){
        var item =  BaseRoomInfo.rrlist[i]
        this.addResults(item, true,callBack)
      }else{
        var item =  BaseRoomInfo.rrlist[i]
        this.addResults(item, false,callBack)
      }
      
    }
    var item =  BaseRoomInfo.rrlist[i]
    this.rootCom.listItemAction = true //表示Action在进行中，不能打断
    this.addResults(item, false,callBack)

  }

  public addBtnHandler(btn): void {
    Utils.addClickEvent(btn, this.node, 'ebgListItem', 'onBtnClicked')
  }
  private onBtnClicked(event: cc.Event): void {
    var MusicMgr: MusicMgr = cc
      .find('RootNode/Music')
      .getComponent('ebgMusicMgr')
    let BgState = gHandler.audioMgr.getBgState();
    if (BgState) {
      MusicMgr.loadMusic(6)
    }
    var btnName = event.target.name
    if (btnName == 'btn_stratgame' && !this.rootCom.listItemAction) {
      this.rootCom.RoomIndex = this.index
      GameStatMgr.gsMgr.SendGameStateQuery()
    } else if (btnName == 'close_Enterroom') {
      //避免执行6次
      if (this.index == this.rootCom.RoomIndex) {
        var EnterRoomAlert = cc.find('Canvas/resizeNode/EnterRoomAlert')
        EnterRoomAlert.active = false
      }
    } else if (btnName == 'sure_EnterRoom' ) {
      //避免执行6次
      if (this.index == this.rootCom.RoomIndex) {
        this.EnterRoomReq()
      }
    }
  }
  /**
   * 外部调用
   * @param data 输赢结果
   */
  public addResults(data: any, blink: boolean,callBack): void {
    this.content.children.forEach(e => {
      e.getComponent('ebgMidItem').hideCover()
    })
    //新增项滚动到最右侧
    // this.node.getChildByName('mid_28g').getChildByName('midScrollView').getComponent(cc.ScrollView).scrollToRight()
    this.totalGameNum++
    if (this.totalGameNum > 20) {
      this.totalGameNum = 20
      //删除对应那一项的胜场
      let shun = this.content.children[0].getComponent('ebgMidItem').Shun
      let tian = this.content.children[0].getComponent('ebgMidItem').Tian
      let di = this.content.children[0].getComponent('ebgMidItem').Di
      shun == 2 ? this.shunNum-- : ''
      tian == 2 ? this.tianNum-- : ''
      di == 2 ? this.diNum-- : ''
      shun == 0 ? this.shunHeNum-- : ''
      tian == 0 ? this.tianHeNum-- : ''
      di == 0 ? this.diHeNum-- : ''
      this.content.removeChild(this.content.children[0])
    }
    //0为和，1为输，2为赢
    let arr = [data.Shun, data.Tian, data.Di]
    if (data.Shun == 2) {
      this.shunNum++
    } else if (data.Shun == 0) {
      this.shunHeNum++
    }
    if (data.Tian == 2) {
      this.tianNum++
    } else if (data.Tian == 0) {
      this.tianHeNum++
    }
    if (data.Di == 2) {
      this.diNum++
    } else if (data.Di == 0) {
      this.diHeNum++
    }

    let itemPre = cc.instantiate(this.ebgMidItem)
    this.content.addChild(itemPre)
    itemPre.getComponent('ebgMidItem').init(arr)
    blink ? itemPre.getComponent('ebgMidItem').showNewCover() : ''
    this.midItemsolt.push(itemPre)
    this.shun.string = `${Language_ebg.Lg.changeLanguage(15)}${this.shunNum}/${this.totalGameNum}`
    this.tian.string = `${Language_ebg.Lg.changeLanguage(16)}${this.tianNum}/${this.totalGameNum}`
    this.di.string = `${Language_ebg.Lg.changeLanguage(17)}${this.diNum}/${this.totalGameNum}`
    this.label_shun_he.string = `(${Language_ebg.Lg.changeLanguage(18)}${this.shunHeNum})`
    this.label_tian_he.string = `(${Language_ebg.Lg.changeLanguage(18)}${this.tianHeNum})`
    this.label_di_he.string = `(${Language_ebg.Lg.changeLanguage(18)}${this.diHeNum})`
    this.listTimer = setTimeout(() => {
      callBack()
    }, 100);
  }
  public roomUpDate(msg: RoomBaseInfoUpdate): void {
    this.countDown = msg.Remaining
    if (msg.State == 2) {
      this.addResults(msg.Result, true,()=>{})
      // this.timeOut = setTimeout(()=>{
      //     this.addResults(msg.Result,true);
      //     clearTimeout(this.timeOut)
      // }, (msg.Remaining-3)*1000 )
    }
    if (msg.State - 1 == 0) {
      //进度条、倒计时
      this.node.getChildByName('countDown').active = true
      this.lab_xiazhu.node.active = true
      this.xiazhuState.active = true
      this.jiesuanState.active = false
    } else {
      this.node.getChildByName('countDown').active = false
      this.lab_xiazhu.node.active = false
      this.xiazhuState.active = false
      this.jiesuanState.active = true
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
    let xianhong = this.node.getChildByName('top1').getChildByName('xianhong').getComponent(cc.Label)
    let rongyt = this.node.getChildByName('rongyt')
    let xiazhuState = this.node.getChildByName('top1').getChildByName('xiazhuState')
    let jiesuanState = this.node.getChildByName('top1').getChildByName('jiesuanState')
    let biao_left = this.node.getChildByName('mid_28g').getChildByName('biao_left')
    let rate_20s = this.node.getChildByName('20rate_s')
    let btn_stratgame = this.node.getChildByName('btn_stratgame')
    
    xianhong.string = Language_ebg.Lg.changeLanguage(14)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'rongyt',rongyt)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'xiazhuz',xiazhuState)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'jiesz',jiesuanState)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'biao_left2',biao_left)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'20rate_s',rate_20s)
    this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'jinr',btn_stratgame)
    
  } 
  private onOffLine = () => {
    NotiCenter.UnRegAll(this)
  }
  private onOnLine = () => {
    //重连需要重新注册
    NotiCenter.Regsiter(NotiDef.EnterRoomRsp, this, this.enterRoomRsp)
  }
  onDestroy(): void {
    clearInterval(this.timer)
    clearTimeout(this.timeOut)
    NotiCenter.UnRegAll(this)
    cc.systemEvent.off(Api.offLine)
    cc.systemEvent.off(Api.onLine)
    clearTimeout(this.listTimer)
  }
}
