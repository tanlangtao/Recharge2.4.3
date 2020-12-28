import * as $protobuf from "protobufjs-ebg";
/** Namespace msg. */
export namespace msg {

    /** Properties of a Login. */
    interface ILogin {

        /** Login token */
        token?: (string|null);

        /** Login UserId */
        UserId?: (string|null);

        /** Login Password */
        Password?: (string|null);

        /** Login reconnect */
        reconnect?: (boolean|null);
    }

    /** Represents a Login. */
    class Login implements ILogin {

        /**
         * Constructs a new Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILogin);

        /** Login token. */
        public token: string;

        /** Login UserId. */
        public UserId: string;

        /** Login Password. */
        public Password: string;

        /** Login reconnect. */
        public reconnect: boolean;

        /**
         * Creates a new Login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login instance
         */
        public static create(properties?: msg.ILogin): msg.Login;

        /**
         * Encodes the specified Login message. Does not implicitly {@link msg.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link msg.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Login;

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Login;

        /**
         * Verifies a Login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Login
         */
        public static fromObject(object: { [k: string]: any }): msg.Login;

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @param message Login
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Login, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Login to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginRsp. */
    interface ILoginRsp {

        /** LoginRsp UserId */
        UserId?: (string|null);

        /** LoginRsp score */
        score?: (number|null);

        /** LoginRsp nick */
        nick?: (string|null);

        /** LoginRsp headimg */
        headimg?: (string|null);

        /** LoginRsp error */
        error?: (string|null);
    }

    /** Represents a LoginRsp. */
    class LoginRsp implements ILoginRsp {

        /**
         * Constructs a new LoginRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILoginRsp);

        /** LoginRsp UserId. */
        public UserId: string;

        /** LoginRsp score. */
        public score: number;

        /** LoginRsp nick. */
        public nick: string;

        /** LoginRsp headimg. */
        public headimg: string;

        /** LoginRsp error. */
        public error: string;

        /**
         * Creates a new LoginRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRsp instance
         */
        public static create(properties?: msg.ILoginRsp): msg.LoginRsp;

        /**
         * Encodes the specified LoginRsp message. Does not implicitly {@link msg.LoginRsp.verify|verify} messages.
         * @param message LoginRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILoginRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRsp message, length delimited. Does not implicitly {@link msg.LoginRsp.verify|verify} messages.
         * @param message LoginRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILoginRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.LoginRsp;

        /**
         * Decodes a LoginRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.LoginRsp;

        /**
         * Verifies a LoginRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRsp
         */
        public static fromObject(object: { [k: string]: any }): msg.LoginRsp;

        /**
         * Creates a plain object from a LoginRsp message. Also converts values to other types if specified.
         * @param message LoginRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LoginRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Breathe. */
    interface IBreathe {
    }

    /** Represents a Breathe. */
    class Breathe implements IBreathe {

        /**
         * Constructs a new Breathe.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBreathe);

        /**
         * Creates a new Breathe instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Breathe instance
         */
        public static create(properties?: msg.IBreathe): msg.Breathe;

        /**
         * Encodes the specified Breathe message. Does not implicitly {@link msg.Breathe.verify|verify} messages.
         * @param message Breathe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBreathe, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Breathe message, length delimited. Does not implicitly {@link msg.Breathe.verify|verify} messages.
         * @param message Breathe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBreathe, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Breathe message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Breathe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.Breathe;

        /**
         * Decodes a Breathe message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Breathe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.Breathe;

        /**
         * Verifies a Breathe message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Breathe message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Breathe
         */
        public static fromObject(object: { [k: string]: any }): msg.Breathe;

        /**
         * Creates a plain object from a Breathe message. Also converts values to other types if specified.
         * @param message Breathe
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Breathe, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Breathe to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ServerInfo. */
    interface IServerInfo {

        /** ServerInfo version */
        version?: (string|null);
    }

    /** Represents a ServerInfo. */
    class ServerInfo implements IServerInfo {

        /**
         * Constructs a new ServerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IServerInfo);

        /** ServerInfo version. */
        public version: string;

        /**
         * Creates a new ServerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerInfo instance
         */
        public static create(properties?: msg.IServerInfo): msg.ServerInfo;

        /**
         * Encodes the specified ServerInfo message. Does not implicitly {@link msg.ServerInfo.verify|verify} messages.
         * @param message ServerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerInfo message, length delimited. Does not implicitly {@link msg.ServerInfo.verify|verify} messages.
         * @param message ServerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ServerInfo;

        /**
         * Decodes a ServerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ServerInfo;

        /**
         * Verifies a ServerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.ServerInfo;

        /**
         * Creates a plain object from a ServerInfo message. Also converts values to other types if specified.
         * @param message ServerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ServerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** EmRoomState enum. */
    enum EmRoomState {
        emRS_None = 0,
        emRS_Bet = 1,
        emRS_Settlement = 2
    }

    /** EmBetArea enum. */
    enum EmBetArea {
        emBA_Zhuang = 0,
        emBA_Shun = 1,
        emBA_Tian = 2,
        emBA_Di = 3
    }

    /** Properties of a ResRec. */
    interface IResRec {

        /** ResRec Shun */
        Shun?: (number|null);

        /** ResRec Tian */
        Tian?: (number|null);

        /** ResRec Di */
        Di?: (number|null);
    }

    /** Represents a ResRec. */
    class ResRec implements IResRec {

        /**
         * Constructs a new ResRec.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IResRec);

        /** ResRec Shun. */
        public Shun: number;

        /** ResRec Tian. */
        public Tian: number;

        /** ResRec Di. */
        public Di: number;

        /**
         * Creates a new ResRec instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResRec instance
         */
        public static create(properties?: msg.IResRec): msg.ResRec;

        /**
         * Encodes the specified ResRec message. Does not implicitly {@link msg.ResRec.verify|verify} messages.
         * @param message ResRec message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IResRec, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResRec message, length delimited. Does not implicitly {@link msg.ResRec.verify|verify} messages.
         * @param message ResRec message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IResRec, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResRec message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResRec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ResRec;

        /**
         * Decodes a ResRec message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResRec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ResRec;

        /**
         * Verifies a ResRec message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResRec message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResRec
         */
        public static fromObject(object: { [k: string]: any }): msg.ResRec;

        /**
         * Creates a plain object from a ResRec message. Also converts values to other types if specified.
         * @param message ResRec
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ResRec, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResRec to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BaseRoomInfo. */
    interface IBaseRoomInfo {

        /** BaseRoomInfo Index */
        Index?: (number|null);

        /** BaseRoomInfo State */
        State?: (msg.EmRoomState|null);

        /** BaseRoomInfo Remaining */
        Remaining?: (number|null);

        /** BaseRoomInfo rrlist */
        rrlist?: (msg.IResRec[]|null);
    }

    /** Represents a BaseRoomInfo. */
    class BaseRoomInfo implements IBaseRoomInfo {

        /**
         * Constructs a new BaseRoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBaseRoomInfo);

        /** BaseRoomInfo Index. */
        public Index: number;

        /** BaseRoomInfo State. */
        public State: msg.EmRoomState;

        /** BaseRoomInfo Remaining. */
        public Remaining: number;

        /** BaseRoomInfo rrlist. */
        public rrlist: msg.IResRec[];

        /**
         * Creates a new BaseRoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BaseRoomInfo instance
         */
        public static create(properties?: msg.IBaseRoomInfo): msg.BaseRoomInfo;

        /**
         * Encodes the specified BaseRoomInfo message. Does not implicitly {@link msg.BaseRoomInfo.verify|verify} messages.
         * @param message BaseRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBaseRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BaseRoomInfo message, length delimited. Does not implicitly {@link msg.BaseRoomInfo.verify|verify} messages.
         * @param message BaseRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBaseRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BaseRoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BaseRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BaseRoomInfo;

        /**
         * Decodes a BaseRoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BaseRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BaseRoomInfo;

        /**
         * Verifies a BaseRoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BaseRoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BaseRoomInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.BaseRoomInfo;

        /**
         * Creates a plain object from a BaseRoomInfo message. Also converts values to other types if specified.
         * @param message BaseRoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BaseRoomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BaseRoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomList. */
    interface IRoomList {

        /** RoomList roomlist */
        roomlist?: (msg.IBaseRoomInfo[]|null);
    }

    /** Represents a RoomList. */
    class RoomList implements IRoomList {

        /**
         * Constructs a new RoomList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomList);

        /** RoomList roomlist. */
        public roomlist: msg.IBaseRoomInfo[];

        /**
         * Creates a new RoomList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomList instance
         */
        public static create(properties?: msg.IRoomList): msg.RoomList;

        /**
         * Encodes the specified RoomList message. Does not implicitly {@link msg.RoomList.verify|verify} messages.
         * @param message RoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomList message, length delimited. Does not implicitly {@link msg.RoomList.verify|verify} messages.
         * @param message RoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomList;

        /**
         * Decodes a RoomList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomList;

        /**
         * Verifies a RoomList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomList
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomList;

        /**
         * Creates a plain object from a RoomList message. Also converts values to other types if specified.
         * @param message RoomList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterRoomReq. */
    interface IEnterRoomReq {

        /** EnterRoomReq Index */
        Index?: (number|null);
    }

    /** Represents an EnterRoomReq. */
    class EnterRoomReq implements IEnterRoomReq {

        /**
         * Constructs a new EnterRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IEnterRoomReq);

        /** EnterRoomReq Index. */
        public Index: number;

        /**
         * Creates a new EnterRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterRoomReq instance
         */
        public static create(properties?: msg.IEnterRoomReq): msg.EnterRoomReq;

        /**
         * Encodes the specified EnterRoomReq message. Does not implicitly {@link msg.EnterRoomReq.verify|verify} messages.
         * @param message EnterRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IEnterRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterRoomReq message, length delimited. Does not implicitly {@link msg.EnterRoomReq.verify|verify} messages.
         * @param message EnterRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IEnterRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.EnterRoomReq;

        /**
         * Decodes an EnterRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.EnterRoomReq;

        /**
         * Verifies an EnterRoomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterRoomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterRoomReq
         */
        public static fromObject(object: { [k: string]: any }): msg.EnterRoomReq;

        /**
         * Creates a plain object from an EnterRoomReq message. Also converts values to other types if specified.
         * @param message EnterRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.EnterRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterRoomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CardInfo. */
    interface ICardInfo {

        /** CardInfo Card1 */
        Card1?: (number|null);

        /** CardInfo Card2 */
        Card2?: (number|null);
    }

    /** Represents a CardInfo. */
    class CardInfo implements ICardInfo {

        /**
         * Constructs a new CardInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ICardInfo);

        /** CardInfo Card1. */
        public Card1: number;

        /** CardInfo Card2. */
        public Card2: number;

        /**
         * Creates a new CardInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CardInfo instance
         */
        public static create(properties?: msg.ICardInfo): msg.CardInfo;

        /**
         * Encodes the specified CardInfo message. Does not implicitly {@link msg.CardInfo.verify|verify} messages.
         * @param message CardInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ICardInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CardInfo message, length delimited. Does not implicitly {@link msg.CardInfo.verify|verify} messages.
         * @param message CardInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ICardInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CardInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.CardInfo;

        /**
         * Decodes a CardInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.CardInfo;

        /**
         * Verifies a CardInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CardInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CardInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.CardInfo;

        /**
         * Creates a plain object from a CardInfo message. Also converts values to other types if specified.
         * @param message CardInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.CardInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CardInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TableCards. */
    interface ITableCards {

        /** TableCards shun */
        shun?: (msg.ICardInfo|null);

        /** TableCards tian */
        tian?: (msg.ICardInfo|null);

        /** TableCards di */
        di?: (msg.ICardInfo|null);

        /** TableCards zhuang */
        zhuang?: (msg.ICardInfo|null);
    }

    /** Represents a TableCards. */
    class TableCards implements ITableCards {

        /**
         * Constructs a new TableCards.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ITableCards);

        /** TableCards shun. */
        public shun?: (msg.ICardInfo|null);

        /** TableCards tian. */
        public tian?: (msg.ICardInfo|null);

        /** TableCards di. */
        public di?: (msg.ICardInfo|null);

        /** TableCards zhuang. */
        public zhuang?: (msg.ICardInfo|null);

        /**
         * Creates a new TableCards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TableCards instance
         */
        public static create(properties?: msg.ITableCards): msg.TableCards;

        /**
         * Encodes the specified TableCards message. Does not implicitly {@link msg.TableCards.verify|verify} messages.
         * @param message TableCards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ITableCards, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TableCards message, length delimited. Does not implicitly {@link msg.TableCards.verify|verify} messages.
         * @param message TableCards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ITableCards, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TableCards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TableCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.TableCards;

        /**
         * Decodes a TableCards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TableCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.TableCards;

        /**
         * Verifies a TableCards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TableCards message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TableCards
         */
        public static fromObject(object: { [k: string]: any }): msg.TableCards;

        /**
         * Creates a plain object from a TableCards message. Also converts values to other types if specified.
         * @param message TableCards
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.TableCards, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TableCards to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BetInfo. */
    interface IBetInfo {

        /** BetInfo area */
        area?: (msg.EmBetArea|null);

        /** BetInfo betnum */
        betnum?: (number|null);
    }

    /** Represents a BetInfo. */
    class BetInfo implements IBetInfo {

        /**
         * Constructs a new BetInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBetInfo);

        /** BetInfo area. */
        public area: msg.EmBetArea;

        /** BetInfo betnum. */
        public betnum: number;

        /**
         * Creates a new BetInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetInfo instance
         */
        public static create(properties?: msg.IBetInfo): msg.BetInfo;

        /**
         * Encodes the specified BetInfo message. Does not implicitly {@link msg.BetInfo.verify|verify} messages.
         * @param message BetInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBetInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetInfo message, length delimited. Does not implicitly {@link msg.BetInfo.verify|verify} messages.
         * @param message BetInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBetInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetInfo;

        /**
         * Decodes a BetInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetInfo;

        /**
         * Verifies a BetInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.BetInfo;

        /**
         * Creates a plain object from a BetInfo message. Also converts values to other types if specified.
         * @param message BetInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BetInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerInfo. */
    interface IPlayerInfo {

        /** PlayerInfo ID */
        ID?: (string|null);

        /** PlayerInfo Nick */
        Nick?: (string|null);

        /** PlayerInfo Head */
        Head?: (string|null);

        /** PlayerInfo score */
        score?: (number|null);

        /** PlayerInfo curBet */
        curBet?: (number|null);

        /** PlayerInfo allBet */
        allBet?: (number|null);

        /** PlayerInfo winTime */
        winTime?: (number|null);

        /** PlayerInfo betList */
        betList?: (msg.IBetInfo[]|null);
    }

    /** Represents a PlayerInfo. */
    class PlayerInfo implements IPlayerInfo {

        /**
         * Constructs a new PlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerInfo);

        /** PlayerInfo ID. */
        public ID: string;

        /** PlayerInfo Nick. */
        public Nick: string;

        /** PlayerInfo Head. */
        public Head: string;

        /** PlayerInfo score. */
        public score: number;

        /** PlayerInfo curBet. */
        public curBet: number;

        /** PlayerInfo allBet. */
        public allBet: number;

        /** PlayerInfo winTime. */
        public winTime: number;

        /** PlayerInfo betList. */
        public betList: msg.IBetInfo[];

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfo instance
         */
        public static create(properties?: msg.IPlayerInfo): msg.PlayerInfo;

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerInfo;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerInfo;

        /**
         * Verifies a PlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerInfo;

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @param message PlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DealerProper. */
    interface IDealerProper {

        /** DealerProper ID */
        ID?: (string|null);

        /** DealerProper Nick */
        Nick?: (string|null);

        /** DealerProper Head */
        Head?: (string|null);

        /** DealerProper score */
        score?: (number|null);
    }

    /** Represents a DealerProper. */
    class DealerProper implements IDealerProper {

        /**
         * Constructs a new DealerProper.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IDealerProper);

        /** DealerProper ID. */
        public ID: string;

        /** DealerProper Nick. */
        public Nick: string;

        /** DealerProper Head. */
        public Head: string;

        /** DealerProper score. */
        public score: number;

        /**
         * Creates a new DealerProper instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DealerProper instance
         */
        public static create(properties?: msg.IDealerProper): msg.DealerProper;

        /**
         * Encodes the specified DealerProper message. Does not implicitly {@link msg.DealerProper.verify|verify} messages.
         * @param message DealerProper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IDealerProper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DealerProper message, length delimited. Does not implicitly {@link msg.DealerProper.verify|verify} messages.
         * @param message DealerProper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IDealerProper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DealerProper message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DealerProper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.DealerProper;

        /**
         * Decodes a DealerProper message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DealerProper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.DealerProper;

        /**
         * Verifies a DealerProper message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DealerProper message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DealerProper
         */
        public static fromObject(object: { [k: string]: any }): msg.DealerProper;

        /**
         * Creates a plain object from a DealerProper message. Also converts values to other types if specified.
         * @param message DealerProper
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.DealerProper, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DealerProper to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DealerInfo. */
    interface IDealerInfo {

        /** DealerInfo Dealer */
        Dealer?: (msg.IDealerProper|null);

        /** DealerInfo WaitingList */
        WaitingList?: (msg.IDealerProper[]|null);
    }

    /** Represents a DealerInfo. */
    class DealerInfo implements IDealerInfo {

        /**
         * Constructs a new DealerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IDealerInfo);

        /** DealerInfo Dealer. */
        public Dealer?: (msg.IDealerProper|null);

        /** DealerInfo WaitingList. */
        public WaitingList: msg.IDealerProper[];

        /**
         * Creates a new DealerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DealerInfo instance
         */
        public static create(properties?: msg.IDealerInfo): msg.DealerInfo;

        /**
         * Encodes the specified DealerInfo message. Does not implicitly {@link msg.DealerInfo.verify|verify} messages.
         * @param message DealerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IDealerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DealerInfo message, length delimited. Does not implicitly {@link msg.DealerInfo.verify|verify} messages.
         * @param message DealerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IDealerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DealerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DealerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.DealerInfo;

        /**
         * Decodes a DealerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DealerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.DealerInfo;

        /**
         * Verifies a DealerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DealerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DealerInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.DealerInfo;

        /**
         * Creates a plain object from a DealerInfo message. Also converts values to other types if specified.
         * @param message DealerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.DealerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DealerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomInfo. */
    interface IRoomInfo {

        /** RoomInfo Index */
        Index?: (number|null);

        /** RoomInfo RoomState */
        RoomState?: (msg.EmRoomState|null);

        /** RoomInfo PlayerList */
        PlayerList?: (msg.IPlayerInfo[]|null);

        /** RoomInfo Cards */
        Cards?: (msg.ITableCards|null);

        /** RoomInfo HostInfo */
        HostInfo?: (msg.IDealerInfo|null);

        /** RoomInfo Remaining */
        Remaining?: (number|null);

        /** RoomInfo rrlist */
        rrlist?: (msg.IResRec[]|null);
    }

    /** Represents a RoomInfo. */
    class RoomInfo implements IRoomInfo {

        /**
         * Constructs a new RoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomInfo);

        /** RoomInfo Index. */
        public Index: number;

        /** RoomInfo RoomState. */
        public RoomState: msg.EmRoomState;

        /** RoomInfo PlayerList. */
        public PlayerList: msg.IPlayerInfo[];

        /** RoomInfo Cards. */
        public Cards?: (msg.ITableCards|null);

        /** RoomInfo HostInfo. */
        public HostInfo?: (msg.IDealerInfo|null);

        /** RoomInfo Remaining. */
        public Remaining: number;

        /** RoomInfo rrlist. */
        public rrlist: msg.IResRec[];

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomInfo instance
         */
        public static create(properties?: msg.IRoomInfo): msg.RoomInfo;

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @param message RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomInfo;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomInfo;

        /**
         * Verifies a RoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomInfo;

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @param message RoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterRoomRsp. */
    interface IEnterRoomRsp {

        /** EnterRoomRsp Entered */
        Entered?: (boolean|null);

        /** EnterRoomRsp Info */
        Info?: (msg.IRoomInfo|null);
    }

    /** Represents an EnterRoomRsp. */
    class EnterRoomRsp implements IEnterRoomRsp {

        /**
         * Constructs a new EnterRoomRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IEnterRoomRsp);

        /** EnterRoomRsp Entered. */
        public Entered: boolean;

        /** EnterRoomRsp Info. */
        public Info?: (msg.IRoomInfo|null);

        /**
         * Creates a new EnterRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterRoomRsp instance
         */
        public static create(properties?: msg.IEnterRoomRsp): msg.EnterRoomRsp;

        /**
         * Encodes the specified EnterRoomRsp message. Does not implicitly {@link msg.EnterRoomRsp.verify|verify} messages.
         * @param message EnterRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IEnterRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterRoomRsp message, length delimited. Does not implicitly {@link msg.EnterRoomRsp.verify|verify} messages.
         * @param message EnterRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IEnterRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.EnterRoomRsp;

        /**
         * Decodes an EnterRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.EnterRoomRsp;

        /**
         * Verifies an EnterRoomRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterRoomRsp
         */
        public static fromObject(object: { [k: string]: any }): msg.EnterRoomRsp;

        /**
         * Creates a plain object from an EnterRoomRsp message. Also converts values to other types if specified.
         * @param message EnterRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.EnterRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomInfoReq. */
    interface IRoomInfoReq {
    }

    /** Represents a RoomInfoReq. */
    class RoomInfoReq implements IRoomInfoReq {

        /**
         * Constructs a new RoomInfoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomInfoReq);

        /**
         * Creates a new RoomInfoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomInfoReq instance
         */
        public static create(properties?: msg.IRoomInfoReq): msg.RoomInfoReq;

        /**
         * Encodes the specified RoomInfoReq message. Does not implicitly {@link msg.RoomInfoReq.verify|verify} messages.
         * @param message RoomInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomInfoReq message, length delimited. Does not implicitly {@link msg.RoomInfoReq.verify|verify} messages.
         * @param message RoomInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomInfoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomInfoReq;

        /**
         * Decodes a RoomInfoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomInfoReq;

        /**
         * Verifies a RoomInfoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomInfoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomInfoReq
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomInfoReq;

        /**
         * Creates a plain object from a RoomInfoReq message. Also converts values to other types if specified.
         * @param message RoomInfoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomInfoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomInfoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OtherJoin. */
    interface IOtherJoin {

        /** OtherJoin ID */
        ID?: (string|null);

        /** OtherJoin Nick */
        Nick?: (string|null);

        /** OtherJoin Head */
        Head?: (string|null);

        /** OtherJoin score */
        score?: (number|null);
    }

    /** Represents an OtherJoin. */
    class OtherJoin implements IOtherJoin {

        /**
         * Constructs a new OtherJoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IOtherJoin);

        /** OtherJoin ID. */
        public ID: string;

        /** OtherJoin Nick. */
        public Nick: string;

        /** OtherJoin Head. */
        public Head: string;

        /** OtherJoin score. */
        public score: number;

        /**
         * Creates a new OtherJoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OtherJoin instance
         */
        public static create(properties?: msg.IOtherJoin): msg.OtherJoin;

        /**
         * Encodes the specified OtherJoin message. Does not implicitly {@link msg.OtherJoin.verify|verify} messages.
         * @param message OtherJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IOtherJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OtherJoin message, length delimited. Does not implicitly {@link msg.OtherJoin.verify|verify} messages.
         * @param message OtherJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IOtherJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OtherJoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OtherJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.OtherJoin;

        /**
         * Decodes an OtherJoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OtherJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.OtherJoin;

        /**
         * Verifies an OtherJoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OtherJoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OtherJoin
         */
        public static fromObject(object: { [k: string]: any }): msg.OtherJoin;

        /**
         * Creates a plain object from an OtherJoin message. Also converts values to other types if specified.
         * @param message OtherJoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.OtherJoin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OtherJoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExitRoomReq. */
    interface IExitRoomReq {
    }

    /** Represents an ExitRoomReq. */
    class ExitRoomReq implements IExitRoomReq {

        /**
         * Constructs a new ExitRoomReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IExitRoomReq);

        /**
         * Creates a new ExitRoomReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExitRoomReq instance
         */
        public static create(properties?: msg.IExitRoomReq): msg.ExitRoomReq;

        /**
         * Encodes the specified ExitRoomReq message. Does not implicitly {@link msg.ExitRoomReq.verify|verify} messages.
         * @param message ExitRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IExitRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExitRoomReq message, length delimited. Does not implicitly {@link msg.ExitRoomReq.verify|verify} messages.
         * @param message ExitRoomReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IExitRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExitRoomReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExitRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ExitRoomReq;

        /**
         * Decodes an ExitRoomReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExitRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ExitRoomReq;

        /**
         * Verifies an ExitRoomReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExitRoomReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitRoomReq
         */
        public static fromObject(object: { [k: string]: any }): msg.ExitRoomReq;

        /**
         * Creates a plain object from an ExitRoomReq message. Also converts values to other types if specified.
         * @param message ExitRoomReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ExitRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExitRoomReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExitRoomRsp. */
    interface IExitRoomRsp {

        /** ExitRoomRsp score */
        score?: (number|null);

        /** ExitRoomRsp roomlist */
        roomlist?: (msg.IBaseRoomInfo[]|null);
    }

    /** Represents an ExitRoomRsp. */
    class ExitRoomRsp implements IExitRoomRsp {

        /**
         * Constructs a new ExitRoomRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IExitRoomRsp);

        /** ExitRoomRsp score. */
        public score: number;

        /** ExitRoomRsp roomlist. */
        public roomlist: msg.IBaseRoomInfo[];

        /**
         * Creates a new ExitRoomRsp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExitRoomRsp instance
         */
        public static create(properties?: msg.IExitRoomRsp): msg.ExitRoomRsp;

        /**
         * Encodes the specified ExitRoomRsp message. Does not implicitly {@link msg.ExitRoomRsp.verify|verify} messages.
         * @param message ExitRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IExitRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExitRoomRsp message, length delimited. Does not implicitly {@link msg.ExitRoomRsp.verify|verify} messages.
         * @param message ExitRoomRsp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IExitRoomRsp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExitRoomRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExitRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ExitRoomRsp;

        /**
         * Decodes an ExitRoomRsp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExitRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ExitRoomRsp;

        /**
         * Verifies an ExitRoomRsp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExitRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitRoomRsp
         */
        public static fromObject(object: { [k: string]: any }): msg.ExitRoomRsp;

        /**
         * Creates a plain object from an ExitRoomRsp message. Also converts values to other types if specified.
         * @param message ExitRoomRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ExitRoomRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExitRoomRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OthersExit. */
    interface IOthersExit {

        /** OthersExit list */
        list?: (string[]|null);
    }

    /** Represents an OthersExit. */
    class OthersExit implements IOthersExit {

        /**
         * Constructs a new OthersExit.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IOthersExit);

        /** OthersExit list. */
        public list: string[];

        /**
         * Creates a new OthersExit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OthersExit instance
         */
        public static create(properties?: msg.IOthersExit): msg.OthersExit;

        /**
         * Encodes the specified OthersExit message. Does not implicitly {@link msg.OthersExit.verify|verify} messages.
         * @param message OthersExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IOthersExit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OthersExit message, length delimited. Does not implicitly {@link msg.OthersExit.verify|verify} messages.
         * @param message OthersExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IOthersExit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OthersExit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OthersExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.OthersExit;

        /**
         * Decodes an OthersExit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OthersExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.OthersExit;

        /**
         * Verifies an OthersExit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OthersExit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OthersExit
         */
        public static fromObject(object: { [k: string]: any }): msg.OthersExit;

        /**
         * Creates a plain object from an OthersExit message. Also converts values to other types if specified.
         * @param message OthersExit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.OthersExit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OthersExit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerBetting. */
    interface IPlayerBetting {

        /** PlayerBetting Bet */
        Bet?: (msg.IBetInfo|null);
    }

    /** Represents a PlayerBetting. */
    class PlayerBetting implements IPlayerBetting {

        /**
         * Constructs a new PlayerBetting.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerBetting);

        /** PlayerBetting Bet. */
        public Bet?: (msg.IBetInfo|null);

        /**
         * Creates a new PlayerBetting instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerBetting instance
         */
        public static create(properties?: msg.IPlayerBetting): msg.PlayerBetting;

        /**
         * Encodes the specified PlayerBetting message. Does not implicitly {@link msg.PlayerBetting.verify|verify} messages.
         * @param message PlayerBetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerBetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerBetting message, length delimited. Does not implicitly {@link msg.PlayerBetting.verify|verify} messages.
         * @param message PlayerBetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerBetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerBetting message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerBetting;

        /**
         * Decodes a PlayerBetting message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerBetting;

        /**
         * Verifies a PlayerBetting message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerBetting message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerBetting
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerBetting;

        /**
         * Creates a plain object from a PlayerBetting message. Also converts values to other types if specified.
         * @param message PlayerBetting
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerBetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerBetting to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerBetted. */
    interface IPlayerBetted {

        /** PlayerBetted PlayerID */
        PlayerID?: (string|null);

        /** PlayerBetted Bet */
        Bet?: (msg.IBetInfo|null);
    }

    /** Represents a PlayerBetted. */
    class PlayerBetted implements IPlayerBetted {

        /**
         * Constructs a new PlayerBetted.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerBetted);

        /** PlayerBetted PlayerID. */
        public PlayerID: string;

        /** PlayerBetted Bet. */
        public Bet?: (msg.IBetInfo|null);

        /**
         * Creates a new PlayerBetted instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerBetted instance
         */
        public static create(properties?: msg.IPlayerBetted): msg.PlayerBetted;

        /**
         * Encodes the specified PlayerBetted message. Does not implicitly {@link msg.PlayerBetted.verify|verify} messages.
         * @param message PlayerBetted message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerBetted, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerBetted message, length delimited. Does not implicitly {@link msg.PlayerBetted.verify|verify} messages.
         * @param message PlayerBetted message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerBetted, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerBetted message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerBetted;

        /**
         * Decodes a PlayerBetted message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerBetted;

        /**
         * Verifies a PlayerBetted message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerBetted message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerBetted
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerBetted;

        /**
         * Creates a plain object from a PlayerBetted message. Also converts values to other types if specified.
         * @param message PlayerBetted
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerBetted, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerBetted to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerBatchBetting. */
    interface IPlayerBatchBetting {

        /** PlayerBatchBetting Bets */
        Bets?: (msg.IBetInfo[]|null);
    }

    /** Represents a PlayerBatchBetting. */
    class PlayerBatchBetting implements IPlayerBatchBetting {

        /**
         * Constructs a new PlayerBatchBetting.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerBatchBetting);

        /** PlayerBatchBetting Bets. */
        public Bets: msg.IBetInfo[];

        /**
         * Creates a new PlayerBatchBetting instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerBatchBetting instance
         */
        public static create(properties?: msg.IPlayerBatchBetting): msg.PlayerBatchBetting;

        /**
         * Encodes the specified PlayerBatchBetting message. Does not implicitly {@link msg.PlayerBatchBetting.verify|verify} messages.
         * @param message PlayerBatchBetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerBatchBetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerBatchBetting message, length delimited. Does not implicitly {@link msg.PlayerBatchBetting.verify|verify} messages.
         * @param message PlayerBatchBetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerBatchBetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerBatchBetting message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerBatchBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerBatchBetting;

        /**
         * Decodes a PlayerBatchBetting message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerBatchBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerBatchBetting;

        /**
         * Verifies a PlayerBatchBetting message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerBatchBetting message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerBatchBetting
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerBatchBetting;

        /**
         * Creates a plain object from a PlayerBatchBetting message. Also converts values to other types if specified.
         * @param message PlayerBatchBetting
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerBatchBetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerBatchBetting to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerBatchBetted. */
    interface IPlayerBatchBetted {

        /** PlayerBatchBetted PlayerID */
        PlayerID?: (string|null);

        /** PlayerBatchBetted Bets */
        Bets?: (msg.IBetInfo[]|null);
    }

    /** Represents a PlayerBatchBetted. */
    class PlayerBatchBetted implements IPlayerBatchBetted {

        /**
         * Constructs a new PlayerBatchBetted.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerBatchBetted);

        /** PlayerBatchBetted PlayerID. */
        public PlayerID: string;

        /** PlayerBatchBetted Bets. */
        public Bets: msg.IBetInfo[];

        /**
         * Creates a new PlayerBatchBetted instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerBatchBetted instance
         */
        public static create(properties?: msg.IPlayerBatchBetted): msg.PlayerBatchBetted;

        /**
         * Encodes the specified PlayerBatchBetted message. Does not implicitly {@link msg.PlayerBatchBetted.verify|verify} messages.
         * @param message PlayerBatchBetted message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerBatchBetted, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerBatchBetted message, length delimited. Does not implicitly {@link msg.PlayerBatchBetted.verify|verify} messages.
         * @param message PlayerBatchBetted message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerBatchBetted, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerBatchBetted message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerBatchBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerBatchBetted;

        /**
         * Decodes a PlayerBatchBetted message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerBatchBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerBatchBetted;

        /**
         * Verifies a PlayerBatchBetted message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerBatchBetted message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerBatchBetted
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerBatchBetted;

        /**
         * Creates a plain object from a PlayerBatchBetted message. Also converts values to other types if specified.
         * @param message PlayerBatchBetted
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerBatchBetted, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerBatchBetted to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RollNums. */
    interface IRollNums {

        /** RollNums roll1 */
        roll1?: (number|null);

        /** RollNums roll2 */
        roll2?: (number|null);
    }

    /** Represents a RollNums. */
    class RollNums implements IRollNums {

        /**
         * Constructs a new RollNums.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRollNums);

        /** RollNums roll1. */
        public roll1: number;

        /** RollNums roll2. */
        public roll2: number;

        /**
         * Creates a new RollNums instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RollNums instance
         */
        public static create(properties?: msg.IRollNums): msg.RollNums;

        /**
         * Encodes the specified RollNums message. Does not implicitly {@link msg.RollNums.verify|verify} messages.
         * @param message RollNums message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRollNums, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RollNums message, length delimited. Does not implicitly {@link msg.RollNums.verify|verify} messages.
         * @param message RollNums message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRollNums, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RollNums message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RollNums
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RollNums;

        /**
         * Decodes a RollNums message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RollNums
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RollNums;

        /**
         * Verifies a RollNums message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RollNums message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RollNums
         */
        public static fromObject(object: { [k: string]: any }): msg.RollNums;

        /**
         * Creates a plain object from a RollNums message. Also converts values to other types if specified.
         * @param message RollNums
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RollNums, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RollNums to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerScore. */
    interface IPlayerScore {

        /** PlayerScore ID */
        ID?: (string|null);

        /** PlayerScore score */
        score?: (number|null);

        /** PlayerScore curBet */
        curBet?: (number|null);

        /** PlayerScore allBet */
        allBet?: (number|null);

        /** PlayerScore winTime */
        winTime?: (number|null);
    }

    /** Represents a PlayerScore. */
    class PlayerScore implements IPlayerScore {

        /**
         * Constructs a new PlayerScore.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerScore);

        /** PlayerScore ID. */
        public ID: string;

        /** PlayerScore score. */
        public score: number;

        /** PlayerScore curBet. */
        public curBet: number;

        /** PlayerScore allBet. */
        public allBet: number;

        /** PlayerScore winTime. */
        public winTime: number;

        /**
         * Creates a new PlayerScore instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerScore instance
         */
        public static create(properties?: msg.IPlayerScore): msg.PlayerScore;

        /**
         * Encodes the specified PlayerScore message. Does not implicitly {@link msg.PlayerScore.verify|verify} messages.
         * @param message PlayerScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerScore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerScore message, length delimited. Does not implicitly {@link msg.PlayerScore.verify|verify} messages.
         * @param message PlayerScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerScore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerScore message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerScore;

        /**
         * Decodes a PlayerScore message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerScore;

        /**
         * Verifies a PlayerScore message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerScore message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerScore
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerScore;

        /**
         * Creates a plain object from a PlayerScore message. Also converts values to other types if specified.
         * @param message PlayerScore
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerScore, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerScore to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClassAreaUni. */
    interface IClassAreaUni {

        /** ClassAreaUni Shun */
        Shun?: (number|null);

        /** ClassAreaUni Tian */
        Tian?: (number|null);

        /** ClassAreaUni Di */
        Di?: (number|null);
    }

    /** Represents a ClassAreaUni. */
    class ClassAreaUni implements IClassAreaUni {

        /**
         * Constructs a new ClassAreaUni.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IClassAreaUni);

        /** ClassAreaUni Shun. */
        public Shun: number;

        /** ClassAreaUni Tian. */
        public Tian: number;

        /** ClassAreaUni Di. */
        public Di: number;

        /**
         * Creates a new ClassAreaUni instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClassAreaUni instance
         */
        public static create(properties?: msg.IClassAreaUni): msg.ClassAreaUni;

        /**
         * Encodes the specified ClassAreaUni message. Does not implicitly {@link msg.ClassAreaUni.verify|verify} messages.
         * @param message ClassAreaUni message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IClassAreaUni, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClassAreaUni message, length delimited. Does not implicitly {@link msg.ClassAreaUni.verify|verify} messages.
         * @param message ClassAreaUni message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IClassAreaUni, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClassAreaUni message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClassAreaUni
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ClassAreaUni;

        /**
         * Decodes a ClassAreaUni message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClassAreaUni
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ClassAreaUni;

        /**
         * Verifies a ClassAreaUni message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClassAreaUni message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClassAreaUni
         */
        public static fromObject(object: { [k: string]: any }): msg.ClassAreaUni;

        /**
         * Creates a plain object from a ClassAreaUni message. Also converts values to other types if specified.
         * @param message ClassAreaUni
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ClassAreaUni, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClassAreaUni to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomSettlement. */
    interface IRoomSettlement {

        /** RoomSettlement Remaining */
        Remaining?: (number|null);

        /** RoomSettlement Roll */
        Roll?: (msg.IRollNums|null);

        /** RoomSettlement Cards */
        Cards?: (msg.ITableCards|null);

        /** RoomSettlement DealerResult */
        DealerResult?: (number|null);

        /** RoomSettlement NewScore */
        NewScore?: (msg.IPlayerScore[]|null);

        /** RoomSettlement BetNum */
        BetNum?: (msg.IClassAreaUni|null);
    }

    /** Represents a RoomSettlement. */
    class RoomSettlement implements IRoomSettlement {

        /**
         * Constructs a new RoomSettlement.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomSettlement);

        /** RoomSettlement Remaining. */
        public Remaining: number;

        /** RoomSettlement Roll. */
        public Roll?: (msg.IRollNums|null);

        /** RoomSettlement Cards. */
        public Cards?: (msg.ITableCards|null);

        /** RoomSettlement DealerResult. */
        public DealerResult: number;

        /** RoomSettlement NewScore. */
        public NewScore: msg.IPlayerScore[];

        /** RoomSettlement BetNum. */
        public BetNum?: (msg.IClassAreaUni|null);

        /**
         * Creates a new RoomSettlement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomSettlement instance
         */
        public static create(properties?: msg.IRoomSettlement): msg.RoomSettlement;

        /**
         * Encodes the specified RoomSettlement message. Does not implicitly {@link msg.RoomSettlement.verify|verify} messages.
         * @param message RoomSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomSettlement message, length delimited. Does not implicitly {@link msg.RoomSettlement.verify|verify} messages.
         * @param message RoomSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomSettlement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomSettlement;

        /**
         * Decodes a RoomSettlement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomSettlement;

        /**
         * Verifies a RoomSettlement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomSettlement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomSettlement
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomSettlement;

        /**
         * Creates a plain object from a RoomSettlement message. Also converts values to other types if specified.
         * @param message RoomSettlement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomSettlement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomSettlement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomStartBet. */
    interface IRoomStartBet {

        /** RoomStartBet Remaining */
        Remaining?: (number|null);
    }

    /** Represents a RoomStartBet. */
    class RoomStartBet implements IRoomStartBet {

        /**
         * Constructs a new RoomStartBet.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomStartBet);

        /** RoomStartBet Remaining. */
        public Remaining: number;

        /**
         * Creates a new RoomStartBet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomStartBet instance
         */
        public static create(properties?: msg.IRoomStartBet): msg.RoomStartBet;

        /**
         * Encodes the specified RoomStartBet message. Does not implicitly {@link msg.RoomStartBet.verify|verify} messages.
         * @param message RoomStartBet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomStartBet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomStartBet message, length delimited. Does not implicitly {@link msg.RoomStartBet.verify|verify} messages.
         * @param message RoomStartBet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomStartBet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomStartBet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomStartBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomStartBet;

        /**
         * Decodes a RoomStartBet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomStartBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomStartBet;

        /**
         * Verifies a RoomStartBet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomStartBet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomStartBet
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomStartBet;

        /**
         * Creates a plain object from a RoomStartBet message. Also converts values to other types if specified.
         * @param message RoomStartBet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomStartBet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomStartBet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ToDealerReq. */
    interface IToDealerReq {

        /** ToDealerReq score */
        score?: (number|null);
    }

    /** Represents a ToDealerReq. */
    class ToDealerReq implements IToDealerReq {

        /**
         * Constructs a new ToDealerReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IToDealerReq);

        /** ToDealerReq score. */
        public score: number;

        /**
         * Creates a new ToDealerReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ToDealerReq instance
         */
        public static create(properties?: msg.IToDealerReq): msg.ToDealerReq;

        /**
         * Encodes the specified ToDealerReq message. Does not implicitly {@link msg.ToDealerReq.verify|verify} messages.
         * @param message ToDealerReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IToDealerReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ToDealerReq message, length delimited. Does not implicitly {@link msg.ToDealerReq.verify|verify} messages.
         * @param message ToDealerReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IToDealerReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ToDealerReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ToDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.ToDealerReq;

        /**
         * Decodes a ToDealerReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ToDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.ToDealerReq;

        /**
         * Verifies a ToDealerReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ToDealerReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ToDealerReq
         */
        public static fromObject(object: { [k: string]: any }): msg.ToDealerReq;

        /**
         * Creates a plain object from a ToDealerReq message. Also converts values to other types if specified.
         * @param message ToDealerReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ToDealerReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ToDealerReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CancelDealerReq. */
    interface ICancelDealerReq {
    }

    /** Represents a CancelDealerReq. */
    class CancelDealerReq implements ICancelDealerReq {

        /**
         * Constructs a new CancelDealerReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ICancelDealerReq);

        /**
         * Creates a new CancelDealerReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelDealerReq instance
         */
        public static create(properties?: msg.ICancelDealerReq): msg.CancelDealerReq;

        /**
         * Encodes the specified CancelDealerReq message. Does not implicitly {@link msg.CancelDealerReq.verify|verify} messages.
         * @param message CancelDealerReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ICancelDealerReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelDealerReq message, length delimited. Does not implicitly {@link msg.CancelDealerReq.verify|verify} messages.
         * @param message CancelDealerReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ICancelDealerReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelDealerReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.CancelDealerReq;

        /**
         * Decodes a CancelDealerReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.CancelDealerReq;

        /**
         * Verifies a CancelDealerReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelDealerReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelDealerReq
         */
        public static fromObject(object: { [k: string]: any }): msg.CancelDealerReq;

        /**
         * Creates a plain object from a CancelDealerReq message. Also converts values to other types if specified.
         * @param message CancelDealerReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.CancelDealerReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelDealerReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BetResult. */
    interface IBetResult {

        /** BetResult Shun */
        Shun?: (number|null);

        /** BetResult Tian */
        Tian?: (number|null);

        /** BetResult Di */
        Di?: (number|null);
    }

    /** Represents a BetResult. */
    class BetResult implements IBetResult {

        /**
         * Constructs a new BetResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBetResult);

        /** BetResult Shun. */
        public Shun: number;

        /** BetResult Tian. */
        public Tian: number;

        /** BetResult Di. */
        public Di: number;

        /**
         * Creates a new BetResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetResult instance
         */
        public static create(properties?: msg.IBetResult): msg.BetResult;

        /**
         * Encodes the specified BetResult message. Does not implicitly {@link msg.BetResult.verify|verify} messages.
         * @param message BetResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBetResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BetResult message, length delimited. Does not implicitly {@link msg.BetResult.verify|verify} messages.
         * @param message BetResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBetResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BetResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.BetResult;

        /**
         * Decodes a BetResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BetResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.BetResult;

        /**
         * Verifies a BetResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BetResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BetResult
         */
        public static fromObject(object: { [k: string]: any }): msg.BetResult;

        /**
         * Creates a plain object from a BetResult message. Also converts values to other types if specified.
         * @param message BetResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BetResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BetResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomBaseInfoUpdate. */
    interface IRoomBaseInfoUpdate {

        /** RoomBaseInfoUpdate Index */
        Index?: (number|null);

        /** RoomBaseInfoUpdate State */
        State?: (msg.EmRoomState|null);

        /** RoomBaseInfoUpdate Remaining */
        Remaining?: (number|null);

        /** RoomBaseInfoUpdate Result */
        Result?: (msg.IResRec|null);
    }

    /** Represents a RoomBaseInfoUpdate. */
    class RoomBaseInfoUpdate implements IRoomBaseInfoUpdate {

        /**
         * Constructs a new RoomBaseInfoUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRoomBaseInfoUpdate);

        /** RoomBaseInfoUpdate Index. */
        public Index: number;

        /** RoomBaseInfoUpdate State. */
        public State: msg.EmRoomState;

        /** RoomBaseInfoUpdate Remaining. */
        public Remaining: number;

        /** RoomBaseInfoUpdate Result. */
        public Result?: (msg.IResRec|null);

        /**
         * Creates a new RoomBaseInfoUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomBaseInfoUpdate instance
         */
        public static create(properties?: msg.IRoomBaseInfoUpdate): msg.RoomBaseInfoUpdate;

        /**
         * Encodes the specified RoomBaseInfoUpdate message. Does not implicitly {@link msg.RoomBaseInfoUpdate.verify|verify} messages.
         * @param message RoomBaseInfoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRoomBaseInfoUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomBaseInfoUpdate message, length delimited. Does not implicitly {@link msg.RoomBaseInfoUpdate.verify|verify} messages.
         * @param message RoomBaseInfoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRoomBaseInfoUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomBaseInfoUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomBaseInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.RoomBaseInfoUpdate;

        /**
         * Decodes a RoomBaseInfoUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomBaseInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.RoomBaseInfoUpdate;

        /**
         * Verifies a RoomBaseInfoUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomBaseInfoUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomBaseInfoUpdate
         */
        public static fromObject(object: { [k: string]: any }): msg.RoomBaseInfoUpdate;

        /**
         * Creates a plain object from a RoomBaseInfoUpdate message. Also converts values to other types if specified.
         * @param message RoomBaseInfoUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RoomBaseInfoUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomBaseInfoUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameStateQuery. */
    interface IGameStateQuery {
    }

    /** Represents a GameStateQuery. */
    class GameStateQuery implements IGameStateQuery {

        /**
         * Constructs a new GameStateQuery.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGameStateQuery);

        /**
         * Creates a new GameStateQuery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStateQuery instance
         */
        public static create(properties?: msg.IGameStateQuery): msg.GameStateQuery;

        /**
         * Encodes the specified GameStateQuery message. Does not implicitly {@link msg.GameStateQuery.verify|verify} messages.
         * @param message GameStateQuery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGameStateQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStateQuery message, length delimited. Does not implicitly {@link msg.GameStateQuery.verify|verify} messages.
         * @param message GameStateQuery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGameStateQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStateQuery message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStateQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.GameStateQuery;

        /**
         * Decodes a GameStateQuery message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStateQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.GameStateQuery;

        /**
         * Verifies a GameStateQuery message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStateQuery message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStateQuery
         */
        public static fromObject(object: { [k: string]: any }): msg.GameStateQuery;

        /**
         * Creates a plain object from a GameStateQuery message. Also converts values to other types if specified.
         * @param message GameStateQuery
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GameStateQuery, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStateQuery to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerRoomState. */
    interface IPlayerRoomState {

        /** PlayerRoomState InRoom */
        InRoom?: (boolean|null);

        /** PlayerRoomState RoomIndex */
        RoomIndex?: (number|null);
    }

    /** Represents a PlayerRoomState. */
    class PlayerRoomState implements IPlayerRoomState {

        /**
         * Constructs a new PlayerRoomState.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPlayerRoomState);

        /** PlayerRoomState InRoom. */
        public InRoom: boolean;

        /** PlayerRoomState RoomIndex. */
        public RoomIndex: number;

        /**
         * Creates a new PlayerRoomState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerRoomState instance
         */
        public static create(properties?: msg.IPlayerRoomState): msg.PlayerRoomState;

        /**
         * Encodes the specified PlayerRoomState message. Does not implicitly {@link msg.PlayerRoomState.verify|verify} messages.
         * @param message PlayerRoomState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPlayerRoomState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerRoomState message, length delimited. Does not implicitly {@link msg.PlayerRoomState.verify|verify} messages.
         * @param message PlayerRoomState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPlayerRoomState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerRoomState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerRoomState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.PlayerRoomState;

        /**
         * Decodes a PlayerRoomState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerRoomState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.PlayerRoomState;

        /**
         * Verifies a PlayerRoomState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerRoomState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerRoomState
         */
        public static fromObject(object: { [k: string]: any }): msg.PlayerRoomState;

        /**
         * Creates a plain object from a PlayerRoomState message. Also converts values to other types if specified.
         * @param message PlayerRoomState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PlayerRoomState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerRoomState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** EmUniMessageType enum. */
    enum EmUniMessageType {
        emUMT_Unknown = 0,
        emUMT_LoginAgain = 1,
        emUMT_BeenKicked = 2
    }

    /** Properties of an UniMessage. */
    interface IUniMessage {

        /** UniMessage Code */
        Code?: (msg.EmUniMessageType|null);

        /** UniMessage Message */
        Message?: (string|null);
    }

    /** Represents an UniMessage. */
    class UniMessage implements IUniMessage {

        /**
         * Constructs a new UniMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUniMessage);

        /** UniMessage Code. */
        public Code: msg.EmUniMessageType;

        /** UniMessage Message. */
        public Message: string;

        /**
         * Creates a new UniMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UniMessage instance
         */
        public static create(properties?: msg.IUniMessage): msg.UniMessage;

        /**
         * Encodes the specified UniMessage message. Does not implicitly {@link msg.UniMessage.verify|verify} messages.
         * @param message UniMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUniMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UniMessage message, length delimited. Does not implicitly {@link msg.UniMessage.verify|verify} messages.
         * @param message UniMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUniMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UniMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UniMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg.UniMessage;

        /**
         * Decodes an UniMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UniMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg.UniMessage;

        /**
         * Verifies an UniMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UniMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UniMessage
         */
        public static fromObject(object: { [k: string]: any }): msg.UniMessage;

        /**
         * Creates a plain object from an UniMessage message. Also converts values to other types if specified.
         * @param message UniMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UniMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UniMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
