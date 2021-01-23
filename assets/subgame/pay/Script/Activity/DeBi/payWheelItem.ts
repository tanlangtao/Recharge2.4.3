
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../../language/payLanguage";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    namelabel: cc.Label = null;

    @property(cc.Label)
    prizelabel: cc.Label = null;

    info = {};
    app = null
    init(name,levelName,prize){
        this.namelabel.string  = name
        this.prizelabel.string  = `${levelName}${prize}${Language_pay.Lg.ChangeByText('金币')}`
        if(levelName == '六六大顺' || levelName == '天降豪礼' ||levelName == '一路发财'){
            this.prizelabel.node.color = new cc.Color(255, 0, 0)
        }else{
            this.prizelabel.node.color = new cc.Color(248, 181, 81)
        }
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.setLanguageResource()
    }
    //设置语言相关的资源和字
    setLanguageResource(){

        let label1= this.node.getChildByName('label1').getComponent(cc.Label)
        let label2= this.node.getChildByName('label2').getComponent(cc.Label)

        label1.string = Language_pay.Lg.ChangeByText('恭喜玩家')
        label2.string = Language_pay.Lg.ChangeByText('抽到了')
    }  
}
