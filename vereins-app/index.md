---
layout: default
title: Vereins-App – Full-Stack Warenwirtschaftssystem
description:
  Digitale Lagerverwaltung und Benutzerverwaltung für Vereine mit Next.js, React
  und PostgreSQL
keywords:
  Next.js, React, PostgreSQL, Prisma, Warenwirtschaft, Full-Stack, TypeScript
---

<style>
  .tech-badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    margin: 0.3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 6px;
    font-size: 0.9em;
    font-weight: 600;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  .tech-table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
  }
  
  .tech-table th,
  .tech-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .tech-table th {
    background: rgba(102, 126, 234, 0.2);
    font-weight: 700;
  }
  
  .architecture-highlight {
    background: rgba(118, 75, 162, 0.1);
    border-left: 4px solid #764ba2;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 8px;
  }
</style>

<main role="main" id="vereins-app-content">
  <article class="project-documentation">
    <!-- Hero Section -->
    <header class="hero glass-morphism" role="banner">
      <div class="hero-content animate-fade-in">
        <h1>Vereins-App</h1>
        <p class="hero-subtitle">
          Full-Stack-Webanwendung zur digitalen Warenwirtschaft und Benutzerverwaltung<br>
          <span class="text-gradient">Modern. Rollenbasiert. Transaktionssicher.</span>
        </p>

        <!-- Navigation Menu -->
        <nav class="hero-navigation" style="margin-top: 2rem;">
          <div class="nav-links">
            <a href="#overview-title" class="nav-link">Überblick</a>
            <a href="#features-title" class="nav-link">Funktionen</a>
            <a href="#tech-stack-title" class="nav-link">Technologie-Stack</a>
            <a href="#architecture-title" class="nav-link">Architektur</a>
          </div>
        </nav>
      </div>
    </header>

    <!-- Overview Section -->
    <section class="section glass-morphism" aria-labelledby="overview-title">
      <div class="container">
        <h2 id="overview-title" class="section-title">📦 Projekt-Überblick</h2>
        <div class="content-wrapper">
          <p>
            Die Vereins-App ist eine Full-Stack-Webanwendung zur digitalen Verwaltung von Lagerbeständen,
            Buchungen und Benutzern für einen Verein. Die App ersetzt manuelle Bestandslisten durch
            ein rollenbasiertes System mit Echtzeit-Bestandsübersicht, Ein-/Ausbuchungen und Admin-Funktionen.
          </p>
          <p>
            Entwickelt mit modernsten Technologien wie <strong>Next.js 16</strong>, <strong>React 19</strong>
            und <strong>PostgreSQL</strong>, bietet die Anwendung eine skalierbare und wartbare Lösung für
            digitales Bestandsmanagement.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section glass-morphism" aria-labelledby="features-title">
      <div class="container">
        <h2 id="features-title" class="section-title">✨ Funktionsumfang</h2>
        <div class="content-wrapper">
          <div class="feature-grid">
            <div class="feature-card">
              <h3>📊 Warenwirtschaft</h3>
              <p>
                Artikel und Kategorien anlegen, bearbeiten und löschen. Lagerbestände mit Ein- und
                Ausbuchungen verwalten inkl. automatischer Bestandsberechnung.
              </p>
            </div>

            <div class="feature-card">
              <h3>⚠️ Bestandswarnungen</h3>
              <p>
                Automatische Low-Stock-Erkennung wenn Artikel unter den definierten Mindestbestand fallen.
              </p>
            </div>

            <div class="feature-card">
              <h3>👥 Benutzerverwaltung</h3>
              <p>
                Admins können Benutzer anlegen und löschen. Drei Rollen (Admin, Vorstand, Mitglied)
                mit abgestuften Berechtigungen.
              </p>
            </div>

            <div class="feature-card">
              <h3>🔐 Rollenbasiertes System</h3>
              <p>
                Mitglieder sehen Bestände, Vorstand kann zusätzlich buchen, Admins haben Vollzugriff
                inkl. Stammdaten und Benutzerverwaltung.
              </p>
            </div>

            <div class="feature-card">
              <h3>📈 Dashboard</h3>
              <p>
                Zentrale Übersicht mit Statistiken (Artikelanzahl, Kategorien, niedrige Bestände,
                aktuelle Buchungen) und Schnellzugriff auf alle Module.
              </p>
            </div>

            <div class="feature-card">
              <h3>🔒 Sicherheit</h3>
              <p>
                JWT-Authentifizierung mit HttpOnly Cookies, bcrypt-Passwort-Hashing und
                Edge-Middleware für performante Verifizierung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Stack Section -->
    <section class="section glass-morphism" aria-labelledby="tech-stack-title">
      <div class="container">
        <h2 id="tech-stack-title" class="section-title">🛠️ Technologie-Stack</h2>
        <div class="content-wrapper">
          <table class="tech-table">
            <thead>
              <tr>
                <th>Bereich</th>
                <th>Technologie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Framework</strong></td>
                <td>Next.js 16 (App Router, Turbopack)</td>
              </tr>
              <tr>
                <td><strong>Frontend</strong></td>
                <td>React 19, TypeScript 5</td>
              </tr>
              <tr>
                <td><strong>Styling</strong></td>
                <td>Tailwind CSS v4 (CSS-first)</td>
              </tr>
              <tr>
                <td><strong>Backend/API</strong></td>
                <td>Next.js Route Handlers (REST)</td>
              </tr>
              <tr>
                <td><strong>Datenbank</strong></td>
                <td>PostgreSQL</td>
              </tr>
              <tr>
                <td><strong>ORM</strong></td>
                <td>Prisma 7</td>
              </tr>
              <tr>
                <td><strong>Authentifizierung</strong></td>
                <td>JWT (HttpOnly Cookies), bcrypt, Edge-Middleware</td>
              </tr>
              <tr>
                <td><strong>Testing</strong></td>
                <td>Vitest 4, Unit Tests mit Mocking</td>
              </tr>
              <tr>
                <td><strong>Monorepo</strong></td>
                <td>pnpm Workspaces</td>
              </tr>
              <tr>
                <td><strong>Code-Qualität</strong></td>
                <td>ESLint, Prettier, Husky (pre-commit & pre-push Hooks)</td>
              </tr>
              <tr>
                <td><strong>Hosting-ready</strong></td>
                <td>Node.js Runtime, Docker-kompatibel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Architecture Section -->
    <section class="section glass-morphism" aria-labelledby="architecture-title">
      <div class="container">
        <h2 id="architecture-title" class="section-title">🏗️ Architektur-Highlights</h2>
        <div class="content-wrapper">
          <div class="architecture-highlight">
            <h3>🔹 Monorepo-Struktur</h3>
            <p>
              Saubere Paket-Trennung mit pnpm Workspaces für optimale Modularität und Wartbarkeit.
            </p>
          </div>

          <div class="architecture-highlight">
            <h3>🔹 Edge Middleware</h3>
            <p>
              Performante JWT-Verifizierung ohne DB-Roundtrip bei jedem Request für maximale Performance.
            </p>
          </div>

          <div class="architecture-highlight">
            <h3>🔹 Server-seitige Rollenprüfung</h3>
            <p>
              Bei jeder API-Anfrage direkt gegen die Datenbank — JWT wird nur für Authentifizierung,
              nie für Autorisierung vertraut. Zero-Trust-Prinzip für maximale Sicherheit.
            </p>
          </div>

          <div class="architecture-highlight">
            <h3>🔹 Transaktionssichere Buchungen</h3>
            <p>
              Prisma-Transaktionen mit serverseitiger Validierung — kein negativer Bestand möglich.
              Cascade-Deletes innerhalb von DB-Transaktionen für referentielle Integrität.
            </p>
          </div>

          <div class="architecture-highlight">
            <h3>🔹 Umfangreiche Test-Abdeckung</h3>
            <p>
              Vollständige Backend-Logik mit isolierten Unit Tests für hohe Code-Qualität und
              Wartbarkeit.
            </p>
          </div>
        </div>
      </div>
    </section>

  </article>
</main>

<!-- Back to Top Button -->
<button id="backToTop" class="back-to-top" onclick="scrollToTop()" style="display: none;">
  ↑ Nach oben
</button>

<script>
// Back to Top functionality
window.onscroll = function() {
    var backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
</script>
