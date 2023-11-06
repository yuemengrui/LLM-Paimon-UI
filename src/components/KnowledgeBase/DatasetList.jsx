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
import toast, {Toaster} from "react-hot-toast";
import {get_kb_data_list} from "src/api_servers/knowledge_base";
import {useEffect, useState} from "react";

export default function DatasetList({kb_id}) {
    const [dataList, setDataList] = useState([])

    async function getDataList() {
        const res = await get_kb_data_list(kb_id)
        setDataList(res)
    }

    useEffect(() => {
        getDataList()
    }, []);

    function showDataDetail() {
        toast('展示数据详情正在开发中...', {
            duration: 2000,
            position: 'top-center'
        })
    }

    function deleteData(e, data_id) {
        e.stopPropagation()
        toast('删除数据:'+ data_id + ' 正在开发中...', {
            duration: 2000,
            position: 'top-center'
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
                                        <Toaster/>
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