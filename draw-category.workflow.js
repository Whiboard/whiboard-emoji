export const meta = {
  name: 'draw-emoji-category',
  description: 'Draw emoji batches as hand-written SVG icons in the Whiboard sticker style (one agent per batch, each self-checking by render), plus optional redraw batches for icons flagged weak',
  whenToUse: 'After `node assign.mjs <category> <n>` has written data/assign/<category>-1..n.json in whiboard-emoji. args: { dir, category, batches, notes, polish?: [name] }',
  phases: [
    { title: 'Draw', detail: 'one agent per batch: write batches/<name>.mjs, check, fix' },
    { title: 'Polish', detail: 'redraw icons an earlier pass flagged weak into batches/00-*.mjs' },
    { title: 'Finish', detail: 'only for batches that came back with errors or missing icons' },
  ],
}

const { dir, category, batches, notes, polish = [] } = args

const RESULT = {
  type: 'object',
  properties: {
    file: { type: 'string', description: 'batch file written, relative to the project' },
    drawn: { type: 'integer', description: 'icons in the file' },
    errors: { type: 'integer', description: 'ERROR count printed by the last check.mjs run' },
    warnings: { type: 'integer', description: 'warning count printed by the last check.mjs run' },
    missing: { type: 'array', items: { type: 'string' }, description: 'unified ids assigned but not drawn' },
    weak: {
      type: 'array',
      description: 'icons you would not ship as they are',
      items: {
        type: 'object',
        properties: { u: { type: 'string' }, why: { type: 'string' } },
        required: ['u', 'why'],
      },
    },
    notes: { type: 'string', description: 'anything the reviewer must know (blocked tool, rule you could not meet); empty if nothing' },
  },
  required: ['file', 'drawn', 'errors', 'warnings', 'missing', 'weak', 'notes'],
}

const intro = `You are drawing emoji as hand-written SVG icons for one emoji set that must look like a single artist made it: soft storybook / watercolour objects, lit from the top-left.

Project folder: ${dir}
Work in place. Run every command from that folder.

Read these first, completely:
- kit.mjs: palette C, the bevel filters B / Bs, the gradient helpers, and the STYLE and RULES in its header comment. They are binding.
- batches/school.mjs: 40 finished icons in the target style. Study how they are built (gradients, bevel groups, highlights, rotation placed inside the bevel group, how few shapes each one needs). Match their look and their level of detail.
- out/check/school.png: those 40 rendered on the dark and on the light ground. This is the quality bar.`

const must = `What each icon must be:
- The same subject as the emoji, recognisable at 40 px. Keep whatever identifies it: its orientation, its colour when the colour is the meaning, a count, a state (on / off, open / closed, full / empty, which side of the moon is lit, what time a clock shows).
- Our own drawing in our style. The system emoji shown next to each label in the check sheet only reminds you of the subject; do not imitate a vendor's artwork.
- Emoji that are variants of one object share one base: write a small local helper function and vary it, so they read as a family.
- Where an emoji carries letters, digits or a sign, draw them as a few stroke paths, or as plain lines when they would be unreadable at 40 px. Never <text>.
- Nothing may depend on being seen on a dark ground: pale paper, glass, cloud and metal need enough shade to hold their edge on the light ground too, and dark objects (night scenes, tyres, black things) must stay visible on the dark ground.`

const loop = (name) => `Working loop:
1. Write the first 6 to 8 icons, then run the checker straight away. A syntax error breaks the whole file, so find it early.
2. node check.mjs batches/${name}.mjs
   It prints, per icon, the painted box, ERRORs and warnings, lists assigned emoji still missing, and writes out/check/${name}.png.
3. Read that PNG. For each icon compare with its emoji in the label and fix: every ERROR; every warning (size, centring, touching the edge); anything not recognisable; anything flat (no bevel); anything that fades into the dark or the light ground; anything visibly cruder than the school icons.
4. For a close look at a few icons: node check.mjs batches/${name}.mjs --only <u>,<u>   (writes out/check/${name}-zoom.png)
5. Add the rest of the batch and repeat. Stop when the checker reports 0 errors and 0 missing and you would ship every icon. Do at most 5 check-and-fix rounds over the full batch; after that, stop and list what is still weak.

Limits:
- Create and edit only batches/${name}.mjs. Do not change kit.mjs, check.mjs, assign.mjs, build.mjs, lib/, data/, other batch files, or anything outside the project folder.
- Do not install packages and do not run git.
- If the checker cannot run at all (a tool is blocked, the browser will not start), still write the full batch as carefully as you can and say so in notes.

Return the counts printed by your last check run and the icons you consider weak.`

const drawBrief = (name) => `${intro}

Your batch: data/assign/${name}.json, a list of { u, n, e, k } = unified id, name, the emoji itself, search keywords. Draw every entry.

Write batches/${name}.mjs. It exports the array described at the top of kit.mjs: one { u, n, draw } per assigned emoji, in the same order, with u copied exactly.

${must}
${notes ? `\nNotes for this category:\n${notes}\n` : ''}
${loop(name)}`

const polishBrief = (name) => `${intro}

Your job is to redraw icons that a first pass left weak. data/assign/${name}.json lists them as { u, n, e, k, from, why }: unified id, name, the emoji, keywords, the batch file that holds the current drawing, and what is wrong with it.

For each entry: find its u in the "from" file and look at it in out/check/<name of that file>.png (and with node check.mjs <from file> --only <u>) to see what failed. Then draw a clearly better icon from scratch. Do not patch the old one, and do not edit the "from" file: write every redraw to batches/${name}.mjs (same export format as any batch, one { u, n, draw } per entry). Files named 00-* replace the originals when the set is built.

Stay consistent with what is not being redrawn: look at the neighbours of each icon in its "from" sheet (the plain lock next to the lock variants, the other apes, the other balls, the other breads) and keep the same colours, proportions, viewing angle and eye style, so the redraw still belongs to its family. When the "from" file builds a family with a helper function, copy that helper as your starting point. A "from" file named 00-* is itself an earlier redraw that still fell short: your version must be clearly better, not a variation of it.

${must}
${notes ? `\nNotes:\n${notes}\n` : ''}
${loop(name)}`

const finish = (r, name, brief, phaseName) => {
  if (r && r.errors === 0 && r.missing.length === 0) return r
  const state = r
    ? `A previous pass left batches/${name}.mjs unfinished: ${r.errors} errors, ${r.missing.length} assigned emoji missing (${r.missing.join(', ') || 'none'}). Its notes: ${r.notes || 'none'}.`
    : `A previous pass on batches/${name}.mjs ended without a report; the file may be missing, partial or broken.`
  log(`${name}: finishing pass (${r ? `${r.errors} errors, ${r.missing.length} missing` : 'no report'})`)
  return agent(
    `${state}\nKeep every icon that is already good; run the checker first to see where the file stands, then finish the job.\n\n${brief(name)}`,
    { label: `finish:${name}`, phase: 'Finish', schema: RESULT },
  )
}

const jobs = [
  ...Array.from({ length: batches || 0 }, (_, i) => ({ name: `${category}-${i + 1}`, brief: drawBrief, phase: 'Draw', tag: 'draw' })),
  ...polish.map((name) => ({ name, brief: polishBrief, phase: 'Polish', tag: 'polish' })),
]

const results = await pipeline(
  jobs,
  (job) => agent(job.brief(job.name), { label: `${job.tag}:${job.name}`, phase: job.phase, schema: RESULT }),
  (r, job) => finish(r, job.name, job.brief),
)

const done = results.map((r, i) => r ?? { file: `batches/${jobs[i].name}.mjs`, drawn: 0, errors: -1, warnings: 0, missing: [], weak: [], notes: 'agent returned nothing' })
log(`${done.reduce((a, r) => a + r.drawn, 0)} icons drawn, ${done.reduce((a, r) => a + Math.max(0, r.errors), 0)} errors left, ${done.reduce((a, r) => a + r.weak.length, 0)} flagged weak`)
return { category, batches: done }
