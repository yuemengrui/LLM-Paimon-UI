'use client'
import {useEffect, useState} from "react";
import {get_app_list, create_app} from "../../api_servers/app";
import {get_llm_list} from "../../api_servers/chat";
import {
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
            toast.error("只允许创建10个APP", {
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
            <div className='flex w-full bg-blue-50/30'>
                <button
                    onClick={createNewApp}
                    className='ml-12 mt-6 w-[156px] h-[64px] bg-blue-100 border rounded-lg border-gray-100 shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] px-4 py-1 hover:text-pink-400 hover:bg-pink-100'
                >
                    创建新APP
                    <Toaster/>
                </button>
                <Flex mt={2} ml={6} gap={6} flexWrap={'wrap'}>
                    {appList.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className='text-center w-[256px] h-[64px] shadow-[0_0_1px_1px_rgba(244,114,182,0.2)] bg-pink-100 rounded-lg px-2 py-2 mt-4'
                            >
                                <div className='text-pink-400'>{item.name}</div>
                                <div className='text-blue-400'>{item.llm_name}</div>
                            </div>
                        )
                    })}
                </Flex>
            </div>
            {showCreateAppModal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>创建新的APP</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div>APP名称</div>
                            <Input value={newAppName} onChange={(e) => {setNewAppName(e.target.value)}} placeholder={'请输入APP名称...'}/>
                            <div>请选择模型</div>
                            <Select
                                onChange={(e) => {setSelectLLM(e.target.value)}}
                                placeholder='Select llm'
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
