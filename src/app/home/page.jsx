"use client"

export default function Home() {

    return (
        <div className='w-full h-full px-64'>
            <h1 className='text-center text-5xl'>欢迎使用 Paimon</h1>
            <div className='mt-6 text-2xl'>使用流程：</div>
            <div className='ml-6'>
                <div>鼠标移动到页面左侧时，会弹出菜单栏，菜单栏包括首页、对话、应用、知识库等</div>
                <div>1. 点击应用菜单，在应用页面中创建您的应用</div>
                <div>2. 在对话菜单中选择应用进行对话</div>
                <div>在知识库菜单中创建您的知识库, 点击知识库卡片进入详情</div>
            </div>
            <div className='mt-6 text-2xl'>{'TODO'}</div>
            <div className='ml-6'>
                <div>演示中心：TableQA、图片问答</div>
                <div>应用高级编排</div>
            </div>
        </div>
    )
}
