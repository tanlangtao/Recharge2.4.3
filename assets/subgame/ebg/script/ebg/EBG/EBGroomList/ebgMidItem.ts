//房间列表item
import {Language_ebg} from '../../language/ebgLanguage'
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    rootCom = null
    onLoad(){
        this.rootCom = cc.find('RootNode').getComponent('ebgRootNode')
    }
    //刚添加时的闪烁效果
    showNewCover():void{
        var  new_cover =  this.node.getChildByName('new_cover');
        var action = cc.blink(3, 5);
        var action2 = cc.blink(0, 0);
        let callback = cc.callFunc(()=>{
            new_cover.opacity = 255;
        })
        var ac = cc.sequence(action,action2,callback);
        new_cover.runAction(ac);
    }
    hideCover(){
        var  new_cover =  this.node.getChildByName('new_cover');
        new_cover.opacity = 0;
    }
    /**
     * 外部调用，初始化
     * @param data 
     */
    init(data :number[]):void{
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
        let shun = this.node.getChildByName('shun')
        let tian = this.node.getChildByName('tian')
        let di = this.node.getChildByName('di')

        switch(data[0]){
             //0为和，1为输、2为赢
            case 0:
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_he',shun)
                break;
            case 1 :
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_lose',shun)
                break;
            case 2 :
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_win',shun)
                break;
        }
        switch(data[1]){
            case 0:
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_he',tian)
                break;
            case 1 :
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_lose',tian)
                break;
            case 2 :
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_win',tian)
                break;
        }
        switch(data[2]){
            case 0:
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_he',di)
                break;
            case 1 :
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_lose',di)
                break;
            case 2 :
                this.rootCom.loadPlistSprite(`${src}/ebgPlist`,'icon_win',di)
                break;
        }
    }
}