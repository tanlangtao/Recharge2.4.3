// 二八杠牌型

const {ccclass, property} = cc._decorator;
import ebgMusicMgr from './ebgMusicMgr';
import {Language_ebg} from '../../language/ebgLanguage'
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    cardTypeLabel : cc.Label= null;

   
    private MusicMgr :ebgMusicMgr= null;

    public multiple : number = 1;//倍数
    public cardType: string = '';//牌型
    public cardGrade : number = 1;//牌型等级,等级越大，牌越大
    public tong1 : number = 0;//第一张牌点数
    public tong2 : number = 0;//第二张牌点数
    public maxCard:number = 0;//保存最大的一张牌
    rootCom = null;
    onLoad(){
        this.rootCom =  cc.find('RootNode').getComponent('ebgRootNode');
    }
    /**
     * 外部调用，初始化
     * @param tong1 第一张牌点数
     * @param tong2 第二张牌点数
     * @param playMusic 是否播放音效
     */
    public init(tong1:number,tong2:number,playMusic:boolean): void{
        this.MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr');
        this.tong1 =tong1;
        this.tong2= tong2;
        this.maxCard = tong1>tong2 ? tong1:tong2;
        this.mathType(tong1,tong2,playMusic);
    }

    public removeSelf() : void{
        this.node.removeFromParent()
    }
    /**
     * 
     * @param tong1 第一张牌点数
     * @param tong2 第二张牌点数
     * @param playMusic 是否播放音效
     */
    private mathType(tong1:number,tong2:number,playMusic :boolean): void{
        var cardNum = 0;//spriteFrame的序号
        if(tong1 == 0 && tong2 == 0){
            this.cardType = '天王';
            cardNum = 0;
            this.cardGrade=22;
            this.multiple =10;
        }else if(tong1 == tong2){
            this.cardType = '豹子';
            cardNum = 1;
            this.cardGrade=21;
            this.multiple =10;
        }else if(tong1 == 2&& tong2 == 8|| tong1 == 8&& tong2 == 2){
            this.cardType = '二八杠';
            cardNum = 2;
            this.cardGrade=20;
            this.multiple =10;
        }else if(tong1 + tong2 == 10){
            this.cardType = '鳖十';
            cardNum = 3;
            this.cardGrade=1;
            this.multiple =1;
        }else if(tong1==0){
            switch(tong2){
                case 1:  this.cardType = '1点半'; cardNum = 4; this.cardGrade=3;  this.multiple =1; break;
                case 2:  this.cardType = '2点半'; cardNum = 5; this.cardGrade=5;  this.multiple =2; break;
                case 3:  this.cardType = '3点半'; cardNum = 6; this.cardGrade=7;  this.multiple =3; break;
                case 4:  this.cardType = '4点半'; cardNum = 7; this.cardGrade=9;  this.multiple =4; break;
                case 5:  this.cardType = '5点半'; cardNum = 8; this.cardGrade=11; this.multiple =5; break;
                case 6:  this.cardType = '6点半'; cardNum = 9; this.cardGrade=13; this.multiple =6; break;
                case 7:  this.cardType = '7点半'; cardNum = 10; this.cardGrade=15; this.multiple =7; break;
                case 8:  this.cardType = '8点半'; cardNum = 11; this.cardGrade=17; this.multiple =8; break;
                case 9:  this.cardType = '9点半'; cardNum = 12; this.cardGrade=19; this.multiple =9; break;
            }
        }else if(tong2==0){
            switch(tong1){
                case 1:  this.cardType = '1点半'; cardNum = 4; this.cardGrade=3; this.multiple =1; break;
                case 2:  this.cardType = '2点半'; cardNum = 5; this.cardGrade=5; this.multiple =2; break;
                case 3:  this.cardType = '3点半'; cardNum = 6; this.cardGrade=7; this.multiple =3; break;
                case 4:  this.cardType = '4点半'; cardNum = 7; this.cardGrade=9; this.multiple =4; break;
                case 5:  this.cardType = '5点半'; cardNum = 8; this.cardGrade=11; this.multiple =5; break;
                case 6:  this.cardType = '6点半'; cardNum = 9; this.cardGrade=13; this.multiple =6; break;
                case 7:  this.cardType = '7点半'; cardNum = 10; this.cardGrade=15; this.multiple =7; break;
                case 8:  this.cardType = '8点半'; cardNum = 11; this.cardGrade=17; this.multiple =8; break;
                case 9:  this.cardType = '9点半'; cardNum = 12; this.cardGrade=19; this.multiple =9; break;
            }
        }else{
            switch((tong1+tong2)%10){
                case 1:  this.cardType = '1点'; cardNum = 13; this.cardGrade=2; this.multiple =1; break;
                case 2:  this.cardType = '2点'; cardNum = 14; this.cardGrade=4; this.multiple =2; break;
                case 3:  this.cardType = '3点'; cardNum = 15; this.cardGrade=6; this.multiple =3; break;
                case 4:  this.cardType = '4点'; cardNum = 16; this.cardGrade=8; this.multiple =4; break;
                case 5:  this.cardType = '5点'; cardNum = 17; this.cardGrade=10; this.multiple =5; break;
                case 6:  this.cardType = '6点'; cardNum = 18; this.cardGrade=12; this.multiple =6; break;
                case 7:  this.cardType = '7点'; cardNum = 19; this.cardGrade=14; this.multiple =7; break;
                case 8:  this.cardType = '8点'; cardNum = 20; this.cardGrade=16; this.multiple =8; break;
                case 9:  this.cardType = '9点'; cardNum = 21; this.cardGrade=18; this.multiple =9; break;
            }
        }
        playMusic ? this.MusicMgr.loadCardTypeMusic(cardNum):null;
        this.setLanguageResource(cardNum)
        this.cardTypeLabel.string = `${this.multiple}`;
   }
   setLanguageResource(cardNum){
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
        let dian = this.node.getChildByName('Node').getChildByName('dian')
        switch(cardNum){
            case 0:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_tianwang',dian);break;
            case 1:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_baozi',dian);break;
            case 2:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_erbagang',dian);break;
            case 3:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_bieshi',dian);break;
            case 4:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_1dianb',dian);break;
            case 5:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_2dianb',dian);break;
            case 6:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_3dianb',dian);break;
            case 7:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_4dianb',dian);break;
            case 8:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_5dianb',dian);break;
            case 9:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_6dianb',dian);break;
            case 10:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_7dianb',dian);break;
            case 11:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_8dianb',dian);break;
            case 12:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_9dianb',dian);break;
            case 13:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_1dian',dian);break;
            case 14:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_2dian',dian);break;
            case 15:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_3dian',dian);break;
            case 16:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_4dian',dian);break;
            case 17:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_5dian',dian);break;
            case 18:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_6dian',dian);break;
            case 19:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_7dian',dian);break;
            case 20:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_8dian',dian);break;
            case 21:this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'kaijian_9dian',dian);break;
        }
    }
}
