
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    goldLabel: cc.Label = null; //余额

    @property(cc.Label)
    usdt_goldLabel: cc.Label = null; //转换usdt余额

    @property(cc.Label)
    usdt_label: cc.Label = null; 

    @property(cc.Label)
    amountLabel: cc.Label = null; //兑换金额

    @property(cc.Label)
    dhArea: cc.Label = null; //兑换范围

    @property(cc.Label)
    walletAddressLabel: cc.Label = null; 

    @property(cc.Label)
    chanTypeLabel: cc.Label = null;

    @property(cc.Node)
    bindBtn: cc.Node = null;

    @property(cc.Node)
    selectContent :cc.Node = null;

    @property(cc.Prefab)
    CashAlert: cc.Prefab = null;

    @property(cc.Node)
    DhBtn: cc.Node = null;

    @property(cc.Prefab)
    SelectItem :cc.Prefab = null

    @property
    public data : any = {};
    public results= null ;
    app = null;
    current= null;
    walletAddress = ''
    chanType = ''
    info :any= {}
    itemID = ''
    UsdtData :any= []
    conf_val = 0 // 汇率
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }
    public fetchGetConfigInfo(){
        var url = `${this.app.UrlData.host}/api/config/getConfigInfo?conf_key=usdt_to_cny&token=${this.app.token}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.conf_val = Number(response.data[0].conf_val)
                this.usdt_goldLabel.string = this.app.config.toDecimal(Number(this.goldLabel.string )/ this.conf_val)
                this.usdt_label.string = this.app.config.toDecimal(1 / this.conf_val)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;
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
            self.app.showAlert(`网络错误${errstatus}`)
            self.app.hideLoading();
        })
    }
    
    init(){
        this.results = this.data.data.withDraw_info.usdt.channel;
        this.results.sort((a,b)=>a.sort-b.sort);
        for(let i = 0;i<this.results.length;i++){
            if(Number(this.results[i].is_close)>0){
                this.current = this.results[i];
                break;
            }
        }
        this.radioList();
        this.fetchGetConfigInfo()
    }

    //selectItem回调
    public initRender(){
        this.UsdtData = []
        var data = this.data.data;
        for(let i = 0 ;i < data.list.length ;i++){
            let item = data.list[i];
            if (item.type == 4){
                this.UsdtData.push(item)
            }
        }
        if(this.UsdtData.length>0){
            let Info =JSON.parse(this.UsdtData[0].info)
            for (var k in Info) {
                this.info[k] = Info[k]
            }
            this.itemID = this.UsdtData[0].id;
        }
        console.log(this.UsdtData,this.info)
        //最小金额也需要根据package_id判断
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        withdraw_min_amount.forEach(item => {
            if(item.package_id == this.app.UrlData.package_id){
                this.current.min_amount = item.min_amount
            }
        });
        this.goldLabel.string = this.app.config.toDecimal(this.data.data.game_gold);
        this.dhArea.string = `兑换范围:(${this.current? this.current.min_amount:100} - ${this.current?this.current.max_amount:10000})`;
        this.walletAddressLabel.string = this.info.wallet_addr != '' ? this.app.config.testAdressNum(this.info.wallet_addr) :'未绑定';
        this.chanTypeLabel.string = this.info.protocol != '' ? this.info.protocol:'未绑定';

        if(this.walletAddressLabel.string == '未绑定'){
            this.bindBtn.active = true;
        }else{
            this.bindBtn.active = false;
        }
    }

    deleteAmount(){
        //按键音效
        this.app.loadMusic(1);

        this.amountLabel.string = '点击输入';
        this.app.setInputColor('',this.amountLabel);
    }

    //兑换提示
    showCashAlert(conf_val){
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
        },conf_val)
    }
    //显示弹窗
    showAccountAlert(){
        this.app.showUsdtAccountAlert(this.itemID);
    }
    //兑换
    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawApply`;
        let dataStr=''
        //如果proxy_name为“”，则不传
        if(this.app.UrlData.proxy_name == ""){
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${this.amountLabel.string}&account_id=${this.itemID}&order_type=${this.current.channel_type}&withdraw_type=6&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${this.amountLabel.string}&account_id=${this.itemID}&order_type=${this.current.channel_type}&withdraw_type=6&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`
        }
        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert('申请成功！');
                self.fetchIndex();
            }else{
                self.app.showAlert(response.msg)
            }
            self.DhBtn.getComponent(cc.Button).interactable  = true;
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            if(Number(this.results[i].is_close) > 0){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('paySelectItem').init({
                    text:this.results[i].channel_name,
                    parentComponent:this,
                    index:i,
                    channel :'usdt'
                })
            }
         }
    }


    btn1Click(){
        //按键音效
        this.app.loadMusic(1);
        
        this.showAccountAlert()
        
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
        withdraw_min_amount.forEach(item => {
            if(item.package_id == this.app.UrlData.package_id){
                minAmount = item.min_amount
                multiple_amount = item.multiple_amount
            }
        });

        if(this.results.length==0){
            this.app.showAlert('渠道未开放，请选择其他兑换方式！')
        }else if(this.walletAddressLabel.string == ''|| this.walletAddressLabel.string == '未绑定'){
            this.app.showAlert('请先绑定钱包地址')
        }else if(this.amountLabel.string == '点击输入'){
            this.app.showAlert('兑换金额不能为空！')
        }else if(Number(this.amountLabel.string)%multiple_amount != 0 && amount != minAmount ){
            this.app.showAlert(`兑换金额必须为${multiple_amount}的倍数！`)
        }
        else if(amount >Number(this.usdt_goldLabel.string)){
            this.app.showAlert('余额不足!')
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert('超出兑换范围!')
        }else{
            this.showCashAlert(this.conf_val);
        }
    }
    // update (dt) {}
}
