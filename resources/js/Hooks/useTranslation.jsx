import { usePage } from '@inertiajs/react'


export default function __(text) {

    const { translation } = usePage().props

    const trimmedText = text.replace(/\s+/g, ' ').trim()

    return translation[trimmedText] || text
}