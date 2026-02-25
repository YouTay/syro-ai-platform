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
