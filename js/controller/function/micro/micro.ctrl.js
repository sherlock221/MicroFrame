var temp;
MPreschool.controller("MicroContentCtrl",function($rootScope,$scope,$sce,Util,MicroSev,SERVER,TEMPLATE_TYPE,UploadSev,VERSION){

    $rootScope.navActive =  "micro"    ;



    $scope.editorApp = false;

    //当前视图
    $scope.currentNavView = "index";

    //堆栈列表
    $scope.currentNavViewStrack = ["index"];





    //首页按钮列表
    $scope.menuList = [];

    //文本列表
    $scope.textList = [];

    $scope.cardList = [];

    //详情
    $scope.detailInfo  = {};


    //当前修改的item
    $scope.editorItem = "";
    //当前选择的按钮
    $scope.currentMenu = "";


    //标题超出
    $scope.isTitleOut = false;
    $scope.isJobOut = false;


    $scope.isSubmit = false;

    $scope.TEMPLATE_TYPE =  TEMPLATE_TYPE;


    //是否第一个
    $scope.isFirstIndex = true;


    //获得菜单列表
    var getMicroList = function(){
        MicroSev.getMicroList().then(function(res){
            $scope.menuList = res.bizData;
        });
    }



    //添加
    $scope.add = function(){
        //检测模板类型
        //card
        if($scope.currentMenu.templateType == TEMPLATE_TYPE.CARD_LIST.CODE){

        }

        $scope.editorItem = {
            "isAdd" : true
        };
    }

    //查询子菜单
    $scope.searchSubObj = function(menu){
        $scope.currentMenu = menu;


        $scope.isFirstIndex = false;


        MicroSev.getSubMicro(menu.id).then(function(res){

            //文本
            if(TEMPLATE_TYPE.TXT_LIST.CODE == menu.templateType){
                $scope.textList = res.bizData;
                $scope.toggleView(TEMPLATE_TYPE.TXT_LIST.TYPE);
            }
            //card
            else if(TEMPLATE_TYPE.CARD_LIST.CODE == menu.templateType){
                $scope.cardList = res.bizData;
                $scope.toggleView(TEMPLATE_TYPE.CARD_LIST.TYPE);
            }
            //详情
            else if(TEMPLATE_TYPE.DETAIL_INFO.CODE == menu.templateType){
                $scope.detailInfo = res.bizData;
                $scope.editorItem =  $scope.detailInfo;
                $scope.toggleView(TEMPLATE_TYPE.DETAIL_INFO.TYPE);
            }
            //联系我们
            else if(TEMPLATE_TYPE.CONTACT_INFO.CODE == menu.templateType){
                $scope.detailInfo = res.bizData;
                $scope.editorItem =  $scope.detailInfo;
                $scope.toggleView(TEMPLATE_TYPE.CONTACT_INFO.TYPE);
            }

        });
    }


    //去详情
    $scope.goDetail = function(detail,type){




        if(type == "contact"){
            $scope.detailInfo = detail;
            $scope.toggleView(TEMPLATE_TYPE.CONTACT_INFO.TYPE);
        }
        else if(type == "card_detail"){
            $scope.detailInfo = detail;
            $scope.toggleView(TEMPLATE_TYPE.DETAIL_CARD_INFO.TYPE);
        }
        else{
            $scope.detailInfo = detail;
            $scope.toggleView(TEMPLATE_TYPE.DETAIL_INFO.TYPE);
        }

        $scope.resetItem();

    }




    //去联系人
    $scope.goContact = function(){
            $scope.contactInfo =
                $scope.toggleView(TEMPLATE_TYPE.CONTACT_INFO.TYPE);
    }



    //清除editor
    $scope.resetItem = function(){
        if($scope.editorItem)
            $scope.editorItem = "";
    }


    //修改
    $scope.editor = function(item){
        console.log("当前修改item..",item);
        $scope.editorItem = item;
    }



    //修改app
    $scope.toggleEditor = function(editor){
        $scope.editorApp = editor;

        //保存
        if(!editor){
            MicroSev.changeUsername($rootScope.user.emapName)
                .then(function(res){
                    if(res.rtnCode == "0000000") {
                        $rootScope.toastSuccess('保存成功');
                        $rootScope.setUser($rootScope.user);
                    }else{
                        $rootScope.toastError(res.msg);
                    }
                })
        }

    }


    //切换视图
    $scope.toggleView = function(viewName){
        $scope.currentNavView = viewName;

        if(viewName !=  $scope.currentNavViewStrack[$scope.currentNavViewStrack.length-1]){
            $scope.currentNavViewStrack.push(viewName);
        }
        console.log(viewName);
    }

    //返回上一级
    $scope.goBack = function(){


        var last;
         $scope.currentNavViewStrack.pop();
        if($scope.currentNavViewStrack.length > 0){
             last = $scope.currentNavViewStrack[$scope.currentNavViewStrack.length-1];
            $scope.currentNavView = last;
        }

        if(last == "index"){
            $scope.isFirstIndex = true;
        }

        $scope.resetItem();

        console.log($scope.currentNavViewStrack);
    }



    //上传图片
    $scope.uploadPic = function (files,$event,type) {
        var temp = files[0]
        UploadSev.upload(temp).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ');
        }).success(function (data, status, headers, config) {
            console.log("success..");
            if(data.code == "200"){
                $scope.editorItem.titleImgUrl = data.data.url;
                $scope.editorItem.photoImgUrl = data.data.url;
            }
            else{
                $rootScope.toastError(data.code);
            }
        });
    }



    //预览
    $scope.preView = function(){




    }


    //删除item
    $scope.removeMicroItem = function(item){
        console.log("将要删除的id:",item.id);
            //删除文章
            MicroSev.removeAtricle(item.menuId,item.id)
                .then(function(res){
                    if (res.rtnCode == "0000000") {
                        $rootScope.toastSuccess("删除成功!");
                        //刷新
                        $scope.searchSubObj($scope.currentMenu);

                        //清空item
                        $scope.editorItem = "";
                    }
                    else {
                        $rootScope.toastError(res.msg);

                    }
                });
    }


    $scope.submit = function(){

        if($scope.editorItem.isAdd){
            $scope.submitAdd();
        }
        else{
            $scope.submitUpdate();
        }
    }

    //添加文章
    $scope.submitAdd = function(){

        $scope.isSubmit = true;
        console.log("要添加的item",$scope.editorItem);
        if(!$scope.editorItem){
            $rootScope.toastError("提交数据格式错误!");
            return;
        }

        //按钮下添加文章
        $scope.editorItem.menuId = $scope.currentMenu.id;
        $scope.editorItem.templateType = $scope.currentMenu.templateType;

        MicroSev.addAtricle($scope.editorItem).then(function(res){
            if (res.rtnCode == "0000000") {
                $rootScope.toastSuccess("文章添加成功!");
                //刷新
                $scope.searchSubObj($scope.currentMenu);
                //清空item
                $scope.editorItem = "";
            }
            else {
                $rootScope.toastError(res.msg);
            }




            $scope.isSubmit = false;

        },function(){
            $scope.isSubmit = false;
        });
    }


    //提交更新
    $scope.submitUpdate = function(){

        $scope.isSubmit = true;
        console.log("要更新的item",$scope.editorItem);
        if(!$scope.editorItem){
            $rootScope.toastError("提交数据格式错误!");
            return;
        }


        MicroSev.updateArticle($scope.editorItem).then(function(res){
            if (res.rtnCode == "0000000") {

                $rootScope.toastSuccess("修改成功");
                //刷新
                $scope.searchSubObj($scope.currentMenu);
            }
            else {
                $rootScope.toastError(res.msg);
            }
            $scope.isSubmit = false;
        },function(){
            $scope.isSubmit = false;
        });

    }

    getMicroList();




});