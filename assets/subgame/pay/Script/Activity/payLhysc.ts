import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnGroup :cc.Node= null;

    app = null
    PayAmountByDay = null
    info = [100,500,1000,2000,3000,5000,10000]
    activity_id = 0
    login_ip = ""
    activeName = ''
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        if(this.app.UrlData.package_id == 8){
            this.getPayAmountByDay()
        }
        this.setLanguageResource()
    }
    setId(id,activeName = ''){
        this.activity_id = id
        this.activeName = activeName
    }
    getPayAmountByDay(){
        var url = `${this.app.UrlData.host}/api/activity/getPayAmountByDay?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                console.log(response.data)
                this.PayAmountByDay = response.data
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    receivePaymentGold(){
        var url = `${this.app.UrlData.host}/api/activity/receivePaymentGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'))
                this.getPayAmountByDay()
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
        if(this.PayAmountByDay.is_received == 0 && this.PayAmountByDay.pay_amount_byday >= this.info[0] ){
            let btnIndex = 0;
            this.info.forEach((item,index)=>{
               if(index < this.btnGroup.children.length &&this.PayAmountByDay.pay_amount_byday >= item) {
                   btnIndex = index
               }
           })
           this.btnGroup.children[btnIndex].active = true
           this.btnGroup.children[btnIndex].getChildByName("bg2").active = false
        }else if(this.PayAmountByDay.is_received != 0){
            this.btnGroup.children.forEach(e=>{
                e.active = false
            })

            let btnIndex = 0;
            this.info.forEach((item,index)=>{
               if(this.PayAmountByDay.pay_amount_byday >= item) {
                   btnIndex = index
               }
           })
           // 显示已领取
           this.btnGroup.children[btnIndex].active = true
           this.btnGroup.children[btnIndex].getChildByName("bg2").active = true
        }
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/Lhysc/bg')

        

        let label1= cc.find('Canvas/Activity/Content/Lhysc/bg/FootContent/label1').getComponent(cc.Label)
        let title1= cc.find('Canvas/Activity/Content/Lhysc/bg/group1/title1').getComponent(cc.Label)
        let title2= cc.find('Canvas/Activity/Content/Lhysc/bg/group2/title2').getComponent(cc.Label)
        let title3= cc.find('Canvas/Activity/Content/Lhysc/bg/group3/title3').getComponent(cc.Label)
        let title4= cc.find('Canvas/Activity/Content/Lhysc/bg/group3/title4').getComponent(cc.Label)

        title1.string = Language_pay.Lg.ChangeByText('充值金额')
        title2.string = Language_pay.Lg.ChangeByText('赠送金额')
        title3.string = Language_pay.Lg.ChangeByText('兑换限制')
        title4.string = Language_pay.Lg.ChangeByText('一倍流水')
        if(this.app.UrlData.package_id == 8){
            this.app.loadIconLg(`${src}/activeBigImage/event12-3_lhysc_content`,bg)
            this.btnGroup.children.forEach(e=>{
                this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('btn_linqu'))
                this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
            })
            label1.string = Language_pay.Lg.ChangeByText("1.本活动需要完成手机和银行卡绑定后才能参与。\n2.游戏规则：仅限参与财神到，水果机，捕鱼·海王，捕鱼·聚宝盆，百人牛牛，红包乱斗，二八杠，21点，奔驰宝马游戏。\n3.单日充值金额累加统计，当日累计充值金额达到指定档位，即可领取活动规定的相应金币。\n4.每日23:59:59，活动计算的当日充值金额累加归零。\n5.每一个账号（同一ip，同一设备，同一姓名视为一个账号）每天只能领取一次。\n6. 本活动最终解释权归新盛所有。")
        }else if(this.activeName == '老会员每日首存活动2'){
            this.app.loadIconLg(`${src}/activeBigImage/event_db_lhysc_content`,bg)
            label1.string = Language_pay.Lg.ChangeByText("1.本活动需要完成手机和银行卡绑定后才能参与。\n2.游戏规则：仅限参与财神到，水果机，捕鱼·海王，捕鱼·聚宝盆，百人牛牛，红包乱斗，二八杠，21点，奔驰宝马游戏。\n3.单日充值金额累加统计，当日累计充值金额达到指定档位，即可领取活动规定的相应金币。\n4.每日23:59:59，活动计算的当日充值金额累加归零。\n5.每一个账号（同一ip，同一设备，同一姓名视为一个账号）每天只能领取一次。\n6. 本活动最终解释权归德比所有。")
        }else{
            this.app.loadIconLg(`${src}/activeBigImage/event12-3_lhysc_content`,bg)
            label1.string = Language_pay.Lg.ChangeByText("1.实名限制2及2个以上不符合。\n2.只限游戏（财神到，水果机，捕鱼，百人牛牛，红包乱斗，二八杠，21点，奔驰宝马）。\n3.每个账号一天只限第一次充值（如果遇到无法一笔充值达到有效的档位，可充值两次以上）。\n4.充值成功未下注之前找专线客服专员申请。\n5.每一个账号（同一ip，同一设备，同一姓名）视为一个账号，只能申请一次。\n6. 本活动最终解释权归德比所有。")
        }
    }   
}
