import React, { useEffect, useRef } from 'react';

interface HeroNatureCanvasProps {
  reducedMotion?: boolean;
}

export const HeroNatureCanvas: React.FC<HeroNatureCanvasProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse Parallax coordinates (smooth interpolation)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetMouseX = x * 8; // subtle max 4px
      targetMouseY = y * 6; // subtle max 3px
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- WATERFALL PARTICLES & STREAMS ---
    interface WaterParticle {
      x: number;
      y: number;
      speedY: number;
      speedX: number;
      length: number;
      alpha: number;
      width: number;
      sparkle: boolean;
      streamIndex: number;
    }

    const waterfallStreamPositions = [
      { xRel: 0.125, yTop: 0.44, yBottom: 0.70, widthRel: 0.015 },
      { xRel: 0.145, yTop: 0.45, yBottom: 0.71, widthRel: 0.02 },
      { xRel: 0.170, yTop: 0.46, yBottom: 0.72, widthRel: 0.022 },
      { xRel: 0.190, yTop: 0.48, yBottom: 0.71, widthRel: 0.018 },
    ];

    const waterParticles: WaterParticle[] = [];
    const numParticles = reducedMotion ? 25 : 90;

    for (let i = 0; i < numParticles; i++) {
      const stream = waterfallStreamPositions[i % waterfallStreamPositions.length];
      waterParticles.push({
        x: (stream.xRel + (Math.random() - 0.5) * stream.widthRel) * width,
        y: (stream.yTop + Math.random() * (stream.yBottom - stream.yTop)) * height,
        speedY: 2.2 + Math.random() * 3.0,
        speedX: (Math.random() - 0.5) * 0.4,
        length: 8 + Math.random() * 18,
        alpha: 0.35 + Math.random() * 0.45,
        width: 1.2 + Math.random() * 2.2,
        sparkle: Math.random() > 0.65,
        streamIndex: i % waterfallStreamPositions.length,
      });
    }

    // Water Splash Droplets & Mist at Pool Base
    interface SplashParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const splashParticles: SplashParticle[] = [];

    // Water Pool Ripples
    interface Ripple {
      x: number;
      y: number;
      radiusX: number;
      radiusY: number;
      alpha: number;
      maxRadius: number;
      speed: number;
    }

    const ripples: Ripple[] = [];

    // --- FLOATING WIND LEAVES ---
    interface FloatingLeaf {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      vRot: number;
      size: number;
      alpha: number;
      flip: number;
      vFlip: number;
      color: string;
    }

    const leafColors = ['#8A9A5B', '#4C7031', '#A3B18A', '#D4A373', '#606C38'];
    const leaves: FloatingLeaf[] = [];
    const maxLeaves = reducedMotion ? 2 : 5;

    const createLeaf = (): FloatingLeaf => ({
      x: Math.random() * width * 0.8,
      y: -20 - Math.random() * 50,
      vx: 0.3 + Math.random() * 0.7,
      vy: 0.4 + Math.random() * 0.6,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.03,
      size: 6 + Math.random() * 6,
      alpha: 0.5 + Math.random() * 0.4,
      flip: Math.random() * Math.PI,
      vFlip: 0.02 + Math.random() * 0.03,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
    });

    for (let i = 0; i < maxLeaves; i++) {
      const leaf = createLeaf();
      leaf.y = Math.random() * height * 0.8;
      leaves.push(leaf);
    }

    // --- ANIMATED BIRD SYSTEM ---
    // Hummingbird / Sunbird hovering in the upper-left sunlit area (safe from text card)
    const bird = {
      baseXRel: 0.32,
      baseYRel: 0.24,
      x: 0.32 * width,
      y: 0.24 * height,
      wingAngle: 0,
      flapState: 'flapping', // 'flapping' or 'gliding'
      stateTimer: 0,
      wingSpeed: 0.35,
      bobOffset: 0,
      glideTimer: 0,
      angle: -0.05,
    };

    // Distant background birds
    const distantBirds = [
      { xRel: 0.15, yRel: 0.12, speed: 0.25, wingAngle: 0, size: 4 },
      { xRel: 0.48, yRel: 0.08, speed: 0.30, wingAngle: 0.5, size: 3.5 },
    ];

    let time = 0;

    // RENDER LOOP
    const render = () => {
      time += 0.016;

      // Mouse Parallax Smooth Lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // --- 1. SUNLIGHT GOD RAYS PULSE ---
      if (!reducedMotion) {
        ctx.save();
        const sunX = width * 0.42 + mouseX * 0.5;
        const sunY = height * 0.12 + mouseY * 0.5;
        const rayAlpha = 0.045 + Math.sin(time * 0.6) * 0.018 + Math.cos(time * 1.1) * 0.01;

        const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, width * 0.55);
        sunGrad.addColorStop(0, `rgba(255, 245, 200, ${rayAlpha * 1.6})`);
        sunGrad.addColorStop(0.3, `rgba(255, 235, 170, ${rayAlpha})`);
        sunGrad.addColorStop(0.7, `rgba(255, 220, 130, ${rayAlpha * 0.3})`);
        sunGrad.addColorStop(1, 'rgba(255, 220, 130, 0)');

        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, height);

        // Volumetric Light Beams
        ctx.save();
        ctx.translate(sunX, sunY);
        ctx.rotate(-0.35 + Math.sin(time * 0.2) * 0.03);
        for (let r = 0; r < 4; r++) {
          const beamWidth = 40 + r * 35;
          const beamLength = height * 0.85;
          const beamAlpha = (0.025 + Math.sin(time * 0.7 + r) * 0.015) * (1 - r * 0.15);

          const beamGrad = ctx.createLinearGradient(0, 0, 0, beamLength);
          beamGrad.addColorStop(0, `rgba(255, 250, 220, ${beamAlpha * 1.8})`);
          beamGrad.addColorStop(0.6, `rgba(255, 240, 190, ${beamAlpha})`);
          beamGrad.addColorStop(1, 'rgba(255, 240, 190, 0)');

          ctx.fillStyle = beamGrad;
          ctx.beginPath();
          ctx.moveTo(-beamWidth / 2, 0);
          ctx.lineTo(beamWidth / 2, 0);
          ctx.lineTo(beamWidth * 2.2, beamLength);
          ctx.lineTo(-beamWidth * 2.2, beamLength);
          ctx.closePath();
          ctx.fill();

          ctx.rotate(0.22);
        }
        ctx.restore();
        ctx.restore();
      }

      // --- 2. WATERFALL FLOWING STREAMS ANIMATION ---
      ctx.save();
      const wfOffsetX = mouseX * 0.4;
      const wfOffsetY = mouseY * 0.4;

      // Draw continuous falling water ribbons
      waterfallStreamPositions.forEach((stream, idx) => {
        const streamX = stream.xRel * width + wfOffsetX;
        const streamYTop = stream.yTop * height + wfOffsetY;
        const streamYBottom = stream.yBottom * height + wfOffsetY;
        const streamW = stream.widthRel * width;

        const streamGrad = ctx.createLinearGradient(streamX, streamYTop, streamX, streamYBottom);
        const shimmer = 0.18 + Math.sin(time * 3 + idx) * 0.08;
        streamGrad.addColorStop(0, `rgba(255, 255, 255, ${0.4 + shimmer})`);
        streamGrad.addColorStop(0.3, `rgba(230, 245, 255, ${0.35 + shimmer * 0.5})`);
        streamGrad.addColorStop(0.7, `rgba(215, 240, 255, ${0.45 + shimmer})`);
        streamGrad.addColorStop(1, `rgba(255, 255, 255, ${0.6 + shimmer})`);

        ctx.fillStyle = streamGrad;
        ctx.beginPath();
        ctx.ellipse(
          streamX,
          (streamYTop + streamYBottom) / 2,
          streamW / 2,
          (streamYBottom - streamYTop) / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Update and draw fast cascading water particles & foam
      waterParticles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 4 + p.y * 0.05) * 0.2;

        const stream = waterfallStreamPositions[p.streamIndex];
        const streamYTop = stream.yTop * height + wfOffsetY;
        const streamYBottom = stream.yBottom * height + wfOffsetY;

        // When reaching pool base -> trigger splash & ripple
        if (p.y > streamYBottom) {
          p.y = streamYTop;
          p.x = (stream.xRel + (Math.random() - 0.5) * stream.widthRel) * width + wfOffsetX;

          // Spawn subtle splash droplet
          if (!reducedMotion && Math.random() > 0.4) {
            splashParticles.push({
              x: p.x + (Math.random() - 0.5) * 12,
              y: streamYBottom - Math.random() * 4,
              vx: (Math.random() - 0.5) * 1.4,
              vy: -0.8 - Math.random() * 1.5,
              radius: 0.8 + Math.random() * 1.4,
              alpha: 0.6 + Math.random() * 0.3,
              life: 0,
              maxLife: 20 + Math.random() * 15,
            });
          }

          // Spawn occasional pool ripple
          if (Math.random() > 0.88 && ripples.length < 8) {
            ripples.push({
              x: p.x + (Math.random() - 0.5) * 20,
              y: streamYBottom + 2 + Math.random() * 10,
              radiusX: 2,
              radiusY: 0.8,
              alpha: 0.45,
              maxRadius: 28 + Math.random() * 20,
              speed: 0.45 + Math.random() * 0.35,
            });
          }
        }

        // Draw water streak
        const streakAlpha = p.alpha * (p.sparkle ? 0.7 + Math.sin(time * 8 + p.x) * 0.3 : 0.6);
        ctx.strokeStyle = `rgba(245, 252, 255, ${streakAlpha})`;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
        ctx.stroke();
      });

      // Update & Draw Splash Particles
      for (let i = splashParticles.length - 1; i >= 0; i--) {
        const sp = splashParticles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.08; // gravity
        sp.life++;

        const currentAlpha = sp.alpha * (1 - sp.life / sp.maxLife);
        if (sp.life >= sp.maxLife || currentAlpha <= 0) {
          splashParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & Draw Pool Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radiusX += r.speed;
        r.radiusY += r.speed * 0.38; // oval perspective
        r.alpha -= 0.007;

        if (r.alpha <= 0 || r.radiusX >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(235, 248, 255, ${r.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radiusX, r.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // --- 3. LANTERN WARM GLOW (Left Stone Wall) ---
      ctx.save();
      const lanternX = width * 0.155 + mouseX * 0.45;
      const lanternY = height * 0.505 + mouseY * 0.45;
      const lanternPulse = 0.22 + Math.sin(time * 1.5) * 0.05 + Math.cos(time * 3.2) * 0.02;

      const lanternGrad = ctx.createRadialGradient(lanternX, lanternY, 2, lanternX, lanternY, 45);
      lanternGrad.addColorStop(0, `rgba(255, 210, 110, ${lanternPulse * 1.5})`);
      lanternGrad.addColorStop(0.4, `rgba(255, 175, 70, ${lanternPulse * 0.8})`);
      lanternGrad.addColorStop(1, 'rgba(255, 160, 50, 0)');

      ctx.fillStyle = lanternGrad;
      ctx.beginPath();
      ctx.arc(lanternX, lanternY, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- 4. NATURAL WIND SYSTEM (Global Breeze Noise) ---
      const windBreeze = Math.sin(time * 0.7) * 0.6 + Math.sin(time * 1.4 + 1.1) * 0.3 + Math.sin(time * 0.25) * 0.4;

      // Hanging Greenhouse Baskets Sway (Right Pergola)
      if (!reducedMotion) {
        ctx.save();
        const pergolaX = width * 0.84 + mouseX * 0.2;
        const pergolaY = height * 0.32 + mouseY * 0.2;
        const basketSwayAngle = windBreeze * 0.035;

        ctx.translate(pergolaX, pergolaY);
        ctx.rotate(basketSwayAngle);

        // Very subtle green leaf highlight shimmer
        const basketShimmer = 0.05 + Math.sin(time * 1.2) * 0.03;
        ctx.fillStyle = `rgba(163, 177, 138, ${basketShimmer})`;
        ctx.beginPath();
        ctx.ellipse(0, 15, 25, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- 5. ANIMATED HUMMINGBIRD / BIRD ---
      ctx.save();
      const birdTargetX = width * bird.baseXRel + Math.sin(time * 0.6) * 18 + mouseX * 0.6;
      const birdTargetY = height * bird.baseYRel + Math.cos(time * 0.9) * 12 + Math.sin(time * 1.8) * 4 + mouseY * 0.6;

      bird.x += (birdTargetX - bird.x) * 0.06;
      bird.y += (birdTargetY - bird.y) * 0.06;

      // Wing Flapping vs Gliding State Machine
      bird.stateTimer += 0.016;
      if (bird.flapState === 'flapping' && bird.stateTimer > 2.8) {
        bird.flapState = 'gliding';
        bird.stateTimer = 0;
      } else if (bird.flapState === 'gliding' && bird.stateTimer > 1.4) {
        bird.flapState = 'flapping';
        bird.stateTimer = 0;
      }

      if (bird.flapState === 'flapping') {
        bird.wingAngle += bird.wingSpeed;
      } else {
        bird.wingAngle = Math.sin(time * 2) * 0.15; // gentle glide pitch
      }

      const wingYOffset = Math.sin(bird.wingAngle) * 7;

      ctx.translate(bird.x, bird.y);
      ctx.rotate(bird.angle + Math.sin(time * 0.8) * 0.05);

      // Bird Body (Emerald/Teal hummingbird with beige breast)
      ctx.fillStyle = '#2D5A43'; // Forest teal
      ctx.beginPath();
      ctx.ellipse(0, 0, 9, 4.5, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Bird Head & Beak
      ctx.fillStyle = '#1D3B2B';
      ctx.beginPath();
      ctx.arc(6, -2, 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Slender Beak
      ctx.strokeStyle = '#2B1E12';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(8.5, -2);
      ctx.lineTo(16, -0.5);
      ctx.stroke();

      // Wings (Left & Right flapping)
      ctx.fillStyle = 'rgba(78, 110, 90, 0.85)';
      ctx.beginPath();
      ctx.moveTo(-2, -1);
      ctx.quadraticCurveTo(-1, -12 + wingYOffset, 6, -15 + wingYOffset * 1.3);
      ctx.quadraticCurveTo(2, -7, -2, -1);
      ctx.fill();

      // Forked Tail
      ctx.strokeStyle = '#2D4F36';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-8, 1);
      ctx.lineTo(-15, 3 + Math.sin(time * 2) * 2);
      ctx.moveTo(-8, 1);
      ctx.lineTo(-14, -1);
      ctx.stroke();

      ctx.restore();

      // Distant soaring birds in high canopy
      if (!reducedMotion) {
        distantBirds.forEach((db) => {
          db.xRel += (db.speed * 0.0004);
          if (db.xRel > 0.85) db.xRel = 0.05;
          db.wingAngle += 0.08;

          const dbX = db.xRel * width + mouseX * 0.1;
          const dbY = db.yRel * height + Math.sin(time * 0.5 + db.xRel * 10) * 8 + mouseY * 0.1;
          const wingSpan = db.size;
          const wingFlap = Math.sin(db.wingAngle) * (db.size * 0.45);

          ctx.save();
          ctx.strokeStyle = 'rgba(45, 60, 48, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(dbX - wingSpan, dbY - wingFlap);
          ctx.quadraticCurveTo(dbX - wingSpan * 0.4, dbY, dbX, dbY + 1);
          ctx.quadraticCurveTo(dbX + wingSpan * 0.4, dbY, dbX + wingSpan, dbY - wingFlap);
          ctx.stroke();
          ctx.restore();
        });
      }

      // --- 6. FLOATING DRIFTING WIND LEAVES ---
      leaves.forEach((leaf) => {
        leaf.x += leaf.vx + windBreeze * 0.8;
        leaf.y += leaf.vy;
        leaf.rotation += leaf.vRot;
        leaf.flip += leaf.vFlip;

        // Reset if leaf leaves viewport
        if (leaf.y > height + 20 || leaf.x > width + 40 || leaf.x < -40) {
          leaf.x = Math.random() * width * 0.7;
          leaf.y = -20;
          leaf.vx = 0.4 + Math.random() * 0.6;
          leaf.vy = 0.5 + Math.random() * 0.5;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(Math.cos(leaf.flip), 1); // 3D tumbling effect

        ctx.fillStyle = leaf.color;
        ctx.globalAlpha = leaf.alpha;
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size);
        ctx.bezierCurveTo(leaf.size * 0.8, -leaf.size * 0.4, leaf.size * 0.8, leaf.size * 0.4, 0, leaf.size);
        ctx.bezierCurveTo(-leaf.size * 0.8, leaf.size * 0.4, -leaf.size * 0.8, -leaf.size * 0.4, 0, -leaf.size);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      style={{ willChange: 'transform' }}
    />
  );
};
