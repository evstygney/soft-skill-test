import Link from "next/link";

import { siteContent } from "@/data/site-content";

export default function CoursePage() {
  const { course, links } = siteContent;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[32px] border border-white/70 bg-hero-glow card-surface px-6 py-8 shadow-card sm:px-10">
          <div className="inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-ink/60">
            {course.badge}
          </div>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-none text-ink sm:text-5xl">{course.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-ink/72 sm:text-lg">{course.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={links.home}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-pine"
            >
              {course.backButton}
            </Link>
            <a
              href="#program"
              className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white/80 px-6 py-4 text-sm font-semibold text-ink transition hover:bg-sand"
            >
              {course.structureButton}
            </a>
          </div>
        </header>

        <section id="program" className="grid gap-5 lg:grid-cols-[1fr_0.92fr]">
          <article className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-card">
            <div className="text-xs uppercase tracking-[0.22em] text-ink/50">{course.programTitle}</div>
            <div className="mt-5 space-y-4">
              {course.programItems.map((item) => (
                <div key={item} className="rounded-[24px] border border-ink/10 bg-ivory p-4 text-sm leading-6 text-ink/75">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-ink/10 bg-ink p-6 text-white shadow-card">
            <div className="text-xs uppercase tracking-[0.22em] text-white/55">{course.sidebarTitle}</div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/78">
              {course.sidebarParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-white/55">{course.updateTitle}</div>
              <p className="mt-3 text-sm leading-6 text-white/82">{course.updateText}</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
