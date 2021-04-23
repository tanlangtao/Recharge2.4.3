
const {ccclass, property} = cc._decorator;
import { Language_pay } from "../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle : cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer : cc.Node = null;

    @property(cc.Prefab)
    ListItem : cc.Prefab = null;

    @property(cc.Node)
    List : cc.Node = null;

    @property(cc.Label)
    pageLabel : cc.Label = null;

    @property()
    public results : any = {};
    public order_status = 0;
    public page = 1;
    public app = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.addNavToggle()

        this.fetchIndex();
        let scalex = cc.winSize.width / 1334;
        var content = cc.find('Canvas/Recharge/RechargeHistory/Content');
        if(this.app.UrlData.package_id == 9)
        {
            let fanhui = cc.find("header/fanhui",this.node);
            fanhui.scaleY/=scalex;
            fanhui.scaleX/=scalex;
        }
        else
        {
            content.scaleY = 1/scalex;
        }
        this.ToggleContainer.parent.parent.height = Number(this.ToggleContainer.parent.parent.height)-Number(this.ToggleContainer.parent.parent.height)*(scalex-1)
        this.setLanguageResource()
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/payment/payHistory?user_id=${this.app.UrlData.user_id}&order_status=${this.order_status}&page=${this.page}&page_set=8`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading();
            //结果返回之前先清空列表
            self.List.removeAllChildren();
            if(response.status == 0){
                self.results = response;
                self.pageLabel.string = `${self.page} / ${response.data.total_page == 0 ? '1' : response.data.total_page}`;
                var listArr = response.data.list;
                for(var i = 0; i < listArr.length; i++){
                    var data = listArr[i];
                    var node = cc.instantiate(self.ListItem);
                    self.List.addChild(node);
                    node.getComponent('payRechargeHistoryListItem').init({
                        amount : data.amount,
                        arrival_amount : data.arrival_amount,
                        status : data.status,
                        type : data.type,
                        firstTime : data.created_at,
                        lastTime : data.arrival_at,
                        results:data
                    })
                }
            }else{
                self.app.showAlert(data.msg);
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.app.hideLoading()
        })
    }

    public addNavToggle(){
        var arr = ['全部','已完成','未完成','已撤销'];
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payRechargeHistoryToggle').init({
                text : arr[i],
                index : i,
                parentComponet:this
            })
        }
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1)
        this.node.destroy();
        //刷新Dc的数据
        let Dc = cc.find('Canvas/Recharge/Content/Dc');
        if(Dc){
            Dc.getComponent('payDc').fetchIndex()
        }
    }

    pageUp(){
        //按键音效
        this.app.loadMusic(1);
        if(this.page > 1){
            this.page = this.page - 1;
            this.fetchIndex();
        }
    }

    pageDown(){
        //按键音效
        this.app.loadMusic(1);

        if(this.page < this.results.data.total_page ){
            this.page = this.page + 1;
            this.fetchIndex();
        }
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let chongzhiklis= cc.find("Canvas/Recharge/RechargeHistory/header/title/chongzhiklis")
        let titlebg= cc.find("Canvas/Recharge/RechargeHistory/Content/titlebg")

        this.app.loadIconLg(`${src}/font/chongzhiklis`,chongzhiklis)
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 9 || this.app.UrlData.package_id == 10){
            titlebg.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('下单金额')
            titlebg.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('到账金额')
            titlebg.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('状态')
            titlebg.children[3].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('类型')
            titlebg.children[4].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('下单时间')
            titlebg.children[5].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('到账时间')
            titlebg.children[6].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('操作')
        }else{
            this.app.loadIconLg(`${src}/form/cz_title_kuang`,titlebg)
        }
    }
    // update (dt) {}
}
