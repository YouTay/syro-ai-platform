# Syro AI Platform

## Enterprise AI-Agent Plattform auf Microsoft Azure

Cloud-native · Skalierbar · Produktionsbereit · DSGVO-orientiert

---

# 1. Überblick

Die **Syro AI Platform** ist eine produktionsreife AI-Agent-Plattform auf Microsoft Azure.

Sie ermöglicht Unternehmen, spezialisierte interne KI-Assistenten zu erstellen und vollständig innerhalb der eigenen Cloud-Infrastruktur zu betreiben — ohne externe Datenhaltung.

## Was wurde gebaut?

- Multi-User SaaS Plattform
- Konfigurierbare AI Agents mit eigenem System Prompt
- JWT-basierte Authentifizierung
- Containerisierte Backend-Architektur
- Vollständige Azure Cloud Integration
- Monitoring & Alerting
- Automatisierte CI/CD Pipelines

## Business Value

Unternehmen stehen häufig vor folgenden Herausforderungen:

- Entwickler verlieren Zeit bei Debugging und Code-Recherche
- DevOps-Fragen blockieren Projekte
- Marketing benötigt schnelle Content-Unterstützung
- Sensible Unternehmensdaten dürfen nicht extern gespeichert werden
- AI-Lösungen sind nicht in bestehende Cloud-Infrastrukturen integriert

### Lösung durch Syro

- Interne AI Agents mit klar definierter Rolle
- Vollständiger Betrieb in Microsoft Azure
- Daten verbleiben in der Unternehmens-Cloud
- Skalierbare Container-Architektur
- Monitoring und Produktionsreife Infrastruktur

**Ergebnis:**
Steigerung der Produktivität bei voller Datenkontrolle.

flowchart TB
  U[User] --> FE[Frontend Static Web App]
  FE --> BE[Backend Container App]
  BE --> DT[Azure Data Tables]
  BE --> OAI[OpenAI API]
  BE --> OBS[App Insights and Log Analytics]
  OBS --> AL[Azure Monitor Alerts]

  GH[GitHub Repo] --> GA[GitHub Actions]
  GA --> ACR[Azure Container Registry]
  ACR --> BE
  GA --> FE

# 2. Produkt-Demonstration (User Flow)

## Registrierung

Benutzer erstellen einen Workspace-Account.

![Registrierung](./screenshots/register.png)

---

## Login

Sichere Anmeldung mit JWT-basierter Authentifizierung.

![Login](./screenshots/login.png)

Implementiert:

- bcrypt Passwort-Hashing
- JWT Token
- HTTPS-only Deployment
- Secrets Management via Azure & GitHub

---

## Agents Dashboard

Übersicht aller konfigurierten AI Agents.

![Agents Dashboard](./screenshots/Agents-dashboard.png)

Funktionen:

- Anzeige aller Agents
- Rollenbasierte Definition
- Verwaltung und Auswahl bestehender Agents

---

## Agent erstellen (System Prompt Konfiguration)

Benutzer definieren:

- Rolle
- Verhalten
- Tonalität
- Fachgebiet

![Agent erstellen](./screenshots/create-agent.png)

---

## Agent Detail – Beispiel: Azure DevOps Agent

Detailansicht mit Chat-Funktion.

![Azure DevOps Agent](./screenshots/azure-devops-agent.png)

---

# 3. Praxisbeispiel: Python Expert Agent

System Prompt:

> "Du bist ein Python Experte und schreibst sauberen, strukturierten Code."

## Anfrage

> "Erstelle mir eine Taschenrechner App mit GUI in Python."

---

## Generierter Code

![Python Code Expert](./screenshots/Python-code-expert.PNG)

---

## Erklärung des Codes

![Python Erklärung](./screenshots/python-experte-erklärung-anleitung.PNG)

---

## Ausgeführte Anwendung

![Taschenrechner App](./screenshots/Taschenrechner-App-funktioniert.PNG)

### Erkenntnisse

- AI generiert produktionsfähigen Code
- Interne Developer Support Agents sind realisierbar
- AI kann als internes Produktivitätstool eingesetzt werden

---

# 4. Plattform & Azure Infrastruktur

Die Plattform läuft vollständig in **Microsoft Azure (Region: West Europe)**.

## Ressourcenübersicht

![Ressourcen Übersicht](./screenshots/ressourcen-übersicht.png)

---

## Container App Übersicht

![Container App Overview](./screenshots/container-app-overview.png)

---

## Laufende Container Revision

![Container Revision](./screenshots/container-revision-running.png)

---

## Azure Container Registry (Image Tags)

![ACR Image Tags](./screenshots/acr-image-tags.PNG)

---

# 5. Monitoring & Production Readiness

## Application Insights

![Application Insights](./screenshots/application-insights-overview.png)

---

## Azure Warnungsregeln

Konfigurierte Metriken:

- CPU > 80%
- HTTP 5xx Fehler

![Warnungsregeln](./screenshots/warnungsregeln.png)

---

# 6. CI/CD Pipeline

Automatisierte Deployments:

- Frontend → Azure Static Web Apps
- Backend → Docker Build → Push to ACR → Deploy Container App

![GitHub Actions Runs](./screenshots/github-actions-erfolgreiche-runs.png)

---

# 7. Tech Stack

## Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- python-jose (JWT)
- bcrypt
- Azure Data Tables
- OpenAI API

## Frontend
- Next.js
- TypeScript
- TailwindCSS

## Cloud
- Azure Container Apps
- Azure Container Registry
- Azure Static Web Apps
- Azure Monitor
- Azure Log Analytics
- Application Insights

## DevOps
- Docker
- GitHub Actions
- CI/CD Pipelines

---

# Demonstrierte Kompetenzen

- End-to-End SaaS Entwicklung
- Multi-User Architektur
- AI-Integration in produktiver Umgebung
- Cloud-native Design
- Container-Orchestrierung
- Observability & Monitoring
- Security Best Practices
- CI/CD Automatisierung

---

# Relevanz für Unternehmen

Dieses Projekt zeigt, dass:

- AI sicher intern betrieben werden kann
- Spezialisierte AI Agents reale Produktivitätssteigerung ermöglichen
- Microsoft Azure professionell genutzt wird
- Das System skalierbar und produktionsbereit ist

---

## Kontakt

Offen für Positionen im Bereich:

AI Engineering · Cloud Engineering · Azure Architecture
