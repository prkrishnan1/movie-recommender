'use server'
import { JSX } from 'react';
import { Home } from '@/app/components/homePage';
import { RecommendMovie } from '@/app/components/recommendationPage';
import { deleteMovieRec, computeMovieRec, getMovieRec, MovieRec, insertMovieRec } from '@/app/components/server/movieRec';
import { redirect } from "next/navigation";

export default async function App(): Promise<JSX.Element> {
  async function onFormSubmit(submitType: string, formData: FormData): Promise<void> {
    "use server"
    if (submitType === "predict") {
      const response1 = formData.get('q1') as string | null;
      const response2 = formData.get('q2') as string | null;
      const response3 = formData.get('q3') as string | null;
      
      if (response1 === null || response2 === null || response3 === null) {
        throw new Error("Form data submission error. Please enter values for all questions");
      }

      const response: MovieRec = await computeMovieRec(response1, response2, response3);
      await insertMovieRec(response);
      redirect('/');
    }
    else {
      await deleteMovieRec();
      redirect('/');
    }
  }

  const data: MovieRec = await getMovieRec();
  const recFound: boolean = data.title !== "default";

  if (recFound) { // className="absolute w-[100%] h-[100%] top-[0%] left-[0%] opacity-[1] z-[1]  rotate-[0deg]   overflow-scroll bg-[#000c36ff] absolute"
    return (
      <div className="absolute w-[100%] h-[100%] top-[0%] left-[0%] opacity-[1] z-[1]  rotate-[0deg]   overflow-scroll bg-[#000c36ff] absolute">
        <div className="flex flex-col justify-center items-center scale-150 translate-y-1/4">
            <form action={onFormSubmit.bind(null, "return")}>
                <RecommendMovie 
                  title={data.title}
                  explanation={data.explanation}
                />
            </form>
        </div>
      </div>
    )
  }
  return ( 
    <div className="absolute w-[100%] h-[100%] top-[0%] left-[0%] opacity-[1] z-[1]  rotate-[0deg]   overflow-scroll bg-[#000c36ff] absolute">
        <div className="flex flex-col bg-[#000c36ff] justify-center items-center scale-150 translate-y-1/4">
            <form action={onFormSubmit.bind(null, "predict")}>
                <Home />
            </form>
        </div>
    </div>
  )
}
