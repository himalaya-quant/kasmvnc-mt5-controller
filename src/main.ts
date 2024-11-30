import puppeteer from "puppeteer-core";
import { sleep } from "./utils";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    channel: "chrome",
    // headless: false,
  });
  const page = await browser.newPage();

  // Set screen size.
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate the page to a URL.
  await page.goto("http://himalaya-quant.ddns.net:3000");

  // Print the full title.
  console.log("Page loaded");
  await sleep(2);

  // Close any existing menus overlays
  page.keyboard.press("Escape");
  await sleep(0.3);
  page.keyboard.press("Escape");
  await sleep(0.3);

  // Open "File" menu
  page.keyboard.down("Meta");
  page.keyboard.up("Meta");
  page.keyboard.down("Alt");
  page.keyboard.down("F");
  await sleep(0.3);

  page.keyboard.up("Alt");
  page.keyboard.up("F");
  await sleep(0.3);

  // Open "Login to trade account" sub menu
  page.keyboard.press("L");
  await sleep(2);

  page.keyboard.press("Enter");
  console.log("Should have now been logged");

  await sleep(5);
  await browser.close();
})();
