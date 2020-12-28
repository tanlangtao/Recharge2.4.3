//登录协议，考虑实现的游戏只是一个中间状态(登录和用户相关的信息在其它地方实现了传过来)
//所以这个登录就简单点，预留在这儿 C->S

//登录成功返回 S->C
export interface LoginRsp {
    UserId : string;
    score : number;
    nick : string;
    headimg : string;
    error : string;
}
enum EmRoomState {
    emRS_None = 0,
    emRS_Bet = 1,
    emRS_Settlement=2
}
enum EmBetArea{
    emBA_Zhuang = 0,
    emBA_Shun = 1 ,
    emBA_Tian =2 ,
    emBA_Di = 3
}
export interface ResRec {
    Shun :number;
    Tian :number;
    Di : number;
}
//定义房间信息
export interface BaseRoomInfo {
    Index : number;
    State : EmRoomState;
    Remaining : number;
    rrlist : ResRec[];
}
//房间列表消息，当玩家登陆成功后发送给客户端显示房间列表，S->C
export interface RoomList {
    roomlist : BaseRoomInfo[];
}
export interface CardInfo {
    Card1 :number;
    Card2 :number;
}

export interface TableCards {//桌面牌型 
    shun : CardInfo;
    tian : CardInfo;
    di :CardInfo;
    zhuang : CardInfo;
}
//下注信息
export interface BetInfo {
    area :EmBetArea;    //下注区域类型
    betnum :number;     //下注数量
}
//玩家消息，包含当前玩家ID，昵称，金币，下注信息
export interface PlayerInfo {
    ID : string;
    Nick : string;
    Head : string;
    score : number;
    curBet : number;    //当局下注总金额
    allBet : number;    //当前房间下注总金额 
    winTime : number;   //当前房间总赢局数
    betList : BetInfo[];  //玩家下注列表
}
//完整房间信息,use by EnterRoomRsp
export interface RoomInfo {
    Index:number;
    RoomState : EmRoomState;
    PlayerList : PlayerInfo[]; //玩家信息
    Cards : TableCards;          //如果是结算状态，此属性应有值
    HostInfo :DealerInfo ;              //庄家，玩家ID
    Remaining  : number;        //该房间状态剩余时间
    rrlist : ResRec[];     //结果例表
}
//返回玩家进入房间信息S->C
export interface EnterRoomRsp {
    Entered : boolean;      //是否成功进入房间
    Info:RoomInfo;          //房间信息
}
//其它玩家加入房间 S->C
export interface OtherJoin {
    ID :string;
    Nick : string;
    Head : string;
    score : number;
}
export interface OthersExit {
    list : string[];
}
//玩家退出房间,更新金额和房间例表
export interface ExitRoomRsp{
    score : number;
    roomlist :BaseRoomInfo[];
}
//其它玩家退出房间
export interface OtherExit {
    list : string[];
}
//玩家下注广播S->C
export interface PlayerBetted{
    PlayerID : string;
    Bet : BetInfo;
}
//玩家批量下注S->C
export interface PlayerBatchBetted {
    PlayerID : string;
    Bets : BetInfo[];
}
//随机的骰子点数
export interface RollNums {
    roll1 :number;
    roll2 : number;
}
//更新玩家金币信息,结算时玩家最新金币情况
export interface PlayerScore {
    ID : string;
    score : number;
    curBet : number;
    allBet : number;
    winTime : number;
}
export interface ClassArea{
    Shun :number;
    Tian :number;
    Di : number;
}
//房间广播，结算，参数为剩余时间,骰子点数和牌型及刷新玩家金币
export interface RoomSettlement {
    Remaining : number;
    Roll: RollNums;
    Cards : TableCards;
    NewScore : PlayerScore[];
    DealerResult:number;
    BetNum :ClassArea
}
//房间广播，开始下注，参数为下注剩余时间
export interface RoomStartBet {
    Remaining : number;
}
export interface DealerProper{
    ID :string,
    Nick :string,
    Head :string,
    score :number
}
//更新庄家信息S->C
export interface DealerInfo {
    Dealer : DealerProper;
    WaitingList : DealerProper[];
}
//同步玩家当前局输赢情况S->C,每轮开局后同步给每一个玩家的当轮输赢情况
export interface BetResult {
    Shun : number;
    Tian : number;
    Di : number;
}
//更新房间基本信息
export interface RoomBaseInfoUpdate{
    Index : number;
    State : EmRoomState;
    Remaining : number;
    Result:ResRec;//如果状态为emRS_Settlement，则此值有效
}
export interface UniMessage{
    Code : number;
    Message :string;
}
export interface PlayerRoomState{
    InRoom :boolean;
    RoomIndex :number;
}

/*******************************本地类型**************************************/
export interface fapaiItem{
    victory : number ;
    multiple : number;
}