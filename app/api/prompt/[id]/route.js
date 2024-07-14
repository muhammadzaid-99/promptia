import { dbQuery } from "@utils/db-pg";

export const GET = async (request, { params }) => {
    try {
        const prompt = await dbQuery(`
            SELECT id, prompt, tag, user_id
            FROM prompts
            WHERE id = ${params.id}
    `)

        if (!prompt.rowCount)
            return new Response('Prompt Not Found!', { status: 404 })

        const data = prompt.rows[0]

        // return Response.json({data})
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag, userId } = await request.json();

    try {

        const updatePrompt = await dbQuery('UPDATE prompts SET prompt = $1, tag = $2 WHERE id = $3 AND user_id=$4', [prompt, tag, params.id, userId])

        return new Response("Successfully updated the Prompt", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {

        const remove = dbQuery('DELETE FROM prompts WHERE id=$1', [params.id])

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};