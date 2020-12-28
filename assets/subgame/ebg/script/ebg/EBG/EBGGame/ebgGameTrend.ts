/**ebg游戏走势 */
import Utils from '../untils/ebgUtils';
import {Api} from '../untils/ebgApi';
import ebgRootNode from '../EBGroomList/ebgRootNode'
import MusicMgr from './ebgMusicMgr'
import {Language_ebg} from '../../language/ebgLanguage'
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    TrendItem: cc.Prefab = null;

    @property(cc.Label)
    lab_limit: cc.Label = null;

    @property(cc.Label)
    roomNum: cc.Label = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Label)
    label_shun: cc.Label = null;

    @property(cc.Label)
    label_tian: cc.Label = null;

    @property(cc.Label)
    label_di: cc.Label = null;

    @property(cc.Label)
    label_shun_he: cc.Label = null;

    @property(cc.Label)
    label_tian_he: cc.Label = null;

    @property(cc.Label)
    label_di_he: cc.Label = null;

    @property(cc.Toggle)
    ebgGameTrendToggle =  null;

    @property(cc.ScrollView)
    scrollView : cc.ScrollView = null;

    @property 
    private totalGameNum: number = 0;//总局数,
    private shunNum :number = 0;//顺胜利局数
    private shunHeNum :number = 0;//顺和局数
    private tianNum :number = 0;//天胜利局数
    private tianHeNum :number = 0;//天和局数
    private diNum : number = 0;//地胜利局数
    private diHeNum :number = 0;//地和局数
    private trendItemsolt: any[] = [];//存放创建的所有Item对象
    private timeOut = null;
    rrlist = null;
    rootCom :ebgRootNode= null;

    onLoad(){
        this.addBtnHandler('btn_close');
        this.addBtnHandler('ebgGameTrendToggle');
       
        this.rootCom =  cc.find('RootNode').getComponent('ebgRootNode');
        
                
        let clickNum = cc.sys.localStorage.getItem("ebgGameTrendToggle") || 0;
        this.ebgGameTrendToggle.isChecked = clickNum == 0 ? true :false;

        cc.systemEvent.on(Api.trendAddResults,this.onAdd.bind(this));
        cc.systemEvent.on(Api.LimitRed,this.onLimitRed.bind(this));
        cc.systemEvent.on(Api.onEnterRoomRsp,this.onEnterRoomRsp.bind(this));
        let Info = this.rootCom.gameRoomRsp.Info;
        this.listInit(Info)
    }
    /**
     * 增加新的局数
     * @param data 
     */
    private onAdd(data){
        let arr = []
        data.forEach(element => {
            arr.push(element.victory)
        });
        this.addResults(arr,true);
        let self =this;
        //如果勾选,自动打开,2秒后关闭
        if(this.ebgGameTrendToggle.isChecked){
            this.moveToBottom()
            this.timeOut  = setTimeout(() => {
                self.moveToTop();
               clearTimeout(self.timeOut);
            }, 2000);
        }
    }
    private onEnterRoomRsp(msg){
        let Info = msg.Info;
        this.listInit(Info)
    }
    private onLimitRed(msg){
        // this.lab_limit.string =`1-${msg}`;
    }
    public addBtnHandler(btnName:string) :void{
        
        var btn = cc.find("Canvas/GameTrend/" + btnName);
        Utils.addClickEvent(btn, this.node, "ebgGameTrend", "onBtnClicked");
    }
    private listInit(Info){
        
        this.rrlist = Info.rrlist;
        this.rrlist.forEach(element => {
            //0为和，1为输(庄赢),2为赢（庄输）
            let arr = [
                element.Shun,
                element.Tian,
                element.Di,
            ];
            this.addResults(arr,false)
        });
        this.roomNum.string = `${Language_ebg.Lg.changeLanguage(19)} 0${Info.Index+1}`;
    }

    public onBtnClicked(event: cc.Event):void{
        var MusicMgr :MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr');
        MusicMgr.loadMusic(6);
        var btnName = event.target.name;
        if(btnName == 'btn_close'){
            this.moveToTop()
        }else if(btnName == 'ebgGameTrendToggle'){
            //为真则值为0，为假则值为1
            let isChecked = !this.ebgGameTrendToggle.isChecked ? 0 :1;
            cc.sys.localStorage.setItem('ebgGameTrendToggle',isChecked)
        }
    }
    /**
     *增加局数
     * @param data 
     */
    public addResults(data :any,blink:boolean):void{
        this.totalGameNum ++;
        if(data[0]==2){this.shunNum ++};
        if(data[1]==2){this.tianNum ++};
        if(data[2]==2){this.diNum ++};
        if(data[0]==0){this.shunHeNum ++};
        if(data[1]==0){this.tianHeNum ++};
        if(data[2]==0){this.diHeNum ++};
        this.init(data,blink)
    }
    moveToTop():void{
        var action1 = cc.moveTo(0.2, cc.v2(0, 470));
        this.node.stopAllActions();
        this.node.runAction(action1);
    }
    moveToBottom():void{
        var action1 = cc.moveTo(0.2, cc.v2(0, 0));
        this.node.stopAllActions();
        this.node.runAction(action1);
        this.scrollView.scrollToRight();
    }
    /**
     * 增加item并初始化
     * @param data 
     */
    init(data :any,blink:boolean):void {
        this.scrollView.scrollToRight();
        this.content.children.forEach((e)=>{
            e.getComponent('ebgMidItem').hideCover()
        })
        if(this.totalGameNum>20){
            this.totalGameNum = 20;
            //删除对应那一项的胜场
            let shun = this.content.children[0].getComponent('ebgMidItem').Shun;
            let tian = this.content.children[0].getComponent('ebgMidItem').Tian;
            let di = this.content.children[0].getComponent('ebgMidItem').Di;
            shun == 2 ?this.shunNum -- :'';
            tian == 2 ? this.tianNum -- : '';
            di == 2 ? this.diNum -- :'';
            shun == 0 ?this.shunHeNum -- :'';
            tian == 0 ? this.tianHeNum -- : '';
            di == 0 ? this.diHeNum -- :'';
            this.content.removeChild(this.content.children[0]);
        }
        var itemPre = cc.instantiate(this.TrendItem);
        this.content.addChild(itemPre);
        itemPre.getComponent('ebgMidItem').init(data);
        blink ? itemPre.getComponent('ebgMidItem').showNewCover() :null;
        this.trendItemsolt.push(itemPre);

        this.label_shun.string =`${Language_ebg.Lg.changeLanguage(15)}${this.shunNum}/${this.totalGameNum}`;
        this.label_tian.string =`${Language_ebg.Lg.changeLanguage(16)}${this.tianNum}/${this.totalGameNum}`;
        this.label_di.string =`${Language_ebg.Lg.changeLanguage(17)}${this.diNum}/${this.totalGameNum}`;
        this.label_shun_he.string =`(${Language_ebg.Lg.changeLanguage(18)}${this.shunHeNum})`;
        this.label_tian_he.string =`(${Language_ebg.Lg.changeLanguage(18)}${this.tianHeNum})`;
        this.label_di_he.string =`(${Language_ebg.Lg.changeLanguage(18)}${this.diHeNum})`;
    }
    /**
     * 清空所有定时器
     */
    onDestroy(){
        clearTimeout(this.timeOut)
        cc.systemEvent.off(Api.trendAddResults);
        cc.systemEvent.off(Api.LimitRed);
        cc.systemEvent.off(Api.onEnterRoomRsp);
    }
}
