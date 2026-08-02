/* ---------------------------------------------------------
   Mobile nav toggle
--------------------------------------------------------- */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });
})();

/* ---------------------------------------------------------
   Mark the current page's nav link as active
--------------------------------------------------------- */
(function () {
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === here) a.classList.add('active');
  });
})();

/* ---------------------------------------------------------
   Charged-track field
   A charged particle in a uniform magnetic field moves on a
   circular arc, curving one way if positive and the other if
   negative. Each track below is one such arc: a vertex point,
   a radius, and a direction set by its sign. Tracks are drawn
   progressively, glow briefly, then fade and a new one spawns.
   Purely decorative, but the physics of the motion is real.
--------------------------------------------------------- */
(function () {
  var canvas = document.getElementById('track-field');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W, H, DPR;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  var CYAN = '#4fd8ff';
  var AMBER = '#ffb84f';
  var MAX_TRACKS = 16;
  var tracks = [];

  function spawnTrack() {
    var sign = Math.random() < 0.5 ? -1 : 1;
    var vx = Math.random() * W;
    var vy = H * (0.15 + Math.random() * 0.7);
    var radius = 90 + Math.random() * 260;
    var startAngle = Math.PI + (Math.random() * 0.6 - 0.3);
    var sweep = 0.9 + Math.random() * 1.6;
    var cx = vx;
    var cy = vy + sign * radius;
    return {
      cx: cx, cy: cy, radius: radius,
      startAngle: startAngle,
      endAngle: startAngle + sign * sweep * -1,
      sign: sign,
      progress: 0,
      speed: 0.006 + Math.random() * 0.008,
      life: 0,
      color: sign > 0 ? AMBER : CYAN
    };
  }

  for (var i = 0; i < MAX_TRACKS; i++) {
    var t = spawnTrack();
    t.progress = Math.random();
    tracks.push(t);
  }

  function drawTrack(t) {
    var a0 = t.startAngle;
    var a1 = t.startAngle + (t.endAngle - t.startAngle) * t.progress;
    var fadeIn = Math.min(1, t.life / 20);
    var fadeOut = t.progress > 0.85 ? (1 - t.progress) / 0.15 : 1;
    var alpha = 0.65 * fadeIn * fadeOut;

    ctx.beginPath();
    ctx.arc(t.cx, t.cy, t.radius, Math.min(a0, a1), Math.max(a0, a1));
    ctx.strokeStyle = t.color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1.4;
    ctx.shadowBlur = 8;
    ctx.shadowColor = t.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < tracks.length; i++) {
      var t = tracks[i];
      t.progress += t.speed;
      t.life += 1;
      if (t.progress >= 1) tracks[i] = spawnTrack();
      else drawTrack(t);
    }
    if (!reduceMotion) requestAnimationFrame(tick);
  }

  if (reduceMotion) {
    // Draw a single static frame instead of animating.
    tracks.forEach(function (t) { t.progress = 0.5; t.life = 20; drawTrack(t); });
  } else {
    requestAnimationFrame(tick);
  }
})();