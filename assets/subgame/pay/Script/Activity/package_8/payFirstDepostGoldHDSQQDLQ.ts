import { Language_pay } from "./../../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    recharge_amountLabel: cc.Label[] = [];

    @property(cc.Label)
    bonusLabel: cc.Label[] = [];

    @property(cc.Label)
    recharge_amountLabelTest: cc.Label[] = [];

    @property(cc.Label)
    bonusLabelTest: cc.Label[] = [];

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
        info.forEach((item,index) => {
            this.recharge_amountLabel[index].string = `${Language_pay.Lg.ChangeByText('首存')}${item.recharge_amount}`
            this.bonusLabel[index].string = item.bonus 
            this.recharge_amountLabelTest[index].string = `${item.recharge_amount}+`
            this.bonusLabelTest[index].string = item.bonus 
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
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
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
                       if(response.data.frist_pay_amount >= item.recharge_amount) {
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
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    receiveFristPayGold(){
        var url = `${this.app.UrlData.host}/api/activity/receiveFristPayGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&login_ip=$${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}&package_id=${this.app.UrlData.package_id}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789&package_id=${this.app.UrlData.package_id}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
                this.getFristPayAmount()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.received){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('同一用户仅限领取一次!'))
        }
        this.receiveFristPayGold()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/FirstDepostGoldHDSQQDLQ/bg')
        let Layout= cc.find('Canvas/Activity/Content/FirstDepostGoldHDSQQDLQ/bg/Layout')
        let group1= cc.find('Canvas/Activity/Content/FirstDepostGoldHDSQQDLQ/bg/Content/group1')

        this.app.loadIconLg(`${src}/activeBigImage/yuyu_firstR`,bg)
        
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('bg1'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        group1.children.forEach(e=>{
           let txt_s = e.getChildByName('right').getChildByName('txt_s')
           let txt_y = e.getChildByName('right').getChildByName('txt_y')
           this.app.loadIconLg(`${src}/activeSprite/txt_zs`,txt_s)
           this.app.loadIconLg(`${src}/activeSprite/txt_y`,txt_y)
        })
        let label= cc.find('Canvas/Activity/Content/FirstDepostGoldHDSQQDLQ/bg/Content/ScrollView/view/content/label').getComponent(cc.Label)
        let label1 = cc.find('Canvas/Activity/Content/FirstDepostGoldHDSQQDLQ/bg/label1').getComponent(cc.Label)
        let label2 = cc.find('Canvas/Activity/Content/FirstDepostGoldHDSQQDLQ/bg/label2').getComponent(cc.Label)
        label1.string = Language_pay.Lg.ChangeByText('首充')
        label2.string = Language_pay.Lg.ChangeByText('赠送金币')
        label.string = Language_pay.Lg.ChangeByText("活动规则：\n1. 新会员绑定好手机号码和银行卡后联系上级进行申请，申请时间：每天12:00-20:00。\n2. 参与首存彩金玩家不得参与平台其他活动。\n3. 必须充值成功未下注时进行领取，需满足首充金额一倍流水+赠送金额的三倍流水才能申请兑换。\n4. 游戏规则：仅参加以下游戏《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》。\n5. 同一用户仅限领取一次，恶意套利者将封号处理。\n6. 本活动最终解释权归新盛棋牌所有。")
    }
}
