import { dbQuery } from "@utils/db-pg"

export const POST = async (req) => {
    const { prompt, tag, userId } = await req.json()
    
    try {
        const newPrompt = await dbQuery('INSERT INTO prompts (prompt, tag, user_id) VALUES ($1, $2, $3) RETURNING *', [prompt, tag, userId])
        
        return new Response(JSON.stringify(newPrompt.rows[0]), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500})
    }
}
