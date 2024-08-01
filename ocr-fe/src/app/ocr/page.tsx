'use client'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import React, {FormEvent, useEffect, useState} from "react";
import {isApiError, uploadImage} from "@/app/server";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import IconClipboard from "@/components/ui/icons/clipboard";
import IconDone from "@/components/ui/icons/done";


export default function Ocr() {
    const [resultText, setResultText] = useState<string>();
    const [error, setError] = useState<Error>();
    if (resultText) {
        return <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Your image was successfully processed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-10">
                <OcrResponse res={resultText}></OcrResponse>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={() => setResultText(undefined)}>Upload Another Image</Button>
            </CardFooter>
        </Card>
    }
    return <Card className="w-[400px]">
        <CardHeader>
            <CardTitle>Try Out OCR Cloud</CardTitle>
        </CardHeader>
        <CardContent>
            <Upload setResultText={setResultText} setError={setError}></Upload>
            {error && <div className="space-y-10"><ErrorDisplay error={error}></ErrorDisplay></div>}
        </CardContent>
    </Card>
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
        <Input type="file" id="uploaded-image" required={true} name="file" onChange={() => setError()}
               aria-label="image-input"
               accept=".png,.jpg,.jpeg"/>
        <div className="flex justify-end mt-7">
            <Button>Upload Image</Button>
        </div>
    </form>
}

function OcrResponse({res}: { res: string }) {
    return <div>
        <h2>Here is the analysed text</h2>
        <Alert>
            <AlertTitle className="flex justify-between">
                <div className="my-auto">{res}</div>
                <CopyToClipBoard text={res}></CopyToClipBoard>
            </AlertTitle>
        </Alert>
    </div>
}

function CopyToClipBoard({text}: { text: string }) {
    const [copied, setCopied] = useState<boolean>(false)
    if (copied) {
        return <Button variant='outline'><IconDone/></Button>
    }
    return <Button variant='outline' className="justify-self-end"
                   onClick={() => {
                       navigator.clipboard.writeText(text)
                       setCopied(true)
                   }}>
        <IconClipboard/>
    </Button>
}

function ErrorDisplay({error}: { error: Error }) {
    useEffect(() => {
        !isApiError(error) && console.log(error)
    }, [error]);
    if (isApiError(error)) {
        return <Alert variant="destructive" className="mt-7">
            <AlertTitle>Your image is invalid</AlertTitle>
            <AlertDescription>
                {error.message}. Please Select Another Image
            </AlertDescription>
        </Alert>
    }

    return <Alert variant="destructive">
        <AlertDescription>Unknown Error occurred, please try again</AlertDescription>
    </Alert>
}