

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    titleIcon: cc.Node = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.EditBox)
    accountInput: cc.EditBox = null;

    @property(cc.EditBox)
    firstNameInput: cc.EditBox = null;

    @property(cc.EditBox)
    lastNameInput: cc.EditBox = null;

    @property()
    showSelect = false;
    action = 'add';
    itemId = null;
    app = null;

    public init(data){

        let iconPath = data.text =='设置支付宝' ? 'cash/title_szzfb' :'cash/title_xgzfb';
        this.app.loadIcon(iconPath,this.titleIcon,283,51);
        this.action = data.action;
        this.itemId = data.itemId;
    }

    changeContent(data){
        this.accountInput.string = data.account_card;
        this.nameLabel.string = data.account_name;
        this.firstNameInput.string = data.account_surname;
        this.lastNameInput.string = data.account_first_name;
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.app.getPublicInput(this.accountInput,1);
        this.app.getPublicInput(this.firstNameInput,2);
        this.app.getPublicInput(this.lastNameInput,2);
        this.firstNameInput.node.on('text-changed',()=>{
            this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`
        })
        this.lastNameInput.node.on('text-changed',()=>{
            this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`
        })
        
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();

        if(this.accountInput.string == ''
            || this.firstNameInput.string == ''
            || this.lastNameInput.string == '' )
        {
            this.app.showAlert('输入不能为空!')
        }else{
            this.fetchBindAccountPay();
            this.node.removeFromParent();
        }
    }

    fetchBindAccountPay(){
        let url = `${this.app.UrlData.host}/api/payment_account/saveAccount`;
        let obj = {};
        obj = {
            account_card:this.accountInput.string,
            account_surname:this.firstNameInput.string,
            account_first_name:this.lastNameInput.string,
            account_name:this.nameLabel.string,
            pay_url:'',
        };
        let info = JSON.stringify(obj);
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&withdraw_type=1&type=2&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let zfbCom = cc.find('Canvas/Cash/Content/Dh').getComponent('payDh');
                zfbCom.fetchIndex();
                self.app.showAlert('操作成功!')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    deleteFirstName(){
        //按键音效
        this.app.clickClip.play();

        this.firstNameInput.string = '';
        this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`
    }

    deleteLastName(){
        //按键音效
        this.app.clickClip.play();

        this.lastNameInput.string = '';
        this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`;
    }

    deleteAccount(){
        //按键音效
        this.app.clickClip.play();

        this.accountInput.string = '';
    }
    
    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
    }
    // update (dt) {}
}
