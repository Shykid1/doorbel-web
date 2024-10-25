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
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const baseUrl = process.env.BASE_URL;

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      console.log(result);

      if (result.data) {
        localStorage.setItem("token", result.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[600px] border p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign in</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
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
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <Button type="submit" className="mt-4">
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
