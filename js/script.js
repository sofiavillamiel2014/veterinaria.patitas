
// Obtener los elementos del formulario
const formulario = document.getElementById("formularioTurno");
const listaTurnos = document.getElementById("listaTurnos");

// Recuperar los turnos guardados
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

// Mostrar los turnos en pantalla
function mostrarTurnos() {
    listaTurnos.innerHTML = "";

    if (turnos.length === 0) {
        listaTurnos.innerHTML = "<p>No hay turnos registrados.</p>";
        return;
    }

    turnos.forEach((turno, indice) => {
        const tarjeta = document.createElement("div");

        tarjeta.style.background = "white";
        tarjeta.style.padding = "20px";
        tarjeta.style.margin = "15px auto";
        tarjeta.style.borderRadius = "12px";
        tarjeta.style.boxShadow = "0 3px 10px rgba(0,0,0,0.08)";

        tarjeta.innerHTML = `
            <h3>🐾 ${turno.mascota}</h3>
            <p><strong>Dueño:</strong> ${turno.duenio}</p>
            <p><strong>Fecha:</strong> ${turno.fecha}</p>
            <p><strong>Veterinario:</strong> ${turno.veterinario}</p>
            <p><strong>Estado:</strong> ${turno.estado}</p>

            <button onclick="cambiarEstado(${indice}, 'Confirmado')">
                Confirmar
            </button>

            <button onclick="cambiarEstado(${indice}, 'Cancelado')">
                Cancelar
            </button>
        `;

        listaTurnos.appendChild(tarjeta);
    });
}

// Registrar un nuevo turno
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const duenio = document.getElementById("duenio").value.trim();
    const mascota = document.getElementById("mascota").value.trim();
    const fecha = document.getElementById("fecha").value;
    const veterinario = document.getElementById("veterinario").value;

    if (!duenio || !mascota || !fecha || !veterinario) {
        alert("Completá todos los campos.");
        return;
    }

    // Evitar turnos duplicados
    const duplicado = turnos.some(turno =>
        turno.mascota.toLowerCase() === mascota.toLowerCase() &&
        turno.fecha === fecha &&
        turno.estado !== "Cancelado"
    );

    if (duplicado) {
        alert("Esta mascota ya tiene un turno registrado para esa fecha.");
        return;
    }

    const nuevoTurno = {
        duenio: duenio,
        mascota: mascota,
        fecha: fecha,
        veterinario: veterinario,
        estado: "Pendiente"
    };

    turnos.push(nuevoTurno);

    guardarTurnos();
    mostrarTurnos();

    formulario.reset();

    alert("¡Turno registrado correctamente!");
});

// Cambiar el estado de un turno
function cambiarEstado(indice, nuevoEstado) {
    turnos[indice].estado = nuevoEstado;

    guardarTurnos();
    mostrarTurnos();
}

// Guardar los turnos en LocalStorage
function guardarTurnos() {
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

// Mostrar los turnos al abrir la página
mostrarTurnos();
