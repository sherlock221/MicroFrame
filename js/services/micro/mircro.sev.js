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
            //查询banner
            searchBanner : function(){
                var data = {
                    "style": "",
                    "data": {},
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/banner/queryBannerList",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },


            updateBanner : function(banner){
                var data = {
                    "style": "",
                    "data": banner,
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/banner/updateBanner",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },

            insertBanner : function(banner){
                var data = {
                    "style": "",
                    "data": banner,
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/banner/insertBanner",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },

            removeBanner : function(id){
                var data = {
                    "style": "",
                    "data": {},
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/banner/delBanner?id="+id,data)
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

                $http.post(SERVER.url.mp+"/osMenu/queryMenuList",data)
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
                    },
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/osMenu/querySubListByMenu?menuId="+menuId,data
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


