import gHandler = require("../../../../base/common/gHandler");
import { Language_pay } from "./../language/payLanguage";
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

        this.setLanguageResource()
    }

    public exitBtnClick(){
        //返回大厅
        if(!this.canExit) return
        //按键音效
        this.app.loadMusic(1)
        cc.director.preloadScene('hall',()=>{
            cc.director.loadScene('hall');
        })
    }

    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity_config/activityConfig?package_id=${this.app.UrlData.package_id}`;
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
            if(e.is_close == 2 && (e.name =='流水闯关活动' || e.name == '救济金活动' || e.name == "每日任务2"||
            e.name == "新人大礼包"||e.name == "月入百万"||e.name == "每周佣金奖励"||e.name == "15天送58元" ||
            e.name == "充值返利" || e.name == "推荐好友"||e.name == "开业注册送1" || e.name == "新用户首次存送1" ||
            e.name == "老用户每日存送1"   || 
            // e.name =='签到奖励6' ||e.name == '免费领水果6'||e.name == "首存彩金6" ||  e.name == "每日救援金6" ||
            e.name == "发朋友圈活动1" || e.name == "直属用户扶持1" ||e.name == "老用户包赔活动1" ||
            e.name == "新用户包赔活动1" ||e.name == '每日救援金1' || e.name == '流水闯关1' ||
            e.name == '幸运轮盘2' || e.name == '四季发财红包雨2' ||e.name == '每日签到2' || e.name == '流水奖励活动2'||
            e.name == '日亏损活动2' ||e.name == '神秘彩金活动2' ||e.name == '分享朋友圈活动2'||
            e.name == '捕鱼盈利嘉奖2' ||e.name == '首充活动2' ||e.name == '新用户包赔活动2'||e.name == '日业绩活动2'||
            e.name =='老用户包赔活动2' || e.name =='分享朋友圈活动3'||e.name =='新会员首存活动三重奏2' ||e.name =='老会员每日首存活动非自动领取2'||
            e.name =='每日任务8' ||e.name =='每日签到8'||e.name =='四季发财红包雨8'||e.name =='15天送58元8'||e.name =='分享朋友圈活动8'||
            e.name =='幸运轮盘8'  || e.name =='首充活动-81' || e.name =='新用户包赔活动-8' || e.name == "老会员每日首存活动8"|| 
            e.name == "首充活动-8"||e.name=="老用户包赔活动8"||e.name == '首充活动后端申请前端领取8'|| e.name == "首充活动-2" || 
            e.name =="老会员每日首存活动2" || e.name == "老会员每日首存活动9" || e.name == "老用户包赔活动9" ||e.name == "首充活动-9" || 
            e.name == "新用户包赔活动-9"||e.name =='15天送58元9'||e.name =='每日签到9'||e.name == "每日任务9"||e.name == "四季发财红包雨9"||e.name== "幸运轮盘9"||
            e.name== "河内连赢活动10"|| e.name == "奇趣连赢活动10"||e.name == "河内分分彩包赔10"||e.name == "AGA专属包赔10"||e.name == "新用户包赔活动10"||
            e.name == "新用户首存活动10" || e.name == "老用户首存活动10"||e.name == "奇趣分分彩包赔10"||e.name == "USDT存款大礼包9"
            )){
                this.arr.push(e);
            }
        });
        // this.arr.push({
        //     name:"河内连赢活动10",
        //     info:"",
        //     id:10
        // })
    }

    public addNavToggle(){
        this.arr.sort((a,b)=>a.order_by-b.order_by);
        if(gHandler.isJFCJ){
            //如果是从积分抽奖过来，则优先显示积分抽奖
            let arr_0 = this.arr[0]
            this.arr.forEach((e,i) => {
                if(e.name == '幸运轮盘2'){
                    this.arr[0] = e
                    this.arr[i] = arr_0
                }
            })
            gHandler.isJFCJ = false
        }
        
        for(let i:number = 0; i< this.arr.length; i++){
            let data = this.arr[i];
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            
            node.getComponent('payActivityNav').init(data)
            if(i== 0){
                if(this.arr[0].info != "" && this.arr[0].info != "{}"){
                    node.getComponent('payActivityNav').addContent(this.arr[0].name,JSON.parse(this.arr[0].info),this.arr[0].id);
                }else{
                    node.getComponent('payActivityNav').addContent(this.arr[0].name,{},this.arr[0].id);
                }
            }
        }
        if(this.arr.length==0) return;
        
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
        let endurl = this.app.gHandler.app.getIpGetEndurl(4);
        this.app.gHandler.http.sendRequestIpGet(this.app.gHandler.app.server, endurl, callback, failcallback);
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let loadSP = cc.find('Loading/loadSP')
        loadSP.children.forEach((e)=>{
            if (e.name == Language_pay.Lg.Language){
                e.active = true
            }else{
                e.active = false
            }
        })
    }
}
