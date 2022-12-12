import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import React, { useState } from 'react'

export default function Login() {
    const [values, setValues] = useState({
        title: "",
        description: "",
        completed: 0,
    })
    const updatedVal = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/todos', values)
        e.target.reset();
        values.description = '';
    }

    const { todos } = usePage().props

    const getAnimalsContent = todos => {
        let content = [];
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i];
            content.push(<tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {i + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {todo.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {todo.description}
                </td>
                <td
                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {todo.completed ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                        className="text-green-500 hover:text-green-700"
                        href="#"
                    >
                        Edit
                    </a>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                        className="text-red-500 hover:text-red-700"
                        href="#"
                    >
                        Delete
                    </a>
                </td>
            </tr>);
        }
        return content;
    };

    return (
        <>
            <div className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    ADD NEW TODO
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2 inline px-2">
                        <input
                            type="text"
                            name="title"
                            onChange={updatedVal}
                            className="  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='title...'
                        />
                    </div>
                    <div className="mb-2 inline px-2">
                        <input
                            type="text"
                            name="description"
                            id='description'
                            value={values.description} onChange={updatedVal}
                            className="  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='description...'
                        />
                        <input type="checkbox"
                            value={values.completed} onChange={updatedVal}
                            className="p-2 mx-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="completed" id="completed" />
                    </div>
                    <div className="mt-6" inline>
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            ADD TODO
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            S.No
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Completed
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Edit
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {getAnimalsContent(todos)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}