
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content:cc.Node = null;

    @property()
    public results : any = {};
    public zfbResults : any = {};
    public app = null ;
    huodongConfig = null;
    //请求次数
    public idx  = 0;
    arr : any= [];
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
    }

    public exitBtnClick(){
        //返回大厅
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity_config/activityConfig?package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
        fetch(url,{
            method:'get'
        }).then((data)=>data.json()).then((data)=>{
            if(data.status == 0){
                this.app.hideLoading();
                this.huodongConfig = data;
                //取消活动
                this.addHuodong();
                this.addNavToggle();
            }else{
                this.app.showAlert(data.msg)
            }
        })
    }

    public addHuodong(){
        this.huodongConfig.data.forEach((e)=>{
            if(e.is_close == 2){
                this.arr.push(e);
            }
        });

    }

    public addNavToggle(){
        this.arr.sort((a,b)=>a.order_by-b.order_by);
        for(let i:number = 0; i< this.arr.length; i++){
            let data = this.arr[i];
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('payActivityNav').init(data)
        }
        if(this.arr[0].name == '流水闯关活动'){
            node.getComponent('payActivityNav').addContent('ChuangGuan',JSON.parse(this.arr[0].info).type,this.arr[0].id);
        }else if(this.arr[0].name =='存送活动'){
            node.getComponent('payActivityNav').addContent('HuoDong',JSON.parse(this.arr[0].info).type,this.arr[0].id);
        }
    }
}
