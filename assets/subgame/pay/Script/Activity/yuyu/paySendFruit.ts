
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    fruitLabel: cc.Label = null; // 水果斤数

    @property(cc.Node)
    bg2 :cc.Node = null ; //第二个页面

    app = null
    bindBankNum = false
    activityId = 0

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.bg2.active = false
    }
    setId(id){
        this.activityId = id
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            let bankData = []
            for(let i = 0 ;i < response.data.list.length ;i++){
                let data = response.data.list[i];
                if (data.type == 3){
                    bankData.push(data)
                }
            }
            //数组里面有值，说明绑定了银行卡
            if(bankData.length>0){
                this.bindBankNum = true
            }else{
                this.bindBankNum = false
            }
            console.log(this.bindBankNum)
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.app.hideLoading();
        })
    }

    //点立即参与
    LiJiCanYuClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '' || !this.bindBankNum) {
            this.app.showAlert('请绑定手机跟银行卡实名认证后参与活动')
            return
        }else{
            this.bg2.active = true
        }
        
    }
    closeBg2cClick(){
        this.bg2.active = false
    }
    //点立即提货
    LiJiTiHuoClick(){

    }
    //点立即邀请
    LiJiYaoQingClick(){

    }
    onDestroy(){
        this.bg2.active = false
    }
}
