
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    DayGroup: cc.Node[] = [];

    @property(cc.Node)
    zhongjiangBg :cc.Node = null;

    activity_id= 0;
    info :any= {};
    app =null;
    login_ip= ''
    currentIntegral = ''
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
            console.log("每日签到2活动内容未配置！")
        }else{
            this.info = info
        }
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
        this.fetchgetSignWeekInfo()
        console.log(this.info)
        this.info.sign_conf.forEach((e,i)=>{
            this.DayGroup[i].getChildByName('labelNode').getChildByName('label1').getComponent(cc.Label).string = `${e.integral}`
        })
    }
    public fetchgetSignWeekInfo(){
        var url = `${this.app.UrlData.host}/api/activity/getSignWeekInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}`;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                cc.log("response",response)
                this.renderSignDay(response.data)
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public fetchsignInByWeek(){
        var url = `${this.app.UrlData.host}/api/activity/signInByWeek`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.appGlobal.deviceID}&token=${this.app.token}`
        // let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                cc.log("response",response)
                this.app.showAlert("签到成功!")
                this.zhongjiang()
                this.fetchgetSignWeekInfo()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    renderSignDay(data){
        let total_sign_day = data.total_sign_day
        this.DayGroup.forEach((e,i)=>{
            if(total_sign_day-1 >=i){
                e.getChildByName('yilingqu').active = true
                e.getComponent(cc.Button).interactable = false
            }
        })
    }
    zhongjiang(){
        this.zhongjiangBg.active = true 
        let sp2 = this.zhongjiangBg.getChildByName('sp2')
        sp2.getChildByName('label').getComponent(cc.Label).string = this.currentIntegral
        sp2.active = true
        this.playSpine(sp2,'chuxian',false,1,()=>{
           this.playSpine(sp2,'xunhuan',true,1,()=>{
           })
       })
    }
    confirmClick(){
        let sp2 = this.zhongjiangBg.getChildByName('sp2')
        sp2.getChildByName('label').getComponent(cc.Label).string = this.currentIntegral
        sp2.active = false
        this.zhongjiangBg.active = false
    }
    /**
      * 播放spine动画函数
      * @param node spine动画节点
      * @param animName 动画名称
      * @param loop 是否循环播放动画
      * @param callback 结束回调
      */
     public playSpine(node:cc.Node,animName :string, loop :boolean,speed:number, callback :Function) :void{
        let spine = node.getComponent(sp.Skeleton);
        let track = spine.setAnimation(0, animName, loop);
        spine.timeScale = speed;
        if (track) {
            // 注册动画的结束回调
            spine.setCompleteListener((trackEntry, loopCount) => {
                let name = trackEntry.animation ? trackEntry.animation.name : '';
                if (name === animName && callback) {
                    callback(); // 动画结束后执行自己的逻辑
                }
            });
        }
    }
    onClick(event){
        this.currentIntegral = event.target.getChildByName('labelNode').getChildByName('label1').getComponent(cc.Label).string 
        this.fetchsignInByWeek()
    }
}
