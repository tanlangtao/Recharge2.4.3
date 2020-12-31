
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

    @property(cc.Prefab)
    ListItem : cc.Prefab = null;

    @property(cc.Node)
    lw_frame_tip: cc.Node = null;

    @property(cc.Node)
    content : cc.Node = null; //scrollview content

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
    page = 1;
    listStatus = 'all' //all 表示全服务, single 表示个人
    totalCpunt = 1//总条数
    limit = 1
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
        this.rotateLoop()
        
        this.fetchgetUserIntegral()
        this.scheduleOnce(this.rangeInit, 3);
    }
    rangeInit(){
        console.log('延迟3秒')
        this.addRangeList()
        this.fetchList()
        this.scrollLoop()
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
        this.lw_pan.stopAllActions()
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
        this.playSpine(this.lwPanSpine,'spin',false,0.7,()=>{})
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
            var action3 = cc.rotateBy(0.4,endAngle)
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
    rotateLoop(){
        // rotateBy
        var action1  = cc.rotateBy(1000,36000)
        let callback = cc.callFunc(()=>{
            this.lw_pan.runAction(cc.sequence(action1,callback))
        })
        this.lw_pan.runAction(cc.sequence(action1,callback))
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
    getLevelName(prize){
        let level = 0
        let levelName = ''
         this.info.prizeList.forEach((e,index)=>{
             if(prize == e.prize){
                 level = index+1
             }
         })

        switch (level){
            case 1: levelName = '时来运转';break;
            case 6: levelName = '一路发财';break;
            case 7: levelName = '六六大顺';break;
            case 8: levelName = '天降豪礼';break;
            default: levelName = ''; break;
        }
        return levelName
    }
    getPrizeByLevel(level){
        let prize = 0
         this.info.prizeList.forEach((e,index)=>{
             if(level == index+1){
                prize = e.prize
             }
         })
        return prize
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
    fetchgetUserIntegral(){
        var url = `${this.app.UrlData.host}/api/activity/getUserIntegral?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&activity_id=${this.activity_id}&page=${this.page}&limit=${this.limit}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                //设置当前积分
                this.integralLabel.string = `${response.data.value}`
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    fetchList(){
        if(this.listStatus =='all'){
            //不传id，返回全服务记录
            var url = `${this.app.UrlData.host}/api/activity/activityList?package_id=${this.app.UrlData.package_id}&token=${this.app.token}&activity_id=${this.activity_id}&page=${this.page}&limit=${this.limit}`;
        }else if(this.listStatus == 'single'){
            var url = `${this.app.UrlData.host}/api/activity/activityList?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&activity_id=${this.activity_id}&page=${this.page}&limit=${this.limit}`;
        }
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.totalCpunt = response.count
                this.addList(response.data);
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    addList(data){
        cc.log(data)
        data.forEach((item) => {
            if(item.activity_name!='幸运轮盘2'){
                return 
            }
            let info = JSON.parse(item.receive_info);
            var user_name = ''
            if(this.listStatus =='all'){
                var user_name1 = `${item.user_name}`.slice(0,3)
                var user_name2 = `${item.user_name}`.substring(`${item.user_name}`.length-3)
                user_name = user_name1+'***'+user_name2
            }else{
                user_name = item.user_name
            }
           
            if(info.prize.length >1){
                info.prize.forEach(prizeItem=>{
                    var node = cc.instantiate(this.ListItem);
                    this.content.addChild(node);
                    node.getComponent('payWheelItem').init(user_name,this.getLevelName(prizeItem),prizeItem)
                })
            }else{
                var node = cc.instantiate(this.ListItem);
                this.content.addChild(node);
                node.getComponent('payWheelItem').init(user_name,this.getLevelName(info.prize[0]),info.prize[0])
            }
           
        });
    }
    addRangeList(){
        for(var i =0;i<5;i++){
            var node = cc.instantiate(this.ListItem);
            let id = this.app.config.randId(123000000,999999999)
            let level = this.app.config.randNum(1,8)
            let prize = this.getPrizeByLevel(level)
            this.content.addChild(node);
            node.getComponent('payWheelItem').init(id,this.getLevelName(prize),prize)
        }
    }
    //全服
    quanFuClick(){
        this.content.removeAllChildren();
        this.addRangeList()

        this.listStatus = 'all'
        this.page = 1
        this.fetchList()
        this.scrollLoop()
    }
    //个人
    geRenClick(){
        this.content.removeAllChildren();
        this.listStatus = 'single'
        this.page = 1
        this.fetchList()
        this.scrollLoop()
    }
    //单抽
    singleClick(){
        if(Number(this.integralLabel.string)<1000){
            this.app.showAlert('您的积分余额不足！')
            return
        }
        let MaskLayer = this.node.getChildByName('MaskLayer')
        var endRotation = 0
        let level = 0
        let outCallBack = ()=>{
            let callBack = ()=>{
                MaskLayer.active=false
                this.fetchgetUserIntegral()
                this.rotateLoop()
            }
            level = this.getLevel(this.data.prize[0])
            endRotation = this.getEndRotation(level)
            this.rotateBegin(endRotation,callBack)
        }
        this.fetchLuckyTurntable(1,outCallBack)
    }
    //十连抽
    tenEvenClick(){
        if(Number(this.integralLabel.string)<9000){
            this.app.showAlert('您的积分余额不足！')
            return
        }
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
                    this.fetchgetUserIntegral()
                    this.rotateLoop()
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
        this.lw_frame_tip.active = !this.lw_frame_tip.active
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
    scrollLoop(){
        this.content.stopAllActions()
        this.content.position=cc.v3(0,-120)
        let idx = 0;
        var action1 = cc.moveBy(10,cc.v2(0,245))
        let middleCallBack = cc.callFunc(()=>{
            this.page +=1
            let totalPage = Math.ceil(this.totalCpunt / this.limit)
            if(this.page > totalPage){
                this.page = totalPage
                return 
            }
            this.fetchList()
        })
        let callBack = cc.callFunc(()=>{
            let totalPage = Math.ceil(this.totalCpunt / this.limit)
            idx +=1
            if(idx >totalPage){
                if(this.content.position.y < this.content.height + 120){
                    //说明还没有播到底部
                    var action3 = cc.moveBy(10,cc.v2(0,245))
                    this.content.runAction(cc.sequence(action3,callBack))
                }else{
                    //到底部了
                    this.content.stopAllActions()
                    idx = 0
                    var action4 = cc.moveTo(0,cc.v2(0,-120))
                    this.content.runAction(cc.sequence(action4,action1,callBack))
                }
                return 
            }else{
                this.content.runAction(cc.sequence(action1,middleCallBack,callBack))
            }
        })
        this.content.runAction(cc.sequence(action1,middleCallBack,callBack))
    }
    onDestroy(){
        this.content.stopAllActions()
    }
}
