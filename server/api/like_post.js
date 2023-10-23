import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    const post  = await prisma.post.create({
        data:{
            name: body.name,
            image: body.image,
            text: body.text,
            picture: body.picture,
            userId: body.userId,
        }
    })
    return post
})