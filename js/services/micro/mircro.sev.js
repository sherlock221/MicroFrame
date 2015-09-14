/**
 * @sherlock221b
 */
MPreschool
    .factory("MicroSev", function ($q,$http,SERVER) {

        var MicroSev = {

            //添加文章
            addAtricle : function(obj){
                var data = {
                    "style": "",
                    "data": obj,
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/article/insertArticle",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },

            //添加二级按钮
            addSubMenu : function(obj){
                var data = {
                    "style": "",
                    "data": obj,
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/osMenu/insertOrUpdateMenu",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;


            },


            //删除单项
            removeAtricle : function(menuId,id){
                var data = {
                    "style": "",
                    "data": {
                        menuId : menuId,
                        id : id
                    },
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/article/delArticle",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },

            removeMenu : function(id){
                var data = {
                    "style": "",
                    "data": {
                        id : id
                    },
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/osMenu/deleteMenu",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },

            //获得菜单列表
            getMicroList : function(){
                var data = {
                    "style": "",
                    "data": {},
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/osMenu/queryMenuList?access_token=c5325c75-6c0a-4310-80d1-4f0b3ff8ba88",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },

            //获得子菜单
            getSubMicro : function(menuId){
                var data = {
                    "style": "",
                    "data": {
                        menuId : menuId
                    },
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/osMenu/querySubListByMenu",data
                )
                .success(function(result){
                    defer.resolve(result);
                })
                .error(function(err){
                    defer.reject(err);
                });

                return defer.promise;
            },


            //更新menu
            updateArticle : function(sub){
                var data = {
                    "style": "",
                    "data": {
                        menuId : sub.menuId,
                        infoData : sub
                    },
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/article/updateArticle",data
                )
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });

                return defer.promise;
            },


            changeUsername:function(emapName){

                var defer= $q.defer();

                var data = {
                    "style": "",
                    "data": {
                        emapName:emapName
                    },
                    "clientInfo": {}
                };

                $http.post(SERVER.url.mp+"/user/update",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });

                return defer.promise;

            }


        }



        return MicroSev;
    });


