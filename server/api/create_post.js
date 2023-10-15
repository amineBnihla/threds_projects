import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = readBody(event)
    const post  = await prisma.post.create({
        data:{
            userId: body.userId,
            name: body.name,
            image: body.image,
            text: body.text,
            picture: body.picture
        }
    })
    return post
})