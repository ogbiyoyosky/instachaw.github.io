import pageData from "./pages.json";
import navData from "./nav.json";
import treatData from "./treats.json";

export const getTreatsData = (id = null) => {
  if (id) {
    let treat = treatData.filter(t => t.id === id);
    return Promise.resolve(treat);
  }
  return Promise.resolve(treatData);
};

export const getPageData = urlPath => {
  return Promise.resolve(pageData[urlPath]);
};

export const getHeaderData = urlPath => {
  return Promise.resolve(navData);
};

export const getRouteData = urlPath => {
  return Promise.resolve(Object.keys(pageData).map(n => pageData[n]));
};
