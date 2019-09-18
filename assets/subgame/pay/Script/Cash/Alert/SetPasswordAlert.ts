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
    public app  = null;
    parentComponent  = null;
    showSelect = false;

    public init(data){
        this.parentComponent = data.parentComponent;
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
            this.app.showAlert('请设置6-10位新密码！')
        }else{
            this.fetchBindAccountPay();
            this.node.removeFromParent();
        }
    }
    // 绑定资金密码
    fetchBindAccountPay(){
        var url = `${this.app.UrlData.host}/api/user_funds_password/bindPassword`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&password=${this.passwordLabel.string}&token=${this.app.token}&version=${this.app.version}`

        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.parentComponent.fetchIndex();
                self.app.showAlert('操作成功！')
            }else{
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
