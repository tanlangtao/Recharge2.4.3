cc.log('this is load GameStatMgr.ts~!!!')
import gHandler = require('../../../../../base/common/gHandler')
import Connection from '../net/ebgConnection'
import MessageSender from '../net/msgSender-ebg'
import { messageDispatcher as msgDisp } from '../net/msgDispatcher-ebg'
import {
  NoticeDef as NotiDef,
  NotificationCenter as NotiCenter
} from '../base/ebgNotification'
import { msg } from '../net/msg_pb-ebg'
import { Api } from './untils/ebgApi'

export namespace GameStatMgr {
  class GameStatusManager {
    public sUrlServer = 'ws://game.539316.com/erbg' //新dev
    // readonly sUrlServer = "ws://47.75.183.211:3654"; //dev
    // readonly sUrlServer = "ws://10.63.90.31:3654"; //local
    readonly connection = new Connection()
    readonly msgSender = new MessageSender()
    public sTestUser = '591214675'
    public sTestGold = 0
    public sPassword = '123456'
    public sTestNick = ''
    public sToken = ''
    readonly sClassName = 'GameStatMgr'
    private uBeatheDelay = 0
    private uBeatheTick = null
    public bConnected = false
    public isLogin = false
    public urlData = null
    public sHeadImg = '1.png'
    private timer = null //断线延迟器
    public rootCom = null
    private breakConnectAccount = 0; // 重连次数，超过30次不再重连
    constructor() {
      //定义构造函数
    }
    //获取url参数
    private getUrlData() {
      var path = location.search
      var arr: any = {}
      path
        .slice(1)
        .split('&')
        .map(e => e.split('='))
        .forEach(e => (arr[e[0]] = e[1]))
      return arr
    }
    private RegstierNotifies() {
      cc.log('this instance of GameStatusManager')
      NotiCenter.Regsiter(NotiDef.LoginRsp, this, this.onLoginRsp)
      NotiCenter.Regsiter(NotiDef.ServerVersion, this, this.onServerInfo)
      NotiCenter.Regsiter(NotiDef.Breathe, this, this.onServerBreathe)
    }
    private StartActiveBreathe() {
      // cc.log("StartActiveBreathe~!!!");
      if (this.uBeatheTick == null) {
        this.uBeatheTick = setInterval(this.ActiveBreathe.bind(this), 1000)
      }
      this.uBeatheDelay = 0
    }

    private ActiveBreathe() {
      this.uBeatheDelay++
      this.msgSender.SendBreathe()
      if (this.uBeatheDelay > 5) {
        if (this.bConnected && this.uBeatheDelay % 10 == 2) {
          cc.log(
            "here is over 10 sec don't receive any server message,may be has dissconnected!!"
          )
          this.bConnected = false
          NotiCenter.Clear()
          this.connection.Close()
        }
      }
    }

    private StopBreathe() {
      if (this.uBeatheTick != null) {
        clearInterval(this.uBeatheTick)
      }

      this.uBeatheTick = null
    }

    private onServerBreathe() {
      // cc.log("GameStatusManager onServerBreathe");
    }

    private onServerInfo(msg) {
      cc.log('GameStatusManager onServerInfo')
      let msgt = <msg.ServerInfo>msg
      cc.log('msgt.version', msgt.version)
    }

    private onLoginRsp(msg) {
      cc.log('GameStatusManager onLoginRsp')
      let msgt = <msg.LoginRsp>msg
      cc.log('msgt.UserId', msgt.UserId)
      cc.log('msgt.nick', msgt.nick)
      cc.log('msgt.headimg', msgt.headimg)
      cc.log('msgt.score', msgt.score)
      this.sHeadImg = msgt.headimg
      this.sTestGold = this.rootCom.toDecimal(msgt.score)
      this.sTestNick = msgt.nick
      this.isLogin = true
      cc.systemEvent.emit(Api.sTestGold, this.sTestGold, this.sTestNick)
      //重新连接成功!
      this.clearTimer()
      console.log('当断线重连的时候，需要接受新数据')
      cc.systemEvent.emit(Api.onLine)
    }
    public ConnectServer() {
      let player = gHandler.gameGlobal.player
      this.sTestUser = String(player.id)
      this.sPassword = player.account_pass
      this.sToken = gHandler.gameGlobal.token
      this.rootCom = cc.find('RootNode').getComponent('ebgRootNode')
      if (!this.bConnected) {
        this.sTestGold = 0
        this.connection.onOpen = this.onConnected.bind(this)
        this.connection.onClose = this.onDisconnected.bind(this)
        this.connection.onDispatchMessage = this.onDispatchMessage.bind(this)
        this.sUrlServer = gHandler.subGameList['ebg'].serverUrl
        console.log('连接服务器地址:', this.sUrlServer)
        this.connection.Create(this.sUrlServer)
        this.msgSender.connection = this.connection
      } else {
        this.sendLogin()
      }
    }
    public sendLogin() {
      if (!this.isLogin) {
        console.log(
          'sendLogin，userID',
          this.sTestUser,
          'userPass',
          this.sPassword,
          'token',
          this.sToken
        )
        this.msgSender.SendLogin(this.sTestUser, this.sPassword, this.sToken)
      }
    }
    private onConnected() {
      cc.log('连接服务器成功~！！')
      this.bConnected = true
      this.sendLogin()
      this.rootCom.returnToHall = false // 判断是否需要重连，默认每次连接成功设置为false
      this.breakConnectAccount = 0
      this.StartActiveBreathe()
    }

    private onDispatchMessage(id: number, data: any) {
      // cc.log("receive a message");
      // cc.log(id,data);
      this.uBeatheDelay = 0
      msgDisp.onMessageDispatch(id, data)
    }

    private onDisconnected() {
      cc.log('已经和服务器断开连接')
      console.log("this.rootCom.returnToHall",this.rootCom.returnToHall)
      if (this.rootCom.returnToHall) {
        this.breakConnectAccount = 0
        cc.log('返回大厅，无需重连')
        return
      }
      cc.systemEvent.emit(Api.offLine)
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        if (this.breakConnectAccount >30) {
          cc.systemEvent.emit("breakConnectTimeOut");
          return
      }
        this.breakConnect()
      }, 1000)
    }
    public clearTimer() {
      if (this.timer != null) {
        clearTimeout(this.timer)
      }
    }
    public Open() {
      this.RegstierNotifies()
    }
    //游戏关闭（子游戏退出时调用）
    public Close() {
      this.bConnected = false
      this.isLogin = false
      NotiCenter.Clear()
      this.StopBreathe()
      this.connection.Close()
      this.sTestGold = 0
    }

    private breakConnect() {
      this.breakConnectAccount ++
      this.bConnected = false
      this.isLogin = false
      this.Open()
      this.ConnectServer()
    }
    public enterRoomReq(index: number) {
      this.msgSender.SendEnterRoom(index)
    }

    public SendBet(area: any, betnum: number) {
      this.msgSender.SendBet(area, betnum)
    }

    public ToDealerReq(score) {
      this.msgSender.SendToDealerReq(score)
    }
    public CancelDealerReq() {
      this.msgSender.SendCancelDealerReq()
    }

    public SendPlayerBatchBetting(bets) {
      this.msgSender.SendPlayerBatchBetting(bets)
    }

    public SendExitRoomReq() {
      if (this.bConnected) {
        this.msgSender.SendExitRoomReq()
      }
    }
    public SendRoomInfoReq() {
      this.msgSender.SendRoomInfoReq()
    }
    public SendGameStateQuery() {
      this.msgSender.SendGameStateQuery()
    }
  }

  export const gsMgr = new GameStatusManager()
}
