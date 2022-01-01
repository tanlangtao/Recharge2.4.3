/*
 * @Author: burt
 * @Date: 2020-10-27 14:12:04
 * @LastEditors: burt
 * @LastEditTime: 2020-12-25 22:53:37
 * @Description:
 */
const Fs = require('fs');
const Path = require('path');
// const Os = require('os')

let huanjin = "online"
let pinpai = "test"
let upGameList = []
let curPath = Path.resolve('./');
let jsonConfigPath = curPath + '/version.json'
let versionTempPath = curPath + '/versiontemp.txt'
let hall_version = "1.0.0"

let parseArguments = function () {
    let i = 2;
    while (i < process.argv.length) {
        let arg = process.argv[i];
        switch (arg) {
            case '--game':
            case '-g':
                let game = process.argv[i + 1];
                upGameList.push(game)
                i += 2;
                break;
            case '--huanjin':
            case '-h':
                huanjin = process.argv[i + 1];
                i += 2;
                break;
            case '--pinpai':
            case '-p':
                pinpai = process.argv[i + 1];
                i += 2;
                break;
            case '-hv':
                hall_version = process.argv[i + 1];
                i += 2;
                break;
            default:
                i++;
                break;
        }
    }
    changeVersion()
}
// 修改版本文件中的内容
var changeVersion = function () {
    let changefunc = (jsonConfig) => {
        let config = jsonConfig.version
        if (!config) {
            throw 'config is nothing'
        }
        let changeFile = "pinpai:" + pinpai + "; huanjin:" + huanjin + "; \n"
        if (upGameList.length > 0) {
            for (let i = 0; i < upGameList.length; i++) {
                if (config[upGameList[i]]) {
                    let vList = config[upGameList[i]].split(".")
                    let num = parseInt(vList[2]) + 1
                    let verstr = vList[0] + "." + vList[1] + "." + num
                    config[upGameList[i]] = verstr
                    changeFile += upGameList[i] + ":" + verstr + ";\n"
                    if (upGameList[i] == 'hall') {
                        hall_version = verstr
                    }
                } else {
                    changeFile += upGameList[i] + ";\n"
                }
            }
            jsonConfig.version = config
            Fs.writeFile(versionTempPath, changeFile, 'utf8', function (err) {
                if (err) {
                    throw err
                } else {
                    Fs.writeFile(jsonConfigPath, JSON.stringify(jsonConfig), 'utf8', function (err) {
                        if (err) {
                            throw err
                        } else {

                        }
                    });
                }
            });
        } else {
            throw 'upGameList must have something'
        }
    }
    if (Fs.existsSync(jsonConfigPath)) {
        Fs.readFile(jsonConfigPath, 'utf8', function (err, files) {
            if (err) {
                throw err
            } else {
                let jsonConfig = JSON.parse(files)
                changefunc(jsonConfig)
            }
        })
    } else {
        throw "不存在version.json文件"
    }
}
parseArguments()