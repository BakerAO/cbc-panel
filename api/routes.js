import { Router as ExRouter } from 'express'
import mysqlPool from './mysqlPool.js'

const getPeople = `
  SELECT
    id,
    name,
    inBuilding,
    saved
  FROM people
`

const wrapper = (io, room) => {
  const router = new ExRouter()

  router.get('/', (req, res) => {
    res.status(200).send(`
      <html>
        <head>CBC-API</head>
        <body>
          <h1>CBC-API</h1>
          <p> ${process.env.MYSQL_PORT}</p>
          <p> ${process.env.MYSQL_USER}</p>
          <p> ${process.env.MYSQL_DATABASE}</p>
          <p> ${process.env.MYSQL_PASSWORD}</p>
          <a href="/generate">
            <button>Generate</button>
          </a>
          <a href="/destroy">
            <button>Destroy</button>
          </a>
        </body>
      </html>
    `)
  })

  router.get('/people', async (req, res) => {
    try {
      const [people] = await mysqlPool.query(getPeople)

      res.status(200).send(people)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.post('/people', async (req, res) => {
    try {
      const { inBuilding, name, saved } = req.body

      if (saved) {
        const updateQuery = `
          UPDATE people
          SET
            inBuilding = ${inBuilding}
          WHERE name = '${name}'
        `
        await mysqlPool.query(updateQuery)
      } else {
        const deletePerson = `
          DELETE FROM people
          WHERE name = '${name}'
        `
        await mysqlPool.query(deletePerson)
      }

      const [newPeople] = await mysqlPool.query(getPeople)
      io.sockets.to(room).emit('update', newPeople)
      res.status(200).send('Success')
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.post('/create', async (req, res) => {
    try {
      const { name, saved } = req.body
      const [people] = await mysqlPool.query(getPeople)
      if (people.some(p => name === p.name) || !name) {
        res.status(400).send('Bad Request Man')
        return
      }

      const createPerson = `
        INSERT INTO people (
          name,
          inBuilding,
          saved
        )
        VALUES (
          '${name}',
          true,
          ${saved}
        )
      `
      await mysqlPool.query(createPerson)

      const [newPeople] = await mysqlPool.query(getPeople)
      io.sockets.to(room).emit('update', newPeople)
      res.status(200).send(newPeople)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.post('/delete', async (req, res) => {
    try {
      const { name } = req.body

      const deletePerson = `
        DELETE FROM people
        WHERE name = '${name}'
      `
      await mysqlPool.query(deletePerson)

      const [newPeople] = await mysqlPool.query(getPeople)
      io.sockets.to(room).emit('update', newPeople)
      res.status(200).send(newPeople)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.get('/generate', async (req, res) => {
    try {
      await mysqlPool.query(`
        CREATE TABLE people (
          id int AUTO_INCREMENT primary key,
          name varchar(50),
          inBuilding bool,
          saved bool
        );
      `)

      const people = ['Britt', 'Doug', 'Bruce', 'Charlie', 'Kim', 'Andrea']

      for (const person of people) {
        const createPerson = `
          INSERT INTO people (
            name,
            inBuilding,
            saved
          )
          VALUES (
            '${person}',
            false,
            true
          )
        `

        await mysqlPool.query(createPerson)
      }
      res.status(200).send('Success')
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.get('/destroy', async (req, res) => {
    try {
      await mysqlPool.query(`
        DROP TABLE IF EXISTS people;
      `)

      res.status(200).send('Success')
    } catch (e) {
      res.status(500).send(e)
    }
  })

  return router
}

export default wrapper
