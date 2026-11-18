// Entry for news-image-20261117: "The World in One Day" — a newspaper front
// page summing up Tuesday 17 November 2026 (Manila summit day, the global
// tech-outage wave, the Knesset speaker vote, Spain's welfare push, the US
// measles-status loss and Mumbai's Earthshot prizes). The artwork is authored
// in poster.svg and rendered to entry.png by generate.mjs; this program
// (Node 22, standard library only) copies that image to /output/entry.png,
// byte for byte, exactly as the judge will see it.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
