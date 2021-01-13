// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    btnArr: cc.Node[] = [];

    app = null
    login_ip = ''

    info = [250,500,1000,2500]
    activity_id = 0
    FristPayAmount :any={}
    setId(id){
        this.activity_id = id
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        this.getLocal()
        console.log(this.app.gHandler.app.deviceID,this.app.gHandler.gameGlobal.deviceID)
    }
    getFristPayAmount(){
        var url = `${this.app.UrlData.host}/api/activity/GetFristPayAmountByWeek?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}`;
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
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    renderBtn(){
        this.btnArr.forEach((e)=>{
            e.active = false
        })
        if(this.FristPayAmount.is_received == 0 && this.FristPayAmount.frist_pay_amount >= this.info[0] ){
            let btnIndex = 0;
            this.info.forEach((item,index)=>{
               if(this.FristPayAmount.frist_pay_amount >= item) {
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
            this.info.forEach((item,index)=>{
               if(this.FristPayAmount.frist_pay_amount >= item) {
                   btnIndex = index
               }
           })
           // 显示已领取
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = true
        }
    }
    applyReimburse(){
        var url = `${this.app.UrlData.host}/api/activity/applyReimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&activity_id=${this.activity_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert('申请成功！')

                cc.sys.localStorage.setItem(`isApplyReimburse_${this.app.UrlData.user_id}`,true)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    receivereimburse(){
        var url = `${this.app.UrlData.host}/api/activity/oldReimburse`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&activity_id=${this.activity_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&activity_id=${this.activity_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert('领取成功！')
                //手动将领取结果赋值为1
                this.FristPayAmount.is_received = 1
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    setLocal(){
        cc.sys.localStorage.setItem(`oldUserFristPayAmount_${this.app.UrlData.user_id}`,JSON.stringify(this.FristPayAmount))
    }
    getLocal(){
        let localFristPayAmount = cc.sys.localStorage.getItem(`oldUserFristPayAmount_${this.app.UrlData.user_id}`) 
        if (localFristPayAmount && JSON.parse(localFristPayAmount).frist_pay_amount >0){
            this.FristPayAmount = JSON.parse(localFristPayAmount)
            this.renderBtn()
        }else{
            this.getFristPayAmount()
        }
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号!")
            return
        }
        if(this.FristPayAmount.is_received!=0){
            return this.app.showAlert("同一用户仅限领取一次!")
        }
        this.receivereimburse()
    }
}
