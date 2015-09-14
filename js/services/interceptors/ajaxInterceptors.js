/**
 * angularJS http拦截器
 */

MPreschool
    .factory("AjaxInterceptors",function(cfpLoadingBar,$q,$rootScope){
        return {
            //成功请求
            'request' : function(config ){
                cfpLoadingBar.start();


                    if(config.method == "POST" ||  config.method == "PUT"){

                        if(!config.headers['no-json-data']){
                            config.data.data = config.data.data || {};
                            config.data.data.token  =  localStorage.getItem("token");
                        }
                        else{
                            delete  config.headers['no-json-data'];
                        }
                    }

                    //else if(config.method = "GET"){
                    //    if( config.headers['Content-Type'] == "application/json"){
                    //        config.params =   config.params || {};
                    //        config.params.token = $window.sessionStorage.token;
                    //    }
                    //}

                return config ;
            },

            //成功返回
            response : function(response){
                cfpLoadingBar.complete();


                if(response.data.rtnCode && response.data.rtnCode == "0900001"){
                    $rootScope.error = 401;
                }


                return response;
            },

            //捕获返回异常
            responseError : function(response){

                var temp = {};

                switch (response.status) {
                    case (500):
                        temp.content  = "服务器错误(500)";
                        break;
                    case (401):
                        temp.content  = "您未登录";
                        break;
                    case (403):
                        temp.content  = "您没有权限";

                        break;
                    case (404):
                        temp.content  = "没找到该资源(404)";
                        break;
                    case (408):
                        temp.content  = "服务器超时";
                        break;
                    default:
                        temp.content  = "网络错误";
                }


                $rootScope.toastError(temp.content);

                return $q.reject(response);
            }
        }

    });