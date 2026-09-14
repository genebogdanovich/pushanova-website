# Privacy Policy for Pushanova

**Last updated: September 2, 2026**

Canonical version: https://genebogdanovich.com/pushanova/privacy-policy/

This Privacy Policy explains how **Yauhen Bahdanovich**, an individual developer in the **Republic of Belarus** (“I,” “me,” or “the developer”), handles information in the **Pushanova** app for iPhone, iPad, and Apple Watch (the “App”).

If you have questions, contact [info@genebogdanovich.com](mailto:info@genebogdanovich.com).

Pushanova does not require an account. There is no sign-up, no username, and no social-media login.

## 1. Face Data and the TrueDepth API {#face-data}

This section describes Pushanova’s use of Apple’s TrueDepth camera and ARKit face tracking. It is the section that addresses collection, use, disclosure, sharing, retention, deletion, and storage of face data.

### What information is collected using the TrueDepth API

On iPhone and iPad models that support TrueDepth, Pushanova may use the TrueDepth camera and ARKit face tracking during a workout to measure the **distance between the user’s face and the device**, together with a **timestamp** for each measurement.

That distance is a number (in meters). Pushanova uses it to detect changes in distance while the user performs push-ups, and to count repetitions.

Pushanova does **not** use the TrueDepth API to:

- take, save, or analyze photographs or video
- capture a face mesh, depth map image, or texture
- collect blend shapes or other facial-expression maps
- identify a person, create a biometric faceprint, or authenticate a user
- infer identity, age, sex, race, health condition, or any characteristic other than face-to-device distance over time

The App does not store images or video from the TrueDepth camera as part of push-up detection.

**Apple Watch does not use the TrueDepth camera.** Watch-based counting uses motion sensors and HealthKit, not TrueDepth and not face data.

### For what purposes this information is collected

Face-to-device distance and timestamps are used only to:

- count push-ups automatically on supported iPhone and iPad models
- keep a distance waveform with the workout so the user and the App can review that session
- support diagnostics if the user reports a counting problem
- support related, counting-focused product features, including possible future rep-quality analysis

Face data is **not** used for advertising, advertising measurement, remarketing, profiling for marketing, or analytics that identify a person. It is not used to track users across other companies’ apps or websites. It is not sold. It is not shared with partners, contractors, laboratories, or data brokers.

### Storage

During an active workout, distance values are processed on the user’s device in real time.

If the workout is saved, the distance waveform (`face-to-device distance` + `timestamp`) is stored **on the user’s device** as part of that workout record, together with other workout data such as repetition counts and, where applicable, motion samples.

If iCloud / CloudKit sync is enabled for the App, that same workout record — including the face-distance waveform — may be stored in the **user’s own iCloud account** on Apple’s servers so it can appear on the user’s other devices. That is the user’s iCloud storage, not a public feed, and not a database I browse for all users.

I do not operate a Pushanova server that receives TrueDepth data automatically.

### Sharing and disclosure

Face data is **not** shared with third parties for their own purposes.

The only situations in which face-distance data can leave the user’s device besides the user’s own iCloud sync are:

1. **Apple iCloud / CloudKit**, if the user uses iCloud with the App, as described above. Apple provides that infrastructure under Apple’s terms and privacy policy.
2. **A report the user chooses to send.** If the user uses “Report an Issue” (or similar) and emails workout diagnostics, the email may include the face-distance waveform for that workout, plus related workout metadata such as repetition counts, timestamps, motion/gravity samples, notes the user types, app version, and locale. That email is sent to [info@genebogdanovich.com](mailto:info@genebogdanovich.com) only because the user chose to send it. It does not include photos, video, or a recording of the user’s face.
3. **Legal requirement.** I may disclose information if required by law or a valid legal process.

Face-distance data is **not** sent to Firebase, Google Analytics, Crashlytics, advertisers, or any other analytics or advertising SDK.

### Retention

On the user’s device (and in the user’s iCloud, if sync is on), the face-distance waveform is kept **for as long as the workout is kept**. It is retained so the App can show history and so future counting, diagnostic, and rep-quality features can use that session’s measurements.

I do not receive that waveform unless the user emails it.

If the user emails a diagnostic report that includes face-distance data, I keep that copy **only to debug and improve push-up detection and related App functionality**, and for as long as that purpose reasonably requires.

### Deletion

The user can delete a workout in Pushanova. Deleting the workout deletes the stored face-distance waveform for that workout from the App’s on-device store. If iCloud sync is enabled, deletion is also propagated according to Apple’s iCloud / CloudKit behavior.

Uninstalling the App removes the App’s on-device data. Data already in the user’s iCloud may remain until the user deletes it there or the iCloud data is otherwise removed under Apple’s rules.

If the user emailed me a diagnostic report and wants that copy deleted, they can email [info@genebogdanovich.com](mailto:info@genebogdanovich.com). I will delete the copy I control. I cannot delete copies that remain only on the user’s device, in the user’s email sent-mail, or in the user’s iCloud account.

### What this section does not cover

Post-workout photos the user takes with the regular camera, HealthKit data, Watch motion data, and optional featuring submissions are **not** TrueDepth face data. They are described in the sections below.

## 2. Other information processed by the App

### Workout records on the device and iCloud

The App stores workout history the user creates, which may include:

- start and end times, duration, mode or level, and repetition counts
- pace and cadence derived from those counts
- face-distance waveforms (TrueDepth sessions only), as described in Section 1
- motion samples (for example gravity, acceleration, and attitude), especially for Apple Watch or non-TrueDepth sessions
- notes or feeling ratings the user enters
- references to a related HealthKit workout, when Health access is enabled

This data is stored on the user’s device and may sync via the user’s iCloud account. I do not receive it automatically.

### Information the user sends by email

If the user emails me (support, a detection report, or a featuring submission), I receive whatever they include: message text, email address, and any attachments. I use that to respond, to operate and improve the App, and — for featuring submissions — as described in Section 4.

### Device permissions

The App may ask iOS or watchOS for camera, motion, Health, notifications, or photo-library (add-only) access. Those systems gate the data. Denying a permission may disable the related feature (for example, automatic TrueDepth counting without camera access).

## 3. Health and Fitness (HealthKit)

With the user’s permission, Pushanova may:

**Write to Apple Health**

- workouts
- active energy

**Read from Apple Health**

- workouts
- heart rate
- active energy
- basal energy
- body mass (used to estimate energy when needed)

Health data is used to run and save workouts, show heart-rate and energy information, and keep the App’s log consistent with Apple Health when the user has allowed that.

HealthKit data is not used for advertising or sold to data brokers. It is not shared with third parties except Apple Health on the user’s device (and the user’s iCloud Health data, if the user uses that Apple feature) and except copies the user explicitly emails in a diagnostic report (which may include workout metadata; diagnostic reports are not a dump of the user’s full Health database).

The user can change Health access in iOS or watchOS Settings. Deleting a workout in Pushanova may also delete the related HealthKit workout when the App is allowed to do so.

## 4. Photos and featuring submissions

Pushanova can take or use a **post-workout photo** with the regular camera. That is separate from TrueDepth push-up counting. TrueDepth counting does not take or store that photo.

Photos stay on the user’s device unless the user shares them through the system share sheet, saves them to the photo library, or emails a **featuring submission**.

Featuring is optional. The App works without it.

If the user emails a featuring submission to [info@genebogdanovich.com](mailto:info@genebogdanovich.com), they may include a photo and, if they choose, their name, city, and a short message. By submitting, they ask me to consider displaying that content on Pushanova’s official social media accounts (including Instagram) and similar official channels. Being featured is not guaranteed. Valid submissions that meet the stated requirements may receive a promo code for Pushanova Premium, as described in the App.

**Age for submissions.** Sending a photo, name, city, or message is not allowed for young children. You must be **at least 16 years old** to submit. If you are **13 to 15**, you may submit only with permission from a parent or legal guardian, and only where local law allows that. In the European Economic Area, the United Kingdom, and any other region where the digital age of consent is 16 (or higher), **you must meet that age** to submit. Pushanova is rated 4+ for general use of the App; that rating does not allow children to send personal photos or contact details for public posting.

The user may request removal of a submission they sent by emailing [info@genebogdanovich.com](mailto:info@genebogdanovich.com). I will remove it from channels I control. I cannot control copies other people have already saved, or a platform’s own backup or cache after a post is removed.

## 5. Analytics and crash reports

The App uses **Firebase Analytics** and **Firebase Crashlytics** (Google) for standard product analytics and crash reporting. This may include how features are used, device type, OS version, language, and crash or performance diagnostics.

These services are **not** given TrueDepth data, face-distance waveforms, photos, or Health samples. They are not used to track the user across third-party apps and websites for advertising. I do not use them to sell personal information.

Google’s processing is also described in Google’s privacy policy.

## 6. Purchases

Optional Pushanova Premium and other in-app purchases are processed by **Apple**. I do not receive the user’s full payment card details. The App may receive purchase or subscription status from Apple so it can unlock paid features. Refunds and billing are handled by Apple.

## 7. Notifications

If the user allows notifications, Pushanova may schedule **local** reminders on the device (for example, workout reminders). Those notifications are not an excuse to collect extra personal data on a server.

## 8. How information is shared

I do not sell personal information.

I share information only as follows:

- **Apple**, as the platform: App Store, StoreKit, HealthKit, iCloud/CloudKit, device operating system
- **Google**, only as the provider of Firebase Analytics and Crashlytics, as described in Section 5, and not for face data
- **The user**, when they share a photo or file themselves
- **Email I receive** when the user writes to me
- **Social platforms**, only for featuring content the user submitted for that purpose
- **Legal** disclosure if required by law

I do not share face data with advertisers or business partners.

## 9. Retention and deletion (summary)

| Data                       | Where it is stored                                           | How long it is kept                                          | How to delete                                                |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Face-distance waveform     | User’s device; user’s iCloud if sync is on                   | Until the workout is deleted                                 | Delete the workout in the App; iCloud follows Apple’s sync; email me if you also sent a report |
| Other workout records      | Same                                                         | Until deleted                                                | Same                                                         |
| HealthKit copies           | Apple Health on the user’s devices / Apple’s Health iCloud if the user uses it | Under the user’s Health settings and Apple’s rules           | Health app / Settings, and in-App workout delete when permitted |
| Diagnostic email I receive | My email inbox                                               | As long as reasonably needed to improve detection and the App | Email [info@genebogdanovich.com](mailto:info@genebogdanovich.com) |
| Featuring submission       | My email; possibly official social accounts                  | Until removed on request, or as long as the post remains if the user has not asked to take it down | Email a removal request                                      |
| Analytics / crash logs     | Google Firebase                                              | Per Google’s and my then-current analytics retention         | Limited; these are not used to identify you as a customer account, because the App has no account |

## 10. Children’s privacy

Pushanova is a **general-audience** app. Its App Store age rating is **4+**. It is **not directed at children under 13**, and I do not knowingly collect personal information from children under 13.

TrueDepth is not used to identify children. Distance measurements stay on the user’s device and, if enabled, the user’s iCloud. I do not receive them unless someone emails a report.

I do not want diagnostic reports or featuring submissions from children under 13. If I learn that I received personal information from a child under 13, I will delete the copy I control.

Featuring submissions have a higher age rule. See Section 4 (16+, with a limited 13–15 parental-permission rule only where local law allows it, and 16+ where that is the digital age of consent).

Parents or guardians who believe a child sent information to [info@genebogdanovich.com](mailto:info@genebogdanovich.com) should write to that address.

## 11. Your rights and requests

Depending on where you live (including the EEA, United Kingdom, and similar regimes), you may have the right to ask what personal information I hold, to correct it, to delete it, to restrict or object to certain processing, or to complain to a data-protection authority.

Because Pushanova has no user accounts, most App data is only on your device and in your Apple accounts (iCloud, Health, App Store). I can act on copies **I** actually received, such as emails.

To make a request, email [info@genebogdanovich.com](mailto:info@genebogdanovich.com). I may need enough detail to find the message (for example, the address you wrote from and the approximate date).

I do not sell personal information, including as that idea is used under California law.

## 12. International processing

I am based in the **Republic of Belarus**. If you email me, or if Apple or Google process data as described above, information may be processed in Belarus, in the United States, in the European Union, or in other countries where those providers operate. Those places may have different data-protection laws from your country.

## 13. Third-party sites and platforms

The App may link to Instagram, the App Store, or other sites I do not control. Their privacy practices are their own.

## 14. Changes

I may update this Privacy Policy. The “Last updated” date will change when I do. The current version is the one published at https://genebogdanovich.com/pushanova/privacy-policy/ and in the App.

## 15. Contact

Yauhen Bahdanovich  
Pushanova  
Email: [info@genebogdanovich.com](mailto:info@genebogdanovich.com)