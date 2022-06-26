const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_20";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Node)
    WriteAmountAlert: cc.Node = null;

    //客服地址
    url = "https://soekxsd.com/9542e9879e35d4f2de3938b7jkfle-keli564623ed9d877e9bea752d0d44e4b2cba9201aaa0a5b112aebd8fbda9702b1c8"

    app = null;
    login_ip = ""
    data = {
        channel_id : 33,
        pay_type : 29,
        order_type:29
    }
    init(data){
        this.data = data
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain_20');
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        this.node.getChildByName("IdLabel").getComponent(cc.Label).string = `我的ID:${this.app.UrlData.user_id}`
        this.app.hideLoading()
    }
    ItemClick(){
        this.showWriteAmountAlert()
    }
    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }
    showWriteAmountAlert(){
        this.WriteAmountAlert.active = true
    }
    hideWriteAmountAlert(){
        this.WriteAmountAlert.active = false
        this.amountLabel.string = '点击输入'
        this.app.setInputColor('',this.amountLabel);
    }
    //确认充值

    onClick(){
        if(this.amountLabel.string == "点击输入"){
            return this.app.showAlert("请输入充值金额!")
        }
        this.fetchdaiPayment()
        this.hideWriteAmountAlert()
        cc.sys.openURL(this.app.gHandler.app.versionJson[this.app.gHandler.app.pinpai].live_service.url1);
    }
    copyClick(){
        //按键音效
        this.app.loadMusic(1);
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.app.UrlData.user_id)) {
                this.app.showAlert(`复制成功!:${this.app.UrlData.user_id}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }
    fetchdaiPayment(){
        let url = `${this.app.UrlData.host}/api/payment/daiPayment`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${this.amountLabel.string}&channel_id=${this.data.channel_id}&pay_type=${this.data.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_type=${this.data.order_type}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${this.app.gHandler.app.deviceID}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.app.showAlert("订单创建成功！")
                
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`'网络错误'${errstatus}`)
        })
    }
}
