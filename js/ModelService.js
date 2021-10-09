//定义model模块
var model = angular.module('model', []);
function Guest(name,phone,gender){
    this.name=name
    this.phone=phone
    this.gender=gender
    this.state=Guest.INVITE
}
Guest.INVITE='邀请中'
Guest.ACCEPT='已接受'
Guest.REFUSE='已拒绝'
Guest.ALL='全部'

Guest.prototype.accept=function(){
    this.state=Guest.ACCEPT
}
Guest.prototype.refuse=function(){
    this.state=Guest.REFUSE
}

model.factory('modelService', function () {
    return{
        list:[
            //{name:'小明', phone:'13899999999',gender:'男',state:'邀请中'},
            //{name:'小黄', phone:'13888888888',gender:'男',state:'已接受'},
            //{name:'小红', phone:'13877777777',gender:'女',state:'已拒绝'}

        ],
        getList:function(){
            return this.list
        },
        add:function(name, phone, gender){
            var isok=true
            isok=!!(isok&&name&&phone)
            if(!isok){
                return{
                    code:1,
                    guest:null
                }       
            }
            var tempArr = this.list.filter(function(item){
                return item.phone==phone    
            })
            if(tempArr.length>0){
                isok=false;
                return{
                    code:2,
                    guest:null
                }
            }
            var guest = new Guest(name, phone, gender)
            this.list.push(guest)
            return{
                code:0,
                guest:guest
            }
        },
        remove:function(guest){
            this.list=this.list.filter(function(item){
                return guest.phone != item.phone;
            })
        }
    }
});