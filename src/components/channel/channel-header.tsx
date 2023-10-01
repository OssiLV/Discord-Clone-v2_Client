import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Member, Server } from "@/types/type-models";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import ChannelActions from "./channel-actions";

interface SearchProps {
    typeSearch: "DIRECT-MESSAGES" | "SERVERS";
    currentServer: Server;
    currentMember: Member | undefined;
    dataSearch: {
        label: string;
        type: "channel" | "member";
        data:
            | {
                  icon: React.ReactNode;
                  name: string;
                  id: string;
              }[]
            | undefined;
    }[];
}

const ChannelHeader = ({
    typeSearch,
    currentServer,
    currentMember,
    dataSearch,
}: SearchProps) => {
    const navigate = useNavigate();
    const { serverId } = useParams();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const onClick = ({
        id,
        type,
    }: {
        id: string;
        type: "channel" | "member";
    }) => {
        setOpen(false);

        if (type === "member") {
            return navigate(`/${serverId}/${id}`);
        }

        if (type === "channel") {
            return navigate(`/${serverId}/${id}`);
        }
    };

    if (typeSearch === "DIRECT-MESSAGES") {
        return (
            <div className="px-[10px]">
                <button
                    onClick={() => setOpen(true)}
                    className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                        Search
                    </p>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                        <span className="text-xs">Ctrl K</span>
                    </kbd>
                </button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Search all channels and members" />
                    <CommandList>
                        <CommandEmpty>No Results found</CommandEmpty>
                        {dataSearch.map(({ label, type, data }) => {
                            if (!data?.length) return null;

                            return (
                                <CommandGroup key={label} heading={label}>
                                    {data?.map(({ id, icon, name }) => {
                                        return (
                                            <CommandItem
                                                key={id}
                                                onSelect={() =>
                                                    onClick({ id, type })
                                                }
                                            >
                                                {icon}
                                                <span>{name}</span>
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            );
                        })}
                    </CommandList>
                </CommandDialog>
            </div>
        );
    }

    return (
        <>
            <ChannelActions
                currentServer={currentServer}
                currentMember={currentMember as Member}
            />
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty>No Results found</CommandEmpty>
                    {dataSearch.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => {
                                    return (
                                        <CommandItem
                                            key={id}
                                            onSelect={() =>
                                                onClick({ id, type })
                                            }
                                        >
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        );
                    })}
                </CommandList>
            </CommandDialog>
        </>
    );
};

export default ChannelHeader;
