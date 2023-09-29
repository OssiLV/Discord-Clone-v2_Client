import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import AuthLayout from "./Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const formSchema = z.object({
    email: z.string().email().min(2).max(100),
    password: z.string().min(4).max(50),
});

const SignIn = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response_1 = await axios.post("/auth/sign-in", values);
        const accessToken: string = response_1.data.access_token;

        const response_2 = await axios.get("/auth/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const expirationDate = new Date(response_2.data.exp * 1000);
        const formattedExpirationDate = expirationDate.toLocaleString("en-US"); // Convert to a formatted string

        Cookies.set("access-token", accessToken, {
            expires: new Date(formattedExpirationDate),
        });

        return window.location.assign("/");
    }
    return (
        <AuthLayout>
            <div className="w-72">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ex: ossilv@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="***********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" fullWidth>
                            Login
                        </Button>
                    </form>
                </Form>

                <Link
                    to={"/sign-up"}
                    className="text-sm text-primary hover:underline transition"
                >
                    Go to Sign Up
                </Link>
            </div>
        </AuthLayout>
    );
};

export default SignIn;
