import "@testing-library/jest-dom"

import { HiddenMessage } from "./HiddenMessage"
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"

test("shows the children when the checkbox is checked", () => {
    const testMessage = "Test Message"
    render(<HiddenMessage>{testMessage}</HiddenMessage>)

    expect(screen.queryByText(testMessage)).toBeNull()

    fireEvent.click(screen.getByLabelText(/show/i))

    expect(screen.getByText(testMessage)).toBeInTheDocument()
})
