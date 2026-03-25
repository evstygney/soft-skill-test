import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const outputPath = process.argv[2]
  ? path.resolve(projectRoot, process.argv[2])
  : path.join(projectRoot, "docs", "redakturnyy-paket-simulyatora.csv");

const simulatorContentPath = path.join(projectRoot, "data", "simulator-content.json");
const siteContentPath = path.join(projectRoot, "data", "site-content.json");

const header = [
  "section",
  "item_type",
  "scene_no",
  "scene_title",
  "context",
  "prompt",
  "option_no",
  "option_text",
  "style",
  "weight",
  "comment",
  "profile_id",
  "profile_title",
  "profile_part",
  "profile_text",
  "cta_block",
  "cta_field",
  "cta_text",
  "editor_comment"
];

const styleLabelMap = {
  avoiding: "Избегающий",
  defensive: "Защитный",
  mature: "Зрелый"
};

const profileIdMap = {
  avoiding: "1",
  defensive: "2",
  mature: "3"
};

const profileOrder = ["avoiding", "defensive", "mature"];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function createRow(values) {
  return header.map((key) => escapeCell(values[key] ?? "")).join(";");
}

function escapeCell(value) {
  const text = String(value);

  if (/[;"\n\r]/.test(text)) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }

  return text;
}

function buildScenarioRows(simulatorContent) {
  return simulatorContent.scenarios.flatMap((scenario, sceneIndex) =>
    scenario.options.map((option, optionIndex) =>
      createRow({
        section: "simulator",
        item_type: "option",
        scene_no: String(sceneIndex + 1),
        scene_title: scenario.title,
        context: scenario.context,
        prompt: scenario.prompt,
        option_no: String(optionIndex + 1),
        option_text: option.text,
        style: styleLabelMap[option.style],
        weight: String(option.weight),
        comment: option.comment
      })
    )
  );
}

function buildProfileRows(simulatorContent) {
  const rows = [];

  for (const style of profileOrder) {
    const profile = simulatorContent.styleProfiles[style];
    const profileId = profileIdMap[style];

    rows.push(
      createRow({
        section: "profiles",
        item_type: "profile",
        profile_id: profileId,
        profile_title: profile.title,
        profile_part: "Краткое описание",
        profile_text: profile.summary
      })
    );

    rows.push(
      createRow({
        section: "profiles",
        item_type: "profile",
        profile_id: profileId,
        profile_title: profile.title,
        profile_part: "Как это выглядит в жизни",
        profile_text: profile.lifePattern
      })
    );

    for (const text of profile.blockers) {
      rows.push(
        createRow({
          section: "profiles",
          item_type: "profile",
          profile_id: profileId,
          profile_title: profile.title,
          profile_part: "Чем мешает",
          profile_text: text
        })
      );
    }

    for (const text of profile.strengths) {
      rows.push(
        createRow({
          section: "profiles",
          item_type: "profile",
          profile_id: profileId,
          profile_title: profile.title,
          profile_part: "Сильные стороны",
          profile_text: text
        })
      );
    }

    for (const text of profile.growthFocus) {
      rows.push(
        createRow({
          section: "profiles",
          item_type: "profile",
          profile_id: profileId,
          profile_title: profile.title,
          profile_part: "Что развивать",
          profile_text: text
        })
      );
    }

    rows.push(
      createRow({
        section: "profiles",
        item_type: "profile",
        profile_id: profileId,
        profile_title: profile.title,
        profile_part: "Мягкий вывод",
        profile_text: profile.bridge
      })
    );
  }

  return rows;
}

function buildCtaRows(siteContent) {
  const rows = [];

  rows.push(
    createRow({
      section: "cta",
      item_type: "copy",
      cta_block: "Экран результата",
      cta_field: "Заголовок",
      cta_text: siteContent.result.nextStepTitle
    })
  );
  rows.push(
    createRow({
      section: "cta",
      item_type: "copy",
      cta_block: "Экран результата",
      cta_field: "Текст",
      cta_text: siteContent.result.nextStepText
    })
  );
  rows.push(
    createRow({
      section: "cta",
      item_type: "copy",
      cta_block: "Экран результата",
      cta_field: "Кнопка",
      cta_text: siteContent.result.primaryButton
    })
  );

  rows.push(
    createRow({
      section: "cta",
      item_type: "copy",
      cta_block: "Экран программы",
      cta_field: "Заголовок",
      cta_text: siteContent.course.title
    })
  );
  rows.push(
    createRow({
      section: "cta",
      item_type: "copy",
      cta_block: "Экран программы",
      cta_field: "Вводный текст",
      cta_text: siteContent.course.description
    })
  );

  for (const item of siteContent.course.programItems) {
    rows.push(
      createRow({
        section: "cta",
        item_type: "copy",
        cta_block: "Экран программы",
        cta_field: "Что внутри программы",
        cta_text: item
      })
    );
  }

  for (const paragraph of siteContent.course.sidebarParagraphs) {
    rows.push(
      createRow({
        section: "cta",
        item_type: "copy",
        cta_block: "Экран программы",
        cta_field: "Правый информационный блок",
        cta_text: paragraph
      })
    );
  }

  rows.push(
    createRow({
      section: "cta",
      item_type: "copy",
      cta_block: "Экран программы",
      cta_field: "Рекомендуемое следующее обновление",
      cta_text: siteContent.course.updateText
    })
  );

  return rows;
}

const simulatorContent = readJson(simulatorContentPath);
const siteContent = readJson(siteContentPath);

const rows = [
  header.join(";"),
  ...buildScenarioRows(simulatorContent),
  ...buildProfileRows(simulatorContent),
  ...buildCtaRows(siteContent)
];

fs.writeFileSync(outputPath, `\uFEFF${rows.join("\n")}\n`, "utf8");

console.log(`CSV экспортирован в ${path.relative(projectRoot, outputPath)}`);
