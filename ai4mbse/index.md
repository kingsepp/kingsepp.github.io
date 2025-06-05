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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
            min-height: 100vh;
            overflow-x: hidden;
        }

        .noise-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.03;
            z-index: 1;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            pointer-events: none;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
            position: relative;
            z-index: 2;
        }

        .header {
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(148, 163, 184, 0.1);
            padding: 4rem 0;
            text-align: center;
            margin-bottom: 4rem;
            border-radius: 32px;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
        }

        .header h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header p {
            font-size: 1.25rem;
            color: rgba(241, 245, 249, 0.8);
            max-width: 900px;
            margin: 0 auto;
            font-weight: 400;
            line-height: 1.7;
        }

        .section {
            background: rgba(15, 23, 42, 0.3);
            backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(148, 163, 184, 0.08);
            margin: 3rem 0;
            padding: 3rem;
            border-radius: 24px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .section:hover::before {
            opacity: 1;
        }

        .section:hover {
            transform: translateY(-8px);
            border-color: rgba(59, 130, 246, 0.2);
            box-shadow: 
                0 32px 64px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(59, 130, 246, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 2rem;
            position: relative;
            padding-bottom: 1rem;
            letter-spacing: -0.01em;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 2px;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }

        .about-text {
            font-size: 1.125rem;
            color: rgba(241, 245, 249, 0.8);
            margin-bottom: 2rem;
            line-height: 1.8;
            font-weight: 400;
        }

        .download-section {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%);
            border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .download-section .section-title {
            color: #f8fafc;
        }

        .download-section .about-text {
            color: rgba(248, 250, 252, 0.9);
        }

        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 18px 36px;
            text-decoration: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 
                0 4px 16px rgba(59, 130, 246, 0.3),
                0 0 0 1px rgba(59, 130, 246, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            margin: 1rem 0;
            position: relative;
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .cta-button:hover::before {
            left: 100%;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 8px 32px rgba(59, 130, 246, 0.4),
                0 0 0 1px rgba(59, 130, 246, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .installation-steps {
            counter-reset: step-counter;
        }

        .step {
            counter-increment: step-counter;
            margin: 2.5rem 0;
            padding: 2rem;
            background: rgba(30, 41, 59, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 20px;
            border-left: 4px solid #3b82f6;
            position: relative;
            transition: all 0.3s ease;
        }

        .step:hover {
            border-color: rgba(59, 130, 246, 0.3);
            transform: translateX(8px);
        }

        .step::before {
            content: counter(step-counter);
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
            border: 2px solid rgba(15, 23, 42, 1);
        }

        .step h3 {
            color: #f8fafc;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .step p {
            color: rgba(241, 245, 249, 0.8);
            line-height: 1.7;
        }

        .code-block {
            background: rgba(15, 23, 42, 0.8);
            color: #e2e8f0;
            padding: 1.5rem;
            border-radius: 12px;
            font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
            font-size: 0.95rem;
            margin: 1.5rem 0;
            overflow-x: auto;
            border: 1px solid rgba(59, 130, 246, 0.2);
            position: relative;
        }

        .code-block::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
        }

        .api-section {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(29, 78, 216, 0.08) 100%);
            border: 1px solid rgba(59, 130, 246, 0.15);
        }

        .api-section .section-title {
            color: #f8fafc;
        }

        .api-section .about-text {
            color: rgba(248, 250, 252, 0.9);
        }

        .api-steps {
            background: rgba(30, 41, 59, 0.3);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(148, 163, 184, 0.1);
            padding: 2rem;
            border-radius: 16px;
            margin: 2rem 0;
            transition: all 0.3s ease;
        }

        .api-steps:hover {
            border-color: rgba(59, 130, 246, 0.2);
            transform: translateY(-2px);
        }

        .api-steps h4 {
            color: #f8fafc;
            margin-bottom: 1.5rem;
            font-size: 1.4rem;
            font-weight: 600;
        }

        .api-steps ul {
            margin-left: 1.5rem;
        }

        .api-steps li {
            margin: 1rem 0;
            color: rgba(241, 245, 249, 0.8);
            line-height: 1.6;
        }

        .link-primary {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
        }

        .link-primary::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #3b82f6;
            transition: width 0.3s ease;
        }

        .link-primary:hover::after {
            width: 100%;
        }

        .link-primary:hover {
            color: #93c5fd;
        }

        .video-container {
            text-align: center;
            margin: 3rem 0;
        }

        .video-container video {
            max-width: 100%;
            border-radius: 20px;
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(59, 130, 246, 0.2);
            transition: all 0.3s ease;
        }

        .video-container video:hover {
            transform: scale(1.02);
            box-shadow: 
                0 32px 64px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(59, 130, 246, 0.3);
        }

        .highlight-box {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 16px;
            padding: 2rem;
            margin: 2rem 0;
            position: relative;
            overflow: hidden;
        }

        .highlight-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
        }

        .highlight-box h4 {
            color: #f8fafc;
            margin-bottom: 1rem;
            font-weight: 600;
            font-size: 1.3rem;
        }

        .highlight-box p {
            color: rgba(248, 250, 252, 0.9);
            margin: 0;
            line-height: 1.7;
        }

        .floating-elements {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .floating-circle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.1));
            filter: blur(40px);
            animation: float 6s ease-in-out infinite;
        }

        .floating-circle:nth-child(1) {
            width: 200px;
            height: 200px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
        }

        .floating-circle:nth-child(2) {
            width: 300px;
            height: 300px;
            top: 60%;
            right: 10%;
            animation-delay: 2s;
        }

        .floating-circle:nth-child(3) {
            width: 150px;
            height: 150px;
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        @media (max-width: 768px) {
            .container {
                padding: 0 16px;
            }
            
            .header {
                padding: 2.5rem 0;
                margin-bottom: 2rem;
            }
            
            .section {
                padding: 2rem;
                margin: 2rem 0;
            }
            
            .section-title {
                font-size: 2rem;
            }

            .step {
                padding: 1.5rem;
                margin-left: 1rem;
            }

            .step::before {
                left: -15px;
                width: 30px;
                height: 30px;
            }
        }

        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }

        /* Selection colors */
        ::selection {
            background: rgba(59, 130, 246, 0.3);
            color: #f8fafc;
        }
    </style>
</head>
<body>
    <div class="noise-overlay"></div>
    
    <div class="floating-elements">
        <div class="floating-circle"></div>
        <div class="floating-circle"></div>
        <div class="floating-circle"></div>
    </div>

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
                <a href="AI4MBSE_Plugin.zip" class="cta-button">
                    <span style="font-size: 1.2em;">📦</span>
                    AI4MBSE_Plugin.zip herunterladen
                </a>
            </div>
            
            <div style="text-align: center; margin-top: 1rem;">
                <a href="APIKEY.pdf" class="cta-button" style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);">
                    <span style="font-size: 1.2em;">📄</span>
                    API-Key Anleitung (PDF mit Bildern)
                </a>
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