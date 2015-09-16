/**
 * @desc 全局ctrl
 * @auth sherlock221b
 */





MPreschool.controller("MainCtrl",function($rootScope,$scope,$modal,SERVER,$location,$state,Util,toastrConfig,toastr,TEMPLATE_TYPE,VERSION){

    //当前环境
    SERVER.url  = SERVER.testUrl;




    //错误判断
    $rootScope.$watch("error",function(newData){
        if(newData && newData == 401){
            $rootScope.toastError("请重新登录");
            Util.removeLg("token");
            delete $rootScope.error;
            $state.go("app.auth.login");
        }
    })


    //UM编辑器配置
    $rootScope.editor = {
        configBase : {
            //这个很重要一定为空
            imagePath : "",
            imageUrl : SERVER.url.editor+"/upload/file/editor"
//          toolbar: ['undo redo | bold italic underline']
        }
    }


    //模板类型
    $rootScope.TEMPLATE_TYPE = TEMPLATE_TYPE;

    //导航选中状态
    $rootScope.navActive =  "";

    $rootScope.setUser = function(user){
        Util.setLgObj("user",user);
        Util.setLg("token",user.token);
        $rootScope.user = user;

    }

    $rootScope.getUser = function(){
        return Util.getLgObj("user");
    }
    $rootScope.getToken = function(){
        return Util.getLg("token");
    }


    $rootScope.logoOut = function(){
         Util.removeLg("token");
         Util.removeLg("user");
         $rootScope.user = "";
        $state.go("app.auth.login");

    }


    //toast
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.maxOpened = 1;
    $rootScope.toastSuccess = function(content,timeOut){
        toastr.success(content,{
            timeOut : timeOut || 2500,
            positionClass: 'toast-bottom-center'
        });
    }

    $rootScope.toastError = function(content,timeOut){
        toastr.error(content,{
            timeOut : timeOut || 2500,
            positionClass: 'toast-bottom-center'
        });
    }

    $rootScope.toastInfo = function(content,timeOut){
        toastr.info(content,{
            timeOut : timeOut || 2500,
            positionClass: 'toast-bottom-center'
        });
    }

    //go state
    $rootScope.goState = function(name){
        if($rootScope.settingLayer){
            $rootScope.settingLayer = false;
        }
        $state.go(name);
    }

    //弹窗
    $rootScope.dialog = function(templateUrl,controllerName,resolve,ops){
        var option = {};
        if(controllerName){

            option = {
                templateUrl: templateUrl,
                controller  : controllerName,
                resolve : resolve || {},
                backdrop : 'static'

            };
            ops = {
                size:ops
            };
            option =  angular.extend(option,ops);
        }
        else{
            option = {
                templateUrl: templateUrl
            };
        }
        var modalInstance = $modal.open(option);
        return modalInstance;
    }


    //提示
    $rootScope.confirm = function(ev,title,content,ok,cancel) {

        var isConfirm = window.confirm("使用二级菜单后，当前编辑的消息将会被清除。确定使用二级菜单？");
        return isConfirm;
    };


    //当前用户
    var user = $rootScope.getUser();

    if(user){

        if(user.verify_type_info) {
            $rootScope.user = user;
            var ve = JSON.parse(user.verify_type_info);
            $rootScope.verifyType = ve.id;
            console.log("认证", $rootScope.verifyType);
        }
    }


    var auth = function(stateName){
        if(!$rootScope.user
            && stateName != "app.auth.register"
            &&  stateName != "app.auth.login"){
                return false;
        }
        return true;
    }


    //路由监听器
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){

        })


    //添加子菜单
    $scope.addSubMenu = function(){
        
    }


    $rootScope.getUrlParams = function(){
        var paramsUrl;
        if ($location.$$absUrl.indexOf("#") == -1) {
            paramsUrl = $location.$$absUrl.substring($location.$$absUrl.indexOf("?") + 1, $location.$$absUrl.length);

        }
        else {
            paramsUrl = $location.$$absUrl.substring($location.$$absUrl.indexOf("?") + 1, $location.$$absUrl.indexOf("#"));
        }

        return Util.parseParams(paramsUrl);
    }

    //获得token
    var  paramList = $rootScope.currentUrlParams = $rootScope.getUrlParams();

    //获得url参数
    var schoolCode = Util.getParam("schoolCode",paramList);
    var access_token =  Util.getParam("access_token",paramList);



    if(!schoolCode)
        $rootScope.toastError("schoolCode 不存在!");
    else
        Util.setLg("schoolCode",schoolCode);


    if(!access_token)
        $rootScope.toastError("access_token 不存在!");
    else{
        Util.setLg("access_token",access_token);

    }



    console.log(schoolCode,access_token);



});