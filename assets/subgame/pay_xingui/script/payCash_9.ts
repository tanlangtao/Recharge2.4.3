//兑换首页
import { Language_pay } from "./payLanguage_9";
const {ccclass, property} = cc._decorator;

@ccclass
export default class payCash extends cc.Component {

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content:cc.Node = null;
    @property()
    public results : any = {};
    public zfbResults : any = {};
    public app : any = {};
    timer = null;
    canExit= null;
    sxAmount = 0 //受限金额
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_9');
        this.fetchIndex();
        //设置延迟，避免用户频繁操作导致报错
        this.timer = setTimeout(() => {
            this.canExit = true;
            clearTimeout(this.timer)
        }, 1000);
        let scalex = cc.winSize.width / 1334;
        console.log("scalex",scalex);
        if(this.app.UrlData.package_id != 16){
            if(scalex >1.1){
                this.Content.scaleY = scalex/1.1;
            }
            this.node.scaleX = scalex;
        }
        if(this.app.UrlData.package_id == 9)
        {  
            let fanhui = cc.find("header/fanhui",this.node);
            fanhui.scaleY/=this.node.scaleY;
            fanhui.scaleX/=this.node.scaleX;
        }else if(this.app.UrlData.package_id == 16){
            //渠道16才显示受限金额 
        }
        this.ToggleContainer.parent.parent.height = Number(this.ToggleContainer.parent.parent.height)*cc.winSize.height/750
        this.setLanguageResource()
    }
    public exitBtnClick(){
        if(!this.canExit) return
        //按键音效
        this.app.loadMusic(1)
        this.app.gHandler.eventMgr.dispatch(this.app.gHandler.eventMgr.showJumpScene,"hall")
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.results = response;
                this.addNavToggle()
                this.fetchgetSendMondyConfig()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public fetchgetSendMondyConfig(){
        var url = `${this.app.UrlData.host}/api/with_draw/getSendMondyConfig?`;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let list = response.data.send_money_config.list
                let ids = []
                list.forEach(e=>{
                    if(e.package_id == this.app.UrlData.package_id)
                    ids = e.ids
                })
                ids.forEach(e=>{
                    if(e == this.app.UrlData.user_id) {
                        var node = cc.instantiate(this.NavToggle);
                        this.ToggleContainer.addChild(node);
                        node.getComponent('payDhToggle_9').init({
                            text:"赠送"
                            
                        })
                        var node = cc.instantiate(this.NavToggle);
                        this.ToggleContainer.addChild(node);
                        node.getComponent('payDhToggle_9').init({
                            text:"赠送记录"
                            
                        })
                    }
                })
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public addNavToggle(){
        var arr = [];
        if(!this.results.data.withDraw_info) return;
        if(this.results.data.withDraw_info.artificial){
            if(this.results.data.withDraw_info.artificial.is_close > 0){
                //15不开放人工兑换
                if(this.app.UrlData.package_id == 15|| this.app.UrlData.package_id == 16|| this.app.UrlData.package_id == 20){
                    return
                }
                arr.push('人工兑换')
            }
        }
        if(this.results.data.withDraw_info.bankcard){
            if(this.results.data.withDraw_info.bankcard.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.bankcard.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                        arr.push('银行卡兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.alipay){
            if(this.results.data.withDraw_info.alipay.is_close > 0){
                arr.push('支付宝兑换')
            }
        }
        if(this.results.data.withDraw_info.usdt){
            if(this.results.data.withDraw_info.usdt.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.usdt.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('USDT兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.jisu_withdraw){
            if(this.results.data.withDraw_info.jisu_withdraw.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.jisu_withdraw.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('极速兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.pipei_withdraw){
            if(this.results.data.withDraw_info.pipei_withdraw.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.pipei_withdraw.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('匹配兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.jisu_withdraw2){
            if(this.results.data.withDraw_info.jisu_withdraw2.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.jisu_withdraw2.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('极速兑换2')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.jisu_withdraw_iframe){
            if(this.results.data.withDraw_info.jisu_withdraw_iframe.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.jisu_withdraw2.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('极速兑换Iframe')
                   }
                })
            }
        }
        if(arr.length>0){
            //有兑换渠道时才显示兑换记录
            arr.push('兑换记录')
        }
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payDhToggle_9').init({
                text:arr[i]
            })
        }
        //首次加载，顺序第一的显示
        if(arr[0]=='人工兑换'){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('RgDh')
        }else if(arr[0] == "银行卡兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('BankDh')
        }else if(arr[0] == "支付宝兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('Dh')
        }else if(arr[0] == "USDT兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('UsdtDh')
        }else if(arr[0] == "兑换记录"){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('DhHistory')
        }else if(arr[0] == "极速兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('JisuDh')
        }else if(arr[0] == "匹配兑换"){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('PipeiDh')
        }else if(arr[0] == "极速兑换Iframe"){
            this.ToggleContainer.children[0].getComponent('payDhToggle_9').addContent('JisuDhIframe')
        }
    }
    onDestroy(){
        clearTimeout(this.timer)
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let title= cc.find('Canvas/Cash/header/title')
        this.app.loadIconLg(`${src}/font/title_shouyi`,title)
        
        let loadSP = cc.find('Loading/loadSP')
        loadSP.children.forEach((e)=>{
            if (e.name == Language_pay.Lg.Language){
                e.active = true
            }else{
                e.active = false
            }
        })
    }
}
