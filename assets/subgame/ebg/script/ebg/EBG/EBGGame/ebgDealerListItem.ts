import {DealerProper} from '../interface/ebgInterface';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    lab_id : cc.Label = null;

    @property(cc.Label)
    lab_gold : cc.Label = null;

    id = null;

    init(e:DealerProper,score,index:number){
        this.id = e.ID;
        this.lab_id.string = `${index+1}.  ${e.Nick}`;
        this.lab_gold.string =`${score}`.replace(/\./g,'/');
    }
    // update (dt) {}
}
