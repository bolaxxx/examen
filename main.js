document.addEventListener('DOMContentLoaded', function() {
    const listaTareas = document.getElementById('lista-tareas');
    const formularioTarea = document.getElementById('formulario-tarea');
    const tituloTarea = document.getElementById('titulo-tarea');
    const descripcionTarea = document.getElementById('descripcion-tarea');

    cargarTareas();

    formularioTarea.onsubmit = function(e) {
        e.preventDefault();
        agregarTarea({ todo: tituloTarea.value, completed: descripcionTarea.value,userId:2 });
    };

    function cargarTareas() {
        const tareas = localStorage.getItem('tareas');
        if (tareas) {
            mostrarTareas(JSON.parse(tareas));
        } else {
            fetch('https://dummyjson.com/todos')
                .then(response => response.json())
                .then(data => {
                    mostrarTareas(data.todos);
                    console.log(data);
                    localStorage.setItem('tareas', JSON.stringify(data.todos));
                });
        }
    }

    function agregarTarea(tarea) {
        fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarea),
        })
        .then(response => response.json())
        .then(data => {
            mostrarTarea(data);
            console.log(data);
            let listaTareasTemp = JSON.parse(localStorage.getItem('tareas'));
            listaTareasTemp.push(data);
            JSON.stringify(listaTareasTemp);
        });
    }

    function mostrarTareas(tareas) {
        tareas.forEach(tarea => mostrarTarea(tarea));
    }

    function mostrarTarea(tarea) {
        console.log(tarea);
        const div = document.createElement('div');
        div.innerHTML = `<h3>${tarea.id}</h3><p>${tarea.todo}</p>`;
        listaTareas.appendChild(div);
    }
});
