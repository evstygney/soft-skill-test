import { siteContent } from "@/data/site-content";

interface WelcomeScreenProps {
  totalScenarios: number;
  onStart: () => void;
}

export function WelcomeScreen({ totalScenarios, onStart }: WelcomeScreenProps) {
  const content = siteContent.welcome;
  const description = content.description.replace("{totalScenarios}", String(totalScenarios));

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-hero-glow card-surface shadow-card">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay/40 to-transparent" />
      <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-14">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-ink/60">
            {content.badge}
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-serif text-4xl leading-none text-ink sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">{description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-ink/10 bg-white/70 p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-ink/50">{content.firstCardTitle}</div>
              <div className="mt-3 text-sm leading-6 text-ink/75">{content.firstCardText}</div>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-white/70 p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-ink/50">{content.secondCardTitle}</div>
              <div className="mt-3 text-sm leading-6 text-ink/75">{content.secondCardText}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[28px] border border-ink/10 bg-white/80 p-6">
          <div className="space-y-5">
            <div className="text-xs uppercase tracking-[0.24em] text-ink/50">{content.sideTitle}</div>
            <div className="space-y-4 text-sm leading-6 text-ink/70">
              {content.sideParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={onStart}
              className="w-full rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-pine"
            >
              {content.startButton}
            </button>
            <p className="text-center text-xs leading-5 text-ink/50">{content.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
