

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});

$(document).ready(function() {

  if($(window).width() >= 800){
    $('html, #main').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta);
    e.preventDefault();
    });

    $('.proj-mocks').mousewheel(function(e, delta) {
    this.scrollTop -= (delta);
    e.preventDefault();
    });

  }




  $(".more_betterment").click(function() {

        $(".betterment_proj").removeClass("hidden");
        $(".main-content").addClass("invisible");
        var position = document.getElementById('html').scrollLeft;
        console.log(position);
        $(".modal-close").click(function() {
          $(".main-content").removeClass("invisible");
            $(".project-detail-modal").addClass("hidden");
            document.getElementById('html').scrollLeft = position;
            console.log(position);

        });
    });

$(".more_w").click(function() {

      $(".w_proj").removeClass("hidden");
      $(".main-content").addClass("invisible");
      var position = document.getElementById('html').scrollLeft;
      console.log(position);
      $(".modal-close").click(function() {
        $(".main-content").removeClass("invisible");
          $(".project-detail-modal").addClass("hidden");
          document.getElementById('html').scrollLeft = position;
          console.log(position);

      });
  });



  $(".more_kaie").click(function() {

        $(".kaie_proj").removeClass("hidden");
        $(".main-content").addClass("invisible");
        var position = document.getElementById('html').scrollLeft;
        console.log(position);
        $(".modal-close").click(function() {
          $(".main-content").removeClass("invisible");
            $(".project-detail-modal").addClass("hidden");
            document.getElementById('html').scrollLeft = position;
            console.log(position);

        });
    });

$(".more_life").click(function() {

      $(".life_proj").removeClass("hidden");
      $(".main-content").addClass("invisible");
      var position = document.getElementById('html').scrollLeft;
      console.log(position);
      $(".modal-close").click(function() {
        $(".main-content").removeClass("invisible");
          $(".project-detail-modal").addClass("hidden");
          document.getElementById('html').scrollLeft = position;
          console.log(position);

      });
  });

$(".more_red").click(function() {

      $(".red_proj").removeClass("hidden");
      $(".main-content").addClass("invisible");
      var position = document.getElementById('html').scrollLeft;
      console.log(position);
      $(".modal-close").click(function() {
        $(".main-content").removeClass("invisible");
          $(".project-detail-modal").addClass("hidden");
          document.getElementById('html').scrollLeft = position;
          console.log(position);

      });
  });

$(".more_rco").click(function() {

  // $('html, body, *').mousewheel(function(e, delta) {
  // this.scrollTop -= (delta);
  // e.preventDefault();
  // });

      $(".rco_proj").removeClass("hidden");
      $(".main-content").addClass("invisible");
      var position = document.getElementById('html').scrollLeft;
      console.log(position);
      $(".modal-close").click(function() {
      //   $('html, body, *').mousewheel(function(e, delta) {
      //   this.scrollLeft -= (delta);
      //   e.preventDefault();
      // });

        $(".main-content").removeClass("invisible");
          $(".project-detail-modal").addClass("hidden");
          document.getElementById('html').scrollLeft = position;
          console.log(position);

      });
  });

$(".more_deem").click(function() {

  // $('html, body, *').mousewheel(function(e, delta) {
  // this.scrollTop -= (delta);
  // e.preventDefault();
  // });

      $(".deem_proj").removeClass("hidden");
      $(".main-content").addClass("invisible");
      var position = document.getElementById('html').scrollLeft;
      console.log(position);
      $(".modal-close").click(function() {
      //   $('html, body, *').mousewheel(function(e, delta) {
      //   this.scrollLeft -= (delta);
      //   e.preventDefault();
      // });

        $(".main-content").removeClass("invisible");
          $(".project-detail-modal").addClass("hidden");
          document.getElementById('html').scrollLeft = position;
          console.log(position);

      });
  });

$(".more_nike").click(function() {

  // $('html, body, *').mousewheel(function(e, delta) {
  // this.scrollTop -= (delta);
  // e.preventDefault();
  // });

      $(".nike_proj").removeClass("hidden");
      $(".main-content").addClass("invisible");
      var position = document.getElementById('html').scrollLeft;
      console.log(position);
      $(".modal-close").click(function() {
      //   $('html, body, *').mousewheel(function(e, delta) {
      //   this.scrollLeft -= (delta);
      //   e.preventDefault();
      // });

        $(".main-content").removeClass("invisible");
          $(".project-detail-modal").addClass("hidden");
          document.getElementById('html').scrollLeft = position;
          console.log(position);

      });
  });

  $(".more_fekkai").click(function() {

    // $('html, body, *').mousewheel(function(e, delta) {
    // this.scrollTop -= (delta);
    // e.preventDefault();
    // });

        $(".fekkai_proj").removeClass("hidden");
        $(".main-content").addClass("invisible");
        var position = document.getElementById('html').scrollLeft;
        console.log(position);
        $(".modal-close").click(function() {
        //   $('html, body, *').mousewheel(function(e, delta) {
        //   this.scrollLeft -= (delta);
        //   e.preventDefault();
        // });

          $(".main-content").removeClass("invisible");
            $(".project-detail-modal").addClass("hidden");
            document.getElementById('html').scrollLeft = position;
            console.log(position);

        });
    });

    // $(".logo-1").delay(4000).addClass("show");
    // $(".logo-primary").delay(4000).addClass("hidden");
    // $(".logo-primary").delay(4500).removeClass("hidden");
    // $(".logo-1").delay(4500).removeClass("show");
    // setTimeout(function () {
    //     $(".logo-3").addClass("show");
    //     $(".logo-primary").addClass("hidden");
    // }, 3000);
    // setTimeout(function () {
    //     $(".logo-primary").removeClass("hidden");
    //     $(".logo-3").removeClass("show");
    // }, 3150);

// document.getElementById("button").click();



});

const button = document.querySelector("#button");
const icon = document.querySelector("#button > img");
const play = document.querySelector("#button > span");
const audio = document.querySelector("audio");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.15;
    audio.play();
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-volume-mute');
    icon.classList.remove('hidden');
    play.classList.add('hidden');

  } else {
    audio.pause();
    icon.classList.remove('fa-volume-mute');
    icon.classList.add('fa-volume-up');

    play.classList.remove('hidden');
  }
  button.classList.add("fade");
});
