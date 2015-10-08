/**
 * @sherlock221b
 */
MPreschool
    .factory("MicroSev", function ($q,$http,SERVER,TEMPLATE_TYPE) {

        var MicroSev = {

            //添加文章
            addAtricle : function(obj){
                var data = {
                    "style": "",
                    "data": obj,
                    "clientInfo": {}
                };


                var url;
                var defer = $q.defer();
                if(obj.templateType == TEMPLATE_TYPE.CARD_LIST.CODE){
                    url = SERVER.url.mp+"/article/insertTeacher";
                }
                else{
                    url = SERVER.url.mp+"/article/insertArticle";
                }


                $http.post(url,data)
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

            searchSchoolName : function(){
                var data = {
                    "style": "",
                    "data": {},
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/public/osMenu/getSchoolName",data)
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
                $http.post(SERVER.url.mp+"/article/delArticle?id="+id+"&menuId="+menuId,data)
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

            //更新文章
            updateArticle : function(menu,sub){
                var data = {
                    "style": "",
                    "data": sub,
                    "clientInfo": {}
                };
                var defer = $q.defer();
                var url;
                if(menu.templateType == TEMPLATE_TYPE.CARD_LIST.CODE){
                    url = SERVER.url.mp+"/article/updateTeacher";
                }
                else{
                    url = SERVER.url.mp+"/article/updateArticle";
                }
                $http.post(url,data
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
            },

            //添加按钮
            addMenu : function(obj){
                var data = {
                    "style": "",
                    "data": {
                        "parentId" : 0,
                        "templateType" : obj.templateType,
                        "menuName" : obj.menuName,
                        "iconName" : obj.iconName,
                        "iconColor" : obj.iconColor,
                        "iconType"  : obj.iconType,
                        "menuUrl"  : obj.menuUrl,
                        "iconUrl"  : obj.photoImgUrl
                    },
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/osMenu/insertMenu",data)
                    .success(function(result){
                        defer.resolve(result);
                    })
                    .error(function(err){
                        defer.reject(err);
                    });
                return defer.promise;
            },
            //删除按钮
            removeMenu : function(menuId){
                var data = {
                    "style": "",
                    "data": {
                        menuId : menuId
                    },
                    "clientInfo": {}
                };
                var defer = $q.defer();
                $http.post(SERVER.url.mp+"/osMenu/deleteMenu?menuId="+menuId,data)
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


