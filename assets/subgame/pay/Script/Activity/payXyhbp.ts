import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnArr: cc.Node[] = [];

    app = null
    login_ip = ''

    info = [140,210,350,700,140]
    activity_id = 0
    FristPayAmount :any={}
    setId(id){
        this.activity_id = id
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        if(this.app.UrlData.package_id == 8){
            this.info = [100,150]
        }
        this.getLocal()
        this.setLanguageResource()
    }
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/getFristPayAmount?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                console.log(response)
                this.FristPayAmount = response.data
                this.setLocal()
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    renderBtn(){
        this.btnArr.forEach((e)=>{
            e.active = false
        })
        if(this.FristPayAmount.is_received == 0 && this.FristPayAmount.frist_pay_amount >= this.info[0] ){
            let btnIndex = 0;
            this.info.forEach((item,index)=>{
               if(index < this.btnArr.length &&this.FristPayAmount.frist_pay_amount >= item) {
                   btnIndex = index
               }
           })
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = false
        }else if(this.FristPayAmount.is_received != 0){
            this.btnArr.forEach(e=>{
                e.active = false
            })

            let btnIndex = 0;
            this.info.forEach((item,index)=>{
               if(this.FristPayAmount.frist_pay_amount >= item) {
                   btnIndex = index
               }
           })
           // 显示已领取
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = true
        }
    }
    applyReimburse(){
        var url = `${this.app.UrlData.host}/api/activity/applyReimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'))

                cc.sys.localStorage.setItem(`isApplyReimburse_${this.app.UrlData.user_id}`,true)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    receivereimburse(){
        var url = `${this.app.UrlData.host}/api/activity/reimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
                //手动将领取结果赋值为1
                this.FristPayAmount.is_received = 1
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    setLocal(){
        cc.sys.localStorage.setItem(`FristPayAmount_${this.app.UrlData.user_id}`,JSON.stringify(this.FristPayAmount))
    }
    getLocal(){
        let localFristPayAmount = cc.sys.localStorage.getItem(`FristPayAmount_${this.app.UrlData.user_id}`) 
        if (localFristPayAmount && JSON.parse(localFristPayAmount).frist_pay_amount >0){
            this.FristPayAmount = JSON.parse(localFristPayAmount)
            this.renderBtn()
        }else{
            this.getFristPayAmount()
        }
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.FristPayAmount.is_received!=0){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('同一用户仅限领取一次!'))
        }
        this.receivereimburse()
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/Xyhbp/bg')
        let event4_xzcyh_frame2= cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_frame')
        let event4_xzcyh_content= cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_content')
        let event4_xzcyh_text= cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_content/event4_xzcyh_text')
        
        this.app.loadIconLg(`${src}/activeBigImage/event4_xzcyh_bg`,bg)
        
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('btn_linqu'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        let label= cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_content/ScrollView/view/content/label').getComponent(cc.RichText)
        if(this.app.UrlData.package_id == 8) {
            let title1 = cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_frame/title1').getComponent(cc.Label)
            let title2 = cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_frame/title2').getComponent(cc.Label)
            let title3 = cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_frame/title3').getComponent(cc.Label)
            let title4 = cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_frame/title4').getComponent(cc.Label)
            let tishi= cc.find('Canvas/Activity/Content/Xyhbp/bg/event4_xzcyh_content/ScrollView/view/content/label').getComponent(cc.Label)
            title1.string = Language_pay.Lg.ChangeByText('首充金额')
            title2.string = Language_pay.Lg.ChangeByText('包赔金额')
            title3.string = Language_pay.Lg.ChangeByText('最高兑换金额')
            title4.string = Language_pay.Lg.ChangeByText('限制最高注')
            event4_xzcyh_text.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('包赔专线盛世开启，申请时间： 12:00-20:00')
            tishi.string = Language_pay.Lg.ChangeByText("1. 新会员注册好账号， 需先绑定好手机号码与银行卡后联系上级进行申请，申请后即视为参加此活动，充值本金最高兑换200%，赔付彩金无兑换上限。\n2. 参加活动的会员只能进行指定游戏《财神到》《捕鱼·海王》《捕鱼·聚宝盆》《水果机》。\n3. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时即可在本活动界面领取活动彩金，当日23:59:59未进行领取则视为自动放弃。\n4. 赢金到规定金额不兑换视为放弃包赔资格（输完不赔付）。\n5. 同IP同设备多账号，仅限1个账号享受包赔活动资格，包赔金无需流水可直接申请，恶意套利者将封号处理。\n6. 本活动最终解释权归新盛游戏所有。")
        }else{
            this.app.loadIconLg(`${src}/activeSprite/event4_xzcyh_frame2`,event4_xzcyh_frame2)
            this.app.loadIconLg(`${src}/activeSprite/event4_xzcyh_content`,event4_xzcyh_content)
            this.app.loadIconLg(`${src}/activeSprite/event4_xzcyh_text`,event4_xzcyh_text)
            label.string = Language_pay.Lg.ChangeByText("<color=#E8C999>1. 新会员注册好账号，需先绑定好手机号码与银行卡后联系上级进行申请，申请\n时间：每天12:00-21:30。\n申请后即视为参加此活动，充值本金最高兑换200%，赔付彩金无兑换上限。\n2. 参加活动的会员，只能进行指定游戏</c><color=#EE000>《财神到》《水果机》《捕鱼·海王》\n《捕鱼·聚宝盆》《百人牛牛》</c>5款游戏， 进行其他游戏便视为放弃此活动。\n3. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时前往本\n活动界面进行领取活动彩金。\n4. 赢金到规定金额不提款视为放弃包赔资格（输完不能赔付）。\n5. 同IP同设备多账号，仅限1个账号享受包赔活动，包赔金无需流水可直接申请\n兑换， 恶意套利者将封号处理。\n6. 本活动最终解释权归德比所有。</color>")
        }
    }   
}
