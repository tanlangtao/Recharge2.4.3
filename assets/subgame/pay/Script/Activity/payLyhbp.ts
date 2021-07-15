import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    btnArr: cc.Node[] = [];

    app = null
    login_ip = ''

    info = {
        start:10,
        end:20,
        conf:[
            { first_pay_min:250,gold:60 },
            { first_pay_min:500 },
            { first_pay_min:1000 },
            { first_pay_min:2500 }
        ]
    }
    activity_id = 0
    FristPayAmount :any={}
    setId(id,activename = '',info = null){
        this.activity_id = id
        if (info !=null) {
            this.info = info
            console.log(this.info)
        }
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        this.setLanguageResource()
        if(this.app.UrlData.package_id == 8){
            this.info.conf = [{first_pay_min:200},{first_pay_min:300}]
        }else if(this.app.UrlData.package_id == 9){
            this.ApplyBtnInit()
        }
        this.getLocal()
    }
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/GetFristPayAmountByWeek?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
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
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    renderBtn(){
        this.btnArr.forEach((e)=>{
            e.active = false
        })
        if(this.FristPayAmount.is_received == 0 && this.FristPayAmount.frist_pay_amount >= this.info.conf[0].first_pay_min ){
            let btnIndex = 0;
            this.info.conf.forEach((item,index)=>{
               if(this.FristPayAmount.frist_pay_amount >= item.first_pay_min) {
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
            this.info.conf.forEach((item,index)=>{
               if(this.FristPayAmount.frist_pay_amount >= item.first_pay_min) {
                   btnIndex = index
               }
           })
           // 显示已领取
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = true
        }
    }
    applyReimburse(){
        var url = ``;
        if(this.app.UrlData.package_id == 9){
            url = `${this.app.UrlData.host}/api/activity/oldUserApplyReimburse`;
        }else{
            url = `${this.app.UrlData.host}/api/activity/applyReimburse`;
        }
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText("申请成功!"))
                cc.sys.localStorage.setItem(`ApplyLyhBp_${this.app.UrlData.user_id}`,true)
                this.ApplyBtnInit()
                this.getFristPayAmount()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    receivereimburse(){
        var url = `${this.app.UrlData.host}/api/activity/oldReimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText("领取成功!"))
                //手动将领取结果赋值为1
                this.FristPayAmount.is_received = 1
                this.setLocal()
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    setLocal(){
        let time = new Date().getTime()/1000
        this.FristPayAmount.getTime = time
        cc.sys.localStorage.setItem(`oldUserFristPayAmount_${this.app.UrlData.user_id}`,JSON.stringify(this.FristPayAmount))
    }
    getLocal(){
        let newTime = new Date().getTime()/1000
        let localFristPayAmount = cc.sys.localStorage.getItem(`oldUserFristPayAmount_${this.app.UrlData.user_id}`) 
        if (localFristPayAmount && JSON.parse(localFristPayAmount).frist_pay_amount >0 && (newTime-JSON.parse(localFristPayAmount).getTime ) < 3600){
            this.FristPayAmount = JSON.parse(localFristPayAmount)
            console.log(this.FristPayAmount)
            this.renderBtn()
        }else{
            this.getFristPayAmount()
        }
    }
    getLocalApply(){
        let local = cc.sys.localStorage.getItem(`ApplyLyhBp_${this.app.UrlData.user_id}`)
        if(local){
            return false
        }else{
            return true
        }
    }
    ApplyBtnInit(){
        let btn= cc.find('Canvas/Activity/Content/Lyhbp/applyBtn').getComponent(cc.Button)
        let h = new Date().getHours()
        if(this.getLocalApply()){
            if(h < this.info.start || h >= this.info.end){
                btn.interactable = false
            }else{
                btn.interactable = true
            }
        }else{
            btn.interactable = false
            btn.node.getChildByName("btn_done").active = true
        }
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.FristPayAmount.is_received!=0){
            return this.app.showAlert(Language_pay.Lg.ChangeByText("同一用户仅限领取一次!"))
        }
        this.receivereimburse()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/Lyhbp/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event5_lyh_content`,bg)

        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('btn_linqu'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })

        let title1= cc.find('Canvas/Activity/Content/Lyhbp/group1/title1').getComponent(cc.Label)
        let title2= cc.find('Canvas/Activity/Content/Lyhbp/group1/title2').getComponent(cc.Label)
        let title3= cc.find('Canvas/Activity/Content/Lyhbp/group1/title3').getComponent(cc.Label)
        let label= cc.find('Canvas/Activity/Content/Lyhbp/label').getComponent(cc.RichText)

        title1.string = Language_pay.Lg.ChangeByText("首充金额")
        title2.string = Language_pay.Lg.ChangeByText("包赔金额")
        title3.string = Language_pay.Lg.ChangeByText("最高兑换金额")
        
        if(this.app.UrlData.package_id == 8){
            let event_xs_lyh_tip =cc.find('Canvas/Activity/Content/Lyhbp/event_xs_lyh_tip')
            this.app.loadIconLg(`${src}/activeSprite/event_xs_lyh_tip`,event_xs_lyh_tip)
            let title4= cc.find('Canvas/Activity/Content/Lyhbp/group1/title4').getComponent(cc.Label)
            title4.string = Language_pay.Lg.ChangeByText("限制最高注")
            label.string = Language_pay.Lg.ChangeByText("<color=#E8C999>1. 老会员联系上级进行申请，申请后即视为参加此活动，充值本金最高兑换200%，赔付彩金无兑换上限。\n2. 参加活动的会员只能进行指定游戏《财神到》《捕鱼·海王》《捕鱼·聚宝盆》《水果机》。\n3. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时即可在本活动界面领取活动彩金。\n4. 赢金到规定金额不兑换视为放弃包赔资格（输完不赔付）。\n5. 同IP同设备多账号，仅限1个账号享受包赔活动资格，包赔金无需流水可直接申请兑换， 恶意套利者将封\n号处理。\n6.本活动最终解释权归新盛所有。\n</color>")
        }else if(this.app.UrlData.package_id == 9){
            let event_xs_lyh_tip =cc.find('Canvas/Activity/Content/Lyhbp/event_xs_lyh_tip')
            this.app.loadIconLg(`${src}/activeSprite/event_xs_lyh_tip`,event_xs_lyh_tip)
            let title4= cc.find('Canvas/Activity/Content/Lyhbp/group1/title4').getComponent(cc.Label)
            title4.string = Language_pay.Lg.ChangeByText("限制最高注")
            let label1 = cc.find('Canvas/Activity/Content/Lyhbp/label1').getComponent(cc.Label)
            label1.string = `申请开放时间\n${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}`
            label.string = Language_pay.Lg.ChangeByText(`<color=#E8C999>1. 老会员每周限制参加一次，绑定手机以及银行卡后前往当前活动进行申请，申请时间：每周五/周六\n ${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}。\n2. 参加活动的会员，只能进行指定游戏《财神到》《捕鱼·聚宝盆》游戏，进行其他游戏便视为放弃此活动。\n3. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时即可前往本活动界面进行\n领取活动彩金。\n4. 赢金到规定金额不兑换视为放弃包赔资格（输完不能赔付）。\n5. 同一用户（同IP同设备视为同一用户）仅限参加一次活动，活动彩金无需流水限制可\n直接申请兑换。\n6.平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权\n根据活动情况随时调整活动内容。\n</color>`)
        }else{
            label.string = Language_pay.Lg.ChangeByText("<color=#E8C999>1. 老会员每周限制参加一次（星期一到星期六），联系上级进行申请，申请时间：每天12:00-21:30。\n申请后即视为参加此活动，充值本金最高兑换200%，赔付彩金无兑换上限。\n2. 参加活动的会员，只能进行指定游戏</c><color=#FF0000>《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》《百人牛牛》</c>\n5款游戏， 进行其他游戏便视为放弃此活动。\n3. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时前往本活动界面领取活动彩金。\n4. 赢金到规定金额不兑换视为放弃包赔资格（输完不能赔付）。\n5. 包赔金在每周日23:59:59未进行领取则视为自动放弃。\n6. 同IP同设备多账号，仅限1个账号享受包赔活动，包赔金无需流水可直接申请兑换， 恶意套利者将封号处理。\n7.本活动最终解释权归德比所有。</color>")
        }
    }   
}
