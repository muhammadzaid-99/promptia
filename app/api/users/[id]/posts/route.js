import { dbQuery } from "@utils/db-pg"

export const GET = async (req, { params }) => {
    const userId = params.id

    try {
        const prompts = await dbQuery(`
            SELECT p.id, p.prompt, p.tag, u.name, u.picture_url, u.email, u.id as userid
            FROM prompts p
            JOIN users u ON p.user_id = u.id
            WHERE u.id = ${userId}
            LIMIT 1000
    `)
        // const prompts = await dbQuery('SELECT * FROM prompts WHERE user_id = $1', [userId])

        const data = prompts.rows

        // return Response.json({data})
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
