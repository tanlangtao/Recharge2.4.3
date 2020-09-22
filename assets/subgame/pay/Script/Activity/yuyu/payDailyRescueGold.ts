// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    lostAmountLabel: cc.Label[] = [];

    @property(cc.Label)
    bonusLabelTest: cc.Label[] = [];

    @property(cc.Label)
    LoseAmountTotal : cc.Label = null;

    @property(cc.Node)
    btnArr: cc.Node[] = [];

    info = []
    app = null
    activity_id = 13
    login_ip = ''
    received = false // 判断是否已领取

    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
        }
        console.log(info)
        this.info = info.range
        this.info.forEach((item,index) => {
            this.lostAmountLabel[index].string = `${item.min_lose_gold}+`
            this.bonusLabelTest[index].string = item.bonus 
        });
        this.activity_id = id
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.getLoseGoldInfo()
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
    }
    getLoseGoldInfo(){
        var url = `${this.app.UrlData.host}/api/activity/getLoseGoldInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                console.log(response)
                this.LoseAmountTotal.string = `${response.data.today_lose_total > 0 ?response.data.today_lose_total:0}`
                if(response.data.today_received_info == '' && response.data.today_lose_total >this.info[0].min_lose_gold ){
                    let btnIndex = 0;
                    this.info.forEach((item,index)=>{
                       if(response.data.today_lose_total >= item.min_lose_gold) {
                           btnIndex = index
                       }
                   })
                   this.btnArr[btnIndex].active = true
                }else if(response.data.today_received_info != '' ){
                    this.btnArr.forEach(e=>{
                        e.active = false
                    })

                   let received_info = JSON.parse(response.data.today_received_info)
                   console.log(received_info)
                   let level = received_info.level -1 // 前端的level从0开始
                   this.btnArr[level].active = true
                   this.btnArr[level].getChildByName("bg2").active = true // 显示已领取
                   this.received = true;
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    receiveFristPaymentGold(){
        var url = `${this.app.UrlData.host}/api/activity/loseGetGold?`;
        let dataStr  = `user_id=${this.app.UrlData.user_id}&token=${this.app.token}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.appGlobal.deviceID}`
        // let dataStr  = `user_id=${this.app.UrlData.user_id}&token=${this.app.token}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert('领取成功！')
                this.getLoseGoldInfo()
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
            return this.app.showAlert("今日已领取，请明天再来！")
        }
        this.receiveFristPaymentGold()
    }
}
