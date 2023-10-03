import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "../actions/emoji-picker";

import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
interface ConversationFooterProps {
    type: "conversation" | "channel";

    name: string;
    setMessage: (body: any) => void;
}

const formSchema = z.object({
    content: z.string().min(1),
});

const ConversationFooter = ({
    type,
    name,

    setMessage,
}: ConversationFooterProps) => {
    const { serverId, channelId } = useParams();
    const token = Cookies.get("access-token");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const socket = io("ws://localhost:80/", {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });

            socket.emit("chat", {
                serverId,
                channelId,
                content: values.content,
            });
            form.reset();
            socket.on(`chat:channel:${channelId}`, (body: any) => {
                setMessage(body);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4">
                                    <button
                                        type="button"
                                        // onClick={() =>
                                        //     onOpen("messageFile", {
                                        //         apiUrl,
                                        //         query,
                                        //     })
                                        // }
                                        className="absolute top-7 left-8 h-[20px] w-[20px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        autoFocus
                                        className="px-14 py-4 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                        placeholder={`Message ${
                                            type === "conversation"
                                                ? name
                                                : "#" + name
                                        }`}
                                        {...field}
                                    />
                                    <div className="absolute top-6 right-8 ">
                                        <EmojiPicker
                                            onChange={(emoji: string) =>
                                                field.onChange(
                                                    `${field.value} ${emoji}`,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default ConversationFooter;
