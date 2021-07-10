import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    btnArr: cc.Node[] = [];

    app = null
    login_ip = ''

    info = {
        flow_rate:0,
        win:0,
        range:[
            {bonus: 0, win_round: 0},
            {bonus: 0, win_round: 0},
            {bonus: 0, win_round: 0},
            {bonus: 0, win_round: 0},
            {bonus: 0, win_round: 0}
        ]
    }
    activity_id = 0
    is_received = 0
    game_count = 0
    setIdInfo(id,info){
        this.activity_id = id
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            console.log("活动内容未配置！")
        }else{
            this.info = info
            console.log(this.info)
        }
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        this.infoInit()
        this.setLanguageResource()
        this.getRewardHeNeiWinFlag()
    }
    infoInit(){
        let label2 = cc.find("Canvas/Activity/Content/CdxHeNei/bg/Layout/label2").getComponent(cc.Label)
        let label3 = cc.find("Canvas/Activity/Content/CdxHeNei/bg/Layout/label3").getComponent(cc.Label)
        let group1 = cc.find("Canvas/Activity/Content/CdxHeNei/bg/Layout/group1")
        let group2 = cc.find("Canvas/Activity/Content/CdxHeNei/bg/Layout/group2")
        label2.string  = `${Language_pay.Lg.ChangeByText('不低于')}${this.info.win}${Language_pay.Lg.ChangeByText('金币')}`
        label3.string  = `${Language_pay.Lg.ChangeByText('彩金')}${this.info.flow_rate}${Language_pay.Lg.ChangeByText('倍流水')}`
        group1.children.forEach((e,index)=>{
            //连赢局数
            e.getComponent(cc.Label).string = `${this.info.range[index].win_round}${Language_pay.Lg.ChangeByText('局')}`
        })
        group2.children.forEach((e,index)=>{
            //彩金
            e.getComponent(cc.Label).string = `${this.info.range[index].bonus}`
        })
    }
    
    getRewardHeNeiWinFlag(){
        var url = `${this.app.UrlData.host}/api/activity/getRewardHeNeiWinFlag?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.is_received = response.data.is_received
                this.getGameHandleHeNeiWin()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    
    getGameHandleHeNeiWin(){
        let gameHost = this.app.UrlData.host.replace("pay","game")
        var url = `${gameHost}/caidaxiao/api/HandleHeNeiWin?user_id=${this.app.UrlData.user_id}&level_amount=${this.info.win}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.code == 0){
                this.game_count = response.data.list.game_count
                this.renderBtn()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }

    receiveHandleHeNeiWin(){
        var url = `${this.app.UrlData.host}/api/activity/receiveHandleHeNeiWin`;
        let self = this;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${this.app.UrlData.user_name}&flag=1&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&login_ip=${this.login_ip ? this.login_ip:this.app.gHandler.gameGlobal.regin_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText("申请成功!"))
                this.getRewardHeNeiWinFlag()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText("网络错误")}${errstatus}`)
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.is_received!=0){
            return this.app.showAlert(Language_pay.Lg.ChangeByText("同一用户仅限领取一次!"))
        }
        this.receiveHandleHeNeiWin()
    }
    renderBtn(){
        this.btnArr.forEach((e)=>{
            e.active = false
        })
        if(this.is_received == 0 && this.game_count >= this.info.range[0].win_round ){
            let btnIndex = 0;
            this.info.range.forEach((item,index)=>{
               if(this.game_count >= item.win_round) {
                   btnIndex = index
               }
           })
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = false
        }else if(this.is_received != 0){
            this.btnArr.forEach(e=>{
                e.active = false
            })
            let btnIndex = 0;
            this.info.range.forEach((item,index)=>{
               if(this.game_count >= item.win_round) {
                   btnIndex = index
               }
           })
           // 显示已领取
           this.btnArr[btnIndex].active = true
           this.btnArr[btnIndex].getChildByName("bg2").active = true
        }
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/CdxHeNei/bg')
        this.app.loadIconLg(`${src}/activeBigImage/cdxbg_hn`,bg)
        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_lq`,e)
            this.app.loadIconLg(`${src}/activeSprite/btn_ylq`,e.getChildByName('bg2'))
        })
        let title= cc.find('Canvas/Activity/Content/CdxHeNei/bg/Layout/title')
        let rule = cc.find("Canvas/Activity/Content/CdxHeNei/bg/Content/ScrollView/view/content/rule").getComponent(cc.RichText)
        let label1 = cc.find("Canvas/Activity/Content/CdxHeNei/bg/Layout/label1").getComponent(cc.Label)
        title.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("游戏房间")
        title.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("连赢局数")
        title.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("每局净盈利")
        title.children[3].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("彩金")
        title.children[4].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("流水要求")
        label1.string = Language_pay.Lg.ChangeByText("河内分分彩")
        rule.string = `${Language_pay.Lg.ChangeByText("<color=#ffffff>1. 本活动需先绑定好手机号码与银行卡后才能参与，平台中的老玩家活动只能参加其中一个。\n2. 活动限制：</c><color=#E3FD00>仅限分分彩猜大小-河内分分彩房间</c>，中途进行其他游戏视为放弃此活动。\n3. 在<color=#E3FD00>规定游戏中单局净盈利不低于1000金币</c>，依照连赢局数前往本活动界面进行领取活动彩金。\n4. 每天只能领取一次， 超过23:59:59符合条件不进行领取则视为自动放弃。\n5. 同一用户（同IP同设备视为同一用户）仅限参加一次活动，活动彩金需10倍流水方可申请兑换。\n6. 平台拥有最终解释权，严禁一切恶意行为，出现违规情况，一律封号处理；同时平台有权根据\n实际情况，随时调整活动内容。</color>")}`
    }   
}
