
const {ccclass, property} = cc._decorator;

import { Language_pay } from "./../../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Group: cc.Node[] = [];
    
    info = []//配置信息
    activity_id = 0
    app = null
    
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.info.forEach((item,index) => {
            let bonusLabel = this.Group[index].getChildByName("bonus").getComponent(cc.Label)
            let commissionLabel = this.Group[index].getChildByName("commission").getComponent(cc.Label)
            bonusLabel.string = item.bonus
            commissionLabel.string = `${Math.floor(item.minincome)} +`
        });
        this.setLanguageResource()
    }
    setIdInfo(id,info){
        this.activity_id = id
        this.info = info
        cc.log(this.info)
    }
    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/proxyApplyIncome`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                console.log("当前佣金:",response.data.current_income,"是否已领取：",response.data.can_receive == 0 ?'未领取':"已领取")
                let CurrentIndex = -1;
                this.info.forEach((item,index) => {
                    if(response.data.current_income >= item.minincome){
                        CurrentIndex = index
                    }
                    this.Group[index].getChildByName("btn").active  = false
                    this.Group[index].getChildByName("btnDone").active  = false
                });
                if(CurrentIndex < 0 ){return}
                //显示按钮
                if(response.data.can_receive == 0){
                    // 默认值 0  1 已领取过
                    this.Group[CurrentIndex].getChildByName("btn").active  = true
                }else{
                    this.Group[CurrentIndex].getChildByName("btnDone").active  = true
                }
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    fetchPayBonus(){
        var url = `${this.app.UrlData.host}/api/activity/proxyPayBonus`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.app.showAlert("领取成功！")
                this.fetchIndex()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        this.fetchPayBonus()
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/OnceWeekGift/bg')
        let kuang= cc.find('Canvas/Activity/Content/OnceWeekGift/bg/kuang')
        let event_weeklyCms_rules= cc.find('Canvas/Activity/Content/OnceWeekGift/bg/event_kuang1/event_weeklyCms_rules')

        this.app.loadIconLg(`${src}/activeBigImage/event_weeklyCms_content`,bg)
        this.app.loadIconLg(`${src}/activeSprite/event_weeklyCms_frames`,kuang)
        this.app.loadIconLg(`${src}/activeSprite/event_weeklyCms_rules`,event_weeklyCms_rules)
        this.Group.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/btn_lingqu`,e.getChildByName('btn'))
            this.app.loadIconLg(`${src}/activeSprite/btn_lingqu_done`,e.getChildByName('btnDone'))
        })

        let label= cc.find('Canvas/Activity/Content/OnceWeekGift/bg/event_kuang1/label').getComponent(cc.Label)

        label.string = Language_pay.Lg.ChangeByText("1. 每周总领取佣金福利, 例如一周总领取佣金1万, 奖励300元。\n2. 若总领佣金未超过3万, 依旧按照300元奖励, 以此类推。\n3. 每周一到本周日为一个结算周期, 满足条件则可领取, 领取时间段为下个周一到周日。")
    }
}
