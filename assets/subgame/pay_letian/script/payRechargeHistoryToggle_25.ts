
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./payLanguage_25";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    normalIcon : cc.Node = null;

    @property(cc.Node)
    currentIcon : cc.Node = null;

    @property
    app =null;
    index = null;
    parentComponet : any = ''
    text = null;

    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.text =data.text;
        this.index = data.index;
        this.parentComponet = data.parentComponet;
        if(this.index == 0){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "全部"); 
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "全部"); 
        }else if(this.index == 1){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "已完成"); 
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "已完成"); 
        }else if(this.index == 2){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "未完成"); 
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "未完成"); 
            //隐藏未完成选项
            this.node.removeFromParent()
        }else if(this.index == 3){
            this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "已撤销"); 
            this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "已撤销"); 
            //隐藏已撤销选项
            this.node.removeFromParent()
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain_25');
    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        if(this.index == 0){
            this.parentComponet.order_status = 0;
        }else if(this.index == 1){
            this.parentComponet.order_status = 6;
        }else if(this.index == 2){
            this.parentComponet.order_status = 1;
        }else if(this.index == 3){
            this.parentComponet.order_status = 4;
        }
        this.parentComponet.page = 1;
        this.parentComponet.fetchIndex();
        
    }
    // update (dt) {}
}
