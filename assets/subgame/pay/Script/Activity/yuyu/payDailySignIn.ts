import { Language_pay } from "./../../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    StatementProgress: cc.Node = null;

    @property(cc.Node)
    RechargeProgress: cc.Node = null;

    @property(cc.Label)
    SignInDayLabel :cc.Label  = null;

    @property(cc.Node)
    commonFruitBtn :cc.Node = null; 

    @property(cc.Node)
    HighgradeFruitBtn :cc.Node = null;

    @property(cc.Node)
    SignInHistory : cc.Node = null;//领取历史

    @property(cc.Node)
    HistoryScroll : cc.Node = null;//滑动框

    @property(cc.Prefab)
    ListItem : cc.Prefab = null;//记录item

    @property(cc.Node)
    DaoGroup :cc.Node[] = [] 

    @property(cc.Button)
    qiandaoBtn : cc.Button = null;

    app = null;
    info :any = {};
    activity_id = 30;
    login_ip = ''
    SignInfo :any= {}
    page = 1;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.getSignInfo()
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        this.HistoryScroll.on('scroll-to-bottom',this.historyScrollToBottom);
        this.setLanguageResource()
    }
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = {}
        }
        this.info = info
        this.activity_id = id
    }
    getSignInfo(){
        var url = `${this.app.UrlData.host}/api/activity/getSignInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                self.SignInfo = response.data
                self.renderProgress()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    userSignIn(){
        var url = `${this.app.UrlData.host}/api/activity/userSignIn?`;
        let dataStr  = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&login_ip=$${this.login_ip ? this.login_ip:"127.0.0.1"}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr  = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('签到成功!'))
                this.getSignInfo()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    
    public fetchList(){
        var url = `${this.app.UrlData.host}/api/activity/getSignHistory?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&page=${this.page}&limit=20`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.page+=1;
                this.addList(response.data);
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    addList(data){
        cc.log(data)
        var list = []
        data.forEach((item) => {
            var timestamp4 = new Date(item.created_at);
            let date = timestamp4
            let time = timestamp4
            let info = JSON.parse(item.sign_info)
            let statement = info.today_statement;
            let gold = info.recharge_amount
            list.push({
                date,
                statement,
                gold,
                time,
            })
        });
        list.forEach((item)=>{
            var node = cc.instantiate(this.ListItem);
            var content = this.HistoryScroll.getChildByName('view').getChildByName('content');
            content.addChild(node);
            node.getComponent('payChuangGuanListItem').init(item)
        })
    }
    seitchDay(day){
        if(day <= 0){
            this.DaoGroup.forEach((e,i)=>{
                e.active = false
            })
        }else if(day >= 1 && day <3){
            this.DaoGroup.forEach((e,i)=>{
                if(i == 0){ e.active = true}else{ e.active = false}
            })
        }else if(day >= 3 && day < 7){
            this.DaoGroup.forEach((e,i)=>{
                if(i <= 1){ e.active = true}else{ e.active = false}
            })
        }else if(day >= 7 && day < 15){
            this.DaoGroup.forEach((e,i)=>{
                if(i <= 2){ e.active = true}else{ e.active = false}
            })
        }else if(day >= 15 && day < 30){
            this.DaoGroup.forEach((e,i)=>{
                if(i <= 3){ e.active = true}else{ e.active = false}
            })
        }else if(day >= 30){
            this.DaoGroup.forEach((e,i)=>{
                e.active = true
            })
        }

    }
    renderProgress(){
        let totalStatement = this.info.statement_byday
        let todayStatement = this.SignInfo.today_statement
        let recharge_amount_byday = this.info.recharge_amount_byday
        let todayRecharge_amount = this.SignInfo.recharge_amount
        this.StatementProgress.getComponent(cc.ProgressBar).progress = todayStatement/totalStatement;
        this.RechargeProgress.getComponent(cc.ProgressBar).progress = todayRecharge_amount/recharge_amount_byday;
        this.SignInDayLabel.string = `${this.SignInfo.lx_sign_day}`
        this.seitchDay(this.SignInfo.lx_sign_day)
        this.StatementProgress.getChildByName('label').getComponent(cc.Label).string = `${Language_pay.Lg.ChangeByText('今日流水:')} ${this.app.config.toDecimal(todayStatement)}`
        this.RechargeProgress.getChildByName('label').getComponent(cc.Label).string = `${Language_pay.Lg.ChangeByText('今日充值:')} ${this.app.config.toDecimal(todayRecharge_amount)}`
        //根据签到天数，计算当前可领取的水果
        let commonFruit = 0
        let HighgradeFruit = 0
        this.info.sign_conf.forEach((Item)=>{
            if(this.SignInfo.lx_sign_day >= Item.sign_in ){
                if( Item.fruit_level == 1){
                    commonFruit += Item.fruit
                }else{
                    HighgradeFruit += Item.fruit
                }
            }
        })
        if(this.SignInfo.get_fruit){
            this.SignInfo.get_fruit.forEach(item => {
                let info = JSON.parse(item.info)
                if(info.fruit_level == 1){
                    //普通水果 -5斤
                    commonFruit -= info.fruit
                }else if(info.fruit_level == 2){
                    //高级水果 -5斤
                    HighgradeFruit -= info.fruit
                }   
            });
        }
        if(this.SignInfo.sign_today == 1){
            //已签到
            this.qiandaoBtn.interactable = false
        }else{
            this.qiandaoBtn.interactable = true
        }
        console.log("普通水果",commonFruit,'高档水果',HighgradeFruit)
        if(commonFruit >=5 ){
            //大于5斤水果，显示领取按钮
            this.commonFruitBtn.getChildByName('grey').active = false
            this.commonFruitBtn.getChildByName('light').active = true
        }else{
            this.commonFruitBtn.getChildByName('grey').active = true
            this.commonFruitBtn.getChildByName('light').active = false
        }
        if(HighgradeFruit >=5){
            this.HighgradeFruitBtn.getChildByName('grey').active = false
            this.HighgradeFruitBtn.getChildByName('light').active = true
        }else{
            this.HighgradeFruitBtn.getChildByName('grey').active = true
            this.HighgradeFruitBtn.getChildByName('light').active = false
        }
        //满足条件显示打勾
        if(todayStatement/totalStatement >= 1){
            this.StatementProgress.getChildByName('icon_gou').active = true
        }else{
            this.StatementProgress.getChildByName('icon_gou').active = false
        }
        if(todayRecharge_amount/recharge_amount_byday >= 1){
            this.RechargeProgress.getChildByName('icon_gou').active = true
        }else{
            this.RechargeProgress.getChildByName('icon_gou').active = false
        }
    }
    historyScrollToBottom = ()=>{
        this.fetchList()
    }
    SignInClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.SignInfo.today_statement < this.info.statement_byday &&  this.SignInfo.recharge_amount < this.info.recharge_amount_byday ){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('签到失败，签到条件不满足!'))
        }
        this.userSignIn()
    }
     //打开历史
    btnHistory(){
        this.SignInHistory.active = true;
        this.fetchList()
    }
     //关闭历史
    closeHistory(){
        this.SignInHistory.active = false;
        var content = this.HistoryScroll.getChildByName('view').getChildByName('content');
        content.removeAllChildren();
        this.page = 1;
    }
     //普通水果提货
    commonFruitClick(){
        if(this.commonFruitBtn.getChildByName('grey').active){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('未达到领取标准'))
        }
        this.app.showTiHuoAlert(this.activity_id,1,this,1)
    }
    //高级水果提货
    HighgradeFruitClick(){
        if(this.HighgradeFruitBtn.getChildByName('grey').active){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('未达到领取标准'))
        }
        this.app.showTiHuoAlert(this.activity_id,2,this,1)
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/DailySignIn/bg')
        let btn_signInRecord= cc.find('Canvas/Activity/Content/DailySignIn/bg/btn_signInRecord')
        let btn_signInToday= cc.find('Canvas/Activity/Content/DailySignIn/bg/group1/btn_signInToday')
        let light1= cc.find('Canvas/Activity/Content/DailySignIn/bg/group1/btn_wyth1/light')
        let light2= cc.find('Canvas/Activity/Content/DailySignIn/bg/group1/btn_wyth2/light')
        let grey1= cc.find('Canvas/Activity/Content/DailySignIn/bg/group1/btn_wyth1/grey')
        let grey2= cc.find('Canvas/Activity/Content/DailySignIn/bg/group1/btn_wyth2/grey')
        let title_popup= cc.find('Canvas/Activity/Content/DailySignIn/GetGoldHistory/Alert/title_popup')
        let rq= cc.find('Canvas/Activity/Content/DailySignIn/GetGoldHistory/Alert/title/rq')
        let drls= cc.find('Canvas/Activity/Content/DailySignIn/GetGoldHistory/Alert/title/drls')
        let lqje= cc.find('Canvas/Activity/Content/DailySignIn/GetGoldHistory/Alert/title/lqje')
        let lqsj= cc.find('Canvas/Activity/Content/DailySignIn/GetGoldHistory/Alert/title/lqsj')

        this.app.loadIconLg(`${src}/activeBigImage/yuyu_event_p2`,bg)
        this.app.loadIconLg(`${src}/activeSprite/btn_signInRecord`,btn_signInRecord)
        this.app.loadIconLg(`${src}/activeSprite/btn_signInToday`,btn_signInToday)
        this.app.loadIconLg(`${src}/activeSprite/btn_lq`,light1)
        this.app.loadIconLg(`${src}/activeSprite/btn_lq`,light2)
        this.app.loadIconLg(`${src}/activeSprite/btn_lq2`,grey1)
        this.app.loadIconLg(`${src}/activeSprite/btn_lq2`,grey2)
        this.app.loadIconLg(`${src}/activeSprite/title_popup`,title_popup)
        this.app.loadIconLg(`${src}/activeSprite/rq`,rq)
        this.app.loadIconLg(`${src}/activeSprite/drls`,drls)
        this.app.loadIconLg(`${src}/activeSprite/subtitile_mrcz`,lqje)
        this.app.loadIconLg(`${src}/activeSprite/subtitile_qdsj`,lqsj)
        this.DaoGroup.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/icon_signIn`,e) 
        })

        let label1= cc.find('Canvas/Activity/Content/DailySignIn/bg/group1/StatementProgress/label').getComponent(cc.Label)
        let label2= cc.find('Canvas/Activity/Content/DailySignIn/bg/group1/RechargeProgress/label').getComponent(cc.Label)
        let label3= cc.find('Canvas/Activity/Content/DailySignIn/bg/Content/ScrollView/view/content/label').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("今日流水:")
        label2.string = Language_pay.Lg.ChangeByText("今日充值:")
        label3.string = Language_pay.Lg.ChangeByText("1. 本活动需完成手机及银行卡绑定才能参与\n2. 当日流水达1000以上或者当日累计充值50元以上，即签到成功\n3. 本活动需连续不间断签到，中间断签将回到第一天重新累计天数，已获得的奖励不会进行回收\n4. 完成连续签到30天后，可继续参与本活动，回到第一天重新累计天数\n5. 本活动所获得的水果斤数不併入免费领水果活动的水果斤数，反之亦然\n6. 本活动奖励仅保留同一用户进行签到领取\n7. 如有异常操作，则进行冻结账号处理\n8. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利")
    }
}
