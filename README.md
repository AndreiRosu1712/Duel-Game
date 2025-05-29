# Duel Game

Un joc de duel turn-based implementat in TypeScript unde doua caractere lupta pana cand unul ramane fara viata.

## Descriere

Fiecare caracter incepe cu:
- **100 HP**
- **Defense**: aleator intre 10-15
- **Attack**: aleator intre 15-20
- **O abilitate speciala** cu 25% sansa de activare

## Abilities Disponibile

### Half Damage
Reduce damage-ul primit cu 50%

### Power Boost
Creste damage-ul dat cu 50%

### Heal on Low Health
Heal 5 HP cand health scade sub 30

## Instalare si Rulare

### Prerequisites
- Node.js (versiunea 16+)
- npm

### Setup
```bash
# Cloneaza repository-ul
git clone https://github.com/AndreiRosu1712/Duel-Game.git
cd Duel-Game

# Instaleaza dependentele
npm install

# Ruleaza jocul in development mode
npm run dev
```

### Comenzi Disponibile
```bash
npm run dev    # Ruleaza cu auto-reload
npm run build  # Compileaza TypeScript in JavaScript
npm run start  # Ruleaza versiunea compilata
npm run clean  # Sterge directorul dist
```

## Cum Functioneaza

### Mecanism de Joc
1. Se creeaza 2 caractere cu stats aleatorii
2. Fiecare primeste o abilitate aleatoare (sau specifica)
3. Se alege aleator cine ataca primul
4. In fiecare runda:
   - Atacatorul face damage = attack - defense (minim 0)
   - Abilities se pot activa cu 25% sansa
   - Roles se inverseaza pentru urmatoarea runda
5. Jocul continua pana cand un caracter ajunge la 0 HP

### Formula Damage
```
Damage Final = max(0, Attack Poder - Defense Defender)
```

## Structura Proiectului

```
src/
├── models/
│   ├── Ability.ts     # Enum-uri si clase pentru abilities
│   └── Character.ts   # Clasa Character
├── game/
│   └── DuelGame.ts    # Logica principala a jocului
└── index.ts           # Entry point
```

### Descriere Fisiere

#### src/models/Ability.ts
- Contine enum-ul `AbilityType`
- Interfata `Ability` si `GameCharacter`
- Clasele pentru fiecare abilitate

#### src/models/Character.ts
- Clasa principala `Character`
- Metodele pentru assignment si management de abilities
- Logica pentru stats aleatorii

#### src/game/DuelGame.ts
- Clasa `DuelGame` care orchestreaza jocul
- Logica de combat turn-based
- Managementul rundelor

## Exemplu de Output

```
Character 1: power = 18, defense = 12
Character 2: power = 16, defense = 14

Round 1:
Character 1 attacks
Character 2 activates ability 1 - takes half damage!
Character 2 has 95 health

Round 2:
Character 2 attacks
No ability activated
Character 1 has 98 health

...

Character 1 won!
```

## Tehnologii Folosite

- **TypeScript** - Limbajul principal
- **Node.js** - Runtime environment
- **npm** - Package manager

## Contributii

### Cum sa Contribui
1. Fork repository-ul
2. Creeaza un branch nou
3. Commit modificarile
4. Push la branch
5. Deschide un Pull Request

---

# Cum sa Adaugi o Abilitate Noua

## Overview

Pentru a extinde jocul cu abilities noi, trebuie sa urmezi cateva pasi simpli. Acest ghid va arata cum sa adaugi o abilitate "Vampire" care vindeca atacatorul pe baza damage-ului dat.

## Pasul 1: Defineste Tipul de Abilitate

Primul pas este sa adaugi noul tip de abilitate in enum-ul `AbilityType`. Acesta este locul unde se definesc toate tipurile de abilities disponibile in joc.

Gaseste enum-ul in fisierul pentru abilities si adauga o noua intrare pentru abilitatea ta. Numele trebuie sa fie sugestiv si sa respecte conventia de naming.

## Pasul 2: Implementeaza Clasa Abilitatii

Urmatorul pas este sa creezi o clasa care implementeaza interfata `Ability`. Aceasta clasa va contine logica specifica pentru abilitatea ta.

Clasa trebuie sa aiba proprietatea `type` setata la noul tip de abilitate si sa implementeze metoda `activate`. Metoda `activate` primeste atacatorul, defensorul si damage-ul curent, si returneaza damage-ul modificat.

Pentru abilitatea Vampire, logica ar fi sa vindece atacatorul cu o fractiune din damage-ul dat si sa returneze damage-ul original nemodificat.

## Pasul 3: Actualizeaza Character Class

Caracterele trebuie sa stie despre noua abilitate pentru a o putea folosi. Exista doua locuri importante unde trebuie sa adaugi noua abilitate:

### Metoda pentru Abilitati Aleatorii

In metoda care asigneaza abilities aleatorii, trebuie sa adaugi noua abilitate in lista de optiuni disponibile. Aceasta asigura ca abilitatea poate fi selectata random cand se creeaza caracterele.

### Metoda pentru Abilitati Specifice

In metoda care asigneaza o abilitate specifica, trebuie sa adaugi un caz nou in switch statement pentru noul tip de abilitate.

## Pasul 4: Actualizeaza Import-urile

Fisierul Character trebuie sa importe noua clasa de abilitate pentru a o putea folosi. Adauga noua clasa in lista de import-uri din partea de sus a fisierului.

## Pasul 5: Testarea

Pentru a testa noua abilitate, poti crea un joc nou si sa asignezi abilitatea specifica unui caracter. Ruleaza jocul de mai multe ori pentru a vedea abilitatea in actiune cand se activeaza.

De asemenea, poti testa ca abilitatea apare in pool-ul aleator ruland jocul cu abilities random si observand output-ul.