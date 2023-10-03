import { pageToString, renderPage } from "./templateEngine.js";

const home = pageToString('./public/pages/home/home.html');
export const homePage = renderPage(home);

const dataTypes = pageToString('./public/pages/datatypes/datatypes.html');
export const dataTypesPage = renderPage(dataTypes);

const functions = pageToString('./public/pages/functions/functions.html');
export const functionsPage = renderPage(functions);

const loops = pageToString('./public/pages/loops/loops.html');
export const loopsPage = renderPage(loops);

const node = pageToString('./public/pages/node/node.html');
export const nodePage = renderPage(node);

const restApi = pageToString('./public/pages/restAPI/restAPI.html');
export const restApiPage = renderPage(restApi);

const fetch = pageToString('./public/pages/fetch/fetch.html');
export const fetchPage = renderPage(fetch);

const git = pageToString('./public/pages/git/git.html');
export const gitPage = renderPage(git);

const xss = pageToString('./public/pages/xss/xss.html');
export const xssPage = renderPage(xss);

const htmlCss = pageToString('./public/pages/html&css/html&css.html');
export const htmlCssPage = renderPage(htmlCss);

const ssr = pageToString('./public/pages/ssr/ssr.html');
export const ssrPage = renderPage(ssr);

const admin = pageToString('./public/pages/admin/admin.html');
export const adminPage = renderPage(admin);

const adminDummy = pageToString('./public/pages/admin/adminpage.html');
export const adminDummyPage = renderPage(adminDummy);