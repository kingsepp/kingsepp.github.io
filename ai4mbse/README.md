# AI4MBSE – MagicDraw Plugin für Subsystem-Analyse mit KI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Übersicht

**AI4MBSE** ist ein Plugin für [MagicDraw 2024x](https://www.nomagic.com/products/magicdraw), das die KI-gestützte Zuordnung von Requirements zu Subsystemen direkt im Modell ermöglicht. Es nutzt die Google Gemini API, um Vorschläge für die Systemarchitektur zu generieren und unterstützt Ingenieur:innen bei der modellbasierten Entwicklung.

---

## Features

- **Requirements-Auswahl:** Intuitive Auswahl von Requirements im Modell.
- **Subsystem-Ordner-Auswahl:** Benutzerdefinierte Auswahl des Pakets mit den Subsystemen.
- **Automatische Modell-Extraktion:** Extrahiert relevante Subsysteme aus einer JSON-Struktur.
- **KI-gestützte Analyse:** Nutzt Google Gemini zur intelligenten Zuordnung und Begründung.
- **Klares UI:** Zeigt Frage und KI-Antwort übersichtlich im MagicDraw-Dialog.
- **Nahtlose Integration:** Direkt im MagicDraw-Tools-Menü verfügbar.

---

## Voraussetzungen

- **Java 17** (z.B. OpenJDK 17)
- **MagicDraw 2024x**
- **Google Gemini API Key** (kostenlos oder bezahlt)
- Optional: Eigener Gemini API Endpoint (`GEMINI_API_URL`)

---

## Installation & Setup

### 1. Repository klonen

```bash
git clone https://github.com/kingsepp/AI4MBSE.git
cd AI4MBSE
```

### 2. Projekt öffnen

- Öffne das Projekt in einer Java-IDE (z.B. Visual Studio Code, IntelliJ IDEA, Eclipse).
- Stelle sicher, dass Java 17 als Laufzeit und Compiler eingestellt ist.
- Füge die MagicDraw-Bibliotheken (`magicdraw.jar`, `md_api.jar` etc.) aus deinem MagicDraw-Installationsverzeichnis (`$MAGICDRAW_HOME/lib`) als Abhängigkeiten hinzu.

### 3. Build

Nutze das mitgelieferte PowerShell-Buildskript:

```powershell
# Passe die Pfade im Skript an deine Umgebung an!
$magicdrawLibPath = "C:\Programme\MagicDraw\2024x\lib"
$outputJar = "C:\Projekte\AI4MBSE\build\AI4MBSEPlugin.jar"
./build-jar.ps1
```

### 4. Gemini API Key setzen

**Linux/macOS:**
```bash
export GEMINI_API_KEY=dein-api-key-hier
```

**Windows (CMD):**
```cmd
set GEMINI_API_KEY=dein-api-key-hier
```

Optional: Setze `GEMINI_API_URL`, falls du einen eigenen Endpoint verwendest.

### 5. Deployment in MagicDraw

- Kopiere die gebaute JAR-Datei ins MagicDraw-Plugin-Verzeichnis:
  ```
  C:/Programme/MagicDraw 2024x/plugins/AI4MBSE/
  ```
- Stelle sicher, dass eine gültige `plugin.xml` im Plugin-Ordner liegt.
- Starte MagicDraw neu.

---

## Benutzung

1. **Projekt öffnen** in MagicDraw.
2. **Tools-Menü:** Wähle `Find Subsystem for Requirement (AI4MBSE)`.
3. **Requirement auswählen:** Wähle ein Requirement aus der Liste.
4. **Subsystem-Ordner angeben:** Gib den Namen des Pakets an, das die Subsysteme enthält (z.B. `03_Subsystems`).
5. **Analyse:** Das Plugin zeigt die KI-gestützte Zuordnung und Begründung im Dialog an.

---

## Fehlerbehebung

| Problem                      | Lösung                                                         |
|------------------------------|----------------------------------------------------------------|
| `model_structure.json` fehlt | Modell in MagicDraw exportieren oder Plugin-Exportfunktion nutzen |
| Keine Antwort von Gemini     | API-Key und Internetverbindung prüfen                          |
| Keine Requirements gefunden  | Stereotyp "Requirement" im Modell prüfen                       |

---

## Weiterentwicklung

- Automatischer Modell-Export beim Projektstart
- Unterstützung für Mehrfachauswahl von Requirements
- Erweiterte Visualisierung der KI-Antworten
- Unterstützung weiterer KI-Provider

---

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

# AI4MBSE Plugin

Dieses Plugin integriert KI-gestützte Subsystem-Allocation in MagicDraw/Cameo (SysML). Es nutzt Gemini (Google AI) zur Analyse von Requirements und schlägt passende Subsysteme vor.

## Hauptbestandteile

- **src/ai4mbse/Main.java**  
  Einstiegspunkt des Plugins.  
  - Menüintegration in MagicDraw/Cameo
  - Exportiert das Modell als JSON
  - Zeigt UI-Dialoge für Requirement/Subsystem-Auswahl
  - Baut den Prompt für die KI
  - Ruft die Gemini-API auf und verarbeitet die Antwort
  - Legt Satisfy-Dependencies im Modell an

- **src/ai4mbse/AllocationDialog.java**  
  Dialog zur Anzeige und Bestätigung der KI-Vorschläge.  
  - Zeigt alle Subsystem-Kandidaten mit Confidence und Begründung
  - User kann Vorschläge selektieren und bestätigen

- **src/ai4mbse/AllocationCandidate.java**  
  Datenklasse für einen KI-Vorschlag (Subsystem, Confidence, Justification).  
  - Wird direkt aus dem KI-JSON geparst
  - Enthält zusätzliche Felder für Modell-Logik

## Entwicklung & Erweiterung

- **Neues Feature (z.B. neue KI-Strategie, weitere Stereotypen, zusätzliche Modellaktionen):**
  - Einstiegspunkt ist meist `Main.java`
  - Für neue Dialoge: Siehe Aufbau in `AllocationDialog.java`
  - Für neue Datenstrukturen: Siehe `AllocationCandidate.java`
  - Modellzugriff erfolgt immer über MagicDraw-OpenAPI (siehe Methoden in Main.java)
  - Für neue KI-Interaktionen: Prompt-Logik und GeminiClient anpassen

- **Modellstruktur/JSON:**
  - Das Modell wird beim Start als JSON exportiert (`exportModelAsJson`)
  - Die Datei `model_structure.json` liegt im Plugin-Ordner im User-Profile

- **Logging & Debugging:**
  - Nutze die `log()`-Methode in Main.java für Ausgaben im MagicDraw-Log
  - Viele Methoden loggen automatisch wichtige Schritte

- **Build & Installer:**
  - Siehe `build-jar.ps1` für den Build-Prozess
  - Siehe `installer.nsi` für den Windows-Installer

## Hinweise

- Für neue Satisfy- oder andere SysML-Relationships:  
  Siehe Methode `createRelationships()` in Main.java und wie der Block gesucht wird.
- Für Anpassungen am KI-Prompt:  
  Prompt-String in `showRequirementAndSubsystemDialog()` anpassen.
- Für neue Felder im KI-JSON:  
  AllocationCandidate erweitern und ggf. Dialog/Tabelle anpassen.

---

**Fragen oder Beiträge?**  
Bitte Code kommentieren und Pull Requests mit Beschreibung einreichen.

---

Viel Erfolg beim Arbeiten mit AI4MBSE! 🚀