'use client'

import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {isApiError} from "@/app/server";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import UploadDialogue from "@/app/ocr/uploadDialogue";
import OcrResult from "@/app/ocr/ocrResult";


export default function Ocr() {
    const [resultText, setResultText] = useState<string>();
    const [error, setError] = useState<Error>();
    if (resultText) {
        return <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Your image was successfully processed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-10">
                <OcrResult res={resultText}></OcrResult>
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
            <UploadDialogue setResultText={setResultText} setError={setError}></UploadDialogue>
            {error && <div className="space-y-10"><ErrorDisplay error={error}></ErrorDisplay></div>}
        </CardContent>
    </Card>
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