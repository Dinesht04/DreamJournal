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
import { Textarea } from "./ui/textarea"
import { ID } from "@/app/dashboard/page"
import {db} from '@/app/firebase/config'
import { addDoc,collection, query, where, getDocs } from "firebase/firestore"
import { IconReload } from '@tabler/icons-react'


export default function ContentTabs(props:ID) {

    interface journal{
        title:string,
        body:string,
        date:Date,
        userID:string

    }

    const [heading,setHeading] = React.useState<string>();
    const [body,setBody] = React.useState<string>();
    const [journals,setJournals] = React.useState<journal[]>([]);

    const handleHeading = (event:React.ChangeEvent<HTMLInputElement>) => {
        setHeading(event.target.value);
    }
    const handleBody = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    }

    //Submit
    const handleSubmit = async ()=>{
    try {
        const Data :{
            date:Date|undefined,
            body:string|undefined|null,
            userID:string|undefined,
            title:string|undefined|null
        } = {
            date: props.date,
            body:body,
            userID:props.uuid,
            title:heading
        }
        const docRef = await addDoc(collection(db, "journals"), Data);
        console.log("Document written with ID: ", docRef.id);
        setBody("");
        setHeading("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

 

  const getJournal = async() =>{
    console.log(props.date)
    const q = query(collection(db, "journals"),where("date", "==", props.date),where("userID","==",props.uuid));
    try{
        const querySnapshot = await getDocs(q);
        const newJournals:journal[] = [];
        querySnapshot.forEach((doc) => {
        // Collect the document data into the array
        newJournals.push(doc.data() as journal);
        });
        // Update the state with the new journals
        setJournals(newJournals);
        console.log(journals);
            }
    catch(e){
        console.log("error",e)
    }
}
    
  
    

  return (
    <Tabs className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger onClick={getJournal} value="read">Read</TabsTrigger>
      </TabsList>
      <TabsContent value="write">
        <Card className="max-w-full">
          <CardHeader>
            <CardTitle>Write a Journal</CardTitle>
            <CardDescription>
              Type whatever's on your mind. Click save when you're done.{props.uuid}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Title</Label>
              <Input id="name" value={heading} onChange={handleHeading} placeholder="Enter Title Here..."  className="w-4/12" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Body</Label>
              <Textarea value={body} onChange={handleBody} placeholder="Journal Here..." />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Done</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="read">
        {/* See Journals */}
        <Card >
          <CardHeader  >
            <CardTitle  >Read 
                
            </CardTitle>
            <CardDescription>
              Read Your Journals here
            </CardDescription>
          </CardHeader>
          {journals.map((journal, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle>
                  {journal.title}
                  </CardTitle>
                <CardDescription>
                    <p>{journal.body}</p>
                </CardDescription>
               
                <CardFooter className='flex flex-row-reverse'>
                    <Button>Analyse</Button>
                </CardFooter>
                </CardHeader>
            </Card>
          ))}   
          
        </Card>
      </TabsContent>
    </Tabs>
  )
}
