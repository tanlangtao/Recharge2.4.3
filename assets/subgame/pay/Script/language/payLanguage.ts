
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
            "2.支付时输入金额与转账金额一致, ",
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
            "申请成功！",
            "请先绑定钱包地址",

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
            let index = 0;
            this.Chinese.forEach((e,i)=>{
                if(e == text){
                    index = i
                }
            })
            return this.changeLanguage(index)
        }
        getLgSrc(){
            let src = ''
            switch(this.Language){
                case "Chinese": src = `language/Chinese`
                    break
                case "English": src = 'language/English'
                    break
                case "Thai": src = 'language/Thai'
                    break
                case "Vietnamese": src = 'language/Vietnamese' 
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