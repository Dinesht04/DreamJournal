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
import { CoolMode } from './magicui/cool-mode'
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
import { addDoc,collection, query,orderBy, where, getDocs, Timestamp } from "firebase/firestore"
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import Groq from "groq-sdk";




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
    const [ananlysis,setAnanlysis] = React.useState<string>();

    const {toast} = useToast();
    const Router = useRouter();

    const handleHeading = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setHeading(event.target.value);
    }
    const handleBody = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    }
    
    //Submit
    const handleSub = async ()=>{
    try {

      if(props.uuid == undefined){
        return toast({
          title: "Error",
          description: "Please Select Date Again",            
           })
      }
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
        toast({
          title: "Success",
          description: "Journal Added Successfully",            
           })
        setBody("");
        setHeading("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }
 
  React.useEffect(()=>{
      getJournal();
  },[props.date])

  const getJournal = async() =>{
    console.log("userID",props.uuid)
    
    if(props.date == undefined){
      return toast({
        title: "Error",
        description: "Invalid Date",            
         })
    }

    if(props.uuid == undefined){
      return toast({
        title: "Error",
        description: "Please Select Date Again",            
         })
    }
    
    
    if(!props.uuid){
      Router.push('/getStarted')
    }

    const date = Timestamp.fromDate(new Date(props.date)) 

    const q = query(collection(db, "journals"),where("date", "==", date),where("userID","==",props.uuid),orderBy("date","desc"));
    try{
        const querySnapshot = await getDocs(q);
        const newJournals:journal[] = [];
        querySnapshot.forEach((doc) => {
        // Collect the document data into the array
        newJournals.push(doc.data() as journal);
        });
        // Update the state with the new journals
        setJournals(newJournals);
      
      }
    catch(e){
        console.log("error",e)
    }
  }
    //ai
    const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,dangerouslyAllowBrowser: true });

    async function getGroqChatCompletion(title:string, body:string) {
      return groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Please analyse the following dream in 2 paragraphs: title:${title} body:${body}`,
          },
        ],
        model: "llama3-8b-8192",
      });
    }

    async function chat(title:string,body:string) {
      const chatCompletion = await getGroqChatCompletion(title,body);
      // Print the completion returned by the LLM.
      setAnanlysis(chatCompletion.choices[0]?.message?.content || "Can't analyse right now UWU")
      
    }


    

  return (
    <Tabs className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className='' value="write">Write</TabsTrigger>
        <TabsTrigger className='' onClick={getJournal} value="read">Read</TabsTrigger>
      </TabsList>
      <TabsContent value="write">
        <Card className="max-w-full">
          <CardHeader>
            <CardTitle>Write a Journal</CardTitle>
            <CardDescription>
             Hey {props.displayName}, Type whatever&apos;s on your mind. Click Done when you&apos;re done. 
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Textarea value={heading} onChange={handleHeading} placeholder="Enter Title Here..."  className="w-3/4 md:w-4/12" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="body">Body</Label>
              <Textarea value={body} onChange={handleBody} placeholder="Journal Here..." />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSub}>Done</Button>
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
                    {journal.body}
                </CardDescription>
               
                <CardFooter className='flex flex-row-reverse'>
                    
                    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
                        <CardDescription className='mb-4'>
                          {ananlysis}
                          </CardDescription>  
                          {!ananlysis?<Button onClick={()=>chat(journal.title,journal.body)} >Analyse</Button>:<CoolMode><Button > UWU </Button></CoolMode> }
                        
                    </div>
                </CardFooter>
                </CardHeader>
            </Card>
          ))}   
          
        </Card>
      </TabsContent>
    </Tabs>
  )
}
