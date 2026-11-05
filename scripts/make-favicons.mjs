// Generates Google-ready square favicons from the JPEG brand logo into public/.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const src = "src/assets/ireme-logo.jpeg";

async function square(size, out) {
  await sharp(src).resize(size, size, { fit: "cover", position: "centre" }).png().toFile(out);
  console.log(`wrote ${out} (${size}x${size})`);
}

await square(16, "public/favicon-16x16.png");
await square(32, "public/favicon-32x32.png");
await square(180, "public/apple-touch-icon.png");
await square(192, "public/android-chrome-192x192.png");
await square(512, "public/android-chrome-512x512.png");

// Build a real .ico (16 + 32 + 48px, PNG-compressed Vista icon)
function pngToIco(pngs) {
  const headerSize = 6 + pngs.length * 16;
  let offset = headerSize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  pngs.forEach((p, i) => {
    const o = 6 + i * 16;
    header.writeUInt8(p.size >= 256 ? 0 : p.size, o);
    header.writeUInt8(p.size >= 256 ? 0 : p.size, o + 1);
    header.writeUInt8(0, o + 2);
    header.writeUInt8(0, o + 3);
    header.writeUInt16LE(1, o + 4);
    header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(p.data.length, o + 8);
    header.writeUInt32LE(offset, o + 12);
    offset += p.data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

const icoPngs = [];
for (const size of [16, 32, 48]) {
  const data = await sharp(src)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  icoPngs.push({ size, data });
}
writeFileSync("public/favicon.ico", pngToIco(icoPngs));
console.log("wrote public/favicon.ico (16/32/48)");

const manifest = {
  name: "IREME Real Estate",
  short_name: "IREME",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#1b2a4e",
  background_color: "#ffffff",
  display: "standalone",
};
writeFileSync("public/site.webmanifest", JSON.stringify(manifest, null, 2) + "\n");
console.log("wrote public/site.webmanifest");
