const {ccclass, property} = cc._decorator;
import payMain from '../../payMain'
@ccclass
export default class NewClass extends cc.Component {

   @property()
    app :payMain= null;
    activity_id = 0;//活动id
    activity_name = ''//活动名称
    today_statement = 0;//今日总流水
    remainingGold = 0;//今日剩余可领金币
    page = 1;
    canClick = true;
    @property(cc.Node)
    Middle: cc.Node = null;//内容node

    @property(cc.Node)
    hongbaoArr: cc.Node[] = [];//5个红包

    @property(cc.Label)
    goldLabel: cc.Label = null;//可领金币label

    @property(cc.ProgressBar)
    ProgressBar : cc.ProgressBar = null;//进度条

    @property(cc.Label)
    totalStatement:cc.Label = null;

    @property(cc.Node)
    GetGoldHistory : cc.Node = null;//领取历史

    @property(cc.Node)
    HistoryScroll : cc.Node = null;//滑动框

    @property(cc.Prefab)
    ListItem : cc.Prefab = null;//记录item

    protected onLoad(): void {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.fetchIndex();
        this.HistoryScroll.on('scroll-to-bottom',this.historyScrollToBottom);

        // let scalex = cc.winSize.width / 1334;
        // this.Middle.scaleX = scalex;
        // this.Middle.scaleY = scalex;
    }

    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/receiveGoldInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                let info = response.data.receive_info;
                this.today_statement = response.data.today_statement;//设置今日总流水;
                this.totalStatement.string =this.app.config.toDecimal2(this.today_statement); 
                this.setStatement(info)
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.hideLoading()
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    
    private setStatement(info){
        this.remainingGold = 0;//清空上一轮
        this.hongbaoArr.forEach((item,index)=>{
            let infoItem = info[`level_${index+1}`]
            item.getChildByName('statement').getComponent(cc.Label).string = infoItem.statement;
            item.getChildByName('gold').getComponent(cc.Label).string = infoItem.gold;
            if(infoItem.statement > this.today_statement){
                item.getChildByName('linkBg').active = false
                item.getChildByName('linkBg').stopAllActions()
                item.getChildByName('tag_available').active = false //隐藏领取按钮
                item.getChildByName('tag_received').active = false // 隐藏已领取
            }else{
                if(infoItem.has_receive == 0){
                    //背景闪烁动画
                    item.getChildByName('linkBg').active = true
                    var action = cc.fadeIn(1.0)
                    var action2 = cc.fadeOut(1.0)
                    item.getChildByName('linkBg').runAction(cc.repeatForever(cc.sequence(action,action2)))

                    //领取按钮动画
                    item.getChildByName('tag_available').active = true
                    item.getChildByName('tag_received').active = false // 隐藏已领取
                    var actionMove = cc.moveBy(1,cc.v2(0,10))
                    var actionMove2 = cc.moveBy(1,cc.v2(0,-10))
                    item.getChildByName('tag_available').runAction(cc.repeatForever(cc.sequence(actionMove,actionMove2)))
                }else{
                    item.getChildByName('tag_available').stopAllActions()
                    item.getChildByName('tag_available').active = false //隐藏领取按钮
                    
                    item.getChildByName('tag_received').active = true // 显示已领取
                }
            }
        })
        
        for(var k in info){
            if((info[k].statement <= this.today_statement) && info[k].has_receive==0){
                this.remainingGold += Number(info[k].gold);
            }
        }
        this.goldLabel.string = `${this.remainingGold}`;
        this.mathProgress(info);
    }
    //计算进度条
    private mathProgress(info){
        var progress = 0;
        var lastKey = '';
        for(var k in info){ 
            if(lastKey == ''){
                //lastKey为空，说明是第一个区间,statement = 0;
                var step = (this.today_statement / info[k].statement )*0.1;
                if (step > 0.1) {
                    step = 0.1
                };
                lastKey = k;
                progress += step;
            }else if(info[k].statement<this.today_statement){
                progress += 0.2;
                lastKey = k;
            }else{
                var step = ((this.today_statement-info[lastKey].statement) / (info[k].statement - info[lastKey].statement))*0.2;
                progress += step;
                break;
            }
        }
        if(info["level_5"].statement<this.today_statement){
            var step = (this.today_statement - info["level_5"].statement) /info["level_5"].statement*0.1;
            if(step>0.1) {
                step = 0.1
            }
            progress += step;

        }
        this.ProgressBar.progress = progress;
    }
    public setId(id,activity_name){
        this.activity_id = id;
        this.activity_name = activity_name;
    }
    public fetchGold(level){
        cc.log('领取第 ',level,' 档红包')
        this.canClick = false
        let url = `${this.app.UrlData.host}/api/activity/receiveGold`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&level=${level}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&activity_name=${this.activity_name}&token=${this.app.token}&version=${this.app.version}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.fetchIndex();
                this.app.showAlert('领取成功!')
            }else{
                self.app.showAlert(response.msg)
            }
            this.canClick = true
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            this.canClick = true
        })
    }
    public fetchList(){
        var url = `${this.app.UrlData.host}/api/activity/activityList?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&page=${this.page}&limit=20&token=${this.app.token}&version=${this.app.version}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.page+=1;
                this.addList(response.data);
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    addList(data){
        cc.log(data)
        var list = []
        data.forEach((item) => {
            let date = item.receive_date;
            let time = Number(item.created_at);
            let info = JSON.parse(item.receive_info);
            let gold = 0;
            let statement = 0;
            for(var k in info){
                if(info[k].time>= time){
                    gold += Number(info[k].gold);//保存金币
                    statement = statement < info[k].statement ? info[k].statement :statement;//保存最大的流水
                }
            }
            list.push({
                date,
                statement,
                gold,
                time,
            })
        });
        console.log(list)
        list.forEach((item)=>{
            console.log(item)
            var node = cc.instantiate(this.ListItem);
            var content = this.HistoryScroll.getChildByName('view').getChildByName('content');
            content.addChild(node);
            node.getComponent('payChuangGuanListItem').init(item)
        })
    }
   //领取
    btnGetGold1Click(){
        if(!this.canClick) {
            return this.app.showAlert('你点的太快了！')
        }
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        
        this.fetchGold(1)
    }
    btnGetGold21Click(){
        if(!this.canClick) {
            return this.app.showAlert('你点的太快了！')
        }
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        this.fetchGold(2)
    }
    btnGetGold3Click(){
        if(!this.canClick) {
            return this.app.showAlert('你点的太快了！')
        }
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        this.fetchGold(3)
    }
    btnGetGold4Click(){
        if(!this.canClick) {
            return this.app.showAlert('你点的太快了！')
        }
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        this.fetchGold(4)
    }
    btnGetGold5Click(){
        if(!this.canClick) {
            return this.app.showAlert('你点的太快了！')
        }
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert("参加活动失败:请先绑定手机号！")
            return
        }
        this.fetchGold(5)
    }
    //打开历史
    btnHistory(){
        this.GetGoldHistory.active = true;
        this.fetchList()
    }
     //关闭历史
    closeHistory(){
        this.GetGoldHistory.active = false;
        var content = this.HistoryScroll.getChildByName('view').getChildByName('content');
        content.removeAllChildren();
        this.page = 1;
    }
    historyScrollToBottom = ()=>{
        this.fetchList()
    }

    onDestroy(){
        this.HistoryScroll.off('scroll-to-bottom');
    }
}
