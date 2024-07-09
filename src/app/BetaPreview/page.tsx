'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import supabase from '../supabase/supabaseClient';

interface FormData {
    email: string;
    city: string;
    country: string;
    age: string;
    field: string;
}

interface Errors {
    email: string;
    city: string;
    country: string;
    age: string;
    field: string;
}

interface Translations {
    title: string;
    subtitle: string;
    email: string;
    city: string;
    country: string;
    age: string;
    interest: string;
    submitButton: string;
    aiPowered: string;
    aiDescription: string;
    modalWindow: string,
    lightning: string;
    speedDescription: string;
    successMessage: string;
    interests: {
        work: string;
        fun: string;
        study: string;
        other: string;
    };
}

interface LanguageTranslations {
    en: Translations;
    ru: Translations;
}

const translations: LanguageTranslations = {
    en: {
        title: "Become the first Motopus user",
        subtitle: "Fill out the form and join the list of users who will get access to Motopus beta testing first. The number of beta testers is limited.",
        email: "Email",
        city: "City",
        country: "Country",
        age: "Age",
        interest: "Interest",
        modalWindow: "You have successfully entered the waiting list!",
        submitButton: "Be the first",
        aiPowered: "AI-Powered",
        aiDescription: "Motopus is a powerful AI-based motion design animation generator.",
        lightning: "Lightning Fast",
        speedDescription: "Create stunning videos in seconds. Our technology allows generating unique animations in less than 15 seconds!",
        successMessage: "You have successfully entered the waiting list! The beta testing link will be sent to your email.",
        interests: {
            work: "For work",
            fun: "For fun",
            study: "For study",
            other: "Other"
        }
    },
    ru: {
        title: "Cтаньте первым пользователем Motopus",
        subtitle: "Заполните форму и войдите в список пользователей, которые получат доступ к бета-тестированию Motopus первыми. Количество пользователей ограничено.",
        email: "Email",
        city: "Город",
        country: "Страна",
        age: "Возраст",
        interest: "Интерес",
        modalWindow: "Вы успешно вошли в список ожидания!",
        submitButton: "Стать первым",
        aiPowered: "AI-Powered",
        aiDescription: "Motopus - это мощный генератор анимаций для моушн-дизайна, работающий на базе искусственного интеллекта.",
        lightning: "Молниеносно быстро",
        speedDescription: "Создавайте потрясающие видео за считанные секунды. Наша технология позволяет генерировать уникальные анимации менее чем за 15 секунд!",
        successMessage: "Вы успешно вошли в список ожидания! Ссылка для бета-тестирования придет на вашу почту.",
        interests: {
            work: "Для работы",
            fun: "Для развлечения",
            study: "Для учебы",
            other: "Другое"
        }
    }
};

const BetaPreview: React.FC = () => {
    const [language, setLanguage] = useState<'ru' | 'en'>('ru');
    const t = translations[language];

    const [formData, setFormData] = useState<FormData>({
        email: '',
        city: '',
        country: '',
        age: '',
        field: ''
    });

    const [errors, setErrors] = useState<Errors>({
        email: '',
        city: '',
        country: '',
        age: '',
        field: ''
    });

    const [message, setMessage] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: Errors = { ...errors };

        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof FormData]) {
                newErrors[key as keyof Errors] = 'Незаполненно';
                isValid = false;
            } else {
                newErrors[key as keyof Errors] = '';
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent) => {
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

    const toggleLanguage = () => {
        setLanguage(language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9333ea] to-[#3b82f6] px-4 py-6 relative">

            <div className=" bg-white rounded-full shadow-lg flex">
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-2 rounded-l-full transition-opacity duration-300 ${language === 'en' ? 'opacity-100' : 'opacity-20 hover:opacity-75'
                        }`}
                >
                    English
                </button>
                <div className="w-px bg-gray-300 my-2"></div>
                <button
                    onClick={() => setLanguage('ru')}
                    className={`px-3 py-2 rounded-r-full transition-opacity duration-300 ${language === 'ru' ? 'opacity-100' : 'opacity-20 hover:opacity-75'
                        }`}
                >
                    Русский
                </button>
            </div>
            <div className={`mt-4 max-w-md w-full bg-white rounded-lg shadow-lg p-10 ${isSubmitted ? 'blur-sm' : ''}`}>

                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <img src="logo.png" alt="Motopus Logo" className="h-24" />
                    </div>
                    <h2 className="text-4xl font-bold">{t.title}</h2>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
                <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            id="email"
                            name="email"
                            placeholder={t.email}
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                id="city"
                                name="city"
                                placeholder={t.city}
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                            <input
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                id="country"
                                name="country"
                                placeholder={t.country}
                                value={formData.country}
                                onChange={handleChange}
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                id="age"
                                name="age"
                                placeholder={t.age}
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                            />
                            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                        </div>
                        <div>
                            <select
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                id="field"
                                name="field"
                                value={formData.field}
                                onChange={handleChange}
                            >
                                <option value="" disabled>{t.interest}</option>
                                <option value="work">{t.interests.work}</option>
                                <option value="fun">{t.interests.fun}</option>
                                <option value="study">{t.interests.study}</option>
                                <option value="other">{t.interests.other}</option>
                            </select>
                            {errors.field && <p className="text-red-500 text-sm mt-1">{errors.field}</p>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t.submitButton}
                        </button>
                    </div>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </form>
            </div>

            {isSubmitted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="absolute bg-white p-6 rounded-lg shadow-lg text-center m-5" style={{ top: '30%' }}>
                        <p className="text-lg font-semibold">
                            {t.modalWindow}
                        </p>
                    </div>
                </div>
            )}




            <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <h4 className="text-lg font-semibold">{t.aiPowered}</h4>
                        </div>
                        <p className="text-gray-600">{t.aiDescription}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h4 className="text-lg font-semibold">{t.lightning}</h4>
                        </div>
                        <p className="text-gray-600">{t.speedDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BetaPreview;