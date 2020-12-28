
// 二八杠发牌动画

const {ccclass, property} = cc._decorator;
import {fapaiItem,RoomSettlement} from '../interface/ebgInterface';
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    mjArr : cc.Node[] = [];//所有麻将

    @property(cc.SpriteFrame)
    mjSpriteFrame : cc.SpriteFrame[] = [];//所有点数

    @property(cc.Node)
    mjSeat : cc.Node[] = [];//发牌位置

    @property(cc.Node)
    cardTypeArr : cc.Node[] = [];//牌型位置

    @property(cc.Prefab)
    cardTypePre : cc.Prefab= null;

    @property()
    MusicMgr  = null;
    private mjStarSeat :cc.Vec2[]= [];//麻将起点位置
    private mjEndSeat :cc.Vec2[]= [];//麻将终点位置
    private newMjEndSeat :cc.Vec2[]= [];//麻将发牌位置
    private num :number= 1;//发牌位置
    public gameInfo :RoomSettlement = null;
    onLoad () {
        this.getMjSeat();
        this.MusicMgr = cc.find('RootNode/Music').getComponent('ebgMusicMgr')
    }
    private getMjSeat() :void{
        let self = this;
        this.mjArr.forEach((item,index)=>{
            
            self.mjStarSeat.push(item.position)
        });
        this.mjSeat.forEach((item,index)=>{
            self.mjEndSeat.push(item.position)
        });
    }
    /**
     * 外部调用，发牌 
     * @param dianshu 骰子点数
     * @param gameCallBack 回调函数
     */
   public animStart(dianshu:number,gameInfo :RoomSettlement,gameCallBack:Function):void{
        // gameInfo ={
        //     Remaining : 0,
        //     Roll: {
        //         roll1:1,
        //         roll2:4
        //     },
        //     Cards : {
        //         shun:{
        //             Card1:1,
        //             Card2:8
        //         },
        //         tian:{
        //             Card1:3,
        //             Card2:7
        //         },
        //         di:{
        //             Card1:2,
        //             Card2:7
        //         },
        //         zhuang:{
        //             Card1:1,
        //             Card2:8
        //         }
        //     },
        //     NewScore : [],
        //     DealerResult:9
        // }
        this.gameInfo = gameInfo;
        this.initMj()
        this.num = dianshu%4;
        //根据 庄-顺-天-地 的方位截取前面的位置，放到数组尾部
        this.MusicMgr.loadFapaiMusic(this.num);

        let arr1= this.mjEndSeat.slice(0,(this.num-1)*2);
        let arr2 = this.mjEndSeat.slice((this.num-1)*2);
        this.newMjEndSeat = [];
        this.newMjEndSeat  = arr2.concat(arr1);
        
        let self = this;
        let jiesuan :Function = ():void => {
            //开牌结束，比较大小
            // 1.天王 > 豹子 > 二八杠  > 九点半  > 九点  > …一点半  > 一点  > 鳖十
            // 2.庄家和闲家牌型均为鳖十时，庄家赢。
            // 3.庄家和闲家牌型相同时（鳖十除外）需进行大小比较，单张牌面大者赢，若单张最大牌大小相同时，则视为和局。
            // 4.比牌为和局时，退回闲家投注金额。
            let data = [];
            this.cardTypeArr.forEach((e,i)=>{
                let com = e.getChildByName('cardTypeItem').getComponent('ebgCardTypeItem')
                var item = {
                    cardGrade : com.cardGrade,
                    maxCard:com.maxCard,
                    multiple:com.multiple,
                    cardType:com.cardType
                }
                data.push(item);
            })
            let fapaiResult :fapaiItem[]= [];
            for(let i = 1;i<=3 ; i++){
                if(  data[i].cardGrade<data[0].cardGrade ||
                    (data[i].cardGrade == data[0].cardGrade && data[i].cardType == '鳖十')||
                    (data[i].cardGrade == data[0].cardGrade && data[i].maxCard < data[0].maxCard)
                ){
                    //庄赢
                    var fapaiItem :fapaiItem = {
                        victory : 1,
                        multiple:data[0].multiple
                    }
                    fapaiResult.push(fapaiItem)
                }else if(data[i].cardGrade== data[0].cardGrade &&data[i].maxCard == data[0].maxCard){
                   //开和 
                   var fapaiItem :fapaiItem = {
                        victory : 0,
                        multiple:data[0].multiple
                    }
                    fapaiResult.push(fapaiItem)
                } else {
                    //闲赢
                    var fapaiItem :fapaiItem = {
                        victory : 2,
                        multiple:data[i].multiple
                    }
                    fapaiResult.push(fapaiItem)
                }
            }
            //返回开奖结果
            gameCallBack(fapaiResult);
        }
        let kaipai :Function = ():void => {
            //发牌结束，开牌
            let j = 0;
            let kaipaiCallBackFun : Function = () =>{
                j += 1;
                if( j> 3) {
                    return jiesuan()
                }
                self.kaipaiFun(j,kaipaiCallBackFun)
            }
            self.kaipaiFun(j,kaipaiCallBackFun)
        }
        let i = 0;
        let FapaiCallBackFun :Function = () =>{
            i +=1;
            if(i >3){
                return kaipai()
            }; 
            this.mjMove(i,0.5,FapaiCallBackFun);
        }
        this.mjMove(i,0.5,FapaiCallBackFun);
    }
    /**
     * 麻将组,发牌 
     * @param index 按组的序号，2张牌为一组
     * @param time 发牌动画时间
     * @param callBackFun 发牌完回调
     */ 
    private mjMove(index: number,time:number,callBackFun:Function): void {
        let self = this;
        //两张牌一起发
        let firstOne = (index+1)*2-2;
        let seconOne = (index+1)*2-1;
        var majiang1 = this.mjArr[firstOne];
        let majiang2 = this.mjArr[seconOne]
        //终点位置
        var point1: cc.Vec2 = this.newMjEndSeat[firstOne];
        var point2 : cc.Vec2 = this.newMjEndSeat[seconOne];

        var action1 = cc.moveTo(time, point1);
        action1.easing(cc.easeInOut(1.0));
        majiang1.runAction(action1);
        var action2 = cc.moveTo(time, point2);
        var action2_1 =  cc.moveTo(0, point2);
        let back = cc.callFunc(()=>{
            self.MusicMgr.loadMusic(12)
            callBackFun()
        })
        let action = cc.sequence(action2,action2_1,back);
        action.easing(cc.easeInOut(1.0));
        majiang2.runAction(action);
    }
    /**
     * 翻牌
     * @param i 麻将组
     * @param data 点数数组
     * @param callBackFun 发牌完毕回调
     */
    private kaipaiFun(i: number,callBackFun :Function ): void {
        let firstOne = (i+1)*2-2;
        let seconOne = (i+1)*2-1;
        let self =this;
        let newarr = []
        let arr1 = [];
        let arr2 = [];
         //根据发牌顺序，转换麻将
        switch(this.num){
            case 1:  newarr=this.mjArr; break;
            case 2:  arr1 = this.mjArr.slice(0,6); arr2 = this.mjArr.slice(6); newarr =arr2.concat(arr1); break;
            case 3:  arr1 = this.mjArr.slice(0,4); arr2 = this.mjArr.slice(4); newarr =arr2.concat(arr1); break;
            case 0:  arr1 = this.mjArr.slice(0,2); arr2 = this.mjArr.slice(2); newarr =arr2.concat(arr1); break;
            default:
            break;
        }
        let anim = newarr[firstOne].getComponent(cc.Animation);
        let anim2 = newarr[seconOne].getComponent(cc.Animation);
        anim.play();
        self.MusicMgr.loadMusic(11)
        let tong1  = 0;
        let tong2  = 0;
        switch (i){
            case 0:
                tong1 = this.gameInfo.Cards.zhuang.Card1;
                tong2 = this.gameInfo.Cards.zhuang.Card2;
                break;
            case 1:
                tong1 = this.gameInfo.Cards.shun.Card1;
                tong2 = this.gameInfo.Cards.shun.Card2;
                break;
            case 2:
                tong1 = this.gameInfo.Cards.tian.Card1;
                tong2 = this.gameInfo.Cards.tian.Card2;
                break;
            case 3:
                tong1 = this.gameInfo.Cards.di.Card1;
                tong2 = this.gameInfo.Cards.di.Card2;
                break;
        }
        let callBack2 :Function = () :void =>{
            //计算牌型
            let node = cc.instantiate(this.cardTypePre);
            this.cardTypeArr[i].addChild(node);
            node.getComponent('ebgCardTypeItem').init(tong1,tong2,true);
            callBackFun();
        }
        let callBack1 :Function = () :void =>{
            anim2.play()
            self.MusicMgr.loadMusic(11)
            self.finishAnim(seconOne,newarr,anim2,tong2,callBack2);
        }
        this.finishAnim(firstOne,newarr,anim,tong1,callBack1);
    }

    // 初始化
    private initMj() :void{
        let self = this;
        this.mjArr.forEach((e : cc.Node,i:number) :void => {
            e.stopAllActions();
            //麻将返回起点
            e.position = self.mjStarSeat[i];
            e.getComponent(cc.Sprite).spriteFrame = e.getComponent('ebgCardItem').bgFrame;
            e.children[0].getComponent(cc.Sprite).spriteFrame =null;
            //取消动画监听
            let anim = this.mjArr[i].getComponent(cc.Animation);
            anim.off('finished')
        });
        //删除所有牌型
        this.cardTypeArr.forEach((e :cc.Node) :void =>{
            e.removeAllChildren()
        })
    }
    /**
     * 麻将祯动画监听函数
     * @param index 麻将编号
     * @param newarr 当前所以麻将数组
     * @param anim 当前的动画
     * @param num  麻将点数
     * @param callback 回调函数
     */
    private finishAnim(index: number,newarr:cc.Node[] ,anim:cc.Animation,num:number,
    callback:Function):void{
        let self = this;
        anim.on('finished',(action)=>{
            newarr[index].children[0].getComponent(cc.Sprite).spriteFrame = self.mjSpriteFrame[num];
            callback()
        })
    }
    /****************不做发牌动画*****************/
    unAnimateStart(dianshu:number,gameInfo :RoomSettlement,gameCallBack :Function):void {
        
        this.gameInfo = gameInfo;
        this.initMj();
        this.num = dianshu%4;
        //根据 庄-顺-天-地 的方位截取前面的位置，放到数组尾部
        let arr1= this.mjEndSeat.slice(0,(this.num-1)*2);
        let arr2 = this.mjEndSeat.slice((this.num-1)*2);
        this.newMjEndSeat = [];
        this.newMjEndSeat  = arr2.concat(arr1);
        let self = this;
        let jiesuan :Function= ():void =>{
            //开牌结束，比较大小
            // 1.天王 > 豹子 > 二八杠  > 九点半  > 九点  > …一点半  > 一点  > 鳖十
            // 2.庄家和闲家牌型均为鳖十时，庄家赢。
            // 3.庄家和闲家牌型相同时（鳖十除外）需进行大小比较，单张牌面大者赢，若单张最大牌大小相同时，则视为和局。
            // 4.比牌为和局时，退回闲家投注金额。
            let data = [];
            this.cardTypeArr.forEach((e,i)=>{
                let com = e.getChildByName('cardTypeItem').getComponent('ebgCardTypeItem')
                var item = {
                    cardGrade : com.cardGrade,
                    maxCard:com.maxCard,
                    multiple:com.multiple,
                    cardType:com.cardType
                }
                data.push(item);
            })
            let fapaiResult :fapaiItem[]= [];
            for(let i = 1;i<=3 ; i++){
                if(  data[i].cardGrade<data[0].cardGrade ||
                    (data[i].cardGrade == data[0].cardGrade && data[i].cardType == '鳖十')||
                    (data[i].cardGrade == data[0].cardGrade && data[i].maxCard < data[0].maxCard)
                ){
                    //庄赢
                    var fapaiItem :fapaiItem = {
                        victory : 1,
                        multiple:data[0].multiple
                    }
                    fapaiResult.push(fapaiItem)
                }else if(data[i].cardGrade== data[0].cardGrade &&data[i].maxCard == data[0].maxCard){
                   //开和 
                   var fapaiItem :fapaiItem = {
                        victory : 0,
                        multiple:data[0].multiple
                    }
                    fapaiResult.push(fapaiItem)
                } else {
                    //闲赢
                    var fapaiItem :fapaiItem = {
                        victory : 2,
                        multiple:data[i].multiple
                    }
                    fapaiResult.push(fapaiItem)
                }
            }
            //返回开奖结果
            
            gameCallBack(fapaiResult);
            
        }
        let kaipai :Function = () =>{
            //发牌结束，开牌
            let kaipaiCallBackFun=()=>{
                if(p>=3) return jiesuan();
            }
            for(var p =0;p<4;p++){
                self.kaipaiFun2(p,kaipaiCallBackFun)
            }
        }
        let i = 0;
        let FapaiCallBackFun : Function = () =>{
            i +=1;
            if(i >3){
                return kaipai()
            };
            this.mjMove(i,0,FapaiCallBackFun);
        }
        this.mjMove(i,0,FapaiCallBackFun);
    }   
    private kaipaiFun2(i: number,callBackFun:Function ): void {
        let firstOne = (i+1)*2-2;
        let seconOne = (i+1)*2-1;
        let self =this;
        let newarr = [];
        let arr1 = [];
        let arr2 = [];
         //根据发牌顺序，转换麻将
        switch(this.num){
            case 1:  newarr=this.mjArr; break;
            case 2:  arr1 = this.mjArr.slice(0,6); arr2 = this.mjArr.slice(6); newarr =arr2.concat(arr1); break;
            case 3:  arr1 = this.mjArr.slice(0,4); arr2 = this.mjArr.slice(4); newarr =arr2.concat(arr1); break;
            case 0:  arr1 = this.mjArr.slice(0,2); arr2 = this.mjArr.slice(2); newarr =arr2.concat(arr1); break;
            default:
            break;  
        }
        let anim = newarr[firstOne].getComponent(cc.Animation);
        let anim2 = newarr[seconOne].getComponent(cc.Animation);
        anim.play();
        self.MusicMgr.loadMusic(11)
        let callBack2= ()=>{
        }
        let callBack1 = ()=>{
        }
        let tong1  = 0;
        let tong2  = 0;
        switch (i){
            case 0:
                tong1 = this.gameInfo.Cards.zhuang.Card1;
                tong2 = this.gameInfo.Cards.zhuang.Card2;
                break;
            case 1:
                tong1 = this.gameInfo.Cards.shun.Card1;
                tong2 = this.gameInfo.Cards.shun.Card2;
                break;
            case 2:
                tong1 = this.gameInfo.Cards.tian.Card1;
                tong2 = this.gameInfo.Cards.tian.Card2;
                break;
            case 3:
                tong1 = this.gameInfo.Cards.di.Card1;
                tong2 = this.gameInfo.Cards.di.Card2;
                break;
        }
        this.finishAnim(firstOne,newarr,anim,tong1,callBack1);
        anim2.play()
        self.finishAnim(seconOne,newarr,anim2,tong2,callBack2);
        //计算牌型
        let node = cc.instantiate(this.cardTypePre);
        this.cardTypeArr[i].addChild(node);
        node.getComponent('ebgCardTypeItem').init(tong1,tong2,false);
        callBackFun();
    }
    
}
