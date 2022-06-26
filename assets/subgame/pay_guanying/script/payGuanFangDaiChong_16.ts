const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_16";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Node)
    WriteAmountAlert: cc.Node = null;

    //客服地址
    url = "https://service.xmsu9k5q.com/chatwindow.aspx?siteId=65000251&planId=663dd7eb-a5dd-442b-90aa-ab1ab8ba7218"
    
    app = null;
    login_ip = ""
    
    data = {
        channel_id : 33,
        pay_type : 29,
        order_type:29,
        min_amount:100,
        max_amount:100,
    }
    init(data){

    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain_16');
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        this.node.getChildByName("IdLabel").getComponent(cc.Label).string = `我的ID:${this.app.UrlData.user_id}`
        this.app.hideLoading()
        this.fetchZfb()
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
    public fetchZfb() {
        // 20210508_支付系统, 正式环境富鑫II游戏(package_id=10)屏蔽充值界面和收益界面信息
       //  if(this.app.UrlData.package_id == 10 && appGlobal.huanjin == 'online') {
       //     this.app.hideLoading()
       //     return
       // }
       var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}`;
       let self = this;
       this.app.ajax('GET',url,'',(response)=>{
           self.app.hideLoading()
           if (response.status == 0) {
               self.data.min_amount = response.data.daipayment[0].min_amount;
               self.data.max_amount = response.data.daipayment[0].max_amount;
           }else{
               self.app.showAlert(response.msg)
           }
       },(errstatus)=>{
           self.app.hideLoading()
           self.app.showAlert(`网络错误${errstatus}`)
       })
   }
    //确认充值

    onClick(){
        let amount =  Number(this.amountLabel.string)
        if(this.amountLabel.string == "点击输入"){
            return this.app.showAlert("请输入充值金额!")
        }else if(amount > this.data.max_amount || amount < this.data.min_amount){
            return this.app.showAlert(`超出范围!(${this.data.min_amount}-${this.data.max_amount})`)
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
