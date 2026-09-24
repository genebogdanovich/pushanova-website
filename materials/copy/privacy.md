# Privacy Policy for Pushanova

**Last updated: September 24, 2026**

Canonical version: https://pushanova.com/privacy/

This Privacy Policy describes how **Yauhen Bahdanovich**, a self-employed individual based in the **Republic of Belarus** (“I,” “me,” or the “Developer”), processes personal data in connection with the **Pushanova** app for iPhone, iPad, and Apple Watch (the “App”).

Where I determine the purposes and means of processing, I am the data controller or operator under applicable data-protection law. Questions and requests may be sent to [help@pushanova.com](mailto:help@pushanova.com).

This Privacy Policy is a notice. It does not replace separate consent where applicable law requires consent.

Pushanova does not require an account. There is no sign-up, username, or social-media login.

## 1. Scope

This Privacy Policy applies to personal data processed through the App and to communications sent to me for support, diagnostics, or optional social-media featuring.

Apple, Google, Postale.io, and social-media platforms may also process information under their own terms and privacy policies. This Privacy Policy describes my use of those services but does not govern processing that those companies carry out independently for their own purposes.

## 2. Face Data and the TrueDepth API {#face-data}

This section describes the App’s collection, use, disclosure, storage, retention, and deletion of data derived from Apple’s TrueDepth camera and ARKit face tracking.

### Data collected

On supported iPhone and iPad models, Pushanova uses the TrueDepth camera and ARKit face tracking during a workout to measure:

- the distance between the user’s face and the device, expressed as a number in meters; and
- a timestamp for each distance measurement.

The App uses changes in distance over time to count push-ups. For purposes of this Privacy Policy, the resulting distance-and-time series is called the **face-distance waveform**.

Pushanova does **not** use the TrueDepth API to:

- take or store photographs or video;
- store a face mesh, depth-map image, texture, or blend-shape data;
- identify or authenticate a person or create a biometric faceprint;
- infer identity, age, sex, race, health condition, or facial expression; or
- conduct advertising, marketing, or user profiling.

Apple Watch does not use TrueDepth. Watch-based counting uses motion sensors and, when authorized, HealthKit.

### Purposes

The face-distance waveform is used only to:

- count push-ups automatically;
- retain the waveform with a saved workout so the session can be reviewed; and
- diagnose counting problems when the user chooses to send a diagnostic report.

Face-distance data is not sold, used for advertising, or provided to Firebase Analytics or Firebase Crashlytics.

### On-device storage, iCloud, and backups

Distance values are processed on the device during a workout. If the user saves the workout, the face-distance waveform is stored as part of the workout record.

If iCloud is enabled for Pushanova in the user’s device settings, the workout record may sync through Apple iCloud / CloudKit to the user’s other devices. Local App data may also be included in an iCloud device backup or a computer backup, according to the user’s backup settings. I do not operate a Pushanova server that automatically receives face-distance data.

### Disclosure

Face-distance data may leave the device only in the following circumstances:

1. **Apple services.** Apple may process the data to provide iCloud / CloudKit synchronization or device backups selected by the user.
2. **A user-initiated diagnostic email.** A user may choose to email a diagnostic attachment containing the face-distance waveform and related mathematical or motion readings. The user can review the complete email and attachment before sending it. The message is processed by the user’s email provider and by Postale.io, which hosts [help@pushanova.com](mailto:help@pushanova.com).
3. **Legal disclosure.** I may disclose information when required by applicable law or valid legal process.

Face-distance data is not disclosed to advertisers, data brokers, Firebase, or social-media platforms.

### Retention and deletion

The face-distance waveform remains on the device and, where enabled, in iCloud for as long as the associated workout remains. Deleting the workout deletes the active App copy and propagates the deletion through CloudKit according to Apple’s synchronization behavior.

Uninstalling the App removes its active on-device data. Synced data or backup copies may remain until the user deletes them or Apple removes them under its retention rules.

If a diagnostic email contains a face-distance waveform, I delete the email and attachment six months after the support conversation is resolved, as described in Section 6. A user may request earlier deletion by emailing [help@pushanova.com](mailto:help@pushanova.com).

## 3. Workout and Motion Data

The App creates workout records that may contain:

- workout start and end times, duration, mode or level, and repetition counts;
- pace and cadence derived from repetition counts;
- face-distance waveforms for TrueDepth sessions;
- motion readings such as gravity, acceleration, and attitude;
- notes or feeling ratings entered by the user; and
- a reference to a related HealthKit workout, when Health access is enabled.

These records are stored on the user’s device. They may sync through the user’s iCloud account when iCloud is enabled for Pushanova and may be included in device backups. I do not receive workout records automatically.

Workout records remain until the user deletes the workout, deletes the applicable iCloud data, or removes them through the relevant Apple settings. Backup copies are retained under the user’s and Apple’s backup settings.

## 4. Health and Fitness Data

With the user’s authorization, Pushanova may interact with Apple Health as follows.

**Data written to Apple Health:**

- workouts; and
- active energy.

**Data read from Apple Health:**

- workouts;
- heart rate;
- active energy;
- basal energy; and
- body mass, when needed to estimate energy.

The App uses this information to conduct and save workouts, display heart-rate and energy information, estimate energy, and keep the App’s workout log consistent with Apple Health.

HealthKit data is not used for advertising, sold, or provided to Firebase. Diagnostic emails do not contain HealthKit samples or HealthKit values. Health data remains subject to the user’s Apple Health and iCloud Health settings and Apple’s privacy practices.

The user can grant or revoke Health access in iOS or watchOS Settings. Deleting a workout in Pushanova may also delete the related HealthKit workout when the App has permission to do so.

## 5. Photos and Featuring Submissions

Pushanova may allow the user to take or select a post-workout photo using the regular camera or photo library. This is separate from TrueDepth counting. The photo remains on the device unless the user saves, shares, or emails it.

Featuring is optional and is not required to use the App. A featuring submission may contain:

- the sender’s email address;
- a photo of the sender;
- the sender’s name and city, if provided; and
- a short message.

Featuring submissions are accepted only from persons who are **at least 16 years old**. The submission must depict only the sender and must not depict minors or any other identifiable person. The submission email must confirm that the sender is at least 16, owns or controls the submitted content, and consents to its publication.

I may, at my discretion, publish an accepted submission on Instagram or another official Pushanova social-media account that I control. Published material may be publicly visible and may be copied or reshared by other users. A valid submission may receive a Pushanova Premium promotional code, but publication and promotional codes are not guaranteed.

The submission email and its attachments are deleted one year after receipt. If a submission has been published, the social-media post may remain after the source email is deleted and will remain until the sender requests removal or I remove it for another reason.

The sender may withdraw consent to future use and request removal from accounts I control by emailing [help@pushanova.com](mailto:help@pushanova.com). Removal cannot recover copies already made by other people or immediately remove a platform’s backup or cached copies.

## 6. Support and Diagnostic Communications

When a user contacts me, I receive the sender’s email address, message, attachments, and ordinary email-routing metadata. My email is hosted by **Postale.io**.

A diagnostic email may contain repetition counts, timestamps, face-to-device distance readings, motion readings such as gravity, acceleration or attitude, derived mathematical values, and technical information such as the App version and locale. It does not contain photographs, video, or HealthKit data. The user can review the complete email and every attachment in the email client before choosing to send it.

I use support and diagnostic communications to answer the user, investigate reported problems, maintain the App, and improve counting accuracy and reliability.

I consider a conversation resolved when I send a final response or, following my response, the user does not reply for 30 days. I delete the conversation, its attachments, and copies in the active mailbox and Trash six months after resolution. Residual copies may remain temporarily in Postale.io backups and are removed under the provider’s backup-retention process.

Information may be retained longer only where reasonably necessary to comply with law, resolve an active dispute, or establish, exercise, or defend legal claims.

## 7. Firebase Analytics and Firebase Crashlytics

The App uses only two Firebase services: **Firebase Analytics** and **Firebase Crashlytics**, both provided by Google. These services initialize automatically when the App launches. The App does not currently provide an in-App control to disable their collection or reset the Firebase app-instance identifier.

### Firebase Analytics

Firebase Analytics may process:

- a generated app-instance identifier and Apple’s Identifier for Vendor where available;
- App launches, sessions, engagement, screen views, and selected button interactions;
- App version, device type, operating-system version, language, and general geographic information;
- screen names and the sequence of screens viewed; and
- automatically generated in-app purchase events, which may include product identifier, product name, price, currency, quantity, subscription status, free-trial status, and introductory-offer information.

I use this information in aggregate to understand which screens and controls are used and to improve the App. Pushanova has no account-level user identifier, and I do not configure Analytics events to include names, email addresses, notes, workout results, HealthKit data, photos, motion readings, or face-distance data.

### Firebase Crashlytics

Firebase Crashlytics may process:

- a Crashlytics installation UUID and Firebase installation identifier;
- crash stack traces, exception information, and crash timestamps;
- device model, operating-system version, App version, language, and App state;
- session and technical diagnostic information; and
- recent screen-view or interaction breadcrumbs associated with a crash.

I use Crashlytics to identify, investigate, and correct crashes and reliability problems. I do not configure Crashlytics to receive HealthKit samples, photos, notes, face-distance waveforms, or motion readings.

### Advertising, integrations, and retention

Firebase is not used for advertising or cross-app tracking. The App does not use Firebase with Google Ads, BigQuery exports, Crash Insights data sharing, or the Apple advertising identifier (IDFA).

Firebase Analytics user-level and event-level data may be retained for up to 14 months after the most recent activity. New activity may restart the user-level retention period. Aggregated reports that no longer identify an app instance may be retained longer.

Google states that Firebase Crashlytics retains crash stack traces and associated installation identifiers for 90 days before beginning removal from live and backup systems. Google may retain service and security data under its own retention rules.

Additional information is available in [Google’s Privacy Policy](https://policies.google.com/privacy) and [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).

## 8. Purchases and Notifications

In-app purchases are processed by Apple. I do not receive full payment-card details. The App receives purchase or subscription status from Apple to provide paid features. Firebase Analytics may record the purchase-event information described in Section 7. Refunds and billing are handled by Apple.

If the user allows notifications, Pushanova schedules local reminders on the device. Pushanova does not use Firebase Cloud Messaging or another remote-push service.

## 9. Purposes and Legal Bases

Where the European Union General Data Protection Regulation (“GDPR”) or United Kingdom GDPR applies, I rely on the following legal bases:

- **Performance of a contract or steps requested by the user:** providing workout counting, history, synchronization, purchases, and requested support.
- **Consent:** accessing camera, motion, photo, and HealthKit data where permission or explicit consent is required; receiving user-initiated diagnostics; and reviewing or publishing a featuring submission. Where health information is special-category data, I rely on explicit consent to the extent required by Article 9 of the GDPR.
- **Legitimate interests:** measuring App use through Firebase Analytics, diagnosing crashes through Firebase Crashlytics, maintaining security and reliability, improving the App, responding to communications, and protecting legal rights. These interests are limited by the data-minimization and use restrictions described in this Privacy Policy.
- **Legal obligation:** retaining or disclosing information when applicable law requires it.

For processing governed by the laws of Belarus, I rely on the agreement or action requested by the user, consent where required, and other grounds permitted by the Law of the Republic of Belarus No. 99-Z “On Personal Data Protection.”

Where processing is based on consent, consent may be withdrawn at any time without affecting processing already carried out lawfully before withdrawal.

## 10. Recipients and Disclosure

I may disclose information to the following recipients for the stated purposes:

- **Apple:** App Store, StoreKit, HealthKit, iCloud / CloudKit, operating-system permissions, and device backups;
- **Google:** Firebase Analytics and Firebase Crashlytics;
- **Postale.io:** hosting and delivery of emails sent to me;
- **the sender’s email provider:** transmission of an email initiated by the sender;
- **Instagram and other official social-media platforms:** only for a featuring submission authorized for publication; and
- **public authorities or other recipients required by law:** only where disclosure is legally required.

Service providers process data under their terms, contractual commitments, and applicable law. I do not sell or rent personal data or share it for cross-context behavioral advertising.

## 11. International Processing and Transfers

I am based in the Republic of Belarus and access support, diagnostic, and Firebase information from Belarus. Belarus has not been recognized by the European Union or United Kingdom as providing an adequate level of data protection.

Apple, Google, Postale.io, and social-media platforms may process information in the United States, France, countries in the European Economic Area, and other countries in which they or their service providers operate. Postale.io states that it uses Amazon Web Services infrastructure in France and the United States.

Where applicable, providers may rely on adequacy decisions, data-protection frameworks, standard contractual clauses, or other lawful transfer mechanisms made available under their terms. Their locations and mechanisms may change.

For purposes of Belarusian law, use of foreign cloud, email, analytics, and social-media services may constitute a cross-border transfer. A destination may not provide the level of protection recognized under Belarusian law. Risks may include different privacy rules, access by foreign authorities, and more limited rights or remedies.

Users should not send optional diagnostic or featuring information if they do not want that information processed in Belarus or by the foreign providers identified above.

## 12. Retention Summary

Unless a longer period is required by law or for an active legal claim:

- **Workout records, motion readings, and face-distance waveforms:** until the user deletes the associated workout; synchronized and backup copies follow Apple’s processes.
- **HealthKit data:** according to the user’s Apple Health settings and Apple’s retention rules.
- **Support and diagnostic emails:** six months after the conversation is resolved.
- **Featuring submission emails:** one year after receipt.
- **Published featuring posts:** until the sender requests removal or I remove the post.
- **Firebase Analytics user-level and event-level data:** up to 14 months after the most recent activity; aggregated reporting may be retained longer.
- **Firebase Crashlytics reports and associated identifiers:** 90 days before Google begins removal from live and backup systems.
- **Purchase status:** for as long as needed to provide or restore the purchased feature, subject to Apple’s records and rules.

## 13. Rights and Requests

Depending on applicable law, a person may have the right to:

- obtain confirmation of whether personal data is processed and receive access to it;
- correct incomplete, outdated, or inaccurate data;
- request deletion or termination of processing;
- restrict processing;
- object to processing based on legitimate interests;
- receive portable data where the right to portability applies;
- withdraw consent;
- receive information about recipients or cross-border transfers; and
- complain to a competent data-protection authority or court.

Most workout, motion, photo, and HealthKit data is controlled directly by the user through the App, Apple Health, iCloud, and device settings. Deleting a workout removes its active App record. Users may manage iCloud data and backups through Apple settings.

Because Pushanova has no account, Firebase identifiers are not linked to an email address or identity known to me. I may be unable to locate a particular Firebase record from an email request. Uninstalling the App stops future collection from that installation but does not immediately delete information already sent to Google.

Requests concerning data I control may be sent to [help@pushanova.com](mailto:help@pushanova.com). I may request information reasonably necessary to verify the requester and locate the relevant records, and I will respond within the period required by applicable law.

Residents of Belarus may complain to the [National Personal Data Protection Centre of the Republic of Belarus](https://cpd.by/en/). Individuals in the EEA or United Kingdom may complain to the supervisory authority where they live or work.

Pushanova does not make decisions that produce legal or similarly significant effects solely through automated processing. I do not sell personal data, including as “sale” or “sharing” is defined by applicable United States state privacy laws.

## 14. Children

Pushanova is a general-audience fitness app with an App Store age rating of 4+. It is not directed to children under 13.

The App does not request a date of birth, and Firebase does not provide me with the user’s age. People under 13 must not send support messages, diagnostic reports, or featuring submissions. A parent or guardian who believes a child has sent personal information to me may request deletion at [help@pushanova.com](mailto:help@pushanova.com).

Featuring submissions are permitted only from persons aged 16 or older. No featuring submission may depict a minor or any person other than the sender.

## 15. Security

I use reasonable technical and organizational measures appropriate to the information processed, including limiting access to service accounts and relying on security controls provided by Apple, Google, and Postale.io. Postale.io states that it uses encrypted transport and encryption at rest.

No method of storage or transmission is completely secure. Ordinary email is not an appropriate channel for information that is unnecessary for support. Users should review diagnostic attachments and remove any information they do not wish to send.

## 16. Changes to this Privacy Policy

I may amend this Privacy Policy to reflect changes in the App, service providers, or applicable law. The “Last updated” date identifies the current version. If a change materially expands processing that requires consent, I will request new consent where required.

The current version is published at https://pushanova.com/privacy/ and in the App.

## 17. Contact

**Yauhen Bahdanovich**<br>
Self-employed developer of Pushanova<br>
Republic of Belarus<br>
Email: [help@pushanova.com](mailto:help@pushanova.com)
