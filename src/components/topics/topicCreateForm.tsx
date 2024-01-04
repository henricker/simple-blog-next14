'use client';
import { createTopic } from "@/actions";
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../common/formButton";


export default function TopicCreateForm() {
 
    const [formState, action] = useFormState(createTopic, {errors: {} })

    return <Popover placement="left">
        <PopoverTrigger>
            <Button variant="solid" color="primary">New topic</Button>
        </PopoverTrigger>
        <PopoverContent>
            <form className="flex flex-col gap-4 p-4 w-80" action={action}>
                <h3 className="text-lg">Create a topic</h3>
                <Input label="Name" labelPlacement="outside" placeholder="Name" name="name" isInvalid={!!formState.errors?.name} errorMessage={formState.errors.name?.join(', ')}/>
                <Textarea label="Description" labelPlacement="outside" placeholder="Describe your topic" name="description"  isInvalid={!!formState.errors?.description} errorMessage={formState.errors.description?.join(', ')}/>
                {formState.errors?._form && formState.errors._form.map((error) => <p key={error} className="text-xs text-red-600">{error}</p>)}
               <FormButton>Save</FormButton>
            </form>
        </PopoverContent>
    </Popover>
}