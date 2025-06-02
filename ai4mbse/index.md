---
layout: default
title: AI4MBSE Plugin – Download & Installation
permalink: /ai4mbse/
---

# AI4MBSE Plugin

Willkommen auf der Seite zum **AI4MBSE Plugin** für Cameo Systems Modeler / Systems of Systems Architect. Hier finden Sie alle Dateien zum Herunterladen sowie eine kurze Anleitung, um das Plugin in Ihrer Umgebung zu installieren und zu nutzen.

---

## Download

Alle folgenden Dateien stehen direkt in diesem Verzeichnis zum Herunterladen bereit:

- [AI4MBSE.jar](AI4MBSE.jar)  
- [plugin.xml](plugin.xml)  
- [APIKEY.pdf](APIKEY.pdf)  
- [README.md](README.md)  

> ❗ Achten Sie darauf, dass sich diese Dateien wirklich im Ordner **`ai4mbse/`** befinden, damit die Links korrekt funktionieren.

---

## Installation

1. **Plugin-JAR herunterladen**  
   Klicken Sie auf [AI4MBSE.jar](AI4MBSE.jar) und speichern Sie die Datei lokal.

2. **Zielordner ermitteln**  
   Unter Windows 11 lautet der Pfad, in den das Plugin kopiert werden muss, typischerweise:  
- Ersetzen Sie `<IhrBenutzername>` durch Ihren tatsächlichen Windows-Nutzernamen.  
- Falls der Ordner `AI4MBSE` noch nicht existiert, erstellen Sie ihn unter `…\2024x\plugins\`.

3. **Plugin-Dateien kopieren**  
Kopieren Sie folgende Dateien in den Ordner:  
- **AI4MBSE.jar**  
- **plugin.xml**  
- **APIKEY.pdf** (nur zur Dokumentation; nicht zwingend erforderlich im Plugin-Ordner)  
- Optional: **README.md** (ebenfalls nur zur Dokumentation)

Beispiel:  
1. Öffnen Sie den Windows Explorer.  
2. Navigieren Sie zu Ihrem Download-Ordner, in dem sich **AI4MBSE.jar** befindet.  
3. Öffnen Sie in einem zweiten Fenster:  
   ```
   C:\Users\<IhrBenutzername>\AppData\Local\.magic.systems.of.systems.architect\2024x\plugins\
   ```  
4. Erstellen Sie hier, falls nötig, den Ordner **`AI4MBSE`**.  
5. Kopieren Sie **AI4MBSE.jar** und **plugin.xml** in `C:\Users<IhrBenutzername>\AppData\Local.magic.systems.of.systems.architect\2024x\plugins\AI4MBSE`.

4. **API-Key einrichten**  
- Öffnen Sie die heruntergeladene Datei [APIKEY.pdf](APIKEY.pdf).  
- Folgen Sie den Anweisungen, um Ihren persönlichen API-Schlüssel in eine Konfigurationsdatei (z. B. `apikey.properties`) innerhalb des Plugin-Ordners **AI4MBSE** zu kopieren.  
- Ohne gültigen API-Key können einige Funktionen des Plugins nicht genutzt werden.

5. **Cameo neu starten**  
Starten Sie Cameo Systems Modeler oder Systems of Systems Architect neu, damit das Plugin erkannt und geladen wird.

---

## Nutzung

Nach dem Neustart finden Sie das **AI4MBSE Plugin** im Cameo-Menü unter **`Tools → AI4MBSE`**. Über diesen Menüpunkt können Sie:

- Modelle automatisch annotieren  
- KI-gestützte Analysen starten  
- Berichtsdaten exportieren  

Eine detaillierte Beschreibung der Funktionen finden Sie in der mitgelieferten [README.md](README.md).

---

## Support & Dokumentation

- **README.md**: Enthält eine ausführliche Anleitung zu allen Features, Systemvoraussetzungen und bekannten Einschränkungen.  
- **Kontakt**: Bei Fragen oder Problemen wenden Sie sich bitte an support@ihredomain.de oder nutzen Sie unser [Kontaktformular](/contact/).

---

*Stand: {{ “now” | date: “%d.%m.%Y” }}*
