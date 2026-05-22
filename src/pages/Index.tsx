import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    id: "consult",
    icon: "MessageSquare",
    label: "Стратегическая консультация",
    desc: "Разбираем вашу ситуацию, находим точки роста и выстраиваем план действий",
    duration: "60 мин",
    price: "от 5 000 ₽",
  },
  {
    id: "audit",
    icon: "Search",
    label: "Аудит бизнеса",
    desc: "Полный анализ процессов, финансов и маркетинга с письменным отчётом",
    duration: "90 мин",
    price: "от 12 000 ₽",
  },
  {
    id: "plan",
    icon: "BarChart2",
    label: "Бизнес-план",
    desc: "Разработка детального плана для запуска или масштабирования бизнеса",
    duration: "5–7 дней",
    price: "от 35 000 ₽",
  },
  {
    id: "mentor",
    icon: "Users",
    label: "Менторство",
    desc: "Регулярные сессии: поддержка на каждом этапе развития вашего дела",
    duration: "3 месяца",
    price: "от 25 000 ₽/мес",
  },
];

const PROBLEMS = [
  {
    icon: "TrendingDown",
    title: "Выручка не растёт",
    desc: "Работаете много, но прибыль стоит на месте. Непонятно, где теряются деньги.",
  },
  {
    icon: "AlertCircle",
    title: "Нет системы в продажах",
    desc: "Клиенты приходят хаотично, нет воронки, каждая сделка — с нуля.",
  },
  {
    icon: "Clock",
    title: "Всё держится на вас",
    desc: "Без вашего участия бизнес останавливается. Делегировать не получается.",
  },
  {
    icon: "FileX",
    title: "Финансы непрозрачны",
    desc: "Не понятно, сколько реально зарабатывает бизнес и куда уходят деньги.",
  },
  {
    icon: "UserX",
    title: "Сложно нанять людей",
    desc: "Подбор, обучение и удержание сотрудников отнимает огромные ресурсы.",
  },
  {
    icon: "Zap",
    title: "Нет времени думать",
    desc: "Постоянная операционка мешает заниматься стратегией и развитием.",
  },
];

const PROCESS = [
  { step: "01", title: "Заявка", desc: "Выбираете услугу и удобное время в календаре" },
  { step: "02", title: "Знакомство", desc: "Бесплатный 20-минутный звонок для уточнения запроса" },
  { step: "03", title: "Работа", desc: "Проводим сессию или выполняем проект по плану" },
  { step: "04", title: "Результат", desc: "Получаете конкретный план действий или готовый документ" },
];

const PRICING = [
  {
    name: "Старт",
    price: "5 000 ₽",
    period: "разовая консультация",
    features: ["Анализ текущей ситуации", "Выявление ключевых проблем", "Рекомендации на 30 дней", "Запись сессии"],
    cta: "Записаться",
    highlight: false,
  },
  {
    name: "Рост",
    price: "49 000 ₽",
    period: "в месяц",
    features: [
      "4 консультации в месяц",
      "Аудит бизнеса",
      "Финансовая модель",
      "Поддержка в мессенджере",
      "Ежемесячный отчёт",
    ],
    cta: "Начать сейчас",
    highlight: true,
  },
  {
    name: "Трансформация",
    price: "По запросу",
    period: "индивидуально",
    features: [
      "Всё из тарифа «Рост»",
      "Разработка бизнес-плана",
      "Помощь в найме команды",
      "Стратегическая сессия",
      "Приоритетная поддержка 24/7",
    ],
    cta: "Обсудить проект",
    highlight: false,
  },
];

const CASES = [
  {
    name: "Алексей К.",
    business: "Кафе, Краснодар",
    result: "+68% выручки за 4 месяца",
    text: "Помогли выстроить систему учёта, оптимизировать меню и запустить доставку. Теперь я знаю, сколько зарабатываю каждый день.",
    avatar: "АК",
  },
  {
    name: "Марина С.",
    business: "Салон красоты, Москва",
    result: "×2 клиентов без роста расходов",
    text: "Разобрались с маркетингом и внедрили CRM. Количество повторных клиентов выросло вдвое за первый квартал.",
    avatar: "МС",
  },
  {
    name: "Дмитрий В.",
    business: "Стройподрядчик, СПб",
    result: "Вышел из операционки за 3 мес.",
    text: "Наконец-то делегировал. Прописали регламенты, наняли управляющего. Теперь занимаюсь развитием, а не стройкой.",
    avatar: "ДВ",
  },
];

const WORKS = [
  { label: "Финансовая модель", tag: "Excel / Google Sheets", desc: "Полный P&L, движение денег, точка безубыточности" },
  { label: "Бизнес-план", tag: "PDF-документ", desc: "Для банка, инвестора или внутреннего использования" },
  { label: "Стратегия продаж", tag: "Презентация", desc: "Воронка, скрипты, KPI для отдела продаж" },
  { label: "Маркетинговый аудит", tag: "Отчёт", desc: "Анализ каналов, бюджет, рекомендации по ROI" },
  { label: "Организационная структура", tag: "Схема + регламенты", desc: "Зоны ответственности, должностные инструкции" },
  { label: "Антикризисный план", tag: "Дорожная карта", desc: "Сценарии, приоритеты, шаги стабилизации" },
];

const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export default function Index() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", company: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-ibm">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-cormorant text-2xl font-medium tracking-tight">БизнесПро</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#555]">
            <a href="#problems" className="hover:text-[#111] transition-colors">Проблемы</a>
            <a href="#services" className="hover:text-[#111] transition-colors">Услуги</a>
            <a href="#works" className="hover:text-[#111] transition-colors">Примеры работ</a>
            <a href="#pricing" className="hover:text-[#111] transition-colors">Стоимость</a>
            <a href="#cases" className="hover:text-[#111] transition-colors">Клиенты</a>
          </div>
          <a
            href="#booking"
            className="bg-[#111] text-white text-sm px-5 py-2.5 hover:bg-[#333] transition-colors"
          >
            Записаться
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#E5E5E5] px-3 py-1.5 text-xs text-[#777] tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Принимаем заявки
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl leading-[1] tracking-tight mb-6">
              Консалтинг<br />
              для малого<br />
              <span className="italic">бизнеса</span>
            </h1>
            <p className="text-[#555] text-base leading-relaxed mb-8 max-w-sm">
              Помогаем предпринимателям выстроить систему, увеличить прибыль и выйти из операционной ловушки.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="#booking"
                className="bg-[#111] text-white px-7 py-3.5 text-sm hover:bg-[#333] transition-colors"
              >
                Записаться на консультацию
              </a>
              <a href="#services" className="text-sm text-[#555] flex items-center gap-2 hover:text-[#111] transition-colors">
                Узнать больше <Icon name="ArrowRight" size={14} />
              </a>
            </div>
            <div className="flex items-center gap-10 mt-12 pt-12 border-t border-[#E5E5E5]">
              <div>
                <p className="font-cormorant text-4xl font-medium">150+</p>
                <p className="text-xs text-[#777] mt-1">клиентов</p>
              </div>
              <div>
                <p className="font-cormorant text-4xl font-medium">8 лет</p>
                <p className="text-xs text-[#777] mt-1">опыта</p>
              </div>
              <div>
                <p className="font-cormorant text-4xl font-medium">×2.4</p>
                <p className="text-xs text-[#777] mt-1">средний рост выручки</p>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <img
              src="https://cdn.poehali.dev/projects/255a8f06-f5de-41f2-9147-545d859dcc0e/files/58008dab-4392-4c35-a5ea-0bbe7d153095.jpg"
              alt="Офис"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white border border-[#E5E5E5] p-4">
              <p className="text-xs text-[#777] mb-1">Последний результат</p>
              <p className="text-sm font-medium">Кафе «Краснодар» — выручка +68% за 4 мес.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section id="problems" className="bg-[#F7F7F5] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3">Узнаёте себя?</p>
              <h2 className="font-cormorant text-4xl md:text-5xl">Проблемы малого бизнеса</h2>
            </div>
            <img
              src="https://cdn.poehali.dev/projects/255a8f06-f5de-41f2-9147-545d859dcc0e/files/c701a315-05f2-4582-aa6f-ec297151d7de.jpg"
              alt="Бизнес"
              className="w-24 h-24 object-cover grayscale opacity-50 hidden md:block"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E5E5]">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-[#F7F7F5] p-8 hover:bg-white transition-colors duration-200 group">
                <Icon name={p.icon} size={20} className="text-[#BBB] mb-5 group-hover:text-[#111] transition-colors" />
                <h3 className="font-medium text-base mb-2">{p.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 border border-[#E5E5E5] bg-white flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <p className="text-sm text-[#555] max-w-lg">
              Если хотя бы 2 пункта про вас — вам точно нужна консультация. Разберём ситуацию и дадим конкретный план.
            </p>
            <a href="#booking" className="shrink-0 bg-[#111] text-white text-sm px-6 py-3 hover:bg-[#333] transition-colors">
              Записаться бесплатно
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3">Что мы делаем</p>
          <h2 className="font-cormorant text-4xl md:text-5xl mb-14">Услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="border border-[#E5E5E5] p-8 hover:border-[#111] transition-colors duration-300 group cursor-pointer"
                onClick={() => setSelectedService(s.id)}
              >
                <div className="flex items-start justify-between mb-6">
                  <Icon name={s.icon} size={22} className="text-[#BBB] group-hover:text-[#111] transition-colors" />
                  <div className="text-right">
                    <p className="text-xs text-[#999]">{s.duration}</p>
                    <p className="font-medium text-sm mt-0.5">{s.price}</p>
                  </div>
                </div>
                <h3 className="font-cormorant text-2xl mb-2">{s.label}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-[#999] group-hover:text-[#111] transition-colors">
                  <span>Записаться</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="bg-[#111] text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#555] mb-3">Примеры работ</p>
          <h2 className="font-cormorant text-4xl md:text-5xl mb-14 text-white">Что вы получите</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2a2a2a]">
            {WORKS.map((w) => (
              <div key={w.label} className="bg-[#111] p-8 hover:bg-[#1a1a1a] transition-colors">
                <span className="inline-block border border-[#333] text-[#666] text-xs px-2.5 py-1 mb-5 tracking-wider">
                  {w.tag}
                </span>
                <h3 className="font-cormorant text-xl text-white mb-2">{w.label}</h3>
                <p className="text-sm text-[#777] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3">Как всё устроено</p>
          <h2 className="font-cormorant text-4xl md:text-5xl mb-14">Процесс работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS.map((p) => (
              <div key={p.step}>
                <p className="font-cormorant text-5xl text-[#E5E5E5] font-light mb-4">{p.step}</p>
                <h3 className="font-medium text-base mb-2">{p.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#F7F7F5] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3">Прозрачно и честно</p>
          <h2 className="font-cormorant text-4xl md:text-5xl mb-14">Стоимость</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 border ${
                  plan.highlight ? "bg-[#111] border-[#111] text-white" : "bg-white border-[#E5E5E5]"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block text-xs tracking-widest uppercase text-[#777] border border-[#333] px-2.5 py-1 mb-5">
                    Популярный
                  </span>
                )}
                <h3 className={`font-cormorant text-2xl mb-1 ${plan.highlight ? "text-white" : "text-[#111]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-3xl font-cormorant font-medium mt-3 mb-1 ${plan.highlight ? "text-white" : "text-[#111]"}`}>
                  {plan.price}
                </p>
                <p className={`text-xs mb-8 ${plan.highlight ? "text-[#777]" : "text-[#999]"}`}>{plan.period}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Icon
                        name="Check"
                        size={14}
                        className={`mt-0.5 shrink-0 ${plan.highlight ? "text-[#777]" : "text-[#999]"}`}
                      />
                      <span className={`text-sm ${plan.highlight ? "text-[#CCC]" : "text-[#555]"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className={`block text-center py-3 text-sm transition-colors ${
                    plan.highlight
                      ? "bg-white text-[#111] hover:bg-[#E5E5E5]"
                      : "bg-[#111] text-white hover:bg-[#333]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#999] mt-6 text-center">
            Все цены без НДС. Возможна оплата частями. Первая консультация — бесплатно.
          </p>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3">Реальные результаты</p>
          <h2 className="font-cormorant text-4xl md:text-5xl mb-14">Примеры клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((c) => (
              <div key={c.name} className="border border-[#E5E5E5] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-[#111] text-white flex items-center justify-center text-xs font-medium shrink-0">
                    {c.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-[#999]">{c.business}</p>
                  </div>
                </div>
                <div className="border-l-2 border-[#111] pl-4 mb-5">
                  <p className="font-cormorant text-lg">{c.result}</p>
                </div>
                <p className="text-sm text-[#666] leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4">
            <img
              src="https://cdn.poehali.dev/projects/255a8f06-f5de-41f2-9147-545d859dcc0e/files/9cb23f86-1b47-40c4-acfc-3557bd51ea49.jpg"
              alt="Клиент"
              className="w-14 h-14 object-cover grayscale"
            />
            <p className="text-sm text-[#666]">
              Работаем с предпринимателями любого уровня — от начинающих до опытных.{" "}
              <a href="#booking" className="underline underline-offset-4 text-[#111]">
                Записаться на разбор ситуации →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="bg-[#F7F7F5] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3">Первый шаг</p>
          <h2 className="font-cormorant text-4xl md:text-5xl mb-3">Записаться</h2>
          <p className="text-[#666] text-sm mb-12">Выберите услугу, дату и время — мы подтвердим в течение часа.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`text-left p-4 border transition-all duration-200 ${
                  selectedService === s.id
                    ? "border-[#111] bg-white"
                    : "border-[#E5E5E5] bg-white hover:border-[#999]"
                }`}
              >
                <p className="text-xs font-medium mb-1 leading-tight">{s.label}</p>
                <p className="text-xs text-[#999]">{s.price}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="border border-[#E5E5E5] bg-white p-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date() || d.getDay() === 0 || d.getDay() === 6}
                  className="w-full"
                />
              </div>
              {date && (
                <div className="mt-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-3">Время</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 text-sm border transition-all duration-200 ${
                          selectedTime === t
                            ? "border-[#111] bg-[#111] text-white"
                            : "border-[#E5E5E5] bg-white text-[#111] hover:border-[#111]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-[#E5E5E5] p-8">
              {submitted ? (
                <div className="h-full flex flex-col items-start justify-center py-8">
                  <div className="w-12 h-12 bg-[#111] flex items-center justify-center mb-6">
                    <Icon name="Check" size={20} className="text-white" />
                  </div>
                  <h3 className="font-cormorant text-3xl mb-3">Заявка принята</h3>
                  <p className="text-[#666] text-sm leading-relaxed">
                    Мы свяжемся с вами в течение часа для подтверждения и уточнения деталей.
                  </p>
                  <div className="w-8 h-px bg-[#111] mt-6" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs tracking-[0.15em] uppercase text-[#999] block mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors placeholder:text-[#CCC]"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-[0.15em] uppercase text-[#999] block mb-2">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors placeholder:text-[#CCC]"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-[0.15em] uppercase text-[#999] block mb-2">Компания / сфера</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors placeholder:text-[#CCC]"
                      placeholder="Название или описание бизнеса"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-[0.15em] uppercase text-[#999] block mb-2">Ваш запрос</label>
                    <textarea
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      rows={3}
                      className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors placeholder:text-[#CCC] resize-none"
                      placeholder="Коротко опишите вашу ситуацию..."
                    />
                  </div>
                  {date && selectedTime && (
                    <div className="border border-[#E5E5E5] bg-[#F7F7F5] px-4 py-3">
                      <p className="text-xs text-[#666]">
                        <span className="font-medium text-[#111]">
                          {date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} · {selectedTime}
                        </span>
                        {selectedService && ` · ${SERVICES.find((s) => s.id === selectedService)?.label}`}
                      </p>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-[#111] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#333] transition-colors"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-[#999] text-center">
                    Нажимая, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="border-t border-[#E5E5E5] py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <span className="font-cormorant text-2xl font-medium block mb-2">БизнесПро</span>
            <p className="text-xs text-[#999] leading-relaxed">Консалтинг для малого и среднего бизнеса</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-4">Адрес</p>
            <p className="text-sm text-[#555]">Москва, ул. Тверская, 12</p>
            <p className="text-xs text-[#999] mt-1">Пн–Пт: 9:00–19:00</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-4">Контакты</p>
            <a href="tel:+74951234567" className="text-sm text-[#555] hover:text-[#111] transition-colors block">
              +7 (495) 123-45-67
            </a>
            <a href="mailto:hello@bizpro.ru" className="text-sm text-[#555] hover:text-[#111] transition-colors block mt-1">
              hello@bizpro.ru
            </a>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-4">Соцсети</p>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="flex items-center gap-2.5 text-sm text-[#555] hover:text-[#111] transition-colors">
                <Icon name="Send" size={14} /> Telegram
              </a>
              <a href="#" className="flex items-center gap-2.5 text-sm text-[#555] hover:text-[#111] transition-colors">
                <Icon name="Youtube" size={14} /> YouTube
              </a>
              <a href="#" className="flex items-center gap-2.5 text-sm text-[#555] hover:text-[#111] transition-colors">
                <Icon name="Instagram" size={14} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E5E5] px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#999]">© 2026 БизнесПро — Все права защищены</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#999] hover:text-[#111] transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-xs text-[#999] hover:text-[#111] transition-colors">
              Договор оферты
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}