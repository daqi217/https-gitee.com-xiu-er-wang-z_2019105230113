//定义model模块
var model = angular.module('model', []);

model.factory('modelService', function () {
    return{
        list:[
            {name:'小明', phone:'13899999999',gender:'男',state:'邀请中'},
            {name:'小黄', phone:'13888888888',gender:'男',state:'已接受'},
            {name:'小红', phone:'13877777777',gender:'女',state:'已拒绝'}
        ],
        getList:function(){
            return this.list
        }
    }
});