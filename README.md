# Syro AI Platform

## Enterprise AI-Agent Plattform auf Microsoft Azure

**Cloud-native · Skalierbar · Produktionsbereit · DSGVO-orientiert**

---

## Executive Summary

Die **Syro AI Platform** ist eine produktionsreife AI-Agent-Plattform auf Microsoft Azure.  
Sie ermöglicht Unternehmen, spezialisierte interne KI-Assistenten zu erstellen und vollständig innerhalb der eigenen Cloud-Infrastruktur zu betreiben.

Dieses Projekt demonstriert:

- End-to-End SaaS-Entwicklung  
- AI-Integration in produktiver Cloud-Umgebung  
- Skalierbare Container-Architektur  
- Security- und Monitoring-Best-Practices  
- Professionelle CI/CD-Implementierung  

Ziel ist es, AI nicht als Experiment, sondern als **kontrollierbares, skalierbares und geschäftsrelevantes Produktivitätswerkzeug** einzusetzen.

---

# Business Value

Viele Unternehmen stehen vor ähnlichen Herausforderungen:

- Entwickler verlieren Zeit bei Debugging und Code-Recherche  
- DevOps-Fragen blockieren Projekte  
- Marketing benötigt schnelle Content-Unterstützung  
- Sensible Unternehmensdaten dürfen nicht extern gespeichert werden  
- AI-Lösungen sind nicht in bestehende Cloud-Infrastrukturen integriert  

### Lösung durch Syro

- Interne AI Agents mit klar definierter Rolle  
- Vollständiger Betrieb in Microsoft Azure  
- Multi-User-System mit Authentifizierung  
- Monitoring, Logging und Alerting  
- Skalierbare container-basierte Architektur  

**Ergebnis:** Höhere Produktivität bei voller Datenkontrolle.

---

# Konkretes Praxisbeispiel

Ein *Python Expert Agent* wurde mit folgendem System Prompt konfiguriert:

> "Du bist ein Python Experte und schreibst sauberen, strukturierten Code."

### Anfrage

> "Erstelle mir eine Taschenrechner App mit GUI in Python."

### Ergebnis

Der Agent:

- Generierte vollständigen `tkinter`-Code  
- Erklärte die Struktur des Programms  
- Lieferte lauffähigen Produktionscode  

---

## Python Agent generiert Code

![Python Agent generiert Code](./screenshots/python-agent-code.png)

---

## Ausgeführte GUI-App

![Ausgeführte GUI-App](./screenshots/calculator-gui.png)

Dieses Beispiel zeigt:

- AI generiert funktionierenden Produktionscode  
- Interne Developer Support Agents sind realisierbar  
- AI kann als internes Produktivitätstool eingesetzt werden  

---

# Business Use Cases

## 1. Developer Support Agent

- Code generieren  
- Bugs analysieren  
- Best Practices erklären  
- Architekturfragen beantworten  

## 2. Azure DevOps Agent

- CI/CD-Workflows erklären  
- Azure CLI Commands generieren  
- Container Deployments unterstützen  
- Monitoring und Alerts konfigurieren  

## 3. Marketing Agent

- Kampagnenideen entwickeln  
- B2B Content generieren  
- Texte optimieren  

## 4. Sales Agent

- Angebotsvorlagen erstellen  
- Antworttexte formulieren  
- Kundenkommunikation unterstützen  

---

# Architektur Überblick

Die gesamte Plattform läuft in **Microsoft Azure (Region: West Europe)**.

## Verwendete Azure Services

- Azure Container Apps  
- Azure Container Registry  
- Azure Static Web Apps  
- Azure Application Insights  
- Azure Log Analytics  
- Azure Monitor Alerts  
- Azure Data Tables  

---

## Ressourcenübersicht

![Azure Ressourcenübersicht](./screenshots/azure-resource-group.png)

---

## Container App Übersicht

![Container App Übersicht](./screenshots/container-app-overview.png)

---

## Laufende Container Revision

![Container Revision](./screenshots/container-revision.png)

---

## Azure Container Registry

![Azure Container Registry](./screenshots/container-registry.png)

---

# Authentifizierung und Security

Implementierte Sicherheitsmechanismen:

- Benutzerregistrierung  
- Login-System  
- Passwort-Hashing mit `bcrypt`  
- JWT Token Authentifizierung  
- Secrets via GitHub Secrets  
- Secrets in Azure Container Apps  
- HTTPS-only Deployment  

---

## Login

![Login](./screenshots/login.png)

---

## Registrierung

![Registrierung](./screenshots/register.png)

---

# Agent System

Benutzer können:

- Eigene Agents erstellen  
- System Prompts definieren  
- Rollen und Verhalten konfigurieren  

---

## Agent erstellen

![Agent erstellen](./screenshots/create-agent.png)

---

## Agent Übersicht

![Agent Übersicht](./screenshots/agent-overview.png)

---

## Agent Detail (Azure DevOps Agent)

![Agent Detail](./screenshots/agent-detail.png)

---

# Dashboard

Das Dashboard bietet:

- Gesamtanzahl der Agents  
- Weekly Usage  
- System Status  
- Plattform-Aktivität  

![Dashboard](./screenshots/dashboard.png)

---

# Monitoring & Production Readiness

Integriert:

- Application Insights  
- Request Monitoring  
- Response Time Analyse  
- Error Tracking  
- Telemetrie  
- Azure Alert Regeln  

## Application Insights

![Application Insights](./screenshots/application-insights.png)

---

## Aktivierte Metrik-Warnungen

Konfigurierte Warnungen:

- CPU > 80%  
- HTTP 5xx Fehler  

![Azure Alerts](./screenshots/azure-alerts.png)

---

# CI/CD Pipeline

Zwei getrennte Workflows:

### Frontend Deployment
Azure Static Web Apps

### Backend Pipeline
Build → Docker Build → Push to ACR → Deploy Container App

![GitHub Actions](./screenshots/github-actions.png)

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
- Containerization  

---

# Technische Kompetenzen, die dieses Projekt demonstriert

- End-to-End SaaS Entwicklung  
- Multi-User-Architektur  
- AI-Integration in produktiver Umgebung  
- Cloud-native Design  
- Container-Orchestrierung  
- Observability und Monitoring  
- Security Best Practices  
- Infrastructure as Platform  
- CI/CD Automatisierung  

---

# Warum dieses Projekt für Unternehmen relevant ist

Dieses Projekt zeigt, dass:

- AI sicher intern betrieben werden kann  
- Mitarbeiter spezialisierte AI Agents erstellen können  
- Produktivität ohne externe Datenweitergabe steigt  
- Microsoft Azure professionell genutzt wird  
- Das System skalierbar und produktionsbereit ist  

---

## Kontakt

Offen für Positionen im Bereich **AI Engineering · Cloud Engineering · Azure Architecture**.
