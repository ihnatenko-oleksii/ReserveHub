# ReserveHub

ReserveHub is a reservation management system built with .NET Core backend and React frontend.

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


## Running the Project

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

