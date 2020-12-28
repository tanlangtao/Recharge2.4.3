/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs-ebg");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.msg = (function() {

    /**
     * Namespace msg.
     * @exports msg
     * @namespace
     */
    var msg = {};

    msg.Login = (function() {
        
        /**
         * Properties of a Login.
         * @memberof msg
         * @interface ILogin
         * @property {string|null} [token] Login token
         * @property {string|null} [UserId] Login UserId
         * @property {string|null} [Password] Login Password
         * @property {boolean|null} [reconnect] Login reconnect
         */

        /**
         * Constructs a new Login.
         * @memberof msg
         * @classdesc Represents a Login.
         * @implements ILogin
         * @constructor
         * @param {msg.ILogin=} [properties] Properties to set
         */
        function Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login token.
         * @member {string} token
         * @memberof msg.Login
         * @instance
         */
        Login.prototype.token = "";

        /**
         * Login UserId.
         * @member {string} UserId
         * @memberof msg.Login
         * @instance
         */
        Login.prototype.UserId = "";

        /**
         * Login Password.
         * @member {string} Password
         * @memberof msg.Login
         * @instance
         */
        Login.prototype.Password = "";

        /**
         * Login reconnect.
         * @member {boolean} reconnect
         * @memberof msg.Login
         * @instance
         */
        Login.prototype.reconnect = false;

        /**
         * Creates a new Login instance using the specified properties.
         * @function create
         * @memberof msg.Login
         * @static
         * @param {msg.ILogin=} [properties] Properties to set
         * @returns {msg.Login} Login instance
         */
        Login.create = function create(properties) {
            return new Login(properties);
        };

        /**
         * Encodes the specified Login message. Does not implicitly {@link msg.Login.verify|verify} messages.
         * @function encode
         * @memberof msg.Login
         * @static
         * @param {msg.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            if (message.UserId != null && Object.hasOwnProperty.call(message, "UserId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.UserId);
            if (message.Password != null && Object.hasOwnProperty.call(message, "Password"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.Password);
            if (message.reconnect != null && Object.hasOwnProperty.call(message, "reconnect"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.reconnect);
            return writer;
        };

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link msg.Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Login
         * @static
         * @param {msg.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.UserId = reader.string();
                    break;
                case 3:
                    message.Password = reader.string();
                    break;
                case 4:
                    message.reconnect = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login message.
         * @function verify
         * @memberof msg.Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.UserId != null && message.hasOwnProperty("UserId"))
                if (!$util.isString(message.UserId))
                    return "UserId: string expected";
            if (message.Password != null && message.hasOwnProperty("Password"))
                if (!$util.isString(message.Password))
                    return "Password: string expected";
            if (message.reconnect != null && message.hasOwnProperty("reconnect"))
                if (typeof message.reconnect !== "boolean")
                    return "reconnect: boolean expected";
            return null;
        };

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Login} Login
         */
        Login.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Login)
                return object;
            var message = new $root.msg.Login();
            if (object.token != null)
                message.token = String(object.token);
            if (object.UserId != null)
                message.UserId = String(object.UserId);
            if (object.Password != null)
                message.Password = String(object.Password);
            if (object.reconnect != null)
                message.reconnect = Boolean(object.reconnect);
            return message;
        };

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Login
         * @static
         * @param {msg.Login} message Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.token = "";
                object.UserId = "";
                object.Password = "";
                object.reconnect = false;
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.UserId != null && message.hasOwnProperty("UserId"))
                object.UserId = message.UserId;
            if (message.Password != null && message.hasOwnProperty("Password"))
                object.Password = message.Password;
            if (message.reconnect != null && message.hasOwnProperty("reconnect"))
                object.reconnect = message.reconnect;
            return object;
        };

        /**
         * Converts this Login to JSON.
         * @function toJSON
         * @memberof msg.Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login;
    })();

    msg.LoginRsp = (function() {

        /**
         * Properties of a LoginRsp.
         * @memberof msg
         * @interface ILoginRsp
         * @property {string|null} [UserId] LoginRsp UserId
         * @property {number|null} [score] LoginRsp score
         * @property {string|null} [nick] LoginRsp nick
         * @property {string|null} [headimg] LoginRsp headimg
         * @property {string|null} [error] LoginRsp error
         */

        /**
         * Constructs a new LoginRsp.
         * @memberof msg
         * @classdesc Represents a LoginRsp.
         * @implements ILoginRsp
         * @constructor
         * @param {msg.ILoginRsp=} [properties] Properties to set
         */
        function LoginRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRsp UserId.
         * @member {string} UserId
         * @memberof msg.LoginRsp
         * @instance
         */
        LoginRsp.prototype.UserId = "";

        /**
         * LoginRsp score.
         * @member {number} score
         * @memberof msg.LoginRsp
         * @instance
         */
        LoginRsp.prototype.score = 0;

        /**
         * LoginRsp nick.
         * @member {string} nick
         * @memberof msg.LoginRsp
         * @instance
         */
        LoginRsp.prototype.nick = "";

        /**
         * LoginRsp headimg.
         * @member {string} headimg
         * @memberof msg.LoginRsp
         * @instance
         */
        LoginRsp.prototype.headimg = "";

        /**
         * LoginRsp error.
         * @member {string} error
         * @memberof msg.LoginRsp
         * @instance
         */
        LoginRsp.prototype.error = "";

        /**
         * Creates a new LoginRsp instance using the specified properties.
         * @function create
         * @memberof msg.LoginRsp
         * @static
         * @param {msg.ILoginRsp=} [properties] Properties to set
         * @returns {msg.LoginRsp} LoginRsp instance
         */
        LoginRsp.create = function create(properties) {
            return new LoginRsp(properties);
        };

        /**
         * Encodes the specified LoginRsp message. Does not implicitly {@link msg.LoginRsp.verify|verify} messages.
         * @function encode
         * @memberof msg.LoginRsp
         * @static
         * @param {msg.ILoginRsp} message LoginRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.UserId != null && Object.hasOwnProperty.call(message, "UserId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.UserId);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.score);
            if (message.nick != null && Object.hasOwnProperty.call(message, "nick"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nick);
            if (message.headimg != null && Object.hasOwnProperty.call(message, "headimg"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.headimg);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.error);
            return writer;
        };

        /**
         * Encodes the specified LoginRsp message, length delimited. Does not implicitly {@link msg.LoginRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.LoginRsp
         * @static
         * @param {msg.ILoginRsp} message LoginRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginRsp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.LoginRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.LoginRsp} LoginRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.LoginRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.UserId = reader.string();
                    break;
                case 2:
                    message.score = reader.double();
                    break;
                case 3:
                    message.nick = reader.string();
                    break;
                case 4:
                    message.headimg = reader.string();
                    break;
                case 5:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.LoginRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.LoginRsp} LoginRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginRsp message.
         * @function verify
         * @memberof msg.LoginRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.UserId != null && message.hasOwnProperty("UserId"))
                if (!$util.isString(message.UserId))
                    return "UserId: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score !== "number")
                    return "score: number expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            if (message.headimg != null && message.hasOwnProperty("headimg"))
                if (!$util.isString(message.headimg))
                    return "headimg: string expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isString(message.error))
                    return "error: string expected";
            return null;
        };

        /**
         * Creates a LoginRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.LoginRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.LoginRsp} LoginRsp
         */
        LoginRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.LoginRsp)
                return object;
            var message = new $root.msg.LoginRsp();
            if (object.UserId != null)
                message.UserId = String(object.UserId);
            if (object.score != null)
                message.score = Number(object.score);
            if (object.nick != null)
                message.nick = String(object.nick);
            if (object.headimg != null)
                message.headimg = String(object.headimg);
            if (object.error != null)
                message.error = String(object.error);
            return message;
        };

        /**
         * Creates a plain object from a LoginRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.LoginRsp
         * @static
         * @param {msg.LoginRsp} message LoginRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.UserId = "";
                object.score = 0;
                object.nick = "";
                object.headimg = "";
                object.error = "";
            }
            if (message.UserId != null && message.hasOwnProperty("UserId"))
                object.UserId = message.UserId;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            if (message.headimg != null && message.hasOwnProperty("headimg"))
                object.headimg = message.headimg;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            return object;
        };

        /**
         * Converts this LoginRsp to JSON.
         * @function toJSON
         * @memberof msg.LoginRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginRsp;
    })();

    msg.Breathe = (function() {

        /**
         * Properties of a Breathe.
         * @memberof msg
         * @interface IBreathe
         */

        /**
         * Constructs a new Breathe.
         * @memberof msg
         * @classdesc Represents a Breathe.
         * @implements IBreathe
         * @constructor
         * @param {msg.IBreathe=} [properties] Properties to set
         */
        function Breathe(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Breathe instance using the specified properties.
         * @function create
         * @memberof msg.Breathe
         * @static
         * @param {msg.IBreathe=} [properties] Properties to set
         * @returns {msg.Breathe} Breathe instance
         */
        Breathe.create = function create(properties) {
            return new Breathe(properties);
        };

        /**
         * Encodes the specified Breathe message. Does not implicitly {@link msg.Breathe.verify|verify} messages.
         * @function encode
         * @memberof msg.Breathe
         * @static
         * @param {msg.IBreathe} message Breathe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Breathe.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Breathe message, length delimited. Does not implicitly {@link msg.Breathe.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.Breathe
         * @static
         * @param {msg.IBreathe} message Breathe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Breathe.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Breathe message from the specified reader or buffer.
         * @function decode
         * @memberof msg.Breathe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.Breathe} Breathe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Breathe.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Breathe();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Breathe message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.Breathe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.Breathe} Breathe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Breathe.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Breathe message.
         * @function verify
         * @memberof msg.Breathe
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Breathe.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Breathe message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.Breathe
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.Breathe} Breathe
         */
        Breathe.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.Breathe)
                return object;
            return new $root.msg.Breathe();
        };

        /**
         * Creates a plain object from a Breathe message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.Breathe
         * @static
         * @param {msg.Breathe} message Breathe
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Breathe.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Breathe to JSON.
         * @function toJSON
         * @memberof msg.Breathe
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Breathe.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Breathe;
    })();

    msg.ServerInfo = (function() {

        /**
         * Properties of a ServerInfo.
         * @memberof msg
         * @interface IServerInfo
         * @property {string|null} [version] ServerInfo version
         */

        /**
         * Constructs a new ServerInfo.
         * @memberof msg
         * @classdesc Represents a ServerInfo.
         * @implements IServerInfo
         * @constructor
         * @param {msg.IServerInfo=} [properties] Properties to set
         */
        function ServerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerInfo version.
         * @member {string} version
         * @memberof msg.ServerInfo
         * @instance
         */
        ServerInfo.prototype.version = "";

        /**
         * Creates a new ServerInfo instance using the specified properties.
         * @function create
         * @memberof msg.ServerInfo
         * @static
         * @param {msg.IServerInfo=} [properties] Properties to set
         * @returns {msg.ServerInfo} ServerInfo instance
         */
        ServerInfo.create = function create(properties) {
            return new ServerInfo(properties);
        };

        /**
         * Encodes the specified ServerInfo message. Does not implicitly {@link msg.ServerInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.ServerInfo
         * @static
         * @param {msg.IServerInfo} message ServerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            return writer;
        };

        /**
         * Encodes the specified ServerInfo message, length delimited. Does not implicitly {@link msg.ServerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ServerInfo
         * @static
         * @param {msg.IServerInfo} message ServerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ServerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ServerInfo} ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ServerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ServerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ServerInfo} ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerInfo message.
         * @function verify
         * @memberof msg.ServerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            return null;
        };

        /**
         * Creates a ServerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ServerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ServerInfo} ServerInfo
         */
        ServerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ServerInfo)
                return object;
            var message = new $root.msg.ServerInfo();
            if (object.version != null)
                message.version = String(object.version);
            return message;
        };

        /**
         * Creates a plain object from a ServerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ServerInfo
         * @static
         * @param {msg.ServerInfo} message ServerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.version = "";
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            return object;
        };

        /**
         * Converts this ServerInfo to JSON.
         * @function toJSON
         * @memberof msg.ServerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ServerInfo;
    })();

    /**
     * EmRoomState enum.
     * @name msg.EmRoomState
     * @enum {number}
     * @property {number} emRS_None=0 emRS_None value
     * @property {number} emRS_Bet=1 emRS_Bet value
     * @property {number} emRS_Settlement=2 emRS_Settlement value
     */
    msg.EmRoomState = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "emRS_None"] = 0;
        values[valuesById[1] = "emRS_Bet"] = 1;
        values[valuesById[2] = "emRS_Settlement"] = 2;
        return values;
    })();

    /**
     * EmBetArea enum.
     * @name msg.EmBetArea
     * @enum {number}
     * @property {number} emBA_Zhuang=0 emBA_Zhuang value
     * @property {number} emBA_Shun=1 emBA_Shun value
     * @property {number} emBA_Tian=2 emBA_Tian value
     * @property {number} emBA_Di=3 emBA_Di value
     */
    msg.EmBetArea = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "emBA_Zhuang"] = 0;
        values[valuesById[1] = "emBA_Shun"] = 1;
        values[valuesById[2] = "emBA_Tian"] = 2;
        values[valuesById[3] = "emBA_Di"] = 3;
        return values;
    })();

    msg.ResRec = (function() {

        /**
         * Properties of a ResRec.
         * @memberof msg
         * @interface IResRec
         * @property {number|null} [Shun] ResRec Shun
         * @property {number|null} [Tian] ResRec Tian
         * @property {number|null} [Di] ResRec Di
         */

        /**
         * Constructs a new ResRec.
         * @memberof msg
         * @classdesc Represents a ResRec.
         * @implements IResRec
         * @constructor
         * @param {msg.IResRec=} [properties] Properties to set
         */
        function ResRec(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResRec Shun.
         * @member {number} Shun
         * @memberof msg.ResRec
         * @instance
         */
        ResRec.prototype.Shun = 0;

        /**
         * ResRec Tian.
         * @member {number} Tian
         * @memberof msg.ResRec
         * @instance
         */
        ResRec.prototype.Tian = 0;

        /**
         * ResRec Di.
         * @member {number} Di
         * @memberof msg.ResRec
         * @instance
         */
        ResRec.prototype.Di = 0;

        /**
         * Creates a new ResRec instance using the specified properties.
         * @function create
         * @memberof msg.ResRec
         * @static
         * @param {msg.IResRec=} [properties] Properties to set
         * @returns {msg.ResRec} ResRec instance
         */
        ResRec.create = function create(properties) {
            return new ResRec(properties);
        };

        /**
         * Encodes the specified ResRec message. Does not implicitly {@link msg.ResRec.verify|verify} messages.
         * @function encode
         * @memberof msg.ResRec
         * @static
         * @param {msg.IResRec} message ResRec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResRec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Shun != null && Object.hasOwnProperty.call(message, "Shun"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Shun);
            if (message.Tian != null && Object.hasOwnProperty.call(message, "Tian"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Tian);
            if (message.Di != null && Object.hasOwnProperty.call(message, "Di"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Di);
            return writer;
        };

        /**
         * Encodes the specified ResRec message, length delimited. Does not implicitly {@link msg.ResRec.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ResRec
         * @static
         * @param {msg.IResRec} message ResRec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResRec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResRec message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ResRec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ResRec} ResRec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResRec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ResRec();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Shun = reader.int32();
                    break;
                case 2:
                    message.Tian = reader.int32();
                    break;
                case 3:
                    message.Di = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResRec message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ResRec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ResRec} ResRec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResRec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResRec message.
         * @function verify
         * @memberof msg.ResRec
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResRec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Shun != null && message.hasOwnProperty("Shun"))
                if (!$util.isInteger(message.Shun))
                    return "Shun: integer expected";
            if (message.Tian != null && message.hasOwnProperty("Tian"))
                if (!$util.isInteger(message.Tian))
                    return "Tian: integer expected";
            if (message.Di != null && message.hasOwnProperty("Di"))
                if (!$util.isInteger(message.Di))
                    return "Di: integer expected";
            return null;
        };

        /**
         * Creates a ResRec message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ResRec
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ResRec} ResRec
         */
        ResRec.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ResRec)
                return object;
            var message = new $root.msg.ResRec();
            if (object.Shun != null)
                message.Shun = object.Shun | 0;
            if (object.Tian != null)
                message.Tian = object.Tian | 0;
            if (object.Di != null)
                message.Di = object.Di | 0;
            return message;
        };

        /**
         * Creates a plain object from a ResRec message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ResRec
         * @static
         * @param {msg.ResRec} message ResRec
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResRec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Shun = 0;
                object.Tian = 0;
                object.Di = 0;
            }
            if (message.Shun != null && message.hasOwnProperty("Shun"))
                object.Shun = message.Shun;
            if (message.Tian != null && message.hasOwnProperty("Tian"))
                object.Tian = message.Tian;
            if (message.Di != null && message.hasOwnProperty("Di"))
                object.Di = message.Di;
            return object;
        };

        /**
         * Converts this ResRec to JSON.
         * @function toJSON
         * @memberof msg.ResRec
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResRec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResRec;
    })();

    msg.BaseRoomInfo = (function() {

        /**
         * Properties of a BaseRoomInfo.
         * @memberof msg
         * @interface IBaseRoomInfo
         * @property {number|null} [Index] BaseRoomInfo Index
         * @property {msg.EmRoomState|null} [State] BaseRoomInfo State
         * @property {number|null} [Remaining] BaseRoomInfo Remaining
         * @property {Array.<msg.IResRec>|null} [rrlist] BaseRoomInfo rrlist
         */

        /**
         * Constructs a new BaseRoomInfo.
         * @memberof msg
         * @classdesc Represents a BaseRoomInfo.
         * @implements IBaseRoomInfo
         * @constructor
         * @param {msg.IBaseRoomInfo=} [properties] Properties to set
         */
        function BaseRoomInfo(properties) {
            this.rrlist = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BaseRoomInfo Index.
         * @member {number} Index
         * @memberof msg.BaseRoomInfo
         * @instance
         */
        BaseRoomInfo.prototype.Index = 0;

        /**
         * BaseRoomInfo State.
         * @member {msg.EmRoomState} State
         * @memberof msg.BaseRoomInfo
         * @instance
         */
        BaseRoomInfo.prototype.State = 0;

        /**
         * BaseRoomInfo Remaining.
         * @member {number} Remaining
         * @memberof msg.BaseRoomInfo
         * @instance
         */
        BaseRoomInfo.prototype.Remaining = 0;

        /**
         * BaseRoomInfo rrlist.
         * @member {Array.<msg.IResRec>} rrlist
         * @memberof msg.BaseRoomInfo
         * @instance
         */
        BaseRoomInfo.prototype.rrlist = $util.emptyArray;

        /**
         * Creates a new BaseRoomInfo instance using the specified properties.
         * @function create
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {msg.IBaseRoomInfo=} [properties] Properties to set
         * @returns {msg.BaseRoomInfo} BaseRoomInfo instance
         */
        BaseRoomInfo.create = function create(properties) {
            return new BaseRoomInfo(properties);
        };

        /**
         * Encodes the specified BaseRoomInfo message. Does not implicitly {@link msg.BaseRoomInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {msg.IBaseRoomInfo} message BaseRoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseRoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Index != null && Object.hasOwnProperty.call(message, "Index"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Index);
            if (message.State != null && Object.hasOwnProperty.call(message, "State"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.State);
            if (message.Remaining != null && Object.hasOwnProperty.call(message, "Remaining"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.Remaining);
            if (message.rrlist != null && message.rrlist.length)
                for (var i = 0; i < message.rrlist.length; ++i)
                    $root.msg.ResRec.encode(message.rrlist[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BaseRoomInfo message, length delimited. Does not implicitly {@link msg.BaseRoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {msg.IBaseRoomInfo} message BaseRoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseRoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BaseRoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BaseRoomInfo} BaseRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseRoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BaseRoomInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Index = reader.uint32();
                    break;
                case 2:
                    message.State = reader.int32();
                    break;
                case 3:
                    message.Remaining = reader.uint32();
                    break;
                case 4:
                    if (!(message.rrlist && message.rrlist.length))
                        message.rrlist = [];
                    message.rrlist.push($root.msg.ResRec.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BaseRoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BaseRoomInfo} BaseRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseRoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BaseRoomInfo message.
         * @function verify
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BaseRoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Index != null && message.hasOwnProperty("Index"))
                if (!$util.isInteger(message.Index))
                    return "Index: integer expected";
            if (message.State != null && message.hasOwnProperty("State"))
                switch (message.State) {
                default:
                    return "State: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                if (!$util.isInteger(message.Remaining))
                    return "Remaining: integer expected";
            if (message.rrlist != null && message.hasOwnProperty("rrlist")) {
                if (!Array.isArray(message.rrlist))
                    return "rrlist: array expected";
                for (var i = 0; i < message.rrlist.length; ++i) {
                    var error = $root.msg.ResRec.verify(message.rrlist[i]);
                    if (error)
                        return "rrlist." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BaseRoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BaseRoomInfo} BaseRoomInfo
         */
        BaseRoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BaseRoomInfo)
                return object;
            var message = new $root.msg.BaseRoomInfo();
            if (object.Index != null)
                message.Index = object.Index >>> 0;
            switch (object.State) {
            case "emRS_None":
            case 0:
                message.State = 0;
                break;
            case "emRS_Bet":
            case 1:
                message.State = 1;
                break;
            case "emRS_Settlement":
            case 2:
                message.State = 2;
                break;
            }
            if (object.Remaining != null)
                message.Remaining = object.Remaining >>> 0;
            if (object.rrlist) {
                if (!Array.isArray(object.rrlist))
                    throw TypeError(".msg.BaseRoomInfo.rrlist: array expected");
                message.rrlist = [];
                for (var i = 0; i < object.rrlist.length; ++i) {
                    if (typeof object.rrlist[i] !== "object")
                        throw TypeError(".msg.BaseRoomInfo.rrlist: object expected");
                    message.rrlist[i] = $root.msg.ResRec.fromObject(object.rrlist[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BaseRoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BaseRoomInfo
         * @static
         * @param {msg.BaseRoomInfo} message BaseRoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BaseRoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.rrlist = [];
            if (options.defaults) {
                object.Index = 0;
                object.State = options.enums === String ? "emRS_None" : 0;
                object.Remaining = 0;
            }
            if (message.Index != null && message.hasOwnProperty("Index"))
                object.Index = message.Index;
            if (message.State != null && message.hasOwnProperty("State"))
                object.State = options.enums === String ? $root.msg.EmRoomState[message.State] : message.State;
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                object.Remaining = message.Remaining;
            if (message.rrlist && message.rrlist.length) {
                object.rrlist = [];
                for (var j = 0; j < message.rrlist.length; ++j)
                    object.rrlist[j] = $root.msg.ResRec.toObject(message.rrlist[j], options);
            }
            return object;
        };

        /**
         * Converts this BaseRoomInfo to JSON.
         * @function toJSON
         * @memberof msg.BaseRoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BaseRoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BaseRoomInfo;
    })();

    msg.RoomList = (function() {

        /**
         * Properties of a RoomList.
         * @memberof msg
         * @interface IRoomList
         * @property {Array.<msg.IBaseRoomInfo>|null} [roomlist] RoomList roomlist
         */

        /**
         * Constructs a new RoomList.
         * @memberof msg
         * @classdesc Represents a RoomList.
         * @implements IRoomList
         * @constructor
         * @param {msg.IRoomList=} [properties] Properties to set
         */
        function RoomList(properties) {
            this.roomlist = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomList roomlist.
         * @member {Array.<msg.IBaseRoomInfo>} roomlist
         * @memberof msg.RoomList
         * @instance
         */
        RoomList.prototype.roomlist = $util.emptyArray;

        /**
         * Creates a new RoomList instance using the specified properties.
         * @function create
         * @memberof msg.RoomList
         * @static
         * @param {msg.IRoomList=} [properties] Properties to set
         * @returns {msg.RoomList} RoomList instance
         */
        RoomList.create = function create(properties) {
            return new RoomList(properties);
        };

        /**
         * Encodes the specified RoomList message. Does not implicitly {@link msg.RoomList.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomList
         * @static
         * @param {msg.IRoomList} message RoomList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomlist != null && message.roomlist.length)
                for (var i = 0; i < message.roomlist.length; ++i)
                    $root.msg.BaseRoomInfo.encode(message.roomlist[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomList message, length delimited. Does not implicitly {@link msg.RoomList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomList
         * @static
         * @param {msg.IRoomList} message RoomList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomList message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomList} RoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.roomlist && message.roomlist.length))
                        message.roomlist = [];
                    message.roomlist.push($root.msg.BaseRoomInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomList} RoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomList message.
         * @function verify
         * @memberof msg.RoomList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomlist != null && message.hasOwnProperty("roomlist")) {
                if (!Array.isArray(message.roomlist))
                    return "roomlist: array expected";
                for (var i = 0; i < message.roomlist.length; ++i) {
                    var error = $root.msg.BaseRoomInfo.verify(message.roomlist[i]);
                    if (error)
                        return "roomlist." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RoomList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomList} RoomList
         */
        RoomList.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomList)
                return object;
            var message = new $root.msg.RoomList();
            if (object.roomlist) {
                if (!Array.isArray(object.roomlist))
                    throw TypeError(".msg.RoomList.roomlist: array expected");
                message.roomlist = [];
                for (var i = 0; i < object.roomlist.length; ++i) {
                    if (typeof object.roomlist[i] !== "object")
                        throw TypeError(".msg.RoomList.roomlist: object expected");
                    message.roomlist[i] = $root.msg.BaseRoomInfo.fromObject(object.roomlist[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomList
         * @static
         * @param {msg.RoomList} message RoomList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.roomlist = [];
            if (message.roomlist && message.roomlist.length) {
                object.roomlist = [];
                for (var j = 0; j < message.roomlist.length; ++j)
                    object.roomlist[j] = $root.msg.BaseRoomInfo.toObject(message.roomlist[j], options);
            }
            return object;
        };

        /**
         * Converts this RoomList to JSON.
         * @function toJSON
         * @memberof msg.RoomList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomList;
    })();

    msg.EnterRoomReq = (function() {

        /**
         * Properties of an EnterRoomReq.
         * @memberof msg
         * @interface IEnterRoomReq
         * @property {number|null} [Index] EnterRoomReq Index
         */

        /**
         * Constructs a new EnterRoomReq.
         * @memberof msg
         * @classdesc Represents an EnterRoomReq.
         * @implements IEnterRoomReq
         * @constructor
         * @param {msg.IEnterRoomReq=} [properties] Properties to set
         */
        function EnterRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterRoomReq Index.
         * @member {number} Index
         * @memberof msg.EnterRoomReq
         * @instance
         */
        EnterRoomReq.prototype.Index = 0;

        /**
         * Creates a new EnterRoomReq instance using the specified properties.
         * @function create
         * @memberof msg.EnterRoomReq
         * @static
         * @param {msg.IEnterRoomReq=} [properties] Properties to set
         * @returns {msg.EnterRoomReq} EnterRoomReq instance
         */
        EnterRoomReq.create = function create(properties) {
            return new EnterRoomReq(properties);
        };

        /**
         * Encodes the specified EnterRoomReq message. Does not implicitly {@link msg.EnterRoomReq.verify|verify} messages.
         * @function encode
         * @memberof msg.EnterRoomReq
         * @static
         * @param {msg.IEnterRoomReq} message EnterRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Index != null && Object.hasOwnProperty.call(message, "Index"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Index);
            return writer;
        };

        /**
         * Encodes the specified EnterRoomReq message, length delimited. Does not implicitly {@link msg.EnterRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.EnterRoomReq
         * @static
         * @param {msg.IEnterRoomReq} message EnterRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.EnterRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.EnterRoomReq} EnterRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.EnterRoomReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Index = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.EnterRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.EnterRoomReq} EnterRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterRoomReq message.
         * @function verify
         * @memberof msg.EnterRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Index != null && message.hasOwnProperty("Index"))
                if (!$util.isInteger(message.Index))
                    return "Index: integer expected";
            return null;
        };

        /**
         * Creates an EnterRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.EnterRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.EnterRoomReq} EnterRoomReq
         */
        EnterRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.EnterRoomReq)
                return object;
            var message = new $root.msg.EnterRoomReq();
            if (object.Index != null)
                message.Index = object.Index >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an EnterRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.EnterRoomReq
         * @static
         * @param {msg.EnterRoomReq} message EnterRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterRoomReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Index = 0;
            if (message.Index != null && message.hasOwnProperty("Index"))
                object.Index = message.Index;
            return object;
        };

        /**
         * Converts this EnterRoomReq to JSON.
         * @function toJSON
         * @memberof msg.EnterRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterRoomReq;
    })();

    msg.CardInfo = (function() {

        /**
         * Properties of a CardInfo.
         * @memberof msg
         * @interface ICardInfo
         * @property {number|null} [Card1] CardInfo Card1
         * @property {number|null} [Card2] CardInfo Card2
         */

        /**
         * Constructs a new CardInfo.
         * @memberof msg
         * @classdesc Represents a CardInfo.
         * @implements ICardInfo
         * @constructor
         * @param {msg.ICardInfo=} [properties] Properties to set
         */
        function CardInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CardInfo Card1.
         * @member {number} Card1
         * @memberof msg.CardInfo
         * @instance
         */
        CardInfo.prototype.Card1 = 0;

        /**
         * CardInfo Card2.
         * @member {number} Card2
         * @memberof msg.CardInfo
         * @instance
         */
        CardInfo.prototype.Card2 = 0;

        /**
         * Creates a new CardInfo instance using the specified properties.
         * @function create
         * @memberof msg.CardInfo
         * @static
         * @param {msg.ICardInfo=} [properties] Properties to set
         * @returns {msg.CardInfo} CardInfo instance
         */
        CardInfo.create = function create(properties) {
            return new CardInfo(properties);
        };

        /**
         * Encodes the specified CardInfo message. Does not implicitly {@link msg.CardInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.CardInfo
         * @static
         * @param {msg.ICardInfo} message CardInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CardInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Card1 != null && Object.hasOwnProperty.call(message, "Card1"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.Card1);
            if (message.Card2 != null && Object.hasOwnProperty.call(message, "Card2"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.Card2);
            return writer;
        };

        /**
         * Encodes the specified CardInfo message, length delimited. Does not implicitly {@link msg.CardInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.CardInfo
         * @static
         * @param {msg.ICardInfo} message CardInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CardInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CardInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.CardInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.CardInfo} CardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CardInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.CardInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.Card1 = reader.uint32();
                    break;
                case 3:
                    message.Card2 = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CardInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.CardInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.CardInfo} CardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CardInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CardInfo message.
         * @function verify
         * @memberof msg.CardInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CardInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Card1 != null && message.hasOwnProperty("Card1"))
                if (!$util.isInteger(message.Card1))
                    return "Card1: integer expected";
            if (message.Card2 != null && message.hasOwnProperty("Card2"))
                if (!$util.isInteger(message.Card2))
                    return "Card2: integer expected";
            return null;
        };

        /**
         * Creates a CardInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.CardInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.CardInfo} CardInfo
         */
        CardInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.CardInfo)
                return object;
            var message = new $root.msg.CardInfo();
            if (object.Card1 != null)
                message.Card1 = object.Card1 >>> 0;
            if (object.Card2 != null)
                message.Card2 = object.Card2 >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a CardInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.CardInfo
         * @static
         * @param {msg.CardInfo} message CardInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CardInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Card1 = 0;
                object.Card2 = 0;
            }
            if (message.Card1 != null && message.hasOwnProperty("Card1"))
                object.Card1 = message.Card1;
            if (message.Card2 != null && message.hasOwnProperty("Card2"))
                object.Card2 = message.Card2;
            return object;
        };

        /**
         * Converts this CardInfo to JSON.
         * @function toJSON
         * @memberof msg.CardInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CardInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CardInfo;
    })();

    msg.TableCards = (function() {

        /**
         * Properties of a TableCards.
         * @memberof msg
         * @interface ITableCards
         * @property {msg.ICardInfo|null} [shun] TableCards shun
         * @property {msg.ICardInfo|null} [tian] TableCards tian
         * @property {msg.ICardInfo|null} [di] TableCards di
         * @property {msg.ICardInfo|null} [zhuang] TableCards zhuang
         */

        /**
         * Constructs a new TableCards.
         * @memberof msg
         * @classdesc Represents a TableCards.
         * @implements ITableCards
         * @constructor
         * @param {msg.ITableCards=} [properties] Properties to set
         */
        function TableCards(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TableCards shun.
         * @member {msg.ICardInfo|null|undefined} shun
         * @memberof msg.TableCards
         * @instance
         */
        TableCards.prototype.shun = null;

        /**
         * TableCards tian.
         * @member {msg.ICardInfo|null|undefined} tian
         * @memberof msg.TableCards
         * @instance
         */
        TableCards.prototype.tian = null;

        /**
         * TableCards di.
         * @member {msg.ICardInfo|null|undefined} di
         * @memberof msg.TableCards
         * @instance
         */
        TableCards.prototype.di = null;

        /**
         * TableCards zhuang.
         * @member {msg.ICardInfo|null|undefined} zhuang
         * @memberof msg.TableCards
         * @instance
         */
        TableCards.prototype.zhuang = null;

        /**
         * Creates a new TableCards instance using the specified properties.
         * @function create
         * @memberof msg.TableCards
         * @static
         * @param {msg.ITableCards=} [properties] Properties to set
         * @returns {msg.TableCards} TableCards instance
         */
        TableCards.create = function create(properties) {
            return new TableCards(properties);
        };

        /**
         * Encodes the specified TableCards message. Does not implicitly {@link msg.TableCards.verify|verify} messages.
         * @function encode
         * @memberof msg.TableCards
         * @static
         * @param {msg.ITableCards} message TableCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableCards.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shun != null && Object.hasOwnProperty.call(message, "shun"))
                $root.msg.CardInfo.encode(message.shun, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.tian != null && Object.hasOwnProperty.call(message, "tian"))
                $root.msg.CardInfo.encode(message.tian, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.di != null && Object.hasOwnProperty.call(message, "di"))
                $root.msg.CardInfo.encode(message.di, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.zhuang != null && Object.hasOwnProperty.call(message, "zhuang"))
                $root.msg.CardInfo.encode(message.zhuang, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TableCards message, length delimited. Does not implicitly {@link msg.TableCards.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.TableCards
         * @static
         * @param {msg.ITableCards} message TableCards message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TableCards.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TableCards message from the specified reader or buffer.
         * @function decode
         * @memberof msg.TableCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.TableCards} TableCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableCards.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.TableCards();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.shun = $root.msg.CardInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.tian = $root.msg.CardInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.di = $root.msg.CardInfo.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.zhuang = $root.msg.CardInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TableCards message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.TableCards
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.TableCards} TableCards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TableCards.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TableCards message.
         * @function verify
         * @memberof msg.TableCards
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TableCards.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.shun != null && message.hasOwnProperty("shun")) {
                var error = $root.msg.CardInfo.verify(message.shun);
                if (error)
                    return "shun." + error;
            }
            if (message.tian != null && message.hasOwnProperty("tian")) {
                var error = $root.msg.CardInfo.verify(message.tian);
                if (error)
                    return "tian." + error;
            }
            if (message.di != null && message.hasOwnProperty("di")) {
                var error = $root.msg.CardInfo.verify(message.di);
                if (error)
                    return "di." + error;
            }
            if (message.zhuang != null && message.hasOwnProperty("zhuang")) {
                var error = $root.msg.CardInfo.verify(message.zhuang);
                if (error)
                    return "zhuang." + error;
            }
            return null;
        };

        /**
         * Creates a TableCards message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.TableCards
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.TableCards} TableCards
         */
        TableCards.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.TableCards)
                return object;
            var message = new $root.msg.TableCards();
            if (object.shun != null) {
                if (typeof object.shun !== "object")
                    throw TypeError(".msg.TableCards.shun: object expected");
                message.shun = $root.msg.CardInfo.fromObject(object.shun);
            }
            if (object.tian != null) {
                if (typeof object.tian !== "object")
                    throw TypeError(".msg.TableCards.tian: object expected");
                message.tian = $root.msg.CardInfo.fromObject(object.tian);
            }
            if (object.di != null) {
                if (typeof object.di !== "object")
                    throw TypeError(".msg.TableCards.di: object expected");
                message.di = $root.msg.CardInfo.fromObject(object.di);
            }
            if (object.zhuang != null) {
                if (typeof object.zhuang !== "object")
                    throw TypeError(".msg.TableCards.zhuang: object expected");
                message.zhuang = $root.msg.CardInfo.fromObject(object.zhuang);
            }
            return message;
        };

        /**
         * Creates a plain object from a TableCards message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.TableCards
         * @static
         * @param {msg.TableCards} message TableCards
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TableCards.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.shun = null;
                object.tian = null;
                object.di = null;
                object.zhuang = null;
            }
            if (message.shun != null && message.hasOwnProperty("shun"))
                object.shun = $root.msg.CardInfo.toObject(message.shun, options);
            if (message.tian != null && message.hasOwnProperty("tian"))
                object.tian = $root.msg.CardInfo.toObject(message.tian, options);
            if (message.di != null && message.hasOwnProperty("di"))
                object.di = $root.msg.CardInfo.toObject(message.di, options);
            if (message.zhuang != null && message.hasOwnProperty("zhuang"))
                object.zhuang = $root.msg.CardInfo.toObject(message.zhuang, options);
            return object;
        };

        /**
         * Converts this TableCards to JSON.
         * @function toJSON
         * @memberof msg.TableCards
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TableCards.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TableCards;
    })();

    msg.BetInfo = (function() {

        /**
         * Properties of a BetInfo.
         * @memberof msg
         * @interface IBetInfo
         * @property {msg.EmBetArea|null} [area] BetInfo area
         * @property {number|null} [betnum] BetInfo betnum
         */

        /**
         * Constructs a new BetInfo.
         * @memberof msg
         * @classdesc Represents a BetInfo.
         * @implements IBetInfo
         * @constructor
         * @param {msg.IBetInfo=} [properties] Properties to set
         */
        function BetInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetInfo area.
         * @member {msg.EmBetArea} area
         * @memberof msg.BetInfo
         * @instance
         */
        BetInfo.prototype.area = 0;

        /**
         * BetInfo betnum.
         * @member {number} betnum
         * @memberof msg.BetInfo
         * @instance
         */
        BetInfo.prototype.betnum = 0;

        /**
         * Creates a new BetInfo instance using the specified properties.
         * @function create
         * @memberof msg.BetInfo
         * @static
         * @param {msg.IBetInfo=} [properties] Properties to set
         * @returns {msg.BetInfo} BetInfo instance
         */
        BetInfo.create = function create(properties) {
            return new BetInfo(properties);
        };

        /**
         * Encodes the specified BetInfo message. Does not implicitly {@link msg.BetInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.BetInfo
         * @static
         * @param {msg.IBetInfo} message BetInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.area != null && Object.hasOwnProperty.call(message, "area"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.area);
            if (message.betnum != null && Object.hasOwnProperty.call(message, "betnum"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.betnum);
            return writer;
        };

        /**
         * Encodes the specified BetInfo message, length delimited. Does not implicitly {@link msg.BetInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BetInfo
         * @static
         * @param {msg.IBetInfo} message BetInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BetInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BetInfo} BetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.area = reader.int32();
                    break;
                case 2:
                    message.betnum = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BetInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BetInfo} BetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetInfo message.
         * @function verify
         * @memberof msg.BetInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.area != null && message.hasOwnProperty("area"))
                switch (message.area) {
                default:
                    return "area: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.betnum != null && message.hasOwnProperty("betnum"))
                if (!$util.isInteger(message.betnum))
                    return "betnum: integer expected";
            return null;
        };

        /**
         * Creates a BetInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BetInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BetInfo} BetInfo
         */
        BetInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BetInfo)
                return object;
            var message = new $root.msg.BetInfo();
            switch (object.area) {
            case "emBA_Zhuang":
            case 0:
                message.area = 0;
                break;
            case "emBA_Shun":
            case 1:
                message.area = 1;
                break;
            case "emBA_Tian":
            case 2:
                message.area = 2;
                break;
            case "emBA_Di":
            case 3:
                message.area = 3;
                break;
            }
            if (object.betnum != null)
                message.betnum = object.betnum >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a BetInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BetInfo
         * @static
         * @param {msg.BetInfo} message BetInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.area = options.enums === String ? "emBA_Zhuang" : 0;
                object.betnum = 0;
            }
            if (message.area != null && message.hasOwnProperty("area"))
                object.area = options.enums === String ? $root.msg.EmBetArea[message.area] : message.area;
            if (message.betnum != null && message.hasOwnProperty("betnum"))
                object.betnum = message.betnum;
            return object;
        };

        /**
         * Converts this BetInfo to JSON.
         * @function toJSON
         * @memberof msg.BetInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetInfo;
    })();

    msg.PlayerInfo = (function() {

        /**
         * Properties of a PlayerInfo.
         * @memberof msg
         * @interface IPlayerInfo
         * @property {string|null} [ID] PlayerInfo ID
         * @property {string|null} [Nick] PlayerInfo Nick
         * @property {string|null} [Head] PlayerInfo Head
         * @property {number|null} [score] PlayerInfo score
         * @property {number|null} [curBet] PlayerInfo curBet
         * @property {number|null} [allBet] PlayerInfo allBet
         * @property {number|null} [winTime] PlayerInfo winTime
         * @property {Array.<msg.IBetInfo>|null} [betList] PlayerInfo betList
         */

        /**
         * Constructs a new PlayerInfo.
         * @memberof msg
         * @classdesc Represents a PlayerInfo.
         * @implements IPlayerInfo
         * @constructor
         * @param {msg.IPlayerInfo=} [properties] Properties to set
         */
        function PlayerInfo(properties) {
            this.betList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfo ID.
         * @member {string} ID
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.ID = "";

        /**
         * PlayerInfo Nick.
         * @member {string} Nick
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.Nick = "";

        /**
         * PlayerInfo Head.
         * @member {string} Head
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.Head = "";

        /**
         * PlayerInfo score.
         * @member {number} score
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.score = 0;

        /**
         * PlayerInfo curBet.
         * @member {number} curBet
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.curBet = 0;

        /**
         * PlayerInfo allBet.
         * @member {number} allBet
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.allBet = 0;

        /**
         * PlayerInfo winTime.
         * @member {number} winTime
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.winTime = 0;

        /**
         * PlayerInfo betList.
         * @member {Array.<msg.IBetInfo>} betList
         * @memberof msg.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.betList = $util.emptyArray;

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @function create
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.IPlayerInfo=} [properties] Properties to set
         * @returns {msg.PlayerInfo} PlayerInfo instance
         */
        PlayerInfo.create = function create(properties) {
            return new PlayerInfo(properties);
        };

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ID);
            if (message.Nick != null && Object.hasOwnProperty.call(message, "Nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Nick);
            if (message.Head != null && Object.hasOwnProperty.call(message, "Head"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.Head);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.score);
            if (message.curBet != null && Object.hasOwnProperty.call(message, "curBet"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.curBet);
            if (message.allBet != null && Object.hasOwnProperty.call(message, "allBet"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.allBet);
            if (message.winTime != null && Object.hasOwnProperty.call(message, "winTime"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.winTime);
            if (message.betList != null && message.betList.length)
                for (var i = 0; i < message.betList.length; ++i)
                    $root.msg.BetInfo.encode(message.betList[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link msg.PlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ID = reader.string();
                    break;
                case 2:
                    message.Nick = reader.string();
                    break;
                case 3:
                    message.Head = reader.string();
                    break;
                case 4:
                    message.score = reader.double();
                    break;
                case 5:
                    message.curBet = reader.uint32();
                    break;
                case 6:
                    message.allBet = reader.uint32();
                    break;
                case 7:
                    message.winTime = reader.uint32();
                    break;
                case 8:
                    if (!(message.betList && message.betList.length))
                        message.betList = [];
                    message.betList.push($root.msg.BetInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfo message.
         * @function verify
         * @memberof msg.PlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (!$util.isString(message.ID))
                    return "ID: string expected";
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                if (!$util.isString(message.Nick))
                    return "Nick: string expected";
            if (message.Head != null && message.hasOwnProperty("Head"))
                if (!$util.isString(message.Head))
                    return "Head: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score !== "number")
                    return "score: number expected";
            if (message.curBet != null && message.hasOwnProperty("curBet"))
                if (!$util.isInteger(message.curBet))
                    return "curBet: integer expected";
            if (message.allBet != null && message.hasOwnProperty("allBet"))
                if (!$util.isInteger(message.allBet))
                    return "allBet: integer expected";
            if (message.winTime != null && message.hasOwnProperty("winTime"))
                if (!$util.isInteger(message.winTime))
                    return "winTime: integer expected";
            if (message.betList != null && message.hasOwnProperty("betList")) {
                if (!Array.isArray(message.betList))
                    return "betList: array expected";
                for (var i = 0; i < message.betList.length; ++i) {
                    var error = $root.msg.BetInfo.verify(message.betList[i]);
                    if (error)
                        return "betList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerInfo} PlayerInfo
         */
        PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerInfo)
                return object;
            var message = new $root.msg.PlayerInfo();
            if (object.ID != null)
                message.ID = String(object.ID);
            if (object.Nick != null)
                message.Nick = String(object.Nick);
            if (object.Head != null)
                message.Head = String(object.Head);
            if (object.score != null)
                message.score = Number(object.score);
            if (object.curBet != null)
                message.curBet = object.curBet >>> 0;
            if (object.allBet != null)
                message.allBet = object.allBet >>> 0;
            if (object.winTime != null)
                message.winTime = object.winTime >>> 0;
            if (object.betList) {
                if (!Array.isArray(object.betList))
                    throw TypeError(".msg.PlayerInfo.betList: array expected");
                message.betList = [];
                for (var i = 0; i < object.betList.length; ++i) {
                    if (typeof object.betList[i] !== "object")
                        throw TypeError(".msg.PlayerInfo.betList: object expected");
                    message.betList[i] = $root.msg.BetInfo.fromObject(object.betList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerInfo
         * @static
         * @param {msg.PlayerInfo} message PlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.betList = [];
            if (options.defaults) {
                object.ID = "";
                object.Nick = "";
                object.Head = "";
                object.score = 0;
                object.curBet = 0;
                object.allBet = 0;
                object.winTime = 0;
            }
            if (message.ID != null && message.hasOwnProperty("ID"))
                object.ID = message.ID;
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                object.Nick = message.Nick;
            if (message.Head != null && message.hasOwnProperty("Head"))
                object.Head = message.Head;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
            if (message.curBet != null && message.hasOwnProperty("curBet"))
                object.curBet = message.curBet;
            if (message.allBet != null && message.hasOwnProperty("allBet"))
                object.allBet = message.allBet;
            if (message.winTime != null && message.hasOwnProperty("winTime"))
                object.winTime = message.winTime;
            if (message.betList && message.betList.length) {
                object.betList = [];
                for (var j = 0; j < message.betList.length; ++j)
                    object.betList[j] = $root.msg.BetInfo.toObject(message.betList[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerInfo to JSON.
         * @function toJSON
         * @memberof msg.PlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerInfo;
    })();

    msg.DealerProper = (function() {

        /**
         * Properties of a DealerProper.
         * @memberof msg
         * @interface IDealerProper
         * @property {string|null} [ID] DealerProper ID
         * @property {string|null} [Nick] DealerProper Nick
         * @property {string|null} [Head] DealerProper Head
         * @property {number|null} [score] DealerProper score
         */

        /**
         * Constructs a new DealerProper.
         * @memberof msg
         * @classdesc Represents a DealerProper.
         * @implements IDealerProper
         * @constructor
         * @param {msg.IDealerProper=} [properties] Properties to set
         */
        function DealerProper(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DealerProper ID.
         * @member {string} ID
         * @memberof msg.DealerProper
         * @instance
         */
        DealerProper.prototype.ID = "";

        /**
         * DealerProper Nick.
         * @member {string} Nick
         * @memberof msg.DealerProper
         * @instance
         */
        DealerProper.prototype.Nick = "";

        /**
         * DealerProper Head.
         * @member {string} Head
         * @memberof msg.DealerProper
         * @instance
         */
        DealerProper.prototype.Head = "";

        /**
         * DealerProper score.
         * @member {number} score
         * @memberof msg.DealerProper
         * @instance
         */
        DealerProper.prototype.score = 0;

        /**
         * Creates a new DealerProper instance using the specified properties.
         * @function create
         * @memberof msg.DealerProper
         * @static
         * @param {msg.IDealerProper=} [properties] Properties to set
         * @returns {msg.DealerProper} DealerProper instance
         */
        DealerProper.create = function create(properties) {
            return new DealerProper(properties);
        };

        /**
         * Encodes the specified DealerProper message. Does not implicitly {@link msg.DealerProper.verify|verify} messages.
         * @function encode
         * @memberof msg.DealerProper
         * @static
         * @param {msg.IDealerProper} message DealerProper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealerProper.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ID);
            if (message.Nick != null && Object.hasOwnProperty.call(message, "Nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Nick);
            if (message.Head != null && Object.hasOwnProperty.call(message, "Head"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.Head);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.score);
            return writer;
        };

        /**
         * Encodes the specified DealerProper message, length delimited. Does not implicitly {@link msg.DealerProper.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.DealerProper
         * @static
         * @param {msg.IDealerProper} message DealerProper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealerProper.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DealerProper message from the specified reader or buffer.
         * @function decode
         * @memberof msg.DealerProper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.DealerProper} DealerProper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealerProper.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.DealerProper();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ID = reader.string();
                    break;
                case 2:
                    message.Nick = reader.string();
                    break;
                case 3:
                    message.Head = reader.string();
                    break;
                case 4:
                    message.score = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DealerProper message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.DealerProper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.DealerProper} DealerProper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealerProper.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DealerProper message.
         * @function verify
         * @memberof msg.DealerProper
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DealerProper.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (!$util.isString(message.ID))
                    return "ID: string expected";
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                if (!$util.isString(message.Nick))
                    return "Nick: string expected";
            if (message.Head != null && message.hasOwnProperty("Head"))
                if (!$util.isString(message.Head))
                    return "Head: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score !== "number")
                    return "score: number expected";
            return null;
        };

        /**
         * Creates a DealerProper message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.DealerProper
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.DealerProper} DealerProper
         */
        DealerProper.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.DealerProper)
                return object;
            var message = new $root.msg.DealerProper();
            if (object.ID != null)
                message.ID = String(object.ID);
            if (object.Nick != null)
                message.Nick = String(object.Nick);
            if (object.Head != null)
                message.Head = String(object.Head);
            if (object.score != null)
                message.score = Number(object.score);
            return message;
        };

        /**
         * Creates a plain object from a DealerProper message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.DealerProper
         * @static
         * @param {msg.DealerProper} message DealerProper
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DealerProper.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ID = "";
                object.Nick = "";
                object.Head = "";
                object.score = 0;
            }
            if (message.ID != null && message.hasOwnProperty("ID"))
                object.ID = message.ID;
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                object.Nick = message.Nick;
            if (message.Head != null && message.hasOwnProperty("Head"))
                object.Head = message.Head;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
            return object;
        };

        /**
         * Converts this DealerProper to JSON.
         * @function toJSON
         * @memberof msg.DealerProper
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DealerProper.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DealerProper;
    })();

    msg.DealerInfo = (function() {

        /**
         * Properties of a DealerInfo.
         * @memberof msg
         * @interface IDealerInfo
         * @property {msg.IDealerProper|null} [Dealer] DealerInfo Dealer
         * @property {Array.<msg.IDealerProper>|null} [WaitingList] DealerInfo WaitingList
         */

        /**
         * Constructs a new DealerInfo.
         * @memberof msg
         * @classdesc Represents a DealerInfo.
         * @implements IDealerInfo
         * @constructor
         * @param {msg.IDealerInfo=} [properties] Properties to set
         */
        function DealerInfo(properties) {
            this.WaitingList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DealerInfo Dealer.
         * @member {msg.IDealerProper|null|undefined} Dealer
         * @memberof msg.DealerInfo
         * @instance
         */
        DealerInfo.prototype.Dealer = null;

        /**
         * DealerInfo WaitingList.
         * @member {Array.<msg.IDealerProper>} WaitingList
         * @memberof msg.DealerInfo
         * @instance
         */
        DealerInfo.prototype.WaitingList = $util.emptyArray;

        /**
         * Creates a new DealerInfo instance using the specified properties.
         * @function create
         * @memberof msg.DealerInfo
         * @static
         * @param {msg.IDealerInfo=} [properties] Properties to set
         * @returns {msg.DealerInfo} DealerInfo instance
         */
        DealerInfo.create = function create(properties) {
            return new DealerInfo(properties);
        };

        /**
         * Encodes the specified DealerInfo message. Does not implicitly {@link msg.DealerInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.DealerInfo
         * @static
         * @param {msg.IDealerInfo} message DealerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Dealer != null && Object.hasOwnProperty.call(message, "Dealer"))
                $root.msg.DealerProper.encode(message.Dealer, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.WaitingList != null && message.WaitingList.length)
                for (var i = 0; i < message.WaitingList.length; ++i)
                    $root.msg.DealerProper.encode(message.WaitingList[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DealerInfo message, length delimited. Does not implicitly {@link msg.DealerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.DealerInfo
         * @static
         * @param {msg.IDealerInfo} message DealerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DealerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DealerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.DealerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.DealerInfo} DealerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.DealerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Dealer = $root.msg.DealerProper.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.WaitingList && message.WaitingList.length))
                        message.WaitingList = [];
                    message.WaitingList.push($root.msg.DealerProper.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DealerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.DealerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.DealerInfo} DealerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DealerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DealerInfo message.
         * @function verify
         * @memberof msg.DealerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DealerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Dealer != null && message.hasOwnProperty("Dealer")) {
                var error = $root.msg.DealerProper.verify(message.Dealer);
                if (error)
                    return "Dealer." + error;
            }
            if (message.WaitingList != null && message.hasOwnProperty("WaitingList")) {
                if (!Array.isArray(message.WaitingList))
                    return "WaitingList: array expected";
                for (var i = 0; i < message.WaitingList.length; ++i) {
                    var error = $root.msg.DealerProper.verify(message.WaitingList[i]);
                    if (error)
                        return "WaitingList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a DealerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.DealerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.DealerInfo} DealerInfo
         */
        DealerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.DealerInfo)
                return object;
            var message = new $root.msg.DealerInfo();
            if (object.Dealer != null) {
                if (typeof object.Dealer !== "object")
                    throw TypeError(".msg.DealerInfo.Dealer: object expected");
                message.Dealer = $root.msg.DealerProper.fromObject(object.Dealer);
            }
            if (object.WaitingList) {
                if (!Array.isArray(object.WaitingList))
                    throw TypeError(".msg.DealerInfo.WaitingList: array expected");
                message.WaitingList = [];
                for (var i = 0; i < object.WaitingList.length; ++i) {
                    if (typeof object.WaitingList[i] !== "object")
                        throw TypeError(".msg.DealerInfo.WaitingList: object expected");
                    message.WaitingList[i] = $root.msg.DealerProper.fromObject(object.WaitingList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a DealerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.DealerInfo
         * @static
         * @param {msg.DealerInfo} message DealerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DealerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.WaitingList = [];
            if (options.defaults)
                object.Dealer = null;
            if (message.Dealer != null && message.hasOwnProperty("Dealer"))
                object.Dealer = $root.msg.DealerProper.toObject(message.Dealer, options);
            if (message.WaitingList && message.WaitingList.length) {
                object.WaitingList = [];
                for (var j = 0; j < message.WaitingList.length; ++j)
                    object.WaitingList[j] = $root.msg.DealerProper.toObject(message.WaitingList[j], options);
            }
            return object;
        };

        /**
         * Converts this DealerInfo to JSON.
         * @function toJSON
         * @memberof msg.DealerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DealerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DealerInfo;
    })();

    msg.RoomInfo = (function() {

        /**
         * Properties of a RoomInfo.
         * @memberof msg
         * @interface IRoomInfo
         * @property {number|null} [Index] RoomInfo Index
         * @property {msg.EmRoomState|null} [RoomState] RoomInfo RoomState
         * @property {Array.<msg.IPlayerInfo>|null} [PlayerList] RoomInfo PlayerList
         * @property {msg.ITableCards|null} [Cards] RoomInfo Cards
         * @property {msg.IDealerInfo|null} [HostInfo] RoomInfo HostInfo
         * @property {number|null} [Remaining] RoomInfo Remaining
         * @property {Array.<msg.IResRec>|null} [rrlist] RoomInfo rrlist
         */

        /**
         * Constructs a new RoomInfo.
         * @memberof msg
         * @classdesc Represents a RoomInfo.
         * @implements IRoomInfo
         * @constructor
         * @param {msg.IRoomInfo=} [properties] Properties to set
         */
        function RoomInfo(properties) {
            this.PlayerList = [];
            this.rrlist = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomInfo Index.
         * @member {number} Index
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.Index = 0;

        /**
         * RoomInfo RoomState.
         * @member {msg.EmRoomState} RoomState
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.RoomState = 0;

        /**
         * RoomInfo PlayerList.
         * @member {Array.<msg.IPlayerInfo>} PlayerList
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.PlayerList = $util.emptyArray;

        /**
         * RoomInfo Cards.
         * @member {msg.ITableCards|null|undefined} Cards
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.Cards = null;

        /**
         * RoomInfo HostInfo.
         * @member {msg.IDealerInfo|null|undefined} HostInfo
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.HostInfo = null;

        /**
         * RoomInfo Remaining.
         * @member {number} Remaining
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.Remaining = 0;

        /**
         * RoomInfo rrlist.
         * @member {Array.<msg.IResRec>} rrlist
         * @memberof msg.RoomInfo
         * @instance
         */
        RoomInfo.prototype.rrlist = $util.emptyArray;

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @function create
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.IRoomInfo=} [properties] Properties to set
         * @returns {msg.RoomInfo} RoomInfo instance
         */
        RoomInfo.create = function create(properties) {
            return new RoomInfo(properties);
        };

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Index != null && Object.hasOwnProperty.call(message, "Index"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Index);
            if (message.RoomState != null && Object.hasOwnProperty.call(message, "RoomState"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RoomState);
            if (message.PlayerList != null && message.PlayerList.length)
                for (var i = 0; i < message.PlayerList.length; ++i)
                    $root.msg.PlayerInfo.encode(message.PlayerList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.Cards != null && Object.hasOwnProperty.call(message, "Cards"))
                $root.msg.TableCards.encode(message.Cards, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.HostInfo != null && Object.hasOwnProperty.call(message, "HostInfo"))
                $root.msg.DealerInfo.encode(message.HostInfo, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.Remaining != null && Object.hasOwnProperty.call(message, "Remaining"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.Remaining);
            if (message.rrlist != null && message.rrlist.length)
                for (var i = 0; i < message.rrlist.length; ++i)
                    $root.msg.ResRec.encode(message.rrlist[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link msg.RoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Index = reader.uint32();
                    break;
                case 2:
                    message.RoomState = reader.int32();
                    break;
                case 3:
                    if (!(message.PlayerList && message.PlayerList.length))
                        message.PlayerList = [];
                    message.PlayerList.push($root.msg.PlayerInfo.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.Cards = $root.msg.TableCards.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.HostInfo = $root.msg.DealerInfo.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.Remaining = reader.uint32();
                    break;
                case 7:
                    if (!(message.rrlist && message.rrlist.length))
                        message.rrlist = [];
                    message.rrlist.push($root.msg.ResRec.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomInfo message.
         * @function verify
         * @memberof msg.RoomInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Index != null && message.hasOwnProperty("Index"))
                if (!$util.isInteger(message.Index))
                    return "Index: integer expected";
            if (message.RoomState != null && message.hasOwnProperty("RoomState"))
                switch (message.RoomState) {
                default:
                    return "RoomState: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.PlayerList != null && message.hasOwnProperty("PlayerList")) {
                if (!Array.isArray(message.PlayerList))
                    return "PlayerList: array expected";
                for (var i = 0; i < message.PlayerList.length; ++i) {
                    var error = $root.msg.PlayerInfo.verify(message.PlayerList[i]);
                    if (error)
                        return "PlayerList." + error;
                }
            }
            if (message.Cards != null && message.hasOwnProperty("Cards")) {
                var error = $root.msg.TableCards.verify(message.Cards);
                if (error)
                    return "Cards." + error;
            }
            if (message.HostInfo != null && message.hasOwnProperty("HostInfo")) {
                var error = $root.msg.DealerInfo.verify(message.HostInfo);
                if (error)
                    return "HostInfo." + error;
            }
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                if (!$util.isInteger(message.Remaining))
                    return "Remaining: integer expected";
            if (message.rrlist != null && message.hasOwnProperty("rrlist")) {
                if (!Array.isArray(message.rrlist))
                    return "rrlist: array expected";
                for (var i = 0; i < message.rrlist.length; ++i) {
                    var error = $root.msg.ResRec.verify(message.rrlist[i]);
                    if (error)
                        return "rrlist." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomInfo} RoomInfo
         */
        RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomInfo)
                return object;
            var message = new $root.msg.RoomInfo();
            if (object.Index != null)
                message.Index = object.Index >>> 0;
            switch (object.RoomState) {
            case "emRS_None":
            case 0:
                message.RoomState = 0;
                break;
            case "emRS_Bet":
            case 1:
                message.RoomState = 1;
                break;
            case "emRS_Settlement":
            case 2:
                message.RoomState = 2;
                break;
            }
            if (object.PlayerList) {
                if (!Array.isArray(object.PlayerList))
                    throw TypeError(".msg.RoomInfo.PlayerList: array expected");
                message.PlayerList = [];
                for (var i = 0; i < object.PlayerList.length; ++i) {
                    if (typeof object.PlayerList[i] !== "object")
                        throw TypeError(".msg.RoomInfo.PlayerList: object expected");
                    message.PlayerList[i] = $root.msg.PlayerInfo.fromObject(object.PlayerList[i]);
                }
            }
            if (object.Cards != null) {
                if (typeof object.Cards !== "object")
                    throw TypeError(".msg.RoomInfo.Cards: object expected");
                message.Cards = $root.msg.TableCards.fromObject(object.Cards);
            }
            if (object.HostInfo != null) {
                if (typeof object.HostInfo !== "object")
                    throw TypeError(".msg.RoomInfo.HostInfo: object expected");
                message.HostInfo = $root.msg.DealerInfo.fromObject(object.HostInfo);
            }
            if (object.Remaining != null)
                message.Remaining = object.Remaining >>> 0;
            if (object.rrlist) {
                if (!Array.isArray(object.rrlist))
                    throw TypeError(".msg.RoomInfo.rrlist: array expected");
                message.rrlist = [];
                for (var i = 0; i < object.rrlist.length; ++i) {
                    if (typeof object.rrlist[i] !== "object")
                        throw TypeError(".msg.RoomInfo.rrlist: object expected");
                    message.rrlist[i] = $root.msg.ResRec.fromObject(object.rrlist[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomInfo
         * @static
         * @param {msg.RoomInfo} message RoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.PlayerList = [];
                object.rrlist = [];
            }
            if (options.defaults) {
                object.Index = 0;
                object.RoomState = options.enums === String ? "emRS_None" : 0;
                object.Cards = null;
                object.HostInfo = null;
                object.Remaining = 0;
            }
            if (message.Index != null && message.hasOwnProperty("Index"))
                object.Index = message.Index;
            if (message.RoomState != null && message.hasOwnProperty("RoomState"))
                object.RoomState = options.enums === String ? $root.msg.EmRoomState[message.RoomState] : message.RoomState;
            if (message.PlayerList && message.PlayerList.length) {
                object.PlayerList = [];
                for (var j = 0; j < message.PlayerList.length; ++j)
                    object.PlayerList[j] = $root.msg.PlayerInfo.toObject(message.PlayerList[j], options);
            }
            if (message.Cards != null && message.hasOwnProperty("Cards"))
                object.Cards = $root.msg.TableCards.toObject(message.Cards, options);
            if (message.HostInfo != null && message.hasOwnProperty("HostInfo"))
                object.HostInfo = $root.msg.DealerInfo.toObject(message.HostInfo, options);
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                object.Remaining = message.Remaining;
            if (message.rrlist && message.rrlist.length) {
                object.rrlist = [];
                for (var j = 0; j < message.rrlist.length; ++j)
                    object.rrlist[j] = $root.msg.ResRec.toObject(message.rrlist[j], options);
            }
            return object;
        };

        /**
         * Converts this RoomInfo to JSON.
         * @function toJSON
         * @memberof msg.RoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomInfo;
    })();

    msg.EnterRoomRsp = (function() {

        /**
         * Properties of an EnterRoomRsp.
         * @memberof msg
         * @interface IEnterRoomRsp
         * @property {boolean|null} [Entered] EnterRoomRsp Entered
         * @property {msg.IRoomInfo|null} [Info] EnterRoomRsp Info
         */

        /**
         * Constructs a new EnterRoomRsp.
         * @memberof msg
         * @classdesc Represents an EnterRoomRsp.
         * @implements IEnterRoomRsp
         * @constructor
         * @param {msg.IEnterRoomRsp=} [properties] Properties to set
         */
        function EnterRoomRsp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterRoomRsp Entered.
         * @member {boolean} Entered
         * @memberof msg.EnterRoomRsp
         * @instance
         */
        EnterRoomRsp.prototype.Entered = false;

        /**
         * EnterRoomRsp Info.
         * @member {msg.IRoomInfo|null|undefined} Info
         * @memberof msg.EnterRoomRsp
         * @instance
         */
        EnterRoomRsp.prototype.Info = null;

        /**
         * Creates a new EnterRoomRsp instance using the specified properties.
         * @function create
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {msg.IEnterRoomRsp=} [properties] Properties to set
         * @returns {msg.EnterRoomRsp} EnterRoomRsp instance
         */
        EnterRoomRsp.create = function create(properties) {
            return new EnterRoomRsp(properties);
        };

        /**
         * Encodes the specified EnterRoomRsp message. Does not implicitly {@link msg.EnterRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {msg.IEnterRoomRsp} message EnterRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Entered != null && Object.hasOwnProperty.call(message, "Entered"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.Entered);
            if (message.Info != null && Object.hasOwnProperty.call(message, "Info"))
                $root.msg.RoomInfo.encode(message.Info, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EnterRoomRsp message, length delimited. Does not implicitly {@link msg.EnterRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {msg.IEnterRoomRsp} message EnterRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.EnterRoomRsp} EnterRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.EnterRoomRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Entered = reader.bool();
                    break;
                case 2:
                    message.Info = $root.msg.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterRoomRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.EnterRoomRsp} EnterRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterRoomRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterRoomRsp message.
         * @function verify
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterRoomRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Entered != null && message.hasOwnProperty("Entered"))
                if (typeof message.Entered !== "boolean")
                    return "Entered: boolean expected";
            if (message.Info != null && message.hasOwnProperty("Info")) {
                var error = $root.msg.RoomInfo.verify(message.Info);
                if (error)
                    return "Info." + error;
            }
            return null;
        };

        /**
         * Creates an EnterRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.EnterRoomRsp} EnterRoomRsp
         */
        EnterRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.EnterRoomRsp)
                return object;
            var message = new $root.msg.EnterRoomRsp();
            if (object.Entered != null)
                message.Entered = Boolean(object.Entered);
            if (object.Info != null) {
                if (typeof object.Info !== "object")
                    throw TypeError(".msg.EnterRoomRsp.Info: object expected");
                message.Info = $root.msg.RoomInfo.fromObject(object.Info);
            }
            return message;
        };

        /**
         * Creates a plain object from an EnterRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.EnterRoomRsp
         * @static
         * @param {msg.EnterRoomRsp} message EnterRoomRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterRoomRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Entered = false;
                object.Info = null;
            }
            if (message.Entered != null && message.hasOwnProperty("Entered"))
                object.Entered = message.Entered;
            if (message.Info != null && message.hasOwnProperty("Info"))
                object.Info = $root.msg.RoomInfo.toObject(message.Info, options);
            return object;
        };

        /**
         * Converts this EnterRoomRsp to JSON.
         * @function toJSON
         * @memberof msg.EnterRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterRoomRsp;
    })();

    msg.RoomInfoReq = (function() {

        /**
         * Properties of a RoomInfoReq.
         * @memberof msg
         * @interface IRoomInfoReq
         */

        /**
         * Constructs a new RoomInfoReq.
         * @memberof msg
         * @classdesc Represents a RoomInfoReq.
         * @implements IRoomInfoReq
         * @constructor
         * @param {msg.IRoomInfoReq=} [properties] Properties to set
         */
        function RoomInfoReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RoomInfoReq instance using the specified properties.
         * @function create
         * @memberof msg.RoomInfoReq
         * @static
         * @param {msg.IRoomInfoReq=} [properties] Properties to set
         * @returns {msg.RoomInfoReq} RoomInfoReq instance
         */
        RoomInfoReq.create = function create(properties) {
            return new RoomInfoReq(properties);
        };

        /**
         * Encodes the specified RoomInfoReq message. Does not implicitly {@link msg.RoomInfoReq.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomInfoReq
         * @static
         * @param {msg.IRoomInfoReq} message RoomInfoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfoReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RoomInfoReq message, length delimited. Does not implicitly {@link msg.RoomInfoReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomInfoReq
         * @static
         * @param {msg.IRoomInfoReq} message RoomInfoReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfoReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfoReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomInfoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomInfoReq} RoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfoReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomInfoReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomInfoReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomInfoReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomInfoReq} RoomInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfoReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomInfoReq message.
         * @function verify
         * @memberof msg.RoomInfoReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomInfoReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RoomInfoReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomInfoReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomInfoReq} RoomInfoReq
         */
        RoomInfoReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomInfoReq)
                return object;
            return new $root.msg.RoomInfoReq();
        };

        /**
         * Creates a plain object from a RoomInfoReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomInfoReq
         * @static
         * @param {msg.RoomInfoReq} message RoomInfoReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfoReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RoomInfoReq to JSON.
         * @function toJSON
         * @memberof msg.RoomInfoReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfoReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomInfoReq;
    })();

    msg.OtherJoin = (function() {

        /**
         * Properties of an OtherJoin.
         * @memberof msg
         * @interface IOtherJoin
         * @property {string|null} [ID] OtherJoin ID
         * @property {string|null} [Nick] OtherJoin Nick
         * @property {string|null} [Head] OtherJoin Head
         * @property {number|null} [score] OtherJoin score
         */

        /**
         * Constructs a new OtherJoin.
         * @memberof msg
         * @classdesc Represents an OtherJoin.
         * @implements IOtherJoin
         * @constructor
         * @param {msg.IOtherJoin=} [properties] Properties to set
         */
        function OtherJoin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OtherJoin ID.
         * @member {string} ID
         * @memberof msg.OtherJoin
         * @instance
         */
        OtherJoin.prototype.ID = "";

        /**
         * OtherJoin Nick.
         * @member {string} Nick
         * @memberof msg.OtherJoin
         * @instance
         */
        OtherJoin.prototype.Nick = "";

        /**
         * OtherJoin Head.
         * @member {string} Head
         * @memberof msg.OtherJoin
         * @instance
         */
        OtherJoin.prototype.Head = "";

        /**
         * OtherJoin score.
         * @member {number} score
         * @memberof msg.OtherJoin
         * @instance
         */
        OtherJoin.prototype.score = 0;

        /**
         * Creates a new OtherJoin instance using the specified properties.
         * @function create
         * @memberof msg.OtherJoin
         * @static
         * @param {msg.IOtherJoin=} [properties] Properties to set
         * @returns {msg.OtherJoin} OtherJoin instance
         */
        OtherJoin.create = function create(properties) {
            return new OtherJoin(properties);
        };

        /**
         * Encodes the specified OtherJoin message. Does not implicitly {@link msg.OtherJoin.verify|verify} messages.
         * @function encode
         * @memberof msg.OtherJoin
         * @static
         * @param {msg.IOtherJoin} message OtherJoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OtherJoin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ID);
            if (message.Nick != null && Object.hasOwnProperty.call(message, "Nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Nick);
            if (message.Head != null && Object.hasOwnProperty.call(message, "Head"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.Head);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.score);
            return writer;
        };

        /**
         * Encodes the specified OtherJoin message, length delimited. Does not implicitly {@link msg.OtherJoin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.OtherJoin
         * @static
         * @param {msg.IOtherJoin} message OtherJoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OtherJoin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OtherJoin message from the specified reader or buffer.
         * @function decode
         * @memberof msg.OtherJoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.OtherJoin} OtherJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OtherJoin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.OtherJoin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ID = reader.string();
                    break;
                case 2:
                    message.Nick = reader.string();
                    break;
                case 3:
                    message.Head = reader.string();
                    break;
                case 4:
                    message.score = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OtherJoin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.OtherJoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.OtherJoin} OtherJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OtherJoin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OtherJoin message.
         * @function verify
         * @memberof msg.OtherJoin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OtherJoin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (!$util.isString(message.ID))
                    return "ID: string expected";
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                if (!$util.isString(message.Nick))
                    return "Nick: string expected";
            if (message.Head != null && message.hasOwnProperty("Head"))
                if (!$util.isString(message.Head))
                    return "Head: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score !== "number")
                    return "score: number expected";
            return null;
        };

        /**
         * Creates an OtherJoin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.OtherJoin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.OtherJoin} OtherJoin
         */
        OtherJoin.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.OtherJoin)
                return object;
            var message = new $root.msg.OtherJoin();
            if (object.ID != null)
                message.ID = String(object.ID);
            if (object.Nick != null)
                message.Nick = String(object.Nick);
            if (object.Head != null)
                message.Head = String(object.Head);
            if (object.score != null)
                message.score = Number(object.score);
            return message;
        };

        /**
         * Creates a plain object from an OtherJoin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.OtherJoin
         * @static
         * @param {msg.OtherJoin} message OtherJoin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OtherJoin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ID = "";
                object.Nick = "";
                object.Head = "";
                object.score = 0;
            }
            if (message.ID != null && message.hasOwnProperty("ID"))
                object.ID = message.ID;
            if (message.Nick != null && message.hasOwnProperty("Nick"))
                object.Nick = message.Nick;
            if (message.Head != null && message.hasOwnProperty("Head"))
                object.Head = message.Head;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
            return object;
        };

        /**
         * Converts this OtherJoin to JSON.
         * @function toJSON
         * @memberof msg.OtherJoin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OtherJoin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OtherJoin;
    })();

    msg.ExitRoomReq = (function() {

        /**
         * Properties of an ExitRoomReq.
         * @memberof msg
         * @interface IExitRoomReq
         */

        /**
         * Constructs a new ExitRoomReq.
         * @memberof msg
         * @classdesc Represents an ExitRoomReq.
         * @implements IExitRoomReq
         * @constructor
         * @param {msg.IExitRoomReq=} [properties] Properties to set
         */
        function ExitRoomReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ExitRoomReq instance using the specified properties.
         * @function create
         * @memberof msg.ExitRoomReq
         * @static
         * @param {msg.IExitRoomReq=} [properties] Properties to set
         * @returns {msg.ExitRoomReq} ExitRoomReq instance
         */
        ExitRoomReq.create = function create(properties) {
            return new ExitRoomReq(properties);
        };

        /**
         * Encodes the specified ExitRoomReq message. Does not implicitly {@link msg.ExitRoomReq.verify|verify} messages.
         * @function encode
         * @memberof msg.ExitRoomReq
         * @static
         * @param {msg.IExitRoomReq} message ExitRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ExitRoomReq message, length delimited. Does not implicitly {@link msg.ExitRoomReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ExitRoomReq
         * @static
         * @param {msg.IExitRoomReq} message ExitRoomReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExitRoomReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ExitRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ExitRoomReq} ExitRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ExitRoomReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExitRoomReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ExitRoomReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ExitRoomReq} ExitRoomReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExitRoomReq message.
         * @function verify
         * @memberof msg.ExitRoomReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExitRoomReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an ExitRoomReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ExitRoomReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ExitRoomReq} ExitRoomReq
         */
        ExitRoomReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ExitRoomReq)
                return object;
            return new $root.msg.ExitRoomReq();
        };

        /**
         * Creates a plain object from an ExitRoomReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ExitRoomReq
         * @static
         * @param {msg.ExitRoomReq} message ExitRoomReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExitRoomReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ExitRoomReq to JSON.
         * @function toJSON
         * @memberof msg.ExitRoomReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExitRoomReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExitRoomReq;
    })();

    msg.ExitRoomRsp = (function() {

        /**
         * Properties of an ExitRoomRsp.
         * @memberof msg
         * @interface IExitRoomRsp
         * @property {number|null} [score] ExitRoomRsp score
         * @property {Array.<msg.IBaseRoomInfo>|null} [roomlist] ExitRoomRsp roomlist
         */

        /**
         * Constructs a new ExitRoomRsp.
         * @memberof msg
         * @classdesc Represents an ExitRoomRsp.
         * @implements IExitRoomRsp
         * @constructor
         * @param {msg.IExitRoomRsp=} [properties] Properties to set
         */
        function ExitRoomRsp(properties) {
            this.roomlist = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExitRoomRsp score.
         * @member {number} score
         * @memberof msg.ExitRoomRsp
         * @instance
         */
        ExitRoomRsp.prototype.score = 0;

        /**
         * ExitRoomRsp roomlist.
         * @member {Array.<msg.IBaseRoomInfo>} roomlist
         * @memberof msg.ExitRoomRsp
         * @instance
         */
        ExitRoomRsp.prototype.roomlist = $util.emptyArray;

        /**
         * Creates a new ExitRoomRsp instance using the specified properties.
         * @function create
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {msg.IExitRoomRsp=} [properties] Properties to set
         * @returns {msg.ExitRoomRsp} ExitRoomRsp instance
         */
        ExitRoomRsp.create = function create(properties) {
            return new ExitRoomRsp(properties);
        };

        /**
         * Encodes the specified ExitRoomRsp message. Does not implicitly {@link msg.ExitRoomRsp.verify|verify} messages.
         * @function encode
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {msg.IExitRoomRsp} message ExitRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomRsp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.score);
            if (message.roomlist != null && message.roomlist.length)
                for (var i = 0; i < message.roomlist.length; ++i)
                    $root.msg.BaseRoomInfo.encode(message.roomlist[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ExitRoomRsp message, length delimited. Does not implicitly {@link msg.ExitRoomRsp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {msg.IExitRoomRsp} message ExitRoomRsp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExitRoomRsp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExitRoomRsp message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ExitRoomRsp} ExitRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ExitRoomRsp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.score = reader.double();
                    break;
                case 2:
                    if (!(message.roomlist && message.roomlist.length))
                        message.roomlist = [];
                    message.roomlist.push($root.msg.BaseRoomInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExitRoomRsp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ExitRoomRsp} ExitRoomRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExitRoomRsp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExitRoomRsp message.
         * @function verify
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExitRoomRsp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score !== "number")
                    return "score: number expected";
            if (message.roomlist != null && message.hasOwnProperty("roomlist")) {
                if (!Array.isArray(message.roomlist))
                    return "roomlist: array expected";
                for (var i = 0; i < message.roomlist.length; ++i) {
                    var error = $root.msg.BaseRoomInfo.verify(message.roomlist[i]);
                    if (error)
                        return "roomlist." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ExitRoomRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ExitRoomRsp} ExitRoomRsp
         */
        ExitRoomRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ExitRoomRsp)
                return object;
            var message = new $root.msg.ExitRoomRsp();
            if (object.score != null)
                message.score = Number(object.score);
            if (object.roomlist) {
                if (!Array.isArray(object.roomlist))
                    throw TypeError(".msg.ExitRoomRsp.roomlist: array expected");
                message.roomlist = [];
                for (var i = 0; i < object.roomlist.length; ++i) {
                    if (typeof object.roomlist[i] !== "object")
                        throw TypeError(".msg.ExitRoomRsp.roomlist: object expected");
                    message.roomlist[i] = $root.msg.BaseRoomInfo.fromObject(object.roomlist[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ExitRoomRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ExitRoomRsp
         * @static
         * @param {msg.ExitRoomRsp} message ExitRoomRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExitRoomRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.roomlist = [];
            if (options.defaults)
                object.score = 0;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
            if (message.roomlist && message.roomlist.length) {
                object.roomlist = [];
                for (var j = 0; j < message.roomlist.length; ++j)
                    object.roomlist[j] = $root.msg.BaseRoomInfo.toObject(message.roomlist[j], options);
            }
            return object;
        };

        /**
         * Converts this ExitRoomRsp to JSON.
         * @function toJSON
         * @memberof msg.ExitRoomRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExitRoomRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExitRoomRsp;
    })();

    msg.OthersExit = (function() {

        /**
         * Properties of an OthersExit.
         * @memberof msg
         * @interface IOthersExit
         * @property {Array.<string>|null} [list] OthersExit list
         */

        /**
         * Constructs a new OthersExit.
         * @memberof msg
         * @classdesc Represents an OthersExit.
         * @implements IOthersExit
         * @constructor
         * @param {msg.IOthersExit=} [properties] Properties to set
         */
        function OthersExit(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OthersExit list.
         * @member {Array.<string>} list
         * @memberof msg.OthersExit
         * @instance
         */
        OthersExit.prototype.list = $util.emptyArray;

        /**
         * Creates a new OthersExit instance using the specified properties.
         * @function create
         * @memberof msg.OthersExit
         * @static
         * @param {msg.IOthersExit=} [properties] Properties to set
         * @returns {msg.OthersExit} OthersExit instance
         */
        OthersExit.create = function create(properties) {
            return new OthersExit(properties);
        };

        /**
         * Encodes the specified OthersExit message. Does not implicitly {@link msg.OthersExit.verify|verify} messages.
         * @function encode
         * @memberof msg.OthersExit
         * @static
         * @param {msg.IOthersExit} message OthersExit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OthersExit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.list[i]);
            return writer;
        };

        /**
         * Encodes the specified OthersExit message, length delimited. Does not implicitly {@link msg.OthersExit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.OthersExit
         * @static
         * @param {msg.IOthersExit} message OthersExit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OthersExit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OthersExit message from the specified reader or buffer.
         * @function decode
         * @memberof msg.OthersExit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.OthersExit} OthersExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OthersExit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.OthersExit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OthersExit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.OthersExit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.OthersExit} OthersExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OthersExit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OthersExit message.
         * @function verify
         * @memberof msg.OthersExit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OthersExit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i)
                    if (!$util.isString(message.list[i]))
                        return "list: string[] expected";
            }
            return null;
        };

        /**
         * Creates an OthersExit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.OthersExit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.OthersExit} OthersExit
         */
        OthersExit.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.OthersExit)
                return object;
            var message = new $root.msg.OthersExit();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".msg.OthersExit.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i)
                    message.list[i] = String(object.list[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from an OthersExit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.OthersExit
         * @static
         * @param {msg.OthersExit} message OthersExit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OthersExit.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = message.list[j];
            }
            return object;
        };

        /**
         * Converts this OthersExit to JSON.
         * @function toJSON
         * @memberof msg.OthersExit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OthersExit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OthersExit;
    })();

    msg.PlayerBetting = (function() {

        /**
         * Properties of a PlayerBetting.
         * @memberof msg
         * @interface IPlayerBetting
         * @property {msg.IBetInfo|null} [Bet] PlayerBetting Bet
         */

        /**
         * Constructs a new PlayerBetting.
         * @memberof msg
         * @classdesc Represents a PlayerBetting.
         * @implements IPlayerBetting
         * @constructor
         * @param {msg.IPlayerBetting=} [properties] Properties to set
         */
        function PlayerBetting(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBetting Bet.
         * @member {msg.IBetInfo|null|undefined} Bet
         * @memberof msg.PlayerBetting
         * @instance
         */
        PlayerBetting.prototype.Bet = null;

        /**
         * Creates a new PlayerBetting instance using the specified properties.
         * @function create
         * @memberof msg.PlayerBetting
         * @static
         * @param {msg.IPlayerBetting=} [properties] Properties to set
         * @returns {msg.PlayerBetting} PlayerBetting instance
         */
        PlayerBetting.create = function create(properties) {
            return new PlayerBetting(properties);
        };

        /**
         * Encodes the specified PlayerBetting message. Does not implicitly {@link msg.PlayerBetting.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerBetting
         * @static
         * @param {msg.IPlayerBetting} message PlayerBetting message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBetting.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Bet != null && Object.hasOwnProperty.call(message, "Bet"))
                $root.msg.BetInfo.encode(message.Bet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerBetting message, length delimited. Does not implicitly {@link msg.PlayerBetting.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerBetting
         * @static
         * @param {msg.IPlayerBetting} message PlayerBetting message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBetting.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBetting message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerBetting
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerBetting} PlayerBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBetting.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerBetting();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Bet = $root.msg.BetInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBetting message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerBetting
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerBetting} PlayerBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBetting.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBetting message.
         * @function verify
         * @memberof msg.PlayerBetting
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBetting.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Bet != null && message.hasOwnProperty("Bet")) {
                var error = $root.msg.BetInfo.verify(message.Bet);
                if (error)
                    return "Bet." + error;
            }
            return null;
        };

        /**
         * Creates a PlayerBetting message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerBetting
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerBetting} PlayerBetting
         */
        PlayerBetting.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerBetting)
                return object;
            var message = new $root.msg.PlayerBetting();
            if (object.Bet != null) {
                if (typeof object.Bet !== "object")
                    throw TypeError(".msg.PlayerBetting.Bet: object expected");
                message.Bet = $root.msg.BetInfo.fromObject(object.Bet);
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerBetting message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerBetting
         * @static
         * @param {msg.PlayerBetting} message PlayerBetting
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBetting.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Bet = null;
            if (message.Bet != null && message.hasOwnProperty("Bet"))
                object.Bet = $root.msg.BetInfo.toObject(message.Bet, options);
            return object;
        };

        /**
         * Converts this PlayerBetting to JSON.
         * @function toJSON
         * @memberof msg.PlayerBetting
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBetting.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerBetting;
    })();

    msg.PlayerBetted = (function() {

        /**
         * Properties of a PlayerBetted.
         * @memberof msg
         * @interface IPlayerBetted
         * @property {string|null} [PlayerID] PlayerBetted PlayerID
         * @property {msg.IBetInfo|null} [Bet] PlayerBetted Bet
         */

        /**
         * Constructs a new PlayerBetted.
         * @memberof msg
         * @classdesc Represents a PlayerBetted.
         * @implements IPlayerBetted
         * @constructor
         * @param {msg.IPlayerBetted=} [properties] Properties to set
         */
        function PlayerBetted(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBetted PlayerID.
         * @member {string} PlayerID
         * @memberof msg.PlayerBetted
         * @instance
         */
        PlayerBetted.prototype.PlayerID = "";

        /**
         * PlayerBetted Bet.
         * @member {msg.IBetInfo|null|undefined} Bet
         * @memberof msg.PlayerBetted
         * @instance
         */
        PlayerBetted.prototype.Bet = null;

        /**
         * Creates a new PlayerBetted instance using the specified properties.
         * @function create
         * @memberof msg.PlayerBetted
         * @static
         * @param {msg.IPlayerBetted=} [properties] Properties to set
         * @returns {msg.PlayerBetted} PlayerBetted instance
         */
        PlayerBetted.create = function create(properties) {
            return new PlayerBetted(properties);
        };

        /**
         * Encodes the specified PlayerBetted message. Does not implicitly {@link msg.PlayerBetted.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerBetted
         * @static
         * @param {msg.IPlayerBetted} message PlayerBetted message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBetted.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PlayerID != null && Object.hasOwnProperty.call(message, "PlayerID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.PlayerID);
            if (message.Bet != null && Object.hasOwnProperty.call(message, "Bet"))
                $root.msg.BetInfo.encode(message.Bet, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerBetted message, length delimited. Does not implicitly {@link msg.PlayerBetted.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerBetted
         * @static
         * @param {msg.IPlayerBetted} message PlayerBetted message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBetted.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBetted message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerBetted
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerBetted} PlayerBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBetted.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerBetted();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.PlayerID = reader.string();
                    break;
                case 2:
                    message.Bet = $root.msg.BetInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBetted message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerBetted
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerBetted} PlayerBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBetted.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBetted message.
         * @function verify
         * @memberof msg.PlayerBetted
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBetted.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.PlayerID != null && message.hasOwnProperty("PlayerID"))
                if (!$util.isString(message.PlayerID))
                    return "PlayerID: string expected";
            if (message.Bet != null && message.hasOwnProperty("Bet")) {
                var error = $root.msg.BetInfo.verify(message.Bet);
                if (error)
                    return "Bet." + error;
            }
            return null;
        };

        /**
         * Creates a PlayerBetted message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerBetted
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerBetted} PlayerBetted
         */
        PlayerBetted.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerBetted)
                return object;
            var message = new $root.msg.PlayerBetted();
            if (object.PlayerID != null)
                message.PlayerID = String(object.PlayerID);
            if (object.Bet != null) {
                if (typeof object.Bet !== "object")
                    throw TypeError(".msg.PlayerBetted.Bet: object expected");
                message.Bet = $root.msg.BetInfo.fromObject(object.Bet);
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerBetted message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerBetted
         * @static
         * @param {msg.PlayerBetted} message PlayerBetted
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBetted.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.PlayerID = "";
                object.Bet = null;
            }
            if (message.PlayerID != null && message.hasOwnProperty("PlayerID"))
                object.PlayerID = message.PlayerID;
            if (message.Bet != null && message.hasOwnProperty("Bet"))
                object.Bet = $root.msg.BetInfo.toObject(message.Bet, options);
            return object;
        };

        /**
         * Converts this PlayerBetted to JSON.
         * @function toJSON
         * @memberof msg.PlayerBetted
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBetted.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerBetted;
    })();

    msg.PlayerBatchBetting = (function() {

        /**
         * Properties of a PlayerBatchBetting.
         * @memberof msg
         * @interface IPlayerBatchBetting
         * @property {Array.<msg.IBetInfo>|null} [Bets] PlayerBatchBetting Bets
         */

        /**
         * Constructs a new PlayerBatchBetting.
         * @memberof msg
         * @classdesc Represents a PlayerBatchBetting.
         * @implements IPlayerBatchBetting
         * @constructor
         * @param {msg.IPlayerBatchBetting=} [properties] Properties to set
         */
        function PlayerBatchBetting(properties) {
            this.Bets = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBatchBetting Bets.
         * @member {Array.<msg.IBetInfo>} Bets
         * @memberof msg.PlayerBatchBetting
         * @instance
         */
        PlayerBatchBetting.prototype.Bets = $util.emptyArray;

        /**
         * Creates a new PlayerBatchBetting instance using the specified properties.
         * @function create
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {msg.IPlayerBatchBetting=} [properties] Properties to set
         * @returns {msg.PlayerBatchBetting} PlayerBatchBetting instance
         */
        PlayerBatchBetting.create = function create(properties) {
            return new PlayerBatchBetting(properties);
        };

        /**
         * Encodes the specified PlayerBatchBetting message. Does not implicitly {@link msg.PlayerBatchBetting.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {msg.IPlayerBatchBetting} message PlayerBatchBetting message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBatchBetting.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Bets != null && message.Bets.length)
                for (var i = 0; i < message.Bets.length; ++i)
                    $root.msg.BetInfo.encode(message.Bets[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerBatchBetting message, length delimited. Does not implicitly {@link msg.PlayerBatchBetting.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {msg.IPlayerBatchBetting} message PlayerBatchBetting message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBatchBetting.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBatchBetting message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerBatchBetting} PlayerBatchBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBatchBetting.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerBatchBetting();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.Bets && message.Bets.length))
                        message.Bets = [];
                    message.Bets.push($root.msg.BetInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBatchBetting message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerBatchBetting} PlayerBatchBetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBatchBetting.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBatchBetting message.
         * @function verify
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBatchBetting.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Bets != null && message.hasOwnProperty("Bets")) {
                if (!Array.isArray(message.Bets))
                    return "Bets: array expected";
                for (var i = 0; i < message.Bets.length; ++i) {
                    var error = $root.msg.BetInfo.verify(message.Bets[i]);
                    if (error)
                        return "Bets." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerBatchBetting message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerBatchBetting} PlayerBatchBetting
         */
        PlayerBatchBetting.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerBatchBetting)
                return object;
            var message = new $root.msg.PlayerBatchBetting();
            if (object.Bets) {
                if (!Array.isArray(object.Bets))
                    throw TypeError(".msg.PlayerBatchBetting.Bets: array expected");
                message.Bets = [];
                for (var i = 0; i < object.Bets.length; ++i) {
                    if (typeof object.Bets[i] !== "object")
                        throw TypeError(".msg.PlayerBatchBetting.Bets: object expected");
                    message.Bets[i] = $root.msg.BetInfo.fromObject(object.Bets[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerBatchBetting message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerBatchBetting
         * @static
         * @param {msg.PlayerBatchBetting} message PlayerBatchBetting
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBatchBetting.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Bets = [];
            if (message.Bets && message.Bets.length) {
                object.Bets = [];
                for (var j = 0; j < message.Bets.length; ++j)
                    object.Bets[j] = $root.msg.BetInfo.toObject(message.Bets[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerBatchBetting to JSON.
         * @function toJSON
         * @memberof msg.PlayerBatchBetting
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBatchBetting.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerBatchBetting;
    })();

    msg.PlayerBatchBetted = (function() {

        /**
         * Properties of a PlayerBatchBetted.
         * @memberof msg
         * @interface IPlayerBatchBetted
         * @property {string|null} [PlayerID] PlayerBatchBetted PlayerID
         * @property {Array.<msg.IBetInfo>|null} [Bets] PlayerBatchBetted Bets
         */

        /**
         * Constructs a new PlayerBatchBetted.
         * @memberof msg
         * @classdesc Represents a PlayerBatchBetted.
         * @implements IPlayerBatchBetted
         * @constructor
         * @param {msg.IPlayerBatchBetted=} [properties] Properties to set
         */
        function PlayerBatchBetted(properties) {
            this.Bets = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerBatchBetted PlayerID.
         * @member {string} PlayerID
         * @memberof msg.PlayerBatchBetted
         * @instance
         */
        PlayerBatchBetted.prototype.PlayerID = "";

        /**
         * PlayerBatchBetted Bets.
         * @member {Array.<msg.IBetInfo>} Bets
         * @memberof msg.PlayerBatchBetted
         * @instance
         */
        PlayerBatchBetted.prototype.Bets = $util.emptyArray;

        /**
         * Creates a new PlayerBatchBetted instance using the specified properties.
         * @function create
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {msg.IPlayerBatchBetted=} [properties] Properties to set
         * @returns {msg.PlayerBatchBetted} PlayerBatchBetted instance
         */
        PlayerBatchBetted.create = function create(properties) {
            return new PlayerBatchBetted(properties);
        };

        /**
         * Encodes the specified PlayerBatchBetted message. Does not implicitly {@link msg.PlayerBatchBetted.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {msg.IPlayerBatchBetted} message PlayerBatchBetted message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBatchBetted.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PlayerID != null && Object.hasOwnProperty.call(message, "PlayerID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.PlayerID);
            if (message.Bets != null && message.Bets.length)
                for (var i = 0; i < message.Bets.length; ++i)
                    $root.msg.BetInfo.encode(message.Bets[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerBatchBetted message, length delimited. Does not implicitly {@link msg.PlayerBatchBetted.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {msg.IPlayerBatchBetted} message PlayerBatchBetted message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerBatchBetted.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerBatchBetted message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerBatchBetted} PlayerBatchBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBatchBetted.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerBatchBetted();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.PlayerID = reader.string();
                    break;
                case 2:
                    if (!(message.Bets && message.Bets.length))
                        message.Bets = [];
                    message.Bets.push($root.msg.BetInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerBatchBetted message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerBatchBetted} PlayerBatchBetted
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerBatchBetted.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerBatchBetted message.
         * @function verify
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerBatchBetted.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.PlayerID != null && message.hasOwnProperty("PlayerID"))
                if (!$util.isString(message.PlayerID))
                    return "PlayerID: string expected";
            if (message.Bets != null && message.hasOwnProperty("Bets")) {
                if (!Array.isArray(message.Bets))
                    return "Bets: array expected";
                for (var i = 0; i < message.Bets.length; ++i) {
                    var error = $root.msg.BetInfo.verify(message.Bets[i]);
                    if (error)
                        return "Bets." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerBatchBetted message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerBatchBetted} PlayerBatchBetted
         */
        PlayerBatchBetted.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerBatchBetted)
                return object;
            var message = new $root.msg.PlayerBatchBetted();
            if (object.PlayerID != null)
                message.PlayerID = String(object.PlayerID);
            if (object.Bets) {
                if (!Array.isArray(object.Bets))
                    throw TypeError(".msg.PlayerBatchBetted.Bets: array expected");
                message.Bets = [];
                for (var i = 0; i < object.Bets.length; ++i) {
                    if (typeof object.Bets[i] !== "object")
                        throw TypeError(".msg.PlayerBatchBetted.Bets: object expected");
                    message.Bets[i] = $root.msg.BetInfo.fromObject(object.Bets[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerBatchBetted message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerBatchBetted
         * @static
         * @param {msg.PlayerBatchBetted} message PlayerBatchBetted
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerBatchBetted.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Bets = [];
            if (options.defaults)
                object.PlayerID = "";
            if (message.PlayerID != null && message.hasOwnProperty("PlayerID"))
                object.PlayerID = message.PlayerID;
            if (message.Bets && message.Bets.length) {
                object.Bets = [];
                for (var j = 0; j < message.Bets.length; ++j)
                    object.Bets[j] = $root.msg.BetInfo.toObject(message.Bets[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerBatchBetted to JSON.
         * @function toJSON
         * @memberof msg.PlayerBatchBetted
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerBatchBetted.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerBatchBetted;
    })();

    msg.RollNums = (function() {

        /**
         * Properties of a RollNums.
         * @memberof msg
         * @interface IRollNums
         * @property {number|null} [roll1] RollNums roll1
         * @property {number|null} [roll2] RollNums roll2
         */

        /**
         * Constructs a new RollNums.
         * @memberof msg
         * @classdesc Represents a RollNums.
         * @implements IRollNums
         * @constructor
         * @param {msg.IRollNums=} [properties] Properties to set
         */
        function RollNums(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RollNums roll1.
         * @member {number} roll1
         * @memberof msg.RollNums
         * @instance
         */
        RollNums.prototype.roll1 = 0;

        /**
         * RollNums roll2.
         * @member {number} roll2
         * @memberof msg.RollNums
         * @instance
         */
        RollNums.prototype.roll2 = 0;

        /**
         * Creates a new RollNums instance using the specified properties.
         * @function create
         * @memberof msg.RollNums
         * @static
         * @param {msg.IRollNums=} [properties] Properties to set
         * @returns {msg.RollNums} RollNums instance
         */
        RollNums.create = function create(properties) {
            return new RollNums(properties);
        };

        /**
         * Encodes the specified RollNums message. Does not implicitly {@link msg.RollNums.verify|verify} messages.
         * @function encode
         * @memberof msg.RollNums
         * @static
         * @param {msg.IRollNums} message RollNums message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RollNums.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roll1 != null && Object.hasOwnProperty.call(message, "roll1"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.roll1);
            if (message.roll2 != null && Object.hasOwnProperty.call(message, "roll2"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.roll2);
            return writer;
        };

        /**
         * Encodes the specified RollNums message, length delimited. Does not implicitly {@link msg.RollNums.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RollNums
         * @static
         * @param {msg.IRollNums} message RollNums message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RollNums.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RollNums message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RollNums
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RollNums} RollNums
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RollNums.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RollNums();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roll1 = reader.uint32();
                    break;
                case 2:
                    message.roll2 = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RollNums message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RollNums
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RollNums} RollNums
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RollNums.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RollNums message.
         * @function verify
         * @memberof msg.RollNums
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RollNums.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roll1 != null && message.hasOwnProperty("roll1"))
                if (!$util.isInteger(message.roll1))
                    return "roll1: integer expected";
            if (message.roll2 != null && message.hasOwnProperty("roll2"))
                if (!$util.isInteger(message.roll2))
                    return "roll2: integer expected";
            return null;
        };

        /**
         * Creates a RollNums message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RollNums
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RollNums} RollNums
         */
        RollNums.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RollNums)
                return object;
            var message = new $root.msg.RollNums();
            if (object.roll1 != null)
                message.roll1 = object.roll1 >>> 0;
            if (object.roll2 != null)
                message.roll2 = object.roll2 >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RollNums message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RollNums
         * @static
         * @param {msg.RollNums} message RollNums
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RollNums.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roll1 = 0;
                object.roll2 = 0;
            }
            if (message.roll1 != null && message.hasOwnProperty("roll1"))
                object.roll1 = message.roll1;
            if (message.roll2 != null && message.hasOwnProperty("roll2"))
                object.roll2 = message.roll2;
            return object;
        };

        /**
         * Converts this RollNums to JSON.
         * @function toJSON
         * @memberof msg.RollNums
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RollNums.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RollNums;
    })();

    msg.PlayerScore = (function() {

        /**
         * Properties of a PlayerScore.
         * @memberof msg
         * @interface IPlayerScore
         * @property {string|null} [ID] PlayerScore ID
         * @property {number|null} [score] PlayerScore score
         * @property {number|null} [curBet] PlayerScore curBet
         * @property {number|null} [allBet] PlayerScore allBet
         * @property {number|null} [winTime] PlayerScore winTime
         */

        /**
         * Constructs a new PlayerScore.
         * @memberof msg
         * @classdesc Represents a PlayerScore.
         * @implements IPlayerScore
         * @constructor
         * @param {msg.IPlayerScore=} [properties] Properties to set
         */
        function PlayerScore(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerScore ID.
         * @member {string} ID
         * @memberof msg.PlayerScore
         * @instance
         */
        PlayerScore.prototype.ID = "";

        /**
         * PlayerScore score.
         * @member {number} score
         * @memberof msg.PlayerScore
         * @instance
         */
        PlayerScore.prototype.score = 0;

        /**
         * PlayerScore curBet.
         * @member {number} curBet
         * @memberof msg.PlayerScore
         * @instance
         */
        PlayerScore.prototype.curBet = 0;

        /**
         * PlayerScore allBet.
         * @member {number} allBet
         * @memberof msg.PlayerScore
         * @instance
         */
        PlayerScore.prototype.allBet = 0;

        /**
         * PlayerScore winTime.
         * @member {number} winTime
         * @memberof msg.PlayerScore
         * @instance
         */
        PlayerScore.prototype.winTime = 0;

        /**
         * Creates a new PlayerScore instance using the specified properties.
         * @function create
         * @memberof msg.PlayerScore
         * @static
         * @param {msg.IPlayerScore=} [properties] Properties to set
         * @returns {msg.PlayerScore} PlayerScore instance
         */
        PlayerScore.create = function create(properties) {
            return new PlayerScore(properties);
        };

        /**
         * Encodes the specified PlayerScore message. Does not implicitly {@link msg.PlayerScore.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerScore
         * @static
         * @param {msg.IPlayerScore} message PlayerScore message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerScore.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ID);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.score);
            if (message.curBet != null && Object.hasOwnProperty.call(message, "curBet"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.curBet);
            if (message.allBet != null && Object.hasOwnProperty.call(message, "allBet"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.allBet);
            if (message.winTime != null && Object.hasOwnProperty.call(message, "winTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.winTime);
            return writer;
        };

        /**
         * Encodes the specified PlayerScore message, length delimited. Does not implicitly {@link msg.PlayerScore.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerScore
         * @static
         * @param {msg.IPlayerScore} message PlayerScore message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerScore.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerScore message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerScore
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerScore} PlayerScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerScore.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerScore();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ID = reader.string();
                    break;
                case 2:
                    message.score = reader.double();
                    break;
                case 4:
                    message.curBet = reader.uint32();
                    break;
                case 5:
                    message.allBet = reader.uint32();
                    break;
                case 6:
                    message.winTime = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerScore message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerScore
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerScore} PlayerScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerScore.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerScore message.
         * @function verify
         * @memberof msg.PlayerScore
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerScore.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (!$util.isString(message.ID))
                    return "ID: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score !== "number")
                    return "score: number expected";
            if (message.curBet != null && message.hasOwnProperty("curBet"))
                if (!$util.isInteger(message.curBet))
                    return "curBet: integer expected";
            if (message.allBet != null && message.hasOwnProperty("allBet"))
                if (!$util.isInteger(message.allBet))
                    return "allBet: integer expected";
            if (message.winTime != null && message.hasOwnProperty("winTime"))
                if (!$util.isInteger(message.winTime))
                    return "winTime: integer expected";
            return null;
        };

        /**
         * Creates a PlayerScore message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerScore
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerScore} PlayerScore
         */
        PlayerScore.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerScore)
                return object;
            var message = new $root.msg.PlayerScore();
            if (object.ID != null)
                message.ID = String(object.ID);
            if (object.score != null)
                message.score = Number(object.score);
            if (object.curBet != null)
                message.curBet = object.curBet >>> 0;
            if (object.allBet != null)
                message.allBet = object.allBet >>> 0;
            if (object.winTime != null)
                message.winTime = object.winTime >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerScore message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerScore
         * @static
         * @param {msg.PlayerScore} message PlayerScore
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerScore.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ID = "";
                object.score = 0;
                object.curBet = 0;
                object.allBet = 0;
                object.winTime = 0;
            }
            if (message.ID != null && message.hasOwnProperty("ID"))
                object.ID = message.ID;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
            if (message.curBet != null && message.hasOwnProperty("curBet"))
                object.curBet = message.curBet;
            if (message.allBet != null && message.hasOwnProperty("allBet"))
                object.allBet = message.allBet;
            if (message.winTime != null && message.hasOwnProperty("winTime"))
                object.winTime = message.winTime;
            return object;
        };

        /**
         * Converts this PlayerScore to JSON.
         * @function toJSON
         * @memberof msg.PlayerScore
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerScore.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerScore;
    })();

    msg.ClassAreaUni = (function() {

        /**
         * Properties of a ClassAreaUni.
         * @memberof msg
         * @interface IClassAreaUni
         * @property {number|null} [Shun] ClassAreaUni Shun
         * @property {number|null} [Tian] ClassAreaUni Tian
         * @property {number|null} [Di] ClassAreaUni Di
         */

        /**
         * Constructs a new ClassAreaUni.
         * @memberof msg
         * @classdesc Represents a ClassAreaUni.
         * @implements IClassAreaUni
         * @constructor
         * @param {msg.IClassAreaUni=} [properties] Properties to set
         */
        function ClassAreaUni(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClassAreaUni Shun.
         * @member {number} Shun
         * @memberof msg.ClassAreaUni
         * @instance
         */
        ClassAreaUni.prototype.Shun = 0;

        /**
         * ClassAreaUni Tian.
         * @member {number} Tian
         * @memberof msg.ClassAreaUni
         * @instance
         */
        ClassAreaUni.prototype.Tian = 0;

        /**
         * ClassAreaUni Di.
         * @member {number} Di
         * @memberof msg.ClassAreaUni
         * @instance
         */
        ClassAreaUni.prototype.Di = 0;

        /**
         * Creates a new ClassAreaUni instance using the specified properties.
         * @function create
         * @memberof msg.ClassAreaUni
         * @static
         * @param {msg.IClassAreaUni=} [properties] Properties to set
         * @returns {msg.ClassAreaUni} ClassAreaUni instance
         */
        ClassAreaUni.create = function create(properties) {
            return new ClassAreaUni(properties);
        };

        /**
         * Encodes the specified ClassAreaUni message. Does not implicitly {@link msg.ClassAreaUni.verify|verify} messages.
         * @function encode
         * @memberof msg.ClassAreaUni
         * @static
         * @param {msg.IClassAreaUni} message ClassAreaUni message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClassAreaUni.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Shun != null && Object.hasOwnProperty.call(message, "Shun"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Shun);
            if (message.Tian != null && Object.hasOwnProperty.call(message, "Tian"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.Tian);
            if (message.Di != null && Object.hasOwnProperty.call(message, "Di"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.Di);
            return writer;
        };

        /**
         * Encodes the specified ClassAreaUni message, length delimited. Does not implicitly {@link msg.ClassAreaUni.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ClassAreaUni
         * @static
         * @param {msg.IClassAreaUni} message ClassAreaUni message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClassAreaUni.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClassAreaUni message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ClassAreaUni
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ClassAreaUni} ClassAreaUni
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClassAreaUni.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ClassAreaUni();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Shun = reader.uint32();
                    break;
                case 2:
                    message.Tian = reader.uint32();
                    break;
                case 3:
                    message.Di = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClassAreaUni message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ClassAreaUni
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ClassAreaUni} ClassAreaUni
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClassAreaUni.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClassAreaUni message.
         * @function verify
         * @memberof msg.ClassAreaUni
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClassAreaUni.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Shun != null && message.hasOwnProperty("Shun"))
                if (!$util.isInteger(message.Shun))
                    return "Shun: integer expected";
            if (message.Tian != null && message.hasOwnProperty("Tian"))
                if (!$util.isInteger(message.Tian))
                    return "Tian: integer expected";
            if (message.Di != null && message.hasOwnProperty("Di"))
                if (!$util.isInteger(message.Di))
                    return "Di: integer expected";
            return null;
        };

        /**
         * Creates a ClassAreaUni message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ClassAreaUni
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ClassAreaUni} ClassAreaUni
         */
        ClassAreaUni.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ClassAreaUni)
                return object;
            var message = new $root.msg.ClassAreaUni();
            if (object.Shun != null)
                message.Shun = object.Shun >>> 0;
            if (object.Tian != null)
                message.Tian = object.Tian >>> 0;
            if (object.Di != null)
                message.Di = object.Di >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a ClassAreaUni message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ClassAreaUni
         * @static
         * @param {msg.ClassAreaUni} message ClassAreaUni
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClassAreaUni.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Shun = 0;
                object.Tian = 0;
                object.Di = 0;
            }
            if (message.Shun != null && message.hasOwnProperty("Shun"))
                object.Shun = message.Shun;
            if (message.Tian != null && message.hasOwnProperty("Tian"))
                object.Tian = message.Tian;
            if (message.Di != null && message.hasOwnProperty("Di"))
                object.Di = message.Di;
            return object;
        };

        /**
         * Converts this ClassAreaUni to JSON.
         * @function toJSON
         * @memberof msg.ClassAreaUni
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClassAreaUni.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClassAreaUni;
    })();

    msg.RoomSettlement = (function() {

        /**
         * Properties of a RoomSettlement.
         * @memberof msg
         * @interface IRoomSettlement
         * @property {number|null} [Remaining] RoomSettlement Remaining
         * @property {msg.IRollNums|null} [Roll] RoomSettlement Roll
         * @property {msg.ITableCards|null} [Cards] RoomSettlement Cards
         * @property {number|null} [DealerResult] RoomSettlement DealerResult
         * @property {Array.<msg.IPlayerScore>|null} [NewScore] RoomSettlement NewScore
         * @property {msg.IClassAreaUni|null} [BetNum] RoomSettlement BetNum
         */

        /**
         * Constructs a new RoomSettlement.
         * @memberof msg
         * @classdesc Represents a RoomSettlement.
         * @implements IRoomSettlement
         * @constructor
         * @param {msg.IRoomSettlement=} [properties] Properties to set
         */
        function RoomSettlement(properties) {
            this.NewScore = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomSettlement Remaining.
         * @member {number} Remaining
         * @memberof msg.RoomSettlement
         * @instance
         */
        RoomSettlement.prototype.Remaining = 0;

        /**
         * RoomSettlement Roll.
         * @member {msg.IRollNums|null|undefined} Roll
         * @memberof msg.RoomSettlement
         * @instance
         */
        RoomSettlement.prototype.Roll = null;

        /**
         * RoomSettlement Cards.
         * @member {msg.ITableCards|null|undefined} Cards
         * @memberof msg.RoomSettlement
         * @instance
         */
        RoomSettlement.prototype.Cards = null;

        /**
         * RoomSettlement DealerResult.
         * @member {number} DealerResult
         * @memberof msg.RoomSettlement
         * @instance
         */
        RoomSettlement.prototype.DealerResult = 0;

        /**
         * RoomSettlement NewScore.
         * @member {Array.<msg.IPlayerScore>} NewScore
         * @memberof msg.RoomSettlement
         * @instance
         */
        RoomSettlement.prototype.NewScore = $util.emptyArray;

        /**
         * RoomSettlement BetNum.
         * @member {msg.IClassAreaUni|null|undefined} BetNum
         * @memberof msg.RoomSettlement
         * @instance
         */
        RoomSettlement.prototype.BetNum = null;

        /**
         * Creates a new RoomSettlement instance using the specified properties.
         * @function create
         * @memberof msg.RoomSettlement
         * @static
         * @param {msg.IRoomSettlement=} [properties] Properties to set
         * @returns {msg.RoomSettlement} RoomSettlement instance
         */
        RoomSettlement.create = function create(properties) {
            return new RoomSettlement(properties);
        };

        /**
         * Encodes the specified RoomSettlement message. Does not implicitly {@link msg.RoomSettlement.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomSettlement
         * @static
         * @param {msg.IRoomSettlement} message RoomSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomSettlement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Remaining != null && Object.hasOwnProperty.call(message, "Remaining"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Remaining);
            if (message.Roll != null && Object.hasOwnProperty.call(message, "Roll"))
                $root.msg.RollNums.encode(message.Roll, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.Cards != null && Object.hasOwnProperty.call(message, "Cards"))
                $root.msg.TableCards.encode(message.Cards, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.DealerResult != null && Object.hasOwnProperty.call(message, "DealerResult"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.DealerResult);
            if (message.NewScore != null && message.NewScore.length)
                for (var i = 0; i < message.NewScore.length; ++i)
                    $root.msg.PlayerScore.encode(message.NewScore[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.BetNum != null && Object.hasOwnProperty.call(message, "BetNum"))
                $root.msg.ClassAreaUni.encode(message.BetNum, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomSettlement message, length delimited. Does not implicitly {@link msg.RoomSettlement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomSettlement
         * @static
         * @param {msg.IRoomSettlement} message RoomSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomSettlement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomSettlement message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomSettlement} RoomSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomSettlement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomSettlement();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Remaining = reader.uint32();
                    break;
                case 2:
                    message.Roll = $root.msg.RollNums.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.Cards = $root.msg.TableCards.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.DealerResult = reader.double();
                    break;
                case 5:
                    if (!(message.NewScore && message.NewScore.length))
                        message.NewScore = [];
                    message.NewScore.push($root.msg.PlayerScore.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.BetNum = $root.msg.ClassAreaUni.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomSettlement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomSettlement} RoomSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomSettlement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomSettlement message.
         * @function verify
         * @memberof msg.RoomSettlement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomSettlement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                if (!$util.isInteger(message.Remaining))
                    return "Remaining: integer expected";
            if (message.Roll != null && message.hasOwnProperty("Roll")) {
                var error = $root.msg.RollNums.verify(message.Roll);
                if (error)
                    return "Roll." + error;
            }
            if (message.Cards != null && message.hasOwnProperty("Cards")) {
                var error = $root.msg.TableCards.verify(message.Cards);
                if (error)
                    return "Cards." + error;
            }
            if (message.DealerResult != null && message.hasOwnProperty("DealerResult"))
                if (typeof message.DealerResult !== "number")
                    return "DealerResult: number expected";
            if (message.NewScore != null && message.hasOwnProperty("NewScore")) {
                if (!Array.isArray(message.NewScore))
                    return "NewScore: array expected";
                for (var i = 0; i < message.NewScore.length; ++i) {
                    var error = $root.msg.PlayerScore.verify(message.NewScore[i]);
                    if (error)
                        return "NewScore." + error;
                }
            }
            if (message.BetNum != null && message.hasOwnProperty("BetNum")) {
                var error = $root.msg.ClassAreaUni.verify(message.BetNum);
                if (error)
                    return "BetNum." + error;
            }
            return null;
        };

        /**
         * Creates a RoomSettlement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomSettlement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomSettlement} RoomSettlement
         */
        RoomSettlement.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomSettlement)
                return object;
            var message = new $root.msg.RoomSettlement();
            if (object.Remaining != null)
                message.Remaining = object.Remaining >>> 0;
            if (object.Roll != null) {
                if (typeof object.Roll !== "object")
                    throw TypeError(".msg.RoomSettlement.Roll: object expected");
                message.Roll = $root.msg.RollNums.fromObject(object.Roll);
            }
            if (object.Cards != null) {
                if (typeof object.Cards !== "object")
                    throw TypeError(".msg.RoomSettlement.Cards: object expected");
                message.Cards = $root.msg.TableCards.fromObject(object.Cards);
            }
            if (object.DealerResult != null)
                message.DealerResult = Number(object.DealerResult);
            if (object.NewScore) {
                if (!Array.isArray(object.NewScore))
                    throw TypeError(".msg.RoomSettlement.NewScore: array expected");
                message.NewScore = [];
                for (var i = 0; i < object.NewScore.length; ++i) {
                    if (typeof object.NewScore[i] !== "object")
                        throw TypeError(".msg.RoomSettlement.NewScore: object expected");
                    message.NewScore[i] = $root.msg.PlayerScore.fromObject(object.NewScore[i]);
                }
            }
            if (object.BetNum != null) {
                if (typeof object.BetNum !== "object")
                    throw TypeError(".msg.RoomSettlement.BetNum: object expected");
                message.BetNum = $root.msg.ClassAreaUni.fromObject(object.BetNum);
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomSettlement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomSettlement
         * @static
         * @param {msg.RoomSettlement} message RoomSettlement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomSettlement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.NewScore = [];
            if (options.defaults) {
                object.Remaining = 0;
                object.Roll = null;
                object.Cards = null;
                object.DealerResult = 0;
                object.BetNum = null;
            }
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                object.Remaining = message.Remaining;
            if (message.Roll != null && message.hasOwnProperty("Roll"))
                object.Roll = $root.msg.RollNums.toObject(message.Roll, options);
            if (message.Cards != null && message.hasOwnProperty("Cards"))
                object.Cards = $root.msg.TableCards.toObject(message.Cards, options);
            if (message.DealerResult != null && message.hasOwnProperty("DealerResult"))
                object.DealerResult = options.json && !isFinite(message.DealerResult) ? String(message.DealerResult) : message.DealerResult;
            if (message.NewScore && message.NewScore.length) {
                object.NewScore = [];
                for (var j = 0; j < message.NewScore.length; ++j)
                    object.NewScore[j] = $root.msg.PlayerScore.toObject(message.NewScore[j], options);
            }
            if (message.BetNum != null && message.hasOwnProperty("BetNum"))
                object.BetNum = $root.msg.ClassAreaUni.toObject(message.BetNum, options);
            return object;
        };

        /**
         * Converts this RoomSettlement to JSON.
         * @function toJSON
         * @memberof msg.RoomSettlement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomSettlement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomSettlement;
    })();

    msg.RoomStartBet = (function() {

        /**
         * Properties of a RoomStartBet.
         * @memberof msg
         * @interface IRoomStartBet
         * @property {number|null} [Remaining] RoomStartBet Remaining
         */

        /**
         * Constructs a new RoomStartBet.
         * @memberof msg
         * @classdesc Represents a RoomStartBet.
         * @implements IRoomStartBet
         * @constructor
         * @param {msg.IRoomStartBet=} [properties] Properties to set
         */
        function RoomStartBet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomStartBet Remaining.
         * @member {number} Remaining
         * @memberof msg.RoomStartBet
         * @instance
         */
        RoomStartBet.prototype.Remaining = 0;

        /**
         * Creates a new RoomStartBet instance using the specified properties.
         * @function create
         * @memberof msg.RoomStartBet
         * @static
         * @param {msg.IRoomStartBet=} [properties] Properties to set
         * @returns {msg.RoomStartBet} RoomStartBet instance
         */
        RoomStartBet.create = function create(properties) {
            return new RoomStartBet(properties);
        };

        /**
         * Encodes the specified RoomStartBet message. Does not implicitly {@link msg.RoomStartBet.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomStartBet
         * @static
         * @param {msg.IRoomStartBet} message RoomStartBet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomStartBet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Remaining != null && Object.hasOwnProperty.call(message, "Remaining"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Remaining);
            return writer;
        };

        /**
         * Encodes the specified RoomStartBet message, length delimited. Does not implicitly {@link msg.RoomStartBet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomStartBet
         * @static
         * @param {msg.IRoomStartBet} message RoomStartBet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomStartBet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomStartBet message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomStartBet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomStartBet} RoomStartBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomStartBet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomStartBet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Remaining = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomStartBet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomStartBet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomStartBet} RoomStartBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomStartBet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomStartBet message.
         * @function verify
         * @memberof msg.RoomStartBet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomStartBet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                if (!$util.isInteger(message.Remaining))
                    return "Remaining: integer expected";
            return null;
        };

        /**
         * Creates a RoomStartBet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomStartBet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomStartBet} RoomStartBet
         */
        RoomStartBet.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomStartBet)
                return object;
            var message = new $root.msg.RoomStartBet();
            if (object.Remaining != null)
                message.Remaining = object.Remaining >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RoomStartBet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomStartBet
         * @static
         * @param {msg.RoomStartBet} message RoomStartBet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomStartBet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Remaining = 0;
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                object.Remaining = message.Remaining;
            return object;
        };

        /**
         * Converts this RoomStartBet to JSON.
         * @function toJSON
         * @memberof msg.RoomStartBet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomStartBet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomStartBet;
    })();

    msg.ToDealerReq = (function() {

        /**
         * Properties of a ToDealerReq.
         * @memberof msg
         * @interface IToDealerReq
         * @property {number|null} [score] ToDealerReq score
         */

        /**
         * Constructs a new ToDealerReq.
         * @memberof msg
         * @classdesc Represents a ToDealerReq.
         * @implements IToDealerReq
         * @constructor
         * @param {msg.IToDealerReq=} [properties] Properties to set
         */
        function ToDealerReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ToDealerReq score.
         * @member {number} score
         * @memberof msg.ToDealerReq
         * @instance
         */
        ToDealerReq.prototype.score = 0;

        /**
         * Creates a new ToDealerReq instance using the specified properties.
         * @function create
         * @memberof msg.ToDealerReq
         * @static
         * @param {msg.IToDealerReq=} [properties] Properties to set
         * @returns {msg.ToDealerReq} ToDealerReq instance
         */
        ToDealerReq.create = function create(properties) {
            return new ToDealerReq(properties);
        };

        /**
         * Encodes the specified ToDealerReq message. Does not implicitly {@link msg.ToDealerReq.verify|verify} messages.
         * @function encode
         * @memberof msg.ToDealerReq
         * @static
         * @param {msg.IToDealerReq} message ToDealerReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ToDealerReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.score);
            return writer;
        };

        /**
         * Encodes the specified ToDealerReq message, length delimited. Does not implicitly {@link msg.ToDealerReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.ToDealerReq
         * @static
         * @param {msg.IToDealerReq} message ToDealerReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ToDealerReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ToDealerReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.ToDealerReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.ToDealerReq} ToDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ToDealerReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.ToDealerReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.score = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ToDealerReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.ToDealerReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.ToDealerReq} ToDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ToDealerReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ToDealerReq message.
         * @function verify
         * @memberof msg.ToDealerReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ToDealerReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score !== "number")
                    return "score: number expected";
            return null;
        };

        /**
         * Creates a ToDealerReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.ToDealerReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.ToDealerReq} ToDealerReq
         */
        ToDealerReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.ToDealerReq)
                return object;
            var message = new $root.msg.ToDealerReq();
            if (object.score != null)
                message.score = Number(object.score);
            return message;
        };

        /**
         * Creates a plain object from a ToDealerReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.ToDealerReq
         * @static
         * @param {msg.ToDealerReq} message ToDealerReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ToDealerReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.score = 0;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
            return object;
        };

        /**
         * Converts this ToDealerReq to JSON.
         * @function toJSON
         * @memberof msg.ToDealerReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ToDealerReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ToDealerReq;
    })();

    msg.CancelDealerReq = (function() {

        /**
         * Properties of a CancelDealerReq.
         * @memberof msg
         * @interface ICancelDealerReq
         */

        /**
         * Constructs a new CancelDealerReq.
         * @memberof msg
         * @classdesc Represents a CancelDealerReq.
         * @implements ICancelDealerReq
         * @constructor
         * @param {msg.ICancelDealerReq=} [properties] Properties to set
         */
        function CancelDealerReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new CancelDealerReq instance using the specified properties.
         * @function create
         * @memberof msg.CancelDealerReq
         * @static
         * @param {msg.ICancelDealerReq=} [properties] Properties to set
         * @returns {msg.CancelDealerReq} CancelDealerReq instance
         */
        CancelDealerReq.create = function create(properties) {
            return new CancelDealerReq(properties);
        };

        /**
         * Encodes the specified CancelDealerReq message. Does not implicitly {@link msg.CancelDealerReq.verify|verify} messages.
         * @function encode
         * @memberof msg.CancelDealerReq
         * @static
         * @param {msg.ICancelDealerReq} message CancelDealerReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelDealerReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified CancelDealerReq message, length delimited. Does not implicitly {@link msg.CancelDealerReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.CancelDealerReq
         * @static
         * @param {msg.ICancelDealerReq} message CancelDealerReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelDealerReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelDealerReq message from the specified reader or buffer.
         * @function decode
         * @memberof msg.CancelDealerReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.CancelDealerReq} CancelDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelDealerReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.CancelDealerReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CancelDealerReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.CancelDealerReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.CancelDealerReq} CancelDealerReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelDealerReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelDealerReq message.
         * @function verify
         * @memberof msg.CancelDealerReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelDealerReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a CancelDealerReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.CancelDealerReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.CancelDealerReq} CancelDealerReq
         */
        CancelDealerReq.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.CancelDealerReq)
                return object;
            return new $root.msg.CancelDealerReq();
        };

        /**
         * Creates a plain object from a CancelDealerReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.CancelDealerReq
         * @static
         * @param {msg.CancelDealerReq} message CancelDealerReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelDealerReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CancelDealerReq to JSON.
         * @function toJSON
         * @memberof msg.CancelDealerReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelDealerReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CancelDealerReq;
    })();

    msg.BetResult = (function() {

        /**
         * Properties of a BetResult.
         * @memberof msg
         * @interface IBetResult
         * @property {number|null} [Shun] BetResult Shun
         * @property {number|null} [Tian] BetResult Tian
         * @property {number|null} [Di] BetResult Di
         */

        /**
         * Constructs a new BetResult.
         * @memberof msg
         * @classdesc Represents a BetResult.
         * @implements IBetResult
         * @constructor
         * @param {msg.IBetResult=} [properties] Properties to set
         */
        function BetResult(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BetResult Shun.
         * @member {number} Shun
         * @memberof msg.BetResult
         * @instance
         */
        BetResult.prototype.Shun = 0;

        /**
         * BetResult Tian.
         * @member {number} Tian
         * @memberof msg.BetResult
         * @instance
         */
        BetResult.prototype.Tian = 0;

        /**
         * BetResult Di.
         * @member {number} Di
         * @memberof msg.BetResult
         * @instance
         */
        BetResult.prototype.Di = 0;

        /**
         * Creates a new BetResult instance using the specified properties.
         * @function create
         * @memberof msg.BetResult
         * @static
         * @param {msg.IBetResult=} [properties] Properties to set
         * @returns {msg.BetResult} BetResult instance
         */
        BetResult.create = function create(properties) {
            return new BetResult(properties);
        };

        /**
         * Encodes the specified BetResult message. Does not implicitly {@link msg.BetResult.verify|verify} messages.
         * @function encode
         * @memberof msg.BetResult
         * @static
         * @param {msg.IBetResult} message BetResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Shun != null && Object.hasOwnProperty.call(message, "Shun"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.Shun);
            if (message.Tian != null && Object.hasOwnProperty.call(message, "Tian"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.Tian);
            if (message.Di != null && Object.hasOwnProperty.call(message, "Di"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.Di);
            return writer;
        };

        /**
         * Encodes the specified BetResult message, length delimited. Does not implicitly {@link msg.BetResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.BetResult
         * @static
         * @param {msg.IBetResult} message BetResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BetResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BetResult message from the specified reader or buffer.
         * @function decode
         * @memberof msg.BetResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.BetResult} BetResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.BetResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Shun = reader.double();
                    break;
                case 2:
                    message.Tian = reader.double();
                    break;
                case 3:
                    message.Di = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BetResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.BetResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.BetResult} BetResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BetResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BetResult message.
         * @function verify
         * @memberof msg.BetResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BetResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Shun != null && message.hasOwnProperty("Shun"))
                if (typeof message.Shun !== "number")
                    return "Shun: number expected";
            if (message.Tian != null && message.hasOwnProperty("Tian"))
                if (typeof message.Tian !== "number")
                    return "Tian: number expected";
            if (message.Di != null && message.hasOwnProperty("Di"))
                if (typeof message.Di !== "number")
                    return "Di: number expected";
            return null;
        };

        /**
         * Creates a BetResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.BetResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.BetResult} BetResult
         */
        BetResult.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.BetResult)
                return object;
            var message = new $root.msg.BetResult();
            if (object.Shun != null)
                message.Shun = Number(object.Shun);
            if (object.Tian != null)
                message.Tian = Number(object.Tian);
            if (object.Di != null)
                message.Di = Number(object.Di);
            return message;
        };

        /**
         * Creates a plain object from a BetResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.BetResult
         * @static
         * @param {msg.BetResult} message BetResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BetResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Shun = 0;
                object.Tian = 0;
                object.Di = 0;
            }
            if (message.Shun != null && message.hasOwnProperty("Shun"))
                object.Shun = options.json && !isFinite(message.Shun) ? String(message.Shun) : message.Shun;
            if (message.Tian != null && message.hasOwnProperty("Tian"))
                object.Tian = options.json && !isFinite(message.Tian) ? String(message.Tian) : message.Tian;
            if (message.Di != null && message.hasOwnProperty("Di"))
                object.Di = options.json && !isFinite(message.Di) ? String(message.Di) : message.Di;
            return object;
        };

        /**
         * Converts this BetResult to JSON.
         * @function toJSON
         * @memberof msg.BetResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BetResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BetResult;
    })();

    msg.RoomBaseInfoUpdate = (function() {

        /**
         * Properties of a RoomBaseInfoUpdate.
         * @memberof msg
         * @interface IRoomBaseInfoUpdate
         * @property {number|null} [Index] RoomBaseInfoUpdate Index
         * @property {msg.EmRoomState|null} [State] RoomBaseInfoUpdate State
         * @property {number|null} [Remaining] RoomBaseInfoUpdate Remaining
         * @property {msg.IResRec|null} [Result] RoomBaseInfoUpdate Result
         */

        /**
         * Constructs a new RoomBaseInfoUpdate.
         * @memberof msg
         * @classdesc Represents a RoomBaseInfoUpdate.
         * @implements IRoomBaseInfoUpdate
         * @constructor
         * @param {msg.IRoomBaseInfoUpdate=} [properties] Properties to set
         */
        function RoomBaseInfoUpdate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomBaseInfoUpdate Index.
         * @member {number} Index
         * @memberof msg.RoomBaseInfoUpdate
         * @instance
         */
        RoomBaseInfoUpdate.prototype.Index = 0;

        /**
         * RoomBaseInfoUpdate State.
         * @member {msg.EmRoomState} State
         * @memberof msg.RoomBaseInfoUpdate
         * @instance
         */
        RoomBaseInfoUpdate.prototype.State = 0;

        /**
         * RoomBaseInfoUpdate Remaining.
         * @member {number} Remaining
         * @memberof msg.RoomBaseInfoUpdate
         * @instance
         */
        RoomBaseInfoUpdate.prototype.Remaining = 0;

        /**
         * RoomBaseInfoUpdate Result.
         * @member {msg.IResRec|null|undefined} Result
         * @memberof msg.RoomBaseInfoUpdate
         * @instance
         */
        RoomBaseInfoUpdate.prototype.Result = null;

        /**
         * Creates a new RoomBaseInfoUpdate instance using the specified properties.
         * @function create
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {msg.IRoomBaseInfoUpdate=} [properties] Properties to set
         * @returns {msg.RoomBaseInfoUpdate} RoomBaseInfoUpdate instance
         */
        RoomBaseInfoUpdate.create = function create(properties) {
            return new RoomBaseInfoUpdate(properties);
        };

        /**
         * Encodes the specified RoomBaseInfoUpdate message. Does not implicitly {@link msg.RoomBaseInfoUpdate.verify|verify} messages.
         * @function encode
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {msg.IRoomBaseInfoUpdate} message RoomBaseInfoUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomBaseInfoUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Index != null && Object.hasOwnProperty.call(message, "Index"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Index);
            if (message.State != null && Object.hasOwnProperty.call(message, "State"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.State);
            if (message.Remaining != null && Object.hasOwnProperty.call(message, "Remaining"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.Remaining);
            if (message.Result != null && Object.hasOwnProperty.call(message, "Result"))
                $root.msg.ResRec.encode(message.Result, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomBaseInfoUpdate message, length delimited. Does not implicitly {@link msg.RoomBaseInfoUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {msg.IRoomBaseInfoUpdate} message RoomBaseInfoUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomBaseInfoUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomBaseInfoUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.RoomBaseInfoUpdate} RoomBaseInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomBaseInfoUpdate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.RoomBaseInfoUpdate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Index = reader.uint32();
                    break;
                case 2:
                    message.State = reader.int32();
                    break;
                case 3:
                    message.Remaining = reader.uint32();
                    break;
                case 4:
                    message.Result = $root.msg.ResRec.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomBaseInfoUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.RoomBaseInfoUpdate} RoomBaseInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomBaseInfoUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomBaseInfoUpdate message.
         * @function verify
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomBaseInfoUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Index != null && message.hasOwnProperty("Index"))
                if (!$util.isInteger(message.Index))
                    return "Index: integer expected";
            if (message.State != null && message.hasOwnProperty("State"))
                switch (message.State) {
                default:
                    return "State: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                if (!$util.isInteger(message.Remaining))
                    return "Remaining: integer expected";
            if (message.Result != null && message.hasOwnProperty("Result")) {
                var error = $root.msg.ResRec.verify(message.Result);
                if (error)
                    return "Result." + error;
            }
            return null;
        };

        /**
         * Creates a RoomBaseInfoUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.RoomBaseInfoUpdate} RoomBaseInfoUpdate
         */
        RoomBaseInfoUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.RoomBaseInfoUpdate)
                return object;
            var message = new $root.msg.RoomBaseInfoUpdate();
            if (object.Index != null)
                message.Index = object.Index >>> 0;
            switch (object.State) {
            case "emRS_None":
            case 0:
                message.State = 0;
                break;
            case "emRS_Bet":
            case 1:
                message.State = 1;
                break;
            case "emRS_Settlement":
            case 2:
                message.State = 2;
                break;
            }
            if (object.Remaining != null)
                message.Remaining = object.Remaining >>> 0;
            if (object.Result != null) {
                if (typeof object.Result !== "object")
                    throw TypeError(".msg.RoomBaseInfoUpdate.Result: object expected");
                message.Result = $root.msg.ResRec.fromObject(object.Result);
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomBaseInfoUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.RoomBaseInfoUpdate
         * @static
         * @param {msg.RoomBaseInfoUpdate} message RoomBaseInfoUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomBaseInfoUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Index = 0;
                object.State = options.enums === String ? "emRS_None" : 0;
                object.Remaining = 0;
                object.Result = null;
            }
            if (message.Index != null && message.hasOwnProperty("Index"))
                object.Index = message.Index;
            if (message.State != null && message.hasOwnProperty("State"))
                object.State = options.enums === String ? $root.msg.EmRoomState[message.State] : message.State;
            if (message.Remaining != null && message.hasOwnProperty("Remaining"))
                object.Remaining = message.Remaining;
            if (message.Result != null && message.hasOwnProperty("Result"))
                object.Result = $root.msg.ResRec.toObject(message.Result, options);
            return object;
        };

        /**
         * Converts this RoomBaseInfoUpdate to JSON.
         * @function toJSON
         * @memberof msg.RoomBaseInfoUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomBaseInfoUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomBaseInfoUpdate;
    })();

    msg.GameStateQuery = (function() {

        /**
         * Properties of a GameStateQuery.
         * @memberof msg
         * @interface IGameStateQuery
         */

        /**
         * Constructs a new GameStateQuery.
         * @memberof msg
         * @classdesc Represents a GameStateQuery.
         * @implements IGameStateQuery
         * @constructor
         * @param {msg.IGameStateQuery=} [properties] Properties to set
         */
        function GameStateQuery(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GameStateQuery instance using the specified properties.
         * @function create
         * @memberof msg.GameStateQuery
         * @static
         * @param {msg.IGameStateQuery=} [properties] Properties to set
         * @returns {msg.GameStateQuery} GameStateQuery instance
         */
        GameStateQuery.create = function create(properties) {
            return new GameStateQuery(properties);
        };

        /**
         * Encodes the specified GameStateQuery message. Does not implicitly {@link msg.GameStateQuery.verify|verify} messages.
         * @function encode
         * @memberof msg.GameStateQuery
         * @static
         * @param {msg.IGameStateQuery} message GameStateQuery message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStateQuery.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GameStateQuery message, length delimited. Does not implicitly {@link msg.GameStateQuery.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.GameStateQuery
         * @static
         * @param {msg.IGameStateQuery} message GameStateQuery message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStateQuery.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStateQuery message from the specified reader or buffer.
         * @function decode
         * @memberof msg.GameStateQuery
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.GameStateQuery} GameStateQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStateQuery.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.GameStateQuery();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStateQuery message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.GameStateQuery
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.GameStateQuery} GameStateQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStateQuery.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStateQuery message.
         * @function verify
         * @memberof msg.GameStateQuery
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStateQuery.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GameStateQuery message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.GameStateQuery
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.GameStateQuery} GameStateQuery
         */
        GameStateQuery.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.GameStateQuery)
                return object;
            return new $root.msg.GameStateQuery();
        };

        /**
         * Creates a plain object from a GameStateQuery message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.GameStateQuery
         * @static
         * @param {msg.GameStateQuery} message GameStateQuery
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStateQuery.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GameStateQuery to JSON.
         * @function toJSON
         * @memberof msg.GameStateQuery
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStateQuery.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStateQuery;
    })();

    msg.PlayerRoomState = (function() {

        /**
         * Properties of a PlayerRoomState.
         * @memberof msg
         * @interface IPlayerRoomState
         * @property {boolean|null} [InRoom] PlayerRoomState InRoom
         * @property {number|null} [RoomIndex] PlayerRoomState RoomIndex
         */

        /**
         * Constructs a new PlayerRoomState.
         * @memberof msg
         * @classdesc Represents a PlayerRoomState.
         * @implements IPlayerRoomState
         * @constructor
         * @param {msg.IPlayerRoomState=} [properties] Properties to set
         */
        function PlayerRoomState(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerRoomState InRoom.
         * @member {boolean} InRoom
         * @memberof msg.PlayerRoomState
         * @instance
         */
        PlayerRoomState.prototype.InRoom = false;

        /**
         * PlayerRoomState RoomIndex.
         * @member {number} RoomIndex
         * @memberof msg.PlayerRoomState
         * @instance
         */
        PlayerRoomState.prototype.RoomIndex = 0;

        /**
         * Creates a new PlayerRoomState instance using the specified properties.
         * @function create
         * @memberof msg.PlayerRoomState
         * @static
         * @param {msg.IPlayerRoomState=} [properties] Properties to set
         * @returns {msg.PlayerRoomState} PlayerRoomState instance
         */
        PlayerRoomState.create = function create(properties) {
            return new PlayerRoomState(properties);
        };

        /**
         * Encodes the specified PlayerRoomState message. Does not implicitly {@link msg.PlayerRoomState.verify|verify} messages.
         * @function encode
         * @memberof msg.PlayerRoomState
         * @static
         * @param {msg.IPlayerRoomState} message PlayerRoomState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerRoomState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.InRoom != null && Object.hasOwnProperty.call(message, "InRoom"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.InRoom);
            if (message.RoomIndex != null && Object.hasOwnProperty.call(message, "RoomIndex"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.RoomIndex);
            return writer;
        };

        /**
         * Encodes the specified PlayerRoomState message, length delimited. Does not implicitly {@link msg.PlayerRoomState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.PlayerRoomState
         * @static
         * @param {msg.IPlayerRoomState} message PlayerRoomState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerRoomState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerRoomState message from the specified reader or buffer.
         * @function decode
         * @memberof msg.PlayerRoomState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.PlayerRoomState} PlayerRoomState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerRoomState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.PlayerRoomState();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.InRoom = reader.bool();
                    break;
                case 2:
                    message.RoomIndex = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerRoomState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.PlayerRoomState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.PlayerRoomState} PlayerRoomState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerRoomState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerRoomState message.
         * @function verify
         * @memberof msg.PlayerRoomState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerRoomState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.InRoom != null && message.hasOwnProperty("InRoom"))
                if (typeof message.InRoom !== "boolean")
                    return "InRoom: boolean expected";
            if (message.RoomIndex != null && message.hasOwnProperty("RoomIndex"))
                if (!$util.isInteger(message.RoomIndex))
                    return "RoomIndex: integer expected";
            return null;
        };

        /**
         * Creates a PlayerRoomState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.PlayerRoomState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.PlayerRoomState} PlayerRoomState
         */
        PlayerRoomState.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.PlayerRoomState)
                return object;
            var message = new $root.msg.PlayerRoomState();
            if (object.InRoom != null)
                message.InRoom = Boolean(object.InRoom);
            if (object.RoomIndex != null)
                message.RoomIndex = object.RoomIndex >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerRoomState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.PlayerRoomState
         * @static
         * @param {msg.PlayerRoomState} message PlayerRoomState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerRoomState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.InRoom = false;
                object.RoomIndex = 0;
            }
            if (message.InRoom != null && message.hasOwnProperty("InRoom"))
                object.InRoom = message.InRoom;
            if (message.RoomIndex != null && message.hasOwnProperty("RoomIndex"))
                object.RoomIndex = message.RoomIndex;
            return object;
        };

        /**
         * Converts this PlayerRoomState to JSON.
         * @function toJSON
         * @memberof msg.PlayerRoomState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerRoomState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerRoomState;
    })();

    /**
     * EmUniMessageType enum.
     * @name msg.EmUniMessageType
     * @enum {number}
     * @property {number} emUMT_Unknown=0 emUMT_Unknown value
     * @property {number} emUMT_LoginAgain=1 emUMT_LoginAgain value
     * @property {number} emUMT_BeenKicked=2 emUMT_BeenKicked value
     */
    msg.EmUniMessageType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "emUMT_Unknown"] = 0;
        values[valuesById[1] = "emUMT_LoginAgain"] = 1;
        values[valuesById[2] = "emUMT_BeenKicked"] = 2;
        return values;
    })();

    msg.UniMessage = (function() {

        /**
         * Properties of an UniMessage.
         * @memberof msg
         * @interface IUniMessage
         * @property {msg.EmUniMessageType|null} [Code] UniMessage Code
         * @property {string|null} [Message] UniMessage Message
         */

        /**
         * Constructs a new UniMessage.
         * @memberof msg
         * @classdesc Represents an UniMessage.
         * @implements IUniMessage
         * @constructor
         * @param {msg.IUniMessage=} [properties] Properties to set
         */
        function UniMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UniMessage Code.
         * @member {msg.EmUniMessageType} Code
         * @memberof msg.UniMessage
         * @instance
         */
        UniMessage.prototype.Code = 0;

        /**
         * UniMessage Message.
         * @member {string} Message
         * @memberof msg.UniMessage
         * @instance
         */
        UniMessage.prototype.Message = "";

        /**
         * Creates a new UniMessage instance using the specified properties.
         * @function create
         * @memberof msg.UniMessage
         * @static
         * @param {msg.IUniMessage=} [properties] Properties to set
         * @returns {msg.UniMessage} UniMessage instance
         */
        UniMessage.create = function create(properties) {
            return new UniMessage(properties);
        };

        /**
         * Encodes the specified UniMessage message. Does not implicitly {@link msg.UniMessage.verify|verify} messages.
         * @function encode
         * @memberof msg.UniMessage
         * @static
         * @param {msg.IUniMessage} message UniMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UniMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Code != null && Object.hasOwnProperty.call(message, "Code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Code);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified UniMessage message, length delimited. Does not implicitly {@link msg.UniMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.UniMessage
         * @static
         * @param {msg.IUniMessage} message UniMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UniMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UniMessage message from the specified reader or buffer.
         * @function decode
         * @memberof msg.UniMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.UniMessage} UniMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UniMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.UniMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Code = reader.int32();
                    break;
                case 2:
                    message.Message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UniMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.UniMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.UniMessage} UniMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UniMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UniMessage message.
         * @function verify
         * @memberof msg.UniMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UniMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Code != null && message.hasOwnProperty("Code"))
                switch (message.Code) {
                default:
                    return "Code: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates an UniMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof msg.UniMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {msg.UniMessage} UniMessage
         */
        UniMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.msg.UniMessage)
                return object;
            var message = new $root.msg.UniMessage();
            switch (object.Code) {
            case "emUMT_Unknown":
            case 0:
                message.Code = 0;
                break;
            case "emUMT_LoginAgain":
            case 1:
                message.Code = 1;
                break;
            case "emUMT_BeenKicked":
            case 2:
                message.Code = 2;
                break;
            }
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from an UniMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof msg.UniMessage
         * @static
         * @param {msg.UniMessage} message UniMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UniMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Code = options.enums === String ? "emUMT_Unknown" : 0;
                object.Message = "";
            }
            if (message.Code != null && message.hasOwnProperty("Code"))
                object.Code = options.enums === String ? $root.msg.EmUniMessageType[message.Code] : message.Code;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this UniMessage to JSON.
         * @function toJSON
         * @memberof msg.UniMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UniMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UniMessage;
    })();

    return msg;
})();

module.exports = $root;
