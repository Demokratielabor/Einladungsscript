function getNextAppointment() {
  // holt den DemoLab-Kalender
  var calendarId = "8bfpjghurl3ctnuqflkv1t1lv4@group.calendar.google.com";
  var calendar = CalendarApp.getCalendarById(calendarId);
  
  // der Request wird donnerstags um 16:xx getriggert
  // und fragt, ob es ein Vereinstreffen zwischen heute +4 Tage (nächsten Montag, 16:xx) and heute +11 Tage (Montag eine Woche später, 16:xx) gibt
  var now = new Date();
  var day = 24 * 60 * 60 * 1000;
  var startDate = new Date(now.getTime() + (4 * day));
  var endDate = new Date(now.getTime() + (11 * day));
  var events = calendar.getEvents(startDate, endDate, {search: "Vereinstreffen"});
  
  if (events.length > 0) {
    var eventStart = events[0].getStartTime();
    formatDate(eventStart);
  }
}

function formatDate(eventStart) {
  var weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  var eventDay = eventStart.getDate();
  var eventMonth = eventStart.getMonth() + 1;
  var eventYear = eventStart.getFullYear();
  // kurzes Datum für den Betreff
  var numericDate = eventDay + "." + eventMonth + "." + eventYear;
  
  var localDate = eventStart.toLocaleDateString();
  var localTime = eventStart.getHours() + ":" + eventStart.getMinutes();
  var weekdayName = weekdays[eventStart.getDay()];
  // langes Datum mit Wochentag für den Mailtext
  var longDateString = weekdayName + ", dem " + localDate + " um " + localTime + " Uhr";
  
  compose(numericDate, longDateString);
}

function compose(shortDateString, longDateString) {
  var oneLineBreak = "\r\n";
  var twoLinesBreak = "\r\n\r\n";
  var emailAddress = ""; // Zieladresse bitte eintragen
  var subject = "Einladung zum öffentlichen Vereinstreffen am " + shortDateString;
  var salutation = "Liebe Mitglieder,";
  var text = "hiermit laden wir Euch zum öffentlichen Vereinstreffen am " + longDateString + " in unser Vereinsmumble ein. Bei diesem Treffen möchten wir uns über Vereinsthemen austauschen, an denen die Mitglieder gerade arbeiten.";
  var topics = "Folgende Themen sollen besprochen werden:" + oneLineBreak
  + "- Kennzahlen" + oneLineBreak
  + "- Mitgliederversammlung" + oneLineBreak
  + "- Aktuelle Abstimmungen & Ergebnisse" + oneLineBreak
  + "- Technische Weiterentwicklung & Förderung" + oneLineBreak
  + "- Vernetzung" + oneLineBreak
  + "- Öffentlichkeitsarbeit" + oneLineBreak
  + "- Technik" + oneLineBreak
  + "- Sonstiges" + oneLineBreak
  + "- Nächste Termine" + twoLinesBreak
  + "Weitere Themen können gern vor oder während der Sitzung vorgeschlagen werden." + twoLinesBreak
  + "Eine Anleitung zur Teilnahme über die Sprachkonferenzsoftware Mumble gibt es hier: https://wiki.demokratielabor.net/technik:mumble";
  var greetings = "Viele Grüße",
      sender = "", // hier bitte den Namen des Absenders / der Absenderin eintragen
      department = "für den Vorstand des Demokratielabor e.V.",
      disclaimer = twoLinesBreak + "-- " + oneLineBreak + "Diese Einladung wurde automatisch generiert.";
  var message = salutation + twoLinesBreak + text + twoLinesBreak + topics + twoLinesBreak + greetings + oneLineBreak + sender + oneLineBreak + department + disclaimer;
  
  MailApp.sendEmail(emailAddress, subject, message);
}
