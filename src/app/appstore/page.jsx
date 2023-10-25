'use client'
import {useEffect, useState} from "react";
import {get_app_list, app_create, app_delete} from "../../api_servers/app";
import {get_llm_list} from "../../api_servers/chat";
import {get_knowledge_base_list} from "../../api_servers/knowledge_base";
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
import {RiDeleteBinLine} from "react-icons/ri";

export default function AppStore() {

    const [appList, setAppList] = useState([])
    const [llmList, setLlmList] = useState([])
    const [KBList, setKBList] = useState([])
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [newAppName, setNewAppName] = useState('')
    const [selectLLM, setSelectLLM] = useState(null)
    const [selectKB, setSelectKB] = useState(null)

    async function getAppList() {
        const res = await get_app_list()
        console.log('app list res', res)
        setAppList(res)
    }

    useEffect( () => {
        getAppList()
    }, []);

    useEffect( () => {
        async function getList() {
            const llm_res = await get_llm_list()
            if (llm_res && llm_res.length > 0) {
                setLlmList(llm_res)
            }

            const kb_res = await get_knowledge_base_list()
            if (kb_res && kb_res.length > 0) {
                setKBList(kb_res)
            }
        }
        getList()
    }, [showCreateAppModal]);

    function closeModal() {
        setShowCreateAppModal(false)
        setNewAppName('')
        setSelectLLM('')
    }

    async function createApp() {
        if (newAppName && selectLLM) {
            await app_create(newAppName, selectLLM, selectKB)
            setShowCreateAppModal(false)
            getAppList()
        }
        else {
            toast.error("请填写应用名称和选择模型", {
                duration: 2000,
                position: 'top-center'
            })
        }
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

    async function delete_app(e, app_id) {
        e.stopPropagation()
        await app_delete(app_id)  // 调后台接口删除
        getAppList() // 调后台接口获取新的 APP list
    }


    return (
        <div className='flex w-full bg-blue-50/30'>
            <div className='flex-1 bg-white border border-gray-200 rounded-3xl mt-4 mr-4 ml-4 mb-4'>
                <div className='py-2 ml-6 mt-2 text-2xl font-semibold text-blue-600'>我的应用</div>
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
                            _hover={{
                                boxShadow: '1px 1px 10px rgba(0,0,0,0.6)',
                                borderColor: 'transparent'
                            }}
                        >
                            <div className='text-center text-blue-500 text-2xl'>{item.name}</div>
                            <div className='mt-8 text-center text-sm'>{'模型：' + item.llm_name}</div>
                            {item.kb_name && (<div className='mt-1 text-center text-sm'>{'知识库：' + item.kb_name}</div>)}
                            <RiDeleteBinLine className='absolute right-3 hover:text-red-600'
                                             onClick={(e) => delete_app(e, item.id)}/>
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
                                placeholder='请选择模型'
                            >
                                {llmList.map((item) => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </Select>
                            <div>请选择知识库，可不选</div>
                            <Select
                                onChange={(e) => {setSelectKB(e.target.value)}}
                                placeholder='请选择知识库'
                            >
                                {KBList.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={createApp}>确认</Button>
                            <Toaster />
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}
