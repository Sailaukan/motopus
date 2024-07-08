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

    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9333ea] to-[#3b82f6] px-4 py-6 relative">
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