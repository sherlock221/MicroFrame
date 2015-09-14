'use strict';


/**
 * 配置路由
 * @sherlock221b
 */
MPreschool.config(
      function ($stateProvider, $urlRouterProvider,VERSION) {

          $stateProvider
              .state('app', {
                  url: '/app',
                  abstract : true,
                  templateUrl: 'tpl/app.html?v='+VERSION.vs
              })
              .state("app.fun",{
                  url: '/fun',
                  templateUrl: 'tpl/function/fun.html?v='+VERSION.vs
              })

              //微官网
              .state('app.fun.micro',{
                  url: '/micro',
                  templateUrl: 'tpl/function/micro/micro.html?v='+VERSION.vs,
                  controller : "MicroContentCtrl"
              })


          ////login
          $urlRouterProvider.otherwise('/app/fun/micro');


      }
  );



