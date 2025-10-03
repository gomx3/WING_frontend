import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import { MyLink, MyNode } from '@/types/graph' // 타입 경로는 실제 프로젝트에 맞게 조정해주세요.

type GraphData = {
    nodes: MyNode[]
    edges: MyLink[]
}

export async function GET(request: Request) {
    try {
        // 1. graph.json 파일 읽기
        const jsonPath = path.join(process.cwd(), 'public', 'graph.json')
        const fileContents = await fs.readFile(jsonPath, 'utf8')
        const jsonData: GraphData = JSON.parse(fileContents)

        // 2. 쿼리 파라미터에서 keywords 가져오기
        const { searchParams } = new URL(request.url)
        const keywords = searchParams.get('keywords')
        const keywordList = keywords ? keywords.split(',') : []

        if (keywordList.length === 0) {
            // 키워드가 없으면 빈 데이터를 반환
            return NextResponse.json({ nodes: [], links: [] })
        }

        // 3. 키워드에 해당하는 노드 필터링
        const filteredNodes = jsonData.nodes.filter((node: MyNode) => keywordList.includes(node.id))
        const filteredNodeIds = new Set(filteredNodes.map((node: MyNode) => node.id))

        // 4. 필터링된 노드들 사이에만 존재하는 엣지(링크) 필터링
        // JSON 데이터의 'edges'를 사용하도록 수정했습니다.
        const filteredLinks = jsonData.edges.filter((link: MyLink) => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source
            const targetId = typeof link.target === 'object' ? link.target.id : link.target
            return filteredNodeIds.has(sourceId) && filteredNodeIds.has(targetId)
        })

        // 5. 필터링된 데이터 반환
        return NextResponse.json({ nodes: filteredNodes, links: filteredLinks })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
