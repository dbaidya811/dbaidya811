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

export const Brain3DBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Camera angles
    let targetRotX = 0.2;
    let targetRotY = 0.45; // Start in 3/4 isometric perspective where brain shape is most iconic
    let currentRotX = 0.2;
    let currentRotY = 0.45;
    let autoRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = normX * 0.6;
      targetRotX = -normY * 0.45 + 0.2;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // COLOR PALETTE FOR NEURAL DOTS
    const colorPalette = [
      { color: '#10b981', glow: 'rgba(16, 185, 129, 0.7)' }, // Emerald
      { color: '#34d399', glow: 'rgba(52, 211, 153, 0.7)' }, // Mint
      { color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.7)' },  // Cyan
      { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.7)' },  // Electric Blue
      { color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.7)' }, // Violet
      { color: '#d946ef', glow: 'rgba(217, 70, 239, 0.7)' }, // Neon Magenta
      { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.7)' },  // Rose
      { color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.7)' },  // Amber
    ];

    const points: BrainPoint[] = [];
    const edges: BrainEdge[] = [];

    // HELPER: Adds a point and returns its index
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

    // HELPER: Connects two points
    const addEdge = (p1: number, p2: number, color: string) => {
      edges.push({
        p1,
        p2,
        color,
        progress: Math.random(),
        speed: 0.01 + Math.random() * 0.02,
      });
    };

    // =========================================================================
    // ANATOMICALLY ACCURATE 3D HUMAN BRAIN MODEL
    // Features:
    // 1. Two distinct hemispheres separated by Longitudinal Fissure (central gap)
    // 2. High arched Frontal & Parietal cortex
    // 3. Prominent Temporal Lobe curving at lower lateral sides with Sylvian fissure
    // 4. Rounded Occipital pole at the posterior
    // 5. Distinct Cerebellum underneath with horizontal striations
    // 6. Brainstem extending at central bottom
    // =========================================================================

    // Generate Hemispheres (-1 for Left, +1 for Right)
    [-1, 1].forEach((hemi) => {
      const xSign = hemi;
      const fissureGap = 0.16; // Clear central separation between hemispheres

      // A. Frontal Lobe (Anterior top and front dome)
      for (let lat = 0; lat < 9; lat++) {
        const u = lat / 8; // 0 to 1
        const pointsInArc = 14;
        let lastIdx = -1;

        for (let i = 0; i < pointsInArc; i++) {
          const v = i / (pointsInArc - 1);
          // Angle from anterior pole to coronal region
          const theta = v * (Math.PI * 0.55);
          const phi = u * (Math.PI * 0.45);

          // Winding gyral convolution
          const gyrusWave = 0.06 * Math.sin(v * 16 + u * 10);

          const r = 1.15 + gyrusWave;
          const px = fissureGap + Math.sin(phi) * 0.85 * r;
          const py = Math.cos(theta * 0.8) * 0.85 * r + 0.1;
          const pz = Math.sin(theta) * 1.15 * r;

          const col = px > 0.45 ? 0 : 1; // Emerald / Mint
          const idx = addPoint(px * xSign, py, pz, col, Math.random() * 0.8 + 1.1);

          if (lastIdx !== -1 && Math.random() > 0.15) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // B. Parietal & Motor Cortex (Superior crown & vertical central sulci)
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

          const col = 2; // Cyan / Electric Blue
          const idx = addPoint(px * xSign, py, pz, col, Math.random() * 0.8 + 1.1);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // C. Temporal Lobe (Iconic curved pouch below Sylvian fissure on lateral sides)
      for (let layer = 0; layer < 6; layer++) {
        const u = layer / 5;
        const steps = 13;
        let lastIdx = -1;

        for (let k = 0; k < steps; k++) {
          const v = k / (steps - 1);
          // Curves forward from z = -0.5 to z = +0.45
          const z = -0.45 + v * 0.85;
          const fold = 0.05 * Math.sin(v * 12 + layer * 3);

          // Bulges out laterally, then curls under
          const px = 0.65 + Math.sin(v * Math.PI) * 0.42 + fold;
          const py = -0.22 - u * 0.38 + Math.cos(v * Math.PI) * 0.12;

          const col = 5; // Neon Magenta / Rose
          const idx = addPoint(px * xSign, py, z, col, Math.random() * 0.9 + 1.2);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // D. Occipital Lobe (Posterior back rounded dome)
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
          const py = Math.cos(theta) * 0.85 * r + 0.1;
          const pz = -Math.sin(theta) * 1.22 * r;

          const col = 4; // Violet
          const idx = addPoint(px * xSign, py, pz, col, Math.random() * 0.8 + 1.1);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }

      // E. Medial Wall (Flat inner wall along the longitudinal fissure)
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

      // F. Cerebellum (Tucked under occipital lobe with horizontal folia striations)
      for (let folia = 0; folia < 6; folia++) {
        const yFolia = -0.52 - folia * 0.09;
        const steps = 11;
        let lastIdx = -1;

        for (let n = 0; n < steps; n++) {
          const t = n / (steps - 1);
          const angle = t * Math.PI;

          // Horizontal folia ripples
          const ripple = 0.03 * Math.sin(t * 24);
          const rx = 0.65 * Math.sin(angle) + ripple;
          const rz = -0.55 - Math.cos(angle) * 0.38;

          const px = (0.12 + rx * 0.85) * xSign;
          const py = yFolia + Math.sin(t * Math.PI) * 0.06;
          const pz = rz;

          const col = 6; // Rose / Amber
          const idx = addPoint(px, py, pz, col, 1.3);

          if (lastIdx !== -1) {
            addEdge(lastIdx, idx, points[idx].color);
          }
          lastIdx = idx;
        }
      }
    });

    // G. Brainstem & Pons (Vertical cylinder at bottom center)
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

        const idx = addPoint(px, py, pz, 7, 1.2); // Amber
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

    // Connect some cross-gyral synapses for authentic brain network density
    for (let i = 0; i < points.length; i += 6) {
      for (let j = i + 1; j < Math.min(points.length, i + 35); j++) {
        const p1 = points[i];
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        // Connect only close neighbors
        if (distSq > 0.03 && distSq < 0.08 && Math.random() > 0.65) {
          addEdge(i, j, p1.color);
        }
      }
    }

    // =========================================================================
    // 3D ANIMATION & RENDERING LOOP
    // =========================================================================

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      // Slow continuous auto rotation
      autoRotY += 0.005;

      const totalRotY = autoRotY + currentRotY;
      const totalRotX = currentRotX;

      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);
      const cosX = Math.cos(totalRotX);
      const sinX = Math.sin(totalRotX);

      // Perspective parameters
      // Brain scale sized to comfortably sit behind the hero section
      const scaleMultiplier = Math.min(width, height) * 0.44;
      const cameraDistance = 3.6;
      const centerX = width / 2;
      const centerY = height / 2;

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

      // Transform & project vertices
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.pulsePhase += p.pulseSpeed;

        // Subtle neural breathing pulsation
        const breath = Math.sin(p.pulsePhase) * 0.02;
        const px = p.x * (1 + breath);
        const py = p.y * (1 + breath);
        const pz = p.z * (1 + breath);

        // Rotate Y then Rotate X
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;

        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const zTot = z2 + cameraDistance;
        if (zTot <= 0.2) {
          projectedNodes[i] = null;
          continue;
        }

        const scale = scaleMultiplier / zTot;
        const x2d = centerX + x1 * scale;
        const y2d = centerY - y2 * scale; // Invert Y for screen coords

        // Depth cueing
        const normZ = Math.max(0, Math.min(1, (z2 + 1.8) / 3.6));
        const alpha = 0.22 + normZ * 0.78;
        const isPulse = Math.sin(p.pulsePhase * 3) > 0.88;

        const node: ProjectedNode = {
          x2d,
          y2d,
          depth: zTot,
          radius: Math.max(0.8, p.radius * (scale / (scaleMultiplier / 3.6))),
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
      ctx.lineWidth = 0.85;
      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const n1 = projectedNodes[edge.p1];
        const n2 = projectedNodes[edge.p2];

        if (!n1 || !n2) continue;

        edge.progress += edge.speed;
        if (edge.progress > 1) edge.progress = 0;

        const avgDepth = (n1.depth + n2.depth) / 2;
        const lineAlpha = Math.max(0.04, Math.min(0.35, (4.6 - avgDepth) * 0.22));

        ctx.strokeStyle = edge.color;
        ctx.globalAlpha = lineAlpha;
        ctx.beginPath();
        ctx.moveTo(n1.x2d, n1.y2d);
        ctx.lineTo(n2.x2d, n2.y2d);
        ctx.stroke();

        // Synaptic firing spark along the neural axon
        if (lineAlpha > 0.12) {
          const sparkX = n1.x2d + (n2.x2d - n1.x2d) * edge.progress;
          const sparkY = n1.y2d + (n2.y2d - n1.y2d) * edge.progress;
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = lineAlpha * 2.5;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw Colorful Brain Dots with Glows
      for (let i = 0; i < sortedList.length; i++) {
        const pt = sortedList[i];

        // Soft Outer Glow for front dots or pulsing thoughts
        if (pt.isPulse || pt.depth < 3.2) {
          ctx.fillStyle = pt.glowColor;
          ctx.globalAlpha = pt.alpha * 0.55;
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
};
