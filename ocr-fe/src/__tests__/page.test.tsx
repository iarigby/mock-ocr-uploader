import {afterAll, afterEach, beforeAll, expect, test} from 'vitest'
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen} from '@testing-library/react'
import Page from '@/app/page'
import {getServerURL} from "@/app/server";


const server = setupServer(
    http.get(getServerURL() + '/version', () => {
        return HttpResponse.json({'version': '0.1.0'})
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Page', async () => {
    render(<Page/>)
    await screen.findByRole('heading', {level: 2})
    expect(screen.getByRole('heading', {level: 2, name: 'Current Version: 0.1.0'})).toBeDefined()
})
