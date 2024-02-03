
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#viewer');
  canvas.height = 700;
  canvas.width = 700;
  const ctx = canvas.getContext('2d');
  document.querySelector("#viewer").style.backgroundColor = "cornsilk";

  ctx.strokeStyle = 'rgb(48, 65, 19)';
  draw(0, 0, ctx, canvas);
});

const draw = (initX, initY, ctx, canvas) => {
  const rand = Math.random();
  const [x, y] = (rand <= 0.01) ? f1(initX, initY) :
      (rand <= 0.86) ? f2(initX, initY) :
      (rand <= 0.86 + 0.07) ? f3(initX, initY) :
      f4(initX, initY);

  ctx.beginPath();
  ctx.fillStyle = 'rgb(48, 65, 19)';
  ctx.fillRect(x * 110 + canvas.width / 2, canvas.height - y * 70, 3.14156, 3.14156);
  window.requestAnimationFrame(() => draw(x, y, ctx, canvas));
}

// Pozostałe funkcje f1, f2, f3, f4 pozostają bez zmian


  // Affine Transformation
  const f1 = (x, y) => [0, 0.16 * y];    // Stem. Call 1% of time
  const f2 = (x, y) => [0.85 * x + 0.04 * y, -0.04 * x + 0.85 * y + 1.6];  // Successively smaller leaflets. Call 85% of time
  const f3 = (x, y) => [0.2 * x - 0.26 * y, 0.23 * x + 0.22 * y + 1.6];   // Largest left-hand leaflet. Call 7% of time
  const f4 = (x, y) => [-0.15 * x + 0.28 * y, 0.26 * x + 0.24 * y + 0.44];  // Largest right-hand leaflet. Call 7% of time