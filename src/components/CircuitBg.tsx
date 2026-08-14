import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  type: 'via' | 'junction' | 'chip_pad';
  energy: number;
  connections: number[];
}

interface Segment {
  startIndex: number;
  endIndex: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  energy: number;
  isBaseTraced: boolean;
}

interface Pulse {
  segmentIndex: number;
  fromStart: boolean;
  progress: number;
  speed: number;
  length: number;
  color: string;
  glowColor: string;
  size: number;
  intensity: number;
}

interface Arc {
  points: { x: number; y: number }[];
  life: number;
  maxLife: number;
  color: string;
  width: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
}

export const CircuitBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      prevX: -1000,
      prevY: -1000,
      speed: 0,
      isNear: false,
      lastMoveTime: 0,
    };

    let nodes: Node[] = [];
    let segments: Segment[] = [];
    let pulses: Pulse[] = [];
    let arcs: Arc[] = [];
    let sparks: Spark[] = [];
    let shockwaves: Shockwave[] = [];

    // Compact, tight cursor interaction radius
    const PROXIMITY_RADIUS = 110;

    const getPalettes = () => {
      const isLight = themeRef.current === 'light';
      return isLight
        ? [
            { core: '#0284c7', glow: 'rgba(2, 132, 199, 0.6)' },
            { core: '#059669', glow: 'rgba(5, 150, 105, 0.6)' },
            { core: '#0369a1', glow: 'rgba(3, 105, 161, 0.6)' },
          ]
        : [
            { core: '#ffffff', glow: '#33d6f0' },
            { core: '#e0ffff', glow: '#00f5d4' },
            { core: '#ffffff', glow: '#4fe0a8' },
          ];
    };

    // Build procedural VLSI circuit netlist
    const buildCircuitNetlist = () => {
      nodes = [];
      segments = [];
      pulses = [];

      const gridSize = Math.max(65, Math.min(85, Math.floor(Math.min(width, height) / 14)));
      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;
      const nodeGrid: (number | null)[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(null)
      );

      // 1. Generate Nodes (Vias & Pads)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const shouldCreate = (r + c) % 2 === 0 || Math.random() > 0.35;
          if (!shouldCreate) continue;

          const baseX = c * gridSize - gridSize / 2;
          const baseY = r * gridSize - gridSize / 2;
          const offsetX = ((c * 17 + r * 31) % 11) - 5;
          const offsetY = ((c * 29 + r * 13) % 11) - 5;

          const nodeIdx = nodes.length;
          const isPad = Math.random() < 0.15;

          nodes.push({
            x: baseX + offsetX,
            y: baseY + offsetY,
            type: isPad ? 'chip_pad' : Math.random() < 0.3 ? 'junction' : 'via',
            energy: 0,
            connections: [],
          });

          nodeGrid[r][c] = nodeIdx;
        }
      }

      // Helper to connect nodes
      const addSegment = (n1Idx: number, n2Idx: number) => {
        if (n1Idx === n2Idx) return;
        const n1 = nodes[n1Idx];
        const n2 = nodes[n2Idx];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const length = Math.hypot(dx, dy);

        const exists = segments.some(
          (s) =>
            (s.startIndex === n1Idx && s.endIndex === n2Idx) ||
            (s.startIndex === n2Idx && s.endIndex === n1Idx)
        );
        if (exists) return;

        const segIdx = segments.length;
        segments.push({
          startIndex: n1Idx,
          endIndex: n2Idx,
          x1: n1.x,
          y1: n1.y,
          x2: n2.x,
          y2: n2.y,
          length,
          energy: 0,
          isBaseTraced: Math.random() < 0.55,
        });

        n1.connections.push(segIdx);
        n2.connections.push(segIdx);
      };

      // 2. Connect Nodes with PCB routing (Orthogonal & 45-deg)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const currIdx = nodeGrid[r][c];
          if (currIdx === null) continue;

          if (c + 1 < cols && nodeGrid[r][c + 1] !== null && Math.random() < 0.7) {
            addSegment(currIdx, nodeGrid[r][c + 1]!);
          }
          if (r + 1 < rows && nodeGrid[r + 1][c] !== null && Math.random() < 0.7) {
            addSegment(currIdx, nodeGrid[r + 1][c]!);
          }
          if (r + 1 < rows && c + 1 < cols && nodeGrid[r + 1][c + 1] !== null && Math.random() < 0.35) {
            addSegment(currIdx, nodeGrid[r + 1][c + 1]!);
          }
          if (r + 1 < rows && c - 1 >= 0 && nodeGrid[r + 1][c - 1] !== null && Math.random() < 0.25) {
            addSegment(currIdx, nodeGrid[r + 1][c - 1]!);
          }
        }
      }

      // 3. Seed subtle ambient pulses
      const initialCount = Math.min(14, Math.floor(segments.length / 20));
      for (let i = 0; i < initialCount; i++) {
        spawnPulse(Math.floor(Math.random() * segments.length), false, 0.4);
      }
    };

    // Spawn an electric pulse
    const spawnPulse = (
      segmentIndex: number,
      highEnergy = false,
      customIntensity = 0.8
    ) => {
      if (segmentIndex < 0 || segmentIndex >= segments.length) return;
      if (pulses.length > (highEnergy ? 40 : 20)) return;

      const palettes = getPalettes();
      const colorScheme = palettes[Math.floor(Math.random() * palettes.length)];
      pulses.push({
        segmentIndex,
        fromStart: Math.random() > 0.5,
        progress: Math.random() * 0.2,
        speed: (highEnergy ? 0.014 + Math.random() * 0.016 : 0.005 + Math.random() * 0.007) * (1 + mouse.speed * 0.04),
        length: highEnergy ? 0.12 + Math.random() * 0.1 : 0.08 + Math.random() * 0.06,
        color: colorScheme.core,
        glowColor: colorScheme.glow,
        size: highEnergy ? 1.3 + Math.random() * 0.3 : 0.9,
        intensity: customIntensity,
      });
    };

    // Generate Jagged Lightning Arc
    const createLightningArc = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace = 10
    ) => {
      if (arcs.length > 2) return;
      const pts: { x: number; y: number }[] = [{ x: x1, y: y1 }];

      const subdivide = (
        p1: { x: number; y: number },
        p2: { x: number; y: number },
        disp: number
      ) => {
        if (disp < 2.5) return;
        const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * disp;
        const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * disp;
        const mid = { x: midX, y: midY };

        subdivide(p1, mid, disp / 2);
        pts.push(mid);
        subdivide(mid, p2, disp / 2);
      };

      subdivide({ x: x1, y: y1 }, { x: x2, y: y2 }, displace);
      pts.push({ x: x2, y: y2 });

      const isLight = themeRef.current === 'light';
      arcs.push({
        points: pts,
        life: 4 + Math.floor(Math.random() * 3),
        maxLife: 7,
        color: isLight ? '#0284c7' : Math.random() > 0.4 ? '#33d6f0' : '#4fe0a8',
        width: 0.8,
      });
    };

    // Spawn Spark Micro-Particles
    const spawnSparks = (x: number, y: number, count = 3) => {
      const isLight = themeRef.current === 'light';
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.6;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 15 + Math.random() * 15,
          color: isLight ? '#0284c7' : Math.random() > 0.3 ? '#33d6f0' : '#4fe0a8',
          size: Math.random() * 1.0 + 0.6,
        });
      }
    };

    // Distance calculation
    const distToSegment = (
      px: number,
      py: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) => {
      const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
      if (l2 === 0) return Math.hypot(px - x1, py - y1);
      let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
      t = Math.max(0, Math.min(1, t));
      return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
    };

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      buildCircuitNetlist();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Global Pointer Events
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - (mouse.lastMoveTime || now));
      mouse.lastMoveTime = now;

      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      if (mouse.x < -500) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.prevX = mouse.targetX;
        mouse.prevY = mouse.targetY;
      }

      const moveDist = Math.hypot(mouse.targetX - mouse.prevX, mouse.targetY - mouse.prevY);
      mouse.speed = Math.min(7, moveDist / (dt / 16));
      mouse.prevX = mouse.targetX;
      mouse.prevY = mouse.targetY;
      mouse.isNear = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
        mouse.isNear = true;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 180,
        intensity: 0.55,
      });

      spawnSparks(e.clientX, e.clientY, 5);

      segments.forEach((seg, idx) => {
        const d = distToSegment(e.clientX, e.clientY, seg.x1, seg.y1, seg.x2, seg.y2);
        if (d < 140) {
          seg.energy = Math.max(seg.energy, 0.7);
          if (Math.random() < 0.5) spawnPulse(idx, true, 0.8);
        }
      });
    };

    const onMouseLeave = () => {
      mouse.isNear = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Main 60FPS Rendering Loop
    let arcCooldown = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const isLight = themeRef.current === 'light';

      if (mouse.targetX > -500) {
        mouse.x += (mouse.targetX - mouse.x) * 0.22;
        mouse.y += (mouse.targetY - mouse.y) * 0.22;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      mouse.speed *= 0.9;

      ctx.clearRect(0, 0, width, height);

      // 1. Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 8;
        sw.intensity *= 0.93;

        if (sw.radius > sw.maxRadius || sw.intensity < 0.02) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(2, 132, 199, ${sw.intensity * 0.35})`
          : `rgba(51, 214, 240, ${sw.intensity * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Focused Cursor Electric Voltage Field
      if (mouse.isNear && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const auraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          PROXIMITY_RADIUS
        );
        if (isLight) {
          auraGrad.addColorStop(0, 'rgba(2, 132, 199, 0.08)');
          auraGrad.addColorStop(0.5, 'rgba(5, 150, 105, 0.03)');
        } else {
          auraGrad.addColorStop(0, 'rgba(51, 214, 240, 0.06)');
          auraGrad.addColorStop(0.5, 'rgba(0, 245, 212, 0.02)');
        }
        auraGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, PROXIMITY_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Update Nodes & Segments
      const closestNodesForArc: Node[] = [];

      nodes.forEach((node) => {
        let dist = 9999;
        if (mouse.isNear) {
          dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        }

        let targetEnergy = 0;
        if (dist < PROXIMITY_RADIUS) {
          targetEnergy = Math.pow(1 - dist / PROXIMITY_RADIUS, 1.4);
          if (dist < 60) {
            closestNodesForArc.push(node);
          }
        }

        if (targetEnergy > node.energy) {
          node.energy += (targetEnergy - node.energy) * 0.35;
        } else {
          node.energy += (targetEnergy - node.energy) * 0.04;
        }
      });

      segments.forEach((seg, idx) => {
        let dist = 9999;
        if (mouse.isNear) {
          dist = distToSegment(mouse.x, mouse.y, seg.x1, seg.y1, seg.x2, seg.y2);
        }

        let targetEnergy = 0;
        if (dist < PROXIMITY_RADIUS) {
          targetEnergy = Math.pow(1 - dist / PROXIMITY_RADIUS, 1.3);

          if (targetEnergy > 0.4 && Math.random() < 0.05 * targetEnergy) {
            spawnPulse(idx, true, targetEnergy);
          }
        }

        if (targetEnergy > seg.energy) {
          seg.energy += (targetEnergy - seg.energy) * 0.3;
        } else {
          seg.energy += (targetEnergy - seg.energy) * 0.035;
        }
      });

      // 4. Draw Circuit Traces
      segments.forEach((seg) => {
        const energy = seg.energy;
        const isHot = energy > 0.04;

        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);

        if (isHot) {
          ctx.save();
          const alpha = isLight ? 0.15 + energy * 0.5 : 0.08 + energy * 0.4;
          const lineWidth = 0.7 + energy * 0.8;
          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = isLight
            ? `rgba(2, 132, 199, ${alpha})`
            : `rgba(51, 214, 240, ${alpha})`;
          if (energy > 0.3 && !isLight) {
            ctx.shadowColor = '#33d6f0';
            ctx.shadowBlur = energy * 7;
          }
          ctx.stroke();
          ctx.restore();
        } else if (seg.isBaseTraced) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = isLight
            ? 'rgba(100, 116, 139, 0.12)'
            : 'rgba(51, 214, 240, 0.06)';
          ctx.stroke();
        }
      });

      // 5. Draw Vias & Semiconductor Pads
      nodes.forEach((node) => {
        const energy = node.energy;
        const isHot = energy > 0.04;

        ctx.save();
        if (node.type === 'chip_pad') {
          const padSize = 2.8 + energy * 1.6;
          ctx.beginPath();
          ctx.rect(node.x - padSize / 2, node.y - padSize / 2, padSize, padSize);

          if (isHot) {
            ctx.fillStyle = isLight
              ? `rgba(5, 150, 105, ${0.3 + energy * 0.5})`
              : `rgba(79, 224, 168, ${0.2 + energy * 0.4})`;
            ctx.strokeStyle = isLight ? '#059669' : 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 0.7;
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.fillStyle = isLight ? 'rgba(203, 213, 225, 0.6)' : 'rgba(28, 39, 51, 0.4)';
            ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.2)' : 'rgba(51, 214, 240, 0.1)';
            ctx.lineWidth = 0.5;
            ctx.fill();
            ctx.stroke();
          }
        } else {
          const radius = (node.type === 'junction' ? 1.6 : 1.1) + energy * 1.0;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

          if (isHot) {
            ctx.fillStyle = isLight ? '#0284c7' : energy > 0.5 ? '#ffffff' : '#33d6f0';
            ctx.fill();
          } else {
            ctx.fillStyle = isLight ? 'rgba(100, 116, 139, 0.2)' : 'rgba(51, 214, 240, 0.08)';
            ctx.fill();
          }
        }
        ctx.restore();
      });

      // 6. Update & Draw Electric Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        const seg = segments[p.segmentIndex];
        if (!seg) {
          pulses.splice(i, 1);
          continue;
        }

        if (p.progress >= 1) {
          const targetNodeIdx = p.fromStart ? seg.endIndex : seg.startIndex;
          const targetNode = nodes[targetNodeIdx];

          if (p.intensity > 0.6 && Math.random() < 0.2) {
            spawnSparks(targetNode.x, targetNode.y, 2);
          }

          if (targetNode && targetNode.connections.length > 1 && Math.random() < 0.7) {
            const nextSegs = targetNode.connections.filter((cIdx) => cIdx !== p.segmentIndex);
            const nextSegIdx = nextSegs[Math.floor(Math.random() * nextSegs.length)] ?? p.segmentIndex;
            const nextSeg = segments[nextSegIdx];

            p.segmentIndex = nextSegIdx;
            p.fromStart = nextSeg.startIndex === targetNodeIdx;
            p.progress = 0;
            p.intensity *= 0.85;
          } else {
            pulses.splice(i, 1);
            continue;
          }
        }

        const actualProgress = p.fromStart ? p.progress : 1 - p.progress;
        const tailProgress = Math.max(0, Math.min(1, p.fromStart ? p.progress - p.length : 1 - p.progress + p.length));

        const headX = seg.x1 + (seg.x2 - seg.x1) * actualProgress;
        const headY = seg.y1 + (seg.y2 - seg.y1) * actualProgress;
        const tailX = seg.x1 + (seg.x2 - seg.x1) * tailProgress;
        const tailY = seg.y1 + (seg.y2 - seg.y1) * tailProgress;

        ctx.save();
        const pulseGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        pulseGrad.addColorStop(0, 'transparent');
        pulseGrad.addColorStop(0.7, p.glowColor);
        pulseGrad.addColorStop(1, p.color);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = p.size * (1 + seg.energy * 0.3);
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(headX, headY, p.size * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#0284c7' : '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // 7. Ambient Pulse Spawner
      if (pulses.length < 15 && Math.random() < 0.04) {
        spawnPulse(Math.floor(Math.random() * segments.length), false, 0.4);
      }

      // 8. Tightly focused Lightning Arcs
      arcCooldown++;
      if (
        mouse.isNear &&
        closestNodesForArc.length >= 2 &&
        arcCooldown > 20 &&
        Math.random() < 0.28
      ) {
        arcCooldown = 0;
        const n1 = closestNodesForArc[Math.floor(Math.random() * closestNodesForArc.length)];
        const n2 = closestNodesForArc[Math.floor(Math.random() * closestNodesForArc.length)];
        if (n1 !== n2) {
          createLightningArc(n1.x, n1.y, n2.x, n2.y, 8);
        }
      }

      // Draw Arcs
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.life--;

        if (arc.life <= 0) {
          arcs.splice(i, 1);
          continue;
        }

        const alpha = (arc.life / arc.maxLife) * (isLight ? 0.6 : 0.5);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(arc.points[0].x, arc.points[0].y);
        for (let pIdx = 1; pIdx < arc.points.length; pIdx++) {
          ctx.lineTo(arc.points[pIdx].x, arc.points[pIdx].y);
        }

        ctx.strokeStyle = arc.color;
        ctx.lineWidth = arc.width;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.restore();
      }

      // 9. Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life++;

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const alpha = (1 - s.life / s.maxLife) * 0.55;
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - s.life / s.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-bgDark transition-colors duration-300" aria-hidden="true">
      {/* Clean Ambient Radial Gradients */}
      <div className="absolute top-0 left-[10%] w-[800px] h-[500px] bg-cyanNeon/5 rounded-full blur-3xl" />
      <div className="absolute top-[25%] right-[5%] w-[600px] h-[500px] bg-greenNeon/4 rounded-full blur-3xl" />
      <div className="absolute bottom-[20%] left-[20%] w-[700px] h-[600px] bg-cyanNeon/4 rounded-full blur-3xl" />

      {/* Clean High-Tech Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_20%,black_40%,transparent_90%)]" />

      {/* Interactive Electric Flow Canvas (30% Opacity) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      />
    </div>
  );
};
