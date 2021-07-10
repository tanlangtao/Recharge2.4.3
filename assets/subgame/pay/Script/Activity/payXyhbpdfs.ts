import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnArr: cc.Node[] = [];

    app = null
    login_ip = ''

    info = {
        balance:0,
        conf:[
            {
                first_pay_max:0,
                first_pay_min:0,
                gold:0
            },
            {
                first_pay_max:0,
                first_pay_min:0,
                gold:0
            },
        ],
        start:0,
        end:0,
        flow_rate:0,
        game_id:[],
        recharge_min_amount:0,
        start_date:"",
        withdraw_conf:{
            condition:[
                {
                    max_withdraw_amount:0,
                    recharge_amount:0,
                },
                {
                    max_withdraw_amount:0,
                    recharge_amount:0,
                }
            ],
            is_open:1
        }
    }
    activity_id = 0
    FristPayAmount :any={}
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
        this.getLocal()
        this.setLanguageResource()
        this.ApplyBtnInit()
    }
    infoInit(){
        let group = cc.find("Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_frame/group")
        group.children[0].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[0].recharge_amount}`
        group.children[1].getComponent(cc.Label).string = `${this.info.conf[0].gold}`
        group.children[2].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[0].max_withdraw_amount}`
        group.children[4].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[1].recharge_amount}`
        group.children[5].getComponent(cc.Label).string = `${this.info.conf[1].gold}`
        group.children[6].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[1].max_withdraw_amount}`
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
        if(this.FristPayAmount.is_received == 0 && this.FristPayAmount.frist_pay_amount >= this.info.conf[0].first_pay_min ){
            let btnIndex = 0;
            this.info.conf.forEach((item,index)=>{
               if(this.FristPayAmount.frist_pay_amount >= item.first_pay_min && this.FristPayAmount.frist_pay_amount < item.first_pay_max) {
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
                if(this.FristPayAmount.frist_pay_amount >= item.first_pay_min && this.FristPayAmount.frist_pay_amount < item.first_pay_max) {
                    btnIndex = index
                }
            })
           // 显示已领取
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = true
        }
    }
    receivereimburse(){
        var url = `${this.app.UrlData.host}/api/activity/reimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
                //手动将领取结果赋值为1,记录在本地 
                this.FristPayAmount.is_received = 1
                this.setLocal()
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    //确认申请
    applyReimburse(){
        var url = `${this.app.UrlData.host}/api/activity/applyReimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'))
                this.setApplyLocal()
                this.ApplyBtnInit()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    ApplyBtnInit(){
        let btn= cc.find('Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_frame/applyBtn').getComponent(cc.Button)
        let h = new Date().getHours()
        if(this.getApplyLocal()){
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
    getApplyLocal(){
        let local = cc.sys.localStorage.getItem(`ApplyXyhbpdfs_${this.app.UrlData.user_id}`)
        if(local){
            return false
        }else{
            return true
        }
    }
    setApplyLocal(){
        cc.sys.localStorage.setItem(`ApplyXyhbpdfs_${this.app.UrlData.user_id}`,JSON.stringify(true))
    }
    setLocal(){
        cc.sys.localStorage.setItem(`FristPayAmount_${this.app.UrlData.user_id}`,JSON.stringify(this.FristPayAmount))
    }
    getLocal(){
        let localFristPayAmount = cc.sys.localStorage.getItem(`FristPayAmount_${this.app.UrlData.user_id}`) 
        if (localFristPayAmount && JSON.parse(localFristPayAmount).frist_pay_amount >0 && JSON.parse(localFristPayAmount).is_received == 1 ){
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
        let bg= cc.find('Canvas/Activity/Content/Xyhbpdfs/bg')
        this.app.loadIconLg(`${src}/activeBigImage/XG_event_20210623-2`,bg)
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('btn_linqu'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        let title1 = cc.find('Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_frame/title1').getComponent(cc.Label)
        let title2 = cc.find('Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_frame/title2').getComponent(cc.Label)
        let title3 = cc.find('Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_frame/title3').getComponent(cc.Label)
        let title4 = cc.find('Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_frame/title4').getComponent(cc.Label)
        let tishi= cc.find('Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_content/ScrollView/view/content/label').getComponent(cc.Label)
        title1.string = Language_pay.Lg.ChangeByText('首充金额')
        title2.string = Language_pay.Lg.ChangeByText('包赔金额')
        title3.string = Language_pay.Lg.ChangeByText('最高兑换金额')
        title4.string = Language_pay.Lg.ChangeByText('限制最高注')
        tishi.string = Language_pay.Lg.ChangeByText(`1. 新注册玩家完成手机以及银行卡绑定后前往当前活动进行申请， 申请开放时间为每天${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}。所有未进行申请的玩家无法领取活动彩金。\n2. 平台中的新玩家活动只能参加其中一个，申请后即视为参加此活动。\n3. 参加活动的玩家只能进行《财神到》《捕鱼·海王》《捕鱼·聚宝盆》《水果机》《多福多财》《疯狂旋涡》指定游戏，进行其他游戏视为放弃活动。\n4. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时即可在本活动界面领取活动彩金，当日23:59:59未进行领取视为自动放弃。\n5. 赢金到规定金额不兑换视为放弃包赔资格（输完不赔付）。\n6. 同一用户（同IP同设备视为同一用户）仅限参加一次活动，活动彩金无需流水限制可直接申请兑换。\n7. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据实际情况，随时调整活动内容。`)
        let label= cc.find('Canvas/Activity/Content/Xyhbpdfs/bg/event4_xzcyh_frame/label1').getComponent(cc.Label)
        label.string = `${Language_pay.Lg.ChangeByText("开放时间")}\n${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}`
    }   
}
