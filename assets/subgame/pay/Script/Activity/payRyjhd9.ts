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
                gold:0,
                grant:0,
                performance:0
            }
        ]
    }
    activity_id = 0
    PerformanceInfo = {
        amount:0,
        grant:0,
        received_info:[],
    }
    targeIndex = 0
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
        this.getReceivePerformanceInfo()
    }
    infoInit(){
        let group1 = cc.find("Canvas/Activity/Content/Ryjhd/bg/group1")
        let group2 = cc.find("Canvas/Activity/Content/Ryjhd/bg/group2")
        let group3 = cc.find("Canvas/Activity/Content/Ryjhd/bg/group3")
        group1.children.forEach((e,index) => {
            e.getComponent(cc.Label).string = `${this.info.range[index].performance}`
        });
        group2.children.forEach((e,index) => {
            e.getComponent(cc.Label).string = `${this.info.range[index].grant}`
        });
        group3.children.forEach((e,index) => {
            e.getComponent(cc.Label).string = `${this.info.range[index].gold}`
        });
    }
    
    getReceivePerformanceInfo(){
        var url = `${this.app.UrlData.host}/api/activity/getReceivePerformanceInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&source=1`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                console.log(response)
                this.PerformanceInfo = response.data
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    receivePerformanceGold(){
        var url = `${this.app.UrlData.host}/api/activity/receivePerformanceGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&index=${this.targeIndex}&source=1&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
                this.getReceivePerformanceInfo()
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
        if(this.PerformanceInfo.amount  >= this.info.range[0].performance ){
            let btnIndex = 0;
            this.info.range.forEach((item,index)=>{
                if(index < this.btnArr.length &&  this.PerformanceInfo.amount >=item.performance && this.PerformanceInfo.grant >=item.grant) {
                   btnIndex = index
               }
           })
           this.targeIndex = btnIndex
            this.btnArr[btnIndex].active = true
            this.btnArr[btnIndex].getChildByName("bg2").active = false
        }
        if(this.PerformanceInfo["received_info"]){
            this.PerformanceInfo.received_info.forEach((e)=>{
                this.info.range.forEach((item,index)=>{
                    if(e.receive_amount == item.gold){
                        this.btnArr[index].getChildByName("bg2").active = true
                    }
                })
            })
        }
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.PerformanceInfo["received_info"]){
            return this.app.showAlert(Language_pay.Lg.ChangeByText("同一用户仅限领取一次!"))
        }
        this.receivePerformanceGold()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/Ryjhd/bg')
        this.app.loadIconLg(`${src}/activeBigImage/XG_event_20210625-4`,bg)
        let rule = cc.find("Canvas/Activity/Content/Ryjhd/bg/rule").getComponent(cc.Label)
        rule.string=`1. 玩家需要绑定手机号和银行卡才能参与。\n2. 统计规则：只统计棋牌类游戏+第三方电子类游戏的有效投注。\n3. 玩家昨日团队业绩和我的返佣均达标可前往活动界面进行领取彩金。\n4. 领取时间： 每天${this.app.config.transitionTime(this.info.start)}-${this.app.config.transitionTime(this.info.end)}， 逾期未领取视为自动放弃。\n5. 同一用户（同IP同设备视为同一用户）仅限参加一次活动，活动彩金可直接申请兑换。\n6. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据实际情况，随时调整活动内容。`
    }   
}
