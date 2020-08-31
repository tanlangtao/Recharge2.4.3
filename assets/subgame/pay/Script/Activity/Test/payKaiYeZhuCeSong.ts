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
    goldLabel: cc.Label = null;

    @property(cc.Label)
    flow_rateLabel: cc.Label = null;

    @property(cc.EditBox)
    codeInput:cc.EditBox = null;

    @property(cc.Button)
    btn :cc.Button = null;

    activity_id = 15
    app = null
    ip = ''
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
            console.log("开业注册送活动内容未配置！")
        }else{
            this.goldLabel.string = info.gold
            this.flow_rateLabel.string = info.flow_rate
        }
        this.activity_id = id
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.gHandler.gameGlobal.ipList.length > 0) {
            this.ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取ip失败!")
            this.app.showAlert("获取ip失败!")
        }

    }
    public fetchRegisterGetGold(){
        var url = `${this.app.UrlData.host}/api/activity/registerGetGold`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&activity_id=${this.activity_id}&ip=${this.ip}&device_id=${this.app.gHandler.appGlobal.deviceID}&code=${this.codeInput.string}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.app.showAlert("领取成功!")
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
            this.app.showAlert(`网络错误${errstatus}`)
            let self = this;
            setTimeout(() => {
                self.btn.interactable = true
            }, 500);
        })
    }
    onClick(){
        if(this.ip==''){
            return this.app.showAlert('获取IP地址失败！')
        }else if(this.codeInput.string == '' || this.codeInput.string == "请输入4位序列号"){
            return this.app.showAlert('序列号不能为空！')
        }else if (!this.btn.interactable ){
            return this.app.showAlert("等待领取结果，请勿频繁点击领取！")
        }
        this.fetchRegisterGetGold()
        this.btn.interactable = false
    }
}
