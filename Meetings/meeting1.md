# Meeting 31 jan 2018

#### User stories

#### Client view

**Jag är en kund som vill kunna boka taxi så att jag kan ta mig från punkt a till punkt b.**

- Gränssnitt
  - Markup
    - Vy för logga in
    - Vy för beställ resa
    - Vy för söker efter resa
    - Vy för taxi hittad
    - Vy för Resa beställd
    - Vy för meny
    - Vy för mina bokningar
    - Vy för kvitto / pågående resa?
    - Vy för avbokad resa?
  - Style
    - Alla vyer
- Javascript
  - Skapa datastrukturer
  - Socketskommunikation
  - Parsing av data (som vi får)
- Design (UX/UI)

#### Taxi view

**User story:** Jag är en chaufför som vill kunna se mina bokningar så att jag vet var jag ska köra.

- Gränssnitt
  - Markup
    - Vy för pågående resa
    - Vy för mina körningar
    - Vy för kommande körning (Påbörja)
    - Vy för resa avklarad
    - Vy för inställningar
    - Vy för login
  - Style
    - Alla vyer
- Javascript
  - Påbörja körning (Bokning flyttad till körning)
  - Pausa / avsluta resor
  - Skapa datastrukturer
  - Socketskommunikation
  - Parsing av data (som vi får)
- Design (UX/UI)


### Dispatcher view

**User story:** Jag är en trafikledare som vill ha bra översikt över bilar och bokningar så att jag kan organisera resor mer effektivt.**

- Gränssnitt
  - Markup
    - Sektion för bokningar
    - Sektion för pågående resor
    - Sektion för alla (aktiva, pausade, inaktiva) bilar
    - Karta
  - Style
    - Alla vyer
- Javascript
  - Bekräfta bokning
  - Ändra bokning
  - Pinga taxi?
  - Skapa datastrukturer
  - Socketskommunikation
  - Parsing av data (som vi får)
- Design (UX/UI)

### Server
