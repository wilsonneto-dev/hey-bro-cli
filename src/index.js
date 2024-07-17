import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import OpenAI from "openai";

const args = yargs(hideBin(process.argv))
    .command('hey-bro <prompt>', 'Bro will answer your question', () => {}, (argv) => {
        console.info(argv)
    })
    .demandCommand(1)
    .parse()

const question = args._.join(' ')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are \"Bro\", a cli chat aiming to help the users with cli commands or with questions users ask you.\nDon´t use markdown, just simple text to be printed in the terminal, you are running in a terminal."
                }
            ]
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": `Hey bro, ${question}`
                }
            ]
        }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});

console.log(response.choices[0].message.content);