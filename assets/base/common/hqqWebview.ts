const {ccclass, property} = cc._decorator;

@ccclass
export default class hqqWebview extends cc.Component {

    @property(cc.WebView)
    web: cc.WebView = null;

    jiazai:cc.Label = null;

    loadcount:number = 0;

    jiaziTimerID:number = null;
    start () {
        if(cc.isValid(this.web))
        {
            this.web.node.opacity = 0;
            this.web.node.width = 0;
            this.web.node.height = 0;
        }
        let tempnode = new cc.Node("event_popupWin_loading");
        this.node.addChild(tempnode);
        hqq.setSkeleton( tempnode , {path:"base/event_popupWin_loading/",aniname:"animation",loop:true} );
        hqq.addNode(tempnode,{normal:"base/img/btn_close",x:200,y:200,callback: "onClose", script: this});
        tempnode = null;
        // this.scheduleOnce(()=>{
        //     this.onClose();
        // },8)
    }

    private onWebviewEvent(webview: cc.WebView, eventType: cc.WebView.EventType): void {
        if (eventType === cc.WebView.EventType.LOADED) {
            this.loadcount++;
            cc.log("onWebviewEvent cc.WebView.EventType.LOADED")
            if( cc.isValid( this.web) )
            {
                if( this.jiaziTimerID )
                {
                    clearInterval(this.jiaziTimerID);
                }
                if(cc.isValid(this.jiazai))
                {
                    cc.Tween.stopAllByTarget(this.jiazai)
                    this.jiazai.node.active = false;
                }
                this.web.node.opacity = 255;
                this.web.node.width = 1030;
                this.web.node.height = 570;
                this.web.node.x = 0;
                this.web.node.y = 0;
                if(hqq.app.pinpai=="fuxin"){
                    hqq.setSprite( this.node.getChildByName("main_top"),{path:"base/bigimg/fx_banner_top",width:1030,height:84,x:0,y:322});
                    // hqq.setSkeleton( this.node.getChildByName("eff_top_btn_back"),{path:"base/fx_fh_hk/fx_eff_top_back",aniname:"animation",x:-458,y:335,loop:true});
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"),{normal: "/base/img/fx_hd_btn_close", callback: "onClose", script: this});
                    hqq.setSprite( cc.find( "main_top/title" , this.node ),{path:"base/language/CN/img/fx_top_banner_hd",width:375,height:88,y:5});
                    hqq.setSprite( cc.find( "di" , this.node ),{path:"base/bigimg/fx_hd_di",width:1040,height:665,x:0,y:40});
                    hqq.setSprite( cc.find( "mask" , this.node ),{path:"base/bigimg/fx_hd_mask1",width:1032,height:657,x:0,y:40});
                } else if(hqq.app.pinpai=="juding"){
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"),{normal: "/hall/juding/img/jd_popup_btn_close", callback: "onClose", script: this,x:485,y:320});
                    hqq.setSprite( cc.find( "main_top/title" , this.node ),{path:"hall/language/CN/juding/jd_popup_event_title",width:332,height:72,y:-10});
                    hqq.setSprite( cc.find( "mask" , this.node ),{path:"hall/juding/bigimg/jd_popup_bg",width:1047,height:646,x:0,y:30});
                } else if(hqq.app.pinpai=="xinsheng" || hqq.app.pinpai=="xinlong"){
                    hqq.setSprite( this.node.getChildByName("main_top"),{path:"base/bigimg/zhibo_banner_top",width:1030,height:84,x:0,y:322});
                    // hqq.setSkeleton( this.node.getChildByName("eff_top_btn_back"),{path:"base/fx_fh_hk/fx_eff_top_back",aniname:"animation",x:-458,y:335,loop:true});
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"),{normal: "/base/img/hj_hd_btn_close1", callback: "onClose", script: this});
                    hqq.setSprite( cc.find( "main_top/title" , this.node ),{path:"base/language/CN/img/top_banner_hd",width:375,height:88,y:5});
                    hqq.setSprite( cc.find( "di" , this.node ),{path:"base/bigimg/hj_hd_di",width:1040,height:665,x:0,y:40});
                    hqq.setSprite( cc.find( "mask" , this.node ),{path:"base/bigimg/fx_hd_mask1",width:1032,height:657,x:0,y:40});
                } else if(hqq.app.pinpai=="huaxing"){
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"),{normal: "/hall/huaxing/img/btn_x", callback: "onClose", script: this,x:510,y:335});
                    hqq.setSprite( cc.find( "main_top/title" , this.node ),{path:"hall/language/CN/huaxing/16",width:224,height:61});
                    hqq.addNode( cc.find( "main_top" , this.node ),{path:"hall/huaxing/img/d_tit",width:458,height:87,x:0,zIndex:-1,type: cc.Sprite.Type.SLICED});
                    hqq.setSprite( cc.find( "main_top" , this.node ),{path:"hall/huaxing/bigimg/di",width:1030,height:84});
                } else if(hqq.app.pinpai=="ninetwo"){
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"),{normal: "/hall/ninetwo/img/guanbi", callback: "onClose", script: this,x:510,y:335});
                    hqq.setSprite( cc.find( "main_top/title" , this.node ),{path:"hall/language/CN/ninetwo/img/92event_frame_title",width:317,height:61});
                    hqq.setSprite( cc.find( "main_top" , this.node ),{path:"hall/ninetwo/img/92event_frame_top",width:1030,height:84});
                } else{
                    hqq.setSprite( this.node.getChildByName("main_top"),{path:"base/bigimg/hj_hd_banner_top2",width:1030,height:84});
                    // hqq.setSkeleton( this.node.getChildByName("eff_top_btn_back"),{path:"base/zhibo_top_btn_back/zhibo_top_btn_back",aniname:"animation",loop:true});
                    this.node.getChildByName("eff_top_btn_back").active = false;
                    hqq.setBtn(this.node.getChildByName("back"),{normal: "/base/img/hj_hd_btn_close2", callback: "onClose", script: this});
                    hqq.setSprite( cc.find( "main_top/title" , this.node ),{path:"base/language/CN/img/hj_top_banner_hd2",width:375,height:88});
                    hqq.setSprite( cc.find( "di" , this.node ),{path:"base/bigimg/hj_hd_di",width:1040,height:665,x:0,y:40});
                    hqq.setSprite( cc.find( "mask" , this.node ),{path:"base/bigimg/fx_hd_mask1",width:1032,height:657,x:0,y:40});
                }
                this.unscheduleAllCallbacks();
                this.node.getChildByName("event_popupWin_loading").active = false;
                if(!cc.sys.isBrowser )
                {
                    this.web.setJavascriptInterfaceScheme('closewebview');
                    let jsCallback =(target, url)=> {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, false);
                    }
                    this.web.setOnJSCallback(jsCallback);
                }
                else if( this.loadcount > 1 )
                {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, false);
                } 
            }
        }
    }

    onDestroy()
    {
        if( this.jiaziTimerID )
        {
            clearInterval(this.jiaziTimerID);
        }
    }

    onClose()
    {
        if( this.jiaziTimerID )
        {
            clearInterval(this.jiaziTimerID);
        }
        this.loadcount = 0;
        hqq.eventMgr.dispatch(hqq.eventMgr.showPayActivityWeb, false);
        hqq.eventMgr.dispatch(hqq.eventMgr.refreshPlayerGold, null);
    }
}
