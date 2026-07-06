window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.quizBank = [
  {
    "id": "q1",
    "difficulty": "easy",
    "from_name": "IT Helpdesk",
    "from_email": "it-support@corp-secure-login.net",
    "subject": "URGENT: Your password expires in 2 hours",
    "body": "Dear User,\n\nOur system has detected that your account password will expire in 2 HOURS. To avoid losing access to your email and files, click the link below to verify your identity and reset your password immediately.\n\n[Verify My Account Now]\n\nFailure to act will result in permanent account suspension.\n\nIT Support Team",
    "link_display": "Verify My Account Now",
    "link_actual": "http://corp-secure-login.net/reset?id=88213",
    "is_phishing": true,
    "red_flags": [
      "Sender domain 'corp-secure-login.net' does not match a real internal IT domain",
      "Extreme urgency ('2 hours', 'permanent suspension')",
      "Generic greeting ('Dear User')",
      "Link destination is a suspicious external domain, not your company's real login page"
    ],
    "explanation": "Real IT departments rarely demand action within a couple of hours, and password resets should always be done by navigating to your known company login page directly, not through an emailed link."
  },
  {
    "id": "q2",
    "difficulty": "easy",
    "from_name": "Sarah Chen",
    "from_email": "sarah.chen@yourcompany.com",
    "subject": "Lunch on Thursday?",
    "body": "Hey!\n\nA few of us are grabbing lunch this Thursday at the place near the office. Want to join? Let me know by tomorrow so I can get a headcount.\n\nThanks,\nSarah",
    "link_display": null,
    "link_actual": null,
    "is_phishing": false,
    "red_flags": [],
    "explanation": "Normal, low-stakes internal email with no links, no urgency, and no request for sensitive information. Nothing suspicious here."
  },
  {
    "id": "q3",
    "difficulty": "medium",
    "from_name": "Amazon",
    "from_email": "order-update@amaz0n-shipping.com",
    "subject": "Your package could not be delivered",
    "body": "Hello,\n\nWe attempted to deliver your package today but were unable to complete delivery due to an address issue. Please confirm your shipping address and payment details within 24 hours or your order will be returned to the sender.\n\n[Confirm Delivery Details]\n\nThank you for shopping with us.",
    "link_display": "Confirm Delivery Details",
    "link_actual": "http://amaz0n-shipping-verify.com/confirm",
    "is_phishing": true,
    "red_flags": [
      "Sender domain uses a zero instead of the letter 'o' (amaz0n-shipping.com)",
      "Asks you to 'confirm payment details' - real delivery issues don't require re-entering payment info by email",
      "24-hour urgency pressure",
      "Link goes to a different, unrelated domain than the real retailer"
    ],
    "explanation": "Look-alike domains (using 0 for o, or extra words like '-shipping') are one of the most common phishing tricks. Always check delivery status by going directly to the retailer's app or website."
  },
  {
    "id": "q4",
    "difficulty": "medium",
    "from_name": "Marcus Webb (Finance)",
    "from_email": "marcus.webb@yourcompany.com",
    "subject": "Quick favor - need this handled today",
    "body": "Hi,\n\nI'm in back-to-back meetings and can't talk right now. I need you to process an urgent wire transfer to a new vendor before end of day - I'll send the banking details separately. Please confirm you can do this and keep it between us for now since the vendor contract isn't public yet.\n\nThanks,\nMarcus",
    "link_display": null,
    "link_actual": null,
    "is_phishing": true,
    "red_flags": [
      "Urgent, unusual financial request (wire transfer) with no prior context",
      "Explicit request for secrecy ('keep it between us') - a classic manipulation tactic",
      "Sender is unreachable for verification ('can't talk right now'), preventing you from double-checking",
      "Pressure to act same-day with no normal approval process mentioned"
    ],
    "explanation": "This is a classic Business Email Compromise (BEC) pattern: urgency, secrecy, and an unusual financial request from someone claiming to be a colleague or executive. Always verify such requests through a separate, known-good channel (like calling the person directly) before acting - even if the email address looks correct, addresses can be spoofed or the account itself may be compromised."
  },
  {
    "id": "q5",
    "difficulty": "easy",
    "from_name": "LinkedIn",
    "from_email": "messages-noreply@linkedin.com",
    "subject": "You have 3 new messages waiting",
    "body": "Hi,\n\nYou have 3 unread messages in your LinkedIn inbox. Log in to LinkedIn to view and respond to them.\n\nView Messages: linkedin.com/messaging\n\nThe LinkedIn Team",
    "link_display": "linkedin.com/messaging",
    "link_actual": "https://www.linkedin.com/messaging",
    "is_phishing": false,
    "red_flags": [],
    "explanation": "Sender domain matches the real company, there's no urgency or request for sensitive information, and the link destination matches what's displayed. This is a normal notification email."
  },
  {
    "id": "q6",
    "difficulty": "hard",
    "from_name": "Jennifer Park (CEO)",
    "from_email": "j.park@yourc0mpany.com",
    "subject": "Re: Board meeting follow up",
    "body": "Hi,\n\nFollowing up from our discussion - can you purchase 4 x $200 gift cards (any major retailer works) for a client appreciation gesture? I need them today before I fly out. Send me the codes once purchased and I'll reimburse you from my personal account.\n\nAppreciate you handling this quietly - don't want to make a big announcement about the client yet.\n\nJennifer",
    "link_display": null,
    "link_actual": null,
    "is_phishing": true,
    "red_flags": [
      "Sender domain has a zero instead of 'o' (yourc0mpany.com) - very easy to miss at a glance",
      "Gift card purchase request - a near-universal red flag, since gift cards are untraceable and irreversible",
      "Urgency ('today', 'before I fly out')",
      "Request for secrecy ('handling this quietly')",
      "Promise of reimbursement instead of using normal expense processes"
    ],
    "explanation": "Gift card requests from 'executives' are one of the most common BEC scams because gift card codes are as good as cash and impossible to reverse once sent. The subtly misspelled domain (0 instead of o) is easy to miss if you're moving fast - which is exactly what the urgency is designed to make you do."
  },
  {
    "id": "q7",
    "difficulty": "medium",
    "from_name": "Netflix",
    "from_email": "billing@netflix-accounts-secure.com",
    "subject": "We were unable to process your payment",
    "body": "Hi,\n\nWe were unable to process your latest payment. To avoid interruption to your membership, please update your payment information within 48 hours.\n\n[Update Payment Info]\n\nThanks,\nThe Netflix Team",
    "link_display": "Update Payment Info",
    "link_actual": "http://netflix-accounts-secure.com/billing/update",
    "is_phishing": true,
    "red_flags": [
      "Sender domain 'netflix-accounts-secure.com' is not the real Netflix domain",
      "48-hour urgency around losing a service",
      "Generic greeting with no account-specific details (like last 4 digits of a card, or your actual name)",
      "Link points to the same suspicious domain rather than the real service"
    ],
    "explanation": "Billing-related phishing preys on the fear of losing access to a paid service. Always check your payment status by logging into the app or official website directly, not through an email link."
  },
  {
    "id": "q8",
    "difficulty": "easy",
    "from_name": "GitHub",
    "from_email": "noreply@github.com",
    "subject": "[GitHub] A new SSH key was added to your account",
    "body": "Hi there,\n\nA new SSH key was recently added to your account. If this was you, no further action is needed.\n\nKey fingerprint: SHA256:kQ9f...\nAdded on: July 3, 2026\n\nIf you did not do this, please review your account security settings immediately.\n\nGitHub",
    "link_display": null,
    "link_actual": null,
    "is_phishing": false,
    "red_flags": [],
    "explanation": "This is a real-style security notification: correct sending domain, no urgent link to click, and it gives you specific, verifiable detail (fingerprint, date) rather than demanding immediate action through a link."
  },
  {
    "id": "q9",
    "difficulty": "hard",
    "from_name": "Microsoft 365 Security",
    "from_email": "security-noreply@microsft-online.com",
    "subject": "Unusual sign-in activity detected",
    "body": "We detected an unusual sign-in attempt on your Microsoft 365 account from a new device in a location that doesn't match your usual activity.\n\nLocation: Kyiv, Ukraine\nDevice: Unknown\nTime: Today, 3:42 AM\n\nIf this wasn't you, secure your account immediately by verifying your identity.\n\n[Secure My Account]\n\nIf this was you, you can ignore this message.",
    "link_display": "Secure My Account",
    "link_actual": "http://microsft-online.com/secure-account",
    "is_phishing": true,
    "red_flags": [
      "Sender domain is misspelled: 'microsft-online.com' (missing the 'o' in Microsoft)",
      "Uses a scary, specific-sounding but fabricated location/time to create alarm",
      "Pressure to click immediately to 'secure' the account",
      "Real Microsoft security alerts come from microsoft.com and link to account.microsoft.com or login.microsoftonline.com, not lookalike domains"
    ],
    "explanation": "This is a very common template because the fear of account takeover makes people click fast. The misspelled domain is subtle - always double check character-by-character when a security alert asks you to click a link, or better yet, go directly to the official site instead."
  },
  {
    "id": "q10",
    "difficulty": "medium",
    "from_name": "HR Team",
    "from_email": "hr@yourcompany.com",
    "subject": "Updated Employee Handbook - Action Required",
    "body": "Hello team,\n\nWe've updated the Employee Handbook for 2026. Please review the changes to the remote work and PTO policies at your convenience. No action is required unless you have questions, in which case feel free to reach out to HR directly.\n\nThe updated handbook is available on the internal HR portal under Documents > Policies.\n\nBest,\nHR Team",
    "link_display": null,
    "link_actual": null,
    "is_phishing": false,
    "red_flags": [],
    "explanation": "No urgency, no external links, correct internal domain, and it points you to a known internal system (the HR portal) rather than an embedded link. This is a normal internal communication."
  },
  {
    "id": "q11",
    "difficulty": "medium",
    "from_name": "DocuSign",
    "from_email": "no-reply@docusign-secure-verify.net",
    "subject": "You have a document waiting for signature",
    "body": "Hello,\n\nYou have a document waiting for your electronic signature. This document requires your attention within 3 business days or it will expire.\n\n[Review Document]\n\nPowered by DocuSign",
    "link_display": "Review Document",
    "link_actual": "http://docusign-secure-verify.net/sign?ref=94021",
    "is_phishing": true,
    "red_flags": [
      "Sender domain 'docusign-secure-verify.net' is not the real DocuSign domain",
      "No indication of who sent the document or what it's for - real DocuSign emails name the sender",
      "Artificial expiration deadline to create urgency",
      "Link goes to the same suspicious third-party domain"
    ],
    "explanation": "Fake e-signature requests are popular because people are used to getting them and clicking through quickly. Real DocuSign emails always name the specific sender and document, and come from the docusign.net or docusign.com domain."
  },
  {
    "id": "q12",
    "difficulty": "hard",
    "from_name": "David Kim",
    "from_email": "david.kim@yourcompany.com",
    "subject": "Can you review this before I send it?",
    "body": "Hey,\n\nCan you take a quick look at this proposal draft before I send it to the client? Just want a second set of eyes on the numbers.\n\n[Proposal_Draft_Q3.pdf.html]\n\nThanks!\nDavid",
    "link_display": "Proposal_Draft_Q3.pdf.html",
    "link_actual": "http://file-share-view.net/download?f=proposal",
    "is_phishing": true,
    "red_flags": [
      "File name ends in '.pdf.html' - a double extension trick to disguise an HTML/credential-phishing page as a PDF",
      "The 'attachment' is actually a link to an external file-sharing domain, not a real attached file",
      "Even though the sender's email address looks correct, internal accounts can be compromised - the request itself (unusual file type, external link) is the red flag"
    ],
    "explanation": "Double file extensions (like .pdf.html or .doc.exe) are a classic trick to make a malicious file look safe at a glance. Even when an email appears to come from a real coworker, unexpected file-sharing links or odd file types are worth verifying before opening - especially by asking the sender directly through another channel."
  },
  {
    "id": "q13",
    "difficulty": "easy",
    "from_name": "PayPal Billing",
    "from_email": "billing@paypal-invoices-support.com",
    "subject": "Invoice #88213 - Payment Overdue",
    "body": "Dear Customer,\n\nYour recent invoice is now overdue. A charge of $649.99 will be processed automatically within 24 hours unless you dispute it.\n\nIf you did not authorize this transaction, click below immediately to cancel.\n\n[Dispute This Charge]\n\nPayPal Billing Department",
    "link_display": "Dispute This Charge",
    "link_actual": "http://paypal-invoices-support.com/dispute?ref=88213",
    "is_phishing": true,
    "red_flags": [
      "Sender domain 'paypal-invoices-support.com' is not PayPal's real domain",
      "Generic greeting ('Dear Customer') instead of your actual name",
      "Fake urgency around an unfamiliar charge to provoke a panicked click",
      "Link goes to the same suspicious third-party domain rather than paypal.com"
    ],
    "explanation": "Fake invoice/overdue payment emails are designed to make you click out of alarm before you think. Always check unexpected charges by logging into your account directly through the official app or a URL you type yourself."
  },
  {
    "id": "q14",
    "difficulty": "easy",
    "from_name": "IT Department",
    "from_email": "it@yourcompany.com",
    "subject": "Scheduled maintenance this Saturday, 10 PM - 12 AM",
    "body": "Hi all,\n\nWe'll be performing scheduled maintenance on internal file servers this Saturday from 10 PM to 12 AM. You may briefly lose access to shared drives during this window. No action is needed on your part.\n\nReach out to the IT Department directly if you have any concerns.\n\nThanks,\nIT Department",
    "link_display": null,
    "link_actual": null,
    "is_phishing": false,
    "red_flags": [],
    "explanation": "No links, no urgency, no request for information - just a routine heads-up from the correct internal domain. This is exactly what a normal maintenance notice looks like."
  },
  {
    "id": "q15",
    "difficulty": "medium",
    "from_name": "Zoom",
    "from_email": "no-reply@zoom-cloud-recordings.com",
    "subject": "Your meeting recording is ready to view",
    "body": "Hi,\n\nThe recording from your recent meeting 'Q3 Planning Sync' is now ready. Recordings are automatically deleted after 7 days, so view or download it soon.\n\n[View Recording]\n\nZoom Video Communications",
    "link_display": "View Recording",
    "link_actual": "http://zoom-cloud-recordings.com/view?id=44921",
    "is_phishing": true,
    "red_flags": [
      "Sender domain 'zoom-cloud-recordings.com' is not the real Zoom domain (zoom.us)",
      "Artificial deletion deadline to create urgency",
      "Meeting title is vague/generic enough to apply to almost anyone",
      "Link points to the same unrelated third-party domain"
    ],
    "explanation": "Fake meeting recording notifications are common because they exploit curiosity and workplace habits. Real Zoom emails come from a zoom.us domain, and recordings can always be checked directly by logging into your Zoom account."
  },
  {
    "id": "q16",
    "difficulty": "medium",
    "from_name": "Google Calendar",
    "from_email": "calendar-notification@google.com",
    "subject": "Invitation: Weekly Team Sync @ Tue 10:00 AM",
    "body": "You have been invited to the following event:\n\nWeekly Team Sync\nTuesday, 10:00 - 10:30 AM\nLocation: Conference Room B / Video Call Link\n\nOrganizer: sarah.chen@yourcompany.com\n\nGoing? Yes / No / Maybe",
    "link_display": null,
    "link_actual": null,
    "is_phishing": false,
    "red_flags": [],
    "explanation": "Correct sending domain, a known organizer from your own company, and standard calendar invite formatting with no unusual requests. This is a normal automated calendar notification."
  },
  {
    "id": "q17",
    "difficulty": "medium",
    "from_name": "Dropbox",
    "from_email": "no-reply@dropbox-file-share.net",
    "subject": "A file has been shared with you: \"Contract_Final_2026.pdf\"",
    "body": "Hello,\n\nA colleague has shared a file with you via Dropbox. This link will expire in 48 hours for security reasons.\n\n[View Shared File]\n\nIf you weren't expecting this file, you can ignore this message.",
    "link_display": "View Shared File",
    "link_actual": "http://dropbox-file-share.net/view?token=aa914",
    "is_phishing": true,
    "red_flags": [
      "Sender domain 'dropbox-file-share.net' is not the real Dropbox domain",
      "No name given for the 'colleague' who supposedly shared it",
      "Artificial 48-hour expiration to pressure a quick click",
      "Link destination doesn't match Dropbox's real domain"
    ],
    "explanation": "Fake file-share notifications are a very common credential-phishing template, since clicking usually leads to a fake login page designed to steal your password. Genuine sharing notifications name the actual person who shared the file."
  },
  {
    "id": "q18",
    "difficulty": "hard",
    "from_name": "Priya Nair (Payroll)",
    "from_email": "priya.nair@yourcompany.com",
    "subject": "Re: Direct deposit update for this pay cycle",
    "body": "Hi,\n\nThanks for confirming earlier. Please go ahead and update my direct deposit info for this cycle to the new account below before the payroll cutoff tomorrow at noon:\n\nRouting: 083000108\nAccount: 4471982203\n\nI'm switching banks and want to make sure this cycle isn't missed. Let me know once it's updated.\n\nThanks,\nPriya",
    "link_display": null,
    "link_actual": null,
    "is_phishing": true,
    "red_flags": [
      "References a prior conversation ('Thanks for confirming earlier') that never actually happened - a manipulation tactic to seem legitimate",
      "Unusual request to change banking details via email rather than through an HR/payroll system",
      "Tight, artificial deadline ('before the payroll cutoff tomorrow at noon')",
      "Even though the sender address looks correct, payroll-diversion scams often use compromised or spoofed real employee accounts"
    ],
    "explanation": "Payroll diversion fraud is a growing BEC variant: an attacker impersonates an employee and asks to redirect their paycheck to a new account. Legitimate direct deposit changes should always go through your official HR/payroll system, never through an email request alone - verify by calling the person directly using a number you already have on file."
  },
  {
    "id": "q19",
    "difficulty": "hard",
    "from_name": "Chase Bank Alerts",
    "from_email": "alerts@chase.com",
    "subject": "New sign-in to your account from a new device",
    "body": "We noticed a sign-in to your account from a device we don't recognize.\n\nIf this was you, no action is needed.\n\nIf you don't recognize this activity, please open the Chase Mobile app or visit chase.com directly to review your recent account activity and security settings. Do not share your password or one-time codes with anyone, including someone claiming to be from Chase.\n\nChase Security Team",
    "link_display": null,
    "link_actual": null,
    "is_phishing": false,
    "red_flags": [],
    "explanation": "This is what a well-designed security alert looks like: correct sending domain, no embedded login link to click, and it directs you to open the official app or type the known website yourself. It also proactively reminds you never to share codes - a good sign of a legitimate security-conscious message, in contrast to lookalike alerts that push you toward an urgent embedded link."
  },
  {
    "id": "q20",
    "difficulty": "medium",
    "from_name": "Slack",
    "from_email": "notifications@slack.com",
    "subject": "You have 5 unread messages in #general",
    "body": "Hi there,\n\nYou have 5 unread messages waiting for you in #general. Open Slack to catch up.\n\nOpen Slack: slack.com\n\nYou're receiving this because you have email notifications turned on for missed messages.",
    "link_display": "slack.com",
    "link_actual": "https://slack.com",
    "is_phishing": false,
    "red_flags": [],
    "explanation": "Correct sending domain, link text matches its real destination, and no urgency or sensitive request - just a routine notification digest. This is a normal automated email."
  }
];
