import React, { useEffect, useState } from "react";
import opentype from "opentype.js";
import Select from "../ui/Select";
import { KeyValString } from "@/app/types/schema";

type Props = {
  fontUrl: string;
  target: HTMLDivElement;
};

type OtfFeature = {
  tag: string;
  feature: {
    featureParams?: number;
    lookupListIndexes: number[];
  };
};

// Common OpenType feature tag descriptions
const FEATURE_NAMES: Record<string, string> = {
  // GSUB features
  aalt: "Access All Alternates",
  calt: "Contextual Alternates",
  case: "Case-Sensitive Forms",
  ccmp: "Glyph Composition",
  dlig: "Discretionary Ligatures",
  dnom: "Denominators",
  frac: "Fractions",
  hist: "Historical Forms",
  hlig: "Historical Ligatures",
  liga: "Standard Ligatures",
  lnum: "Lining Figures",
  locl: "Localized Forms",
  numr: "Numerators",
  onum: "Oldstyle Figures",
  ordn: "Ordinals",
  pnum: "Proportional Figures",
  rlig: "Required Ligatures",
  salt: "Stylistic Alternates",
  sinf: "Scientific Inferiors",
  smcp: "Small Capitals",
  ss01: "Stylistic Set 1",
  ss02: "Stylistic Set 2",
  ss03: "Stylistic Set 3",
  ss04: "Stylistic Set 4",
  ss05: "Stylistic Set 5",
  ss06: "Stylistic Set 6",
  ss07: "Stylistic Set 7",
  ss08: "Stylistic Set 8",
  ss09: "Stylistic Set 9",
  ss10: "Stylistic Set 10",
  ss11: "Stylistic Set 11",
  ss12: "Stylistic Set 12",
  ss13: "Stylistic Set 13",
  ss14: "Stylistic Set 14",
  ss15: "Stylistic Set 15",
  ss16: "Stylistic Set 16",
  ss17: "Stylistic Set 17",
  ss18: "Stylistic Set 18",
  ss19: "Stylistic Set 19",
  ss20: "Stylistic Set 20",
  subs: "Subscript",
  sups: "Superscript",
  swsh: "Swash",
  titl: "Titling",
  tnum: "Tabular Figures",
  zero: "Slashed Zero",
  // GPOS features
  cpsp: "Capital Spacing",
  kern: "Kerning",
  mark: "Mark Positioning",
  mkmk: "Mark to Mark",
};

const TesterOtf = ({ fontUrl, target }: Props) => {
  const [features, setFeatures] = useState<KeyValString[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fontUrl) return;

    const loadFont = async () => {
      try {
        setLoading(true);
        setError(null);

        const font = await opentype.load(fontUrl);

        const allFeatures: KeyValString[] = [];
        const seenTags = new Set<string>();

        // Parse GSUB features
        if (font.tables.gsub?.features) {
          font.tables.gsub.features.forEach((f: OtfFeature) => {
            if (!seenTags.has(f.tag)) {
              seenTags.add(f.tag);
              const name = FEATURE_NAMES[f.tag] || f.tag;
              allFeatures.push({
                _type: "keyValString",
                key: `${name} (${f.tag})`,
                val: f.tag,
              });
            }
          });
        }

        // Parse GPOS features
        if (font.tables.gpos?.features) {
          font.tables.gpos.features.forEach((f: OtfFeature) => {
            if (!seenTags.has(f.tag)) {
              seenTags.add(f.tag);
              const name = FEATURE_NAMES[f.tag] || f.tag;
              allFeatures.push({
                _type: "keyValString",
                key: `${name} (${f.tag})`,
                val: f.tag,
              });
            }
          });
        }

        // Sort features alphabetically by tag
        allFeatures.sort((a, b) => (a.val || "").localeCompare(b.val || ""));

        setFeatures(allFeatures);
        setLoading(false);
      } catch (err) {
        console.error("Error loading font:", err);
        setError("Failed to load font features");
        setLoading(false);
      }
    };

    loadFont();
  }, [fontUrl]);

  const _handleFeatureChange = (feature: KeyValString | null) => {
    if (!target) return;

    if (!feature || !feature.val) {
      target.style.setProperty("--font-feature-settings", "normal");
      return;
    }

    target.style.setProperty("--font-feature-settings", `"${feature.val}"`);
  };

  if (loading) {
    return (
      <div className='tester-otf controls'>
        <span>Loading...</span>
      </div>
    );
  }

  if (error || features.length === 0) {
    return null;
  }

  return (
    <Select
      options={features}
      onChange={_handleFeatureChange}
      label='Stylistic Sets'
    />
  );
};

export default TesterOtf;
