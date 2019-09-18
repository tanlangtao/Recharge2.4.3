// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Config from "../Config"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    helpAlert: cc.Prefab = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    bank_nameLabel: cc.Label = null;

    @property(cc.Label)
    card_nameLabel: cc.Label = null;

    @property(cc.Label)
    card_numLabel: cc.Label = null;

    @property(cc.Label)
    nickNameLabel: cc.Label = null;

    @property(cc.Label)
    remarkLabel : cc.Label = null;

    @property(cc.Prefab)
    publicAlert : cc.Prefab = null;

    @property(cc.Node)
    fuzhiBtn4 : cc.Node = null;

    @property(cc.Node)
    popWindowBG : cc.Node = null;

    @property
    public results = {};
    public token = null;
    public config = null;
    public UrlData : any = [];
    app : any= {};

    public init(type,data){
        if(type ===1 ){
            this.popWindowBG.active=false;
            this.fetchOrder(data)
        }else{
            this.initRender(data)
        }
    }
    
    fetchOrder(data){
        var url = `${this.app.UrlData.host}/api/payment/bankCardTransfer`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${data.amount}&channel_id=${data.channel_id}&pay_type=${data.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_type=${data.order_type}&token=${this.app.token}&version=${this.app.version}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.popWindowBG.active=true;
                self.initRender(response);
            }else{
                self.app.showAlert(response.msg);
                self.removeSelf();
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    initRender(data){
        this.amountLabel.string = this.config.toDecimal(data.data.amount);
        this.bank_nameLabel.string = data.data.bank_name;
        this.card_nameLabel.string = data.data.card_name;
        this.card_numLabel.string = data.data.card_num;
        this.nickNameLabel.string = decodeURI(this.UrlData.user_name);
        this.remarkLabel.string = data.data.remark;
        if(this.remarkLabel.string == ''){
            this.fuzhiBtn4.removeFromParent();
        }
    }
    onLoad () {
        this.config = new Config();
        this.UrlData = this.config.getUrlData();
        this.token = this.config.token;

        this.app = cc.find('Canvas/Main').getComponent('Main');
    }

    copyCard_num(){
        //按键音效
        this.app.clickClip.play();
        
        if(this.app.UrlData.client != 'desktop'){
            //调用rn方法。
            this.app.Client.send("__setcopy", { text: this.card_numLabel.string});
            this.app.showAlert(`复制成功！${this.card_numLabel.string}`)
        }else{
            this.config.copyToClipBoard(this.card_numLabel.string);
        }
       
    }

    copyCard_name(){
        //按键音效
        this.app.clickClip.play();

        if(this.app.UrlData.client != 'desktop'){
            //调用rn方法。
            this.app.Client.send("__setcopy", { text: this.card_nameLabel.string});
            this.app.showAlert(`复制成功！${this.card_nameLabel.string}`)
        }else{
            this.config.copyToClipBoard(this.card_nameLabel.string);
        }
         
    }

    copyAmount(){
        //按键音效
        this.app.clickClip.play();

        if(this.app.UrlData.client != 'desktop'){
            //调用rn方法。
            this.app.Client.send("__setcopy", { text: this.amountLabel.string});
            this.app.showAlert(`复制成功！${this.amountLabel.string}`)
        }else{
            this.config.copyToClipBoard(this.amountLabel.string);
        }
    }

    copyRemark(){
        //按键音效
        this.app.clickClip.play();

        if(this.app.UrlData.client != 'desktop'){
            //调用rn方法。
            this.app.Client.send("__setcopy", { text: this.remarkLabel.string});
            this.app.showAlert(`复制成功！${this.remarkLabel.string}`)
        }else{
            this.config.copyToClipBoard(this.remarkLabel.string);
        }
    }
    
    removeSelf(){
        //按键音效
        this.app.clickClip.play();

        this.node.removeFromParent()
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();

        var node = cc.instantiate(this.helpAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
    }

    public showAlert(data){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('PublicAlert').init(data)
    }
    // update (dt) {}
}
