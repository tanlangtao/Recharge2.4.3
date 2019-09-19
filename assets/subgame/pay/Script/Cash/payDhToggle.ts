

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Prefab)
    Dh : cc.Prefab = null;

    @property(cc.Prefab)
    BankDh : cc.Prefab = null;

    @property(cc.Prefab)
    RgDh : cc.Prefab = null;
    
    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;

    @property
    app= null;
    text = null;

    public init(data){
        this.text=data.text;
        if(this.text == '支付宝兑换'){
            this.app.loadIcon('cash/menu/menu_ali_1',this.normalIcon,207,39)
            this.app.loadIcon('cash/menu/menu_ali_2',this.currentIcon,249,86);

        }else if(this.text == '银行卡兑换'){
            this.app.loadIcon('cash/menu/menu_union_2',this.normalIcon,207,39)
            this.app.loadIcon('cash/menu/menu_union_1',this.currentIcon,249,86)
        }else if(this.text == '人工兑换'){
            this.app.loadIcon('cash/menu/menu_rengong_1',this.normalIcon,207,39)
            this.app.loadIcon('cash/menu/menu_rengong_2',this.currentIcon,249,86)
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
        if(this.text == '支付宝兑换'){
            this.addContent('Dh')
        }else if(this.text == '银行卡兑换'){
            this.addContent('BankDh')
        }else if(this.text == '人工兑换'){
            this.addDh()
        }
    }

    addContent(data){
        var content = cc.find('Canvas/Cash/Content');
        if(data == 'Dh'){
            var node = cc.instantiate(this.Dh);
        }else if(data == 'BankDh'){
            var node = cc.instantiate(this.BankDh);
        }
        content.removeAllChildren();
        content.addChild(node);
    }
    addDh(){
        var content = cc.find('Canvas/Cash/Content');
        var node = cc.instantiate(this.RgDh);
        content.removeAllChildren();
        content.addChild(node);
    }
    // update (dt) {}
}
