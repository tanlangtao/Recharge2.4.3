//兑换导航
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_16";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;

    @property(cc.Node)
    tishi : cc.Node = null;

    @property(cc.Label)
    tishiLabel : cc.Label =null;

    @property
    app= null;
    text = null;
    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.text=data.text;
        if( cc.isValid(this.tishi ) )
        {
            this.app.loadIcon(`${src}/menu/tishi`,this.tishi,97,55);
        } 
        if(this.text == '银行卡兑换'){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
            let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
            let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
            this.app.loadIcon(`${src}/menu/tixiandaoyinhj2`,normalIcon,44,44);
            this.app.loadIcon(`${src}/menu/tixiandaoyinhj`,currentIcon,44,44);
        }else if(this.text == '银行卡管理'){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡管理");
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡管理");
            let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
            let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
            this.app.loadIcon(`${src}/menu/yinhangkaguanli`,normalIcon,44,44);
            this.app.loadIcon(`${src}/menu/yinhangkaguanli2`,currentIcon,44,44);
        }else if(this.text == 'USDT兑换'){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT兑换");
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT兑换");
            let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
            let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
            this.app.loadIcon(`${src}/menu/usdtcz2`,normalIcon,44,44);
            this.app.loadIcon(`${src}/menu/usdtcz1`,currentIcon,44,44);
        }else if(this.text == '极速兑换'|| this.text == "极速兑换2"){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
            let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
            let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
            this.app.loadIcon(`${src}/menu/jisu2`,normalIcon,44,44);
            this.app.loadIcon(`${src}/menu/jisu1`,currentIcon,44,44);
        }else if(this.text == '匹配兑换'){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配兑换");
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配兑换");
            let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
            let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
            this.app.loadIcon(`${src}/menu/menu_pipei2`,normalIcon,44,44);
            this.app.loadIcon(`${src}/menu/menu_pipei1`,currentIcon,44,44);
        }else if(this.text == '赠送'){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "账户内互转");
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "账户内互转");
            let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
            let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
            this.app.loadIcon(`${src}/menu/zhnhz2`,normalIcon,44,44);
            this.app.loadIcon(`${src}/menu/zhnhz1`,currentIcon,44,44);
        }else{
            this.node.removeFromParent()
        }
    }
    setTishiLabel(percent) {
        cc.log("payDhToggle" , this.text , ' percent=',percent);
        this.tishiLabel.string = `${percent * 100} %`;
        if (percent == 0){
            this.tishi.active = false
        }else{
            this.tishi.active = true
        }
    }
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_16');
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
        if(this.text == '支付宝兑换'){
            this.addContent('Dh');
        }else if(this.text == '银行卡兑换'){
            this.addContent('BankDh');
        }else if(this.text == '人工兑换'){
            this.addContent('RgDh');
        }else if(this.text == '兑换记录'){
            this.addContent('DhHistory');
        }else if(this.text == 'USDT兑换'){
            this.addContent('UsdtDh');
        }else if(this.text == "极速兑换"){
            this.addContent("JisuDh")
        }else if(this.text == "极速兑换2"){
            this.addContent("JisuDh","极速兑换2")
        }else if(this.text == "匹配兑换"){
            this.addContent("JisuDh2")
        }else if(this.text == "赠送"){
            this.addContent("GiveDh")
        }else if(this.text == "赠送记录"){
            this.addContent("GiveDhHistory")
        }
    }
    addContent(data,jisu = ""){
        var content = cc.find('Canvas/Cash/Content');
        this.app.loadBundlePrefab(`Prefab/${data}`,(Prefab)=>{
            if(Prefab){ 
                var node = cc.instantiate(Prefab);
                if(jisu == "极速兑换2"){
                    node.getComponent("payJisuDh_16").init("极速兑换2")
                }else if(data == "JisuDh"){
                    node.getComponent("payJisuDh_16").init("极速兑换")
                }
                content.removeAllChildren();
                content.addChild(node);
            }
        })
    }
    // update (dt) {}
}
