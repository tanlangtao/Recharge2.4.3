
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    recharge_amountLabel: cc.Label[] = [];

    @property(cc.Label)
    bonusLabel: cc.Label[] = [];

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
        console.log(info)
        info.forEach((item,index) => {
            this.recharge_amountLabel[index].string = `${item.recharge_amount}`
            this.bonusLabel[index].string = item.bonus 
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
            this.app.showAlert("获取登陆ip失败!")
        }
    }
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/getFristPayAmount?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}`;
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
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    receiveFristPaymentGold(){
        var url = `${this.app.UrlData.host}/api/activity/receiveFristPaymentGold`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&token=${this.app.token}&activity_id=${this.activity_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&token=${this.app.token}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert('领取成功！')
                this.getFristPayAmount()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        if(this.received){
            return this.app.showAlert("同一用户仅限领取一次！")
        }
        this.receiveFristPaymentGold()
    }
}
