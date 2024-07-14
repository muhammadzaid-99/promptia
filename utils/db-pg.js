import pg from 'pg'
const { Pool, Client } = pg

// const pool = new Pool({
//     connectionString: process.env.PG_CONN_STRING
// })

const pool = new Pool({
    user: "avnadmin",
    password: process.env.PG_PASSWORD,
    host: "pg-bce0720-promptia.i.aivencloud.com",
    port: 25594,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUR30OjZNNjZpko+0L9oI4XH2y8DEwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZjg3NDViYWMtZWYwNS00NTdhLWI2MzUtMzVmZGM4ZDNk
Y2Y0IFByb2plY3QgQ0EwHhcNMjQwNzEyMTkyMDM1WhcNMzQwNzEwMTkyMDM1WjA6
MTgwNgYDVQQDDC9mODc0NWJhYy1lZjA1LTQ1N2EtYjYzNS0zNWZkYzhkM2RjZjQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKUwILQT
HG39HK5YcvN0ow68HPj8RbkUMGn5Em0OxZwi2nXK02xAfLTJ5fZ3/3PZS3v9DMrR
zV6o1GS8csE4bNmnuJVK0CzdavdlxDMod4LH0CSAYjoIt7bMkthWm3kBwu/iby0n
OcwmGl4qVUvasIGDZQkNveosgPx8W+w5x36wa0WU+H+XCq3LYKmQYTEBiBDyOaYN
LbN/ZrPUzkHlkQRqMj4XxAZN4mjShhz+OPXXbkDdWaMYOwYoSQzucuTMqiaRO+aE
sLoTt1Ml1V3rxNE+IFMaitOiQPvDrMgAUMzbUjCECTYX3iWsfG5NOwgBvg0szc4a
A/1Simut9Mzrjq8Fz9kLi5iWINVqL02EGZ3Wt6ar5iH9+auvyRiRmBS1KWrgfCXS
eITsaCY5wY2zdNw70LKspIMcTghU9cb8IuH6gVR0f81LdBNTC2KJM1cOX6YcAEK/
CfxYmlFv9FHHwaYTMqsdgkxVa1n0d7dH2OPMJA71xOsfRKvGxt7SlfX7PwIDAQAB
oz8wPTAdBgNVHQ4EFgQUrlAleMmAumHZzCMBodsBnjmuPecwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBADwR48URRe1QTldS
1Y8KoajacIpXdh99wYA1XrsbA+3h0LnwIPlXAuVS5kClagutUgN/WGJILGMvw2iD
AhBcUbvV+LngHEj7VqE7FTCnULeF8CoVEIliU8ShXJg42vbipnUgS/UgfDRULlJG
KlaPNMjd52AqzLG70V2MB1rg+FpWDsK+MzgXwrb3YAwg8DtCh8P6nLgENZOAsmpm
U67fJTqWDVwqB2tgYsFhcZ9xwBaSUj0bqBx8MsEahD0iJUHFCEBAOx69BUtWIDqQ
CLQzTFKLNEn0KBvz3OVbM9t2tgQ/ENYT9sXMKLnVnLkAHfs7mRdox+A2CZWIv9QI
iIWok+r4WgQ7Cs/s7H6nQpDFLcUGYnkvxMP3CqY39mSJm/2J0BiZ62OKtqRVuWI6
Tfog2zhotm7dOGwBUFa3ITrB9MjzPAjPXqoYv/AyGJEzgGfGGo3z1I2ZZHBLfhJy
JHMFhykcU2ru+setHuSffU/XFUMa5adaMgmXCsFqUejIipvfAw==
-----END CERTIFICATE-----`,
    },
})


// module.exports = {
// dbQuery: (text, params) => pool.query(text, params)
// };

export const dbQuery = async (text, params) => pool.query(text, params)
