const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    walletAddressInput: cc.EditBox = null;

    @property(cc.Label)
    chanTypeLabel: cc.Label = null;

    @property(cc.Node)
    selectContent: cc.Node = null;

    app = null
    action = 'add'
    itemId = null

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.selectContent.active = false
        this.setLanguageResource()
    }

    public init(itemId){
        this.itemId = itemId;
    }
    onClick() {
        //按键音效
        this.app.loadMusic(1);
        //去掉输入中的空格
        var str = this.walletAddressInput.string.replace(/\s+/g,"");
        this.walletAddressInput.string = str;
        if(this.walletAddressInput.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('钱包地址不能为空!'))
        }else if(this.chanTypeLabel.string == ''|| this.chanTypeLabel.string == Language_pay.Lg.ChangeByText('请选择链类型')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('请选择链类型'))
        }else if(this.isChinese(this.walletAddressInput.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('钱包地址不能含有特殊字符!'))
        } else{
            this.fetchBindAccountPay();
            this.node.removeFromParent();
        }
    }
    selectClick(){
        this.selectContent.active = ! this.selectContent.active
    }
    selectItemClick(event){
        let eventlabel = event.target.getChildByName('label').getComponent(cc.Label).string
        this.chanTypeLabel.string = eventlabel
        this.selectContent.active = false
    }
    fetchBindAccountPay() {
        var url = `${this.app.UrlData.host}/api/payment_account/saveAccount`;
        let obj = {};
        obj = {
            wallet_addr:this.walletAddressInput.string,
            protocol:this.chanTypeLabel.string,
        };
        let info = JSON.stringify(obj);
        let dataStr = `user_id=${this.app.UrlData.user_id}&id=${this.itemId}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&type=4&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&center_auth=${this.app.login_token}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let bankCom = cc.find('Canvas/Cash/Content/UsdtDh').getComponent('payUsdtDh');
                bankCom.fetchIndex();
                self.app.showAlert(Language_pay.Lg.ChangeByText('操作成功!'))
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    removeSlef(){
        this.node.removeFromParent()
    }
    isChinese(s){
        var ret = false;
        for(var i = 0;i<s.length;i++){//遍历每一个文本字符bai
            //只要包含中文,就返回true
            if(s.charCodeAt(i) >= 10000){
                ret = true
            }
        }
        return ret
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let titleIcon= cc.find("Canvas/UsdtAccountAlert/Layout/titleIcon")
        let popup_usdt_frame= cc.find("Canvas/UsdtAccountAlert/Layout/content/popup_usdt_frame")
        let tishi= cc.find("Canvas/UsdtAccountAlert/Layout/tishi").getComponent(cc.Label)

        this.app.loadIconLg(`${src}/font/title_usdt`,titleIcon)
        this.app.loadIconLg(`${src}/form/popup_usdt_frame`,popup_usdt_frame)

        this.walletAddressInput.placeholder = Language_pay.Lg.ChangeByText('请输入钱包地址')
        this.chanTypeLabel.string = Language_pay.Lg.ChangeByText('请选择链类型')
        tishi.string = Language_pay.Lg.ChangeByText('温馨提示：绑定钱包地址后无法自行修改！请仔细填写您的钱包地址信息，如有错误将会导致您无法收到货币。')
    }
}
