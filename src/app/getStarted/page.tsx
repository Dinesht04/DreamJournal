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
import {auth,googleProvider} from '../firebase/config'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,setPersistence,browserLocalPersistence,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Separator } from '@/components/ui/separator'
import { IconBrandGoogle } from '@tabler/icons-react'


const page = () => {


    const [email,setEmail] = React.useState<string|null>();
    const [password,setPassword] = React.useState<string|null>();
    
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

    //POP-UP SignIN
    const handleGoogle = async():Promise<Data> =>{
        try{
            const result = await signInWithPopup(auth,googleProvider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            const data: Data = {
                title: "Success",
                message: "Signed In Successfully",
            };
            return data;
        }
        catch(error:any){
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            const data: Data = {
                title: "Success",
                message: "Signed In Successfully",
            };
            return data;
        }
    }

    

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
    
    function Route() {
        const user = auth.currentUser;
        console.log(user);
        if(user){
            Router.push('/dashboard')
        }
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
              <Input id="email" onChange={handleEmailChange} placeholder='Enter Email Here...'  />
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <PasswordInput id="password"  onChange={handlePasswordChange} placeholder='Enter your Password'  />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button className='mb-4' onClick={ async()=>{
                    const Data:Data = await handleLogin();
                    toast({
                    title: Data.title,
                    description: Data.message,            
                     })
                    Route();
                    }}
                      >Sign In
                      </Button>
                    <Separator/>
                    <Button className='m-4' variant="ghost" 
                        onClick={async()=>{
                            const Data:Data = await handleGoogle();
                            toast({
                            title: Data.title,
                            description: Data.message,            
                             })
                            Route();
                            }}
                    >Sign-in With Google<IconBrandGoogle/></Button>
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
                <Input id="email" onChange={handleEmailChange} placeholder='Enter Email Here...' type="email" />
                </div>
                <div className="space-y-1">
                <Label >Password</Label>
                <PasswordInput id="password"   onChange={handlePasswordChange} placeholder='Enter your Password'  />
                </div>
            </CardContent>
            <CardFooter className='flex flex-col'>
                <Button className='mb-4' onClick={async()=>{
                    const Data:Data = await handleSignup();
                    toast({
                        title: Data.title,
                        description: Data.message,            
                         })
                        Route();
                        }}
                   >Sign Up</Button>
                   <Separator/>
                   <Button className='m-4' variant="ghost">Sign-Up With Google<IconBrandGoogle/></Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>

    </div>
  )
}

export default page