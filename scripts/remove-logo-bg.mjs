// Removes the flat beige background from the IREME logo -> transparent PNG.
// Global alpha matte: each pixel's distance from the background color becomes
// its alpha, and the pixel color is "unpremultiplied" to recover the true logo
// color (removes the beige cast from semi-transparent shadow areas).
import sharp from "sharp";

const src = "src/assets/ireme-logo-crop.jpg";
const out = "src/assets/ireme-logo.png";

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;

// Sample background color from corners (median of the four)
const px = (x, y) => {
  const i = (y * w + x) * 4;
  return [data[i], data[i + 1], data[i + 2]];
};
const corners = [px(2, 2), px(w - 3, 2), px(2, h - 3), px(w - 3, h - 3)].sort(
  (a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]),
);
const bg = corners[1] ?? corners[0];

const LOW = 25; // distance below which pixel is fully background
const HIGH = 120; // distance above which pixel is fully logo

for (let i = 0; i < w * h; i++) {
  const o = i * 4;
  const r = data[o], g = data[o + 1], b = data[o + 2];
  const dr = r - bg[0], dg = g - bg[1], db = b - bg[2];
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);
  // alpha ramp between LOW and HIGH
  let a = (dist - LOW) / (HIGH - LOW);
  a = Math.max(0, Math.min(1, a));
  if (a === 0) {
    data[o + 3] = 0;
    continue;
  }
  // Unpremultiply: pixel = a*logo + (1-a)*bg  =>  logo = (pixel - (1-a)*bg)/a
  data[o] = Math.max(0, Math.min(255, Math.round((r - (1 - a) * bg[0]) / a)));
  data[o + 1] = Math.max(0, Math.min(255, Math.round((g - (1 - a) * bg[1]) / a)));
  data[o + 2] = Math.max(0, Math.min(255, Math.round((b - (1 - a) * bg[2]) / a)));
  data[o + 3] = Math.round(a * 255);
}

await sharp(Buffer.from(data), { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toFile(out);

// Report how much was removed
let removed = 0;
for (let i = 0; i < w * h; i++) if (data[i * 4 + 3] === 0) removed++;
console.log(
  `done: ${out} (${w}x${h}), bg rgb(${bg.join(",")}), transparent: ${((removed / (w * h)) * 100).toFixed(1)}%`,
);
