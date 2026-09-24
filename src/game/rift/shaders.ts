export const tunnelVertex = /* glsl */ `
  uniform vec2 uBend;
  varying vec3 vLocal;
  varying float vDepth;

  void main() {
    vec3 p = position;
    float d = max(0.0, -p.z);
    p.xy += uBend * d * d;
    vLocal = position;
    vDepth = d;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const tunnelFragment = /* glsl */ `
  uniform float uTime;
  uniform float uTravel;
  uniform float uHit;
  uniform float uSpeed;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uFog;
  varying vec3 vLocal;
  varying float vDepth;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float ang = atan(vLocal.y, vLocal.x);
    float a = ang / 6.2831853 + 0.5;
    float z = -vLocal.z + uTravel;

    // Neon lattice: longitudinal ribs + rings sliding past.
    float segs = 20.0;
    float ga = abs(fract(a * segs) - 0.5);
    float gz = abs(fract(z * 0.1) - 0.5);
    float wa = fwidth(a * segs) * 1.2;
    float wz = fwidth(z * 0.1) * 1.2;
    float lineA = smoothstep(0.5 - wa - 0.02, 0.5, ga);
    float lineZ = smoothstep(0.5 - wz - 0.015, 0.5, gz);

    // Organic veins crawling along the walls.
    vec2 q = vec2(a * 14.0, z * 0.045 - uTime * 0.15);
    float n = fbm(q + fbm(q * 1.7 + uTime * 0.05));
    float vein = pow(1.0 - abs(n * 2.0 - 1.0), 16.0);

    // Energy pulses racing toward the player.
    float pulse = pow(max(0.0, sin(z * 0.035 + uTime * 2.5)), 24.0);

    // Hex-ish cell shimmer on the panels.
    float cell = noise(vec2(floor(a * segs), floor(z * 0.1)) * 3.1);
    float flicker = step(0.93, cell) * (0.5 + 0.5 * sin(uTime * 6.0 + cell * 40.0));

    // Detail fades out with depth so the vanishing point doesn't blow out.
    float nearMask = 1.0 - smoothstep(12.0, 150.0, vDepth);
    vec3 col = uColA * 0.03;
    col += uColA * (lineA * 0.28 + lineZ * 0.42) * (0.35 + 0.65 * nearMask);
    col += uColB * vein * 0.32 * nearMask;
    col += uColA * pulse * (0.25 + uSpeed * 0.35) * nearMask;
    col += uColB * flicker * 0.18 * nearMask;
    col += vec3(1.0, 0.25, 0.3) * uHit * 0.45;

    // Fade to a glowing vanishing point.
    float fog = smoothstep(18.0, 250.0, vDepth);
    vec3 fogCol = uFog + uColB * 0.08;
    col = mix(col, fogCol, fog);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const particleVertex = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (260.0 / max(0.1, -mv.z));
    gl_Position = projectionMatrix * mv;
  }
`;

export const particleFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    if (a * vAlpha < 0.002) discard;
    gl_FragColor = vec4(vColor * a * vAlpha, 1.0);
  }
`;

export const finalFxShader = {
  uniforms: {
    tDiffuse: { value: null },
    uShift: { value: 0.0 },
    uTime: { value: 0.0 },
    uVignette: { value: 1.0 },
    uWarp: { value: 0.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uShift;
    uniform float uTime;
    uniform float uVignette;
    uniform float uWarp;
    varying vec2 vUv;

    void main() {
      vec2 c = vUv - 0.5;
      float d = length(c);
      // Speed warp: gently pull the edges outward.
      vec2 uv = vUv + c * d * d * uWarp;
      vec2 dir = c * (uShift + d * uWarp * 0.02);
      float r = texture2D(tDiffuse, uv + dir).r;
      vec4 g = texture2D(tDiffuse, uv);
      float b = texture2D(tDiffuse, uv - dir).b;
      vec3 col = vec3(r, g.g, b);
      col *= 1.0 - smoothstep(0.3, 0.85, d) * 0.75 * uVignette;
      float grain = fract(sin(dot(vUv * (uTime + 1.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
      col += grain * 0.018;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};
