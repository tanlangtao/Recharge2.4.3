
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../../language/payLanguage";
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
    
    @property(cc.Node)
    jdlistBtn :cc.Node = null; // 进度列表按钮

    app = null
    bindBankNum = false
    activity_id = 0
    checkFreeFruitResult :any= {}
    source_type = 2 //提货信息来源
    fruit_jin = 0
    canClick = false
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.getSignInfo()
        this.bg2.active = false
        this.setLanguageResource()
    }
    setId(id){
        this.activity_id = id
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
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
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    public getSignInfo(){
        var url = `${this.app.UrlData.host}/api/activity/checkFreeFruit?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                console.log(response)
                this.canClick = true
                this.checkFreeFruitResult = response
                this.renderBg2()

            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            console.log(url,errstatus)
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    //点立即参与
    LiJiCanYuClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '' || !this.bindBankNum) {
            this.app.showAlert(Language_pay.Lg.ChangeByText('请绑定手机跟银行卡实名认证后参与活动'))
            return
        }
        if(!this.canClick){
            this.app.showAlert(Language_pay.Lg.ChangeByText('你点的太快了，请等待活动数据返回!'))
            return
        }
        this.bg2.active = true
        let scalex = cc.winSize.width / 1334;
        this.node.width = 1334 * scalex;
        console.log(this.node.width,scalex)
        this.renderBg2()
       
    }
    renderBg2(){
        console.log("renderBg2")
        if(this.checkFreeFruitResult.data.invitee){
            //invitee不为空，是为被邀请者
            this.source_type = 2
            this.fruit_jin = this.checkFreeFruitResult.data.invitee.fruit_jin
            this.fruitLabel.string = `${this.fruit_jin}`

            let f2 = this.fruit_jin % 5 == 0 && this.fruit_jin!=0 ? 5 :this.fruit_jin % 5
            //显示进度条，隐藏进度列表按钮
            this.progress.active = true
            this.jdlistBtn.active = false

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
            this.content.children[0].getComponent(cc.Label).string = `${Language_pay.Lg.ChangeByText('恭喜您已获得')}${this.fruit_jin}${Language_pay.Lg.ChangeByText('')}`
        }else if(this.checkFreeFruitResult.data.inviter){
            //inviter不为空，是为邀请者
            this.source_type =3
            this.fruit_jin = this.checkFreeFruitResult.data.inviter.fruit_jin
            this.fruitLabel.string = `${this.fruit_jin}`
            //隐藏进度条，显示进度列表按钮
            this.progress.active = false
            this.jdlistBtn.active = true

            if(this.fruit_jin >= 5){
                //显示获得5斤水果弹窗
                this.Alert3.getChildByName('content').getChildByName('label').getComponent(cc.Label).string = `${Language_pay.Lg.ChangeByText('恭喜您已获得')}${this.fruit_jin}${Language_pay.Lg.ChangeByText('斤水果')}`
                this.Alert3.active = true
            }
            this.content.children[0].getComponent(cc.Label).string = `${Language_pay.Lg.ChangeByText('恭喜您已获得')}${this.fruit_jin}${Language_pay.Lg.ChangeByText('斤水果')}`
        }
        this.content.children.forEach((e,i)=>{
            if(i !=0){
                let id = this.app.config.randId(123000000,999999999)
                let jin = this.app.config.randNum(2,5)
                e.getComponent(cc.Label).string = `${Language_pay.Lg.ChangeByText('恭喜')}${id}${Language_pay.Lg.ChangeByText('已获得')}${jin == 4?5 :jin}${Language_pay.Lg.ChangeByText('斤水果')}`
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
            return this.app.showAlert(Language_pay.Lg.ChangeByText('水果斤数未达5斤，无法领取'))
        }
        this.closeAllAlert()
        this.app.showTiHuoAlert(this.activity_id,1,this,this.source_type,this.fruit_jin)
    }
    //点立即邀请
    LiJiYaoQingClick(){
        if (this.app.gHandler.subModel.proxy.lanchscene != "") {
            cc.director.loadScene(this.app.gHandler.subModel.proxy.lanchscene)
        } else {
            cc.log("请配置全民代理场景")
        }
    }
    //点进入游戏
    EnterGameClick(){
        //按键音效
        this.app.loadMusic(1)
        let scree = this.app.gHandler.gameGlobal.pay.from_scene;
        this.app.gHandler.gameGlobal.pay.from_scene = "";
        if (scree == ""){
            scree = "hall"
        }
        if (scree == this.app.gHandler.subGameList['hbsl'].lanchscene
            || scree == this.app.gHandler.subGameList['zrsx1'].lanchscene
            || scree == this.app.gHandler.subGameList['pccp'].lanchscene) { //  真人视讯 红包扫雷 派彩 竖屏
            this.app.gHandler.reflect && this.app.gHandler.reflect.setOrientation("portrait")

        }
        cc.director.preloadScene(scree,()=>{
            cc.director.loadScene(scree);
        })
    }
    //进度列表
    jdlistClick(){
        if(this.checkFreeFruitResult.data.inviter.group){
            this.app.showFruitHistoryeAlert(this.checkFreeFruitResult.data.inviter.group)
        }else{
            this.app.showAlert(Language_pay.Lg.ChangeByText('当前没有未完成进度'))
        }
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
    closeAllAlert(){
        this.Alert1.active = false
        this.Alert2.active = false
        this.Alert3.active = false
    }
    getLocal(){
        let PaySendFruit_2jin = cc.sys.localStorage.getItem(`PaySendFruit_2jin_${this.app.UrlData.user_id}`)
        if(PaySendFruit_2jin){
            return false
        }else{
            return true
        }
    }
    setLocal(){
        cc.sys.localStorage.setItem(`PaySendFruit_2jin_${this.app.UrlData.user_id}`,JSON.stringify(true))
    }
    onDestroy(){
        this.bg2.active = false
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/SendFruit/bg')
        let yuyu_btn_join= cc.find('Canvas/Activity/Content/SendFruit/bg/yuyu_btn_join')
        let yuyu_zi_byqz= cc.find('Canvas/Activity/Content/SendFruit/bg/Content/yuyu_zi_byqz')
        let yuyu_zi_yqz= cc.find('Canvas/Activity/Content/SendFruit/bg/Content/yuyu_zi_yqz')
        let yuyu_zi_fhfs= cc.find('Canvas/Activity/Content/SendFruit/bg/Content/yuyu_zi_fhfs')
        let yuyu_event_p3= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/yuyu_event_p3')
        let btn_jdlist= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/btn_jdlist')
        let yuyu_zi_yhd= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/group/yuyu_zi_yhd')
        let yuyu_zi_jsg= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/group/yuyu_zi_jsg')
        let yuyu_btn_invite= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/yuyu_btn_invite')
        let yuyu_btn_ljth= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/yuyu_btn_ljth')
        let yuyu_title_mflsj= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/yuyu_title_mflsj')
        let zi_congrat= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert1/content/zi_congrat')
        let btn_invite= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert1/content/btn_invite')
        let btn_enterGame= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert1/content/btn_enterGame')
        let zi_congrat2= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert2/content/zi_congrat')
        let btn_pickUp= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert2/content/btn_pickUp')
        let zi_congrat3= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert3/content/zi_congrat')
        let btn_pickUp2= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert3/content/btn_pickUp')

        this.app.loadIconLg(`${src}/activeBigImage/yuyu_event_p1`,bg)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_btn_join`,yuyu_btn_join)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_zi_byqz`,yuyu_zi_byqz)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_zi_yqz`,yuyu_zi_yqz)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_zi_fhfs`,yuyu_zi_fhfs)
        this.app.loadIconLg(`${src}/activeBigImage/yuyu_event_p3`,yuyu_event_p3)
        this.app.loadIconLg(`${src}/activeSprite/btn_jdlist`,btn_jdlist)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_zi_yhd`,yuyu_zi_yhd)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_zi_jsg`,yuyu_zi_jsg)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_btn_invite`,yuyu_btn_invite)
        this.app.loadIconLg(`${src}/activeSprite/yuyu_btn_ljth`,yuyu_btn_ljth)
        this.app.loadIconLg(`${src}/title/yuyu_title_mflsj`,yuyu_title_mflsj)
        this.app.loadIconLg(`${src}/activeSprite/zi_congrat`,zi_congrat)
        this.app.loadIconLg(`${src}/activeSprite/btn_invite`,btn_invite)
        this.app.loadIconLg(`${src}/activeSprite/btn_enterGame`,btn_enterGame)
        this.app.loadIconLg(`${src}/activeSprite/zi_congrat`,zi_congrat2)
        this.app.loadIconLg(`${src}/activeSprite/btn_pickUp`,btn_pickUp)
        this.app.loadIconLg(`${src}/activeSprite/zi_congrat`,zi_congrat3)
        this.app.loadIconLg(`${src}/activeSprite/btn_pickUp`,btn_pickUp2)

        let label1 = cc.find('Canvas/Activity/Content/SendFruit/bg/label1').getComponent(cc.Label)
        let label2 = cc.find('Canvas/Activity/Content/SendFruit/bg/Content/label2').getComponent(cc.Label)
        let label3 = cc.find('Canvas/Activity/Content/SendFruit/bg/Content/label3').getComponent(cc.Label)
        let label4 = cc.find('Canvas/Activity/Content/SendFruit/bg/Content/label4').getComponent(cc.Label)
        let label5 = cc.find('Canvas/Activity/Content/SendFruit/bg/label5').getComponent(cc.Label)
        let label6= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/group2/label').getComponent(cc.Label)
        let label7= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert1/content/label1').getComponent(cc.Label)
        let label8= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert1/content/label2').getComponent(cc.Label)
        let label9= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert2/content/label1').getComponent(cc.Label)
        let label10= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert2/content/label2').getComponent(cc.Label)
        let label11= cc.find('Canvas/Activity/Content/SendFruit/SendFruit_bg2/Alert3/content/label').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("邀请好友一起玩游戏, 你和好友都可以获得包邮到家的免费水果哦, 水果满5斤即可邮寄。")
        label2.string = Language_pay.Lg.ChangeByText("一开始默认所有用户皆为被邀请者身份, 可进行被邀请者的相关任务。被邀请者在完成手机号及银行卡绑定后即可获得3斤水果; 之后在充值50元后任意进行一局游戏, 或邀请2名好友完成APP下载注册并绑定手机及银行卡, 即可立即满5斤发货。")
        label3.string = Language_pay.Lg.ChangeByText("成功生成至少一名下级的代理, 可获得邀请者身份进行相关任务。邀请3名好友完成APP下载注册并绑定手机及银行卡, 或3名好友任一名充值50元后任意进行一局游戏, 即可以获得5斤包邮到家的水果 (如果全部是高质量的游戏玩家, 水果价值更高哦) 。")
        label4.string = Language_pay.Lg.ChangeByText("玩家成功提交发货申请后, 达标审核通过自动发货, 水果根据邀请玩家的价值随机发送。")
        label5.string = Language_pay.Lg.ChangeByText("1. 邀请有效好友达五人以上时，按照邀请数，每邀请三名有效好友便可获得一次5斤水果。\n2. 本活动奖励仅保留同一用户进行领取。\n3. 如有异常操作，则进行冻结账号处理。\n4. 该活动发展的新玩家自动成为该玩家下线，享受代理收入。\n5. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利。")
        label6.string = Language_pay.Lg.ChangeByText("规则:\n1. 被邀请者在成功生成一名直属下级后, 将会同时获得邀请者的身份, 在完成被邀请者的相关任务后, 可接着进行邀请者的任务\n2. 本活动邀请的新玩家自动成为该代理的下线, 代理享受永久收益, 新玩家充值游戏, 代理所获得水果的价值越高\n3. 本活动奖励仅保留同一用户进行领取\n4. 如有异常操作, 则进行冻结账号处理\n5. 本活动最终解释权归平台所有, 平台有随时更改, 停止并取消该活动的权利")
        label7.string = Language_pay.Lg.ChangeByText("已经获得3斤水果")
        label8.string = Language_pay.Lg.ChangeByText("邀请两个人或者充值50元后玩一把游戏即可达到发货资格")
        label9.string = Language_pay.Lg.ChangeByText("已经获得2斤水果")
        label10.string = Language_pay.Lg.ChangeByText("点选下方按钮可以立即提货, 完成提货即可参加邀请者活动")
        label11.string = Language_pay.Lg.ChangeByText("恭喜获得5斤水果")
    }
}
