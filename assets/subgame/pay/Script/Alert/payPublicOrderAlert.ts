
import Config from "../payConfig"
import { Language_pay } from "./../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    helpAlert: cc.Prefab = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    bank_nameLabel: cc.Label = null;

    @property(cc.Label)
    card_nameLabel: cc.Label = null;

    @property(cc.Label)
    card_numLabel: cc.Label = null;

    @property(cc.Label)
    nickNameLabel: cc.Label = null;

    @property(cc.Label)
    remarkLabel : cc.Label = null;

    @property(cc.Prefab)
    publicAlert : cc.Prefab = null;

    @property(cc.Node)
    fuzhiBtn4 : cc.Node = null;

    @property(cc.Node)
    popWindowBG : cc.Node = null;

    @property
    public results = {};
    public token = null;
    public config = null;
    public UrlData : any = [];
    app : any= {};

    public init(type,data){
        console.log(type,data)
        if(type ===1 ){
            this.popWindowBG.active=false;
            this.fetchOrder(data)
        }else{
            this.initRender(data)
        }
    }
    
    fetchOrder(data){
        var url = `${this.app.UrlData.host}/api/payment/bankCardTransfer`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${data.amount}&channel_id=${data.channel_id}&pay_type=${data.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_type=${data.order_type}&token=${this.app.token}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.popWindowBG.active=true;
                self.initRender(response);
            }else{
                self.app.showAlert(response.msg);
                self.removeSelf();
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    initRender(data){
        this.amountLabel.string = this.config.toDecimal(data.data.amount);
        this.bank_nameLabel.string = data.data.bank_name;
        this.card_nameLabel.string = data.data.card_name;
        this.card_numLabel.string = data.data.card_num;
        this.nickNameLabel.string = data.data.user_name;
    }
    onLoad () {
        this.config = new Config();
        this.UrlData = this.config.getUrlData();
        this.token = this.config.token;

        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }

    copyCard_num(){
        //按键音效
        this.app.loadMusic(1);
        
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.card_numLabel.string)) {
                this.app.showAlert(`复制成功!:${this.card_numLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
       
    }

    copyCard_name(){
        //按键音效
        this.app.loadMusic(1);
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.card_nameLabel.string)) {
                this.app.showAlert(`复制成功!:${this.card_nameLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }

    copyAmount(){
        //按键音效
        this.app.loadMusic(1);

        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.amountLabel.string)) {
                this.app.showAlert(`复制成功!:${this.amountLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }

    copyBankName(){
        //按键音效
        this.app.loadMusic(1);
        if (this.app.gHandler.reflect) {
            if (this.app.gHandler.reflect.setClipboard(this.bank_nameLabel.string)) {
                this.app.showAlert(`复制成功!:${this.bank_nameLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }
    
    removeSelf(){
        //按键音效
        this.app.loadMusic(1);

        this.node.removeFromParent()
    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);

        var node = cc.instantiate(this.helpAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
    }

    public showAlert(data){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payPublicAlert').init(data)
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let title_orderinfo= this.node.getChildByName('Content').getChildByName('title_orderinfo')
        let txt_chongzhifangshi= this.node.getChildByName('Content').getChildByName('group').getChildByName('group1').getChildByName('txt_chongzhifangshi')
        let txt_shoukuanyinhang= this.node.getChildByName('Content').getChildByName('group').getChildByName('group1').getChildByName('txt_shoukuanyinhang')
        let txt_shoukuanzhanghao= this.node.getChildByName('Content').getChildByName('group').getChildByName('group1').getChildByName('txt_shoukuanzhanghao')
        let txt_shoukuanxingming= this.node.getChildByName('Content').getChildByName('group').getChildByName('group1').getChildByName('txt_shoukuanxingming')
        let txt_zhuanzhuangjie= this.node.getChildByName('Content').getChildByName('group').getChildByName('group1').getChildByName('txt_zhuanzhuangjie')
        let txt_beizhu2= this.node.getChildByName('Content').getChildByName('group').getChildByName('group1').getChildByName('txt_beizhu2')
        let txt_playername= this.node.getChildByName('Content').getChildByName('group').getChildByName('txt_playername')
        let btn_fuzhi1= this.node.getChildByName('Content').getChildByName('group').getChildByName('btn_fuzhi1')
        let btn_fuzhi2= this.node.getChildByName('Content').getChildByName('group').getChildByName('btn_fuzhi2')
        let btn_fuzhi3= this.node.getChildByName('Content').getChildByName('group').getChildByName('btn_fuzhi3')
        let btn_fuzhi4= this.node.getChildByName('Content').getChildByName('group').getChildByName('btn_fuzhi4')
        let attention= this.node.getChildByName('Content').getChildByName('attention').getComponent(cc.Label)
        let label1= this.node.getChildByName('Content').getChildByName('label1').getComponent(cc.Label)
        let label2= this.node.getChildByName('Content').getChildByName('label2').getComponent(cc.RichText)
        let label4= this.node.getChildByName('Content').getChildByName('label4').getComponent(cc.Label)
        let label5= this.node.getChildByName('Content').getChildByName('label5').getComponent(cc.Label)
        let label6= this.node.getChildByName('Content').getChildByName('label6').getComponent(cc.Label)
        let btn1= this.node.getChildByName('Content').getChildByName('btn1')

        this.app.loadIconLg(`${src}/font/title_orderinfo`,title_orderinfo)
        this.app.loadIconLg(`${src}/font/txt_chongzhifangshi`,txt_chongzhifangshi)
        this.app.loadIconLg(`${src}/font/txt_shoukuanyinhang`,txt_shoukuanyinhang)
        this.app.loadIconLg(`${src}/font/txt_shoukuanzhanghao`,txt_shoukuanzhanghao)
        this.app.loadIconLg(`${src}/font/txt_shoukuanxingming`,txt_shoukuanxingming)
        this.app.loadIconLg(`${src}/font/txt_zhuanzhuangjie`,txt_zhuanzhuangjie)
        this.app.loadIconLg(`${src}/font/txt_beizhu2`,txt_beizhu2)
        this.app.loadIconLg(`${src}/font/txt_playername`,txt_playername)
        this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi1)
        this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi2)
        this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi3)
        this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi4)

        if(this.app.UrlData.package_id == 8){
            btn_fuzhi1.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
            btn_fuzhi2.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
            btn_fuzhi3.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")
            btn_fuzhi4.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText("复 制")

        }else{
            this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi1)
            this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi2)
            this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi3)
            this.app.loadIconLg(`${src}/font/btn_fuzhi`,btn_fuzhi4)
        }
        this.app.loadIconLg(`${src}/font/btn_how`,btn1)
        
        attention.string = `${Language_pay.Lg.ChangeByText('特别提醒:')}`
        label1.string = `${Language_pay.Lg.ChangeByText('1.支持各种银行，支付宝，微信的银行卡转账；')}`
        label2.string = `<color=#FF3333>${Language_pay.Lg.ChangeByText('2.支付时输入金额与转账金额一致')},</c><color=#F3C612> ${Language_pay.Lg.ChangeByText('（包含小数点后2位数字）')}</c>。`
        label4.string = `${Language_pay.Lg.ChangeByText('禁止修改金额，否则不到账；')}`
        label5.string = `${Language_pay.Lg.ChangeByText('3.以上收款账号限本次使用，账户不定期更换，每次支付前请依照本页所显示的银行账户付款;')}`
        label6.string = `${Language_pay.Lg.ChangeByText('4.正常付款1-5分钟内到账，未到账请联系客服。')}`
    }
    // update (dt) {}
}
