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
    }
    infoInit(){
        let group1 = cc.find("Canvas/Activity/Content/XyhZyBp/bg/Layout/group1")
        let group2 = cc.find("Canvas/Activity/Content/XyhZyBp/bg/Layout/group2")
        group1.children[0].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[0].recharge_amount}`
        group1.children[1].getComponent(cc.Label).string = `${this.info.conf[0].gold}`
        group1.children[2].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[0].max_withdraw_amount}`
        group2.children[0].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[1].recharge_amount}`
        group2.children[1].getComponent(cc.Label).string = `${this.info.conf[1].gold}`
        group2.children[2].getComponent(cc.Label).string = `${this.info.withdraw_conf.condition[1].max_withdraw_amount}`
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
    receivereimburse(){
        var url = `${this.app.UrlData.host}/api/activity/reimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
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
    applyReimburse(){
        var url = `${this.app.UrlData.host}/api/activity/applyReimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'))
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
        let xyhbp_bg= cc.find('Canvas/Activity/Content/XyhZyBp/bg/xyhbp_bg')
        let title= cc.find('Canvas/Activity/Content/XyhZyBp/bg/Layout/title')
        this.app.loadIconLg(`${src}/activeBigImage/xyhbp_bg`,xyhbp_bg)
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_lq`,e)
            this.app.loadIconLg(`${src}/activeSprite/btn_ylq`,e.getChildByName('bg2'))
        })
        title.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("首充彩金")
        title.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("包赔金额")
        title.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("最高兑换金额")
        title.children[3].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("限制最高注")
        let rule = cc.find("Canvas/Activity/Content/XyhZyBp/bg/Content/ScrollView/view/content/rule").getComponent(cc.RichText)
        rule.string = `<color=#FFFFFF>1. 新会员注册好账号，需先绑定好手机号码与银行卡后联系上级或进线客服进行申请，申请完毕后前往当前活动界面进行确认申请，\n确认申请开放时间： 每天12:00~21:00。<color=#ff0000>所有未进行确认申请的玩家无法领取活动彩金。</c>\n2. 平台中的新玩家活动只能参加其中一个。\n3. 参加活动的玩家只能进行<color=#F3DC5B>《财神到》《捕鱼·海王》《捕鱼·聚宝盆》《水果机》</c>指定游戏，进行其他游戏视为放弃活动。\n4. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时即可在本活动界面领取活动彩金，当日23:59:59未进行领\n取视为自动放弃。\n5. 赢金到规定金额不兑换视为放弃包赔资格（输完不赔付）。\n6. 同一用户（同IP同设备视为同一用户）仅限参加一次活动，活动彩金无需流水限制可直接申请兑换。\n7. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据实际情况，随时调整活动内容。</color>`
    
        let btn= cc.find('Canvas/Activity/Content/XyhZyBp/bg/Layout/groupBtn2/btn')
        this.app.loadIconLg(`${src}/activeSprite/anniu`,btn)
        let h = new Date().getHours()
        if(h < this.info.start || h > this.info.end){
            btn.getComponent(cc.Button).interactable = false
        }else{
            btn.getComponent(cc.Button).interactable = true
        }
        let label= cc.find('Canvas/Activity/Content/XyhZyBp/bg/Layout/groupBtn2/label').getComponent(cc.Label)
        label.string = `${Language_pay.Lg.ChangeByText("开放时间")}\n${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}`
    }   
}
