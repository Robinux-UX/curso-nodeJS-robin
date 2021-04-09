const fs = require('fs');
listaCliente = [];

const listar = () => {
    let texto = "";
    listaClientes = require('./listado.json')
    listaClientes.forEach(cl => {
        texto = texto + `<tr>
                <td>${cl.cedula}</td>
                <td>${cl.nombre}</td>
                <td>${cl.pais}</td>
                <td><button type="submit" name="cedula" class='form-control btn btn-danger btn-sm' value="${cl.cedula}">Eliminar</button></td>`
    })
    return texto
}

const listarNombre =() => {
    listaClientes = require('./listado.json')
    let texto = "<select name='cedula' class='form-control'>";
    listaClientes.forEach(cl => {
        texto =`${texto} <option value='${cl.cedula}'>${cl.nombre}</option>`
    })
    texto = texto + "</select>"
    return texto
}

const crear = (clientes) => {
    cargar();
    let duplicado = listaClientes.find(nom => nom.cedula == clientes.cedula)
    if(duplicado){
        texto = `<div class="alert alert-warning alert-dismissible fade show" role="alert">Ya existe una persona con la cedula es: ${clientes.cedula}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>` 
    }
    else {
        listaClientes.push(clientes)
        guardar()
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">${clientes.nombre} registrada
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto;
}

const verCliente = (ced)  => {
    listaClientes = require('./listado.json')
    let encontrar  = listaClientes.find(buscar => buscar.cedula == ced)
    texto = ""
    if(encontrar){
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">Personas encuentran de datos:
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        texto = `${texto}
                
                <div class="row">
                    <div class="col-sm">
                    <label>Cedula</label>
                        <input type="number" class="form-control" name="cedula" value="${encontrar.cedula}"  readonly>
                    </div>
                    <div class="col-sm">
                    <label>Nombre</label>
                        <input type="text" class="form-control" name="nombre" value="${encontrar.nombre}"  required>
                    </div>
                    <div class="col-sm">
                    <label>Pais</label>
                        <input type="text" class="form-control" name="pais" value="${encontrar.pais}"  required>
                    </div>`
    }
    else {
        texto = `<div class="alert alert-danger alert-dismissible fade show" role="alert">No se encuentra la cedula
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto
}

const actualizar = (ced, nom, pais, idc, nomC, cost) => {
    cargar();
    let encontrar = listaClientes.find(buscar => buscar.cedula == ced)
    if(!encontrar) {
        texto = `<div class="alert alert-danger alert-dismissible fade show" role="alert">No existe alguien con esa cedula
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }else {
        encontrar.cedula = ced
        encontrar.nombre = nom
        encontrar.pais = pais
        guardar();
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">${nom} se ha actuilizado
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    //return texto
    cargarC();
    let encontrar2 = listaCurso.find(buscarC => buscarC.id == idc)
    if(!encontrar2) {
        texto = `<div class="alert alert-danger alert-dismissible fade show" role="alert">No existe alguien con esa id
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }else {
        encontrar2.id = idc
        encontrar2.nombreCurso = nomC
        encontrar2.costo = cost
        guardarC();
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">${nomC} se ha actuilizado
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto
}

const eliminar = (cedula) => {
    cargar();
    let nuevo = listaClientes.filter(ced => ced.cedula != cedula)
    if (nuevo.length == listaClientes.length) {
        texto = `<div class="alert alert-danger alert-dismissible fade show" role="alert">No existe alguien con esa cedula
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }else {
        listaClientes = nuevo
        guardar()
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">se ha eliminado la persona
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto
}

const cargar = () => {
    try {
        listaClientes = require('./listado.json');
    } catch (err) {
        listaClientes = [];
    }
}

const guardar = () => {
    let datos = JSON.stringify(listaClientes);
    fs.writeFile('src/listado.json', datos, (err) =>{
        if(err) throw (err);
        console.log("Archivo fue guardao con éxito");
    })
}

// ------------------------- CURSOS y Estudiante --------------------------------------------------

const curso_estudiar = () => {
    let texto = "";
    listaClientes = require('./listado.json')
    listaCurso = require('./curso.json')
    listaUser = require('./user_curso.json')
    listaUser.forEach(cl => {
        let encontrar  = listaClientes.find(buscar => buscar.cedula == cl.cedula)
        let cursos = listaCurso.find(buscarC => buscarC.id == cl.id)
        texto = `${texto}<tr>
                <td>${encontrar.cedula}</td>
                <td>${encontrar.nombre}</td>
                <td>${encontrar.pais}</td>
                <td>${cursos.id}</td>
                <td>${cursos.nombreCurso}</td>
                <td>${cursos.costo}</td>
                `
    })
    return texto
}

const cusroPorEstudiar = (ced) => {
    listaCurso = require('./curso.json')
    listaUser = require('./user_curso.json')
    texto = "El curso comprados son: "
    let encontrar = listaUser.filter(buscar => buscar.cedula == ced)
    encontrar.forEach(cur => {
        let cursos = listaCurso.find(buscarC => buscarC.id == encontrar.id)
        texto = texto + "\n"+nombreCurso + "<br>"
    })
    if (encontrar.length == 0) texto = "No tiene cursos"
    return texto 
}


// ------------------------- CURSOS --------------------------------------------------
const cargarC = () => {
    try {
        listaCurso = require('./curso.json');
    } catch (err) {
        listaCurso = [];
    }
}

const guardarC = () => {
    let datos = JSON.stringify(listaCurso);
    fs.writeFile('src/curso.json', datos, (err) =>{
        if(err) throw (err);
        console.log("Archivo fue guardao de curso con éxito");
    })
}

const listarNombreC =() => {
    listaCurso = require('./curso.json')
    let texto = "<select name='id' class='form-control'>";
    listaCurso.forEach(curso => {
        texto =`${texto} <option value='${curso.id}'>${curso.nombreCurso}</option>`
    })
    texto = texto + "</select>"
    return texto
}

const listarC = () => {
    let texto = "";
    listaCurso = require('./curso.json')
    listaCurso.forEach(curso => {
        texto = texto + `<tr>
                <td>${curso.id}</td>
                <td>${curso.nombreCurso}</td>
                <td>${curso.costo}</td>
                <td><button type="submit" name="id" class='form-control btn btn-danger btn-sm' value="${curso.id}">Eliminar</button></td>`
    })
    return texto
}

const crearCurso = (curso) => {
    cargarC()
    let duplicado = listaCurso.find(buscarC => buscarC.id == curso.id)
    if(duplicado){
        texto = `<div class="alert alert-warning alert-dismissible fade show" role="alert">Ya existe una persona con la ID es: ${curso.id}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>` 
    }
    else {
        listaCurso.push(curso)
        guardarC()
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">${curso.nombreCurso} registrada
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto;
}

/*
const actualizarC = (idc, nomC, cost) => {
    cargarC();
    let encontrar = listaCurso.find(buscarC => buscarC.id == idc)
    if(!encontrar) {
        texto = `<div class="alert alert-danger alert-dismissible fade show" role="alert">No existe alguien con esa id
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }else {
        encontrar.id = idc
        encontrar.nombreCurso = nomC
        encontrar.costo = cost
        guardarC();
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">${nomC} se ha actuilizado
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto
}

*/

const eliminarC = (id) => {
    cargarC();
    let nuevo = listaCurso.filter(idc => idc.id != id)
    if (nuevo.length == listaCurso.length) {
        texto = `<div class="alert alert-danger alert-dismissible fade show" role="alert">No existe alguien con esa ID
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }else {
        listaCurso = nuevo
        guardarC()
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">se ha eliminado el curso
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto
}

const verCurso = (idc)  => {
    cargarC()
    let encontrar  = listaCurso.find(buscarC => buscarC.id == idc)
    texto = ""
    if(encontrar){
        texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">Personas encuentran de datos:
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        texto = `${texto}
                
                <div class="row">
                    <div class="col-sm">
                    <label>Cedula</label>
                        <input type="number" class="form-control" name="id" value="${encontrar.id}"  readonly>
                    </div>
                    <div class="col-sm">
                    <label>Nombre</label>
                        <input type="text" class="form-control" name="nombreCurso" value="${encontrar.nombreCurso}"  required>
                    </div>
                    <div class="col-sm">
                    <label>Pais</label>
                        <input type="text" class="form-control" name="costo" value="${encontrar.costo}"  required>
                    </div>`
    }
    else {
        texto = `<div class="alert alert-danger alert-dismissible fade show" role="alert">No se encuentra la ID
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    return texto
}

module.exports = {
    listar,
    listarNombre,
    crear,
    verCliente,
    actualizar,
    eliminar,
    curso_estudiar,
    cusroPorEstudiar, 
    crearCurso,
    listarC,
    listarNombreC,
    //actualizarC,
    eliminarC,
    verCurso
}