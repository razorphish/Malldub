//var Masterslider = function () {

//    return {
        
//        //Master Slider
//        initMasterslider: function () {
//    		var slider = new MasterSlider();
//			    slider.control('arrows');   
//			    slider.control('thumblist' , {autohide:false ,dir:'h',arrows:false, align:'bottom', width:182, height:180, margin:5, space:5});
//			    slider.setup('masterslider' , {
//			        width:560,
//			        height:580,
//			        space:5,
//			        view:'fade'
//		    });
//		    SyntaxHighlighter.all();
//        }
//    };

//}();

var MasterSliderShowcase2 = function () {

  return {

    //Master Slider
    initMasterSliderShowcase2: function () {
      var slider = new MasterSlider();

      slider.control('arrows');
      slider.control('thumblist', {
        autohide: false,
        dir: 'h',
        arrows: false,
        align: 'bottom',
        width: 180,
        height: 170,
        margin: 5,
        space: 5
      });

      slider.setup('masterslider', {
        width: 550,
        height: 550,
        space: 5,
        view: 'fade'
      });
    }

  };

}();