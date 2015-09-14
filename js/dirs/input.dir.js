MPreschool.directive("inputArea", function ($timeout,Util) {

    return {
        restrict : "E",
        transclude : true,
        templateUrl : 'tpl/dir/input.html',
            scope : {
                content : "=",
                txtLength : "@",
                isOut : "="
            },

        link : function(scope,element,attrs){
            scope.isOut = false;

            console.log("input..",scope.content);
            console.log(scope.txtLength);


            if(scope.content){
                scope.txtShow =  scope.txtLength - scope.content.length;
            }
            else{
                scope.txtShow =  scope.txtLength;

            }


            scope.$watch("content",function(newData){
                        input();


            });
            var input= function(){

                var ct = scope.content || "";
                var less = scope.txtLength - ct.length;

                if(Util.isNegative(less)){
                    scope.isOut = true;
                }
                else{
                    scope.isOut = false;
                }
                    scope.txtShow = less;
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
