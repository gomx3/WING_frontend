import { Button } from '../common'
import Modal from '../common/Modal'

interface DeleteModalProps {
    setDeletingId: (id: number | null) => void
    handleConfirmDelete: () => void
}

export const DeleteModal = ({ setDeletingId, handleConfirmDelete }: DeleteModalProps) => {
    return (
        <Modal
            title="그래프 삭제"
            description={`정말 이 그래프를 삭제하시겠습니까?\n 삭제된 데이터는 복구할 수 없습니다.`}
            onClose={() => setDeletingId(null)}
        >
            <div className="flex gap-2 mt-4 justify-center w-full">
                <Button
                    type="button"
                    label="취소하기"
                    variant="secondary"
                    size="lg"
                    onClick={() => setDeletingId(null)}
                />
                <Button type="button" label="삭제하기" size="lg" onClick={handleConfirmDelete} />
            </div>
        </Modal>
    )
}
