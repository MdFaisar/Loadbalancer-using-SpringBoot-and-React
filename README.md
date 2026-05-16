# LoadBalancer Microservices Application

A full-stack microservices project built with Spring Boot, Spring Cloud Netflix Eureka, and a React + Vite + TypeScript frontend dashboard. Services are dynamically registered and monitored through a centralized service registry, with real-time status updates surfaced through the frontend.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Service Overview](#service-overview)
- [Frontend Dashboard](#frontend-dashboard)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Configuration](#configuration)

---

## Project Structure

```
LoadBalancerApp/
├── frontend/           # React + Vite + TypeScript UI
├── EurekaServer/       # Service registry (Spring Boot)
├── PaymentService/     # Payment simulation microservice
├── OrderService/       # Order placement microservice
└── README.md
```

---

## Tech Stack

**Backend**

- Java 17+
- Spring Boot
- Spring Cloud Netflix Eureka
- RESTful API
- Maven (with Maven Wrapper)

**Frontend**

- React with TypeScript
- Vite (development server and build tool)
- Axios (HTTP client)
- Tailwind CSS / plain CSS
- Component-based architecture

---

## Service Overview

### Eureka Server — Port 8761

Central service registry for dynamic service discovery. All microservices register themselves on startup and send periodic heartbeats. The Eureka dashboard is accessible at:

```
http://localhost:8761/
```

### Payment Service — Port 8083

Simulates payment processing and confirmation. Registers with Eureka on startup and exposes REST endpoints consumed by the Order Service.

### Order Service — Port 8085

Handles order placement and delegates payment processing to the Payment Service via service discovery. Maintains order history and tracks payment status per order. Registers with Eureka on startup.

---

## Frontend Dashboard

Developed with Vite + React + TypeScript, accessible at `http://localhost:5173/` during development.

**Components**

| Component | Description |
|---|---|
| `Header.tsx` | Application header and navigation |
| `OrderForm.tsx` | Form for submitting new orders |
| `PaymentStatus.tsx` | Displays live payment confirmation status |
| `OrderHistory.tsx` | Lists completed and pending orders |
| `ServiceStatus.tsx` | Shows real-time health of registered microservices |
| `RealTimeStats.tsx` | Metrics cards for total orders, completions, and revenue |

**Features**

- Submit new orders through the UI
- View order history with completed and pending states
- Monitor live payment status per order
- Real-time microservice health indicators
- Aggregate metrics: total orders, completed orders, estimated revenue

---

## Prerequisites

Ensure the following are installed before running the project:

- Java 17 or higher
- Maven 3.8+ (or use the included Maven Wrapper)
- Node.js 18+ and npm

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/LoadBalancerApp.git
cd LoadBalancerApp
```

### 2. Start the Eureka Server

The Eureka Server must be started first, as all other services register with it on startup.

```bash
cd EurekaServer
mvn spring-boot:run
```

Verify the registry is running at `http://localhost:8761/`.

### 3. Start the Payment Service

```bash
cd PaymentService
mvn spring-boot:run
```

### 4. Start the Order Service

```bash
cd OrderService
mvn spring-boot:run
```

### 5. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at `http://localhost:5173/`.

> **Note:** Start all backend services before launching the frontend to ensure service status indicators display correctly on load.

---

## API Reference

### Order Service — `http://localhost:8085`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/orders` | Place a new order |
| `GET` | `/orders` | Retrieve all orders |
| `GET` | `/orders/{id}` | Retrieve a specific order by ID |

### Payment Service — `http://localhost:8083`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/payments` | Process a payment |
| `GET` | `/payments/{orderId}` | Get payment status for an order |

---

## Configuration

Default ports are defined in each service's `application.properties` or `application.yml`. To change a port, update the corresponding configuration file:

```properties
# Example: PaymentService/src/main/resources/application.properties
server.port=8083
spring.application.name=payment-service
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

Repeat for `OrderService` and `EurekaServer` as needed. If ports are changed, update the Eureka service URL references across all services accordingly.

---

## License

This project is intended for educational and demonstration purposes.
