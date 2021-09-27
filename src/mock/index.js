import Mock from 'mockjs'
import data from '@/mock/json/common.json'
import systemOnline from '@/mock/json/systemOnline/index.json'
import codeScan from '@/mock/json/systemOnline/codeScan.json'

// Mock.mock(/.*\/api\/getTest$/, 'get', data)
Mock.mock('/api/getTest', 'get', data)

Mock.mock('/api/getDemandList', 'get', systemOnline)
Mock.mock('/api/getCodeScanList', 'get', codeScan)

export default Mock
