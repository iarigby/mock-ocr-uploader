import React, {FormEvent} from "react";
import {uploadImage} from "@/app/server";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function UploadDialogue({setResultText, setError}: {
    setResultText: (s: string) => void,
    setError: (e?: Error) => void
}) {
    function setResult(result: string, event: FormEvent<HTMLFormElement>) {
        setResultText(result)
        setError()
        // @ts-ignore
        event.target.reset()
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        uploadImage(formData)
            .then((result) => setResult(result, event))
            .catch(setError)
    }

    return <form onSubmit={onSubmit}>
        <Input type="file" id="uploaded-image" required={true} name="file" onChange={() => setError()}
               aria-label="image-input"
               accept=".png,.jpg,.jpeg"/>
        <div className="flex justify-end mt-7">
            <Button>Upload Image</Button>
        </div>
    </form>
}