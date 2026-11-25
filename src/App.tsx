import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Phone, Mail, MapPin, ArrowRight, CheckCircle2,
  Ruler, Wrench, Sparkles, ShieldCheck, Layers,
  MessageSquare, ClipboardList, FileSearch, Lightbulb,
  Hammer, Truck, HeartHandshake, ExternalLink, Play,
  Clock, Send, ChevronRight, ChevronLeft, User, Building2, FileText, ZoomIn
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

/* ─── 회사 정보 (문의하기 · 푸터 · 구조화 데이터와 동일하게 유지) ─── */
const COMPANY = {
  name: '주식회사 신성에스엔티',
  ceo: '서창원',
  bizNo: '168-88-00852',
  tel: '031-595-2798',
  email: 'shinsung0822@daum.net',
  address: '경기도 포천시 내촌면 부마로265번길 58',
};
const TIMECAPSULE_STORE_URL = 'https://smartstore.naver.com/sntg';
const MAP_QUERY = encodeURIComponent(COMPANY.address);
// 좌표: 카카오맵에 등록된 '신성에스엔티' 장소(27125683) 위치. 구글 지도는 도로명 주소를 찾지 못해 좌표로 표시한다.
const MAP_COORD = '37.765403,127.189432';
const NAVER_MAP_URL = `https://map.naver.com/p/search/${MAP_QUERY}`;
const KAKAO_MAP_URL = 'https://place.map.kakao.com/27125683';
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_COORD}&z=16&hl=ko&output=embed`;

/* ─── 메인 슬라이드 (시공 매장 사진) ─── */
const heroSlides = [
  { img: '/images/hero/alaia.jpg', brand: 'ALAIA', alt: '알라이아 롯데 본점 매장 금속 진열 가구 시공 현장' },
  { img: '/images/hero/camper.jpg', brand: 'CAMPER', alt: '캠퍼 매장 진열 집기 시공 현장' },
  { img: '/images/hero/prada.jpg', brand: 'PRADA', alt: '프라다 매장 금속 진열장 시공 현장' },
  { img: '/images/hero/vivienne-westwood.jpg', brand: 'VIVIENNE WESTWOOD', alt: '비비안웨스트우드 매장 집기 시공 현장' },
  { img: '/images/hero/cpb.jpg', brand: 'CPB', alt: '끌레드뽀 보떼 매장 진열 집기 시공 현장' },
  { img: '/images/hero/montblanc.jpg', brand: 'MONTBLANC', alt: '몽블랑 매장 진열장 시공 현장' },
  { img: '/images/hero/miu-miu.jpg', brand: 'MIU MIU', alt: '미우미우 백화점 아트리움 연출 구조물' },
];
const HERO_INTERVAL = 5500;

/* ─── 제작 분야 ─── */
type ServiceMedia = {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  label?: string;
  brand?: string;
  alt: string;
};
type ServiceCategory = {
  title: string;
  desc: ReactNode;
  items: string[];
  layout: 'grid3' | 'feature' | 'grid4';
  media: ServiceMedia[];
  link?: { href: string; label: string };
};

const serviceCategories: ServiceCategory[] = [
  {
    title: "금속 집기 제작",
    desc: <>브랜드 매장의 핵심 진열 집기를 정밀하게 제작합니다.<br className="hidden md:block" /> 백화점, 면세점 등 하이엔드 공간에 최적화된 구조와 마감을 제공합니다.</>,
    items: ["브랜드 진열장", "곤도라", "POS", "싱글타워", "듀얼타워", "벽장", "캐노피"],
    layout: 'grid3',
    media: [
      { type: 'image', src: '/images/services/fixture-showcase-prada.jpg', label: '브랜드 진열장', brand: 'PRADA', alt: '프라다 매장 금속 브랜드 진열장' },
      { type: 'image', src: '/images/services/fixture-gondola-shiseido.jpg', label: '곤도라', brand: 'SHISEIDO 서울신라면세점', alt: '시세이도 서울신라면세점 곤도라 집기' },
      { type: 'image', src: '/images/services/fixture-pos-laura-mercier.jpg', label: 'POS', brand: 'LAURA MERCIER', alt: '로라메르시에 매장 POS 카운터' },
      { type: 'image', src: '/images/services/fixture-dual-tower-anessa.jpg', label: '듀얼타워', brand: 'ANESSA', alt: '아넷사 듀얼타워 진열 집기' },
      { type: 'image', src: '/images/services/fixture-wall-golden-goose.jpg', label: '벽장', brand: 'GOLDEN GOOSE', alt: '골든구스 매장 금속 벽장' },
      { type: 'image', src: '/images/services/fixture-canopy-vidivici.jpg', label: '캐노피', brand: 'VIDIVICI', alt: '비디비치 매장 금속 캐노피' },
    ],
  },
  {
    title: "금속 인테리어",
    desc: <>공간의 품격을 높이는 금속 인테리어 요소를 제작합니다.<br className="hidden md:block" /> 매장 벽면, 천장, 포인트 구조물까지 금속으로 완성하는 고급 마감입니다.</>,
    items: ["매장 금속 마감", "벽체 금속 구조물", "브랜드 쇼케이스", "금속 포인트 오브제", "공간 맞춤 금속 요소"],
    layout: 'feature',
    media: [
      { type: 'image', src: '/images/services/interior-wall-loccitane.jpg', label: '벽체 금속 구조물', brand: "L'OCCITANE 이태원", alt: '록시땅 이태원 매장 외벽 금속 구조물' },
      { type: 'image', src: '/images/services/interior-showcase-vivienne-westwood.jpg', label: '브랜드 쇼케이스', brand: 'VIVIENNE WESTWOOD 신라호텔', alt: '비비안웨스트우드 신라호텔 매장 브랜드 쇼케이스' },
      { type: 'image', src: '/images/services/interior-object-pumeon.jpg', label: '금속 포인트 오브제', brand: '품에온', alt: '품에온 금속 포인트 오브제' },
    ],
  },
  {
    title: "특수 주문제작",
    desc: <>일반 제작으로 불가능한 고난도 금속 구조물을 실현합니다.<br className="hidden md:block" /> 복잡한 곡면, 정밀 타공, 특수 마감까지 도면 기반으로 해결합니다.</>,
    items: ["도면 기반 제작", "라운딩 구조물", "정밀 절곡 / 타공", "헤어라인 / 폴리싱 마감", "하이엔드 브랜드 집기"],
    layout: 'feature',
    media: [
      { type: 'video', src: '/images/services/custom-diptyque-seongsu.mp4', poster: '/images/services/custom-diptyque-seongsu-poster.jpg', label: '팝업 스토어 구조물', brand: 'DIPTYQUE 성수', alt: '딥디크 성수 팝업 스토어 원형 금속 구조물 영상' },
      { type: 'image', src: '/images/services/custom-liquor-cabinet.jpg', label: '양주장', alt: '주문제작 금속 양주장' },
      { type: 'image', src: '/images/services/custom-fleet-runner.jpg', label: '플릿러너', alt: '주문제작 플릿러너 금속 구조물' },
    ],
  },
  {
    title: "타임캡슐",
    desc: <>기념일과 행사의 기록을 오랫동안 보관하는 스테인리스 타임캡슐을 제작합니다.<br className="hidden md:block" /> 로고 각인과 전시용 받침대까지 용도에 맞게 구성해 드립니다.</>,
    items: ["스테인리스 타임캡슐", "로고 · 문구 각인", "전시용 받침대", "유리 케이스"],
    layout: 'grid4',
    media: [
      { type: 'image', src: '/images/services/timecapsule-1.jpg', alt: '유리 케이스와 받침대를 갖춘 스테인리스 타임캡슐' },
      { type: 'image', src: '/images/services/timecapsule-2.jpg', alt: '기념 로고를 각인한 타임캡슐 뚜껑' },
      { type: 'image', src: '/images/services/timecapsule-3.jpg', alt: '출고를 앞둔 스테인리스 타임캡슐' },
      { type: 'image', src: '/images/services/timecapsule-4.jpg', alt: '받침대에 설치한 타임캡슐 여러 대' },
    ],
    link: { href: TIMECAPSULE_STORE_URL, label: '대한타임캡슐 스토어 바로가기' },
  },
];

/* ─── 포트폴리오 ─── */
const portfolioCategories = ['전체', '패션 · 럭셔리', '화장품 · 뷰티', '주류 · 면세', '팝업 · 특수제작'] as const;
type PortfolioCategory = typeof portfolioCategories[number];
type PortfolioItem = { brand: string; site?: string; cat: Exclude<PortfolioCategory, '전체'>; img: string; alt: string };

const portfolioItems: PortfolioItem[] = [
  { brand: 'PRADA', cat: '패션 · 럭셔리', img: '/images/portfolio/prada.jpg', alt: '프라다 매장 금속 집기 시공' },
  { brand: 'NARS', site: '신세계 강남', cat: '화장품 · 뷰티', img: '/images/portfolio/nars-shinsegae-gangnam.jpg', alt: '나스 신세계 강남점 매장 시공' },
  { brand: 'CHIVAS REGAL · ROYAL SALUTE', cat: '주류 · 면세', img: '/images/portfolio/chivas-royal-salute.jpg', alt: '시바스리갈·로얄살루트 면세 매장 진열장' },
  { brand: 'DIPTYQUE', site: '성수 팝업 스토어', cat: '팝업 · 특수제작', img: '/images/portfolio/diptyque-seongsu.jpg', alt: '딥디크 성수 팝업 스토어 금속 구조물' },
  { brand: 'GOLDEN GOOSE', site: '현대 코엑스', cat: '패션 · 럭셔리', img: '/images/portfolio/golden-goose-coex.jpg', alt: '골든구스 현대 코엑스 매장 시공' },
  { brand: 'DECORTE', cat: '화장품 · 뷰티', img: '/images/portfolio/decorte.jpg', alt: '코스메데코르테 매장 금속 진열장' },
  { brand: 'MONTBLANC', cat: '패션 · 럭셔리', img: '/images/portfolio/montblanc-1.jpg', alt: '몽블랑 매장 금속 집기' },
  { brand: "KIEHL'S", cat: '화장품 · 뷰티', img: '/images/portfolio/kiehls.jpg', alt: '키엘 매장 진열 집기' },
  { brand: 'DOLCE&GABBANA', cat: '패션 · 럭셔리', img: '/images/portfolio/dolce-gabbana.jpg', alt: '돌체앤가바나 매장 골드 마감 진열대' },
  { brand: 'CPB', site: '신세계 광주점', cat: '화장품 · 뷰티', img: '/images/portfolio/cpb-shinsegae-gwangju.jpg', alt: '끌레드뽀 보떼 신세계 광주점 매장 시공' },
  { brand: 'ALAIA', site: '롯데 본점', cat: '패션 · 럭셔리', img: '/images/portfolio/alaia-lotte-main.jpg', alt: '알라이아 롯데 본점 매장 시공' },
  { brand: 'COOKIERUN', site: '팝업 스토어', cat: '팝업 · 특수제작', img: '/images/portfolio/cookierun-popup.jpg', alt: '쿠키런 팝업 스토어 구조물' },
  { brand: 'VALENTINO', cat: '화장품 · 뷰티', img: '/images/portfolio/valentino.jpg', alt: '발렌티노 뷰티 매장 시공' },
  { brand: 'HUBLOT', cat: '패션 · 럭셔리', img: '/images/portfolio/hublot.jpg', alt: '위블로 매장 진열장' },
  { brand: 'CREED', cat: '화장품 · 뷰티', img: '/images/portfolio/creed.jpg', alt: '크리드 매장 진열 집기' },
  { brand: 'CHIVAS REGAL', cat: '주류 · 면세', img: '/images/portfolio/chivas.jpg', alt: '시바스리갈 면세 매장 진열장' },
  { brand: 'MIU MIU', cat: '패션 · 럭셔리', img: '/images/portfolio/miu-miu.jpg', alt: '미우미우 백화점 아트리움 연출 구조물' },
  { brand: 'LANCOME', cat: '화장품 · 뷰티', img: '/images/portfolio/lancome.jpg', alt: '랑콤 매장 금속 집기' },
  { brand: 'VIVIENNE WESTWOOD', cat: '패션 · 럭셔리', img: '/images/portfolio/vivienne-westwood.jpg', alt: '비비안웨스트우드 매장 집기' },
  { brand: 'LAURA MERCIER', cat: '화장품 · 뷰티', img: '/images/portfolio/laura-mercier.jpg', alt: '로라메르시에 매장 시공' },
  { brand: 'LIBERTY', site: '롯데 에비뉴엘 잠실', cat: '화장품 · 뷰티', img: '/images/portfolio/liberty-avenuel-jamsil.jpg', alt: '리버티 롯데 에비뉴엘 잠실 매장 진열대' },
  { brand: 'SHISEIDO', cat: '화장품 · 뷰티', img: '/images/portfolio/shiseido.jpg', alt: '시세이도 매장 곤도라' },
  { brand: 'MONTBLANC', cat: '패션 · 럭셔리', img: '/images/portfolio/montblanc-2.jpg', alt: '몽블랑 매장 진열장' },
  { brand: 'VIDIVICI', cat: '화장품 · 뷰티', img: '/images/portfolio/vidivici.jpg', alt: '비디비치 매장 진열 집기' },
  { brand: 'CAMPER', cat: '패션 · 럭셔리', img: '/images/portfolio/camper.jpg', alt: '캠퍼 매장 진열 집기' },
  { brand: 'CHIVAS REGAL', cat: '주류 · 면세', img: '/images/portfolio/chivas-2.jpg', alt: '시바스리갈 진열장' },
  { brand: 'ANESSA', cat: '화장품 · 뷰티', img: '/images/portfolio/anessa.jpg', alt: '아넷사 진열 타워' },
  { brand: 'SKINCEUTICALS', cat: '화장품 · 뷰티', img: '/images/portfolio/skinceuticals.jpg', alt: '스킨수티컬즈 매장 시공' },
  { brand: 'PRIMERA', cat: '화장품 · 뷰티', img: '/images/portfolio/primera.jpg', alt: '프리메라 원형 진열대' },
  { brand: 'SU:M37', cat: '화장품 · 뷰티', img: '/images/portfolio/sum37.jpg', alt: '숨37 매장 시공' },
  { brand: 'SNP', cat: '화장품 · 뷰티', img: '/images/portfolio/snp.jpg', alt: 'SNP 매장 진열 집기' },
];

/* ─── 주요 사업분야 (고객사 제공 문구) ─── */
const businessAreas = [
  {
    title: '패션 · 럭셔리',
    brands: 'DOLCE&GABBANA, HUBLOT, PRADA, VIVIENNE WESTWOOD, STONEHENGE, MIU MIU, ALAIA',
    desc: ['브랜드의 아이덴티티와 디자인 철학을 반영한 맞춤형 금속 가구 및 진열장을 제작합니다.', '섬세한 디테일과 고급 마감으로 브랜드의 품격을 높이는 프리미엄 전시공간을 구현합니다.'],
    img: '/images/portfolio/alaia-lotte-main.jpg', alt: '알라이아 롯데 본점 매장 금속 진열 가구',
  },
  {
    title: '화장품 · 뷰티',
    brands: "LAURA MERCIER, NARS, CREED, CPB, ESTEE LAUDER, SHISEIDO, KIEHL'S, L'OCCITANE, ACQUA DI PARMA, ANESSA",
    desc: ['제품의 특성과 브랜드 이미지를 반영한 맞춤형 금속 진열장과 디스플레이 구조물을 제작합니다.', '감각적인 디자인과 정밀한 가공으로 제품의 매력을 극대화하는 차별화된 전시공간을 연출합니다.'],
    img: '/images/portfolio/cpb-shinsegae-gwangju.jpg', alt: '끌레드뽀 보떼 신세계 광주점 매장 진열 집기',
  },
  {
    title: '주류 · 면세',
    brands: "JACK DANIEL'S, REMY MARTIN, CHIVAS REGAL, ROYAL SALUTE, HENNESSY",
    desc: ['브랜드 고유의 가치를 반영한 맞춤형 금속 진열장과 디스플레이 구조물을 제작합니다.', '정밀한 가공과 고급 마감으로 프리미엄 전시공간을 구현합니다.'],
    img: '/images/portfolio/chivas.jpg', alt: '시바스리갈·로얄살루트 면세 매장 진열장',
  },
  {
    title: '팝업 · 특수제작',
    brands: 'DIPTYQUE SEONGSU, HERMES SHINSEGAE, COOKIERUN',
    desc: ['브랜드 콘셉트와 공간 특성을 반영한 주문형 금속 구조물을 제작합니다.', '정밀가공과 맞춤 설계로 차별화된 공간 연출을 실현합니다.'],
    img: '/images/portfolio/diptyque-seongsu.jpg', alt: '딥디크 성수 팝업 스토어 금속 구조물',
  },
];

function renderServiceMedia(media: ServiceMedia, className = '') {
  return (
    <figure key={media.src} className={`group relative overflow-hidden bg-slate-800 ${className}`}>
      {media.type === 'video' ? (
        <video
          src={media.src}
          poster={media.poster}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.alt}
        />
      ) : (
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      )}
      {media.type === 'video' && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 bg-slate-950/70 text-[10px] font-bold tracking-widest text-white">
          <Play size={10} className="fill-current" /> VIDEO
        </span>
      )}
      {media.label && (
        <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent">
          <span className="block text-sm md:text-base font-bold text-white">{media.label}</span>
          {media.brand && <span className="block text-[11px] md:text-xs font-medium tracking-wide text-slate-300 mt-0.5">{media.brand}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [portfolioFilter, setPortfolioFilter] = useState<PortfolioCategory>('전체');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!introDone) return;
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), HERO_INTERVAL);
    return () => clearInterval(timer);
  }, [introDone]);

  /**
   * 서버 발송이 불가능할 때(발송 설정 누락·서버 오류·네트워크 오류) 문의가 사라지지 않도록
   * 방문자의 메일 프로그램을 회사 주소로 열어 준다.
   */
  const openMailFallback = (payload: Record<string, string>) => {
    const subject = encodeURIComponent(`[홈페이지 문의] ${payload.company ?? ''} - ${payload.name ?? ''}`);
    const body = encodeURIComponent(
      `회사명 / 브랜드명: ${payload.company ?? ''}\n담당자명: ${payload.name ?? ''}\n연락처: ${payload.phone ?? ''}\n이메일: ${payload.email ?? ''}\n\n문의 내용:\n${payload.message ?? ''}`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setFormError(`메일 프로그램으로 연결했습니다. 작성하신 내용을 그대로 보내 주세요. 메일 프로그램이 열리지 않으면 ${COMPANY.tel}로 연락해 주세요.`);
    setFormStatus('error');
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === 'sending') return;

    const form = e.currentTarget;
    const payload: Record<string, string> = {};
    new FormData(form).forEach((value, key) => { payload[key] = String(value); });

    setFormStatus('sending');
    setFormError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // 입력 오류(400)·요청 과다(429)는 서버 안내를 그대로 보여 주고, 그 밖의 실패는 메일 프로그램으로 넘긴다.
        if (res.status === 400 || res.status === 429) {
          setFormError(data?.error ?? '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
          setFormStatus('error');
          return;
        }
        openMailFallback(payload);
        return;
      }

      form.reset();
      setFormStatus('sent');
    } catch {
      openMailFallback(payload);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || lightbox !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, lightbox]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // 맨 위(스크롤 전)에서는 메인 사진 위에 흰 글씨 메뉴
  const navLight = !isScrolled;

  const navLinks = [
    { name: '회사소개', id: 'about' },
    { name: '제작분야', id: 'services' },
    { name: '핵심역량', id: 'tech' },
    { name: '사업분야', id: 'business' },
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

  const processSteps = [
    { title: "문의 접수", desc: "프로젝트 개요 및 일정, 예산 등 기초적인 내용을 접수합니다.", icon: <MessageSquare size={24} /> },
    { title: "상담 및 요구사항 확인", desc: "설치 환경, 브랜드 가이드라인, 특별한 요구사항을 상세히 파악합니다.", icon: <ClipboardList size={24} /> },
    { title: "도면 검토 및 구조 협의", desc: "전달받은 도면을 바탕으로 물리적 구현 가능성과 구조적 안정성을 검토합니다.", icon: <FileSearch size={24} /> },
    { title: "소재/마감/제작 방식 제안", desc: "최적의 퀄리티를 위해 적합한 금속 소재와 표면 마감, 조립 방식을 제안합니다.", icon: <Lightbulb size={24} /> },
    { title: "제작 진행", desc: "자체 공장에서 정밀한 절단, 절곡, 용접, 폴리싱 등 본격적인 제작을 진행합니다.", icon: <Hammer size={24} /> },
    { title: "현장 설치 및 마감", desc: "완성된 집기를 현장으로 안전하게 운송하여 오차 없이 설치하고 최종 마감합니다.", icon: <Truck size={24} /> },
    { title: "사후 대응", desc: "설치 후 발생하는 이슈나 추가적인 유지보수 요청에 책임감 있게 대응합니다.", icon: <HeartHandshake size={24} /> },
  ];

  const filteredPortfolio = portfolioFilter === '전체'
    ? portfolioItems
    : portfolioItems.filter((item) => item.cat === portfolioFilter);
  const lightboxItem = lightbox !== null ? filteredPortfolio[lightbox] : undefined;
  const moveLightbox = (step: number) =>
    setLightbox((i) => (i === null ? null : (i + step + filteredPortfolio.length) % filteredPortfolio.length));

  // 사진 크게 보기: Esc 닫기, 좌우 화살표로 넘기기
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') moveLightbox(1);
      if (e.key === 'ArrowLeft') moveLightbox(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, filteredPortfolio.length]);

  return (
    <div className="min-h-screen bg-white text-slate-600 font-sans selection:bg-brand selection:text-white">
      {/* ─── Navbar ─── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button className={`text-2xl font-bold tracking-tighter flex items-center gap-2 transition-colors ${navLight ? 'text-white' : 'text-brand'}`} onClick={() => scrollTo('hero')} aria-label="홈으로 이동">
            <LogoIcon className="w-8 h-8" />
            신성에스엔티
          </button>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollTo(link.id)} className={`text-sm font-medium transition-colors ${navLight ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-brand'}`}>
                {link.name}
              </button>
            ))}
            <a
              href={TIMECAPSULE_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border transition-colors ${navLight ? 'border-white/50 text-white hover:bg-white/10' : 'border-brand/30 bg-white/70 text-brand hover:bg-brand/5'}`}
            >
              대한타임캡슐 <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only">(네이버 스마트스토어, 새 창)</span>
            </a>
            <button onClick={() => scrollTo('contact')} className={`px-5 py-2.5 text-sm font-semibold transition-colors ${navLight ? 'bg-white text-brand hover:bg-slate-100' : 'bg-brand text-white hover:bg-brand-dark'}`}>
              문의하기
            </button>
          </div>

          <button className={`lg:hidden ${navLight ? 'text-white' : 'text-slate-900'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col space-y-1 mt-4 pb-10">
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
            <a
              href={TIMECAPSULE_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xl font-medium text-brand py-4 border-b border-slate-100"
            >
              대한타임캡슐 스토어 <ExternalLink size={18} aria-hidden="true" />
            </a>
            <button onClick={() => scrollTo('contact')} className="w-full py-4 mt-6 bg-brand text-white text-lg font-semibold">
              문의하기
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ HERO ═══════════════════ */}
      {/* 사진은 원래 밝기 그대로 두고, 글씨가 놓이는 왼쪽(모바일은 가운데 아래)과 메뉴 자리만 옅게 어둡게 한다 */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-slate-200">
        {/* 슬라이드 사진 미리 불러오기 */}
        <div className="hidden" aria-hidden="true">
          {heroSlides.map((s) => <img key={s.img} src={s.img} alt="" />)}
        </div>

        <div className="absolute inset-0 z-0">
          {/* 첫 접속 로고 화면 */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: introDone ? 0 : 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-40 bg-white flex items-center justify-center pointer-events-none"
            style={{ display: introDone ? 'none' : undefined }}
          >
            <motion.img
              src="/portfolio/logo2.png"
              alt="주식회사 신성에스엔티 로고"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[20rem] md:w-[30rem] max-w-[80vw]"
            />
          </motion.div>

          <AnimatePresence>
            <motion.img
              key={heroIndex}
              src={heroSlides[heroIndex].img}
              alt={heroSlides[heroIndex].alt}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.08 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: (HERO_INTERVAL + 1400) / 1000, ease: 'linear' } }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/15 via-slate-950/35 to-slate-950/45 md:bg-gradient-to-r md:from-slate-950/55 md:via-slate-950/20 md:via-40% md:to-transparent md:to-70%" />
          <div className="absolute inset-x-0 top-0 h-28 z-10 bg-gradient-to-b from-slate-950/35 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium mb-8 bg-white/15 border border-white/30 text-white backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full animate-pulse bg-white" />
              금속 집기 · 금속 인테리어 전문 제작
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.15] mb-6 text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
              공간을 빛내는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">금속의 품격</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 leading-relaxed text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
              백화점, 면세점, 브랜드 매장에 필요한 고급 금속 집기와 인테리어를<br className="hidden md:block" /> 정밀한 제작력과 책임 시공으로 완성합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button onClick={() => scrollTo('contact')} className="w-full sm:w-auto px-8 py-4 bg-brand text-white font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 group">
                제작 문의하기 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('portfolio')} className="w-full sm:w-auto px-8 py-4 font-semibold transition-colors border border-white/70 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                포트폴리오 보기
              </button>
            </div>
          </div>
        </motion.div>

        {/* 슬라이드 표시 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 md:bottom-12 inset-x-0 z-20"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center gap-5">
            <div className="text-xs md:text-sm font-semibold tracking-widest whitespace-nowrap text-white">
              <span>{String(heroIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/50"> / {String(heroSlides.length).padStart(2, '0')}</span>
              <span className="ml-3 text-white/80">{heroSlides[heroIndex].brand}</span>
            </div>
            <div className="flex gap-1.5" role="tablist" aria-label="메인 슬라이드 선택">
              {heroSlides.map((s, idx) => (
                <button
                  key={s.img}
                  role="tab"
                  aria-selected={idx === heroIndex}
                  aria-label={`${idx + 1}번째 사진 (${s.brand})`}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-[3px] transition-all duration-500 ${idx === heroIndex ? 'w-10 bg-white' : 'w-5 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-sm font-bold text-brand tracking-widest mb-4">ABOUT US</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                도면을 이해하고,<br />구조를 해결하고,<br />완성도 높은<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">금속 결과물</span>로 답합니다
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:pb-2"
            >
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                신성에스엔티는 금속 집기, 금속 인테리어, 주문제작 가구,<br className="hidden md:block" /> 스테인리스 및 철 구조물 제작을 전문으로 하는 금속 제작 기업입니다.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                백화점, 면세점, 브랜드 매장 등 높은 완성도가 요구되는 프로젝트를 중심으로,<br className="hidden md:block" /> 도면 해석부터 제작, 마감, 현장 설치까지 책임감 있게 수행하고 있습니다.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {['금속 집기 제작', '매장 집기 주문제작', '백화점 / 면세점 시공', '현장 맞춤 시공'].map((keyword, idx) => (
              <motion.div
                key={keyword}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-5 md:p-6 border border-slate-200 bg-white text-sm md:text-base text-slate-700 flex items-center gap-3 hover:border-brand hover:bg-brand/5 hover:text-brand transition-all group"
              >
                <CheckCircle2 size={20} className="text-brand shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{keyword}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      {(() => {
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

              <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10">
                {/* Tab Buttons */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:content-start">
                  {serviceCategories.map((cat, idx) => (
                    <button
                      key={cat.title}
                      data-tab={idx}
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
                <div className="bg-slate-800/50 border border-slate-700/50 p-6 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-light" />
                  <div className="absolute top-6 right-8 text-8xl font-bold text-white/[0.03] select-none leading-none">
                    0{activeServiceTab + 1}
                  </div>

                  <div className="relative">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{active.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">{active.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {active.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 text-slate-200 text-xs md:text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* 항목별 사진 · 영상 */}
                    <motion.div
                      key={activeServiceTab}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {active.layout === 'grid3' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {active.media.map((m) => renderServiceMedia(m, 'aspect-[4/3]'))}
                        </div>
                      )}
                      {active.layout === 'feature' && (
                        <div className="grid grid-cols-2 md:grid-cols-5 md:grid-rows-2 gap-3 md:h-[460px]">
                          {active.media.map((m, i) => renderServiceMedia(
                            m,
                            i === 0 ? 'col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto' : 'md:col-span-3 aspect-square md:aspect-auto'
                          ))}
                        </div>
                      )}
                      {active.layout === 'grid4' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {active.media.map((m) => renderServiceMedia(m, 'aspect-[3/4]'))}
                        </div>
                      )}
                    </motion.div>

                    {active.link && (
                      <a
                        href={active.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-brand text-white text-sm font-semibold hover:bg-brand-light transition-colors"
                      >
                        {active.link.label} <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    )}
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">신성이 만드는<br className="md:hidden" /> 디테일의 차이</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">0.1mm의 디테일이<br className="md:hidden" /> 공간의 품격을 결정합니다.</p>
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

      {/* ═══════════════════ BUSINESS AREAS ═══════════════════ */}
      <section id="business" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14 md:mb-20">
            <div className="text-sm font-bold text-brand tracking-widest mb-4">BUSINESS AREAS</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">주요 사업분야</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">패션, 뷰티, 주류 브랜드의 매장과 팝업 공간에<br className="md:hidden" /> 금속 집기와 구조물을 제작해 왔습니다.</p>
          </div>

          <div className="border-t border-slate-200">
            {businessAreas.map((area, idx) => (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 md:gap-12 items-center py-8 md:py-10 border-b border-slate-200 group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={area.img} alt={area.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div>
                  <div className="text-sm font-bold text-brand/60 tracking-widest mb-2">0{idx + 1}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{area.title}</h3>
                  <p className="text-sm font-semibold text-brand tracking-wide leading-relaxed mb-5">{area.brands}</p>
                  <p className="text-slate-600 leading-relaxed">
                    {area.desc[0]}<br className="hidden lg:block" /> {area.desc[1]}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PORTFOLIO ═══════════════════ */}
      <section id="portfolio" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(0,82,164,0.15),_transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="mb-10 md:mb-12">
            <div className="text-sm font-bold text-brand-light tracking-widest mb-4">PORTFOLIO</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">프로젝트 사례</h2>
            <p className="text-lg text-slate-400">하이엔드 브랜드의 까다로운 기준을 충족시킨 결과물입니다.</p>
          </div>

          {/* 분야 선택 */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap mb-8" role="tablist" aria-label="포트폴리오 분야">
            {portfolioCategories.map((cat) => {
              const selected = portfolioFilter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setPortfolioFilter(cat)}
                  className={`shrink-0 px-4 py-2.5 text-sm font-semibold border transition-colors ${selected ? 'bg-brand border-brand text-white' : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredPortfolio.map((item, idx) => (
              <motion.figure
                key={item.img}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                className="group bg-slate-800 border border-slate-700/50 hover:border-brand/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(idx)}
                  className="relative block w-full aspect-[4/3] overflow-hidden bg-slate-800 cursor-zoom-in"
                  aria-label={`${item.brand} 사진 크게 보기`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className="absolute right-2 bottom-2 w-8 h-8 flex items-center justify-center bg-slate-950/60 text-white opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                    <ZoomIn size={16} />
                  </span>
                </button>
                <figcaption className="p-4 md:p-5">
                  <div className="text-[11px] font-semibold text-brand-light/80 mb-1.5">{item.cat}</div>
                  <div className="text-sm md:text-base font-bold text-white tracking-wide leading-snug">{item.brand}</div>
                  {item.site && <div className="text-xs text-slate-400 mt-1">{item.site}</div>}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* 포트폴리오 사진 크게 보기 */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="포트폴리오 사진 크게 보기"
            onClick={() => setLightbox(null)}
          >
            <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-4 text-white" onClick={(e) => e.stopPropagation()}>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-brand-light">{lightboxItem.cat}</div>
                <div className="text-lg md:text-xl font-bold truncate">
                  {lightboxItem.brand}
                  {lightboxItem.site && <span className="ml-2 text-sm md:text-base font-medium text-slate-400">{lightboxItem.site}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-slate-400">{(lightbox ?? 0) + 1} / {filteredPortfolio.length}</span>
                <button type="button" onClick={() => setLightbox(null)} className="p-2 hover:bg-white/10 transition-colors" aria-label="닫기">
                  <X size={26} />
                </button>
              </div>
            </div>
            <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-24 pb-6">
              <img
                key={lightboxItem.img}
                src={lightboxItem.img}
                alt={lightboxItem.alt}
                className="max-w-full max-h-full object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); moveLightbox(-1); }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="이전 사진"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); moveLightbox(1); }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="다음 사진"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section id="process" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-sm font-bold text-brand tracking-widest mb-4">PROCESS</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">제작 진행 프로세스</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">문의부터 사후 관리까지,<br className="md:hidden" /> 완벽한 결과물을 위한 7단계.</p>
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
      <section id="trust" className="py-20 md:py-28 text-white relative overflow-hidden bg-[linear-gradient(115deg,#00254f_0%,#003870_30%,#0052a4_70%,#1a6fc4_100%)]">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-[#1a75d2]/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-[520px] h-[520px] bg-[#4f9cf0]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-center"
          >
            <div className="flex justify-center lg:justify-start lg:pr-16 lg:border-r lg:border-white/25 lg:self-stretch lg:items-center">
              <img src="/images/logo-mark.png" alt="신성에스엔티 로고 마크" className="w-36 md:w-48 lg:w-full max-w-[220px] brightness-0 invert opacity-95" />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight">
                까다로운 기준을 요구하는 공간에서<br className="hidden md:block" /> 선택받아 왔습니다
              </h2>
              <p className="text-lg text-blue-100/85 leading-relaxed mb-10">
                신성에스엔티는 단순 납품 업체가 아니라<br className="md:hidden" /> 브랜드의 공간 완성도를 함께 고민하는<br className="md:hidden" /> 금속 제작 파트너입니다.
              </p>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
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
                    className="p-5 md:p-6 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white/35 mb-3">{item.num}</div>
                    <p className="font-bold text-white text-sm md:text-base leading-snug">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CTA / CONTACT ═══════════════════ */}
      <section id="contact" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand/[0.06] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-14 md:mb-16">
            <div className="text-sm font-bold text-brand tracking-widest mb-6">CONTACT</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">금속 집기 제작이 필요하신가요?</h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              도면 검토부터 제작, 시공까지 프로젝트 성격에 맞는 방향으로 상담해드립니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] gap-6 lg:gap-10">
            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4">
              <a href={`tel:${COMPANY.tel}`} className="p-6 bg-white border border-slate-200 hover:border-brand hover:shadow-md transition-all group flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors">
                  <Phone size={24} className="text-brand group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-slate-900 font-bold block mb-1">전화 문의</span>
                  <span className="text-slate-500 text-sm">{COMPANY.tel}</span>
                </div>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="p-6 bg-white border border-slate-200 hover:border-brand hover:shadow-md transition-all group flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors">
                  <Mail size={24} className="text-brand group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-slate-900 font-bold block mb-1">이메일 문의</span>
                  <span className="text-slate-500 text-sm">{COMPANY.email}</span>
                </div>
              </a>
              <a href={NAVER_MAP_URL} target="_blank" rel="noopener noreferrer" className="p-6 bg-white border border-slate-200 hover:border-brand hover:shadow-md transition-all group flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors">
                  <MapPin size={24} className="text-brand group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <span className="text-slate-900 font-bold block mb-1">방문 / 공장</span>
                  <span className="text-slate-500 text-sm block">{COMPANY.address}</span>
                  <span className="text-brand text-xs font-semibold mt-1.5 inline-flex items-center gap-1">지도에서 보기 <ExternalLink size={12} aria-hidden="true" /></span>
                </div>
              </a>
              <div className="p-6 bg-white border border-slate-200 flex items-center gap-5">
                <div className="w-14 h-14 bg-brand/10 flex items-center justify-center shrink-0">
                  <Clock size={24} className="text-brand" />
                </div>
                <div>
                  <span className="text-slate-900 font-bold block mb-1">영업시간</span>
                  <span className="text-slate-500 text-sm">평일 08:30~17:30 · 토/일/공휴일 휴무</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleContactSubmit}
              className="bg-white border border-slate-200 shadow-sm p-6 md:p-10 space-y-6"
            >
              {/* 스팸 봇 유인용 필드 — 사람에게는 보이지 않음 */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute w-px h-px -m-px opacity-0 pointer-events-none"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cf-company" className="text-sm text-slate-600 mb-2 block font-semibold">회사명 / 브랜드명</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input id="cf-company" name="company" type="text" placeholder="예: ○○백화점" className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand focus:bg-white transition-colors" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-name" className="text-sm text-slate-600 mb-2 block font-semibold">담당자명</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input id="cf-name" name="name" type="text" placeholder="홍길동" className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand focus:bg-white transition-colors" required />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cf-phone" className="text-sm text-slate-600 mb-2 block font-semibold">연락처</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input id="cf-phone" name="phone" type="tel" placeholder="010-0000-0000" className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand focus:bg-white transition-colors" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-email" className="text-sm text-slate-600 mb-2 block font-semibold">이메일</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input id="cf-email" name="email" type="email" placeholder="example@email.com" className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand focus:bg-white transition-colors" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="cf-message" className="text-sm text-slate-600 mb-2 block font-semibold">문의 내용</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-4 text-slate-400" />
                  <textarea id="cf-message" name="message" rows={5} placeholder="프로젝트 개요, 원하시는 제작물, 일정 등을 자유롭게 적어주세요." className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand focus:bg-white transition-colors resize-none" required />
                </div>
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-4 bg-brand text-white font-bold text-base hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                {formStatus === 'sending' ? '전송 중...' : '문의하기'}
              </button>

              {formStatus === 'sent' && (
                <p role="status" className="flex items-center gap-2 text-sm text-brand">
                  <CheckCircle2 size={16} className="shrink-0" />
                  문의가 접수되었습니다. 영업일 기준 1일 이내에 연락드리겠습니다.
                </p>
              )}
              {formStatus === 'error' && (
                <p role="alert" className="flex items-center gap-2 text-sm text-red-500">
                  <X size={16} className="shrink-0" />
                  {formError}
                </p>
              )}
            </form>
          </div>

          {/* 오시는 길 */}
          <div className="mt-6 lg:mt-10 bg-white border border-slate-200 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:px-8 border-b border-slate-200">
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">오시는 길</h3>
                <address className="not-italic text-slate-500 text-sm">{COMPANY.address}</address>
              </div>
              <div className="flex gap-2">
                <a href={NAVER_MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand transition-colors">
                  네이버 지도 <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a href={KAKAO_MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand transition-colors">
                  카카오맵 <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
            <iframe
              src={MAP_EMBED_URL}
              title={`${COMPANY.name} 위치 지도`}
              className="w-full h-[280px] md:h-[360px] border-0 block"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
                {COMPANY.name}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                도면을 현실로 구현하는 정밀 금속 제작.<br />
                고급 공간을 위한 주문제작 금속 집기 전문 기업입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-400">
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 tracking-widest mb-4">연락처</div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-light shrink-0 mt-0.5" />
                  <a href={NAVER_MAP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{COMPANY.address}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-brand-light shrink-0" />
                  <a href={`tel:${COMPANY.tel}`} className="hover:text-white transition-colors">{COMPANY.tel}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-brand-light shrink-0" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-brand-light shrink-0" />
                  <span>월~금 08:30~17:30</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 tracking-widest mb-4">사업자 정보</div>
                <p>상호: {COMPANY.name}</p>
                <p>대표: {COMPANY.ceo}</p>
                <p>사업자등록번호: {COMPANY.bizNo}</p>
                <p>{COMPANY.address}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
