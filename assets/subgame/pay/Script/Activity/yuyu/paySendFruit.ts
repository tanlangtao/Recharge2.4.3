
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    fruitLabel: cc.Label = null; // 水果斤数

    @property(cc.Node)
    bg2 :cc.Node = null ; //第二个页面

    @property(cc.Node)
    Alert1:cc.Node = null; // 获得3斤水果

    @property(cc.Node)
    Alert2:cc.Node = null; // 获得2斤水果

    @property(cc.Node)
    Alert3 :cc.Node = null; // 获得5斤水果

    app = null
    bindBankNum = false
    activity_id = 0
    
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.bg2.active = false
    }
    setId(id){
        this.activity_id = id
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
        this.app.showTiHuoAlert(this.activity_id,1,this)
    }
    //点立即邀请
    LiJiYaoQingClick(){
        // this.app.gHandler.eventMgr.dispatch(this.app.gHandler.eventMgr.showPayScene, 'ebg') //跳转充值
        if (this.app.gHandler.gameConfig.subModel.proxy.lanchscene != "") {
            cc.director.loadScene(this.app.gHandler.gameConfig.subModel.proxy.lanchscene)
        } else {
            cc.log("请配置全民代理场景")
        }
    }
    //点进入游戏
    EnterGameClick(){
        //按键音效
        this.app.clickClip.play()
        let scree = this.app.gHandler.gameGlobal.pay.from_scene;
        this.app.gHandler.gameGlobal.pay.from_scene = "";
        if (scree == ""){
            scree = "hall"
        }
        if (scree == this.app.gHandler.gameConfig.gamelist['hbsl'].lanchscene
            || scree == this.app.gHandler.gameConfig.gamelist['zrsx1'].lanchscene
            || scree == this.app.gHandler.gameConfig.gamelist['pccp'].lanchscene) { //  真人视讯 红包扫雷 派彩 竖屏
            this.app.gHandler.Reflect && this.app.gHandler.Reflect.setOrientation("portrait")

        }
        cc.director.preloadScene(scree,()=>{
            cc.director.loadScene(scree);
        })
    }
    closeAlert1(){
        this.Alert1.active = false
    }
    closeAlert2(){
        this.Alert2.active = false
    }
    closeAlert3(){
        this.Alert3.active = false
    }
    onDestroy(){
        this.bg2.active = false
    }
}
