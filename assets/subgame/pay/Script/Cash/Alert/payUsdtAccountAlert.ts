const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    accountInput: cc.EditBox = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    selectContent: cc.Node = null;

    app = null
    action = null
    itemId = null

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    public init(data){
        this.action = data.action;
        this.itemId = data.itemId;
    }

    changeContent(data){
        // this.accountInput.string = data.account_card;
        // this.account_nameInput.string = data.account_name;
    }
}
