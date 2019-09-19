//人工代充

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;
    
    @property(cc.Prefab)
    RgDcItem : cc.Prefab = null;

    @property()
    results = null;
    app = null;
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex()
        
    }
    fetchIndex(){
        let url = `${this.app.UrlData.imHost}/im/api/recharge/list?skip=0&limit=6&token=c7a9d6g21v87s&package_id=${this.app.UrlData.package_id}`
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.code== 0){
                this.app.hideLoading();
                self.results = response;
                self.renderItem()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    renderItem(){
        if(this.results.data != null){
            this.results.data.forEach((e,index )=> {
                var node = cc.instantiate(this.RgDcItem);
                this.content.addChild(node);
                node.getComponent('payRgDcItem').init(e,index);
            });
        }
    }
}
