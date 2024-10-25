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
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const baseUrl = process.env.BASE_URL;
  const navigate = useNavigate();
  const onSubmit = async (data: SignUpForm) => {
    try {
      const processedData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error("An error occurred while signing up");
      }

      navigate("/auth/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-[800px] min-w-[500] flex flex-col border p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.fullName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.phone?.message}
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password again"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirmPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <Button type="submit" className="mt-4 gap-2">
                {form.formState.isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : null}
                Sign up
              </Button>
            </div>
          </form>
        </Form>
        <div className="text-center w-full">
          <p className="mt-4 text-muted-foreground">
            Already have an account?{" "}
            <Button
              onClick={() => {
                navigate("/auth/signin");
              }}
              className="text-blue-500 bg-transparent hover:bg-transparent"
            >
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
