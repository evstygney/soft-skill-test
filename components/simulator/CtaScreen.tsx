import { siteContent } from "@/data/site-content";

interface CtaScreenProps {
  courseLink: string;
  onRestart: () => void;
}

export function CtaScreen({ courseLink, onRestart }: CtaScreenProps) {
  const content = siteContent.legacyCta;

  return (
    <section className="rounded-[32px] border border-white/70 bg-gradient-to-br from-ink via-pine to-pine p-6 text-white shadow-card xl:p-8">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
          {content.eyebrow}
        </div>
        <div className="space-y-5">
          <h2 className="font-serif text-4xl leading-none sm:text-5xl">{content.title}</h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{content.description}</p>
        </div>

        <div className="grid gap-4 text-left sm:grid-cols-3">
          {content.cards.map((card) => (
            <div key={card.title} className="rounded-[24px] border border-white/10 bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">{card.title}</div>
              <p className="mt-3 text-sm leading-6 text-white/80">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={courseLink}
            className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:bg-sand"
          >
            {content.primaryButton}
          </a>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            {content.secondaryButton}
          </button>
        </div>

        <p className="text-xs leading-6 text-white/50">{content.helperText}</p>
      </div>
    </section>
  );
}
