//充值导航

const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_25";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Zfb : cc.Prefab = null;

    @property(cc.Prefab)
    Jisu : cc.Prefab = null;

    @property(cc.Prefab)
    Jisu2 : cc.Prefab = null;
    
    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;
    
    @property(cc.Node)
    tishi : cc.Node = null;

    @property(cc.Label)
    tishiLabel : cc.Label =null;
    @property
    text = null;
    app = null;

    public init(data,discount_rate){
        let src = Language_pay.Lg.getLgSrc()
        this.text=data.text;
        this.app.loadIcon(`${src}/menu/tishi`,this.tishi,97,55);
        let zi = cc.find( "zi" , this.node );

        if(this.text == '支付宝'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "支付宝充值");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "支付宝充值"); 
            let percent = 0
            discount_rate.alipay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '转账到银行卡'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "转账到银行卡");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "转账到银行卡");  
            let percent = 0
            discount_rate.bankcard_transfer.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '银联扫码'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "银联扫码");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "银联扫码");  
            let percent = 0
            discount_rate.union_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '微信'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信支付");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "微信支付");  
            let percent = 0
            discount_rate.wechat_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '快捷支付'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "快捷支付");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "快捷支付");  
            let percent = 0
            discount_rate.quick_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '网银支付'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银支付");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "网银支付");  
            let percent = 0
            discount_rate.bank_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '人工代充值'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "人工代充值");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "人工代充值"); 
            let percent = 0
            discount_rate.daichong.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == 'IM充值'){
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "IM充值");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "IM充值");  
            let percent = 0
            discount_rate.im_pay.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == 'USDT'){
            let percent = 0
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT钱包");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "USDT钱包");  
            discount_rate.usdt.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == '极速充值' || this.text == "极速充值2"){
            let percent = 0
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
            discount_rate.usdt.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }else if(this.text == "匹配充值"){
            let percent = 0
            this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值");  
            this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "匹配充值");  
            discount_rate.usdt.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        } else if(this.text == "极速充值iframe"){
            let percent = 0
            if(this.app.UrlData.package_id == 9){
                zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速充值");  
            }else if(this.app.UrlData.package_id == 15||this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22 || this.app.UrlData.package_id == 25){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
            }else if(this.app.UrlData.package_id == 18){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值"); 
            }else if(this.app.UrlData.package_id == 16 || this.app.UrlData.package_id == 29){
                this.normalIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值");  
                this.currentIcon.getComponent(cc.Label).string = Language_pay.Lg.ChangeByText( "极速充值"); 
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/jisu2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/jisu1`,currentIcon,44,44);
            }else
            {
                this.app.loadIcon(`${src}/menu/menu_jscz_1`,this.normalIcon,207,39);
                this.app.loadIcon(`${src}/menu/menu_jscz_2`,this.currentIcon,249,86);
            }
            discount_rate.usdt.forEach( (e,i) => {
                if(e.package_id == this.app.UrlData.package_id) {
                    percent = e.interval[0].percent
                }
            });
            this.setTishiLabel(percent)
        }
    }
    setTishiLabel(percent) {
        this.tishiLabel.string = `${percent * 100} %`;
        if (percent == 0){
            this.tishi.active = false
        }else{
            this.tishi.active = true
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_25');
        this.showAnimate()
    }
    showAnimate(){
        if(this.app.UrlData.package_id == 16){
            this.node.parent.children.forEach(e=>{
                let isChecked = e.getComponent(cc.Toggle).isChecked
                if (isChecked){
                    e.getChildByName("checkmark").active = true
                    e.getChildByName("Background").active = false
                }else{
                    e.getChildByName("checkmark").active = false
                    e.getChildByName("Background").active = true
                }
            })
        }
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.app.showLoading();
        this.showAnimate()
        if(this.text == '支付宝'){
            this.addContent('alipay')

        }else if(this.text == '转账到银行卡'){
            this.addContent('bankcard_transfer')
        }else if(this.text == '银联扫码'){
            this.addContent('union_pay')
        }else if(this.text == '微信'){
            this.addContent('wechat_pay')

        }else if(this.text == '快捷支付'){
            this.addContent('quick_pay')

        }else if(this.text == '网银支付'){
            this.addContent('bank_pay')
        }if(this.text == 'IM充值'){
            this.addContent('im_pay')
        }else if(this.text == 'USDT'){
            this.addContent('digiccy')
        }else if(this.text == '极速充值'){
            this.addJisu("极速充值")
        }else if(this.text == '极速充值2'){
            this.addJisu("极速充值2")
        }else if(this.text == '匹配充值'){
            this.addJisu2()
        }else if(this.text == "极速充值iframe"){
            this.addContent2("JisuIframe")
        }
    }
    addContent2(data){
        var content = cc.find('Canvas/Recharge/Content');
        this.app.loadBundlePrefab(`Prefab/${data}`,(Prefab)=>{
            if(Prefab){ 
                var node = cc.instantiate(Prefab);
                content.removeAllChildren();
                content.addChild(node);
            }
        })
    }
    addContent(data){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.Zfb);
        node.getComponent('payZfb_25').init(data);
        content.removeAllChildren();
        content.addChild(node);
    }

    addJisu(channel = "极速充值"){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.Jisu);
        content.removeAllChildren();
        node.getComponent("payJisu_25").init(channel);
        content.addChild(node);
    }
    addJisu2(){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.Jisu2);
        content.removeAllChildren();
        content.addChild(node);
    }
}
