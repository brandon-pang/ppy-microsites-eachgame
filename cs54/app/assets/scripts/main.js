'use strict';

$(document).ready(function() {

  // start the document from the top of the page on reload //
  
  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);

  });

  // ---------- //


  $(window).on('load', function(event) {
    $('.throbber-loader').hide();
    $('.wrapper').css('visibility', 'visible');

    preloadImages();
    awpSetPin();
  });

  var controller = new ScrollMagic.Controller();

  function preloadImages() {
    for (var i = 1; i <= 69; i++) {
      $('.img-series').append('<img src="assets/images/awp-ghost/AWPGHOST_' + i + '.jpg" class="awp-ghost-img">');
    }
    $('.awp-ghost-img').css('visibility', 'hidden');
    $('.img-series img').eq(0).css('visibility', 'visible');
  }

  function sideNavTracker() {
    var headerDur = $('#header').height();
    var updateDur = $('#section-update').height();
    var eventDur = $('#section-event').height();
    var ghostDur = $('#section-awp-ghost').height() + 250;
    var packagesDur = $('#section-packages').height() + 680;
    var itemsDur = $('#section-items').height() - 67;
    var ninaDur = $('#section-nina').height();

    new ScrollMagic.Scene({duration: headerDur, triggerElement: "#header"})
          .setClassToggle("#bullet-one", "icon-home-active")
          .addTo(controller);
    new ScrollMagic.Scene({duration: updateDur, triggerElement: "#section-update"})
          .setClassToggle("#bullet-two", "active")
          .addTo(controller);
    new ScrollMagic.Scene({duration: eventDur, triggerElement: "#section-event"})
          .setClassToggle("#bullet-three", "active")
          .addTo(controller);
    new ScrollMagic.Scene({duration: ghostDur, triggerElement: "#section-awp-ghost"})
          .setClassToggle("#bullet-four", "active")
          .addTo(controller);
    new ScrollMagic.Scene({duration: packagesDur, triggerElement: "#section-packages"})
          .setClassToggle("#bullet-five", "active")
          .addTo(controller);
    new ScrollMagic.Scene({duration: itemsDur, triggerElement: "#section-items"})
          .setClassToggle("#bullet-six", "active")
          .addTo(controller);
    new ScrollMagic.Scene({duration: ninaDur, triggerElement: "#section-nina"})
          .setClassToggle("#bullet-seven", "active")
          .addTo(controller);
  }

  function awpSetPin() {
    var awpPos = $('#section-awp-ghost').offset().top;
    console.log(awpPos);
    new ScrollMagic.Scene({
      duration: 750,    // the scene should last for a scroll distance of 750px
      offset: awpPos      
    })
    .setPin("#pin1") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller
  }

  function awpGhostAnimation() {
    var awpPos = $('#section-awp-ghost').offset().top;
    var images = [];
    var obj = {curImg: 0};
  
    for (var i = 1; i <= 69; i++) {
      images.push('assets/images/awp-ghost/AWPGHOST_' + i + '.jpg');
    }

    // create tween
    var tween = TweenMax.to(obj, 0.5,
      {
        curImg: images.length - 1,  // animate propery curImg to number of images
        roundProps: "curImg",       // only integers so it can be used as an array index
        immediateRender: true,      // load first image automatically
        ease: Linear.easeNone,      // show every image the same ammount of time
        onUpdate: function () {
          $(".awp-ghost-img").attr("src", images[obj.curImg]); // set the image source
        }
      }
    );

    new ScrollMagic.Scene({
        duration: 750,
        offset: awpPos
    })
    .setTween(tween)
    .addTo(controller);
  }

  function tbAnimation() {
    new ScrollMagic.Scene({triggerElement: "#trigger2"})
      .setClassToggle(".slide-in-from-left", "slide-in-left")
      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#trigger2"})
      .setClassToggle(".slide-in-from-right", "slide-in-right")
      .addTo(controller);
  }

  function ninaAnimation() {
    new ScrollMagic.Scene({triggerElement: "#trigger3"})
      .setClassToggle(".nina-figure", "fade-in")
      .addTo(controller);
  }
  
  sideNavTracker();
  awpGhostAnimation();
  tbAnimation();
  ninaAnimation();


  $(window).on('scroll', function(event) {
    console.log($(window).scrollTop());
    /* Act on the event */
  });

  // initialize carousels for packages section //

  $('.carousel-one').carousel({
      carouselWidth:930,
      carouselHeight:340,
      directionNav:true,
      description: true,
      descriptionContainer: '.description'
  });

  $('.carousel-two').carousel({
      carouselWidth:930,
      carouselHeight:340,
      directionNav:true,
      description: true,
      descriptionContainer: '.description'
  });

  // -------------  //


  // initialize chart for awp ghost section //

  var data = {  
    labels: ['Damage', 'Fire Rate', 'Weight', 'Magazine', 'Accuracy'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [9.8, 1.5, 8, 1, 10]
    ]
  };

  var options = {
    height: 250,
    axisX: {
        showGrid: false
    },
    axisY: {
        type: Chartist.FixedScaleAxis,
        ticks: [0, 2, 4, 6, 8, 10]
    }
  }

  var chart = new Chartist.Bar('.ct-chart', data, options);

  // ---------------- //


  // thumbnail + image viewer for items section //

  $('.tb-container').on('click', function(event) {
    event.preventDefault();
    var imgSrc = $(this).find('img').attr('src');
    $('.tb-container').removeClass('active-item');
    $(this).addClass('active-item');
    $('.tb-container').next().removeClass();
    $(this).next().addClass('active-title');
    $('.item-display-box img').remove()
    $('.item-display-box').append('<img src="' + imgSrc + '">');
  });

  // ---------- //

  $('.scroll-down').on('click', function(event) {
    var updatePos = Math.floor($('#section-update').offset().top);
    $('body, html').animate({ scrollTop: updatePos });
  });

  var currentIndex = 1;

  $('.down').on('click', function() {
      $('.bullet').removeClass('active');
      $('.home').removeClass('icon-home-active');

      var updatePos = Math.floor($('#section-update').offset().top);
      var eventPos = Math.floor($('#section-event').offset().top);
      var awpGhostPos = Math.floor($('#section-awp-ghost').offset().top);
      var packagePos = Math.floor($('#section-packages').offset().top);
      var itemPos = Math.floor($('#section-items').offset().top);
      var ninaPos = Math.floor($('#section-nina').offset().top);
      var footerPos = Math.floor($('footer').offset().top);

      currentIndex++;
      if (currentIndex == 2) {
        $('body, html').animate({ scrollTop: updatePos });
        $('#bullet-two').addClass('active');
      } else if (currentIndex == 3) {
        $('body, html').animate({ scrollTop: eventPos });
        $('#bullet-three').addClass('active');
      } else if (currentIndex == 4) {
        $('body, html').animate({ scrollTop: awpGhostPos });
        $('#bullet-four').addClass('active');
      } else if (currentIndex == 5) {
        $('body, html').animate({ scrollTop: packagePos });
        $('#bullet-five').addClass('active');
      } else if (currentIndex == 6) {
        $('body, html').animate({ scrollTop: itemPos });
        $('#bullet-six').addClass('active');
      } else if (currentIndex == 7) {
        $('body, html').animate({ scrollTop: ninaPos });
        $('#bullet-seven').addClass('active');
      } else {
        $('#bullet-seven').addClass('active');
        currentIndex = 7;
      } 
  });

  $('.up').on('click', function() {
    $('.bullet').removeClass('active');

    var updatePos = Math.floor($('#section-update').offset().top);
    var eventPos = Math.floor($('#section-event').offset().top);
    var awpGhostPos = Math.floor($('#section-awp-ghost').offset().top);
    var packagePos = Math.floor($('#section-packages').offset().top);
    var itemPos = Math.floor($('#section-items').offset().top);
    var ninaPos = Math.floor($('#section-nina').offset().top);
    var footerPos = Math.floor($('footer').offset().top);
    currentIndex--;
    if (currentIndex == 1) {
      $('body, html').animate({ scrollTop: 0 });
      $('#bullet-one').addClass('icon-home-active');
    } else if (currentIndex == 2) {
      $('body, html').animate({ scrollTop: updatePos });
      $('#bullet-two').addClass('active');
    } else if (currentIndex == 3) {
      $('body, html').animate({ scrollTop: eventPos });
      $('#bullet-three').addClass('active');
    } else if (currentIndex == 4) {
      $('body, html').animate({ scrollTop: awpGhostPos });
      $('#bullet-four').addClass('active');
    } else if (currentIndex == 5) {
      $('body, html').animate({ scrollTop: packagePos });
      $('#bullet-five').addClass('active');
    } else if (currentIndex == 6) {
      $('body, html').animate({ scrollTop: itemPos });
      $('#bullet-six').addClass('active');
    } else {
      currentIndex = 1;
    }
  });

  $('.side-nav').on('click', '.bullet, .home', function() {
    $('.bullet').removeClass('active');
    $('.home').removeClass('icon-home-active');
    var scrollPos = $(window).scrollTop();
    var updatePos = Math.floor($('#section-update').offset().top);
    var eventPos = Math.floor($('#section-event').offset().top);
    var awpGhostPos = Math.floor($('#section-awp-ghost').offset().top);
    var packagePos = Math.floor($('#section-packages').offset().top);
    var itemPos = Math.floor($('#section-items').offset().top);
    var ninaPos = Math.floor($('#section-nina').offset().top);
    var footerPos = Math.floor($('footer').offset().top);
    var index = $(this).data('index');
    
    if (index == 1) {
      currentIndex = 1;
      $(this).addClass('icon-home-active');
      $('body, html').animate({ scrollTop: 0 });
    } else if (index == 2) {
      currentIndex = 2;
      $('body, html').animate({ scrollTop: updatePos });
      $(this).addClass('active');
    } else if (index == 3) {
      currentIndex = 3;
      $('body, html').animate({ scrollTop: eventPos });
      $(this).addClass('active');
    } else if (index == 4) {
      currentIndex = 4;
      $('body, html').animate({ scrollTop: awpGhostPos });
      $(this).addClass('active');
    } else if (index == 5) {
      currentIndex = 5;
      $('body, html').animate({ scrollTop: packagePos });
      $(this).addClass('active');
    } else if (index == 6) {
      currentIndex = 6;
      $('body, html').animate({ scrollTop: itemPos });
      $(this).addClass('active');
    } else if (index == 7) {
      currentIndex = 7;
      $('body, html').animate({ scrollTop: ninaPos });
      $(this).addClass('active');
    }
  });

});