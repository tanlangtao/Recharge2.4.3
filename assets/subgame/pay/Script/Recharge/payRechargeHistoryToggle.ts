
const {ccclass, property} = cc._decorator;
import { Language_pay } from "../language/payLanguage";
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
        if(this.app.UrlData.package_id == 9)
        {
            let zi = cc.find( "zi" , this.node );
            if( cc.isValid( zi ) )
            {
                if(this.index == 0){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "全部"); 
                }else if(this.index == 1){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "已完成"); 
                }else if(this.index == 2){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "未完成"); 
                }else if(this.index == 3){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "已撤销"); 
                }
            }
        }
        else
        {
            if(this.index == 0){
                this.app.loadIcon(`${src}/menu/menu_all_2`,this.normalIcon,207,44)
                this.app.loadIcon(`${src}/menu/menu_all_1`,this.currentIcon,249,86);
            }else if(this.index == 1){
                this.app.loadIcon(`${src}/menu/menu_finished_2`,this.normalIcon,207,44)
                this.app.loadIcon(`${src}/menu/menu_finished_1`,this.currentIcon,249,86);
            }else if(this.index == 2){
                this.app.loadIcon(`${src}/menu/menu_unfinished_2`,this.normalIcon,207,44)
                this.app.loadIcon(`${src}/menu/menu_unfinished_1`,this.currentIcon,249,86);
            }else if(this.index == 3){
                this.app.loadIcon(`${src}/menu/menu_revoke_2`,this.normalIcon,207,44)
                this.app.loadIcon(`${src}/menu/menu_revoke_1`,this.currentIcon,249,86);
                if(this.app.UrlData.package_id == 10){
                    this.node.removeFromParent()
                }
            }
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
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