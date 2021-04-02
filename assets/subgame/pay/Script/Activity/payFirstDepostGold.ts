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

    info = []
    app = null
    activity_id = 13
    login_ip = ''
    received = false
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
        }
        info.forEach((item,index) => {
            this.recharge_amountLabel[index].string = `${Language_pay.Lg.ChangeByText('首存')}${item.recharge_amount}`
            this.bonusLabel[index].string = item.bonus 
            this.recharge_amountLabelTest[index].string = `${item.recharge_amount}+`
            this.bonusLabelTest[index].string = item.bonus 
        });
        this.info = info
        this.activity_id = id
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
    }
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/getFristPayAmount?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                console.log(response)
                if(response.data.is_received == 0 && response.data.frist_pay_amount >= this.info[0].recharge_amount ){
                    let btnIndex = 0;
                    this.info.forEach((item,index)=>{
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
                    this.info.forEach((item,index)=>{
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
    receiveFristPaymentGold(){
        var url = `${this.app.UrlData.host}/api/activity/receiveFristPaymentGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
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
        this.receiveFristPaymentGold()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/FirstDepostGold/bg')
        let Layout= cc.find('Canvas/Activity/Content/FirstDepostGold/bg/Layout')
        let group1= cc.find('Canvas/Activity/Content/FirstDepostGold/bg/Content/group1')

        this.app.loadIconLg(`${src}/activeBigImage/yuyu_firstR`,bg)
        
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('bg1'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        group1.children.forEach(e=>{
           let txt_s = e.getChildByName('right').getChildByName('txt_s')
           let txt_y = e.getChildByName('right').getChildByName('txt_y')
           this.app.loadIconLg(`${src}/activeSprite/txt_zs`,txt_s)
           this.app.loadIconLg(`${src}/activeSprite/txt_y`,txt_y)
        })
        let label= cc.find('Canvas/Activity/Content/FirstDepostGold/bg/Content/ScrollView/view/content/label').getComponent(cc.Label)
        if(this.app.UrlData.package_id == 8){
            label.string = Language_pay.Lg.ChangeByText("活动规则：\n1. 新注册玩家完成手机以及银行卡绑定才能参与。\n2. 必须充值成功未下注时进行领取，需满足首充金额一倍流水+赠送彩金的三倍流水才能申请兑换。\n3. 游戏规则：仅参加以下游戏《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》《百人牛牛》。\n4. 同一用户仅限领取一次，恶意套利者将封号处理。\n5. 本活动最终解释权归新盛所有。")
            let label1 = cc.find('Canvas/Activity/Content/FirstDepostGold/bg/label1').getComponent(cc.Label)
            let label2 = cc.find('Canvas/Activity/Content/FirstDepostGold/bg/label2').getComponent(cc.Label)
            label1.string = Language_pay.Lg.ChangeByText('首充')
            label2.string = Language_pay.Lg.ChangeByText('赠送金币')
        }else if(this.app.UrlData.package_id == 2){
            this.app.loadIconLg(`${src}/activeBigImage/event_db_sccj_content`,bg)
            this.app.loadIconLg(`${src}/activeSprite/frame_1`,Layout)
            label.string = Language_pay.Lg.ChangeByText("活动规则：\n1. 新注册玩家完成手机以及银行卡绑定才能参与。\n2. 必须充值成功未下注时进行领取，需满足首充金额一倍流水+赠送彩金的三倍流水才能申请兑换。\n3. 游戏规则：仅参加以下游戏《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》《百人牛牛》。\n4. 同一用户仅限领取一次，恶意套利者将封号处理。\n5. 本活动最终解释权归德比所有。")
        }else{
            this.app.loadIconLg(`${src}/activeSprite/frame_1`,Layout)
            label.string = Language_pay.Lg.ChangeByText("备注：\n1. 本活动需完成手机及银行卡绑定后才能参与\n2. 若玩家第一笔充值金额低于最低首存金额的50元，第二笔充值金额即便达到首存门槛也无法领取奖励\n3. 同一用户仅限领取一次 \n4. 如有异常操作，则进行冻结账号处理\n5. 首存活动可以与其他活动叠加\n6. 需满足首充金额＋赠送彩金的一倍流水方可兑换\n7. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利")
        }

        

        
    }
}
