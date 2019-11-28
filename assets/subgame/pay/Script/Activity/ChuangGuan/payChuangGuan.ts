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
    remainingLevel= [];//今日剩余可领的那几个档次
    page = 1;

    @property(cc.Node)
    Middle: cc.Node = null;//内容node

    @property(cc.Node)
    hongbaoArr: cc.Node[] = [];//5个红包

    @property(cc.SpriteFrame)
    hongbaoSprite: cc.SpriteFrame[] = [];//红包素材

    @property(cc.Button)
    btn_lingqu: cc.Button = null;//领取btn

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

        let scalex = cc.winSize.width / 1334;
        this.Middle.scaleX = scalex;
        this.Middle.scaleY = scalex;
    }

    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/receiveGoldInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.app.hideLoading();
                let info = response.data.receive_info;
                this.today_statement = response.data.today_statement;//设置今日总流水;
                this.today_statement = 250000;//设置今日总流水;
                this.totalStatement.string = `${this.today_statement}`;
                this.setStatement(info)
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    
    private setStatement(info){
        // info = {
        //     level_1:{
        //         gold:100,
        //         statement:1000,
        //         has_receive:0,
        //     },
        //     level_2:{
        //         gold:200,
        //         statement:2000,
        //         has_receive:0,
        //     },
        //     level_3:{
        //         gold:300,
        //         statement:5000,
        //         has_receive:0,
        //     },
        //     level_4:{
        //         gold:400,
        //         statement:10000,
        //         has_receive:0,
        //     },
        //     level_5:{
        //         gold:500,
        //         statement:50000,
        //         has_receive:0,
        //     },
        // }
        this.hongbaoArr.forEach((item,index)=>{
            let infoItem = info[`level_${index+1}`]
            item.getChildByName('statement').getComponent(cc.Label).string = infoItem.statement;
            item.getChildByName('gold').getComponent(cc.Label).string = infoItem.gold;
            if(infoItem.statement > this.today_statement){
                item.getComponent(cc.Sprite).spriteFrame = this.hongbaoSprite[0];
            }else{
                item.getComponent(cc.Sprite).spriteFrame = this.hongbaoSprite[1];
            }
        })
        
        for(var k in info){
            if((info[k].statement < this.today_statement) && info[k].has_receive==0){
                this.remainingGold += info[k].gold;
                this.remainingLevel.push(k.substr(-1,1))//将level最后一位数字截取，放入数组
            }
        }
        this.goldLabel.string = `${this.remainingGold}`;
        if(this.remainingLevel.length > 0){
            this.btn_lingqu.interactable = true
        }else{
            this.btn_lingqu.interactable = false;
        }
        cc.log(this.remainingGold,this.remainingLevel)
        this.mathProgress(info);
    }
    //计算进度条
    private mathProgress(info){
        var progress = 0;
        var lastKey = '';
        for(var k in info){
            if(lastKey == ''){
                //lastKey为空，说明是第一个区间,statement = 0;
                var step = (this.today_statement / info[k].statement )*0.11;
                if (step > 0.1) step = 0.11;
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
    public fetchGold(){
        let level = this.remainingLevel.join();
        cc.log(level)
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
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
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
        var list = [
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
            {date:1231,statement:1200,gold:20,time:978923},
        ]
        list.forEach((item)=>{
            var node = cc.instantiate(this.ListItem);
            var content = this.HistoryScroll.getChildByName('view').getChildByName('content');
            node.getComponent('payChuangGuanListItem').init(item)
            content.addChild(node);
        })
    }
   //领取
    btnGetGoldClick(){
        this.fetchGold()
    }
    //打开历史
    btnHistory(){
        this.GetGoldHistory.active = true;
        this.addList('12');
    }
     //关闭历史
    closeHistory(){
        this.GetGoldHistory.active = false;
        var content = this.HistoryScroll.getChildByName('view').getChildByName('content');
        content.removeAllChildren();
    }
    historyScrollToBottom = ()=>{
        this.addList('123')
    }

    onDestroy(){
        this.HistoryScroll.off('scroll-to-bottom');
    }
}
