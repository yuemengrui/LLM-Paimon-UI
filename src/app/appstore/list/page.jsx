'use client'
import {useEffect, useState} from "react";
import {
    get_app_list,
    get_app_create_system_app_list,
    app_create,
    app_delete,
    app_create_system_app
} from "src/api_servers/app";
import {get_llm_list} from "src/api_servers/chat";
import {get_knowledge_base_list} from "src/api_servers/knowledge_base";
import {
    Grid,
    Card,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Flex
} from "@chakra-ui/react";
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {Input, Select} from '@chakra-ui/react'
import {useToast} from '@chakra-ui/react'
import {RiDeleteBinLine} from "react-icons/ri";
import MyTooltip from "src/components/Tooltip/Tooltip";
import {useRouter} from "next/navigation";


export default function AppStore() {
    const router = useRouter();
    const toast = useToast()
    const [appList, setAppList] = useState([])
    const [llmList, setLlmList] = useState([])
    const [KBList, setKBList] = useState([])
    const [systemAppList, setSystemAppList] = useState([])
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [appType, setAppType] = useState(0)
    const [selectSystemApp, setSelectSystemApp] = useState(1)
    const [newAppName, setNewAppName] = useState('')
    const [selectLLM, setSelectLLM] = useState(null)
    const [selectKB, setSelectKB] = useState(null)
    const [showDeleteAppModal, setShowDeleteAppModal] = useState(false)
    const [deleteAppInfo, setDeleteAppInfo] = useState(null)

    async function getAppList() {
        const res = await get_app_list()
        setAppList(res)
    }

    useEffect(() => {
        getAppList()
    }, []);

    useEffect(() => {
        async function getList() {
            const system_app_res = await get_app_create_system_app_list()
            if (system_app_res && system_app_res.length > 0) {
                setSystemAppList(system_app_res)
            }

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
        setAppType(0)
        setSelectSystemApp(null)
        setNewAppName('')
        setSelectLLM(null)
        setSelectLLM(null)
    }

    async function createApp() {
        if (appType === 0) {
            const resp = await app_create_system_app(selectSystemApp)
            if (resp) {
                if (resp.errmsg) {
                    toast({
                        title: '失败',
                        description: resp.errmsg,
                        status: 'error',
                        position: 'top',
                        duration: 2000,
                    })
                } else {
                    toast({
                        title: '成功',
                        status: 'success',
                        position: 'top',
                        duration: 2000,
                    })
                }
            } else {
                toast({
                    title: '失败',
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                })
            }
            closeModal()
            getAppList()
        } else {
            if (newAppName && selectLLM) {
                const resp = await app_create(newAppName, selectLLM, selectKB)
                if (resp) {
                    if (resp.errmsg) {
                        toast({
                            title: '失败',
                            description: resp.errmsg,
                            status: 'error',
                            position: 'top',
                            duration: 2000,
                        })
                    } else {
                        toast({
                            title: '成功',
                            status: 'success',
                            position: 'top',
                            duration: 2000,
                        })
                    }
                } else {
                    toast({
                        title: '失败',
                        status: 'error',
                        position: 'top',
                        duration: 2000,
                    })
                }
                closeModal()
                getAppList()
            } else {
                toast({
                    title: "请填写应用名称和选择模型",
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                })
            }
        }
    }

    function createNewApp() {
        if (appList.length >= 10) {
            toast({
                title: "只允许创建10个应用",
                status: 'error',
                position: 'top',
                duration: 2000,
            })
        } else {
            setShowCreateAppModal(true)
        }
    }

    function delete_app(e, appInfo) {
        e.stopPropagation()
        setDeleteAppInfo(appInfo)
        setShowDeleteAppModal(true)
    }

    async function confirmDeleteApp() {
        const resp = await app_delete(deleteAppInfo.id)  // 调后台接口删除
        if (resp) {
            if (resp.errmsg) {
                toast({
                    title: '失败',
                    description: resp.errmsg,
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                })
            } else {
                toast({
                    title: '成功',
                    status: 'success',
                    position: 'top',
                    duration: 2000,
                })
            }
        } else {
            toast({
                title: '失败',
                status: 'error',
                position: 'top',
                duration: 2000,
            })
        }
        getAppList() // 调后台接口获取新的 AppStore list
        setShowDeleteAppModal(false)
        setDeleteAppInfo(null)
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
                        <MyTooltip label='点击查看详情'>
                            <Card
                                key={item.id}
                                py={4}
                                px={5}
                                cursor={'pointer'}
                                h={'140px'}
                                bgColor={'pink.100'}
                                position={'relative'}
                                onClick={() => router.push(`/appstore/info?app_id=${item.id}`)}
                                _hover={{
                                    boxShadow: '1px 1px 10px rgba(0,0,0,0.6)',
                                    borderColor: 'transparent'
                                }}
                            >
                                <div className='text-center text-blue-500 text-2xl'>{item.name}</div>
                                <div className='mt-8 text-center text-sm'>{'模型：' + item.llm_name}</div>
                                {item.kb_name && (
                                    <div className='mt-1 text-center text-sm'>{'知识库：' + item.kb_name}</div>)}
                                <RiDeleteBinLine className='absolute right-3 hover:text-red-600'
                                                 onClick={(e) => delete_app(e, item)}/>
                            </Card>
                        </MyTooltip>
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
                </div>
            </div>
            {showCreateAppModal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>创建新的应用</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Tabs
                                variant='soft-rounded'
                                colorScheme='green'
                                onChange={(index) => setAppType(index)}
                            >
                                <TabList>
                                    <Tab>系统应用</Tab>
                                    <Tab>自定义应用</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Flex alignItems={'center'} mt={6} direction={"column"}>
                                            {systemAppList.map((sys_app) => {
                                                return (
                                                    <button
                                                        key={sys_app.id}
                                                        className={`${selectSystemApp === sys_app.id ? 'shadow-[0_0_2px_2px_rgba(244,114,182,0.2)] bg-pink-100 text-pink-400' : 'bg-blue-50/75 hover:bg-blue-100 hover:text-pink-300'} w-full rounded-lg px-2 py-2 mt-4`}
                                                        onClick={() => setSelectSystemApp(sys_app.id)}
                                                    >
                                                        {sys_app.name}
                                                    </button>
                                                )
                                            })}
                                        </Flex>
                                    </TabPanel>
                                    <TabPanel>
                                        <div>应用名称</div>
                                        <Input value={newAppName} onChange={(e) => {
                                            setNewAppName(e.target.value)
                                        }} placeholder={'请输入应用名称...'}/>
                                        <div>请选择模型</div>
                                        <Select
                                            onChange={(e) => {
                                                setSelectLLM(e.target.value)
                                            }}
                                            placeholder='请选择模型'
                                        >
                                            {llmList.map((item) => {
                                                return (
                                                    <option key={item.model_name}>{item.model_name}</option>
                                                )
                                            })}
                                        </Select>
                                        <div>请选择知识库，可不选</div>
                                        <Select
                                            onChange={(e) => {
                                                setSelectKB(e.target.value)
                                            }}
                                            placeholder='请选择知识库'
                                        >
                                            {KBList.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })}
                                        </Select>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={createApp}>确认</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {showDeleteAppModal && (
                <Modal isOpen={true} onClose={() => setShowDeleteAppModal(false)}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>确认删除 <span className='text-red-600'>{deleteAppInfo.name}</span> 吗？</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <div className='text-center'>删除后数据将无法恢复</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={confirmDeleteApp}>确认删除</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}
