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
        bet_min:0,
        bet_max:0,
        lose_range:[
            {lose_max:0,lose_min:0,percent: 0},
            {lose_max:0,lose_min:0,percent: 0},
            {lose_max:0,lose_min:0,percent: 0},
            {lose_max:0,lose_min:0,percent: 0},
        ],
        start:0,
        end:0,
        round:0
    }
    activity_id = 0
    is_received = 0
    lose_amount = 0
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
        this.getRewardFFCFlag()
        this.ApplyBtnInit()
    }
    infoInit(){
        let label1 = cc.find("Canvas/Activity/Content/FfcBaoPei/bg/Layout/label2").getComponent(cc.Label)
        let label2 = cc.find("Canvas/Activity/Content/FfcBaoPei/bg/Layout/label2").getComponent(cc.Label)
        let label3 = cc.find("Canvas/Activity/Content/FfcBaoPei/bg/Layout/label3").getComponent(cc.Label)
        let group1 = cc.find("Canvas/Activity/Content/FfcBaoPei/bg/Layout/group1")
        let group2 = cc.find("Canvas/Activity/Content/FfcBaoPei/bg/Layout/group2")
        label1.string  = `${Language_pay.Lg.ChangeByText('连续')}${this.info.round}${Language_pay.Lg.ChangeByText('局')}`
        label2.string  = `${this.info.bet_min}-${this.info.bet_max}`
        label3.string  = `${Language_pay.Lg.ChangeByText('彩金')}${this.info.flow_rate}${Language_pay.Lg.ChangeByText('倍流水')}`
        group1.children.forEach((e,index)=>{
            //净亏损区间
            e.getComponent(cc.Label).string = `${this.info.lose_range[index].lose_min}-${this.info.lose_range[index].lose_max}`
        })
        group2.children.forEach((e,index)=>{
            //对应比例
            e.getComponent(cc.Label).string = `${this.info.lose_range[index].percent*100}%`
        })
    }
    getRewardFFCFlag(){
        var url = `${this.app.UrlData.host}/api/activity/getRewardFFCFlag?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&lottery=HNFFC`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.is_received = response.data.is_received
                this.lose_amount = response.data.amount
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    //确认申请
    onapplyHandleFFC(){
        //确认申请
        var url = `${this.app.UrlData.host}/api/activity/applyHandleFFC`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
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
    receiveRewardHeNei(){
        var url = `${this.app.UrlData.host}/api/activity/receiveRewardHeNei`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&lottery=HNFFC&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText("申请成功!"))
                this.getRewardFFCFlag()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    renderBtn(){
        this.btnArr.forEach((e)=>{
            e.active = false
        })
        if(this.is_received == 0 && this.lose_amount >= this.info.lose_range[0].lose_min ){
            let btnIndex = 0;
            this.info.lose_range.forEach((item,index)=>{
               if(this.lose_amount >= item.lose_min && this.lose_amount < item.lose_max) {
                   btnIndex = index
               }
           })
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = false
        }else if(this.is_received != 0){
            this.btnArr.forEach(e=>{
                e.active = false
            })
            let btnIndex = 0;
            this.info.lose_range.forEach((item,index)=>{
                if(this.lose_amount >= item.lose_min && this.lose_amount < item.lose_max) {
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
        if(this.is_received!=0){
            return this.app.showAlert(Language_pay.Lg.ChangeByText("同一用户仅限领取一次!"))
        }
        this.receiveRewardHeNei()
    }
    ApplyBtnInit(){
        let btn= cc.find('Canvas/Activity/Content/FfcBaoPei/bg/Layout/groupBtn2/btn').getComponent(cc.Button)
        btn.interactable = this.getLocal()
    }
    getLocal(){
        let local = cc.sys.localStorage.getItem(`ApplyFfcBaoPei_${this.app.UrlData.user_id}`)
        if(local){
            return false
        }else{
            return true
        }
    }
    setLocal(){
        cc.sys.localStorage.setItem(`ApplyFfcBaoPei_${this.app.UrlData.user_id}`,JSON.stringify(true))
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/FfcBaoPei/bg')
        this.app.loadIconLg(`${src}/activeBigImage/ffcBaoPeiBg`,bg)
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_lq`,e)
            this.app.loadIconLg(`${src}/activeSprite/btn_ylq`,e.getChildByName('bg2'))
        })
        let title= cc.find('Canvas/Activity/Content/FfcBaoPei/bg/Layout/title')
        let rule = cc.find("Canvas/Activity/Content/FfcBaoPei/bg/Content/ScrollView/view/content/rule").getComponent(cc.RichText)
        title.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("游戏局数")
        title.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("单局下注金额")
        title.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("净亏损区间")
        title.children[3].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("对应比例")
        title.children[4].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("流水要求")
        rule.string = `<color=#FFFFFF>1. 新玩家注册好账号，需先绑定好手机号码与银行卡联系上级或进线客服进行申请，申请完毕后前往当前活动界面进行确认申请， \n确认申请开放时间： 每天${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}。<color=#FF0000>所有未进行确认申请的玩家无法领取活动彩金。</c>\n2. 平台中的新玩家活动只能参加其中一个。<color=#F3DC5B>\n3. 活动限制：仅限分分彩猜大小-河内分分彩房间，单局下注仅限一个区域（大或小），不能投注豹子，进行其他游戏视为放弃此活动。\n4. 在规定游戏中连续下注${this.info.round}局且单局下注金额为${this.info.bet_min}~${this.info.bet_max}金币，依照累计产生的净亏损前往本活动界面领取活动彩金。</c>\n5. 同一用户（同IP同设备视为同一用户）仅限参加一次活动，活动彩金需${this.info.flow_rate}倍流水方可申请兑换。\n6. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据实际情况，随时调整活动内容。</c></color>`
    
        let btn= cc.find('Canvas/Activity/Content/FfcBaoPei/bg/Layout/groupBtn2/btn')
        this.app.loadIconLg(`${src}/activeSprite/anniu`,btn)
        let h = new Date().getHours()
        if(h < this.info.start || h > this.info.end){
            btn.getComponent(cc.Button).interactable = false
        }else{
            btn.getComponent(cc.Button).interactable = true
        }
        let label= cc.find('Canvas/Activity/Content/FfcBaoPei/bg/Layout/groupBtn2/label').getComponent(cc.Label)
        label.string = `${Language_pay.Lg.ChangeByText("开放时间")}\n${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}`
    }   
}
