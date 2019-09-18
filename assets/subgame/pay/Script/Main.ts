import Config from "./Config";
import ClientMessage from "./ClientMessage"
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
    publicAlert: cc.Prefab = null;

    @property(cc.Prefab)
    PublicInputAlert: cc.Prefab = null;

    @property(cc.Prefab)
    PublicOrderAlert: cc.Prefab = null;

    @property(cc.Prefab)
    AlipayAccountAlert: cc.Prefab = null;

    @property(cc.Prefab)
    BankAccountAlert: cc.Prefab = null;

    @property(cc.Prefab)
    keyBoardAlert : cc.Prefab = null;

    @property(cc.Prefab)
    WriteMoneyAlert : cc.Prefab = null;

    @property()
    clickClip = null;
    public UrlData : any = [];
    public Client  = null;
    public config  = null;
    public token  = null;
    // LIFE-CYCLE CALLBACKS:
    // 输入模块
    inputComponent = {};
    _component: any = {};
    isTestPassworld = false;
    pass_token = '';
    public version = 1 ;

    onLoad () {
        this.config = new Config();
        this.UrlData =  this.config.getUrlData();
        this.token = this.config.token;
        this.Client = new ClientMessage();
        //音效
        this.clickClip = this.node.getComponent(cc.AudioSource)
         // 输入结束事件
         let self = this;
         this.Client.addEventListener('__oninputend', (message)=>{
            let text = message.data.text;
            let component = message.data.component;
            let method = message.data.method;
            self.inputComponent[component][method](text)
        })

    }
    public showAlert(data){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('PublicAlert').init(data)
    }

    public getPublicInput(input,type) {
        var PublicInputAlert = cc.instantiate(this.PublicInputAlert);
        var canvas = cc.find('Canvas');
        input.node.on('editing-did-began', (e) => {
            canvas.addChild(PublicInputAlert);
            PublicInputAlert.getComponent('PublicInputAlert').init({
                text: e.string,
                input: input
            })
        })
        input.node.on('text-changed', (e) => {
            if(type == 1){
                //验证input type = 1 不能以0开头的整数
                input.string = e.string.replace(/[^\d]/g, '').replace(/^0{1,}/g, '');
            }else if(type == 2){
                //验证input type = 2 不能输入特殊字符
                var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
                input.string = e.string.replace(patrn,'');
            }else if(type == 3){
                //验证input,可以输入两位小数
                let reg = /^\d{0,8}\.{0,1}(\d{0,2})?$/;
                input.string = !reg.test(e.string) ? '' :e.string ;
            }else if(type == 4){
                //验证input,密码
                input.string = e.string.replace(/[^\w\.\/]/ig,'');
            }

            PublicInputAlert.getComponent('PublicInputAlert').init({
                text: e.string,
                input: input
            })
        })
        input.node.on('editing-return', (e) => {

            PublicInputAlert.getComponent('PublicInputAlert').readyClick()
        })
    }
    public labelType(e,type){
        let msg = e;
        if(type == 1){
            //验证input type = 1 不能以0开头的整数
            msg  = e.replace(/[^\d]/g, '').replace(/^0{1,}/g, '').substring(0,6);
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
            msg = msg.substring(0,10)
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
    public showOrderAlert(type,data){
        var node = cc.instantiate(this.PublicOrderAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('PublicOrderAlert').init(type,data)
    }

    // 添加支付宝账号弹窗
    public showAlipayAccountAlert(data){
        var canvas = cc.find('Canvas');
        var node = cc.instantiate(this.AlipayAccountAlert);
        canvas.addChild(node);
        let AlipayAccountAlert = node.getComponent('AlipayAccountAlert');
        AlipayAccountAlert.init({
            text:data.text,
            action:data.action,
            itemId:data.itemId
        });
        if(data.changeData){
            AlipayAccountAlert.changeContent(data.changeData);
        }

    }
    // 添加银行卡类型弹窗
    public showBankAccountAlert(data){
        var canvas = cc.find('Canvas');
        var node = cc.instantiate(this.BankAccountAlert);
        canvas.addChild(node);
        let BankAccountAlert = node.getComponent('BankAccountAlert');
        BankAccountAlert.init({
            text:data.text,
            action:data.action,
            itemId:data.itemId
        })
        if(data.changeData){
            BankAccountAlert.changeContent(data.changeData);
        }
    }
      // 输入模块
      setComponent(component) {
        if (!this.inputComponent[component]) this.inputComponent[component] = {};
        this._component = component;
        return this
    }
    // 输入方法
    setMethod(methodName, method) {
        this.inputComponent[this._component][methodName] = method;
    }

    public showKeyBoard(label,type){
        var node = cc.instantiate(this.keyBoardAlert);
        let canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('KeyBoardAlert').init(label,type)
    }

    setInputColor(msg,input){
        let color1 = new cc.Color(255, 255, 255);
        let color2 = new cc.Color(187, 187, 187);
        //设置字的颜色
        msg == '' ? input.node.color = color2:input.node.color = color1;
    }

    showWriteMoneyAlert(component,type,data){
        var node = cc.instantiate(this.WriteMoneyAlert);
        let canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('WriteMoneyAlert').init(component,type,data)
    }
    public loadIcon(url,node,w,h){
        cc.loader.loadRes(`/pay${url}`,cc.SpriteFrame,(err, spriteFrame)=>{
            node.width = w;
            node.height = h;
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    }
    ajax(method,url,data,successFn,faildFn){   
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
            }
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type"
			, "application/x-www-form-urlencoded");
        xhr.send(data);
    }
}
