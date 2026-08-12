# APP-RITE — Plataforma Educativa del Reglamento de Instalaciones Térmicas en los Edificios

**APP-RITE** es una aplicación web interactiva diseñada para la preparación progresiva del **Reglamento de Instalaciones Térmicas en los Edificios (RITE)** en España (aprobado por el **Real Decreto 1027/2007, de 20 de julio**).

El proyecto sigue una metodología de aprendizaje en 4 pasos:
1. **Aprender a orientarse** en la normativa.
2. **Estudiar el Articulado** (Parte I).
3. **Practicar por Instrucciones Técnicas y Apéndices** (IT 1 a IT 4 y Apéndices 1 a 5).
4. **Realizar Simulacros Globales de Examen**.

---

## 📁 Estructura del Proyecto

```text
/
├── index.html                    # Página principal e itinerario en 4 pasos
├── orientacion.html              # Módulo 1: "Aprende a orientarte" + Ejercicio interactivo
├── Repasar_Articulado.html       # Módulo 2: Guía de Capítulos del Articulado (Cap. I - X)
├── Repasar_IT_RITE.html          # Módulo 3: Desglose de Instrucciones Técnicas y Apéndices
├── Test_por_IT_RITE.html         # Menú de selección de Test por bloques
├── Test_completos_RITE.html      # Página de presentación del Simulacro RITE
│
├── Data/
│   └── base_datos_rite.json      # Banco maestro unificado de preguntas (398 preguntas reales)
│
├── plantilla/
│   ├── plantilla_test.html       # Motor universal de ejecución de test por bloques
│   └── plantilla_examenes.html   # Motor de simulador de examen global con temporizador
│
├── js/
│   ├── theme.js                  # Gestor de tema claro/oscuro con almacenamiento local
│   └── utils.js                  # Algoritmo Fisher-Yates, normalizador de bloques y persistencia
│
├── css/
│   └── style.css                 # Sistema de diseño con glassmorphism y variables visuales
│
├── favicon.svg                   # Icono de la aplicación
└── README.md                     # Documentación técnica del proyecto
```

---

## 📝 Banco de Preguntas JSON

Las preguntas están almacenadas en formato JSON dentro de `Data/base_datos_rite.json`.

### Formato para Preguntas del Articulado (Parte I)
```json
{
  "id": "RITE-ART-001",
  "pregunta": "¿Cuál es el objeto principal del RITE según la Parte I del Real Decreto 1027/2007?",
  "opciones": [
    "Establecer las exigencias de eficiencia energética y seguridad en las instalaciones térmicas.",
    "Regular exclusivamente los precios de los combustibles calefactores.",
    "Definir el marco de tarifas de las distribuidoras eléctricas.",
    "Fijar únicamente los requisitos de prevención de riesgos en obra."
  ],
  "respuesta": "Establecer las exigencias de eficiencia energética y seguridad en las instalaciones térmicas.",
  "explicacion": "El Artículo 1 del RITE establece las exigencias técnicas de seguridad y eficiencia energética para el bienestar e higiene de las personas.",
  "bloque": "ARTICULADO",
  "subbloque": "Capítulo I",
  "referencia": "Artículo 1",
  "punto": "1.1",
  "tema": "Disposiciones generales"
}
```

### Formato para Preguntas de Instrucciones Técnicas y Apéndices (Parte II)
```json
{
  "id": "RITE-IT11-001",
  "pregunta": "¿Qué exigencia reglamentaria desarrolla la IT 1.1 de la Parte II del RITE?",
  "opciones": [
    "Exigencia de bienestar e higiene.",
    "Exigencia de inspecciones de calderas.",
    "Exigencia de régimen sancionador.",
    "Exigencia de carné de mantenedor."
  ],
  "respuesta": "Exigencia de bienestar e higiene.",
  "explicacion": "La IT 1.1 especifica los requisitos de calidad del aire interior (IDA), confort térmico y acústico.",
  "bloque": "IT-1.1",
  "subbloque": "IT-1.1.4.2",
  "referencia": "IT 1.1.4.2",
  "punto": "IT 1.1.4.2.2",
  "tema": "Calidad del aire interior"
}
```

### Identificadores de Bloque Normalizados
- `ARTICULADO`: Parte I (Artículos 1 al 47)
- `IT-1.1`: Exigencia de bienestar e higiene
- `IT-1.2`: Exigencia de eficiencia energética
- `IT-1.3`: Exigencia de seguridad
- `IT-2`: Montaje y pruebas
- `IT-3`: Mantenimiento y uso
- `IT-4`: Inspección
- `APENDICE-1`: Términos y definiciones
- `APENDICE-2`: Normas de referencia
- `APENDICE-3`: Conocimientos de instalaciones térmicas en edificios
- `APENDICE-4`: Declaración responsable en régimen de establecimiento
- `APENDICE-5`: Declaración responsable en régimen de libre prestación

---

## ⚙️ Configuración del Motor de Test y Simulacros

### 1. Modificar Número de Preguntas y Nota Mínima en Test por Bloques
Abre `plantilla/plantilla_test.html` y modifica las constantes al inicio del bloque `<script>`:
```javascript
const PREGUNTAS_POR_TEST = 20; // Número de preguntas por sesión
const DURACION_SEG = 60 * 60;   // Duración en segundos (60 minutos)
const NOTA_MINIMA = 70;         // Porcentaje mínimo de aciertos para obtener APTO (70%)
```

### 2. Modificar Distribución del Simulacro de Examen
Abre `plantilla/plantilla_examenes.html` y ajusta el objeto `CONFIG_EXAMEN`:
```javascript
const CONFIG_EXAMEN = {
  totalPreguntas: 40,
  duracionMinutos: 90,
  notaMinima: 70,
  distribucion: {
    "ARTICULADO": 6,
    "IT-1.1": 5,
    "IT-1.2": 5,
    "IT-1.3": 4,
    "IT-2": 4,
    "IT-3": 4,
    "IT-4": 4,
    "APENDICE-1": 2,
    "APENDICE-2": 2,
    "APENDICE-3": 2,
    "APENDICE-4": 1,
    "APENDICE-5": 1
  }
};
```

---

## 🚀 Despliegue en GitHub Pages

**APP-RITE** es una aplicación web puramente estática (HTML, CSS y JavaScript Vanilla) publicada mediante **GitHub Pages**.

### Configuración del Despliegue:
- **Repositorio**: `https://github.com/darwinAlvarez89/RITE`
- **GitHub Pages**:
  - **Source**: Deploy from a branch
  - **Branch**: `main`
  - **Folder**: `/ (root)`
- **URL de la Aplicación**: `https://darwinalvarez89.github.io/RITE/`

---

## 🎨 Paleta de Color Corporativa
- **Azul Principal**: `#017AEB`
- **Fuente Principal**: `Inter`
- **Modo Oscuro**: Sincronizado automáticamente y guardado en `localStorage`.
