"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function AddCardDialog() {
    const [question, setQuestion] = useState("");

    return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Add Flashcard</Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>New Flashcard</DialogTitle>
            </DialogHeader>
            <textarea className="w-full border rounded p-2"
            placeholder="Enter Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            />
            <Button><AddCardDialog /></Button>
        </DialogContent>
    </Dialog>        
)
}