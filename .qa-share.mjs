export default async function run(page) {
  await page.getByRole("button", { name: /^Share Furnished/ }).click();
  await page.getByRole("dialog").waitFor();
  const before = await page.getByRole("dialog").innerText();
  await page.mouse.move(5, 5);
  await page.waitForTimeout(300);
  const after = await page.getByRole("dialog").count();
  await page.screenshot({ path: "share-dialog.png" });
  return {
    dialogText: before,
    remainsOpenAfterOutsideHover: after === 1,
    backdrops: await page.locator("body > div > div.fixed.inset-0").count(),
  };
}
