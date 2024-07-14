import { dbQuery } from "@utils/db-pg"

export const GET = async (req, { params }) => {
    const userId = params.id

    try {
        const user = await dbQuery(`
            SELECT name, picture_url, email, id as userid
            FROM users
            WHERE id = ${userId}
    `)

        const data = user.rows[0]

        // return Response.json({data})
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
