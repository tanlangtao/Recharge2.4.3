
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    integralLabel: cc.Label = null;

    @property(cc.Node)
    btn :cc.Node = null;

    @property(cc.Node)
    sccrollView :cc.Node = null;

    @property(cc.Node)
    lw_pan :cc.Node = null;

    @property(cc.Node)
    lwPanSpine :cc.Node = null;

    @property(cc.Node)
    zhongjiangBg :cc.Node = null;

    @property(cc.Label)
    levelLabel :cc.Label[] = [];

    activity_id = 15
    app = null
    currentGold = ''
    info = {
        flow_rate:1,
        one_lottery:'',
        prizeList:[],
        ten_lottery:''
    }
    data :any= {}
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
            console.log("活动内容未配置！")
        }else{

        }
        this.info = info
        this.activity_id = id

    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');

        this.info.prizeList.forEach((e,index)=>{
            this.levelLabel[index].getComponent(cc.Label).string = e.prize
        })
    }
    public fetchLuckyTurntable(num,outCallBack){
        let MaskLayer = this.node.getChildByName('MaskLayer')
        MaskLayer.active = true //开启遮罩 
        var url = `${this.app.UrlData.host}/api/activity/luckyTurntable`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&num=${num}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            console.log(response)
            if(response.status == 0){
                this.data = response.data
                outCallBack()
            }else{
                this.app.showAlert(response.msg)
                MaskLayer.active=false
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
            MaskLayer.active=false
        })
    }
    rotateBegin(endRotation,callBackOut=()=>{}){
        // rotateBy
        var action1  = cc.rotateBy(0.2,45)
        var action2 = cc.rotateBy(0.3,90)
        var action3 = cc.rotateBy(0.5,360)
        let callback = cc.callFunc(()=>{
            this.lw_pan.runAction(cc.sequence(action3,cc.callFunc(()=>{
                this.ratateStop(endRotation,callBackOut)
            })))
        })
        this.lw_pan.runAction(cc.sequence(action1,action2,action3,callback))
        this.playSpine(this.lwPanSpine,'spin',false,0.5,()=>{})
    }
    ratateStop(endRotation,callBackOut){
        this.lw_pan.stopAllActions()
        var nowAngle= (this.lw_pan.angle-90) % 360
        let endAngle = 360 - Math.abs(nowAngle) + Math.abs(endRotation)
        if(endAngle >= 45){
            let cha = endAngle - 45;
            endAngle = 45
            var action1 = cc.rotateBy((cha + 45)/225,cha + 45)
            var action2 = cc.rotateBy(0.3,45)
            var action3 = cc.rotateBy(0.3,endAngle)
        }else{
            var action1 = cc.rotateBy(0.15,45)
            var action2 = cc.rotateBy(0.2,45)
            var action3 = cc.rotateBy(endAngle/120,endAngle)
        }
        let callBack = cc.callFunc(()=>{
            this.playSpine(this.lwPanSpine,'stop',false,1,()=>{
                this.playSpine(this.lwPanSpine,'stand',true,1,()=>{})
                this.wins(callBackOut)
            })
        })
        this.lw_pan.runAction(cc.sequence(action1,action2,action3,callBack))
    }
    getLevel(prize){
       let level = 0
        this.info.prizeList.forEach((e,index)=>{
            if(prize == e.prize){
                level = index+1
            }
        })
       return level
    }
    getEndRotation(level){
        var rotation = 0
        console.log(level,rotation)
        switch (level) {
            case 2 : rotation = -315; break
            case 7 : rotation = -270; break
            case 3 : rotation = -225; break
            case 8 : rotation = -180; break
            case 5 : rotation = -135; break
            case 1 : rotation = -90; break
            case 4 : rotation = -45; break
            case 6 : rotation = -0; break
            default: console.log('无该等级奖励!',level);break
        }
        this.currentGold = this.levelLabel[level -1 ].getComponent(cc.Label).string
        return rotation
    }
    wins(callBackOut){
        this.zhongjiangBg.active = true 
        let sp2 = this.zhongjiangBg.getChildByName('sp2')
        sp2.getChildByName('label').getComponent(cc.Label).string = this.currentGold
        sp2.active = true
        console.log(sp2.active,this.currentGold)
        this.playSpine(sp2,'chuxian',false,1,()=>{
             //如果是十连抽，走回调函数
             callBackOut()
            this.playSpine(sp2,'xunhuan',true,1,()=>{
            })
        })
    }
    //全服
    quanFuClick(){

    }
    //个人
    geRenClick(){

    }
    //单抽
    singleClick(){
        let MaskLayer = this.node.getChildByName('MaskLayer')
        var endRotation = 0
        let level = 0
        let outCallBack = ()=>{
            let callBack = ()=>{
                MaskLayer.active=false
            }
            level = this.getLevel(this.data.prize[0])
            endRotation = this.getEndRotation(level)
            this.rotateBegin(endRotation,callBack)
        }
        this.fetchLuckyTurntable(1,outCallBack)
    }
    //十连抽
    tenEvenClick(){
        let MaskLayer = this.node.getChildByName('MaskLayer')
        let outCallBack = ()=>{
            var endRotation = 0
            let level = 0
            //如果大于1，则说明是10连抽
            let i = 0
            let callBack = ()=>{
                i++
                if(i>=10){
                    MaskLayer.active=false
                    return
                }
                console.log(`十连第 ${i} 次`)
                this.confirmClick()
                level = this.getLevel(this.data.prize[i])
                endRotation = this.getEndRotation(level)
                this.rotateBegin(endRotation,callBack)
            }
            level = this.getLevel(this.data.prize[i])
            endRotation = this.getEndRotation(level)
            this.rotateBegin(endRotation,callBack)
             
         }
        this.fetchLuckyTurntable(10,outCallBack)
    }
    helpClick(){

    }
    confirmClick(){
        let sp2 = this.zhongjiangBg.getChildByName('sp2')
        sp2.getChildByName('label').getComponent(cc.Label).string = this.currentGold
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
}
