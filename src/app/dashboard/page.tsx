"use client"

import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import {auth} from '../firebase/config'
import { signOut, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ContentTabs from '@/components/ContentTabs'

interface Data{
    date:Date|null,
    heading:string|null,
    body:string|null
}

export interface ID{
    uuid:string|undefined
    date:Date|undefined
}

const page = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const Router = useRouter();



    //auth
    const user = auth.currentUser;
    console.log(date)
    const uuid:string|undefined = user?.uid;

    if(user){
        if(user.displayName==null){
            console.log("func changed")
            const email:string|null = user.email;
            const displayName = getUsernameFromEmail(email);
            updateProfile(user, {
                displayName: displayName, photoURL: "https://picsum.photos/200"
              }).catch((error) => {
                console.log(error)
              });
        }
    }
    
    // if(!user){
    //     Router.push('/getStarted')
        
    // }
      
    function getUsernameFromEmail(email:string|null) {
        if (typeof email !== 'string') {
            throw new Error('Invalid input: email must be a string');
        }
        const atIndex = email.indexOf('@');
        return email.substring(0, atIndex);
    }



  return (
    <div>

    <div className='flex flex-col m-4 p-4'>
        <div id='navbar' className='flex flex-row-reverse'>
        <Button onClick={()=>{
            signOut(auth)
            Router.push('/getStarted')
            }} > Log Out </Button>
        </div>
        <div id='container' className='flex justify-center align-center m-4 p-4'>
            <div id='calender' className='align-left m-4 p-4 basis-1/3'>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            </div>
            <div id='content' className='flex flex-col m-4 p-4 basis-2/3'>
                <ContentTabs date={date} uuid={uuid} />
                
            </div>
        </div>
        
       
    </div>
    </div>
  ) 

}

export default page