import payDailyActivity from "./payDailyActivity"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    goldLabel: cc.Label = null; // 金币数量 , X3

    @property(cc.Label)
    targetLabel: cc.Label = null; // 目标

    @property(cc.Label)
    rewardLabel: cc.Label = null; // 奖励

    @property(cc.Label)
    progressLabel: cc.Label = null; // 完成进度

    @property(cc.Node)
    lingquBtn: cc.Node = null; // 领取按钮

    @property(cc.Node)
    lingquDoneBtn: cc.Node = null; // 领取完成

    @property(cc.Node)
    goToBtn: cc.Node = null; // 前往按钮

    payDailyCompoment :payDailyActivity = null
    key = ''
    data = null
    task_id = 0
    onLoad () {
        this.goldLabel.string = `x${this.data.gold}`
        this.rewardLabel.string = `奖励: ${this.data.gold}金币, ${this.data.integral}积分`
        switch (this.key){
            case "game" :
                var gameName = this.switchGameId(this.data.game_id)
                if(this.data.rounds){
                    this.targetLabel.string = `完成${this.data.rounds}局${gameName}`
                }else if(this.data.winround){
                    this.targetLabel.string = `${gameName}获胜${this.data.winround}局`
                }
                break
            case "proxy" :
                this.targetLabel.string = `发展下级完成首冲${this.data.children_firstpay_num}人`
                break
            case "recharge" :
                if(this.data.recharge_num){
                    this.targetLabel.string = `今日充值${this.data.recharge_num}次`
                }else if(this.data.recharge_amount){
                    this.targetLabel.string = `今日充值${this.data.recharge_amount}金币`
                }
                break
        }
    }
    init(key,data){
        this.key = `${key}`
        this.data = data
        this.task_id = data.task_id
    }
    setDetail(Detail,payDailyCompoment){
        this.payDailyCompoment = payDailyCompoment
        let isReceive = false
        if(Detail.receive_task_id.indexOf(`${this.task_id}`) != -1) {
            //数组里存在，则表示已领取
            isReceive = true
        }
        switch (this.key){
            case "game" :
                let GameData =  Detail["game"][this.data.game_id]
                if(!GameData) break
                if(this.data.rounds){
                    this.progressLabel.string = `${GameData.totalrounds}/${this.data.rounds}`
                    if(GameData.totalrounds >= this.data.rounds){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }else if(this.data.winround){
                    this.progressLabel.string = `${GameData.winround}/${this.data.winround}`
                    if(GameData.winround >= this.data.winround){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }
                break
            case "proxy" :
                this.progressLabel.string = `${Detail.children_firstpay_num}/${this.data.children_firstpay_num}`
                if(Detail.children_firstpay_num >= this.data.children_firstpay_num){
                    if(!isReceive){
                        this.switchBtn("lingquBtn")
                    }else{
                        this.switchBtn("lingquDoneBtn")
                    }
                }else{
                    this.switchBtn("goToBtn")
                }
                break
            case "recharge" :
                if(this.data.recharge_num){
                    this.progressLabel.string = `${Detail.recharge_num}/${this.data.recharge_num}`
                    if(Detail.recharge_num >= this.data.recharge_num){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }else if(this.data.recharge_amount){
                    this.progressLabel.string = `${Detail.recharge_amount}/${this.data.recharge_amount}`
                    if(Detail.recharge_amount >= this.data.recharge_amount){
                        if(!isReceive){
                            this.switchBtn("lingquBtn")
                        }else{
                            this.switchBtn("lingquDoneBtn")
                        }
                    }else{
                        this.switchBtn("goToBtn")
                    }
                }
                break
        }
    }
    switchGameId(Gameid){
        switch(Gameid) {
            case "5b1f3a3cb76a591e7f251715" :
                return "炸金花"
            case "5b1f3a3cb76a591e7f251711" :
                return "斗地主"
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
        this.payDailyCompoment.fetchGetTask(this.key,this.task_id)
    }
    //点击前往
    goToBtnClick(){
         switch (this.key){
            case "game" :
                var gameName = this.switchGameId(this.data.game_id)
                if(gameName == "炸金花"){
                    cc.director.preloadScene("ZJHLoad",()=>{
                        cc.director.loadScene("ZJHLoad")
                    })
                }else {
                    cc.director.preloadScene("ddzloading_bg",()=>{
                        cc.director.loadScene("ddzloading_bg")
                    })
                }
                break
            case "proxy" :
                cc.director.preloadScene("proxy-proxy",()=>{
                    cc.director.loadScene("proxy-proxy")
                })
                break
            case "recharge" :
                cc.director.preloadScene("payRecharge",()=>{
                    cc.director.loadScene("payRecharge")
                })
                break
        }
    }
}