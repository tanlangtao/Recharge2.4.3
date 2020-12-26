

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    app  = null;

    parentComponent = null;
    init(component){
        this.parentComponent = component
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        //payBankDh
        this.parentComponent.showAccountAlert();

        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    // update (dt) {}
}
