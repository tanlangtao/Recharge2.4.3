import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    btnArr: cc.Node[] = [];

    app = null
    login_ip = ''

    info = {
        flow_rate:0,
        start:0,
        end:0,
        range:[
            {
                bonus:0,
                flow_rate:0,
                recharge_amount:0
            }
        ]
    }
    activity_id = 0
    FristPayAmount = {
        frist_pay_amount:0,
        is_received:0
    }
    setIdInfo(id,info){
        this.activity_id = id
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            console.log("活动内容未配置！")
        }else{
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
        this.infoInit()
        this.setLanguageResource()
        this.getFristPayAmount()
        this.ApplyBtnInit()
    }
    infoInit(){
        let group = cc.find("Canvas/Activity/Content/Xyhschd/bg/group")
        group.children[0].getComponent(cc.Label).string = `${this.info.range[0].recharge_amount}`
        group.children[1].getComponent(cc.Label).string = `${this.info.range[0].bonus}`
        group.children[2].getComponent(cc.Label).string = `${this.info.range[1].recharge_amount}`
        group.children[3].getComponent(cc.Label).string = `${this.info.range[1].bonus}`
        group.children[4].getComponent(cc.Label).string = `本金1倍+\n彩金${this.info.flow_rate}倍流水`
    }
    
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/getFristPayAmount?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                console.log(response)
                this.FristPayAmount = response.data
                this.renderBtn()
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
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
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
    //确认申请
    applyFristPay(){
        var url = `${this.app.UrlData.host}/api/activity/applyFristPay`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'))
                this.setLocal()
                this.ApplyBtnInit()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    renderBtn(){
        this.btnArr.forEach((e)=>{
            e.active = false
        })
        if(this.FristPayAmount.is_received == 0 && this.FristPayAmount.frist_pay_amount >= this.info.range[0].recharge_amount ){
            let btnIndex = 0;
            this.info.range.forEach((item,index)=>{
               if(this.FristPayAmount.frist_pay_amount >= item.recharge_amount) {
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
            this.info.range.forEach((item,index)=>{
                if(this.FristPayAmount.frist_pay_amount >= item.recharge_amount ) {
                    btnIndex = index
                }
            })
           // 显示已领取
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = true
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
        this.receiveFristPayGold()
    }
    ApplyBtnInit(){
        let btn= cc.find('Canvas/Activity/Content/Xyhschd/bg/applyBtn').getComponent(cc.Button)
        let h = new Date().getHours()
        if(this.getLocal()){
            if(h < this.info.start || h >= this.info.end){
                btn.interactable = false
            }else{
                btn.interactable = true
            }
            btn.node.children[0].active = false
        }else{
            btn.node.children[0].active = true
            btn.interactable = false
        }
    }
    getLocal(){
        let local = cc.sys.localStorage.getItem(`ApplyXyhschd_${this.app.UrlData.user_id}`)
        if(local){
            return false
        }else{
            return true
        }
    }
    setLocal(){
        cc.sys.localStorage.setItem(`ApplyXyhschd_${this.app.UrlData.user_id}`,JSON.stringify(true))
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/Xyhschd/bg')
        let title= cc.find('Canvas/Activity/Content/Xyhschd/bg/title')
        this.app.loadIconLg(`${src}/activeBigImage/XG_event_20210623-1`,bg)
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName("btn_linqu"))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        title.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("首充金额")
        title.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("活动彩金")
        title.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("提现流水要求")
        let rule = cc.find("Canvas/Activity/Content/Xyhschd/bg/rule").getComponent(cc.Label)
        rule.string = `1. 新注册玩家完成手机以及银行卡绑定后前往当前活动进行申请， 申请开放时间为每天${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}。所有未进行申请的玩家无法领取活动彩金。\n2.平台中的新用户活动只能参加一个，申请后即视为参加此活动。\n3. 玩家必须充值成功未下注时进行领取，需满足首充金额一倍流水+赠送彩金的${this.info.flow_rate}倍流水才能申请兑换。\n4. 游戏规则：仅参加以下游戏《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》《多福多财》《疯狂旋涡》《CQ9电子游戏》《PT电子游戏》《JDB电子游戏》《PG电子游戏》《AG电子游戏》。\n5. 同一用户仅限领取一次，恶意套利者将封号处理。\n6. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据实际情况，随时调整活动内容。`
        let applyBtn= cc.find('Canvas/Activity/Content/Xyhschd/bg/applyBtn')
        if(this.app.UrlData.package_id == 11){
            this.app.loadIconLg(`${src}/activeSprite/btn_apply2`,applyBtn)
            this.app.loadIconLg(`${src}/activeSprite/btn_done2`,applyBtn.getChildByName("btn_done"))
        }else{
            this.app.loadIconLg(`${src}/activeSprite/btn_apply`,applyBtn)
            this.app.loadIconLg(`${src}/activeSprite/btn_done`,applyBtn.getChildByName("btn_done"))
        }
        
        let label= cc.find('Canvas/Activity/Content/Xyhschd/bg/label1').getComponent(cc.Label)
        label.string = `${Language_pay.Lg.ChangeByText("申请开放时间")}\n${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}`
    }   
}
