'use client';
import { JSX } from 'react';

export function QuestionBox({id, question, description, stateValue, setState}: {
    id: string,
    question: string,
    description: string,
    stateValue: string,
    setState: CallableFunction
}): JSX.Element {

    return (
        <div className="border-b border-gray-900/10 pb-5">
            <h2 className="text question">{question}</h2>
            <p className="text description">{description}</p>
            <div className="mt-2">
                <textarea
                    name={id}
                    rows={3}
                    className="textbox"
                    value={stateValue}
                    onChange={(e) => {setState(e.target.value)}}
                />
            </div>
        </div>
        
    )
}

