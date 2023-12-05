'use client'
import {
    Radio,
    RadioGroup,
    Button,
    Card,
    Grid, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Checkbox,
    CheckboxGroup
} from "@chakra-ui/react";
import {useToast} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';
import {RiDeleteBinLine} from "react-icons/ri";
import {get_knowledge_base_list, kb_create, kb_delete} from "src/api_servers/knowledge_base";
import {get_embedding_model_list} from "src/api_servers/embedding";
import MyTooltip from "src/components/Tooltip/Tooltip";


export default function KnowledgeBase() {
    const router = useRouter();
    const toast = useToast()

    const [KBList, setKBList] = useState([])
    const [embModelList, setEmbModelList] = useState([])
    const [showCreateKBModal, setShowCreateKBModal] = useState(false)
    const [newKBName, setNewKBName] = useState('')
    const [selectEmbModel, setSelectEmbModel] = useState([])
    const [showDeleteKBModal, setShowDeleteKBModal] = useState(false)
    const [deleteKBInfo, setDeleteKBInfo] = useState(null)

    async function getKBList() {
        const res = await get_knowledge_base_list()
        console.log('kb list res', res)
        if (res && res.length) {
            setKBList(res)
        }
    }

    useEffect(() => {
        getKBList()
    }, []);

    useEffect(() => {
        async function getEmbModelList() {
            const res = await get_embedding_model_list()
            if (res && res.length) {
                setEmbModelList(res)
            }
        }

        getEmbModelList()
    }, [showCreateKBModal]);

    function closeModal() {
        setShowCreateKBModal(false)
        setNewKBName('')
        setEmbModelList([])
    }

    async function createKB() {
        if (!(newKBName && selectEmbModel)) {
            toast({
                title: '知识库名称和embedding模型不能为空',
                status: 'error',
                position: 'top',
                duration: 2000,
            })
        } else {
            await kb_create(newKBName, selectEmbModel)
            setNewKBName('')
            setShowCreateKBModal(false)
            getKBList()
        }
    }

    function createNewKB() {
        if (KBList.length >= 20) {
            toast({
                title: '只允许创建20个知识库',
                status: 'error',
                position: 'top',
                duration: 2000,
            })
        } else {
            setShowCreateKBModal(true)
        }
    }

    async function deleteKB(e, kbInfo) {
        e.stopPropagation()
        setDeleteKBInfo(kbInfo)
        setShowDeleteKBModal(true)
    }

    async function confirmDeleteKB() {
        await kb_delete(deleteKBInfo.id)
        getKBList()
        setShowDeleteKBModal(false)
        setDeleteKBInfo(null)
    }

    return (
        <div className='flex w-full bg-blue-50/30'>
            <div
                className='flex-1 border border-gray-200 bg-white rounded-3xl mt-4 mr-4 ml-4 mb-4'>
                <div className='py-2 ml-6 mt-2 text-2xl font-semibold text-blue-600'>我的知识库</div>
                <Grid
                    p={5}
                    gridTemplateColumns={['1fr', 'repeat(3,1fr)', 'repeat(4,1fr)', 'repeat(5,1fr)']}
                    gridGap={5}
                >
                    {KBList.map((item) => (
                        <MyTooltip label='点击查看详情'>
                            <Card
                                key={item.id}
                                py={4}
                                px={5}
                                cursor={'pointer'}
                                h={'140px'}
                                bgColor={'pink.100'}
                                position={'relative'}
                                onClick={() => router.push(`/knowledgebase/info?kb_id=${item.id}&kb_name=${item.name}`)}
                                _hover={{
                                    boxShadow: '1px 1px 10px rgba(0,0,0,0.6)',
                                    borderColor: 'transparent'
                                }}
                            >
                                <div className='text-center text-blue-500 text-2xl'>{item.name}</div>
                                <div className='mt-12 text-center text-sm'>{item.embedding_model}</div>
                                <RiDeleteBinLine className='absolute right-3 hover:text-red-600'
                                                 onClick={(e) => deleteKB(e, item)}/>
                            </Card>
                        </MyTooltip>
                    ))}
                </Grid>
                <div
                    className='relative'
                >
                    <button
                        onClick={createNewKB}
                        className='absolute left-1/2 translate-x-[-50%] w-[156px] h-[64px] bg-blue-100 border rounded-lg border-gray-100 shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] px-4 py-1 hover:text-pink-400 hover:bg-pink-100'
                    >
                        创建新知识库
                    </button>
                </div>
            </div>
            {showCreateKBModal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>创建新的知识库</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <div>知识库名称</div>
                            <Input value={newKBName} onChange={(e) => {
                                setNewKBName(e.target.value)
                            }} placeholder={'请输入知识库名称...'}/>
                            <div>请选择Embedding模型</div>
                            <RadioGroup onChange={setSelectEmbModel} value={selectEmbModel}>
                                <Stack direction='column'>
                                    {embModelList.map((item) => (
                                        <Radio key={item.model_name} value={item.model_name}>{item.model_name}</Radio>
                                    ))}
                                </Stack>
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={createKB}>
                                确认
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {showDeleteKBModal && (
                <Modal isOpen={true} onClose={() => setShowDeleteKBModal(false)}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>确认删除 <span className='text-red-600'>{deleteKBInfo.name}</span> 吗？</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <div className='text-center'>删除后数据将无法恢复</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={confirmDeleteKB}>确认删除</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}
