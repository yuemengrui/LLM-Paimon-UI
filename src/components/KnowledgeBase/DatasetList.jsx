'use client'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {RiDeleteBinLine} from "react-icons/ri";
import toast, {Toaster} from "react-hot-toast";

export default function DatasetList() {
    const fakeData = [
        {
            'id': 1,
            'file_name': '说的话说句话收到回复是hissdhfihfhw谁的金黄色的v个收到就放寒假时光v机会收到份归属感树大根深个v是v说的是v说说的是v收到v是v说的是v的个v鹅v呃呃v的v鹅v鹅v额',
            'data_total': 100,
            'create_time':'2023-10-10 12:00:00',
            'status': 1
        },
        {
            'id': 2,
            'file_name': '222',
            'data_total': 200,
            'create_time':'2023-10-10 13:00:00',
            'status': 1
        },
        {
            'id': 3,
            'file_name': '333',
            'data_total': 300,
            'create_time':'2023-10-10 14:00:00',
            'status': 1
        },
        {
            'id': 4,
            'file_name': '444',
            'data_total': 400,
            'create_time':'2023-10-10 15:00:00',
            'status': 1
        },
        {
            'id': 5,
            'file_name': '555',
            'data_total': 500,
            'create_time':'2023-10-10 16:00:00',
            'status': 1
        }
    ]

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
                        {fakeData.map((item) => (
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
            </TableContainer>
        </div>
    )
}