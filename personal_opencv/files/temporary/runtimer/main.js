define([
    'jquery',
    'moment',
    'base/js/namespace',
    'base/js/events'
    ], function(
      $,
      moment,
      IPython,
      events) {
      "use strict";

      var initialize = function () {

          var input = $('<label style="color:#c60d0d"/>')
          var tips = $('<img title="时间为零时环境自动关闭，请及时保存。" width="14" height="14" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAwFBMVEUAAADGDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ3GDQ0AAAB6+W4zAAAAPnRSTlMAWtb9XNfxoW5mcJ7pthMGefzLBGJBDZnMrSMB2fACj7ed1SLb6oursMYQIPYW0jDeSTX0qWBV2ESylnfHWzkdwCEAAAABYktHRACIBR1IAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAs0lEQVQY03XR1xKCMBAF0IuAXbE3bIgFe0cU3f//LKOBiUC8L5uc2dlJZgElpVIkakoBNJJEg84P6Uw2ly8UA9bBJ5TK+MSoVPkcfEutjiAN3s65CbTanW4PMPuCB0NgxOqYtVuCJ7ZtT1mdMZ7/DAmyYOwkeLkC1ps4Wwaw3VGMHRPYHyjOR+B0pgSzR18oyVfXvUk4EsGe590lzL7yEBdVxmq4BiLf95/hWf+3NLxkK34Dk+9dFWx+l8sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDktMjNUMTE6MTk6MzgrMDg6MDDycwl1AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA5LTIzVDExOjE5OjM4KzA4OjAwgy6xyQAAAABJRU5ErkJggg==" style="cursor: pointer;margin-left:3px;" >')


          IPython.toolbar.element.append(
                $('<label class="navbar-text" style="color:#c60d0d"/>').text('环境可用时间:')
          ).append(input).append(tips);
          var username = IPython.notebook.config.base_url.match(/\/user\/(\w+)\/?/)[1];

          $.ajax({
              type:'GET',
              url:'/api/v1/jupyter/livetime?name='+username,
              success:function(res){
                var livetime = res.data.livetime
                var timer = setInterval(function(){
                  input.text(moment(livetime * 1000).subtract(8, 'hour').format('HH:mm:ss'));
                  if (--livetime < 0) {
                    clearInterval(timer);
                  }
                },1000);
              },
              fail:function(error){
                input.text('00:00:00')
              }
          })
      }
    var load_ipython_extension = function() {
        return IPython.notebook.config.loaded.then(initialize);
    };
    return {
        load_ipython_extension: load_ipython_extension
    };
});


