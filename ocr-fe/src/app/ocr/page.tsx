'use client'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FormEvent, useEffect, useState} from "react";
import {isApiError, uploadImage} from "@/app/server";


export default function Ocr() {
    const [resultText, setResultText] = useState<string>();
    const [error, setError] = useState<Error>();
    if (resultText) {
        return <div>
            <OcrResponse res={resultText}></OcrResponse>
            <Button onClick={() => setResultText(undefined)}>Upload Another Image</Button>
        </div>
    }
    return <div className="w-100">
        <Upload setResultText={setResultText} setError={setError}></Upload>
        {error && <ErrorDisplay error={error}></ErrorDisplay>}
    </div>
}


function Upload({setResultText, setError}: { setResultText: (s: string) => void, setError: (e?: Error) => void }) {
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
        <Input type="file" id="uploaded-image" required={true} name="file" onChange={() => setError()} aria-label="image-input"
               accept=".png,.jpg,.jpeg"/>
        <Button>Upload Image</Button>
    </form>
}

function OcrResponse({res}: { res: string }) {
    return <div>
        <h2>Here is the analysed text</h2>
        <p> {res}</p>
    </div>
}

function ErrorDisplay({error}: { error: Error }) {
    useEffect(() => {
        !isApiError(error) && console.log(error)
    }, [error]);
    if (isApiError(error)) {
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