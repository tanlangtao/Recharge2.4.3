

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property()
    timer = null;

    // LIFE-CYCLE CALLBACKS:
    public init(data){
        this.label.string = data.substring(0,80)
    }

    onLoad () {
        let app = cc.find('Canvas/Main').getComponent('payMain_10');
        if(app.UrlData.package_id == 16){
            this.timer = setTimeout(() => {
                this.node.destroy()
            }, 3000)
        }
    }
    // LoadNodes(){
    //     this.label = this.node.getChildByName('New Layout').children[1].getComponent(cc.Label)
    // }

    removeSelf(){
        this.node.destroy()
    }

    onDestroy(){
        clearTimeout(this.timer);
    }

    start () {

    }

    // update (dt) {}
}
