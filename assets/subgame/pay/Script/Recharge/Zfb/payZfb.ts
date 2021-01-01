
//充值子界面
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../../language/payLanguage";

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    huodongLabel: cc.Label = null;

    @property(cc.Prefab)
    SelectItem: cc.Prefab =null;

    @property(cc.Node)
    selectContent: cc.Node =null;

    @property(cc.Label)
    gold1: cc.Label =null;

    @property(cc.Label)
    gold2: cc.Label =null;

    @property(cc.Label)
    gold3: cc.Label =null;

    @property(cc.Label)
    gold4: cc.Label =null;

    @property(cc.Label)
    gold5: cc.Label =null;

    @property(cc.Label)
    gold6: cc.Label =null;


    @property(cc.Label)
    czArea: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    iconFont: cc.Node = null;

    @property(cc.Label)
    wxtsLabel: cc.Label = null;

    @property
    showSelect = false;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Node)
    shuiyin: cc.Node = null;

    @property()
    public app  = null;
    public results : any = {};
    public current : any = {};
    public channel  = 'alipay';
    conf_val = 0 // usdt充值汇率
    onLoad () {
        this.huodongLabel.node.active=false;
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        //请求支付宝
        this.fetchZfb()
        this.setLanguageResource()
        this.getLocalConf()
    }
    init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.channel = data;
        if(this.channel == 'alipay' ){
            this.app.loadIcon(`recharge/flag_alipay`,this.icon,100,100)
            this.app.loadIcon(`${src}/font/flagname_alipay`,this.iconFont,126,45)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}。2.${Language_pay.Lg.ChangeByText('需要安装支付宝')}。`
            this.app.loadIcon(`recharge/subbg_alipay`,this.shuiyin,368,270)
        }else if(this.channel == 'union_pay'){
            this.app.loadIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            this.app.loadIcon(`${src}/font/flagname_scan_code_unionpay`,this.iconFont,168,45)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
        }else if(this.channel == 'wechat_pay'){
            this.app.loadIcon(`recharge/flag_wxpay`,this.icon,100,100)
            this.app.loadIcon(`${src}/font/flagname_wxpay`,this.iconFont,84,45)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}。2.${Language_pay.Lg.ChangeByText('需要安装微信')}。`;
            this.app.loadIcon(`recharge/subbg_wxpay`,this.shuiyin,368,270)
        }else if(this.channel == 'bankcard_transfer'){
            this.app.loadIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            this.app.loadIcon(`${src}/font/flagname_unionpay3`,this.iconFont,252,45) 
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
        }else if(this.channel == 'quick_pay'){
            this.app.loadIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            this.app.loadIcon(`${src}/font/flagname_unionpay2`,this.iconFont,168,45)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
        }else if(this.channel == 'bank_pay'){
            this.app.loadIcon(`recharge/flag_scan_code_unionpay`,this.icon,127,86)
            this.app.loadIcon(`${src}/font/flagname_unionpay`,this.iconFont,168,45)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
        }else if(this.channel =='im_pay'){
            if(this.app.UrlData.package_id == 2){
                this.app.loadIcon(`${src}/font/flagname_rgpay`,this.iconFont,136,42)
            }else{
                this.app.loadIcon(`${src}/font/title_im`,this.iconFont,136,45)
            }
            this.app.loadIcon(`recharge/icon_im`,this.icon,100,100)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.充值比例1元=1金币')}`
        }else if(this.channel =='digiccy'){
            this.app.loadIcon(`recharge/flag_usdt`,this.icon,100,100)
            this.app.loadIcon(`${src}/font/flagname_usdt`,this.iconFont,200,45)
            this.wxtsLabel.string = `${Language_pay.Lg.ChangeByText('温馨提示: 1.默认链类型为ERC20')}。2.${Language_pay.Lg.ChangeByText(`参考汇率：1USDT`)} ≈ ${this.conf_val}${Language_pay.Lg.ChangeByText(`金币`)}。`;
            this.app.loadIcon(`recharge/subbg_usdt`,this.shuiyin,368,270)
        }
    }
    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }

    public fetchZfb(){
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&version=${this.app.version}`;
        let index = `0`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                let discount_rate = response.data.discount_rate
                if(self.channel == 'alipay' ){
                    self.results = response.data.alipay;
                    this.setInterval(discount_rate.alipay)
                }else if(self.channel == 'union_pay'){
                    self.results = response.data.union_pay;

                    this.setInterval(discount_rate.union_pay)
                }else if(self.channel == 'wechat_pay'){
                    self.results = response.data.wechat_pay;

                    this.setInterval(discount_rate.wechat_pay)
                }else if(self.channel == 'bankcard_transfer'){
                    self.results = response.data.bankcard_transfer;
                    // self.huodongLabel.node.active=true;

                    this.setInterval(discount_rate.bankcard_transfer)
                }else if(self.channel == 'quick_pay'){
                    self.results = response.data.quick_pay;
                    this.setInterval(discount_rate.quick_pay)
                }else if(self.channel == 'bank_pay'){
                    self.results = response.data.bank_pay;
                    this.setInterval(discount_rate.bank_pay)
                }else if(self.channel =='im_pay'){
                    self.results = response.data.im_pay;
                    this.setInterval(discount_rate.im_pay)
                }else if(self.channel =='digiccy'){
                    self.results = response.data.digiccy;
                }
                self.current = self.results[0];
                self.radioList();
                self.initRender();
            }else{
                self.app.hideLoading()
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading()
        })
    }
    setInterval(discount_rate_item) {
        let percent = 0
        let minAmount = 0
        let maxAmount = 0
        discount_rate_item.forEach( (e,i) => {
            if(e.package_id == this.app.UrlData.package_id) {
                percent = e.interval[0].percent
                minAmount = e.interval[0].min
                maxAmount = e.interval[0].max
            }
        });
        if(percent >0){
            this.wxtsLabel.string = `${this.wxtsLabel.string}${Language_pay.Lg.ChangeByText("充值优惠")}: ${Language_pay.Lg.ChangeByText('充值')}${minAmount}-${maxAmount},${Language_pay.Lg.ChangeByText('赠送')} ${percent*100}%,`
        }
    }
    public initRender(){
        var span_amount = this.current.span_amount.split(',');
        this.czArea.string = `${Language_pay.Lg.ChangeByText('充值范围')}:(${this.current.min_amount}-${this.current.max_amount})`
        this.gold1.string = span_amount[0]?span_amount[0]:'10';
        this.gold2.string = span_amount[1]?span_amount[1]:'50';
        this.gold3.string = span_amount[2]?span_amount[2]:'100';
        this.gold4.string = span_amount[3]?span_amount[3]:'500';
        this.gold5.string = span_amount[4]?span_amount[4]:'1000';
        this.gold6.string = span_amount[5]?span_amount[5]:'5000';
    }

    public deleteAmount(){
        
        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.amountLabel);
    }

    //确认充值按钮回调
    public onClick(){
        //按键音效
        this.app.loadMusic(1);
        var amount = Number(this.amountLabel.string);
        var min_amount = Number(this.current.min_amount);
        var max_amount = Number(this.current.max_amount);
        if(this.amountLabel.string ==Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert('充值金额不能为空!')
        }else if(amount < min_amount || amount > max_amount){
            this.app.showAlert('不符合充值范围!')
        }else{
            if(this.channel == 'bankcard_transfer'){
                this.fetchOrder();
            }
            // else if(this.channel == 'im_pay'){
            //     this.showPayIM()
            // }
            else{
                var url = `${this.app.UrlData.host}/api/payment/payment?user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&payment_amount=${this.amountLabel.string}&channel_type=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
                cc.sys.openURL(encodeURI(url))
                cc.log(encodeURI(url))
            }
        }
    }

    showPayIM(){
        var url = `${this.app.UrlData.host}/api/payment/payment?user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&payment_amount=${this.amountLabel.string}&channel_type=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
        cc.find('payGlobal').getComponent('payGlobal').imWebViewUrl = encodeURI(url)
        cc.director.preloadScene("payIM",()=>{
            this.app.gHandler.reflect.setOrientation("portrait", 640, 1136)
            cc.director.loadScene('payIM')
        })
    }

    fetchOrder(){
        let data = {
            amount:this.amountLabel.string,
            channel_id:this.current.channel_id,
            pay_type:this.current.pay_type,
            order_type:1
        };
        this.app.showOrderAlert(1,data);
    }

    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            var node = cc.instantiate(this.SelectItem);
            this.selectContent.addChild(node);
            node.getComponent('paySelectItem').init({
                text:this.results[i].name,
                parentComponent:this,
                index:i,
                channel:this.channel
            })
        }
    }


    addGold(e){
        //按键音效
        this.app.loadMusic(1);
        var string = e.currentTarget.children[1].getComponent(cc.Label).string;
        let amount = this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入') ? '0': this.amountLabel.string;
        var sum = Number(amount)+Number(string);
        this.amountLabel.string = `${sum}`;
        this.app.setInputColor(sum,this.amountLabel);
    }
    getLocalConf(){
        let pay_usdt = cc.sys.localStorage.getItem(`pay_usdt`)
        let time = new Date().getTime()/1000
        if(pay_usdt){
            let created_time = JSON.parse(pay_usdt).time
            if((time - created_time) > 6*3600){
                //如果超过六个小时，则重新拉取数据
                this.fetchGetConfigInfo()
            }else{
                //否则使用本地缓存的数据
                this.setConf_val(JSON.parse(pay_usdt))
            }
        }else{
            this.fetchGetConfigInfo()
        }
    }
    setConf_val(pay_usdt){
        this.conf_val = pay_usdt.conf_val
        this.init(this.channel)
    }
    public fetchGetConfigInfo(){
        var url = `${this.app.UrlData.host}/api/config/getConfigInfo?conf_key=usdt_to_cny1&token=${this.app.token}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let time = new Date().getTime()/1000
                let pay_usdt = {
                    conf_val :Number(response.data[0].conf_val), //汇率
                    time : time, //保存的时间
                }
                cc.sys.localStorage.setItem(`pay_usdt`,JSON.stringify(pay_usdt))
                this.setConf_val(pay_usdt)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let qudao= cc.find("Canvas/Recharge/Content/Zfb/titlebg/group2/qudao")
        let txt_czje= cc.find("Canvas/Recharge/Content/Zfb/titlebg/group3/txt_czje")
        let btn_75= cc.find("Canvas/Recharge/Content/Zfb/titlebg/group3/group2/75")
        let czgoldbt1= cc.find("Canvas/Recharge/Content/Zfb/czgoldbt1")
        let label= this.node.getChildByName('label').getComponent(cc.Label)

        this.app.loadIconLg(`${src}/font/txt_qudao`,qudao)
        this.app.loadIconLg(`${src}/font/txt_czje`,txt_czje)
        this.app.loadIconLg(`${src}/btn/75`,btn_75)
        this.app.loadIconLg(`${src}/btn/czgoldbt1`,czgoldbt1)
        
        label.string = `${Language_pay.Lg.ChangeByText("开展中的活动：通过 '转账到银行卡' 充值方式，单笔充值10000以上，即可获得额外多赠送1%！")}`
    }
    
    
}
