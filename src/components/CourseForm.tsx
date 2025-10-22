import { useState } from 'react'

export interface Course {
    term: string
    number: string
    meets: string
    title: string
}

interface CourseFormProps {
    course: Course
    onCancel: () => void
}

export type CourseErrors = Partial<Record<keyof Course, string>>

export function validateCourse(c: Course): { valid: boolean; errors: CourseErrors } {
    const errors: CourseErrors = {}


    if (!c.title || c.title.trim().length < 2) {
        errors.title = 'Title must be at least 2 characters.'
    }


    const allowedTerms = ['Fall', 'Winter', 'Spring', 'Summer']
    if (!allowedTerms.includes(c.term)) {
        errors.term = 'Term must be Fall, Winter, Spring, or Summer.'
    }

    if (!/^[0-9]+(?:-[0-9]+)?$/.test(c.number)) {
        errors.number = 'Course number must be digits with optional section, e.g., "213-2".'
    }

    if (c.meets && c.meets.trim() !== '') {
        const parts = c.meets.trim().split(/\s+/)
        const daysPart = parts[0]
        const timePart = parts.slice(1).join(' ')

        const timeRegex = /\d{1,2}:\d{2}-\d{1,2}:\d{2}/
        const daysRegex = /^[A-Za-z]{1,4}$/ 

        if (!daysPart || !daysRegex.test(daysPart) || !timePart || !timeRegex.test(timePart)) {
            errors.meets = 'Must contain days and start-end, e.g., "MWF 12:00-13:20".'
        }
    }

    return { valid: Object.keys(errors).length === 0, errors }
}

const CourseForm = ({ course, onCancel }: CourseFormProps) => {
    const [title, setTitle] = useState(course.title)
    const [meetingtime, setMeetingTime] = useState(course.meets)
    const [term, setTerm] = useState(course.term)
    const [number, setNumber] = useState(course.number)
    const [errors, setErrors] = useState<CourseErrors>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const data: Course = { title, meets: meetingtime, term, number }
        const result = validateCourse(data)
        setErrors(result.errors)

    }

    const runLiveValidation = () => {
        const data: Course = { title, meets: meetingtime, term, number }
        const result = validateCourse(data)
        setErrors(result.errors)
    }

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Course Details</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                    <label htmlFor="term" className="block text-lg font-bold mb-2">Term</label>
                    <select
                        id="term"
                        name="term"
                        value={term}
                        onChange={(e) => { setTerm(e.target.value); runLiveValidation() }}
                        className={`w-full rounded border p-2 ${errors.term ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.term}
                    >
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                    </select>
                    {errors.term && <div className="text-sm text-red-600 mt-1">{errors.term}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="number" className="block text-lg font-bold mb-2">Course Number</label>
                    <input
                        id="number"
                        name="number"
                        type="text"
                        value={number}
                        onChange={(e) => { setNumber(e.target.value); runLiveValidation() }}
                        className={`w-full rounded border p-2 ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.number}
                    />
                    {errors.number && <div className="text-sm text-red-600 mt-1">{errors.number}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg font-bold mb-2">Course Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(evt) => { setTitle(evt.target.value); runLiveValidation() }}
                        className={`w-full rounded border p-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.title}
                    />
                    {errors.title && <div className="text-sm text-red-600 mt-1">{errors.title}</div>}
                </div>

                <div className="mb-6">
                    <label htmlFor="meetingtime" className="block text-lg font-bold mb-2">Meeting Times</label>
                    <input
                        id="meetingtime"
                        type="text"
                        name="meetingtime"
                        value={meetingtime}
                        onChange={(evt) => { setMeetingTime(evt.target.value); runLiveValidation() }}
                        className={`w-full rounded border p-2 ${errors.meets ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.meets}
                        placeholder={`e.g. MWF 12:00-13:20`}
                    />
                    {errors.meets && <div className="text-sm text-red-600 mt-1">{errors.meets}</div>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CourseForm