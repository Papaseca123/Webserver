const express = require('express');
const app = express();

app.use(express.json());

//COMO INICIAR, en terminal ingresar lo siguiente
//npm init 
//(package name:) nodejsapi 
//(entry point): index.js  
//saltar resto de campos que pide
//se procede a instalar express: npm install express 
//FIN.



//base de datos de prueba local 
const comidas = [
    {idcomida: 1, nombre: 'alitas', costo: 1000},
    {idcomida: 2, nombre: 'pizza', costo: 4000},
    {idcomida: 3, nombre: 'hamburguesa', costo: 2000}
];

const usuarios = [
    {idusuario: 101, nombre: 'diego', edad: 21, distrito:200344},
    {idusuario:304, nombre: 'maria', edad: 45, distrito:200355},
    {idusuario:502, nombre: 'carlos', edad: 56, distrito:299111}
];


const pedidos = [
    {idpedido:2020 , idusuario:101, idcomida: 1 , cantidad:4, codigo_factura: 1000201},
    {idpedido:3002 , idusuario:502, idcomida: 1 , cantidad:9, codigo_factura: 1299999},
    {idpedido:2083 , idusuario:304, idcomida: 3 , cantidad:1, codigo_factura: 1000121},
    {idpedido:3021 , idusuario:502, idcomida: 2 , cantidad:3, codigo_factura: 1002221}
]



app.get('/',(req,res)=>{
    res.send('Pagina inicio restaurante WINGZ');

});
//COMIDAS
//LIST
// GET/COMIDAS
app.get('/api/comidas',(req,res)=>{

res.send(comidas);
});

//READ
// GET/COMIDAS/{IDCOMIDA}
app.get('/api/comidas/:idcomida',(req,res)=>{
    const comida = comidas.find(c=>c.idcomida==parseInt(req.params.idcomida));
    if(!comida) return res.status(404).send('Comida no encontrada');
    else res.send(comida);
});
//CREATE
// POST/COMIDAS
app.post('/api/comidas',(req,res)=>{
    const comida = {
        idcomida: comidas.length + 1,
        nombre: req.body.nombre, 
        costo: parseInt(req.body.costo)
    };
    comidas.push(comida);
    res.send(comida);
});
//DELETE
// DELETE/{IDCOMIDA}
app.delete('/api/comidas/:idcomida',(req,res)=>{
    const comida = comidas.find(c=>c.idcomida===parseInt(req.params.idcomida));
    if(!comida) return res.status(404).send('Comida no encontrada');

    const index = comidas.indexOf(comida);
    comidas.splice(index,1);
    res.send(comida);
});


//Usuarios
//LIST
// GET/USUARIOS
app.get('/api/usuarios',(req,res)=>{

    res.send(usuarios);
    });
    
    //READ
    // GET/USUARIOS/{IDUSUARIO}
    app.get('/api/usuarios/:idusuario',(req,res)=>{
        const usuario = usuarios.find(c=>c.idusuario==parseInt(req.params.idusuario));
        if(!usuario) return res.status(404).send('Usuario no encontrada');
        else res.send(usuario);
    });
    //CREATE
    // POST/USUARIOS
    app.post('/api/usuarios',(req,res)=>{
        const usuario = {
            idusuario: usuarios.length + 1,
            nombre: req.body.nombre, 
            edad: parseInt(req.body.edad),
            distrito :parseInt(req.body.distrito)
        };
        usuarios.push(usuario);
        res.send(usuario);
    });
    //DELETE
    // DELETE/{IDUSUARIO}
    app.delete('/api/usuarios/:idusuario',(req,res)=>{
        const usuario = usuarios.find(c=>c.idusuario===parseInt(req.params.idusuario));
        if(!usuario) return res.status(404).send('Usuario no encontrado');
    
        const index = usuarios.indexOf(usuario);
        usuarios.splice(index,1);
        res.send(usuario);
    });
    




//PEDIDOS
//LIST
// GET/PEDIDOS
app.get('/api/pedidos',(req,res)=>{

    res.send(pedidos);
    });
    
    //READ
    // GET/PEDIDOS/{IDPEDIDO}
    app.get('/api/pedidos/:idpedido',(req,res)=>{
        const pedido = pedidos.find(c=>c.idpedido==parseInt(req.params.idpedido));
        if(!pedido) return res.status(404).send('Pedido no encontrado');
        else res.send(pedido);
    });
    //CREATE
    // POST/PEDIDOS
    app.post('/api/pedidos',(req,res)=>{
        const pedido = {
            idpedido: pedidos.length + 1,
            idusuario:parseInt(req.body.idusuario),
            idcomida: parseInt(req.body.idcomida),
            cantidad:parseInt(req.body.cantidad),
            codigo_factura:parseInt(req.body.codigo_factura)
        };
        pedidos.push(pedido);
        res.send(pedido);
    });
    //DELETE
    // DELETE/{IDPEDIDO}
    app.delete('/api/pedidos/:idpedido',(req,res)=>{
        const pedido = pedidos.find(c=>c.idpedido===parseInt(req.params.idpedido));
        if(!pedido) return res.status(404).send('Pedido no encontrado');
    
        const index = pedidos.indexOf(pedido);
        pedidos.splice(index,1);
        res.send(pedido);
    });
    


//RUTAS COMPLEJAS
//----------------------------------------------------------------------------------------------
//obtener lista de pedidos para un idcomida especifico
// GET /api/comidas/:idcomida/pedidos
app.get('/api/comidas/:idcomida/pedidos', (req, res) => {
    const idcomida = parseInt(req.params.idcomida);
    const pedidosDeIdComida= pedidos.filter(pedido => pedido.idcomida === idcomida);

    if (pedidosDeIdComida.length === 0) {
        return res.status(404).send('No hay pedidos de esta comida');
    }

    res.send(pedidosDeIdComida);
});

//obtener lista de pedidos para un idusuario especifico 
// GET /api/usuarios/:idusuario/pedidos
app.get('/api/usuarios/:idusuario/pedidos', (req,res)=> {
    const idusuario = parseInt(req.params.idusuario);
    const pedidosDeIdusuario = pedidos.filter(pedido => pedido.idusuario === idusuario);

    if(pedidosDeIdusuario.length===0 ){
        return res.status(404).send('No hay pedidos apra este usuario'); 
    }

    res.send(pedidosDeIdusuario);
})

//obtener lista de pedidos para un distrito
// GET /api/pedidos/distrito/:distrito
app.get('/api/pedidos/distrito/:distrito', (req, res) => {
    const distrito = parseInt(req.params.distrito);
    const pedidosDeDistrito = pedidos.filter(pedido => {
        const usuario = usuarios.find(usuario => usuario.idusuario === pedido.idusuario);
        return usuario && usuario.distrito === distrito;
    });

    if (pedidosDeDistrito.length === 0) {
        return res.status(404).send('No se encontraron pedidos para este distrito.');
    }

    res.send(pedidosDeDistrito);
});



    const port = process.env.port || 3000;
app.listen(port, ()=> console.log(`Escuchando en el puerto ${port}... `));