

/*

Quellen: 
https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
chatgpt.com


Prompt: 

Erstelle mir in TypeScript eine einfache Funktion, die den Kontrast zwischen einer Hex-Farbe und weißem Text berechnet. 
Verwende dafür die WCAG-Kontrastberechnung. Die Funktion soll zuerst prüfen, ob die übergebene Farbe ein gültiger Hex-Wert wie `#0d6efd` ist. 
Danach sollen die RGB-Werte ausgelesen und daraus das Kontrastverhältnis zu Weiß berechnet werden.

Der Code soll möglichst einfach und für einen Programmieranfänger verständlich sein. 
Keine unnötig komplizierten Schreibweisen und bitte Kommentare einfügen, die die einzelnen Berechnungsschritte erklären.

*/


// Berechnet den WCAG-Kontrast zwischen einer Farbe und weißem Text.

export function contrastWithWhite(color: string): number {

  // Prüft zuerst, ob die Farbe ein gültiger Hex-Wert ist.
  // Beispiel: #0d6efd
  if (!/^#[0-9a-f]{6}$/i.test(color)) {
    return 1;
  }


  // Die drei Farbwerte Rot, Grün und Blau werden einzeln ausgelesen.
  // Bei #0d6efd wären das zum Beispiel 0d, 6e und fd.
  const values = [1, 3, 5].map((index) => {

    // Hex-Wert in eine normale Zahl zwischen 0 und 255 umwandeln.
    // Danach wird durch 255 geteilt, damit der Wert zwischen 0 und 1 liegt.
    const hexValue = color.slice(index, index + 2);

    const value = parseInt(hexValue, 16) / 255;


    // Für die WCAG-Berechnung muss der Farbwert noch angepasst werden.
    if (value <= 0.04045) {

      return value / 12.92;

    }

    return Math.pow((value + 0.055) / 1.055, 2.4);
  });


  // Aus Rot, Grün und Blau wird die Helligkeit der Farbe berechnet.
  // Grün hat dabei den größten Einfluss auf die wahrgenommene Helligkeit.
  const brightness =
    values[0] * 0.2126 +
    values[1] * 0.7152 +
    values[2] * 0.0722;


  // Kontrastverhältnis zwischen weißem Text und der Hintergrundfarbe.
  const contrast = 1.05 / (brightness + 0.05);


  return contrast;
}