$(document).ready(function() {

  $(function($) {
    $("img.lazy").Lazy({
      enableThrottle: true,
      throttle: 10
  });
});

jQuery(function($) {
  $("video").lazy({
    enableThrottle: true,
    throttle: 400
});;
});

var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $('.work-categories').addClass('disabled')
   } else {
       $('.disabled').removeClass('disabled')
   }
   lastScrollTop = st;
});

  $('.video-play-button').click(function(){
    $('.video-js').addClass('show-video');
    $('.initial-thumbnail').addClass('hide-video');
    $('.video-play-button').addClass('hide-video');
    $('button.vjs-play-control').click();
  })

  $('a').click(function(e) {
    $('body').addClass("fadeout");
    var anchor = $(this), h;
    h = anchor.attr('href');
    e.preventDefault();
    anchor.animate({'opacity' : 1}, 500, function() {
        window.location = h;
    });

    var stickyElements = Sticksy.initializeAll('.js-sticky-widget')
});



// just for demonstration of state handling
// stickyEl.onStateChanged = function (state) {
//     if (state === 'fixed') stickyEl.nodeRef.classList.add('widget--fixed')
//     else stickyEl.nodeRef.classList.remove('widget--fixed')
// }

    $('.initial').removeClass("initial")
    ;

    setTimeout(() => {
        $('.logo-wrap').addClass("close")
    }, "1500")

    setTimeout(() => {
        $('#loader').delay( 800 ).addClass("away");
    }, "1700")

    
    

    $('button.contact-us').click( function() {
        $("#home-contact").toggleClass("show");
        $("#overlay").toggleClass("show");
    } );

    $('.contact-close').click( function() {
        $("#home-contact").toggleClass("show");
        $("#overlay").toggleClass("show");
    } );

    $('.form-button').click(function(){
        $('.form-button').addClass("clicked");
    })

    $('.info-button').click(function(){
        $('#home-about').toggleClass("show");
        $("#overlay").toggleClass("show");
    })


    $('.info-close').click( function() {
        $("#home-about").toggleClass("show");
        $("#overlay").toggleClass("show");
    } );

    $(window).scroll(function(){
        $(".hero-video").css("opacity", 1 - $(window).scrollTop() / 550);
        $(".hero-video").css("margin-top", 0 - $(window).scrollTop() / 3);
        $("#work").css("opacity", 1 - $(window).scrollTop() / 550);
        $("#work").css("margin-top", 0 - $(window).scrollTop() / 3);
      });
      
});

// USING SPLITTING.JS

/*
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line"><div class="words">
          ${wordsArr
            .map(
              (word) => `${word.outerHTML}<span class="whitespace"> 
         </span>`
            )
            .join("")}
        </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line .words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
	      toggleActions:"restart none none reset",
      }
    });
    tl.set(revealText, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 100,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.2
    });
  });
});
*/

// WITHOUT SPLITTING.JS

window.addEventListener("load", function () {
  let splitWords = function (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
      el.dataset.splitText = el.textContent;
      el.innerHTML = el.textContent
        .split(/\s/)
        .map(function (word) {
          return word
            .split("-")
            .map(function (word) {
              return '<span class="word">' + word + "</span>";
            })
            .join('<span class="hyphen">-</span>');
        })
        .join('<span class="whitespace"> </span>');
    });
  };

  let splitLines = function (selector) {
    var elements = document.querySelectorAll(selector);

    splitWords(selector);

    elements.forEach(function (el) {
      var lines = getLines(el);

      var wrappedLines = "";
      lines.forEach(function (wordsArr) {
        wrappedLines += '<span class="line"><span class="words">';
        wordsArr.forEach(function (word) {
          wrappedLines += word.outerHTML;
        });
        wrappedLines += "</span></span>";
      });
      el.innerHTML = wrappedLines;
    });
  };

  let getLines = function (el) {
    var lines = [];
    var line;
    var words = el.querySelectorAll("span");
    var lastTop;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.offsetTop != lastTop) {
        // Don't start with whitespace
        if (!word.classList.contains("whitespace")) {
          lastTop = word.offsetTop;

          line = [];
          lines.push(line);
        }
      }
      line.push(word);
    }
    return lines;
  };

  splitLines(".reveal-text");

  let revealText = document.querySelectorAll(".reveal-text");

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset"
      }
    });
    tl.set(element, { autoAlpha: 1 });
    tl.from(lines, 1.7, {
      yPercent: 100,
      ease: Power4.easeOut,
      stagger: 0.1,
      delay: 0.5
    });
  });
});


