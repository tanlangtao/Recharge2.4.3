
export namespace Language_ebg {
    class Class_Language_ebg{
        public Language = 'Chinese'
        private Chinese =[
            '剩余金币不足,请充值！',//0
            '金币不足，无法继续下注!',//1
            '此局桌面已达到最大下注金额',//2
            '玩家已经达到此局最大下注金额!',//3
            '续投失败',//4
            '金币不足，最低上庄需要5000金币！',//5
            '上庄金额不能低于5000',//6
            '您输入的金额有误，请重新输入！',//7
            '操作成功！',//8
            '请关闭后再次提交！',//9
            '其他地方登录',//10
            '玩家被踢',//11
            '进入房间失败!，请返回重试！',//12
            '网络断开，正在努力连接中',//13
            '限红',//14
            '顺',//15
            '天',//16
            '地',//17
            '和',//18
            '至尊厅',//19
            '处于观战模式，需要30金币即可参与游戏',//20
            '本局游戏结算还未结束，请在本局结算完成后再退出游戏。',//21
            '连接超时, 请您返回游戏大厅后重新进入',//22
            '局',//23
            '近20局',//24
            '金币',//25
            '您正在二八杠至尊厅游戏中, 点确定继续游戏',//26
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
    }
    
    export const Lg = new Class_Language_ebg();
}