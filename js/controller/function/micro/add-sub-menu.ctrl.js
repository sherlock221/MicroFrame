MPreschool.controller("AddSubMenuCtrl",function($rootScope,$scope,$sce,Util,MicroSev,$modalInstance,SERVER,ICON_CONS,TEMPLATE_TYPE,UploadSev,item,VERSION){


    $scope.MenuFormSubmit =false;


    //传递对象
    $scope.item = item;

    $scope.templateType = "";
    $scope.iconColor  = "";
    $scope.iconName  = "";
    $scope.menuName = "";


    // 按钮icon
    $scope.menuIconList =  ICON_CONS.ICON;

    //模板类型
    $scope.templateTypeList = _.toArray(TEMPLATE_TYPE).filter(function(obj){
        return  obj.CODE == TEMPLATE_TYPE.TXT_LIST.CODE ||  obj.CODE == TEMPLATE_TYPE.IMG_LIST.CODE || obj.CODE == TEMPLATE_TYPE.DETAIL_INFO.CODE;
    });



    //添加文章
    $scope.addMenu = function(){



        if(!$scope.iconColor){
            $rootScope.toastError("请选择按钮背景色");
            return;
        }
        else if(!$scope.iconName){

            $rootScope.toastError("请选按钮icon");
            return;
        }
        else if(!$scope.templateType){
            $rootScope.toastError("请选择按钮模板");
            return;
        }

        console.log($scope.templateType);
        console.log($scope.iconColor.iconColor);
        console.log($scope.iconName.iconName);
        $scope.MenuFormSubmit =true;


        var data = {
            templateType : $scope.templateType.CODE,
            iconColor : $scope.iconColor.iconColor,
            iconName : $scope.iconName.iconName,
            menuName : $scope.menuName,
            menuUrl :$scope.templateType.URL,
            parentId : $scope.item.parentId

        };


        MicroSev.addSubMenu(data).then(function(res){

            if (res.rtnCode == "0000000") {
                $rootScope.toastSuccess("按钮添加成功!");

                //回传
                $modalInstance.close(data);
            }
            else {
                $rootScope.toastError(res.msg);
            }
            $scope.MenuFormSubmit =false;

        },function(){
            $scope.MenuFormSubmit =false;
        });

    }




    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    //选择icon
    $scope.onItemIconSelect = function($item){
        $scope.iconName = $item;
    }

    $scope.onItemIconColorSelect = function($item){
        $scope.iconColor = $item;
    }

    $scope.selectMenuType = function($item){
        $scope.templateType = $item
    }




});