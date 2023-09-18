window.addEventListener("load", function () {
  // a태그 클릭시 해당페이지의 해당위치값 정해주는 기능
  const hash = window.location.hash.substring(1); // URL에서 # 제거

  if (hash) {
    console.log("Hash found:", hash); // 확인을 위해 콘솔에 출력

    const targetElement = document.getElementById(hash);

    if (targetElement) {
      console.log("Target element found:", targetElement); // 확인을 위해 콘솔에 출력

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    } else {
      console.error("Target element not found");
    }
  }
  // ==============================================================
  // 비주얼 슬라이드
  // 1.슬라이드 (.swiper-slide)개수 만큼 li생성하기v
  const swSlideCount = document.querySelectorAll(
    ".sw-visual .swiper-slide"
  ).length;
  // 2.li태그 출력 장소(ul태그 )저장
  const swSlidePgUl = document.querySelector(".sw-visual-pg-list");
  //3.li에 html로 작성할 글자를 생성한다.
  let swVisualHtml = ``;
  for (let i = 0; i < swSlideCount; i++) {
    swVisualHtml = swVisualHtml + `<li>${i + 1}</li>`;
  }
  // 4.html을 추가한다
  swSlidePgUl.innerHTML = swVisualHtml;
  // 5.페이지네이션 관련(코딩으로 생성한 li태그 저장)
  const swVisualPgLi = document.querySelectorAll(".sw-visual-pg-list > li");
  console.log(swVisualPgLi);

  var swiper = new Swiper(".sw-visual", {
    effect: "fade",
    // fadeEffect: {
    //   crossFade: true,
    // },
    loop: true,
    // 슬라이드의 모션 속도를 transition 맞춘다.
    speed: 1500,
    autoplay: {
      delay: 2500,
      // 사용자가 마우스 클릭 드래그로 이동하면
      // 아래 구문이 없으면 autoplya 가 해제되므로
      // 이것을 방지해 주기위한 처리
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".sw-visual-next",
      prevEl: ".sw-visual-prev",
    },
  });
  // swiper 가 최초 실행될때
  // 1번 li 의 흰색 라인이 늘어나는 모션을 실행
  swVisualPgLi[0].classList.add("active");
  // swiper가 바뀔때 마다 실행
  // 슬라이더가 바뀌는 상태를 찾아서
  // 우리가 적용하고자 하는 처리를 하고
  // swiper의 API를 참조해서 작성
  swiper.on("slideChange", function () {
    swVisualPgLi.forEach(function (item, index) {
      if (swiper.realIndex === index) {
        // realIndex는 진짜 html태그의 순서값
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
  // ==========================================================
  // 배너 슬라이드
  const bannerswiper = new Swiper(".swiper-container", {
    direction: "vertical",
    slidesPerView: "auto",
    mousewheel: {
      releaseOnEdges: true, // Release when swiper reaches edge
    },
    keyboard: {
      enabled: true,
    },
  });
  // 슬라이드 스크롤이 끝에 도달했을 때 기본 스크롤(해당페이지스크롤) 사용으로 전환되는 기능
  // Detect mousewheel event on the document
  document.addEventListener("mousewheel", (event) => {
    // Check if the swiper is at the top or bottom
    const isAtTop = swiper.isBeginning;
    const isAtBottom = swiper.isEnd;

    // If swiper is at the top and scrolling up, allow default scroll behavior
    if (isAtTop && event.deltaY < 0) {
      event.preventDefault();
    }

    // If swiper is at the bottom and scrolling down, allow default scroll behavior
    if (isAtBottom && event.deltaY > 0) {
      event.preventDefault();
    }
  });
  // ===================
  const swiperContainer = document.querySelector('.swiper-container');
const swiperSlides = document.querySelectorAll('.swiper-slide');

const updateActiveSlide = () => {
  swiperSlides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      slide.classList.add('active-slide');
    } else {
      slide.classList.remove('active-slide');
    }
  });
};

swiperContainer.addEventListener('scroll', () => {
  updateActiveSlide();
});

// Initial call to set active slide
  updateActiveSlide();
  // =============================================================
  // 앱서비스
  // swi
  var swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    direction: getDirection(),
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      resize: function () {
        swiper.changeDirection(getDirection());
      },
    },
  });

  function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
  }
});
