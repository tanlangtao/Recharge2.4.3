
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Label)
    flow_rateLabel: cc.Label = null;

    @property(cc.EditBox)
    codeInput:cc.EditBox = null;

    @property(cc.Button)
    btn :cc.Button = null;

    activity_id = 15
    app = null
    login_ip = ''
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
            console.log("开业注册送活动内容未配置!")
        }else{
            this.goldLabel.string = info.gold
            this.flow_rateLabel.string = info.flow_rate
        }
        this.activity_id = id
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        this.setLanguageResource()
    }
    public fetchRegisterGetGold(){
        var url = `${this.app.UrlData.host}/api/activity/registerGetGold`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&activity_id=${this.activity_id}&ip=${this.login_ip}&device_id=${this.app.gHandler.app.deviceID}&code=${this.codeInput.string}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
                cc.log("response",response)
            }else{
                this.app.showAlert(response.msg)
            }
            let self = this;
            setTimeout(() => {
                self.btn.interactable = true
            }, 500);
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            let self = this;
            setTimeout(() => {
                self.btn.interactable = true
            }, 500);
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.login_ip==''){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('获取IP地址失败!'))
        }else if(this.codeInput.string == '' || this.codeInput.string == Language_pay.Lg.ChangeByText('请输入5位邀请码')){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('邀请码不能为空!'))
        }else if (!this.btn.interactable ){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('等待领取结果，请勿频繁点击领取!'))
        }
        this.fetchRegisterGetGold()
        this.btn.interactable = false
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/KaiYeZhuCeSong/bg')
        let txt_warning= cc.find('Canvas/Activity/Content/KaiYeZhuCeSong/txt_warning')
        let btn_lingqu= cc.find('Canvas/Activity/Content/KaiYeZhuCeSong/btn_lingqu')

        this.app.loadIconLg(`${src}/activeBigImage/event_sugb2`,bg)
        this.app.loadIconLg(`${src}/activeSprite/txt_warning`,txt_warning)
        this.app.loadIconLg(`${src}/activeSprite/btn_lingqu`,btn_lingqu)
       
        let label1= cc.find('Canvas/Activity/Content/KaiYeZhuCeSong/label1').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/KaiYeZhuCeSong/label2').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/KaiYeZhuCeSong/Code/label3').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("1、活动仅限下述玩法使用：红包乱斗，捕鱼聚宝盆，轮盘，奔驰宝马，水果机，骰宝。同时，通过注册金，无论赢利多少，也仅能用于继续玩这六款游戏，若有违规则拒绝兑换。")
        label2.string = Language_pay.Lg.ChangeByText("2、每位玩家不可重复领取。\n3、每组序号不可重复使用。\n4、领取需绑定手机号、银行卡。\n5、兑换需满足彩金八倍流水。\n6、禁止一切异常操作行为。")
        label3.string = Language_pay.Lg.ChangeByText('（邀请码获取请咨询您的代理）')
        this.codeInput.placeholder = Language_pay.Lg.ChangeByText('请输入5位邀请码')
    }
}
