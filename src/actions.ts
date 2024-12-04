import { Page } from "puppeteer";
import { sleep } from "./utils";

export async function acceptGeckoInstall(page: Page): Promise<void> {
  page.keyboard.press("Enter");
  await sleep(0.3);

  console.log(`Gecko should now be installed`);
}

export async function loadUserServer(
  page: Page,
  server: string
): Promise<void> {
  // Close any existing menus overlays
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
  page.keyboard.press("A");
  await sleep(2);

  // Open "Login to trade account" sub menu
  page.keyboard.press("Tab");
  await sleep(0.3);
  page.keyboard.press("Tab");
  await sleep(0.3);
  page.keyboard.press("Tab");
  await sleep(0.3);
  page.keyboard.type(server);
  await sleep(0.3);
  page.keyboard.press("Enter");
  await sleep(5);

  page.keyboard.press("Escape");

  console.log(`Should have now loaded ${server} server`);
}

export async function autoLoginOnPreselectedAccount(page: Page): Promise<void> {
  // Close any existing menus overlays
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

  await sleep(5);
  console.log("Should have now been logged");
}
