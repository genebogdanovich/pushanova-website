const fs = require('fs');
const he = JSON.parse(fs.readFileSync('locales/he.json', 'utf8'));

he.support.sections[1].items[4].answer.message = "<p>פתחו את ההגדרות ב-Pushanova והפעילו את <strong>הקש כדי לספור</strong>. במהלך אימון, כל הקשה על מסך האימון סופרת שכיבת סמיכה אחת.</p>";

he.support.sections[2].items[1].answer.message = "<p>ב-iPhone, פתחו את הגדרות Pushanova והפעילו את <strong>שימוש ב-Apple Watch</strong>. ודאו ש-Pushanova מותקנת ב-Watch ושה-Watch פתוח ונמצא בקרבת מקום. לאחר מכן, התחילו את האימון ב-iPhone או ב-Apple Watch.</p><p>ה-Apple Watch סופר את שכיבות הסמיכה שלכם בעוד ה-iPhone מציג את אותו האימון. ספירת שכיבות הסמיכה, סטים, קצב, ומנוחה נשארים מסונכרנים.</p><p>אימוני Apple Watch מצומדים זמינים עם iPhone, לא עם iPad.</p>";

he.support.sections[5].items[8].answer.message = "<p>פתחו את הגדרות Pushanova ב-iPhone והקישו על <strong>מימוש הטבה</strong>. Apple Watch אינו יכול לממש קוד הטבה.</p><p>Apple קובעת אם הקוד תקף ולאיזה Apple Account מותר להשתמש בו.</p>";

he.support.sections[6].items[1].question.message = "האם Pushanova שומרת נתוני מדידות תנועה?";
he.support.sections[6].items[1].answer.message = "<p>Pushanova עשויה לשמור מדידות תנועה שעוזרות לה לספור שכיבות סמיכה. מדידות אלו אינן תמונות או וידאו.</p><p>הן נשארות עם האימון במכשיר שלכם. אם סנכרון iCloud מופעל, הן יכולות להסתנכרן דרך חשבון ה-iCloud האישי שלכם. הן אינן נשלחות לשרת של Pushanova אלא אם תבחרו ב<strong>דיווח על בעיה</strong> ותשלחו את הדוא״ל.</p><p>לפרטים המלאים, קראו את <a href=\"{privacyUrl}\">מדיניות הפרטיות</a>.</p>";

he.support.sections[6].items[2].question.message = "איך אני מוחק את הנתונים שלי?";
he.support.sections[6].items[2].answer.message = "<p>כדי למחוק נתוני אימון:</p><ul><li>מחקו אימונים בנפרד ב<strong>אימונים</strong>. כאשר סנכרון iCloud מופעל, המחיקה מסתנכרנת דרך iCloud.</li><li>הסירו נתוני Pushanova מ-iCloud דרך הגדרות אחסון ה-iCloud של המכשיר שלכם אם ברצונכם למחוק את העותק בענן.</li><li>מחקו עותקי Apple Health בנפרד ב-Apple Health. Pushanova עשויה גם למחוק אימון Health תואם כאשר יש לה אישור.</li></ul><p>הסרת ההתקנה של Pushanova מוחקת נתונים השמורים רק באותו מכשיר. נתונים שכבר נשמרו ב-iCloud או ב-Apple Health נשארים עד שתמחקו אותם משם.</p><p>אם שלחתם דוח אבחון או הגשתם תמונה בדוא״ל, צרו קשר עם <a href=\"{mailto}\">{email}</a> לבקש מחיקה של העותק שהתקבל על ידי המפתח.</p>";

he.support.sections[7].items[1].question.message = "האם Pushanova עובדת ב-iPad?";
he.support.sections[7].items[1].answer.message = "<p>כן. Pushanova ב-iPad כוללת ספירה אוטומטית, אימוני תוכנית, אימון ללא יעדים מוגדרים מראש, היסטוריית אימונים, התקדמות, ניתוח נתונים, ו-Apple Health.</p><p>iPad לא תומך באימון Apple Watch מצומד. השתמשו ב-iPhone כשאתם רוצים ש-Apple Watch ומסך נוסף יציגו את אותו האימון הפעיל.</p><p>אם אינכם משתמשים בגישת מצלמה ב-iPad, הפעילו את <strong>הקש כדי לספור</strong>.</p>";

he.support.sections[8].items[0].question.message = "מה עלי לעשות אם היישום אינו מגיב?";
he.support.sections[8].items[0].answer.message = "<p>סגרו ופתחו מחדש את Pushanova. אם היא עדיין לא מגיבה, הפעילו מחדש את המכשיר.</p><p>ב-Apple Watch, בטלו את נעילת ה-Watch ופתחו שוב את Pushanova. אם אימון שהתחיל מ-iPhone נראה כאילו הפסיק, בדקו האם האימון כבר פתוח ב-Watch.</p>";

he.support.sections[8].items[1].question.message = "מדוע האימון או ה-Premium שלי לא מסתנכרנים למכשיר אחר?";
he.support.sections[8].items[1].answer.message = "<p>עבור היסטוריית אימונים:</p><ul><li>אשרו שהמכשירים משתמשים באותו Apple Account.</li><li>אשרו ש-iCloud מופעל עבור Pushanova.</li><li>חברו את שני המכשירים לאינטרנט.</li><li>פתחו את Pushanova בכל מכשיר ואפשרו זמן לסנכרון.</li></ul><p>Apple Health שומר עותק אימון נפרד. Apple Health אינו מקור הסנכרון של היסטוריית האימונים של Pushanova.</p><p>עבור Pushanova Premium, הקישו על <strong>שחזור רכישה</strong> במכשיר המשתמש ב-Apple Account שביצע את הרכישה.</p><p>עבור אימון iPhone ו-Apple Watch פעיל, השאירו את ה-Watch לא נעול ובקרבת מקום וודאו ש<strong>שימוש ב-Apple Watch</strong> מופעל בהגדרות Pushanova.</p>";

fs.writeFileSync('locales/he.json', JSON.stringify(he, null, 2));
