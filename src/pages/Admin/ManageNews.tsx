// src/pages/Admin/ManageNews.tsx
import React from 'react';
import useSWR from 'swr';
import { getNews, deleteDocument } from '../../services/firebaseService';
import { NewsArticle } from '../../types';
// This component would handle the form for adding/editing news
// import NewsForm from './NewsForm'; 

const ManageNews = () => {
    const { data: news, mutate } = useSWR<NewsArticle[]>('news', getNews);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            await deleteDocument('news', id);
            mutate(); // Re-fetch the data
        }
    };

    return (
        <div>
            <h1 className="font-heading text-3xl">Manage News</h1>
            <button className="bg-green-500 text-white p-2 rounded my-4">Add New Article</button>
            <table className="w-full">
                <thead>
                    <tr><th>Title</th><th>Published</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {news?.map(article => (
                        <tr key={article.id}>
                            <td>{article.title}</td>
                            <td>{article.publishedAt.toDate().toLocaleDateString()}</td>
                            <td>
                                <button className="text-blue-500">Edit</button>
                                <button onClick={() => handleDelete(article.id)} className="text-red-500 ml-4">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageNews;