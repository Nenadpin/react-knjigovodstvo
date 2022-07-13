Web aplikacija za knjigovodstvo maloprodaje. Baza podataka se cuva u localstorage
Ideja je mozda preneti bazu na firestore pa je uz useeffect ucitati na pocetku
sto bi zahtevalo dodatnu komponentu za login i logout kada bi se baza poslala
sa novim podacima na server.

Na pocetku je potrebno ucitati bazu sa artiklima i cenama. Baza mora biti u csv 
formatu sa 7 kolona (template je dat u fajlu Book.csv). Ideja je bila preci sa 
Visual Basic programa za knjigovodstvo na web format, ali sa uvodjenjem novih 
fiskalnih kasa otvorila se mogucnost modifikacije komponente Prodaja, obzirom
da je moguce preuzeti sa sajta poreske uprave podatke o prodaji u JSON formatu.
Trenutno radim na povezivanju tih podataka da se ne bi rucno unosila prodaja
za svaki dan.

Localstorage je ostao jer nisam nasao pouzdan nacin za lokalno upisivanje fajla
u obliku react-filesaver komponente. Ako budem i to stigao da ubacim, aplikacija
ce biti finalni komercijalni softver.
