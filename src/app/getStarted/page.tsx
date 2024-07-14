"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { useToast } from '@/components/ui/use-toast'
import {auth} from '../firebase/config'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,setPersistence,browserLocalPersistence} from 'firebase/auth'
import { PasswordInput } from '@/components/ui/PasswordInput'


const page = () => {


    const [email,setEmail] = React.useState<string|null>();
    const [password,setPassword] = React.useState<string|null>();
    const [showPassword,setShowPassword] = React.useState<boolean>(false);
    // const [error,setError] = React.useState<string|null>();
    // const [errorMessage,setErrorMessage] = React.useState<string|null>();
    const { toast } = useToast();    

    const Router = useRouter();

    function handleEmailChange (event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePasswordChange (event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    interface Data{
        title:string,
        message:string,
    }

    const handleLogin = async (): Promise<Data> => {
        if (email && password) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                setPersistence(auth, browserLocalPersistence);
                const user = userCredential.user;
                const data: Data = {
                    title: "Success",
                    message: "Signed In Successfully",
                };
                return data;
            } catch (error:any) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const data: Data = {
                    title: "Failed",
                    message: `Sign-In Failed: ${errorMessage}`,
                };
                return data;
            }
        } else {
            const data: Data = {
                title: "Failed",
                message: "Sign-In Failed: Email or Password is Empty",
            };
            return Promise.resolve(data);
        }
    };

    const handleSignup = async (): Promise<Data> => {
        if (email && password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const data: Data = {
                    title: "Success",
                    message: "Account Created Successfully",
                };
                return data;
            } catch (error:any) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const data: Data = {
                    title: "Failed",
                    message: `Sign-Up Failed: ${errorMessage}`,
                };
                return data;
            }
        } else {
            const data: Data = {
                title: "Failed",
                message: "Sign-Up Failed: Email or Password is Empty",
            };
            return Promise.resolve(data);
        }
    };
    
    const user = auth.currentUser;
    console.log(user);
    if(user){
        Router.push('/dashboard')
    }

  return (
    <div className='flex items-center justify-center h-screen'>

    <Tabs  className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className='border-r-2 hover:bg-neutral-300' value="SignIn">Sign In</TabsTrigger>
        <TabsTrigger className='border-l-2 hover:bg-neutral-300' value="SignUp">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="SignIn">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Sign in with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" onChange={handleEmailChange} placeholder='flyingjatt@gmail.com'  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password"  type="password" onChange={handlePasswordChange} placeholder='Enter your Password'  />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={ async()=>{
                    const Data:Data = await handleLogin();
                    toast({
                    title: Data.title,
                    description: Data.message,            
                     })
                    Router.push('/dashboard')
                    }}
                      >Sign In
                      </Button>
          </CardFooter>
        </Card>
        </TabsContent>
        <TabsContent value="SignUp">
            <Card>
            <CardHeader>
                <CardTitle>Greetings!</CardTitle>
                <CardDescription>
                Create a new Account.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" onChange={handleEmailChange} placeholder='tylerdurden@gmail.com' type="email" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password"  type="password" onChange={handlePasswordChange} placeholder='Enter your Password'  />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={async()=>{
               
                    const Data:Data = await handleSignup();
                    toast({
                        title: Data.title,
                        description: Data.message,            
                         })}}
                 
                   >Sign Up</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>

    </div>
  )
}

export default page