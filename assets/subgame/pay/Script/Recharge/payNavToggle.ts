//充值导航

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    Zfb : cc.Prefab = null;

    @property(cc.Prefab)
    RgDc : cc.Prefab = null;
    
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

    public init(data){
        this.text=data.text;
        if(this.text == '支付宝'){
            this.app.loadIcon('recharge/menu/menu_alipay_1',this.normalIcon,207,39)
            this.app.loadIcon('recharge/menu/menu_alipay_2',this.currentIcon,249,86);
            this.app.loadIcon('recharge/menu/tishi',this.tishi,97,55);
            this.tishiLabel.string = '+1%';

        }else if(this.text == '转账到银行卡'){
            this.app.loadIcon('recharge/menu/menu_tobank_1',this.normalIcon,207,39)
            this.app.loadIcon('recharge/menu/menu_tobank_2',this.currentIcon,249,86)
        }else if(this.text == '银联扫码'){
            this.app.loadIcon('recharge/menu/menu_ylsm_1',this.normalIcon,207,39)
            this.app.loadIcon('recharge/menu/menu_ylsm_2',this.currentIcon,249,86)
        }else if(this.text == '微信'){
            this.app.loadIcon('recharge/menu/menu_wxpay_1',this.normalIcon,207,39)
            this.app.loadIcon('recharge/menu/menu_wxpay_2',this.currentIcon,249,86)

        }else if(this.text == '快捷支付'){
            this.app.loadIcon('recharge/menu/menu_kuaijie_1',this.normalIcon,207,39)
            this.app.loadIcon('recharge/menu/menu_kuaijie_2',this.currentIcon,249,86)
        }else if(this.text == '网银支付'){
            this.app.loadIcon('recharge/menu/menu_unionpay_1',this.normalIcon,207,39)
            this.app.loadIcon('recharge/menu/menu_unionpay_2',this.currentIcon,249,86)
        }else if(this.text == '人工代充值'){
            this.app.loadIcon('recharge/menu/menu_VIPpay_1',this.normalIcon,207,39)
            this.app.loadIcon('recharge/menu/menu_VIPpay_2',this.currentIcon,249,86)
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();
        this.app.showLoading();
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
        }else if(this.text == '人工代充值'){
            this.addDc()
        }
    }

    addContent(data){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.Zfb);
        node.getComponent('payZfb').init(data);
        content.removeAllChildren();
        content.addChild(node);
    }

    addDc(){
        var content = cc.find('Canvas/Recharge/Content');
        var node = cc.instantiate(this.RgDc);
        content.removeAllChildren();
        content.addChild(node);
    }

}