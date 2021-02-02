import gHandler = require("../../../../base/common/gHandler");
export namespace Language_pay {
    class Class_Language_pay {
        public Language = 'Chinese'
        private Chinese =[
            '充值范围',//0
            "充值优惠",//1
            "充值",
            "赠送",
            "点击输入",
            "充值金额不能为空!",
            "不符合充值范围!",
            "开展中的活动：通过 '转账到银行卡' 充值方式，单笔充值10000以上，即可获得额外多赠送1%！",
            "网络错误",
            "温馨提示: 1.充值比例1元=1金币",
            "需要安装支付宝",
            "需要安装微信",
            "月评级5星+",
            "上一笔交易未完成，请到聊天工具中取消！",
            "已完成",
            "已撤销",
            "未完成",
            "支付宝充值",
            "转账到银行卡",
            "交易所",
            "赠送",
            "微信支付",
            "银联支付",
            "网银支付",
            "快捷支付",
            "专享快付",
            "IM充值",
            "无",
            "完成",
            "1.银行卡转账流程：进入银行APP > 点击转账 > 复制收款账号、收款姓名、收款银行粘贴到对应转账信息 > 输入转账金额(包含小数点后2位数字) > 完成充值。",
            "2.支付宝转账流程 ：支付宝首页 > 转账 > 转到银行卡 > 输入姓名、卡号、银行、金额(包含小数点后2位数字) > 点击下一步 > 点击确认转账。",
            "3.微信转账流程 ：微信 > 我的 > 支付 > 收付款 > 转账到银行卡 > 输入姓名、卡号、银行 > 点击下一步 > 转账金额(包含小数点后2位数字) > 点击转账。",
            "特别提醒:",
            "1.支持各种银行，支付宝，微信的银行卡转账；",
            "2.支付时输入金额与转账金额一致",
            "（包含小数点后2位数字）",
            "禁止修改金额，否则不到账；",
            "3.以上收款账号限本次使用，账户不定期更换，每次支付前请依照本页所显示的银行账户付款;",
            "4.正常付款1-5分钟内到账，未到账请联系客服。",
            "温馨提示: 1.默认链类型为ERC20",
            "参考汇率：1USDT",
            "金币",
            "兑换范围",
            "未设置",
            "操作成功!",
            "渠道未开放，请选择其他兑换方式!",
            "请先设置账户!",
            "兑换金额必须为",
            "的倍数",
            "兑换金额不能为空",
            "余额不足",
            "超出兑换范围",
            "未绑定",
            "申请成功!",
            "请先绑定钱包地址",
            "月评级5星+",
            "已成功",
            "已失败",
            "审核中",
            "输入支付宝帐号",
            "输入收款人姓名",
            "输入不能为空!",
            "请输入银行卡号",
            "请输入姓名",
            "请输入开户支行",
            "姓名和卡号不能为空",
            '请选择开户省',
            "开户省不能为空",
            "请选择开户市",
            "开户市不能为空",
            "请选择开户行",
            "开户行不能为空",
            "无效卡号",
            "开户支行不能为空",
            "姓名不能含有特殊字符",
            "开户支行不能含有特殊字符",
            "请先选择开户省",
            "请完善银行卡绑定信息",
            "申请兑换金额为",
            "扣除手续费",
            "实际到账金额为",
            "确认要提交兑换申请吗？",
            "兑换账户未设置,请选择其他兑换方式!",
            "请输入钱包地址",
            "请选择链类型",
            "钱包地址不能为空!",
            "钱包地址不能含有特殊字符!",
            "*温馨提示：绑定钱包地址后无法自行修改！请仔细填写您的钱包地址信息，如有错误将会导致您无法收到货币。",
            //以下为活动部分
            "1、每日通过游戏, 输赢均可产生同等额度的流水。\n 2、当日流水达到指定的档位, 即可领取活动规定的相应金币。\n 3、每日23:59:59, 活动计算用的当日流水归零。",
            "领取成功!",
            "1.仅计算以下游戏流水：水果机、海王捕鱼、财神到。\n 2.当日流水达到指定的档位，即可于次日领取活动规定的相应金币。\n 3.每日通过游戏，输赢均可产生同等额度的流水。\n 4.兑换需五倍彩金流水，不限制游戏。\n 5.每日23:59:59，活动计算用的今日流水及昨日彩金未领取会归零。",
            "在",
            "中完成",
            "局",
            "胜利",
            "中累计达到",
            "流水",
            "体验场",
            "初级场",
            "中级场",
            "高级场",
            "炸金花",
            "斗地主",
            "跑得快",
            "二人麻将",
            "抢庄牛牛",
            "十三水",
            "德州扑克",
            "游戏没开放!",
            "游戏需要下载更新!请返回大厅下载更新",
            "充值金额",
            "盈利到",
            "嘉奖金额",
            "本活动于2020/12/28 00:00开始\n 1. 一个ID每天在活动界面只能选择其中一档金额，且参与1次，充值成功后联系客服申请参加活动;  活动时间：12:00 到 24:00。\n 2. 参与此活动，指定参加捕鱼游戏，中途如果跳转参加其他游戏则视为放弃该活动（放弃活动将失去该活动所有福利）。\n 3. 总金额达到充值金额的三倍要及时兑换。 \n 4. 嘉奖金联系在线客服领取时请提供客户手机号，银行卡号，且必须与绑定平台实名一致。\n 5. 同IP、同设备关联不符合，刷子自觉，恶意套利将封号处理。\n 6. 本活动最终解释权归德比所有。",
            "每周累计签到达到指定天数, 即可获得相应奖励",
            "1. 分享内容：佣金领取截图 活动图 游戏赢分截图 业绩图 游戏邀请二维码。\n 2. 每日分享朋友圈, 超过12小时, 屏蔽人数不能超过5人, 满12小时后隔天, 录屏审核。",
            "审核要求，提供ID，要求微信人数跟当日佣金达到以上要求，录制视屏昨日朋友圈所发内容跟微信人数仅此我这条线下面的ID。\n 所领取的每日工资，赠送的金币一倍流水即可兑换。\n 此活动不能跟官网优惠活动同时申请。",
            "1. 点开微信，并结束微信进程。\n 2. 打开 '微信' ，点击聊天页随意找到一个好友，点击对方头像进入对方朋友圈。\n 3. 点击通讯录，并将通讯录翻至最底部显示好友人数。\n 4. 请您点击 '发现' 进入朋友圈，点击自己朋友圈的头像进入自己的朋友圈，并点击昨日分享的朋友圈进入查看朋友圈状态。\n 5. 点击 '我' 页面，点击 '支付' 页面。进入两秒后退出。",
            "微信人数",
            "当日佣金",
            "领取工资",
            "元",
            "所有代理连续申请该活动3天没有明显且真实的推广效果, 公司将关闭此id所有代理活动的申请权限！",
            "昨日领取佣金",
            "好友人数",
            "当日分享彩金(朋友圈)",
            "申请方式",
            "联系代理客服/代理专员查询即可领取",
            "1.实名限制2及2个以上不符合。\n 2.只限游戏（财神到，水果机，捕鱼，百人牛牛，红包乱斗，二八杠，21点，奔驰宝马）。\n 3.每个账号一天只限第一次充值（如果遇到无法一笔充值达到有效的档位，可充值两次以上）。\n 4.充值成功未下注之前找专线客服专员申请。\n 5.每一个账号（同一ip，同一设备，同一姓名）视为一个账号，只能申请一次。\n 6. 本活动最终解释权归德比所有。",
            "赠送金额",
            "兑换限制",
            "一倍流水",
            "<color=#FFFD9C>1. 平台会根据用户每天产生的流水金额按照对应比例进行返水。\n 2. 流水金额统计截止每日23:59:59，</c><color=#FF000>仅限棋牌类游戏</c> 。\n 3. 请于次日中午12点-17点找客服领取, 未领取视为自动放弃。</color>",
            "首充金额",
            "包赔金额",
            "最高兑换金额",
            "<color=#E8C999>1. 老会员每周限制参加一次（星期一到星期六），联系上级进行申请，申请时间：每天12:00-21:30。\n 申请后即视为参加此活动，充值本金最高兑换200%，赔付彩金无兑换上限。\n 2. 参加活动的会员，只能进行指定游戏</c><color=#FF0000>《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》《百人牛牛》</c>\n 5款游戏， 进行其他游戏便视为放弃此活动。\n 3. 在规定游戏中投注对应档位最高单注金额内，亏损至余额低于10金币时前往本活动界面领取活动彩金。\n 4. 赢金到规定金额不提款视为放弃包赔资格（输完不能赔付）。\n 5. 包赔金在每周日23:59:59未进行领取则视为自动放弃。\n 6. 同IP同设备多账号，仅限1个账号享受包赔活动，包赔金无需流水可直接申请兑换， 恶意套利者将封号处理。\n 7.本活动最终解释权归德比所有。</color>",
            "参加活动失败:请先绑定手机号!",
            "同一用户仅限领取一次!",
            "获取登陆ip失败!",
            "四季发财红包雨",
            "下雨时间\n 每场15分钟",
            "领取条件",
            "红包总额",
            "最小红包",
            "财神红包",
            "流水要求",
            "春雨",
            "夏雨",
            "秋雨",
            "冬雨",
            "1.每场红包雨下雨时间前达成领取条件, 即可参加这一场红包雨。\n 2.每场雨可随机获得最小红包至财神红包数额区间的随机数额红包。\n 3.当日存款、流水可累计, 所获红包一倍流水即可兑换。",
            "日亏损",
            "每日彩金",
            "<color=#FFFD9C>1. 按充值金额计算亏损, 例如充值2000亏了, 即可申请180元彩金。\n 2. 严禁注册多账号利用此活动在平台套彩金, 违规账号一律冻结处理。\n 3. 请于次日中午12点-17点找客服领取, 未领取视为自动放弃。\n 4.  本活动仅限 </c><color=#ff0000> 棋牌类游戏</c>（财神到，聚宝盆，海王，水果机，二八杠，百人牛牛），其他\n 等游戏不计入亏损计算。\n 5.  参与首充或者包赔活动 ，需扣除赠送金额再进行计算。</color>",
            "日业绩",
            "扶持金",
            "(大福利)",
            "合作共赢，代理直属业绩达到后找上级进行申请领取，刷子团队请绕道。",
            "注: 解释权归德比棋牌所有。",
            "倍",
            "1. 参与首充赠送玩家不得参与平台其他活动， 第二笔充值即可正常参与平台活动。\n 2. 本活动需要完成手机及银行卡绑定后才能参与。\n 3. 必须充值成功未下注时进行领取，需要达到流水金额（充值金额+赠送金额）三倍才能申请兑换。\n 4. 游戏规则： 仅参加以下游戏《财神到》《水果机》《捕鱼·海王》《捕鱼·聚宝盆》。\n 5. 同一用户仅限领取一次，恶意套利者将封号处理。\n 6. 本活动最终解释权归德比所有。",
            "首次提款金额",
            "赠送彩金",
            "领取方式",
            "联系客服领取",
            "1. 所获彩金需要一倍流水即可提领, 每个会员按首次提款金额可以申请相对应的金币福利。\n 2. 请于次日中午12点-17点找客服领取，未领取视为自动放弃。\n 3. 每位玩家、每一电话号码、及相同IP地址只能享有一次优惠。若会员有重复申请账号行为, 公司保留取消\n     或收回会员优惠彩金的权利。\n 4.【德比游戏】保留对活动的最终解释权以及在无通知的情况下修改、终止活动的规则、适用于所有优惠。",
            "恭喜玩家",
            "抽到了",
            "玩法介绍",
            "       积分抽奖, 点击转盘中央抽奖按钮, 消耗1000积分, 百分百获得随机金币奖励！",
            "积分获取",
            "       更多积分奖励, 敬请留意精彩活动。",
            "积分优惠",
            "       十连抽优惠一次。",
            "第一天",
            "第二天",
            "第三天",
            "申请条件：\n 1. 当天新注册用户，需先绑定好手机号码，银行卡(ip关联2个以下)。\n 2. 实名限制2及2个以上不符合。\n 3. 只限游戏（财神到，水果机，捕鱼，百人牛牛，红包乱斗，二八杠，21点，奔驰宝马）。\n 4. 每个账号一天只限第一次充值（如果遇到无法一笔充值达到有效的档位，可充值两次以上）\n 充值成功未下注之前找专线客服专员申请。\n 5. 每一个账号（同一ip，同一设备，同一姓名）视为一个账号，只能申请一次。\n 6. 本活动最终解释权归德比所有。",
            "免费金币次数已领完，请明天再来吧!",
            "金币余额不符合领取规则!",
            "* 注：请先绑定手机及银行卡",
            "1. 半月存款过三次金额累计到达300元以上, 每半个月可领一次。",
            "2. 流水要求一倍, 每个账号同 (手机-姓名-IP) 只允许一个账号申请。",
            "3. 彩金发放时间为1号和16号, 如期间未联系客服领取视为放弃。",
            "在游戏首页点击 (全民代理) 到 (月入百万) 页面, 保存二维码和截图此页面图片, 分享到微信朋友圈24小时, 收集5个赞, 满足分享条件请联系在线客服申请彩金。每个申请用户需绑定好 (银行卡) 方便提现, 一个微信每15天可申请一次 。",
            "1. 每周总领取佣金福利, 例如一周总领取佣金1万, 奖励300元。\n 2. 若总领佣金未超过3万, 依旧按照300元奖励, 以此类推。\n 3. 每周一到本周日为一个结算周期, 满足条件则可领取, 领取时间段为下个周一到周日。",
            "1. 可自己添加一批微信或QQ群, 可以通过百度搜索微信群等方式加入。\n 2. 利用各种论坛、贴吧、发帖推广。\n 3. 朋友圈、空间坚持晒图、打造好自己的朋友圈, 可以省去很多介绍。\n 4. 可以买个淘宝店、卖欢乐豆, 各种游戏币, 各种跟棋牌有关产品, 只为引流, 卖产品只是营销手段。\n 5. 找有粉丝的人合作, 比如网红、主播等。\n 6. 投广告, 各种自媒体、网盟、公众号、微博红人、有流量的网站。\n 7. 地推, 可以无限量免费提供专属您的卡片, 宣传单, 可在网吧, 酒店, 街道等发送。\n 8. 其实这种推广方式和其他商业模式类似, 它的成功在于通过互联网、手机、分享经济等一些优势, 建立广大的客户群。从而获得利益, 同时棋牌中的游戏种类多, 运行畅通, 体验也特别棒, 我们也进入了该棋牌的代理界面查看了一些资料, 佣金日结是一大优势, 活动彩金更是完美结合, 也就是说, 只需要一部手机, 代理就可以完美逆袭, 拥有无数代理, 轻松的自己当老板, 让别人帮你赚钱, 这样的创业方式, 0投资, 0成本, 而且只有成功, 没有失败! 难怪越来多人成为了此类APP的代理, 人生发生了很大的改变, 都在通往美好的道路前进, 这或许就是您一直想要拥有的平台。",
            "即日起，凡使用官方指定通道，进行支付每笔赠送2.0%，次次充，次次送",
            "推荐有效好友",
            "奖金",
            "人",
            "规则1：\n 推荐新增直属下级会员需累计充值300以上， 累计流水500以上连续游戏3天为有效直属玩家。\n 规则2：\n 推荐会员不允许同ip，同设备，同实名，一个会员只能计算一次。\n 温馨提示：\n 如发现任何团队或个人以不诚实方式进行套利将取消活动资格。\n 领取方式：\n 达到申请要求后可直接联系在线客服领取，每周一至周日为一个活动周期（第二周申请上周推荐奖励）。",
            "(兑换需三倍彩金流水)",
            "(兑换需五倍彩金流水)",
            "1. 限当天有进行充值，且完成手机及银行卡绑定的用户才能参与。\n 2. 玩法限棋牌类游戏。彩票、视讯龙虎斗、视讯百家乐、沙巴体育、电竞等游戏不能参加。\n 3. 亏损金额计算方式为当日游戏总输-当日游戏总赢(税前)。\n 4. 用户的亏损金额计算至当天的23:59:59，次日0点将进行重置，请统一在次日联系客服进行申请。\n 5.不可与包赔活动及首存活动同时参与；且专线用户不能参予此活动。\n 6. 亏损1000+，108元（兑换需三倍彩金流水）；亏损5000+，498元（兑换需五倍彩金流水）；其余档位无兑换流水限制。\n 7. 如有异常操作，对刷套利等情节，则进行冻结账号处理。\n 8. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利。",
            "1、推荐一个人，玩20局，奖励10元。\n 2、连续7天，每日玩初级场20局，奖励188元。\n 3、每日体验场赢局数达到30局，奖励30元。\n 4、每日初级场赢局数达到30局，奖励50元。\n 5、完成任务即可联系客服申请彩金。\n 6、彩金限制一倍流水兑换。\n 7、本活动无法与每日救援金同时参与。\n 8、本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利。\n 9、同设备、同IP、账号异常、对刷套利者扣除收益一律封号处理。",
            "1、活动仅限下述玩法使用：红包乱斗，捕鱼聚宝盆，轮盘，奔驰宝马，水果机，骰宝。同时，通过注册金，无论赢利多少，也仅能用于继续玩这六款游戏，若有违规则拒绝兑换。",
            "2、每位玩家不可重复领取。\n 3、每组序号不可重复使用。\n 4、领取需绑定手机号、银行卡。\n 5、兑换需满足彩金八倍流水。\n 6、禁止一切异常操作行为。",
            "（邀请码获取请咨询您的代理）",
            "请输入5位邀请码",
            "等待领取结果，请勿频繁点击领取!",
            "邀请码不能为空!",
            "获取IP地址失败!",
            "活动说明：",
            "1. 活动仅限下述玩法：水果机、海王捕鱼、财神到。",
            "2. 领取方式：联系客服领取，若首存后未申请视同放弃。\n 3. 如领取后下注未规定的游戏, 则清除盈利和流水, 重新打码。\n 4. 首存活动领取后如需要娱乐其他游戏, 需要兑换后再充值进行游戏。\n 5. 当天禁止同时参与平台内其他活动。\n 6. 同设备、同IP、账号异常、对刷套利者扣除收益并一律封号处理。\n 7. 兑换需在规定游戏内达到本金的三倍流水加彩金的五倍流水。",
            "(包赔金无需流水, 且不限制游戏)",
            "(包赔金需一倍流水, 且不限制游戏)",
            "❈找客服进行备注申请",
            "<color=#E8C999>1. 活动仅限以下玩法：水果机、海王捕鱼、财神到(中途可更换其他规则内游戏)。\n 2. 包赔, 只可指定专线和专线ID参与。当天, 与平台其他活动不可同时参与。\n 3. 在规定游戏中亏损至余额低于5时, 即可联系客服申请包赔金。\n 4. 在领取包赔金或兑换前进行非规定游戏和要求, 首次违规扣除收益且不可参与当前包赔活动;</c><color=#EE000>\n     二次违规扣除收益跟充值本金, 且不可再申请包赔活动。</c>\n 5. 参与活动后只可以最高兑换指定金额, 超出扣除。\n 6. 每个ID用户只限领取一次。\n 7. 如有异常操作, 一律扣除收益并封号处理。</color>",
            "2. 领取方式：联系客服领取, 仅限每天的前三笔充值。\n 3. 如领取后下注未规定的游戏, 则清除盈利和流水, 重新打码。\n 4. 每日存送活动领取后如需要娱乐其他游戏, 需要兑换后再充值进行游戏。\n 5. 当天禁止同时参与平台内其他活动。\n 6. 同设备、同IP、账号异常、对刷套利者扣除收益并一律封号处理。\n 7. 兑换需在规定游戏内达到本金加彩金的三倍流水。",
            "<color=#E8C999>1. 活动仅限以下玩法：水果机、海王捕鱼、财神到(中途可更换其他规则内游戏)。\n 2. 包赔, 只可指定专线和专线ID参与。当天, 与平台其他活动不可同时参与。\n 3. 用户充值完毕后联系客服备注参与活动。\n 4. 在规定游戏中亏损至余额低于5时, 即可联系客服申请包赔金。\n 5. 在领取包赔金或兑换前进行非规定游戏和要求, 首次违规扣除收益且不可参与当前包赔活动;</c><color=#FF0000> \n     二次违规扣除收益跟充值本金, 且不可再申请包赔活动。</c>\n 6. 参与活动后只可以最高兑换指定金额, 超出扣除。\n 7. 每日三次, 当余额低于1元时, 充值指定金额后, 可以向客服申请参加活动。\n 8. 如有异常操作, 一律扣除收益并封号处理。\n 9. 老用户是指专线用户。</color>",
            "每日发展直属新充值用户",
            "领取金额",
            "1. 同设备、同IP、账号异常、对刷套利者扣除收益一律封号处理\n 2. 满足条件可联系客服领取",
            "今日已领取，请明天再来!",
            "1. 本活动限定有充值记录， 且完成手机及银行卡绑定后才能参与\n 2. 同一用户一天仅可领取一次救援金，若当天已领取过其中一个档位的救援金，将无法领取其他档位的救援金\n 3. 亏损金额计算方式为当日游戏总输-当日游戏总赢(税前)，用户所领取的优惠金额 (如：赠送彩金、救援金…等) 将额外进行扣除\n 4. 用户的亏损金额计算至当天的23:59:59，次日0点将进行重置 \n 5. 需满足领取救援金额的一倍流水方可兑换\n 6. 如有异常操作，则进行冻结账号处理\n 7. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利 ",
            "未达到领取标准",
            "签到失败，签到条件不满足!",
            "今日流水:",
            "今日充值:",
            "签到成功!",
            "1. 本活动需完成手机及银行卡绑定才能参与\n 2. 当日流水达1000以上或者当日累计充值50元以上，即签到成功\n 3. 本活动需连续不间断签到，中间断签将回到第一天重新累计天数，已获得的奖励不会进行回收\n 4. 完成连续签到30天后，可继续参与本活动，回到第一天重新累计天数\n 5. 本活动所获得的水果斤数不併入免费领水果活动的水果斤数，反之亦然\n 6. 本活动奖励仅保留同一用户进行签到领取\n 7. 如有异常操作，则进行冻结账号处理\n 8. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利",
            "首存",
            "备注：\n 1. 本活动需完成手机及银行卡绑定后才能参与\n 2. 若玩家第一笔充值金额低于最低首存金额的50元，第二笔充值金额即便达到首存门槛也无法领取奖励\n 3. 同一用户仅限领取一次 \n 4. 如有异常操作，则进行冻结账号处理\n 5. 首存活动可以与其他活动叠加\n 6. 需满足首充金额＋赠送彩金的一倍流水方可兑换\n 7. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利",
            "共",
            "页",
            "首页",
            "下一页",
            "上一页",
            "尾页",
            "请绑定手机跟银行卡实名认证后参与活动",
            "你点的太快了，请等待活动数据返回!",
            "恭喜您已获得",
            "斤水果",
            "恭喜",
            "已获得",
            "水果斤数未达5斤，无法领取",
            "当前没有未完成进度",
            "邀请好友一起玩游戏, 你和好友都可以获得包邮到家的免费水果哦, 水果满5斤即可邮寄。",
            "一开始默认所有用户皆为被邀请者身份, 可进行被邀请者的相关任务。被邀请者在完成手机号及银行卡绑定后即可获得3斤水果; 之后在充值50元后任意进行一局游戏, 或邀请2名好友完成APP下载注册并绑定手机及银行卡, 即可立即满5斤发货。",
            "成功生成至少一名下级的代理, 可获得邀请者身份进行相关任务。邀请3名好友完成APP下载注册并绑定手机及银行卡, 或3名好友任一名充值50元后任意进行一局游戏, 即可以获得5斤包邮到家的水果 (如果全部是高质量的游戏玩家, 水果价值更高哦) 。",
            "玩家成功提交发货申请后, 达标审核通过自动发货, 水果根据邀请玩家的价值随机发送。",
            "1. 邀请有效好友达五人以上时，按照邀请数，每邀请三名有效好友便可获得一次5斤水果。\n 2. 本活动奖励仅保留同一用户进行领取。\n 3. 如有异常操作，则进行冻结账号处理。\n 4. 该活动发展的新玩家自动成为该玩家下线，享受代理收入。\n 5. 本活动最终解释权归平台所有，平台有随时更改，停止并取消该活动的权利。",
            "规则:\n 1. 被邀请者在成功生成一名直属下级后, 将会同时获得邀请者的身份, 在完成被邀请者的相关任务后, 可接着进行邀请者的任务\n 2. 本活动邀请的新玩家自动成为该代理的下线, 代理享受永久收益, 新玩家充值游戏, 代理所获得水果的价值越高\n 3. 本活动奖励仅保留同一用户进行领取\n 4. 如有异常操作, 则进行冻结账号处理\n 5. 本活动最终解释权归平台所有, 平台有随时更改, 停止并取消该活动的权利",
            "已经获得3斤水果",
            "邀请两个人或者充值50元后玩一把游戏即可达到发货资格",
            "已经获得2斤水果",
            "点选下方按钮可以立即提货, 完成提货即可参加邀请者活动",
            "恭喜获得5斤水果",
            "请输入手机号",
            "请输入收货地址",
            "请选择收货省",
            "地址不能为空!",
            "手机号格式不正确，请重新输入!",
            "手机号不能为空!",
            "姓名不能为空!",
            "下单金额",
            "到账金额",
            "状态",
            "类型",
            "下单时间",
            "到账时间",
            "操作",
            "支付宝",
            "银联扫码",
            "微信",
            "网银充值",
            "IM充值",
            "USDT充值",
            "重置",
            "在充值过程中，如果遇到没有回应等任何问题，请联系客服处理",
            "联系客服",
            "最 大",
            "绑定支付宝",
            "绑定银行卡",
            "在兑换过程中，如果遇到没有回应等任何问题，请联系客服处理",
            "兑换",
            "绑 定",
            "兑换金额",
            "费率",
            "申请时间",
            "备注",
            "钱包地址不符合要求(42位16进制组合, 开头为0x), 请重新输入。",
            "*温馨提示：绑定银行卡后无法自行修改! 请仔细填写您的银行卡信息!",
            "*温馨提示：绑定支付宝成功后无法自行修改!请仔细填写您的姓名和账号!",
            "复 制",
        ]
        private English =[
        ]
        private Thai =[
        ]
        private Vietnamese =[
        ]
        public changeLanguage(index){
            let tip = ''
            switch(this.Language){
                case 'Chinese':
                    tip = this.Chinese[index]
                    break
                case 'English':
                    tip = this. English[index]   
                    break
                case 'Thai' :
                    tip = this.Thai[index]
                    break
                case 'Vietnamese' :
                    tip = this.Vietnamese[index]
                    break
                default :
                    console.log('未知语言')
                    return
            }
            return tip
        }
        ChangeByText(text){
            let index = -1;
            this.Chinese.forEach((e,i)=>{
                if(e == text){
                    index = i
                }
            })
            if(index == -1){
                return text
            }else{
                return this.changeLanguage(index)
            }
        }
        getLgSrc(){
            let src = ''
            switch(this.Language){
                case "Chinese": 
                        if(gHandler.gameGlobal.pay.package_id == 8){
                            src = `language/Chinese/package_8`
                        }else{
                            src = `language/Chinese/package_1_7`
                        }
                    break
                case "English": 
                    if(gHandler.gameGlobal.pay.package_id == 8){
                        src = `language/English/package_8`
                    }else{
                        src = `language/English/package_1_7`
                    }
                    break
                case "Thai":
                    if(gHandler.gameGlobal.pay.package_id == 8){
                        src = `language/Thai/package_8`
                    }else{
                        src = `language/Thai/package_1_7`
                    }
                    break
                case "Vietnamese":
                    if(gHandler.gameGlobal.pay.package_id == 8){
                        src = `language/Vietnamese/package_8`
                    }else{
                        src = `language/Vietnamese/package_1_7`
                    }
                    break
                default : src = `language/Chinese`
                    console.log('未知语言',Language_pay.Lg.Language)
                    break
            }
            return src
        }
    }
    
    export const Lg = new Class_Language_pay();
}