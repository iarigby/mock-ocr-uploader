import {afterAll, afterEach, beforeAll, expect, test} from 'vitest'
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen} from '@testing-library/react'
import Page from '@/app/ocr/page'
import {getServerURL} from "@/app/server";
import userEvent from "@testing-library/user-event";


const server = setupServer(
    http.post(getServerURL() + '/ocr', () => {
        return HttpResponse.json({'ocrResult': '`123`'})
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('upload file', async () => {
    await uploadFile()
    await screen.findByRole('heading', {level: 2, name: 'Here is the analysed text'})
})

test('upload file error handling', async() => {
    server.use(
        http.post( getServerURL() + '/ocr', () => {
        return new HttpResponse(null, {statusText: 'wrong image', status: 400})
    }))
    await uploadFile()
    await screen.findByText('Your image is invalid')
    expect(screen.getByText('wrong image')).toBeDefined()
})

async function uploadFile() {
    const user = userEvent.setup()
    render(<Page/>)
    const file = new File(['hello'], 'hello.png', {type: 'image/png'})
    const input: HTMLInputElement = screen.getByLabelText(/image-input/i)
    await user.upload(input, file)

    expect(input.files).not.toBeNull()
    expect(input.files![0]).toBe(file)
    await user.click(screen.getByText('Upload Image'))

}