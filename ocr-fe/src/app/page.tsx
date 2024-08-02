'use client'

import {LoadingSpinner} from "@/components/ui/loadSpinner";
import {getVersion} from "@/app/server";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Alert} from "@/components/ui/alert";

export default function Home() {

    return <main>
        <h1>Welcome To OCR Uploader</h1>
        <Version></Version>
    </main>
}


function Version() {
    const [version, setVersion] = useState<string>();
    const [error, setError] = useState<Error>();
    useEffect(() => {
        setTimeout(() => getVersion()
            .then(setVersion)
            .catch(setError), 3000)

    }, []);
    if (error)
        return <Alert variant='destructive'>{error.message}</Alert>
    if (version) {
        return <div>
            <h2>Current Version: {version}</h2>
            <Link href={'/ocr'}><Button>Start Scanning</Button></Link>
        </div>
    }
    return <div><p>Connecting to server, please wait </p><LoadingSpinner/></div>
}
