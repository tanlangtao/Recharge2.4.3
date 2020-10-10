// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
    init(group){
        group.forEach((e)=>{
            this.group.unshift(e) // 反序
        })
        this.totalPage = Math.ceil(this.group.length /3)
        this.renderList()
    }
    renderList(){
        let total = this.foot.getChildByName('total').getComponent(cc.Label)
        let middle = this.foot.getChildByName('middle').getComponent(cc.Label)
        total.string = `共 ${this.totalPage} 页`
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
    // update (dt) {}
}
