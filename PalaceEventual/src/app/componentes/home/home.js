$(window).scroll(function() {
    $('#phone').each(function(){
    var imagePos = $(this).offset().top;
    
    var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+400) {
        $(this).addClass("slideUp");
      }
    });

    $('#pin').each(function(){
    var imagePos = $(this).offset().top;
    
    var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+400) {
        $(this).addClass("hatch");
      }
    });

    $('#pop-up-message').each(function(){
    var imagePos = $(this).offset().top;
    
    var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+400) {
        $(this).addClass("slideExpandUp");
      }
    });		

    $('#example-4').each(function(){
    var imagePos = $(this).offset().top;
    
    var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+400) {
        $('.device-arrow').addClass("stretchRight");
      }
    });		

    $('#example-5').each(function(){
    var imagePos = $(this).offset().top;
    
    var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+400) {
        $('.graph-bar').addClass("pullUp");
      }
    });					
              

  });