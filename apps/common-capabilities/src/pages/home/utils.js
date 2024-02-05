export function extractAvailableFilters(apps) {
  let environmentObj = {};
  let languageObj = {};
  let statusObj = {};
  let keywordsObj = {};
  let FunctionalGroupObj = {};

  // filters count
  let EnvironmentCount = [];
  let LanguagesCount = [];
  let StatusCount = [];
  let KeywordsCount = [];
  let FunctionalGroupCount = [];

  apps.forEach((item) => {
    if (item.Environment && Array.isArray(item.Environment)) {
      item.Environment.forEach((env) => {
        if (env && env.trim() !== '' && env.toUpperCase() !== 'N/A') {
          environmentObj[env] = (environmentObj[env] || 0) + 1;
        }
      });
    }
    if (item.Language && Array.isArray(item.Language)) {
      item.Language.forEach((lang) => {
        if (lang && lang.trim() !== '' && lang.toUpperCase() !== 'N/A') {
          languageObj[lang] = (languageObj[lang] || 0) + 1;
        }
      });
    }
    if (
      item.Status &&
      item.Status.trim() !== '' &&
      item.Status.toUpperCase() !== 'N/A'
    ) {
      statusObj[item.Status] = (statusObj[item.Status] || 0) + 1;
    }
    if (
      item.FunctionalGroup &&
      item.FunctionalGroup.trim() !== '' &&
      item.FunctionalGroup.toUpperCase() !== 'N/A'
    ) {
      FunctionalGroupObj[item.FunctionalGroup] =
        (FunctionalGroupObj[item.FunctionalGroup] || 0) + 1;
    }
    if (item.Keywords && Array.isArray(item.Keywords)) {
      item.Keywords.forEach((keyword) => {
        if (
          keyword &&
          keyword.trim() !== '' &&
          keyword.toUpperCase() !== 'N/A'
        ) {
          keywordsObj[keyword] = (keywordsObj[keyword] || 0) + 1;
        }
      });
    }
  });

  EnvironmentCount = Object.entries(environmentObj)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));

  LanguagesCount = Object.entries(languageObj)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));

  StatusCount = Object.entries(statusObj)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));

  FunctionalGroupCount = Object.entries(FunctionalGroupObj)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));

  KeywordsCount = Object.entries(keywordsObj)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));

  return {
    Environment: { filters: EnvironmentCount },
    Languages: { filters: LanguagesCount },
    Status: { filters: StatusCount },
    Keywords: { filters: KeywordsCount },
    FunctionalGroup: { filters: FunctionalGroupCount },
  };
}
export function capitalizeFirstWord(s) {
  return s.replace(/(^|[^a-zA-Z])[a-z]/g, (match) => match.toUpperCase());
}
