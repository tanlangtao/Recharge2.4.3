// 二八杠输赢结算界面
import {Language_ebg} from '../../language/ebgLanguage'
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    Label_winGold: cc.Label = null;
    
    @property(cc.Label)
    Label_stdGold: cc.Label[] = [];

    @property(cc.Node)
    zhuangLose : cc.Node = null;

    @property(cc.Node)
    zhuangWin : cc.Node = null;

    @property(cc.Label)
    zhuangWinLabel :cc.Label = null;

    @property(cc.Label)
    zhuangLoseLabel :cc.Label = null;

    rootCom = null;
    LgSrc= ''
    onLoad(){
        this.rootCom =  cc.find('RootNode').getComponent('ebgRootNode');
        this.setLanguageResource()
    }
    /**
     * 外部调用，传入输赢金钱
     * @param data 输赢结果
     */
    init(data:any,HostDiffScore:number):void{
        let total:number = 0;
        for(let i = 0;i<data.length;i++){
            //累加，防止有小数失真
            total += data[i];
        }
        let str = this.rootCom.toDecimal2(Math.abs(total)).replace(/\./g,'/');
         this.Label_winGold.string = `${str}`;
         let colorWin = cc.color(213,217,38,255);
         let colorLose = cc.color(202,210,213,255);
         this.Label_stdGold.forEach((e,i)=>{
             if(data[i]>0){
                 e.string = `+${this.rootCom.toDecimal2(data[i])}${Language_ebg.Lg.changeLanguage(25)}`;
                 e.node.color = colorWin;
             }else{
                e.string = `${this.rootCom.toDecimal2(data[i])}${Language_ebg.Lg.changeLanguage(25)}`;
                e.node.color = colorLose;
             }
         });
        let zhuangStr = this.rootCom.toDecimal2(Math.abs(HostDiffScore)).replace(/\./g,'/');
        if(HostDiffScore>0){
            this.zhuangWin.active = true;
            console.log('zhuangWin*******zhuangStr',zhuangStr)
            this.zhuangWinLabel.string = zhuangStr;
        }else{
            this.zhuangLose.active = true;
            console.log('zhuangLose*******zhuangStr',zhuangStr)
            this.zhuangLoseLabel.string = zhuangStr;
        }
    }
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
        if(this.node.name == 'SetWin'){
            let p_settle_win_title = this.node.getChildByName('bg').getChildByName('p_settle_win_title')
            let p_txt_jinbi_goldpng = this.node.getChildByName('bg').getChildByName('content').getChildByName('jiaqian').getChildByName('p_txt_jinbi_goldpng')
            let p_settle_tips_win = this.node.getChildByName('bg').getChildByName('content').getChildByName('p_settle_tips_win')

            this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_settle_win_title',p_settle_win_title)
            this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_txt_jinbi_goldpng',p_txt_jinbi_goldpng)
            this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_settle_tips_win',p_settle_tips_win)
        }else if(this.node.name == 'SetLose') {
            let p_settle_lose_title = this.node.getChildByName('bg').getChildByName('p_settle_lose_title')
            let p_txt_jinbi_silver = this.node.getChildByName('bg').getChildByName('content').getChildByName('jianqian').getChildByName('p_txt_jinbi_silver')
            let p_settle_tips_lose = this.node.getChildByName('bg').getChildByName('content').getChildByName('p_settle_tips_lose')
            
            this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_settle_lose_title',p_settle_lose_title)
            this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_txt_jinbi_silver',p_txt_jinbi_silver)
            this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_settle_tips_lose',p_settle_tips_lose)
        }
        let settle_ebg_shun = this.node.getChildByName('bg').getChildByName('content').getChildByName('ShunNode').getChildByName('settle_ebg_shun')
        let settle_ebg_tien = this.node.getChildByName('bg').getChildByName('content').getChildByName('TianNode').getChildByName('settle_ebg_tien')
        let settle_ebg_di = this.node.getChildByName('bg').getChildByName('content').getChildByName('DiNode').getChildByName('settle_ebg_di')
        let p_txt_zhuangjia = this.node.getChildByName('bg').getChildByName('content').getChildByName('foot').getChildByName('p_txt_zhuangjia')
        let p_txt_jinbi_silver2 = this.node.getChildByName('bg').getChildByName('content').getChildByName('foot').getChildByName('zhuangLose').getChildByName('p_txt_jinbi_silver')
        let p_txt_jinbi_goldpng2 = this.node.getChildByName('bg').getChildByName('content').getChildByName('foot').getChildByName('zhuangWin').getChildByName('p_txt_jinbi_goldpng')
        let p_settle_tips_close = this.node.getChildByName('bg').getChildByName('p_settle_tips_close')

        this.rootCom.loadPlistSprite(`${src}/lostPlist`,'settle_ebg_shun',settle_ebg_shun)
        this.rootCom.loadPlistSprite(`${src}/lostPlist`,'settle_ebg_tien',settle_ebg_tien)
        this.rootCom.loadPlistSprite(`${src}/lostPlist`,'settle_ebg_di',settle_ebg_di)
        this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_txt_zhuangjia',p_txt_zhuangjia)
        this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_txt_jinbi_silver',p_txt_jinbi_silver2)
        this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_txt_jinbi_goldpng',p_txt_jinbi_goldpng2)
        this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'p_settle_tips_close',p_settle_tips_close)
    }
    removeSelf():void{
        this.node.removeFromParent();
    }

    // update (dt) {}
}
