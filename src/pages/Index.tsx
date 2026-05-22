import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Icon from "@/components/ui/icon";

const SERVICES = [
  { id: "consult", label: "Консультация", duration: "60 мин" },
  { id: "design", label: "Разработка дизайна", duration: "90 мин" },
  { id: "audit", label: "Аудит проекта", duration: "45 мин" },
];

const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export default function Index() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-ibm">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-[#E8E4DC]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cormorant text-2xl tracking-tight text-[#1A1A1A]">Студия</span>
          <a
            href="#booking"
            className="text-sm tracking-widest uppercase text-[#8B7355] hover:text-[#1A1A1A] transition-colors duration-300"
          >
            Записаться
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-28 px-6 max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-6">Профессиональные услуги</p>
          <h1 className="font-cormorant text-6xl md:text-8xl leading-[0.95] tracking-tight text-[#1A1A1A] mb-8">
            Создаём<br />
            <span className="italic text-[#8B7355]">результат</span><br />
            вместе
          </h1>
          <div className="w-12 h-px bg-[#8B7355] mb-8" />
          <p className="text-base text-[#6B6B6B] leading-relaxed max-w-md">
            Запишитесь на удобное время — выберите услугу, дату и оставьте контакты.
            Мы свяжемся для подтверждения.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 pb-28 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-8">Услуги</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedService(s.id)}
              className={`text-left p-6 border transition-all duration-300 ${
                selectedService === s.id
                  ? "border-[#8B7355] bg-[#8B7355]/5"
                  : "border-[#E8E4DC] hover:border-[#C4B9A8]"
              }`}
            >
              <div
                className="w-6 h-6 border rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ borderColor: selectedService === s.id ? "#8B7355" : "#C4B9A8" }}
              >
                {selectedService === s.id && (
                  <div className="w-2 h-2 rounded-full bg-[#8B7355]" />
                )}
              </div>
              <p className="font-cormorant text-xl text-[#1A1A1A] mb-1">{s.label}</p>
              <p className="text-xs text-[#8B7355] tracking-wider">{s.duration}</p>
            </button>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="px-6 pb-28 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-8">Выберите дату и время</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <div>
            <div className="border border-[#E8E4DC] p-6 bg-white">
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
                <p className="text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-3">Время</p>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-3 text-sm border transition-all duration-200 ${
                        selectedTime === t
                          ? "border-[#8B7355] bg-[#8B7355] text-white"
                          : "border-[#E8E4DC] text-[#1A1A1A] hover:border-[#8B7355]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-start justify-center py-12">
                <div className="w-12 h-12 border border-[#8B7355] flex items-center justify-center mb-6">
                  <Icon name="Check" size={20} className="text-[#8B7355]" />
                </div>
                <h3 className="font-cormorant text-3xl text-[#1A1A1A] mb-3">Заявка отправлена</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  Мы свяжемся с вами в течение дня для подтверждения записи.
                </p>
                <div className="w-8 h-px bg-[#8B7355] mt-6" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-[#8B7355] block mb-2">Имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-[#E8E4DC] bg-white px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors duration-200 placeholder:text-[#C4B9A8]"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-[#8B7355] block mb-2">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-[#E8E4DC] bg-white px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors duration-200 placeholder:text-[#C4B9A8]"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-[#8B7355] block mb-2">Комментарий</label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={3}
                    className="w-full border border-[#E8E4DC] bg-white px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors duration-200 placeholder:text-[#C4B9A8] resize-none"
                    placeholder="Расскажите о вашем запросе..."
                  />
                </div>

                {date && selectedTime && (
                  <div className="border-l-2 border-[#8B7355] pl-4 py-1">
                    <p className="text-xs text-[#8B7355] tracking-wider">
                      {date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} · {selectedTime}
                      {selectedService && ` · ${SERVICES.find((s) => s.id === selectedService)?.label}`}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#8B7355] transition-colors duration-300"
                >
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="border-t border-[#E8E4DC] px-6 py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-4">Адрес</p>
            <p className="font-cormorant text-xl text-[#1A1A1A]">Москва</p>
            <p className="text-sm text-[#6B6B6B] mt-1">ул. Пример, 12</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-4">Контакты</p>
            <a
              href="tel:+79001234567"
              className="font-cormorant text-xl text-[#1A1A1A] hover:text-[#8B7355] transition-colors block"
            >
              +7 (900) 123-45-67
            </a>
            <a
              href="mailto:hello@studio.ru"
              className="text-sm text-[#6B6B6B] hover:text-[#8B7355] transition-colors block mt-1"
            >
              hello@studio.ru
            </a>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-4">Соцсети</p>
            <div className="flex gap-5 flex-wrap">
              <a href="#" className="flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors group">
                <Icon name="Instagram" size={16} />
                <span className="group-hover:underline underline-offset-4">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors group">
                <Icon name="Send" size={16} />
                <span className="group-hover:underline underline-offset-4">Telegram</span>
              </a>
            </div>
            <a href="#" className="flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors group mt-3">
              <Icon name="Youtube" size={16} />
              <span className="group-hover:underline underline-offset-4">YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8E4DC] px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-lg text-[#1A1A1A]">Студия</span>
          <p className="text-xs text-[#C4B9A8] tracking-wider">© 2026 — Все права защищены</p>
        </div>
      </footer>

    </div>
  );
}
