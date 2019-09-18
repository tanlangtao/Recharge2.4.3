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

    @property(cc.Node)
    titleIcon: cc.Node = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.EditBox)
    accountInput: cc.EditBox = null;

    @property(cc.EditBox)
    firstNameInput: cc.EditBox = null;

    @property(cc.EditBox)
    lastNameInput: cc.EditBox = null;

    @property(cc.Label)
    firstNameLabel : cc.Label = null;

    @property(cc.Label)
    lastNameLabel : cc.Label = null;

    @property(cc.Label)
    accountLabel : cc.Label = null;

    @property()
    showSelect = false;
    action = 'add';
    itemId = null;
    app = null;

    public init(data){

        let iconPath = data.text =='设置支付宝' ? '/cash/title_szzfb' :'/cash/title_xgzfb';
        this.app.loadIcon(iconPath,this.titleIcon,283,51);
        this.action = data.action;
        this.itemId = data.itemId;
    }

    changeContent(data){
        this.accountInput.string = data.account_card;
        this.nameLabel.string = data.account_name;
        this.firstNameInput.string = data.account_surname;
        this.lastNameInput.string = data.account_first_name;

        this.accountLabel.string = data.account_card;
        this.firstNameLabel.string = data.account_surname;
        this.lastNameLabel.string = data.account_first_name;
    }

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('Main');
        this.app.getPublicInput(this.accountInput,1);
        this.app.getPublicInput(this.firstNameInput,2);
        this.app.getPublicInput(this.lastNameInput,2);
        this.firstNameInput.node.on('text-changed',()=>{
            this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`
        })
        this.lastNameInput.node.on('text-changed',()=>{
            this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`
        })

        this.app.setComponent('alertLogin').setMethod('setAccountLabel', (text) => this.setAccountLabel(text));
        this.app.setComponent('alertLogin').setMethod('setFirstNameLabel', (text) => this.setFirstNameLabel(text));
        this.app.setComponent('alertLogin').setMethod('setLastNameLabel', (text) => this.setLastNameLabel(text));
        //根据当前环境选择使用的输入组件
        if(this.app.UrlData.client != 'desktop'){
            this.firstNameInput.node.active = false;
            this.lastNameInput.node.active = false;
            this.accountInput.node.active = false;

            this.firstNameLabel.node.active = true;
            this.lastNameLabel.node.active = true;
            this.accountLabel.node.active = true;
        }else{
            this.firstNameInput.node.active = true;
            this.lastNameInput.node.active = true;
            this.accountInput.node.active = true;

            this.firstNameLabel.node.active = false;
            this.lastNameLabel.node.active = false;
            this.accountLabel.node.active = false;
        }
    }

    setAccountLabel(msg) {
        let msg2 = this.app.labelType(msg,6);
        this.accountLabel.string = msg2 || '请输入账号';
        this.setInputColor(msg2,this.accountLabel);
    }

    setFirstNameLabel(msg) {
        let msg2 = this.app.labelType(msg,2);
        this.firstNameLabel.string = msg2 ;
        this.setInputColor(msg2,this.firstNameLabel);
        this.nameLabel.string = `${this.firstNameLabel.string}${this.lastNameLabel.string}`;
    }

    setLastNameLabel(msg) {
        let msg2 = this.app.labelType(msg,2);
        this.lastNameLabel.string = msg2 ;
        this.setInputColor(msg2,this.lastNameLabel);
        this.nameLabel.string = `${this.firstNameLabel.string}${this.lastNameLabel.string}`;
    }
    setInputColor(msg,input){
        let color1 = new cc.Color(255, 255, 255);
        let color2 = new cc.Color(187, 187, 187);
        //设置字的颜色
        msg == '' ? input.node.color = color2:input.node.color = color1;
    }
    //Label点击回调
    changeAccountLabel(){
        //此处使用RN 的input组件
        this.app.Client.send('__oninput', { text: this.accountLabel.string == '请输入账号' ? "" :this.accountLabel.string,
            component: 'alertLogin', method: 'setAccountLabel' })
    }

    changeFirstNameLabel(){
        //此处使用RN 的input组件
        this.app.Client.send('__oninput', { text: this.firstNameLabel.string,
            component: 'alertLogin', method: 'setFirstNameLabel' })
    }

    changeLastNameLabel(){
        //此处使用RN 的input组件
        this.app.Client.send('__oninput', { text: this.lastNameLabel.string,
            component: 'alertLogin', method: 'setLastNameLabel' })
    }
    onClick(){
        //按键音效
        this.app.clickClip.play();

        if(this.app.UrlData.client != 'desktop'){
            if(this.accountLabel.string == '请输入账号'
                || this.firstNameLabel.string == ''
                || this.lastNameLabel.string == '' )
            {
                this.app.showAlert('输入不能为空!')
            }else{
                this.fetchBindAccountPay();
                this.node.removeFromParent();
            }
        }else{
            if(this.accountInput.string == ''
                || this.firstNameInput.string == ''
                || this.lastNameInput.string == '' )
            {
                this.app.showAlert('输入不能为空!')
            }else{
                this.fetchBindAccountPay();
                this.node.removeFromParent();
            }
        }
    }

    fetchBindAccountPay(){
        let url = `${this.app.UrlData.host}/api/payment_account/saveAccount`;
        let obj = {};
        if(this.app.UrlData.client != 'desktop'){
            obj = {
                account_card:this.accountLabel.string,
                account_surname:this.firstNameLabel.string,
                account_first_name:this.lastNameLabel.string,
                account_name:this.nameLabel.string,
                pay_url:'',
            };
        }else{
            obj = {
                account_card:this.accountInput.string,
                account_surname:this.firstNameInput.string,
                account_first_name:this.lastNameInput.string,
                account_name:this.nameLabel.string,

                pay_url:'',
            };
        }
        let info = JSON.stringify(obj);
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&withdraw_type=1&type=2&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let zfbCom = cc.find('Canvas/Cash/Content/Dh').getComponent('Dh');
                zfbCom.fetchIndex();
                self.app.showAlert('操作成功!')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    deleteFirstName(){
        //按键音效
        this.app.clickClip.play();

        if(this.app.UrlData.client != 'desktop'){
            this.firstNameLabel.string = '';
            this.setInputColor('',this.firstNameLabel);
            this.nameLabel.string = `${this.firstNameLabel.string}${this.lastNameLabel.string}`;
        }else{
            this.firstNameInput.string = '';
            this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`
        }
    }

    deleteLastName(){
        //按键音效
        this.app.clickClip.play();

        if(this.app.UrlData.client != 'desktop'){
            this.lastNameLabel.string = '';
            this.setInputColor('',this.lastNameLabel);
            this.nameLabel.string = `${this.firstNameLabel.string}${this.lastNameLabel.string}`;
        }else{
            this.lastNameInput.string = '';
            this.nameLabel.string = `${this.firstNameInput.string}${this.lastNameInput.string}`;
        }
    }

    deleteAccount(){
        //按键音效
        this.app.clickClip.play();

        if(this.app.UrlData.client != 'desktop'){
            this.accountLabel.string = '请输入账号';
            this.setInputColor('',this.accountLabel);
        }else{
            this.accountInput.string = '';
        }
    }
    
    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
    }
    // update (dt) {}
}
