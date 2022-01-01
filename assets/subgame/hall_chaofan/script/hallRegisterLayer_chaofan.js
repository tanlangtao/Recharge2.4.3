
cc.Class({
    extends: cc.Component,

    properties: {
        numfont: cc.LabelAtlas,
        xsnumfont: cc.LabelAtlas,
        goldlabel: cc.Label,
        chongzhi: cc.Label,
        xhnumfont: cc.LabelAtlas,
    },

    onLoad() {
        this.data = null;
    },

    start() {

    },
    // UI动态加载
    UILoad() {
        let givejinbi = cc.find("registerlayer/aninode/givejinbi")
        let registerbtn = cc.find("registerlayer/aninode/registerbtn")
        if (hqq.app.pinpai != "xinsheng" ){
            hqq.btnLoad(registerbtn, "base/language/" + hqq.language + "/img/registerbtn")
        }
        let aninode = cc.find("registerlayer/aninode")
        let closebtn = cc.find("registerlayer/aninode/p_close")
        this.goldlabel.font = this.numfont
        this.goldlabel.fontSize = 60
        this.goldlabel.node.x = 220
        this.goldlabel.node.y = -185
        this.goldlabel.string = "3"
        hqq.setSprite(givejinbi, { path: "base/language/" + hqq.language + "/img/givejinbi", position: { x: 380, y: -210 } })
        hqq.setSkeleton(aninode, {path:"language/" + hqq.language + "/huodong/", aniname:"xunhuan", loop:true,Res:hqq["hall_chsaofan"]})
        hqq.setBtn(closebtn, { path: "base/img/p_close" })
    },
    init(data) {
        this.UILoad();
        if(data)
        {
            if (data.exitfunc) {
                this.onClickExit = () => {
                    this.node.destroy()
                    data.exitfunc()
                }
            }
        }
    },

    onClickExit() {
        this.node.destroy()
    },

    onClickRegister() {
        if (hqq.gameGlobal.player.phonenum != "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip43"))
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 3)
            this.node.destroy()
        }
    },

    // update (dt) {},
});
