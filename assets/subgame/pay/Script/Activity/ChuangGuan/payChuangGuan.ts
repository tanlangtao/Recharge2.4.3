const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    leval1Label: cc.Label = null;
    @property(cc.Label)
    leval2Label: cc.Label = null;
    @property(cc.Label)
    leval3Label: cc.Label = null;
    @property(cc.Label)
    leval4Label: cc.Label = null;
    @property(cc.Label)
    leval5Label: cc.Label = null;
    @property(cc.Label)
    gold1Label: cc.Label = null;
    @property(cc.Label)
    gold2Label: cc.Label = null;
    @property(cc.Label)
    gold3Label: cc.Label = null;
    @property(cc.Label)
    gold4Label: cc.Label = null;
    @property(cc.Label)
    gold5Label: cc.Label = null;
    @property(cc.Label)
    todayLabel: cc.Label = null;

    @property(cc.Node)
    baoxiang1 : cc.Node = null;
    @property(cc.Node)
    baoxiang2 : cc.Node = null;
    @property(cc.Node)
    baoxiang3 : cc.Node = null;
    @property(cc.Node)
    baoxiang4 : cc.Node = null;
    @property(cc.Node)
    baoxiang5 : cc.Node = null;

    @property(cc.Node)
    ProgressBar1 : cc.Node = null;
    @property(cc.Node)
    ProgressBar2 : cc.Node = null;
    @property(cc.Node)
    ProgressBar3 : cc.Node = null;
    @property(cc.Node)
    ProgressBar4 : cc.Node = null;

    @property
    results  = null;
    app = null;
    leval1_gold = null;
    leval2_gold = null;
    leval3_gold = null;
    leval4_gold = null;
    leval5_gold = null;
    FormData = new FormData();
    activity_id = null;
    activity_name = null;
    protected onLoad(): void {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
    }

    fetchIndex(){
        var url = `${this.app.UrlData.host}/api/activity/receiveGoldInfo?user_id=${this.app.UrlData.user_id}&activity_id=${this.activity_id}&token=${this.app.token}&package_id=${this.app.UrlData.package_id}&version=${this.app.version}`;
        fetch(url,{
            method:'get'
        }).then((data)=>data.json()).then((data)=>{
            if(data.status == 0){
                this.app.hideLoading();
                this.results = data;
                this.init();
                this.setProgressBar();
            }else{
                this.app.showAlert(data.msg)
            }
        })
    }

    setId(id,name){
        this.activity_id = id;
        this.activity_name = name;
        this.fetchIndex();
    }

    public fetchGold(leval){
        let url = `${this.app.UrlData.host}/api/activity/receiveGold`;
        this.FormData= new FormData();
        this.FormData.append('user_id',this.app.UrlData.user_id);
        this.FormData.append('user_name',decodeURI(this.app.UrlData.user_name));
        this.FormData.append('level',leval);
        this.FormData.append('package_id', this.app.UrlData.package_id);
        this.FormData.append('token',this.app.token);
        this.FormData.append('activity_id',this.activity_id);
        this.FormData.append('activity_name',this.activity_name);
        this.FormData.append('version',this.app.version);
        fetch(url,{
            method:'POST',
            body:this.FormData
        }).then((data)=>data.json()).then((data)=>{
            if(data.status == 0){
                this.fetchIndex();
                this.app.showAlert('领取成功!')
            }else{
                this.app.showAlert(data.msg)
            }
        })

    }
    init(){
        let receive_info = this.results.data.receive_info;
        this.leval1Label.string = receive_info.level_1.statement+'流水';
        this.leval2Label.string = receive_info.level_2.statement+'流水';
        this.leval3Label.string = receive_info.level_3.statement+'流水';
        this.leval4Label.string = receive_info.level_4.statement+'流水';
        this.leval5Label.string = receive_info.level_5.statement+'流水';

        this.leval1_gold = receive_info.level_1.gold;
        this.leval2_gold = receive_info.level_2.gold;
        this.leval3_gold = receive_info.level_3.gold;
        this.leval4_gold = receive_info.level_4.gold;
        this.leval5_gold = receive_info.level_5.gold;
        this.gold1Label.string = this.leval1_gold;
        this.gold2Label.string = this.leval2_gold;
        this.gold3Label.string = this.leval3_gold;
        this.gold4Label.string = this.leval4_gold;
        this.gold5Label.string = this.leval5_gold;

        this.todayLabel.string = this.app.config.toDecimal(this.results.data.today_statement);
    }

    setProgressBar(){
        let todayState = Number(this.results.data.today_statement);
        let leval1 = Number(this.results.data.receive_info.level_1.statement);
        let leval2 = Number(this.results.data.receive_info.level_2.statement);
        let leval3 = Number(this.results.data.receive_info.level_3.statement);
        let leval4 = Number(this.results.data.receive_info.level_4.statement);
        let leval5 = Number(this.results.data.receive_info.level_5.statement);

        let leval1_has = this.results.data.receive_info.level_1.has_receive;
        let leval2_has = this.results.data.receive_info.level_2.has_receive;
        let leval3_has = this.results.data.receive_info.level_3.has_receive;
        let leval4_has = this.results.data.receive_info.level_4.has_receive;
        let leval5_has = this.results.data.receive_info.level_5.has_receive;
        //加载对应等级的进度条和宝箱
        if(todayState>=leval1){
            this.ProgressBar1.width = (todayState-leval1)/(leval2-leval1)*80>80? 80:(todayState-leval1)/(leval2-leval1)*80;
            leval1_has === 0 ?this.app.loadIcon('/huodong/baoxiang',this.baoxiang1,60,60)
                :this.app.loadIcon('/huodong/dakaibaoxiang',this.baoxiang1,60,60);
        }
        if(todayState>=leval2){
            this.ProgressBar2.width = (todayState-leval2)/(leval3-leval2)*80>80? 80:(todayState-leval2)/(leval3-leval2)*80;
            leval2_has === 0 ?this.app.loadIcon('/huodong/baoxiang',this.baoxiang2,60,60)
                :this.app.loadIcon('/huodong/dakaibaoxiang',this.baoxiang2,60,60);
        }
        if(todayState>=leval3){
            this.ProgressBar3.width = (todayState-leval3)/(leval4-leval3)*80>80? 80 :(todayState-leval3)/(leval4-leval3)*80;
            leval3_has === 0 ?this.app.loadIcon('/huodong/baoxiang',this.baoxiang3,60,60)
                :this.app.loadIcon('/huodong/dakaibaoxiang',this.baoxiang3,60,60)
        }
        if(todayState>=leval4){
            this.ProgressBar4.width = (todayState-leval4)/(leval5-leval4) * 80 >80? 80 :(todayState-leval4)/(leval5-leval4)*80;
            leval4_has === 0 ?this.app.loadIcon('/huodong/baoxiang',this.baoxiang4,60,60)
                :this.app.loadIcon('/huodong/dakaibaoxiang',this.baoxiang4,60,60)
        }

        if(todayState>=leval5){
            leval5_has === 0 ?this.app.loadIcon('/huodong/baoxiang',this.baoxiang5,60,60)
                :this.app.loadIcon('/huodong/dakaibaoxiang',this.baoxiang5,60,60);
        }
    }

    leval1Click(){
        let leval1_has = this.results.data.receive_info.level_1.has_receive;
        if(leval1_has===0) {
            this.fetchGold(1)
        }else{
            this.app.showAlert('不能重复领取！')
        }
    }
    leval2Click(){
        let leval2_has = this.results.data.receive_info.level_2.has_receive;
        if(leval2_has===0){
            this.fetchGold(2)
        }else{
            this.app.showAlert('不能重复领取！')
        }
    }
    leval3Click(){
        let leval3_has = this.results.data.receive_info.level_3.has_receive;
        if(leval3_has===0) {
            this.fetchGold(3)
        }else{
            this.app.showAlert('不能重复领取！')
        }
    }
    leval4Click(){
        let leval4_has = this.results.data.receive_info.level_4.has_receive;
        if(leval4_has===0) {
            this.fetchGold(4)
        }else{
            this.app.showAlert('不能重复领取！')
        }
    }
    leval5Click(){
        let leval5_has = this.results.data.receive_info.level_5.has_receive;
        if(leval5_has===0){
            this.fetchGold(5)
        }else{
            this.app.showAlert('不能重复领取！')
        }
    }
}
