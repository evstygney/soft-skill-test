# Короткий порядок работы с контентом

## Если правим у редакторов

1. Открыть файл [redakturnyy-paket-simulyatora.csv](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/docs/redakturnyy-paket-simulyatora.csv).
2. Внести правки в вопросы, ответы, профили или тексты программы.
3. Сохранить CSV в той же структуре.
4. Выполнить:

```bash
npm run content:import-csv
```

5. Проверить сайт локально:

```bash
npm run dev
```

6. Проверить сборку:

```bash
npm run build
```

## Если правим напрямую в проекте

1. Менять [simulator-content.json](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/data/simulator-content.json) и [site-content.json](/C:/Users/evstygney/Documents/Контент-план/psyvit-soft-skills-simulator/data/site-content.json).
2. После ручных правок обновить редакторский CSV:

```bash
npm run content:export-csv
```

3. Проверить сайт:

```bash
npm run build
```

## Если Next.js ведет себя странно

```bash
npm run reset-dev
```
