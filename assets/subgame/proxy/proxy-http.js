let gHandler = require("gHandler");
var Database = require("Database");
let md5 = require('./md5-node/index');
const { first_date } = require("./Database");
let commonVal = {
    account_name: "",
    token: "",
    package_id: "",
    balance: "",
    ids: [],
    gametags: '1',
    page: 1,
    // 1. 接口 user/createDividendRule   
    createDividendRule() {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/createDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //     URL http://161.117.178.174:12350/proxy/user/createDividendRule
        //     METHOD POST
        //     CONTEXT - TYPE application / x - www - form - urlencoded
        //     PARAMS {
        //       account_name 用户ID
        //       token 密匙
        //       child_id 下级ID
        //       type 分红类型(1.流失 2.亏损)
        //       game_tag 游戏分类
        //       demand_type 统计类型(1.流失 2.亏损)
        //       demand_tag 统计类型方式(1.当前游戏分类 2.所有游戏分类)
        //       amount 统计金额要求
        //       percent 分红比例
        //     }

        // child_id ：  你可以使用  564929217,  845605930,  这两个
        // type 分红类型(1.流失 2.亏损)   随你设置,  设置后不能修改
        //game_tag 游戏分类1  棋牌类型游戏 2. 彩票类型游戏 3. 体育类型游戏   4. 视讯类型游戏
        //amount 统计金额要求         30000        
        //percent 分红比例                  30


        //本地测试
        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&child_id=526136062&type=1&game_tag=1&demand_type=1&demand_tag=2&amount=30000&percent=30`;


        cc.log("/proxy/user/createDividendRule请求:", sendData);

        xhr_test.send(sendData);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);

                cc.log("/proxy/user/createDividendRule返回", resData);
            }
            xhr_test.abort();
        };
    },
    // //2 接口2  .setDividendRule  
    setDividendRule() {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/setDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // { 
        // account_name 用户ID        
        // token 密匙        
        // rule_id 规则ID(规则的_id字段)        
        // amount 统计金额要求        
        // percent 分红比例 }  

        var sendData = `account_name=${gHandler.gameGlobal.player.account_name
            }&token=${commonVal.token}&rule_id=2&amount=30000&percent=30`;

        cc.log('sendData', sendData);
        cc.log("/proxy/user/setDividendRule请求:", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/setDividendRule返回", resData);
            }
            xhr_test.abort();
        };
    },
    // // 3. 接口 getDividendRule 
    getDividendRule(poxy_id, a) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID - 
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选  &game_tag=${commonVal.gametags}
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}`, true);
        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                if (resData.msg != null) {
                    Database.Allrule = resData.msg;

                    for (let i = 0; i < resData.msg.length; i++) {
                        if (resData.msg[i].demand_type == 1) {
                            Database.game_tag.push(resData.msg[i].game_tag)
                        }

                    }
                    Database.game_tag = Database.unique(Database.game_tag)//去重
                    a(resData.msg)
                }

                cc.log("http 公用方法返回getDividendRule返回", resData, Database.game_tag);


            }
            xhr_test.abort();
        };
    },
    // //4 接口 // 获取流水分红信息 GetStatementDividendInfo
    GetStatementDividendInfo(game_num, token, first_date, last_date, a) {

        //  URL http: //161.117.178.174:12350/proxy/user/GetStatementDividendInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      game_tag 游戏分类
        //      first_date 开始时间(2020-05-18)
        //      last_date 结束时间
        //  }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetStatementDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${token}&game_tag=${game_num}&first_date=${first_date}&last_date=${last_date}`, true);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status == 200) {

                var resData = JSON.parse(xhr_test.responseText);
                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg)
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }
                cc.log("p4 /proxy/user/GetStatementDividendInfo返回", resData);
                Database.formatData1(resData.msg);
                a();

            }
            xhr_test.abort();
        }

    },
    //5 接口 // 获取亏损分红信息 GetDeficitDividendInfo
    GetDeficitDividendInfo(game_num, first_date, last_date, a) {
        //  URL http: //161.117.178.174:12350/proxy/user/GetDeficitDividendInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      game_tag 游戏分类
        //      first_date 开始时间(2020 - 05 - 18)
        //      last_date 结束时间
        //  }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetDeficitDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=${game_num}&first_date=${first_date}&last_date=${last_date}`, true);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/GetDeficitDividendInfo返回", resData);
                Database.formatData2(resData.msg)
                a()
            }
            xhr_test.abort();
        };
    },
    //6 接口 // 获取亏损分红信息 GetDeficitDividendInfo
    GetPaymentDividendInfo(game_num, first_date, last_date, a) {
        //  URL http: //161.117.178.174:12350/proxy/user/GetPaymentDividendInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      game_tag 游戏分类
        //      first_date 开始时间(2020 - 05 - 18)
        //      last_date 结束时间
        //  }
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetPaymentDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=0&first_date=${first_date}&last_date=${last_date}`, true);

        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/GetPaymentDividendInfo返回", resData);
                Database.formatData3(resData.msg)
                a()
            }
            xhr_test.abort();
        };
    },
    getchild(id, a) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let token = commonVal.token;
        let page = 1;
        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${page}&limit=30&token=${token}`;
        cc.log('得到下级', url);
        var xhr = new XMLHttpRequest(); //readyState===0
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {
                    cc.log("getchild 返回内容", res);

                    if (res.msg) {
                        Database.xjdlmx = res.msg
                    } else {
                        Database.xjdlmx = []
                    }

                    a()

                }

            }
            xhr.abort();
        };
        xhr.open("GET", url, true);
        xhr.send();
    },

    // // 6. 接口 getDividendRule  只为获得 规则
    getDividendRuleonetype(game_tag, typen, a) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID - 
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选  &game_tag=${commonVal.gametags}
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&type=${typen}&game_tag=${game_tag}`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                if (resData.msg != null) {
                    a(resData.msg)
                    if (resData.msg != []) {
                        Database.yf_demand_tag = resData.msg[0].demand_tag
                        Database.yf_demand_type = resData.msg[0].demand_type

                    }
                }
                cc.log("用方法返回getDividendRule返回 傻傻的 参数", resData, Database.yf_demand_tag, Database.yf_demand_type);



            }
            xhr_test.abort();
        };
    },
    getallchilds(id) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let token = commonVal.token;

        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${this.page}&limit=30&token=${token}`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {
                    this.page++;

                    if (res.msg != null) {
                        for (let i = 0; i < res.msg.length; i++) {
                            Database.xjdlmxs.push(res.msg[i]);
                        }
                        if (res.msg.length == 30) {
                            this.getallchilds(id)
                        }
                    }

                }

            }


        };
        xhr.open("GET", url, true);

        xhr.send();
    },
    getchilder(id, a) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let page = 1;
        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${page}&limit=30&token=${commonVal.token}&proxy_user_id=${id}`;
        cc.log('得到下级', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {
                    cc.log("getchild 返回内容", res);

                    if (res.msg) {
                        Database.xjdlmx = res.msg
                    } else {
                        Database.xjdlmx = []
                    }

                    a()

                }

            }
            xhr.abort();
        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    getallchilds9(id, a, page) { //得到下级
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;


        const url = host +
            `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&page=${page}&limit=24&token=${commonVal.token}`;

        console.log('getallchilds9 次数', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {

                    cc.log("getalllchild9 返回内容", this.page, res);

                    if (res.msg != null) {

                        Database.page9_wjmx = res.msg;

                        a()

                    }

                }

            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    getProxyUserNumber(ids, a) { //得到下级团队人数
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        //http://proxy.lymrmfyp.com/proxy/User/GetProxyUserNumber?account_name=375087785&ids=%5B622106574,643129297%5D&token=d26a4fcc9c15354a1a9227ab32e9b2bc
        const url = host +
            `/Proxy/User/GetProxyUserNumber?ids=[${ids}]&account_name=${account_name}&token=${commonVal.token}`;
        cc.log('GetProxyUserNumber', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {

                    cc.log("GetProxyUserNumber 返回内容", res.msg);

                    if (res.msg != null) {
                        cc.log(Database.page9_wjmx, '======Database.page9_wjmx');
                        for (let index = 0; index < res.msg.length; index++) {
                            for (let i = 0; i < Database.page9_wjmx.length; i++) {
                                if (Database.page9_wjmx[i].id == res.msg[index].id) {
                                    Database.page9_wjmx[i].count = res.msg[index].count
                                }

                            }

                        }

                    }
                    a()

                }

            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    //查询下级的查询保底分成规则
    Center_GetBaseDividendRule(id, a) {


        let host = gHandler.gameGlobal.proxy.proxy_host;
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`, true);

        cc.log(host + `/proxy/user/GetBaseDividendRule?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}`);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);

                //得到数据渲染
                if (resData.msg == null) {
                    if (gHandler.app.pinpai == 'xinlong') {
                        Database.page9_aumont = '60'
                    } else if (gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding') {
                        //默认100
                        Database.page9_aumont = '100'
                    } else {
                        //默认80 
                        Database.page9_aumont = '80'
                    }

                } else {
                    Database.page9_aumont = '' + resData.msg.income
                }
                cc.log('Database.page9_aumont===', Database.page9_aumont);
                a()
            }
            xhr_test.abort();
        };

    },
    //查询自己的查询保底分成规则 无限代保底分红
    GetBaseDividendRule(a) {

        // http://proxy.lymrmfyp.com/proxy/User/GetBaseDividendRule?token=3dbcddb1bc40623a0370ca87a64b5f96&account_name=750086613
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}`, true);
        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/GetBaseDividendRule返回", resData);

                if (resData.msg == null) {
                    if (gHandler.app.pinpai == 'xinlong') {
                        Database.page9_plaumont = '60元。'
                    } else if (gHandler.app.pinpai == 'huangshi' || gHandler.app.pinpai == 'juding') {
                        Database.page9_plaumont = '100元。'
                    } else {
                        Database.page9_plaumont = '80元。'
                    }


                } else {
                    Database.page9_plaumont = resData.msg.income + '元.'

                }

                a();
            }
            xhr_test.abort();
        };



    },
    //查询自己的查询保底分成规则
    c_GetBaseDividendRule(a) {

        // http://proxy.lymrmfyp.com/proxy/User/GetBaseDividendRule?token=3dbcddb1bc40623a0370ca87a64b5f96&account_name=750086613
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}`, true);
        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/c_GetBaseDividendRule返回", resData);

                if (resData.msg == null) {
                    if (gHandler.app.pinpai == 'xinlong') {
                        Database.page9_gz_plaumont = 60
                    } else if (gHandler.app.pinpai == 'huangshi') {
                        Database.page9_gz_plaumont = 100
                    } else {
                        Database.page9_gz_plaumont = 80
                    }

                } else {

                    Database.page9_gz_plaumont = resData.msg.income
                }

                a();
            }
            xhr_test.abort();
        };



    },
    SetBaseDividendRule(ids, money, a) {
        // http://proxy.lymrmfyp.com/proxy/User/SetBaseDividendRule
        // account_name = 917942181  //当前玩家ID
        // token =        //当前玩家token
        // child_id =    //直属玩家ID
        // income =    //每万 多少元


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/SetBaseDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&child_id=${ids}&income=${money}`;




        xhr_test.send(sendData);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("SetBaseDividendRule返回", resData);
                if (resData.status == "SUCCESS") {
                    Database.page9_aumont = money;
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置成功')
                } else {
                    if (resData.msg.indexOf('income between') == -1) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间, 设置失败')
                    } else {
                        cc.log('报错了');
                        let txt = resData.msg
                        cc.log(txt);
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                    }

                }


                a();
            }
            xhr_test.abort();
        };
    },
    //page10 获取保底分红发放详情
    GetBaseDividendInfo(first, last, a) {
        cc.log('first===', first, 'last===', last);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendInfo?account_name=${gHandler.gameGlobal.player.account_name}&first_date=${first}&last_date=${last}&token=${commonVal.token}`, true);




        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                // //得到数据渲染

                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg) //检索提示
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)//发起提示
                }
                cc.log("p10       /proxy/user/GetBaseDividendInfo", resData);
                Database.formatData10(resData.msg);
                a();
            }
            xhr_test.abort();
        };

    },
    //p10 获取直属玩家业绩接口
    GetGameUserInductions(ids, ic, ends, end_time, a) {
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400

        //改为 GetGameUserInductionsSortByGameTag 接口
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        if (gHandler.app.pinpai == 'xinlong') {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1]`, true);
        } else {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        }



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p10   /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;

                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }

                    for (let s = 0; s < Database.data10.length; s++) {

                        if (Database.data10[s].date == end_time) {

                            Database.data10[s].zswjyj = zswj
                        }


                    }

                } else {
                    cc.log('没有值', end_time);
                }

                a();


            }
            xhr_test.abort();
        };

    },

    //p10 xj 获取下级某个直属玩家业绩接口
    p10_GetGameUserInductions(ids, end_time, a) {
        console.log('p10 xj 获取下级某个直属玩家业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        if (gHandler.app.pinpai == 'xinlong') {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1]`, true);
        } else if (gHandler.app.pinpai == 'juding' || gHandler.app.pinpai == 'huaxing') {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${Database.p10_num}]`, true);

        } else {
            xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        }


        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                // cc.log("p10 下级脚本 /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    for (let s = 0; s < Database.wxd.length; s++) {
                        // console.log('请求数据 ids===',ids);
                        if (Database.wxd[s].id == ids && Database.wxd[s].date == end_time) {

                            Database.wxd[s].zswjyj = zswj
                        }

                    }
                } else {
                    cc.log('没有值', end_time);
                    for (let s = 0; s < Database.wxd.length; s++) {
                        if (Database.wxd[s].id == ids && Database.wxd[s].date == end_time) {

                            Database.wxd[s].zswjyj = 0
                        }

                    }
                }

                a();
            }

            xhr_test.abort();
        };

    },
    //p6富鑫得到 我的比例用于比较
    p6sgetDividendRule() {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID -  
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=0&type=3`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/getDividendRule返回   p6自己比例", resData);
                //得到数据渲染
                Database.p6_fx_percent = parseInt(resData.msg[0].percent);
            }
            xhr_test.abort();
        };
    },
    //p1 新规则查询7日详情
    GetProxyUserLinkBet(start, end, a) {
        Database.p1_seven_info = {} //重置
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserLinkBet?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`, true);
        xhr_test.send();

        cc.log("查询7日链接", host + `/proxy/user/GetProxyUserLinkBet?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`);
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p1      /proxy/user/GetProxyUserLinkBet返回", resData);
                Database.p1_seven_info = resData.msg

                a();
            }
            xhr_test.abort();
        };



    },
    //新隆7日查询接口
    GetProxyUserLinkstatement(start, end, a) {
        Database.p1_seven_info = {} //重置
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserLinkstatement?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`, true);
        xhr_test.send();

        cc.log("查询7日链接", host + `/proxy/user/GetProxyUserLinkstatement?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&start_time=${start}&end_time=${end}`);
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p1      /proxy/user/GetProxyUserLinkstatement返回", resData);
                Database.p1_seven_info = resData.msg

                a();
            }
            xhr_test.abort();
        };
    },
    //p12  查询玩家分红数据总额
    GetPaymentInfo(first_date, last_date, a) {

        //  URL http: //161.117.178.174:12350/proxy/user/GetPaymentInfo
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      first_date 开始时间(2020-05-18)
        //      last_date 结束时间
        //  }
        let end = Database.getUnixtimestamp0(last_date)
        let start = Database.getUnixtimestamp0(first_date);
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetPaymentInfo?id=${gHandler.gameGlobal.player.account_name}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&start_time=${start}&end_time=${end}`, true);
        console.log(first_date, last_date);

        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status == 200) {

                var resData = JSON.parse(xhr_test.responseText);
                // if (resData.code == 404) {
                //     let txt = Database.Switchtext(resData.msg)
                //     cc.log(txt);
                //     gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                // }
                commonVal.p12_data = resData.msg;
                cc.log("p12 /proxy/user/GetPaymentInfo返回", commonVal.p12_data);
                if (commonVal.p12_data != null) {
                    //根据日期进行排序
                    commonVal.p12_data.sort(function (a, b) {
                        a = new Date(a.date);
                        b = new Date(b.date);
                        return a > b ? -1 : a < b ? 1 : 0;
                    });
                }


                //Database.formatData1(resData.msg);
                a();

            }
            xhr_test.abort();
        }

    },
    //p12 子页面 查询玩家分红数据总额
    GetPaymentInfoDetail(date, a) {

        //  URL http: //161.117.178.174:12350/proxy/user/GetPaymentInfoDetail
        //  METHOD GET
        //  PARAMS {
        //      account_name 用户ID
        //      token 密匙
        //      date  时间
        //  }

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetPaymentInfoDetail?id=${gHandler.gameGlobal.player.account_name}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&date=${date}`, true);
        console.log(host + `/proxy/user/GetPaymentInfoDetail?id=${gHandler.gameGlobal.player.account_name}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&date=${date}`);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status == 200) {

                var resData = JSON.parse(xhr_test.responseText);
                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg)
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                }
                console.log('p12 GetPaymentInfoDetail', resData);
                commonVal.p12_view_data = resData.msg;

                cc.log("p12 /proxy/user/GetPaymentInfoDetail?", commonVal.p12_view_data);
                a();

            }
            xhr_test.abort();
        }

    },
    SaveEmailDetail(ID, num) {

        //user_id:              //  下级ID

        //title:                  //  账户内互转

        //content:                    //亲爱的玩家，您收到上级转入 ****（金额）金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //范例:  亲爱的玩家，您收到上级转入 100.00 金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //金额  就是  转账金额

        //action:add               固定
        //pass = md5(user_id + token)
        let content = "亲爱的玩家，您收到上级转入" + num + "金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！"
        let tok = "e40f01afbb1b9ae3dd6747ced5bca532"
        let pass = md5(ID + "e40f01afbb1b9ae3dd6747ced5bca532")
        let host = gHandler.gameGlobal.pay.pay_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/api/backend/SaveEmailDetail", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `user_id=${ID}&title=${"账户内互转"}&content=${content}&action=add&token=${tok}&pass=${pass}`;
        console.log('save sendData=', sendData);

        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("SaveMoneyFlowDetail返回", resData);

                if (resData.msg == "操作成功") {

                    cc.log('resData.msg===', resData);



                    console.log('邮件发送成功');
                } else {
                    console.log('邮件发送失败 resData.msg===', resData);

                }




            }
            xhr_test.abort();
        };

    },
    p1_SaveEmailDetail(ID, num) {

        //user_id:              //  下级ID

        //title:                  //  账户内互转

        //content:                    //亲爱的玩家，您收到上级转入 ****（金额）金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //范例:  亲爱的玩家，您收到上级转入 100.00 金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！

        //金额  就是  转账金额

        //action:add               固定
        let content = "亲爱的玩家，您收到佣金收益" + num + "金币已到账，请前往全民代理-月入百万界面领取。祝您游戏愉快，多多盈利！"
        let tok = "e40f01afbb1b9ae3dd6747ced5bca532"
        let host = gHandler.gameGlobal.pay.pay_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/api/backend/SaveEmailDetail", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `user_id=${ID}&title=${"佣金收益"}&content=${content}&action=add&token=${tok}&center_auth=${gHandler.gameGlobal.token}`;
        console.log('p1 save sendData=', sendData);

        cc.log(host + "/api/backend/SaveEmailDetail  佣金领取：", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("SaveMoneyFlowDetail返回", resData);

                if (resData.msg == "操作成功") {

                    cc.log('resData.msg===', resData);



                    console.log('邮件发送成功');
                } else {
                    console.log('邮件发送失败 resData.msg===', resData);

                }




            }
            xhr_test.abort();
        };

    },
    //查询自己的查询保底分成规则 无限代保底分红
    jd_p9_GetBaseDividendRule(num, a) {

        // http://proxy.lymrmfyp.com/proxy/User/GetBaseDividendRule?token=3dbcddb1bc40623a0370ca87a64b5f96&account_name=750086613
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule1?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=${num}`, true);
        xhr_test.send();
        console.log("GET", host + `/proxy/user/GetBaseDividendRule1?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=${num}`);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/jd_GetBaseDividendRule1返回", resData);
                if (num == 1) {
                    if (resData.msg == null) {
                        if (gHandler.app.pinpai == 'juding') {
                            Database.p9_qp_aumont = '100元。'
                        }
                        if (gHandler.app.pinpai == 'huaxing') {
                            Database.p9_qp_aumont = '160元。'
                        }

                    } else {
                        Database.p9_qp_aumont = resData.msg.income + '元.'

                    }
                    console.log('Database.p9_qp_aumont=', Database.p9_qp_aumont);
                }
                if (num == 5) {
                    if (resData.msg == null) {
                        if (gHandler.app.pinpai == 'juding') {
                            Database.p9_dz_aumont = '100元。'
                        }
                        if (gHandler.app.pinpai == 'huaxing') {
                            Database.p9_dz_aumont = '80元。'
                        }


                    } else {
                        Database.p9_dz_aumont = resData.msg.income + '元.'

                    }
                    console.log('Database.p9_dz_aumont=', Database.p9_dz_aumont);
                }

                a();
            }
            xhr_test.abort();
        };



    },
    //查询下级的查询保底分成规则
    JD_Center_GetBaseDividendRule(id, num, a) {


        let host = gHandler.gameGlobal.proxy.proxy_host;
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendRule1?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=${num}`, true);

        cc.log(host + `/proxy/user/GetBaseDividendRule1?id=${id}&account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&game_tag=${num}`);


        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                if (resData.msg == null) {

                    //默认100
                    Database.page9_aumont = '100'
                    if (num == 1 && gHandler.app.pinpai == 'huaxing') {
                        Database.page9_aumont = '160'
                    }
                    if (num == 5 && gHandler.app.pinpai == 'huaxing') {
                        Database.page9_aumont = '80'
                    }

                } else {
                    Database.page9_aumont = '' + resData.msg.income
                }
                if (Database.page9_aumont == "undefined") {
                    Database.page9_aumont = '-'
                }
                cc.log('下级  Database.page9_aumont===', Database.page9_aumont);
                a()
            }
            xhr_test.abort();
        };

    },
    jd_SetBaseDividendRule(ids, money, num, a) {
        // http://proxy.lymrmfyp.com/proxy/User/SetBaseDividendRule
        // account_name = 917942181  //当前玩家ID
        // token =        //当前玩家token
        // child_id =    //直属玩家ID
        // income =    //每万 多少元


        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/SetBaseDividendRule1", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        var sendData = `account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&child_id=${ids}&income=${money}&game_tag=${num}`;

        console.log(`jd_SetBaseDividendRule返回 account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&child_id=${ids}&income=${money}&game_tag=${num}`);


        xhr_test.send(sendData);

        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("jd_SetBaseDividendRule返回", resData);
                if (resData.status == "SUCCESS") {

                    Database.p9_jd_xjgz = money
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '设置成功')
                } else {
                    if (resData.msg.indexOf('income between') == -1) {
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, '超出设置区间, 设置失败')
                    } else {
                        cc.log('报错了');
                        let txt = resData.msg
                        cc.log(txt);
                        gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)
                    }

                }


                a();
            }
            xhr_test.abort();
        };
    },
    //page10 获取保底分红发放详情
    jd_GetBaseDividendInfo(first, last, num, a) {
        cc.log('first===', first, 'last===', last);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetBaseDividendInfo1?account_name=${gHandler.gameGlobal.player.account_name}&first_date=${first}&last_date=${last}&token=${commonVal.token}&game_tag=${num}`, true);

        console.log("jd GET", host + `/proxy/user/GetBaseDividendInfo1?account_name=${gHandler.gameGlobal.player.account_name}&first_date=${first}&last_date=${last}&token=${commonVal.token}&game_tag=${num}`);


        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                // //得到数据渲染

                if (resData.code == 404) {
                    let txt = Database.Switchtext(resData.msg) //检索提示
                    cc.log(txt);
                    gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, txt)//发起提示
                }
                cc.log("jd p10       /proxy/user/GetBaseDividendInfo1", resData);
                Database.formatData10(resData.msg);
                a();
            }
            xhr_test.abort();
        };

    },
    //p10 获取直属玩家业绩接口
    jd_GetGameUserInductions(ids, ic, ends, end_time, nums, a) {
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400

        //改为 GetGameUserInductionsSortByGameTag 接口
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time);

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();


        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[${nums}]`, true);




        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p10   /proxy/user/GetGameUserInductionsSortByGameTag1" + nums + " 返回", resData);
                // //得到数据渲染

                let zswj = 0;

                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }

                    for (let s = 0; s < Database.data10.length; s++) {

                        if (Database.data10[s].date == end_time) {

                            Database.data10[s].zswjyj = zswj
                        }


                    }

                } else {
                    cc.log('没有值', end_time);
                }

                a();


            }
            xhr_test.abort();
        };

    },
    //p9 xj 获取下级某个直属玩家业绩接口
    p9_GetGameUserInductions(ids, end_time, a) {
        console.log('p9 xj 获取下级某个直属玩家业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetGameUserInductions?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本 /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_gr = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_gr = 0
                }

                a();
            }

            xhr_test.abort();
        };

    },
    //p9 xj 获取下级某个直属团队业绩接口
    p9_GetProxyUserInductionsSortByGameTag(ids, end_time, a) {
        console.log('p9 xj 获取下级某个直属玩家团队业绩接口');
        // http://proxy.lymrmfyp.com/proxy/User/GetProxyUserInductionsSortByGameTag?account_name=716896002&ids=%5B368964697,325209954%5D&start_time=1619020800&end_time=1619107200&game_tags=%5B1%5D&token=3c4188260e602ac0af93dadb68c723bb
        //时间戳每日差 86400
        let end = Database.getUnixtimestamp(end_time)
        let start = Database.getUnixtimestamp0(end_time)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本团队 /proxy/user/GetProxyUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_td = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_td = 0
                }

                a();
            }

            xhr_test.abort();
        };

    },
    //xj 获取下级某个日期直属个人业绩接口
    p9_GetGameUserInductionds(ids, first, last, a) {
        cc.log('first===', first, 'last===', last);

        let end = Database.getUnixtimestamp(last)
        let start = Database.getUnixtimestamp0(first)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetGameUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本个人期区间 /proxy/user/GetGameUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_gr = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_gr = 0
                }

                a();
            }

            xhr_test.abort();
        };

    },
    //xj 获取下级某个日期团队业绩接口
    p9_GetProxyUserInductionsSortByGameTagdt(ids, first, last, a) {
        cc.log('团队 first===', first, 'last===', last);

        let end = Database.getUnixtimestamp(last)
        let start = Database.getUnixtimestamp0(first)

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();

        xhr_test.open("GET", host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`, true);
        console.log(host + `/proxy/user/GetProxyUserInductionsSortByGameTag?account_name=${gHandler.gameGlobal.player.account_name}&ids=[${ids}]&start_time=${start}&end_time=${end}&token=${commonVal.token}&game_tags=[1,5]`);



        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p9 下级脚本团队日期区间 /proxy/user/GetProxyUserInductionsSortByGameTag 返回", resData);
                // //得到数据渲染

                let zswj = 0;
                if (resData.msg != null) {
                    let data_key = Object.keys(resData.msg)
                    let data_msg = resData.msg;
                    for (let a = 0; a < data_key.length; a++) {
                        for (let i = 0; i < data_msg[data_key[a]].length; i++) {
                            if (data_msg[data_key[a]][i].bet_total != 0 || data_msg[data_key[a]][i].lose_total != 0 || data_msg[data_key[a]][i].win_total != 0) {
                                console.log('id = ', data_key[a], 'win_total=', data_msg[data_key[a]][i].win_total, 'lose_total=', data_msg[data_key[a]][i].lose_total, 'bet_money=', data_msg[data_key[a]][i].bet_total);
                            }
                            if (data_msg[data_key[a]][i].base_dividend_type == 1) {
                                zswj += (parseFloat(data_msg[data_key[a]][i].win_total) + Math.abs(parseFloat(data_msg[data_key[a]][i].lose_total))) * data_msg[data_key[a]][i].base_dividend_discount / 100
                            } else if (data_msg[data_key[a]][i].base_dividend_type == 2) {
                                zswj += parseFloat(data_msg[data_key[a]][i].bet_total * data_msg[data_key[a]][i].base_dividend_discount / 100)
                            }

                        }

                    }
                    Database.p9_yjcx_td = zswj
                } else {
                    cc.log('没有值', end_time);
                    Database.p9_yjcx_td = 0
                }

                a();
            }

            xhr_test.abort();
        };

    },
    //查询单个id
    p9_GetProxyUser(id, a) {
        //https://proxy.lymrmfyp.com/proxy/User/GetProxyUser?account_name=454266606&token&id=495199413

        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();


        xhr_test.open("GET", host + `/proxy/user/GetProxyUser?account_name=${gHandler.gameGlobal.player.account_name}&id=${id}&token=${commonVal.token}`, true);

        console.log(host + `/proxy/user/GetProxyUser?account_name=${gHandler.gameGlobal.player.account_name}&id=${id}&token=${commonVal.token}`);


        xhr_test.send();


        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log(" p9_GetProxyUser返回 查询单个ID", resData);

                Database.p9_dlsj = resData.msg
                a();


            }
            xhr_test.abort();
        };
    },
    p9_getProxyUserNumber(ids, a) { //得到下级团队人数
        let host = gHandler.gameGlobal.proxy.proxy_host;
        let account_name = commonVal.account_name;
        let token = commonVal.token;
        //http://proxy.lymrmfyp.com/proxy/User/GetProxyUserNumber?account_name=375087785&ids=%5B622106574,643129297%5D&token=d26a4fcc9c15354a1a9227ab32e9b2bc
        const url = host +
            `/Proxy/User/GetProxyUserNumber?ids=[${ids}]&account_name=${account_name}&token=${token}`;
        cc.log('p9 GetProxyUserNumber', url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.code === 200) {

                    cc.log("p9得到下级团队人数 GetProxyUserNumber 返回内容", res);

                    if (res.msg != null && res.msg[0].count != 0) {
                        Database.p9_dlsj.count = res.msg[0].count
                        console.log('可以玩耍');


                    }
                    a()

                }

            }

        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    //华兴专用
    huaxing_getDividendRule(b) {
        let host = gHandler.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        // PARAMS { 
        //     account_name 用户ID         
        //     token 密匙         
        //     id 用户ID -  
        //     type 分红类型(1.流失 2.亏损) 可选 
        //     - game_tag 游戏分类 可选
        //  }
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${gHandler.gameGlobal.player.account_name}&token=${commonVal.token}&id=${gHandler.gameGlobal.player.account_name}&game_tag=0&type=3`, true);
        xhr_test.send();

        xhr_test.onreadystatechange = () => {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("p6 load 我的比例 /proxy/user/getDividendRule返回", resData);
                //得到数据渲染

                if (resData.msg != null) {
                    let a = []
                    // console.log('getDividendRule返回resData.msg.length=', resData.msg.length, a);
                    for (let index = 0; index < resData.msg.length; index++) {
                        a[index] = parseInt(resData.msg[index].percent)

                    }
                    //从大到小排序
                    if (a.length > 1) {
                        a.sort(function (a, b) {
                            return a - b
                        })
                    }
                  
                    Database.hx_p6_gz = a[0];
                  
                    // console.log('a=====',a, Database.hx_p6_gz);
                }
                b()

            }
            xhr_test.abort();
        };
    },
};
module.exports = commonVal;
