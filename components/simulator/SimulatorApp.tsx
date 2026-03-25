"use client";

import { startTransition, useState } from "react";

import { siteContent } from "@/data/site-content";
import { courseLink, scenarios } from "@/data/scenarios";
import { getEvidenceItems, getStyleAssessment, getStyleProfile } from "@/lib/simulator";
import { ProgressBar } from "./ProgressBar";
import { ResultScreen } from "./ResultScreen";
import { ScenarioCard } from "./ScenarioCard";
import { WelcomeScreen } from "./WelcomeScreen";

type ScreenState = "welcome" | "scenarios" | "result";

export function SimulatorApp() {
  const [screen, setScreen] = useState<ScreenState>("welcome");
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalScenarios = scenarios.length;
  const currentScenario = scenarios[currentScenarioIndex];
  const assessment = getStyleAssessment(scenarios, answers);
  const profile = getStyleProfile(assessment.scores, assessment.counts);
  const evidenceItems = getEvidenceItems(scenarios, answers, assessment.primary);

  const handleStart = () => {
    startTransition(() => {
      setScreen("scenarios");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentScenario.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentScenarioIndex === totalScenarios - 1) {
      startTransition(() => {
        setScreen("result");
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    startTransition(() => {
      setCurrentScenarioIndex((prev) => prev + 1);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    startTransition(() => {
      setScreen("welcome");
      setCurrentScenarioIndex(0);
      setAnswers({});
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col justify-center gap-6">
        <header className="flex items-center justify-between px-1">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-ink/50">{siteContent.brand.name}</div>
            <div className="mt-2 font-serif text-2xl leading-none text-ink sm:text-3xl">
              {siteContent.brand.simulatorTitle}
            </div>
          </div>
          <div className="hidden rounded-full border border-ink/10 bg-white/65 px-4 py-2 text-xs text-ink/60 sm:block">
            {siteContent.brand.simulatorBadge}
          </div>
        </header>

        {screen === "welcome" ? (
          <WelcomeScreen totalScenarios={totalScenarios} onStart={handleStart} />
        ) : null}

        {screen === "scenarios" && currentScenario ? (
          <div className="space-y-5">
            <ProgressBar currentStep={currentScenarioIndex + 1} totalSteps={totalScenarios} />
            <ScenarioCard
              scenario={currentScenario}
              selectedOptionId={answers[currentScenario.id]}
              onSelect={handleSelectOption}
              onNext={handleNext}
              currentStep={currentScenarioIndex + 1}
              totalSteps={totalScenarios}
            />
          </div>
        ) : null}

        {screen === "result" ? (
          <ResultScreen
            profile={profile}
            primaryStyle={assessment.primary}
            secondaryStyle={assessment.secondary}
            closeResult={assessment.closeResult}
            scores={assessment.scores}
            evidenceItems={evidenceItems}
            courseLink={courseLink}
            onRestart={handleRestart}
          />
        ) : null}
      </div>
    </main>
  );
}
