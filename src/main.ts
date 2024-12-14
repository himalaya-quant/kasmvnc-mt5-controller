import { argv } from "process";
import puppeteer from "puppeteer";
import { sleep } from "./utils";
import {
  acceptGeckoInstall,
  autoLoginOnPreselectedAccount,
  loadUserServer,
  markInstanceAsReady,
} from "./actions";

const args = argv.slice(2);
const INSTANCE_JWT = args
  .find((arg) => arg.startsWith("instance_jwt="))
  ?.split("=")[1];
const HQ_INSTANCES_MANAGER_URL = args
  .find((arg) => arg.startsWith("hq_instances_manager_url="))
  ?.split("=")[1];
const MT5_SERVER = args
  .find((arg) => arg.startsWith("mt5_server="))
  ?.split("=")[1];
const KASMVNC_USERNAME = args
  .find((arg) => arg.startsWith("kasmvnc_username="))
  ?.split("=")[1];
const KASMVNC_PASSWORD = args
  .find((arg) => arg.startsWith("kasmvnc_password="))
  ?.split("=")[1];

console.log(`-`.repeat(20));
console.log(`- KASMVNC MT5 Controller config`);
console.log(`-- Server: ${MT5_SERVER}`);
console.log(`-- KASMVNC Username: ${KASMVNC_USERNAME}`);
console.log(`-- HQ Instances manager api: ${HQ_INSTANCES_MANAGER_URL}`);
console.log(
  `-- Instance JWT: ${INSTANCE_JWT.replaceAll(new RegExp(".", "g"), "*")}`
);
console.log(
  `-- KASMVNC Password: ${KASMVNC_PASSWORD.replaceAll(
    new RegExp(".", "g"),
    "*"
  )}`
);
console.log(`-`.repeat(20));

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Set screen size.
  await page.setViewport({ width: 1920, height: 1080 });

  if (KASMVNC_PASSWORD && KASMVNC_USERNAME)
    await page.authenticate({
      username: KASMVNC_USERNAME,
      password: KASMVNC_PASSWORD,
    });

  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle2",
    timeout: 0,
  });

  // Print the full title.
  console.log("Page loaded");
  await sleep(5);

  await autoLoginOnPreselectedAccount(page);
  await loadUserServer(page, MT5_SERVER);
  await sleep(30);
  await acceptGeckoInstall(page);
  await sleep(60);
  await markInstanceAsReady(HQ_INSTANCES_MANAGER_URL, INSTANCE_JWT);

  await browser.close();
})();
