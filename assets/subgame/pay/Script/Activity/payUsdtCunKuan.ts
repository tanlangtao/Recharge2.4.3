
const {ccclass, property} = cc._decorator;
import { Language_pay } from "../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnArr: cc.Node[] = [];

    info :any= []
    app = null
    activity_id = 13
    login_ip = ''
    amount = 0
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = {}
        }
        console.log(info)
        this.info = info.range
        this.activity_id = id
        this.amount = info.usdt_amount
        
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.getRewardUsdtInfo()
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText("获取登陆ip失败!"))
        }
        this.setLanguageResource()
        this.init()
    }
    init(){
        let group1= cc.find('Canvas/Activity/Content/UsdtCunKuan/bg/Layout/group1')
        let group2= cc.find('Canvas/Activity/Content/UsdtCunKuan/bg/Layout/group2')
        group1.children.forEach((e,index)=>{
            e.getComponent(cc.Label).string = `${Language_pay.Lg.ChangeByText("USDT存款次数")}≥${this.info[index].recharge_num}${Language_pay.Lg.ChangeByText("次")}`
            group2.children[index].getComponent(cc.Label).string = `${this.info[index].bonus}${Language_pay.Lg.ChangeByText("元")}`
        })
    }
    getRewardUsdtInfo(){
        var url = `${this.app.UrlData.host}/api/activity/getRewardUsdtInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&amount=${this.amount}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                console.log(response)
                if(response.data.num  >= this.info[0].recharge_num ){
                    let btnIndex = 0;
                    this.info.forEach((item,index)=>{
                        if(index < this.btnArr.length &&  response.data.num >=item.recharge_num) {
                           btnIndex = index
                       }
                        this.btnArr[btnIndex].active = true
                        this.btnArr[btnIndex].getChildByName("bg2").active = false
                   })
                }
                if(response.data["received_info"]){
                    response.data.received_info.forEach((e)=>{
                        this.info.forEach((item,index)=>{
                            if(e.receive_amount == item.bonus){
                                this.btnArr[index].getChildByName("bg2").active = true
                            }
                        })
                    })
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    receiveUsdtPayGold(targeIndex){
        var url = `${this.app.UrlData.host}/api/activity/receiveUsdtPayGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&index=${targeIndex}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&index=${targeIndex}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.3&regin_ip=127.0.0.2&device_id=123456783`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                //刷新领取状态
                this.btnArr[targeIndex].getChildByName("bg2").active = true
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    onClick(e){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText("参加活动失败:请先绑定手机号!"))
            return
        }
        let targeIndex = e.target.name
        this.receiveUsdtPayGold(targeIndex)
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let usdtck_bg= cc.find('Canvas/Activity/Content/UsdtCunKuan/bg/usdtck_bg')
        let biao= cc.find('Canvas/Activity/Content/UsdtCunKuan/bg/biao')

        this.app.loadIconLg(`${src}/activeBigImage/usdtck_bg`,usdtck_bg)
        this.app.loadIconLg(`${src}/activeSprite/biao`,biao)
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/5`,e)
            this.app.loadIconLg(`${src}/activeSprite/3`,e.getChildByName('bg2'))
        })
        
        let rule= cc.find('Canvas/Activity/Content/UsdtCunKuan/bg/Content/ScrollView/view/content/rule').getComponent(cc.Label)
        rule.string = Language_pay.Lg.ChangeByText("活动规则：\n1. 只要您使用虚拟货币USDT进行存款，单笔充值100USDT以上，累计达到相对应的充值次数即可领取相对应的彩金（彩金5倍流水即可申请兑换）。\n2. 同IP同设备多账号仅限1个账号享受活动资格。\n3. USDT地址绑定，依照平台指引地址类型进行绑定，如有疑问请及时咨询客服。\n4. 本活动最终解释权归新贵游戏所有。")
    }  
}
