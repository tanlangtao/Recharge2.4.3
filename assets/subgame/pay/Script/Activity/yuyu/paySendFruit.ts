
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    fruitLabel: cc.Label = null; // 水果斤数

    @property(cc.Node)
    bg2 :cc.Node = null ; //第二个页面

    @property(cc.Node)
    progress :cc.Node = null; // 进度条

    @property(cc.Node)
    Alert1:cc.Node = null; // 获得3斤水果

    @property(cc.Node)
    Alert2:cc.Node = null; // 获得2斤水果

    @property(cc.Node)
    Alert3 :cc.Node = null; // 获得5斤水果

    @property(cc.Node)
    content :cc.Node = null; // 滚动框
    

    app = null
    bindBankNum = false
    activity_id = 0
    checkFreeFruitResult :any= {}
    source_type = 2 //提货信息来源
    fruit_jin = 0
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.getSignInfo()
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
    public getSignInfo(){
        var url = `${this.app.UrlData.host}/api/activity/checkFreeFruit?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&token=${this.app.token}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                console.log(response)
                this.checkFreeFruitResult = response
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            console.log(url,errstatus)
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    //点立即参与
    LiJiCanYuClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '' || !this.bindBankNum) {
            this.app.showAlert('请绑定手机跟银行卡实名认证后参与活动')
            return
        }
        this.bg2.active = true
        let scalex = cc.winSize.width / 1334;
        this.node.width = 1334 * scalex;
        console.log(this.node.width,scalex)
        if(this.checkFreeFruitResult.data.invitee){
            //invitee不为空，是为被邀请者
            this.source_type = 2
            this.fruit_jin = this.checkFreeFruitResult.data.invitee.fruit_jin
            this.fruitLabel.string = `${this.fruit_jin}`

            let f2 = this.fruit_jin % 5 == 0 && this.fruit_jin!=0 ? 5 :this.fruit_jin % 5
            this.progress.getComponent(cc.ProgressBar).progress = f2/5 
            this.progress.getChildByName('label').getComponent(cc.Label).string = `${f2} / 5`
            if(this.fruit_jin == 3){
                //显示获得3斤水果弹窗
                this.Alert1.active = true
            }else if(this.fruit_jin == 5){
                //显示获得2斤水果弹窗
                if(this.getLocal()){
                    this.Alert2.getChildByName('content').getChildByName('label1').getComponent(cc.Label).string = `已经获得2斤水果`
                    this.Alert2.active = true
                    //缓存，只第一次显示
                    this.setLocal()
                }else{
                    this.Alert2.getChildByName('content').getChildByName('label1').getComponent(cc.Label).string = `已经获得5斤水果`
                    this.Alert2.active = true
                }
            }
            this.content.children[0].getComponent(cc.Label).string = `恭喜您已获得${this.fruit_jin}斤水果`
        }else if(this.checkFreeFruitResult.data.inviter){
            //inviter不为空，是为邀请者
            this.source_type =3
            this.fruit_jin = this.checkFreeFruitResult.data.inviter.fruit_jin
            this.fruitLabel.string = `${this.fruit_jin}`
            let bind_num = 0
            if(this.checkFreeFruitResult.data.inviter.bind_num){
                bind_num =  this.checkFreeFruitResult.data.inviter.bind_num
            }
            let b2 = bind_num % 3 == 0 && bind_num != 0 ? 3 :bind_num %3
            this.progress.getComponent(cc.ProgressBar).progress = b2/3 
            this.progress.getChildByName('label').getComponent(cc.Label).string = `${b2} / 3`

            if(this.fruit_jin >= 5){
                //显示获得5斤水果弹窗
                this.Alert3.active = true
            }
            this.content.children[0].getComponent(cc.Label).string = `恭喜您已获得${this.fruit_jin}斤水果`
        }
        this.content.children.forEach((e,i)=>{
            if(i !=0){
                let id = this.app.config.randId(123000000,999999999)
                let jin = this.app.config.randNum(2,5)
                e.getComponent(cc.Label).string = `恭喜${id}已获得${jin == 4?5 :jin}斤水果`
            }
            
        })
        var action =cc.moveBy(30,cc.v2(0,1300))
        this.content.stopAllActions()
        let callback = cc.callFunc(()=>{
            this.content.y = -100
            this.content.runAction(cc.sequence(action,callback))
        })
        this.content.runAction(cc.sequence(action,callback))
       
    }
    closeBg2cClick(){
        this.bg2.active = false
    }
    //点立即提货
    LiJiTiHuoClick(){
        if(this.fruit_jin % 5 != 0 || this.fruit_jin < 5){
            return this.app.showAlert('水果斤数未达5斤，无法领取')
        }
        this.app.showTiHuoAlert(this.activity_id,1,this,this.source_type,this.fruit_jin)
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
    getLocal(){
        let PaySendFruit_2jin = cc.sys.localStorage.getItem("PaySendFruit_2jin")
        if(PaySendFruit_2jin){
            return false
        }else{
            return true
        }
    }
    setLocal(){
        cc.sys.localStorage.setItem("PaySendFruit_2jin",JSON.stringify(true))
    }
    onDestroy(){
        this.bg2.active = false
    }
}
