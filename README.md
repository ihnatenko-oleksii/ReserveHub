# ReserveHub


## Technology

<h4>Backend - Java Spring Boot<br>  
Frontend - React</h4>

## Description

<h3>EN 🇬🇧</h3>
ReserveHub is a modern service booking platform designed for direct collaboration between private users. Every user can offer their own services and book services from others — the system operates in a C2C (consumer-to-consumer) model.

The platform allows users to create, edit, and delete services, as well as rate, like, and add them to favorites. Bookings are easy to manage — users can create, reschedule, or cancel reservations with just a few clicks. The system supports searching for services based on location, price, rating, and category.

Users can communicate directly through a built-in chat linked to specific services, which simplifies asking questions before making a booking.

ReserveHub automatically generates PDF invoices after each booking and allows users to download them. The system supports service providers with a built-in CRM — including client history, bookings, and revenue tracking. Reports (e.g., monthly summaries of bookings, income, or top services) can be exported to PDF and CSV files.

Security is ensured through JWT (JSON Web Token) and Role-Based Access Control (RBAC), ensuring that each role — client, service provider, or admin — only has access to the relevant features.

The platform will be available on both desktop and mobile devices, with a responsive and intuitive interface. Payments will be handled exclusively via Apple Pay and Google Pay, with full tokenization and security support.

<h3>PL 🇵🇱</h3>
ReserveHub to nowoczesna platforma rezerwacji usług stworzona z myślą o bezpośredniej współpracy między prywatnymi użytkownikami. Każdy użytkownik może oferować własne usługi oraz rezerwować usługi innych — system działa w modelu C2C (consumer-to-consumer). 

Platforma umożliwia tworzenie, edytowanie oraz usuwanie usług, a także ich ocenianie, polubienie i dodawanie do ulubionych. Rezerwacje można z łatwością zarządzać: tworzyć, modyfikować termin, anulować. System wspiera wyszukiwanie usług według lokalizacji, ceny, oceny i kategorii. 

Użytkownicy mogą komunikować się bezpośrednio ze sobą za pomocą wbudowanego czatu powiązanego z konkretną usługą — co ułatwia zadawanie pytań przed dokonaniem rezerwacji. 

ReserveHub automatycznie generuje faktury PDF po dokonaniu rezerwacji i umożliwia ich pobieranie. System wspiera użytkowników oferujących usługi poprzez wbudowany CRM — z historią klientów, rezerwacji i przychodów. Raporty (np. miesięczne zestawienia rezerwacji, przychodów czy top usług) można eksportować do plików PDF i CSV. 

Bezpieczeństwo zapewnione jest przez JWT (JSON Web Token) oraz Role-Based Access Control (RBAC), dzięki czemu każda rola — klient, usługodawca, administrator — ma dostęp tylko do odpowiednich funkcji. 

Platforma będzie dostępna zarówno na komputery, jak i urządzenia mobilne, z responsywnym i intuicyjnym interfejsem. Płatności będą obsługiwane wyłącznie przez Apple Pay i Google Pay — z pełnym wsparciem tokenizacji i bezpieczeństwa. 

# Technical

## Prerequisites

Install the following:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- [Git](https://git-scm.com/downloads)

## Docker Installation

### Windows
1. Download and install Docker Desktop from [Docker Hub](https://www.docker.com/products/docker-desktop/)
2. During installation, ensure WSL 2 (Windows Subsystem for Linux) is enabled
3. After installation, restart your computer
4. Start Docker Desktop

### Linux (Ubuntu/Debian)
1. Update package index:
```bash
sudo apt-get update
```

2. Install prerequisites:
```bash
sudo apt-get install \
ca-certificates \
curl \
gnupg \
lsb-release
```

3. Add Docker's official GPG key:
```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

4. Add Docker repository:
```bash
echo \
  "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. Install Docker Engine, containerd, and Docker Compose:
```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

6. Start Docker service:
```bash
sudo systemctl start docker
```

7. (Optional) Run Docker without sudo:
```bash
sudo usermod -aG docker $USER
```

## Github installation

### Windows
1. Download Git for Windows from [Git SCM](https://git-scm.com/download/windows)
2. Run the installer and follow the installation wizard
3. During installation, keep the default options unless you have specific preferences
4. After installation, open Command Prompt or PowerShell to verify installation:
```bash
git --version
```

### Linux (Ubuntu/Debian)
1. Install Git using package manager:
```bash
sudo apt-get install git
```

2. Verify installation:
```bash
git --version
```


## !!! Running the Project !!!

1. Clone the repository:
```bash
git clone <https://github.com/ihnatenko-oleksii/ReserveHub>
cd ReserveHub
```

2. Start the application using Docker:
```bash
docker compose up --build
```

3. Check the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- SQL Server: localhost:1434

4. To stop the application:
```bash
docker compose down
```

5. To restart the application:
```bash
docker compose up --build
```

