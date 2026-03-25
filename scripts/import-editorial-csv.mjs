import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const csvPath = process.argv[2]
  ? path.resolve(projectRoot, process.argv[2])
  : path.join(projectRoot, "docs", "redakturnyy-paket-simulyatora.csv");

const simulatorContentPath = path.join(projectRoot, "data", "simulator-content.json");
const siteContentPath = path.join(projectRoot, "data", "site-content.json");

const styleMap = {
  Избегающий: "avoiding",
  Защитный: "defensive",
  Зрелый: "mature"
};

const profileMap = {
  "1": "avoiding",
  "2": "defensive",
  "3": "mature"
};

function parseCsv(content) {
  const normalized = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const lines = normalized.split("\n").filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return [];
  }

  const headers = splitSemicolonLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const cells = splitSemicolonLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = (cells[index] ?? "").trim();
      return row;
    }, {});
  });
}

function splitSemicolonLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ";" && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function buildSimulatorContent(rows, currentContent) {
  const simulatorRows = rows.filter((row) => row.section === "simulator" && row.item_type === "option");
  const groupedScenes = new Map();

  for (const row of simulatorRows) {
    const key = row.scene_no;
    const currentScene = groupedScenes.get(key) ?? {
      scene_no: key,
      title: row.scene_title,
      context: row.context,
      prompt: row.prompt,
      options: []
    };

    currentScene.options.push(row);
    groupedScenes.set(key, currentScene);
  }

  const orderedSceneKeys = [...groupedScenes.keys()].sort((left, right) => Number(left) - Number(right));

  const scenarios = orderedSceneKeys.map((sceneNo, index) => {
    const groupedScene = groupedScenes.get(sceneNo);
    const existingScene = currentContent.scenarios[index];

    const options = groupedScene.options
      .sort((left, right) => Number(left.option_no) - Number(right.option_no))
      .map((optionRow, optionIndex) => {
        const existingOption = existingScene?.options?.[optionIndex];
        const style = styleMap[optionRow.style];

        if (!style) {
          throw new Error(`Неизвестный тип ответа в CSV: ${optionRow.style}`);
        }

        return {
          id: existingOption?.id ?? `scene-${sceneNo}-option-${optionRow.option_no}`,
          text: optionRow.option_text,
          style,
          weight: Number(optionRow.weight),
          comment: optionRow.comment
        };
      });

    return {
      id: existingScene?.id ?? `scene-${sceneNo.padStart(2, "0")}`,
      title: groupedScene.title,
      context: groupedScene.context,
      prompt: groupedScene.prompt,
      options
    };
  });

  const profileRows = rows.filter((row) => row.section === "profiles" && row.item_type === "profile");
  const groupedProfiles = new Map();

  for (const row of profileRows) {
    const key = row.profile_id;
    const currentProfile = groupedProfiles.get(key) ?? [];
    currentProfile.push(row);
    groupedProfiles.set(key, currentProfile);
  }

  const styleProfiles = Object.entries(profileMap).reduce((accumulator, [profileId, style]) => {
    const rowsForProfile = groupedProfiles.get(profileId) ?? [];
    const existingProfile = currentContent.styleProfiles[style];
    const groupedByPart = rowsForProfile.reduce((parts, row) => {
      const list = parts.get(row.profile_part) ?? [];
      list.push(row.profile_text);
      parts.set(row.profile_part, list);
      return parts;
    }, new Map());

    accumulator[style] = {
      style,
      badge: existingProfile?.badge ?? `Профиль ${profileId.padStart(2, "0")}`,
      title: rowsForProfile[0]?.profile_title ?? existingProfile?.title ?? "",
      summary: groupedByPart.get("Краткое описание")?.[0] ?? existingProfile?.summary ?? "",
      lifePattern: groupedByPart.get("Как это выглядит в жизни")?.[0] ?? existingProfile?.lifePattern ?? "",
      blockers: groupedByPart.get("Чем мешает") ?? existingProfile?.blockers ?? [],
      strengths: groupedByPart.get("Сильные стороны") ?? existingProfile?.strengths ?? [],
      growthFocus: groupedByPart.get("Что развивать") ?? existingProfile?.growthFocus ?? [],
      bridge: groupedByPart.get("Мягкий вывод")?.[0] ?? existingProfile?.bridge ?? ""
    };

    return accumulator;
  }, {});

  return {
    scenarios,
    styleProfiles
  };
}

function patchSiteContent(rows, currentContent) {
  const ctaRows = rows.filter((row) => row.section === "cta" && row.item_type === "copy");
  const findOne = (block, field) => ctaRows.find((row) => row.cta_block === block && row.cta_field === field)?.cta_text;
  const findMany = (block, field) =>
    ctaRows.filter((row) => row.cta_block === block && row.cta_field === field).map((row) => row.cta_text);

  return {
    ...currentContent,
    result: {
      ...currentContent.result,
      nextStepTitle: findOne("Экран результата", "Заголовок") ?? currentContent.result.nextStepTitle,
      nextStepText: findOne("Экран результата", "Текст") ?? currentContent.result.nextStepText,
      primaryButton: findOne("Экран результата", "Кнопка") ?? currentContent.result.primaryButton
    },
    course: {
      ...currentContent.course,
      title: findOne("Экран программы", "Заголовок") ?? currentContent.course.title,
      description: findOne("Экран программы", "Вводный текст") ?? currentContent.course.description,
      programItems: findMany("Экран программы", "Что внутри программы").length
        ? findMany("Экран программы", "Что внутри программы")
        : currentContent.course.programItems,
      sidebarParagraphs: findMany("Экран программы", "Правый информационный блок").length
        ? findMany("Экран программы", "Правый информационный блок")
        : currentContent.course.sidebarParagraphs,
      updateText:
        findOne("Экран программы", "Рекомендуемое следующее обновление") ?? currentContent.course.updateText
    }
  };
}

if (!fs.existsSync(csvPath)) {
  throw new Error(`CSV-файл не найден: ${csvPath}`);
}

const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));
const currentSimulatorContent = readJson(simulatorContentPath);
const currentSiteContent = readJson(siteContentPath);

const simulatorContent = buildSimulatorContent(rows, currentSimulatorContent);
const siteContent = patchSiteContent(rows, currentSiteContent);

writeJson(simulatorContentPath, simulatorContent);
writeJson(siteContentPath, siteContent);

console.log("CSV импортирован в data/simulator-content.json и data/site-content.json");
