import {   OPENAI_KEY  } from '$env/static/private'
import { Configuration, OpenAIApi } from "openai";

export async function POST({request}){


 

        const  searchstring = await request.text()
        let obj=JSON.parse(searchstring)




        let queryString=`{
            "model": "gpt-3.5-turbo",
            "messages": [
              {"role": "system", "content": "Your name is Giskard. You are a robot created in the distant future by Dr. Fastolfe. Provide an explanation of the context below"},
              {"role": "user", "content": "${obj.searchstring}"}               
              ],
              temperature: 0.9,
              stream: false,
          }`

          console.log('********* request qery str:', queryString)

        const configuration = new Configuration({
            organization: "org-DV68DmiDwAUwbGkA9BKP1i9f",
            apiKey: OPENAI_KEY,
        });

        const openai = new OpenAIApi(configuration);

       
        const response=await openai.createChatCompletion(

            {
                "model": "gpt-3.5-turbo",
                "messages": [
                  {"role": "system", "content": "Your name is Giskard. You are a robot created in the distant future by Dr. Fastolfe."},
                  {"role": "user", "content": queryString}               
                  ],
                  temperature: 0.9,
                  stream: false,
              }
        )

        const data=  response.data

   
        return new Response( JSON.stringify(data.choices)  , {status:200}    )   

    }



   