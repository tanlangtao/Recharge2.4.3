//二八杠 音效控制类
const {ccclass, property} = cc._decorator;
import gHandler = require("../../../../../../base/common/gHandler");
import {Language_ebg} from '../../language/ebgLanguage'
@ccclass
export default class ebgMusicMgr extends cc.Component {

    public sfxVolume = 0;//音效音量
    // LIFE-CYCLE CALLBACKS:

    @property({ type: cc.AudioClip })
    private CardTypeMusic: cc.AudioClip[] = [];

    @property({ type: cc.AudioClip })
    private DianshuMusic :cc.AudioClip[] =[];

    @property({ type: cc.AudioClip })
    private FapaiMusic :cc.AudioClip[] =[];

    @property({ type: cc.AudioClip })
    private OtherMusic :cc.AudioClip[] =[];

    @property (cc.SpriteFrame)
    im_thead : cc.SpriteFrame[] = [];
    
    //牌型声音
    bgID = null;
    LgSrc = ''
    onLoad () {
        this.setLanguageResource()
    }
    setLanguageResource(){
        let src = ''
        switch(Language_ebg.Lg.Language){
            case "Chinese": src = `language/Chinese/Music`
                break
            case "English": src = 'language/English/Music'
                break
            case "Thai": src = 'language/Thai/Music'
                break
            case "Vietnamese": src = 'language/Vietnamese/Music' 
                break
            default : src = `language/Chinese/Music`
                console.log('未知语言',Language_ebg.Lg.Language)
                break
        }
        this.LgSrc = src
    }
    loadCardTypeMusic(num:number):void{
        let self = this;
        let path :string='';
        switch(num){
            case 0 : path ='erba_lady_p_tianwang';break;
            case 1 : path ='erba_lady_p_baozi';break;
            case 2 : path ='erba_lady_p_28';break;
            case 3 : path ='erba_lady_p_0';break;
            case 4 : path ='erba_lady_p_1cd';break;
            case 5 : path ='erba_lady_p_2cd';break;
            case 6 : path ='erba_lady_p_3cd';break;
            case 7 : path ='erba_lady_p_4cd';break;
            case 8 : path ='erba_lady_p_5cd';break;
            case 9 : path ='erba_lady_p_6cd';break;
            case 10 : path ='erba_lady_p_7cd';break;
            case 11 : path ='erba_lady_p_8cd';break;
            case 12 : path ='erba_lady_p_9cd';break;
            case 13 : path ='erba_lady_p_1';break;
            case 14 : path ='erba_lady_p_2';break;
            case 15 : path ='erba_lady_p_3';break;
            case 16 : path ='erba_lady_p_4';break;
            case 17 : path ='erba_lady_p_5';break;
            case 18 : path ='erba_lady_p_6';break;
            case 19 : path ='erba_lady_p_7';break;
            case 20 : path ='erba_lady_p_8';break;
            case 21 : path ='erba_lady_p_9';break;
            case 22 : path ='p_start_bet';break;
            case 23 : path ='p_stop_bet';break;
            case 24 : path ='erba_lady_p_tx';break;
            case 25 : path ='erba_lady_p_tp';break;
        }
        gHandler.ebgRes.load(`${this.LgSrc}/${path}`, cc.AudioClip, function(err, clip) {
            if (err) {
                console.log(err);
                return
            }
            var audioID =  cc.audioEngine.play(clip, false, self.sfxVolume);
           
            return audioID;
        });
        // cc.audioEngine.play(this.CardTypeMusic[num], false, this.sfxVolume*2);
    }
    //点数声音
    loadDianshuMusic(num:number) :void{
        let self = this;
        let path :string=''
        switch(num){
            case 2 : path ='erba_dice_2';break;
            case 3 : path ='erba_dice_3';break;
            case 4 : path ='erba_dice_4';break;
            case 5 : path ='erba_dice_5';break;
            case 6 : path ='erba_dice_6';break;
            case 7 : path ='erba_dice_7';break;
            case 8 : path ='erba_dice_8';break;
            case 9 : path ='erba_dice_9';break;
            case 10 : path ='erba_dice_10';break;
            case 11 : path ='erba_dice_11';break;
            case 12 : path ='erba_dice_12';break;
        }
        gHandler.ebgRes.load(`${this.LgSrc}/${path}`, cc.AudioClip, function(err, clip) {
            if (err) {
                console.log(err);
                return
            }
            var audioID =   cc.audioEngine.play(clip, false, self.sfxVolume);
            return audioID;
        });
        // cc.audioEngine.play(this.DianshuMusic[num], false, this.sfxVolume);
    }
    //发牌、筹码声音
    loadFapaiMusic(num:number) :void{
        let self = this;
        let path :string='';
        switch(num){
            case 0 : path ='erba_fapai_di';break;
            case 1 : path ='erba_fapai_zh';break;
            case 2 : path ='erba_fapai_shun';break;
            case 3 : path ='erba_fapai_tian';break;
            case 8 : path ='p_change_banker';break;
        }
        gHandler.ebgRes.load(`${this.LgSrc}/${path}`, cc.AudioClip, function(err, clip) {
            if (err) {
                console.log(err);
                return
            }
            var audioID = 0
            audioID =  cc.audioEngine.play(clip, false, self.sfxVolume);
            return audioID;
        });
        // cc.audioEngine.play(this.FapaiMusic[num], false, this.sfxVolume);
    }
     //发牌、筹码声音
     loadFapaiMusicOnline(num:number,volume ) :void{
        let self = this;
        let path :string='';
        switch(num){
            case 1 : path ='p_bet_online';break;
        }
        gHandler.ebgRes.load(`/ebgMusic/${path}`, cc.AudioClip, function(err, clip) {
            if (err) {
                console.log(err);
                return
            }
            var audioID = 0
            if( volume == 0.3 && self.sfxVolume != 0){
                audioID = cc.audioEngine.play(clip, false, 0.3);
            }else{
                audioID =  cc.audioEngine.play(clip, false, self.sfxVolume);
            }
            return audioID;
        });
        // cc.audioEngine.play(this.FapaiMusic[num], false, this.sfxVolume);
    }
    //其他声音
    loadMusic(num :number):void{
        let self = this;
        let path :string='';
        let isloop = false;
        switch(num){
            case 0 : path ='p_countdown';break;
            case 1 : path ='p_remind';break;
            case 2 : path = 'clickjetton';break;
            case 3 : path = 'clickArea';break;
            case 4 : path = 'tablejetton';break;
            case 6 : path ='click';break;
            case 7 : path ='resultLose';break;
            case 8 : path ='resultwin';break;
            case 9 : path ='Button_Click';break;
            case 10 :path = 'p_bet_jettonflytoplayer';break;
            case 11 :path = 'erba_fanpai';break;
            case 12 :path = 'erba_fapai';break;
            case 13 :path = 'p_bet_jiesuandaliang';break;
            case 14 :path = 'p_bet_shaoliang';break;
            case 15 :path = 'p_bet_zhuang';break;
            case 16 :path = 'p_bet_short';break;
            case 17 :path = 'erba_dice_roll1';break;
            case 18 :path = 'erba_dice_roll2';break;
        }
        gHandler.ebgRes.load(`/ebgMusic/${path}`, cc.AudioClip, function(err, clip) {
            if (err) {
                console.log(err);
                return
            }
            var audioID =   cc.audioEngine.play(clip, false, self.sfxVolume);
            return audioID;
        })
    }
    
    stopEffects(){
        //设置筹码音效
        this.sfxVolume =  0;
    }
    openEffects(){
        this.sfxVolume =  gHandler.audioMgr.getEffectVolume();
    }
    playBgMusic(){
        let self = this;
        gHandler.ebgRes.load(`/ebgMusic/erba_bgm48`, cc.AudioClip, function (err, clip) {
            self.bgID = cc.audioEngine.playMusic(clip,true);
        });
    }
    stopBgMusic(){
        cc.audioEngine.setVolume(this.bgID, 0);
    }

    public setHeadIcon(url:string,node :cc.Node,w :number,h:number){
        var num = ''
        if(url ==''){
            url = '1.png'
        }
        if(url.indexOf(".")>-1){
            num = url.substring(0,url.indexOf("."));
        }else{
            num = url
        } 
        if(Number(num)>=10){
            num = `${Number(num)%10}`
        }
        cc.resources.load(`/head/im_head`,cc.SpriteAtlas,(err, t)=>{
            var spriteFrame = t.getSpriteFrame(`Avatar${num}`)
            node.width = w;
            node.height = h;
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    }
    public setTheadIcon(url:string,node :cc.Node,w :number,h:number){
        var num = ''
        if(url ==''){
            url = '1.png'
        }
        if(url.indexOf(".")>-1){
            num = url.substring(0,url.indexOf("."));
        }else{
            num = url
        } 
        if(Number(num)>=10){
            num = `${Number(num)%10}`
        }
        // gHandler.ebgRes.load(`/im_thead`,cc.SpriteAtlas,(err, t)=>{
        //     var spriteFrame = t.getSpriteFrame(`tAvatar${num}`)
        //     node.width = w;
        //     node.height = h;
        //     node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // })
        node.width = w;
        node.height = h;
        node.getComponent(cc.Sprite).spriteFrame = this.im_thead[num];
    }
    onDestroy(){
        cc.audioEngine.uncacheAll()
    }
}
