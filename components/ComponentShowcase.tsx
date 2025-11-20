'use client';

import { CSSProperties, useMemo, useState } from "react";
import styles from "./ComponentShowcase.module.css";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Switch } from "./ui/Switch";

type AccentTone = "50" | "100" | "400" | "500" | "600";
type SurfaceTone = "0" | "100" | "200" | "300" | "950";
type TextTone = "900" | "700" | "500";

interface ToneValue {
  color: string;
  lightness: number;
}

interface ThemeSnapshot {
  accent: Record<AccentTone, ToneValue>;
  surface: Record<SurfaceTone, ToneValue>;
  text: Record<TextTone, ToneValue>;
  radius: { sm: number; md: number; lg: number };
  shadow: string;
  accentForeground: string;
  isDark: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const round = (value: number, precision = 1) => Number(value.toFixed(precision));
const hsl = (hue: number, saturation: number, lightness: number) =>
  `hsl(${round(hue, 1)} ${round(saturation, 1)}% ${round(lightness, 1)}%)`;

const accentOrder: AccentTone[] = ["600", "500", "400", "100", "50"];
const surfaceOrder: SurfaceTone[] = ["0", "100", "200", "300"];

function computeTheme(options: {
  hue: number;
  saturation: number;
  lightness: number;
  depth: number;
  radius: number;
  isDark: boolean;
}): ThemeSnapshot {
  const hue = ((options.hue % 360) + 360) % 360;
  const saturation = clamp(options.saturation, 24, 100);
  const baseLightness = clamp(options.lightness, 28, 72);
  const depth = clamp(options.depth, 0, 6);
  const isDark = options.isDark;
  const baseRadius = clamp(options.radius, 10, 28);

  const accent: ThemeSnapshot["accent"] = {
    "600": { color: "", lightness: clamp(baseLightness - 12, 8, 62) },
    "500": { color: "", lightness: baseLightness },
    "400": { color: "", lightness: clamp(baseLightness + 10, 18, 86) },
    "100": { color: "", lightness: clamp(baseLightness + 34, 24, 95) },
    "50": { color: "", lightness: clamp(baseLightness + 44, 30, 97) }
  };

  accentOrder.forEach((tone) => {
    const toneSaturation =
      tone === "100" || tone === "50" ? clamp(saturation - 24, 12, 80) : clamp(saturation, 32, 100);
    accent[tone].color = hsl(hue, toneSaturation, accent[tone].lightness);
  });

  const neutralHue = isDark ? 216 : 228;
  const neutralSaturation = isDark ? 26 : 32;
  const baseSurface = isDark ? clamp(18 + depth * 4, 12, 32) : clamp(96 - depth * 3, 60, 98);

  const surface: ThemeSnapshot["surface"] = {
    "0": { color: "", lightness: isDark ? baseSurface + 6 : baseSurface },
    "100": { color: "", lightness: isDark ? baseSurface + 2 : baseSurface - 4 },
    "200": { color: "", lightness: isDark ? baseSurface - 2 : baseSurface - 8 },
    "300": { color: "", lightness: isDark ? baseSurface - 6 : baseSurface - 12 },
    "950": { color: "", lightness: isDark ? baseSurface - 28 : baseSurface - 36 }
  };

  (Object.keys(surface) as SurfaceTone[]).forEach((tone, index) => {
    surface[tone].color = hsl(
      neutralHue + index,
      clamp(neutralSaturation + (isDark ? index * 2 : -index * 2), 10, 42),
      clamp(surface[tone].lightness, isDark ? 6 : 36, isDark ? 44 : 98)
    );
  });

  const text: ThemeSnapshot["text"] = isDark
    ? {
        "900": { color: "hsl(215 92% 90%)", lightness: 90 },
        "700": { color: "hsl(215 74% 78%)", lightness: 78 },
        "500": { color: "hsl(215 40% 68%)", lightness: 68 }
      }
    : {
        "900": { color: "hsl(224 40% 14%)", lightness: 14 },
        "700": { color: "hsl(224 34% 26%)", lightness: 26 },
        "500": { color: "hsl(222 24% 44%)", lightness: 44 }
      };

  const shadow = isDark
    ? "0 36px 72px -48px rgba(15, 23, 42, 0.68)"
    : `0 42px 88px -54px rgba(15, 23, 42, ${round(0.38 + depth * 0.04, 2)})`;

  return {
    accent,
    surface,
    text,
    shadow,
    accentForeground: isDark ? "hsl(220 100% 96%)" : "#ffffff",
    isDark,
    radius: {
      sm: Math.round(baseRadius - 4),
      md: Math.round(baseRadius),
      lg: Math.round(baseRadius + 6)
    }
  };
}

const readableOnColor = (lightness: number) => (lightness < 55 ? "#f8fafc" : "#0b1120");

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 5.5c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1v-9Z" />
    <path d="m3.5 6 5.7 4.6c.5.4 1.1.4 1.6 0L16.5 6" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 10c1.6-.4 3-1.7 3.5-3.3C9.9 4.9 11.1 3.7 12.7 3.3 11 3.7 9.6 5 9.1 6.6 8.7 8.2 7.4 9.6 5.8 10ZM12 14c1.2-.3 2.3-1.3 2.7-2.5.4-1.2 1.2-2 2.4-2.3-1.2.3-2.3 1.3-2.7 2.5-.4 1.2-1.2 2-2.4 2.3Z" />
  </svg>
);

export default function ComponentShowcase() {
  const [accentHue, setAccentHue] = useState(232);
  const [accentLightness, setAccentLightness] = useState(54);
  const [accentSaturation, setAccentSaturation] = useState(78);
  const [depth, setDepth] = useState(3);
  const [radius, setRadius] = useState(18);
  const [darkMode, setDarkMode] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(true);

  const theme = useMemo(
    () =>
      computeTheme({
        hue: accentHue,
        saturation: accentSaturation,
        lightness: accentLightness,
        depth,
        radius,
        isDark: darkMode
      }),
    [accentHue, accentSaturation, accentLightness, depth, radius, darkMode]
  );

  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {
      "--accent-foreground": theme.accentForeground,
      "--shadow-lg": theme.shadow,
      "--radius-sm": `${theme.radius.sm}px`,
      "--radius-md": `${theme.radius.md}px`,
      "--radius-lg": `${theme.radius.lg}px`
    };
    accentOrder.forEach((tone) => {
      vars[`--accent-${tone}`] = theme.accent[tone].color;
    });
    (Object.keys(theme.surface) as SurfaceTone[]).forEach((tone) => {
      vars[`--surface-${tone}`] = theme.surface[tone].color;
    });
    (Object.keys(theme.text) as TextTone[]).forEach((tone) => {
      vars[`--text-${tone}`] = theme.text[tone].color;
    });
    return vars;
  }, [theme]);

  const previewStyle = useMemo(
    () =>
      ({
        ...cssVars,
        colorScheme: theme.isDark ? ("dark" as const) : ("light" as const),
        background: theme.surface["100"].color,
        borderColor: theme.surface["200"].color,
        boxShadow: theme.shadow
      } satisfies CSSProperties),
    [cssVars, theme]
  );

  const accentSwatches = useMemo(
    () =>
      accentOrder.map((tone) => ({
        label: `Accent ${tone}`,
        value: theme.accent[tone].color,
        textColor: readableOnColor(theme.accent[tone].lightness)
      })),
    [theme]
  );

  const surfaceSwatches = useMemo(
    () =>
      surfaceOrder.map((tone) => ({
        label: `Surface ${tone}`,
        value: theme.surface[tone].color,
        textColor: theme.isDark ? "white" : "#0b1120"
      })),
    [theme]
  );

  const cssSnippet = useMemo(() => {
    const lines = [
      `--accent-600: ${theme.accent["600"].color};`,
      `--accent-500: ${theme.accent["500"].color};`,
      `--accent-400: ${theme.accent["400"].color};`,
      `--accent-100: ${theme.accent["100"].color};`,
      `--surface-0: ${theme.surface["0"].color};`,
      `--surface-200: ${theme.surface["200"].color};`,
      `--text-900: ${theme.text["900"].color};`,
      `--shadow-lg: ${theme.shadow};`,
      `--radius-lg: ${theme.radius.lg}px;`
    ];
    return `:root {\n  ${lines.join("\n  ")}\n}`;
  }, [theme]);

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span className="kicker">Component Playground</span>
        <h2>Adjust tokens and watch the UI respond instantly</h2>
        <p>
          Fine-tune Spectrum&apos;s color ramps, depth, and curvature. Every change updates live components so you can
          export ready-to-ship tokens.
        </p>
      </div>

      <div className={styles.grid}>
        <aside className={styles.controls}>
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span>Accent hue</span>
              <span>{accentHue}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={accentHue}
              onChange={(event) => setAccentHue(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span>Accent saturation</span>
              <span>{accentSaturation}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              value={accentSaturation}
              onChange={(event) => setAccentSaturation(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span>Accent lightness</span>
              <span>{accentLightness}%</span>
            </div>
            <input
              type="range"
              min={26}
              max={70}
              value={accentLightness}
              onChange={(event) => setAccentLightness(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span>Surface depth</span>
              <span>{depth}</span>
            </div>
            <input
              type="range"
              min={0}
              max={6}
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span>Radius</span>
              <span>{theme.radius.md}px</span>
            </div>
            <input
              type="range"
              min={10}
              max={28}
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.toggleGroup}>
            <span>Dark surface</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} label="Dark surface" hideLabel />
          </div>
        </aside>

        <div className={styles.previewShell}>
          <div className={styles.previewBackdrop} />
          <div className={styles.previewCanvas} style={previewStyle} data-theme={darkMode ? "dark" : "light"}>
            <div className={styles.previewHeader}>
              <div className={styles.previewTitle}>
                <Badge>Live Theme</Badge>
                <strong>Nova workspace</strong>
                <span>Components instantly match your palette.</span>
              </div>
              <Button variant="ghost" size="sm" leadingIcon={<SparkleIcon />}>
                Export tokens
              </Button>
            </div>

            <div className={styles.buttonRow}>
              <Button size="md">Primary</Button>
              <Button variant="outline">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <div className={styles.formRow}>
              <Input label="Team email" placeholder="team@spectrum.design" icon={<MailIcon />} />
              <Button size="sm">Invite</Button>
            </div>

            <Card meta="Overview" title="Engagement pulse">
              <p>
                Monitor adoption across squads—Spectrum keeps your analytics surfaces cohesive while you iterate on
                tokens.
              </p>
              <div className={styles.statBoard}>
                <div className={styles.statCard}>
                  <span>Active teams</span>
                  <strong>128</strong>
                  <span>+18% MoM</span>
                </div>
                <div className={styles.statCard}>
                  <span>Focus time</span>
                  <strong>68%</strong>
                  <span>+6 pts</span>
                </div>
                <div className={styles.statCard}>
                  <span>Theme syncs</span>
                  <strong>42</strong>
                  <span>This week</span>
                </div>
              </div>
            </Card>

            <Card meta="Automation" title="Nightly token sync">
              <p>Push fresh palettes into production via CI once changes are approved.</p>
              <Switch
                checked={automationEnabled}
                onCheckedChange={setAutomationEnabled}
                label="Sync tokens nightly"
              />
            </Card>

            <div className={styles.notification}>
              <strong>Ready to copy</strong>
              <span>Paste this snippet into your global `:root` declaration.</span>
              <pre>{cssSnippet}</pre>
            </div>

            <div className={styles.swatches}>
              {[...accentSwatches, ...surfaceSwatches].map((swatch) => (
                <div
                  key={swatch.label}
                  className={styles.swatch}
                  style={{ background: swatch.value, color: swatch.textColor }}
                >
                  <span>{swatch.label}</span>
                  <span>{swatch.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
