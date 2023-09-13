export default function AppList() {
    const applist = [
        {
            'name': '对话',
            'url': '#'
        },
        {
            'name': '模型配置',
            'url': '#'
        },
        {
            'name': '知识库',
            'url': '#'
        },
        {
            'name': '指令集',
            'url': '#'
        },
        {
            'name': 'coming soon',
            'url': '#'
        },
    ]
    return (
        <ul className='flex flex-col gap-4 text-center text-pink-400 text-xl py-6'>
            {applist.map((item) => {
                return (
                    <li key={item.name} className='hover:scale-150 hover:text-blue-400 transition ease-in duration-200'>
                        <a href={item.url}>{item.name}</a>
                    </li>
                )
            })}
        </ul>
    )
}