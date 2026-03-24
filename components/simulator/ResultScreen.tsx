import Link from "next/link";

import { getStyleShare } from "@/lib/simulator";
import { CommunicationStyle, ResultEvidenceItem, StyleProfile, StyleScoreMap } from "@/types/simulator";

interface ResultScreenProps {
  profile: StyleProfile;
  primaryStyle: CommunicationStyle;
  secondaryStyle: CommunicationStyle;
  closeResult: boolean;
  scores: StyleScoreMap;
  evidenceItems: ResultEvidenceItem[];
  courseLink: string;
  onRestart: () => void;
}

const styleLabels = {
  avoiding: "Избегающий",
  defensive: "Защитный",
  mature: "Зрелый"
};

export function ResultScreen({
  profile,
  primaryStyle,
  secondaryStyle,
  closeResult,
  scores,
  evidenceItems,
  courseLink,
  onRestart
}: ResultScreenProps) {
  const nuanceText = closeResult
    ? `У вас не плоский профиль: ведущий стиль — ${styleLabels[primaryStyle]}, но рядом заметно проявляется и ${styleLabels[secondaryStyle].toLowerCase()} паттерн.`
    : `Ведущий стиль — ${styleLabels[primaryStyle]}. Вторым по силе у вас идет ${styleLabels[secondaryStyle].toLowerCase()} паттерн.`;

  return (
    <section className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-card backdrop-blur xl:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-clay/30 bg-clay/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-clay">
            {profile.badge}
          </div>
          <div className="space-y-4">
            <h2 className="font-serif text-4xl leading-none text-ink sm:text-5xl">{profile.title}</h2>
            <p className="text-lg leading-8 text-ink/75">{profile.summary}</p>
            <p className="text-sm leading-7 text-ink/60">{profile.lifePattern}</p>
          </div>
          <div className="rounded-[28px] border border-clay/20 bg-clay/10 p-5 text-sm leading-6 text-ink/72">
            {nuanceText}
          </div>

          <div className="rounded-[28px] border border-ink/10 bg-sand/70 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-ink/50">Ваш баланс стилей</div>
            <div className="mt-5 space-y-4">
              {(Object.keys(styleLabels) as Array<keyof typeof styleLabels>).map((style) => (
                <div key={style} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-ink/70">
                    <span>{styleLabels[style]}</span>
                    <span>{getStyleShare(scores, style)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-clay to-sage"
                      style={{ width: `${getStyleShare(scores, style)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[28px] border border-ink/10 bg-ivory p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-ink/50">Чем мешает</div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/70">
                {profile.blockers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-[28px] border border-ink/10 bg-ivory p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-ink/50">Сильные стороны</div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/70">
                {profile.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="rounded-[28px] border border-ink/10 bg-sand/45 p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-ink/50">На чем держится результат</div>
            <div className="mt-4 space-y-4">
              {evidenceItems.map((item) => (
                <div key={item.scenarioId} className="rounded-[22px] border border-white/70 bg-white/80 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-ink/45">{item.scenarioTitle}</div>
                  <p className="mt-2 text-sm leading-6 text-ink/80">{item.optionText}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/62">{item.comment}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-pine/10 bg-pine p-6 text-white">
            <div className="text-xs uppercase tracking-[0.22em] text-white/60">Что развивать</div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
              {profile.growthFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-white/80">{profile.bridge}</p>
          </article>

          <article className="rounded-[28px] border border-ink/10 bg-ink p-6 text-white">
            <div className="text-xs uppercase tracking-[0.22em] text-white/55">Следующий шаг</div>
            <h3 className="mt-3 font-serif text-3xl leading-none">Теперь это можно не просто понять, а перестроить</h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/78">
              Программа ПСИвИт по мягким навыкам переводит этот вывод в практику: как говорить о
              неудобном, держать границы, давать обратную связь и не проваливаться ни в уступчивость,
              ни в жесткую защиту.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={courseLink}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:bg-sand"
              >
                Посмотреть программу
              </Link>
              <button
                type="button"
                onClick={onRestart}
                className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Пройти заново
              </button>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
