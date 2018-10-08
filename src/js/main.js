$(document).ready(function() {
  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  ////////////
  // READY - triggered when PJAX DONE
  ////////////

  // single time initialization
  legacySupport();
  initaos();
  var easingSwing = [0.02, 0.01, 0.47, 1];

  // on transition change
  // getPaginationSections();
  // pagination();
  // _window.on("scroll", throttle(pagination, 50));
  // _window.on("resize", debounce(pagination, 250));

  function pageReady() {
    initPopups();
    initSliders();
    initParallax();

    // initMasks();
    initAutogrow();
    initValidations();

    initScrollMonitor();
  }

  // this is a master function which should have all functionality
  pageReady();

  //////////
  // POPUP
  //////////

  function initPopups() {
    $("[js-popup]").magnificPopup({
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeOpen: function() {
          this.st.mainClass = this.st.el.attr("data-effect");
        }
      },
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
  }

  //////////
  // SLIDERS
  //////////

  function initSliders() {

    // var swiperAnimation = new SwiperAnimation();

    // EXAMPLE SWIPER
    var projectsSwiper = new Swiper("[js-slider-projects]", {
      // Optional parameters
      direction: "horizontal",
      slidesPerView: 3,
      spaceBetween: 30,
      loop: false,
      // pagination: ".swiper-pagination",
      // paginationClickable: true,
      parallax: true,
      effect: "slide",
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true
      },
      breakpoints: {
        // when window width is <= 320px
        520: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        // when window width is <= 480px
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });

    var servicesSwiper = new Swiper("[js-slider-services]", {
      // Optional parameters
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 30,
      loop: true,
      mousewheelControl: true,
      effect: "fade",
      // fadeEffect: {
      //   crossFade: true
      // },
      // speed: 600,
      speed: 300,
      on: {
        init: function(){
          // swiperAnimation.init(this).animate();
        },
        slideChange: function(){
          // swiperAnimation.init(this).animate();

          if ( !servicesSwiper ) return
          var curSlide = servicesSwiper.realIndex + 1
          var linkedControl = $('[js-services-nav] a[data-target="'+curSlide+'"]');
          linkedControl.siblings().removeClass('is-active');
          linkedControl.addClass('is-active')
        }
      }
    });

    $('[js-services-nav] a').on('click', function(){
      var index = parseInt($(this).data("target"), 10);
      servicesSwiper.slideTo(index)
    })

    var stagesSwiper = new Swiper("[js-slider-stages]", {
      // Optional parameters
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      //   renderBullet: function(index, className) {
      //     return '<span class="' + className + '">' + (index + 1) + "</span>";
      //   }
      // },
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 30,
      autoHeight: true,
      loop: true,
      mousewheelControl: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      speed: 300,
      on: {
        slideChange: function(){
          if ( !stagesSwiper ) return
          var curSlide = stagesSwiper.realIndex + 1
          var linkedControl = $('[js-stages-nav] a[data-target="'+curSlide+'"]');
          linkedControl.siblings().removeClass('is-active');
          linkedControl.addClass('is-active')
        }
      }
    });

    $('[js-stages-nav] a').on('click', function(){
      var index = parseInt($(this).data("target"), 10);
      stagesSwiper.slideTo(index)
    })


    var gallerySwiper = new Swiper("[js-slider-team-main]", {
      loop: false,
      watchOverflow: false,
      setWrapperSize: true,
      spaceBetween: 0,
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      speed: 300
    });

    var thumbsSwiper = new Swiper("[js-slider-preview]", {
      direction: "vertical",
      slidesPerView: 2,
      // setWrapperSize: true,
      autoHeight: true,
      // centeredSlides: true,
      loop: false,
      spaceBetween: 10,
      // slideToClickedSlide: true,
      slideActiveClass: "is-active",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

    if ($("[js-slider-team-main]").length > 0) {
      gallerySwiper.controller.control = thumbsSwiper;
      thumbsSwiper.controller.control = gallerySwiper;
    }
  }


  //////////
  // PARALLAX
  /////////
  function initParallax(){
    $('[js-parallax-scene]').each(function(i, scene){
      var parallax = new Parallax(scene);
    })

  }

  //////////
  // COMMON
  //////////

  function initaos() {
    AOS.init();
  }

  function legacySupport() {
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }

  // HAMBURGER TOGGLER
  _document.on("click", "[js-hamburger]", function() {
    $(this).toggleClass("is-active");
    $(".header__mobile").toggleClass("is-active");
    $("body").toggleClass("is-fixed");
    $("html").toggleClass("is-fixed");
  });

  // function closeMobileMenu() {
  //   $("[js-hamburger]").removeClass("is-active");
  //   $(".mobile-navi").removeClass("is-active");
  // }

  _window.scroll(function() {
    var scroll = _window.scrollTop();

    if (scroll >= 100) {
      $(".header").addClass("is-fixed");
    } else {
      $(".header").removeClass("is-fixed");
    }
  });

  // Prevent # behavior
  _document
    .on("click", '[href="#"]', function(e) {
      e.preventDefault();
    })
    .on("click", 'a[href^="#section"]', function(e) {
      // section scroll
      var el = $(this).attr("href");
      scrollToSection($(el));
      return false;
    });

  function scrollToSection(el) {
    var headerHeight = $(".header").height();
    var targetScroll = el.offset().top - headerHeight;

    TweenLite.to(window, 1, {
      scrollTo: targetScroll,
      ease: easingSwing
    });
  }

  ////////////////////
  // CHANGE TITLE LOGIN PAGE
  ////////////////////
  _document.on("click", "[js-shipper-button]", function() {
    $(".carrier-title").hide();
    $(".shipper-title").fadeIn();
  });

  _document.on("click", "[js-carrier-button]", function() {
    $(".shipper-title").hide();
    $(".carrier-title").fadeIn();
  });

  ////////////////////
  // CHANGE TITLE LOGIN PAGE
  ////////////////////

  ////////////////////
  // CHANGE MAPS
  ////////////////////

  _document.on("click", "[js-open-lit]", function() {
    $(".contacts__map").removeClass("is-active");
    $(".lit-map").addClass("is-active");
  });

  _document.on("click", "[js-open-usa]", function() {
    $(".contacts__map").removeClass("is-active");
    $(".usa-map").addClass("is-active");
  });

  ////////////////////
  // CHANGE MAPS
  ////////////////////

  ////////////////////
  // SHOW PASSWORD TOGGLE
  ////////////////////

  _document.on("click", "[js-show-pass]", function(e) {
    e.preventDefault();
    $(this).toggleClass("show-pass");
    var x = document.getElementById("l2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  });

  ////////////////////
  // SHOW PASSWORD TOGGLE
  ////////////////////

  ////////////////////
  // FORM TOGGLER
  ////////////////////

  _document.on("click", "[open-form]", function() {
    $(".form-block-hidden").slideToggle();
  });

  _document.on("click", "[close-form]", function() {
    $(".form-block-hidden").slideToggle();
  });

  //////////
  // SLIDERS
  //////////

  //////////
  // MODALS
  //////////

  ////////////
  // UI
  ////////////
  function initAutogrow() {
    if ($("[js-autogrow]").length > 0) {
      $("[js-autogrow]").each(function(i, el) {
        new Autogrow(el);
      });
    }
  }

  // Masked input
  function initMasks() {
    // $("[js-dateMask]").mask("99.99.99", { placeholder: "ДД.ММ.ГГ" });
    // $("input[type='tel']").mask("(000) 000-0000", {
    //   placeholder: "+7 (___) ___-____"
    // });
  }

  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org
  function initValidations() {
    // GENERIC FUNCTIONS
    var validateErrorPlacement = function(error, element) {
      error.addClass("ui-input__validation");
      error.appendTo(element.parent("div"));
    };
    var validateHighlight = function(element) {
      $(element)
        .parent("div")
        .addClass("has-error");
    };
    var validateUnhighlight = function(element) {
      $(element)
        .parent("div")
        .removeClass("has-error");
    };
    var validateSubmitHandler = function(form) {
      $(form).addClass("loading");
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: $(form).serialize(),
        success: function(response) {
          $(form).removeClass("loading");
          var data = $.parseJSON(response);
          if (data.status == "success") {
            // do something I can't test
          } else {
            $(form)
              .find("[data-error]")
              .html(data.message)
              .show();
          }
        }
      });
    };

    var validatePhone = {
      required: true,
      normalizer: function(value) {
        var PHONE_MASK = "(XXX) XXX-XXXX";
        if (!value || value === PHONE_MASK) {
          return value;
        } else {
          return value.replace(/[^\d]/g, "");
        }
      },
      minlength: 11,
      digits: true
    };

    ////////
    // FORMS

    /////////////////////
    // REGISTRATION FORM
    ////////////////////
    $(".js-lead-form").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        name: "required",
        phonemail: "required"
        // email: {
        //   required: true,
        //   email: true
        // },
        // password: {
        //   required: true
        //   // minlength: 6
        // }
        // phone: validatePhone
      },
      messages: {
        name: "Необходимо заполнить",
        phonemail: "Необходимо заполнить"
      }
    });
  }

  // //////////
  // // PAGINATION
  // //////////
  // var paginationAnchors, sections;

  // function getPaginationSections() {
  //   paginationAnchors = $(".header__menu .header__menu-link");
  //   sections = $(".page__content [data-section]");
  // }

  // function pagination() {
  //   // Cache selectors
  //   var headerHeight = $(".header").height();
  //   var vScroll = _window.scrollTop();

  //   if (sections.length === 0) {
  //     paginationAnchors.removeClass("is-active");
  //     return false;
  //   }

  //   // Get id of current scroll item
  //   var cur = sections.map(function() {
  //     if ($(this).offset().top <= vScroll + headerHeight / 0.99) return this;
  //   });
  //   // Get current element
  //   cur = $(cur[cur.length - 1]);
  //   var id = cur && cur.length ? cur.data("section") : "1";

  //   // Set/remove active class
  //   paginationAnchors
  //     .removeClass("is-active")
  //     .filter("[data-section='" + id + "']")
  //     .addClass("is-active");
  // }

  ////////////
  // REVEAL FUNCTIONS
  ////////////
  function initScrollMonitor(fromPjax){
    $('[js-reveal]').each(function(i, el){
      var type = $(el).data('type') || "halflyEnterViewport"

      if ( type === "halflyEnterViewport"){
        var scrollListener = throttle(function(){
          var vScrollBottom = _window.scrollTop() + _window.height();
          var elTop = $(el).offset().top
          var triggerPoint = elTop + ( $(el).height() / 2)

          console.log(vScrollBottom, triggerPoint, vScrollBottom > triggerPoint )

          if ( vScrollBottom > triggerPoint ){
            $(el).addClass('is-animated');
            window.removeEventListener('scroll', scrollListener, false); // clear debounce func
          }
        }, 100)

        window.addEventListener('scroll', scrollListener, false);
        return
      }

    });
  }


  // some plugins get bindings onNewPage only that way
  function triggerBody() {
    $(window).scroll();
    $(window).resize();
  }

});
