import { useRef } from "react"



export function useDragComponent() {
    const activeComponent = useRef<HTMLElement | null>(null)
    const isDragging = useRef(false)
    const startMouseX = useRef(0)
    const startMouseY = useRef(0)
    const startX = useRef(0)
    const startY = useRef(0)

    // above drag feature
    const handlePointerDown = (e: React.PointerEvent) => {
        const target = e.target as HTMLElement
        const draggable = target.closest("[data-draggable='true']")
        if (!draggable) return

        activeComponent.current = draggable as HTMLElement
        isDragging.current = true

        startMouseX.current = e.clientX
        startMouseY.current = e.clientY

        const style = window.getComputedStyle(draggable)
        const matrix = new DOMMatrixReadOnly(style.transform)

        startX.current = matrix.m41
        startY.current = matrix.m42

        // imp for mobile
        draggable.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current || !activeComponent.current) return

        const dx = e.clientX - startMouseX.current
        const dy = e.clientY - startMouseY.current

        activeComponent.current.style.transform =
            `translate(${startX.current + dx}px, ${startY.current + dy}px)`

        activeComponent.current.style.zIndex = "50"
        activeComponent.current.style.border = "1px dashed blue"
    }

    const handlePointerUp = () => {
        isDragging.current = false

        if (activeComponent.current) {
            activeComponent.current.style.zIndex = "90"
            activeComponent.current.style.border = ""
        }

        activeComponent.current = null
    }

    return { handlePointerDown, handlePointerMove, handlePointerUp }
}