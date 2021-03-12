
import payMain from '../../payMain'
import { Language_pay } from "./../../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ScrollView:cc.Node = null
    @property(cc.Prefab)
    Item:cc.Prefab = null

    @property(cc.Node)
    Content:cc.Node = null

    @property(cc.Node)
    goldGroup:cc.Node[] = []

    @property(cc.Node)
    zhongjiangBg :cc.Node = null;

    activity_id = 0
    app :payMain= null
    info = {}
    bylevel = []
    TaskDetail = null
    btnCanClick = true;
    onLoad() {
        
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setActivityConfig()
        this.fetchByDayTaskDetail()
        this.setLanguageResource()
    }
    public setIdInfo(id,info){
        this.activity_id = id
        this.info = info
    }
    private setActivityConfig(){
        console.log("info",this.info)
        for(var game_id in this.info['game'] ){
            for( var task_id in this.info['game'][game_id]){
                var item = this.info['game'][game_id][task_id]
                var node = cc.instantiate(this.Item)
                node.getComponent("payDailyActivityItem").init(game_id,task_id,item)
                this.Content.addChild(node)
            }
        }
    }
    /**
     * 
     * @param game_id game_id
     * @param task_id task_id
     * @param rewardLabelString  奖励金额
     * @param isIntegral 奖励类型，积分/金币
     * @param callBack 
     */
    public fetchGetTask(game_id,task_id,rewardLabelString,isIntegral,callBack = ()=>{}){
        var url = `${this.app.UrlData.host}/api/activity/getTask`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}&game_id=${game_id}&task_id=${task_id}`
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.app.showAlert("领取成功!")
                cc.log("response",response)
                this.zhongjiang(rewardLabelString,isIntegral)
                this.fetchByDayTaskDetail()
                callBack()
            }else{
                this.app.showAlert(`领取失败, ${response.msg}`)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public fetchByDayTaskDetail(){
        var url = `${this.app.UrlData.host}/api/activity/dayTaskDetail?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if (response.status == 0) {
                this.TaskDetail = response.data
                this.setItemDetail()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`${errstatus}`)
        })
    }
    setItemDetail(){
        this.Content.children.forEach((e)=>{
            let item = e.getComponent("payDailyActivityItem")
            item.setDetail(this.TaskDetail,this)
        })
    }
    zhongjiang(rewardLabelString,isIntegral){
        this.zhongjiangBg.active = true 
        let sp2 = this.zhongjiangBg.getChildByName('sp2')
        if(isIntegral){
            sp2.getChildByName('lw_zj_txt_jinbi').active = false
            sp2.getChildByName('lw_zj_txt_jf').active = true
        }else{
            sp2.getChildByName('lw_zj_txt_jinbi').active = true
            sp2.getChildByName('lw_zj_txt_jf').active = false
        }
        sp2.getChildByName('label').getComponent(cc.Label).string = rewardLabelString
        sp2.active = true
        this.playSpine(sp2,'chuxian',false,1,()=>{
           this.playSpine(sp2,'xunhuan',true,1,()=>{
           })
       })
    }
    confirmClick(){
        let sp2 = this.zhongjiangBg.getChildByName('sp2')
        sp2.active = false
        this.zhongjiangBg.active = false
    }
    /**
      * 播放spine动画函数
      * @param node spine动画节点
      * @param animName 动画名称
      * @param loop 是否循环播放动画
      * @param callback 结束回调
      */
     public playSpine(node:cc.Node,animName :string, loop :boolean,speed:number, callback :Function) :void{
        let spine = node.getComponent(sp.Skeleton);
        let track = spine.setAnimation(0, animName, loop);
        spine.timeScale = speed;
        if (track) {
            // 注册动画的结束回调
            spine.setCompleteListener((trackEntry, loopCount) => {
                let name = trackEntry.animation ? trackEntry.animation.name : '';
                if (name === animName && callback) {
                    callback(); // 动画结束后执行自己的逻辑
                }
            });
        }
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let lw_zj_txt_jinbi= cc.find('Canvas/Activity/Content/DailyActivity/bg/zhongjiangBg/sp2/lw_zj_txt_jinbi')
        let lw_zj_txt_jf= cc.find('Canvas/Activity/Content/DailyActivity/bg/zhongjiangBg/sp2/lw_zj_txt_jf')
        let lw_btn_confirm= cc.find('Canvas/Activity/Content/DailyActivity/bg/zhongjiangBg/sp2/lw_btn_confirm')

        this.app.loadIconLg(`${src}/activeSprite/lw_zj_txt_jinbi`,lw_zj_txt_jinbi)
        this.app.loadIconLg(`${src}/activeSprite/lw_zj_txt_jf`,lw_zj_txt_jf)
        this.app.loadIconLg(`${src}/activeSprite/lw_btn_confirm`,lw_btn_confirm)
    }
}
