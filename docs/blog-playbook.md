# Blog playbook

How posts on this site get written. Derived from reading competitors and
well-ranking SEO blogs in September 2026, then adapted to a solo practitioner
in Buea rather than an agency with a research team.

Sources read in full: a Neil Patel data piece, a Neil Patel how-to guide, a
Neil Patel brand piece, a first-person Medium tutorial, and an Acadmiac SEO
guide. The last one is included as a counter-example, not a model.

Patterns only. Never reuse another site's sentences: Google already has their
version indexed, so copying earns nothing and risks a copyright problem.

---

## The two modes that work

Reading them side by side, the posts that rank fall into two shapes. They are
not variations of each other and mixing them badly produces the flat, hedged
writing that reads as machine-generated.

### Mode A — the authority piece

What Neil Patel's team publishes. Used when the post's value is *information
the reader does not have*.

- **1,600 to 2,200 words.** Not 3,000. Every one measured came in under 2,300.
- **Named author with a real credentials bio at the end.** This is an E-E-A-T
  signal, and it is the single thing most Cameroonian competitor blogs skip.
- **A "Key Takeaways" block right after the H1**, before any prose. Five
  bullets, each a complete factual claim carrying a number or a named
  mechanism. A reader who stops there still leaves with the finding.
- **H2s are claims, not keywords.** "Monitoring Cannot Be Periodic". "The First
  Impression Problem". An H2 that states a position tells the reader what the
  section argues; an H2 stuffed with a keyword tells them nothing.
- **Paragraphs 26 to 46 words. Sentences about 15 words.** Measured across
  three posts, this barely moved.
- **A named mechanism the reader can take away.** These posts teach one
  concrete thing with a name attached, then explain what it changes. That is
  what makes a post quotable rather than forgettable.
- **FAQ as an H2 with H3 questions**, near the end. Feeds FAQPage schema, which
  this site now emits automatically from post frontmatter.
- **A short Conclusion H2.** Two paragraphs. Restates the finding and the one
  action worth taking.

Openers assert a problem, often contrarian: the reader is told they are
optimising the wrong thing, and the post is the correction.

### Mode B — the first-person walkthrough

What the Medium tutorial does. Used when the value is *watching someone who has
done it actually do it*.

- **900 to 1,300 words.** Short. The Medium piece was a 4-minute read and
  outperformed far longer posts on the same topic.
- **Opens with an admission of not knowing.** It begins with the writer staring
  at a blank screen for twenty minutes. That is the hook: competence is earned
  over the post, not asserted at the top.
- **Paragraphs of one to three sentences.** Many are a single line. Sentence
  fragments are used deliberately for rhythm.
- **Numbered steps as H2s.** "Step 1 — Start With Keyword Research".
- **Jargon defined inline in plain words**, the first time it appears.
- **Ends flat.** No grand summary, no call to transformation. It states the
  point plainly and stops.

For this site, Mode B is the underused one. Bless is a practitioner with real
projects; a post that walks through an actual build is something no local
competitor can copy, because they would have to have done the work.

---

## What the weak example got wrong

The Acadmiac post has the right skeleton — question-shaped H2s, an FAQ block,
lists — and still reads as machine-written. The failures are all at sentence
level, and they are the exact things to avoid:

- **A hypothetical opener.** "Imagine yourself in the year 2026." Nothing has
  happened, and the reader is asked to do the work of imagining it.
- **Dead metaphors.** "Content is still king, and the crown gets new gems."
- **Claims with no number, date, or source.** "Brands that rely on outdated
  strategies risk disappearing entirely." Unfalsifiable, so it carries nothing.
- **No named author.** No bio, no credentials, no accountability.
- **Self-promotion mid-article**, dropped into the middle of a section as a
  non-sequitur. The CTA belongs at the end, where it has been earned.
- **Abstract nouns doing the work of verbs.** "This means that there will be
  greater reliance on semantics."

The tell is not any single sentence. It is that nothing in the post could only
have been written by someone who had done the thing.

---

## House rules for this site

Enforced already in the codebase and the published posts, so a new post has to
match:

1. **No em or en dashes.** Not in the post, the excerpt, or the meta
   description. A colon where a list follows, a comma for an aside, a full stop
   where two sentences are being held together. Ranges read "3 to 6 weeks".
2. **No stock phrases.** "In today's digital landscape", "unlock", "leverage"
   as a verb, "delve", "seamless", "it's not just X, it's Y", "more than just",
   "when it comes to". If a sentence would survive on any other blog in any
   other country, it is not carrying its weight.
3. **The business is "Bless Kimbi Web Developer".** Matches the Google Business
   Profile exactly. The person is "Bless Kimbi".
4. **First person is allowed and preferred.** "I built", "I charge", "I would
   not recommend". A solo practitioner writing as a committee is the fastest
   way to sound fake.
5. **Prices in FCFA, with the real numbers.** The pricing already published is
   150,000 / 400,000 / 1,200,000. Do not quote different figures in a new post.
6. **Every claim about a number needs a source or first-hand basis.** Either
   link the source, or say plainly that it is what has been seen across
   projects. Never invent a statistic.
7. **Say the unhelpful thing when it is true.** That a cheaper option is fine
   for their case, that a booking engine is overkill, that the work is done
   remotely. This is the strongest available differentiator against competitor
   blogs that are wall-to-wall self-promotion.

---

## Structure to write to

Default shape for a Bless Kimbi post, borrowing Mode A's scaffolding and Mode
B's voice:

```
H1                    Contains the target phrase, reads like a sentence
Opening 2-3 paras     A real situation, in first person. No hypotheticals.
Key takeaways         4-6 bullets, each a complete claim. Optional but strong.
H2 x 4-6              Each states a position. Body of 2-5 short paragraphs.
                      At least one section with a table or a list.
                      At least one internal link to a service or city page.
                      At least one outbound link to a real source.
H2 FAQ                4-6 H3 questions, drawn from what clients actually ask.
                      Goes in frontmatter `faqs:` so it becomes FAQPage schema.
H2 Conclusion         Two paragraphs. The finding, then the one next step.
CTA                   One line, at the end only. WhatsApp or /contact.
```

Target 1,200 to 1,800 words. Longer needs a reason.

---

## The gap worth writing into

The competitor research found no local agency publishing real tutorials. The
open subjects, in rough priority order:

1. Adding MTN MoMo and Orange Money to a website. Large unmet demand, and
   almost nothing written about it for a Cameroonian audience.
2. Web hosting for Cameroonian sites, and the .cm versus .com decision.
3. Making a site fast on slow African mobile networks.
4. Google Business Profile for a Cameroonian business, end to end.
5. Learning web development in Cameroon: a route for Buea students.
6. Building an e-commerce store in Cameroon, start to finish.
7. WhatsApp to website lead funnels for small businesses.
8. "How I built X", using real projects from /projects.

Numbers 1 and 8 are the ones no competitor can answer as well, because both
require having actually done it.

---

## Publishing mechanics

- Posts live in **Supabase**, not `posts/*.md`. The markdown is the build-time
  fallback and must be resynced after any edit:
  `node scripts/sync-posts-from-db.mjs` (add `--check` to detect drift).
- Publishing fires a database trigger that calls the Vercel deploy hook. It
  fires **per row per statement**, so batch edits into one UPDATE.
- `faqs` in frontmatter becomes FAQPage markup automatically. `tags`,
  `published_at` and `content` feed BlogPosting. Nothing needs adding by hand.
- Cadence: one good post a week beats bursts. The strongest local competitor
  publishes irregularly and never tutorials.
- Cross-post to Dev.to and Hashnode with a canonical tag pointing back here,
  so the ranking stays with blesskimbi.com.
