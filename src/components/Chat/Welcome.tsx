import Example from "./Example"

export default function Welcome() {
    return (
        <div className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-20'>
            <h1 className='text-4xl font-bold'>
                LLM-Paimon
            </h1>
            <Example />
        </div>
    )
}
