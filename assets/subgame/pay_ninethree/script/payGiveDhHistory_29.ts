
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_29";
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    ListItem : cc.Prefab = null;

    @property(cc.Node)
    List : cc.Node = null;

    @property(cc.Label)
    pageLabel : cc.Label = null;

    @property()
    public app = null;
    public results : any = {};
    public order_status = 0;
    public page = 1;
    public page_set = 8;
    // LIFE-CYCLE CALLBACKS:
    ReturnToHall = false
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_29');
        if(this.app.UrlData.package_id == 29){
            this.page_set = 6
        }else{
            this.page_set = 8
        }
        this.fetchIndex();
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/sendMoneyHistory?`;
        let dataStr= `user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&page=${this.page}&page_set=${this.page_set}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            self.app.hideLoading();
            self.ReturnToHall = true
            self.List.removeAllChildren();
            if(response.status == 0){
                self.results = response;
                self.pageLabel.string = `${self.page} / ${response.data.total_page == 0 ? '1' : response.data.total_page}`
                if(this.app.UrlData.package_id == 29){
                    let pageLabel2 = this.node.getChildByName("Content").getChildByName("pageLabel").getComponent(cc.Label)
                    pageLabel2.string = `每页6条 共${response.data.total_page == 0 ? '1' : response.data.total_page}页`
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
                    node.getComponent('payGiveDhHistoryListItem_29').init(data)
                }

            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
            this.ReturnToHall = true
        })
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1)
        if(this.ReturnToHall){
            this.node.destroy();
        }
    }

    pageUp(){
        //按键音效
        this.app.loadMusic(1);
        if(this.page > 1){
            this.page = this.page - 1
            this.fetchIndex();
        }
    }

    pageDown(){
        //按键音效
        this.app.loadMusic(1);
        if(this.page < this.results.data.total_page ){
            this.page = this.page + 1
            this.fetchIndex();
        }

    }
    pageFirst(){
        this.page = 1
        this.fetchIndex();
    }
    pageLast(){
        this.page = this.results.data.total_page == 0 ? 1:this.results.data.total_page
        this.fetchIndex();
    }
}
