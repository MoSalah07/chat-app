"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Icons
import { BsGithub, BsGoogle } from "react-icons/bs";
// Libs
import { handleErrorsClient } from "@/app/libs/handleErrors";
// Components
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";

type Varient = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const session = useSession();
  const [varient, setVarient] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      return redirect(`/users`);
    }
  }, [session?.status, redirect]);

  const toggleVarient = useCallback(() => {
    if (varient === "LOGIN") {
      setVarient("REGISTER");
    } else {
      setVarient("LOGIN");
    }
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (varient === "REGISTER") {
      try {
        const { data: user } = await axios.post(`/api/register`, data);
        if (user.success) {
          toast.success(user.message);
          setVarient("LOGIN");
          reset();
          return data;
        } else {
          toast.error("Something went wrong");
        }
      } catch (err: any) {
        console.log(err);
        console.log(handleErrorsClient(err));
        toast.error(handleErrorsClient(err));
        return err;
      } finally {
        setIsLoading(false);
      }
    }

    if (varient === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error(`invalid credentials`);
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully");
            reset();
            return redirect(`/users`);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth Social Sign In
    signIn(action, { redirect: false })
      .then((callback) => {
        console.log(callback);
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {varient === "REGISTER" && (
            <Input
              id="userName"
              type="text"
              label="User Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {varient === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          {/* Social Icons */}
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {varient === "LOGIN"
                ? "New to Messenger?"
                : "Already have an account?"}
            </div>
            <div
              className="underline cursor-pointer z-0"
              onClick={toggleVarient}
            >
              {varient === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
