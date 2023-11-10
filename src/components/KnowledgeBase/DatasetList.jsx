'use client'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import {RiDeleteBinLine} from "react-icons/ri";
import {get_kb_data_list} from "src/api_servers/knowledge_base";
import {useEffect, useState} from "react";
import {useToast} from '@chakra-ui/react'

export default function DatasetList({kb_id}) {
    const toast = useToast()
    const [dataList, setDataList] = useState([])

    async function getDataList() {
        const res = await get_kb_data_list(kb_id)
        setDataList(res)
    }

    useEffect(() => {
        getDataList()
    }, []);

    function showDataDetail() {
        toast({
            title: '展示数据详情正在开发中...',
            status: 'warning',
            position: 'top',
            duration: 2000,
        })
    }

    function deleteData(e, data_id) {
        e.stopPropagation()
        toast({
            title: '删除数据:'+ data_id + ' 正在开发中...',
            status: 'warning',
            position: 'top',
            duration: 2000,
        })
    }
    return (
        <div className='w-full'>
            <TableContainer mt={2} minH={'70vh'}>
                {dataList.length > 0 ? (
                    <Table fontSize={'sm'}>
                        <Thead>
                            <Tr>
                                <Th>文件名</Th>
                                <Th>数据总量</Th>
                                <Th>上传时间</Th>
                                <Th>状态</Th>
                                <Th />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {dataList.map((item) => (
                                <Tr
                                    key={item.id}
                                    cursor={'pointer'}
                                    _hover={{bg:'blue.50'}}
                                    onClick={showDataDetail}
                                >
                                    <Td maxW={['300px', '400px']} overflow={'overlay'}>{item.file_name}</Td>
                                    <Td>{item.data_total}</Td>
                                    <Td>{item.create_time}</Td>
                                    <Td>{item.status}</Td>
                                    <Td>
                                        <RiDeleteBinLine
                                            className='hover:text-red-600'
                                            onClick={(e) => {deleteData(e, item.id)}}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                ) : (
                    <div className='text-center mt-32'>知识库中还没有数据，请先导入数据</div>
                )}
            </TableContainer>
        </div>
    )
}