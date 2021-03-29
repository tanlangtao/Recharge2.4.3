const {ccclass, property} = cc._decorator;
import payMain from '../payMain'
import { Language_pay } from "../language/payLanguage";
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

        // let scalex = cc.winSize.width / 1334;
        // this.Middle.scaleX = scalex;
        // this.Middle.scaleY = scalex;
        this.setLanguageResource()
    }

    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/receiveGoldInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&package_id=${this.app.UrlData.package_id}`;
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
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    
    private setStatement(info){
        this.remainingLevel = [];//清空上一轮
        this.remainingGold = 0;//清空上一轮
        this.hongbaoArr.forEach((item,index)=>{
            let infoItem = info[`level_${index+1}`]
            item.getChildByName('statement').getComponent(cc.Label).string = infoItem.statement;
            item.getChildByName('gold').getComponent(cc.Label).string = infoItem.gold;
            if(infoItem.statement > this.today_statement){
                item.getChildByName('bg').active = false
            }else{
                item.getChildByName('bg').active = true
            }
        })
        
        for(var k in info){
            if((info[k].statement <= this.today_statement) && info[k].has_receive==0){
                this.remainingGold += Number(info[k].gold);
                this.remainingLevel.push(k.substr(-1,1))//将level最后一位数字截取，放入数组
            }
        }
        this.goldLabel.string = `${this.remainingGold}`;
        if(this.remainingLevel.length > 0){
            this.btn_lingqu.interactable = true
        }else{
            this.btn_lingqu.interactable = false;
        }
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
        if(this.today_statement == 0){
            progress = 0
        }
        console.log("today_statement",this.today_statement)
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
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&level=${level}&gold=${this.remainingGold}&package_id=${this.app.UrlData.package_id}&activity_id=${this.activity_id}&activity_name=${this.activity_name}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.fetchIndex();
                this.app.showAlert(Language_pay.Lg.ChangeByText('领取成功!'))
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public fetchList(){
        var url = `${this.app.UrlData.host}/api/activity/activityList?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}&page=${this.page}&limit=20&activity_id=${this.activity_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                this.page+=1;
                this.addList(response.data);
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
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
    btnGetGoldClick(){
        if(this.app.gHandler.gameGlobal.player.phonenum == '') {
            this.app.showAlert(Language_pay.Lg.ChangeByText('参加活动失败:请先绑定手机号！'))
            return
        }
        this.fetchGold()
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
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let title= cc.find('Canvas/Activity/Content/ChuangGuan/bg/title')
        let btn_history= cc.find('Canvas/Activity/Content/ChuangGuan/btn_history')
        let HongBaoGroup= cc.find('Canvas/Activity/Content/ChuangGuan/Middle/HongBaoGroup')
        let wenzi_jrls= cc.find('Canvas/Activity/Content/ChuangGuan/bg/wenzi_jrls')
        let jrkl= cc.find('Canvas/Activity/Content/ChuangGuan/foot/jrkl')
        let txt_jinbi= cc.find('Canvas/Activity/Content/ChuangGuan/foot/txt_jinbi')
        let btn_lingqu= cc.find('Canvas/Activity/Content/ChuangGuan/foot/btn_lingqu')
        let lsjl= cc.find('Canvas/Activity/Content/ChuangGuan/GetGoldHistory/Alert/lsjl')
        let rq= cc.find('Canvas/Activity/Content/ChuangGuan/GetGoldHistory/Alert/title/rq')
        let drls= cc.find('Canvas/Activity/Content/ChuangGuan/GetGoldHistory/Alert/title/drls')
        let lqje= cc.find('Canvas/Activity/Content/ChuangGuan/GetGoldHistory/Alert/title/lqje')
        let lqsj= cc.find('Canvas/Activity/Content/ChuangGuan/GetGoldHistory/Alert/title/lqsj')

        this.app.loadIconLg(`${src}/activeSprite/txt_title01`,title)
        this.app.loadIconLg(`${src}/activeSprite/btn_record`,btn_history)
        HongBaoGroup.children.forEach(e=>{
            this.app.loadIconLg(`${src}/activeSprite/falidikuang`,e)
            this.app.loadIconLg(`${src}/activeSprite/falidikuang2`,e.getChildByName('bg'))
        })
        this.app.loadIconLg(`${src}/activeSprite/wenzi_jrls`,wenzi_jrls)
        this.app.loadIconLg(`${src}/activeSprite/jrkl`,jrkl)
        this.app.loadIconLg(`${src}/activeSprite/txt_jinbi`,txt_jinbi)
        this.app.loadIconLg(`${src}/activeSprite/btn_lingqu`,btn_lingqu)
        this.app.loadIconLg(`${src}/activeSprite/lsjl`,lsjl)
        this.app.loadIconLg(`${src}/activeSprite/rq`,rq)
        this.app.loadIconLg(`${src}/activeSprite/drls`,drls)
        this.app.loadIconLg(`${src}/activeSprite/lqje`,lqje)
        this.app.loadIconLg(`${src}/activeSprite/lqsj`,lqsj)

        let Label1= cc.find('Canvas/Activity/Content/ChuangGuan/bg/Label1').getComponent(cc.Label)
        Label1.string = Language_pay.Lg.ChangeByText('1、每日通过游戏, 输赢均可产生同等额度的流水。\n2、当日流水达到指定的档位, 即可领取活动规定的相应金币。\n3、每日23:59:59, 活动计算用的当日流水归零。')
    }

    onDestroy(){
        this.HistoryScroll.off('scroll-to-bottom');
    }
}
