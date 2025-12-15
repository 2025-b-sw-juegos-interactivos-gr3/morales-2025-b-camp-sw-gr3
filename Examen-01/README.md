# Examen 01 - Babylon.js (Recoger y Entregar)

**Tema seleccionado:** ✅ Alquimista: Recoge ingredientes del bosque y llévalos al caldero.  
**Curso:** SW Juegos Interactivos GR3  
**Entrega:** Repositorio + Video del juego funcionando y explicación del código

---

## 🎮 Descripción
El jugador controla un alquimista en un bosque.  
Debe **recoger un ingrediente mágico (cristal)** en la **zona de recogida (verde)** y **entregarlo** en la **zona de entrega (azul)** donde está el **caldero**.

---

## ✅ Requisitos cumplidos
- Jugador controlable (WASD)
- Paquete / Ingrediente (cristal)
- Zona de Recogida (verde)
- Zona de Entrega (azul)
- Recoger: acercarse y presionar **E** → `item.parent = player`
- Entregar: con item, ir a zona azul y presionar **E** → `item.parent = null`
- Estado: no permite recoger si ya tiene un ingrediente / no entrega si no lo tiene
- Ambientación temática: árboles, caldero, poción con brillo (emissive)

---

## 🕹️ Controles
- **W A S D**: mover
- **E**: recoger / entregar

---

## 🚀 Ejecución
### Opción 1 (recomendado): VS Code + Live Server
1. Abrir el repo en VS Code
2. Instalar extensión **Live Server**
3. Abrir `Examen-01/index.html` con **Open with Live Server**

### Opción 2: servidor local con Node
```bash
npx serve .
