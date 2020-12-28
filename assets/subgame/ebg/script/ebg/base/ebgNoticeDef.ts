export const enum NoticeDef {
    ServerVersion = 0,    //服务器版本号
    Breathe = 1,         //收到服务器心跳
    LoginRsp = 2,        //收到用户登录成功返回
    Score = 3,             //玩家分数刷新
    RoomList = 4,        //房间列表
    EnterRoomRsp = 5,       //进入房间成功返回
    PlayerBetted = 6,        //下注
    RoomStartBet = 7,      //开始下注
    RoomSettlement =8,      //房间结算
    DealerInfo = 9,         //上庄信息
    OtherJoin=10,           //其他玩家加入
    PlayerBatchBetted = 11, //批量投注
    ExitRoomRsp =12,    //退出房间返回结果
    OthersExit = 13, //其他玩家退出房间
    BetResult =14, //顺天地输赢情况
    RoomBaseInfoUpdate = 15,  //收到房间更新消息
    PlayerScore= 16,    //用户分数信息
    UniMessage = 17, //code=1，被挤下线通知
    RoomInfo = 18,//房间信息
    PlayerRoomState = 19,
    PlayerInfo=20,
}