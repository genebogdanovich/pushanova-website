const fs = require('fs');

const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const he = JSON.parse(fs.readFileSync('locales/he.json', 'utf8'));

he.features.pricing.free.items[10].message = "Apple Health וסנכרון iCloud";
he.support.sections[4].items[5].question.message = "איך אני מאפס את ההתקדמות שלי?";
he.support.sections[4].items[5].answer.message = "<p>אין כפתור אחד שמאפס את כל ההתקדמות.</p><ul><li>שנו את רמת התוכנית הנוכחית עם <strong>בחירת רמה</strong>.</li><li>מחקו אימונים בנפרד מתוך <strong>אימונים</strong>.</li><li>נהלו את הנתונים של Pushanova השמורים ב-iCloud דרך הגדרות המכשיר שלכם.</li></ul><p>עותקי Apple Health ודוחות אבחון שנשלחו בדוא״ל נשמרים בנפרד. הסרת ההתקנה של Pushanova אינה מוחקת עותקים אלה.</p>";
he.support.sections[7].items[2].question.message = "האם Pushanova דורשת חיבור לאינטרנט?";
he.support.sections[7].items[2].answer.message = "<p>אין צורך בחיבור לאינטרנט כדי להתחיל ולשמור אימון במכשיר אחד.</p><p>חיבור לאינטרנט נדרש עבור סנכרון iCloud, רכישות ב-App Store, שחזור רכישות, ושליחת דוא״ל תמיכה.</p>";
he.support.sections[9].id.message = "contact";
he.support.sections[9].heading.message = "יצירת קשר";
he.support.sections[9].body.message = "<p>שלחו דוא״ל אל <a href=\"{mailto}\">{email}</a>.</p><p>כללו את הפרטים הבאים:</p><ul><li>דגם המכשיר</li><li>גרסת מערכת ההפעלה</li><li>גרסת Pushanova</li><li>האם התאמנתם ב-iPhone, ב-iPad, ב-Apple Watch, או בשני מכשירים יחד</li><li>האם השלמתם רמת תוכנית או שהתאמנתם באופן חופשי</li><li>מה ציפיתם שיקרה</li><li>מה קרה בפועל</li><li>צילום מסך, במידה ועוזר</li></ul><p>עבור בעיות ספירה, שלחו <strong>דיווח על בעיה</strong> מתוך האימון המושפע במידת האפשר. צילומי מסך יכולים לעזור כאשר הם אינם מכילים מידע שאתם מעדיפים לא לשתף.</p>";

fs.writeFileSync('locales/he.json', JSON.stringify(he, null, 2));
console.log("Patched locales/he.json");
