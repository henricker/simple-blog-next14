'use client'

import { createPost } from "@/actions"
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react"

import { useFormState } from "react-dom"
import FormButton from "../common/formButton"

type PostCreateFormProps = {
    slug: string
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
    const [formState, action] = useFormState(createPost, { slug, errors: {} })
    return <Popover placement="left">
    <PopoverTrigger>
        <Button variant="solid" color="primary">New Post</Button>
    </PopoverTrigger>
    <PopoverContent>
        <form className="flex flex-col gap-4 p-4 w-80" action={action}>
            <h3 className="text-lg">Create a Post</h3>
            <Input label="Title" labelPlacement="outside" placeholder="Title" name="title" isInvalid={!!formState.errors?.title} errorMessage={formState.errors.title?.join(', ')}/>
            <Textarea label="Content" labelPlacement="outside" placeholder="Write your post" name="content"  isInvalid={!!formState.errors?.content} errorMessage={formState.errors.content?.join(', ')}/>
            {formState.errors?._form && formState.errors._form.map((error) => <p key={error} className="text-xs text-red-600">{error}</p>)}
           <FormButton>Save</FormButton>
        </form>
    </PopoverContent>
</Popover>
}