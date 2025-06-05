<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI4MBSE Plugin – Download & Installation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem 0;
            text-align: center;
            margin-bottom: 3rem;
            border-radius: 0 0 30px 30px;
        }

        .header h1 {
            font-size: 3rem;
            color: white;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            max-width: 800px;
            margin: 0 auto;
        }

        .section {
            background: white;
            margin: 2rem 0;
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .section:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .section-title {
            font-size: 2.2rem;
            color: #4a5568;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.5rem;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            border-radius: 2px;
        }

        .about-text {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.8;
        }

        .download-section {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
        }

        .download-section .section-title {
            color: white;
        }

        .download-section .about-text {
            color: rgba(255, 255, 255, 0.9);
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(45deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            margin: 1rem 0;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            background: linear-gradient(45deg, #2563eb, #1e40af);
        }

        .installation-steps {
            counter-reset: step-counter;
        }

        .step {
            counter-increment: step-counter;
            margin: 2rem 0;
            padding: 1.5rem;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-radius: 15px;
            border-left: 5px solid #3b82f6;
            position: relative;
        }

        .step::before {
            content: counter(step-counter);
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(45deg, #3b82f6, #1d4ed8);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9rem;
        }

        .step h3 {
            color: #4a5568;
            margin-bottom: 0.5rem;
            font-size: 1.3rem;
        }

        .code-block {
            background: #2d3748;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            margin: 1rem 0;
            overflow-x: auto;
            border: 1px solid #4a5568;
        }

        .api-section {
            background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);
        }

        .api-section .section-title {
            color: #1e40af;
        }

        .api-section .about-text {
            color: #1e40af;
        }

        .api-steps {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1rem 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .api-steps h4 {
            color: #1e40af;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .api-steps ul {
            margin-left: 1.5rem;
        }

        .api-steps li {
            margin: 0.5rem 0;
            color: #666;
        }

        .link-primary {
            color: #3b82f6;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s ease;
        }

        .link-primary:hover {
            color: #1d4ed8;
            text-decoration: underline;
        }

        .video-container {
            text-align: center;
            margin: 2rem 0;
        }

        .video-container video {
            max-width: 100%;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .highlight-box {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border: 2px solid #3b82f6;
            border-radius: 15px;
            padding: 1.5rem;
            margin: 1.5rem 0;
        }

        .highlight-box h4 {
            color: #1e40af;
            margin-bottom: 0.5rem;
        }

        .highlight-box p {
            color: #1e40af;
            margin: 0;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .section {
                padding: 1.5rem;
                margin: 1rem 0;
            }
            
            .section-title {
                font-size: 1.8rem;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>AI4MBSE Plugin</h1>
            <p>Willkommen auf der Seite zum <strong>AI4MBSE Plugin</strong> für Cameo Systems Modeler / Systems of Systems Architect. Hier finden Sie alle Dateien zum Herunterladen sowie eine komplette Anleitung zur Installation und Konfiguration.</p>
        </div>
    </div>

    <div class="container">
        <section class="section download-section">
            <h2 class="section-title">📥 Download</h2>
            <p class="about-text">
                Laden Sie einfach das folgende ZIP-Paket herunter. Es enthält alle notwendigen Dateien (JAR, XML, API-Key-Anleitung etc.):
            </p>
            <div style="text-align: center;">
                <a href="AI4MBSE_Plugin.zip" class="cta-button">📦 AI4MBSE_Plugin.zip herunterladen</a>
            </div>
            
            <div style="text-align: center; margin-top: 1rem;">
                <a href="APIKEY.pdf" class="cta-button" style="background: linear-gradient(45deg, #1e40af, #1e3a8a);">📄 API-Key Anleitung (PDF mit Bildern)</a>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">🔧 Installation</h2>
            <div class="installation-steps">
                <div class="step">
                    <h3>ZIP-Paket herunterladen</h3>
                    <p>Klicken Sie auf <a href="AI4MBSE_Plugin.zip" class="link-primary">AI4MBSE_Plugin.zip</a> und speichern Sie die Datei lokal auf Ihrem Computer.</p>
                </div>
                
                <div class="step">
                    <h3>ZIP entpacken</h3>
                    <p>Entpacken Sie das ZIP-Paket direkt in folgendes Verzeichnis:</p>
                    <div class="code-block">C:\Users\YOUR_USERNAME\AppData\Local\.magic.systems.of.systems.architect\2024x\plugins</div>
                    <p>Im Plugin-Ordner sollte dann ein AI4MBSE-Ordner mit allen relevanten Dateien enthalten sein.</p>
                </div>
            </div>
        </section>

        <section class="section api-section">
            <h2 class="section-title">🔑 Google Gemini API Key Konfiguration</h2>
            <p class="about-text">
                Das AI4MBSE-Plugin benötigt einen Google Gemini API Key für die KI-Funktionalität. Hier ist eine vollständige Schritt-für-Schritt-Anleitung:
            </p>

            <div class="api-steps">
                <h4>1. Google Gemini API Key beantragen</h4>
                <ul>
                    <li>Gehe auf die Google AI Developer Platform: <a href="https://aistudio.google.com/app/apikey" class="link-primary" target="_blank">https://aistudio.google.com/app/apikey</a></li>
                    <li>Melde dich mit deinem Google-Konto an (falls du nicht schon angemeldet bist)</li>
                    <li>Klicke auf „Create API Key"</li>
                    <li>Gib ggf. einen Namen/Beschreibung für den Key ein (optional)</li>
                    <li>Kopiere den angezeigten API Key und speichere ihn an einem sicheren Ort</li>
                </ul>
            </div>

            <div class="api-steps">
                <h4>2. API Key als Umgebungsvariable in Windows setzen</h4>
                <p><strong>Dauerhaft als System- oder Benutzerumgebungsvariable:</strong></p>
                <ul>
                    <li>Öffne die Systemsteuerung: Suche nach „Umgebungsvariablen" im Startmenü und wähle „Umgebungsvariablen für dieses Konto bearbeiten" oder „Systemumgebungsvariablen bearbeiten"</li>
                    <li>Im Fenster „Systemeigenschaften": Klicke unten auf den Button „Umgebungsvariablen..."</li>
                    <li>Variable hinzufügen:
                        <ul>
                            <li>Unter „Benutzervariablen" (nur für deinen Benutzer) oder „Systemvariablen" (für alle Nutzer)</li>
                            <li>Klicke auf „Neu..."</li>
                            <li>Name der Variable: <code>GEMINI_API_KEY</code></li>
                            <li>Wert der Variable: (Hier deinen API Key einfügen)</li>
                            <li>Speichern mit „OK"</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="api-steps">
                <h4>3. Neue CMD/PowerShell öffnen</h4>
                <p>Damit die Variable erkannt wird, öffne ein neues Terminal-Fenster.</p>
                <p><strong>Überprüfen (optional):</strong></p>
                <div class="code-block">echo %GEMINI_API_KEY%</div>
                <p>Damit kannst du checken, ob der Key korrekt gesetzt ist.</p>
            </div>

            <div class="highlight-box">
                <h4>💡 Hinweis für das Plugin</h4>
                <p>Das AI4MBSE-Plugin liest den API Key automatisch aus der Umgebungsvariable GEMINI_API_KEY. Wenn der Key korrekt gesetzt ist, funktioniert die Verbindung zur Google Gemini API automatisch.</p>
            </div>

            <div class="api-steps">
                <h4>📋 Zusammenfassung</h4>
                <ul>
                    <li>✅ API Key von Google holen</li>
                    <li>✅ In Windows als Umgebungsvariable GEMINI_API_KEY setzen</li>
                    <li>✅ MagicDraw und dein Plugin nutzen</li>
                </ul>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">🎥 Demo</h2>
            <p class="about-text">
                Schauen Sie sich die folgende Demo an, um zu sehen, wie das AI4MBSE Plugin funktioniert:
            </p>
            <div class="video-container">
                <video width="640" height="360" controls>
                    <source src="demo.mp4" type="video/mp4">
                    Ihr Browser unterstützt das Video-Tag nicht.
                </video>
            </div>
        </section>
    </div>
</body>
</html>