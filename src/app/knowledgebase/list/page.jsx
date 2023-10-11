'use client'
import {
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
import toast, {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';
import {get_knowledge_base_list, kb_create} from "../../../api_servers/knowledge_base";
import {get_embedding_model_list} from "../../../api_servers/embedding";



export default function KnowledgeBase() {
    const router = useRouter();

    const [KBList, setKBList] = useState([])
    const [embModelList, setEmbModelList] = useState([])
    const [showCreateKBModal, setShowCreateKBModal] = useState(false)
    const [newKBName, setNewKBName] = useState('')
    const [selectEmbModelList, setSelectEmbModelList] = useState([])

    async function getKBList() {
        const res = await get_knowledge_base_list()
        console.log('kb list res', res)
        if (res && res.length) {
            setKBList(res)
        }
    }

    useEffect( () => {
        getKBList()
    }, []);

    useEffect( () => {
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
        if (!(newKBName && selectEmbModelList.length)) {
            toast.error('知识库名称和embedding模型不能为空', {
                duration: 2000,
                position: 'top-center'
            })
        }
        else {
            await kb_create(newKBName, selectEmbModelList)
            setNewKBName('')
            setShowCreateKBModal(false)
            getKBList()
        }
    }

    function createNewKB() {
        if (KBList.length >= 20) {
            toast.error("只允许创建20个知识库", {
                duration: 2000,
                position: 'top-center'
            })
        }
        else {
            setShowCreateKBModal(true)
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
                    {KBList.map((item) => (
                        <Card
                            key={item.id}
                            py={4}
                            px={5}
                            cursor={'pointer'}
                            h={'140px'}
                            bgColor={'pink.100'}
                            position={'relative'}
                            onClick={() => router.push(`/knowledgebase/info?app_id=${item.id}`)}
                        >
                            <div className='text-center text-blue-500'>{item.name}</div>
                            <div className='mt-6 text-center'>
                                {item.embedding_model_list.map((emb_model) => (
                                    <div key={emb_model}>{emb_model}</div>
                                ))}
                            </div>
                        </Card>
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
                    <Toaster/>
                </div>
            </div>
            {showCreateKBModal && (
                <Modal isOpen={true} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>创建新的知识库</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div>知识库名称</div>
                            <Input value={newKBName} onChange={(e) => {setNewKBName(e.target.value)}} placeholder={'请输入知识库名称...'}/>
                            <div>请选择Embedding模型, 可多选</div>
                            <CheckboxGroup
                                onChange={(e) => {setSelectEmbModelList(e)}}
                                colorScheme='green'
                            >
                                <Stack spacing={[1, 5]} direction={['row', 'column']}>
                                    {embModelList.map((item) => (
                                        <Checkbox key={item} value={item}>{item}</Checkbox>
                                    ))}
                                </Stack>
                            </CheckboxGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={createKB}>
                                确认
                                <Toaster/>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}