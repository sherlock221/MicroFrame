MPreschool.directive("txtArea", function ($timeout,Util) {

    return {
        restrict : "E",
        transclude : true,
        templateUrl : 'tpl/dir/txtArea.html',
            scope : {
                content : "=",
                txtLength : "=",
                isOut : "="

            },
        link : function(scope,element,attrs){

            console.log("txtArea..",scope.content);
            console.log(scope.txtLength);

            scope.isOut = false;

            if(scope.content){
                scope.txtShow =  scope.txtLength - scope.content.length;
            }
            else{
                scope.txtShow =  scope.txtLength;

            }


            scope.$watch("content",function(newData){
                    console.log("s content s");
                        input();


            });
            var input= function(){

                var ct = scope.content || "";
                var less = scope.txtLength - ct.length;

                if(Util.isNegative(less)){
                    scope.isOut = true;
                   // scope.$apply();
                }
                else{
                    scope.isOut = false;
                }
                    scope.txtShow = less;
                //console.log(scope.isOut);
            }







        }

    }
});
MPreschool.filter("txtOut",function(Util){
    return function(txt){
        if(Util.isNegative(txt)){
            return  "超出" + txt+ "个字";
        }
        else{
            return  "剩余" + txt + "个字";
        }
    }

});
