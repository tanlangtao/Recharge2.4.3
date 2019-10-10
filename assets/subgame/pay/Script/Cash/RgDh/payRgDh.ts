
const {ccclass, property} = cc._decorator;
import gHandler = require("../../../../../common/script/common/gHandler");
@ccclass
export default class payRgDh extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;
    
    @property(cc.Prefab)
    RgDcItem : cc.Prefab = null;

    @property()
    results = null;
    app = null;
    data = null;
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchImIndex();
       
    }
    
    fetchImIndex(){
        let url = `${this.app.UrlData.imHost}/im/api/recharge/list?skip=0&limit=6&token=c7a9d6g21v87s&package_id=${this.app.UrlData.package_id}&user_type=2`
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading();
            if(response.code== 0){
                self.results = response;
                self.fetchIndex();
               
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
            if(response.status == 0){
                self.data = response;
                self.renderItem();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
   
    renderItem(){
        if(this.results.data != null){
            this.content.removeAllChildren();
            this.results.data.forEach((e,index )=> {
                var node = cc.instantiate(this.RgDcItem);
                this.content.addChild(node);
                node.getComponent('payRgDhItem').init(e,index,this.data)
            });
        }
    }
    showIm(){
        // 唤起IM
        gHandler.Reflect.setOrientation("portrait", 640, 1136)
        cc.director.loadScene('IMappStart');
    }
}
