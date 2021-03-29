import { Language_pay } from "../language/payLanguage";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Content :cc.Node = null;

    @property(cc.Node)
    foot :cc.Node = null;

    group = [];
    page = 1;
    totalPage = 1;
    app = null;
    init(group){
        group.forEach((e)=>{
            this.group.unshift(e) // 反序
        })
        this.totalPage = Math.ceil(this.group.length /3)
        this.renderList()
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    renderList(){
        let total = this.foot.getChildByName('total').getComponent(cc.Label)
        let middle = this.foot.getChildByName('middle').getComponent(cc.Label)
        total.string = `${Language_pay.Lg.ChangeByText('共')} ${this.totalPage} ${Language_pay.Lg.ChangeByText('页')}`
        middle.string = `${this.page} / ${this.totalPage}`

        let start = 3*this.page - 3
        let end = 3*this.page 
        let currentList = this.group.slice(start,end)
        console.log(currentList)
        //先把所有的列表置空
        this.Content.children.forEach((e)=>{
            e.children.forEach(label=>{
                label.getComponent(cc.Label).string = ''
            })
        })
        //渲染列表
        currentList.forEach((e,i) => {
            e.ids.forEach((id,index) => {
                if(index >=3){return}
                this.Content.children[i].children[index].getComponent(cc.Label).string = id
            });
            this.Content.children[i].children[3].getComponent(cc.Label).string = `${e.bind_num} / 3`
           
        });
    }
    //点击首页
    firstClick(){
        this.page = 1
        this.renderList()
    }
    //点击尾页
    lastClick(){
        this.page = this.totalPage
        this.renderList()
    }
    //点击上一页
    upClick(){
        this.page = this.page -- <=1 ? 1 :  this.page --
        this.renderList()
    }
    //点击下一页
    downClick(){
        this.page = this.page ++ >= this.totalPage ? this.totalPage : this.page ++
        this.renderList()
    }
    removeSelf(){
        this.node.removeFromParent()
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        let title= cc.find('Canvas/Activity/Content/FruitHistory/Alert/title')
        let frame_jdlist= cc.find('Canvas/Activity/Content/FruitHistory/Alert/frame_jdlist')

        this.app.loadIconLg(`${src}/activeSprite/title_jdlist`,title)
        this.app.loadIconLg(`${src}/activeSprite/frame_jdlist`,frame_jdlist)

        let first = cc.find('Canvas/Activity/Content/FruitHistory/Alert/foot/first').getComponent(cc.Label)
        let up = cc.find('Canvas/Activity/Content/FruitHistory/Alert/foot/up').getComponent(cc.Label)
        let down = cc.find('Canvas/Activity/Content/FruitHistory/Alert/foot/down').getComponent(cc.Label)
        let last = cc.find('Canvas/Activity/Content/FruitHistory/Alert/foot/last').getComponent(cc.Label)

        first.string = Language_pay.Lg.ChangeByText('首页')
        up.string = Language_pay.Lg.ChangeByText('上一页')
        down.string = Language_pay.Lg.ChangeByText('下一页')
        last.string = Language_pay.Lg.ChangeByText('尾页')
    }
    // update (dt) {}
}
