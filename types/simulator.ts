export type CommunicationStyle = "avoiding" | "defensive" | "mature";

export interface ScenarioOption {
  id: string;
  text: string;
  style: CommunicationStyle;
  weight: number;
  comment: string;
}

export interface Scenario {
  id: string;
  title: string;
  context: string;
  prompt: string;
  options: ScenarioOption[];
}

export interface StyleScoreMap {
  avoiding: number;
  defensive: number;
  mature: number;
}

export interface StyleCountMap {
  avoiding: number;
  defensive: number;
  mature: number;
}

export interface StyleProfile {
  style: CommunicationStyle;
  badge: string;
  title: string;
  summary: string;
  lifePattern: string;
  blockers: string[];
  strengths: string[];
  growthFocus: string[];
  bridge: string;
}

export interface ResultEvidenceItem {
  scenarioId: string;
  scenarioTitle: string;
  optionText: string;
  comment: string;
  style: CommunicationStyle;
  weight: number;
}

export interface StyleAssessment {
  primary: CommunicationStyle;
  secondary: CommunicationStyle;
  scores: StyleScoreMap;
  counts: StyleCountMap;
  closeResult: boolean;
}
