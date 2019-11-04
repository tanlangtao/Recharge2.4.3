/*
 * @Author: burt
 * @Date: 2019-08-02 11:27:29
 * @LastEditors: burt
 * @LastEditTime: 2019-10-22 15:19:24
 * @Description: base64
 */

let hqqBase64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /**
     * 将base64解码 public method for encoding 
     * @param {input} 
     * @return: 
     */
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    /**
     * 将字符串转码为base64格式 public method for decoding
     * @param {type} 
     * @return: 
     */
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        let string = "";
        let i = 0;
        let c, c1, c2, c3;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },

    // base64abc: function () {
    //     let abc = [],
    //         A = "A".charCodeAt(0),
    //         a = "a".charCodeAt(0),
    //         n = "0".charCodeAt(0);
    //     for (let i = 0; i < 26; ++i) {
    //         abc.push(String.fromCharCode(A + i));
    //     }
    //     for (let i = 0; i < 26; ++i) {
    //         abc.push(String.fromCharCode(a + i));
    //     }
    //     for (let i = 0; i < 10; ++i) {
    //         abc.push(String.fromCharCode(n + i));
    //     }
    //     abc.push("+");
    //     abc.push("/");
    //     return abc;
    // },

    // bytesToBase64: function (bytes) {
    //     let result = '', i, l = bytes.length;
    //     for (i = 2; i < l; i += 3) {
    //         result += this.base64abc[bytes[i - 2] >> 2];
    //         result += this.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    //         result += this.base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
    //         result += this.base64abc[bytes[i] & 0x3F];
    //     }
    //     if (i === l + 1) { // 1 octet missing
    //         result += this.base64abc[bytes[i - 2] >> 2];
    //         result += this.base64abc[(bytes[i - 2] & 0x03) << 4];
    //         result += "==";
    //     }
    //     if (i === l) { // 2 octets missing
    //         result += this.base64abc[bytes[i - 2] >> 2];
    //         result += this.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    //         result += this.base64abc[(bytes[i - 1] & 0x0F) << 2];
    //         result += "=";
    //     }
    //     return result;
    // },

    // // All solutions at MDN only provide a way to encode a native JS string to UTF-16 base64 string.
    // // Here, you can apply any encoding supported by TextEncoder.
    // base64utf8encode: function (str) {
    //     return bytesToBase64(this.utf8encoder.encode(str));
    // }
}
// hqqBase64.utf8encoder = new TextEncoder();

module.exports = hqqBase64;