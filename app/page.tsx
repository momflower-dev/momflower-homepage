'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('vision');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 클라이언트 사이드에서만 실행되도록 보장
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 안전한 클립보드 복사 함수
  const copyToClipboard = async (text: string, label: string, event?: React.MouseEvent | React.TouchEvent) => {
    if (!isClient) return;
    
    // 이벤트 전파 방지
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
      // 최신 브라우저의 경우
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        alert(`${label}이(가) 복사되었습니다!`);
      } 
      // 구형 브라우저나 http 환경의 경우
      else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('contenteditable', 'false');
        document.body.appendChild(textArea);
        
        // iOS Safari에서 가상 키보드 방지
        textArea.setSelectionRange(0, 0);
        textArea.focus({ preventScroll: true });
        textArea.select();
        
        try {
          document.execCommand('copy');
          alert(`${label}이(가) 복사되었습니다!`);
        } catch (err) {
          console.error('복사 실패:', err);
          alert(`복사 기능을 사용할 수 없습니다. 텍스트를 길게 눌러 직접 복사해 주세요.\n\n${text}`);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('복사 오류:', err);
      alert(`복사 기능을 사용할 수 없습니다. 텍스트를 길게 눌러 직접 복사해 주세요.\n\n${text}`);
    }
  };

  // 솔루션 데이터
  const solutions = {
    irrigation: {
      title: "관수 제어 시스템",
      icon: "💧",
      image: "/assets/img/service/irrigation_system2.jpg",
      description: "농가 맞춤형 자동 관수 솔루션으로 물 주기 부담을 줄입니다. 22개 채널 제어로 농가 편의성을 극대화했습니다.",
      details: {
        features: [
          "22개 채널 동시 제어",
          "구역별 관수 스케줄 설정",
          "토양 수분 센서 연동",
          "실시간 관수량 모니터링",
          "자동/수동 모드 전환",
          "물 절약 효율성 분석"
        ],
        benefits: [
          "농작업 시간 80% 단축",
          "물 사용량 30% 절약",
          "작물 생육 균일성 향상",
          "인건비 절감 효과",
          "원격지에서 제어 가능",
          "데이터 기반 최적화"
        ],
        specifications: [
          "제어 채널: 최대 22개",
          "통신 방식: WiFi, LTE",
          "센서 연동: 토양수분, 온습도",
          "전원: AC 220V",
          "방수등급: IP65",
          "앱 지원: Android, iOS"
        ]
      }
    },
    elevated: {
      title: "고설 재배 베드",
      icon: "🌱",
      image: "/assets/img/service/stand_form_farm.jpg",
      description: "가변형 입식 재배 베드로 상추, 깻잎 등 엽채류 재배 효율성을 높입니다. 작업 효율 향상으로 생산성이 개선됩니다.",
      details: {
        features: [
          "가변형 높이 조절 (50-80cm)",
          "모듈형 조립 설계",
          "다구형 포트 시스템",
          "점적 관수 라인 내장",
          "작업 동선 최적화",
          "상토 재활용 구조"
        ],
        benefits: [
          "허리 굽힘 작업 제거",
          "재배 밀도 2배 향상",
          "수확 효율 3배 증대",
          "작업자 피로도 70% 감소",
          "연중 안정 생산",
          "상토 사용량 절약"
        ],
        specifications: [
          "베드 길이: 12-18m",
          "베드 높이: 50-80cm (가변)",
          "재배 밀도: 35,000주/450평",
          "소재: 아연도금 파이프",
          "포트: 다구형 재사용",
          "설치 면적: 100-1000평"
        ]
      }
    },
    platform: {
      title: "클라우드 플랫폼 '슬라워'",
      icon: "☁️",
      image: "/assets/img/service/slower_sensor.jpg",
      description: "원격 제어 및 데이터 분석으로 농업 현장을 스마트하게 관리합니다. 모바일앱을 통한 실시간 모니터링이 가능합니다.",
      details: {
        features: [
          "클라우드 기반 통합 관제",
          "실시간 데이터 수집",
          "원격 제어 시스템",
          "데이터 분석 대시보드",
          "알람 및 알림 서비스",
          "다중 농장 관리"
        ],
        benefits: [
          "언제 어디서나 농장 관리",
          "데이터 기반 의사결정",
          "이상 상황 즉시 대응",
          "농장 운영 비용 절감",
          "생산성 향상 분석",
          "농업 기술 축적"
        ],
        specifications: [
          "클라우드: AWS 기반",
          "데이터 저장: 무제한",
          "동시 접속: 다중 사용자",
          "API 제공: RESTful",
          "보안: SSL 암호화",
          "업데이트: 자동 OTA"
        ]
      }
    },
    sensors: {
      title: "토양 및 환경 센서",
      icon: "📊",
      image: "/assets/img/service/teros.jpg",
      description: "TEROS 토양 센서 및 온습도 센서를 통해 데이터 기반 재배를 지원합니다. 최적화된 환경으로 수확량과 품질을 향상시킵니다.",
      details: {
        features: [
          "TEROS32 토양센서",
          "온습도 환경센서",
          "일사량 측정",
          "CO2 농도 측정",
          "기상데이터 연동",
          "실시간 데이터 전송"
        ],
        benefits: [
          "정밀한 관수 타이밍",
          "작물 스트레스 최소화",
          "에너지 효율 최적화",
          "병해충 예방 효과",
          "품질 균일성 향상",
          "수확량 15% 증대"
        ],
        specifications: [
          "측정 항목: 토양수분, 온도, 전기전도도",
          "정확도: ±1%",
          "통신: RS-485, 4-20mA",
          "전원: 12V DC",
          "측정 간격: 1분-24시간",
          "수명: 5년 이상"
        ]
      }
    }
  };

  useEffect(() => {
    // AOS는 클라이언트 마운트 후에만 초기화
    if (!isClient) return;
    
    let mounted = true;
    
    const loadAOS = async () => {
      if (typeof window !== 'undefined' && mounted) {
        try {
          const AOS = (await import('aos')).default;
          
          AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100,
          });
        } catch (error) {
          console.error('AOS 초기화 실패:', error);
        }
      }
    };

    loadAOS();
    
    return () => {
      mounted = false;
    };
  }, [isClient]);

  // 모바일 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (isMobileMenuOpen && 
          target && 
          target instanceof Element && 
          typeof target.closest === 'function' &&
          !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleModalClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedSolution(null);
      }
    };

    document.addEventListener('keydown', handleModalClose);
    return () => document.removeEventListener('keydown', handleModalClose);
  }, []);

  // 스크롤 관련 상태 제어 - 클라이언트에서만
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // 스크롤 투 탑 버튼 제어
      if (scrollPosition > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
      
      // 네비게이션 스크롤 상태 제어
      if (scrollPosition > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // 맨위로 스크롤하는 함수
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 모바일에서 터치 이벤트 최적화 - 클라이언트에서만
  useEffect(() => {
    if (!isClient) return;

    // 수평 스와이프 방지 (세로 스크롤만 허용)
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        
        // 수평 스와이프가 수직 스와이프보다 크면 방지
        if (deltaX > deltaY && deltaX > 10) {
          e.preventDefault();
        }
      }
    };

    // 더블탭 줌 방지
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', preventDoubleTapZoom);
      document.removeEventListener('gesturestart', (e) => e.preventDefault());
      document.removeEventListener('gesturechange', (e) => e.preventDefault());
    };
  }, [isClient]);

  return (
    <div className="min-h-screen bg-slate-900 touch-manipulation" style={{ touchAction: 'manipulation' }} suppressHydrationWarning>
      {/* 우측 중간 퀵 액세스 메뉴 */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-3">
        {/* 슬라워 퀵매뉴얼 다운로드 버튼 */}
        <button 
          onClick={() => alert('준비중입니다. 곧 제공될 예정입니다.')}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg p-2 sm:p-3 lg:p-4 xl:p-5 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
          title="슬라워 퀵매뉴얼 다운로드"
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">
              📋
            </div>
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold leading-tight">
              슬라워<br />퀵매뉴얼
            </div>
          </div>
        </button>

        {/* 인증마크들 */}
        <Link 
          href="#certifications"
          className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-5 xl:p-6 shadow-lg border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer"
          title="인증 정보 보기"
        >
          <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 relative">
            <Image
              src="/assets/img/award/jodal_goods.png"
              alt="조달청 우수제품"
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
        <Link 
          href="#certifications"
          className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-5 xl:p-6 shadow-lg border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer"
          title="인증 정보 보기"
        >
          <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 relative">
            <Image
              src="/assets/img/award/KSA_ISO_9001.png"
              alt="ISO 9001 인증"
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 nav-gradient-border ${
          isScrolled 
            ? 'backdrop-blur-xl bg-white/95 shadow-lg shadow-gray-300/30 scrolled' 
            : 'backdrop-blur-md bg-white/90'
        }`}
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <Image
              src="/assets/img/mfgarden_head_letter_logo.png"
              alt="맘꽃 로고"
              width={40}
              height={40}
              className="rounded-lg"
            /> */}
            <div className="text-emerald-800">
              <h1 className="text-xl font-bold">맘꽃</h1>
              <p className="text-sm text-emerald-600">Flower in heart</p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">회사소개</Link>
            <Link href="#featured-services" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">주요서비스</Link>
            <Link href="#solutions" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">솔루션</Link>
            <Link href="#awards" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">수상/인증</Link>
            <Link href="#demo-farm" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">실증농장</Link>
            <Link href="#portfolio" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">구축사례</Link>
            <Link href="#gallery" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">갤러리</Link>
            <Link href="#recent-posts" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">소식</Link>
            <Link href="#contact" className="text-emerald-700 hover:text-emerald-500 transition-colors duration-300 select-text">문의하기</Link>
            <Link 
              href="https://www.slower.biz" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 select-text"
            >
              { '슬라워 이동하기 ' }
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Slower Button */}
            <Link 
              href="https://www.slower.biz" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 select-text"
            >
              슬라워 이동하기
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="text-emerald-700 p-2 rounded-md hover:bg-emerald-100 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-emerald-200 z-50">
            <div className="px-6 py-4 space-y-4">
              <Link 
                href="#about" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                회사소개
              </Link>
              <Link 
                href="#featured-services" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                주요서비스
              </Link>
              <Link 
                href="#solutions" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                솔루션
              </Link>
              <Link 
                href="#awards" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                수상/인증
              </Link>
              <Link 
                href="#demo-farm" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                실증농장
              </Link>
              <Link 
                href="#portfolio" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                구축사례
              </Link>
              <Link 
                href="#gallery" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                갤러리
              </Link>
              <Link 
                href="#recent-posts" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                소식
              </Link>
              <Link 
                href="#contact" 
                className="block text-emerald-700 hover:text-emerald-500 transition-colors duration-300 py-2 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                문의하기
              </Link>
              <Link 
                href="https://www.slower.biz" 
                className="block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-center mt-4 select-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                슬라워 이동하기
              </Link>
            </div>
          </div>
        )}
      </nav>

            {/* Hero Section + Status Section - 동일한 배경 이미지 적용 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 pt-20">
        {/* Background Pattern - 전체 영역에 적용 */}
        {/* <div className="absolute inset-0 bg-[url('/assets/img/farm/company_farm5.mp4')] bg-cover bg-center opacity-80"></div> */}
        <video
    autoPlay
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover opacity-80"
  >
    <source src="/assets/img/farm/company_farm5.mp4" type="video/mp4" />
  </video>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-green-800/50 to-teal-900/65"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <main className="relative z-10 min-h-[60vh] lg:h-[60vh]">

        <div className="relative z-10 flex items-center min-h-[60vh] lg:h-full px-6 py-12 lg:py-0">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-4 items-center w-full">
            {/* Content */}
            <div 
              className="text-white space-y-6 order-2 lg:order-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-emerald-100 to-teal-100 bg-clip-text text-transparent" style={{fontFamily: 'green'}}>
                     스마트 농업
                  </span>
                  <br />
                  <span 
                    className="text-white drop-shadow-lg"
                    style={{
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    미래를 열다
                  </span>
                </h1>
                
                <p 
                  className="text-base sm:text-lg lg:text-xl text-white leading-relaxed"
                  style={{
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 0, 0, 0.2'
                  }}
                >
                  제주를 기반으로 한 혁신적인 스마트팜 기술로
                  <br className="hidden sm:block" />
                  지속 가능한 농업의 새로운 패러다임을 제시합니다
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://blog.naver.com/mfgarden"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                >
                  맘꽃 블로그 방문하기
                </Link>
                
                <Link 
                  href="https://www.youtube.com/watch?v=WnQ9ZfDd5as"
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>🎬</span>
                  <span>홍보 영상 보기</span>
                </Link>
              </div>


            </div>

            {/* Visual Element */}
            <div 
              className="relative flex items-center justify-center order-1 lg:order-2"
              data-aos="zoom-out"
              data-aos-delay="400"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                  <Image
                    src="/assets/img/mflower_logo2.svg"
                    alt="맘꽃 로고"
                    fill
                    className="object-contain animate-float"
                    style={{
                      filter: `
                      drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))
                      drop-shadow(0 0 60px rgba(16, 185, 129, 0.6))
                      drop-shadow(0 0 90px rgba(20, 184, 166, 0.4))
                      drop-shadow(0 10px 40px rgba(0, 0, 0, 0.3))
                    `
                    }}
                  />
                </div>
                
                {/* Floating Elements - 스마트팜 관련 아이콘으로 변경 및 겹치지 않도록 배치 */}
                <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 w-16 h-16 sm:w-20 sm:h-20 bg-emerald-400/20 rounded-full backdrop-blur-sm border border-emerald-300/30 flex items-center justify-center animate-bounce-slow">
                  <span className="text-lg sm:text-xl">🌱</span>
                </div>
                
                <div className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 w-16 h-16 sm:w-20 sm:h-20 bg-teal-400/20 rounded-full backdrop-blur-sm border border-teal-300/30 flex items-center justify-center animate-bounce-slow animation-delay-1000">
                  <span className="text-lg sm:text-xl">🚜</span>
                </div>
                
                <div className="absolute top-1/2 -left-12 sm:-left-16 w-12 h-12 sm:w-16 sm:h-16 bg-green-400/20 rounded-full backdrop-blur-sm border border-green-300/30 flex items-center justify-center animate-pulse">
                  <span className="text-sm sm:text-lg">📊</span>
                </div>
                
                <div className="absolute top-1/2 -right-12 sm:-right-16 w-12 h-12 sm:w-16 sm:h-16 bg-blue-400/20 rounded-full backdrop-blur-sm border border-blue-300/30 flex items-center justify-center animate-pulse animation-delay-2000">
                  <span className="text-sm sm:text-lg">💧</span>
                </div>
                
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400/20 rounded-full backdrop-blur-sm border border-yellow-300/30 flex items-center justify-center animate-bounce-slow animation-delay-3000">
                  <span className="text-xs sm:text-sm">☁️</span>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Scroll Indicator - 모바일에서는 숨김 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </main>

        {/* Status Section - 투명한 흰색 배경으로 변경 */}
        <section 
          id="status" 
          className="relative z-10 py-12 lg:py-16 px-6 min-h-[40vh] lg:h-[40vh] flex items-center scroll-mt-24 bg-white/5 backdrop-blur-sm"
          data-aos="fade-up"
          data-aos-delay="600"
        >
                   <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
             <div className="text-center">
               <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 flex items-center justify-center shadow-lg border-2 border-emerald-300/50">
                 <span className="text-emerald-700 text-xl sm:text-2xl lg:text-3xl font-bold">140개</span>
               </div>
               <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 lg:mb-2" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'}}>구축 농장</h3>
               <p className="text-sm sm:text-base text-white/90 font-medium" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)'}}>스마트팜 시스템 구축</p>
             </div>

             <div className="text-center">
               <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 flex items-center justify-center shadow-lg border-2 border-emerald-300/50">
                 <span className="text-emerald-700 text-xl sm:text-2xl lg:text-3xl font-bold">8기관</span>
               </div>
               <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 lg:mb-2" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'}}>협력 기관</h3>
               <p className="text-sm sm:text-base text-white/90 font-medium" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)'}}>정부기관 및 민간 협력</p>
             </div>

             <div className="text-center">
               <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 flex items-center justify-center shadow-lg border-2 border-emerald-300/50">
                 <span className="text-emerald-700 text-xl sm:text-2xl lg:text-3xl font-bold">5건</span>
               </div>
               <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 lg:mb-2" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'}}>특허 등록</h3>
               <p className="text-sm sm:text-base text-white/90 font-medium" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)'}}>핵심 기술 특허 보유</p>
             </div>

             <div className="text-center">
               <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 flex items-center justify-center shadow-lg border-2 border-emerald-300/50">
                 <span className="text-emerald-700 text-xl sm:text-2xl lg:text-3xl font-bold">6년</span>
               </div>
               <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 lg:mb-2" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'}}>운영 년수</h3>
               <p className="text-sm sm:text-base text-white/90 font-medium" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)'}}>2020년부터 지속 성장</p>
             </div>
           </div>
         </div>
       </section>
      </div>

      {/* 인증 마크 전용 섹션 */}
      <section id="certifications" className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-16 px-6 scroll-mt-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8" data-aos="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              정부 인증 우수 기업
            </h2>
            <p className="text-emerald-100 text-lg">
              신뢰할 수 있는 품질과 기술력을 인정받은 맘꽃
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12" data-aos="zoom-in" data-aos-delay="200">
            <div className="group bg-white/95 backdrop-blur-lg rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border border-white/50">
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 mx-auto mb-4 relative">
                  <Image
                    src="/assets/img/award/jodal_goods.png"
                    alt="조달청 우수제품"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  조달청 우수제품
                </h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  정부 조달청이 인정한<br />우수한 품질의 제품
                </p>
              </div>
            </div>
            
            <div className="group bg-white/95 backdrop-blur-lg rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border border-white/50">
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 mx-auto mb-4 relative">
                  <Image
                    src="/assets/img/award/KSA_ISO_9001.png"
                    alt="ISO 9001 인증"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  ISO 9001 인증
                </h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  국제 표준 품질경영<br />시스템 인증
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <p className="text-white font-semibold text-lg">
                🏆 신뢰받는 스마트팜 전문 기업 🏆
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - 밝은 배경 */}
      <section 
        id="about" 
        className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50 py-20 px-6 scroll-mt-24"
        data-aos="fade-up"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div 
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">회사 소개</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              맘꽃은 2020년부터 제주에서 스마트팜 기술 연구를 시작하여,
              농업인과 협업하며 실용적인 솔루션을 제공하는 기업으로 성장했습니다.
              우리의 사명은 기후 변화와 고령화에 대응하는 지속 가능한 농업 기술을 통해
              농민과 지역 사회를 지원하는 것입니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className="relative"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg">
                <Image
                  src="/assets/img/smartfarm_illust3.png"
                  alt="맘꽃 CEO"
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>

            <div 
              className="space-y-8"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              {/* Tab Navigation */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="flex space-x-4 mb-6">
                  <button 
                    onClick={() => setActiveTab('vision')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeTab === 'vision' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    비전 & 미션
                  </button>
                  <button 
                    onClick={() => setActiveTab('business')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeTab === 'business' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    사업 영역
                  </button>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeTab === 'history' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    회사연혁
                  </button>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === 'vision' && (
                    <div>
                      {/* <h3 className="text-xl font-bold text-gray-900 mb-6">비전 & 미션</h3> */}
                      
                      <div className="space-y-6">
                        {/* 미션 섹션 - 슬로건 */}
                        <div className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm">
                          <div className="flex items-center mb-4">
                            <div className="inline-flex items-center bg-gradient-to-r from-pink-400 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                              </svg>
                              미션
                            </div>
                          </div>
                          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-6 text-center">
                            <p className="text-emerald-700 text-base mb-2">슬라워 (Software + Flower)</p>
                            <p className="text-emerald-900 text-xl font-bold">&quot;소프트웨어로 꽃을 피우다&quot;</p>
                          </div>
                        </div>

                        {/* 비전 섹션 */}
                        <div className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm">
                          <div className="flex items-center mb-4">
                            <div className="inline-flex items-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
                              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              비전
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-emerald-700 to-green-800 text-white p-6 rounded-lg mb-4">
                            <p className="text-center text-lg font-semibold mb-2">
                              Innovative Technology Companies Pioneering the Future of Agriculture
                            </p>
                            <p className="text-center text-base text-emerald-100">
                              현장 중심의 농업 미래를 개척하는 혁신 기술 기업
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gradient-to-b from-emerald-700 to-green-800 text-white p-4 rounded text-center">
                              <h5 className="font-bold text-base">작물 재배</h5>
                            </div>
                            <div className="bg-gradient-to-b from-emerald-700 to-green-800 text-white p-4 rounded text-center">
                              <h5 className="font-bold text-base">재배 시설</h5>
                            </div>
                            <div className="bg-gradient-to-b from-emerald-700 to-green-800 text-white p-4 rounded text-center">
                              <h5 className="font-bold text-base">시설 제어</h5>
                            </div>
                          </div>
                          {/* 분리된 화살표들 */}
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            <div className="flex justify-center">
                              <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex justify-center">
                              <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex justify-center">
                              <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* 핵심가치 섹션 - M F G 카드 */}
                        <div className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm">
                          <div className="flex items-center mb-4">
                            <div className="inline-flex items-center bg-gradient-to-r from-purple-400 to-violet-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md">
                              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                              핵심가치
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-1 sm:gap-4">
                            <div className="bg-gradient-to-b from-emerald-700 to-green-800 text-white p-2 sm:p-6 rounded-lg text-center">
                              <div className="w-6 h-6 sm:w-12 sm:h-12 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-3">
                                <span className="text-white font-bold text-xs sm:text-xl">M</span>
                              </div>
                              <h5 className="font-bold text-[10px] sm:text-base leading-tight">
                                <span className="text-emerald-300">M</span>ember <br/>based
                              </h5>
                            </div>
                            <div className="bg-gradient-to-b from-emerald-700 to-green-800 text-white p-2 sm:p-6 rounded-lg text-center">
                              <div className="w-6 h-6 sm:w-12 sm:h-12 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-3">
                                <span className="text-white font-bold text-xs sm:text-xl">F</span>
                              </div>
                              <h5 className="font-bold text-[10px] sm:text-base leading-tight">
                                <span className="text-emerald-300">F</span>uture<br/>orientation
                              </h5>
                            </div>
                            <div className="bg-gradient-to-b from-emerald-700 to-green-800 text-white p-2 sm:p-6 rounded-lg text-center">
                              <div className="w-6 h-6 sm:w-12 sm:h-12 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-3">
                                <span className="text-white font-bold text-xs sm:text-xl">G</span>
                              </div>
                              <h5 className="font-bold text-[10px] sm:text-base leading-tight">
                                <span className="text-emerald-300">G</span>lobalization
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'business' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">스마트팜 설치 및 컨설팅</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">시설하우스 및 노지 농업 스마트팜 구축</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">농장 맞춤형 스마트팜 설계 및 운영 컨설팅 제공</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">농업 환경 및 작물에 따른 최적의 기술 적용</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">클라우드 스마트팜 플랫폼 운영</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">제주농업기술원 클라우드 스마트팜 서비스 &quot;제빛나&quot; 구축 및 운영 담당</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">자체 클라우드 스마트팜 서비스 &quot;Slower 슬라워&quot; 운영 </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">국립원예 특작과학원 시설원예연구소 &quot;아라플랫폼&quot; 구축 협력기업</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">연구 및 협업</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">농촌진흥청, 농업기술원과의 연구 파트너십</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">대학교 연구진과의 기술 개발 협력</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">농업인의 기술 역량 강화를 위한 정기 워크숍 개최</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-emerald-600 text-xl">✓</div>
                          <p className="text-gray-700">국립원예특작과학원 아라온실 플랫폼 상용화드림팀 참여기업</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'history' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">회사 연혁</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-emerald-500 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-semibold">2025</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-gray-700"><strong>1월:</strong> 조달청장 상 수상 - 2024년 하반기 우수조달업체 선정</p>
                            <p className="text-gray-700"><strong>2월:</strong> 농협중앙회 방문 - 스마트농업 기술 확산을 위한 협력 논의</p>
                            <p className="text-gray-700"><strong>3월:</strong> 데이터기반 확산지원사업(남원농협,제주ICT협동조합) - 150개농장 스마트팜시스템 보급</p>
                            <p className="text-gray-700"><strong>7월:</strong> 조달청 우수 조달물품 선정, 맘꽃가든에서 맘꽃주식회사로 법인전환</p>
                          </div>
                        </div>

                        <div className="border-l-4 border-emerald-500 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-semibold">2024</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-gray-700"><strong>2월:</strong> 농촌진흥청 시설원예연구소 아라플랫폼 현장 실증 기업 선정</p>
                            <p className="text-gray-700"><strong>3월:</strong> 제주ICT협동조합과 컨소시엄 구성, 40개 농가 슬라워 2.0 관수 서비스 설명회</p>
                            <p className="text-gray-700"><strong>7월:</strong> ISO-9001 품질경영시스템 인증 획득</p>
                            <p className="text-gray-700"><strong>9월:</strong> ICT융합품질인증 시험 검사 완료</p>
                            <p className="text-gray-700"><strong>12월:</strong> 제주지방조달청장 관계자 방문, 슬라워 제품 조달청 혁신제품 인증</p>
                          </div>
                        </div>

                        <div className="border-l-4 border-emerald-500 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-semibold">2023</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-gray-700"><strong>1월:</strong> 공공기상데이터 기반 공기순환팬 저전력화 시스템 개발</p>
                            <p className="text-gray-700"><strong>2월:</strong> IT 동아일보 인터뷰 - 한국농업기술진흥원 기업 홍보 지원</p>
                            <p className="text-gray-700"><strong>4월:</strong> 한국생산기술연구원 파트너 기업 선정</p>
                            <p className="text-gray-700"><strong>7월:</strong> YTN 전국 방송 출연 - 가변형 입식재배 기술 소개</p>
                            <p className="text-gray-700"><strong>11월:</strong> 모의투자대회 1등 수상</p>
                          </div>
                        </div>

                        <div className="border-l-4 border-emerald-500 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-semibold">2022</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-gray-700"><strong>8월:</strong> 다단육묘베드에서 32,000주 동시 파종/육묘 시스템 구축</p>
                            <p className="text-gray-700"><strong>9월:</strong> 동부자립형스마트팜 연구회 회원 농가 원격 제어 시스템 설치</p>
                            <p className="text-gray-700"><strong>10월:</strong> 공기순환팬 원격 제어 모듈 농가 설치 확산</p>
                            <p className="text-gray-700"><strong>12월:</strong> 가변형 입식 재배 시스템 개발 완료</p>
                          </div>
                        </div>

                        <div className="border-l-4 border-emerald-500 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-semibold">2020</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-gray-700"><strong>1월:</strong> 제주농업기술원과 자립형 스마트팜 연구회 시작</p>
                            <p className="text-gray-700"><strong>4월:</strong> 제주 동부 구좌 지역 강소농 농가와 스마트팜 연구회 구성</p>
                          </div>
                        </div>

                        <div className="border-l-4 border-emerald-500 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-semibold">2018</span>
                          </div>
                          <p className="text-gray-700"><strong>창립:</strong> 제주에서 스마트팜 기술 연구 시작</p>
                        </div>
                      </div>
                    </div>
                  )}


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section - 어두운 배경 유지 */}
      <section 
        id="clients" 
        className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 py-20 px-6 scroll-mt-24"
        data-aos="fade-up"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div 
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">협업 기관</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              맘꽃과 함께하는 정부기관 및 협력 파트너들입니다.
            </p>
          </div>

          <div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/rda_logo.svg"
                alt="농촌진흥청"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/gov_wonye_logo.png"
                alt="국립원예특작과학원"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/goverment_farmtech_logo.png"
                alt="농업기술실용화재단"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/goverment_jodal_logo.png"
                alt="조달청"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/jeju_famtech_logo.png"
                alt="제주농업기술원"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/jeju_dongbu_logo.png"
                alt="제주시농업기술센터"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/nh_economy_logo.jpeg"
                alt="농협경제지주"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
              <Image
                src="/assets/img/clients/kt_logo.png"
                alt="KT"
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - 밝은 배경 */}
      <section 
        id="services" 
        className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50 py-20 px-6 scroll-mt-24"
        data-aos="fade-up"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div 
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">스마트팜 기술 보급</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              맘꽃의 스마트팜 솔루션은 농업 환경과 작물에 최적화되어 있으며,
              농민들의 편의성과 효율성을 높여줍니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">스마트 농업 플랫폼</h3>
              <p className="text-gray-700 text-lg">
                농장 전반의 데이터를 한 눈에 확인하고 관리할 수 있는 통합 플랫폼입니다.
                온도, 습도, 비옥도, 물 공급 등 농업 환경 요소를 실시간으로 모니터링하며,
                농민들은 이를 통해 농장 운영을 효율적으로 관리할 수 있습니다.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">데이터 분석 및 예측</h3>
              <p className="text-gray-700 text-lg">
                농업 데이터를 수집하고 분석하여 작물의 성장 과정을 예측하며,
                농민들은 이를 통해 농장 운영을 최적화할 수 있습니다.
                또한, 작물 질병 발생 예측 및 농업 환경 최적화에 활용됩니다.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">농업 교육 및 지원</h3>
              <p className="text-gray-700 text-lg">
                농민들에게 스마트팜 기술을 쉽게 이해하고 적용할 수 있도록 교육 프로그램을 제공합니다.
                농협과 대학교와의 협력을 통해 전문적인 지식을 전달하며,
                농업인의 기술 역량을 강화합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - 어두운 배경 */}
      <section id="portfolio" className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 py-20 px-6 scroll-mt-24">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">농장 구축 & 실증 사례</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              맘꽃은 제주도를 비롯한 전국 농장에서 스마트팜 시스템을 구축하고 실증하여,
              농민들의 실질적인 농업 혁신을 이끌어내고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="text-emerald-300 text-2xl mr-3">🏗️</div>
                <h3 className="text-xl font-bold text-white">맘꽃 실증농장 구축</h3>
              </div>
              <div className="text-emerald-300 text-sm mb-2">2021년도</div>
              <p className="text-emerald-100 text-lg">
                450평 규모 신규농장에 가변형 고설베드 설치. 깻잎, 상추, 쑥갓 재배용 18m 길이, 65cm 높이 베드로 35,000주 재배 가능한 입식재배 시설 구축.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="text-emerald-300 text-2xl mr-3">🌱</div>
                <h3 className="text-xl font-bold text-white">제주ICT협동조합 스마트팜</h3>
              </div>
              <div className="text-emerald-300 text-sm mb-2">2022.11.03</div>
              <p className="text-emerald-100 text-lg">
                서귀포 남원 배또롱 농장과 김석재 농장에 수분부족량 측정 온습도 센서와 순환팬 제어 모듈 설치. 하우스 감귤 재배 스마트팜 시스템 구축.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="text-emerald-300 text-2xl mr-3">🍇</div>
                <h3 className="text-xl font-bold text-white">애월 키위농장 센서 설치</h3>
              </div>
              <div className="text-emerald-300 text-sm mb-2">2023.03.22</div>
              <p className="text-emerald-100 text-lg">
                애월 키위 농가에 TEROS32 디지털 토양센서 설치. 기존 압력게이지 방식 대신 실시간 토양수분·온도 데이터 수집 시스템 구축.
              </p>
            </div>
            
            {/* <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="text-emerald-300 text-2xl mr-3">🌾</div>
                <h3 className="text-xl font-bold text-white">충남 청양 입식재배 농장</h3>
              </div>
              <div className="text-emerald-300 text-sm mb-2">2023.03.04</div>
              <p className="text-emerald-100 text-lg">
                1800평 규모 농장에 가변형 고설베드 설치. 기존 버섯 재배 시설을 입식 재배 시설로 변경하여 시설면적 대비 재배면적 최대 효과 실증.
              </p>
            </div> */}
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="text-emerald-300 text-2xl mr-3">🏭</div>
                <h3 className="text-xl font-bold text-white">데이터 기반 스마트농업</h3>
              </div>
              <div className="text-emerald-300 text-sm mb-2">2024.08.06</div>
              <p className="text-emerald-100 text-lg">
                농림축산식품부 지원사업으로 제주지역 30개 농가 대상 클라우드 기반 스마트팜 시스템 설명회 개최. 실제 농가 현장 적용 및 운영 교육.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="text-emerald-300 text-2xl mr-3">💨</div>
                <h3 className="text-xl font-bold text-white">공기순환팬 저전력화 실증</h3>
              </div>
              <div className="text-emerald-300 text-sm mb-2">2023.03.06</div>
              <p className="text-emerald-100 text-lg">
                제주 동부 디지털 농업연구회와 협업하여 공공기상데이터 기반 순환팬 저전력화 시스템 5개 농장 현장 실증. 10% 이상 전력 절약 효과.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-300 mb-2">140+</div>
                <div className="text-emerald-100">총 농장 구축사례</div>
                <div className="text-emerald-200 text-sm mt-1">2020-2025 누적</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-300 mb-2">상추,키위농장</div>
                <div className="text-emerald-100">실증 농장 운영</div>
                <div className="text-emerald-200 text-sm mt-1">김녕,표선</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-emerald-300 mb-2">5년</div>
                <div className="text-emerald-100">농장 구축 경험</div>
                <div className="text-emerald-200 text-sm mt-1">2020년부터</div>
              </div>
            </div>
            
            <div className="mt-12 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">주요 농장 구축 실적</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-emerald-300 font-bold mb-2">🍅 시설원예</div>
                  <div className="text-emerald-100 text-sm">토마토, 파프리카, 오이 등 시설원예 작물 스마트팜 구축</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-emerald-300 font-bold mb-2">🥬 엽채류</div>
                  <div className="text-emerald-100 text-sm">상추, 케일, 깻잎 등 가변형 입식재배 시설 구축</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-emerald-300 font-bold mb-2">🍊 감귤농장</div>
                  <div className="text-emerald-100 text-sm">하우스 감귤, 키위 등 과수 스마트팜 시설 구축</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-emerald-300 font-bold mb-2">💡 연구시설</div>
                  <div className="text-emerald-100 text-sm">농업기술원, 대학 등 연구기관 실증 시설 구축</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section - 밝은 배경 */}
      <section id="featured-services" className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50 py-20 px-6 scroll-mt-24">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">주요 서비스</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              맘꽃이 제공하는 핵심 스마트팜 서비스입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-emerald-600 text-5xl mb-4">☁️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">클라우드형 시설관제</h3>
              <p className="text-gray-700">클라우드형 시설관제 시스템으로 다중 농장 관리가 가능한 확장 가능한 스마트팜 시스템</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-emerald-600 text-5xl mb-4">💧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">자동화 관수시스템</h3>
              <p className="text-gray-700">실시간 농장 환경 모니터링과 다중 스케줄 관수 기능으로 노동력 절감</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-emerald-600 text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">농업 데이터 연구</h3>
              <p className="text-gray-700">최적의 생육관리모델 개발을 위한 인공지능 데이터 분석연구</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-emerald-600 text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">스마트팜 컨설팅•교육</h3>
              <p className="text-gray-700">스마트농장을 운영하고자 하는 농부 및 지망인을 위한 컨설팅 및 교육</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - 어두운 배경 */}
      <section id="solutions" className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 py-20 px-6 scroll-mt-24">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">우리의 솔루션</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              맘꽃이 제공하는 스마트팜 기술과 서비스를 소개합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(solutions).map(([key, solution]) => (
              <div 
                key={key}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105 select-text"
                onClick={() => setSelectedSolution(key)}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div className="mb-4">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    width={300}
                    height={200}
                    className="rounded-xl w-full h-48 object-cover"
                  />
                </div>
                <div className="text-emerald-300 text-3xl mb-3">{solution.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
                <p className="text-emerald-100 text-sm mb-4">
                  {solution.description}
                </p>
                <div className="text-emerald-300 text-sm font-semibold hover:text-emerald-200 transition-colors">
                  자세히 보기 →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedSolution(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-2xl">
              <button
                onClick={() => setSelectedSolution(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
              >
                ×
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{solutions[selectedSolution as keyof typeof solutions].icon}</div>
                <div>
                  <h2 className="text-3xl font-bold">{solutions[selectedSolution as keyof typeof solutions].title}</h2>
                  <p className="text-emerald-100 mt-2">{solutions[selectedSolution as keyof typeof solutions].description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <Image
                  src={solutions[selectedSolution as keyof typeof solutions].image}
                  alt={solutions[selectedSolution as keyof typeof solutions].title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* 주요 기능 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-emerald-600 mr-2">⚡</span>
                    주요 기능
                  </h3>
                  <ul className="space-y-2">
                    {solutions[selectedSolution as keyof typeof solutions].details.features.map((feature, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="text-emerald-600 mr-2 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 효과 및 장점 */}
                <div className="bg-emerald-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-emerald-600 mr-2">🎯</span>
                    효과 및 장점
                  </h3>
                  <ul className="space-y-2">
                    {solutions[selectedSolution as keyof typeof solutions].details.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="text-emerald-600 mr-2 mt-1">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 기술 사양 */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-blue-600 mr-2">📋</span>
                    기술 사양
                  </h3>
                  <ul className="space-y-2">
                    {solutions[selectedSolution as keyof typeof solutions].details.specifications.map((spec, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">▸</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setSelectedSolution(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 text-center select-text"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Awards Section - 밝은 배경 */}
      <section id="awards" className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50 py-20 px-6 scroll-mt-24">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">수상 / 인증</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              정부부처 수상과 특허인증 내역입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/assets/img/award/certificate1.png"
                alt="복합제어 스마트팜 시스템 특허증"
                width={300}
                height={400}
                className="rounded-xl w-full h-auto mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">복합제어 스마트팜 시스템</h3>
              <p className="text-gray-700 text-sm">특허 등록</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/assets/img/award/certificate2.png"
                alt="고설재배용 포트 특허증"
                width={300}
                height={400}
                className="rounded-xl w-full h-auto mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">고설재배용 포트</h3>
              <p className="text-gray-700 text-sm">특허 등록</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/assets/img/award/certificate3.png"
                alt="고설재배배드 시스템 특허증"
                width={300}
                height={400}
                className="rounded-xl w-full h-auto mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">고설재배배드 시스템</h3>
              <p className="text-gray-700 text-sm">특허 등록</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/assets/img/award/ISO_certification.png"
                alt="ISO인증"
                width={300}
                height={400}
                className="rounded-xl w-full h-auto mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">ISO-9001 인증획득</h3>
              <p className="text-gray-700 text-sm">ISO 인증</p>
            </div>
          </div>

          <div className="mt-12 text-center flex space-x-4 justify-center">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg inline-block">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆 조달청장 상 수상</h3>
              <p className="text-gray-700 text-lg">
                <strong>2025년 1월 </strong>
                <br />
                2024년 하반기 우수조달업체 <br />조달청장 상 수상
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg inline-block">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆우수제품선정</h3>
              <p className="text-gray-700 text-lg">
                <strong>2025년 7월 23일</strong>
                <br />
                조달청 우수조달물품 지정
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg inline-block">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆 최우수상 수상</h3>
              <p className="text-gray-700 text-lg">
                <strong>2025년 7월 25일</strong>
                <br />
                농촌진흥청 AI 현장활용 경진대회 <br />최우수상 수상 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Farm Section - 어두운 배경 */}
      <section id="demo-farm" className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 py-20 px-6 scroll-mt-24">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">실증 농장</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              맘꽃 실증 농장은 제주 김녕에 위치한 스마트팜 기술 테스트베드로, 작물 재배와 기술 검증을 동시에 수행합니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">🌱 작물 재배</h3>
                <p className="text-emerald-100">
                  상추, 깻잎, 쑥갓 등 엽채류를 고설 베드로 성공적으로 재배 중입니다. 
                  데이터 기반 농업으로 수확량과 품질이 꾸준히 향상되고 있습니다.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">🏫 기관 방문</h3>
                <p className="text-emerald-100">
                  대학, 농업기술원, 농민회 등 다양한 기관이 방문하여 기술 교류를 진행합니다.
                  2025년 2월에만 3개 기관의 방문이 있었으며, 스마트팜 기술에 대한 높은 관심을 확인했습니다.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">🎓 교육 및 체험</h3>
                <p className="text-emerald-100">
                  청소년 및 신규 농업인을 위한 체험 구역을 운영하며 농업 교육에 기여합니다.
                  직접 보고 만지고 조작할 수 있는 기회를 제공하여 스마트팜에 대한 이해를 돕습니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/assets/img/farm/company_farm_top.jpeg"
                alt="실증 농장 전경"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover"
              />
              <Image
                src="/assets/img/farm/company_farm5.jpeg"
                alt="작물 재배 현황"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover"
              />
              <Image
                src="/assets/img/farm/company_farm.jpg"
                alt="스마트팜 시설"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover"
              />
              <Image
                src="/assets/img/farm/company_farm2.jpg"
                alt="농작물 관리"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Recent Posts Section - 밝은 배경 */}
      <section id="recent-posts" className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50 py-20 px-6 scroll-mt-24">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">최신 소식</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              맘꽃의 최근 활동과 성과를 소개합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link 
              href="https://naver.me/5asIQeT2" 
              target="_blank"
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 block group"
            >
              <Image
                src="/assets/img/award/조달청_우수제품선정.png"
                alt="조달청 우수제품선정"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-emerald-600 text-sm mb-2">수상 소식</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">맘꽃 스마트팜 시스템, 조달청 우수 조달물품 선정</h3>
              <p className="text-gray-700 text-sm">2025.07.23</p>
            </Link>

            <Link 
              href="https://blog.naver.com/mfgarden/223789667277" 
              target="_blank"
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 block group"
            >
              <Image
                src="/assets/img/blog/blog1.jpg"
                alt="KT 협업"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-emerald-600 text-sm mb-2">협업 소식</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">KT와 협업으로 농가 인터넷 설치 지원</h3>
              <p className="text-gray-700 text-sm">2025.03.07</p>
            </Link>

            <Link 
              href="https://blog.naver.com/mfgarden/223749385443" 
              target="_blank"
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 block group"
            >
              <Image
                src="/assets/img/blog/blog2.png"
                alt="아라 플랫폼"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-emerald-600 text-sm mb-2">인증/선정</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">아라 플랫폼 현장 실증 기업 선정</h3>
              <p className="text-gray-700 text-sm">2025.02.04</p>
            </Link>

            <Link 
              href="https://blog.naver.com/mfgarden/223726800512" 
              target="_blank"
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 block group"
            >
              <Image
                src="/assets/img/blog/blog3.jpg"
                alt="수상 소식"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-emerald-600 text-sm mb-2">수상</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">조달청장 상 수상</h3>
              <p className="text-gray-700 text-sm">2025.01.15</p>
            </Link>

            <Link 
              href="https://blog.naver.com/mfgarden/223700912564" 
              target="_blank"
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 block group"
            >
              <Image
                src="/assets/img/blog/blog4.jpg"
                alt="웹 컨퍼런스"
                width={300}
                height={200}
                className="rounded-xl w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-emerald-600 text-sm mb-2">행사</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">제주 웹 컨퍼런스 강의</h3>
              <p className="text-gray-700 text-sm">2024.12.20</p>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="https://blog.naver.com/mfgarden"
              target="_blank"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              더 많은 소식 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section - 어두운 배경 */}
      <section id="gallery" className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 py-20 px-6 scroll-mt-24">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">갤러리</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              맘꽃의 다양한 활동과 <strong>스마트팜 현장 모습</strong>을 사진으로 만나보세요.
            </p>
            <div className="flex justify-center space-x-8 mt-8">
              {/* <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">500+</div>
                <div className="text-sm text-emerald-100">활동 사진</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">50+</div>
                <div className="text-sm text-emerald-100">현장 방문</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">20+</div>
                <div className="text-sm text-emerald-100">교육 및 특강</div>
              </div> */}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/img/portfolio/설치1.jpg"
                  alt="아라플랫폼 현장 실증"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <div className="text-emerald-300 text-xs font-semibold mb-1">2025.02.04</div>
                <h3 className="text-sm font-bold text-white">아라플랫폼 현장 실증 기업 선정</h3>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/img/portfolio/설치2.jpg"
                  alt="KT 협업 인터넷 설치"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <div className="text-emerald-300 text-xs font-semibold mb-1">2025.03.07</div>
                <h3 className="text-sm font-bold text-white">KT 협업 농가 인터넷 설치</h3>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/img/portfolio/설치3.jpg"
                  alt="ICT융합품질 인증"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <div className="text-emerald-300 text-xs font-semibold mb-1">2024.09.11</div>
                <h3 className="text-sm font-bold text-white">ICT융합품질 인증 심사</h3>
              </div>
            </div>

            {/* <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/img/portfolio/research_group.jpg"
                  alt="청양 가변형 입식베드 설치"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <div className="text-emerald-300 text-xs font-semibold mb-1">2023.03.04</div>
                <h3 className="text-sm font-bold text-white">충남 청양 가변형 입식베드 설치</h3>
              </div>
            </div> */}

            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/img/portfolio/research_group2.jpg"
                  alt="스마트팜 전문가 교육"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <div className="text-emerald-300 text-xs font-semibold mb-1">2023.03.08</div>
                <h3 className="text-sm font-bold text-white">스마트팜 전문가 교육 기자재 납품</h3>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/img/portfolio/research_group3.jpg"
                  alt="농촌진흥청 축산과학원 특강"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <div className="text-emerald-300 text-xs font-semibold mb-1">2024.09.23</div>
                <h3 className="text-sm font-bold text-white">농촌진흥청 축산과학원 특강</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Final Contact Section - 밝은 배경 */}
<section 
  id="contact" 
  className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50 py-20 px-6 scroll-mt-24"
  data-aos="fade-up"
>
  <div className="relative z-10 max-w-7xl mx-auto">
    <div 
      className="text-center mb-16"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">찾아오시는 길</h2>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto">
        스마트팜 설치 문의, 협업 제안 등 언제든 연락 주세요.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12">
      {/* Google Maps */}
      <div 
        className="bg-white/80 backdrop-blur-md rounded-2xl p-2 border border-gray-200 shadow-lg"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d642.410759272566!2d126.5222!3d33.51115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzQwLjEiTiAxMjbCsDMxJzE5LjkiRQ!5e0!3m2!1sko!2skr!4v1740243380703!5m2!1sko!2skr"
          width="100%" 
          height="450" 
          style={{ border: 0, borderRadius: '1rem' }}
          allowFullScreen
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          suppressHydrationWarning
        />
      </div>

      {/* 연락처 정보 */}
      <div 
        className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">연락처 안내</h3>
        <p className="text-gray-700 mb-8">
          스마트팜 구축 및 컨설팅에 관한 문의사항이 있으시면 아래 연락처로 연락 주시기 바랍니다.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <span className="text-emerald-600 text-xl">📍</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">주소</h4>
              <div className="relative group">
                <p className="text-gray-700 leading-relaxed select-text cursor-text">
                  본사 : [63169] 제주특별자치도 제주시 중앙로14길 21<br />
                  (제주대학교 창업보육센터) 402호<br />
                  공장 사무실: [63148] 제주특별자치도 제주시 연삼로 165 2층 
                </p>
                {isClient && (
                  <button
                    onClick={(e) => copyToClipboard('제주특별자치도 제주시 중앙로14길 21 (제주대학교 창업보육센터) 402호', '주소', e)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard('제주특별자치도 제주시 중앙로14길 21 (제주대학교 창업보육센터) 402호', '주소', e);
                    }}
                    className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded text-xs touch-manipulation"
                    title="주소 복사"
                    style={{ touchAction: 'manipulation' }}
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <span className="text-emerald-600 text-xl">✉️</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">이메일</h4>
              <div className="relative group">
                <p className="text-gray-700 select-text cursor-text">mfgarden@naver.com</p>
                {isClient && (
                  <button
                    onClick={(e) => copyToClipboard('mfgarden@naver.com', '이메일', e)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard('mfgarden@naver.com', '이메일', e);
                    }}
                    className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded text-xs touch-manipulation"
                    title="이메일 복사"
                    style={{ touchAction: 'manipulation' }}
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <span className="text-emerald-600 text-xl">📞</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">전화번호</h4>
              <div className="relative group">
                <p className="text-gray-700 select-text cursor-text">070-8860-2966</p>
                {isClient && (
                  <button
                    onClick={(e) => copyToClipboard('070-8860-2966', '전화번호', e)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard('070-8860-2966', '전화번호', e);
                    }}
                    className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded text-xs touch-manipulation"
                    title="전화번호 복사"
                    style={{ touchAction: 'manipulation' }}
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 교통 안내 */}
        <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
          <h4 className="font-semibold text-emerald-800 mb-3">🚗 교통 안내</h4>
          <div className="text-sm text-emerald-700 space-y-2">
            <p><strong>버스:</strong> 관덕정(남) 정류장 하차 후 도보 5분</p>
            <p><strong>자가용:</strong> 제주대학교 창업보육센터 주차장 이용</p>
            <p><strong>방문 시:</strong> 사전 연락 후 방문해 주시기 바랍니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-emerald-100 mb-4">
            © Copyright <strong>맘꽃</strong>주식회사. All Rights Reserved
          </div>
          <div className="text-emerald-200 text-sm select-text">
            주소: 제주특별자치도 제주시 중앙로14길 21 (제주대학교 창업보육센터) 403호 | 우편번호: 63169 | 이메일: mfgarden@naver.com | 전화: 070-8860-2966
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {isClient && showScrollToTop && (
        <button
          onClick={scrollToTop}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.9)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          className="scroll-to-top fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 select-text"
          style={{
            animation: 'fadeInUp 0.3s ease-out'
          }}
          aria-label="맨위로 이동"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}

    </div>
  )
}
