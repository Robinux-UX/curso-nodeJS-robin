const hbs = require('hbs')
const funciones = require('./funciones');

hbs.registerHelper('listar', ()=>{
   try {
       return funciones.listar();
   } catch(err) {
        return "No hay cliente";
   }
})

hbs.registerHelper('listarnombre', ()=>{
    try{
        return funciones.listarNombre();
    }catch (err) {
        return "No existen clientes"
    }
})

hbs.registerHelper('crear', (ced, nom, pais) => {
    if(ced) {
        let cl = {
            cedula: parseInt(ced),
            nombre: nom,
            pais: pais
        }
        return funciones.crear(cl);
    }
    
})

hbs.registerHelper('vercliente', (ced) => {
    try {
        return funciones.verCliente(parseInt(ced));
    }catch (err) {
        return "No tienen datos de clientes, no han aparecido"
    }
})

hbs.registerHelper('eliminar', (ced) => {
    try {
        return funciones.eliminar(parseInt(ced));
    }catch (err) {
        return "No puede eliminar a la persona"
    }
})

//*********************************Curso de estudiante****************************************** */

hbs.registerHelper('curso_estudiar', () => {
    try {
        return funciones.curso_estudiar()
    }catch (err) {
        return "No se pudo los cursos de estudiante"
    }
})

hbs.registerHelper('cusroPorEstudiar', (ced) => {
    try {
        return funciones.cusroPorEstudiar(ced)
    }catch (err) {
        return "No se encuentran los cursos"
    }
})


//*********************************Curso****************************************** */

hbs.registerHelper('crearCurso', (idc, nomC, cost) => {
    if(idc) {
        let curso = {
            id: parseInt(idc),
            nombreCurso: nomC,
            costo: parseInt(cost)
        }
        return funciones.crearCurso(curso);
    }
    
})

hbs.registerHelper('verCurso', (idc) => {
    try {
        return funciones.verCurso(parseInt(idc));
    }catch (err) {
        return "No tienen datos de curso, no han aparecido"
    }
})

hbs.registerHelper('eliminarC', (idc) => {
    try {
        return funciones.eliminarC(parseInt(idc));
    }catch (err) {
        return "No puede eliminar al curso"
    }
})

hbs.registerHelper('listarC', ()=>{
    try {
        return funciones.listarC();
    } catch(err) {
         return "No hay curso";
    }
 })
 
 hbs.registerHelper('listarnombreC', ()=>{
     try{
         return funciones.listarNombreC();
     }catch (err) {
         return "No existen cursos"
     }
 })


/*
hbs.registerHelper('registrar', (ced, nomb, pais) => {
    if(ced) {
        let cl = {
            cedula: parseInt(ced),
            nombre: nomb,
            pais: pais
        }
        listaClientes = require('./listado.json')
        listaClientes.push(cl)
        console.log("ingresó")
        console.log(listaClientes)
        texto = `<div class="alert alert-success" role="alert">${nomb} registrada:</div>`
        let datos = JSON.stringify(listaClientes);
        fs.writeFile('src/listado.json', datos, (err) => {
            if (err) throw (err);
                console.log('Archivo fue creado con éxito')
        })
        return texto
    }
})
*/

/*
hbs.registerHelper('obtener_promedio', (nota1, nota2, nota3) => {
    return (nota1+nota2+nota3)/3;
});
*/

/*
hbs.registerHelper('listar', () => {
    listaEstudiantes = require('./listado.json');
    let texto = "Lista de clientes";
    texto = `<table style="text-align: center;">
                <thead>
               <th> Nombre </th>
               <th> Matematicas </th>
               <th> Ingles </th>
               <th> Programacion </th>
               </thead>
               <tbody>`;

    listaEstudiantes.forEach(estudiante => {
        texto += 
            `<tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.matematica }</td>
                <td>${estudiante.ingles }</td>
                <td>${estudiante.programacion}</td>
            </tr>
            `
     });
     texto += `</tbody></table>`;
     return texto;
});
*/