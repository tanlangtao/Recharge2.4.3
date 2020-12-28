// 玩家列表item
const {ccclass, property} = cc._decorator;
import ebgMusicMgr from './ebgMusicMgr';
import {Language_ebg} from '../../language/ebgLanguage'
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    p_icon: cc.Sprite = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Label)
    id: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;//剩余金币

    @property(cc.Label)
    allBet: cc.Label = null;//下注金额

    @property(cc.Label)
    winTime: cc.Label = null;//获胜局数
    
    @property(cc.SpriteFrame)
    p_icon_sprite: cc.SpriteFrame[] = [];

    @property(cc.Node)
    p_num: cc.Node= null;

    MusicMgr : ebgMusicMgr = null;
    rootCom = null;
    LgSrc = ''
    onLoad () {
        this.MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr');
        this.rootCom =  cc.find('RootNode').getComponent('ebgRootNode');
        this.setLanguageResource()
    }

    init(i :number,listItem:any,callBack:Function):void{
        let p_fh = this.p_num.getChildByName('p_fh')
        let p_icon_num = this.p_num.getChildByName('p_icon')
        let p_lab = this.p_num.getChildByName('p_lab')
        let p_icon_2 = this.p_num.getChildByName('p_icon_2')
        let p_lab_2 = this.p_num.getChildByName('p_lab_2')
        p_fh.getComponent(cc.Sprite).spriteFrame = null
        p_icon_num.getComponent(cc.Sprite).spriteFrame = null
        p_lab.getComponent(cc.Label).string = ''
        p_icon_2.getComponent(cc.Sprite).spriteFrame = null
        p_lab_2.getComponent(cc.Label).string = ''
        this.p_icon.spriteFrame = null
        if(i>=0 && i <=3 ){
            this.p_icon.spriteFrame = this.p_icon_sprite[i]
        }else if(i <=5 ){
            p_lab.getComponent(cc.Label).string = `${i}`;
            this.rootCom.loadPlistSprite(`${this.LgSrc}/ebgPlist`,'txt_fuhao',p_fh)
            this.rootCom.loadSprite(`${this.LgSrc}/txt_no`,p_icon_num)
        }else{  
            p_lab_2.getComponent(cc.Label).string = `${i}`;
            this.rootCom.loadSprite(`${this.LgSrc}/txt_no`,p_icon_2)
        }
        // let callfunc = cc.callFunc(()=>{
        //     callBack()
        // })
        //显示昵称
        this.id.string = listItem.Nick;
        this.score.string = this.rootCom.toDecimal2(listItem.score).replace(/\./g,'/');
        this.allBet.string = listItem.allBet;
        this.winTime.string = `${listItem.winTime}${Language_ebg.Lg.changeLanguage(23)}`;
        let headerIcon =this.icon;
        this.MusicMgr.setHeadIcon(listItem.Head,headerIcon,90,90)
        
    }
     //设置语言相关的资源和字
   setLanguageResource(){
        let src = ''
        switch(Language_ebg.Lg.Language){
            case "Chinese": src = `language/Chinese`
                break
            case "English": src = 'language/English'
                break
            case "Thai": src = 'language/Thai'
                break
            case "Vietnamese": src = 'language/Vietnamese' 
                break
            default : src = `language/Chinese`
                console.log('未知语言',Language_ebg.Lg.Language)
                break
        }
        this.LgSrc = src
        let label_20ju = this.node.getChildByName('20ju').getComponent(cc.Label)
        label_20ju.string = `${Language_ebg.Lg.changeLanguage(24)}`

        let p_btn_xiazhu = this.node.getChildByName('p_btn_xiazhu')
        let p_btn_huosheng = this.node.getChildByName('p_btn_huosheng')

        this.rootCom.loadPlistSprite(`${src}/lostPlist`,'p_btn_xiazhu',p_btn_xiazhu)
        this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_btn_huosheng',p_btn_huosheng)
    }
    // update (dt) {}
}
