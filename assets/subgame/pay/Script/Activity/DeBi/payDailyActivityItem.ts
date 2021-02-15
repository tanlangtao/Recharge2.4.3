import payDailyActivity from "./payDailyActivity"
import { Language_pay } from "./../../language/payLanguage";
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
        this.switchBtn("goToBtn")
        this.setLanguageResource()
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
            this.targetLabel.string = `${Language_pay.Lg.ChangeByText('在')}${gameName}${roomLevelName}${Language_pay.Lg.ChangeByText('中完成')}${this.data.rounds}${Language_pay.Lg.ChangeByText('局')}`
            this.rewardLabel.string = `${this.data.integral}`
            this.rewardLabel.node.parent.getChildByName('integral').active = true // 显示积分图标
            this.progressTotal = this.data.rounds
        }else if(this.type == "2"){
            //总局+金币
            this.targetLabel.string = `${Language_pay.Lg.ChangeByText('在')}${gameName}${roomLevelName}${Language_pay.Lg.ChangeByText('中完成')}${this.data.rounds}${Language_pay.Lg.ChangeByText('局')}`
            this.rewardLabel.string = `${this.data.gold}`
            this.rewardLabel.node.parent.getChildByName('gold').active = true // 
            this.progressTotal = this.data.rounds
        }else if(this.type == '3'){
            //赢局 + 积分 
            this.targetLabel.string = `${Language_pay.Lg.ChangeByText('在')}${gameName}${roomLevelName}${Language_pay.Lg.ChangeByText('胜利')}${this.data.winround}${Language_pay.Lg.ChangeByText('局')}`
            this.rewardLabel.string = `${this.data.integral}`
            this.rewardLabel.node.parent.getChildByName('integral').active = true // 
            this.progressTotal = this.data.winround
        }else if(this.type == '4'){
            //赢局 +  金币
            this.targetLabel.string = `${Language_pay.Lg.ChangeByText('在')}${gameName}${roomLevelName}${Language_pay.Lg.ChangeByText('胜利')}${this.data.winround}${Language_pay.Lg.ChangeByText('局')}`
            this.rewardLabel.string = `${this.data.gold}`
            this.rewardLabel.node.parent.getChildByName('gold').active = true // 
            this.progressTotal = this.data.winround
        }else if(this.type == '5'){
            //流水 + 积分 
            this.targetLabel.string = `${Language_pay.Lg.ChangeByText('在')}${gameName}${roomLevelName}${Language_pay.Lg.ChangeByText('中累计达到')}${this.data.game_statement}${Language_pay.Lg.ChangeByText('流水')}`
            this.rewardLabel.string = `${this.data.integral}`
            this.rewardLabel.node.parent.getChildByName('integral').active = true // 
            this.progressTotal = this.data.game_statement
        }else if(this.type == '6'){
            //流水 + 金币
            this.targetLabel.string = `${Language_pay.Lg.ChangeByText('在')}${gameName}${roomLevelName}${Language_pay.Lg.ChangeByText('中累计达到')}${this.data.game_statement}${Language_pay.Lg.ChangeByText('流水')}`
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
            if(key == this.game_id){
                for(var task_id  in Detail['game'][key]){
                    if(task_id == this.task_id){
                        GameData_task =  Detail["game"][this.game_id][this.task_id]
                   }
                }
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
                return `${Language_pay.Lg.ChangeByText('体验场')}`
            case '2' :
                return `${Language_pay.Lg.ChangeByText('初级场')}`
            case '3':
                return `${Language_pay.Lg.ChangeByText('中级场')}`
            case '4':
                return `${Language_pay.Lg.ChangeByText('高级场')}`
            default :
                console.log('房间等级错误',key)
                return ""
        }
    }
    switchGameId(Gameid){
        switch(Gameid) {
            case "5b1f3a3cb76a591e7f251715" :
                return `${Language_pay.Lg.ChangeByText('炸金花')}`
            case "5b1f3a3cb76a591e7f251711" :
                return `${Language_pay.Lg.ChangeByText('斗地主')}`
            case "5c6a62be7ff09a54amb446aa" :
                return `${Language_pay.Lg.ChangeByText('跑得快')}`
            case "5b1f3a3cb76a591e7f25170" :
                return `${Language_pay.Lg.ChangeByText('二人麻将')}`
            case "5b1f3a3cb76a591e7f251714" :
                return `${Language_pay.Lg.ChangeByText('抢庄牛牛')}`
            case "5b1f3a3cb76a591e7f25171" :
                return `${Language_pay.Lg.ChangeByText('十三水')}`
            case "5b1f3a3cb76a591e7f25176" :
                return `${Language_pay.Lg.ChangeByText('德州扑克')}`
            case "5b1f3a3cb76a591e7f251732" :
                return `${Language_pay.Lg.ChangeByText('梭哈')}`
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
        if(gameName == Language_pay.Lg.ChangeByText('炸金花')){
            this.checkSubGameDownload("zjh")
        }else if(gameName == Language_pay.Lg.ChangeByText('斗地主')){
            this.checkSubGameDownload("ddz")
        }else if(gameName == Language_pay.Lg.ChangeByText('跑得快')){
            this.checkSubGameDownload("pdk")
        }else if(gameName == Language_pay.Lg.ChangeByText('跑得快')){
            this.checkSubGameDownload("pdk")
        }else if(gameName == Language_pay.Lg.ChangeByText('二人麻将')){
            this.checkSubGameDownload("ermj")
        }else if(gameName == Language_pay.Lg.ChangeByText('抢庄牛牛')){
            this.checkSubGameDownload("qznn")
        }else if(gameName == Language_pay.Lg.ChangeByText('十三水')){
            this.checkSubGameDownload("sss")
        }else if(gameName == Language_pay.Lg.ChangeByText('德州扑克')){
            this.checkSubGameDownload("dzpk")
        }else if(gameName == Language_pay.Lg.ChangeByText('梭哈')){
            this.checkSubGameDownload("suoha")
        }
    }
    /** 根据id获取服务器子游戏信息 */
    getRemoteSubgame(game_id) {
        if (!this.app.gHandler.app || !this.app.gHandler.app.remoteGamelist) {
            return
        }
        let remotedata = this.app.gHandler.app.remoteGamelist[0];
        for (let i = 0; i < this.app.gHandler.app.remoteGamelist.length; i++) {
            if (game_id === this.app.gHandler.app.remoteGamelist[i].game_id) {
                remotedata = this.app.gHandler.app.remoteGamelist[i];
                break;
            }
        }
        return remotedata;
    }
    /** 判断子游戏是否下载更新等 */
    
    checkSubGameDownload(enname) {
        console.log('checkSubGameDownload',enname)
        let self = this;
        let subdata = this.getRemoteSubgame(this.app.gHandler.subGameList[enname].game_id)
        if (subdata.open == 0) {
            self.payDailyCompoment.app.showAlert(Language_pay.Lg.ChangeByText('游戏没开放!'));
        } else {
            let subgamev;
            let localsubv = this.app.gHandler.localStorage.get(enname, "versionKey");
            if (enname == 'zrsx1' || enname == 'zrsx2') {
                localsubv = this.app.gHandler.localStorage.get('zrsx', "versionKey");
                subgamev = this.app.gHandler.app.subGameVersion['zrsx'];
            } else if (enname == 'sbty1' || enname == 'sbty2') {
                localsubv = this.app.gHandler.localStorage.get('sbty', "versionKey");
                subgamev = this.app.gHandler.app.subGameVersion['sbty'];
            } else {
                subgamev = this.app.gHandler.app.subGameVersion[enname];
            }
            // let txt = "local version: " + localsubv + " | remote version:" + subgamev;
            let needup = this.app.gHandler.commonTools.versionCompare(localsubv, subgamev)
            if (needup && !cc.sys.isBrowser && cc.sys.os != "Windows") {
                console.log(" | subgame : " + enname + " need update");
                self.payDailyCompoment.app.showAlert(`${Language_pay.Lg.ChangeByText('游戏需要下载更新!请返回大厅下载更新')} ${enname}`);
            } else {
                console.log(" | subgame : " + enname + " not need update")
                cc.director.loadScene(self.app.gHandler.subGameList[enname].lanchscene);
                if (this.app.gHandler.app.isRelease) {
                    let subgamern = enname
                    if (enname == "zrsx1" || enname == "zrsx2") {
                        subgamern = "zrsx"
                        if (enname == "zrsx1") {
                            if (cc.sys.isBrowser) {
                                setTimeout(() => {
                                    this.loadBundle(subgamern)
                                }, 3000)
                            } else {
                                this.loadBundle(subgamern)
                            }
                        }
                    } else if (enname == "sbty1" || enname == "sbty2") {
                        subgamern = "sbty"
                        if (enname == "sbty1") {
                            if (cc.sys.isBrowser) {
                                setTimeout(() => {
                                    this.loadBundle(subgamern)
                                }, 3000)
                            } else {
                                this.loadBundle(subgamern)
                            }
                        }
                    } else {
                        if (cc.sys.isBrowser) {
                            setTimeout(() => {
                                this.loadBundle(subgamern)
                            }, 3000)
                        } else {
                            this.loadBundle(subgamern)
                        }
                    }
                }
            }
        }
    }
    loadBundle(subname) {
        let self = this
        if (!cc.assetManager.getBundle(subname)) {
            cc.assetManager.loadBundle(subname, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('load subpackage script successfully.', subname);
            });
        }
        if (!cc.assetManager.getBundle(subname + "Res")) {
            cc.assetManager.loadBundle(subname + "Res", function (err) {
                if (err) {
                    return console.error(err);
                }
                self.app.gHandler[subname + 'Res'] = cc.assetManager.getBundle(subname + "Res");
                console.log('load subpackage script successfully.', subname + 'Res', subname + "Res");
            });
        }
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let btn= this.node.getChildByName('btn')
        let goto= this.node.getChildByName('goto')
        let btn_done= this.node.getChildByName('btn_done')

        this.app.loadIconLg(`${src}/activeSprite/fdsafsd`,btn)
        this.app.loadIconLg(`${src}/activeSprite/yrt`,goto)
        this.app.loadIconLg(`${src}/activeSprite/hgrt`,btn_done)
    }
}
