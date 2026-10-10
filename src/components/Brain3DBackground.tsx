import React, { useEffect, useRef } from 'react';

interface BrainPoint {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
}

interface BrainEdge {
  p1: number;
  p2: number;
  color: string;
  progress: number;
  speed: number;
}

interface Brain3DBackgroundProps {
  theme?: 'light' | 'dark';
}

export const Brain3DBackground: React.FC<Brain3DBackgroundProps> = ({ theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    const resizeCanvas = () => {
      if (!canvas) return;
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Mouse Parallax & Scroll Variables
    let mouseTargetRotX = 0.15;
    let mouseTargetRotY = 0.35;
    let mouseCurrentRotX = 0.15;
    let mouseCurrentRotY = 0.35;
    let autoRotY = 0;

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / displayWidth) * 2 - 1;
      const normY = (e.clientY / displayHeight) * 2 - 1;
      mouseTargetRotY = normX * 0.45;
      mouseTargetRotX = -normY * 0.35 + 0.15;
    };

    const handleScroll = () => {
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawProgress = window.scrollY / docHeight;
      targetScrollProgress = Math.max(0, Math.min(1, rawProgress));

      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollVelocity = Math.min(3.0, scrollVelocity + delta * 0.006);
    };

    const handleResize = () => {
      resizeCanvas();
      handleScroll();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial sync
    handleScroll();

    // COLOR PALETTES FOR NEURAL NODES (DARK VS LIGHT MODE CALIBRATED)
    const isDark = theme === 'dark';
    const darkPalette = [
      { color: '#10b981', glow: 'rgba(16, 185, 129, 0.7)' }, // Emerald
      { color: '#34d399', glow: 'rgba(52, 211, 153, 0.7)' }, // Mint
      { color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.75)' }, // Cyan
      { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.75)' }, // Electric Blue
      { color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.7)' }, // Violet
      { color: '#d946ef', glow: 'rgba(217, 70, 239, 0.7)' }, // Neon Magenta
      { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.7)' },  // Rose
      { color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.7)' },  // Amber
    ];

    const lightPalette = [
      { color: '#059669', glow: 'rgba(5, 150, 105, 0.35)' }, // Emerald
      { color: '#0d9488', glow: 'rgba(13, 148, 136, 0.35)' }, // Teal
      { color: '#0284c7', glow: 'rgba(2, 132, 199, 0.35)' },  // Cyan/Sky
      { color: '#2563eb', glow: 'rgba(37, 99, 235, 0.35)' },  // Blue
      { color: '#7c3aed', glow: 'rgba(124, 58, 237, 0.35)' }, // Violet
      { color: '#c026d3', glow: 'rgba(192, 38, 211, 0.35)' }, // Magenta
      { color: '#e11d48', glow: 'rgba(225, 29, 72, 0.35)' },  // Rose
      { color: '#d97706', glow: 'rgba(217, 119, 6, 0.35)' },  // Amber
    ];

    const colorPalette = isDark ? darkPalette : lightPalette;

    const points: BrainPoint[] = [];
    const edges: BrainEdge[] = [];

    const addPoint = (
      x: number,
      y: number,
      z: number,
      colIdx: number,
      radius = 1.3
    ): number => {
      const palette = colorPalette[colIdx % colorPalette.length];
      points.push({
        x,
        y,
        z,
        radius,
        color: palette.color,
        glowColor: palette.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
      return points.length - 1;
    };

    const addEdge = (p1: number, p2: number, color: string) => {
      edges.push({
        p1,
        p2,
        color,
        progress: Math.random(),
        speed: 0.012 + Math.random() * 0.02,
      });
    };

    // =========================================================================
    // 3D HUMAN BRAIN NEURAL MESH GENERATION
    // =========================================================================
    [-1, 1].forEach((hemi) => {
      const xSign = hemi;
      const fissureGap = 0.16;

      // A. Frontal Lobe
      for (let lat = 0; lat < 9; lat++) {
        const u = lat / 8;
        const pointsInArc = 14;
        let lastIdx = -1;

        for (let i = 0; i < pointsInArc; i++) {
          const v = i / (pointsInArc - 1);
          const theta = v * (Math.PI * 0.55);
          const phi = u * (Math.PI * 0.45);

          const gyrusWave = 0.06 * Math.sin(v * 16 + u * 10);
          const r = 1.15 + gyrusWave;
          const px = fissureGap + Math.sin(phi) * 0.85 * r;
          const py = Math.cos(theta * 0.8) * 0.85 * r + 0.1;
          const pz = Math.sin(theta) * 1.15 * r;

          const col = px > 0.45 ? 0 : 1;
          const idx = addPoint(px * xSign, py, pz, col, Math.random() * 0.8 + 1.1);

          if (lastIdx !== -1 && Math.random() > 0.15) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // B. Parietal & Motor Cortex
      for (let stripe = 0; stripe < 8; stripe++) {
        const zPos = -0.05 - stripe * 0.12;
        const steps = 14;
        let lastIdx = -1;

        for (let j = 0; j < steps; j++) {
          const t = j / (steps - 1);
          const angle = t * (Math.PI * 0.52);

          const fold = 0.07 * Math.sin(t * 14 + stripe * 4);
          const r = 1.22 + fold;

          const px = fissureGap + Math.sin(angle) * 0.95 * r;
          const py = Math.cos(angle) * 0.95 * r + 0.15;
          const pz = zPos + Math.sin(t * 8) * 0.03;

          const col = 2;
          const idx = addPoint(px * xSign, py, pz, col, Math.random() * 0.8 + 1.1);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // C. Temporal Lobe
      for (let layer = 0; layer < 6; layer++) {
        const u = layer / 5;
        const steps = 13;
        let lastIdx = -1;

        for (let k = 0; k < steps; k++) {
          const v = k / (steps - 1);
          const z = -0.45 + v * 0.85;
          const fold = 0.05 * Math.sin(v * 12 + layer * 3);

          const px = 0.65 + Math.sin(v * Math.PI) * 0.42 + fold;
          const py = -0.22 - u * 0.38 + Math.cos(v * Math.PI) * 0.12;

          const col = 5;
          const idx = addPoint(px * xSign, py, z, col, Math.random() * 0.9 + 1.2);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // D. Occipital Lobe
      for (let ring = 0; ring < 7; ring++) {
        const u = ring / 6;
        const steps = 12;
        let lastIdx = -1;

        for (let m = 0; m < steps; m++) {
          const v = m / (steps - 1);
          const theta = Math.PI * 0.5 + v * (Math.PI * 0.45);
          const phi = u * (Math.PI * 0.45);

          const fold = 0.06 * Math.sin(v * 12 + ring * 5);
          const r = 1.1 + fold;

          const px = fissureGap + Math.sin(phi) * 0.8 * r;
          const py = Math.cos(theta * 0.85) * 0.85 * r + 0.1;
          const pz = -Math.sin(theta) * 1.22 * r;

          const col = 4;
          const idx = addPoint(px * xSign, py, pz, col, Math.random() * 0.8 + 1.1);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // E. Medial Wall
      for (let row = 0; row < 5; row++) {
        const yBase = 0.8 - row * 0.25;
        let lastIdx = -1;
        for (let col = 0; col < 9; col++) {
          const zBase = 0.8 - col * 0.2;
          const px = fissureGap + 0.04 * Math.sin(col * 3 + row * 2);
          const py = yBase + 0.05 * Math.sin(col * 4);
          const pz = zBase;

          const idx = addPoint(px * xSign, py, pz, 1, 1.0);
          if (lastIdx !== -1 && Math.random() > 0.3) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // F. Cerebellum
      for (let folia = 0; folia < 6; folia++) {
        const yFolia = -0.52 - folia * 0.09;
        const steps = 11;
        let lastIdx = -1;

        for (let n = 0; n < steps; n++) {
          const t = n / (steps - 1);
          const angle = t * Math.PI;

          const ripple = 0.03 * Math.sin(t * 24);
          const rx = 0.65 * Math.sin(angle) + ripple;
          const rz = -0.55 - Math.cos(angle) * 0.38;

          const px = (0.12 + rx * 0.85) * xSign;
          const py = yFolia + Math.sin(t * Math.PI) * 0.06;
          const pz = rz;

          const col = 6;
          const idx = addPoint(px, py, pz, col, 1.3);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }
    });

    // G. Brainstem & Pons
    for (let stemLayer = 0; stemLayer < 7; stemLayer++) {
      const yStem = -0.65 - stemLayer * 0.11;
      const ringSteps = 8;
      let firstIdx = -1;
      let lastIdx = -1;

      for (let s = 0; s < ringSteps; s++) {
        const angle = (s / ringSteps) * Math.PI * 2;
        const rad = 0.22 - stemLayer * 0.015;

        const px = Math.cos(angle) * rad;
        const py = yStem;
        const pz = -0.22 + Math.sin(angle) * rad * 0.85;

        const idx = addPoint(px, py, pz, 7, 1.2);
        if (s === 0) firstIdx = idx;
        if (lastIdx !== -1) {
          addEdge(lastIdx, idx, points[idx].color);
        }
        lastIdx = idx;
      }
      if (firstIdx !== -1 && lastIdx !== -1) {
        addEdge(lastIdx, firstIdx, points[firstIdx].color);
      }
    }

    // Connect cross-gyral synapses
    for (let i = 0; i < points.length; i += 6) {
      for (let j = i + 1; j < Math.min(points.length, i + 35); j++) {
        const p1 = points[i];
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq > 0.03 && distSq < 0.08 && Math.random() > 0.65) {
          addEdge(i, j, p1.color);
        }
      }
    }

    // =========================================================================
    // RENDER TICK: SCROLL-LINKED 3D KINEMATICS
    // =========================================================================
    interface ProjectedNode {
      x2d: number;
      y2d: number;
      depth: number;
      radius: number;
      alpha: number;
      color: string;
      glowColor: string;
      isPulse: boolean;
    }

    const projectedNodes: (ProjectedNode | null)[] = new Array(points.length);
    const sortedList: ProjectedNode[] = [];

    const render = () => {
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Smooth interpolation for mouse and scroll
      mouseCurrentRotX += (mouseTargetRotX - mouseCurrentRotX) * 0.06;
      mouseCurrentRotY += (mouseTargetRotY - mouseCurrentRotY) * 0.06;

      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.07;
      scrollVelocity *= 0.91;

      autoRotY += 0.004 + scrollVelocity * 0.01;

      // 3D Scroll Rotation Orchestration:
      // Smoothly revolutionizes across sections
      const scrollRotY = currentScrollProgress * (Math.PI * 4);
      const scrollRotX = Math.sin(currentScrollProgress * Math.PI * 2) * 0.42;
      const scrollRotZ = Math.sin(currentScrollProgress * Math.PI * 1.5) * 0.22;

      const totalRotY = autoRotY + mouseCurrentRotY + scrollRotY;
      const totalRotX = mouseCurrentRotX + scrollRotX;

      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);
      const cosX = Math.cos(totalRotX);
      const sinX = Math.sin(totalRotX);
      const cosZ = Math.cos(scrollRotZ);
      const sinZ = Math.sin(scrollRotZ);

      // Spatial Positioning across sections:
      let targetCenterX = displayWidth * 0.5;
      if (displayWidth >= 1024) {
        // In Projects (0.35 - 0.70), float gently to the right side
        if (currentScrollProgress > 0.35 && currentScrollProgress < 0.75) {
          targetCenterX = displayWidth * 0.62;
        } else if (currentScrollProgress >= 0.75) {
          targetCenterX = displayWidth * 0.5;
        }
      }

      // Vertical drift with gentle breathing motion
      const targetCenterY = displayHeight * (0.5 - Math.sin(currentScrollProgress * Math.PI) * 0.06);

      // Scale multiplier with subtle scroll-linked expansion
      const isMobileScreen = displayWidth < 640;
      const baseScale = Math.min(displayWidth, displayHeight) * (isMobileScreen ? 0.42 : 0.46);
      const scrollZoom = 1 + Math.sin(currentScrollProgress * Math.PI * 2.5) * 0.07 + scrollVelocity * 0.05;
      const scaleMultiplier = baseScale * scrollZoom;
      const cameraDistance = 3.6;

      // Reset projection structures
      sortedList.length = 0;

      // Active neural expansion factor during rapid scroll
      const expansion = 1 + scrollVelocity * 0.08;

      // Transform & Project Vertices
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.pulsePhase += p.pulseSpeed + scrollVelocity * 0.04;

        const breath = Math.sin(p.pulsePhase) * 0.025;
        const px0 = p.x * (1 + breath) * expansion;
        const py0 = p.y * (1 + breath) * expansion;
        const pz0 = p.z * (1 + breath) * expansion;

        // Rotate Y
        const x1 = px0 * cosY - pz0 * sinY;
        const z1 = px0 * sinY + pz0 * cosY;

        // Rotate X
        const y2 = py0 * cosX - z1 * sinX;
        const z2 = py0 * sinX + z1 * cosX;

        // Rotate Z (Roll)
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;
        const z3 = z2;

        const zTot = z3 + cameraDistance;
        if (zTot <= 0.2) {
          projectedNodes[i] = null;
          continue;
        }

        const scale = scaleMultiplier / zTot;
        const x2d = targetCenterX + x3 * scale;
        const y2d = targetCenterY - y3 * scale;

        // Depth Cueing & Theme Alpha Calibration
        const normZ = Math.max(0, Math.min(1, (z3 + 1.8) / 3.6));
        const alphaMultiplier = isDark ? 1.0 : 0.48;
        const alpha = (0.2 + normZ * 0.8) * alphaMultiplier;
        const isPulse = Math.sin(p.pulsePhase * 3) > 0.86;

        const node: ProjectedNode = {
          x2d,
          y2d,
          depth: zTot,
          radius: Math.max(0.7, p.radius * (scale / (scaleMultiplier / 3.6))),
          alpha,
          color: p.color,
          glowColor: p.glowColor,
          isPulse,
        };

        projectedNodes[i] = node;
        sortedList.push(node);
      }

      // Sort nodes back-to-front
      sortedList.sort((a, b) => b.depth - a.depth);

      // 1. Draw Synaptic Edges / Gyral Pathways
      ctx.lineWidth = isDark ? 0.85 : 0.7;
      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const n1 = projectedNodes[edge.p1];
        const n2 = projectedNodes[edge.p2];

        if (!n1 || !n2) continue;

        edge.progress += edge.speed * (1 + scrollVelocity * 2.2);
        if (edge.progress > 1) edge.progress = 0;

        const avgDepth = (n1.depth + n2.depth) / 2;
        const maxDepthAlpha = isDark ? 0.36 : 0.22;
        const lineAlpha = Math.max(0.03, Math.min(maxDepthAlpha, (4.6 - avgDepth) * 0.22));

        ctx.strokeStyle = edge.color;
        ctx.globalAlpha = lineAlpha;
        ctx.beginPath();
        ctx.moveTo(n1.x2d, n1.y2d);
        ctx.lineTo(n2.x2d, n2.y2d);
        ctx.stroke();

        // Synaptic firing spark along the neural axon
        if (lineAlpha > 0.1) {
          const sparkX = n1.x2d + (n2.x2d - n1.x2d) * edge.progress;
          const sparkY = n1.y2d + (n2.y2d - n1.y2d) * edge.progress;
          ctx.fillStyle = isDark ? '#ffffff' : '#4338ca';
          ctx.globalAlpha = lineAlpha * (isDark ? 2.4 : 1.5);
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw Colorful Brain Dots with Glows
      for (let i = 0; i < sortedList.length; i++) {
        const pt = sortedList[i];

        // Soft Outer Glow for front dots or pulsing thoughts
        if (pt.isPulse || pt.depth < 3.2) {
          ctx.fillStyle = pt.glowColor;
          ctx.globalAlpha = pt.alpha * (isDark ? 0.6 : 0.35);
          ctx.beginPath();
          ctx.arc(pt.x2d, pt.y2d, pt.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core Sharp Colorful Dot
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.beginPath();
        ctx.arc(pt.x2d, pt.y2d, pt.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-15"
      style={{
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
};
