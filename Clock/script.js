const radius = 145;
const cx = 150;
const cy = 150;

// Draw hour numbers
const numbersGroup = document.getElementById('numbers');
for (let i = 1; i <= 12; i++) {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  const x = cx + (radius - 25) * Math.cos(angle);
  const y = cy + (radius - 25) * Math.sin(angle);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("fill", "white");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("font-size", "20");
  text.textContent = i;
  numbersGroup.appendChild(text);
}

// Draw minute ticks
const ticksGroup = document.getElementById('ticks');
for (let i = 0; i < 60; i++) {
  const angle = (i * 6 - 90) * (Math.PI / 180);
  const inner = (i % 5 === 0) ? radius - 12 : radius - 6;
  const outer = radius;
  const x1 = cx + inner * Math.cos(angle);
  const y1 = cy + inner * Math.sin(angle);
  const x2 = cx + outer * Math.cos(angle);
  const y2 = cy + outer * Math.sin(angle);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", i % 5 === 0 ? 2 : 1);
  ticksGroup.appendChild(line);
}

// Smooth hands update
function updateClock() {
  const now = new Date();
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const ms = now.getMilliseconds();

  const secDeg = (sec + ms / 1000) * 6;
  const minDeg = (min + sec / 60 + ms / 60000) * 6;
  const hrDeg = (hr + min / 60 + sec / 3600) * 30;

  document.getElementById('hour').setAttribute('transform', `rotate(${hrDeg} ${cx} ${cy})`);
  document.getElementById('minute').setAttribute('transform', `rotate(${minDeg} ${cx} ${cy})`);
  document.getElementById('second').setAttribute('transform', `rotate(${secDeg} ${cx} ${cy})`);

  requestAnimationFrame(updateClock);
}

updateClock();
