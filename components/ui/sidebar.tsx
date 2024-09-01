import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import Link from "next/link";
import { } from 'lucide-react';


const Sidebar = () => {
    return (
        <Command className="">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>
                        <Link href='/'>Dashboard</Link>
                    </CommandItem>
                    <CommandItem>
                        <Link href='/orders'>Orders</Link>
                    </CommandItem>
                    <CommandItem>
                        <Link href='/users'>Users</Link>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>

    );
}

export default Sidebar;