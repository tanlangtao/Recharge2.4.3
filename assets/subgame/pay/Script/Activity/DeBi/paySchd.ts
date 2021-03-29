
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    recharge_amountLabel: cc.Label[] = [];

    @property(cc.Label)
    bonusLabel: cc.Label[] = [];

    @property(cc.Node)
    btnArr: cc.Node[] = [];

    info = []
    app = null
    activity_id = 13
    login_ip = ''
    received = false
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
        }
        console.log(info)
        info.forEach((item,index) => {
            this.recharge_amountLabel[index].string = `${item.recharge_amount}`
            this.bonusLabel[index].string = item.bonus 
        });
        this.info = info
        this.activity_id = id
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.getFristPayAmount()
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText("获取登陆ip失败!"))
        }
        this.setLanguageResource()
    }
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/getFristPayAmount?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                console.log(response)
                if(response.data.is_received == 0 && response.data.frist_pay_amount >= this.info[0].recharge_amount ){
                    let btnIndex = 0;
                    this.info.forEach((item,index)=>{
                        if(index < this.btnArr.length && response.data.frist_pay_amount >= item.recharge_amount) {
                           btnIndex = index
                       }
                   })
                   this.btnArr[btnIndex].active = true
                   this.btnArr[btnIndex].getChildByName("bg2").active = false
                }else if(response.data.is_received != 0){
                    this.btnArr.forEach(e=>{
                        e.active = false
                    })

                    let btnIndex = 0;
                    this.info.forEach((item,index)=>{
                       if(response.data.frist_pay_amount >= item.recharge_amount) {
                           btnIndex = index
                       }
                   })
                   // 显示已领取
                   this.btnArr[btnIndex].active = true
                   this.btnArr[btnIndex].getChildByName("bg2").active = true
                   this.received = true
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    receiveFristPaymentGold(){
        var url = `${this.app.UrlData.host}/api/activity/receiveFristPaymentGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&login_ip=$${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
                this.getFristPayAmount()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText("参加活动失败:请先绑定手机号!"))
            return
        }
        if(this.received){
            return this.app.showAlert(Language_pay.Lg.ChangeByText("同一用户仅限领取一次!"))
        }
        this.receiveFristPaymentGold()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/Schd/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event3_schd_content`,bg)
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('btn_linqu'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        
        let label1= cc.find('Canvas/Activity/Content/Schd/bg/group/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/Schd/bg/group/label2').getComponent(cc.Label)
        let label4= cc.find('Canvas/Activity/Content/Schd/bg/label4').getComponent(cc.Label)

        label1.string = `3${Language_pay.Lg.ChangeByText('倍')}`
        label2.string = `3${Language_pay.Lg.ChangeByText('倍')}`
        
        
        if(this.app.UrlData.package_id == 8){
            let title1= cc.find('Canvas/Activity/Content/Schd/bg/title1').getComponent(cc.Label)
            let title2= cc.find('Canvas/Activity/Content/Schd/bg/title2').getComponent(cc.Label)
            let title3= cc.find('Canvas/Activity/Content/Schd/bg/title3').getComponent(cc.Label)
            title1.string = Language_pay.Lg.ChangeByText('充值金额')
            title2.string = Language_pay.Lg.ChangeByText('赠送彩金')
            title3.string = Language_pay.Lg.ChangeByText('流水')
            label4.string = Language_pay.Lg.ChangeByText("1. 参与首充赠送玩家不得参与平台其他活动， 第二笔充值即可正常参与平台活动。\n2. 本活动需要完成手机及银行卡绑定后才能参与。\n3. 必须充值成功未下注时进行领取，需要达到流水金额（充值金额+赠送金额）三倍才能申请兑换。\n4. 游戏规则： 仅参加以下游戏《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》。\n5. 同一用户仅限领取一次，恶意套利者将封号处理。\n6. 本活动最终解释权归新盛所有。")
        }else{
            let label3= cc.find('Canvas/Activity/Content/Schd/bg/group/label3').getComponent(cc.Label)
            label3.string = `3${Language_pay.Lg.ChangeByText('倍')}`
            label4.string = Language_pay.Lg.ChangeByText("1. 参与首充赠送玩家不得参与平台其他活动， 第二笔充值即可正常参与平台活动。\n2. 本活动需要完成手机及银行卡绑定后才能参与。\n3. 必须充值成功未下注时进行领取，需要达到流水金额（充值金额+赠送金额）三倍才能申请兑换。\n4. 游戏规则： 仅参加以下游戏《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》。\n5. 同一用户仅限领取一次，恶意套利者将封号处理。\n6. 本活动最终解释权归德比所有。")
        }
    }  
}
