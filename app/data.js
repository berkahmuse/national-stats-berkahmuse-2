// NusaData — the numbers behind Indonesia.
// Every figure below carries its source and year where it is shown. Figures
// are as published by the source named beside them; where two publishers
// disagree (for example BPS and the World Bank on population), the page that
// shows the figure names the source it uses. All series are annual.

export const SITE = {
  name: "NusaData",
  tagline: "Indonesia in numbers",
  country: "Indonesia",
  updated: "26 November 2026",
  note: "An independent statistics site. Not affiliated with Statistics Indonesia (BPS) or any government body.",
};

export const HEADLINE = [
  { label: "Population", value: "283.5m", sub: "4th largest in the world", source: "World Bank WDI, 2024" },
  { label: "GDP", value: "$1.40tn", sub: "16th largest economy", source: "World Bank WDI, 2024" },
  { label: "GDP per capita", value: "$4,925", sub: "current US$, 2024", source: "World Bank WDI, 2024" },
  { label: "GDP growth", value: "5.03%", sub: "real, year on year", source: "BPS, 2024" },
  { label: "Poverty rate", value: "8.57%", sub: "national poverty line", source: "BPS, Sep 2024" },
  { label: "Life expectancy", value: "71.2 yrs", sub: "at birth", source: "World Bank WDI, 2023" },
];

// Annual series, 2015-2024. Sources named on the pages that chart them.
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 }, { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 }, { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.69 }, { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

export const POPULATION = [
  { year: 2015, value: 258 }, { year: 2016, value: 261 }, { year: 2017, value: 264 },
  { year: 2018, value: 267 }, { year: 2019, value: 270 }, { year: 2020, value: 272 },
  { year: 2021, value: 274 }, { year: 2022, value: 275 }, { year: 2023, value: 277 },
  { year: 2024, value: 282 },
];

export const INFLATION = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 }, { year: 2017, value: 3.61 },
  { year: 2018, value: 3.13 }, { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

export const POVERTY = [
  { year: 2015, value: 11.13 }, { year: 2016, value: 10.70 }, { year: 2017, value: 10.12 },
  { year: 2018, value: 9.66 }, { year: 2019, value: 9.22 }, { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 }, { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

export const UNEMPLOYMENT = [
  { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 }, { year: 2017, value: 5.50 },
  { year: 2018, value: 5.34 }, { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Headline indicators for the economy year switcher.
export const YEAR_HEADLINES = {
  2022: [
    { label: "GDP growth", value: "5.31%", sub: "real, year on year", source: "BPS, 2022" },
    { label: "Inflation (Dec, yoy)", value: "5.51%", sub: "consumer prices", source: "BPS, 2022" },
    { label: "Poverty rate", value: "9.57%", sub: "September", source: "BPS, 2022" },
    { label: "Unemployment", value: "5.86%", sub: "August", source: "BPS, 2022" },
    { label: "GDP", value: "$1.32tn", sub: "current US$", source: "World Bank, 2022" },
    { label: "GDP per capita", value: "$4,788", sub: "current US$", source: "World Bank, 2022" },
  ],
  2023: [
    { label: "GDP growth", value: "5.05%", sub: "real, year on year", source: "BPS, 2023" },
    { label: "Inflation (Dec, yoy)", value: "2.61%", sub: "consumer prices", source: "BPS, 2023" },
    { label: "Poverty rate", value: "9.36%", sub: "September", source: "BPS, 2023" },
    { label: "Unemployment", value: "5.32%", sub: "August", source: "BPS, 2023" },
    { label: "GDP", value: "$1.37tn", sub: "current US$", source: "World Bank, 2023" },
    { label: "GDP per capita", value: "$4,919", sub: "current US$", source: "World Bank, 2023" },
  ],
  2024: [
    { label: "GDP growth", value: "5.03%", sub: "real, year on year", source: "BPS, 2024" },
    { label: "Inflation (Dec, yoy)", value: "1.57%", sub: "consumer prices", source: "BPS, 2024" },
    { label: "Poverty rate", value: "8.57%", sub: "September", source: "BPS, 2024" },
    { label: "Unemployment", value: "4.91%", sub: "August", source: "BPS, 2024" },
    { label: "GDP", value: "$1.40tn", sub: "current US$", source: "World Bank, 2024" },
    { label: "GDP per capita", value: "$4,925", sub: "current US$", source: "World Bank, 2024" },
  ],
};

// GDP by sector, nominal, 2024. "Other services" is the residual to 100%:
// health and social services, arts and recreation, household services.
export const SECTORS = [
  { name: "Manufacturing", share: 19.0, value: 4202.9 },
  { name: "Wholesale & retail trade", share: 13.1, value: 2893.3 },
  { name: "Agriculture, forestry & fishing", share: 12.6, value: 2791.7 },
  { name: "Construction", share: 10.1, value: 2233.5 },
  { name: "Mining & quarrying", share: 9.2, value: 2026.6 },
  { name: "Transport & warehousing", share: 6.1, value: 1358.1 },
  { name: "Information & communication", share: 4.3, value: 960.0 },
  { name: "Financial services & insurance", share: 4.2, value: 922.8 },
  { name: "Public administration", share: 3.0, value: 673.5 },
  { name: "Education services", share: 2.8, value: 621.4 },
  { name: "Accommodation & food service", share: 2.6, value: 583.9 },
  { name: "Real estate", share: 2.4, value: 520.7 },
  { name: "Business services", share: 1.9, value: 424.2 },
  { name: "Electricity & gas", share: 1.0, value: 227.5 },
  { name: "Water supply & waste", share: 0.1, value: 14.3 },
  { name: "Other services", share: 7.6, value: 1684.6 },
];

// GDP by expenditure, 2024. The five parts do not sum to 100%: inventories
// and the statistical discrepancy make up the rest.
export const EXPENDITURE = [
  { name: "Household consumption", share: 54.0, source: "BPS, 2024" },
  { name: "Investment (fixed capital)", share: 29.1, source: "IMF WEO, 2024" },
  { name: "Exports of goods & services", share: 22.2, source: "World Bank, 2024" },
  { name: "Government consumption", share: 7.7, source: "IMF WEO, 2024" },
  { name: "Imports of goods & services", share: -20.4, source: "World Bank, 2024" },
];

export const TRADE = [
  { label: "Exports of goods", value: "$264.7bn", sub: "2024", source: "BPS, 2024" },
  { label: "Imports of goods", value: "$233.7bn", sub: "2024", source: "BPS, 2024" },
  { label: "Goods trade surplus", value: "$31.0bn", sub: "2024", source: "BPS, 2024" },
  { label: "Foreign direct investment", value: "$24.2bn", sub: "net inflows, 2024", source: "World Bank, 2024" },
  { label: "Government debt", value: "37.7%", sub: "of GDP, 2024", source: "IMF WEO, 2024" },
  { label: "GDP (PPP)", value: "$4.66tn", sub: "international $, 2024", source: "IMF WEO, 2024" },
];

// Age structure, 2024.
export const AGE_GROUPS = [
  { group: "0–14 years", pct: 24.6, people: "69.7m" },
  { group: "15–64 years", pct: 68.1, people: "193.1m" },
  { group: "65+ years", pct: 7.3, people: "20.7m" },
];

// Largest provinces by population, 2024 (BPS mid-year estimates).
// Share of the national total is computed from 283.5m.
export const PROVINCES = [
  { name: "West Java", island: "Java", pop: 50.3 },
  { name: "East Java", island: "Java", pop: 41.8 },
  { name: "Central Java", island: "Java", pop: 37.9 },
  { name: "North Sumatra", island: "Sumatra", pop: 15.6 },
  { name: "Banten", island: "Java", pop: 11.8 },
  { name: "Jakarta", island: "Java", pop: 11.1 },
  { name: "South Sulawesi", island: "Sulawesi", pop: 9.5 },
  { name: "Lampung", island: "Sumatra", pop: 9.4 },
  { name: "South Sumatra", island: "Sumatra", pop: 8.8 },
  { name: "Riau", island: "Sumatra", pop: 6.7 },
  { name: "West Sumatra", island: "Sumatra", pop: 5.8 },
];

export const DEMOGRAPHICS = [
  { label: "Population growth", value: "0.81%", sub: "annual, 2024", source: "World Bank, 2024" },
  { label: "Fertility rate", value: "2.13", sub: "births per woman, 2023", source: "World Bank, 2023" },
  { label: "Urban population", value: "58.8%", sub: "of total, 2024", source: "World Bank, 2024" },
  { label: "Population density", value: "149", sub: "people per km², 2024", source: "World Bank, 2024" },
  { label: "Land area", value: "1,892,555", sub: "km²", source: "World Bank" },
  { label: "Provinces", value: "38", sub: "first-level regions", source: "Government of Indonesia" },
  { label: "Median age", value: "30.7 yrs", sub: "2024 estimate", source: "UN World Population Prospects 2024" },
  { label: "Dependency ratio", value: "46.8", sub: "dependants per 100 workers, 2024", source: "World Bank, 2024" },
];

export const EDUCATION = [
  { label: "Youth literacy (15–24)", value: "99.8%", sub: "can read and write", source: "World Bank, 2020" },
  { label: "Mean years of schooling", value: "8.6 yrs", sub: "adults 25+", source: "UNDP, 2023" },
  { label: "Expected years of schooling", value: "13.7 yrs", sub: "children entering school", source: "UNDP, 2023" },
  { label: "Human Development Index", value: "0.728", sub: "high human development, rank 112 of 193", source: "UNDP, 2023" },
  { label: "Primary completion (gross)", value: "103.0%", sub: "gross rate can pass 100% as older pupils finish late", source: "World Bank, 2022" },
  { label: "Tertiary enrolment (gross)", value: "36%", sub: "of the tertiary-age population", source: "World Bank, 2022" },
];

export const HEALTH = [
  { label: "Life expectancy, women", value: "73.4 yrs", sub: "at birth, 2023", source: "World Bank, 2023" },
  { label: "Life expectancy, men", value: "69.2 yrs", sub: "at birth, 2023", source: "World Bank, 2023" },
  { label: "Life expectancy, total", value: "71.2 yrs", sub: "at birth, 2023", source: "World Bank, 2023" },
  { label: "Infant mortality", value: "19", sub: "deaths per 1,000 live births, 2023", source: "World Bank, 2023" },
  { label: "Under-5 mortality", value: "22", sub: "deaths per 1,000 live births, 2023", source: "World Bank, 2023" },
  { label: "Maternal mortality", value: "173", sub: "deaths per 100,000 live births, 2020", source: "WHO, 2020" },
  { label: "Stunting, under 5", value: "19.8%", sub: "low height for age", source: "SSGI, Ministry of Health, 2024" },
  { label: "Physicians", value: "0.5", sub: "per 1,000 people", source: "World Bank, 2022" },
  { label: "Hospital beds", value: "1.4", sub: "per 1,000 people", source: "World Bank, 2022" },
];

export const WORK = [
  { label: "Labour force", value: "143.1m", sub: "people, 2024", source: "Statistics Indonesia / ILO, 2024" },
  { label: "Labour force participation", value: "67.0%", sub: "of working-age population, 2024", source: "World Bank, 2024" },
  { label: "Female participation", value: "53.6%", sub: "women 15+, 2024", source: "World Bank, 2024" },
  { label: "Male participation", value: "82.3%", sub: "men 15+, 2024", source: "World Bank, 2024" },
  { label: "Youth unemployment (15–24)", value: "13.1%", sub: "modelled ILO estimate, 2024", source: "World Bank / ILO, 2024" },
  { label: "Informal employment", value: "59.1%", sub: "of all workers, August", source: "BPS, 2024" },
  { label: "Unemployment, Aug 2024", value: "4.91%", sub: "lowest in a decade", source: "BPS, 2024" },
  { label: "Gini coefficient", value: "0.379", sub: "income inequality, September", source: "BPS, 2024" },
];

export const SOURCES = [
  { publisher: "Statistics Indonesia (BPS)", covers: "GDP growth, inflation (CPI), poverty, unemployment, informal employment, Gini, trade in goods, sector shares of GDP", years: "2015–2024", note: "National figures as published in BPS releases; poverty measured in September, unemployment in August, inflation as December year-on-year." },
  { publisher: "World Bank — World Development Indicators", covers: "Population, GDP and GDP per capita in current US$, urban share, fertility, life expectancy, mortality, literacy, enrolment, labour force and participation", years: "2020–2024", note: "Population rounded to the nearest million in charts. Modelled ILO estimates are used for youth unemployment." },
  { publisher: "International Monetary Fund — World Economic Outlook", covers: "Government debt, GDP in purchasing-power parity, government consumption, investment share", years: "2024", note: "October 2025 vintage." },
  { publisher: "UNDP — Human Development Report", covers: "Human Development Index, mean and expected years of schooling", years: "2023", note: "HDI 0.728, rank 112 of 193 countries." },
  { publisher: "Ministry of Health — SSGI (Survei Status Gizi Indonesia)", covers: "Stunting prevalence among children under five", years: "2024", note: "National nutrition status survey." },
  { publisher: "World Health Organization", covers: "Maternal mortality ratio", years: "2020", note: "Modelled estimate, deaths per 100,000 live births." },
  { publisher: "United Nations — World Population Prospects", covers: "Median age", years: "2024", note: "Medium variant estimate." },
  { publisher: "Government of Indonesia", covers: "Number of provinces (38) and provincial population estimates", years: "2024", note: "Provincial populations are BPS mid-year estimates, rounded to 0.1 million." },
];
