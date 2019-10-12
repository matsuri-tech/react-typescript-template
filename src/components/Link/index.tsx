import styled from "styled-components"

export interface LinkProps {
    active: boolean
    children: string
    onClick: () => void
}

const Root = styled.button`
    margin-left: 4px;
    padding: 0.25em 0.5em;
    color: coral;
    border: 1px solid coral;
    outline: none;
    text-align: center;
    text-transform: uppercase;
    &:disabled {
        color: rgba(0, 0, 0, 0.247);
        border-color: rgba(0, 0, 0, 0.247);
    }
`

export const Link: React.FC<LinkProps> = ({ active, children, onClick }) => {
    return (
        <Root onClick={onClick} disabled={active}>
            {children}
        </Root>
    )
}
