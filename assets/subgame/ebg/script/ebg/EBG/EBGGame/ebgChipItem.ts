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

    @property(cc.Label)
    label: cc.Label = null;

    @property
    money: number = 1;
    //筹码编号
    num : number = 0;
    //投注座位号
    seat : number = 0;
    //筹码返回座位号
    backseat : number = 8;
    //
    area : number = 0;

    onLoad () {

    }
    /**
     * @param x 投注区域
     * @param num 筹码编号
     * @param index 投注座位号
     * @param backseat 筹码需要返回的座位号。当庄家赔付筹码的时候，需要使用
     */
    init(area:number,num:number,index:number,backseat:number) : void{
        switch(num){
            case 0: this.money=1; break;
            case 1: this.money=10; break;
            case 2: this.money=100; break;
            case 3: this.money=500; break;
            case 4: this.money=1000; break;
        }
        this.num = num;
        this.seat = index;
        this.backseat = backseat;
        this.area = area;
    }

    // update (dt) {}
}
