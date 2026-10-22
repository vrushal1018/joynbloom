const fs = require('fs');
const code = fs.readFileSync('src/lib/products.ts', 'utf8');
const urls = [...code.matchAll(/"image": "(https:[^"]+)"/g)].map(m => m[1]);
console.log('Total product images:', urls.length);
async function check() {
  let ok = 0;
  let fail = 0;
  for (const u of urls.slice(0, 20)) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      if (res.ok) ok++;
      else {
        fail++;
        console.log('Failed:', u);
      }
    } catch(e) {
      fail++;
    }
  }
  console.log('Checked 20 images => OK:', ok, 'Fail:', fail);
}
check();
