$(document).ready(function(){
    $(".gnb>li>a").on("click",function(e){
    console.log(this.hash)
    // let hash=this.hash;
    e.preventDefault();
    if(this.hash !== ""){
        let hash=this.hash;
        // $(window).scrollTop();
        // let topSec = $(hash).offset().top
        $("html,body").animate({
            scrollTop : $(hash).offset().top
        },800) 
    }
    })
  //   $("#btn_top").hide();
  // $(window).scroll(function(){
  //     if($(this).scrollTop() < 800){
  //       $("#btn_top").hide(800);
  //     }else if($(this).scrollTop() < 1000){
  //       $("#btn_top").fadeIn(800);
  //     }else if($(this).scrollTop() < 3000){
  //       $("#btn_top").fadeIn(800);
  //     }
  // })


 $(window).resize(function(){
    resizeable()
 })

 function resizeable(){
     if($(window).width() < 700){
     console.log('모바일에서 실행될 스크립트') 
     }else if($(window).width() < 1200){
        console.log('테블릿 에서 실행될 스크립트') 
     }else{
         console.log('데스크탑에서 실행될 스크립트')
     }
 }
 resizeable()

function test(){
    alert("test")
}


$(".btn_top").on("click",function(){
   $("html,body").animate({
       scrollTop : 0
   },500)
})



//intro

/* 1) intro: scrollTop 기준 phase2 토글 */
$(function () {
  var $win   = $(window);
  var $intro = $('#intro');
  if (!$intro.length) return;

  var ENTER_AT = 350;  
  // 이 값 이상이면 phase2 ON
  var LEAVE_AT = 140;  
  // 이 값 미만이면 phase2 OFF

  function onScroll() {
    var sy = $win.scrollTop();
    if (sy >= ENTER_AT) {
      $intro.addClass('phase2');
    } else if (sy <= LEAVE_AT) {
      $intro.removeClass('phase2');
    }
  }

  // 초기 상태 결정 + 이벤트 연결
  onScroll();
  $win.on('scroll resize load pageshow', onScroll);
});


// --- Intro Hero: 매번 새로고침 시 실행 ---
(function(){
  const HERO_THRESHOLD = 0.3; // 화면 높이의 30% 내려가면 축소
  const $body = $('body');

  function startHero(){
    if (!$body.hasClass('hero')) $body.addClass('hero');
    endHeroIfPassed();
  }
  function endHeroIfPassed(){
    if (!$body.hasClass('hero')) return;
    const passed = window.scrollY > window.innerHeight * HERO_THRESHOLD;
    if (passed){ $body.removeClass('hero'); }
  }

  $(window).on('load pageshow', startHero);
  $(window).on('scroll resize', endHeroIfPassed);
})();



// work

$(function () {
  const $tabs   = $('.work-wrap .tabs > div');          
  const $panels = $('.work-wrap .tabPanels .tab-panel');  

  function activateTab(idx) {
    $tabs.removeClass('active');
    $panels.removeClass('active');
    $tabs.eq(idx).addClass('active');
    $panels.eq(idx).addClass('active');
  }

  $tabs.on('click', function(){
    const idx = $(this).index();
    activateTab(idx);
  });

  // 초기 1번 탭 오픈 (0부터 시작)
  activateTab(0);
});

// work-wrap-mobile: 아코디언
$(function(){
  // 처음엔 모두 닫기
  $('.work-wrap-mobile .tab').each(function(){
    $(this).removeClass('active').css('height', '11.1vw')
           .find('.tab-panel').hide();
  });

  // 탭 클릭 시 아코디언
  $(document).on('click', '.work-wrap-mobile .mobile-tab .tab-top', function(e){
    e.stopPropagation();
    const $tab   = $(this).closest('.mobile-tab');
    const open   = $tab.hasClass('active');

    // 다른 탭 닫기
    $('.work-wrap-mobile .mobile-tab').not($tab).removeClass('active')
      .css('height','11.1vw')
      .find('.tab-panel').stop(true,true).slideUp(1000);

    if (open){
      // 이미 열려있으면 닫기
      $tab.removeClass('active')
          .css('height','11.1vw')
          .find('.tab-panel').stop(true,true).slideUp(1000);
    } else {
      // 열기
      $tab.addClass('active')
          .css('height','auto')
          .find('.tab-panel').stop(true,true).slideDown(1000);
    }
  });
});

// project

$(function(){
  if (!document.getElementById('hoverOffStyle')) {
    $('head').append(
      '<style id="hoverOffStyle">'
      + '.project1-wrap.open:hover .tilt{transform:none!important}'
      + '.project1-wrap.open:hover .project1{transform:none!important}'
      + '.project1-wrap.open:hover .hover-stack,.project1-wrap.open:hover .hover-slices{opacity:0!important;transform:translateY(0) translateZ(0)!important}'
      + '.project1-wrap.open:hover .strip,.project1-wrap.open:hover .hover-slice,.project1-wrap.open:hover .hover-slice.top{transform:rotateX(0) translateZ(0)!important}'
      + '</style>'
    );
  }

  $(document).off('click', '.project1-wrap');
  $(document).off('click', '.project1 .tit-row');

  $(document).on('click', '.project1-wrap', function(e){
    const $wrap  = $(this);
    const $desc  = $wrap.find('.description');
    const $extra = $wrap.next('.extra-wrap');
    const willOpen = !$desc.is(':visible');

    // 다른 카드 닫고 open 제거
    $('.project1-wrap').not($wrap).removeClass('open')
      .find('.description').stop(true,true).slideUp(240);
    $('.extra-wrap').not($extra).stop(true,true).slideUp(240);

    if (willOpen){
      // 열기: 먼저 open 붙여서 :not(.open):hover 계열이 즉시 비활성화되게 함
      $wrap.addClass('open');
      $desc.stop(true,true).slideDown(400, 'swing');
      $extra.stop(true,true).slideDown(400, 'swing');
    } else {
      // 닫기: 닫힌 뒤 open 제거(트랜지션 자연스럽게)
      $desc.stop(true,true).slideUp(400, 'swing', function(){
        $wrap.removeClass('open');
      });
      $extra.stop(true,true).slideUp(400, 'swing');
    }
  });
});


// 잔상 제거

function clearGhost($wrap){
  const $stack = $wrap.find('.hover-stack, .hover-slices');
  if (!$stack.length) return;

  $stack.each(function(){
    this.style.transition = 'none';
    this.style.opacity    = '0';
    this.style.transform  = 'translateY(0) translateZ(0)';
    this.style.visibility = 'hidden';

    void this.offsetHeight;

    requestAnimationFrame(()=>{
      this.style.transition = '';
      this.style.opacity    = '';
      this.style.transform  = '';
      this.style.visibility = '';
    });
  });
}

$(document).off('mouseleave', '.project1-wrap')
.on('mouseleave', '.project1-wrap', function(){
  const $wrap = $(this);
  if ($wrap.hasClass('open')) return; // 펼친 상태는 건드리지 않음
  clearGhost($wrap);
});




// ==== Benchmark Lightbox - 최소버전 ====
$(function(){
  const $lightbox = $('#bm-lightbox');
  const $img = $lightbox.find('.bm-image');
  const $cur = $lightbox.find('.bm-current');
  const $tot = $lightbox.find('.bm-total');

  let urls = [];
  let index = 0;

  function show(i){
    const n = urls.length;
    if (!n) return;
    index = (i + n) % n;
    $img.attr('src', urls[index]);
    $cur.text(index + 1);
    $tot.text(n);
  }

  function openFrom($thumb){
    const $gal = $thumb.closest('.benchmark, .result');
    const $thumbs = $gal.find('.bm-thumb');

    urls = $thumbs.map(function(){ return $(this).attr('href'); }).get();
    index = $thumbs.index($thumb);

    $('body').css('overflow','hidden');
    $lightbox.show().attr('aria-hidden','false');
    show(index);
  }

  function close(){
    $lightbox.hide().attr('aria-hidden','true');
    $('body').css('overflow','');
    urls = []; index = 0;
  }

  // 썸네일 클릭 → 오픈
  $(document).on('click', '.bm-thumb', function(e){
    e.preventDefault();
    openFrom($(this));
  });

  // 모달 컨트롤 (버튼/배경만)
  $lightbox.on('click', '.bm-prev',  () => show(index - 1));
  $lightbox.on('click', '.bm-next',  () => show(index + 1));
  $lightbox.on('click', '.bm-close, .bm-backdrop', close);
});


}); //제이쿼리끝

// contact

(function () {
  const status = document.getElementById('copyStatus');
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('copied');
        btn.textContent = '복사됨';
        status.textContent = `${text} 복사 완료`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '복사';
          status.textContent = '';
        }, 1500);
      } catch (e) {
        // 클립보드 허용 안될 때 폴백
        const fallback = prompt('아래 내용을 복사하세요 (Ctrl/Cmd + C)', text);
      }
    });
  });
})();
