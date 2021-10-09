//定义model模块

var model = angular.module('nameList.model', []);
/*
 * Guest对象：受邀嘉宾
 */
function Guest(name, phone, gender) {
    this.name = name;//姓名
    this.phone = phone;//电话
    this.gender = gender;//性别
    this.state = Guest.INVITE;//状态
}
// 定义常量用于记录邀请状态
Guest.INVITE = '邀请中';
Guest.ACCEPT = '已接受';
Guest.REFUSE = '已拒绝';
Guest.ALL = '全部';
//接受邀请
Guest.prototype.accept = function () {
    this.state = Guest.ACCEPT;
};
//拒绝邀请
Guest.prototype.refuse = function () {
    this.state = Guest.REFUSE;
};
model.factory('modelService', function () {
    /*
     * guestList对象
     * */
    var guestList = {
        list: [],
        add: function (name, phone, gender) {//添加方法
            // 判断是否可以添加
            var isok = true;
            //  1. 判断用户名或者手机号是否为空
            // 如果嘉宾的姓名或者手机号中有一个是空的，则isok是false。否则是，true。
            isok = !!(isok && name && phone);

            if (!isok) {
                return {
                    code: 1, // code值为1表示手机号或者用户名是空的
                    guest: null
                }
            }
            // 2. 判断用户的手机是否重复
            var tempArr = this.list.filter(function (guest) {
                return guest.phone == phone;
            });

            if (tempArr.length > 0) {
                isok = false;
            }

            if (!isok) {
                return {
                    code: 2, // code值为2表示是重复的用户
                    guest: null
                }
            }
            var guest = new Guest(name, phone, gender);
            this.list.push(guest);
            return {
                code: 0, //code值为0代表添加成功
                guest: guest
            }
        },
        remove: function (guest) {//删除方法
            this.list = this.list.filter(function (item) {
                return guest.phone != item.phone;
            })
        },
        // 获取和状态码相同的所有用户的信息
        getList: function (state) {
            if (state == Guest.ALL) {
                return this.list.filter(function () {
                    return true;
                });
            }
            return this.list.filter(function (guest) {
                return guest.state == state;
            });
        }
    };
    return guestList;

});