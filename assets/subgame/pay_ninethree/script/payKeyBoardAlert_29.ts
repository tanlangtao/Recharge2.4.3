
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_29";
import Utils from './payUtils_29'
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    inputlabel: cc.Label = null;

    @property(cc.Node)
    lowerContent :cc.Node = null;

    @property(cc.Node)
    CapContent :cc.Node = null;

    @property
    label = null;
    isCap = true;
    type = null;
    app = null;
    callBack = null;
    init(label,type,callBack){
        this.label = label;
        if(label.string == '点击输入'){
            this.inputlabel.string = '';
        }else{
            this.inputlabel.string = label.string;
        }
        
        this.type = type;
        this.callBack = callBack
    }

    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain_29');
        let dom = document.getElementById('GameCanvas');
        let self = this;
        dom.onkeydown = (e)=>{
            if(e.key.length>1){
                switch(e.key){
                    case 'Backspace':
                        self.deleteString();
                        break;
                    case 'Enter':
                        self.onClick();
                        break;
                    default:
                        break;
                }
            }else{
                self.inputlabel.string = self.inputlabel.string+e.key
            }
        }
        this.setLanguageResource()
    }
    add1(e){
        //按键音效
        this.app.loadMusic(1);

        let font  = e.target.children[0].getComponent(cc.Label).string;
        this.inputlabel.string = this.inputlabel.string+font;
        if(this.type == 4){
            this.inputlabel.string = this.inputlabel.string.substring(0,4)
        }
    }
    deleteString(){
        //按键音效
        this.app.loadMusic(1);

        this.inputlabel.string = this.inputlabel.string.substr(0,this.inputlabel.string.length-1);
    }

    deleteAll(){
        //按键音效
        this.app.loadMusic(1);

        this.inputlabel.string ='';
    }

    toCap(){
        //按键音效
        this.app.loadMusic(1);

        if(this.isCap){
            this.CapContent.active = false;
            this.lowerContent.active = true;
            this.isCap = false;
        }else{
            this.CapContent.active = true;
            this.lowerContent.active = false;
            this.isCap = true;
        }
    }
    public addBtnHandler(btnName: string): void {
        var btn = cc.find('Canvas/KeyBoardAlert/Content/' + btnName)
        this.app.loadPublicIcon(`oldpay/internal/default_panel`,btn)
        Utils.addClickEvent(btn, this.node, 'payKeyBoardAlert_29', 'onBtnClicked')
    }
    private onBtnClicked(event: cc.Event): void {
        var btnName = event.target.name
        if(btnName == "wancheng"){
            this.onClick()
        }else if(btnName == "delete"){
            this.deleteString()
        }else if(btnName == "deleteall"){
            this.deleteAll()
        }else if(btnName == "shift"){
        }else{
            this.add1(event)
        }
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        let string = this.app.labelType(this.inputlabel.string,this.type);
        if(string == ''){
            string = '点击输入'
            this.app.setInputColor("",this.label);
        }else{
            this.app.setInputColor("2",this.label);
        }
        this.label.string = string;
        this.callBack(Number(string))
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        
        this.node.removeFromParent();
    }
    setLanguageResource(){
    }
}
