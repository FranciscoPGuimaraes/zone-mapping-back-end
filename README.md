# 🗺️ Zone Mapping App --- Full Stack (Frontend + Backend)

Plataforma para **criação, visualização e gerenciamento de zonas
geográficas no mapa**, com armazenamento de geometria em **GeoJSON
(Polygon/MultiPolygon)** e operações **CRUD** via API.

------------------------------------------------------------------------

## ✨ Funcionalidades

-   Criação de zonas desenhando diretamente no mapa
-   Armazenamento da geometria em **GeoJSON**
-   **CRUD completo** (Create, Read, Update, Delete) via backend
-   Configuração via **variáveis de ambiente (.env)**
-   Persistência relacional no banco de dados (**SQLite**)
-   Interface modal para nome e tipo da zona
-   Controle de visibilidade das zonas na UI

------------------------------------------------------------------------

## 🧰 Stack Tecnológica

### 🎨 Frontend

-   **React (Vite)**
-   Axios
-   Leaflet + Leaflet‑Draw
-   Context API para gerenciamento de estado

### 🏗️ Backend

-   **NestJS**
-   SQLite
-   ORM com suporte JSON para GeoJSON (TypeORM)
-   Swagger para documentação 

------------------------------------------------------------------------

## 🧠 Modelo da entidade `Zone`

``` json
{
  "id": 1,
  "name": "Zona Residencial Norte",
  "type": "Residencial",
  "geometry": { "type": "Polygon", "coordinates": [...] },
  "createdAt": "2025‑11‑27T17:40:00.000Z"
}
```

------------------------------------------------------------------------

## 🔐 Variáveis de Ambiente


Frontend (React + Vite), crie o `.env`:

``` env
VITE_API_URL=http://localhost:3000
VITE_MAP_CENTER=[‑22.5, ‑45.5]
VITE_MAP_ZOOM=13
```

> **Importante:** variáveis do frontend devem começar com `VITE_`.

------------------------------------------------------------------------

## ▶️ Executando a Aplicação Localmente

### 📦 Instalar dependências

``` bash
npm install
```

### ▶️ Iniciar backend

``` bash
npm run start:dev
```

### ▶️ Iniciar frontend

``` bash
cd front_end
npm install
npm run dev
```

Acesse no navegador: - **Frontend:** `http://localhost:5173` - **API:**
`http://localhost:3000/zones`

------------------------------------------------------------------------

## 🌐 Acesso ao Projeto Online

-   **Aplicação:** `https://zone-mapping-front-end-jrqm.vercel.app/`
-   **API:** `https://zone-mapping-back-end.onrender.com/`
-   **Docs (Swagger):** `https://zone-mapping-back-end.onrender.com/docs`

------------------------------------------------------------------------

## 📡 Endpoints Principais da API

  Método     Rota           Descrição
  ---------- -------------- -----------------
  `POST`     `/zones`       Criar nova zona
  `GET`      `/zones`       Listar zonas
  `GET`      `/zones/:id`   Buscar por ID
  `PATCH`    `/zones/:id`   Atualizar zona
  `DELETE`   `/zones/:id`   Excluir zona


------------------------------------------------------------------------

## 🧑‍💻 Autor

**Francisco Guimarães**\
Desenvolvedor Full Stack
Email: (franciscop.guimaraes04@gmail.com)
