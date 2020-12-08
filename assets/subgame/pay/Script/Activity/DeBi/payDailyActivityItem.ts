import payDailyActivity from "./payDailyActivity"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    gameLabel: cc.Label = null; // 金币数量 , X3

    @property(cc.Label)
    targetLabel: cc.Label = null; // 目标

    @property(cc.Label)
    rewardLabel: cc.Label = null; // 奖励

    @property(cc.Label)
    progressLabel: cc.Label = null; // 完成进度

    @property(cc.ProgressBar)
    activityProgress: cc.ProgressBar = null; // 进度条

    @property(cc.Node)
    lingquBtn: cc.Node = null; // 领取按钮

    @property(cc.Node)
    lingquDoneBtn: cc.Node = null; // 领取完成

    @property(cc.Node)
    goToBtn: cc.Node = null; // 前往按钮

    payDailyCompoment :payDailyActivity = null
    game_id = ''
    data = null
    task_id = ''
    app = null
    type = ''
    roomLevel = ''
    progressTotal = 0
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLabel()
    }
    init(game_id,task_id,data){
        this.game_id = `${game_id}`
        this.task_id = task_id
        this.data = data    
        this.type = task_id.slice(0,1) //第一位表示类型
        this.roomLevel = task_id.slice(-1) // 最后一位表示房间等级
    }
    setLabel(){
        var gameName = this.switchGameId(this.game_id)
        var roomLevelName = this.switchRoomLevel(this.roomLevel)
        this.gameLabel.string = `${gameName}${roomLevelName}`
        if(this.type == "1"){
            //总局+积分
            this.targetLabel.string = `在${gameName}${roomLevelName}中完成${this.data.rounds}局`
            this.rewardLabel.string = `${this.data.integral}`
            this.rewardLabel.node.parent.getChildByName('integral').active = true // 显示积分图标
            this.progressTotal = this.data.rounds
        }else if(this.type == "2"){
            //总局+金币
            this.targetLabel.string = `在${gameName}${roomLevelName}中完成${this.data.rounds}局`
            this.rewardLabel.string = `${this.data.gold}`
            this.rewardLabel.node.parent.getChildByName('gold').active = true // 
            this.progressTotal = this.data.rounds
        }else if(this.type == '3'){
            //赢局 + 积分 
            this.targetLabel.string = `在${gameName}${roomLevelName}胜利${this.data.winround}局`
            this.rewardLabel.string = `${this.data.integral}`
            this.rewardLabel.node.parent.getChildByName('integral').active = true // 
            this.progressTotal = this.data.winround
        }else if(this.type == '4'){
            //赢局 +  金币
            this.targetLabel.string = `在${gameName}${roomLevelName}胜利${this.data.winround}局`
            this.rewardLabel.string = `${this.data.gold}`
            this.rewardLabel.node.parent.getChildByName('gold').active = true // 
            this.progressTotal = this.data.winround
        }else if(this.type == '5'){
            //流水 + 积分 
            this.targetLabel.string = `在${gameName}${roomLevelName}中累计达到${this.data.game_statement}流水`
            this.rewardLabel.string = `${this.data.integral}`
            this.rewardLabel.node.parent.getChildByName('integral').active = true // 
            this.progressTotal = this.data.game_statement
        }else if(this.type == '6'){
            //流水 + 金币
            this.targetLabel.string = `在${gameName}${roomLevelName}中累计达到${this.data.game_statement}流水`
            this.rewardLabel.string = `${this.data.gold}`
            this.rewardLabel.node.parent.getChildByName('gold').active = true // 
            this.progressTotal = this.data.game_statement
        }
    }
    setDetail(Detail,payDailyCompoment){
        this.payDailyCompoment = payDailyCompoment
        let isReceive = false
        Detail.received_task.forEach(e => {
            //数组里存在，则表示已领取
            let task_id = e.slice(-3)
            if(task_id == this.task_id){
                isReceive = true
            }
        });
        let progressCurrent = 0
        let GameData_task = {
            "win_num" :0,
            "lose_num": 0,
            "win_gold": 0,
            "lose_gold": 0,
            "game_flow": 0
        }
        for(var key in Detail["game"]){
            if(key == this.task_id){
                 GameData_task =  Detail["game"][this.game_id][this.task_id]
            }
        }
        if(this.type == '1' || this.type == "2"){
            //总输加总赢
            progressCurrent = GameData_task.win_num+GameData_task.lose_num
        }else if(this.type == '3' || this.type =='4'){
            //总赢
            progressCurrent = GameData_task.win_num
        }else if(this.type == '5' || this.type =='6'){
            //流水
            progressCurrent = GameData_task.game_flow
        }
        this.progressLabel.string = `${progressCurrent}/${this.progressTotal}`
        this.activityProgress.getComponent(cc.ProgressBar).progress = progressCurrent/this.progressTotal
        if(progressCurrent >= this.progressTotal){
            if(!isReceive){
                this.switchBtn("lingquBtn")
            }else{
                this.switchBtn("lingquDoneBtn")
            }
        }else{
            this.switchBtn("goToBtn")
        }
    }
    switchRoomLevel(key){
        switch (key) {
            case '1':
                return "初级场"
            case '2' :
                return "中级场"
            case '3':
                return "高级场"
            case '4':
                return "专家场"
            default :
                console.log('房间等级错误',key)
                return ""
        }
    }
    switchGameId(Gameid){
        switch(Gameid) {
            case "5b1f3a3cb76a591e7f251715" :
                return "炸金花"
            case "5b1f3a3cb76a591e7f251711" :
                return "斗地主"
            case "5c6a62be7ff09a54amb446aa" :
                return "跑得快"
            case "5b1f3a3cb76a591e7f25170" :
                return "二人麻将"
            case "5b1f3a3cb76a591e7f251714" :
                return "抢庄牛牛"
            case "5b1f3a3cb76a591e7f2517" :
                return "十三水"
            case "5b1f3a3cb76a591e7f25176" :
                return "德州扑克"
            default :
                return ""
        }
    }
    switchBtn(btnName){
        this.lingquBtn.active = false
        this.lingquDoneBtn.active = false
        this.goToBtn.active = false
        if(btnName == 'lingquBtn'){
            this.lingquBtn.active = true
        }else if (btnName =="lingquDoneBtn") {
            this.lingquDoneBtn.active = true
        }else if (btnName =="goToBtn") {
            this.goToBtn.active = true
        }
    }
    linquBtnClick(){
        this.lingquBtn.getComponent(cc.Button).interactable = false
        let self = this;
        let isIntegral = this.rewardLabel.node.parent.getChildByName('integral').active
        this.payDailyCompoment.fetchGetTask(this.game_id,this.task_id,this.rewardLabel.string,isIntegral,()=>{
            self.lingquBtn.getComponent(cc.Button).interactable = true
        })
    }
    //点击前往
    goToBtnClick(){
        var gameName = this.switchGameId(this.game_id)
        if(gameName == "炸金花"){
            this.checkSubGameDownload("zjh")
        }else if(gameName == "斗地主"){
            this.checkSubGameDownload("ddz")
        }else if(gameName == "跑得快"){
            this.checkSubGameDownload("pdk")
        }else if(gameName == "跑得快"){
            this.checkSubGameDownload("pdk")
        }else if(gameName == "二人麻将"){
            this.checkSubGameDownload("ermj")
        }else if(gameName == "抢庄牛牛"){
            this.checkSubGameDownload("qznn")
        }else if(gameName == "十三水"){
            this.checkSubGameDownload("sss")
        }else if(gameName == "德州扑克"){
            this.checkSubGameDownload("dzpk")
        }
    }
    /** 根据id获取服务器子游戏信息 */
    getRemoteSubgame(game_id) {
        if (!this.app.gHandler.appGlobal || !this.app.gHandler.appGlobal.remoteGamelist) {
            return
        }
        let remotedata = this.app.gHandler.appGlobal.remoteGamelist[0];
        for (let i = 0; i < this.app.gHandler.appGlobal.remoteGamelist.length; i++) {
            if (game_id === this.app.gHandler.appGlobal.remoteGamelist[i].game_id) {
                remotedata = this.app.gHandler.appGlobal.remoteGamelist[i];
                break;
            }
        }
        return remotedata;
    }
    /** 判断子游戏是否下载更新等 */
    checkSubGameDownload(enname) {
        let subdata = this.getRemoteSubgame(this.app.gHandler.gameConfig.gamelist[enname].game_id)
        cc.log(enname)
        cc.log("this.app.gHandler.gameConfig.gamelist",this.app.gHandler.gameConfig.gamelist)
        if (subdata.open == 0) {
            cc.log(" | subgame : " + enname + " subdata.open 等于0");
            this.app.gHandler.gameConfig.gamelist[enname].isDown = false
        } else {
            let subgamev;
            let localsubv = this.app.gHandler.localStorage.get(enname, "versionKey");
            if (enname == 'zrsx1' || enname == 'zrsx2') {
                localsubv = this.app.gHandler.localStorage.get('zrsx', "versionKey");
                subgamev = this.app.gHandler.appGlobal.subGameVersion['zrsx'];
            } else {
                subgamev = this.app.gHandler.appGlobal.subGameVersion[enname];
            }
            let needup = false
            cc.log("活动前往子游戏","subgamev",subgamev,"localsubv",localsubv)
            if (!localsubv) {
                needup = true;
            } else {
                let vA = subgamev.split('.');
                let vB = localsubv.split('.');
                for (let i = 0; i < vA.length; ++i) {
                    let a = parseInt(vA[i]);
                    let b = parseInt(vB[i] || 0);
                    if (a != b) {
                        needup = true;
                        break;
                    }
                }
                if (vB.length != vA.length) {
                    needup = true;
                }
            }
            let self = this
            if (needup && !cc.sys.isBrowser) {
                cc.log(" | subgame : " + enname + " need update");
                self.payDailyCompoment.app.showAlert("游戏需要更新!请返回大厅更新");
                this.app.gHandler.gameConfig.gamelist[enname].isDown = false
            } else {
                cc.log(" | subgame : " + enname + " not need update")
                this.app.gHandler.gameConfig.gamelist[enname].isDown = true
                let subgamern = enname
                if (this.app.gHandler.appGlobal.isRelease) {
                    !this.app.gHandler.gameGlobal.isdev && cc.loader.downloader.loadSubpackage(subgamern, function (err) {
                        if (err) {
                            cc.log(err)
                            return self.payDailyCompoment.app.showAlert("加载游戏失败！请返回大厅进入！");
                        }
                        cc.director.loadScene(this.app.gHandler.gameConfig.gamelist[subgamern].lanchscene);
                        // console.log('load subpackage script successfully.', subgamern);
                    });
                }else{
                    cc.director.loadScene(this.app.gHandler.gameConfig.gamelist[subgamern].lanchscene);
                }
            }
        }
    }
}
