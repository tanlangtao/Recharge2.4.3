import { Language_pay } from "../language/payLanguage";
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

    info = {
        flow_rate:1,
        range:[]
    }
    app = null
    activity_id = 13
    login_ip = ''
    received = false
    activeName = ''
    setIdInfo(id,info,activeName=''){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = {
                range:[]
            }
        }
        info.range.forEach((item,index) => {
            this.recharge_amountLabel[index].string = `${Language_pay.Lg.ChangeByText('首存')}${item.recharge_amount}`
            this.bonusLabel[index].string = item.bonus 
            this.recharge_amountLabelTest[index].string = `${item.recharge_amount}+`
            this.bonusLabelTest[index].string = item.bonus 
        });
        this.info = info
        this.activity_id = id
        this.activeName = activeName
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
        this.ApplyBtnInit()
    }
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/getFristPayAmount?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                console.log(response)
                if(response.data.is_received == 0 && response.data.frist_pay_amount >= this.info.range[0].recharge_amount ){
                    let btnIndex = 0;
                    this.info.range.forEach((item,index)=>{
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
                    this.info.range.forEach((item,index)=>{
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
    ApplyBtnInit(){
        let btn= cc.find('Canvas/Activity/Content/FirstDepostGold/bg/applyBtn').getComponent(cc.Button)
        if(this.getLocal()){
            btn.interactable = true
        }else{
            btn.interactable = false
        }
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
    receiveFristPayGold(){
        var url = `${this.app.UrlData.host}/api/activity/receiveFristPayGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
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
        let bg= cc.find('Canvas/Activity/Content/FirstDepostGold/bg')
        if(this.app.UrlData.package_id == 10){
            this.btnArr.forEach(e=>{
                this.app.loadIconLg(`${src}/activeSprite/btn_lq`,e)
                this.app.loadIconLg(`${src}/activeSprite/btn_ylq`,e.getChildByName('bg2'))
            })
            let xyhsc_biao = cc.find('Canvas/Activity/Content/FirstDepostGold/bg/xyhsc_biao')
            let rule = cc.find('Canvas/Activity/Content/FirstDepostGold/bg/rule').getComponent(cc.RichText)
            let label1 = cc.find('Canvas/Activity/Content/FirstDepostGold/bg/label1').getComponent(cc.Label)
            this.app.loadIconLg(`${src}/activeBigImage/xyhsc_bg`,bg)
            this.app.loadIconLg(`${src}/activeSprite/xyhsc_biao`,xyhsc_biao)
            label1.string = Language_pay.Lg.ChangeByText(`本金一倍+\n彩金${this.info.flow_rate}倍流水`)
            rule.string = Language_pay.Lg.ChangeByText(`<color=#FFFFFF>1. 新注册玩家完成手机以及银行卡绑定后前往当前活动进行申请。<color=#FF000>所有未进行申请的玩家无法领取活动彩金</c>。\n2. 平台中的新用户活动只能参加一个。\n2. 玩家必须充值成功未下注时进行领取，需满足首充金额一倍流水+赠送彩金的8倍流水才能申请兑换。\n3. 游戏规则：仅参加以下游戏</c><color=#F3DC5B>《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》《AGA电子》《CQ9电子游戏》\n《PT电子游戏》《JDB电子游戏》《PG电子游戏》《AG电子游戏》</c>。\n4. 同一用户仅限领取一次，恶意套利者将封号处理。\n5. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据实际情况，随时调整活动内容。</color>`)
        }
    }
}
