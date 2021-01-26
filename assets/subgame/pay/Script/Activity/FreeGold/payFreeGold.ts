import payMain from '../../payMain'
import { Language_pay } from "./../../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel : cc.Label = null

    @property(cc.Label)
    getGoldLabel: cc.Label = null

    @property(cc.Label)
    numLabel :cc.Label = null

    app :payMain= null;
    activity_id = 0;//活动id
    last_num  = ''; //剩余次数
    amount = 0;
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        this.setLanguageResource()
    }

    public setIdInfo(id,info){
        cc.log(id,info)
        this.amount = info.account_balance;
        this.activity_id = id;
        this.amountLabel.string = info.account_balance
        this.getGoldLabel.string = info.money
    }
    
    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/getAlmsNum`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&token=${this.app.token}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.last_num = response.data.last_num;
                this.numLabel.string = this.last_num;
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }

    public fetchGold(){
        let url = `${this.app.UrlData.host}/api/activity/getAlms`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&token=${this.app.token}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                cc.log('领取成功!',response)
                this.last_num = response.data.last_num;
                this.numLabel.string = this.last_num;
                self.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    onClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号!'))
            return
        }
        if(Number(this.last_num)<=0) {
            this.app.showAlert(Language_pay.Lg.ChangeByText('免费金币次数已领完，请明天再来吧!'))
            return
        }
        if(this.app.gHandler.gameGlobal.player.gold >= this.amount) {
            this.app.showAlert(Language_pay.Lg.ChangeByText('金币余额不符合领取规则!'))
            return
        }
        this.fetchGold()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/FreeGold/bg')
        let event_alms_t2= cc.find('Canvas/Activity/Content/FreeGold/bg/content/group1/event_alms_t2')
        let event_alms_t1= cc.find('Canvas/Activity/Content/FreeGold/bg/content/group2/event_alms_t1')
        let event_alms_t3= cc.find('Canvas/Activity/Content/FreeGold/bg/content/group3/event_alms_t3')
        let alms_btn_lingqu= cc.find('Canvas/Activity/Content/FreeGold/bg/alms_btn_lingqu')
        
        this.app.loadIconLg(`${src}/activeBigImage/event_alms`,bg)
        this.app.loadIconLg(`${src}/activeSprite/event_alms_t2`,event_alms_t2)
        this.app.loadIconLg(`${src}/activeSprite/event_alms_t1`,event_alms_t1)
        this.app.loadIconLg(`${src}/activeSprite/event_alms_t3`,event_alms_t3)
        this.app.loadIconLg(`${src}/activeSprite/btn_alms`,alms_btn_lingqu)
       
        let label= cc.find('Canvas/Activity/Content/FreeGold/bg/label').getComponent(cc.Label)

        label.string = Language_pay.Lg.ChangeByText('* 注：请先绑定手机及银行卡')
    }   
}
