import Connection from "./ebgConnection";
import {messagedef} from "./messagedef-ebg";
//import {msg} from "./msg_pb";

export default class MessageSender {
    public connection:Connection;

    private SendMessage(msgtag:messagedef.msgtype,data:any) {
        let msgClass = messagedef.getMsgObj(msgtag);
        let msgObj = msgClass.create(data);
        let buff = msgClass.encode(msgObj).finish();
        this.connection.SendMessage(msgtag,buff);  
    }
    
    //发送某种消息只需要三步
    //1 确定发送tag
    //2 定义发送消息结构体
    //3 调用sendmessage发送以上两个对像
    public SendLogin(sUserID:string,sPassword:string,sToken:string) {
        let msgtag = messagedef.msgtype.Login;
        let msgData = {UserId:sUserID,Password:sPassword,token:sToken};
        this.SendMessage(msgtag,msgData);  
    }

    public SendBreathe() {
        let msgtag = messagedef.msgtype.Breathe;
        let msgData = {}
        this.SendMessage(msgtag,msgData);
    }

    public SendEnterRoom(index:number) {
        let msgtag = messagedef.msgtype.EnterRoomReq;
        let msgData = {Index:index};
        this.SendMessage(msgtag,msgData);
    }

    public SendBet(area:any,betnum:number){
        let msgtag = messagedef.msgtype.PlayerBetting;
        let msgData ={Bet:{area:area,betnum:betnum}};
        this.SendMessage(msgtag,msgData);
    }
    public SendToDealerReq(score){
        console.log('申请上庄',score)
        let msgtag = messagedef.msgtype.ToDealerReq;
        let msgData ={score};
        this.SendMessage(msgtag,msgData);
    }
    public SendPlayerBatchBetting(Bets){
        let msgtag = messagedef.msgtype.PlayerBatchBetting;
        let msgData ={Bets};
        this.SendMessage(msgtag,msgData);
    }
    public SendExitRoomReq(){
        let msgtag = messagedef.msgtype.ExitRoomReq;
        let msgData ={};
        this.SendMessage(msgtag,msgData);
    }
    public SendCancelDealerReq(){
        let msgtag = messagedef.msgtype.CancelDealerReq;
        let msgData ={};
        this.SendMessage(msgtag,msgData);
    }
    public SendRoomInfoReq(){
        let msgtag = messagedef.msgtype.RoomInfoReq;
        let msgData ={};
        this.SendMessage(msgtag,msgData);
    }
    public SendGameStateQuery(){
        let msgtag = messagedef.msgtype.GameStateQuery;
        let msgData = {};
        this.SendMessage(msgtag,msgData);
    }
}