(function(){
  var globeOutputBinding = new Shiny.OutputBinding();
  $.extend(globeOutputBinding, {
    find: function(scope) {
      return $(scope).find('.shiny-globe-output');
    },
    renderValue: function(el, data) {      
      if (!data){
        return;
      }
      
      // Clear out old globe.
      $(el).html("")
      
      if(!Detector.webgl){
        Detector.addGetWebGLMessage();
      } else {
        // Create from scratch
        var container = document.getElementById(el.id);
        var globe = new DAT.Globe(container);
        
        
      var settime = function(globe, t) {
         return function() {
          new TWEEN.Tween(globe).to({time: t/5},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
      };
      };
  
        var i, tweens = [];
        
           TWEEN.start();
        
        var data = JSON.parse(data);
        $(el).data('globedata', data);
        for (i=0;i<data.length;i++) {
           globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
          //globe.addData(data[1], {format: 'magnitude', name: data[0], animated: true});
        }
        globe.createPoints();
        //globe.time = 0;
        settime(globe,5)();
        globe.animate();
        document.body.style.backgroundImage = 'none'; // remove loading
      }
      
  
    }
  });
  Shiny.outputBindings.register(globeOutputBinding, 'shinyGlobe.globebinding');
})();
