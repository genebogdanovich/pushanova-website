// Locale file name → Apple’s black badge (light mode) and white badge (dark mode).
// Filenames stay as Apple shipped them. en and en-GB share the US–UK badge.
// Older Hebrew (IL) and Slovenian (SI) files are superseded by HB and SL-SL.

const US_UK = {
  light: "Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg",
  dark: "Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg",
};

export const APP_STORE_BADGES = {
  ar: pair("AR_RGB", "102417"),
  az: pair("AZ_RGB", "100517"),
  bg: pair("BG_RGB", "100217"),
  bn: indic("IN-BN", "022526"),
  ca: {
    light: "Download_on_the_App_Store_Badge_CAES_blk_082124.svg",
    dark: "Download_on_the_App_Store_Badge_CAES_wht_082124.svg",
  },
  cs: pair("CZ_RGB", "092917"),
  da: pair("DK_RGB", "100217"),
  de: pair("DE_RGB", "092917"),
  el: pair("GR_RGB", "100217"),
  en: US_UK,
  "en-GB": US_UK,
  es: pair("ES_RGB", "100217"),
  "es-MX": pair("ESMX_RGB", "100217"),
  et: {
    light: "Download_on_the_App_Store_Badge_EE_RGB_blk_100217.svg",
    dark: "Download_on_the_App_Store_Badge_EE_RGB_wht_00217.svg",
  },
  fi: pair("FI_RGB", "100217"),
  fil: pair("PH_RGB", "100317"),
  fr: {
    light: "Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg",
    dark: "Download_on_the_App_Store_Badge_FR_RGB_wht_100217.svg",
  },
  "fr-CA": {
    light: "Download_on_the_App_Store_Badge_FRCA_RGB_blk_100517.svg",
    dark: "Download_on_the_App_Store_Badge_FRCA_RGB_wht_100217.svg",
  },
  gu: {
    light: "Apple_App_Store_Download_on_the_Badge_Blk_IN-GU_CI_031226.svg",
    dark: "Apple_App_Store_Download_on_the_Badge_Wht_IN-GU_CI_022526.svg",
  },
  he: {
    light: "Download_on_the_App_Store_Badge_Blk_HB_CI_111524.svg",
    dark: "Download_on_the_App_Store_Badge_Wht_HB_CI_111524.svg",
  },
  hi: {
    light: "Download_on_the_App_Store_Badge_Blk_IN_CI_091224.svg",
    dark: "Download_on_the_App_Store_Badge_Wht_IN_CI_091224.svg",
  },
  hr: {
    light: "Download_on_the_App_Store_Badge_HR_blk_082124.svg",
    dark: "Download_on_the_App_Store_Badge_HR_wht_082124.svg",
  },
  hu: {
    light: "Download_on_the_App_Store_Badge_HU_RGB_blk_120823.svg",
    dark: "Download_on_the_App_Store_Badge_HU_RGB_wht_100317.svg",
  },
  id: pair("ID_RGB", "100317"),
  it: pair("IT_RGB", "100317"),
  ja: pair("JP_RGB", "100317"),
  kn: indic("IN-KN", "022526"),
  ko: pair("KR_RGB", "100317"),
  lt: pair("LT_RGB", "100317"),
  lv: pair("LV_RGB", "100317"),
  ml: indic("IN-ML", "022526"),
  mr: indic("IN-MR", "022526"),
  ms: pair("MY_RGB", "100317"),
  mt: pair("MT_RGB", "100317"),
  nb: pair("NO_RGB", "100317"),
  nl: {
    light: "Download_on_the_App_Store_Badge_NL_RGB_blk_100317.svg",
    dark: "Download_on_the_App_Store_Badge_NL_RGB_wht_101217.svg",
  },
  or: indic("IN-OR", "022526"),
  pa: indic("IN-PA", "022526"),
  pl: pair("PL_RGB", "100317"),
  "pt-BR": {
    light: "Download_on_the_App_Store_Badge_PTBR_RGB_blk_092917.svg",
    dark: "Download_on_the_App_Store_Badge_PTBR_RGB_wht_100317.svg",
  },
  "pt-PT": pair("PTPT_RGB", "100317"),
  ro: pair("RO_RGB", "100317"),
  ru: pair("RU_RGB", "100317"),
  sk: pair("SK_RGB", "100317"),
  sl: indic("SL-SL", "022526"),
  sv: pair("SE_RGB", "100317"),
  ta: indic("IN-TA", "022526"),
  te: indic("IN-TE", "022526"),
  th: pair("TH_RGB", "092917"),
  tr: {
    light: "Download_on_the_App_Store_Badge_TR_RGB_blk_100217.svg",
    dark: "Download_on_the_App_Store_Badge_TR_wht_RGB_100217.svg",
  },
  uk: {
    light: "Download_on_the_App_Store_Badge_UA_blk_082124.svg",
    dark: "Download_on_the_App_Store_Badge_UA_wht_082124.svg",
  },
  ur: indic("IN-UR", "022526"),
  vi: pair("VN_RGB", "100217"),
  "zh-Hans": pair("CNSC_RGB", "092917"),
  "zh-Hant": pair("CNTC_RGB", "100217"),
};

export const SUPERSEDED_APP_STORE_BADGES = [
  "Download_on_the_App_Store_Badge_IL_RGB_blk_102517.svg",
  "Download_on_the_App_Store_Badge_IL_RGB_wht_102517.svg",
  "Download_on_the_App_Store_Badge_SI_RGB_blk_100317.svg",
  "Download_on_the_App_Store_Badge_SI_RGB_wht_100317.svg",
];

function pair(code, date) {
  return {
    light: `Download_on_the_App_Store_Badge_${code}_blk_${date}.svg`,
    dark: `Download_on_the_App_Store_Badge_${code}_wht_${date}.svg`,
  };
}

function indic(code, date) {
  return {
    light: `Apple_App_Store_Download_on_the_Badge_Blk_${code}_CI_${date}.svg`,
    dark: `Apple_App_Store_Download_on_the_Badge_Wht_${code}_CI_${date}.svg`,
  };
}
