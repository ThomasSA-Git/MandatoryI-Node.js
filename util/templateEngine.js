// File support import
import fs from "fs";

export function pageToString(filePath) {
  return fs.readFileSync(filePath).toString();
}

export function renderPage(page) {
  const navbar = fs
    .readFileSync("./public/components/navbar/navbar.html")
    .toString();

  return navbar + page;
}
