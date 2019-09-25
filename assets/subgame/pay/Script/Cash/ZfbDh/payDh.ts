
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Prefab)
    SetPasswordAlert : cc.Prefab = null;

    @property(cc.Prefab)
    ChangePasswordAlert : cc.Prefab = null;

    @property(cc.Prefab)
    TestPasswordAlert : cc.Prefab =null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    czArea: cc.Label = null;

    @property(cc.Label)
    accountLabel: cc.Label = null;

    @property(cc.Label)
    passworldLabel: cc.Label = null;

    @property(cc.Prefab)
    sellSelectItem : cc.Prefab = null;

    @property(cc.Node)
    accountBtn: cc.Node = null;

    @property(cc.Node)
    passBtn: cc.Node = null;

    @property(cc.Node)
    selectZfbContent: cc.Node = null;

    @property(cc.Prefab)
    SelectItem : cc.Prefab =null;

    @property(cc.Node)
    selectContent: cc.Node = null;

    @property(cc.Prefab)
    CashAlert : cc.Prefab =null;

    @property(cc.Node)
    DhBtn: cc.Node = null;


    @property
    public data : any = {};
    // LIFE-CYCLE CALLBACKS:
    //当前选择的银行卡信息
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
        this.app = cc.find('Canvas/Main').getComponent('payMain');

        this.fetchIndex();
    }

    
    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading();
            if(response.status == 0){
                self.data = response;
                self.init();
                self.initRender();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    
    init(){
        this.results = this.data.data.withDraw_info.alipay.channel;
        this.results.sort((a,b)=>a.sort-b.sort);
        for(let i = 0;i<this.results.length;i++){
            if(Number(this.results[i].is_close)==0){
                this.current = this.results[i];
                break;
            }
        }
        this.radioList();
    }

    selectAlipayClick(){
        //按键音效
        this.app.clickClip.play();

        if(this.bankData.length == 0) {
            this.app.showAlert('未设置支付宝');
            return;
        }
        if(!this.showAlipaySelect ){
            for( var i = 0 ; i < this.bankData.length ; i++){
                var node = cc.instantiate(this.sellSelectItem);
                this.selectZfbContent.addChild(node);
                node.getComponent('paySellSelectItem').init({
                    text:JSON.parse(this.bankData[i].info).account_card,
                    Label:this.accountLabel,
                    showSelect:this.showAlipaySelect,
                    selectContent:this.selectZfbContent,
                    data:this.bankData[i],
                    parentCom:this
                })
            }
            this.showAlipaySelect = true;
        }else{
            this.selectZfbContent.removeAllChildren();
            this.showAlipaySelect = false;
        }
    }
    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            if(Number(this.results[i].is_close) == 0){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('paySelectItem').init({
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
        this.czArea.string = `兑换范围:(${this.current? this.current.min_amount:50} - ${this.current?this.current.max_amount:10000})`;
        this.accountLabel.string = this.bankData.length != 0  ? this.app.config.testBankNum(this.Info.account_card) :'未设置';
        this.passworldLabel.string = data.is_password == 1 ? '已设置' : '未设置';
        let accPath = this.bankData.length != 0 ?'btn/btn_edit':'btn/bindbt';
        let passPath = data.is_password == 1?'btn/btn_edit':'btn/btn_set';
        this.app.loadIcon(accPath,this.accountBtn,108,53);
        this.app.loadIcon(passPath,this.passBtn,108,53);
    }

    deleteAmount(){ 
        //按键音效
        this.app.clickClip.play();

        this.amountLabel.string = '点击输入';
        this.app.setInputColor('',this.amountLabel);
    }
    //验证密码
    showTestPassword(type){
        var node = cc.instantiate(this.TestPasswordAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('payTestPasswordAlert').init({
            parentComponent:this,
            type : type
        })
    }
     //兑换提示
     showCashAlert(){
        var node = cc.instantiate(this.CashAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        let cash = cc.find('Canvas/Cash').getComponent('payCash')
        let rate = cash.results.data.package_rate ?Number (cash.results.data.package_rate)  : 0;
        let rate2 =cash.results.data.channel_rate ?Number (cash.results.data.channel_rate)  : 0;
        let rateMount = (rate+rate2)*Number(this.amountLabel.string);
        node.getComponent('payCashAlert').init({
            parentComponent:this,
            rateMount: rateMount,
            amount:Number(this.amountLabel.string)
        })
    }
    //验证密码回调type=1
    showAccountAlert(){
        this.app.showAlipayAccountAlert({
            text:this.bankData.length != 0  ?'修改支付宝' : '设置支付宝',
            action:this.action,
            itemId:this.bankId,
            parentComponent:this,
            //修改界面初始数据
            changeData:this.Info
        });

    }
    //验证密码回调type=2
    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawApply`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=1&pass_token=${this.app.pass_token}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`

        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                let bankCom = cc.find('Canvas/Cash/Content/BankDh').getComponent('payBankDh');
                bankCom.fetchIndex();
                self.app.showAlert('操作成功!')
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    btn1Click(){
        //按键音效
        this.app.clickClip.play();

        if(this.data.data.is_password == 1){
            this.DhBtn.active = false;
            //如果输入过密码验证，则无需再次验证
            if(this.app.isTestPassworld){
                this.showAccountAlert()
            }else{
                this.showTestPassword(1);
            }
            
        }else{
            this.app.showAlert('请先设置资金密码!')
        }
        
    }

    btn2Click(){
        //按键音效
        this.app.clickClip.play();

        if(this.data.data.is_password == 1){
            var node = cc.instantiate(this.ChangePasswordAlert);
            var canvas = cc.find('Canvas');
            canvas.addChild(node);
            node.getComponent('payChangePasswordAlert').init({
                parentComponent:this
            })
        }else{
            var node = cc.instantiate(this.SetPasswordAlert);
            var canvas = cc.find('Canvas');
            canvas.addChild(node);
            node.getComponent('paySetPasswordAlert').init({
                parentComponent:this
            })
        }
    }

    onClick(){
        //按键音效
        this.app.clickClip.play();

        var amount = Number(this.amountLabel.string);
        var minAmount = Number(this.current?this.current.min_amount:50);
        var maxAmount = Number(this.current?this.current.max_amount:10000);
        
        if(this.results.length==0){
            this.app.showAlert('渠道未开放，请选择其他兑换方式！')
        }else if(this.data.data.is_password == 0){
            this.app.showAlert('请先设置资金密码!')
        }else if(this.accountLabel.string == '未设置'){
            this.app.showAlert('请先设置账户!')
        }else if(this.amountLabel.string == '点击输入'){
            this.app.showAlert('兑换金额不能为空！')
        }else if(amount >Number(this.goldLabel.string)){
            this.app.showAlert('余额不足!')
        }else if(amount % 50 != 0){
            this.app.showAlert(`兑换金额必须是50的倍数!`)
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert('超出兑换范围!')
        }else{
            this.showTestPassword(2);
        }
    }
}