'use client'
import {useEffect, useState} from "react";
import {get_app_list, create_app} from "../../api_servers/app";
import {get_llm_list} from "../../api_servers/chat";
import {
    Grid,
    Card,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import { Input, Select } from '@chakra-ui/react'
import toast, {Toaster} from 'react-hot-toast';

export default function AppStore() {

    const [appList, setAppList] = useState([])
    const [llmList, setLlmList] = useState([])
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [newAppName, setNewAppName] = useState('')
    const [selectLLM, setSelectLLM] = useState('')

    async function getAppList() {
        const res = await get_app_list()
        console.log('app list res', res)
        if (res && res.length) {
            setAppList(res)
        }
    }

    useEffect( () => {
        getAppList()
    }, []);

    useEffect( () => {
        async function getLlmList() {
            const res = await get_llm_list()
            if (res && res.length) {
                setLlmList(res)
            }
        }
        getLlmList()
    }, [showCreateAppModal]);

    function closeModal() {
        setShowCreateAppModal(false)
        setNewAppName('')
        setSelectLLM('')
    }

    async function createApp() {
        await create_app(newAppName, selectLLM)
        setShowCreateAppModal(false)
        getAppList()
    }

    function createNewApp() {
        if (appList.length >= 10) {
            toast.error("只允许创建10个应用", {
                duration: 2000,
                position: 'top-center'
            })
        }
        else {
            setShowCreateAppModal(true)
        }
    }


    return (
        <>
            <div className='flex-1 w-full bg-blue-50/30 border border-gray-200 bg-white rounded-3xl mt-4 mr-4 ml-4 mb-4'>
                <Grid
                    p={5}
                    gridTemplateColumns={['1fr', 'repeat(3,1fr)', 'repeat(4,1fr)', 'repeat(5,1fr)']}
                    gridGap={5}
                >
                    {appList.map((item) => (
                        <Card
                            key={item.id}
                            py={4}
                            px={5}
                            cursor={'pointer'}
                            h={'140px'}
                            bgColor={'pink.100'}
                            position={'relative'}
                        >
                            <div className='text-center text-blue-500'>{item.name}</div>
                            <div className='mt-14 text-center'>{item.llm_name}</div>
                        </Card>
                    ))}
                </Grid>
                <div
                    className='relative'
                >
                    <button
                        onClick={createNewApp}
                        className='absolute left-1/2 translate-x-[-50%] w-[156px] h-[64px] bg-blue-100 border rounded-lg border-gray-100 shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] px-4 py-1 hover:text-pink-400 hover:bg-pink-100'
                    >
                        创建新应用
                    </button>
                    <Toaster/>
                </div>
            </div>
            {showCreateAppModal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>创建新的应用</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div>应用名称</div>
                            <Input value={newAppName} onChange={(e) => {setNewAppName(e.target.value)}} placeholder={'请输入应用名称...'}/>
                            <div>请选择模型</div>
                            <Select
                                onChange={(e) => {setSelectLLM(e.target.value)}}
                            >
                                {llmList.map((item) => {
                                    return (
                                        <option key={item} value={item}>{item}</option>
                                    )
                                })}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={createApp}>确认</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}
