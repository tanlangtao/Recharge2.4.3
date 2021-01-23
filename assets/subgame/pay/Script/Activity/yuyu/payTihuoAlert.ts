import { Language_pay } from "./../../language/payLanguage";
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
            this.app.showAlert(Language_pay.Lg.ChangeByText('获取登陆ip失败!'))
        }
        this.setLanguageResource()
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
        let dataStr  = `user_id=${this.app.UrlData.user_id}&token=${this.app.token}&activity_id=${this.activity_id}&shipping_user=${shipping_user}&mobile=${mobile}&address=${address}&fruit_level=${this.fruit_level}&source_type=${this.source_type}&fruit_jin=${this.fruit_jin}&package_id=${this.app.UrlData.package_id}&login_ip=${this.login_ip}&regin_ip=${this.app.gHandler.gameGlobal.regin_ip}&device_id=${this.app.gHandler.app.deviceID}`
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
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
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
            this.app.showAlert(Language_pay.Lg.ChangeByText('姓名不能为空!'))
        }else if(this.phoneNumInput.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('手机号不能为空!'))
        }else if(!(/^1[3456789]\d{9}$/.test(this.phoneNumInput.string ))){
            this.app.showAlert(Language_pay.Lg.ChangeByText('手机号格式不正确，请重新输入!'))
        }else if(this.selectProvinceLabel.string =='请选择收货省' ||this.selectProvinceLabel.string == ''  ){
            this.app.showAlert(Language_pay.Lg.ChangeByText('请选择收货省'))
        }else if(this.addressInput.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('地址不能为空!'))
        }else{
            this.submitAddress()
        }
        
    }
    removeSelf() {
            //按键音效
        this.app.loadMusic(1);

        this.node.destroy();
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let contents_fill= cc.find('Canvas/TihuoAlert/Layout/content/contents_fill')
        let btn1= cc.find('Canvas/TihuoAlert/Layout/btn1')

        this.app.loadIconLg(`${src}/activeSprite/contents_fill`,contents_fill)
        this.app.loadIconLg(`${src}/activeSprite/surecg`,btn1)
        
        this.nameInput.placeholder = Language_pay.Lg.ChangeByText('请输入姓名')
        this.phoneNumInput.placeholder = Language_pay.Lg.ChangeByText('请输入手机号')
        this.addressInput.placeholder = Language_pay.Lg.ChangeByText('请输入收货地址')
        this.selectProvinceLabel.string = Language_pay.Lg.ChangeByText('请选择收货省')
    }
    // update (dt) {}
}
