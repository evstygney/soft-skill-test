# ПСИвИт — симулятор мягких навыков

Локальный MVP интерактивного симулятора сложных разговоров для ПСИвИт.

## Что внутри

- `app/` — страницы, layout и глобальные стили.
- `components/simulator/` — экраны симулятора и клиентская логика прохождения.
- `data/simulator-content.json` — сценарии, варианты ответов, веса и профили результата.
- `data/site-content.json` — welcome-экран, страница программы, CTA-тексты и ссылки.
- `data/scenarios.ts` и `data/site-content.ts` — тонкие обертки над JSON для типизированного импорта в приложение.
- `scripts/import-editorial-csv.mjs` — импорт редакторского CSV обратно в JSON проекта.
- `docs/` — редакторские материалы и инструкции.

## Как запустить

```bash
npm install
npm run dev
```

Открыть: [http://localhost:3000](http://localhost:3000)

Если dev-кэш Next.js сломался:

```bash
npm run reset-dev
```

## Как собрать билд

```bash
npm run build
npm run start
```

## Как теперь редактировать контент

### Вариант 1. Править напрямую в JSON

- Сценарии, ответы, веса и профили: [simulator-content.json](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/data/simulator-content.json)
- Тексты экранов и ссылки кнопок: [site-content.json](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/data/site-content.json)

### Вариант 2. Править в CSV и импортировать обратно

Редакторский CSV:
- [redakturnyy-paket-simulyatora.csv](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/docs/redakturnyy-paket-simulyatora.csv)

Импорт:

```bash
npm run content:import-csv
```

Если CSV лежит в другом месте:

```bash
npm run content:import-csv -- path/to/file.csv
```

## Основные документы

- Инструкция по редактированию: [kak-redaktirovat-kontent.md](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/docs/kak-redaktirovat-kontent.md)
- Редакторский пакет в Markdown: [redakturnyy-paket-simulyatora.md](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/docs/redakturnyy-paket-simulyatora.md)
- Редакторский пакет в CSV: [redakturnyy-paket-simulyatora.csv](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/docs/redakturnyy-paket-simulyatora.csv)

## Логика MVP

- 20 рабочих сцен.
- 3 стиля коммуникации: `avoiding`, `defensive`, `mature`.
- Каждый ответ добавляет очки одному стилю и увеличивает счетчик выбора этого паттерна.
- Итоговый профиль считается по очкам, затем по количеству выборов.
