const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_20";
@ccclass
export default class NewClasss extends cc.Component {
    @property(cc.Node)
    titleIcon: cc.Node = null;

    @property(cc.EditBox)
    account_nameInput: cc.EditBox  = null;

    @property(cc.EditBox)
    accountInput: cc.EditBox  = null;

    parrentCom = null
    showSelect = false;
    action = 'add';
    itemId = null;
    app = null;

    public init(data){
        this.action = data.action;
        this.itemId = data.itemId;
        this.parrentCom = data.parrentCom
    }

    changeContent(data){
        this.accountInput.string = data.account_card;
        this.account_nameInput.string = data.account_name;
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_20');
        this.accountInput.node.on('text-changed',(e)=>{
            e.string=e.string.replace(/[^\a-\z\A-\Z0-9\?\.\@\+\$]/g,'')
        })
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);

        if(this.accountInput.string == ''
            || this.account_nameInput.string == '')
        {
            this.app.showAlert(Language_pay.Lg.ChangeByText('输入不能为空!'))
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
            account_name:this.account_nameInput.string,
        };
        let info = JSON.stringify(obj);
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&withdraw_type=1&type=2&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.parrentCom.fetchIndex();
                self.app.showAlert(Language_pay.Lg.ChangeByText('操作成功!'))
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }

    deleteAccount_name(){
        //按键音效
        this.app.loadMusic(1);

        this.account_nameInput.string = '';
    }

    deleteAccount(){
        //按键音效
        this.app.loadMusic(1);

        this.accountInput.string = '';
    }
    
    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
}
