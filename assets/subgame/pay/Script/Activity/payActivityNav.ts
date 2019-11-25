
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    normalIcon: cc.Node = null;

    @property(cc.Node)
    currentIcon: cc.Node = null;

    @property(cc.Prefab)
    ChuangGuan : cc.Prefab = null;

    @property(cc.Prefab)
    HuoDong : cc.Prefab = null;

    @property
    app = null;
    name = null;
    id = null ;
    data = null;
    public init(data){
        this.name =data.name;
        this.id = data.id;
        this.data = data;
        //显示导航
        if(data.name == '流水闯关活动'){
            this.app.loadIcon('cash/menu/menu_ali_1',this.normalIcon,242,86)
            this.app.loadIcon('cash/menu/menu_ali_2',this.currentIcon,249,86);
        }else if(data.name == '存送活动'){
            this.app.loadIcon('cash/menu/menu_ali_1',this.normalIcon,242,86)
            this.app.loadIcon('cash/menu/menu_ali_2',this.currentIcon,249,86);
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    onClick(){
        this.app.showLoading();
        if(this.name == '流水闯关活动'){
            this.addContent('ChuangGuan',JSON.parse(this.data.info).type,this.id)
        }else if(this.name == '存送活动'){
            this.addContent('HuoDong',JSON.parse(this.data.info).type,this.id)
        }
    }

    addContent(data,type,id){
        var content = cc.find('Canvas/Activity/Content');
        if(data == 'ChuangGuan'){
            var node = cc.instantiate(this.ChuangGuan);
            content.removeAllChildren();
            content.addChild(node);
            node.getComponent('ChuangGuan').setId(id,'流水闯关活动');
        }else if(data == 'HuoDong'){
            var node = cc.instantiate(this.HuoDong);
            content.removeAllChildren();
            content.addChild(node);
        }
    }
    // update (dt) {}
}
