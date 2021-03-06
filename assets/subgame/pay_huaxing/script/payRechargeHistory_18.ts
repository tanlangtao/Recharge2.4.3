
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_18";
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
    public page_set = 6;
    // LIFE-CYCLE CALLBACKS:
    public ReturnToHall = false
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_18');
        if(this.app.UrlData.package_id != 16){
            this.addNavToggle()
            this.page_set = 8
        }else{
            this.page_set = 6
        }
        this.fetchIndex();
        let scalex = cc.winSize.width / 1334;
        var content = cc.find('Canvas/Recharge/RechargeHistory/Content');
        if(this.app.UrlData.package_id == 9)
        {
            let fanhui = cc.find("header/fanhui",this.node);
            // fanhui.scaleY/=scalex;
            fanhui.scaleX/=scalex;

            let title = cc.find("header/title",this.node);
            // fanhui.scaleY/=scalex;
            title.scaleX/=scalex;
        }
        else
        {
            
        }
        this.ToggleContainer.parent.parent.height = Number(this.ToggleContainer.parent.parent.height)-Number(this.ToggleContainer.parent.parent.height)*(scalex-1)
        this.setLanguageResource()
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/payment/payHistory?user_id=${this.app.UrlData.user_id}&order_status=${this.order_status}&page=${this.page}&page_set=${this.page_set}`;
        let self = this;
        this.app.showLoading()
        this.ReturnToHall = false
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading();
            this.ReturnToHall = true
            //?????????????????????????????????
            this.List.removeAllChildren();
            if(response.status == 0){
                self.results = response;
                self.pageLabel.string = `${self.page} / ${response.data.total_page == 0 ? '1' : response.data.total_page}`;
                if(this.app.UrlData.package_id == 16){
                    let pageLabel2 = this.node.getChildByName("Content").getChildByName("pageLabel").getComponent(cc.Label)
                    pageLabel2.string = `??????6??? ???${response.data.total_page == 0 ? '1' : response.data.total_page}???`
                    let zwsj = this.node.getChildByName("Content").getChildByName("zwsj")
                    if(response.data.list.length == 0 ){
                        zwsj.active = true
                    }else{
                        zwsj.active = false
                    }
                }
                var listArr = response.data.list;
                for(var i = 0; i < listArr.length; i++){
                    var data = listArr[i];
                    var node = cc.instantiate(self.ListItem);
                    self.List.addChild(node);
                    node.getComponent('payRechargeHistoryListItem_18').init({
                        amount : data.amount,
                        arrival_amount : data.arrival_amount,
                        status : data.status,
                        type : data.type,
                        firstTime : data.created_at,
                        lastTime : data.arrival_at,
                        results:data
                    },this.fetchIndex.bind(this))
                }
            }else{
                self.app.showAlert(response.msg);
            }
        },(errstatus)=>{
            self.app.showAlert(`????????????${errstatus}`)
            self.app.hideLoading()
            this.ReturnToHall = true
        })
    }

    public addNavToggle(){
        var arr = ['??????','?????????','?????????','?????????'];
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payRechargeHistoryToggle_18').init({
                text : arr[i],
                index : i,
                parentComponet:this
            })
        }
    }

    removeSelf(){
        //????????????
        this.app.loadMusic(1)
        //??????????????????????????????????????????
        if(this.ReturnToHall){
            this.node.destroy();
        }
        cc.systemEvent.emit("closeRechargeHistory");
    }

    pageUp(){
        //????????????
        this.app.loadMusic(1);
        if(this.page > 1){
            this.page = this.page - 1;
            this.fetchIndex();
        }
    }

    pageDown(){
        //????????????
        this.app.loadMusic(1);

        if(this.page < this.results.data.total_page ){
            this.page = this.page + 1;
            this.fetchIndex();
        }
    }
    pageFirst(){
        this.page = 1
        this.fetchIndex();
    }
    pageLast(){
        this.page = this.results.data.total_page
        this.fetchIndex();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let chongzhiklis= cc.find("Canvas/Recharge/RechargeHistory/header/title/chongzhiklis")
        let titlebg= cc.find("Canvas/Recharge/RechargeHistory/Content/titlebg")
        
        this.app.loadIconLg(`${src}/font/chongzhiklis`,chongzhiklis)
        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 9 || this.app.UrlData.package_id == 10 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22 || this.app.UrlData.package_id == 15  || this.app.UrlData.package_id == 18||this.app.UrlData.package_id == 20){
            titlebg.children[0].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('????????????')
            titlebg.children[1].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('????????????')
            titlebg.children[2].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('??????')
            titlebg.children[3].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('??????')
            titlebg.children[4].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('????????????')
            titlebg.children[5].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('????????????')
            titlebg.children[6].getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('??????')
        }else if(this.app.UrlData.package_id == 16){

        }else{
            this.app.loadIconLg(`${src}/form/cz_title_kuang`,titlebg)
        }
    }
    // update (dt) {}
}
