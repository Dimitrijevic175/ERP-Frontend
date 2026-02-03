# ERP Frontend System

This is the client-side application for the **ERP Microservices System**. It provides a modern and responsive user interface for managing users, products, warehouses, and sales.

The application is built with **React 19**, **TypeScript**, and **Vite**, and is fully containerized using **Docker** and **Nginx**.

---

## Technologies & Tools

* **Library:** React 19
* **Language:** TypeScript
* **Build Tool:** Vite 7
* **Styling:** Tailwind CSS v4 & ShadCN UI
* **Routing:** React Router 7
* **API Client:** Axios
* **Containerization:** Docker & Nginx (Production-ready)

---

## Architecture Overview

The frontend acts as a standalone service that communicates with backend microservices and is served via a high-performance **Nginx** web server.

| Feature          | Description                             |
| ---------------- | --------------------------------------- |
| User Interface   | Dashboard for managing ERP entities     |
| State Management | React Hooks & Local State               |
| API Integration  | Direct communication with microservices |
| Deployment       | Multi-stage Docker build                |

---

## Getting Started (Local Setup)

### Prerequisites

Before running the application, make sure you have the following installed:

1. **Git** – [https://git-scm.com/](https://git-scm.com/)
2. **Docker Desktop** – [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

---

## Installation & Execution

### 1. Clone the Repository

```bash
git clone https://github.com/Dimitrijevic175/ERP-Frontend.git
cd ERP-Frontend
```

---

### 2. Environment Configuration

Create a `.env` file in the project root directory (where `package.json` is located) and add the following backend service URLs:

```env
VITE_USER_API_BASE_URL=http://localhost:8080
VITE_PRODUCT_API_BASE_URL=http://localhost:8081
VITE_PROCUREMENT_API_BASE_URL=http://localhost:8082
VITE_SALES_API_BASE_URL=http://localhost:8083
VITE_WAREHOUSE_API_BASE_URL=http://localhost:8084
```

> Make sure that the backend system is running before starting the frontend.

---

### 3. Launch with Docker

Run the following command from the project root directory:

```bash
docker-compose up --build
```

This command will:

* Install dependencies
* Perform TypeScript checks
* Build static assets
* Serve the application using Nginx

---

### 4. Access the Application

Once the container is running, open your browser at:

```
http://localhost:3000
```

## Backend Integration

The frontend requires the ERP Backend System to be running.

Make sure all backend microservices are available so that API requests can be resolved correctly.

Recommended startup order:

1. Start ERP Backend System
2. Start ERP Frontend System

---

## License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this software in accordance with the terms of the MIT License.

See the `LICENSE` file for more details.
