import { Language_pay } from "./../../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    lostAmountLabel: cc.Label[] = [];

    @property(cc.Label)
    bonusLabelTest: cc.Label[] = [];

    @property(cc.Label)
    LoseAmountTotal : cc.Label = null;

    @property(cc.Node)
    btnArr: cc.Node[] = [];

    info = []
    app = null
    activity_id = 13
    login_ip = ''
    received = false // 判断是否已领取
    payReceived_info = {
        Day:0,
        today_lose_statement:0,
        today_received_info:{},
    }
    setIdInfo(id,info){
        if(JSON.stringify(info) == "{}" || JSON.stringify(info) == ""){
            info = []
        }
        console.log(info)
        this.info = info.range
        this.info.forEach((item,index) => {
            this.lostAmountLabel[index].string = `${item.min_lose_gold}+`
            this.bonusLabelTest[index].string = item.bonus 
        });
        this.activity_id = id
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
       
        console.log(this.getLocal())
        if(this.getLocal()){
            this.app.hideLoading()
            this.renderBtn(this.payReceived_info.today_received_info)
        }else{
            this.getLoseGoldInfo()
        }
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
       this.setLanguageResource()
    }
    getLoseGoldInfo(){
        var url = `${this.app.UrlData.host}/api/activity/getLoseGoldInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                this.LoseAmountTotal.string = `${this.app.config.toDecimal(response.data.today_lose_total > 0 ?response.data.today_lose_total:0)}`
                if(response.data.today_received_info == '' && response.data.today_lose_total >this.info[0].min_lose_gold ){
                    let btnIndex = 0;
                    this.info.forEach((item,index)=>{
                       if(response.data.today_lose_total >= item.min_lose_gold) {
                           btnIndex = index
                       }
                   })
                   this.btnArr[btnIndex].active = true
                }else if(response.data.today_received_info != '' ){
                    this.btnArr.forEach(e=>{
                        e.active = false
                    })
                    
                   let received_info = JSON.parse(response.data.today_received_info)
                   this.setLocal(received_info)
                   this.renderBtn(received_info)
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    receiveFristPaymentGold(){
        var url = `${this.app.UrlData.host}/api/activity/loseGetGold?`;
        let dataStr  = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
        // let dataStr  = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
                this.getLoseGoldInfo()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    renderBtn(received_info){
        let level = received_info.level -1 // 前端的level从0开始
        this.btnArr[level].active = true
        this.btnArr[level].getChildByName("bg2").active = true // 显示已领取
        this.received = true;
        this.LoseAmountTotal.string = `${this.app.config.toDecimal(this.payReceived_info.today_lose_statement)}`
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(this.received){
            return this.app.showAlert(Language_pay.Lg.ChangeByText('今日已领取，请明天再来!'))
        }
        this.receiveFristPaymentGold()
    }

    /*
        * set 存储方法
        * @ param {String} 	key 键
        */
    setLocal(today_received_info) {
        this.payReceived_info.Day = new Date().getDate()
        this.payReceived_info.today_received_info = today_received_info
        this.payReceived_info.today_lose_statement = today_received_info.today_lose_statement
        cc.sys.localStorage.setItem(`PayReceived_info_${this.app.UrlData.user_id}`,JSON.stringify(this.payReceived_info))
    }
    getLocal(){
        let today = new Date().getDate()
        let Local_payReceived_info = cc.sys.localStorage.getItem(`PayReceived_info_${this.app.UrlData.user_id}`)
        if(Local_payReceived_info){
            let newinfo =  JSON.parse(Local_payReceived_info) 
            //如果天数相同，则数据有效
            console.log("2",newinfo)
            if(today == newinfo.Day ){
                this.payReceived_info = newinfo
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/DailyRescueGold/bg')
        let Layout= cc.find('Canvas/Activity/Content/DailyRescueGold/bg/Layout')

        this.app.loadIconLg(`${src}/activeBigImage/yuyu_mrjyj`,bg)
        this.app.loadIconLg(`${src}/activeSprite/frame_2`,Layout)

        this.btnArr.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_linqu`,e.getChildByName('bg1'))
            this.app.loadIconLg(`${src}/activeSprite/btn_Ylinqu`,e.getChildByName('bg2'))
        })
        let label1= cc.find('Canvas/Activity/Content/DailyRescueGold/bg/Content/ScrollView/view/content/label').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText("1. 本活动限定有充值记录， 且完成手机及银行卡绑定后才能参与\n2. 同一用户一天仅可领取一次救援金，若当天已领取过其中一个档位的救援金，将无法领取其他档位的救援金\n3. 亏损金额计算方式为当日游戏总输-当日游戏总赢(税前)，用户所领取的优惠金额 (如：赠送彩金、救援金…等) 将额外进行扣除\n4. 用户的亏损金额计算至当天的23:59:59，次日0点将进行重置 \n5. 需满足领取救援金额的一倍流水方可兑换\n6. 如有异常操作，则进行冻结账号处理\n7. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利 ")
    }
}
