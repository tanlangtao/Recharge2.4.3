import { Language_pay } from "./../../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    app = null
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let bg= cc.find('Canvas/Activity/Content/OneMonthMillion/bg')

        this.app.loadIconLg(`${src}/activeBigImage/event_millionIncome_content2`,bg)

        let label= cc.find('Canvas/Activity/Content/OneMonthMillion/bg/event_kuang1/ScrollView/view/content/label').getComponent(cc.Label)

        label.string = Language_pay.Lg.ChangeByText("1. 可自己添加一批微信或QQ群, 可以通过百度搜索微信群等方式加入。\n2. 利用各种论坛、贴吧、发帖推广。\n3. 朋友圈、空间坚持晒图、打造好自己的朋友圈, 可以省去很多介绍。\n4. 可以买个淘宝店、卖欢乐豆, 各种游戏币, 各种跟棋牌有关产品, 只为引流, 卖产品只是营销手段。\n5. 找有粉丝的人合作, 比如网红、主播等。\n6. 投广告, 各种自媒体、网盟、公众号、微博红人、有流量的网站。\n7. 地推, 可以无限量免费提供专属您的卡片, 宣传单, 可在网吧, 酒店, 街道等发送。\n8. 其实这种推广方式和其他商业模式类似, 它的成功在于通过互联网、手机、分享经济等一些优势, 建立广大的客户群。从而获得利益, 同时棋牌中的游戏种类多, 运行畅通, 体验也特别棒, 我们也进入了该棋牌的代理界面查看了一些资料, 佣金日结是一大优势, 活动彩金更是完美结合, 也就是说, 只需要一部手机, 代理就可以完美逆袭, 拥有无数代理, 轻松的自己当老板, 让别人帮你赚钱, 这样的创业方式, 0投资, 0成本, 而且只有成功, 没有失败! 难怪越来多人成为了此类APP的代理, 人生发生了很大的改变, 都在通往美好的道路前进, 这或许就是您一直想要拥有的平台。")
    }
}
