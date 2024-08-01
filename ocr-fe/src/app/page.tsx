'use client'

import {LoadingSpinner} from "@/components/ui/loadSpinner";
import {getVersion} from "@/app/server";
import {useEffect, useState} from "react";

export default function Home() {

    return <main>
        <h1>Welcome To OCR Uploader</h1>
        <Version></Version>
    </main>
}


function Version() {
    const [version, setVersion] = useState<string>();
    useEffect(() => {
        getVersion()
            .then(setVersion)
    }, []);
    if (version) {
        return <h2>Current Version: {version}</h2>
    }
    return <div><p>Connecting to server, please wait </p><LoadingSpinner/></div>
}
