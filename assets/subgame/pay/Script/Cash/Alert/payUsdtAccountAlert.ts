const {ccclass, property} = cc._decorator;

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
            this.app.showAlert('钱包地址不能为空!')
        }else if(this.chanTypeLabel.string == ''|| this.chanTypeLabel.string == `请选择链类型`){
            this.app.showAlert('请选择链类型！')
        }else if(this.isChinese(this.walletAddressInput.string)){
            this.app.showAlert('钱包地址不能含有特殊字符！')
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
        let dataStr = `user_id=${this.app.UrlData.user_id}&id=${this.itemId}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&type=4&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let bankCom = cc.find('Canvas/Cash/Content/UsdtDh').getComponent('payUsdtDh');
                bankCom.fetchIndex();
                self.app.showAlert('操作成功!')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
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
}
