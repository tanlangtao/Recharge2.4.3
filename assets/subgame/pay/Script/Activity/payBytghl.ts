import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnGroup :cc.Node= null;

    @property(cc.Node)
    group1 :cc.Node = null;

    @property(cc.Node)
    group2 :cc.Node = null;

    app = null
    ReceiveFishInfo = null
    info = {
        start:0,
        end:0,
        flow_rate:1,
        range:[
            {
                bet:0,
                gold:0
            }
        ]
    }
    activity_id = 0
    login_ip = ""
    flow_rate = 0
    targeIndex=0
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        this.getReceiveFishInfo()
        this.setLanguageResource()
    }
    setIdInfo(id,info){
        this.activity_id = id
        console.log(info)
        this.info = info
        this.info.range.forEach((e,index)=>{
            if(index<this.group1.children.length){
                this.group1.children[index].getComponent(cc.Label).string = `${e.bet}+`
                this.group2.children[index].getComponent(cc.Label).string = `${e.gold}`
            }
        })
        this.flow_rate = info.flow_rate
    }
    getReceiveFishInfo(){
        var url = `${this.app.UrlData.host}/api/activity/getReceiveFishInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.ReceiveFishInfo = response.data
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.ReceiveFishInfo.is_received == 1){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('同一用户仅限领取一次!'))
        }
        this.receiveFishPassGold()
    }
    receiveFishPassGold(){
        var url = `${this.app.UrlData.host}/api/activity/receiveFishPassGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&index=${this.targeIndex}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'))
                this.getReceiveFishInfo()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    renderBtn(){
        this.btnGroup.children.forEach((e)=>{
            e.active = false
        })
        if(this.ReceiveFishInfo.bet_amount>= this.info.range[0].bet ){
            let btnIndex = 0;
            this.info.range.forEach((item,index)=>{
                if(index < this.btnGroup.children.length &&  this.ReceiveFishInfo.bet_amount >=item.bet ) {
                   btnIndex = index
               }
           })
           this.targeIndex = btnIndex
            this.btnGroup.children[btnIndex].active = true
            this.btnGroup.children[btnIndex].getChildByName("bg2").active = false
        }
        if(this.ReceiveFishInfo["received_info"]){
            this.ReceiveFishInfo.received_info.forEach((e)=>{
                this.info.range.forEach((item,index)=>{
                    if(e.receive_amount == item.gold){
                        this.btnGroup.children[index].getChildByName("bg2").active = true
                    }
                })
            })
        }
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/Bytghl/bg')
        let label1= cc.find('Canvas/Activity/Content/Bytghl/bg/FootContent/label1').getComponent(cc.Label)
        let title1= cc.find('Canvas/Activity/Content/Bytghl/bg/group4/title1').getComponent(cc.Label)
        let title2= cc.find('Canvas/Activity/Content/Bytghl/bg/group4/title2').getComponent(cc.Label)
        let title3= cc.find('Canvas/Activity/Content/Bytghl/bg/group4/title3').getComponent(cc.Label)
        let title4= cc.find('Canvas/Activity/Content/Bytghl/bg/group4/title4').getComponent(cc.Label)
        let title5= cc.find('Canvas/Activity/Content/Bytghl/bg/group4/title5').getComponent(cc.Label)

        title1.string = Language_pay.Lg.ChangeByText('活动对象')
        title2.string = Language_pay.Lg.ChangeByText('关卡')
        title3.string = Language_pay.Lg.ChangeByText('有效投注')
        title4.string = Language_pay.Lg.ChangeByText('活动彩金')
        title5.string = Language_pay.Lg.ChangeByText('流水要求')
        this.btnGroup.children.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('btn_linqu'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        this.app.loadIconLg(`${src}/activeBigImage/event_xh_bytghl_content`,bg)
        label1.string = Language_pay.Lg.ChangeByText(`1.玩家需要绑定手机号码和银行卡才能参与此活动。\n2.游戏限制：仅限《疯狂漩涡》捕鱼游戏，玩家昨日游戏有效投注达标即可前往活动界面领取奖励。\n3.领取时间：每天${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}，逾期未领取视为自动放弃。\n4.同一用户（同IP同设备视为同一用户）仅限参加一次活动，活动彩金需要1倍流水方可申请兑换。\n5. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据实际情况，随时调整活动内容。`)
    }
}
