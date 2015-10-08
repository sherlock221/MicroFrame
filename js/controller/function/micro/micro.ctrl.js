var temp;
MPreschool.controller("MicroContentCtrl", function ($rootScope, $scope, $sce, Util, MicroSev, SERVER, TEMPLATE_TYPE, UploadSev, ICON_CONS,VERSION) {

    $rootScope.navActive = "micro";


    $scope.editorApp = false;

    //当前视图
    $scope.currentNavView = "index";

    //堆栈列表
    $scope.currentNavViewStrack = ["index"];

    //banner
    $scope.bannerList = [];


    //banner控制
    $scope.isBannerShow = false;


    //首页按钮列表
    $scope.menuList = [];

    //文本列表
    $scope.textList = [];

    $scope.cardList = [];

    //详情
    $scope.detailInfo = {};


    //当前修改的item
    $scope.editorItem = "";


    //当前选择的按钮
    $scope.currentMenu = "";

    $scope.iconNameObj = {};

    //标题超出
    $scope.isTitleOut = false;
    $scope.isJobOut = false;


    $scope.isSubmit = false;

    $scope.TEMPLATE_TYPE = TEMPLATE_TYPE;


    $scope.menuTemplateTypeList =  _.toArray(TEMPLATE_TYPE).filter(function(obj){
        return  obj.CODE == TEMPLATE_TYPE.TXT_LIST.CODE ||  obj.CODE == TEMPLATE_TYPE.CARD_LIST.CODE ||  obj.CODE == TEMPLATE_TYPE.DETAIL_INFO.CODE  || obj.CODE == TEMPLATE_TYPE.IMG_LIST.CODE ;
    });




    var getTemplateByCode = function(code){

        var array  =  _.toArray(TEMPLATE_TYPE);

        for(var i=0;i<array.length;i++){
            var obj = array[i];
            if(obj.CODE == code){
                return obj;
            }
        }

        return null;
    }


    $scope.ICON_LIST =  ICON_CONS.ICON;

    console.log($scope.menuTemplateTypeList);

    //是否第一个
    $scope.isFirstIndex = true;


    //获得菜单列表
    var getMicroList = function () {
        MicroSev.getMicroList().then(function (res) {
            $scope.menuList = res.bizData;
        });
    }



    //添加
    $scope.add = function () {
        //检测模板类型
        //card
        if ($scope.currentMenu.templateType == TEMPLATE_TYPE.CARD_LIST.CODE) {

        }

        $scope.editorItem = {
            "isAdd": true
        };
    }

    //添加按钮
    $scope.addMenu  = function(){

        $scope.currentMenu  = {
            templateType : TEMPLATE_TYPE.MENU_ICON.CODE,
            "parentId" : 0,
            "iconType"  : 1
        }

        $scope.editorItem = {
            "isAdd": true
        };
    }

    //查询子菜单
    $scope.searchSubObj = function (menu) {
        $scope.currentMenu = menu;


        $scope.isFirstIndex = false;

        MicroSev.getSubMicro(menu.id).then(function (res) {

            //文本
            if (TEMPLATE_TYPE.TXT_LIST.CODE == menu.templateType) {
                $scope.textList = res.bizData;
                $scope.toggleView(TEMPLATE_TYPE.TXT_LIST.TYPE);
            }
            //card
            else if (TEMPLATE_TYPE.CARD_LIST.CODE == menu.templateType) {
                $scope.cardList = res.bizData;
                $scope.toggleView(TEMPLATE_TYPE.CARD_LIST.TYPE);
            }
            //图片
            else if (TEMPLATE_TYPE.IMG_LIST.CODE == menu.templateType) {
                $scope.imgList = res.bizData;
                $scope.toggleView(TEMPLATE_TYPE.IMG_LIST.TYPE);
            }

            //详情
            else if (TEMPLATE_TYPE.DETAIL_INFO.CODE == menu.templateType) {
                $scope.detailInfo = res.bizData;
                $scope.editorItem = $scope.detailInfo;
                $scope.toggleView(TEMPLATE_TYPE.DETAIL_INFO.TYPE);
            }
            //联系我们
            else if (TEMPLATE_TYPE.CONTACT_INFO.CODE == menu.templateType) {
                $scope.detailInfo = res.bizData;
                $scope.editorItem = $scope.detailInfo;
                $scope.toggleView(TEMPLATE_TYPE.CONTACT_INFO.TYPE);
            }

        });
    }


    //去详情
    $scope.goDetail = function (detail, type) {


        if (type == "contact") {
            $scope.detailInfo = detail;
            $scope.toggleView(TEMPLATE_TYPE.CONTACT_INFO.TYPE);
        }
        else if (type == "card_detail") {
            $scope.detailInfo = detail;
            $scope.toggleView(TEMPLATE_TYPE.DETAIL_CARD_INFO.TYPE);
        }
        else {
            $scope.detailInfo = detail;
            $scope.toggleView(TEMPLATE_TYPE.DETAIL_INFO.TYPE);
        }

        $scope.resetItem();

    }


    //去联系人
    $scope.goContact = function () {
        $scope.contactInfo =
            $scope.toggleView(TEMPLATE_TYPE.CONTACT_INFO.TYPE);
    }


    //清除editor
    $scope.resetItem = function () {
        if ($scope.editorItem)
            $scope.editorItem = "";
    }


    //修改
    $scope.editor = function (item) {
        console.log("当前修改item..", item);
        $scope.editorItem = item;
    }


    //修改app
    $scope.toggleEditor = function (editor) {
        $scope.editorApp = editor;

        //保存
        if (!editor) {
            MicroSev.changeUsername($rootScope.user.emapName)
                .then(function (res) {
                    if (res.rtnCode == "0000000") {
                        $rootScope.toastSuccess('保存成功');
                        $rootScope.setUser($rootScope.user);
                    } else {
                        $rootScope.toastError(res.msg);
                    }
                })
        }

    }


    //切换视图
    $scope.toggleView = function (viewName) {
        $scope.currentNavView = viewName;

        if (viewName != $scope.currentNavViewStrack[$scope.currentNavViewStrack.length - 1]) {
            $scope.currentNavViewStrack.push(viewName);
        }
        console.log(viewName);
    }

    //返回上一级
    $scope.goBack = function () {


        var last;
        $scope.currentNavViewStrack.pop();
        if ($scope.currentNavViewStrack.length > 0) {
            last = $scope.currentNavViewStrack[$scope.currentNavViewStrack.length - 1];
            $scope.currentNavView = last;
        }

        if (last == "index") {
            $scope.isFirstIndex = true;
        }

        $scope.resetItem();

        console.log($scope.currentNavViewStrack);
    }


    //上传图片
    $scope.uploadPic = function (files, $event, type) {
        var temp = files[0]
        if(temp){
            UploadSev.upload(temp).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ');
            }).success(function (data, status, headers, config) {
                console.log("success..");
                if (data.code == "200") {
                    if (type == 'banner') {
                        $scope.editorItem.imgUrl = data.data.url;
                    }
                    else {
                        $scope.editorItem.titleImgUrl = data.data.url;
                        $scope.editorItem.photoImgUrl = data.data.url;
                    }
                }
                else {
                    $rootScope.toastError(data.code);
                }
            });
        }
    }


    //预览
    $scope.preView = function () {


    }


    //删除item
    $scope.removeMicroItem = function (item) {
        console.log("将要删除的id:", item.id);
        //删除文章
        MicroSev.removeAtricle(item.menuId, item.id)
            .then(function (res) {
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


    $scope.submit = function () {

        if ($scope.editorItem.isAdd) {
            $scope.submitAdd();
        }
        else {
            $scope.submitUpdate();
        }
    }

    //添加文章
    $scope.submitAdd = function () {

        $scope.isSubmit = true;
        console.log("要添加的item", $scope.editorItem);
        if (!$scope.editorItem) {
            $rootScope.toastError("提交数据格式错误!");
            return;
        }

        //添加菜单
        if($scope.editorItem.templateType){

            var tempType  =  getTemplateByCode($scope.editorItem.templateType);
            console.log(tempType.menuUrl);
            $scope.editorItem.menuUrl = tempType.URL;

            MicroSev.addMenu($scope.editorItem).then(function (res) {
                if (res.rtnCode == "0000000") {
                    $rootScope.toastSuccess("菜单添加成功!");
                    //清空item
                    $scope.editorItem = "";

                    //刷新
                    getMicroList();
                }
                else {
                    $rootScope.toastError(res.msg);
                }

                $scope.isSubmit = false;

            }, function () {
                $scope.isSubmit = false;
            });


        }
        else{
            //按钮下添加文章
            $scope.editorItem.menuId = $scope.currentMenu.id;
            $scope.editorItem.templateType = $scope.currentMenu.templateType;

            MicroSev.addAtricle($scope.editorItem).then(function (res) {
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

            }, function () {
                $scope.isSubmit = false;
            });

        }




    }


    //提交banner
    $scope.submitBanner = function (isAdd) {

        $scope.isSubmit = true;
        console.log("banner", $scope.editorItem);

        if (!$scope.editorItem) {
            $rootScope.toastError("提交数据格式错误!");
            return;
        }

        var msgType = "add";
        var successFun = function (res) {
            if (res.rtnCode == "0000000") {
                $rootScope.toastSuccess(msgType == "add" ? "添加成功" :"更新成功");
                $scope.editorItem = "";
                searchBanner();
            }
            else {
                $rootScope.toastError(res.msg);
            }
            $scope.isSubmit = false;
        }

        var errorFun = function(){
            $scope.isSubmit = false;

        }
        if ($scope.editorItem.isAdd) {
            msgType = "add";
            MicroSev.insertBanner($scope.editorItem).then(successFun,errorFun);
        }
        else {
            msgType = "update";
            MicroSev.updateBanner($scope.editorItem).then(successFun,errorFun);
        }

    }

    //提交更新
    $scope.submitUpdate = function () {

        $scope.isSubmit = true;
        console.log("要更新的item", $scope.editorItem);
        if (!$scope.editorItem) {
            $rootScope.toastError("提交数据格式错误!");
            return;
        }



        MicroSev.updateArticle($scope.currentMenu,$scope.editorItem).then(function (res) {
            if (res.rtnCode == "0000000") {

                $rootScope.toastSuccess("修改成功");
                //刷新
                $scope.searchSubObj($scope.currentMenu);
            }
            else {
                $rootScope.toastError(res.msg);
            }
            $scope.isSubmit = false;
        }, function () {
            $scope.isSubmit = false;
        });

    }


    var searchBanner = function () {
        MicroSev.searchBanner().then(function (res) {
            if (res.rtnCode == "0000000") {
                $scope.bannerList = res.bizData;
            }
            else {
                $rootScope.toastError(res.msg);
            }
            $scope.isSubmit = false;
        }, function () {
            $scope.isSubmit = false;
        });
    }


    //修改banner
    $scope.updateBannerLayer = function (banner) {
        banner.isBanner = true;
        banner.isAdd = false;
        $scope.editorItem = banner;

    }

    $scope.addBannerLayer = function(){
        $scope.editorItem = {
            imgUrl : "",
            isBanner : true,
            isAdd : true
        };
    }


    //添加banner
    $scope.bannerAddTemp = function(){
        $scope.editorItem = {
            imgUrl : "",
            isBanner : true,
            isAdd : true
        };

        console.log("add banner...");

    }


    //删除banner
    $scope.removeBannerLayer = function (banner) {
        console.log("将要删除的id:", banner.id);
        //删除文章
        MicroSev.removeBanner(banner.id)
            .then(function (res) {
                if (res.rtnCode == "0000000") {
                    $rootScope.toastSuccess("删除成功!");
                    //清空item
                    $scope.editorItem = "";
                    searchBanner();
                }
                else {
                    $rootScope.toastError(res.msg);
                }
            });
    }

    $scope.onItemIconSelect = function($item){
        $scope.editorItem.iconName =  $item.iconName;
        console.log($scope.editorItem.iconName);
    }

    $scope.onItemColorSelect = function($item){
        $scope.editorItem.iconColor =  $item.iconColor;
        console.log($scope.editorItem.iconColor);
    }

    //删除menu
    $scope.delMenu = function(menu){


        MicroSev.removeMenu(menu.id)
            .then(function (res) {
                if (res.rtnCode == "0000000") {
                    $rootScope.toastSuccess("删除成功!");
                    //清空item
                    $scope.editorItem = "";
                    getMicroList();
                }
                else {
                    $rootScope.toastError(res.msg);
                }
            });
    }


    var searchSchoolInfo = function(){
        MicroSev.searchSchoolName()
            .then(function (res) {
                if (res.rtnCode == "0000000") {
                    $rootScope.schoolInfoObj = res.bizData;
                }
                else {
                    $rootScope.toastError(res.msg);
                }
            });
    }

    $scope.stop = function($event){
        $event.stopPropagation();
    }

    getMicroList();
    searchBanner();

    //查询学校信息
    searchSchoolInfo();


});