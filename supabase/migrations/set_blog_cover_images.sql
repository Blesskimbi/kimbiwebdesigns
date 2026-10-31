-- Points every published post at its generated brand cover.
--
-- The covers are built by scripts/gen-blog-covers.mjs and committed to
-- public/. That script also updates posts/*.md, but the markdown files are
-- only the build-time fallback: BlogPage and BlogPostPage read posts.image_url
-- from this database, and scripts/sync-posts-from-db.mjs rewrites the markdown
-- FROM these rows. So until this runs, the two disagree and the live site
-- still serves the old images.
--
-- Anon cannot write to posts (see lock_down_write_policies.sql), which is
-- correct. Run this in the Supabase SQL editor, which runs as the table owner.

update posts as p
set    image_url = v.image_url
from (values
  ('affordable-web-developer-cameroon-small-business', '/blog-cover-affordable-web-developer-cameroon-small-business.png'),
  ('best-web-design-services-businesses-africa-2026' , '/blog-cover-best-web-design-services-businesses-africa-2026.png'),
  ('choose-a-web-design-agency-in-2026'              , '/blog-cover-choose-a-web-design-agency-in-2026.png'),
  ('fast-website-cameroon-mobile-networks'           , '/blog-cover-fast-website-cameroon-mobile-networks.png'),
  ('google-business-profile-cameroon'                , '/blog-cover-google-business-profile-cameroon.png'),
  ('how-to-choose-web-designer-cameroon'             , '/blog-cover-how-to-choose-web-designer-cameroon.png'),
  ('learn-web-development-cameroon'                  , '/blog-cover-learn-web-development-cameroon.png'),
  ('mobile-money-payment-gateway-cameroon'           , '/blog-cover-mobile-money-payment-gateway-cameroon.png'),
  ('web-design-agency-in-cameroon'                   , '/blog-cover-web-design-agency-in-cameroon.png'),
  ('web-design-trends-africa-2026'                   , '/blog-cover-web-design-trends-africa-2026.png'),
  ('web-hosting-cameroon-cm-vs-com'                  , '/blog-cover-web-hosting-cameroon-cm-vs-com.png'),
  ('website-cost-cameroon-2025'                      , '/blog-cover-website-cost-cameroon-2025.png'),
  ('why-cameroonian-business-needs-website'          , '/blog-cover-why-cameroonian-business-needs-website.png'),
  ('why-your-business-needs-a-website-2026'          , '/blog-cover-why-your-business-needs-a-website-2026.png')
) as v(slug, image_url)
where  p.slug = v.slug;

-- Verify:
--   select slug, image_url from posts order by slug;


-- ── Rollback ───────────────────────────────────────────────────────────────
-- The values these rows held before the statement above, captured from the
-- live table at the time this file was generated. Uncomment to restore.
--
-- update posts as p
-- set    image_url = v.image_url
-- from (values
--   ('affordable-web-developer-cameroon-small-business', '/cyprogram-riscam.co.png'),
--   ('best-web-design-services-businesses-africa-2026' , '/blog-best-web-design-services-africa-2026.png'),
--   ('choose-a-web-design-agency-in-2026'              , '/blog-choose-web-design-agency-south-africa-2026.png'),
--   ('fast-website-cameroon-mobile-networks'           , '/blog-fast-website-cameroon-mobile-networks.png'),
--   ('google-business-profile-cameroon'                , '/blog-google-business-profile-cameroon.png'),
--   ('how-to-choose-web-designer-cameroon'             , '/blog-how-to-choose-web-designer-cameroon-2026.png'),
--   ('learn-web-development-cameroon'                  , '/blog-learn-web-development-cameroon.png'),
--   ('mobile-money-payment-gateway-cameroon'           , 'https://turusktpzdzrldxhsnvq.supabase.co/storage/v1/object/public/project-images/blog/1788729727524-adding-mtn-momo-and-orange-money-to-a-cameroonian-website.png'),
--   ('web-design-agency-in-cameroon'                   , '/blog-web-design-agency-cameroon-2026.png'),
--   ('web-design-trends-africa-2026'                   , '/blog-web-design-trends-africa-2026.png'),
--   ('web-hosting-cameroon-cm-vs-com'                  , '/blog-web-hosting-cameroon-cm-vs-com.png'),
--   ('website-cost-cameroon-2025'                      , '/blog-website-cost-cameroon-2025.png'),
--   ('why-cameroonian-business-needs-website'          , '/blog-cameroonian-business-needs-website-2026.png'),
--   ('why-your-business-needs-a-website-2026'          , '/blog-why-business-needs-website-2025.png')
-- ) as v(slug, image_url)
-- where  p.slug = v.slug;
