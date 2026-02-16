---
layout: default
title: Projects
description: Personal projects and experimental developments
---

<div id="projects-turnstile-protection" style="display: none; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 2rem;">
  <h2 style="color: var(--accent-color, #00BCD4); margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace; font-weight: 700;">$ Verifizierung erforderlich</h2>
  <p style="color: #111111; margin-bottom: 2rem; font-family: 'Anonymous Pro', monospace;">Bestätigen Sie, dass Sie ein Mensch sind, um die Projektübersicht zu sehen.</p>
  <div class="cf-turnstile" 
       data-sitekey="0x4AAAAAABhCvPtIE3gog0lZ" 
       data-callback="onProjectsTurnstileSuccess" 
       data-error-callback="onProjectsTurnstileError"
       data-theme="light"
       data-size="normal">
  </div>
</div>

<div id="projects-content" style="display: none;">

<div class="content-section">
  <h2>Projektübersicht</h2>
  
  <p>
    Persönliche Projekte und experimentelle Entwicklungen im Bereich moderner Softwaretechnologien.
    Fokus auf Cloud-Native Systems, DevOps-Automation und KI-Integration.
  </p>
</div>

<div class="projects">
  <h2 class="projects-header">Alle Projekte</h2>
  
  <div class="project-card">
    <a href="{{ '/ai4mbse' | relative_url }}">
      <div class="project-title">ai4mbse</div>
      <div class="project-description">
        KI-gestütztes Plugin für Model-Based Systems Engineering. 
        Automatische Zuordnung von Systemanforderungen zu Subsystemen via Google Gemini AI.
        Entwickelt im Rahmen des Masterstudiengangs Systems Engineering.
      </div>
    </a>
  </div>
  
  <div class="project-card">
    <a href="{{ '/cloud-migration' | relative_url }}">
      <div class="project-title">cloud-migration</div>
      <div class="project-description">
        Strategien und Best Practices für die Migration von Legacy-Systemen 
        zu modernen Cloud-Native Architekturen. Assessment, Design, schrittweise Migration 
        mit Kubernetes, Service Mesh und Infrastructure as Code.
      </div>
    </a>
  </div>
  
  <div class="project-card">
    <a href="{{ '/devops-automation' | relative_url }}">
      <div class="project-title">devops-automation</div>
      <div class="project-description">
        CI/CD Pipeline Design, Infrastructure as Code und GitOps Workflows. 
        Automatisierung von Entwicklungs- und Deployment-Prozessen für schnellere Releases 
        und höhere Code-Qualität mit GitHub Actions, Terraform und ArgoCD.
      </div>
    </a>
  </div>
</div>

</div>