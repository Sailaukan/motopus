'use client';

import React, { useState } from 'react';
import supabase from '../supabase/supabaseClient';

const BetaPreview: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        city: '',
        country: '',
        age: '',
        field: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        city: '',
        country: '',
        age: '',
        field: ''
    });

    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key as keyof typeof errors] = 'Незаполненно';
                isValid = false;
            } else {
                newErrors[key as keyof typeof errors] = '';
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const { data, error } = await supabase
                .from('motopus_beta_users')
                .insert([formData]);
            if (error) {
                throw error;
            }
            setMessage('Form submitted successfully!');
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error inserting data:', error);
            setMessage('Error submitting form.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9333ea] to-[#3b82f6] px-4 py-6 relative">
            <div className={`max-w-md w-full bg-white rounded-lg shadow-lg p-10 ${isSubmitted ? 'blur-sm' : ''}`}>
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <img src="logo.png" alt="Motopus Logo" className="h-24" />
                    </div>
                    <h2 className="text-4xl font-bold">Cтаньте первым пользователем Motopus</h2>
                    <p className="text-muted-foreground">
                        Заполните форму и войдите в список пользователей, которые получат доступ к бета-тестированию Motopus первыми
                    </p>
                </div>
                <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            name="email"
                            placeholder="Введите ваш email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Город
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="city"
                                name="city"
                                placeholder="Введите ваш город"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Страна
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="country"
                                name="country"
                                placeholder="Введите вашу страну"
                                value={formData.country}
                                onChange={handleChange}
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Возраст
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="age"
                                name="age"
                                placeholder="Введите ваш возраст"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                            />
                            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Интерес
                            </label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="field"
                                name="field"
                                value={formData.field}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Выберите ваш интерес</option>
                                <option value="work">Для работы</option>
                                <option value="fun">Для развлечения</option>
                                <option value="study">Для учебы</option>
                                <option value="other">Другое</option>
                            </select>
                            {errors.field && <p className="text-red-500 text-sm mt-1">{errors.field}</p>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Стать первым
                        </button>
                    </div>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </form>
            </div>
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <h4 className="text-lg font-semibold">AI-Powered</h4>
                        </div>
                        <p className="text-gray-600">
                            Motopus - это мощный генератор анимаций для моушн-дизайна, работающий на базе искусственного интеллекта.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h4 className="text-lg font-semibold">Молниеносно быстро</h4>
                        </div>
                        <p className="text-gray-600">
                            Создавайте потрясающие видео за считанные секунды. Наша технология позволяет генерировать уникальные анимации менее чем за 15 секунд!
                        </p>
                    </div>
                </div>
            </div>
            {isSubmitted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center m-5">
                        <p className="text-lg font-semibold">
                            Вы успешно вошли в список ожидания! Ссылка для бета-тестирования придет на вашу почту.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BetaPreview;
