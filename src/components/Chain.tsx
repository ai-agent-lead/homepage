import { Fragment } from "react";
import type { ChainStep } from "@/lib/data";

const KIND_CLASS: Record<ChainStep["kind"], string> = {
  doc: "s-doc",
  shape: "s-shape",
  build: "s-build",
  gate: "s-gate",
  diag: "s-diag",
  util: "s-util",
  next: "s-next",
  merge: "s-merge",
};

/** Renders a skill flow as colour-coded step chips joined by arrows. */
export function Chain({ steps }: { steps: ChainStep[] }) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {steps.map((step, i) => (
        <Fragment key={`${step.name}-${i}`}>
          <span className={`step ${KIND_CLASS[step.kind]}`}>
            <b>{step.name}</b>
            {step.note && <i>{step.note}</i>}
          </span>
          {i < steps.length - 1 && <span className="arrow">→</span>}
        </Fragment>
      ))}
    </div>
  );
}
