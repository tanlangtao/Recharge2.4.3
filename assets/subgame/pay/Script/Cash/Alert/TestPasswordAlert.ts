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

    @property(cc.Label)
    passwordLabel: cc.Label = null;

    @property()
    public app = null;
    parentComponent  = null;
    showSelect = false;
    type  = null;

    public init(data){
        this.parentComponent = data.parentComponent;
        this.type = data.type;
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('Main');
    }

    setPassword() {
        this.app.showKeyBoard(this.passwordLabel,4);
    }
    onClick(){
        //按键音效
        this.app.clickClip.play();
        
        if(this.passwordLabel.string == '点击输入' ){
            this.app.showAlert('密码不能为空!')
        }else if(this.passwordLabel.string.length < 6 || this.passwordLabel.string.length > 10){
            this.app.showAlert('密码错误！')
        }else{
            this.node.removeFromParent();
            this.fetchcheckPassword();
        }
    }

    fetchcheckPassword(){
        var url = `${this.app.UrlData.host}/api/user_funds_password/checkPassword?user_id=${this.app.UrlData.user_id}&password=${this.passwordLabel.string}&token=${this.app.token}&version=${this.app.version}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                //验证成功，保存验证结果
                self.app.isTestPassworld = true;
                self.app.pass_token = response.data.token;
               // type=1,弹出绑定帐户
               // type =2  确认兑换
               // type =3  人工兑换
               if(self.type == 1){
                   var timer = setTimeout(()=>{
                       self.parentComponent.showAccountAlert();
                       clearTimeout(timer);
                   },500)
               }else if(self.type == 2){
                    self.parentComponent.showCashAlert();
               }else if(self.type == 3){
                    self.parentComponent.showRgDhAlert();
               }

           }else{
               //验证失败，保存验证结果
               self.app.isTestPassworld = false;
               self.app.showAlert(response.msg)
           }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    deletePassword(){
        //按键音效
        this.app.clickClip.play();

        this.passwordLabel.string = '点击输入';
        this.app.setInputColor('',this.passwordLabel);
    }
    
    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
    }
    // update (dt) {}
}
