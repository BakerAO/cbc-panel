import { Router as ExRouter } from 'express'
import mysqlPool from './mysqlPool.js'

const weekdayList = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

const wrapper = (io, room) => {
  const router = new ExRouter()

  router.get('/', (req, res) => {
    res.status(200).send(`
      <html>
        <head>OVC-API</head>
        <body>
          <h1>OVC-API</h1>
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

  router.get('/doctors', async (req, res) => {
    try {
      const getDoctors = `
        SELECT *
        FROM doctors
      `
      const [doctorRows] = await mysqlPool.query(getDoctors)

      res.status(200).send(doctorRows)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.get('/times/:weekday', async (req, res) => {
    try {
      const { weekday } = req.params
      const getTimes = `
        SELECT 
          w.id,
          w.doctorId,
          w.status,
          w.default_status
        FROM ${weekday} w
        LEFT JOIN doctors d
        ON d.id = w.doctorId
        AND d.${weekday} = true
      `
      const [timeRows] = await mysqlPool.query(getTimes)

      res.status(200).send(timeRows)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.post('/active', async (req, res) => {
    try {
      const { id, active, weekday } = req.body

      const setActive = `
        UPDATE doctors
        SET ${weekday} = ${active}
        WHERE id = ${id}
      `
      await mysqlPool.query(setActive)

      const getDoctors = `
        SELECT *
        FROM doctors
      `
      const [doctorRows] = await mysqlPool.query(getDoctors)

      io.sockets.to(room).emit('updateDoctors', doctorRows)
      res.status(200).send('Success')
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.post('/times/:weekday', async (req, res) => {
    const { weekday } = req.params
    const { timeId, doctorId, status } = req.body

    const updateQuery = `
      UPDATE ${weekday}
      SET
        status = ${status}
      WHERE id = ${timeId}
      AND doctorId = ${doctorId}
    `
    await mysqlPool.query(updateQuery)

    io.sockets.to(room).emit('updateTime', { timeId, doctorId, status })
    res.status(200).send('Success')
  })

  router.get('/generate', async (req, res) => {
    try {
      // const createActive = `
      //   CREATE TABLE activeDay (
      //     id int NOT NULL,
      //     doctorId int NOT NULL,
      //     status int,
      //     default_status int,
      //     CONSTRAINT ${day}_pk PRIMARY KEY (id, doctorId)
      //   );
      // `
      // await mysqlPool.query(createDay)

      const numTimes = 42

      for (const day of weekdayList) {
        const createDay = `
          CREATE TABLE ${day} (
            id int NOT NULL,
            doctorId int NOT NULL,
            status int,
            default_status int,
            CONSTRAINT ${day}_pk PRIMARY KEY (id, doctorId)
          );
        `
        await mysqlPool.query(createDay)
      }

      await mysqlPool.query(`
        CREATE TABLE doctors (
          id int primary key,
          name varchar(50),
          monday bool,
          tuesday bool,
          wednesday bool,
          thursday bool,
          friday bool,
          saturday bool
        );
      `)

      const doctors = [
        {
          id: 1,
          name: 'Amy'
        },
        {
          id: 2,
          name: 'Audrie'
        },
        {
          id: 3,
          name: 'Bruce'
        },
        {
          id: 4,
          name: 'Camille'
        },
        {
          id: 5,
          name: 'Mindy'
        },
        {
          id: 6,
          name: 'Nicole'
        },
      ]

      for (const doctor of doctors) {
        const createDoctor = `
          INSERT INTO doctors
          VALUES (
            ${doctor.id},
            '${doctor.name}',
            true,
            true,
            true,
            true,
            true,
            true
          )
        `

        await mysqlPool.query(createDoctor)

        let i = 1
        while (i <= numTimes) {
          for (const day of weekdayList) {
            const createTime = `
              INSERT INTO ${day} (
                id,
                doctorId,
                status,
                default_status
              ) VALUES (
                ${i},
                ${doctor.id},
                0,
                0
              )
            `
            await mysqlPool.query(createTime)
          }
          i++
        }
      }
      res.status(200).send('Success')
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.get('/destroy', async (req, res) => {
    try {
      for (const day of weekdayList) {
        const dropDay = `
          DROP TABLE IF EXISTS ${day};
        `
        await mysqlPool.query(dropDay)
      }

      await mysqlPool.query(`
        DROP TABLE IF EXISTS doctors;
      `)

      res.status(200).send('Success')
    } catch (e) {
      res.status(500).send(e)
    }
  })

  return router
}

export default wrapper
