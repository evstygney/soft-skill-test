import { styleProfiles } from "@/data/scenarios";
import {
  CommunicationStyle,
  ResultEvidenceItem,
  Scenario,
  StyleAssessment,
  StyleCountMap,
  StyleProfile,
  StyleScoreMap
} from "@/types/simulator";

export const initialScores = (): StyleScoreMap => ({
  avoiding: 0,
  defensive: 0,
  mature: 0
});

export const initialCounts = (): StyleCountMap => ({
  avoiding: 0,
  defensive: 0,
  mature: 0
});

export function buildScores(
  scenarios: Scenario[],
  answers: Record<string, string>
): StyleScoreMap {
  return scenarios.reduce((scores, scenario) => {
    const selectedOptionId = answers[scenario.id];

    if (!selectedOptionId) {
      return scores;
    }

    const option = scenario.options.find((item) => item.id === selectedOptionId);

    if (!option) {
      return scores;
    }

    scores[option.style] += option.weight;
    return scores;
  }, initialScores());
}

export function buildCounts(
  scenarios: Scenario[],
  answers: Record<string, string>
): StyleCountMap {
  return scenarios.reduce((counts, scenario) => {
    const selectedOptionId = answers[scenario.id];

    if (!selectedOptionId) {
      return counts;
    }

    const option = scenario.options.find((item) => item.id === selectedOptionId);

    if (!option) {
      return counts;
    }

    counts[option.style] += 1;
    return counts;
  }, initialCounts());
}

const stylePriority: CommunicationStyle[] = ["mature", "defensive", "avoiding"];

export function getStyleAssessment(
  scenarios: Scenario[],
  answers: Record<string, string>
): StyleAssessment {
  const scores = buildScores(scenarios, answers);
  const counts = buildCounts(scenarios, answers);

  const ranked = [...stylePriority].sort((left, right) => {
    if (scores[right] !== scores[left]) {
      return scores[right] - scores[left];
    }

    if (counts[right] !== counts[left]) {
      return counts[right] - counts[left];
    }

    return stylePriority.indexOf(left) - stylePriority.indexOf(right);
  });

  const [primary, secondary] = ranked;
  const scoreGap = scores[primary] - scores[secondary];
  const countGap = counts[primary] - counts[secondary];

  return {
    primary,
    secondary,
    scores,
    counts,
    closeResult: scoreGap <= 1 && countGap <= 1
  };
}

export function getDominantStyle(scores: StyleScoreMap, counts?: StyleCountMap): CommunicationStyle {
  const safeCounts = counts ?? initialCounts();

  return [...stylePriority].sort((left, right) => {
    if (scores[right] !== scores[left]) {
      return scores[right] - scores[left];
    }

    if (safeCounts[right] !== safeCounts[left]) {
      return safeCounts[right] - safeCounts[left];
    }

    return stylePriority.indexOf(left) - stylePriority.indexOf(right);
  })[0];
}

export function getStyleProfile(scores: StyleScoreMap, counts?: StyleCountMap): StyleProfile {
  return styleProfiles[getDominantStyle(scores, counts)];
}

export function getStyleShare(scores: StyleScoreMap, style: CommunicationStyle): number {
  const total = scores.avoiding + scores.defensive + scores.mature;

  if (total === 0) {
    return 0;
  }

  return Math.round((scores[style] / total) * 100);
}

export function getEvidenceItems(
  scenarios: Scenario[],
  answers: Record<string, string>,
  primaryStyle: CommunicationStyle
): ResultEvidenceItem[] {
  const selected = scenarios.flatMap((scenario) => {
    const optionId = answers[scenario.id];
    const option = scenario.options.find((item) => item.id === optionId);

    if (!option) {
      return [];
    }

    return [
      {
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        optionText: option.text,
        comment: option.comment,
        style: option.style,
        weight: option.weight
      }
    ];
  });

  const primaryMatches = selected
    .filter((item) => item.style === primaryStyle)
    .sort((left, right) => right.weight - left.weight);

  const contrastItems = selected
    .filter((item) => item.style !== primaryStyle)
    .sort((left, right) => right.weight - left.weight);

  return [...primaryMatches.slice(0, 2), ...contrastItems.slice(0, 1)].slice(0, 3);
}
