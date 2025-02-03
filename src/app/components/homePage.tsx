'use client';
import Image from 'next/image';
import { JSX, useState } from 'react';
import { QuestionBox } from '@/app/components/questionBox';

export function Home(): JSX.Element {

    const [response1, setResponse1]: [string, CallableFunction] = useState('');
    const [response2, setResponse2]: [string, CallableFunction] = useState('');
    const [response3, setResponse3]: [string, CallableFunction] = useState('');

    return (
        <div>
            <div className="flex flex-col items-center space-y-12"> 
                <div className="flex flex-col border-b border-gray-900/10 pt-5">
                    <h2 className="font-carter text-4xl font-semibold text-white text-center">MovieChoice</h2>
                    <p className="font-roboto font-semibold text-base leading-relaxed whitespace-pre-wrap text-white text-center">
                        A recommendation app for movies
                    </p>
                </div>
                    <div>
                        <Image 
                            src="/entertainment-snack-time.png" 
                            alt="Logo"
                            width={200}
                            height={100} 
                        />
                    </div>
                    <QuestionBox
                        id="q1" 
                        question="What’s your favorite movie and why?"
                        description="Write a few sentences describing the movie's plot, and a reason you liked it!"
                        stateValue={response1}
                        setState={setResponse1}
                    />
                    <QuestionBox
                        id="q2" 
                        question="Are you in the mood for something new or a classic?" 
                        description="A one word/sentence answer will do just fine"
                        stateValue={response2}
                        setState={setResponse2}
                    />
                    <QuestionBox
                        id="q3" 
                        question="Do you want to watch something fun or serious?" 
                        description="A one word/sentence answer will do just fine"
                        stateValue={response3}
                        setState={setResponse3}
                    />
            </div>
            <div className="mt-6 flex items-center justify-center gap-x-6 pb-12">
                <button type="button" className="text-sm/6 font-roboto font-semibold text-white hover-visible:outline-white">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-[#35CE73] px-3 py-2 text-sm font-roboto font-semibold text-white shadow-sm hover:bg-[#40FC8C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Let's go!
                </button>
            </div>
        </div>
        
    )
}