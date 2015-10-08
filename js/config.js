/**
 * Micro 配置
 */




//常量配置
MPreschool.constant("VERSION",{
    vs : "117"
});


MPreschool.constant("ICON_CONS",{
    ICON : [
        {
            "iconName":"icon-compass",
            "iconColor":"#5fc124"
        },
        {"iconName":"icon-house","iconColor":"#90c124"},
        {"iconName":"icon-letter","iconColor":"#ffcd2d"},
        {"iconName":"icon-puzzle","iconColor":"#ffcd2d"},
        {"iconName":"icon-share","iconColor":"#cf2cb2"},
        {"iconName":"icon-teacher","iconColor":"#f67900"},
        {"iconName":"icon-telbook","iconColor":"#60a5f4"},
        {"iconName":"icon-treatment","iconColor":"#ff4600"}
    ]
});



//模板类型
MPreschool.constant("TEMPLATE_TYPE",{

    "TXT_LIST"  : {
        CODE : 3,
        URL: "#/app/s1/list/text",
        NAME : "文字列表",
        TYPE : "list"
    },
    "IMG_LIST"  : {
        CODE : 2,
        URL: "#/app/s1/list/image",
        NAME : "图片列表",
        TYPE : "img_list"
    },
    "MENU_ICON" : {
        CODE : 1,
        URL: "#/app/s1/menu/icon",
        NAME : "按钮菜单",
        TYPE : "menu"
    },
    "MENU_CUSTOM" : {
        CODE : 1,
        URL: "#/app/s1/menu/custom",
        NAME : "自定义背景按钮",
        TYPE : "menu"
    },
    "CARD_LIST" : {
        CODE : 4,
        URL: "#/app/s1/list/card",
        NAME : "卡片列表",
        TYPE : "card"
    },
    "CONTACT_INFO" : {
        CODE : 5,
        URL: "#/app/contact",
        NAME : "联系我们",
        TYPE : "concat"
    },
    "DETAIL_INFO" : {
        CODE : 6,
        URL: "#/app/detail/imgText",
        NAME : "图文详情",
        TYPE : "detail"
    },
    "DETAIL_CARD_INFO":{
        URL: "#/app/detail/cardInfo",
        NAME : "卡片详情",
        TYPE : "card_detail"
    }
})


MPreschool.constant("SERVER", {
    url : {
        index:"",
        file : "",
        mp  : "",
        auther : "",
        micro : ""
    },
    //测试
    testUrl : {

        //微官网操作后台
        mp  : "http://172.16.170.69:8084/official",
        //文件上传
        file : "http://10.10.68.11:10000/file",
        editor : "http://imzhiliao.com:3001/cmw",
        cookieDomain : "http://172.16.170.69:8084/official"
    },

    //预发布
    formalUrl : {
        //微官网操作后台
        mp  : "http://official.weixiao100.cn",
        //文件上传
        file : "http://imzhiliao.com:10000/file",
        editor : "http://imzhiliao.com:3001/cmw",

        cookieDomain : "http://official.weixiao100.cn"
    }
});

//配置http 拦截器
MPreschool.config(function($httpProvider){
    $httpProvider.interceptors.push("AjaxInterceptors");

});

//配置loading 加载
MPreschool.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;

}])




//启动项
MPreschool.run(function($rootScope,VERSION){
    $rootScope.VERSION = VERSION;
});
