'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})

type CreatePostFormState = {
    slug?: string
    errors: {
        title?: string[],
        content?: string[]
        _form?: string[]
    }
}

export async function createPost(formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })

    if(!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    const session = await auth()

    if(!session?.user) {
        return { errors: {_form: ['You must be signed in to do this']}}
    }

    let post: Post
    try {
        const user = session.user as unknown as { id: string }
        const topic = await db.topic.findFirst({ where: {
            slug: formState.slug
        }})

        if(!topic) {
            return { errors: {_form: ['Topic not found']}}
        }

        const postToCreate = result.data
        post = await db.post.create({
            data: { 
                title: postToCreate.title,
                content: postToCreate.content,
                userId: user.id,
                topicId: topic.id
            }
        })
    } catch(err: unknown) {
        console.error(err)
        return { errors: { _form: ['Failed to save post'] }}
    }
    revalidatePath(paths.home())
    redirect(paths.postShow(formState.slug!, post.id))
}