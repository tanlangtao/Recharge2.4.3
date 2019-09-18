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
        this.app = cc.find('Canvas/Main').getComponent('Main');
        this.addNavToggle()

        this.fetchIndex();
    }

    start () {

    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/payment/payHistory?user_id=${this.app.UrlData.user_id}&token=${this.app.token}&order_status=${this.order_status}&page=${this.page}&page_set=8&version=${this.app.version}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
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
                    node.getComponent('RechargeHistoryListItem').init({
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
        })
    }

    public addNavToggle(){
        var arr = ['全部','已完成','未完成','已撤销'];
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('RechargeHistoryToggle').init({
                text : arr[i],
                index : i,
                parentComponet:this
            })
        }
    }

    removeSelf(){
        //按键音效
        this.app.clickClip.play();
        this.node.destroy();
        //刷新Dc的数据
        let Dc = cc.find('Canvas/Recharge/Content/Dc');
        if(Dc){
            Dc.getComponent('Dc').fetchIndex()
        }
    }

    pageUp(){
        //按键音效
        this.app.clickClip.play();
        if(this.page > 1){
            this.page = this.page - 1;
            this.fetchIndex();
        }
    }

    pageDown(){
        //按键音效
        this.app.clickClip.play();

        if(this.page < this.results.data.total_page ){
            this.page = this.page + 1;
            this.fetchIndex();
        }
    }
    // update (dt) {}
}
