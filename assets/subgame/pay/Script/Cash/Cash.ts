

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
    CashHistory: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content:cc.Node = null;

    @property()
    public results : any = {};
    public zfbResults : any = {};
    public app : any = {};

    //请求次数
    public idx  = 0;

    onLoad () {

        this.app = cc.find('Canvas/Main').getComponent('Main');

        this.fetchIndex();

    }

    start () {

        this.app.Client.send('__done',{},()=>{})
    }
    public exitBtnClick(){
        //按键音效
        this.app.clickClip.play();
        this.app.Client.send('__backtohall',{},()=>{})
    }

    public fetchIndex(){
        this.idx  = this.idx +1 ;

        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                self.results = response;
                self.addNavToggle()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    public historyBtnClick(){
        //按键音效
        this.app.clickClip.play();

        var node = cc.instantiate(this.CashHistory);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
    }

    public addNavToggle(){
        var arr = [];
        if(!this.results.data.withDraw_info) return;
        if(this.results.data.withDraw_info.artificial.is_close > 0){
            arr.push('人工兑换')
        }
        if(this.results.data.withDraw_info.bankcard.is_close > 0){
            arr.push('银行卡兑换')
        }
        if(this.results.data.withDraw_info.alipay.is_close > 0){
            arr.push('支付宝兑换')
        }
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('DhToggle').init({
                text:arr[i]
            })
        }
        //首次加载，顺序第一的显示
        if(arr[0]=='人工兑换'){
            node.getComponent('DhToggle').addDh()
        }else if(this.results.data.withDraw_info.bankcard.channel.length > 0){
            node.getComponent('DhToggle').addContent('BankDh')
        }else if(this.results.data.withDraw_info.alipay.channel.length > 0){
            node.getComponent('DhToggle').addContent('Dh')
        }
    }
    
}
