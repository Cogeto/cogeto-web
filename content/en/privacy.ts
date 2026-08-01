/**
 * English privacy policy content. Copy moved verbatim from the former
 * Company names, addresses, and email addresses stay identical across
 * locales; only the surrounding legal text is translated.
 */

export type PrivacySection = {
  heading: string;
  paragraphs: readonly string[];
};

export type PrivacyContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  /** Full rendered line, e.g. "Last updated: 1 August 2026". */
  lastUpdated: string;
  sections: readonly PrivacySection[];
};

export const privacy: PrivacyContent = {
  metaTitle: "Privacy Policy",
  metaDescription:
    "Privacy policy for cogeto.eu: no cookies, no tracking, no data collection.",
  eyebrow: "Legal",
  title: "Privacy Policy",
  lastUpdated: "Last updated: 1 August 2026",
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        'This Privacy Policy describes how MVT Solutions Group d.o.o. ("we" or "us"), acting as the data representative and data controller, collects and processes personal data. MVT Solutions Group d.o.o., with its legal entity located at Podolje 11A, 10000 Zagreb, Croatia, is responsible for ensuring the protection of your personal information. As an EU-based company, we comply with the EU General Data Protection Regulation (GDPR) for the processing of personal data.',
        "This policy applies to the website cogeto.eu.",
      ],
    },
    {
      heading: "2. No cookies, no tracking",
      paragraphs: [
        "This website does not use cookies. It does not run analytics, does not embed third-party trackers, does not load resources from external services, and does not require an account.",
        "Simply visiting cogeto.eu does not result in the collection or storage of any personal data by us. Reading the site and downloading the whitepaper are anonymous: no identifiers, no profiling. Personal data reaches us only if you choose to send it through the contact form or by email, as described in the next section.",
      ],
    },
    {
      heading: "3. When you contact us",
      paragraphs: [
        "If you use the contact form on this site or write to us at hi@cogeto.eu, MVT Solutions Group d.o.o. and MCTO Advisory d.o.o. process the personal data you submit: your email address, your name if you provide it, and the content of your message.",
        "The contact form sends your message from our own server through Mailgun, a transactional email service, using its European Union region, so the data is processed on EU infrastructure. Your browser never communicates with Mailgun directly. Mailgun acts as a processor on our behalf for the sole purpose of delivering your message to our mailbox.",
        "We process this data solely to read and answer your inquiry and to handle any follow-up you request. The legal basis is Article 6(1)(f) GDPR, our legitimate interest in responding to messages sent to us, and, where your inquiry aims at entering into a business relationship, Article 6(1)(b) GDPR.",
        "We keep correspondence only as long as needed to handle your inquiry and any resulting relationship, and delete it afterwards unless a legal retention duty applies.",
      ],
    },
    {
      heading: "4. Sharing of data",
      paragraphs: [
        "We do not sell personal data and we do not share it with third parties for marketing. Correspondence is processed by MVT Solutions Group d.o.o. and MCTO Advisory d.o.o., by Mailgun's EU region as the delivery processor for contact form messages, and by the email hosting provider that technically delivers and stores our mailboxes, acting as a processor on our behalf.",
        "Data is not transferred outside the European Economic Area.",
      ],
    },
    {
      heading: "5. Your rights",
      paragraphs: [
        "Under the GDPR you have the right to access the personal data we hold about you, to have it rectified or erased, to restrict or object to its processing, and to receive it in a portable format.",
        "To exercise any of these rights, email us at hi@cogeto.eu. You also have the right to lodge a complaint with a supervisory authority, in Croatia the Personal Data Protection Agency (AZOP, www.azop.hr), or with the authority of your own EU member state.",
      ],
    },
    {
      heading: "6. Changes to this policy",
      paragraphs: [
        "If this website ever changes in a way that affects personal data, for example by adding a newsletter or a product sandbox, we will update this policy before the change goes live. The date below always reflects the current version.",
      ],
    },
    {
      heading: "7. Contact",
      paragraphs: [
        "MVT Solutions Group d.o.o., Podolje 11A, 10000 Zagreb, Croatia. Email: hi@cogeto.eu.",
      ],
    },
  ],
};
