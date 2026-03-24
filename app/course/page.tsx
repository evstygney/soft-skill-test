import Link from "next/link";

export default function CoursePage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[32px] border border-white/70 bg-hero-glow card-surface px-6 py-8 shadow-card sm:px-10">
          <div className="inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-ink/60">
            ПСИвИт • Мягкие навыки
          </div>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-none text-ink sm:text-5xl">
            Программа, которая переводит вывод из симулятора в реальные разговоры
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-ink/72 sm:text-lg">
            Этот экран можно использовать как промежуточный продуктовый шаг между симулятором и
            реальной продающей страницей курса. Здесь уже есть взрослое позиционирование, структура
            программы и понятная точка для дальнейшей интеграции формы или внешней ссылки.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-pine"
            >
              Вернуться в симулятор
            </Link>
            <a
              href="#program"
              className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white/80 px-6 py-4 text-sm font-semibold text-ink transition hover:bg-sand"
            >
              Посмотреть структуру программы
            </a>
          </div>
        </header>

        <section id="program" className="grid gap-5 lg:grid-cols-[1fr_0.92fr]">
          <article className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-card">
            <div className="text-xs uppercase tracking-[0.22em] text-ink/50">Что внутри программы</div>
          <div className="mt-5 space-y-4">
              {[
                "Как говорить о проблеме без лишней жесткости и без самосдачи.",
                "Как держать границы в коммуникации с руководителем, коллегой и командой.",
                "Как давать сложную обратную связь так, чтобы после нее работа продолжалась.",
                "Как выдерживать обесценивание, перебивания и позиционное давление.",
                "Как строить влияние в разговоре, а не просто правильно подбирать слова."
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-ink/10 bg-ivory p-4 text-sm leading-6 text-ink/75">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-ink/10 bg-ink p-6 text-white shadow-card">
            <div className="text-xs uppercase tracking-[0.22em] text-white/55">Как превратить этот шаг в заявку</div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/78">
              <p>Сейчас это внутренняя страница программы, на которую уже можно вести из результата симулятора.</p>
              <p>Следующим шагом сюда стоит подключить один из трех вариантов: реальную ссылку на курс, форму заявки или ссылку на бота в Телеграме.</p>
              <p>До подключения системы учета заявок эта страница уже работает как связующий шаг: пользователь не упирается в заглушку, а попадает в логичное продолжение продукта.</p>
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-white/55">Рекомендуемое следующее обновление</div>
              <p className="mt-3 text-sm leading-6 text-white/82">
                Заменить переход сюда на реальную продающую страницу или встроить форму “оставить контакт и получить программу”.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
