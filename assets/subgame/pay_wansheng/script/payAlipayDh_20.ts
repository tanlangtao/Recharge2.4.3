const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_20";
@ccclass
export default class NewClasss extends cc.Component {
    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    czArea: cc.Label = null;

    @property(cc.Label)
    accountLabel: cc.Label  = null;

    @property(cc.Node)
    accountBtn: cc.Node = null;

    @property(cc.Prefab)
    SelectItem : cc.Prefab =null;

    @property(cc.Node)
    selectContent: cc.Node  = null;

    @property(cc.Prefab)
    CashAlert : cc.Prefab  =null;

    @property(cc.Node)
    DhBtn: cc.Node  = null;

    @property(cc.Slider)
    slider : cc.Slider = null;

    @property(cc.ProgressBar)
    progressBar : cc.ProgressBar  = null;

    @property(cc.Prefab)
    AlipayAccountAlert : cc.Prefab  =null;

    @property
    public data : any = {};
    // LIFE-CYCLE CALLBACKS:
    //当前选择的信息
    public Info = null;
    public bankData = [];
    public showAlipaySelect = false;
    public bankId = null;
    public action = 'add';
    app = null;
    public results = null;
    public current = null;
    public showSelect = false;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_20');
        this.fetchIndex();
        this.changeSlider(this.slider,this.progressBar);
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                self.data = response;
                self.init();
                self.initRender();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading()
        })
    }
    
    init(){
        this.results = this.data.data.withDraw_info.dai_withdraw_alipay.channel;
        this.results.sort((a,b)=>a.sort-b.sort);
        for(let i = 0;i<this.results.length;i++){
            if(Number(this.results[i].is_close)>0){
                this.current = this.results[i];
                break;
            }
        }
        this.radioList();
    }
    
    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            if(Number(this.results[i].is_close) >= 0){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('paySelectItem_20').init({
                    text:this.results[i].channel_name,
                    parentComponent:this,
                    index:i,
                    channel :'alipay'
                })
            }
        }
    }

    //selectItem回调
    public initRender(){
        this.bankData = [] ;
        var data = this.data.data;
        for(let i = 0 ;i < data.list.length ;i++){
            let data = this.data.data.list[i];
            if (data.type == 2){
                //type2 支付宝
                this.bankData.push(data)
            }
        }
        if(this.bankData.length>0){
            this.Info =JSON.parse(this.bankData[0].info)
            this.bankId = this.bankData[0].id;
        }
        this.action = this.bankData.length != 0 ? 'edit' :'add';
        this.goldLabel.string = this.app.config.toDecimal(data.game_gold);

        //最小金额也需要根据package_id判断
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        withdraw_min_amount['bank'].forEach(item => {
            if(item.package_id == this.app.UrlData.package_id){
                this.current.min_amount = item.min_amount
            }
        });
        this.czArea.string = `${Language_pay.Lg.ChangeByText('兑换范围')}:(${this.current? this.current.min_amount:100} - ${this.current?this.current.max_amount:10000})`;
        
        this.accountLabel.string = this.bankData.length != 0  ? this.app.config.testZfbNum(this.Info.account_card) :Language_pay.Lg.ChangeByText('未设置');
        if(this.bankData.length != 0 ){
            this.accountBtn.active = false;
        }else{
            this.accountBtn.active = true;
        }
    }

    deleteAmount(){ 
        //按键音效
        this.app.loadMusic(1);
        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.amountLabel);
        this.slider.progress = 0;
        this.progressBar.progress = 0;
    }
    //点击最大
    allGoldClick(){
        this.amountLabel.string = `${Math.floor(Number(this.goldLabel.string))}`;
        this.slider.progress = 1;
        this.progressBar.progress = 1;
    }
     //兑换提示
     showCashAlert(){
        var node = null
        node = cc.instantiate(this.CashAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        let cash = cc.find('Canvas/Cash').getComponent('payCash_20')
        let package_rate = JSON.parse(cash.results.data.package_rate)
        let package_rate_byPackage = "0"
        package_rate.list.forEach(e => {
            if(e.package_id == this.app.UrlData.package_id){
                package_rate_byPackage = e.rate
            }
        });
        console.log('package_rate_byPackage',package_rate_byPackage)
        let rate = package_rate_byPackage ?Number (package_rate_byPackage)  : 0;
        let rate2 =cash.results.data.channel_rate ?Number (cash.results.data.channel_rate)  : 0;
        let rateMount = (rate+rate2)*Number(this.amountLabel.string);
        node.getComponent('payCashAlert_20').init({
            parentComponent:this,
            rateMount: rateMount,
            amount:Number(this.amountLabel.string)
        })
    }
    //验证密码回调type=1
    showAccountAlert(){
        this.showAlipayAccountAlert({
            text:this.bankData.length != 0  ?'修改支付宝' : '设置支付宝',
            action:this.action,
            itemId:this.bankId,
            parentComponent:this,
            //修改界面初始数据
            changeData:this.Info,
            parrentCom:this
        });

    }
    //验证密码回调type=2
    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawApply`;
        let dataStr=''
        //如果proxy_name为“”，则不传
        if(this.app.UrlData.proxy_name == ""){
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=12&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=12&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        }

        let self = this;

        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.fetchIndex();
                if(response.msg !="Success!"){
                    self.app.showAlert(response.msg.msg);
                }else{
                    self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'));
                }
            }else{
                self.app.showAlert(response.msg)
            }
            self.DhBtn.getComponent(cc.Button).interactable  = true;
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }

    btn1Click(){
        //按键音效
        this.app.loadMusic(1);
        this.showAccountAlert()
    }
    changeSlider(s,p){
        let self = this;
        let slider = s;
        let progressbar = p;
        if(slider == null || progressbar == null){
            return;
        }
        progressbar.progress = slider.progress;
        slider.node.on('slide', function(event){
            progressbar.progress = slider.progress;
                self.amountLabel.string = `${Math.floor(Number(self.goldLabel.string)*slider.progress)}`;
        }, this);
    }
    /**
     * 添加支付宝账号弹窗
     * @param data 
     */
    public showAlipayAccountAlert(data){
        var canvas = cc.find('Canvas');
        var node = null
        node = cc.instantiate(this.AlipayAccountAlert);
        canvas.addChild(node);
        let AlipayAccountAlert = node.getComponent('payAlipayAccountAlert_20');
        AlipayAccountAlert.init({
            text:data.text,
            action:data.action,
            itemId:data.itemId,
            parrentCom:data.parrentCom
        });
        if(data.changeData){
            AlipayAccountAlert.changeContent(data.changeData);
        }

    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        var amount = Number(this.amountLabel.string);
        var minAmount = Number(this.current?this.current.min_amount:100);
        var maxAmount = Number(this.current?this.current.max_amount:10000);
        //增加渠道对于兑换金额和倍数的判断
        var multiple_amount = 1;
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        withdraw_min_amount['bank'].forEach(item => {
            if(item.package_id == this.app.UrlData.package_id){
                minAmount = item.min_amount
                multiple_amount = item.multiple_amount
            }
        });
        if(this.results.length==0){
            this.app.showAlert(Language_pay.Lg.ChangeByText('渠道未开放，请选择其他兑换方式!'))
        }else if(this.accountLabel.string == Language_pay.Lg.ChangeByText('未设置')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('请先设置账户!'))
        }else if(Number(this.amountLabel.string)%multiple_amount != 0 && amount != minAmount ){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('兑换金额必须为')}${multiple_amount}${Language_pay.Lg.ChangeByText('的倍数')}!`)
        }
        else if(this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('兑换金额不能为空'))
        }else if(amount >Number(this.goldLabel.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert(Language_pay.Lg.ChangeByText('超出兑换范围'))
        }else{
            this.showCashAlert();
        }
    }
}
