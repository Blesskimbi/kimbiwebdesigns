---
title: Adding MTN MoMo and Orange Money to a Cameroonian Website
slug: mobile-money-payment-gateway-cameroon
excerpt: >-
  Four providers accept MTN MoMo and Orange Money on a Cameroonian website, and
  their published collection fees run from 1 percent to 3 percent. Here is what
  each charges, how the integration works, and the confirmation failure that
  breaks most mobile money checkouts.
category: Web Development
author: Bless Kimbi
date: '2026-09-06'
imageUrl: >-
  https://turusktpzdzrldxhsnvq.supabase.co/storage/v1/object/public/project-images/blog/1788715829138-adding-mtn-momo-and-orange-money-to-a-cameroonian-website.png
readTime: 11 min read
focusKeyword: payment gateway cameroon
seoTitle: 'Payment Gateway Cameroon: MoMo and Orange Compared'
metaDescription: >-
  Fapshi, Campay, Notch Pay and MeSomb compared for taking MTN MoMo and Orange
  Money on a Cameroonian website, with published fees and what it costs to
  build.
tags:
  - mobile money
  - MTN MoMo
  - Orange Money
  - payment gateway Cameroon
  - e-commerce Cameroon
faqs:
  - a: >-
      Both operators run developer programmes, and going direct removes the
      aggregator's cut. It also means two integrations, two sets of credentials
      and two approval processes to maintain. For almost every business under
      serious volume, one aggregator covering both networks is cheaper once
      developer time is counted.
    q: Can I accept MTN MoMo and Orange Money without an aggregator?
  - a: >-
      On published collection rates, Notch Pay at 1 percent, ahead of Campay at
      2 percent and Fapshi at 3 percent. MeSomb does not publish a rate. Compare
      payout fees too, because a provider that is cheap on collection can charge
      on the way out.
    q: Which is the cheapest payment gateway in Cameroon?
  - a: >-
      Usually 1 to 3 days for a site that is already built, depending on whether
      it needs webhook handling and order status running through the admin. Most
      of that time is testing the payment states rather than writing the happy
      path.
    q: How long does it take to add mobile money to an existing website?
  - a: >-
      Every aggregator here requires an account and verification before going
      live, and all of them run a sandbox you can build against first.
      Requirements differ by provider and change, so confirm with the one you
      choose rather than trusting a blog post.
    q: Do I need a registered business to accept mobile money online?
  - a: >-
      Almost always the confirmation gap: the payment succeeded at the operator,
      but your site never received or never processed the webhook. The money is
      in the merchant account. Fix the webhook handler, then add a
      reconciliation job that checks pending transactions so a missed call gets
      caught automatically.
    q: Why did a customer pay but the order still shows unpaid?
---

# Adding MTN MoMo and Orange Money to a Cameroonian Website

Most Cameroonian businesses that ask me for an online store already know they want mobile money. What nobody has told them is that the provider they pick decides how much of every sale they keep, and that the gap between the cheapest and the most expensive is wider than it looks on a pricing page.

Four providers cover this market: Fapshi, Campay, Notch Pay and MeSomb. All four accept MTN MoMo and Orange Money. Their published collection fees run from 1 percent to 3 percent, which reads like a rounding error until a year of sales goes through it.

This post compares what each charges, how the integration actually works, and the one failure that breaks more mobile money checkouts than everything else combined.

## Key Takeaways

- Published collection fees run from 1% (Notch Pay) to 3% (Fapshi). On 5,000,000 FCFA of annual sales, that difference is 100,000 FCFA.
- A government levy of 0.2% plus a fixed 4 FCFA per transaction applies on top of whatever the provider charges, under the 2025 Finance Law.
- Fapshi rate limits status polling to 6 requests per minute per transaction and returns a 429 beyond that. That is a provider telling you to use webhooks.
- Campay settles to your bank or mobile money account by the next business day, and covers Cameroon only.
- MeSomb is the only one of the four offering Airtel alongside MTN and Orange, and the only one with no published pricing.
- I price payment integration at 50,000 to 100,000 FCFA on top of the website build, usually 1 to 3 days of work.

## The Fee Gap Is Wider Than a Rounding Error

Here is what each provider publishes, taken from their own pricing pages in September 2026.

| Provider | Collection fee | Payout fee | Networks | Integration |
| --- | --- | --- | --- | --- |
| [Notch Pay](https://notchpay.co/pricing) | 1% | 1% per transfer | MoMo, Orange, card, PayPal | Hosted checkout and API, no setup or monthly fee |
| [Campay](https://www.campay.net) | 2% | 1% to mobile money, 5,000 FCFA to bank | MTN and Orange, Cameroon only | API, next business day settlement |
| [Fapshi](https://www.fapshi.com/en) | 3% | 0% | MTN MoMo and Orange Money | Hosted link or direct push to the phone |
| [MeSomb](https://docs.mesomb.com) | Not published | Not published | MTN, Orange, Airtel, several countries | REST API and SDKs in six languages |

Run 5,000,000 FCFA of sales through those rates in a year. At 1 percent the provider takes 50,000 FCFA. At 3 percent it takes 150,000 FCFA. The business pays 100,000 FCFA more for the same money arriving in the same account.

That gap is easy to wave away in a sales conversation. It is also not the whole picture, which is why the cheapest option is not automatically the right one.

## The Levy Nobody Budgets For

Cameroon applies a transfer tax on mobile money, the Taxe sur les Transferts d'Argent. It is 0.2 percent of the transaction, plus a fixed 4 FCFA per transaction under the 2025 Finance Law, and it is separate from anything the provider charges. [TechTrends Africa covered its introduction](https://techtrends.africa/cameroon-introduces-0-2-levy-on-mobile-money-transactions/) when it first landed.

The operators charge their own fees underneath that. [MTN publishes](https://momocalc.com/cameroon/mtn-momo-fees) 0.5 percent on transfers capped at 500 FCFA, and 2 percent on withdrawals capped at 3,500 FCFA.

None of this changes which provider you pick. It matters because merchants build margins on the headline rate, then find the deposit smaller than expected and assume the developer got something wrong. Say the number out loud before the build, not after the first payout.

## Two Ways to Take a Payment, and They Are Not Equal

Every provider here offers some version of two flows, and Fapshi names them most clearly in [its documentation](https://docs.fapshi.com/en).

The first is a hosted payment link. Fapshi calls this `initiate-pay`. Your site creates a payment, gets back a URL, and sends the customer there. The provider owns that page and handles the network selection and the prompt. It is the fastest thing to build and the safest, because you never touch the payment details.

The second is a direct push. Fapshi calls this `direct-pay`. Your site collects the phone number, calls the API, and the customer gets the PIN prompt on their handset without leaving your checkout. It feels native, and on a slow connection it saves a page load that a hosted redirect would cost.

I reach for the hosted link when the build is a small catalogue and the budget is tight, and the direct push when checkout is the product. The hosted link is not a lesser choice. It is one less surface to get wrong.

## Build It Around the Webhook, Not the Poll

This is the failure worth naming, because it is the one that reaches the client rather than the developer. Call it the confirmation gap.

The customer enters their PIN. The money leaves their wallet. The operator confirms it. And the order on your site still says unpaid, because nothing on your server ever learned the payment succeeded.

The money is not lost. It is sitting in the merchant account. But the customer sees a failed checkout, the shop owner sees no order, and both phone the developer.

It happens when the integration is built around asking. Your server calls the status endpoint, gets `PENDING`, waits, asks again. Then the browser closes, or the request times out, or the loop stops one poll too early, and the answer arrives with nobody listening.

The providers are explicit about this. Fapshi rate limits `payment-status` to 6 requests per minute per transaction and returns a 429 beyond it. A rate limit on your own transaction is a provider saying that polling is the fallback, not the design.

Build it the other way round. Register a webhook, let the provider call you when the outcome is known, and treat that call as the moment the order changes state. Fapshi sends `SUCCESSFUL`, `FAILED` or `EXPIRED`, with an `x-wh-secret` header matching a secret you set on the dashboard, so your endpoint can reject anything that did not come from them. Verify that header on every call. A public endpoint that marks orders paid on request is the worst bug you can ship on an e-commerce site.

Two more things that save trouble later. Make the handler idempotent, because a webhook can arrive twice and a customer should not get two orders for one payment. And keep polling as a reconciliation job that sweeps stale pending transactions on a schedule, rather than as the main path.

## Which One I Would Choose, and When

There is no single best payment gateway in Cameroon, and any post that names one is selling something.

**Notch Pay** makes sense when cost matters most and the site needs more than mobile money. At 1 percent it is the cheapest published rate here, and it also carries card and PayPal, which matters for a business selling to the diaspora. Card is priced separately at 3.9 percent plus 0.30 USD.

**Campay** suits a business selling only in Cameroon that cares about cash flow. Next business day settlement to a bank or mobile money account is a concrete promise, and 2 percent sits in the middle. The trade is reach: MTN and Orange in Cameroon, nothing else.

**Fapshi** is the one I would reach for on a custom build where checkout is part of the product. It is the most expensive at 3 percent, and its documentation is the clearest of the four: hosted and direct flows separated properly, a real sandbox on its own host, webhook secrets handled sensibly. Payouts are free, which claws back some of the difference for a business that withdraws often.

**MeSomb** is worth a look when the customer base is not only Cameroonian. It is the only one of the four listing Airtel, it spans several countries, and it ships SDKs for Node, Python, PHP, Java, Dart and Kotlin. It does not publish its rates, so ask for them in writing before committing. I am not going to guess at a number here.

If you are selling only in Cameroon and watching every franc, start with Notch Pay. If a developer is building you something custom, the integration quality is worth more than the two points.

## What This Costs to Add

I price payment integration separately from the website, because it is genuinely separate work and bundling it hides what you are paying for.

For a typical custom site it is **50,000 to 100,000 FCFA**, usually 1 to 3 days. What moves it inside that range is whether the build needs webhook handling and order status wired through the admin, how complex the checkout flow is, and how much testing the payment states need. That sits on top of the website itself, and my site build pricing is on the [services page](https://blesskimbi.com/services/).

A caveat worth more than the quote: if you sell a handful of items a month, you may not need this at all. A WhatsApp order and a manual mobile money transfer costs nothing and works. Payment integration earns its money when order volume makes manual confirmation the bottleneck, or when customers expect to pay without talking to anybody. The [e-commerce page](https://blesskimbi.com/ecommerce-website-design-in-cameroon/) sets out when a full store makes sense.

## Frequently Asked Questions

### Can I accept MTN MoMo and Orange Money without an aggregator?

Both operators run developer programmes, and going direct removes the aggregator's cut. It also means two integrations, two sets of credentials and two approval processes to maintain. For almost every business under serious volume, one aggregator covering both networks is cheaper once developer time is counted.

### Which is the cheapest payment gateway in Cameroon?

On published collection rates, Notch Pay at 1 percent, ahead of Campay at 2 percent and Fapshi at 3 percent. MeSomb does not publish a rate. Compare payout fees too, because a provider that is cheap on collection can charge on the way out.

### How long does it take to add mobile money to an existing website?

Usually 1 to 3 days for a site that is already built, depending on whether it needs webhook handling and order status running through the admin. Most of that time is testing the payment states rather than writing the happy path.

### Do I need a registered business to accept mobile money online?

Every aggregator here requires an account and verification before going live, and all of them run a sandbox you can build against first. Requirements differ by provider and change, so confirm with the one you choose rather than trusting a blog post, this one included.

### Why did a customer pay but the order still shows unpaid?

Almost always the confirmation gap: the payment succeeded at the operator, but your site never received or never processed the webhook. The money is in the merchant account. Fix the webhook handler, then add a reconciliation job that checks pending transactions so a missed call gets caught automatically.

## Conclusion

The headline fee is the easiest thing to compare and the least useful on its own. A 2 percentage point gap on 5,000,000 FCFA of sales is 100,000 FCFA a year, real money, and still the wrong thing to decide on if the cheaper provider costs three extra days of integration or leaves orders stuck unpaid.

Pick on settlement terms, the networks your customers actually use, and how much of the confirmation flow the provider handles for you. Then build it around the webhook. A checkout that takes the money and forgets to say so is worse than having no online payment at all, because it breaks trust with the customer who did everything right.

Thinking about adding mobile money to your site? [Tell me what you sell and how you sell it](https://blesskimbi.com/contact/) and I will tell you honestly whether you need it yet.

---

**About the author.** Bless Kimbi is a web developer in Buea, Cameroon, working as Bless Kimbi Web Developer. He builds custom websites and online stores for businesses across Cameroon, and writes about the parts of the work that local businesses usually have to find out the hard way. See [recent projects](https://blesskimbi.com/projects/).
