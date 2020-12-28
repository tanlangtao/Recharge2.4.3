cc.log("this is load messagedef.ts~!!!");

import { msg } from "./msg_pb-ebg";
// cc.log("msg:", msg);

export namespace messagedef {
    export const enum msgtype {
        ServerInfo = 0,
        Breathe = 1,
        Login = 2,
        LoginRsp = 3,
        RoomList = 4,
        EnterRoomReq = 5,
        EnterRoomRsp = 6,
        PlayerBetting = 7,
        PlayerBetted = 8,
        RoomStartBet = 9,
        RoomSettlement = 10,
        ToDealerReq = 11,
        DealerInfo = 12,
        OtherJoin = 13,
        PlayerBatchBetting = 14,
        PlayerBatchBetted = 15,
        ExitRoomReq = 16,
        ExitRoomRsp = 17,
        OthersExit = 18,
        BetResult = 19,
        RoomBaseInfoUpdate = 20,
        CancelDealerReq = 21,
        PlayerScore = 22,
        UniMessage = 23,
        RoomInfoReq =24,
        RoomInfo = 25,
        GameStateQuery = 26,
        PlayerRoomState = 27,
        PlayerInfo = 28,
    }

    // cc.log("msg:", msg);


    const messagemap: any = {}
    messagemap[msgtype.ServerInfo] = msg.ServerInfo;
    messagemap[msgtype.Breathe] = msg.Breathe;
    messagemap[msgtype.Login] = msg.Login;
    messagemap[msgtype.LoginRsp] = msg.LoginRsp;
    messagemap[msgtype.RoomList] = msg.RoomList;
    messagemap[msgtype.EnterRoomReq] = msg.EnterRoomReq;
    messagemap[msgtype.EnterRoomRsp] = msg.EnterRoomRsp;
    messagemap[msgtype.PlayerBetting] = msg.PlayerBetting;
    messagemap[msgtype.PlayerBetted] = msg.PlayerBetted;
    messagemap[msgtype.RoomStartBet] = msg.RoomStartBet;
    messagemap[msgtype.RoomSettlement] = msg.RoomSettlement;
    messagemap[msgtype.ToDealerReq] = msg.ToDealerReq;
    messagemap[msgtype.DealerInfo] = msg.DealerInfo;
    messagemap[msgtype.OtherJoin] = msg.OtherJoin;
    messagemap[msgtype.PlayerBatchBetting] = msg.PlayerBatchBetting;
    messagemap[msgtype.PlayerBatchBetted] = msg.PlayerBatchBetted;
    messagemap[msgtype.ExitRoomReq] = msg.ExitRoomReq;
    messagemap[msgtype.ExitRoomRsp] = msg.ExitRoomRsp;
    messagemap[msgtype.OthersExit] = msg.OthersExit;
    messagemap[msgtype.BetResult] = msg.BetResult;
    messagemap[msgtype.RoomBaseInfoUpdate] = msg.RoomBaseInfoUpdate;
    messagemap[msgtype.CancelDealerReq] = msg.CancelDealerReq;
    messagemap[msgtype.PlayerScore] = msg.PlayerScore;
    messagemap[msgtype.UniMessage] = msg.UniMessage;
    messagemap[msgtype.RoomInfoReq] = msg.RoomInfoReq;
    messagemap[msgtype.RoomInfo] = msg.RoomInfo;
    messagemap[msgtype.GameStateQuery] = msg.GameStateQuery;
    messagemap[msgtype.PlayerRoomState] = msg.PlayerRoomState;
    messagemap[msgtype.PlayerInfo] = msg.PlayerInfo;
    export function getMsgObj(eMsg: msgtype) {
        return messagemap[eMsg];
    }
}