

$(document).ready(function() {


  if (window.attachEvent) {
  window.attachEvent('onresize', function() {
    if (window.innerWidth < 760)
      console.log("Less than 760");
    else
      console.log("More than 760");
  });
} else if (window.addEventListener) {
  window.addEventListener('resize', function() {
    if (window.innerWidth < 760)
      console.log("Less than 760");
    else
      console.log("More than 760");
  }, true);
} else {
  //The browser does not support Javascript event binding
}


  $('html, #main').mousewheel(function(e, delta) {
  this.scrollLeft -= (delta);
  e.preventDefault();
  });

  $('.proj-mocks').mousewheel(function(e, delta) {
  this.scrollTop -= (delta);
  e.preventDefault();
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

document.getElementById("button").click();
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
    play.classList.add('hidden');

  } else {
    audio.pause();
    icon.classList.remove('fa-volume-mute');
    icon.classList.add('fa-volume-up');

    play.classList.remove('hidden');
  }
  button.classList.add("fade");
});
