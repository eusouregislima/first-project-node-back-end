// consolidando o aprendizado
const { request, response } = require('express')
const express = require('express') // Uma constante para guardar a reuisição do framework
const uuid = require('uuid') // usado para criar um id para cada usuário

const port = 3000
const app = express()
app.use(express.json())

/* 
    - Query params => meusite.com/users?nome=regis&age=36  // FILTROS
    - Route params => /users/2   // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request Body => { "name":"Regis", "age":}

    - GET          => Buscar informação no back-end
    - POST         => Criar informação no back-end
    - PUT / PATCH  => Alterar/atualizar informação no back -end
    - DELETE       => Deletar informação no cback-end

    Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params 

    const index = users.findIndex(user => user.id === id) 

    if (index < 0) { 
        return response.status(404).json({ message: "User not found" })
    }
    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {
    return response.json(users) // para retornar todos os usuários criados
})

app.post('/users', (request, response) => { // adicionando usuários
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user) //adicionando uma informação dentro do meu array users
    return response.status(201).json(users) // status 201 é de usuário criado
})

app.put('/users/:id', checkUserId, (request, response) => {
    
    const { name, age } = request.body

    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age } 

    //find - encontra ainformação dentro do array e me retorna a informação
    //findIndex - retorna o locar do array onde está a informação
    // caso não encontre ele retorna -1
  

    users[index] = updateUser // vou no meu array de usuários na posição que encontrei e atualizo

    return response.json(updateUser) // para retornar todos os usuários criados
})

app.delete('/users/:id', checkUserId, (request, response) => { // vou pegar o id do usuário
    //const { id } = request.params
    const index = request.userIndex
  
    users.splice(index, 1) //consigo deletar partes do array a partir de um índice
    //quero deletar a posição encontrada no index, e soment eles, por isso o 1

    return response.status(204).json() // starus 204 é sem conteúdo
})




app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})





















/*
const express = require('express') // importando o express
const port = 3000 // abri uma variavel para facilitar mudanças de porta

const app = express()
app.use(express.json()) // esse é o padrão para avisar que vou usar o json e precisa vir aqui em cima
// ou seja, vem sempre antes das rotas

app.get('/users', (request, response)=> { 

    const {name, age} = request.body // desestruturação
  

    return response.json({name, age})
  
} )

app.listen(port, () =>{
    console.log(`😁 Server started on ${port}`)
})

*/


/*
const express = require('express') // importando o express
const port = 3000 // abri uma variavel para facilitar mudanças de porta

const app = express() //uma variável para usar mais simplificado

app.get('/users/:id', (request, response)=> { //os dois pontos adicionados permitem que seua usado um valor dinamico
   // const {name, age} = request.query // uma forma de ecomizar código

   // const name = request.query.name
   // const age = request.query.age
  //  const {id} = request.params

    //console.log(request) // aqui eu vi que ele me cria uma parte chamada query com um objeto
    console.log(id)
   //return response.send('Hello Express') 
   // Após o request vou precisar retornar algo no meu front end
   // para retornar allgo preciso usar o meu json e: ou objeto ou array
  // return response.json({name, age}) // quanso a chave e o valor tem o mesmo nome pode abreviar{name: name, age: age}

    return response.json({id})

    //O express me premite deixar sem as aspas duplas

//} ) // aqui eu entreguei a rota

app.listen(port, () =>{
    console.log(`😁 Server started on ${port}`)
//}) // aqui eu disse qual é a porta para acessar

/*Para colocar o servidor no ar:
No meu terminal coloco:
node index.js(nome do arquivo)

Teste no navegador
http://localhost:3000/users

Em caso de alteração tem que parar de rodar no ctrl + c

Navegadores somente conseguem requisitar no tipo get
*/

/*
Query params => meusite.com/users?name=regis&age=28 - usado para filtros
routr params => /users/2 - buscar, deletar ou atualizar algo específico - aqui seria fazer algo com o usuario de id 2
*/

