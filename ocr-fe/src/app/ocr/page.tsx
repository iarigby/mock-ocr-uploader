'use client'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FormEvent, useState} from "react";
import {uploadImage} from "@/app/server";
import {router} from "next/client";


export default function Ocr() {
    const [resultText, setResultText] = useState<string>();
    const [error, setError] = useState<Error>();
    if (resultText) {
        return <div>
            <OcrResponse res={resultText}></OcrResponse>
            <Button onClick={() => router.reload()}>Upload Another Image</Button>
        </div>
    }
    return <div>
        {error && <ErrorDisplay error={error}></ErrorDisplay>}
        <Upload setResultText={setResultText} setError={setError}></Upload>
    </div>
}


function Upload({setResultText, setError}: {setResultText: (s: string) => void, setError: (e: Error) => void}) {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        uploadImage(formData).then(setResultText).catch(setError)
    }

    return <form onSubmit={onSubmit}>
        <Input type="file" name="image" aria-label="image-input" accept=".png,.jpg,.jpeg"/>
        <Button>Upload Image</Button>
    </form>
}

function OcrResponse({res}: {res: string}) {
    return <div>
        <h2>Here is the analysed text</h2>
        <p> {res}</p>
    </div>
}

function ErrorDisplay({error}: { error: Error }) {
    if ('status' in error && error.status == 400) {
        return <div>
            <h2>Your image is invalid</h2>
            <p>{error.message}</p>
            <p>Please Select Another Image</p>
        </div>
    }
    return <div>
        <p>Unknown Error occurred, please try again</p>
    </div>
}