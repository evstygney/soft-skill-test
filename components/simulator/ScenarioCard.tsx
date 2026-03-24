import clsx from "clsx";

import { Scenario } from "@/types/simulator";

interface ScenarioCardProps {
  scenario: Scenario;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export function ScenarioCard({
  scenario,
  selectedOptionId,
  onSelect,
  onNext,
  currentStep,
  totalSteps
}: ScenarioCardProps) {
  const selectedOption = scenario.options.find((option) => option.id === selectedOptionId);

  return (
    <section className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-card backdrop-blur xl:p-8">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-clay/30 bg-clay/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-clay">
            Сцена {currentStep}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-ink/40">
            {totalSteps} эпизодов в симуляторе
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">{scenario.title}</h2>
          <p className="max-w-3xl text-base leading-7 text-ink/70">{scenario.context}</p>
          <div className="rounded-[28px] border border-ink/10 bg-ink px-5 py-5 text-base leading-7 text-white sm:px-6">
            {scenario.prompt}
          </div>
        </div>

        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isSelected = option.id === selectedOptionId;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className={clsx(
                  "w-full rounded-[24px] border px-5 py-4 text-left text-sm leading-6 transition sm:text-[15px]",
                  isSelected
                    ? "border-pine bg-pine text-white shadow-lg"
                    : "border-ink/10 bg-white/80 text-ink hover:border-clay/40 hover:bg-sand"
                )}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        <div className="rounded-[28px] border border-dashed border-ink/10 bg-sand/50 p-5">
          {selectedOption ? (
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-ink/50">Психологический комментарий</div>
                <p className="mt-3 text-sm leading-6 text-ink/70">{selectedOption.comment}</p>
              </div>
              <button
                type="button"
                onClick={onNext}
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine"
              >
                {currentStep === totalSteps ? "Посмотреть результат" : "Следующий сценарий"}
              </button>
            </div>
          ) : (
            <p className="text-sm leading-6 text-ink/50">
              Выберите тот ответ, который ближе к вашему реальному поведению, а не к идеальному.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
