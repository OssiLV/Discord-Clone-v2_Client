import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ChannelType } from "@/types/type-models";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Hash, Mic, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServerWithChannelsMembers } from "@/types/type-custom";
import { useDataState } from "@/hooks/use-state-store";

const formSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Channel name is required.",
        })
        .refine((name) => name !== "general", {
            message: "Channel name cannot be 'general'",
        }),
    type: z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
    const { setData } = useDataState();
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "createChannel";

    const { channelType, server } = data as {
        channelType: ChannelType;
        server: ServerWithChannelsMembers;
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channelType || ChannelType.TEXT,
        },
    });

    useEffect(() => {
        if (channelType) {
            form.setValue("type", channelType);
        } else {
            form.setValue("type", ChannelType.TEXT);
        }
    }, [channelType, form]);

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const serverId = server.id;
            const data = { ...values, serverId };

            const response = await axios.post("/channels", data);
            setData("newChannel", response.data);
            // console.log(response.data);

            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Channel type
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem
                                                    className={cn(
                                                        "flex items-center space-x-3 space-y-0 p-2 py-[10px] group bg-zinc-100 rounded-sm hover:bg-zinc-200 transition ",
                                                        field.value ===
                                                            "TEXT" &&
                                                            "bg-zinc-200",
                                                    )}
                                                >
                                                    <FormLabel className="cursor-pointer font-normal flex-1">
                                                        <div className="flex items-center gap-4">
                                                            <Hash
                                                                className={cn(
                                                                    "h-6 w-6 text-zinc-400 group-hover:text-zinc-500 transition",
                                                                    field.value ===
                                                                        "TEXT" &&
                                                                        "text-zinc-500",
                                                                )}
                                                            />
                                                            <div className="flex flex-col gap-1">
                                                                <p className="text-base font-normal">
                                                                    Text
                                                                </p>
                                                                <p className="text-zinc-500 text-xs">
                                                                    Send
                                                                    messages,
                                                                    images,
                                                                    GIFs, emoji,
                                                                    opinions and
                                                                    puns
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl className="flex items-center justify-center p-2">
                                                        <RadioGroupItem value="TEXT" />
                                                    </FormControl>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex items-center space-x-3 space-y-0 p-2 py-[10px] group bg-zinc-100 rounded-sm hover:bg-zinc-200 transition ",
                                                        field.value ===
                                                            "AUDIO" &&
                                                            "bg-zinc-200",
                                                    )}
                                                >
                                                    <FormLabel className="cursor-pointer font-normal flex-1">
                                                        <div className="flex items-center gap-4">
                                                            <Mic
                                                                className={cn(
                                                                    "h-6 w-6 text-zinc-400 group-hover:text-zinc-500 transition",
                                                                    field.value ===
                                                                        "AUDIO" &&
                                                                        "text-zinc-500",
                                                                )}
                                                            />
                                                            <div className="flex flex-col gap-1">
                                                                <p className="text-sm font-normal">
                                                                    AUDIO
                                                                </p>
                                                                <p className="text-zinc-500 text-xs">
                                                                    Hang out
                                                                    together
                                                                    with voice
                                                                    and video
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl className="flex items-center justify-center p-2">
                                                        <RadioGroupItem value="AUDIO" />
                                                    </FormControl>
                                                </FormItem>

                                                <FormItem
                                                    className={cn(
                                                        "flex items-center space-x-3 space-y-0 p-2 py-[10px] group bg-zinc-100 rounded-sm hover:bg-zinc-200 transition ",
                                                        field.value ===
                                                            "VIDEO" &&
                                                            "bg-zinc-200",
                                                    )}
                                                >
                                                    <FormLabel className="cursor-pointer font-normal flex-1">
                                                        <div className="flex items-center gap-4">
                                                            <Video
                                                                className={cn(
                                                                    "h-6 w-6 text-zinc-400 group-hover:text-zinc-500 transition",
                                                                    field.value ===
                                                                        "VIDEO" &&
                                                                        "text-zinc-500",
                                                                )}
                                                            />
                                                            <div className="flex flex-col gap-1">
                                                                <p className="text-base">
                                                                    VIDEO
                                                                </p>
                                                                <p className="text-zinc-500">
                                                                    Hang out
                                                                    together
                                                                    with voice
                                                                    and video
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl className="flex items-center justify-center p-2">
                                                        <RadioGroupItem value="VIDEO" />
                                                    </FormControl>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Channel name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter channel name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
