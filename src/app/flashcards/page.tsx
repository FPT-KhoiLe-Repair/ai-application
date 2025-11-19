import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FlashcardPage() {
    return (
        <div className="p-10 max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold"> AI FlashCards</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Flashcards</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="border p-4 rounded-lg">
                    <p className="text-lg font-medium">What is closure in JavaScript?</p>
                    <p className="text-sm text-muted-foreground">
                        → A closure is a function that retains access to its lexical scope even when the function is executed outside that scope.
                    </p>
                    </div>
                    <Button>Add Flashcard</Button>
                </CardContent>
            </Card>
        </div>
    )
}