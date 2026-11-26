# NusaData — Indonesia in numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/berkahmuse/national-stats-berkahmuse-2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/berkahmuse/national-stats-berkahmuse-2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An independent national statistics site for Indonesia — population, economy,
education, health and work — with every figure sourced and dated. Built for the
[make.fun bounty “Make the best national statistics site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

A working statistics site that runs entirely from its own files: no build step,
no network requests, on desktop and on a phone. Seven sections, all reachable
by links:

- **Overview** — the country at a glance, with a switchable chart (GDP growth,
  population, inflation, poverty, 2015–2024).
- **Economy** — headline indicators for 2022/2023/2024, GDP by sector and by
  expenditure, trade and money.
- **People & places** — population trend, age structure, and a sortable,
  searchable, filterable table of the 11 largest provinces.
- **Education** — literacy, years of schooling, enrolment.
- **Health** — life expectancy, mortality, stunting, care capacity.
- **Work** — unemployment (rate and yearly change), participation, informal
  employment.
- **Sources & methods** — where every figure comes from.

Every figure names its publisher and year where it appears. Sources include
Statistics Indonesia (BPS), the World Bank, the IMF, UNDP, WHO, and
Indonesia's Ministry of Health. The site is not affiliated with BPS or any
government body.

## Run it

```sh
node serve.ts            # serves app/ at http://localhost:8081
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the vendored `vendor/makefun-frontend.ts` library.

## License

MIT — see [LICENSE](LICENSE).
