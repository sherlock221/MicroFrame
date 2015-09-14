MPreschool.filter("serviceTypeInfo",function(){
    return function(name){

        var obj = JSON.parse(name);
        if(obj.id == "1"){
            return "订阅号";
        }
        else if(obj.id == '0'){
            return "订阅号";
        }else{
            return "服务号";
        }
    }
});


MPreschool.filter("status",function(){
    return function(status){
        if(status == "1"){
            return true;
        }
        else {
            return false;
        }
    }
});


MPreschool.filter("verifyTypeInfo",function(){
    return function(confirmtype){
        var obj=JSON.parse(confirmtype);
        if(obj.id == "-1"){
            return "未";
        }
        else if(obj.id == "0"){
            return "微信";
        }
        else if(obj.id == "1"){
            return "新浪微博";
        }
        else {
            return "腾讯微博";
        }
    }
});

MPreschool.filter("verifyReplyType",function(){
    return function(type){
        if (type=="4"){
            return "文本";
        }
        else if(type=="5"){
            return "图文";
        }
        else {
            return "其他";
        }
    }
});

MPreschool.filter("trustAsRes",function($sce){
    return function(res){
        return  $sce.trustAsResourceUrl(res)
    }
});


MPreschool.filter("formatReplyType",function(){
    return function(type){

        if(type == "5"){
            return  "图文";
        }
        else if(type =="4"){
            return "文本";
        }
        else {
            return "未知";
        }
    }
});