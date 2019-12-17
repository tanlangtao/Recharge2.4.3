
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
    arr : any= [];

    timer = null;
    canExit = false;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
         //设置延迟，避免用户频繁操作导致报错
         this.timer = setTimeout(() => {
            this.canExit = true;
            clearTimeout(this.timer)
        }, 1000);
        let scalex = cc.winSize.width / 1334;
        var nav = cc.find('Canvas/Activity/nav');
        nav.scaleX= scalex;
        nav.scaleY = scalex;
    }

    public exitBtnClick(){
        //返回大厅
        if(!this.canExit) return
        //按键音效
        this.app.clickClip.play();
        cc.director.loadScene("hall");
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity_config/activityConfig?package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if (response.status == 0) {
                this.app.hideLoading();
                this.huodongConfig = response;
                //取消活动
                this.addHuodong();
                this.addNavToggle();
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`${errstatus}`)
        })
    }

    public addHuodong(){
        this.huodongConfig.data.forEach((e)=>{
            if(e.is_close == 2 && e.name =='流水闯关活动'){
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
        if(this.arr.length==0) return;
        if(this.arr[0].name == '流水闯关活动'){
            node.getComponent('payActivityNav').addContent('ChuangGuan',JSON.parse(this.arr[0].info).type,this.arr[0].id);
        }else if(this.arr[0].name =='存送活动'){
            node.getComponent('payActivityNav').addContent('HuoDong',JSON.parse(this.arr[0].info).type,this.arr[0].id);
        }
    }
}
