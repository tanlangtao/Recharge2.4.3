
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
        this.ToggleContainer.parent.parent.height = Number(this.ToggleContainer.parent.parent.height)-Number(this.ToggleContainer.parent.parent.height)*(scalex-1)+20
        nav.scaleX= scalex;
        nav.scaleY = scalex;

        // this.getNotice() 
    }

    public exitBtnClick(){
        //返回大厅
        if(!this.canExit) return
        //按键音效
        this.app.clickClip.play()
        cc.director.preloadScene('hall',()=>{
            cc.director.loadScene('hall');
        })
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity_config/activityConfig?package_id=${this.app.UrlData.package_id}&token=${this.app.token}&version=${this.app.version}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if (response.status == 0) {
                this.app.hideLoading();
                this.huodongConfig = response;

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
            if(e.is_close == 2 && (e.name =='流水闯关活动' ||e.name =='流水闯关活动1' ||e.name =='流水闯关1'|| e.name == '救济金活动' || 
            e.name == "首充送金活动"||e.name == "每日任务"||e.name == "新人大礼包"||
            e.name == "月入百万"||e.name == "每周佣金奖励"||e.name == "15天送58元" ||
            e.name == "充值返利" || e.name == "推荐好友"|| e.name == "首充赠金1" ||
            e.name == "开业注册送1" || e.name == "次日存送1"|| e.name == "充值返利1"||
            e.name == "首充赠金-test" || e.name == "新用户首次存送1" ||e.name == "老用户每日存送1" ||
            e.name == "首存彩金6"  ||  e.name == "每日救援金6" 
            )){
                this.arr.push(e);
            }
        });
        // this.arr.push({
        //     name:'流水闯关1',
        //     info:JSON.stringify({"game_id": ["5b1f3a3cb76a591e7f2517a6", "5c6a62be7ff587m117d446aa", "5b1f3a3cb76a591e7f251722", "5b1f3a3cb76a591e7f251718", "5b1f3a3cb76a591e7f251713", "5b1f3a3cb76a591e7f251716", "5b1f3a3cb76a591e7f251712", "5b1f3a3cb76a591e7f251724"], "level_1": {"gold": 38, "statement": 888}, "level_2": {"gold": 158, "statement": 3888}, "level_3": {"gold": 258, "statement": 8888}, "level_4": {"gold": 1088, "statement": 28888}, "level_5": {"gold": 1888, "statement": 58888}, "flow_rate": 1}),
        //     id:8
        // })
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
        
        if(this.arr[0].info != "" && this.arr[0].info != "{}"){
            node.getComponent('payActivityNav').addContent(this.arr[0].name,JSON.parse(this.arr[0].info),this.arr[0].id);
        }else{
            node.getComponent('payActivityNav').addContent(this.arr[0].name,{},this.arr[0].id);
        }
    }

    /**
         * @Description: 获取公告
         */
    getNotice() {
        if (this.app.gHandler.gameGlobal.noticeList.length > 0) {
                return
            }
        let callback = (data, url) => {
            // console.log("公告 callback", data)
            if (data.code == 200) {
                if (!data.msg || data.msg.length == 0) {
                    // console.log("没有公告需要显示")
                } else {
                    let deleteNotice = this.app.gHandler.localStorage.getGlobal().noticeDeleteKey
                    data.msg.sort((a, b) => a.sort - b.sort).forEach((e, i) => {
                        if (e.type === 2) { // type == 2 是公告 == 1 是活动  is_slider
                            let isdelete = false
                            if (deleteNotice) {
                                for (let j = 0; j < deleteNotice.length; j++) {
                                    if (deleteNotice[j] == e.create_time) {
                                        isdelete = true
                                        break
                                    }
                                }
                            }
                            if (!isdelete) {
                                let notice = {
                                    key: this.app.gHandler.gameGlobal.noticeList.length,
                                    isread: 0,
                                    type: e.type,
                                    title: e.title,
                                    words: e.words,
                                    create_time: e.create_time,
                                    end_time: e.end_time,
                                    start_time: e.start_time,
                                };
                                this.app.gHandler.gameGlobal.noticeList.push(notice)
                            }
                        }
                        if (e.is_slider === 1) { // 是否跑马灯
                            this.app.gHandler.gameGlobal.slideNoticeList.push({
                                time: 1,
                                rollforver: true,
                                notice: e.words.replace(/\s+/g, "")
                            })
                        }
                    })
                    if (this.app.gHandler.gameGlobal.noticeList.length > 0) {
                        if (this.app.gHandler.hqqisShowNotice) {
                            this.app.gHandler.hqqisShowNotice = false
                            this.app.gHandler.eventMgr.dispatch(this.app.gHandler.eventMgr.showNotice, null)
                        }
                    }
                    if (this.app.gHandler.gameGlobal.slideNoticeList.length > 0) {
                        this.app.gHandler.eventMgr.dispatch(this.app.gHandler.eventMgr.addSliderNotice, this.app.gHandler.gameGlobal.slideNoticeList)
                    }
                }
            }
        }
        let failcallback = (status) => {
        }
        let endurl = this.app.gHandler.appGlobal.getIpGetEndurl(4);
        this.app.gHandler.http.sendRequestIpGet(this.app.gHandler.appGlobal.server, endurl, callback, failcallback);
    }
}
