# Syro AI Platform

## Enterprise AI-Agent Plattform auf Microsoft Azure

**Cloud-native · Skalierbar · Produktionsbereit · DSGVO-orientiert**

---

# Produkt-Demonstration (User Flow)

## 1. Registrierung

Neue Benutzer können einen Account für ihren Workspace erstellen.

![Registrierung](./screenshots/register.png)

---

## 2. Login

Authentifizierte Anmeldung mit sicherem JWT-basiertem Auth-System.

![Login](./screenshots/login.png)

Implementiert:

- Passwort-Hashing mit bcrypt  
- JWT Token Authentifizierung  
- HTTPS-only Deployment  
- Secrets Management via Azure & GitHub  

---

## 3. Agents Dashboard

Nach dem Login erhalten Benutzer eine Übersicht aller erstellten AI Agents.

![Agents Dashboard](./screenshots/Agents-dashboard.png)

Features:

- Übersicht aller Agents  
- Erstellungsdatum  
- Rollenbasierte Definition  
- Verwaltung bestehender Agents  

---

## 4. Agent erstellen (System Prompt Konfiguration)

Benutzer können spezialisierte Agents mit eigenem System Prompt definieren.

![Agent erstellen](./screenshots/create-agent.png)

Hier wird:

- Rolle definiert  
- Verhalten festgelegt  
- Antwortstil kontrolliert  
- Einsatzgebiet eingeschränkt  

---

## 5. Agent Detail – Beispiel: Azure DevOps Agent

Detailansicht eines konfigurierten Agents inklusive Chat-Funktion.

![Azure DevOps Agent](./screenshots/azure-devops-agent.png)

---

# Praxisbeispiel: Python Expert Agent

Ein Python Expert Agent wurde mit folgendem System Prompt konfiguriert:

> "Du bist ein Python Experte und schreibst sauberen, strukturierten Code."

---

## Anfrage

> "Erstelle mir eine Taschenrechner App mit GUI in Python."

---

## 1. Generierter Code

![Python Code Expert](./screenshots/Python-code-expert.PNG)

---

## 2. Erklärung des Codes durch den Agenten

![Python Erklärung](./screenshots/python-experte-erklärung-anleitung.PNG)

---

## 3. Ausgeführte GUI-App

![Taschenrechner App](./screenshots/Taschenrechner-App-funktioniert.PNG)

Dieses Beispiel zeigt:

- AI generiert funktionierenden Produktionscode  
- Entwickler können AI als internes Support-System nutzen  
- Der Code ist sofort lauffähig  
- AI steigert reale Produktivität  

---

# Plattform Dashboard

Übersicht über:

- Anzahl der Agents  
- Weekly Usage  
- System Status  
- Plattform-Aktivität  

![Syro Dashboard](./screenshots/syro-ai-platform-dashboard.png)

---

# Azure Infrastruktur

Die gesamte Plattform läuft in **Microsoft Azure (Region: West Europe)**.

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

# Monitoring & Production Readiness

## Application Insights

![Application Insights](./screenshots/application-insights-overview.png)

---

## Azure Warnungsregeln

Konfigurierte Metriken:

- CPU > 80%
- HTTP 5xx Fehler

![Warnungsregeln](./screenshots/warnungsregeln.png)

---

# CI/CD Pipeline

Automatisierte Deployments via GitHub Actions:

- Frontend → Azure Static Web Apps  
- Backend → Docker Build → Push to ACR → Deploy Container App  

![GitHub Actions Runs](./screenshots/github-actions-erfolgreiche-runs.png)

---

# Tech Stack

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

Dieses Projekt zeigt:

- AI kann sicher intern betrieben werden  
- Spezialisierte AI Agents steigern Produktivität  
- Microsoft Azure wird professionell eingesetzt  
- Das System ist skalierbar und produktionsbereit  

---

## Kontakt

Offen für Positionen im Bereich:

**AI Engineering · Cloud Engineering · Azure Architecture**
