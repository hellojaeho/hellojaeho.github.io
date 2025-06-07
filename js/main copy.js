


function loadOverlay(file, clickedIndex = 0) {
  // Ensure file always starts with '/'
  const normalizedFile = file.startsWith('/') ? file : '/' + file;

  fetch(normalizedFile)
    .then(res => res.text())
    .then(html => {
      document.getElementById('overlay-content').innerHTML = html;
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'flex';
      overlay.classList.add('active');
      setTimeout(() => {
        overlay.classList.add('n-show');
      }, 100);

      // Push clean URL without .html
      history.pushState({ overlay: true, file: normalizedFile }, '', normalizedFile.replace('.html', ''));
    });
}

// Handle deep links (e.g., index.html?open=work/nike-air-max-day.html)
// window.addEventListener('DOMContentLoaded', () => {
//   const params = new URLSearchParams(window.location.search);
//   const fileToOpen = params.get('open');
//   if (fileToOpen) {
//     loadOverlay(fileToOpen);
//   }
// });


// this is to stimulate a click on the first slide, image or video of the carousel when there is a redirect

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const params = new URLSearchParams(window.location.search);
    const projectFile = params.get('open'); // grabs "work/nike-maxs-lab.html"

    if (projectFile) {
      const targetOverlay = document.querySelector(`.carousel-row.load-overlay[data-file="${projectFile}"]`);

      if (targetOverlay) {
        // Smoothly scroll to the project
        // targetOverlay.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const firstSlide = targetOverlay.querySelector('.slide video, .slide img');

        if (firstSlide) {
          setTimeout(() => {
            firstSlide.click();
            window.history.replaceState({}, document.title, '/');
          }, 300); // small delay before clicking
        }
      }
    }
  }, 1000); // <-- Initial page delay after DOMContentLoaded
});








document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.back-blur');

  if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
    setTimeout(() => {
      el.style.webkitBackdropFilter = 'none';
      el.offsetHeight; // reflow
      el.style.webkitBackdropFilter = 'blur(30px)';
    }, 100); // wait a bit to ensure layout is ready
  }
});

  // $('.load-overlay img, .load-overlay video').click(function () {
  //   const file = $(this).closest('.load-overlay').data('file');
  //   if (file) {
  //     loadOverlay(file);
  //     $('nav.dynamic-nav').addClass('case-study');
  //     $('body').addClass('n-fixed');
  //     setTimeout(() => {
  //       $('.d-case-study-close').addClass('show');
  //       $('.blocks').removeClass('n-hidden blurred');
  //     }, 300);

  //   const slideIndex = $(this).parent().index();
    
  //   setTimeout(() => {
  //     $('.blocks section:nth-of-type(' + (slideIndex + 1) + ')')[0].scrollIntoView({
  //     behavior: 'instant',
  //     block: 'center'
  //     });
  //   }, 50);

  //   } else {
  //     console.warn('Missing data-file on:', this);
  //   }
  // });

  




$(document).ready(function() {
  let projectQueue = [];
  let currentCarouselIndex = null;
  const overlayContent = document.getElementById('overlay-content');
  let loadingNextProject = false;

  function initializeProjectQueue() {
    const carousels = document.querySelectorAll('.carousel-row');
    projectQueue = Array.from(carousels).map(row => row.getAttribute('data-file'));
    console.log('Project queue initialized:', projectQueue);
  }

  initializeProjectQueue();


  // When user clicks an image or video to open the overlay
  $('.load-overlay img, .load-overlay video').click(function() {
    currentCarouselIndex = $('.carousel-row').index($(this).closest('.carousel-row'));
    console.log('Clicked carousel index:', currentCarouselIndex);
    console.log('Clicked file:', projectQueue[currentCarouselIndex]);
    globalSlideIndex = $(this).parent().index();

    const file = $(this).closest('.load-overlay').data('file');
    if (file) {
      loadOverlay(file); // Assuming you already have a working loadOverlay(file) elsewhere
      $('nav.dynamic-nav').addClass('case-study');
      $('body').addClass('n-fixed');

      setTimeout(() => {
        $('.d-case-study-close').addClass('show');
        $('.blocks').removeClass('n-hidden blurred');
      }, 300);

      setTimeout(() => {
        $('.blocks section:nth-of-type(' + (globalSlideIndex + 2) + ')')[0]?.scrollIntoView({
          behavior: 'instant',
          block: 'center'
        });
      }, 100);

      setTimeout(() => {
        const currentSection = $('.blocks section:nth-of-type(' + (globalSlideIndex + 1) + ')')[0];
        const credits = document.querySelector('section.content-block.credits');
        if (credits && currentSection) {
          currentSection.parentNode.insertBefore(credits, currentSection);
          console.log('Credits moved to:', currentSection);
        }
      }, 50);


    } else {
      console.warn('Missing data-file on clicked element.');
    }
  });

  overlayContent.addEventListener('scroll', () => {
    const scrollTop = overlayContent.scrollTop;
    const scrollHeight = overlayContent.scrollHeight;
    const clientHeight = overlayContent.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200 && !loadingNextProject) {
      console.log('Near bottom of overlay content.');
      loadNextProject();
    }
  });

  function loadNextProject() {
    if (currentCarouselIndex === null) return;
    if (currentCarouselIndex + 1 >= projectQueue.length) {
      console.log('No more projects to load.');
      return;
    }

    loadingNextProject = true;
    currentCarouselIndex++;

    const nextFile = projectQueue[currentCarouselIndex];
    console.log('Loading next project:', nextFile);

    fetch(nextFile)
      .then(res => res.text())
      .then(html => {
        const tempDiv = document.createElement('div');
        
        tempDiv.innerHTML = html;
        console.log('Fetched HTML:', html);
        const nextBlocks = tempDiv.querySelector('.blocks');
        if (nextBlocks) {
          const clone = document.createElement('div');
          clone.classList.add('blocks-clone');
          clone.innerHTML = nextBlocks.innerHTML;
          overlayContent.appendChild(clone);
          console.log('Next project appended.');
        } else {
          console.warn('No .blocks found inside fetched file.');
        }
        loadingNextProject = false;
      })
      .catch(err => {
        console.error('Failed to fetch next project:', err);
        loadingNextProject = false;
      });
  }










  const infoMenuItem = $('.nav-menu ul li:nth-of-type(2)');
  const closeMenu = $('.d-nav-info-top ul li:nth-of-type(2)');
  const dynamicNav = $('.dynamic-nav');


  if (infoMenuItem.length && closeMenu.length && dynamicNav.length) {
    infoMenuItem.on('click', function () {
      $('body').addClass('n2-fixed'); // Add n-fixed class to body
      dynamicNav.addClass('info-open');
      $('#home-work-carousels').addClass('blurred');
      $('#hero-hero').addClass('blurred');
    });

    closeMenu.on('click', function () {
      dynamicNav.removeClass('info-open'); // Changed toggle to remove
      $('body').removeClass('n2-fixed'); // Remove n-fixed class when closing
      $('#home-work-carousels').removeClass('blurred');
      $('#hero-hero').removeClass('blurred');
      dynamicNav.addClass('info-closing'); // Changed toggle to remove
      setTimeout(function () {
        dynamicNav.removeClass('info-closing');
      }, 100);

    });
  }

  $(document).on('click', function(event) {
    if (!$(event.target).closest('.dynamic-nav').length && !$(event.target).is('.dynamic-nav')) {
      dynamicNav.removeClass('info-open'); // Changed toggle to remove
      $('body').removeClass('n2-fixed'); // Remove n-fixed class when closing
      $('#home-work-carousels').removeClass('blurred');
      $('#hero-hero').removeClass('blurred');
    }
  });

  setTimeout(() => {
    $('.dynamic-nav-container').addClass('back-blur');
  }, 100);

$(window).on('scroll', function () {
  $('.flickity-slider').each(function () {
    const $this = $(this);
    const elementTop = $this.offset().top;
    const elementBottom = elementTop + $this.outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    if (elementBottom < viewportTop - 1000 || elementTop > viewportBottom + 1000) {
      $this.css('animation-play-state', 'paused');
    } else {
      $this.css('animation-play-state', 'running');
    }
  });
});

  document.addEventListener('click', function(event) {
    console.log('run')
    const target = event.target;
    if (!target.matches('img') && !target.matches('video') && !target.matches('p') && !target.matches('h2') && !target.matches('button')) {
            closeOverlay();
    }
});

//when esc button key is pressed, close overlay
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.keyCode === 27) {
    closeOverlay();
  }
});


  // Attach event to all divs with .load-overlay
  // document.querySelectorAll('.load-overlay *').forEach(element => {
  //   console.log('run');
  //   let isDragging = false;

  //   element.addEventListener('mousedown', () => {
  //     isDragging = false;
  //     console.log('mouse down');
  //   });

  //   element.addEventListener('mousemove', () => {
  //     isDragging = true;
  //     console.log('mouse moved');
  //   });

  //   element.addEventListener('mouseup', (event) => {
  //     console.log('Element clicked:', event.currentTarget);

  //     if (!isDragging) {
  //       console.log("not dragging");
  //       const file = event.currentTarget.closest('.load-overlay').getAttribute('data-file'); // Use closest to find the parent with .load-overlay
  //       if (!file) {
  //         console.warn('Missing data-file on:', event.currentTarget);
  //         return;
  //       }
  //       loadOverlay(file);
  //     }
  //   });
  // });





  
  

// function loadOverlay(file) {
//   fetch(file)
//     .then(res => res.text())
//     .then(html => {
//       document.getElementById('overlay-content').innerHTML = html;
//       const overlay = document.getElementById('overlay');
//       overlay.style.display = 'flex';
//       overlay.classList.add('active');
//       history.pushState({ overlay: true, file }, '', file.replace('.html', ''));
//     });
// }

// Close overlay function exposed globally
window.closeOverlay = function () {
  setTimeout(() => {
    document.getElementById('overlay').style.display = 'none';
  }, 400);
  history.pushState({}, '', '/');
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('overlay').classList.remove('n-show');
  $('nav.dynamic-nav').removeClass('case-study');
  $('nav.dynamic-nav').addClass('closing');
  $('.d-case-study-close').removeClass('show');
  document.body.classList.remove('n-fixed');
  setTimeout(() => {
    $('nav.dynamic-nav').removeClass('closing');
  }, 500);
};

// Handle back/forward navigation
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.overlay && event.state.file) {
    loadOverlay(event.state.file);
  } else {
    document.getElementById('overlay').style.display = 'none';
  }

    const overlay = document.getElementById('overlay');

  if (overlay && overlay.classList.contains('active')) {
    closeOverlay();
  }
});


  $(window).on('scroll', function() {
    scrollPosition = $(this).scrollTop();
    if (scrollPosition >= 500) {
      $('nav').addClass('show')
        // Other function stuff here...
    } else {
      $('nav').removeClass('show')
    }
});

  // $(window).scroll(function() {
  //   var windowHeight = $(window).height();
    
    
  
  //   $('.carousel-row').each(function(){
  //     var rowHeight = $(this).height();
  //     var scrollTop     = $(window).scrollTop(),
  //     elementOffset = $(this).offset().top,
  //     distance      = (elementOffset - scrollTop);

  //     if (distance<0 || distance > (windowHeight-rowHeight)) {
    
           
  //         $(this).addClass('faded')

  //         }
  //         else {
  //           $(this).removeClass('faded')
  //         }
        
  //   }); 
  // });

  var documentHeight = $(window).innerHeight();
  jQuery('#info-modal').css('height',documentHeight);
  jQuery('.zoom-carousel').css('height',documentHeight);

jQuery(document).on("scroll",function(){
  var documentHeight = $(window).innerHeight();
  jQuery('#info-modal').css('height',documentHeight);
  jQuery('.zoom-carousel').css('height',documentHeight);
});

function scroll(){
  $(window).scroll();
};

setTimeout(() => {
  scroll();
}, "1000");




$(window).on('scroll resize', function() {
  const $element = $('.carousels-container');
  const $navItem = $(".d-nav-main .nav-menu ul li:nth-of-type(1)");

  if ($element.length) {
    const elementTop = $element.offset().top;
    const elementBottom = elementTop + $element.outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop + 400 && elementTop < viewportBottom - 400) {
      $navItem.addClass('active');
      console.log('active');
    } else {
      $navItem.removeClass('active');
      console.log('not active');
    }
  }
});

$(".nav-menu ul li:nth-of-type(1)").click(function () {
  const $navItem = $(this);
  const $element = $(".carousels-container");

  if (!$navItem.hasClass("active") && $element.length) {
    const elementTop = $element.offset().top;
    const viewportTop = $(window).scrollTop();
    const viewportHeight = $(window).height();

    if (elementTop < viewportTop || elementTop > viewportTop + viewportHeight * 0.5) {
      window.scrollTo({
      top: elementTop - 200,
      behavior: "smooth"
      });
    }
  }
});

setInterval(scroll,1500);

  $('button.info').click(function(){
    $('html').addClass('lock-scroll');
    $('.mobile-bottom-nav').addClass('hidden');
    $('#info-modal.down').removeClass('down');
    $('.logo-desc').codex({
      effect:"charbychar",
      reveal: 100
    });
  })
  
  $('.close-circle').click(function(){
    $('html').removeClass('lock-scroll');
    $('.mobile-bottom-nav').removeClass('hidden');
    $('#info-modal').addClass('down');
  })

  // $(function () {
  //   const text = $(".marquee-text");
  //   const block = $(".block");
  //   const clone = text;
  
  //   const anim = () => {
  //     $(clone).clone().appendTo($(block));
  //     $(".block").animate(
  //       {
  //         left: "-100%"
  //       },
  //       7000,
  //       "linear",
  //       function () {
  //         $(".marquee-text").first().remove();
  //         $(block).css("left", "0");
  //         anim();
  //       }
  //     );
  //   };
  
  //   const blockList = $(".block-list");
  //   const list = $(".marquee-list");
  //   const listWidth = list.width() + parseInt($(blockList).css("gap"));
  //   $(list).clone().prependTo($(blockList));

  //   const animList = () => {
  //     $(list).clone().prependTo($(blockList));
  //     $(blockList).animate(
  //       {
  //         right: -listWidth
  //       },
  //       40000,
  //       "linear",
  //       function () {
  //         $(".list").first().remove(); //$(".list") !IMPORTANT
  //         $(blockList).css("right", "0");
  //         animList();
  //       }
  //     );
  //   };
  //   anim();
  //   animList();

  // });

  // $('.carousel-template').addClass('hidden');

 


  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};





if ($(window).width() < 500) {
  $('.no-mobile video').each(function(){
    $(this).remove();
  })
}

// $('video').each(function(){
//   $(this).remove();
// })


// var sliders = $('.carousel-row-slider').detach();

// var rows = $('.carousel-row');

// $('video').each(function(){
//   $(this).detach();
// })

// $(window).on('resize scroll', function() {

//   var i = 0;

//   $(rows).each(function(){
      
//       if ($(this).isInViewport()) {
//         if (!($(this).find( '.carousel-row-slider' ).length == 1)) {
//           // $(this).appendTo($(sliders[i]));
//           // $(this).appendTo('<p>hihi</p>');
//           // console.log(sliders[i])
//           $(this).append($(sliders[i]));
          
//           $(function($) {
//               $(".slide img").Lazy({
//                 enableThrottle: true,
//                 throttle: 400
//             });
//           });
          

//           jQuery(function($) {
//               $("video").lazy({
//                 enableThrottle: true,
//                 throttle: 400
//             });;
//           });

//           var videoList = document.getElementsByTagName("video");
//           // videoList
//           $(this).find('video').each(function(){
//             $(this).get(0).play();
//           });

//         }
//       } else { 
//         var videoList = document.getElementsByTagName("video");
//           // videoList
//           $(this).find('video').each(function(){
//             $(this).get(0).play();
//           });
//         $(this).find( '.carousel-row-slider' ).remove();

//       }
//       i++;
       
//     }
//   )
// });





// $('.carousel-row-slider').each(function(i, obj) {
//   $(this).addClass('hidden');
// });



// $(window).on('resize scroll', function() {
//     var hi;
//     $('.carousel-row').each(function(i, obj) {
//     var hi;
//     if ($(this).isInViewport()) {
//       console.log(hi)
//         $(hi).appendTo($(this));
//         hi = null;

//     } else {
//       hi = $(this).find( '.carousel-row-slider' ).detach();

//     }
//   });
// });

// $(window).on('resize scroll', function() {

//   if ($(this).isInViewport()) {

//       if (($(this).find( '.carousel-row-slider' ).length == 1)) {

      
//         // console.log('hi')
          

//       } else {
//         i.appendTo($(this));
//         i = null;
//       }

//     } else {
//       console.log('else')
//     }

// });

// $('.carousel-row').each(function(i, obj) {
//   var i;
//   i = $(this).find( '.carousel-row-slider' ).detach();


  

// });






//   // if ($('.carousel-slider.rco').isInViewport()) {
//   //   if (!$(".carousel-slider.rco").hasClass("content-added")) {
//   //     $('.carousel-slider.rco .flickity-slider').append('<div class="slide" > <img class="lazy" style="width: 434px;" data-src="images/work/rco/hp1.jpg"> </div> <div class="slide"> <video style="filter: saturate(1.1)" autoplay loop muted playsinline width="324" data-src="https://player.vimeo.com/progressive_redirect/playback/902531692/rendition/1080p/file.mp4?loc=external&signature=dad07e34080f5762d19d57f59ce57333d771f77530c56824237c9de74e99fe89|video/mp4"></video> </div> <div class="slide" > <img class="lazy" style="width: 434px;" data-src="images/work/rco/hp2.jpg"> </div> <div class="slide"> <video style="filter: saturate(1.1)" autoplay loop muted playsinline width="450" data-src="https://player.vimeo.com/progressive_redirect/playback/902527813/rendition/1080p/file.mp4?loc=external&signature=8dbfff570f246f09d48716bbab2174591c2a10bd3889bd1f7e7d769efb542b76|video/mp4"></video> </div> <div class="slide"> <video style="filter: saturate(1.1)" autoplay loop muted playsinline width="464" data-src="https://player.vimeo.com/progressive_redirect/playback/902527231/rendition/720p/file.mp4?loc=external&signature=4594067b3ebbfbf16dfda54409fff85222c9c48bf738cf06485075061a517686|video/mp4"></video> </div> <div class="slide"> <video style="filter: saturate(1.1)" autoplay loop muted playsinline width="446" data-src="https://player.vimeo.com/progressive_redirect/playback/902537176/rendition/720p/file.mp4?loc=external&signature=e3f4afec7fcfe8718d61d7a9673a21cafae4dd91650bbfc60a1c77f347bac43c|video/mp4"></video> </div> ');
//   //     $('.carousel-slider.rco').addClass("content-added");
//   //     // update();
      
//   //   }
//   // }
// });


  $.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || (viewport.bottom - 100)< bounds.top || viewport.top > bounds.bottom));

};


// // scrambler
  // $(window).scroll(function() {

  //   $('.c-row-middle h2').each(function(i, obj) {
      
  //     if ($(this).isOnScreen()) {

  //       if ((!$(this).hasClass("scramble")) & (!$(this).hasClass("start"))) {
  //         $(this).addClass('scramble')
  //         $(this).parent().parent().addClass('show')
  //         $(this).find( 'span' ).codex({
  //           effect:"charbychar",
  //           reveal: 100
  //           // effect:"typewriter",
  //           // reveal: 500
  //         });
  //         $(this).find( 'em' ).codex({
  //           effect:"typewriter",
  //           reveal: 200
  //         });
  //       }
        
  //       else {
          
  //       }
        

  //   } else {

  //   }
  //   });

  // });

  $(".start span").codex({
    effect:"charbychar",
    reveal: 500
  });
  
  $(".start em").codex({
    effect:"typewriter",
    reveal: 200
  });

  setTimeout(() => {
    $(".start.hidden").removeClass("hidden")
  }, 100);
  



  // $('.carousel-slider').slick({
  //   infinite: true,
  //   variableWidth: true,
  //   autoplay: true,
  //   autoplaySpeed: 0,
  //   speed: 10000,
  //   cssEase: 'linear',
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   variableWidth: true,
  // });

  // jQuery(".lazy").hide();

  $(function($) {
    $(".slide img").Lazy({
      enableThrottle: true,
      throttle: 400,
    //   effect: 'fadeIn',
    // effectTime: 1000,
    afterLoad: function(element) {
      element.css('opacity', '1');
    },
  });
  });

jQuery(function($) {
  $("video").lazy({
    enableThrottle: true,
    throttle: 400,
    afterLoad: function(element) {
      element.css('opacity', '1');
    },
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

  $('.hero-play-button.video-play-button').click(function(){
    $('.video-js').addClass('show-video');
    $('.initial-thumbnail').removeClass('hide-video');
    $('.full-reel-container').addClass('show');
    $('.video-play-button').removeClass('hide-video');
    // $('button.vjs-play-control').click();
    $(function() {
      $(window).scrollTop(0);
   });
  })

  $('.reel-exit').click(function(){
    $('.full-reel-container').removeClass('show');
    if ($('.vjs-paused').length){
      console.log('exited while paused');
    }
    if ($('.vjs-playing').length){
      $('button.vjs-play-control').click();
    }
    
  })

  $('.lower-logo img').addClass('hi')



  $('.full-reel-wrapper img').click(function(){
    $('.full-reel-container').removeClass('show');
    if ($('.vjs-paused').length){
      console.log('exited while paused');
    }
    if ($('.vjs-playing').length){
      $('button.vjs-play-control').click();
    }
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
    }, "200")

    setTimeout(() => {
        $('#loader').delay( 800 ).addClass("away");
    }, "400")

    


    $(window).scroll(function(){
        $("#hero-hero").css("opacity", 1 - $(window).scrollTop() / 650);
        $("#hero-hero").css("margin-top", 0 - $(window).scrollTop() / 3);
        $("#hero-hero").css({
              "-webkit-filter": `blur(${0 + $(window).scrollTop() / 90}px)`
            });  $("#work").css("opacity", 1 - $(window).scrollTop() / 550);
        $("#work").css("margin-top", 0 - $(window).scrollTop() / 3);
        $("#work").css({
          "-webkit-filter": "blur(100px)"
      }, 0 - $(window).scrollTop() / 550);
      });

      $('.hero-video.video-js .vjs-tech').height($('.div2').height());
      
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

 
  $( ".carousel-row-slider .slide" ).append( "<div class='zoom-button'></div>");


  //start of zoom stuff

  $('.katalyst.carousel-slider .slide').click(function(){
    
    var index = $(this).parent().children('.slide').index(this);

    console.log(index);

    setTimeout(() => {
      var $carousel = $('.katalyst .zoom-carousel').flickity({
      setGallerySize: false,
      draggable: true,
      pageDots: false,
      adaptiveHeight: true,
      fade: true,
      wrapAround: true,
      initialIndex: index,
      lazyLoad: 1
      });

      $('.close-overlay img').click(function(){
      $(this).parent().parent().addClass('down');
      $('html').removeClass('lock-scroll');
      setTimeout(() => {
        $carousel.flickity('destroy');
      }, "500");
    });
    }, "1");

    $('html').addClass('lock-scroll');
    $('.katalyst.carousel-template.down').removeClass('down'); 
    $(window).scroll();
    });

  // $('.nike.carousel-slider .slide').click(function(){
  //   var index = $(this).parent().children('.slide').index(this);
  //   setTimeout(() => {
  //     var $carousel = $('.nike .zoom-carousel').flickity({
  //       setGallerySize: false,
  //       draggable: true,
  //       pageDots: false,
  //       adaptiveHeight: true,
  //       fade: true,
  //       wrapAround: true,
  //       initialIndex: index,
  //       lazyLoad: 1
  //     });
  //     $('.close-overlay img').click(function(){
  //       $(this).parent().parent().addClass('down');
  //       $('html').removeClass('lock-scroll');
  //       setTimeout(() => {
  //         $carousel.flickity('destroy');
  //       }, "500");
  //   });
  // }, "1");
  //   $('html').addClass('lock-scroll');
  //   $('.nike.carousel-template.down').removeClass('down'); 
  //   $(window).scroll();
  // });

  $('.shoprite.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.shoprite .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.shoprite.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.rco.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.rco .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.rco.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.rsr.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.rsr .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.rsr.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.deem.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.deem .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.deem.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.bibi.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.bibi .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.bibi.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.muir.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.muir .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.muir.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.bmt.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.bmt .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.bmt.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.cns.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.cns .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.cns.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.ambush.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.ambush .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.ambush.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.caddy.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.caddy .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.caddy.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.inhouse.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.inhouse .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.inhouse.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.wish.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.wish .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.wish.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.current.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.current .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.current.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.celtics.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.celtics .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.celtics.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.kaie.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.kaie .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.kaie.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.wyndham.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.wyndham .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.wyndham.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.fekkai.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.fekkai .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.fekkai.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.cns2.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.cns2 .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.cns2.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.red.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.red .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.red.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });

  $('.deno.carousel-slider .slide').click(function(){
    var index = $(this).parent().children('.slide').index(this);
    setTimeout(() => {
      var $carousel = $('.deno .zoom-carousel').flickity({
        setGallerySize: false,
        draggable: true,
        pageDots: false,
        adaptiveHeight: true,
        fade: true,
        wrapAround: true,
        initialIndex: index,
        lazyLoad: 1
      });
      $('.close-overlay img').click(function(){
        $(this).parent().parent().addClass('down');
        $('html').removeClass('lock-scroll');
        setTimeout(() => {
          $carousel.flickity('destroy');
        }, "500");
    });
  }, "1");
    $('html').addClass('lock-scroll');
    $('.deno.carousel-template.down').removeClass('down'); 
    $(window).scroll();
  });









});

  