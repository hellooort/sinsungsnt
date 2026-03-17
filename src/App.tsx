import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Ruler, Wrench, Sparkles, ShieldCheck, Layers, MessageSquare, ClipboardList, FileSearch, Lightbulb, Hammer, Truck, HeartHandshake } from 'lucide-react';

const LogoIcon = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`fill-none stroke-current stroke-[6] stroke-linecap-round stroke-linejoin-round ${className}`}>
    <circle cx="50" cy="50" r="42" />
    {/* Top left dot */}
    <circle cx="35" cy="25" r="3.5" className="fill-current stroke-none" />
    {/* Top left vertical dash */}
    <line x1="38" y1="35" x2="41" y2="48" />
    {/* Middle vertical dash */}
    <line x1="43" y1="55" x2="46" y2="70" />
    {/* Left middle dot */}
    <circle cx="25" cy="55" r="3.5" className="fill-current stroke-none" />
    {/* Left diagonal dash */}
    <line x1="30" y1="62" x2="40" y2="70" />
    {/* Bottom left horizontal dash */}
    <line x1="28" y1="78" x2="38" y2="78" />
    {/* Right long diagonal line */}
    <line x1="48" y1="75" x2="75" y2="40" />
  </svg>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: '회사소개', id: 'about' },
    { name: '핵심기술', id: 'tech' },
    { name: '제작분야', id: 'services' },
    { name: '포트폴리오', id: 'portfolio' },
    { name: '진행프로세스', id: 'process' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-600 font-sans selection:bg-brand selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`text-2xl font-bold tracking-tighter cursor-pointer flex items-center gap-2 transition-colors ${isScrolled ? 'text-brand' : 'text-white'}`} onClick={() => scrollTo('hero')}>
            <LogoIcon className="w-8 h-8" />
            신성에스엔티
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollTo(link.id)} className={`text-sm font-medium transition-colors ${isScrolled ? 'text-slate-600 hover:text-brand' : 'text-white/80 hover:text-white'}`}>
                {link.name}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className={`px-5 py-2.5 text-sm font-semibold rounded-none transition-colors ${isScrolled ? 'bg-brand text-white hover:bg-brand-dark' : 'bg-white text-brand hover:bg-slate-100'}`}>
              문의하기
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 border-b border-slate-200 shadow-lg h-fit pb-8">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollTo(link.id)} className="text-xl font-medium text-left text-slate-900">
                {link.name}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="w-full py-4 mt-4 bg-brand text-white text-lg font-semibold rounded-none">
              문의하기
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=2070&auto=format&fit=crop" 
            alt="Metal Texture" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-brand-dark/80 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-6">
              공간을 빛내는 <br className="md:hidden" />
              <span className="text-brand-light">금속의 품격</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              백화점, 면세점, 브랜드 매장에 필요한 고급 금속 집기와 금속 인테리어를<br className="hidden md:block" /> 정밀한 제작력과 책임 시공으로 완성합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo('contact')} className="w-full sm:w-auto px-8 py-4 bg-brand text-white font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
                제작 문의하기 <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollTo('portfolio')} className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-colors">
                포트폴리오 보기
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
                도면을 이해하고,<br />구조를 해결하고,<br />완성도 높은 <span className="text-brand">금속 결과물</span>로 답합니다
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                신성에스엔티는 금속 집기, 금속 인테리어, 주문제작 가구, 스테인리스 및 철 구조물 제작을 전문으로 하는 금속 제작 기업입니다.<br /><br />
                백화점, 면세점, 브랜드 매장 등 높은 완성도가 요구되는 프로젝트를 중심으로, 도면 해석부터 제작, 마감, 현장 설치까지 책임감 있게 수행하고 있습니다.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                '금속 집기 제작', '매장 집기 주문제작', '백화점 / 면세점 시공', '금속 인테리어',
                '스테인리스 / 철 제작', '용접 / 폴리싱 / 절곡', '도면 기반 맞춤 제작', '현장 맞춤 시공'
              ].map((keyword, idx) => (
                <div key={idx} className="p-4 border border-slate-200 bg-slate-50 text-sm md:text-base text-slate-700 flex items-center gap-3 hover:border-brand hover:text-brand transition-colors group">
                  <CheckCircle2 size={18} className="text-brand shrink-0" />
                  <span className="font-medium">{keyword}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competitiveness Section */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">신성에스엔티가 다른 이유</h2>
            <p className="text-xl text-brand font-medium">0.1mm의 디테일이 공간의 품격을 결정합니다.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Ruler size={28} />,
                title: "0.1mm 단위의 정밀 제작",
                desc: "단순 제작이 아니라 브랜드 공간에 맞는 정밀한 치수와 라인을 구현합니다."
              },
              {
                icon: <Layers size={28} />,
                title: "도면의 한계를 해결하는 재설계",
                desc: "물리적으로 어려운 구조도 비주얼은 유지하고 제작 방식은 재해석하여 해결합니다."
              },
              {
                icon: <Sparkles size={28} />,
                title: "용접 흔적이 없는 고급 마감",
                desc: "용접, 폴리싱, 발색, 헤어라인 등 디테일이 결과물의 품격을 결정합니다."
              },
              {
                icon: <ShieldCheck size={28} />,
                title: "브랜드 공간 경험 기반 제작",
                desc: "백화점, 면세점, 하이엔드 브랜드 집기 경험을 바탕으로 공간의 수준에 맞는 결과물을 만듭니다."
              },
              {
                icon: <Wrench size={28} />,
                title: "제작부터 설치까지 책임 대응",
                desc: "제작만 끝내는 것이 아니라 운반, 설치성, 유지보수성까지 고려해 완성합니다."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 border border-slate-200 bg-white hover:border-brand hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 bg-brand/10 flex items-center justify-center text-brand mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">제작 분야</h2>
            <p className="text-xl text-brand font-medium">도면 기반의 모든 금속 맞춤 제작을 수행합니다.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                title: "금속 집기 제작",
                items: ["브랜드 진열장", "곤도라", "POS", "싱글타워", "듀얼타워", "벽장", "캐노피", "분리대", "창고장"]
              },
              {
                title: "금속 인테리어",
                items: ["매장 금속 마감", "벽체 금속 구조물", "브랜드 쇼케이스", "금속 포인트 오브제", "공간 맞춤 금속 요소"]
              },
              {
                title: "주문제작 가구",
                items: ["매장 가구", "진열 가구", "스테인리스 가구", "금속 프레임 가구", "맞춤형 구조물"]
              },
              {
                title: "특수 주문제작",
                items: ["도면 기반 제작", "라운딩 구조물", "정밀 절곡 / 타공", "헤어라인 / 폴리싱 마감", "하이엔드 브랜드 집기"]
              }
            ].map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border-t-2 border-slate-200 pt-8"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-8">{category.title}</h3>
                <ul className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-slate-600 text-base flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">프로젝트 사례</h2>
              <p className="text-xl text-brand font-medium">하이엔드 브랜드의 까다로운 기준을 충족시킨 결과물입니다.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { brand: "SHISEIDO", name: "신라면세 매장 곤도라", tags: "#스테인리스 #금속진열장 #곤도라 #주문제작", img: "/portfolio/shiseido-gondola.jpg" },
              { brand: "SHISEIDO", name: "신라면세 매장 벽장캐노피/재료분리대", tags: "#스테인리스 #금속진열장 #큰 벽장 #주문제작", img: "/portfolio/shiseido-canopy.jpg" },
              { brand: "CLE DE PEAU BEAUTE", name: "서울신라면세 매장 곤도라", tags: "#스테인리스 #금속진열장 #곤도라 #주문제작", img: "/portfolio/cle-de-peau-gondola.jpg" },
              { brand: "ANESSA", name: "아넷사 싱글타워", tags: "#스테인리스 #금속진열장 #아넷사 #주문제작", img: "/portfolio/anessa-tower.jpg" },
              { brand: "CLE DE PEAU BEAUTE", name: "서울신라면세 매장 벽장", tags: "#스테인리스 #금속진열장 #벽장 #주문제작", img: "/portfolio/cle-de-peau-wall.jpg" },
              { brand: "SHISEIDO", name: "신라면세 매장 LX WALL", tags: "#스테인리스 #금속진열장 #LX WALL #주문제작", img: "/portfolio/shiseido-lx-wall.jpg" },
              { brand: "CLE DE PEAU BEAUTE", name: "서울신라면세 매장 POS", tags: "#스테인리스 #금속진열장 #POS #주문제작", img: "/portfolio/cle-de-peau-pos.jpg" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group relative overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  {/* Fallback overlay in case image is missing */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 -z-10">
                    <span className="text-slate-400 text-sm">이미지를 업로드해주세요</span>
                  </div>
                </div>
                <div className="p-6 relative z-10 bg-white border-t border-slate-100 flex-1 flex flex-col">
                  <div className="text-xs font-bold tracking-widest text-brand mb-2">{item.brand}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium mt-auto">{item.tags}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">신성이 만드는 디테일의 차이</h2>
            <p className="text-xl text-brand font-medium">단순한 공정 나열이 아닌, 결과물의 품격을 높이는 기술력입니다.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "정밀 용접", desc: "이음새가 드러나지 않는 매끄러운 완성도" },
              { title: "폴리싱 / 헤어라인", desc: "금속 표면의 질감을 살리는 고급 마감" },
              { title: "구조 재설계", desc: "도면상 구현이 어려운 부분도 실현 가능한 방식으로 보완" },
              { title: "레이저 절단 / 절곡", desc: "오차 없는 정교한 형태 구현" },
              { title: "발색", desc: "브랜드 아이덴티티에 맞는 정확한 컬러 표현" },
              { title: "조립 구조 설계", desc: "유지보수와 현장 설치를 고려한 스마트한 구조" }
            ].map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 bg-slate-50 border border-slate-200 hover:bg-white hover:border-brand hover:shadow-md transition-all rounded-2xl"
              >
                <h4 className="text-xl font-bold text-slate-900 mb-3">{tech.title}</h4>
                <p className="text-slate-600 text-base">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (Journey) */}
      <section id="process" className="py-24 md:py-32 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">제작 진행 프로세스</h2>
            <p className="text-xl text-brand font-medium">문의부터 사후 관리까지, 완벽한 결과물을 위한 여정입니다.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-8 md:left-1/2 top-8 bottom-8 w-1 bg-brand/20 -translate-x-1/2 rounded-full"></div>

            <div className="space-y-12 md:space-y-24">
              {[
                { title: "문의 접수", desc: "프로젝트 개요 및 일정, 예산 등 기초적인 내용을 접수합니다.", icon: <MessageSquare size={24} /> },
                { title: "상담 및 요구사항 확인", desc: "설치 환경, 브랜드 가이드라인, 특별한 요구사항을 상세히 파악합니다.", icon: <ClipboardList size={24} /> },
                { title: "도면 검토 및 구조 협의", desc: "전달받은 도면을 바탕으로 물리적 구현 가능성과 구조적 안정성을 검토합니다.", icon: <FileSearch size={24} /> },
                { title: "소재/마감/제작 방식 제안", desc: "최적의 퀄리티를 위해 적합한 금속 소재와 표면 마감, 조립 방식을 제안합니다.", icon: <Lightbulb size={24} /> },
                { title: "제작 진행", desc: "자체 공장에서 정밀한 절단, 절곡, 용접, 폴리싱 등 본격적인 제작을 진행합니다.", icon: <Hammer size={24} /> },
                { title: "현장 설치 및 마감", desc: "완성된 집기를 현장으로 안전하게 운송하여 오차 없이 설치하고 최종 마감합니다.", icon: <Truck size={24} /> },
                { title: "사후 대응", desc: "설치 후 발생하는 이슈나 추가적인 유지보수 요청에 책임감 있게 대응합니다.", icon: <HeartHandshake size={24} /> }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-white border-4 border-brand rounded-full flex items-center justify-center -translate-x-1/2 z-10 text-brand shadow-lg">
                    {step.icon}
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:border-brand/30 group">
                      <div className="text-sm font-bold text-brand mb-3 tracking-widest">STEP 0{idx + 1}</div>
                      <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand transition-colors">{step.title}</h4>
                      <p className="text-slate-600 leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 md:py-32 bg-brand text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight text-white">
              까다로운 기준을 요구하는 공간에서<br className="hidden md:block" /> 선택받아 왔습니다
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-16">
              신성에스엔티는 단순 납품 업체가 아니라 브랜드의 공간 완성도를 함께 고민하는 금속 제작 파트너입니다.<br />
              정밀함과 마감 퀄리티가 중요한 프로젝트일수록 신성의 기술력이 더욱 빛납니다.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                "백화점 / 면세점 / 브랜드 매장 경험",
                "하이엔드 프로젝트 수행 경험",
                "납기와 품질을 함께 관리하는 제작 체계",
                "세부 구조까지 고려한 시공 대응"
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white shadow-lg">
                  <div className="w-10 h-10 bg-brand text-white flex items-center justify-center mb-6 rounded-none text-lg font-bold">
                    {idx + 1}
                  </div>
                  <p className="font-bold text-slate-900 text-lg leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 md:py-32 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-dark/40 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">금속 집기 제작이 필요하신가요?</h2>
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed">
            도면 검토부터 제작, 시공까지 프로젝트 성격에 맞는 방향으로 상담해드립니다.<br />
            백화점 집기, 브랜드 매장 집기, 주문제작 금속 가구, 금속 인테리어까지 편하게 문의해 주세요.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="tel:031-595-2798" className="px-10 py-5 bg-brand text-white font-bold text-lg hover:bg-brand-light transition-colors flex items-center justify-center gap-3">
              <Phone size={24} /> 전화 문의하기
            </a>
            <button className="px-10 py-5 border border-slate-600 text-white font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
              <Mail size={24} /> 포트폴리오 상담 요청
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="text-3xl font-bold text-white mb-6 tracking-tighter flex items-center gap-3">
                <LogoIcon className="w-8 h-8 text-brand-light" />
                신성에스엔티
              </div>
              <p className="text-slate-400 text-base mb-8 max-w-md leading-relaxed">
                도면을 현실로 구현하는 정밀 금속 제작.<br />
                고급 공간을 위한 주문제작 금속 집기 전문 기업입니다.
              </p>
            </div>
            
            <div className="space-y-4 text-base text-slate-400">
              <div className="flex items-center gap-4">
                <MapPin size={20} className="text-brand-light" />
                <span>경기도 포천시 내촌면 부마로 265번길 58</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-brand-light" />
                <span>031-595-2798</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 flex items-center justify-center text-brand-light">
                  <span className="text-[10px] font-bold border border-brand-light rounded-sm px-0.5">TIME</span>
                </div>
                <span>월~금 08:30~17:30</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} 신성에스엔티. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

