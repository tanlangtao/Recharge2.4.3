// 常驻节点，保存全局数据

const { ccclass, property } = cc._decorator
import {
  EnterRoomRsp,
  BaseRoomInfo,
  DealerProper,
  PlayerInfo
} from '../interface/ebgInterface'
import {Language_ebg} from '../../language/ebgLanguage'
import gHandler = require('../../../../../../base/common/gHandler')
@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  TipAlert: cc.Prefab = null //提示

  public RoomIndex: number = 0
  //首次进入房间信息
  public gameRoomRsp: EnterRoomRsp = null
  //房间列表
  public roomList: BaseRoomInfo[] = null
  //退出房间
  public ExitRoomRsp: boolean = false
  //等待上庄列表
  public WaitingList: DealerProper[] = []
  //等待上庄列表ID
  public WaitingListID = []
  public Entered = true
  public returnToHall = false //为真时才能返回大厅
  public listItemAction = true
  //缓存的房间内玩家列表
  public PlayerList: PlayerInfo[] =[]

  public showTip(index): void {
    var node = cc.instantiate(this.TipAlert)
    var canvas = cc.find('Canvas')
    let tip  = Language_ebg.Lg.changeLanguage(index)
    node.getComponent('ebgTipAlert').init(tip)
    canvas.addChild(node)
  }
  //保留两位小数
  public toDecimal(num) {
    num = Math.abs(num).toFixed(7)
    var result = num.toString()
    if (isNaN(result)) {
    cc.log('传递参数错误，请检查！')
    return ''
    }
    let newNum = result.indexOf(".") >-1 ?result.substring(0,result.indexOf(".")+3) :result;
    return newNum
  }
  //保留两位小数,不足补0
  public toDecimal2(num) {
    num = Math.abs(num).toFixed(7)
    var result = num.toString()
    if (isNaN(result)) {
    cc.log('传递参数错误，请检查！')
    return ''
    }
    let newNum = result.indexOf(".") >-1 ?result.substring(0,result.indexOf(".")+3) :result;
    var pos_decimal = newNum.indexOf('.')
    while (newNum.length > 1 && newNum.length <= pos_decimal + 2) {
    newNum += '0'
    }

    return newNum
  }
  public loadSprite(url,node){
    gHandler.ebgRes.load(`${url}`,cc.SpriteFrame,(err, spriteFrame)=>{
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    })
  }
  public loadPlistSprite(plistUrl,name,node){
    gHandler.ebgRes.load(`${plistUrl}`,cc.SpriteAtlas,(err, t)=>{
        if(err){
          console.log("*********loadPlistSpriteErr",err)
          return
        }
        var spriteFrame = t.getSpriteFrame(`${name}`)
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    })
  }
  public loadButtonSprite(plistUrl,nameNormal,namePressed,node){
    gHandler.ebgRes.load(`${plistUrl}`,cc.SpriteAtlas,(err, t)=>{
        var spriteFrame1 = t.getSpriteFrame(`${nameNormal}`)
        var spriteFrame2 = t.getSpriteFrame(`${namePressed}`)
        node.getComponent(cc.Button).normalSprite = spriteFrame1;
        node.getComponent(cc.Button).pressedSprite = spriteFrame2;
    })
  }
}
