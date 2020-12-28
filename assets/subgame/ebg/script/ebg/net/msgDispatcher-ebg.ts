import {messagedef} from "./messagedef-ebg";
//import {msg} from "./msg_pb";
import {NoticeDef as NotiDef,NotificationCenter as NotiCenter, NoticeDef} from "../base/ebgNotification";

export namespace messageDispatcher {
    // function onLoginRsp(msg:any) {
    //     // let msgt = <msg.LoginRsp>msg;
    //     // cc.log("msgt.UserId",msgt.UserId);
    //     // cc.log("msgt.nick",msgt.nick);
    //     // cc.log("msgt.headimg",msgt.headimg);        
    //     // cc.log("msgt.score",msgt.score);

    //     NotiCenter.SendNotify(NotiDef.LoginRsp,msg);        
    // }

    // function onServerInfo(msg:any) {
    //     NotiCenter.SendNotify(NotiDef.ServerVersion,msg);        
    // }    

    // function onBreathe(msg:any) {
    //}

    const mapMessageFunc:any = {}
    // mapMessageFunc[messagedef.msgtype.LoginRsp] = onLoginRsp;
    // mapMessageFunc[messagedef.msgtype.ServerInfo] = onServerInfo;
    // mapMessageFunc[messagedef.msgtype.Breathe] = onBreathe;

    const mapMessageNotify:any = {}
    mapMessageNotify[messagedef.msgtype.LoginRsp] = NotiDef.LoginRsp;
    mapMessageNotify[messagedef.msgtype.ServerInfo] = NotiDef.ServerVersion;
    mapMessageNotify[messagedef.msgtype.Breathe] = NotiDef.Breathe;    
    mapMessageNotify[messagedef.msgtype.RoomList] = NotiDef.RoomList;
    mapMessageNotify[messagedef.msgtype.EnterRoomRsp] = NotiDef.EnterRoomRsp;
    mapMessageNotify[messagedef.msgtype.PlayerBetted] = NotiDef.PlayerBetted;
    mapMessageNotify[messagedef.msgtype.RoomStartBet] = NotiDef.RoomStartBet;
    mapMessageNotify[messagedef.msgtype.RoomSettlement] = NotiDef.RoomSettlement;
    mapMessageNotify[messagedef.msgtype.DealerInfo] = NotiDef.DealerInfo;
    mapMessageNotify[messagedef.msgtype.OtherJoin] = NotiDef.OtherJoin;
    mapMessageNotify[messagedef.msgtype.PlayerBatchBetted] = NotiDef.PlayerBatchBetted;
    mapMessageNotify[messagedef.msgtype.ExitRoomRsp] = NotiDef.ExitRoomRsp;
    mapMessageNotify[messagedef.msgtype.OthersExit] = NotiDef.OthersExit;
    mapMessageNotify[messagedef.msgtype.BetResult] = NotiDef.BetResult;
    mapMessageNotify[messagedef.msgtype.RoomBaseInfoUpdate] = NotiDef.RoomBaseInfoUpdate;
    mapMessageNotify[messagedef.msgtype.PlayerScore] =NotiDef.PlayerScore;
    mapMessageNotify[messagedef.msgtype.UniMessage] = NotiDef.UniMessage;
    mapMessageNotify[messagedef.msgtype.RoomInfo] = NotiDef.RoomInfo;
    mapMessageNotify[messagedef.msgtype.PlayerRoomState] = NotiDef.PlayerRoomState;
    mapMessageNotify[messagedef.msgtype.PlayerInfo] = NotiDef.PlayerInfo;
    export function onMessageDispatch(tag:messagedef.msgtype,data:any) {
        let msgclass = messagedef.getMsgObj(tag);
        if (msgclass) {
            let msg = msgclass.decode(data);
            let notitype = mapMessageNotify[tag];
            NotiCenter.SendNotify(notitype,msg); 
            let callback = mapMessageFunc[tag];
            if (callback) {
                callback(msg);
            }
        } else {
            cc.log("there is message haven't define",tag)
        }
        
    } 
}