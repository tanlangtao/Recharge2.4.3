import Config from "../Config";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Prefab)
    RechargeHistory: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content: cc.Node = null;

    @property()
    public results: any = {};
    public zfbResults: any = {};
    public app  = null;
    //请求次数
    public idx  = 0;
    // LIFE-CYCLE CALLBACKS:


    onLoad() {

        this.app = cc.find('Canvas/Main').getComponent('Main');
        //请求支付宝
        this.fetchZfb()
    }

    start() {

        this.app.Client.send('__done',{},()=>{})
    }

    public exitBtnClick() {
        //按键音效
        this.app.clickClip.play();
        this.app.Client.send('__backtohall',{},()=>{})
    }

    public historyBtnClick() {
        //按键音效
        this.app.clickClip.play();
        var node = cc.instantiate(this.RechargeHistory);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
    }

    public fetchZfb() {
        this.idx  = this.idx +1 ;
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&version=${this.app.version}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if (response.status == 0) {
                self.zfbResults = response;
                //动态渲染左侧导航
                self.addNavToggle()

            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    public addNavToggle() {
        var arr = ['人工代充值'];
        if (this.zfbResults.data.alipay.length > 0 ) {
            arr.push('支付宝')
        }
        if (this.zfbResults.data.bankcard_transfer.length > 0 ) {
            arr.push('转账到银行卡')
        }
        if (this.zfbResults.data.union_pay.length > 0 ) {
            arr.push('银联扫码')
        }
        if (this.zfbResults.data.wechat_pay.length > 0 ) {
            arr.push('微信')
        }
        if (this.app.UrlData.client=='desktop' && this.zfbResults.data.quick_pay.length > 0 ) {
            arr.push('快捷支付')
        }
        if (this.app.UrlData.client=='desktop' && this.zfbResults.data.bank_pay.length > 0  ) {
            arr.push('网银支付')
        }
        // arr.push('交易所')
        for (let i: number = 0; i < arr.length; i++) {
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('NavToggle').init({
                text: arr[i]
            })
        }
        //首次加载，顺序第一的显示
        if(arr[0]=='人工代充值'){
            node.getComponent('NavToggle').addDc()
        }else if(this.zfbResults.data.alipay.length > 0  ){
            node.getComponent('NavToggle').addContent('alipay')

        }else if(this.zfbResults.data.bankcard_transfer.length > 0 ){
            node.getComponent('NavToggle').addContent('bankcard_transfer')

        }else if(this.zfbResults.data.union_pay.length > 0 ){
            node.getComponent('NavToggle').addContent('union_pay')

        }else if(this.zfbResults.data.wechat_pay.length > 0 ){
            node.getComponent('NavToggle').addContent('wechat_pay')

        }else if(this.app.UrlData.client=='desktop' && this.zfbResults.data.quick_pay.length > 0){
            node.getComponent('NavToggle').addContent('quick_pay')

        }else if(this.app.UrlData.client=='desktop' && this.zfbResults.data.bank_pay.length > 0  ){
            node.getComponent('NavToggle').addContent('bank_pay')
        }
    }

}
