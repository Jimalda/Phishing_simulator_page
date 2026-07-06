window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.vishingScenarios = [
  {
    "id": "v1",
    "title": "IT Support Password Reset",
    "difficulty": "easy",
    "caller_name": "\"Jake\" \u2014 IT Support",
    "intro": "Your desk phone rings. Caller ID shows an internal-looking extension.",
    "start_node": "n1",
    "nodes": {
      "n1": {
        "caller_line": "Hi, this is Jake from IT Support. We've detected unusual activity on your account and need to verify your identity to secure it. Can you confirm your username and current password so I can check the account?",
        "options": [
          {
            "text": "Sure \u2014 my username is jsmith and my password is Summer2024!",
            "next": "end_compromised_password",
            "note": "You just handed over full account access. Real IT never needs your actual password to \"check\" anything."
          },
          {
            "text": "I'm not comfortable sharing my password. Can we do this through the official IT ticketing system instead?",
            "next": "n2",
            "note": "Good instinct \u2014 no legitimate IT process ever requires your password over the phone."
          },
          {
            "text": "Can I get your employee ID and call you back at the official helpdesk number?",
            "next": "n2b",
            "note": "Verifying through an independent channel is exactly the right move."
          }
        ]
      },
      "n2": {
        "caller_line": "I hear you, but this is urgent \u2014 if we don't fix this in the next 5 minutes your account will be permanently locked and you'll lose access to payroll.",
        "options": [
          {
            "text": "Okay, that sounds serious \u2014 here's my password so we can fix it fast.",
            "next": "end_compromised_password_pressured",
            "note": "The urgency worked. But real lockout policies are never resolved by reading your password to a caller."
          },
          {
            "text": "I understand the urgency, but I'll call the helpdesk directly using the number on our intranet.",
            "next": "end_safe",
            "note": "Staying firm under pressure is the whole game here."
          },
          {
            "text": "Can you send me an email from the official company domain confirming this?",
            "next": "n3",
            "note": "Smart \u2014 asking for verifiable, independent proof."
          }
        ]
      },
      "n2b": {
        "caller_line": "Uh... I don't have that number handy right now, and this is time-sensitive. We really need to act immediately.",
        "options": [
          {
            "text": "That's fine \u2014 I'll verify through the helpdesk myself and call back if there's an issue.",
            "next": "end_safe",
            "note": "A real IT staffer would have no problem with you verifying independently. Hesitation on their end is a red flag on its own."
          },
          {
            "text": "Okay, fine \u2014 here's my password, let's just get this over with.",
            "next": "end_compromised_password_pressured",
            "note": "You had the right instinct a moment ago, but folded under pushback. That's exactly what this tactic is designed to do."
          }
        ]
      },
      "n3": {
        "caller_line": "I can't send an email right now \u2014 phone verification is faster. Just read me the one-time code you should be receiving by text any moment.",
        "options": [
          {
            "text": "I haven't requested any code, and I won't be sharing one. I'll follow up through the helpdesk.",
            "next": "end_safe",
            "note": "Excellent \u2014 this is the most dangerous ask in the whole call, and you shut it down."
          },
          {
            "text": "Oh, it just came in \u2014 the code is 482913.",
            "next": "end_compromised_mfa",
            "note": "This is the worst possible outcome. A one-time code read aloud can let an attacker log in in real time, even with your password unknown."
          }
        ]
      },
      "end_safe": {
        "ending": true,
        "outcome": "safe",
        "closing_line": "Fine, I'll try someone else. *click*",
        "summary": "You never revealed your password or a one-time code, and you insisted on verifying the caller through a channel you control. That single habit defeats this entire attack, no matter how convincing the caller sounds.",
        "tactics_used": [
          "Authority impersonation (claiming to be internal IT)",
          "Urgency and fear (account lockout, losing payroll access)",
          "Escalating pressure when you pushed back"
        ],
        "right": [
          "Refused to say your password out loud, twice",
          "Asked to verify identity through an independent, known channel",
          "Did not fold even when the caller pushed back harder"
        ],
        "improve": []
      },
      "end_compromised_password": {
        "ending": true,
        "outcome": "compromised",
        "closing_line": "Great, thanks! I'll take care of it from here. *click*",
        "summary": "You gave a stranger your username and password on the first ask. From here, the attacker can log in as you, reset your MFA, and access anything your account touches.",
        "tactics_used": [
          "Authority impersonation (claiming to be internal IT)",
          "A routine-sounding request framed as a normal security check"
        ],
        "right": [],
        "improve": [
          "No legitimate IT process ever needs to hear your actual password \u2014 they can reset it without knowing it",
          "Verify unexpected security calls through a number or system you already trust, not one the caller gives you",
          "Treat any request for your password over the phone as an automatic red flag"
        ]
      },
      "end_compromised_password_pressured": {
        "ending": true,
        "outcome": "compromised",
        "closing_line": "Perfect, thank you. I'll sort it out now. *click*",
        "summary": "You held out at first, but the artificial urgency eventually got your password anyway. The outcome is the same as giving it up immediately: full account access handed to a stranger.",
        "tactics_used": [
          "Authority impersonation (claiming to be internal IT)",
          "Escalating urgency and fear of losing access",
          "Time pressure to prevent you from stopping to verify"
        ],
        "right": [
          "You hesitated and asked good questions before folding"
        ],
        "improve": [
          "Urgency is the tactic, not a real deadline \u2014 real IT issues can wait the few minutes it takes to verify",
          "When pressure increases instead of the caller offering to help you verify, that's the clearest sign it's not legitimate"
        ]
      },
      "end_compromised_mfa": {
        "ending": true,
        "outcome": "compromised",
        "closing_line": "Got it, thanks \u2014 you're all set now. *click*",
        "summary": "Reading out a one-time code is one of the most dangerous things you can do on a call like this. It lets an attacker complete a real-time login, bypassing multi-factor authentication entirely \u2014 even if they never learned your password.",
        "tactics_used": [
          "Authority impersonation (claiming to be internal IT)",
          "Real-time relay attack \u2014 using your MFA code within seconds of you receiving it"
        ],
        "right": [
          "You correctly refused to share your password earlier in the call"
        ],
        "improve": [
          "A one-time code is proof that YOU are logging in \u2014 never read it to anyone else, ever, for any reason",
          "If a code arrives that you didn't request, that's a sign someone already has your password and is trying to get past MFA"
        ]
      }
    }
  },
  {
    "id": "v2",
    "title": "Bank Fraud Department",
    "difficulty": "medium",
    "caller_name": "\"Amanda\" \u2014 Fraud Prevention",
    "intro": "An unknown number calls claiming to be your bank's fraud department.",
    "start_node": "n1",
    "nodes": {
      "n1": {
        "caller_line": "Hello, this is Amanda calling from the Fraud Prevention team. We noticed a suspicious $980 charge at an electronics store out of state. Did you authorize this transaction?",
        "options": [
          {
            "text": "No, I didn't make that charge.",
            "next": "n2",
            "note": "Reasonable response \u2014 this keeps the conversation going so you can see what they ask for next."
          },
          {
            "text": "I'm not sure, can you tell me more about it?",
            "next": "n2",
            "note": "Fair enough \u2014 but be ready for what usually comes next in these calls."
          }
        ]
      },
      "n2": {
        "caller_line": "I understand \u2014 that's concerning. To block the charge and issue you a new card right now, I just need to verify your identity. Can you confirm your full card number and the 3-digit security code on the back?",
        "options": [
          {
            "text": "Sure \u2014 it's 4111 1111 1111 1234, and the code is 123.",
            "next": "end_compromised_card",
            "note": "That's everything needed to use your card elsewhere. A real fraud department already has your card on file."
          },
          {
            "text": "You called me, so you should already have my account details. I'll call the number on the back of my card instead.",
            "next": "n3",
            "note": "Exactly right \u2014 the party that places the call is never the one who needs you to prove who you are."
          }
        ]
      },
      "n3": {
        "caller_line": "I completely understand the caution, but if we don't act now the fraudulent charge will post and you'll be held liable. This will only take thirty seconds.",
        "options": [
          {
            "text": "Okay, fine \u2014 my card number is 4111 1111 1111 1234, code 123.",
            "next": "end_compromised_card",
            "note": "The manufactured urgency worked, but the outcome is identical to giving up the card details immediately."
          },
          {
            "text": "I'll take my chances and verify by calling the number on my card myself.",
            "next": "end_safe",
            "note": "Holding firm here is correct \u2014 and by law, you are not liable for fraudulent charges you report through your bank's real channels."
          }
        ]
      },
      "end_safe": {
        "ending": true,
        "outcome": "safe",
        "closing_line": "...Alright, well, please do call us back soon. *click*",
        "summary": "You never read out your card number or security code, and you insisted on calling back through a number you know is real (the one printed on your card). That's the correct move every time, regardless of how the caller frames the urgency.",
        "tactics_used": [
          "Authority impersonation (claiming to be your bank's fraud team)",
          "Urgency and liability fear (\"you'll be held liable\")",
          "A plausible, specific-sounding scenario (a real-looking charge amount and location)"
        ],
        "right": [
          "Refused to read out full card number and CVV over an inbound call",
          "Chose to verify using a number from your own physical card, not one given by the caller",
          "Didn't let repeated pressure change your answer"
        ],
        "improve": []
      },
      "end_compromised_card": {
        "ending": true,
        "outcome": "compromised",
        "closing_line": "Perfect, that's all I needed. We'll take it from here. *click*",
        "summary": "You read out your full card number and security code to an unverified caller. That's everything needed to make fraudulent charges \u2014 the \"fraud department\" call may well have been the fraud itself.",
        "tactics_used": [
          "Authority impersonation (claiming to be your bank's fraud team)",
          "Urgency and liability fear",
          "Reciprocity \u2014 offering to \"help\" you in exchange for your information"
        ],
        "right": [],
        "improve": [
          "A bank that's calling you already has your card number \u2014 they'll never ask you to read out the full number and CVV",
          "Hang up and call the number printed on your card or on the bank's official app/website instead",
          "By law, you're generally not liable for fraudulent charges reported through real bank channels \u2014 there's rarely a reason to rush"
        ]
      }
    }
  },
  {
    "id": "v3",
    "title": "Urgent Gift Card Request from \"the CEO\"",
    "difficulty": "hard",
    "caller_name": "\"Jennifer Park\" \u2014 CEO",
    "intro": "Your cell phone rings, showing an unfamiliar number. The caller's voice sounds close to your CEO's, though slightly rushed.",
    "start_node": "n1",
    "nodes": {
      "n1": {
        "caller_line": "Hey, it's Jennifer. I'm stuck in a client meeting and can barely talk. I need you to grab some gift cards for a client thank-you \u2014 can you take care of that right now?",
        "options": [
          {
            "text": "Of course \u2014 how many, and what kind?",
            "next": "n2",
            "note": "Complying right away without any verification is exactly what this tactic counts on."
          },
          {
            "text": "I want to help, but let me confirm this with you through our usual channel first.",
            "next": "n2b",
            "note": "Good \u2014 pausing to verify, even briefly, is the right instinct."
          },
          {
            "text": "I'm sorry, I can't authorize a purchase like that without going through our normal process.",
            "next": "end_safe",
            "note": "Holding the line immediately, without even needing to be pushed, is the strongest possible response."
          }
        ]
      },
      "n2": {
        "caller_line": "Get four $200 Amazon cards, scratch off the back, and text me the codes. I'll reimburse you later \u2014 I just need this done in the next 15 minutes before my flight.",
        "options": [
          {
            "text": "Okay, on it \u2014 I'll send the codes as soon as I have them.",
            "next": "end_compromised_giftcard",
            "note": "Gift card codes are as good as cash the moment they're sent \u2014 this is now unrecoverable."
          },
          {
            "text": "Actually, let me just call you on your cell to confirm quickly.",
            "next": "n2b",
            "note": "Better late than never \u2014 verifying independently is still the right move here."
          }
        ]
      },
      "n2b": {
        "caller_line": "I really don't have time for that right now, I'm about to board. Just trust me on this one \u2014 we've worked together for years.",
        "options": [
          {
            "text": "I understand, but I still need to verify first \u2014 I'll call you back.",
            "next": "end_safe",
            "note": "Appeals to trust and relationship history are exactly what this tactic leans on. Verifying anyway is the right call."
          },
          {
            "text": "Okay, I trust you \u2014 I'll get it done right now.",
            "next": "end_compromised_giftcard",
            "note": "The appeal to your working relationship overrode your better judgment. That's precisely the intended effect."
          }
        ]
      },
      "end_safe": {
        "ending": true,
        "outcome": "safe",
        "closing_line": "...Fine. I'll deal with it myself. *click*",
        "summary": "You refused to act on an unusual, urgent financial request without independent verification \u2014 even when the caller invoked authority, urgency, and your working relationship all at once. That combination fools a lot of people; holding firm here is a genuinely strong result.",
        "tactics_used": [
          "Authority impersonation (a superior you'd normally want to help)",
          "Urgency (a tight deadline before \"boarding a flight\")",
          "Appeal to trust and relationship history",
          "Isolation from verification (\"I don't have time for that\")"
        ],
        "right": [
          "Did not purchase anything or share codes without confirming the request independently",
          "Was not swayed by appeals to trust or urgency",
          "Recognized that a legitimate request can survive a two-minute verification call"
        ],
        "improve": []
      },
      "end_compromised_giftcard": {
        "ending": true,
        "outcome": "compromised",
        "closing_line": "Perfect, got them. Thanks so much \u2014 talk soon! *click*",
        "summary": "You purchased gift cards and sent the codes to an unverified caller. Gift card codes function like cash and can't be reversed once sent \u2014 this loss is very likely permanent, and \"Jennifer\" was almost certainly not your CEO.",
        "tactics_used": [
          "Authority impersonation (a superior you'd want to help quickly)",
          "Urgency (a tight, artificial deadline)",
          "Appeal to trust and relationship history",
          "Isolation from verification"
        ],
        "right": [],
        "improve": [
          "Gift card purchase requests from \"executives\" are one of the most common scams precisely because the codes are untraceable \u2014 treat this as an automatic red flag",
          "Verify unusual financial requests through a channel you control (a number already saved in your phone, not one the caller provides)",
          "A real colleague or executive will never be upset that you took two minutes to confirm before spending money on their behalf"
        ]
      }
    }
  }
];
