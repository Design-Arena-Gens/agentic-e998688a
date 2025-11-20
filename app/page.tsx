import ComponentShowcase from "@/components/ComponentShowcase";
import styles from "./page.module.css";

type TokenSwatch = {
  label: string;
  token: string;
  foreground?: boolean;
};

type TokenGroup = {
  title: string;
  description: string;
  swatches: TokenSwatch[];
};

const tokenGroups: TokenGroup[] = [
  {
    title: "Accent Palette",
    description: "Tokens designed for emphasis, focus states, and high-energy surfaces.",
    swatches: [
      { label: "Accent 600", token: "--accent-600" },
      { label: "Accent 500", token: "--accent-500" },
      { label: "Accent 400", token: "--accent-400" },
      { label: "Accent 100", token: "--accent-100" },
      { label: "Accent 50", token: "--accent-50" }
    ]
  },
  {
    title: "Surface Layers",
    description: "Layer tokens that build spatial hierarchy through tonal elevation.",
    swatches: [
      { label: "Surface 0", token: "--surface-0" },
      { label: "Surface 100", token: "--surface-100" },
      { label: "Surface 200", token: "--surface-200" },
      { label: "Surface 300", token: "--surface-300" }
    ]
  },
  {
    title: "Typography",
    description: "Expressive yet accessible typography tuned for dashboards and content.",
    swatches: [
      { label: "Text 900", token: "--text-900", foreground: true },
      { label: "Text 700", token: "--text-700", foreground: true },
      { label: "Text 500", token: "--text-500", foreground: true }
    ]
  }
];

const principles = [
  {
    title: "Intentional Density",
    body: "Balance data-rich surfaces with generous spacing and structure so teams stay focused."
  },
  {
    title: "Adaptive Tokens",
    body: "Every token shifts seamlessly across themes, elevating product customization without extra code."
  },
  {
    title: "Accessible Interaction",
    body: "Components ship with sensible defaults that pass WCAG AA for contrast, focus, and motion."
  },
  {
    title: "Composable Primitives",
    body: "Build on layered primitives that keep advanced layouts approachable for every product team."
  }
];

export default function Page() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Design System</span>
          <h1 className={styles.heroTitle}>Design faster with Spectrum DS</h1>
          <p className={styles.heroSubtitle}>
            Spectrum DS is a flexible interface kit that combines adaptive tokens, polished UI primitives,
            and elevated guidance so product teams can build accessible experiences on day one.
          </p>
          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Components</span>
              <span className={styles.metaValue}>24</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Themes</span>
              <span className={styles.metaValue}>6</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Figma Kit</span>
              <span className={styles.metaValue}>Included</span>
            </div>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.heroCard}>
            <div>
              <p className={styles.heroCardTitle}>Snapshot</p>
              <p className={styles.heroCardSubtitle}>
                Guardrails and building blocks tuned for data-rich applications.
              </p>
            </div>
            <div className={styles.heroCardStat}>
              <span>Design tokens</span>
              <strong>146</strong>
            </div>
            <ul className={styles.heroCardList}>
              <li className={styles.heroCardListItem}>
                <span className={styles.heroCardBadge}>1</span>
                Adaptive color ramps with automatic contrast validation.
              </li>
              <li className={styles.heroCardListItem}>
                <span className={styles.heroCardBadge}>2</span>
                Motion-ready primitives for micro-interactions and feedback.
              </li>
              <li className={styles.heroCardListItem}>
                <span className={styles.heroCardBadge}>3</span>
                Layout scaffolds for boards, dashboards, and flows.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.sectionHeading}>
          <span className="kicker">Foundations</span>
          <h2>Token architecture engineered for themeability</h2>
          <p>
            Spectrum DS ships with multi-layer token sets that adapt across themes. Pair them with your product
            semantics to scale experiences from marketing sites to data grids.
          </p>
        </div>
        <div className={styles.tokensGrid}>
          {tokenGroups.map((group) => (
            <article key={group.title} className={styles.tokenCard}>
              <div>
                <h3 className={styles.tokenTitle}>{group.title}</h3>
                <p className={styles.tokenDescription}>{group.description}</p>
              </div>
              <div className={styles.tokenSwatches}>
                {group.swatches.map((swatch) => (
                  <div
                    key={swatch.label}
                    className={styles.tokenSwatch}
                    style={{
                      background: swatch.foreground
                        ? "var(--surface-0)"
                        : `var(${swatch.token})`,
                      color: swatch.foreground ? `var(${swatch.token})` : "#0f172a",
                      borderColor: swatch.foreground ? `var(${swatch.token})` : "transparent"
                    }}
                  >
                    <span className={styles.tokenSwatchName}>{swatch.label}</span>
                    <span className={styles.tokenSwatchValue}>{swatch.token}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ComponentShowcase />

      <section>
        <div className={styles.sectionHeading}>
          <span className="kicker">Principles</span>
          <h2>Designed for teams shipping complex product surfaces</h2>
          <p>
            Our design system anchors on clarity, rhythm, and adaptability. These pillars help your product stay
            legible as you layer in richer workflows and dense data.
          </p>
        </div>
        <div className={styles.principlesGrid}>
          {principles.map((principle) => (
            <article key={principle.title} className={styles.principleCard}>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
