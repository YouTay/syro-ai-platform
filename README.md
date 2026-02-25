🚀 Syro AI Platform

Enterprise AI Agent Plattform auf Microsoft Azure
DSGVO-konform, skalierbar und produktionsbereit deployt

💡 Warum diese Plattform echten Business Value bietet

Viele Unternehmen wollen AI nutzen – aber:

❌ Mitarbeiter verlieren Zeit bei technischen Problemen

❌ Entwickler brauchen schnelle Code-Unterstützung

❌ Marketing-Teams benötigen Content-Unterstützung

❌ Azure DevOps Fragen blockieren Projekte

❌ Sensible Daten sollen nicht extern gespeichert werden

Syro AI Platform löst genau dieses Problem.

Unternehmen können:

eigene spezialisierte AI Agents erstellen

interne Assistenten für bestimmte Aufgaben definieren

AI vollständig in der Microsoft Cloud betreiben

produktiver arbeiten – ohne externe Datenweitergabe

🧠 Konkretes Praxisbeispiel (Real getestet)

Ich habe einen Python Expert Agent erstellt mit folgendem System Prompt:

"Du bist ein Python Experte und schreibst sauberen, strukturierten Code."

Ich habe ihn gebeten:

"Erstelle mir eine Taschenrechner App mit GUI in Python."

Der Agent:

generierte vollständigen tkinter Code

erklärte die Struktur

lieferte lauffähigen Python Code

Ich habe den Code:

lokal ausgeführt

getestet

und die GUI-App funktionierte sofort

📸 Python Agent generiert Code:

![Python Agent Code](./screenshots/python-agent-code.png)

📸 Ausgeführte Taschenrechner App:

![Calculator Running](./screenshots/calculator-running.png)

Das zeigt:

✅ Agent erzeugt funktionierenden Produktionscode
✅ Mitarbeiter können sich Coding-Unterstützung bauen
✅ Interne Dev-Support Agents möglich
✅ AI wird zum internen Productivity Tool

🎯 Business Use Cases
👨‍💻 1. Developer Support Agent

Ein Python Agent hilft:

sauberen Code schreiben

Bugs debuggen

Funktionen erklären

Best Practices liefern

☁️ 2. Azure DevOps Agent

hilft bei CI/CD

generiert Azure CLI Commands

erstellt Infrastructure Setup

erklärt Monitoring & Alerts

📈 3. Marketing Agent

erstellt Kampagnenideen

generiert B2B Content

optimiert Texte

💼 4. Sales Agent

formuliert Angebote

erstellt Antwort-Vorlagen

unterstützt im Kundenkontakt

🏗️ Architektur Überblick

Die gesamte Plattform läuft in Azure (West Europe).

☁️ Azure Infrastruktur

Alle Ressourcen in einer Subscription, einer Resource Group.

Verwendet:

Azure Container Apps

Azure Container Registry

Azure Static Web Apps

Azure Table Storage

Azure Application Insights

Azure Log Analytics

Azure Monitor Alerts

📸 Resource Group Übersicht:

![Azure Resource Group](./screenshots/resource-group.png)
🔐 Authentifizierung & Security

Benutzer Registrierung & Login

Passwort Hashing mit bcrypt

JWT Token Authentifizierung

Secrets via GitHub Secrets

Secrets in Azure Container Apps

HTTPS Only Deployment

📸 Login:

![Login](./screenshots/login.png)

📸 Registrierung:

![Register](./screenshots/register.png)
🤖 Agent System
Agent erstellen mit eigenem System Prompt

Benutzer können:

Agent Name definieren

System Prompt konfigurieren

Persönlichkeit festlegen

Rolle definieren (z.B. Python Experte)

📸 Agent erstellen:

![Create Agent](./screenshots/create-agent.png)

📸 Agent Übersicht:

![Agents Overview](./screenshots/agents.png)

📸 Agent Detail + Chat:

![Agent Chat](./screenshots/agent-chat.png)
📊 Dashboard & Monitoring
Dashboard

Anzahl Agenten

Weekly Usage

System Status

📸 Dashboard:

![Dashboard](./screenshots/dashboard.png)
📈 Monitoring & Production Readiness
Application Insights integriert

Request Monitoring

Response Time

Error Tracking

Telemetrie

📸 Application Insights:

![App Insights](./screenshots/app-insights.png)
⚠️ Azure Alert Regeln

Erstellt:

CPU > 80%

HTTP 5xx Fehler

E-Mail Benachrichtigung

📸 Alerts:

![Alerts](./screenshots/alerts.png)
🚀 CI/CD Pipeline

Zwei getrennte Workflows:

Frontend Deployment (Azure Static Web Apps)

Backend Build → Push to ACR → Deploy Container App

📸 GitHub Actions:

![GitHub Actions](./screenshots/github-actions.png)

📸 Azure Container Registry (Image sichtbar):

![ACR Image](./screenshots/acr-image.png)

📸 Container App Revision Running:

![Container Revision](./screenshots/container-revision.png)
🧰 Tech Stack
Backend

Python

FastAPI

SQLAlchemy

Pydantic

JWT (python-jose)

bcrypt

Azure Data Tables

OpenAI API

Frontend

Next.js

TypeScript

TailwindCSS

v0 UI Integration

Cloud

Azure Container Apps

Azure Monitor

Azure Log Analytics

Azure ACR

Azure Static Web Apps

DevOps

Docker

GitHub Actions

CI/CD

Containerization

🧠 Was dieses Projekt demonstriert

End-to-End SaaS Entwicklung

Multi-User System

AI Integration in Produktionsumgebung

Cloud-native Architektur

Monitoring & Alerting

Security Best Practices

Container-basierte Deployments

DSGVO-orientiertes Hosting

📌 Warum dieses Projekt relevant für Unternehmen ist

Es zeigt:

AI kann intern betrieben werden

Mitarbeiter können spezialisierte Arbeits-Agents erstellen

Produktivität steigt ohne externe Datenweitergabe

Microsoft Azure Infrastruktur wird professionell genutzt

System ist skalierbar und production-ready

👨‍💻 Autor

Youssef Tayachi
Cloud & AI Engineer
