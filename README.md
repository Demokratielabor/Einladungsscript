# Einladungsscript

Das Einladungsscript verschickt automatische Einladungen zum Vereinstreffen.

Dafür liest es den Google-Kalender des Vereins aus und verschickt am Donnerstag vor dem nächsten Treffen eine Einladung. Das Script nutzt Google Apps Script, Mail und Kalender.

Voraussetzung zum selbst einrichten: Ein Google-Account mit Zugriff auf den Vereinskalender

Einrichtung:
- Google Drive öffnen
- Unter "Neu" > "Mehr" > "Google Apps Script" auswählen
- Code aus diesem Repo statt der Vorlage einfügen
- Zieladresse und Name in der Grußformel ergänzen
- Script unter beliebigem Namen speichern
- Code ausführen (dafür am besten die vorletzte Zeile mit "MailApp.sendEmail…" auskommentieren, damit nicht direkt eine E-Mail versendet wird)
- Im aufploppenden Dialog dem Script die Zugriffsrechte für E-Mail und Kalender erteilen
- Im Menü des Scripteditors unter "Bearbeiten" > "Trigger des aktuellen Projekts" einen Trigger für die Funktion "getNextAppointment" hinzufügen
  - Terminquelle: Zeitgesteuert
  - Typ: Wochentimer
  - Wochentag: Donnerstag
  - Tageszeit: beliebig (aktuell 16-17 Uhr)
