
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    namelabel: cc.Label = null;

    @property(cc.Label)
    prizelabel: cc.Label = null;

    info = {};
    init(name,levelName,prize){
        this.namelabel.string  = name
        this.prizelabel.string  = `${levelName}${prize}金币`
        if(levelName == '六六大顺' || levelName == '天降豪礼' ||levelName == '一路发财'){
            this.prizelabel.node.color = new cc.Color(255, 0, 0)
        }else{
            this.prizelabel.node.color = new cc.Color(248, 181, 81)
        }
    }
}
