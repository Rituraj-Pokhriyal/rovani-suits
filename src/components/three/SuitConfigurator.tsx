"use client";
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ─── Fabric texture generator ────────────────────────────────────────────────
function generateFabricTexture(
  pattern: "twill" | "herringbone" | "plain" | "houndstooth",
  hex: string
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base color
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, size, size);

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lighter = `rgba(${Math.min(r + 30, 255)},${Math.min(g + 30, 255)},${Math.min(b + 30, 255)},0.35)`;
  const darker = `rgba(${Math.max(r - 25, 0)},${Math.max(g - 25, 0)},${Math.max(b - 25, 0)},0.4)`;

  if (pattern === "twill") {
    ctx.strokeStyle = lighter;
    ctx.lineWidth = 1.5;
    for (let i = -size; i < size * 2; i += 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + size, size);
      ctx.stroke();
    }
  } else if (pattern === "herringbone") {
    ctx.strokeStyle = lighter;
    ctx.lineWidth = 1.2;
    const step = 8;
    for (let y = 0; y < size; y += step * 2) {
      for (let x = -step; x < size + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + step, y + step);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + step, y + step);
        ctx.lineTo(x, y + step * 2);
        ctx.stroke();
      }
    }
  } else if (pattern === "houndstooth") {
    const tileSize = 16;
    ctx.fillStyle = darker;
    for (let row = 0; row < size / tileSize; row++) {
      for (let col = 0; col < size / tileSize; col++) {
        const x = col * tileSize;
        const y = row * tileSize;
        const even = (row + col) % 2 === 0;
        if (even) {
          ctx.fillRect(x, y, tileSize / 2, tileSize / 2);
          ctx.fillRect(x + tileSize / 2, y + tileSize / 2, tileSize / 2, tileSize / 2);
        }
      }
    }
  } else {
    // plain — subtle horizontal lines
    ctx.strokeStyle = lighter;
    ctx.lineWidth = 0.8;
    for (let y = 0; y < size; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// ─── Lining color map ────────────────────────────────────────────────────────
const LINING_COLORS: Record<string, string> = {
  "full-gold": "#C9A96E",
  "half-cream": "#F5F3F0",
  "bespoke-lining": "#7a4080",
};

// ─── Suit geometry builders ──────────────────────────────────────────────────
function buildJacketShape(isDouble: boolean): THREE.Shape {
  const shape = new THREE.Shape();
  if (isDouble) {
    // Wider double-breasted overlap
    shape.moveTo(-0.62, -1.1);
    shape.lineTo(-0.62, 0.85);
    shape.lineTo(-0.18, 1.1);
    shape.lineTo(0.18, 1.1);
    shape.lineTo(0.62, 0.85);
    shape.lineTo(0.62, -1.1);
    shape.closePath();
  } else {
    // Single-breasted
    shape.moveTo(-0.58, -1.1);
    shape.lineTo(-0.58, 0.82);
    shape.lineTo(-0.14, 1.08);
    shape.lineTo(0.14, 1.08);
    shape.lineTo(0.58, 0.82);
    shape.lineTo(0.58, -1.1);
    shape.closePath();
  }
  return shape;
}

function buildNotchLapelShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(-0.16, 0.32);
  shape.lineTo(-0.05, 0.46);
  shape.lineTo(-0.22, 0.62);
  shape.lineTo(-0.09, 0.72);
  shape.lineTo(0.04, 0.55);
  shape.lineTo(0.04, 0.1);
  shape.closePath();
  return shape;
}

function buildPeakLapelShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(-0.12, 0.28);
  shape.lineTo(-0.28, 0.60);
  shape.lineTo(-0.08, 0.72);
  shape.lineTo(0.04, 0.55);
  shape.lineTo(0.04, 0.1);
  shape.closePath();
  return shape;
}

// ─── Jacket mesh ─────────────────────────────────────────────────────────────
function JacketBody({
  style,
  color,
  roughness,
  pattern,
  buttons,
  lining,
}: {
  style: string;
  color: string;
  roughness: number;
  pattern: "twill" | "herringbone" | "plain" | "houndstooth";
  buttons: string;
  lining: string;
}) {
  const isDouble = style === "double-peak";

  const fabricTexture = useMemo(
    () => (typeof window !== "undefined" ? generateFabricTexture(pattern, color) : null),
    [pattern, color]
  );

  const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.01, bevelSegments: 2 };
  const jacketShape = useMemo(() => buildJacketShape(isDouble), [isDouble]);
  const lapelShape = useMemo(
    () => (style === "single-notch" ? buildNotchLapelShape() : buildPeakLapelShape()),
    [style]
  );

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness,
        metalness: 0.04,
        map: fabricTexture ?? undefined,
      }),
    [color, roughness, fabricTexture]
  );

  const buttonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        roughness: 0.3,
        metalness: 0.5,
      }),
    []
  );

  const shirtMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f8f6f2"),
        roughness: 0.9,
        metalness: 0,
      }),
    []
  );

  const liningMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(LINING_COLORS[lining] ?? "#C9A96E"),
        roughness: 0.5,
        metalness: 0.1,
        side: THREE.BackSide,
      }),
    [lining]
  );

  // Button count
  const buttonYPositions = useMemo(() => {
    if (isDouble) return [-0.15, 0.05, 0.25, -0.35, -0.55, 0.45];
    if (buttons === "3-button") return [0.05, -0.22, -0.49];
    return [0.0, -0.32]; // 2-button
  }, [buttons, isDouble]);

  // Sleeve curve points
  const sleevePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      pts.push(new THREE.Vector3(0, -t * 1.1, t * 0.04));
    }
    return pts;
  }, []);

  const sleeveGeom = useMemo(
    () => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sleevePoints), 12, 0.1 - 0.025, 8, false),
    [sleevePoints]
  );

  return (
    <group position={[0, 0.1, 0]}>
      {/* Main jacket body */}
      <mesh material={mat} castShadow>
        <extrudeGeometry args={[jacketShape, extrudeSettings]} />
      </mesh>

      {/* Inner lining visible from back/sides */}
      <mesh material={liningMat} castShadow>
        <extrudeGeometry args={[jacketShape, { ...extrudeSettings, depth: 0.06 }]} />
      </mesh>

      {/* Left lapel */}
      {!isDouble && (
        <mesh material={mat} position={[0, 0, 0.09]}>
          <extrudeGeometry args={[lapelShape, { depth: 0.04, bevelEnabled: false }]} />
        </mesh>
      )}
      {/* Right lapel (mirrored) */}
      {!isDouble && (
        <mesh material={mat} position={[0, 0, 0.09]} scale={[-1, 1, 1]}>
          <extrudeGeometry args={[lapelShape, { depth: 0.04, bevelEnabled: false }]} />
        </mesh>
      )}

      {/* Shirt collar strip */}
      <mesh material={shirtMat} position={[0, 0.75, 0.1]}>
        <boxGeometry args={[0.18, 0.22, 0.02]} />
      </mesh>

      {/* Left sleeve */}
      <mesh geometry={sleeveGeom} material={mat} position={[-0.58, 0.82, 0.04]} rotation={[0, 0, -0.18]} castShadow />
      {/* Right sleeve */}
      <mesh geometry={sleeveGeom} material={mat} position={[0.58, 0.82, 0.04]} rotation={[0, 0, 0.18]} castShadow />

      {/* Shoulder pads */}
      <mesh material={mat} position={[-0.52, 0.85, 0.04]}>
        <boxGeometry args={[0.22, 0.08, 0.1]} />
      </mesh>
      <mesh material={mat} position={[0.52, 0.85, 0.04]}>
        <boxGeometry args={[0.22, 0.08, 0.1]} />
      </mesh>

      {/* Buttons */}
      {buttonYPositions.map((y, i) => (
        <mesh key={i} material={buttonMat} position={[isDouble ? (i < 3 ? -0.1 : 0.1) : 0, y, 0.09]}>
          <sphereGeometry args={[0.024, 8, 8]} />
        </mesh>
      ))}

      {/* Chest pocket flap */}
      <mesh material={mat} position={[-0.28, 0.38, 0.1]}>
        <boxGeometry args={[0.14, 0.04, 0.02]} />
      </mesh>

      {/* Hip pockets (×2) */}
      <mesh material={mat} position={[-0.3, -0.55, 0.1]}>
        <boxGeometry args={[0.2, 0.05, 0.022]} />
      </mesh>
      <mesh material={mat} position={[0.3, -0.55, 0.1]}>
        <boxGeometry args={[0.2, 0.05, 0.022]} />
      </mesh>

      {/* Waistcoat (three-piece only) */}
      {style === "three-piece" && (
        <mesh material={mat} position={[0, 0.1, 0.07]}>
          <boxGeometry args={[0.44, 0.9, 0.03]} />
        </mesh>
      )}
    </group>
  );
}

// ─── Scene wrapper ────────────────────────────────────────────────────────────
function SuitScene({
  style,
  color,
  roughness,
  pattern,
  buttons,
  lining,
}: {
  style: string;
  color: string;
  roughness: number;
  pattern: "twill" | "herringbone" | "plain" | "houndstooth";
  buttons: string;
  lining: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.8, 3.2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Lighting — tailor's studio feel */}
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight position={[2, 4, 3]} intensity={1.3} color="#fff4e0" castShadow />
      <hemisphereLight args={["#ffffff", "#f0e8d8", 0.45]} />
      <pointLight position={[-3, 2, -1]} intensity={0.3} color="#e8d5b0" />

      <group ref={groupRef}>
        <JacketBody
          style={style}
          color={color}
          roughness={roughness}
          pattern={pattern}
          buttons={buttons}
          lining={lining}
        />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.38}
        maxPolarAngle={Math.PI * 0.62}
        autoRotate
        autoRotateSpeed={0.5}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

// ─── Public component ────────────────────────────────────────────────────────
export interface SuitConfiguratorProps {
  style: string;
  fabricId: string;
  color: string;
  buttons: string;
  lining: string;
  fabricRoughness: number;
  fabricPattern: "twill" | "herringbone" | "plain" | "houndstooth";
  fabricName?: string;
  colorName?: string;
}

export function SuitConfigurator({
  style,
  color,
  buttons,
  lining,
  fabricRoughness,
  fabricPattern,
  fabricName,
  colorName,
}: SuitConfiguratorProps) {
  // Fallback if nothing selected yet
  const resolvedColor = color || "#3c3c3c";
  const resolvedStyle = style || "single-notch";
  const resolvedButtons = buttons || "2-button";
  const resolvedLining = lining || "full-gold";

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 45, near: 0.1, far: 50 }}
        style={{ background: "transparent" }}
      >
        <SuitScene
          style={resolvedStyle}
          color={resolvedColor}
          roughness={fabricRoughness}
          pattern={fabricPattern}
          buttons={resolvedButtons}
          lining={resolvedLining}
        />
      </Canvas>

      {/* Fabric / colour label overlay */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-cream/90 backdrop-blur-sm border border-gold/20 px-5 py-2 text-center">
          {fabricName ? (
            <>
              <p className="serif text-sm font-light text-charcoal">{fabricName}</p>
              {colorName && (
                <p className="font-sans text-[10px] tracking-widest uppercase text-text-muted mt-0.5">{colorName}</p>
              )}
            </>
          ) : (
            <p className="font-sans text-[10px] tracking-widest uppercase text-text-muted">Select fabric to preview</p>
          )}
        </div>
      </div>

      {/* Drag hint */}
      <p className="absolute top-3 right-3 font-sans text-[10px] tracking-wider text-text-muted/60 pointer-events-none">
        Drag to rotate
      </p>
    </div>
  );
}
