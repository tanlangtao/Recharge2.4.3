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

    @property(cc.Node)
    content: cc.Node = null;
    
    @property(cc.Prefab)
    RgDcItem : cc.Prefab = null;

    @property()
    results = null;
    app = null;
    data = null;
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('Main');
        this.fetchImIndex();
        
    }
    
    fetchImIndex(){
        let url = `${this.app.UrlData.imHost}/im/api/recharge/list?skip=0&limit=6&token=c7a9d6g21v87s&package_id=${this.app.UrlData.package_id}`
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
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
        this.content.removeAllChildren();
        this.results.data.forEach((e,index )=> {
            var node = cc.instantiate(this.RgDcItem);
            this.content.addChild(node);
            node.getComponent('RgDhItem').init(e,index,this.data)
        });
    }
    showIm(){
        // 唤起IM
        this.app.Client.send('__onim',{});
    }
}
