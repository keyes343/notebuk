export type Fields = {
    id: string
    field_type: 'text' | 'textarea' | 'radio' | 'select' | 'file' | 'switch'
}

export type InputData = {
    id: number
    field_type: Fields['field_type']
    description: string
    setup_attributes: {
        placeholder: string
        option: string[]
        title: string
    }
    label: string
}
