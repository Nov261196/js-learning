let n = 7;
let nguyento = true;

if (n < 2) {
  nguyento = false;
}

for (let i = 2; i <= Math.sqrt(n); i++) {
  if (n % i === 0) {
    nguyento = false;
    break;
  }
}

if (nguyento) {
  console.log("La so nguyen to");
} else {
  console.log("Khong phai so nguyen to");
}