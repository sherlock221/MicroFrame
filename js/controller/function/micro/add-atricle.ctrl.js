MPreschool.controller("AddArticleCtrl",function($rootScope,$scope,$sce,Util,MicroSev,$modalInstance,SERVER,TEMPLATE_TYPE,UploadSev,item,VERSION){


    $scope.isAddAtricleForm =false;



    //当前对象
    $scope.currentItem = {
        menuId : item.menuId,
        templateType : item.templateType
    }


    //上传图片
    $scope.uploadPic = function (files,$event,type) {
        var temp = files[0]
        UploadSev.upload(temp).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ');
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            console.log("success..");
            if(data.code == "200"){
                $scope.currentItem.titleImgUrl = data.data.url;
                $scope.currentItem.photoImgUrl = data.data.url;
            }
            else{
                $rootScope.toastError(data.code);
            }
        });
    }


    //添加文章
    $scope.addAtricle = function(){
        $scope.isAddAtricleForm =true;
        MicroSev.addAtricle($scope.currentItem).then(function(res){

            if (res.rtnCode == "0000000") {
                $rootScope.toastSuccess("文章添加成功!");
                //回传
                $modalInstance.close( $scope.currentItem);

            }
            else {
                $rootScope.toastError(res.msg);

            }

            $scope.isAddAtricleForm = false;

        },function(){
            $scope.isAddAtricleForm = false;
        });


    }


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});