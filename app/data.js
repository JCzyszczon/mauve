// Z tego pliku będą odczytywane wszystkie dane w sekcji "aktualności" na stronie

const dane = [
    {
      zdjecie: "giorgio-trovato-gI9rvJK61L8-unsplash.jpg",
      tytul: "NOWA LOKALIZACJA", // obowiązkowy tytuł (musi być)
      podtytul: "Kraków, Długa 62", // opcjonalny podtytuł (jeżeli nie chcesz podtytułu, to zostaw poste pole lub usuń)
      paragrafy: [ // tekst wyświetlony na stronie (każda linijka może zawierać link/linki)
        {
            tekst: "Już teraz możemy spotkać się również w salonie w Krakowie!",
        },
        {
            tekst: "Zapraszam Cię na makijaż permanentny brwi do nowego gabinetu na ul. Długiej 62.",
        },
        {
            tekst: "Będę tam w każdy tydzień od poniedziałku do środy.",
        },
        {
            tekst: "Zarezerwuj swój termin na [booksy] lub w [wiadomości] prywatnej", // dane słowo, które ma być linkiem należy dać w nawiasy kwadratowe []
            linki: { // a następnie podać link, gdzie danemu słowu będzie odpowiadać ścieżka na jakąś podstronę (np. facebook, instagram, itp.)
                booksy: "https://booksy.com/pl-pl/s?query=Mauve",
                wiadomości: "https://www.facebook.com/mauvebeautypl/?locale=pl_PL",
            }, // jeżeli dany paragraf nie będzie zawierał linków to cała ta sekcja zamknięta w nawiasach {} jest nie potrzebna
        },
        {
            tekst: "Do zobaczenia!",
        }
      ],
    },
    {
      zdjecie: "chris-tIUXSj2iFVY-unsplash.jpg",
      tytul: "ZAPISY NA MAKIJAŻ W 2024r.",
      paragrafy: [
        {
            tekst: "Harmonogram zapisów na makijaż jest już dostępny, a rezerwacja terminów będzie możliwa już w sierpniu.",
        },
        {
            tekst: "Zobacz poniżej kiedy startują zapisy i zapamiętaj te daty!"
        },
        {
            tekst: "od 28.08.2023 - pakiety makijażowe z dojazdem"
        },
        {
            tekst: "od 31.08.2023 - makijaże ślubne w Osielcu"
        },
        {
            tekst: "od 04.09.2023 - makijaże okolicznościowe w Osielcu"
        },
      ],
    },
    {
        zdjecie: "odissei-eRzKR81sQdc-unsplash.jpg",
        tytul: "MAKIJAŻ PERMANENTNY - CO WYKLUCZA CIĘ Z ZABIEGU?",
        paragrafy: [
          {
              tekst: "Od teraz sama możesz sprawdzić czy nie masz przeciwskazań do wykonania makijażu permanentnego brwi metodą włoskową.",
          },
          {
              tekst: "Odpowiedz na pytania w anonimowej ankiecie, a od razu po przesłaniu formularza możesz zobaczyć swój wynik wraz z komentarzami ode mnie."
          },
        ],
        przycisk: "WYPEŁNIJ ANKIETĘ",
        linkPrzycisk: "https://google.com",
    },
    
  ];
  export default dane;