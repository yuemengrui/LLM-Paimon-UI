import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'
import md from '/README.md'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'


export default function Home() {

    return (
        <div className='w-full h-full mt-6 ml-24'>
            <ReactMarkdown
                children={md}
                className='markdown-body'
                remarkPlugins={[remarkGfm, { singleTilde: false }]}
                rehypePlugins={[rehypeRaw]}
            />
        </div>
    )
}
