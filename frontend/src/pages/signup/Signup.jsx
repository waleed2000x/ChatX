import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { useAuthContext } from "@/context/authContext";
import { useState } from "react";

const FormSchema = z
  .object({
    fullname: z
      .string()
      .min(2, { message: "Fullname must be at least 2 characters." }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .trim()
      .regex(/^[^ ]*?[^ ]+$/, "Username cannot contain spaces."),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string(),
    gender: z.string().min(2, { message: "Gender must be specified." }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
  });
  function onSubmit(data) {
    axios
      .post("http://localhost:3000/api/auth/signup", { ...data })
      .then((response) => {
        setLoading(true);
        const { id, fullname, username, gender, profilePic } = response.data;
        const USER = {
          id,
          fullname,
          username,
          gender,
          profilePic,
        };
        localStorage.setItem("chat-user", JSON.stringify(USER));
        console.log(response.data);
        const succes_message = response.data.message;
        console.log(succes_message);
        setAuthUser(USER);
        toast({
          title: "You have been signed in",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{succes_message}</code>
            </pre>
          ),
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Encountered an Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{err.response.data.message}</code>
            </pre>
          ),
        });
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="signup-parent">
      <Toaster />
      <h1>Signup</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="Fullname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
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
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Gender:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link to="/login">
            <FormDescription>Already have an Account?</FormDescription>
          </Link>
          {loading ? (
            <Button type="submit" disabled>
              Submitting...
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </div>
  );
}
