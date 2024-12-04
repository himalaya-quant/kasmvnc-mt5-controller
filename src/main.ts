import { env } from "process";
import puppeteer from "puppeteer";
import { sleep } from "./utils";
import {
  acceptGeckoInstall,
  autoLoginOnPreselectedAccount,
  loadUserServer,
} from "./actions";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Set screen size.
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate the page to a URL.
  await page.goto("http://localhost:3000");

  // Print the full title.
  console.log("Page loaded");
  await sleep(2);

  await autoLoginOnPreselectedAccount(page);
  await loadUserServer(page, env.MT5_SERVER);
  await sleep(10);
  await acceptGeckoInstall(page);

  await browser.close();
})();
