import ServerHeader from "./server-header";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NavigationItem } from "@/components/navigation/navigation-item";
import ServerFooter from "./server-footer";
import axios from "axios";
import { Server } from "@/types/type-models";
import { useEffect, useState } from "react";
import { useDataState } from "@/hooks/use-state-store";
import { Loader2 } from "lucide-react";

const ServerSideBar = () => {
    const [servers, setServer] = useState<Server[]>([]);
    const { type, data, flush } = useDataState();

    useEffect(() => {
        axios.get("/servers").then((res) => {
            setServer(res.data);
        });
    }, []);

    useEffect(() => {
        if (type === "newServer" && data) {
            setServer([data, ...servers]);
        }
        flush();
    }, [type]);

    return (
        <div className="flex flex-col h-full py-2 w-16 items-center text-primary dark:bg-[#2B2D31] bg-zinc-200">
            <ServerHeader />
            <Separator className="h-[1.8px] w-[28px] my-2 bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto" />
            <ScrollArea className="flex-1 my-2">
                {servers.map((server) => (
                    <div key={server.id} className="mb-[10px]">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
                <ServerFooter />
                {servers.length === 0 && (
                    <div className="flex justify-center">
                        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default ServerSideBar;
