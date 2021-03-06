import gHandler = require("../../../base/common/gHandler");
import Config from "./payConfig_22"
import { Language_pay } from "./payLanguage_22";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Loading : cc.Node = null;

    @property(cc.Prefab)
    publicAlert: cc.Prefab = null;

    @property(cc.Prefab)
    keyBoardAlert : cc.Prefab = null;

    @property(cc.Prefab)
    PublicOrderAlert: cc.Prefab = null;

    @property(cc.Prefab)
    AlipayAccountAlert: cc.Prefab = null;

    @property(cc.Prefab)
    BankAccountAlert: cc.Prefab = null;

    @property(cc.Prefab)
    BankTipAlert:cc.Prefab = null;

    @property(cc.Prefab)
    TipAlert :cc.Prefab = null;

    @property(cc.Prefab)
    UsdtAccountAlert :cc.Prefab = null;

    @property(cc.Prefab)
    BeforePayOrderAlert :cc.Prefab =null;

    @property(cc.Prefab)
    ZfbWxAlert:cc.Prefab = null;

    @property()
    public UrlData : any = [];
    public config :Config = null;
    public token :string = null;
    isTestPassworld = false;
    public version :number = 1 ;//充值后台接口，现默认为1
    gHandler = null;
    login_token = null;//大厅token作为 Authorization的值
    EffectState = 0;//音效
    onLoad () {
        this.config = new Config();
        this.UrlData =  {
            user_id:gHandler.gameGlobal.pay.user_id,
            // user_id:"889839393", // 奇趣 10
            // user_id:"738059019", // 河内 10
            // user_id:"324745169", //online
            user_name:gHandler.gameGlobal.pay.user_name,
            client:gHandler.gameGlobal.pay.client,
            host:gHandler.gameGlobal.pay.pay_host,
            // host:"http://pay.whjfxly88.com", //online
            proxy_user_id:gHandler.gameGlobal.pay.proxy_user_id,
            proxy_name:gHandler.gameGlobal.pay.proxy_name,
            // package_id:gHandler.gameGlobal.pay.package_id,
            package_id:22,
            imHost:gHandler.gameGlobal.im_host
        };
        this.gHandler = gHandler
        this.token = this.config.token;
        this.login_token = gHandler.gameGlobal.token
        this.EffectState =  gHandler.audioMgr.getEffectState();
        this.preLoadPrefab()
    }
    preLoadPrefab(){
        this.Loading = cc.find("Loading")
        this.loadBundlePrefab("Prefab/PublicAlert",(Prefab)=>{
            if(Prefab){ this.publicAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/KeyBoardAlert",(Prefab)=>{
            if(Prefab){ this.keyBoardAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/AlipayAccountAlert",(Prefab)=>{
            if(Prefab){ this.AlipayAccountAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/PublicOrderAlert",(Prefab)=>{
            if(Prefab){ this.PublicOrderAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/BankAccountAlert",(Prefab)=>{
            if(Prefab){ this.BankAccountAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/BankTipAlert",(Prefab)=>{
            if(Prefab){ this.BankTipAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/TipAlert",(Prefab)=>{
            if(Prefab){ this.TipAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/UsdtAccountAlert",(Prefab)=>{
            if(Prefab){ this.UsdtAccountAlert = Prefab }
        })
        this.loadBundlePrefab("Prefab/BeforePayOrderAlert",(Prefab)=>{
            if(Prefab){ this.BeforePayOrderAlert = Prefab }
        })
    }
    /**
     * 全局提示框
     * @param text 
     */
    public showAlert(text:string){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        if(!cc.find('Canvas/PublicAlert')){
            canvas.addChild(node);
        }
        node.getComponent('payPublicAlert_22').init(text)
    }
    /**
     * 自制键盘输入的类型
     * @param e 内容
     * @param type 类型
     */
    public labelType(e,type){
        let msg = e;
        if(type == 1){
            //验证input type = 1 不能以0开头的整数
            msg  = e.replace(/[^\d]/g, '').replace(/^0{1,}/g, '').substring(0,10);
        }else if(type == 2){
            //验证input type = 2 不能输入特殊字符，保留5位
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
            msg  = e.replace(patrn,'').substring(0,10);
        }else if(type == 3){
            //验证input,可以输入三位小数
            let reg = /^\d{0,8}\.{0,1}(\d{0,3})?$/;
            msg  = !reg.test(e) ? '' : e ;
        }else if(type == 4){

            //验证input,密码
            // msg  = e.replace(/[^\d]/g, '');
            msg = msg.substring(0,4)
        }else if(type == 5){
            //验证input type = 5 不能输入特殊字符,保留20位
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
            msg  = e.replace(patrn,'').substring(0,20);
        }else if(type == 6){
            //验证input type = 6 不能以0开头的整数 ,保留19位
            msg  = e.replace(/[^\d]/g, '').replace(/^0{1,}/g, '').substring(0,19);
        }
        else if(type == 7){
            //验证input type = 7 可以输入英文
            msg = e.replace(/[\W]/g,'').substring(0,8);
        }
        return msg
    }
    /**
     * 显示订单弹窗
     * @param type 
     * @param data 
     */
    public showOrderAlert(type,data,beforePay = true){
        var node = null
        var beforePayOrder = null
        node = cc.instantiate(this.PublicOrderAlert);
        beforePayOrder = cc.instantiate(this.BeforePayOrderAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/PublicOrderAlert")){
            canvas.addChild(node);
        }
        //弹出提示确认框
        if(beforePay){
             //检测是否已存在弹窗，避免重复显示
            if(!cc.find("Canvas/BeforePayOrderAlert")){
                canvas.addChild(beforePayOrder);
            }
        }
        node.getComponent('payPublicOrderAlert_22').init(type,data)
    }
    /**
     * 添加银行卡类型弹窗
     * @param data 
     */
    public showBankAccountAlert(data){
        var canvas = cc.find('Canvas');
        
        var node = null
        node = cc.instantiate(this.BankAccountAlert);
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/BankAccountAlert")){
            canvas.addChild(node);
        }
        let BankAccountAlert = node.getComponent('payBankAccountAlert_22');
        BankAccountAlert.init({
            text:data.text,
            action:data.action,
            itemId:data.itemId,
            parentComponent:data.parentComponent
        })
        if(data.changeData){
            BankAccountAlert.changeContent(data.changeData);
        }
    }
    public showUsdtAccountAlert(itemId,type){
        var canvas = cc.find('Canvas');
        var node = null
        node = cc.instantiate(this.UsdtAccountAlert);
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/UsdtAccountAlert")){
            canvas.addChild(node);
        }
        let payUsdtAccountAlert = node.getComponent('payUsdtAccountAlert_22');
        payUsdtAccountAlert.init(itemId,type)
    }
    /**
     * 添加银行卡类型弹窗
     * @param data 
     */
    public showBankTipAlert(component){
        var canvas = cc.find('Canvas');
        var node = null;
        node = cc.instantiate(this.BankTipAlert);
        node.getComponent('payBankTipAlert_22').init(component)
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/BankTipAlert")){
            canvas.addChild(node);
        }
    }
    /**
     * 小键盘 
     * @param label 
     * @param type 
     */
    public showKeyBoard(label,type,callBack = ()=>{}){
        var node = null
        node = cc.instantiate(this.keyBoardAlert);
        let canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payKeyBoardAlert_22').init(label,type,callBack)
    }
    /**
     * 设置输入框字体颜色
     * @param msg 
     * @param input 
     */
    setInputColor(msg,input){
        let color1 = new cc.Color(255, 255, 255);
        let color2 = new cc.Color(187, 187, 187);
        if(this.UrlData.package_id == 15 || this.UrlData.package_id == 20|| this.UrlData.package_id == 12){
             color1 = new cc.Color(133, 147, 186);
             color2 = new cc.Color(133, 147, 186);
        }else if(this.UrlData.package_id == 16){
            color1 = new cc.Color(255, 255, 255);
            color2 = new cc.Color(127, 122, 123);
        }
        //设置字的颜色
        msg == '' ? input.node.color = color2:input.node.color = color1;
    }
    /**
     * 图片加载
     * @param url 路径 
     * @param node 节点
     * @param w 宽
     * @param h 高
     */
    public loadIcon(url,node,w,h){
        cc.assetManager.loadBundle(Language_pay.Lg.getBundleName(), (err, bundle) => {
            if(err){
                console.log('loadBundle:',Language_pay.Lg.getBundleName(),"失败",err)
                return
            }
            bundle.load(`Language/${url}`,cc.SpriteFrame,(err,spriteFrame:any)=>{
                if( cc.isValid( node ) ){
                    node.width = w;
                    node.height = h;
                    node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }else{
                    cc.log("loadIcon url=",url,"node is null")
                }
            })
        });
    }
    public loadIconLg(url,node){
        cc.assetManager.loadBundle(Language_pay.Lg.getBundleName(), (err, bundle) => {
            if(err){
                console.log('loadBundle:',Language_pay.Lg.getBundleName(),"失败",err)
                return
            }
            bundle.load(`Language/${url}`,cc.SpriteFrame,(err,spriteFrame:any)=>{
                if( cc.isValid( node ) ){
                    node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }else{
                    cc.log("loadIconLg url=",url,"node is null")
                }
            })
        });
    }
    public loadPublicIcon(url,node){
        cc.assetManager.loadBundle(Language_pay.Lg.getBundleName(), (err, bundle) => {
            if(err){
                console.log('loadBundle',"失败",err)
                return
            }
            bundle.load(`Texture/${url}`,cc.SpriteFrame,(err,spriteFrame:any)=>{
                if( cc.isValid( node ) ){
                    node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }else{
                    cc.log("loadPublicIcon url=",url,"node is null")
                }
            })
        });
    }
    /**
     * 网络请求
     * @param method 方式
     * @param url 网址
     * @param data 参数
     * @param successFn 成功回调
     * @param faildFn 失败回调 
     */
    ajax(method,url,data,successFn,faildFn){   
        if(method == "GET"){
            url = url+`&token=${this.token}&center_auth=${this.login_token}`
        }else{
            data = data+`&token=${this.token}&center_auth=${this.login_token}`
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 ) {
                if(xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    successFn(response)
                }else {
                    if(faildFn) {
                        faildFn(xhr.status)
                    }
                }
                xhr.abort()
            }
        };
        xhr.open(method, url, true);
        xhr.ontimeout = () => {
            xhr.abort()
        }
        xhr.onerror = () => {
            xhr.abort()
        }
        xhr.setRequestHeader("Content-Type"
            , "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    //显示加载动画
    showLoading(){
        this.Loading.active = true;
    }
    //隐藏加载动画
    hideLoading(){
        this.Loading.active = false;
    }
    loadMusic(num :number):void{
        cc.assetManager.loadBundle(Language_pay.Lg.getBundleName(), (err, bundle) => {
            if(err){
                console.log('loadBundle',"失败",err)
                return
            }
            console.log("loadMusic ",bundle.name)
            //判断音效是否开启
            if(!this.EffectState){
                return
            }
            let path :string='';
            switch(num){
                case 0 : path ='Texture/sounds/Button_Click';break;
                case 1 : path ='Texture/sounds/dian';break;
            }
            bundle.load(path,cc.AudioClip,(err,clip:any)=>{
                if(err){
                    cc.log("loadMusicclip error:",err)
                    return
                }
                var audioID =  cc.audioEngine.playEffect(clip, false);
                return audioID;
            })
        });
    }
    public showTipAlert(){
        var node = cc.instantiate(this.TipAlert);
        let canvas = cc.find('Canvas');
        canvas.addChild(node);
    }
    showZfbWxAlert(url){
        var node = cc.instantiate(this.ZfbWxAlert)
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/ZfbWxAlert")){
            canvas.addChild(node);
        }
        node.getComponent('payZfbWxAlert_22').init(url)
    }
    
    loadBundlePrefab(url,callBack){
        cc.assetManager.loadBundle(Language_pay.Lg.getBundleName(), (err, bundle) => {
            if(err){
                console.log('loadBundle:',Language_pay.Lg.getBundleName(),"失败",err)
                return
            }
            bundle.load(url,cc.Prefab,(err,Recharge)=>{
                if(err){
                    cc.log("Prefab error:",err)
                    return
                }
                if(!(Recharge instanceof cc.Prefab)){
                    cc.log("Prefab error");
                    callBack(false)
                }else{
                    console.log("loadPrefab true",bundle.name,url)
                    callBack(Recharge)
                }
            })
        });
    }
}
