# Syro AI Platform

[![Azure](https://img.shields.io/badge/Microsoft%20Azure-0078D4?logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/features/actions)

---

## Enterprise AI-Agent Plattform auf Microsoft Azure

**Cloud-native · Skalierbar · Produktionsbereit · DSGVO-orientiert**

---

# Architektur (High-Level)

```mermaid
flowchart TB
  U[User / Team] -->|HTTPS| FE[Frontend\nAzure Static Web Apps\nNext.js + TypeScript + Tailwind]
  FE -->|REST API + JWT| BE[Backend API\nAzure Container Apps\nFastAPI (Python)]
  BE --> DT[(Azure Data Tables)]
  BE --> OAI[OpenAI API]
  BE --> OBS[Application Insights\nLog Analytics]
  OBS --> AL[Azure Monitor Alerts\nCPU > 80% / HTTP 5xx]

  subgraph CI/CD
    GH[GitHub Repository] --> GA[GitHub Actions]
    GA --> ACR[(Azure Container Registry)]
    ACR --> BE
    GA --> FE

---

# 🔷 BLOCK 2 – Vollständige README mit Screenshots (GitHub ready)

# Executive Summary

Die **Syro AI Platform** ist eine produktionsreife AI-Agent-Plattform auf Microsoft Azure.  
Sie ermöglicht Unternehmen, spezialisierte interne KI-Assistenten vollständig innerhalb der eigenen Cloud-Infrastruktur zu betreiben.

Dieses Projekt demonstriert:

- End-to-End SaaS-Entwicklung  
- AI-Integration in produktiver Cloud-Umgebung  
- Skalierbare Container-Architektur  
- Security- und Monitoring-Best-Practices  
- Professionelle CI/CD-Implementierung  

Ziel ist es, AI als kontrollierbares, skalierbares und geschäftsrelevantes Produktivitätswerkzeug einzusetzen.

---

# Business Value

## Herausforderungen in Unternehmen

- Zeitverlust durch Debugging und Code-Recherche  
- DevOps-Blocker  
- Content-Erstellung im Marketing  
- Datenschutzanforderungen  
- Fehlende Integration in bestehende Cloud-Architekturen  

## Lösung durch Syro

- Interne AI Agents mit klarer Rolle  
- Vollständiger Azure-Betrieb  
- Multi-User-System mit Authentifizierung  
- Monitoring & Alerting  
- Containerbasierte Skalierbarkeit  

**Ergebnis:** Höhere Produktivität bei voller Datenkontrolle.

---

# Konkretes Praxisbeispiel

Ein Python Expert Agent wurde konfiguriert mit:

> "Du bist ein Python Experte und schreibst sauberen, strukturierten Code."

Anfrage:

> "Erstelle mir eine Taschenrechner App mit GUI in Python."

Ergebnis:

- Vollständiger tkinter-Code  
- Strukturierte Erklärung  
- Produktionsreifer Code  

---

## Python Agent generiert Code

![Python Agent generiert Code](./screenshots/python-agent-code.png)

---

## Ausgeführte GUI-App

![GUI App](./screenshots/calculator-gui.png)

---

# Business Use Cases

## Developer Support Agent
- Code generieren  
- Bugs analysieren  
- Best Practices erklären  
- Architekturberatung  

## Azure DevOps Agent
- CI/CD erklären  
- Azure CLI Befehle generieren  
- Container Deployments  
- Monitoring & Alerts  

## Marketing Agent
- Kampagnenideen  
- B2B Content  
- Textoptimierung  

## Sales Agent
- Angebotsvorlagen  
- Antworttexte  
- Kundenkommunikation  

---

# Azure Architektur

## Verwendete Services

- Azure Container Apps  
- Azure Container Registry  
- Azure Static Web Apps  
- Azure Application Insights  
- Azure Log Analytics  
- Azure Monitor Alerts  
- Azure Data Tables  

---

## Ressourcenübersicht

![Azure Resource Group](./screenshots/azure-resource-group.png)

---

## Container App Übersicht

![Container App](./screenshots/container-app-overview.png)

---

## Container Revision

![Container Revision](./screenshots/container-revision.png)

---

## Azure Container Registry

![ACR](./screenshots/container-registry.png)

---

# Security

- Registrierung & Login  
- bcrypt Passwort-Hashing  
- JWT Token Authentifizierung  
- GitHub Secrets  
- Azure Container Secrets  
- HTTPS-only  

---

## Login

![Login](./screenshots/login.png)

---

## Registrierung

![Register](./screenshots/register.png)

---

# Agent System

## Agent erstellen

![Create Agent](./screenshots/create-agent.png)

---

## Agent Übersicht

![Agent Overview](./screenshots/agent-overview.png)

---

## Agent Detail

![Agent Detail](./screenshots/agent-detail.png)

---

# Dashboard

- Gesamtanzahl Agents  
- Weekly Usage  
- System Status  

![Dashboard](./screenshots/dashboard.png)

---

# Monitoring & Production Readiness

- Application Insights  
- Request Monitoring  
- Response Time Analyse  
- Error Tracking  
- Telemetrie  
- Azure Alerts  

## Application Insights

![App Insights](./screenshots/application-insights.png)

---

## Azure Alerts

- CPU > 80%  
- HTTP 5xx Fehler  

![Azure Alerts](./screenshots/azure-alerts.png)

---

# CI/CD

## Frontend
Azure Static Web Apps Deployment

## Backend
Build → Docker Build → Push to ACR → Deploy Container App

![GitHub Actions](./screenshots/github-actions.png)

---

# Tech Stack

## Backend
- Python  
- FastAPI  
- SQLAlchemy  
- Pydantic  
- python-jose  
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
- Log Analytics  
- Application Insights  

## DevOps
- Docker  
- GitHub Actions  
- CI/CD  

---

# Demonstrierte Kompetenzen

- End-to-End SaaS Entwicklung  
- Multi-User Architektur  
- AI-Integration in produktiver Umgebung  
- Cloud-native Design  
- Container-Orchestrierung  
- Observability  
- Security Best Practices  
- CI/CD Automatisierung  

---

# Relevanz für Unternehmen

Dieses Projekt zeigt:

- AI kann sicher intern betrieben werden  
- Spezialisierte AI Agents steigern Produktivität  
- Azure wird professionell genutzt  
- Das System ist skalierbar und produktionsbereit  

---

## Kontakt

Offen für Positionen im Bereich:

**AI Engineering · Cloud Engineering · Azure Architecture**
