# Synchronisation bei mobilen Diensten

## Web-App
### Global Verfügbar
Deployed auf [Heroku](https://www.heroku.com/). Erreichbar unter [Click Me](https://sem10einkaufsliste.herokuapp.com).

### Projekt
Folgende Files sind notwendig um die Webapp zu deployen:
* app.js
* index.html
* style.css

## Dokumentation
### Beschreibung des Synchronisationsansatzes und Design der gewählten Architektur (Interaktion, Datenhaltung)
Der Synchronisationsansatz sieht vor immer die Daten mit der Datenbankabzugleichen wenn dies möglich ist. Sollte es nicht möglich sein, sollen trotzdem die eingegebene Daten gecached werden und bei der nächsten Verfügbarkeit der Datenenbank mit dieser Synchronisiert werden. Die gewählte Art die Benutzeroberfläche zu erstellen ist Webbasiert. Dies stellt die plattformunabhängigkeit in den Vordergrund.

### Recherche möglicher Systeme bzw. Frameworks zur Synchronisation und Replikation der Daten
Da im Frontend HTML, JS & CSS verwendet werden, bietet sich eine simple Synchronisation mittels JS an. Es gibt viele unterschiedliche Datenbanksysteme welche eine _Realtimedatabase_ anbieten. [Siehe hier für Liste](https://medium.baqend.com/real-time-databases-explained-why-meteor-rethinkdb-parse-and-firebase-dont-scale-822ff87d2f87). Es wurde sich für die folgenden Gründe für Firebase entschieden:
* Es fehlt zwar die Möglichkeit komplexe Abfragen zu tätigen, ist jedoch bei dieser Anwendung nicht notwendig
* Simpel da eine Firebasedatenbank als in der Cloud gehostetes _JSON_ gesehen werden kann
* Bietet alle Features notwendig um die Aufgabe umzusetzen (z.B. Offline use)


### Dokumentation der gewählten Schnittstellen
Da Firebase von Google gehostet wird, erfolgt der Zugriff auf die Datenbank mittels ihrer [API](https://firebase.google.com/docs/reference/js/). Pro Datenbank wird von Firebase für Webanwendungen ein Codesnippet für die richtige Referenzierung auf die DB zur Verfügung gestellt.
```
<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
<script>
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBnSrCl0UvzIq1yrDMJ3zsHyLKkuQ_nPvA",
    authDomain: "asdfadsf-a56e7.firebaseapp.com",
    databaseURL: "https://asdfadsf-a56e7.firebaseio.com",
    projectId: "asdfadsf-a56e7",
    storageBucket: "asdfadsf-a56e7.appspot.com",
    messagingSenderId: "104313484945"
};
  firebase.initializeApp(config);
</script>
```
Mittels dem ist dann der Zugriff auf die Datenbank (sofern deren Sicherheitseinstellungen so konfiguriert sind) möglich

### Implementierung der gewählten Umgebung auf lokalem System
Als Basis wurde folgendes dieses [Projekt](https://github.com/softauthor/firebase-crud-javascript-02) gewählt. Dieses hat schon CRUD für Firebase implementiert und ist mit dem einfügen des eigenene Codesnippets schon verwendbar. Es musste jedoch auch in der Firebasekonsole das Datenformat richtig angegeben werden. Es folgten Apassungen der _app.js_ um nun nur noch 2 Elemente in der Datenbank zu speichern und anzuzeigen (Name und Anzahl).

### Überprüfung der funktionalen Anforderungen zur Erstellung und Synchronisation der Datensätze
Die Überprüfung ob die Synchronisation so stattfindet wie gewünscht, erfolgt mittels der Konsole von Firebase. Hier können die über die Webapp hinzugefügten Elemeten gesehen werden.


### CRUD Implementierung
Die CRUD-Funktionalität war zwar schon implementiert, jedoch wurde die gesamte GUI umgebaut, um auch auf mobilen Endgeräten eine akzeptable Bedienbarkeit aufzuweisen.

### Implementierung eines Replikationsansatzes zur Konsistenzwahrung
Von Firebase übernommen.

### Offline-Verfügbarkeit
Firebase bietet die Funktionalität, jedoch ist das caching der Webapp die größere Herausforderung. Es ist jedoch möglich auf Mobilgeräten die Website zu cachen. Wenn man diese betrachtet, fehlen zwar css und js jedoch werden die Daten der Einkaufsliste, welche noch gecached sind, angzeigt.

### System global erreichbar
Deployed auf [Heroku](https://www.heroku.com/). Erreichbar unter [Click Me](https://sem10einkaufsliste.herokuapp.com).
