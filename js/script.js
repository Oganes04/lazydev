// Custom cursor effect
$(document).ready(function() {
  const cursorFollower = $('.cursor-follower');
  console.log(cursorFollower);
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  // Show the cursor follower when the mouse moves
  $(document).on('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Make cursor visible on first move
    if (cursorFollower.css('opacity') === '0') {
      cursorFollower.css('opacity', '1');
    }
  });
  
  // Hide cursor follower when cursor leaves the window
  $(document).on('mouseleave', function() {
    cursorFollower.css('opacity', '0');
  });
  
  // Enhance cursor when hovering on interactive elements
  $('a, button, input, textarea, .service-card, .case-card').on('mouseenter', function() {
    cursorFollower.css({
      width: '350px',
      height: '350px',
      background: 'radial-gradient(circle, rgba(181, 255, 0, 0.2) 0%, rgba(181, 255, 0, 0) 70%)'
    });
  }).on('mouseleave', function() {
    cursorFollower.css({
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(181, 255, 0, 0.15) 0%, rgba(181, 255, 0, 0) 70%)'
    });
  });
  
  // Animation loop for smooth cursor movement
  function updateCursor() {
    // Smooth transition effect with easing
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    if (cursorFollower.css('opacity') !== '0') {
      cursorFollower.css({
        left: cursorX + 'px',
        top: cursorY + 'px'
      });
    }
    
    requestAnimationFrame(updateCursor);
  }
  
  // Start the animation loop
  updateCursor();
});



//========================== СТИЛИЗАЦИЯ CHECKBOX ========================

$(".check-label").on("click", function () {
    let isChecked = $(this).find("input").prop("checked");
    if (isChecked) {
        $(this).find(".fakecheck").addClass("checked");
    } else {
        $(this).find(".fakecheck").removeClass("checked");
    }
});

//=================== Маска номера телефона ============

//  $('input[type="tel"]').inputmask({
//   "mask": "+7 (999) 999 - 99 - 99",
//   "placeholder": "+7 (   )     -    -   ",
//   "showMaskOnHover": false,
//   "showMaskOnFocus": true
// });



//========================== ФУНКЦИОНАЛ СЛАЙДЕР "КЕЙСЫ" ========================

if (document.querySelectorAll('.cacesSwiper').length) {
  const cacesSwiper = new Swiper(".cacesSwiper", {
    slidesPerView: 1,
    spaceBetween: 32,
    speed: 600,

    navigation: {
      nextEl: ".cacesSwiper-button-next",
      prevEl: ".cacesSwiper-button-prev",
    },

    pagination: {
      el: ".cacesSwiper-pagination",
    },
    
  });
}

//========================== ФУНКЦИОНАЛ СЛАЙДЕР "ОТЗЫВЫ" ========================

if (document.querySelectorAll('.reviewsSwiper').length) {
  const reviewsSwiper = new Swiper(".reviewsSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 600,
    centeredSlides: false,

    navigation: {
      nextEl: ".reviewsSwiper-button-next",
      prevEl: ".reviewsSwiper-button-prev",
    },

    pagination: {
      el: ".reviewsSwiper-pagination",
    },
    on: {
      slideChange: function () {
        // При прокрутке вперёд скрываем предыдущий слайд
        if (this.activeIndex > this.previousIndex) {
          const previousSlide = this.slides[this.previousIndex];
          if (previousSlide) {
            previousSlide.style.opacity = '0';
            previousSlide.style.transition = 'opacity 0.6s ease-out';
          }
        }
        
        // При прокрутке назад показываем только текущий слайд
        if (this.activeIndex < this.previousIndex) {
          const currentSlide = this.slides[this.activeIndex];
          if (currentSlide) {
            currentSlide.style.opacity = '1';
            currentSlide.style.transition = 'opacity 0.6s ease-out';
          }
        }
      },
      init: function () {
        this.slides.forEach(slide => {
          slide.style.opacity = '1';
          slide.style.transition = 'opacity 0.6s ease-out';
        });
      }
    }
  });
}

//========================== ФУНКЦИОНАЛ СЛАЙДЕР "УСЛУГИ" ========================

if (document.querySelectorAll('.servicesSwiper').length) {
  const servicesSwiper = new Swiper(".servicesSwiper", {
    slidesPerView: 1,
    spaceBetween: 32,
    speed: 600,
    loop: true,

    pagination: {
      el: ".servicesSwiper-pagination",
    },
    
  });
}



//========================== Реализация плавного скролла ====================
// const lenis = new Lenis({
//   autoRaf: true,
//   lerp: 0.1,
//   duration: 1.2,
//   wheelMultiplier: 1,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  
//   anchors: {
//       offset: 0,
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   }
// });


//=================== Скролл анимации ============

function animateOnScroll() {
    $(".pre-hidden").each(function () {
        const elementTop = $(this).offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();

        if (elementTop < windowBottom - 50) {
            const delay = parseInt($(this).data("delay")) || 0;
            $(this)
                .css("transition-delay", delay + "ms")
                .removeClass("pre-hidden");
        }
    });
}

  // При прокрутке
$(window).on("scroll", animateOnScroll);




// function animateOnScroll() {
//     const windowTop = $(window).scrollTop();
//     const windowBottom = windowTop + $(window).height();

//     $(".pre-hidden, .animated-element").each(function () {
//         const element = $(this);
//         const elementTop = element.offset().top;
//         const elementBottom = elementTop + element.outerHeight();

//         // Проверяем, находится ли элемент в видимой области с запасом 50px
//         const isInView = elementBottom > windowTop + 75 && elementTop < windowBottom - 200;

//         if (isInView && element.hasClass("pre-hidden")) {
//             // Элемент появился в области видимости - анимируем его
//             const delay = parseInt(element.data("delay")) || 0;
//             element
//                 .css("transition-delay", delay + "ms")
//                 .removeClass("pre-hidden")
//                 .addClass("animated-element");
//         } else if (!isInView && element.hasClass("animated-element")) {
//             // Элемент вышел из области видимости - возвращаем в исходное состояние
//             element
//                 .css("transition-delay", "0ms")
//                 .addClass("pre-hidden")
//                 .removeClass("animated-element");
//         }
//     });
// }

// // При прокрутке
// $(window).on("scroll", animateOnScroll);
// // Также вызываем при загрузке страницы
// $(document).ready(animateOnScroll);




//========================== Функционал модальных окон ====================

function openPopup(popup) {
  $('.popup').fadeOut();
  $('.overlay').fadeIn();
  $('html').css('overflow', 'hidden');
  popup.fadeIn();
}

function closePopup(closeBtn) {
  $('.overlay').fadeOut();
  closeBtn.closest('.popup').fadeOut();
  $('html').css('overflow-y', 'auto');
}
$(document).on('click', '.popup-close', function(e) {
  closePopup($(this));
});

$(document).on('click', '.popup-callme-btn', function(e) {
  openPopup($('.popup-callme'));
});


$(document).on('click', '.popup-social-btn', function(e) {
  openPopup($('.popup-social'));
});

$(document).on('click', '.popup-review-btn', function(e) {
  openPopup($('.popup-review'));
});




$(document).on('click', '.mobile-menu-btn', function(e) {
  $('.mobile-menu').addClass('open');
});

$(document).on('click', '.mobile-menu-close', function(e) {
  $('.mobile-menu').removeClass('open');
});






//========================== БАННЕР COOKIE ====================

$(document).ready(function () {
  const cookieBanner = $(".accept-cookies");
  const acceptButton = $(".accept-cookies button");


  function checkAcceptCookieState() {
    return localStorage.getItem("acceptCookie") === "true";
  }

  function showCookieBanner() {
    cookieBanner.addClass("show");
  }

  function hideCookieBanner() {
    cookieBanner.removeClass("show");
    setTimeout(() => {
      cookieBanner.remove(); // Удаляем элемент из DOM после анимации
    }, 1000);
  }

  if (checkAcceptCookieState()) {
    cookieBanner.hide();
  } else {
    showCookieBanner();
  }

  acceptButton.on("click", function () {
    localStorage.setItem("acceptCookie", "true");
    hideCookieBanner();
  });
});
