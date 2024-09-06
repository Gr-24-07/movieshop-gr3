import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FormComponent from "@/components/ui/form";
import { Plus } from 'lucide-react';

export default function AddMovie() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-none"><Plus className="h-5 w-5" />Add Movie</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-none">
                <div className="w-full">
                    <FormComponent />
                </div>
            </DialogContent>
        </Dialog>
    )
}
