'use server'; 
import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import type { Topic } from '@prisma/client';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Must be lowercase letters or dashes without spaces'}),
    description: z.string().min(10)
})

type CreateTopicFormState = {
    errors: {
        name?: string[],
        description?: string[]
        _form?: string[]
    }
}

export async function createTopic(formState: CreateTopicFormState,formData: FormData): Promise<CreateTopicFormState> {
    const validate = createTopicSchema.safeParse({ name: formData.get('name'), description: formData.get('description') })

    if(!validate.success) {
        return { errors: validate.error.flatten().fieldErrors }
    }

    const session = await auth()

    if(!session?.user) {
        return { errors: {_form: ['You must be signed in to do this']}}
    }

    let topic: Topic
    try {
        const topicToCreate = validate.data
        topic = await db.topic.create({
            data: { 
                slug: topicToCreate.name,
                description: topicToCreate.description
            }
        })
    } catch(err: unknown) {
        console.error(err)
        return { errors: { _form: ['Failed to save topic'] }}
    }
    revalidatePath(paths.home())
    redirect(paths.topicShow(topic.slug))
}