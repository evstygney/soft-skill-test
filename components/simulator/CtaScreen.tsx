interface CtaScreenProps {
  courseLink: string;
  onRestart: () => void;
}

export function CtaScreen({ courseLink, onRestart }: CtaScreenProps) {
  return (
    <section className="rounded-[32px] border border-white/70 bg-gradient-to-br from-ink via-pine to-pine p-6 text-white shadow-card xl:p-8">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
          Следующий шаг
        </div>
        <div className="space-y-5">
          <h2 className="font-serif text-4xl leading-none sm:text-5xl">
            Одного инсайта мало, если в нужный момент вы все равно говорите по-старому
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Курс ПСИвИт по мягким навыкам помогает не просто понимать свой паттерн, а перестраивать его
            в живых рабочих диалогах: с руководителем, коллегами, командой и в напряженных моментах,
            где обычно включается автоматизм.
          </p>
        </div>

        <div className="grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-white/10 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/60">На курсе</div>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Вы получите язык для сложных разговоров, а не набор красивых формулировок без опоры.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/10 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/60">Фокус</div>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Границы, обратная связь, влияние, конфликты и спокойная уверенность без жесткости.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/10 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/60">Для кого</div>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Для специалистов, менеджеров, кадровых специалистов и руководителей, которым важно разговаривать взросло и результативно.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={courseLink}
            className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:bg-sand"
          >
            Перейти к программе обучения
          </a>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Пройти симулятор заново
          </button>
        </div>

        <p className="text-xs leading-6 text-white/50">
          В `data/scenarios.ts` можно заменить `courseLink` на реальную ссылку курса без изменений UI.
        </p>
      </div>
    </section>
  );
}
