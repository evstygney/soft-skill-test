import simulatorContentData from "@/data/simulator-content.json";
import { siteContent } from "@/data/site-content";
import { Scenario, StyleProfile } from "@/types/simulator";

const simulatorContent = simulatorContentData as {
  scenarios: Scenario[];
  styleProfiles: Record<StyleProfile["style"], StyleProfile>;
};

export const scenarios = simulatorContent.scenarios;
export const styleProfiles = simulatorContent.styleProfiles;
export const courseLink = siteContent.links.course;
