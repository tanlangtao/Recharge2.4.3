//兑换导航
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Prefab)
    Dh : cc.Prefab = null;

    @property(cc.Prefab)
    BankDh : cc.Prefab = null;

    @property(cc.Prefab)
    RgDh : cc.Prefab = null;

    @property(cc.Prefab)
    DhHistory : cc.Prefab = null;
    
    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;

    @property(cc.Prefab)
    UsdtDh : cc.Prefab = null;

    @property
    app= null;
    text = null;

    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.text=data.text;
        if(this.text == '支付宝兑换'){
            this.app.loadIcon(`${src}/menu/menu_ali_1`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/menu_ali_2`,this.currentIcon,249,86);

        }else if(this.text == '银行卡兑换'){
            this.app.loadIcon(`${src}/menu/menu_union_2`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/menu_union_1`,this.currentIcon,249,86)
        }else if(this.text == '人工兑换'){
            this.app.loadIcon(`${src}/menu/menu_rengong_1`,this.normalIcon,207,39)
            this.app.loadIcon(`${src}/menu/menu_rengong_2`,this.currentIcon,249,86)
        }else if(this.text == '兑换记录'){
            if(this.app.UrlData.package_id == 8){
                this.app.loadIcon(`${src}/menu/menu_dhhistory_1`,this.normalIcon,102,99)
            }else{
                this.app.loadIcon(`${src}/menu/menu_dhhistory_1`,this.normalIcon,242,86)
            }
            
            this.app.loadIcon(`${src}/menu/menu_dhhistory_2`,this.currentIcon,249,86)
        }else if(this.text == 'USDT兑换'){
            this.app.loadIcon(`${src}/menu/menu_usdtQb_1`,this.normalIcon,242,86)
            this.app.loadIcon(`${src}/menu/menu_usdtQb_2`,this.currentIcon,249,86)
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.app.showLoading();
        if(this.text == '支付宝兑换'){
            this.addContent('Dh')
        }else if(this.text == '银行卡兑换'){
            this.addContent('BankDh')
        }else if(this.text == '人工兑换'){
            this.addContent('RgDh')
        }else if(this.text == '兑换记录'){
            this.addContent('DhHistory')
        }else if(this.text == 'USDT兑换'){
            this.addContent('USDT')
        }
    }

    addContent(data){
        var content = cc.find('Canvas/Cash/Content');
        let scalex = cc.winSize.width / 1334;
        if(data == 'Dh'){
            var node = cc.instantiate(this.Dh);
            content.scaleY = 1;
        }else if(data == 'BankDh'){
            var node = cc.instantiate(this.BankDh);
            content.scaleY = 1;
        }else if(data == 'RgDh'){
            var node = cc.instantiate(this.RgDh);
            content.scaleY = 1;
        }else if(data == 'DhHistory'){
            var node = cc.instantiate(this.DhHistory);
            content.scaleY = 1/scalex;
        }else if(data == 'USDT'){
            var node = cc.instantiate(this.UsdtDh);
            content.scaleY = 1/scalex;
        }
        
        content.removeAllChildren();
        content.addChild(node);
    }
    // update (dt) {}
}
