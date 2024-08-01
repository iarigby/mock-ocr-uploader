import {Alert, AlertTitle} from "@/components/ui/alert";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import IconDone from "@/components/ui/icons/done";
import IconClipboard from "@/components/ui/icons/clipboard";

export default function OcrResult({res}: { res: string }) {
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
