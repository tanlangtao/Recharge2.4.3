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

    @property(cc.EditBox)
    nameInput: cc.EditBox = null;

    @property(cc.EditBox)
    phoneNumInput: cc.EditBox = null;

    @property(cc.Label)
    selectProvinceLabel: cc.Label = null;

    @property(cc.Node)
    selectProvinceContent: cc.Node = null;

    @property(cc.EditBox)
    addressInput: cc.EditBox = null;

    @property(cc.Prefab)
    SelectItem :cc.Prefab = null;

    app= null;
    activity_id = 0;
    fruit_level = this.fruit_level;
    ParentComponent = null;
    source_type = null;
    fruit_jin = 5
    login_ip = ''
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.addProvinceItem()
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
    }
    init(id,level,ParentComponent,source_type,fruit_jin = 5){
        this.activity_id = id
        this.fruit_level = level
        this.ParentComponent = ParentComponent
        this.source_type = source_type
        this.fruit_jin = fruit_jin
    }
    submitAddress(){
        let shipping_user = this.nameInput.string
        let mobile = this.phoneNumInput.string
        let address = `${this.selectProvinceLabel.string},${this.addressInput.string}` 
        var url = `${this.app.UrlData.host}/api/activity/submitAddress?`;
        // let dataStr  = `user_id=${this.app.UrlData.user_id}&token=${this.app.token}&activity_id=${this.activity_id}&shipping_user=${shipping_user}&mobile=${mobile}&address=${address}&fruit_level=${this.fruit_level}&source_type=${this.source_type}&fruit_jin=${this.fruit_jin}&package_id=${this.app.UrlData.package_id}&login_ip=127.0.0.1&regin_ip=127.0.0.1&device_id=123456789`
        let dataStr  = `user_id=${this.app.UrlData.user_id}&token=${this.app.token}&activity_id=${this.activity_id}&shipping_user=${shipping_user}&mobile=${mobile}&address=${address}&fruit_level=${this.fruit_level}&source_type=${this.source_type}&fruit_jin=${this.fruit_jin}&package_id=${this.app.UrlData.package_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.appGlobal.deviceID}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showTiHuoDoneAlert()
                //调用回调更新签到页面
                self.ParentComponent.getSignInfo()
                self.node.destroy();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    addProvinceItem(){
        var results = ['北京', '天津', '上海', '重庆', '河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东',
        '河南','湖北','湖南','广东','海南','四川','贵州','云南','陕西','甘肃','青海','内蒙古','广西','西藏','宁夏','新疆','香港','澳门','台湾']
        for (var i = 0; i < results.length; i++) {
            var node = cc.instantiate(this.SelectItem);
            this.selectProvinceContent.addChild(node);
            node.getComponent('payBankSelectItem').init({
                text: results[i],
                Content:this.selectProvinceContent,
                Label:this.selectProvinceLabel
            })
        }
    }
    selectProvinceClick() {
        if (!this.selectProvinceContent.active) {
            this.selectProvinceContent.active = true;
        } else {
            this.selectProvinceContent.active = false;
        }
    }
    onCLick(){
        if(this.nameInput.string == ''){
            this.app.showAlert('姓名不能为空！')
        }else if(this.phoneNumInput.string == ''){
            this.app.showAlert('手机号不能为空！')
        }else if(!(/^1[3456789]\d{9}$/.test(this.phoneNumInput.string ))){
            this.app.showAlert('手机号格式不正确，请重新输入！')
        }else if(this.selectProvinceLabel.string =='请选择收货省' ||this.selectProvinceLabel.string == ''  ){
            this.app.showAlert('请选择收货省!')
        }else if(this.addressInput.string == ''){
            this.app.showAlert('地址不能为空!')
        }else{
            this.submitAddress()
        }
        
    }
    removeSelf() {
            //按键音效
        this.app.clickClip.play();

        this.node.destroy();
    }
    // update (dt) {}
}
