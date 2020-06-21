import { useEffect } from "react"
export const useOnClickOutside = <E extends Element = HTMLElement>(
    element: E | null,
    handler: (event: MouseEvent | TouchEvent) => void
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!element || element.contains(event.target as Node)) {
                return
            }

            handler(event)
        }

        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [element, handler])
}
