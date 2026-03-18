import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Menu, X, Phone, Mail, MapPin, ArrowRight, CheckCircle2,
  Ruler, Wrench, Sparkles, ShieldCheck, Layers,
  MessageSquare, ClipboardList, FileSearch, Lightbulb,
  Hammer, Truck, HeartHandshake, ChevronDown,
  Clock, Send, ChevronRight, User, Building2, FileText
} from 'lucide-react';

const LogoIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`fill-none stroke-current stroke-[6] stroke-linecap-round stroke-linejoin-round ${className}`}>
    <circle cx="50" cy="50" r="42" />
    <circle cx="35" cy="25" r="3.5" className="fill-current stroke-none" />
    <line x1="38" y1="35" x2="41" y2="48" />
    <line x1="43" y1="55" x2="46" y2="70" />
    <circle cx="25" cy="55" r="3.5" className="fill-current stroke-none" />
    <line x1="30" y1="62" x2="40" y2="70" />
    <line x1="28" y1="78" x2="38" y2="78" />
    <line x1="48" y1="75" x2="75" y2="40" />
  </svg>
);


export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: '회사소개', id: 'about' },
    { name: '제작분야', id: 'services' },
    { name: '핵심역량', id: 'tech' },
    { name: '포트폴리오', id: 'portfolio' },
    { name: '진행프로세스', id: 'process' },
  ];


  const techItems = [
    { icon: <Ruler size={28} />, title: "0.1mm 단위의 정밀 제작", desc: "단순 제작이 아니라 브랜드 공간에 맞는 정밀한 치수와 라인을 구현합니다.", detail: "정밀 용접 · 레이저 절단 · 오차 없는 절곡" },
    { icon: <Layers size={28} />, title: "도면의 한계를 해결하는 재설계", desc: "물리적으로 어려운 구조도 비주얼은 유지하고 제작 방식은 재해석하여 해결합니다.", detail: "구조 분석 · 조립 구조 설계 · 제작 가능성 검토" },
    { icon: <Sparkles size={28} />, title: "용접 흔적이 없는 고급 마감", desc: "용접, 폴리싱, 발색, 헤어라인 등 디테일이 결과물의 품격을 결정합니다.", detail: "폴리싱 · 헤어라인 · 발색 · 특수 마감" },
    { icon: <ShieldCheck size={28} />, title: "브랜드 공간 경험 기반 제작", desc: "백화점, 면세점, 하이엔드 브랜드 집기 경험을 바탕으로 공간의 수준에 맞는 결과물을 만듭니다.", detail: "신라면세 · 백화점 · 글로벌 뷰티 브랜드" },
    { icon: <Wrench size={28} />, title: "제작부터 설치까지 책임 대응", desc: "제작만 끝내는 것이 아니라 운반, 설치성, 유지보수성까지 고려해 완성합니다.", detail: "운송 · 현장 설치 · 사후 유지보수" },
    { icon: <HeartHandshake size={28} />, title: "현장 맞춤 대응력", desc: "제작 도중 발생하는 수정 요청이나 현장 조건 변화에도 유연하게 대응하여 완성도 높은 결과물로 연결합니다.", detail: "현장 변경 대응 · 유연한 공정 관리 · 실시간 소통" },
  ];

  const portfolioItems = [
    { brand: "SHISEIDO", name: "신라면세 매장 곤도라", desc: "시세이도 브랜드 아이덴티티에 맞춘 스테인리스 곤도라. 골드 발색과 정밀 절곡으로 고급스러운 진열 환경 구현.", tags: "#스테인리스 #곤도라 #발색", img: "/portfolio/곤도라.jpg" },
    { brand: "SHISEIDO", name: "신라면세 매장 벽장캐노피/재료분리대", desc: "대형 벽장과 캐노피를 일체형으로 설계·제작. 구조적 안정성과 시각적 통일감을 동시에 확보.", tags: "#벽장 #캐노피 #대형구조물", img: "/portfolio/벽 장캐노피.jpg" },
    { brand: "CLE DE PEAU BEAUTE", name: "서울신라면세 매장 곤도라", desc: "클레드뽀 보떼의 럭셔리 톤에 맞춘 곤도라 제작. 헤어라인 마감과 LED 조명 연동 구조 적용.", tags: "#곤도라 #헤어라인 #럭셔리", img: "/portfolio/신라면세 곤도라.jpg" },
    { brand: "ANESSA", name: "아넷사 싱글타워", desc: "컴팩트한 공간에 최적화된 싱글타워. 브랜드 시그니처 컬러를 정밀 발색으로 완벽 재현.", tags: "#싱글타워 #발색 #컴팩트", img: "/portfolio/싱글타워.jpg" },
    { brand: "CLE DE PEAU BEAUTE", name: "서울신라면세 매장 벽장", desc: "대형 벽면 진열장 전체를 금속으로 마감. 조립 구조 설계로 유지보수와 교체가 용이한 시스템.", tags: "#벽장 #조립구조 #유지보수", img: "/portfolio/벽장.jpg" },
    { brand: "CLE DE PEAU BEAUTE", name: "서울신라면세 매장 POS", desc: "고객 접점의 POS 카운터를 금속으로 제작. 내구성과 브랜드 톤 모두를 충족하는 설계.", tags: "#POS #카운터 #내구성", img: "/portfolio/pos.jpg" },
  ];

  const processSteps = [
    { title: "문의 접수", desc: "프로젝트 개요 및 일정, 예산 등 기초적인 내용을 접수합니다.", icon: <MessageSquare size={24} /> },
    { title: "상담 및 요구사항 확인", desc: "설치 환경, 브랜드 가이드라인, 특별한 요구사항을 상세히 파악합니다.", icon: <ClipboardList size={24} /> },
    { title: "도면 검토 및 구조 협의", desc: "전달받은 도면을 바탕으로 물리적 구현 가능성과 구조적 안정성을 검토합니다.", icon: <FileSearch size={24} /> },
    { title: "소재/마감/제작 방식 제안", desc: "최적의 퀄리티를 위해 적합한 금속 소재와 표면 마감, 조립 방식을 제안합니다.", icon: <Lightbulb size={24} /> },
    { title: "제작 진행", desc: "자체 공장에서 정밀한 절단, 절곡, 용접, 폴리싱 등 본격적인 제작을 진행합니다.", icon: <Hammer size={24} /> },
    { title: "현장 설치 및 마감", desc: "완성된 집기를 현장으로 안전하게 운송하여 오차 없이 설치하고 최종 마감합니다.", icon: <Truck size={24} /> },
    { title: "사후 대응", desc: "설치 후 발생하는 이슈나 추가적인 유지보수 요청에 책임감 있게 대응합니다.", icon: <HeartHandshake size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-600 font-sans selection:bg-brand selection:text-white">
      {/* ─── Navbar ─── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button className={`text-2xl font-bold tracking-tighter flex items-center gap-2 transition-colors ${isScrolled ? 'text-brand' : 'text-white'}`} onClick={() => scrollTo('hero')} aria-label="홈으로 이동">
            <LogoIcon className="w-8 h-8" />
            신성에스엔티
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollTo(link.id)} className={`text-sm font-medium transition-colors ${isScrolled ? 'text-slate-600 hover:text-brand' : 'text-white/80 hover:text-white'}`}>
                {link.name}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className={`px-5 py-2.5 text-sm font-semibold transition-colors ${isScrolled ? 'bg-brand text-white hover:bg-brand-dark' : 'bg-white text-brand hover:bg-slate-100'}`}>
              문의하기
            </button>
          </div>

          <button className={`lg:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white pt-20 px-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col space-y-1 mt-4">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => scrollTo(link.id)}
                className="text-xl font-medium text-left text-slate-900 py-4 border-b border-slate-100"
              >
                {link.name}
              </motion.button>
            ))}
            <button onClick={() => scrollTo('contact')} className="w-full py-4 mt-6 bg-brand text-white text-lg font-semibold">
              문의하기
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background: Logo Intro → Video */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          {/* Logo Intro */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: introDone ? 0 : 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20 bg-slate-900 flex items-center justify-center pointer-events-none"
            style={{ display: introDone ? 'none' : undefined }}
          >
            <motion.img
              src="/portfolio/logo2.png"
              alt="신성에스엔티 로고"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[28rem] md:w-[40rem] max-w-[90vw] brightness-0 invert"
            />
          </motion.div>

          {/* YouTube Video */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: introDone ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 overflow-hidden"
          >
            <iframe
              src="https://www.youtube.com/embed/QfKg5_4c4wc?autoplay=1&mute=1&loop=1&playlist=QfKg5_4c4wc&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1"
              title="신성에스엔티 배경 영상"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] md:w-[180%] md:h-[180%] min-w-full min-h-full pointer-events-none"
              style={{ aspectRatio: '16/9' }}
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          </motion.div>
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20 max-w-4xl mx-auto px-6 md:px-12 w-full text-center -mt-16 md:-mt-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-sm text-brand-light font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-brand-light rounded-full animate-pulse" />
            금속 집기 · 금속 인테리어 전문 제작
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.15] mb-6">
            공간을 빛내는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-blue-300">금속의 품격</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            백화점, 면세점, 브랜드 매장에 필요한 고급 금속 집기와 인테리어를<br className="hidden md:block" /> 정밀한 제작력과 책임 시공으로 완성합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo('contact')} className="w-full sm:w-auto px-8 py-4 bg-brand text-white font-semibold hover:bg-brand-light transition-colors flex items-center justify-center gap-2 group">
              제작 문의하기 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollTo('portfolio')} className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-colors">
              포트폴리오 보기
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-sm font-bold text-brand tracking-widest mb-4">ABOUT US</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
                도면을 이해하고,<br />구조를 해결하고,<br />완성도 높은<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">금속 결과물</span>로 답합니다
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                신성에스엔티는 금속 집기, 금속 인테리어, 주문제작 가구,<br />스테인리스 및 철 구조물 제작을 전문으로 하는 금속 제작 기업입니다.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                백화점, 면세점, 브랜드 매장 등 높은 완성도가 요구되는 프로젝트를 중심으로,<br />도면 해석부터 제작, 마감, 현장 설치까지 책임감 있게 수행하고 있습니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                '금속 집기 제작', '매장 집기 주문제작', '백화점 / 면세점 시공', '금속 인테리어',
                '스테인리스 / 철 제작', '용접 / 폴리싱 / 절곡', '도면 기반 맞춤 제작', '현장 맞춤 시공'
              ].map((keyword, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 border border-slate-200 bg-white text-sm md:text-base text-slate-700 flex items-center gap-3 hover:border-brand hover:bg-brand/5 hover:text-brand transition-all group"
                >
                  <CheckCircle2 size={18} className="text-brand shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{keyword}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      {(() => {
        const serviceCategories = [
          { title: "금속 집기 제작", desc: <>브랜드 매장의 핵심 진열 집기를 정밀하게 제작합니다.<br />백화점, 면세점 등 하이엔드 공간에 최적화된 구조와 마감을 제공합니다.</>, items: ["브랜드 진열장", "곤도라", "POS", "싱글타워", "듀얼타워", "벽장", "캐노피", "분리대", "창고장"] },
          { title: "금속 인테리어", desc: <>공간의 품격을 높이는 금속 인테리어 요소를 제작합니다.<br />매장 벽면, 천장, 포인트 구조물까지 금속으로 완성하는 고급 마감입니다.</>, items: ["매장 금속 마감", "벽체 금속 구조물", "브랜드 쇼케이스", "금속 포인트 오브제", "공간 맞춤 금속 요소"] },
          { title: "주문제작 가구", desc: <>용도와 공간에 최적화된 금속 가구를 맞춤 제작합니다.<br />매장 환경에 맞는 내구성과 디자인을 동시에 만족시킵니다.</>, items: ["매장 가구", "진열 가구", "스테인리스 가구", "금속 프레임 가구", "맞춤형 구조물"] },
          { title: "특수 주문제작", desc: <>일반 제작으로 불가능한 고난도 금속 구조물을 실현합니다.<br />복잡한 곡면, 정밀 타공, 특수 마감까지 도면 기반으로 해결합니다.</>, items: ["도면 기반 제작", "라운딩 구조물", "정밀 절곡 / 타공", "헤어라인 / 폴리싱 마감", "하이엔드 브랜드 집기"] },
        ];
        const active = serviceCategories[activeServiceTab];
        return (
          <section id="services" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-light/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 md:mb-16 text-center"
              >
                <div className="text-sm font-bold text-brand-light tracking-widest mb-4">SERVICES</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">제작 분야</h2>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">도면 기반의 모든 금속 맞춤 제작을 수행합니다.</p>
              </motion.div>

              <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
                {/* Tab Buttons */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {serviceCategories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveServiceTab(idx)}
                      className={`flex items-center gap-3 px-4 py-3 lg:px-5 lg:py-5 text-left transition-all ${
                        activeServiceTab === idx
                          ? 'bg-brand text-white shadow-lg shadow-brand/20'
                          : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                      }`}
                    >
                      <span className={`text-lg lg:text-2xl font-bold ${activeServiceTab === idx ? 'text-white/40' : 'text-slate-600'}`}>0{idx + 1}</span>
                      <span className="font-bold text-xs lg:text-base">{cat.title}</span>
                      <ChevronRight size={16} className={`ml-auto hidden lg:block ${activeServiceTab === idx ? 'text-white/60' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="bg-slate-800/50 border border-slate-700/50 p-8 md:p-10 relative overflow-hidden flex items-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-light" />
                  <div className="absolute top-6 right-8 text-8xl font-bold text-white/[0.03] select-none leading-none">
                    0{activeServiceTab + 1}
                  </div>

                  <div className="relative">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{active.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">{active.desc}</p>

                    <div className="flex flex-wrap gap-3">
                      {active.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 text-slate-200 text-sm font-medium hover:bg-brand/20 hover:border-brand/40 hover:text-white transition-all cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ═══════════════════ TECH / COMPETITIVENESS ═══════════════════ */}
      <section id="tech" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="text-center mb-16 md:mb-24">
            <div className="text-sm font-bold text-brand tracking-widest mb-4">CORE COMPETENCY</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">신성이 만드는 디테일의 차이</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">0.1mm의 디테일이 공간의 품격을 결정합니다.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techItems.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 border border-slate-200 bg-white hover:border-brand/50 hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-light scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="w-14 h-14 bg-brand/10 flex items-center justify-center text-brand mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{feature.desc}</p>
                <div className="text-xs text-brand/70 font-medium tracking-wide border-t border-slate-100 pt-4">{feature.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PORTFOLIO ═══════════════════ */}
      <section id="portfolio" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(0,82,164,0.15),_transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
            <div>
              <div className="text-sm font-bold text-brand-light tracking-widest mb-4">PORTFOLIO</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">프로젝트 사례</h2>
              <p className="text-lg text-slate-400">하이엔드 브랜드의 까다로운 기준을 충족시킨 결과물입니다.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group relative overflow-hidden bg-slate-800 border border-slate-700/50 hover:border-brand/50 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-800 relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Fallback */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800 -z-10">
                    <span className="text-slate-600 text-sm">이미지 준비 중</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold tracking-widest text-brand-light mb-2">{item.brand}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-light transition-colors">{item.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{item.tags}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section id="process" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-sm font-bold text-brand tracking-widest mb-4">PROCESS</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">제작 진행 프로세스</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">문의부터 사후 관리까지, 완벽한 결과물을 위한 7단계.</p>
          </div>

          {/* Desktop: Horizontal Steps */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <div className="relative max-w-5xl mx-auto mb-8">
              <div className="absolute top-6 left-[calc(100%/14)] right-[calc(100%/14)] h-px bg-brand/20" />
              <div className="grid grid-cols-7 gap-4">
                {processSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 bg-white border-2 border-brand rounded-full flex items-center justify-center text-brand mb-4 relative z-10 group-hover:bg-brand group-hover:text-white transition-colors shadow-sm">
                      {step.icon}
                    </div>
                    <div className="text-[10px] font-bold text-brand/60 tracking-widest mb-2">STEP {idx + 1}</div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors leading-tight">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Compact vertical list */}
          <div className="lg:hidden space-y-3">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-start gap-4 p-4 bg-white border border-slate-200 hover:border-brand/30 transition-all group"
              >
                <div className="w-10 h-10 bg-brand/10 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-brand/60 tracking-widest">STEP {idx + 1}</span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">{step.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST ═══════════════════ */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-brand-dark via-brand to-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M0 0l80 80M80 0L0 80'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              까다로운 기준을 요구하는 공간에서<br className="hidden md:block" /> 선택받아 왔습니다
            </h2>
            <p className="text-lg text-blue-100/80 max-w-3xl mx-auto leading-relaxed mb-16">
              신성에스엔티는 단순 납품 업체가 아니라 브랜드의 공간 완성도를 함께 고민하는 금속 제작 파트너입니다.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {[
                { num: "01", text: "백화점 · 면세점 · 브랜드 매장 경험" },
                { num: "02", text: "하이엔드 프로젝트 수행 경험" },
                { num: "03", text: "납기와 품질을 함께 관리하는 제작 체계" },
                { num: "04", text: "세부 구조까지 고려한 시공 대응" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <div className="text-3xl font-bold text-white/30 mb-4">{item.num}</div>
                  <p className="font-bold text-white text-base leading-snug">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CTA / CONTACT ═══════════════════ */}
      <section id="contact" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-brand-light tracking-widest mb-6">CONTACT</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">금속 집기 제작이 필요하신가요?</h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              도면 검토부터 제작, 시공까지 프로젝트 성격에 맞는 방향으로 상담해드립니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4">
              <a href="tel:031-595-2798" className="p-6 bg-white/5 border border-white/10 hover:bg-brand hover:border-brand transition-all group flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/20 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone size={24} className="text-brand-light group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">전화 문의</span>
                  <span className="text-slate-400 text-sm group-hover:text-white/80 transition-colors">031-595-2798</span>
                </div>
              </a>
              <a href="mailto:sample@naver.com" className="p-6 bg-white/5 border border-white/10 hover:bg-brand hover:border-brand transition-all group flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/20 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <Mail size={24} className="text-brand-light group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">이메일 문의</span>
                  <span className="text-slate-400 text-sm group-hover:text-white/80 transition-colors">sample@naver.com</span>
                </div>
              </a>
              <div className="p-6 bg-white/5 border border-white/10 flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/20 flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-brand-light" />
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">방문 / 공장</span>
                  <span className="text-slate-400 text-sm">경기도 남양주시 경춘로611번길 11-38(일패동)</span>
                </div>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/20 flex items-center justify-center shrink-0">
                  <Clock size={24} className="text-brand-light" />
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">영업시간</span>
                  <span className="text-slate-400 text-sm">평일 08:30~17:30 · 토/일/공휴일 휴무</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const subject = encodeURIComponent(`[신성에스엔티 문의] ${data.get('company')} - ${data.get('name')}`);
                const body = encodeURIComponent(
                  `회사명: ${data.get('company')}\n담당자: ${data.get('name')}\n연락처: ${data.get('phone')}\n이메일: ${data.get('email')}\n\n문의 내용:\n${data.get('message')}`
                );
                window.location.href = `mailto:sample@naver.com?subject=${subject}&body=${body}`;
              }}
              className="bg-white/5 border border-white/10 p-8 md:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block font-medium">회사명 / 브랜드명</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input name="company" type="text" placeholder="예: ○○백화점" className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block font-medium">담당자명</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input name="name" type="text" placeholder="홍길동" className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors" required />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block font-medium">연락처</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input name="phone" type="tel" placeholder="010-0000-0000" className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block font-medium">이메일</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input name="email" type="email" placeholder="example@email.com" className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block font-medium">문의 내용</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-4 text-slate-500" />
                  <textarea name="message" rows={5} placeholder="프로젝트 개요, 원하시는 제작물, 일정 등을 자유롭게 적어주세요." className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors resize-none" required />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-brand text-white font-bold text-base hover:bg-brand-light transition-colors flex items-center justify-center gap-2 group">
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                문의하기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-slate-950 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
              <div className="text-2xl font-bold text-white mb-4 tracking-tighter flex items-center gap-3">
                <LogoIcon className="w-7 h-7 text-brand-light" />
                신성에스엔티
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                도면을 현실로 구현하는 정밀 금속 제작.<br />
                고급 공간을 위한 주문제작 금속 집기 전문 기업입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-400">
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 tracking-widest mb-4">연락처</div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-brand-light shrink-0" />
                  <span>경기도 남양주시 경춘로611번길 11-38(일패동)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-brand-light shrink-0" />
                  <span>031-595-2798</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-brand-light shrink-0" />
                  <a href="mailto:sample@naver.com" className="hover:text-white transition-colors">sample@naver.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-brand-light shrink-0" />
                  <span>월~금 08:30~17:30</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 tracking-widest mb-4">사업자 정보</div>
                <p>상호: 신성에스엔티</p>
                <p>대표: 서창원</p>
                <p>사업자등록번호: 168-88-00852</p>
                <p>경기도 남양주시 경춘로611번길 11-38(일패동)</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} 신성에스엔티. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
